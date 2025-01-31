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

from __future__ import annotations

import posixpath

from jinja2 import Environment
from mkdocs.config.defaults import MkDocsConfig
from mkdocs.structure.pages import Page
from mkdocs.utils import get_relative_url

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

class Renderer:
    """
    A renderer for tags and listings.

    This class implements a simple tag and listing renderer, leveraging the
    Jinja environment and the MkDocs configuration as provided to plugins.

    Note that the templates must be stored in the `fragments` and not `partials`
    directory, because in order to render tags and listings, we must wait for
    all pages to be read and processed, as we first need to collect all tags
    before we can render listings. Tags induce a graph, not a tree.

    For this reason, we consider the templates to be fragments, as they are
    not implicitly rendered by MkDocs, but explicitly by the plugin.
    """

    def __init__(self, env: Environment, config: MkDocsConfig):
        """
        Initialize renderer.

        Arguments:
            env: The Jinja environment.
            config: The MkDocs configuration.
        """
        self.env = env
        self.config = config

    # -------------------------------------------------------------------------

    env: Environment
    """
    The Jinja environment.
    """

    config: MkDocsConfig
    """
    The MkDocs configuration.
    """

    # -------------------------------------------------------------------------

    def render(self, page: Page, name: str, **kwargs) -> str:
        """
        Render a template.

        Templates are resolved from `fragments/tags`, so if you want to override
        templates or provide additional ones place them in this directory.

        Arguments:
            page: The page.
            name: The name of the template.
            kwargs: The template variables.

        Returns:
            The rendered template.
        """
        path = posixpath.join("fragments", "tags", name)
        path = posixpath.normpath(path)

        # Resolve and render template
        template = self.env.get_template(path)
        return template.render(
            config = self.config, page = page,
            base_url = get_relative_url(".", page.url),
            **kwargs
        )
