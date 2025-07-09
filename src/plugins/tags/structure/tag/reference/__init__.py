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

from material.plugins.tags.structure.tag import Tag
from mkdocs.structure.nav import Link

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

class TagReference(Tag):
    """
    A tag reference.

    Tag references are a subclass of tags that can have associated links, which
    is primarily used for linking tags to listings. The first link is used as
    the canonical link, which by default points to the closest listing that
    features the tag. This is considered to be the canonical listing.
    """

    def __init__(self, tag: Tag, links: list[Link] | None = None):
        """
        Initialize the tag reference.

        Arguments:
            tag: The tag.
            links: The links associated with the tag.
        """
        super().__init__(**vars(tag))
        self.links = links or []

    def __repr__(self) -> str:
        """
        Return a printable representation of the tag reference.

        Returns:
            Printable representation.
        """
        return f"TagReference('{self.name}')"

    # -------------------------------------------------------------------------

    links: list[Link]
    """
    The links associated with the tag.
    """

    # -------------------------------------------------------------------------

    @property
    def url(self) -> str | None:
        """
        Return the URL of the tag reference.

        Returns:
            The URL of the tag reference.
        """
        if self.links:
            return self.links[0].url
        else:
            return None
