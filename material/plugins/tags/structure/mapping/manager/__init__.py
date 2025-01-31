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

from collections.abc import Iterator
from material.plugins.tags.config import TagsConfig
from material.plugins.tags.structure.mapping import Mapping
from material.plugins.tags.structure.tag.options import TagSet
from mkdocs.structure.pages import Page

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

class MappingManager:
    """
    A mapping manager.

    The mapping manager is responsible for collecting all tags from the front
    matter of pages, and for building a tag structure from them, nothing more.
    """

    def __init__(self, config: TagsConfig):
        """
        Initialize the mapping manager.

        Arguments:
            config: The configuration.
        """
        self.config = config
        self.format = TagSet(allowed = self.config.tags_allowed)
        self.data = {}

    def __repr__(self) -> str:
        """
        Return a printable representation of the mapping manager.

        Returns:
            Printable representation.
        """
        return _print(self)

    def __iter__(self) -> Iterator[Mapping]:
        """
        Iterate over mappings.

        Yields:
            The current mapping.
        """
        return iter(self.data.values())

    # -------------------------------------------------------------------------

    config: TagsConfig
    """
    The configuration.
    """

    format: TagSet
    """
    The mapping format.

    This is the validator that is used to check if tags are valid, including
    the tags in the front matter of pages, as well as the tags defined in the
    configuration. Numbers and booleans are always converted to strings before
    creating tags, and the allow list is checked as well, if given.
    """

    data: dict[str, Mapping]
    """
    The mappings.
    """

    # -------------------------------------------------------------------------

    def add(self, page: Page, markdown: str) -> Mapping | None:
        """
        Add page.

        This method is called by the tags plugin to retrieve all tags of a page.
        It extracts all tags from the front matter of the given page, and adds
        them to the mapping. If no tags are found, no mapping is created and
        nothing is returned.

        Note that this method is intended to be called with the page during the
        `on_page_markdown` event, as it reads the front matter of a page. Also,
        the Markdown must be explicitly passed, as we could otherwise run into
        inconsistencies when other plugins modify the Markdown.

        Arguments:
            page: The page.
            markdown: The page's Markdown.

        Returns:
            The mapping or nothing.
        """
        assert isinstance(markdown, str)

        # Return nothing if page doesn't have tags
        tags = self.config.tags_name_property
        if not page.meta.get(tags, []):
            return

        # Create mapping and associate with page
        mapping = Mapping(page)
        self.data[page.url] = mapping

        # Retrieve and validate tags, and add to mapping
        for tag in self.format.validate(page.meta[tags]):
            mapping.tags.add(tag)

        # Return mapping
        return mapping

    def get(self, page: Page) -> Mapping | None:
        """
        Get mapping for page, if any.

        Arguments:
            page: The page.

        Returns:
            The mapping or nothing.
        """
        if page.url in self.data:
            return self.data[page.url]

# -----------------------------------------------------------------------------
# Functions
# -----------------------------------------------------------------------------

def _print(manager: MappingManager, indent: int = 0) -> str:
    """
    Return a printable representation of a mapping manager.

    Arguments:
        manager: The mapping manager.
        indent: The indentation level.

    Returns:
        Printable representation.
    """
    lines: list[str] = []
    lines.append(" " * indent + f"MappingManager()")

    # Print mappings
    for mapping in manager:
        lines.append(" " * (indent + 2) + repr(mapping))

    # Concatenate everything
    return "\n".join(lines)
