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

from collections.abc import Callable
from material.plugins.projects.structure import Project
from mkdocs.livereload import LiveReloadServer

from .handler import ProjectChanged, ProjectAddedOrRemoved

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Projects watcher
class ProjectsWatcher:

    # Set of watched paths
    watched: set[str] = set()

    # Initialize projects watcher
    def __init__(self, server: LiveReloadServer):
        self.server = server

    # Watch project and invoke function on change
    def watch(self, project: Project, fn: Callable):
        self._on_project_changed(project, fn)
        self._on_project_added_or_removed(project, fn)

    # Stop watching project
    def unwatch(self, project: Project):

        # Traverse all watched paths
        root = os.path.dirname(project.config.config_file_path)
        for path in [*self.watched]:

            # Remove path from watched paths
            if path.startswith(root):
                self.server.unwatch(path)
                self.watched.remove(path)

    # -------------------------------------------------------------------------

    # Register event handler for project changes
    def _on_project_changed(self, project: Project, fn: Callable):

        # Resolve project root and docs directory
        root = os.path.dirname(project.config.config_file_path)
        docs = os.path.join(root, project.config.docs_dir)

        # Collect all paths to watch
        paths = set([docs, project.config.config_file_path])
        for path in project.config.watch:
            paths.add(os.path.join(root, path))

        # Register event handler for unwatched paths
        handler = ProjectChanged(project, fn)
        for path in paths - self.watched:
            self.server.watch(path)

            # Add path and its descendents to watched paths
            self.server.observer.schedule(handler, path, recursive = True)
            self.watched.add(path)

    # Register event handler for project additions and removals
    def _on_project_added_or_removed(self, project: Project, fn: Callable):

        # Resolve project root and path to projects directory
        root = os.path.dirname(project.config.config_file_path)
        path = os.path.join(root, project.plugin.projects_dir)

        # Register event handler for unwatched paths
        handler = ProjectAddedOrRemoved(project, fn)
        if path not in self.watched and os.path.isdir(path):

            # Add path to watched paths
            self.server.observer.schedule(handler, path)
            self.watched.add(path)
