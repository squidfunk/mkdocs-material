# Copyright (c) 2016-2023 Martin Donath <martin.donath@squidfunk.com>

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

import re

from mkdocs.config.defaults import MkDocsConfig
from mkdocs.structure.files import File, Files
from mkdocs.structure.pages import Page
from re import Match

# -----------------------------------------------------------------------------
# Hooks
# -----------------------------------------------------------------------------

# @todo
def on_page_markdown(
    markdown: str, *, page: Page, config: MkDocsConfig, files: Files
):

    # Replace callback
    def replace(match: Match):
        type, args = match.groups()
        args = args.strip()

        # Version link -
        if   type == "version":      return version(args, page, files)
        elif type == "sponsors":     return sponsors(page, files)
        elif type == "flag":         return flag(args)
        elif type == "option":       return option(args)

        # Otherwise, raise an error
        raise RuntimeError(f"Unknown shortcode: {type}")

    # Find and replace all external asset URLs in current page
    return re.sub(
        r"<!-- md:(\w+)(.*?) -->",
        replace, markdown, flags = re.I | re.M
    )

# -----------------------------------------------------------------------------
# Helper functions
# -----------------------------------------------------------------------------

# Create a link to the section of the given version in the changelog
def version(spec: str, page: Page, files: Files):
    file = file = files.get_file_from_path("changelog/index.md")
    if spec.startswith("insiders-"):
        file = files.get_file_from_path("insiders/changelog.md")

    # Return link
    anchor = spec.replace("insiders-", "")
    return (
        f"[:octicons-tag-24: {spec}]"
        f"({file.url_relative_to(page.file)}#{anchor})"
    )

 # Create a link to the Insiders page
def sponsors(page: Page, files: Files):
    file = files.get_file_from_path("insiders/index.md")

    # Return link
    return (
        f"[:octicons-heart-fill-24:{{ .mdx-heart }} Sponsors only]"
        f"({file.url_relative_to(page.file)}){{ .mdx-insiders }}"
    )

# Create a flag of a specific type
def flag(type: str):
    if   type == "experimental": return ":octicons-beaker-24: Experimental"
    elif type == "feature":      return ":octicons-unlock-24: Feature flag"
    elif type == "plugin":       return ":octicons-cpu-24: Plugin"

# Create a linkable option
def option(type: str):
    _, name = re.split(r"[.:]", type, 1)
    return f"[`{name}`](#+{type}){{ #+{type} }}"
