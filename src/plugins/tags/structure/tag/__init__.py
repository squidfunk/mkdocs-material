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

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

@total_ordering
class Tag:
    """
    A tag.
    """

    def __init__(
        self, name: str, *, parent: Tag | None = None, hidden = False
    ):
        """
        Initialize the tag.

        Arguments:
            name: The tag name.
            parent: The parent tag.
            hidden: Whether the tag is hidden.
        """
        self.name = name
        self.parent = parent
        self.hidden = hidden

    def __repr__(self) -> str:
        """
        Return a printable representation of the tag.

        Returns:
            Printable representation.
        """
        return f"Tag('{self.name}')"

    def __str__(self) -> str:
        """
        Return a string representation of the tag.

        Returns:
            String representation.
        """
        return self.name

    def __hash__(self) -> int:
        """
        Return the hash of the tag.

        Returns:
            The hash.
        """
        return hash(self.name)

    def __iter__(self) -> Iterator[Tag]:
        """
        Iterate over the tag and its parent tags.

        Note that the first tag returned is the tag itself, followed by its
        parent tags in ascending order. This allows to iterate over the tag
        and its parents in a single loop, which is useful for generating
        tree or breadcrumb structures.

        Yields:
            The current tag.
        """
        tag = self
        while tag:
            yield tag
            tag = tag.parent

    def __contains__(self, other: Tag) -> bool:
        """
        Check if the tag contains another tag.

        Arguments:
            other: The other tag to check.

        Returns:
            Whether the tag contains the other tag.
        """
        assert isinstance(other, Tag)
        return any(tag == other for tag in self)

    def __eq__(self, other: Tag) -> bool:
        """
        Check if the tag is equal to another tag.

        Arguments:
            other: The other tag to check.

        Returns:
            Whether the tags are equal.
        """
        assert isinstance(other, Tag)
        return self.name == other.name

    def __lt__(self, other: Tag) -> bool:
        """
        Check if the tag is less than another tag.

        Arguments:
            other: The other tag to check.

        Returns:
            Whether the tag is less than the other tag.
        """
        assert isinstance(other, Tag)
        return self.name < other.name

    # -------------------------------------------------------------------------

    name: str
    """
    The tag name.
    """

    parent: Tag | None
    """
    The parent tag.
    """

    hidden: bool
    """
    Whether the tag is hidden.
    """
