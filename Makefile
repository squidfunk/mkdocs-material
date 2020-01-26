# Copyright (c) 2016-2019 Martin Donath <martin.donath@squidfunk.com>

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

all: clean lint build

# -----------------------------------------------------------------------------
# Constants
# -----------------------------------------------------------------------------

# Directory for NPM executables
BIN = $(shell npm bin)

# -----------------------------------------------------------------------------
# Rules
# -----------------------------------------------------------------------------

# Build distribution files
build: material

# Clean distribution files
clean:
	rm -rf material

# Lint source files
lint:
	${BIN}/tslint -p tsconfig.json "src/**/*.ts"
	${BIN}/stylelint `find src/assets -name *.scss`

# Start development server
start:
	@ NODE_ENV=development ${BIN}/nodemon --quiet \
		--watch src --ext html,scss,ts,tsx \
		--exec make build

# -----------------------------------------------------------------------------
# Targets
# -----------------------------------------------------------------------------

# Create top-level build directory
material/.:
	@ echo "+ $@"
	@ mkdir -p $@

# Create secondary build directory
material%/.:
	@ echo "+ $@"
	@ mkdir -p $@

# -----------------------------------------------------------------------------

# Expand prerequisites twice
.SECONDEXPANSION:

# -----------------------------------------------------------------------------

# Web font specimen
FONTS_SPECIMEN = src/assets/fonts/specimen
material/assets/fonts/specimen: ${FONTS_SPECIMEN} | $$(@D)/.
	@ echo "+ $@"
	@ cp -r $< $@

# Web fonts
FONTS = $(subst src,material,$(wildcard src/assets/fonts/*.css))
material/assets/fonts: $$@/specimen ${FONTS}
material/assets/fonts/%.css: src/assets/fonts/%.css | $$(@D)/.
	@ echo "+ $@"
	@ ${BIN}/csso $< -o $@

# -----------------------------------------------------------------------------

# Icons (FontAwesome)
IMAGES_ICONS_FONTAWESOME = node_modules/@fortawesome/fontawesome-free/svgs
material/assets/images/icons/fontawesome: ${IMAGES_ICONS_FONTAWESOME} | $$(@D)/.
	@ echo "+ $@"
	@ cp -r $< $@

# Images
IMAGES = $(subst src,material,$(wildcard src/assets/images/*.png))
material/assets/images: $$@/icons/fontawesome ${IMAGES}
material/assets/images/%.png: src/assets/images/%.png | $$(@D)/.
	@ echo "+ $@"
	@ cp $< $@

# -----------------------------------------------------------------------------

# Search stemmers
SCRIPT_LUNR = node_modules/lunr-languages/min
material/assets/javascripts/lunr: ${SCRIPT_LUNR} | $$(@D)/.
	@ echo "+ $@"
	@ cp -r $< $@
	@ cp node_modules/lunr-languages/tinyseg.js $@

# -----------------------------------------------------------------------------

# Scripts
SCRIPT = src/assets/javascripts/index.ts
SCRIPT_PARTIALS = $(shell find src -name "*.ts*")
material/assets/javascripts: $$@/lunr material/assets/javascripts/bundle.js
material/assets/javascripts/bundle.js: ${SCRIPT} ${SCRIPT_PARTIALS} | $$(@D)/.
	@ echo "+ $@"
	@ ${BIN}/webpack --mode production

# -----------------------------------------------------------------------------

# Stylesheets
STYLESHEETS = $(subst src,material,$(wildcard src/assets/stylesheets/a*.scss))
STYLESHEETS_PARTIALS = $(shell find src -name "_*.scss")
material/assets/stylesheets: $(patsubst %.scss,%.css,${STYLESHEETS})
material/%.css: src/%.scss ${STYLESHEETS_PARTIALS} | $$(@D)/.
	@ echo "+ $@"
	@ ${BIN}/node-sass -q \
		--source-map $@.map \
		--source-map-contents false \
		--include-path node_modules/modularscale-sass/stylesheets \
		--include-path node_modules/material-design-color \
		--include-path node_modules/material-shadows \
		$< $@
	@ ${BIN}/postcss $@ -m -u autoprefixer -u css-mqpacker -o $@
	@ ${BIN}/csso $@ -o $(basename $@).min.css \
		--input-source-map $@.map \
		--source-map $(basename $@).min.css.map

# -----------------------------------------------------------------------------

# Assets
material/assets: $$@/fonts $$@/images $$@/javascripts $$@/stylesheets

# -----------------------------------------------------------------------------

# Templates
HTML = $(subst src,material,$(shell find src -name "*.html" ))
material/%.html: src/%.html | $$(@D)/.
	@ echo "+ $@"
	@ ${BIN}/html-minifier \
		--collapse-boolean-attributes \
		--minify-css \
		--minify-js \
		--no-include-auto-generated-tags \
		--remove-comments \
		--remove-script-type-attributes \
		--remove-style-link-type-attributes \
		$< | awk 'NF' | cat .banner - > $@

# Python files
material/%.py: src/%.py
	@ echo "+ $@"
	@ cp $< $@

# Theme configuration
material/%.yml: src/%.yml
	@ echo "+ $@"
	@ cp $< $@

# Theme
NAME = $(shell jq -r '.name' package.json)
VERSION = $(shell jq -r '.version' package.json)
material: $$@/assets $$@/__init__.py $$@/mkdocs_theme.yml ${HTML}
	@ sed -i.tmp \
		-e 's/\$$md-name\$$/${NAME}/' \
		-e 's/\$$md-version\$$/${VERSION}/' \
		$@/base.html; rm -f $@/base.html.tmp
	@ echo "\n  ${NAME}-${VERSION}\n"

# -----------------------------------------------------------------------------

# Special targets
.PHONY: .FORCE build clean lint start
.FORCE:

# Keep directories
.PRECIOUS: material%/.
