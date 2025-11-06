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

import json
import os
import posixpath

from jinja2 import pass_context
from jinja2.runtime import Context
from mkdocs.config.defaults import MkDocsConfig
from mkdocs.exceptions import PluginError
from mkdocs import utils
from mkdocs.plugins import BasePlugin, event_priority
from mkdocs.structure import StructureItem
from mkdocs.structure.files import Files
from mkdocs.structure.nav import Link, Section
from mkdocs.utils import get_theme_dir
from urllib.parse import ParseResult as URL, urlparse

from .builder import ProjectsBuilder
from .config import ProjectsConfig
from .structure import Project, ProjectLink

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Projects plugin
class ProjectsPlugin(BasePlugin[ProjectsConfig]):

    # Projects builder
    builder: ProjectsBuilder = None

    # Initialize plugin
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Initialize incremental builds
        self.is_serve = False
        self.is_dirty = False

        # Hack: Since we're building in topological order, we cannot let MkDocs
        # clean the directory, because it means that nested projects are always
        # deleted before a project is built. We also don't need to restore this
        # functionality, because it's only used once in the process.
        utils.clean_directory = lambda _: _

    # Determine whether we're serving the site
    def on_startup(self, *, command, dirty):
        self.is_serve = command == "serve"
        self.is_dirty = dirty

    # Resolve projects – compared to our other concurrent plugins, this plugin
    # is forced to use a process pool in order to guarantee proper isolation, as
    # MkDocs itself is not thread-safe. Additionally, all project configurations
    # are resolved and written to the cache (if enabled), as it's sufficient to
    # resolve them once on the top-level before projects are built. We might
    # need adjacent project configurations for interlinking projects.
    def on_config(self, config):
        if not self.config.enabled:
            return

        # Skip if projects should not be built - we can only exit here if we're
        # at the top-level, but not when building a nested project
        root = self.config.projects_root_dir is None
        if root and not self.config.projects:
            return

        # Set projects root directory to the top-level project
        if not self.config.projects_root_dir:
            self.config.projects_root_dir = os.path.dirname(
                config.config_file_path
            )

        # Initialize manifest
        self.manifest: dict[str, str] = {}
        self.manifest_file = os.path.join(
            self.config.projects_root_dir,
            self.config.cache_dir,
            "manifest.json"
        )

        # Load manifest if it exists and the cache should be used
        if os.path.isfile(self.manifest_file):
            try:
                with open(self.manifest_file) as f:
                    self.manifest = json.load(f)
            except:
                pass

        # Building the top-level project, we must resolve and load all project
        # configurations, as we need all information upfront to build them in
        # the correct order, and to resolve links between projects. Furthermore,
        # the author might influence a project's path by setting the site URL.
        if root:
            if not self.builder:
                self.builder = ProjectsBuilder(config, self.config)

            # @todo: detach project resolution from build
            self.manifest = { ".": os.path.relpath(config.config_file_path) }
            for job in self.builder.root.jobs():
                path = os.path.relpath(job.project.config.config_file_path)
                self.manifest[job.project.slug] = path

            # Save manifest, a we need it in nested projects
            os.makedirs(os.path.dirname(self.manifest_file), exist_ok = True)
            with open(self.manifest_file, "w") as f:
                f.write(json.dumps(self.manifest, indent = 2, sort_keys = True))

    # Schedule projects for building - the general case is that all projects
    # can be considered independent of each other, so we build them in parallel
    def on_pre_build(self, config):
        if not self.config.enabled:
            return

        # Skip if projects should not be built or we're not at the top-level
        if not self.config.projects or not self.builder:
            return

        # Build projects
        self.builder.build(self.is_serve, self.is_dirty)

    # Patch environment to allow for hoisting of media files provided by the
    # theme itself, which will also work for other themes, not only this one
    def on_env(self, env, *, config, files):
        if not self.config.enabled:
            return

        # Skip if projects should not be built or we're at the top-level
        if not self.config.projects or self.builder:
            return

        # If hoisting is enabled and we're building a project, remove all media
        # files that are provided by the theme and hoist them to the top
        if self.config.hoisting:
            theme = get_theme_dir(config.theme.name)
            hoist = Files([])

            # Retrieve top-level project and check if the current project uses
            # the same theme as the top-level project - if not, don't hoist
            root = Project("mkdocs.yml", self.config)
            if config.theme.name != root.config.theme["name"]:
                return

            # Remove all media files that are provided by the theme
            for file in files.media_files():
                if file.abs_src_path.startswith(theme):
                    files.remove(file)
                    hoist.append(file)

            # Resolve source and target project
            source: Project | None = None
            target: Project | None = None
            for ref, file in self.manifest.items():
                base = os.path.join(self.config.projects_root_dir, file)
                if file == os.path.relpath(
                    config.config_file_path, self.config.projects_root_dir
                ):
                    source = Project(base, self.config, ref)
                if "." == ref:
                    target = Project(base, self.config, ref)

            # Compute path for slug from source and target project
            path = target.path(source)

            # Fetch URL template filter from environment - the filter might
            # be overridden by other plugins, so we must retrieve and wrap it
            url_filter = env.filters["url"]

            # Patch URL template filter to add support for correctly resolving
            # media files that were hoisted to the top-level project
            @pass_context
            def url_filter_with_hoisting(context: Context, url: str | None):
                if url and hoist.get_file_from_path(url):
                    return posixpath.join(path, url_filter(context, url))
                else:
                    return url_filter(context, url)

            # Register custom template filters
            env.filters["url"] = url_filter_with_hoisting

    # Adjust project navigation in page (run latest) - as always, allow
    # other plugins to alter the navigation before we process it here
    @event_priority(-100)
    def on_page_context(self, context, *, page, config, nav):
        if not self.config.enabled:
            return

        # Skip if projects should not be built
        if not self.config.projects:
            return

        # Replace project URLs in navigation
        self._replace(nav.items, config)

    # Adjust project navigation in template (run latest) - as always, allow
    # other plugins to alter the navigation before we process it here
    @event_priority(-100)
    def on_template_context(self, context, *, template_name, config):
        if not self.config.enabled:
            return

        # Skip if projects should not be built
        if not self.config.projects:
            return

        # Replace project URLs in navigation
        self._replace(context["nav"].items, config)

    # Serve projects
    def on_serve(self, server, *, config, builder):
        if self.config.enabled:
            self.builder.serve(server, self.is_dirty)

    # -------------------------------------------------------------------------

    # Replace project links in the given list of navigation items
    def _replace(self, items: list[StructureItem], config: MkDocsConfig):
        for index, item in enumerate(items):

            # Handle section
            if isinstance(item, Section):
                self._replace(item.children, config)

            # Handle link
            if isinstance(item, Link):
                url = urlparse(item.url)
                if url.scheme == "project":
                    project, url = self._resolve_project_url(url, config)

                    # Append file name if directory URLs are disabled
                    if not project.config.use_directory_urls:
                        url += "index.html"

                    # Replace link with project link
                    items[index] = ProjectLink(
                        item.title or project.config.site_name,
                        url
                    )

    # Resolve project URL and slug
    def _resolve_project_url(self, url: URL, config: MkDocsConfig):

        # Abort if the project URL contains a path, as we first need to collect
        # use cases for when, how and whether we need and want to support this
        if url.path != "":
            raise PluginError(
                f"Couldn't resolve project URL: paths currently not supported\n"
                f"Please only use 'project://{url.hostname}'"
            )

        # Compute slug from host name and convert to dot notation
        slug = url.hostname
        slug = slug if slug.startswith(".") else f".{slug}"

        # Resolve source and target project
        source: Project | None = None
        target: Project | None = None
        for ref, file in self.manifest.items():
            base = os.path.join(self.config.projects_root_dir, file)
            if file == os.path.relpath(
                config.config_file_path, self.config.projects_root_dir
            ):
                source = Project(base, self.config, ref)
            if slug == ref:
                target = Project(base, self.config, ref)

        # Abort if slug doesn't match a known project
        if not target:
            raise PluginError(f"Couldn't find project '{slug}'")

        # Return project slug and path
        return target, target.path(source)
