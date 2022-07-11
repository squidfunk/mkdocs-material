# Copyright (c) 2016-2021 Martin Donath <martin.donath@squidfunk.com>

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

from mkdocs.contrib.search import SearchPlugin as BasePlugin
from mkdocs.contrib.search.search_index import SearchIndex as BaseIndex

# -----------------------------------------------------------------------------
# Class
# -----------------------------------------------------------------------------

# Search plugin with custom search index
class SearchPlugin(BasePlugin):

    # Override to use a custom search index
    def on_pre_build(self, config):
        super().on_pre_build(config)
        self.search_index = SearchIndex(**self.config)

# -----------------------------------------------------------------------------

# Search index with support for additional fields
class SearchIndex(BaseIndex):

    # Override to add additional fields for each page
    def add_entry_from_context(self, page):
        index = len(self._entries)
        super().add_entry_from_context(page)
        entry = self._entries[index]

        # Add document tags
        if page.meta.get("tags"):
            entry["tags"] = page.meta["tags"]

        # Add document boost for search
        if "search" in page.meta:
            search = page.meta["search"]
            if "boost" in search:
                entry["boost"] = search["boost"]
