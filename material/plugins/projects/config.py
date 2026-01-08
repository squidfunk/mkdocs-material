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

import os

from collections.abc import Callable
from mkdocs.config.config_options import Choice, Optional, Type
from mkdocs.config.base import Config

# -----------------------------------------------------------------------------
# Options
# -----------------------------------------------------------------------------

# Options for log level
LogLevel = (
    "error",
    "warn",
    "info",
    "debug"
)

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Projects plugin configuration
class ProjectsConfig(Config):
    enabled = Type(bool, default = True)
    concurrency = Type(int, default = max(1, os.cpu_count() - 1))

    # Settings for caching
    cache = Type(bool, default = True)
    cache_dir = Type(str, default = ".cache/plugin/projects")

    # Settings for logging
    log = Type(bool, default = True)
    log_level = Choice(LogLevel, default = "info")

    # Settings for projects
    projects = Type(bool, default = True)
    projects_dir = Type(str, default = "projects")
    projects_config_files = Type(str, default = "*/mkdocs.yml")
    projects_config_transform = Optional(Type(Callable))
    projects_root_dir = Optional(Type(str))

    # Settings for hoisting
    hoisting = Type(bool, default = True)
