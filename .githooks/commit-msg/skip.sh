#!/bin/bash

# Copyright (c) 2016-2017 Martin Donath <martin.donath@squidfunk.com>

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

# Exit, if there's no .travisignore file
if [[ ! -a .travisignore ]]; then
	exit
fi

# Filter relevant files for linting
FILES=$(git diff --cached --name-only)

# Resolve the patterns we want to skip
BLACKLIST=$(< .travisignore)

# Remove the pattern from the list of changes
for f in $BLACKLIST; do
	FILES=( ${FILES[@]/$f/} )

  # If we've exhausted the list of changes before we've finished going
  # through patterns, that's okay, just quit the loop
	if [[ ${#FILES[@]} -eq 0 ]]; then
		break
	fi
done

# If there's changes left, then we have stuff to build, leave the commit alone
if [[ ${#FILES[@]} -gt 0 ]]; then
	exit
fi

# Don't build this commit
sed -i '' '1s/$/ [ci skip]/' "$1"

# We're good
exit 0
