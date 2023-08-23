# Copyright (c) 2016-2023 Martin Donath <martin.donath@squidfunk.com>

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

from functools import partial
from markdown.extensions.toc import slugify
from mkdocs.config.config_options import Optional, Type
from mkdocs.config.base import Config

from . import casefold

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Tags plugin configuration
class TagsConfig(Config):
    enabled = Type(bool, default = True)

    # Settings for tags
    tags_file = Optional(Type(str))
    tags_extra_files = Type(dict, default = {})
    tags_slugify = Type((type(slugify), partial), default = slugify)
    tags_slugify_separator = Type(str, default = "-")
    tags_compare = Optional(Type(type(casefold)))
    tags_compare_reverse = Type(bool, default = False)
    tags_allowed = Type(list, default = [])
