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
from material.plugins.tags.structure.tag import Tag
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
            mapping.tags.add(self._configure(tag))

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

    # -------------------------------------------------------------------------

    def _configure(self, tag: Tag) -> Tag:
        """
        Configure tag.

        This method is called by the mapping manager to configure a tag for the
        the tag structure. Depending on the configuration, the tag is expanded
        into a hierarchy of tags, and can be marked as hidden if it is a shadow
        tag, hiding it from mappings and listings when rendering.

        Arguments:
            tag: The tag.

        Returns:
            The configured tag.
        """
        if self.config.tags_hierarchy:
            return self._configure_hierarchy(tag)
        else:
            return self._configure_shadow(tag, tag.name)

    def _configure_hierarchy(self, tag: Tag) -> Tag:
        """
        Configure hierarchical tag.

        Note that shadow tags that occur as part of a tag hierarchy propagate
        their hidden state to all of their children.

        Arguments:
            tag: The tag.

        Returns:
            The configured tag.
        """
        separator = self.config.tags_hierarchy_separator
        root, *rest = tag.name.split(separator)

        # Create tag root and hierarchy
        tag = self._configure_shadow(Tag(root), root)
        for name in rest:
            tag = self._configure_shadow(Tag(
                separator.join([tag.name, name]),
                parent = tag, hidden = tag.hidden
            ), name)

        # Return tag
        return tag

    def _configure_shadow(self, tag: Tag, name: str) -> Tag:
        """
        Configure shadow tag.

        Regardless of the configuration, tags are always marked as hidden if
        they're classified as shadow tags, e.g., if their name matches the
        configured shadow prefix or suffix, or if they're part of the list of
        shadow tags. Whether they're displayed is decided before rendering.

        The tag name must be passed separately, as it may be different from the
        tag's name, e.g., when creating a tag hierarchy. In this case, the name
        represents the part that was added to the tag, essentially the suffix.
        The name is checked for shadow prefixes and suffixes.

        Arguments:
            tag: The tag.
            name: The tag name.

        Returns:
            The configured tag.
        """
        if not tag.hidden:
            tag.hidden = tag in self.config.shadow_tags

        # Check if tag matches shadow prefix, if defined
        if not tag.hidden and self.config.shadow_tags_prefix:
            tag.hidden = name.startswith(self.config.shadow_tags_prefix)

        # Check if tag matches shadow suffix, if defined
        if not tag.hidden and self.config.shadow_tags_suffix:
            tag.hidden = name.endswith(self.config.shadow_tags_suffix)

        # Return tag
        return tag

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
