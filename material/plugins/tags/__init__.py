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

from .structure.mapping import Mapping
from .structure.tag import Tag

# -----------------------------------------------------------------------------
# Functions
# -----------------------------------------------------------------------------

# Return tag name for sorting
def tag_name(tag: Tag, *args):
    return tag.name

# Return casefolded tag name for sorting
def tag_name_casefold(tag: Tag, *args):
    return tag.name.casefold()

# -----------------------------------------------------------------------------

# Return item title for sorting
def item_title(mapping: Mapping):
    # Note that this must be coerced to a string, as the title might be sourced
    # from metadata, which can be of any type - see https://t.ly/1AXyo
    return str(mapping.item.title)

# Return item URL for sorting
def item_url(mapping: Mapping):
    return mapping.item.url
