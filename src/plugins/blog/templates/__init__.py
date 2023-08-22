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

from jinja2 import pass_context
from jinja2.runtime import Context
from material.plugins.blog.structure import View
from mkdocs.utils.templates import url_filter as _url_filter

# -----------------------------------------------------------------------------
# Functions
# -----------------------------------------------------------------------------

# Filter for normalizing URLs with support for paginated views
@pass_context
def url_filter(context: Context, url: str):
    page = context["page"]

    # If the current page is a view, check if the URL links to the page
    # itself, and replace it with the URL of the main view
    if isinstance(page, View):
        if page.url == url:
            url = page.pages[0].url

    # Forward to original template filter
    return _url_filter(context, url)
