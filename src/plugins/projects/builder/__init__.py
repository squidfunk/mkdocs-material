# Copyright (c) 2016-2025 Martin Donath <martin.donath@squidfunk.com>

# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to
# deal in the Software without restriction, including without limitation the
# rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
# sell copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:

# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.

# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
# FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
# IN THE SOFTWARE.

from __future__ import annotations

import logging
import multiprocessing
import os
import posixpath

from collections.abc import Callable
from concurrent.futures import Future, as_completed
from concurrent.futures.process import ProcessPoolExecutor
from logging import Logger
from material.plugins.projects.config import ProjectsConfig
from material.plugins.projects.structure import Project, ProjectJob
from mkdocs.commands.build import build
from mkdocs.config.base import ConfigErrors, ConfigWarnings
from mkdocs.config.defaults import MkDocsConfig
from mkdocs.exceptions import Abort
from mkdocs.livereload import LiveReloadServer
from urllib.parse import urlparse

from .log import (
    get_log_for,
    get_log_formatter,
    get_log_handler,
    get_log_level_for
)
from .watcher import ProjectsWatcher

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Projects builder
class ProjectsBuilder:

    # Set of projects
    projects: set[Project] = set()

    # Projects watcher
    watcher: ProjectsWatcher | None = None

    # Initialize projects builder - compared to our other concurrent plugins,
    # this plugin is forced to use a process pool in order to guarantee proper
    # isolation, as MkDocs itself is not thread-safe. We also need to recreate
    # the process pool on every build, or CTRL-C is broken
    def __init__(self, config: MkDocsConfig, plugin: ProjectsConfig):

        # Initialize root project
        self.root = Project(config.config_file_path, plugin)
        self.root.config = config

        # Initialize process pool
        self.pool = ProcessPoolExecutor
        self.pool_jobs: dict[str, Future] = {}

    # Build projects
    def build(self, serve: bool = False, dirty: bool = False):
        self.pool = ProcessPoolExecutor(
            self.root.plugin.concurrency,
            mp_context = multiprocessing.get_context("spawn")
        )

        # Determine projects in topological order and prepare for building
        built: list[str] = []
        queue = [*self.root.jobs()]
        for job in queue:
            _setup(job.project, self.root, serve)
            if serve:
                self._link(job.project)

        # Schedule projects for building
        for job in reversed(queue):
            if self._schedule(job, serve, dirty):
                queue.remove(job)

        # Build loop - iteratively build more projects while there are still
        # projects to be built, sticking to the topological order.
        while len(built) < len(self.pool_jobs):
            for future in as_completed(self.pool_jobs.values()):
                slug, errors, warnings = future.result()
                if slug in built:
                    continue

                # Mark project as built
                built.append(slug)

                # Schedule projects for building
                for job in reversed(queue):
                    if self._schedule(job, serve, dirty):
                        queue.remove(job)

                # Print errors and warnings
                for project in self.projects:
                    if project.slug == slug:
                        _print(get_log_for(project), errors, warnings)
                        break

        # Shutdown process pool
        self.pool.shutdown()
        if self.watcher:

            # Update watched paths
            for project in self.projects:
                if project.slug not in built:
                    self.pool_jobs.pop(project.slug, None)
                    self.watcher.unwatch(project)
                else:
                    self.watcher.watch(project, self.taint)

    # Taint a project to schedule it for building
    def taint(self, project: Project):
        self.pool_jobs.pop(project.slug, None)

    # Watch and serve projects
    def serve(self, server: LiveReloadServer, is_dirty: bool = False):
        self.watcher = ProjectsWatcher(server)
        self.watcher.watch(self.root, self.taint)
        for project in self.projects:
            self.watcher.watch(project, self.taint)

    # -------------------------------------------------------------------------

    # Create symlink for project if we're serving the site
    def _link(self, project: Project):

        # Compute path for slug from current project - normalize path,
        # as paths computed from slugs or site URLs use forward slashes
        path = project.path(self.root)
        path = os.path.normpath(path)

        # Create symbolic link, if we haven't already
        path = os.path.join(self.root.config.site_dir, path)
        if not os.path.islink(path):

            # Ensure link target exists
            target = os.path.realpath(os.path.dirname(path))
            if not os.path.exists(target):
                os.makedirs(target, exist_ok = True)

            # Create symbolic link
            os.makedirs(os.path.dirname(path), exist_ok = True)
            os.symlink(project.config.site_dir, path)

    # Schedule project for building - spawn concurrent job to build the project
    # and add a future to the jobs dictionary to link build results to projects
    def _schedule(self, job: ProjectJob, serve: bool, dirty: bool):
        self.projects.add(job.project)

        # Exit early, if project doesn't need to be re built
        if job.project.slug in self.pool_jobs:
            return True

        # Check if dependencies have been built already, and if so, remove
        # them from the list of dependencies. If a dependency has failed to
        # build, we'll raise an exception, which will be caught by the main
        # process, and the entire build will be aborted.
        for dependency in [*job.dependencies]:
            future = self.pool_jobs[dependency.slug]
            if future.running():
                continue

            # If the dependency has failed to build, we'll raise an exception
            # to abort the entire build, as we can't build the project itself
            # without the dependency. This will be caught by the main process.
            # Otherwise, we'll remove the dependency from the list.
            if future.exception():
                raise future.exception()
            elif future.done():
                job.dependencies.remove(dependency)

        # If all dependencies of the project have been built, we can build
        # the project itself by spawning a concurrent job
        if not job.dependencies:
            self.pool_jobs[job.project.slug] = self.pool.submit(
                _build, job.project, serve, dirty,
                get_log_level_for(job.project)
            )

        # Return whether the project has been scheduled
        return not job.dependencies

