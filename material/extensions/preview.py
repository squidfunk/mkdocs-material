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

from material.utilities.filter import FileFilter, FilterConfig
from mkdocs.structure.pages import _RelativePathTreeprocessor
from markdown import Extension, Markdown
from markdown.treeprocessors import Treeprocessor
from mkdocs.exceptions import ConfigurationError
from urllib.parse import urlparse
from xml.etree.ElementTree import Element

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

class PreviewProcessor(Treeprocessor):
    """
    A Markdown treeprocessor to enable instant previews on links.

    Note that this treeprocessor is dependent on the `relpath` treeprocessor
    registered programmatically by MkDocs before rendering a page.
    """

    def __init__(self, md: Markdown, config: dict):
        """
        Initialize the treeprocessor.

        Arguments:
            md: The Markdown instance.
            config: The configuration.
        """
        super().__init__(md)
        self.config = config

    def run(self, root: Element):
        """
        Run the treeprocessor.

        Arguments:
            root: The root element of the parsed Markdown document.
        """
        at = self.md.treeprocessors.get_index_for_name("relpath")

        # Hack: Python Markdown has no notion of where it is, i.e., which file
        # is being processed. This seems to be a deliberate design decision, as
        # it is not possible to access the file path of the current page, but
        # it might also be an oversight that is now impossible to fix. However,
        # since this extension is only useful in the context of Material for
        # MkDocs, we can assume that the _RelativePathTreeprocessor is always
        # present, telling us the file path of the current page. If that ever
        # changes, we would need to wrap this extension in a plugin, but for
        # the time being we are sneaky and will probably get away with it.
        processor = self.md.treeprocessors[at]
        if not isinstance(processor, _RelativePathTreeprocessor):
            raise TypeError("Relative path processor not registered")

        # Normalize configurations
        configurations = self.config["configurations"]
        configurations.append({
            "sources": self.config.get("sources"),
            "targets": self.config.get("targets")
        })

        # Walk through all configurations - @todo refactor so that we don't
        # iterate multiple times over the same elements
        for configuration in configurations:

            # Skip, if the configuration defines nothing – we could also fix
            # this in the file filter, but we first fix it here and check if
            # it generalizes well enough to other inclusion/exclusion sites,
            # because here, it would hinder the ability to automaticaly
            # include all sources, while excluding specific targets.
            if (
                not configuration.get("sources") and
                not configuration.get("targets")
            ):
                continue

            # Skip if page should not be considered
            filter = get_filter(configuration, "sources")
            if not filter(processor.file):
                continue

            # Walk through all links and add preview attributes
            filter = get_filter(configuration, "targets")
            for el in root.iter("a"):
                href = el.get("href")
                if not href:
                    continue

                # Skip footnotes
                if "footnote-ref" in el.get("class", ""):
                    continue

                # Skip external links
                url = urlparse(href)
                if url.scheme or url.netloc:
                    continue

                # Add preview attribute to internal links
                for path in processor._possible_target_uris(
                    processor.file, url.path,
                    processor.config.use_directory_urls
                ):
                    target = processor.files.get_file_from_path(path)
                    if not target:
                        continue

                    # Include, if filter matches
                    if filter(target):
                        el.set("data-preview", "")

# -----------------------------------------------------------------------------

class PreviewExtension(Extension):
    """
    A Markdown extension to enable instant previews on links.

    This extensions allows to automatically add the `data-preview` attribute to
    internal links matching specific criteria, so Material for MkDocs renders a
    nice preview on hover as part of a tooltip. It is the recommended way to
    add previews to links in a programmatic way.
    """

    def __init__(self, *args, **kwargs):
        """
        """
        self.config = {
            "configurations": [[], "Filter configurations"],
            "sources": [{}, "Link sources"],
            "targets": [{}, "Link targets"]
        }
        super().__init__(*args, **kwargs)

    def extendMarkdown(self, md: Markdown):
        """
        Register Markdown extension.

        Arguments:
            md: The Markdown instance.
        """
        md.registerExtension(self)

        # Create and register treeprocessor - we use the same priority as the
        # `relpath` treeprocessor, the latter of which is guaranteed to run
        # after our treeprocessor, so we can check the original Markdown URIs
        # before they are resolved to URLs.
        processor = PreviewProcessor(md, self.getConfigs())
        md.treeprocessors.register(processor, "preview", 0)

# -----------------------------------------------------------------------------
# Functions
# -----------------------------------------------------------------------------

def get_filter(settings: dict, key: str):
    """
    Get file filter from settings.

    Arguments:
        settings: The settings.
        key: The key in the settings.

    Returns:
        The file filter.
    """
    config = FilterConfig()
    config.load_dict(settings.get(key) or {})

    # Validate filter configuration
    errors, warnings = config.validate()
    for _, w in warnings:
        log.warning(
            f"Error reading filter configuration in '{key}':\n"
            f"{w}"
        )
    for _, e in errors:
        raise ConfigurationError(
            f"Error reading filter configuration in '{key}':\n"
            f"{e}"
        )

    # Return file filter
    return FileFilter(config = config) # type: ignore

def makeExtension(**kwargs):
    """
    Register Markdown extension.

    Arguments:
        **kwargs: Configuration options.

    Returns:
        The Markdown extension.
    """
    return PreviewExtension(**kwargs)

# -----------------------------------------------------------------------------
# Data
# -----------------------------------------------------------------------------

# Set up logging
log = logging.getLogger("mkdocs.material.extensions.preview")
