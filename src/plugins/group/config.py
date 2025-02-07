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

from mkdocs.config.config_options import Type
from mkdocs.config.base import Config

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Group plugin configuration
class GroupConfig(Config):
    # While the canonical type for this setting is obviously bool, setting it
    # from environment variables seems to have different effects on different
    # systems. For instance, setting CI=true seems to correctly work on macOS,
    # but not on Linux – see https://t.ly/MWj0H.
    #
    # Thus, as long as the value evaluates to a truthy or falsy value, the
    # plugin will work as expected, until we find a better solution.
    enabled = Type((bool, str, int), default = False)
    plugins = Type((list, dict))