# -----------------------------------------------------------------------------
# Helper functions
# -----------------------------------------------------------------------------

# Setup project by preparing it for building
def _setup(project: Project, root: Project, serve: bool):
    assert project.slug != "."

    # Retrieve configuration of top-level project and transform project
    transform = root.plugin.projects_config_transform
    if isinstance(transform, Callable):
        transform(project, root)

    # If the top-level project defines a site URL, we need to make sure that the
    # site URL of the project is set as well, setting it to the path we derive
    # from the slug. This allows to define the URL independent of the entire
    # project's directory structure. If the top-level project doesn't define a
    # site URL, it might be the case that the author is building a consolidated
    # project of several nested projects that are independent, but which should
    # be bundled together for distribution. As this is a case that is quite
    # common, we're not raising a warning or error.
    path = project.path(root)
    if root.config.site_url:

        # If the project doesn't have a site URL, compute it from the site URL
        # of the top-level project and the path derived from the slug
        if not project.config.site_url:
            project.config.site_url = posixpath.join(
                root.config.site_url,
                path
            )

        # If we're serving the site, replace the project's host name with the
        # dev server address, so we can serve nested projects as well
        if serve:
            url = urlparse(project.config.site_url)
            url = url._replace(
                scheme = "http",
                netloc = str(root.config.dev_addr)
            )

            # Update site URL with dev server address
            project.config.site_url = url.geturl()

    # If we're building the site, the project's output must be written to the
    # site directory of the top-level project, so we can serve it from there
    if not serve:
        project.config.site_dir = os.path.join(
            root.config.site_dir,
            os.path.normpath(path)
        )

    # If we're serving the site, we must fall back to symbolic links, as MkDocs
    # will empty the entire site directory every time it performs a build
    else:
        project.config.site_dir = os.path.join(
            os.path.dirname(project.config.config_file_path),
            project.config.site_dir
        )

# Build project - note that regardless of whether MkDocs was started in build
# or serve mode, projects must always be built, as they're served by the root
def _build(project: Project, serve: bool, dirty: bool, level = logging.WARN):
    config = project.config

    # Change working directory to project root - this is necessary, or relative
    # paths used in extensions and plugins will be resolved incorrectly
    os.chdir(os.path.dirname(config.config_file_path))

    # Validate configuration
    errors, warnings = config.validate()
    if not errors:

        # Retrieve and configure MkDocs' logger
        log = logging.getLogger("mkdocs")
        log.setLevel(level)

        # Hack: there seems to be an inconsistency between operating systems,
        # and it's yet unclear where this is coming from - on macOS, the MkDocs
        # default logger has no designated handler registered, but on Linux it
        # does. If there's no handler, we need to create one. If there is, we
        # must only set the formatter, as otherwise we'll end up with the same
        # message printed on two log handlers - see https://t.ly/q7UEq
        handler = get_log_handler(project)
        if not log.hasHandlers():
            log.addHandler(handler)
        else:
            for handler in log.handlers:
                handler.setFormatter(get_log_formatter(project))

        # Build project and dispatch startup and shutdown plugin events - note
        # that we must pass the correct command to the event handler, but run
        # the build command anyway, because otherwise some plugins will not
        # run in serve mode.
        command = "serve" if serve else "build"
        config.plugins.run_event("startup", command = command, dirty = dirty)
        try:
            build(config, dirty = dirty)
        finally:
            config.plugins.run_event("shutdown")
            log.removeHandler(handler)

    # Return slug, errors and warnings
    return project.slug, errors, warnings

# Print errors and warnings resulting from building a project
def _print(log: Logger, errors: ConfigErrors, warnings: ConfigWarnings):

    # Print warnings
    for value, message in warnings:
        log.warning(f"Config value '{value}': {message}")

    # Print errors
    for value, message in errors:
        log.error(f"Config value '{value}': {message}")

    # Abort if there were errors
    if errors:
        raise Abort(f"Aborted with {len(errors)} configuration errors")
