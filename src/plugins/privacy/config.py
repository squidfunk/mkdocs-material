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

from mkdocs.config.base import Config
from mkdocs.config.config_options import (
  Choice, Deprecated, DictOfItems, ListOfItems, Type
)

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

# Privacy plugin configuration
class PrivacyConfig(Config):
    enabled = Type(bool, default = True)
    concurrency = Type(int, default = max(1, os.cpu_count() - 1))

    # Settings for caching
    cache = Type(bool, default = True)
    cache_dir = Type(str, default = ".cache/plugin/privacy")

    # Settings for logging
    log = Type(bool, default = True)
    log_level = Choice(LogLevel, default = "info")

    # Settings for external assets
    assets = Type(bool, default = True)
    assets_fetch = Type(bool, default = True)
    assets_fetch_dir = Type(str, default = "assets/external")
    assets_include = ListOfItems(Type(str), default = [])
    assets_exclude = ListOfItems(Type(str), default = [])
    assets_expr_map = DictOfItems(Type(str), default = {})

    # Settings for external links
    links = Type(bool, default = True)
    links_attr_map = DictOfItems(Type(str), default = {})
    links_noopener = Type(bool, default = True)

    # Deprecated settings
    external_assets = Deprecated(message = "Deprecated, use 'assets_fetch'")
    external_assets_dir = Deprecated(moved_to = "assets_fetch_dir")
    external_assets_include = Deprecated(moved_to = "assets_include")
    external_assets_exclude = Deprecated(moved_to = "assets_exclude")
    external_assets_expr = Deprecated(moved_to = "assets_expr_map")
    external_links = Deprecated(moved_to = "links")
    external_links_attr_map = Deprecated(moved_to = "links_attr_map")
    external_links_noopener = Deprecated(moved_to = "links_noopener")
