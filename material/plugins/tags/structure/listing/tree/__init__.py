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
from functools import total_ordering
from material.plugins.tags.structure.mapping import Mapping
from material.plugins.tags.structure.tag import Tag

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

@total_ordering
class ListingTree:
    """
    A listing tree.

    This is an internal data structure that is used to render listings. It is
    also the immediate structure that is passed to the template.
    """

    def __init__(self, tag: Tag):
        """
        Initialize the listing tree.

        Arguments:
            tag: The tag.
        """
        self.tag = tag
        self.content = None
        self.mappings = []
        self.children = {}

    def __repr__(self) -> str:
        """
        Return a printable representation of the listing tree.

        Returns:
            Printable representation.
        """
        return _print(self)

    def __hash__(self) -> int:
        """
        Return the hash of the listing tree.

        Returns:
            The hash.
        """
        return hash(self.tag)

    def __iter__(self) -> Iterator[ListingTree]:
        """
        Iterate over subtrees of the listing tree.

        Yields:
            The current subtree.
        """
        return iter(self.children.values())

    def __eq__(self, other: ListingTree) -> bool:
        """
        Check if the listing tree is equal to another listing tree.

        Arguments:
            other: The other listing tree to check.

        Returns:
            Whether the listing trees are equal.
        """
        assert isinstance(other, ListingTree)
        return self.tag == other.tag

    def __lt__(self, other: ListingTree) -> bool:
        """
        Check if the listing tree is less than another listing tree.

        Arguments:
            other: The other listing tree to check.

        Returns:
            Whether the listing tree is less than the other listing tree.
        """
        assert isinstance(other, ListingTree)
        return self.tag < other.tag

    # -------------------------------------------------------------------------

    tag: Tag
    """
    The tag.
    """

    content: str | None
    """
    The rendered content of the listing tree.

    This attribute holds the result of rendering the `tag.html` template, which
    is the rendered tag as displayed in the listing. It is essential that this
    is done for all tags (and nested tags) before rendering the tree, as the
    rendering process of the listing tree relies on this attribute.
    """

    mappings: list[Mapping]
    """
    The mappings associated with the tag.
    """

    children: dict[Tag, ListingTree]
    """
    The subtrees of the listing tree.
    """

# -----------------------------------------------------------------------------
# Functions
# -----------------------------------------------------------------------------

def _print(tree: ListingTree, indent: int = 0) -> str:
    """
    Return a printable representation of a listing tree.

    Arguments:
        tree: The listing tree.
        indent: The indentation level.

    Returns:
        Printable representation.
    """
    lines: list[str] = []
    lines.append(" " * indent + f"ListingTree({repr(tree.tag)})")

    # Print mappings
    for mapping in tree.mappings:
        lines.append(" " * (indent + 2) + repr(mapping))

    # Print subtrees
    for child in tree.children.values():
        lines.append(_print(child, indent + 2))

    # Concatenate everything
    return "\n".join(lines)
