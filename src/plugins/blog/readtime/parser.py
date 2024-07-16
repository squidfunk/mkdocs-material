# Copyright (c) 2016-2024 Martin Donath <martin.donath@squidfunk.com>

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

from html.parser import HTMLParser

# TODO: Refactor the `void` set into a common module and import it from there
# and not from the search plugin.
from material.plugins.search.plugin import void

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Readtime parser
class ReadtimeParser(HTMLParser):

    # Initialize parser
    def __init__(self):
        super().__init__(convert_charrefs = True)

        # Tags to skip
        self.skip = set([
            "object",                  # Objects
            "script",                  # Scripts
            "style",                   # Styles
            "svg"                      # SVGs
        ])

        # Current context
        self.context = []

        # Keep track of text and images
        self.text   = []
        self.images = 0

    # Called at the start of every HTML tag
    def handle_starttag(self, tag, attrs):
        # Collect images
        if tag == "img":
            self.images += 1

        # Ignore self-closing tags
        if tag not in void:
            # Add tag to context
            self.context.append(tag)

    # Called for the text contents of each tag
    def handle_data(self, data):
        # Collect text if not inside skip context
        if not self.skip.intersection(self.context):
            self.text.append(data)

    # Called at the end of every HTML tag
    def handle_endtag(self, tag):
        if self.context and self.context[-1] == tag:
            # Remove tag from context
            self.context.pop()
