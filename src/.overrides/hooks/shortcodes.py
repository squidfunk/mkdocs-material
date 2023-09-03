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
        elif type == "setting":      return setting(args)
        elif type == "default":      return default(args, page, files)

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
    icon = ":material-tag-outline:"
    legend_anchor = "version \"Minimum version\""
    if spec.startswith("insiders-"):
        file = files.get_file_from_path("insiders/changelog.md")
        icon = ":material-tag-heart-outline:"
        legend_anchor = "version-insiders \"Minimum version\""

    # Return link
    legend = files.get_file_from_path("philosophy.md")
    anchor = spec.replace("insiders-", "")
    return (
        f"[{icon}]"
        f"({legend.url_relative_to(page.file)}#{legend_anchor}) "
        f"[{spec}]"
        f"({file.url_relative_to(page.file)}#{anchor})"
    )

 # Create a link to the Insiders page
def sponsors(page: Page, files: Files):
    file = files.get_file_from_path("insiders/index.md")

    # Return link
    return (
        f"[:material-heart:{{ .mdx-heart }} Sponsors only]"
        f"({file.url_relative_to(page.file)}){{ .mdx-insiders }}"
    )

# Create a flag of a specific type
def flag(args: str):
    type, *rest = args.split(" ", 1)
    if   type == "experimental": return f"[:material-flask-outline:](# \"Experimental\")"
    elif type == "feature":      return f"[:material-flag:](# \"Feature flag\") {rest[0] if rest else ''}"
    elif type == "plugin":       return f"[:material-floppy:](# \"Plugin\") {rest[0] if rest else ''}"
    elif type == "required":     return f"[:material-alert:](# \"Required value\")"
    elif type == "metadata":     return f"[:material-list-box-outline:](# \"Metadata\")"
    elif type == "deprecated":   return f"[:material-archive-outline:](# \"Deprecated\") {rest[0] if rest else ''}"
    # elif type == "removed":      return f"[:material-trash-can-outline:](# \"Removed\") {rest[0] if rest else ''}"
    # @todo: removed should carry a version

# Create a default value
def default(args: str, page: Page, files: Files):
    file = files.get_file_from_path("philosophy.md")
    href = file.url_relative_to(page.file)
    return f"[:material-water:]({href}#default \"Default value\") {args}"

# Create a linkable option
def option(type: str):
    _, *_, name = re.split(r"[.:]", type)
    return f"[`{name}`](#+{type}){{ #+{type} }}\n\n"

# Create a linkable setting - @todo append them to the bottom of the page!
def setting(type: str):
    _, *_, name = re.split(r"[.*]", type)
    return f"`{name}` {{ #{type} }}\n\n[{type}]: #{type}\n\n"
