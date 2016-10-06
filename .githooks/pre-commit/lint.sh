#!/bin/bash

# Copyright (c) 2016 Martin Donath <martin.donath@squidfunk.com>

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

# Checking if all changes are added to the index
CWD_CLEAN="$(git diff-index HEAD --)"

# This variables stores the state of the stash.
#   0 = not restored yet.
#   1 = stash was already reset
STASH_POPPED=0

# Pop the stash in case of trap
function cleanup {
  if test -n "$CWD_CLEAN"; then
    if test "$STASH_POPPED" != 1 ; then
      # Pop the changes (= stash) back to the work space
      git stash pop -q
	  fi
  fi
	exit
}

# Register signal handler
trap cleanup SIGHUP SIGINT SIGTERM

# Stash all changes that were not added to the commit
if test -n "$CWD_CLEAN"; then
  git stash -q --keep-index --include-untracked
fi

# Run the check and print indicator
echo "Hook[pre-commit]: Running linter..."
STD_OUT=$(npm run pre-commit --silent)

# Grab exit code of check
HAD_ERROR=$?

# Pop the changes (= stash) back to the work space
if test -n "$CWD_CLEAN"; then
  git stash pop -q
  STASH_POPPED=1
fi

# In case of error, print output of check
if test "$HAD_ERROR" != 0 ; then
  echo ${STD_OUT}
  exit 1
fi

# Reset indicator and exit
exit 0
