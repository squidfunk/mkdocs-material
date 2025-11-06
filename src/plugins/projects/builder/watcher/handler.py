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
import os

from collections.abc import Callable
from material.plugins.projects.structure import Project
from watchdog.events import FileSystemEvent, FileSystemEventHandler

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Project changed
class ProjectChanged(FileSystemEventHandler):

    # Initialize event handler
    def __init__(self, project: Project, handler: Callable):
        self.project = project
        self.handler = handler

    # Handle file event
    def on_any_event(self, event: FileSystemEvent):
        self._handle(event)

    # -------------------------------------------------------------------------

    # Invoke file event handler
    def _handle(self, event: FileSystemEvent):
        config = self.project.config

        # Resolve path to docs directory
        base = os.path.dirname(config.config_file_path)
        docs = os.path.join(base, config.docs_dir)

        # Resolve project root and path to changed file
        root = os.path.relpath(base)
        path = os.path.relpath(event.src_path, root)

        # Check if mkdocs.yml or docs directory was deleted
        if event.src_path in [docs, config.config_file_path]:
            if event.event_type == "deleted":
                return

        # Invoke handler and print message that we're scheduling a build
        log.info(f"Schedule build due to '{path}' in '{root}'")
        self.handler(self.project)

# -----------------------------------------------------------------------------

# Project added or removed
class ProjectAddedOrRemoved(FileSystemEventHandler):

    # Initialize event handler
    def __init__(self, project: Project, handler: Callable):
        self.project = project
        self.handler = handler

    # Handle file creation event
    def on_created(self, event: FileSystemEvent):
        self._handle(event)

    # Handle file deletion event
    def on_deleted(self, event: FileSystemEvent):
        self._handle(event)

    # ------------------------------------------------------------------------

    # Invoke file event handler
    def _handle(self, event: FileSystemEvent):
        config = self.project.config

        # Touch mkdocs.yml to trigger rebuild
        if os.path.isfile(config.config_file_path):
            os.utime(config.config_file_path, None)

        # Invoke handler
        self.handler(self.project)

# -----------------------------------------------------------------------------
# Data
# -----------------------------------------------------------------------------

# Set up logging
log = logging.getLogger("mkdocs")
