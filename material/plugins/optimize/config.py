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
from mkdocs.config.config_options import ListOfItems, Type

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Optimize plugin configuration
class OptimizeConfig(Config):
    enabled = Type(bool, default = True)
    concurrency = Type(int, default = max(1, os.cpu_count() - 1))

    # Settings for caching
    cache = Type(bool, default = True)
    cache_dir = Type(str, default = ".cache/plugin/optimize")

    # Settings for optimization
    optimize = Type(bool, default = True)
    optimize_png = Type(bool, default = True)
    optimize_png_speed = Type(int, default = 3)
    optimize_png_strip = Type(bool, default = True)
    optimize_jpg = Type(bool, default = True)
    optimize_jpg_quality = Type(int, default = 60)
    optimize_jpg_progressive = Type(bool, default = True)
    optimize_include = ListOfItems(Type(str), default = [])
    optimize_exclude = ListOfItems(Type(str), default = [])

    # Settings for reporting
    print_gain = Type(bool, default = True)
    print_gain_summary = Type(bool, default = True)
