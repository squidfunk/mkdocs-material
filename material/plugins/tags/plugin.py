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

import logging
import os
import re

from jinja2 import Environment
from material.utilities.filter import FileFilter
from mkdocs.config.defaults import MkDocsConfig
from mkdocs.exceptions import PluginError
from mkdocs.plugins import BasePlugin, event_priority
from mkdocs.structure.pages import Page
from mkdocs.utils.templates import TemplateContext

from .config import TagsConfig
from .renderer import Renderer
from .structure.listing.manager import ListingManager
from .structure.mapping.manager import MappingManager

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

class TagsPlugin(BasePlugin[TagsConfig]):
    """
    A tags plugin.
    """

    supports_multiple_instances = True
    """
    This plugin supports multiple instances.
    """

    def __init__(self, *args, **kwargs):
        """
        Initialize the plugin.
        """
        super().__init__(*args, **kwargs)

        # Initialize incremental builds
        self.is_serve = False

        # Initialize mapping and listing managers
        self.mappings = None
        self.listings = None

    # -------------------------------------------------------------------------

    mappings: MappingManager
    """
    Mapping manager.
    """

    listings: ListingManager
    """
    Listing manager.
    """

    filter: FileFilter
    """
    File filter.
    """

    # -------------------------------------------------------------------------

    def on_startup(self, *, command, **kwargs) -> None:
        """
        Determine whether we're serving the site.

        Arguments:
            command: The command that is being executed.
            dirty: Whether dirty builds are enabled.
        """
        self.is_serve = command == "serve"

    def on_config(self, config: MkDocsConfig) -> None:
        """
        Create mapping and listing managers.
        """

        # Retrieve toc depth, so we know the maximum level at which we can add
        # items to the table of contents - Python Markdown allows to set the
        # toc depth as a range, e.g. `2-6`, so we need to account for that as
        # well. We need this information for generating listings.
        depth = config.mdx_configs.get("toc", {}).get("toc_depth", 6)
        if not isinstance(depth, int) and "-" in depth:
            _, depth = depth.split("-")

        # Initialize mapping and listing managers
        self.mappings = MappingManager(self.config)
        self.listings = ListingManager(self.config, int(depth))

        # Initialize file filter - the file filter is used to include or exclude
        # entire subsections of the documentation, allowing for using multiple
        # instances of the plugin alongside each other. This can be necessary
        # when creating multiple, potentially conflicting listings.
        self.filter = FileFilter(self.config.filters)

        # Ensure presence of attribute lists extension
        for extension in config.markdown_extensions:
            if isinstance(extension, str) and extension.endswith("attr_list"):
                break
        else:
            config.markdown_extensions.append("attr_list")

    @event_priority(-50)
    def on_page_markdown(
        self, markdown: str, *, page: Page, config: MkDocsConfig, **kwargs
    ) -> str:
        """
        Collect tags and listings from page.

        Priority: -50 (run later)

        Arguments:
            markdown: The page's Markdown.
            page: The page.
            config: The MkDocs configuration.

        Returns:
            The page's Markdown with injection points.
        """
        if not self.config.enabled:
            return

        # Skip if page should not be considered
        if not self.filter(page.file):
            return

        # Handle deprecation of `tags_file` setting
        if self.config.tags_file:
            markdown = self._handle_deprecated_tags_file(page, markdown)

        # Collect tags from page
        try:
            self.mappings.add(page, markdown)

        # Raise exception if tags could not be read
        except Exception as e:
            docs = os.path.relpath(config.docs_dir)
            path = os.path.relpath(page.file.abs_src_path, docs)
            raise PluginError(
                    f"Error reading tags of page '{path}' in '{docs}':\n"
                    f"{e}"
                )

        # Collect listings from page
        return self.listings.add(page, markdown)

    @event_priority(100)
    def on_env(
        self, env: Environment, *, config: MkDocsConfig, **kwargs
    ) -> None:
        """
        Populate listings.

        Priority: 100 (run earliest)

        Arguments:
            env: The Jinja environment.
            config: The MkDocs configuration.
        """
        if not self.config.enabled:
            return

        # Populate and render all listings
        self.listings.populate_all(self.mappings, Renderer(env, config))

    def on_page_context(
        self, context: TemplateContext, *, page: Page, **kwargs
    ) -> None:
        """
        Add tag references to page context.

        Arguments:
            context: The template context.
            page: The page.
        """
        if not self.config.enabled:
            return

        # Skip if page should not be considered
        if not self.filter(page.file):
            return

        # Skip if tags should not be built
        if not self.config.tags:
            return

        # Retrieve tags references for page
        mapping = self.mappings.get(page)
        if mapping:
            tags = self.config.tags_name_variable
            if tags not in context:
                context[tags] = list(self.listings & mapping)

    # -------------------------------------------------------------------------

    def _handle_deprecated_tags_file(
        self, page: Page, markdown: str
    ) -> str:
        """
        Handle deprecation of `tags_file` setting.

        Arguments:
            page: The page.
        """
        directive = self.config.listings_directive
        if page.file.src_uri != self.config.tags_file:
            return markdown

        # Try to find the legacy tags marker and replace with directive
        if "[TAGS]" in markdown:
            markdown = markdown.replace(
                "[TAGS]", f"<!-- {directive} -->"
            )

        # Try to find the directive and add it if not present
        pattern = r"<!--\s+{directive}".format(directive = directive)
        if not re.search(pattern, markdown):
            markdown += f"\n<!-- {directive} -->"

        # Return markdown
        return markdown

# -----------------------------------------------------------------------------
# Data
# -----------------------------------------------------------------------------

# Set up logging
log = logging.getLogger("mkdocs.material.plugins.tags")
