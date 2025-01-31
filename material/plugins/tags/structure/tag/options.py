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

from collections.abc import Iterable
from mkdocs.config.base import BaseConfigOption, ValidationError
from typing import Set

from . import Tag

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

class TagSet(BaseConfigOption[Set[Tag]]):
    """
    Setting for a set of tags.

    This setting describes a set of tags, and is used to validate the actual
    tags as defined in the front matter of pages, as well as for filters that
    are used to include or exclude pages from a listing and to check if a tag
    is allowed to be used.
    """

    def __init__(self, *, allowed: set[Tag] = set()):
        """
        Initialize the setting.

        Arguments:
            allowed: The tags allowed to be used.
        """
        super().__init__()
        self.allowed = allowed

    # -------------------------------------------------------------------------

    allowed: set[Tag]
    """
    The tags allowed to be used.
    """

    # -------------------------------------------------------------------------

    def run_validation(self, value: object) -> set[Tag]:
        """
        Validate list of tags.

        If the value is `None`, an empty set is returned. Otherwise, the value
        is expected to be a list of tags, which is converted to a set of tags.
        This means that tags are automatically deduplicated. Note that tags are
        not expanded here, as the set is intended to be checked exactly.

        Arguments:
            value: The value to validate.

        Returns:
            A set of tags.
        """
        if value is None:
            return set()

        # Ensure tags are iterable
        if not isinstance(value, Iterable) or isinstance(value, str):
            raise ValidationError(
                f"Expected iterable tags, but received: {value}"
            )

        # Ensure tags are valid
        tags: set[Tag] = set()
        for index, tag in enumerate(value):
            if not isinstance(tag, (str, int, float, bool)):
                raise ValidationError(
                    f"Expected a {str}, {int}, {float} or {bool} "
                    f"but received: {type(tag)} at index {index}"
                )

            # Coerce tag to string and add to set
            tags.add(Tag(str(tag)))

        # Ensure tags are in allow list, if any
        if self.allowed:
            invalid = tags.difference(self.allowed)
            if invalid:
                raise ValidationError(
                    "Tags not in allow list: " +
                    ",".join([tag.name for tag in invalid])
                )

        # Return set of tags
        return tags
