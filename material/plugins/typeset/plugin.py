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

import re

from mkdocs.plugins import BasePlugin

from .config import TypesetConfig

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Typeset plugin
class TypesetPlugin(BasePlugin[TypesetConfig]):

    # Initialize plugin
    def on_config(self, config):
        if not self.config.enabled:
            return

        # Initialize titles
        self.title_map: dict[str, str] = {}

    # Extract source of page title before it's lost
    def on_pre_page(self, page, *, config, files):
        if not self.config.enabled:
            return

        # Check if page title was set in configuration
        if page.title:
            path = page.file.src_uri
            self.title_map[path] = "config"

    # Extract typeset content for headlines
    def on_page_content(self, html, *, page, config, files):
        if not self.config.enabled:
            return

        # Check if page title was set in metadata
        path = page.file.src_uri
        if path not in self.title_map:
            if "title" in page.meta:
                self.title_map[path] = "meta"

        # Flatten anchors and map to headlines
        anchors = _flatten(page.toc.items)
        for (level, id, title) in re.findall(
            r"<h(\d)[^>]+id=\"([^\"]+)[^>]*>(.*?)</h\1>",
            html, flags = re.I | re.M
        ):
            if id not in anchors:
                continue

            # If the author uses `data-toc-label` to override a heading (which
            # doesn't support adding of HTML tags), we can abort here, since
            # the headline will be rendered as-is. It's more or less a hack, so
            # we should check if we can improve it in the future.
            label = re.escape(anchors[id].title)
            if re.search(rf"data-toc-label=['\"]{label}", page.markdown):
                continue

            # Remove anchor links from headlines – we need to do that, or we
            # end up with anchor links inside anchor links, which is invalid
            # HTML5. There are two cases we need to account for here:
            #
            # 1. If toc.anchorlink is enabled, the entire headline is wrapped
            #    in an anchor link, so we unpack its contents
            #
            # 2. If toc.permalink is enabled, an anchor link is appended to the
            #    contents of the headline, so we just remove it
            #
            # Albeit it doesn't make much sense, both options can be used at
            # the same time, so we need to account for both cases. This problem
            # was first reported in https://bit.ly/456AjUm
            title = re.sub(r"^<a\s+[^>]+>(.*?)</a>", r"\1", title)
            title = re.sub(r"<a\s+[^>]+>[^<]+?</a>$", "", title)

            # Remove author-provided ids - see https://bit.ly/3ngiZea
            title = re.sub(r"id=\"?[^\">]+\"?", "", title)

            # Assign headline content to anchor
            anchors[id].typeset = { "title": title }
            if path not in self.title_map:

                # Assign first top-level headline to page
                if not hasattr(page, "typeset") and int(level) == 1:
                    page.typeset = anchors[id].typeset
                    page.title = re.sub(r"<[^>]+>", "", title)

# -----------------------------------------------------------------------------
# Helper functions
# -----------------------------------------------------------------------------

# Flatten a tree of anchors
def _flatten(items):
    anchors = {}
    for item in items:
        anchors[item.id] = item

        # Recursively expand children
        if item.children:
            anchors.update(_flatten(item.children))

    # Return anchors
    return anchors
