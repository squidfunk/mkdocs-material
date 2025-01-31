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

from collections.abc import Callable
from material.utilities.filter import FilterConfig
from mkdocs.config.config_options import (
    DictOfItems, Deprecated, ListOfItems, SubConfig, Type
)
from mkdocs.config.base import Config
from pymdownx.slugs import slugify

from . import item_title, tag_name
from .structure.listing import ListingConfig
from .structure.tag.options import TagSet

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Tags plugin configuration
class TagsConfig(Config):
    enabled = Type(bool, default = True)

    # Settings for filtering
    filters = SubConfig(FilterConfig)

    # Settings for tags
    tags = Type(bool, default = True)
    tags_slugify = Type(Callable, default = slugify(case = "lower"))
    tags_slugify_separator = Type(str, default = "-")
    tags_slugify_format = Type(str, default = "tag:{slug}")
    tags_sort_by = Type(Callable, default = tag_name)
    tags_sort_reverse = Type(bool, default = False)
    tags_name_property = Type(str, default = "tags")
    tags_name_variable = Type(str, default = "tags")
    tags_allowed = TagSet()

    # Settings for listings
    listings = Type(bool, default = True)
    listings_map = DictOfItems(SubConfig(ListingConfig), default = {})
    listings_sort_by = Type(Callable, default = item_title)
    listings_sort_reverse = Type(bool, default = False)
    listings_tags_sort_by = Type(Callable, default = tag_name)
    listings_tags_sort_reverse = Type(bool, default = False)
    listings_directive = Type(str, default = "material/tags")
    listings_layout = Type(str, default = "default")

    # Deprecated settings
    tags_compare = Deprecated(moved_to = "tags_sort_by")
    tags_compare_reverse = Deprecated(moved_to = "tags_sort_reverse")
    tags_pages_compare = Deprecated(moved_to = "listings_sort_by")
    tags_pages_compare_reverse = Deprecated(moved_to = "listings_sort_reverse")
    tags_file = Deprecated(
        option_type = Type(str),
        message = "This setting is not required anymore"
    )
