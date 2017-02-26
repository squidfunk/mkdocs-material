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

# Patch file to store unindexed changes
PATCH_FILE=".working-tree.patch"
MESSAGE="Terminated with errors"

# Revert changes that have been registered in the patch file
function cleanup {
  EXIT_CODE=$?
  if [ -f "$PATCH_FILE" ]; then
    git apply "$PATCH_FILE" 2> /dev/null
    rm "$PATCH_FILE"
  fi
  exit $EXIT_CODE
}

# Register signal handlers
trap cleanup EXIT SIGINT SIGHUP

# Cancel any changes to the working tree that are not going to be committed
git diff > "$PATCH_FILE"
git checkout -- .

# Filter relevant files for linting
FILES=$(git diff --cached --name-only --diff-filter=ACMR | \
  grep "\.\(js\|jsx\|scss\)$")

# Run check and print indicator
if [ "$FILES" ]; then

  # If linter terminated with errors, abort commit
  if [ $? -gt 0 ]; then
    echo -e "\x1B[31m✗\x1B[0m Linter - \x1B[31m$MESSAGE\x1B[0m"
    exit 1
  else
    echo -e "\x1B[32m✓\x1B[0m Linter"
  fi

  # If flow terminated with errors, abort commit
  yarn run flow --silent
  if [ $? -gt 0 ]; then
    echo -e "\x1B[31m✗\x1B[0m Flow - \x1B[31m$MESSAGE\x1B[0m"
    exit 1
  else
    echo -e "\x1B[32m✓\x1B[0m Flow"
  fi
fi

# We're good
exit 0
