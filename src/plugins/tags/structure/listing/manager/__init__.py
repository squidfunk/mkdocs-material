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
import posixpath
import re
import yaml

from collections.abc import Iterable, Iterator
from material.plugins.tags.config import TagsConfig
from material.plugins.tags.renderer import Renderer
from material.plugins.tags.structure.listing import Listing, ListingConfig
from material.plugins.tags.structure.listing.tree import ListingTree
from material.plugins.tags.structure.mapping import Mapping
from material.plugins.tags.structure.tag import Tag
from material.plugins.tags.structure.tag.reference import TagReference
from mkdocs.exceptions import PluginError
from mkdocs.structure.pages import Page
from mkdocs.structure.nav import Link
from re import Match
from urllib.parse import urlparse

from . import toc

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

class ListingManager:
    """
    A listing manager.

    The listing manager collects all listings from the Markdown of pages, then
    populates them with mappings, and renders them. Furthermore, the listing
    manager allows to obtain tag references for a given mapping, which are
    tags annotated with links to listings.
    """

    def __init__(self, config: TagsConfig, depth: int = 6):
        """
        Initialize the listing manager.

        Arguments:
            config: The configuration.
        """
        self.config = config
        self.data = set()
        self.depth = depth

    def __repr__(self) -> str:
        """
        Return a printable representation of the listing manager.

        Returns:
            Printable representation.
        """
        return _print(self)

    def __iter__(self) -> Iterator[Listing]:
        """
        Iterate over listings.

        Yields:
            The current listing.
        """
        return iter(self.data)

    def __and__(self, mapping: Mapping) -> Iterator[TagReference]:
        """
        Iterate over the tag references for the mapping.

        Arguments:
            mapping: The mapping.

        Yields:
            The current tag reference.
        """
        assert isinstance(mapping, Mapping)

        # Iterate over sorted tags and associate tags with listings - note that
        # we sort the listings for the mapping by closeness, so that the first
        # listing in the list is the closest one to the page or link the
        # mapping is associated with
        listings = self.closest(mapping)
        for tag in self._sort_tags(mapping.tags):
            ref = TagReference(tag)

            # Iterate over listings and add links
            for listing in listings:
                if tag in listing & mapping:
                    value = listing.page.url or "."

                    # Compute URL for link - make sure to remove fragments, as
                    # they may be present in links extracted from remote tags.
                    # Additionally, we need to fallback to `.` if the URL is
                    # empty (= homepage) or the links will be incorrect.
                    url = urlparse(value, allow_fragments = False)
                    url = url._replace(fragment = self._slugify(tag))

                    # Add listing link to tag reference
                    ref.links.append(
                        Link(listing.page.title, url.geturl())
                    )

            # Yield tag reference
            yield ref

    # -------------------------------------------------------------------------

    config: TagsConfig
    """
    The configuration.
    """

    data: set[Listing]
    """
    The listings.
    """

    depth: int
    """
    Table of contents maximum depth.
    """

    # -------------------------------------------------------------------------

    def add(self, page: Page, markdown: str) -> str:
        """
        Add page.

        This method is called by the tags plugin to retrieve all listings of a
        page. It will parse the page's Markdown and add injections points into
        the page's Markdown, which will be replaced by the renderer with the
        actual listing later on.

        Note that this method is intended to be called with the page during the
        `on_page_markdown` event, as it modifies the page's Markdown. Moreover,
        the Markdown must be explicitly passed, as we could otherwise run into
        inconsistencies when other plugins modify the Markdown.

        Arguments:
            page: The page.
            markdown: The page's Markdown.

        Returns:
            The page's Markdown with injection points.
        """
        assert isinstance(markdown, str)

        # Replace callback
        def replace(match: Match) -> str:
            config = self._resolve(page, match.group(2))

            # Compute listing identifier - as the author might include multiple
            # listings on a single page, we must make sure that the identifier
            # is unique, so we use the page source file path and the position
            # of the match within the page as an identifier.
            id = f"{page.file.src_uri}:{match.start()}-{match.end()}"

            # Replace whitespaces in the identifier that we computed, or we
            # can't just prefix it with "#" - see https://t.ly/U_hfp
            id = id.replace(" ", "-")
            self.data.add(Listing(page, id, config))

            # Replace directive with hx headline if listings are enabled, or
            # remove the listing entirely from the page and table of contents
            if self.config.listings:
                return "#" * self.depth + f" {id}/name {{ #{id}/slug }}"
            else:
                return

        # Hack: replace directive with an hx headline to mark the injection
        # point for the anchor links we will generate after parsing all pages.
        # By using an hx headline, we can make sure that the injection point
        # will always be a child of the preceding headline.
        directive = self.config.listings_directive
        return re.sub(
            r"(<!--\s*?{directive}(.*?)\s*-->)".format(directive = directive),
            replace, markdown, flags = re.I | re.M | re.S
        )

    def closest(self, mapping: Mapping) -> list[Listing]:
        """
        Get listings for the mapping ordered by closeness.

        Listings are sorted by closeness to the given page, i.e. the number of
        common path components. This is useful for hierarchical listings, where
        the tags of a page point to the closest listing featuring the tag, with
        the option to show all listings featuring that tag.

        Arguments:
            mapping: The mapping.

        Returns:
            The listings.
        """

        # Retrieve listings featuring tags of mapping
        listings: list[Listing] = []
        for listing in self.data:
            if any(listing & mapping):
                listings.append(listing)

        # Ranking callback
        def rank(listing: Listing) -> int:
            path = posixpath.commonpath([mapping.item.url, listing.page.url])
            return len(path)

        # Return listings ordered by closeness to mapping
        return sorted(listings, key = rank, reverse = True)

    def populate(
        self, listing: Listing, mappings: Iterable[Mapping], renderer: Renderer
    ) -> None:
        """
        Populate listing with tags featured in the mappings.

        Arguments:
            listing: The listing.
            mappings: The mappings.
            renderer: The renderer.
        """
        page = listing.page
        assert isinstance(page.content, str)

        # Add mappings to listing
        for mapping in mappings:
            listing.add(mapping)

        # Sort listings and tags - we can only do this after all mappings have
        # been added to the listing, because the tags inside the mappings do
        # not have a proper order yet, and we need to order them as specified
        # in the listing configuration.
        listing.tags = self._sort_listing_tags(listing.tags)

        # Render tags for listing headlines - the listing configuration allows
        # tp specify a custom layout, so we resolve the template for tags here
        name = posixpath.join(listing.config.layout, "tag.html")
        for tree in listing:
            tree.content = renderer.render(page, name, tag = tree.tag)

            # Sort mappings and subtrees of  listing tree
            tree.mappings = self._sort_listing(tree.mappings)
            tree.children = self._sort_listing_tags(tree.children)

        # Replace callback
        def replace(match: Match) -> str:
            hx = match.group()

            # Populate listing with anchor links to tags
            anchors = toc.populate(listing, self._slugify)
            if not anchors:
                return

            # Get reference to first tag in listing
            head = next(iter(anchors.values()))

            # Replace hx with actual level of listing and listing ids with
            # placeholders to create a format string for the headline
            hx = re.sub(
                r"<(/?)h{}\b".format(self.depth),
                r"<\g<1>h{}".format(head.level), hx
            )
            hx = re.sub(
                r"{id}\/(\w+)".format(id = listing.id),
                r"{\1}", hx, flags = re.I | re.M
            )

            # Render listing headlines
            for tree in listing:
                tree.content = hx.format(
                    slug = anchors[tree.tag].id,
                    name = tree.content
                )

            # Render listing - the listing configuration allows to specify a
            # custom layout, so we resolve the template for listings here
            name = posixpath.join(listing.config.layout, "listing.html")
            return "\n".join([
                renderer.render(page, name, listing = tree)
                    for tree in listing.tags.values()
            ])

        # Hack: replace hx headlines (injection points) we added when parsing
        # the page's Markdown with the actual listing content. Additionally,
        # replace anchor links in the table of contents with the hierarchy
        # generated from mapping over the listing, or remove them.
        page.content = re.sub(
            r"<h{x}[^>]+{id}.*?</h{x}>".format(
                id = f"{listing.id}/slug", x = self.depth
            ),
            replace, page.content, flags = re.I | re.M
        )

    def populate_all(
        self, mappings: Iterable[Mapping], renderer: Renderer
    ) -> None:
        """
        Populate all listings with tags featured in the mappings.

        This method is called by the tags plugin to populate all listings with
        the given mappings. It will also remove the injection points from the
        page's Markdown. Note that this method is intended to be called during
        the `on_env` event, after all pages have been rendered.

        Arguments:
            mappings: The mappings.
            renderer: The renderer.
        """
        for listing in self.data:
            self.populate(listing, mappings, renderer)

    # -------------------------------------------------------------------------

    def _resolve(self, page: Page, args: str) -> ListingConfig:
        """
        Resolve listing configuration.

        Arguments:
            page: The page the listing in embedded in.
            args: The arguments, as parsed from Markdown.

        Returns:
            The listing configuration.
        """
        data = yaml.safe_load(args)
        path = page.file.abs_src_path

        # Try to resolve available listing configuration
        if isinstance(data, str):
            config = self.config.listings_map.get(data, None)
            if not config:
                keys = ", ".join(self.config.listings_map.keys())
                raise PluginError(
                    f"Couldn't find listing configuration: {data}. Available "
                    f"configurations: {keys}"
                )

        # Otherwise, handle inline listing configuration
        else:
            config = ListingConfig(config_file_path = path)
            config.load_dict(data or {})

            # Validate listing configuration
            errors, warnings = config.validate()
            for _, w in warnings:
                path = os.path.relpath(path)
                log.warning(
                    f"Error reading listing configuration in '{path}':\n"
                    f"{w}"
                )
            for _, e in errors:
                path = os.path.relpath(path)
                raise PluginError(
                    f"Error reading listing configuration in '{path}':\n"
                    f"{e}"
                )

        # Inherit layout configuration, unless explicitly set
        if not isinstance(config.layout, str):
            config.layout = self.config.listings_layout

        # Return listing configuration
        return config

    # -------------------------------------------------------------------------

    def _slugify(self, tag: Tag) -> str:
        """
        Slugify tag.

        Arguments:
            tag: The tag.

        Returns:
            The slug.
        """
        return self.config.tags_slugify_format.format(
            slug = self.config.tags_slugify(
                tag.name,
                self.config.tags_slugify_separator
            )
        )

    # -------------------------------------------------------------------------

    def _sort_listing(
        self, mappings: Iterable[Mapping]
    ) -> list[Mapping]:
        """
        Sort listing.

        When sorting a listing, we sort the mappings of the listing, which is
        why the caller must pass the mappings of the listing. That way, we can
        keep this implementation to be purely functional, without having to
        mutate the listing, which makes testing simpler.

        Arguments:
            mappings: The mappings.

        Returns:
            The sorted mappings.
        """
        return sorted(
            mappings,
            key = self.config.listings_sort_by,
            reverse = self.config.listings_sort_reverse
        )

    def _sort_listing_tags(
        self, children: dict[Tag, ListingTree]
    ) -> dict[Tag, ListingTree]:
        """
        Sort listing tags.

        When sorting a listing's tags, we sort the immediate subtrees of the
        listing, which is why the caller must pass the children of the listing.
        That way, we can keep this implementation to be purely functional,
        without having to mutate the listing.

        Arguments:
            children: The listing trees, each of which associated with a tag.

        Returns:
            The sorted listing trees.
        """
        return dict(sorted(
            children.items(),
            key = lambda item: self.config.listings_tags_sort_by(*item),
            reverse = self.config.listings_tags_sort_reverse
        ))

    def _sort_tags(
        self, tags: Iterable[Tag]
    ) -> list[Tag]:
        """
        Sort tags.

        Arguments:
            tags: The tags.

        Returns:
            The sorted tags.
        """
        return sorted(
            tags,
            key = self.config.tags_sort_by,
            reverse = self.config.tags_sort_reverse
        )

# -----------------------------------------------------------------------------
# Functions
# -----------------------------------------------------------------------------

def _print(manager: ListingManager, indent: int = 0) -> str:
    """
    Return a printable representation of a listing manager.

    Arguments:
        manager: The listing manager.
        indent: The indentation level.

    Returns:
        Printable representation.
    """
    lines: list[str] = []
    lines.append(" " * indent + f"ListingManager()")

    # Print listings
    for listing in manager:
        lines.append(" " * (indent + 2) + repr(listing))

    # Concatenate everything
    return "\n".join(lines)

# -----------------------------------------------------------------------------
# Data
# -----------------------------------------------------------------------------

# Set up logging
log = logging.getLogger("mkdocs.material.plugins.tags")
