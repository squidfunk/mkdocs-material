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

all: clean lint | build

# -----------------------------------------------------------------------------
# Prerequisites
# -----------------------------------------------------------------------------

# Install dependencies
node_modules: yarn.lock
	yarn install

# -----------------------------------------------------------------------------
# Targets
# -----------------------------------------------------------------------------

# Build theme for distribution
material: $(shell find src) webpack.config.js .babelrc
	$(shell yarn bin)/webpack --env.prod

# -----------------------------------------------------------------------------
# Rules
# -----------------------------------------------------------------------------

# Build theme
build: node_modules material

# Clean distribution files
clean:
	rm -rf material

# Lint source files
lint: node_modules
	$(shell yarn bin)/eslint --max-warnings 0 .
	$(shell yarn bin)/stylelint `find src/assets -name *.scss`

# Rebuild theme on changes
watch-webpack: node_modules clean
	$(shell yarn bin)/webpack --watch

# Serve documentation
watch-mkdocs: clean
	while [ ! -d "./material" ]; do sleep 1; done
	mkdocs serve

# Development mode
watch: node_modules watch-webpack watch-mkdocs

# -----------------------------------------------------------------------------

# Special targets
.PHONY: .FORCE build clean lint watch watch-mkdocs watch-webpack
.FORCE:
