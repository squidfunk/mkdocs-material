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

import os
import posixpath
import re

from copy import deepcopy
from glob import iglob
from material.plugins.projects.config import ProjectsConfig
from mkdocs.structure.nav import Link
from mkdocs.config.defaults import MkDocsConfig
from mkdocs.config.config_options import Plugins
from urllib.parse import urlparse

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Project
class Project:

    # Initialize project - note that the configuration of the projects plugin
    # of the enclosing project is necessary to resolve nested projects
    def __init__(self, file: str, plugin: ProjectsConfig, slug = "."):
        self.config, self.plugin = self._resolve(file, plugin)

        # The slug should not be changed after initialization, as it's used for
        # correct resolution of projects and nested projects
        self.slug = slug

    # Find and yield nested projects of the current project - the project's
    # slug is prepended to the computed slug for a simple resolution of nested
    # projects, allowing authors to use the project:// protocol for linking to
    # projects from the top-level project or nested and adjacent projects
    def __iter__(self):
        seen: list[str] = []

        # Compute project root and base directory
        root = os.path.dirname(self.config.config_file_path)
        base = os.path.join(root, self.plugin.projects_dir)

        # Find and yield all projects - note that we need to filter for nested
        # projects at this point, as we're only interested in the projects on
        # the next level, not in projects inside projects as they are resolved
        # recursively to preserve topological ordering. This is also why we must
        # sort the list of projects by path, ordering shorted paths first which
        # ensures that nested projects are resolved before their parents.
        glob = os.path.join(base, self.plugin.projects_config_files)
        glob = iglob(os.path.normpath(glob), recursive = True)
        for file in sorted(glob, key = os.path.dirname):
            path = os.path.join(os.path.dirname(file), "")
            if any(path.startswith(_) for _ in seen):
                continue
            else:
                seen.append(path)

            # Extract the first level of the project's directory relative to
            # the projects directory as the computed slug of the project. This
            # allows authors to build projects whose mkdocs.yml files are not
            # located at the project root, e.g., when using git submodules.
            slug = os.path.relpath(file, base)
            slug, *_ = slug.split(os.path.sep)

            # Normalize slug to an internal dot notation which we convert to
            # file system or URL paths when necessary. Each slug starts with
            # a dot to denote that it is resolved from the top-level project,
            # which also allows for resolving slugs in nested projects.
            root = self.slug.rstrip(".")
            slug = f"{root}.{slug}"

            # Create and yield project
            yield Project(file, self.plugin, slug)

    # Compute project hash
    def __hash__(self):
        return hash(self.slug)

    # Find and yield all nested projects (excluding this project) in reverse
    # topological order, by performing a post-order traversal on the tree of
    # projects. This function returns project jobs, which are projects with
    # their immediate dependencies, to build them in the correct order.
    def jobs(self):
        stack = [*self]
        while stack:

            # Pop project from stack and get its dependencies
            project = stack.pop()
            dependencies = [*project]

            # Add project dependencies to stack and yield job
            stack.extend(dependencies)
            yield ProjectJob(project, dependencies)

    # Compute relative path between two projects
    def path(self, that: Project):

        # If both, the top-level and the current project have a site URL set,
        # compute slug from the common path of both site URLs
        if self.config.site_url and that.config.site_url:
            source = self._path_from_config(that.config)
            target = self._path_from_config(self.config)

            # Edge case: the author has set a site URL that does not include a
            # path, so the path of the project is equal to the top-level path.
            # In this case, we need to fall back to the path computed from the
            # slug - see https://t.ly/5vqMr
            if target == source:
                target = self._path_from_slug(self.slug)

        # Otherwise, always compute the path from the slugs of both projects,
        # as we want to support consolidation of unrelated projects
        else:
            source = self._path_from_slug(that.slug)
            target = self._path_from_slug(self.slug)

        # Compute path between projects, and add trailing slash
        path = posixpath.relpath(target, source)
        return posixpath.join(path, "")

    # -------------------------------------------------------------------------

    # Resolve project and plugin configuration
    def _resolve(self, file: str, plugin: ProjectsConfig):
        config = self._resolve_config(file)
        plugin = self._resolve_plugin(config, plugin)

        # Return project and plugin configuration
        return config, plugin

    # Resolve project configuration
    def _resolve_config(self, file: str):
        with open(file, encoding = "utf-8-sig") as f:
            config: MkDocsConfig = MkDocsConfig(config_file_path = file)
            config.load_file(f)

            # Return project configuration
            return config

    # Resolve project plugin configuration
    def _resolve_plugin(self, config: MkDocsConfig, plugin: ProjectsConfig):

        # Make sure that every project has a plugin configuration set - we need
        # to deep copy the configuration object, as it's mutated during parsing.
        # We're using an internal method of the Plugins class to ensure that we
        # always stick to the syntaxes allowed by MkDocs (list and dictionary).
        plugins = Plugins._parse_configs(deepcopy(config.plugins))
        for index, (key, settings) in enumerate(plugins):
            if not re.match(r"^(material/)?projects$", key):
                continue

            # Forward these settings of the plugin configuration to the project,
            # as we need to build nested projects consistently
            for name in ["cache", "projects", "projects_root_dir", "hoisting"]:
                settings[name] = plugin[name]

            # Forward these settings only if they have not been set in the
            # project configuration, as they might be overwritten by the author
            for name in ["log", "log_level"]:
                if not name in settings:
                    settings[name] = plugin[name]

            # Initialize and expand the plugin configuration, and mutate the
            # plugin collection to persist the patched configuration
            plugin: ProjectsConfig = ProjectsConfig()
            plugin.load_dict(settings)
            if isinstance(config.plugins, list):
                config.plugins[index] = { key: dict(plugin.items()) }
            else:
                config.plugins[key] = dict(plugin.items())

            # Return project plugin configuration
            return plugin

        # If no plugin configuration was found, add the default configuration
        # and call this function recursively to ensure that it's present
        config.plugins.append("material/projects")
        return self._resolve_plugin(config, plugin)

    # -------------------------------------------------------------------------

    # Compute path from given slug - split slug at dots, ignoring the first one,
    # and join the segments to a path, prefixed with a dot. This is necessary
    # to compute the common path correctly, so we can use the same logic for
    # when the path is computed from the site URL (see below).
    def _path_from_slug(self, slug: str):
        _, *segments = slug.split(".")
        return posixpath.join(".", *segments)

    # Compute path from given project configuration - parse site URL and return
    # canonicalized path. Paths always start with a dot and trailing slashes are
    # always removed. This is necessary so that we can compute the common path
    # correctly, since the site URL might or might not contain a trailing slash.
    def _path_from_config(self, config: MkDocsConfig):
        url = urlparse(config.site_url)

        # Remove leading slash, if any
        path = url.path
        if path.startswith("/"):
            path = path[1:]

        # Return normalized path
        path = posixpath.normpath(path) if path else path
        return posixpath.join(".", path)

# -----------------------------------------------------------------------------

# Project job
class ProjectJob:

    # Initialize project job
    def __init__(self, project: Project, dependencies: list[Project]):
        self.project = project
        self.dependencies = dependencies

# -----------------------------------------------------------------------------

# Project link
class ProjectLink(Link):

    # Indicate that the link points to a project
    is_project = True
