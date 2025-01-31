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

import logging
import os
import posixpath

from mergedeep import Strategy, merge
from mkdocs.exceptions import PluginError
from mkdocs.structure.files import InclusionLevel
from mkdocs.plugins import BasePlugin, event_priority
from yaml import SafeLoader, load

from .config import MetaConfig

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Meta plugin
class MetaPlugin(BasePlugin[MetaConfig]):

    # Construct metadata mapping
    def on_files(self, files, *, config):
        if not self.config.enabled:
            return

        # Initialize mapping
        self.meta = {}

        # Resolve and load meta files in docs directory
        docs = os.path.relpath(config.docs_dir)
        for file in files:
            name = posixpath.basename(file.src_uri)
            if not name == self.config.meta_file:
                continue

            # Exclude meta file from site directory - explicitly excluding the
            # meta file allows the author to use a file name without '.' prefix
            file.inclusion = InclusionLevel.EXCLUDED

            # Open file and parse as YAML
            with open(file.abs_src_path, encoding = "utf-8-sig") as f:
                path = file.src_path
                try:
                    self.meta[path] = load(f, SafeLoader)

                # The meta file could not be loaded because of a syntax error,
                # which we display to the author with a nice error message
                except Exception as e:
                    raise PluginError(
                        f"Error reading meta file '{path}' in '{docs}':\n"
                        f"{e}"
                    )

    # Set metadata for page, if applicable (run earlier)
    @event_priority(50)
    def on_page_markdown(self, markdown, *, page, config, files):
        if not self.config.enabled:
            return

        # Start with a clean state, as we first need to apply all meta files
        # that are relevant to the current page, and then merge the page meta
        # on top of that to ensure that the page meta always takes precedence
        # over meta files - see https://t.ly/kvCRn
        meta = {}

        # Merge matching meta files in level-order
        strategy = Strategy.TYPESAFE_ADDITIVE
        for path, defaults in self.meta.items():
            if not page.file.src_path.startswith(os.path.dirname(path)):
                continue

            # Skip if meta file was already merged - this happens in case of
            # blog posts, as they need to be merged when posts are constructed,
            # which is why we need to keep track of which meta files are applied
            # to what pages using the `__extends` key.
            page.meta.setdefault("__extends", [])
            if path in page.meta["__extends"]:
                continue

            # Try to merge metadata
            try:
                merge(meta, defaults, strategy = strategy)
                page.meta["__extends"].append(path)

            # Merging the metadata with the given strategy resulted in an error,
            # which we display to the author with a nice error message
            except Exception as e:
                docs = os.path.relpath(config.docs_dir)
                raise PluginError(
                    f"Error merging meta file '{path}' in '{docs}':\n"
                    f"{e}"
                )

        # Ensure page metadata is merged last, so the author can override any
        # defaults from the meta files, or even remove them entirely
        page.meta = merge(meta, page.meta, strategy = strategy)

# -----------------------------------------------------------------------------
# Data
# -----------------------------------------------------------------------------

# Set up logging
log = logging.getLogger("mkdocs.material.meta")
