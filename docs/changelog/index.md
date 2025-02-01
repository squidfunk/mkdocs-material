# Changelog

## Material for MkDocs

### 9.6.1 <small>January 31, 2025</small> { id="9.6.1" }

- Fixed #7943: Tags plugin crashing due to merge error

### 9.6.0 <small>January 31, 2025</small> { id="9.6.0" }

- Added meta plugin
- Rewrite of the tags plugin
- Added support for allow lists in tags plugin
- Added support for and custom sorting in tags plugin
- Added support for related links in blog plugin
- Added support for custom index pages in blog plugin
- Added support for navigation subtitles
- Fixed #7924: Anchors might require two clicks when using instant navigation

### 9.5.50 <small>January 18, 2025</small> { id="9.5.50" }

- Fixed #7913: Social plugin renders attribute lists in page title

### 9.5.49 <small>December 16, 2024</small> { id="9.5.49" }

- Adjusted title color in dark mode for all supported Mermaid.js diagrams
- Fixed #7803: Privacy plugin crashes on generated files
- Fixed #7781: Mermaid.js flow chart title not visible in dark mode

### 9.5.48 <small>December 8, 2024</small> { id="9.5.48" }

- Fixed #7774: Disabling social cards doesn't work

### 9.5.47 <small>December 1, 2024</small> { id="9.5.47" }

- Fixed #7750: Numeric tags break search
- Fixed #7748: Blog plugin breaks when using future drafts (9.5.45 regression)

### 9.5.46 <small>November 25, 2024</small> { id="9.5.46" }

- Added support for removing `preload` hints in privacy plugin
- Fixed #7734: Code blocks in h5 headlines are uppercased
- Fixed #7725: Blog plugin crashing on missing timezone (9.5.45 regression)

### 9.5.45 <small>November 20, 2024</small> { id="9.5.45" }

- Reduced size of Docker image through multi-stage build
- Fixed #7708: Blog plugin crashing on YAML dates with timezones

### 9.5.44 <small>November 5, 2024</small> { id="9.5.44" }

- Fixed #7672: Font CSS 404's when using privacy plugin (9.5.43 regression)

### 9.5.43 <small>October 31, 2024</small> { id="9.5.43" }

- Added support for external images in SVGs in privacy plugin
- Fixed #7651: Privacy plugin doesn't handle quoted URLs in CSS

### 9.5.42 <small>October 20, 2024</small> { id="9.5.42" }

- Fixed #7625: Invalid encoding of boolean attributes in privacy plugin
- Fixed #7624: Crash when disabling privacy plugin (9.5.41 regression)

### 9.5.41 <small>October 15, 2024</small> { id="9.5.41" }

- Fixed #7619: Improved tooltip on logo disappears after instant navigation
- Fixed #7616: Race condition in built-in privacy plugin when inlining assets
- Fixed #7615: Comments and "Was this page helpful?" visible when printing

### 9.5.40 <small>October 10, 2024</small> { id="9.5.40" }

- Updated Latvian translations
- Fixed #7597: Social cards not using site name on home page

### 9.5.39 <small>September 29, 2024</small> { id="9.5.39" }

- Fixed #7226: not staying on page when using mike's canonical versioning

### 9.5.38 <small>September 26, 2024</small> { id="9.5.38" }

- Added Albanian translations

### 9.5.37 <small>September 25, 2024</small> { id="9.5.37" }

- Added 4th and 5th level ordered list styles
- Fixed #7548: Tags have no spacing in search

### 9.5.36 <small>September 21, 2024</small> { id="9.5.36" }

- Fixed #7544: Social cards incorrectly rendering HTML entities
- Fixed #7542: Improved support for setting custom list styles

### 9.5.35 <small>September 18, 2024</small> { id="9.5.35" }

- Fixed #7498: Search not showing for Vietnamese language

### 9.5.34 <small>August 31, 2024</small> { id="9.5.34" }

- Updated Mermaid.js to version 11 (latest)

### 9.5.33 <small>August 23, 2024</small> { id="9.5.33" }

- Fixed #7453: Incorrect position of tooltip when sorting table

### 9.5.32 <small>August 19, 2024</small> { id="9.5.32" }

- Fixed RXSS vulnerability via deep link in search results
- Added support for fetching latest release from GitLab

### 9.5.31 <small>August 2, 2024</small> { id="9.5.31" }

- Fixed #7405: DockerHub missing images > 9.5.27 due to change in Alpine/APK

### 9.5.30 <small>July 23, 2024</small> { id="9.5.30" }

- Fixed #7380: Navigation icons disappearing on hover in Safari
- Fixed #7367: Blog readtime computation includes SVG text content

### 9.5.29 <small>July 14, 2024</small> { id="9.5.29" }

- Updated Galician translations
- Fixed #7362: Annotations in figure captions rendering incorrectly

### 9.5.28 <small>July 2, 2024</small> { id="9.5.28" }

- Fixed #7313: Improved tooltips mounted in sidebar when feature is disabled

### 9.5.27 <small>June 16, 2024</small> { id="9.5.27" }

- Updated Estonian translations

### 9.5.26 <small>June 6, 2024</small> { id="9.5.26" }

- Fixed #7232: Tab switches on scroll when linking tabs (9.5.19 regression)
- Fixed #7230: Blog author avatar broken when referring to local file

### 9.5.25 <small>May 27, 2024</small> { id="9.5.25" }

- Fixed #7209: Tags plugin crashing on numeric tags

### 9.5.24 <small>May 20, 2024</small> { id="9.5.24" }

- Fixed #7187: Version selector title rendering issue

### 9.5.23 <small>May 15, 2024</small> { id="9.5.23" }

- Fixed #7183: Edge case in anchor navigation when using instant navigation
- Fixed #6436: Version selector not showing version alias

### 9.5.22 <small>May 12, 2024</small> { id="9.5.22" }

- Fixed #7170: Copy button adds empty lines for line spans (9.5.18 regression)
- Fixed #7160: Version switching doesn't stay on page (9.5.5 regression)
- Fixed #5619: Links in Mermaid.js diagrams not discernible

### 9.5.21 <small>May 3, 2024</small> { id="9.5.21" }

- Fixed #7133: Ensure latest version of Mermaid.js is used
- Fixed #7125: Added warning for dotfiles in info plugin

### 9.5.20 <small>April 29, 2024</small> { id="9.5.20" }

- Fixed deprecation warning in privacy plugin (9.5.19 regression)
- Fixed #7119: Tags plugin emits deprecation warning (9.5.19 regression)
- Fixed #7118: Social plugin crashes if fonts are disabled (9.5.19 regression)
- Fixed #7085: Social plugin crashes on Windows when downloading fonts

### 9.5.19 <small>April 25, 2024</small> { id="9.5.19" }

- Updated MkDocs to 1.6 and limited version to < 2
- Updated Docker image to latest Alpine Linux
- Removed `setup.py`, now that GitHub fully understands `pyproject.toml`
- Improved interop of social plugin with third-party MkDocs themes
- Fixed #7099: Blog reading time not rendered correctly for Japanese
- Fixed #7097: Improved resilience of tags plugin when no tags are given
- Fixed #7090: Active tab indicator in nested content tabs rendering bug

### 9.5.18 <small>April 16, 2024</small> { id="9.5.18" }

- Refactored tooltips implementation to fix positioning issues
- Fixed #7044: Rendering glitch when hovering contributor avatar in Chrome
- Fixed #7043: Highlighted lines in code blocks cutoff on mobile
- Fixed #6910: Incorrect position of tooltip for page status in sidebar
- Fixed #6760: Incorrect position and overly long tooltip in tables
- Fixed #6488: Incorrect position and cutoff tooltip in content tabs

### 9.5.17 <small>April 2, 2024</small> { id="9.5.17" }

- Updated Serbian translations
- Fixed #7003: Confusing keyboard interaction for palette toggle
- Fixed #7001: Blog posts now show time by default (9.5.16 regression)
- Fixed edge case in backport of social plugin font loading logic

### 9.5.16 <small>March 31, 2024</small> { id="9.5.16" }

- Updated Russian translations
- Improved error handling and reporting in social plugin
- Improved error handling and reporting in privacy plugin
- Fixed blog plugin not allowing to use time in format strings
- Fixed #6983: Social plugin crashes because of Google Fonts API change

### 9.5.15 <small>March 23, 2024</small> { id="9.5.15" }

- Reverted fix for transparent iframes (9.5.14)
- Fixed #6929: Interference of social plugin and auto dark mode
- Fixed #6938: Giscus shows dark background in light mode (9.5.14 regression)

### 9.5.14 <small>March 18, 2024</small> { id="9.5.14" }

- Added support for hiding versions from selector when using mike
- Added init system to improve signal handling in Docker image
- Fixed edge cases in exclusion logic of info plugin
- Fixed inability to reset pipeline in search plugin
- Fixed syntax error in Finnish translations
- Fixed #6917: UTF-8 encoding problems in blog plugin on Windows
- Fixed #6889: Transparent iframes get background color

### 9.5.13 <small>March 6, 2024</small> { id="9.5.13" }

- Updated Slovak translations
- Improved info plugin interop with projects plugin
- Improved info plugin inclusion/exclusion logic
- Fixed info plugin not gathering files recursively
- Fixed #6750: Ensure info plugin packs up all necessary files

### 9.5.12 <small>February 29, 2024</small> { id="9.5.12" }

- Fixed #6846: Some meta tags removed on instant navigation (9.4.2 regression)
- Fixed #6823: KaTex not rendering on instant navigation (9.5.5 regression)
- Fixed #6821: Privacy plugin doesn't handle URLs with encoded characters

### 9.5.11 <small>February 24, 2024</small> { id="9.5.11" }

- Updated Finnish translation

### 9.5.10 <small>February 19, 2024</small> { id="9.5.10" }

- Updated Bahasa Malaysia translations
- Fixed #6783: Hide continue reading link for blog posts without separators
- Fixed #6779: Incorrect positioning of integrated table of contents

### 9.5.9 <small>February 10, 2024</small> { id="9.5.9" }

- Fixed navigation pruning with tabs and sections enabled

### 9.5.8 <small>February 7, 2024</small> { id="9.5.8" }

- Added Tamil translations
- Updated Esperanto translations
- Fixed relative images not being resolved for instant navigation

### 9.5.7 <small>February 3, 2024</small> { id="9.5.7" }

- Fixed #6731: Small images in figures are not centered
- Fixed #6719: Instant navigation breaks table of contents (9.5.5 regression)

### 9.5.6 <small>January 28, 2024</small> { id="9.5.6" }

- Fixed #6700: Missing styles for Mermaid.js labels with Markdown

### 9.5.5 <small>January 24, 2024</small> { id="9.5.5" }

- Updated Tagalog translations
- Updated Pillow to 10.2 to mitigate security vulnerabilities
- Improved resilience of instant navigation
- Fixed #6687: Updated Mermaid.js to version 10.7.0 (latest)
- Fixed #6652: Keyboard events in custom elements captured
- Fixed #6582: Instant navigation doesn't correctly handle alternate URLs
- Fixed #6565: Instant navigation doesn't allow for `onclick` handlers
- Fixed #6345: Instant navigation sometimes breaks browser back button
- Fixed #6334: Instant navigation doesn't correctly position anchors (Safari)
- Fixed #6275: Instant navigation doesn't correctly resolve after 404
- Fixed #6102: Instant navigation reloads page on same link navigation

### 9.5.4 <small>January 15, 2024</small> { id="9.5.4" }

- Fixed #6645: Local storage with invalid value can break site
- Fixed #6635: Tags icons before default ignored if default is set

### 9.5.3 <small>December 23, 2023</small> { id="9.5.3" }

- Limited version range of MkDocs to < 1.6
- Updated Macedonian translations
- Fixed #6520: Group plugin crashes when using mike
- Fixed #6494: Hide author's email address if disabled in git-authors plugin

### 9.5.2 <small>December 11, 2023</small> { id="9.5.2" }

- Fixed types for `slugify` settings in blog plugin config
- Fixed #6469: Horizontal scrollbars on MathJax containers

### 9.5.1 <small>December 8, 2023</small> { id="9.5.1" }

- Updated Greek translations
- Fixed #6464: Privacy plugin cannot be enabled
- Fixed #6461: Sorting blog posts ignores time component in date

### 9.5.0 <small>December 7, 2023</small> { id="9.5.0" }

Merged Insiders features of 'Goat's Horn' funding goal

- Added privacy plugin: automatic downloading of external assets
- Added support for card grids and grid layouts
- Added support for improved tooltips
- Added support for content tabs anchor links (deep linking)
- Added support for automatic dark/light mode
- Added support for document contributors

### 9.4.14 <small>November 26, 2023</small> { id="9.4.14" }

- Added support for linking authors in blog posts

### 9.4.13 <small>November 26, 2023</small> { id="9.4.13" }

- Fixed #6365: Blog plugin pagination links to previous pages broken
- Fixed #5758: Updated Mermaid.js to version 10.6.1 (latest)

### 9.4.12 <small>November 24, 2023</small> { id="9.4.12" }

- Improved blog plugin to generate Unicode-aware slugs by default
- Fixed non-deterministic order of categories in blog plugin

### 9.4.11 <small>November 23, 2023</small> { id="9.4.11" }

- Fixed #6364: Search plugin crashing when enabling theme while serving
- Fixed blog plugin crashing when disabling pagination

### 9.4.10 <small>November 19, 2023</small> { id="9.4.10" }

- Fixed #6356: Version selector can't be disabled via mike's configuration
- Fixed #6281: Navigation not rendering due to Safari bug (9.4.2 regression)
- Fixed #6261: Navigation expansion animates on first load (9.4.2 regression)

### 9.4.9 <small>November 17, 2023</small> { id="9.4.9" }

- Fixed #6344: Long entries cutoff in table of contents
- Fixed #6336: Custom template for glob archive not working with pagination
- Fixed #6328: Blog plugin crashes for locales with dashes, e.g. `pt-BR`
- Fixed #6327: Copy-to-clipboard button doesn't trim trailing line feed
- Fixed #6302: Version strings not matched when using mike, only aliases
- Fixed instant navigation progress indicator for gzipped content in Chrome
- Fixed rendering bug on details marker rotation in Firefox

### 9.4.8 <small>November 5, 2023</small> { id="9.4.8" }

- Fixed invalid local address replacement when using instant loading
- Fixed #6275: Crash after navigation caused 404 when using instant loading

### 9.4.7 <small>October 27, 2023</small> { id="9.4.7" }

- Added Azerbaijani translations

### 9.4.6 <small>October 14, 2023</small> { id="9.4.6" }

- Updated Danish and Norwegian (Nynorsk) translations
- Fixed #6169: Blog post metadata layout overflows on small screens

### 9.4.5 <small>October 10, 2023</small> { id="9.4.5" }

- Fixed sidebar auto-positioning (9.4.2 regression)
- Fixed #6166: Improve group plugin compatibility with Python < 3.10
- Fixed #6157: Hiding tags does not work (9.4.3 regression)

### 9.4.4 <small>October 5, 2023</small> { id="9.4.4" }

- Added support for overriding text to be copied for code blocks
- Fixed broken layout in some browsers at breakpoints when using zoom
- Fixed #6132: Incomplete search highlighting for code blocks in titles

### 9.4.3 <small>October 2, 2023</small> { id="9.4.3" }

- Added support for instant navigation progress indicator
- Improved spacing and alignment of tags
- Moved back-to-top button into separate partial
- Fixed #6104: Indentation for some code blocks lost in search
- Fixed #6094: Blog post metadata overlaps with footer on small screens
- Fixed #6069: Blog plugin crashes for categories with non-ASCII names

__Updated templates__ ([diff](https://github.com/squidfunk/mkdocs-material/compare/9.4.2...9.4.3))

- `base.html`

### 9.4.2 <small>September 25, 2023</small> { id="9.4.2" }

- Updated Slovenian translations
- Added animation to sidebar navigation expansion and collapse
- Added support for auto-replacement of document head for instant navigation
- Improved compatibility of new emoji extension with Python < 3.10
- Switched regex dependency to use minimal version
- Refactored alignment and spacing of sidebar navigation
- Fixed expansion button not focusable via keyboard in sidebar navigation
- Fixed viewport offset restoration on first load when using instant navigation
- Fixed accidental highlight of non-clickable elements in blog plugin sidebar
- Fixed #6041: Blog plugin crashes when `nav` is defined and blog not included
- Fixed #5972: Blog plugin ignores section index pages in paginated views
- Fixed #5954: Repeated click on anchor ignored when using instant navigation
- Fixed #5742: Keyboard navigation broken when using instant navigation

__Updated templates__ ([diff](https://github.com/squidfunk/mkdocs-material/compare/9.4.1...9.4.2))

- `partials/nav-item.html`
- `blog-post.html`

### 9.4.1 <small>September 22, 2023</small> { id="9.4.1" }

- Improved colors and contrast in dark mode
- Improved admonition borders to match font weight
- Switched content tabs to neutral color

### 9.4.0 <small>September 21, 2023</small> { id="9.4.0" }

- Added Belarusian translations
- Added version info to entrypoint of package
- Added emoji extension as a replacement for `materialx`
- Improved slate color scheme (dark mode) - now even darker
- Restructured project to improve development experience
- Updated MkDocs to 1.5.3
- Fixed #3890: Development mode crash on Linux

### 9.3.2 <small>September 19, 2023</small> { id="9.3.2" }

- Updated Slovenian translations
- Updated Python dependencies in requirements to use minimum versions
- Fixed #6017: Code highlighting inconsistent in Community and Insiders edition
- Fixed #6001: Contributor avatars display incorrectly in Firefox
- Fixed #6000: Blog post drafts are included in navigation

### 9.3.1 <small>September 11, 2023</small> { id="9.3.1" }

- Fixed crash of group plugin when used together with hooks

### 9.3.0 <small>September 11, 2023</small> { id="9.3.0" }

- Improved configuration sharing between Community and Insiders edition
- Added experimental built-in group plugin for enabling plugins conditionally
- Added new settings in tags plugin for enabling/disabling
- Dropped support for Python 3.7 (EOL)

### 9.2.8 <small>September 4, 2023</small> { id="9.2.8" }

- Updated Italian and Russian translations
- Fixed #5952: Combining blog and tags plugin leads to wrong links
- Fixed #5951: Blog plugin ignores post title in metadata
- Fixed #5949: Blog plugin ignores post linked in nav

### 9.2.7 <small>September 2, 2023</small> { id="9.2.7" }

- Switched dependencies to compatible release clauses
- Removed `readtime` and `lxml` dependencies for blog plugin
- Reduced size of Docker image to improve CI build performance
- Fixed #5945: Incorrect footer navigation for sibling pages of blog
- Fixed #5939: Page jumps when changing color palette (Firefox 117)
- Fixed #5901: Announcement bar reappears when using instant loading
- Fixed #5824: Allow to customize styles of sequence diagrams

### 9.2.6 <small>August 31, 2023</small> { id="9.2.6" }

- Added Basque translations
- Added template for simple redirects
- Improved blog plugin interop by moving view generation to `on_files`
- Fixed #5924: Social plugin still checks dependencies when disabled
- Fixed #5916: Blog plugin crashes on Python 3.8 (9.2.0 regression)

### 9.2.5 <small>August 27, 2023</small> { id="9.2.5" }

- Fixed error in dirty serve mode when using blog plugin
- Fixed page title not being consistent in blog plugin pagination
- Fixed #5899: Blog plugin pagination breaks when disabling directory URLs

### 9.2.4 <small>August 26, 2023</small> { id="9.2.4" }

- Added version to bug report name in info plugin
- Updated Afrikaans translations

### 9.2.3 <small>August 22, 2023</small> { id="9.2.3" }

- Fixed blog plugin rendering wrongly with `markdown.extensions.toc`
- Fixed blog plugin entrypoint generation

### 9.2.2 <small>August 22, 2023</small> { id="9.2.2" }

- Fixed #5880: Blog plugin failing when building a standalone blog
- Fixed #5881: Blog plugin not compatible with Python < 3.10

### 9.2.1 <small>August 21, 2023</small> { id="9.2.1" }

- Fixed #5879: Blog plugin failing when building a standalone blog
- Fixed error in blog plugin when using draft tagging on future date
- Fixed error in blog plugin when toc extension is not enabled

### 9.2.0 <small>August 21, 2023</small> { id="9.2.0" }

__Additions and improvements__

- Added blogging support via built-in blog plugin
- Added support for Chinese language segmentaiton in search plugin
- Added support for adding custom dates to blog posts
- Added support for paginating archive and category pages
- Added support for annotations (outside of code blocks)
- Added support for navigation icons
- Added support for navigation pruning
- Added support for navigation status
- Added support for customizing site icons
- Added support for customizing (code) annotation icons
- Added focus outline to admonitions and details
- Added prompt for bug report name to info plugin
- Added Luxembourgish translations
- Improved rendering of (code) annotation markers
- Improved print styles for (code) annotations
- Improved customizability of navigation tabs
- Improved interop of plugins with external tools like mike
- Improved interop of blog plugin with awesome pages plugin
- Improved header partial by moving buttons into separate partials
- Improved clarity of `site_url` warning in social plugin
- Improved blog plugin to automatically setup directory structure
- Switched info plugin to `importlib` to mitigate deprecations
- Automatically download ResizeObserver polyfill when necessary
- Automatically add iframe-worker polyfill when necessary in offline plugin
- Automatically focus and bring up keyboard on touch devices
- Updated Serbo-Croatian translations
- Updated MkDocs to 1.5.2

__Removals__

- Removed Universal Analytics integration
- Removed ancient polyfills to reduce size of bundled JavaScript by 20%
- Removed necessity for `Array.flat` and `Array.flatMap` polyfill
- Removed announcement bar button when JavaScript is not available

__Fixes__

- Fixed rendering of tags when announcement bar is present
- Fixed tags plugin rendering pages excluded by other plugins
- Fixed #5132: Blog plugin requires `nav` entry in `mkdocs.yml`
- Fixed #5599: Insufficient contrast for default link color
- Fixed #5715: Blog plugin missing integrated table of contents in pagination
- Fixed #5806: Version selector not hoverable on some Android devices
- Fixed #5826: Blog post drafts with tags show up in tags index

### 9.1.21 <small>July 27, 2023</small> { id="9.1.21" }

- Fixed MkDocs 1.4 compat issue in social plugin (9.1.20 regression)

### 9.1.20 <small>July 27, 2023</small> { id="9.1.20" }

- Updated Sanskrit translations
- Fixed deprecation warnings for social plugin

### 9.1.19 <small>July 18, 2023</small> { id="9.1.19" }

- Added support for MkDocs 1.5+
- Fixed #5699: Improve error reporting in social plugin

### 9.1.18 <small>July 3, 2023</small> { id="9.1.18" }

- Updated Danish translations
- Added support for installing user requirements in Docker image
- Fixed #5655: Search separator with lookbehind breaks highlighting

### 9.1.17 <small>June 23, 2023</small> { id="9.1.17" }

- Fixed #5633: Code annotations with nested lists incorrectly mounted
- Fixed #5628: Regression in new social plugin configuration scheme

### 9.1.16 <small>June 15, 2023</small> { id="9.1.16" }

- Updated Indonesian translations
- Ensure scroll bar follows color scheme of operating system

### 9.1.15 <small>May 29, 2023</small> { id="9.1.15" }

- Fixed #5566: Indicate color scheme to operating system
- Fixed #5565: Update `Dockerfile` to latest version of base image
- Fixed #5554: Add additional version tags (`9`, `9.1`) to Docker image
- Fixed #5536: Strip tags of ARIA labels in table of contents

### 9.1.14 <small>May 20, 2023</small> { id="9.1.14" }

- Updated Armenian and Greek translations

### 9.1.13 <small>May 16, 2023</small> { id="9.1.13" }

- Fixed #5517: Social plugin crashes for some fonts (e.g. Open Sans)

### 9.1.12 <small>May 12, 2023</small> { id="9.1.12" }

- Updated Bengali (Bangla) translations
- Fixed #5503: Docker image publish errors on uppercase characters
- Fixed #5407: Auto-pause media when in hidden content tabs

### 9.1.11 <small>May 8, 2023</small> { id="9.1.11" }

- Fixed #5487: Social plugin crashes without options (9.1.10 regression)

### 9.1.10 <small>May 8, 2023</small> { id="9.1.10" }

- Added `cards_layout_options` setting for social cards
- Deprecated `cards_color` and `cards_font` setting for social cards

### 9.1.9 <small>May 2, 2023</small> { id="9.1.9" }

- Added Telugu, Kannada and Sanskrit translations
- Fixed #5428: Fixed margins for light/dark mode images in figures
- Fixed #5420: Social plugin crashing for some specific Google Fonts
- Fixed #5160: Instant loading makes code annotations jump (9.1.1 regression)
- Fixed #4920: Social plugin not loading logo from custom icon set
- Fixed social plugin crashing when only code font is specified

### 9.1.8 <small>April 24, 2023</small> { id="9.1.8" }

- Fixed #5417: Theme breaks when `palette` is not defined (9.1.7 regression)

### 9.1.7 <small>April 22, 2023</small> { id="9.1.7" }

- Updated Persian (Farsi) and Turkish translations
- Fixed #5401: Added missing flag to disable built-in tags plugin
- Fixed #5206: Ensure defaults are set for primary and accent colors
- Fixed unnecessary inclusion of palette CSS when unused

### 9.1.6 <small>April 7, 2023</small> { id="9.1.6" }

- Updated Persian (Farsi) translations
- Fixed #5300: Boxes in Mermaid sequence diagrams not color-abiding

### 9.1.5 <small>March 31, 2023</small> { id="9.1.5" }

- Updated Lithuanian and Japanese translations
- Updated Mermaid.js to version 9.4.3
- Fixed #5290: Footer previous/next labels cut-off for short page titles

### 9.1.4 <small>March 24, 2023</small> { id="9.1.4" }

- Fixed #5239: Instant loading breaks anchors in details (9.1.1 regression)
- Fixed #5211: Anchor following not working for Chinese (9.1.2 regression)

### 9.1.3 <small>March 14, 2023</small> { id="9.1.3" }

- Added Kurdish (Soranî) translations
- Updated Norwegian (Bokmål), Portuguese and Romanian translations
- Improved compatibility with `mkdocs-jupyter` plugin
- Fixed #5198: Built-in search plugin not filtering `script` and `style` tags
- Fixed #5176: Back-to-top + instant loading not working (9.1.1 regression)

### 9.1.2 <small>March 9, 2023</small> { id="9.1.2" }

- Updated Icelandic, Korean and Swedish translations
- Fixed #5168: Mermaid text boxes overflow (9.0.13 regression)
- Fixed #5155: Table of contents not highlighting percent-encoded URLs

### 9.1.1 <small>March 5, 2023</small> { id="9.1.1" }

- Updated Czech and Thai translations
- Improved instant loading (scroll restoration, slow connections)
- Fixed #5023: Instant loading not allowing to go back to initial page
- Fixed #3797: Instant loading does not work with section anchors in Safari

### 9.1.0 <small>March 2, 2023</small> { id="9.1.0" }

- Docker image now available for `amd64`, `arm64` and `arm/v7`
- Updated Chinese (Taiwanese) translations
- Generalized tag identifier implementation
- Fixed flickering of header shadow on load
- Fixed occasional flickering of announcement bar

### 9.0.15 <small>February 26, 2023</small> { id="9.0.15" }

- Updated Chinese (Traditional) translations
- Updated Hebrew translations

### 9.0.14 <small>February 23, 2023</small> { id="9.0.14" }

- Fixed #5072: Rendering bug on navigation expand button in Firefox

### 9.0.13 <small>February 18, 2023</small> { id="9.0.13" }

- Updated Uzbek translations
- Switched back to pre-9.0.0 headline detection in `content` partial
- Fixed #5062: Version warning not readable when using slate scheme
- Fixed #5061: Improved discernibility of table row hover color
- Fixed #5034: Sequence actors in Mermaid diagrams not color-abiding
- Fixed #4919: Allow to hide version warning in multiple versions

### 9.0.12 <small>February 9, 2023</small> { id="9.0.12" }

- Updated Catalan translations
- Fixed #4975: Mermaid entity relationship rendering diagrams bug
- Fixed #4924: Header title not reset when using instant loading

### 9.0.11 <small>February 3, 2023</small> { id="9.0.11" }

- Added Mastodon verification for social links (`rel=me`)
- Updated Italian translations

### 9.0.10 <small>February 2, 2023</small> { id="9.0.10" }

- Updated Arabic translations
- Updated Korean translations
- Updated Hungarian translations
- Updated Russian translations
- Fixed #4977: Improved accessibility for content tabs
- Fixed #4960: Sometimes anchor following doesn't bring last item into view

### 9.0.9 <small>January 30, 2023</small> { id="9.0.9" }

- Updated Bulgarian translations
- Updated Chinese (Simplified) translations
- Updated Dutch translations
- Updated Hindi translations
- Updated Japanese translations
- Updated Polish translations

### 9.0.8 <small>January 29, 2023</small> { id="9.0.8" }

- Updated Croatian translations
- Updated French translations
- Updated Hungarian translations
- Updated Portuguese (Brasilian) translations
- Updated Spanish translations
- Updated Ukrainian translations
- Updated Urdu translations
- Updated Vietnamese translations

### 9.0.7 <small>January 28, 2023</small> { id="9.0.7" }

- Improved accessibility of sidebar navigation
- Moved all translations into Community edition
- Updated Polish and Portuguese (Brasilian) translations
- Fixed info plugin terminating on subsequent reload when serving
- Fixed #4910: Sidebar navigation labels have invalid ARIA roles
- Fixed #4884: Search query terms can't be separated by colons

### 9.0.6 <small>January 19, 2023</small> { id="9.0.6" }

- Fixed #4883: Automatically disable info plugin when serving
- Fixed #4885: Search plugin crashes in some exotic cases (9.0.3 regression)

### 9.0.5 <small>January 14, 2023</small> { id="9.0.5" }

- Fixed #4842: Improved accessibility of search result list

### 9.0.4 <small>January 12, 2023</small> { id="9.0.4" }

- Fixed #4823: Improved contrast ratio in footer (9.0.2 regression)
- Fixed #4832: Set navigation items back to black (9.0.3 regression)
- Fixed #4843: Emojis broken due to maxcdn.com shutting down
- Upgraded Python Markdown Extensions to 9.9.1

### 9.0.3 <small>January 8, 2023</small> { id="9.0.3" }

- Improved discernibility of section index pages in navigation
- Improved collapsing of adjacent whitespace in search plugin
- Updated Indonesian translations
- Fixed view source of this page button when edit URL points to blob
- Fixed #4829: Search overlay does not close for active anchor result
- Fixed #4824: Search plugin crashes for `h[1-6]` contained in other elements
- Fixed #4804: Nested navigation items not expandable with keyboard
- Fixed #4689: anchor tracking not working for anchors in tables
- Upgraded to Mermaid 9.3.0

### 9.0.2 <small>January 4, 2023</small> { id="9.0.2" }

- Fixed #4823: Improved contrast ratio in footer to meet WCAG guidelines
- Fixed #4819: Social plugin crashes when card generation is disabled
- Fixed #4817: Search plugin crashes on numeric page titles in `nav`

### 9.0.1 <small>January 3, 2023</small> { id="9.0.1" }

- Removed `pipdeptree` dependency for built-in info plugin
- Fixed appearance of linked tags when hovered (9.0.0 regression)
- Fixed #4810: Abbreviations run out of screen on touch devices
- Fixed #4813: View source and edit button links are the same

### 9.0.0 <small>January 2, 2023</small> { id="9.0.0" }

__Additions and improvements__

- Added support for rich search previews
- Added support for tokenizer lookahead
- Added support for better search highlighting
- Added support for excluding content from search
- Added support for configurable search pipeline
- Added support for offline search via offline plugin
- Added support for multiple instances of built-in tags plugin
- Added support for removing copy-to-clipboard button
- Added support for removing footer navigation
- Added support for button to view the source of a page
- Improved readability of query string for search sharing
- Improved stability of search plugin when using `--dirtyreload`
- Improved search result group button, now sticky and stable
- Updated Norwegian translations
- Updated MkDocs to 1.4.2

__Removals__

- Removed deprecated alternative admonition qualifiers
- Removed `:is()` selectors (in output) for easier overriding
- Removed `.title` suffix on translations
- Removed legacy method for providing page title in feedback URL
- Removed support for indexing only titles in search
- Removed support for custom search transforms
- Removed support for custom search workers
- Removed temporary snow feature (easter egg)

__Fixes__

- Fixed Norwegian and Korean language code
- Fixed detection of composition events in search interface
- Fixed search plugin not using title set via front matter
- Fixed search highlighting of tags
- Fixed search sharing URL using post transformed string
- Fixed theme-color meta tag getting out-of-sync with palette toggle
- Fixed prev/next page keyboard navigation when footer is not present
- Fixed overflowing navigation tabs not being scrollable
- Fixed inclusion of code block line numbers from search

---

### 8.5.11 <small>November 30, 2022</small> { id="8.5.11" }

- Let it snow, see https://x.com/squidfunk/status/1597939243090788352

### 8.5.10 <small>November 11, 2022</small> { id="8.5.10" }

- Adjusted CSS to better allow for custom primary and accent colors
- Fixed #4620: Primary color is not applied (8.5.9 regression)

### 8.5.9 <small>November 8, 2022</small> { id="8.5.9" }

- Fixed #4600: Illegible link colors for black and white primary colors
- Fixed #4594: Need to set schema to change link color

### 8.5.8 <small>November 3, 2022</small> { id="8.5.8" }

- Added support for always showing settings in cookie consent
- Fixed #4571: Buttons invisible if primary color is `white` or `black`
- Fixed #4517: Illegible note in sequence diagram when using `slate` scheme

### 8.5.7 <small>October 22, 2022</small> { id="8.5.7" }

- Deprecated additional admonition qualifiers to reduce size of CSS
- Fixed #4511: Search boost does not apply to sections

### 8.5.6 <small>October 2, 2022</small> { id="8.5.6" }

- Modernized appearance of admonitions (with fallback, see docs)
- Improved appearance of inline code blocks in admonition titles

### 8.5.5 <small>October 1, 2022</small> { id="8.5.5" }

- Updated MkDocs to 1.4
- Fixed compatibility issues with MkDocs 1.4
- Fixed #4430: build error when enabling consent without repository URL

### 8.5.4 <small>September 30, 2022</small> { id="8.5.4" }

- Fixed expand icons shift on sidebar overflow (using `scrollbar-gutter`)
- Fixed #4429: Text in sequence diagrams overflows in Firefox

### 8.5.3 <small>September 20, 2022</small> { id="8.5.3" }

- Fixed build error when enabling cookie consent without analytics
- Fixed #4381: Code blocks render ligatures for some fonts

### 8.5.2 <small>September 18, 2022</small> { id="8.5.2" }

- Updated Mermaid.js to version 9.1.7
- Fixed overly large headlines in search results (8.5.0 regression)
- Fixed #4358: Navigation sections appear as clickable (8.5.0 regression)
- Fixed #4356: GitHub repository statistics fetched before cookie consent

### 8.5.1 <small>September 15, 2022</small> { id="8.5.1" }

- Fixed #4366: Removed dependencies with native extensions

### 8.5.0 <small>September 13, 2022</small> { id="8.5.0" }

- Added support for social cards
- Added support for code annotation anchor links (deep linking)
- Added support for code annotation comment stripping (syntax modifier)
- Added support for sidebars scrolling automatically to active item
- Added support for anchor following table of contents (= auto scroll)
- Added support for tag icons

### 8.4.4 <small>September 12, 2022</small> { id="8.4.4" }

- Moved comments integration to separate partial (`comments.html`)

### 8.4.3 <small>September 7, 2022</small> { id="8.4.3" }

- Added Simple Icons to bundled icons (+2,300 icons)
- Added support for changing edit icon
- Moved page actions to separate partial (`actions.html`)
- Fixed #4291: Version switching doesn't stay on page when anchors are used
- Fixed #4327: Links in data tables do not receive link styling

### 8.4.2 <small>August 27, 2022</small> { id="8.4.2" }

- Updated Slovenian translations
- Fixed #4277: Feedback widget hidden after navigation with instant loading
- Fixed numeric tags in front matter breaking search functionality

### 8.4.1 <small>August 21, 2022</small> { id="8.4.1" }

- Updated Croatian and Hebrew translations

### 8.4.0 <small>August 13, 2022</small> { id="8.4.0" }

- Added support for cookie consent
- Added support for feedback widget (Was this page helpful?)
- Added support for dismissible announcement bar
- Added Armenian, Lithuanian, Tagalog, and Urdu translations

### 8.3.9 <small>July 4, 2022</small> { id="8.3.9" }

- Updated Taiwanese translations for search
- Allow ids for content tabs with special characters (for mkdocstrings)
- Fixed #4083: home not clickable when using versioning (8.3.5 regression)

### 8.3.8 <small>June 24, 2022</small> { id="8.3.8" }

- Fixed #4053: Limit width of videos to content area
- Fixed empty tags in front matter breaking search

### 8.3.7 <small>June 22, 2022</small> { id="8.3.7" }

- Fixed search being stuck initializing when using tags (8.3.4 regression)

### 8.3.6 <small>June 16, 2022</small> { id="8.3.6" }

- Fixed #4028: Links not clickable when using versioning (8.3.5 regression)

### 8.3.5 <small>June 14, 2022</small> { id="8.3.5" }

- Fixed #4012: Stay on page not working for alias of active version

### 8.3.4 <small>June 11, 2022</small> { id="8.3.4" }

- Fixed #4004: Tags with multiple words not searchable

### 8.3.3 <small>June 7, 2022</small> { id="8.3.3" }

- Fixed #4000: Mermaid diagrams too dark in dark mode (8.3.0 regression)

### 8.3.2 <small>June 5, 2022</small> { id="8.3.2" }

- Fixed #3987: Custom admonition icons don't work when defining color palette

### 8.3.1 <small>June 4, 2022</small> { id="8.3.1" }

- Bump required Jinja version to 3.0.2
- Removed unnecessary conditions in templates
- Fixed scroll offset when content tabs are brought into view
- Fixed #3977: Content tabs snapping oddly in Firefox
- Fixed #3983: Missing condition in footer partial (8.3.0 regression)

### 8.3.0 <small>June 2, 2022</small> { id="8.3.0" }

- Added support for custom admonition icons
- Added support for linking of content tabs
- Added support for boosting pages in search
- Added support for hiding footer navigation
- Added previous/next indicators to content tabs
- Improved typeset link colors in light and dark modes

### 8.2.16 <small>May 28, 2022</small> { id="8.2.16" }

- Fixed #3957: Only animate code annotations when visible (save CPU cycles)

### 8.2.15 <small>May 14, 2022</small> { id="8.2.15" }

- Added Uzbek translations
- Fixed spacing for code block results in content tabs

### 8.2.14 <small>May 8, 2022</small> { id="8.2.14" }

- Fixed missing top right rounded border on admonition
- Fixed #3886: `4xx` status codes not handled when using instant loading

### 8.2.13 <small>May 2, 2022</small> { id="8.2.13" }

- Fixed #3865: Tags index links to tagged pages 404 on Windows
- Fixed #3866: Bump required Python version from 3.6+ to 3.7+

### 8.2.12 <small>April 30, 2022</small> { id="8.2.12" }

- Added support for GitHub-style hash fragments for dark/light images
- Improved rendering of nested code blocks in content tabs and annotations
- Fixed #3862: Upgraded to latest Pygments and Python Markdown Extensions

### 8.2.11 <small>April 25, 2022</small> { id="8.2.11" }

- Temporarily pinned Pygments to `<2.12`
- Temporarily pinned Python Markdown Extensions to `<9.4`
- Improved rendering of code annotation markers

### 8.2.10 <small>April 24, 2022</small> { id="8.2.10" }

- Added Macedonian translations
- Updated Mermaid.js to version 9.0.1
- Switched sidebar title in mobile navigation to bold font
- Fixed color of arrows in class and state diagrams for dark mode
- Fixed #3836: Inline admonitions overlayed by code block titles

### 8.2.9 <small>April 8, 2022</small> { id="8.2.9" }

- Mitigate flicker on color palette switch by disabling all transitions
- Fixed search suggestions not triggered when following deep link
- Fixed incorrectly computed header height when using instant loading
- Fixed #3782: Admonition titles have extra pixels on wide screens in Firefox
- Fixed #3802: Always render table of contents container (except when hidden)

### 8.2.8 <small>March 27, 2022</small> { id="8.2.8" }

- Bumped MkDocs version to 1.3.0 to mitigate breaking changes in Jinja
- Reverted Jinja version range limitation (added in 8.2.7)
- Improved styling of annotations and fixed borders of code blocks in tabs
- Added background color to code blocks in focused/hovered links
- Added check in tags plugin whether tags overview page exists
- Fixed #3744: Content tab indicator on wrong position when using back button

### 8.2.7 <small>March 24, 2022</small> { id="8.2.7" }

- Temporarily limit Jinja version range to < 3.1 due to breaking changes

### 8.2.6 <small>March 23, 2022</small> { id="8.2.6" }

- Fixed #3695: Deprecation warning for unescaped backslashes in templates
- Fixed #3696: Annotations not mounted in some Terraform code blocks
- Fixed #3698: Annotations not mounted in long code blocks (8.2.5 regression)

### 8.2.5 <small>March 6, 2022</small> { id="8.2.5" }

- Fixed #3596: Mermaid not working when headline with name 'Mermaid' present
- Fixed #3643: Reduce time to render pages with thousands of code blocks
- Fixed #3665: Missing styles for Mermaid.js flowcharts cluster labels

### 8.2.4 <small>March 2, 2022</small> { id="8.2.4" }

- Fixed malformed Google Fonts URL when a font setting was omitted
- Fixed #3648: Fixed specificity issue with admonitions in lists
- Fixed #3653: Invalid outdated version banner URL when using instant loading

### 8.2.3 <small>February 27, 2022</small> { id="8.2.3" }

- Fixed #3578: Active element in table of contents off-by-one on large screens

### 8.2.2 <small>February 26, 2022</small> { id="8.2.2" }

- Added automatic removal of query parameter when search is closed
- Fixed #3599: Anchors always overridden when using navigation tracking

### 8.2.1 <small>February 17, 2022</small> { id="8.2.1" }

- Fixed module `material.plugins` not being found (8.2.0 regression)

### 8.2.0 <small>February 17, 2022</small> { id="8.2.0" }

- Added native support for Mermaid.js diagrams
- Added native support for tags (with search integration)
- Added support for staying on page when switching versions

### 8.1.11 <small>February 10, 2022</small> { id="8.1.11" }

- Added Portuguese (Brasilian) translations
- Updated FontAwesome to v6 – [check which icons were renamed here]
- Fixed #3545: Color palette toggle and search overlaying version selector

  [check which icons were renamed here]: https://fontawesome.com/docs/web/setup/upgrade/whats-changed#icons-renamed-in-version-6

### 8.1.10 <small>February 6, 2022</small> { id="8.1.10" }

- Fixed cutoff of very wide logos in the sidebar on mobile

### 8.1.9 <small>January 30, 2022</small> { id="8.1.9" }

- [Added support for `mkdocs.yml` validation and auto-complete][validation]
- Fixed errors in Latvian translations

  [validation]: ../creating-your-site.md#minimal-configuration

### 8.1.8 <small>January 23, 2022</small> { id="8.1.8" }

- Added Latvian translations
- Updated Giscus example integration with dynamic theme change support
- Fixed #3479: Back-to-top button not hidden when using sticky navigation tabs
- Fixed #3491: Logo in header and drawer doesn't honor aspect ratio

### 8.1.7 <small>January 16, 2022</small> { id="8.1.7" }

- Improved back-to-top button behavior - now not shown on anchor jump

### 8.1.6 <small>January 11, 2022</small> { id="8.1.6" }

- Fixed spacing of blockquotes (8.1.5 regression)
- Fixed edge cases for rounded corners on code blocks (8.1.5 regression)
- Fixed issues with code annotation line heights

### 8.1.5 <small>January 9, 2022</small> { id="8.1.5" }

- Improved browser support: Chrome 49+, Safari 10+, Firefox 53+, Edge 79+
- Improved rendering of inline code blocks in headlines
- Added Bahasa Malaysian translations
- Fixed #3354: MathJax formulas show vertical scrollbar

### 8.1.4 <small>January 2, 2022</small> { id="8.1.4" }

- Added indicator to navigation expander icon
- Improved support for reduced motion preference
- Fixed jitter of active content tab indicator

### 8.1.3 <small>December 19, 2021</small> { id="8.1.3" }

- Added animation to active content tab indicator
- Fixed #3360: Highlighted lines add blank lines in copied text
- Fixed usage of subsequent index files when using section index pages

### 8.1.2 <small>December 15, 2021</small> { id="8.1.2" }

- Switched CSS sources to logical properties
- Added transformation of logical properties to `ltr`/`rtl` equivalents
- Fixed spacing for admonitions inside lists (8.1.1 regression)

### 8.1.1 <small>December 13, 2021</small> { id="8.1.1" }

- Added support for `#only-light` and `#only-dark` image hash fragments
- Fixed copy-to-clipboard adding blank lines when using line anchors
- Fixed code annotation directionality for right-to-left languages
- Fixed header title positioning for right-to-left languages
- Fixed admonition borders for right-to-left languages (8.0.0 regression)
- Fixed footer navigation link positioning (8.0.0 regression)
- Fixed footer navigation title breaking out of container when too long
- Fixed shrinking arrow in navigation title when too long
- Fixed #3343: Filtered stopwords appear as missing search terms
- Fixed #3346: Site unusable due to usage of `:not()` (Firefox 78 ESR)

### 8.1.0 <small>December 10, 2021</small> { id="8.1.0" }

- Added basic support for code block line anchors
- Switched code annotation markers to `+` signs to improve usability
- Switched main site title to bold font
- Improved admonition icon positioning to align when `font-size` is increased
- Improved and simplified footnotes CSS
- Improved and simplified code annotation positioning
- Fixed syntax error in Russian translations

### 8.0.5 <small>December 6, 2021</small> { id="8.0.5" }

- Fixed #3302: Footer refactoring induced ellipsis in some browsers
- Fixed #3313: Details always rendered closed on load (8.0.4 regression)

### 8.0.4 <small>December 4, 2021</small> { id="8.0.4" }

- Improved support for deeply nested code annotations
- Improved code annotation and copy-to-clipboard interop
- Improved styling for code annotations inside admonitions
- Fixed #3274: Invalid anchor positioning when using instant loading
- Fixed #3294: Lists after code blocks without code annotations disappearing
- Fixed several positioning issues for code annotations
- Fixed JavaScript source map roots

### 8.0.3 <small>December 2, 2021</small> { id="8.0.3" }

- Removed deprecated `google_analytics` setting (was forgotten in 8.0.0)
- Fixed syntax error in Swedish and Polish translations
- Fixed #3283: Invalid back-to-top button position with sticky navigation tabs
- Fixed #3285: Default details marker showing due to Safari bug

### 8.0.2 <small>November 30, 2021</small> { id="8.0.2" }

- Fixed #3275: Code annotations always disappear on click

### 8.0.1 <small>November 28, 2021</small> { id="8.0.1" }

- Improved rendering of code annotation markers
- Fixed #3265: Wrong margin on nested admonitions
- Fixed wrong `box-sizing` for code annotations in details

### 8.0.0 <small>November 28, 2021</small> { id="8.0.0" }

- Added support for code annotations
- Added support for anchor tracking
- Added support for version warning
- Added `copyright` partial for easier override
- Removed deprecated content tabs legacy implementation
- Removed deprecated `seealso` admonition type
- Removed deprecated `site_keywords` setting (unsupported by MkDocs)
- Removed deprecated prebuilt search index support
- Removed deprecated web app manifest – use customization
- Removed `extracopyright` variable – use new `copyright` partial
- Removed Disqus integration – use customization
- Switched to `:is()` selectors for simple selector lists
- Switched autoprefixer from `last 4 years` to `last 2 years`
- Improved CSS overall to match modern standards
- Improved CSS variable semantics for fonts
- Improved extensibility by restructuring partials
- Improved handling of `details` when printing
- Improved keyboard navigation for footnotes
- Fixed #3214: Search highlighting breaks site when empty

---

### 7.3.6 <small>October 30, 2021</small> { id="7.3.6" }

- Added support for adding titles to code blocks

### 7.3.5 <small>October 27, 2021</small> { id="7.3.5" }

- Added support for setting table of contents title via `mkdocs.yml`
- Fixed back-to-top button position for right-to-left languages

### 7.3.4 <small>October 17, 2021</small> { id="7.3.4" }

- Bumped MkDocs version to 1.2.3 to mitigate [CVE-2021-40978]
- Fixed spacing issues when using integrate table of contents with tabs
- Fixed some spacings issues for right-to-left languages
- Fixed race condition in search initialization

  [CVE-2021-40978]: https://nvd.nist.gov/vuln/detail/CVE-2021-40978

### 7.3.3 <small>October 11, 2021</small> { id="7.3.3" }

- Rewrite of entire documentation
- Adjusted height of new content tabs to match single line code blocks
- Fixed new content tabs missing right padding in some browsers on overflow
- Fixed new content tabs bleeding out of flex container on overflow
- Fixed new content tabs overflow scrolling bugs on some browsers
- Fixed new content tabs stealing keyboard access when active
- Fixed some spacings issues for right-to-left languages

### 7.3.2 <small>October 6, 2021</small> { id="7.3.2" }

- Deprecated prebuilding of search index
- Improved graceful handling of broken search for `file://`
- Added minimum Jinja version to list of requirements
- Fixed #3071: Section index pages render empty directories
- Fixed margin issues when using navigation tabs (7.3.1 regression)
- Fixed search placeholder sometimes being shown too early

### 7.3.1 <small>October 2, 2021</small> { id="7.3.1" }

- Added new experimental content tabs implementation
- Fixed #3069: GitHub stats broken for users/orgs (7.1.0 regression)
- Fixed #3070: Sections not linking to index page
- Fixed title not linking to index page when using tabs
- Fixed Disqus integration when using instant loading
- Fixed some spacing issues for right-to-left languages
- Fixed syntax error in Serbian translations

### 7.3.0 <small>September 23, 2021</small> { id="7.3.0" }

- Added support for sticky navigation tabs
- Added support for section index pages
- Added support for removing generator notice

### 7.2.8 <small>September 20, 2021</small> { id="7.2.8" }

- Fixed #3039: Search modal overlays menu on mobile (7.2.7 regression)

### 7.2.7 <small>September 19, 2021</small> { id="7.2.7" }

- Updated Serbian and Serbo-Croatian translations
- Improved appearance of outline on details
- Fixed #2934: Scrollbar when header is hidden on some mobile browsers
- Fixed #3032: Anchor in details doesn't open on load (7.0.0 regression)
- Fixed back-to-top button being focusable when invisible
- Fixed broken admonition icons (removed in upstream)

### 7.2.6 <small>September 1, 2021</small> { id="7.2.6" }

- Fixed rendering of `blockquote` elements (7.0.0 regression)
- Fixed #2973: Custom search worker setting ignored

### 7.2.5 <small>August 25, 2021</small> { id="7.2.5" }

- Updated Portuguese translations
- Fixed execution of RxJS teardown logic (7.2.3 regression)
- Fixed #2970: Search results show escaped characters (7.2.2 regression)

### 7.2.4 <small>August 11, 2021</small> { id="7.2.4" }

- Fixed #2926: Version selector not working (7.2.3 regression)
- Fixed #2929: Missing CSS class for banner (consistency with Insiders)

### 7.2.3 <small>August 9, 2021</small> { id="7.2.3" }

- Slight facelift of data tables, now closer to Material Design
- Fixed instant loading not respecting clicks on search results
- Fixed #2881: Invalid anchor offsets when using instant loading

### 7.2.2 <small>July 31, 2021</small> { id="7.2.2" }

- Updated Korean translations
- Fixed #2879: Search highlighting does not properly escape HTML

### 7.2.1 <small>July 25, 2021</small> { id="7.2.1" }

- Fixed #2862: Back-to-top button overlays active search bar

### 7.2.0 <small>July 21, 2021</small> { id="7.2.0" }

- Added support for search suggestions to save keystrokes
- Added support for search highlighting
- Added support for search sharing (i.e. deep linking)

### 7.1.11 <small>July 18, 2021</small> { id="7.1.11" }

- Updated Spanish and Galician translations

### 7.1.10 <small>July 10, 2021</small> { id="7.1.10" }

- Refactored appearance of back-to-top button
- Fixed graceful handling of search when browsing locally

### 7.1.9 <small>June 25, 2021</small> { id="7.1.9" }

- Improved search language support for Thai and Hindi
- Fixed #2761: License comments lined up at end of file

### 7.1.8 <small>June 12, 2021</small> { id="7.1.8" }

- Refactored analytics integration (because of MkDocs 1.2)
- Added support for Google Analytics 4 (`gtag.js`)
- Fixed missing escape for `aria-label` in footer links

### 7.1.7 <small>June 6, 2021</small> { id="7.1.7" }

- Improved screen reader support

### 7.1.6 <small>May 30, 2021</small> { id="7.1.6" }

- Deprecated `seealso` admonition qualifier
- Added Mongolian and updated Chinese translations
- Fixed #2429: Version selector not touch-friendly on Android devices
- Fixed #2703: Printed 'Initializing search' albeit ready on mobile

### 7.1.5 <small>May 19, 2021</small> { id="7.1.5" }

- Fixed #2655: Details breaking page margins on print

### 7.1.4 <small>May 6, 2021</small> { id="7.1.4" }

- Added support for git-revision-date-localized plugin creation date
- Improved footnote styles on `:target` and `:focus`

### 7.1.3 <small>April 24, 2021</small> { id="7.1.3" }

- Fixed #2586: Empty table of contents shown (7.1.2 regression)

### 7.1.2 <small>April 18, 2021</small> { id="7.1.2" }

- Fixed #2554: List markers sometimes overlap floated elements
- Fixed #2563: Adding a class to a `h1` breaks the table of contents
- Fixed #2566: Back-to-top button clickable when invisible

### 7.1.1 <small>April 10, 2021</small> { id="7.1.1" }

- Fixed #2501: Nested definition lists compound bottom margin
- Fixed #2508: Switch `extracopyright` block to template variable
- Fixed #2533: Search (and other parts) not working in Safari <14
- Fixed #2538: Visual quirk when opening language selector

### 7.1.0 <small>March 29, 2021</small> { id="7.1.0" }

- Added support for back-to-top button
- Added support for color palette toggle
- Added latest release to repository info (GitHub)
- Slight facelift of repository info (lighter fonts, spacing and icons)

### 7.0.7 <small>March 28, 2021</small> { id="7.0.7" }

- Updated Hungarian translations
- Fixed #2466: Docker image not based on latest Python and Alpine
- Fixed #2488: Inconsistent header shadow behavior
- Fixed #2492: Inline code blocks in admonition titles missing background

### 7.0.6 <small>March 14, 2021</small> { id="7.0.6" }

- Added trailing slash to version selector URL
- Added support for out-of-order anchors in table of contents
- Added `extra.homepage` option to link logo to arbitrary URL
- Improved security of Docker image (always update apk)
- Fixed horizontal spacing for nested inline admonitions
- Fixed text color of nested code blocks inside links
- Fixed version selector to always use version title
- Fixed logo link when using versioning with instant loading

### 7.0.5 <small>March 7, 2021</small> { id="7.0.5" }

- Added `extracopyright` block to allow for custom copyright info
- Fixed evaluation of third-party scripts when using instant loading
- Fixed edge cases when using instant loading without directory URLs
- Fixed handling of version selector when using instant loading
- Fixed regression with header title not being updated correctly
- Fixed expanded sections not opening on first click (7.0.4 regression)

### 7.0.4 <small>March 4, 2021</small> { id="7.0.4" }

- Added Icelandic translations
- Fixed #2386: Section close requires two clicks (navigation expansion)
- Fixed console error when search is disabled (7.0.0 regression)
- Fixed localsearch integration (7.0.0 regression)

### 7.0.3 <small>February 26, 2021</small> { id="7.0.3" }

- Fixed JavaScript errors in older browsers (target ES2020 -> ES2015)

### 7.0.2 <small>February 25, 2021</small> { id="7.0.2" }

- Fixed #2343: Invalid source map URLs for JS and CSS files
- Fixed #2347: Version selector missing when using versioning

### 7.0.1 <small>February 24, 2021</small> { id="7.0.1" }

- Fixed #2334: Google Analytics triggers page view twice (7.0.0 regression)
- Fixed #2336: Details bleed into inline admonitions
- Fixed #2337: Images don't align correctly (7.0.0 regression)

### 7.0.0 <small>February 22, 2021</small> { id="7.0.0" }

- Added support for deploying multiple versions
- Added support for integrating a language selector
- Added support for rendering admonitions as inline blocks
- Rewrite of the underlying reactive architecture
- Removed Webpack in favor of reactive build strategy (-480 dependencies)
- Fixed keyboard navigation for code blocks after content tabs switch

### 6.2.8 <small>February 4, 2021</small> { id="6.2.8" }

- Updated Japanese and Polish translations
- Fixed #2261: Print dialog auto-closing when using instant loading

### 6.2.7 <small>January 31, 2021</small> { id="6.2.7" }

- Fixed #2251: Updated Docker image to latest Alpine Linux

### 6.2.6 <small>January 26, 2021</small> { id="6.2.6" }

- Added Bulgarian translations
- Fixed #2233: Search not shown when using header autohiding

### 6.2.5 <small>January 17, 2021</small> { id="6.2.5" }

- Fixed syntax error in Swedish translations
- Optimized navigation partials to improve build speed for huge docs

### 6.2.4 <small>January 9, 2021</small> { id="6.2.4" }

- Fixed #2156: Missing syntax highlighting for binary numbers
- Fixed #2186: Disqus showing on 404 page

### 6.2.3 <small>December 27, 2020</small> { id="6.2.3" }

- Added back hidden overflow on root container
- Fixed #2142: MathJax formulas sometimes have vertical scrollbars

### 6.2.2 <small>December 22, 2020</small> { id="6.2.2" }

- Removed Markdown version range limit (6.2.0 regression)

### 6.2.1 <small>December 22, 2020</small> { id="6.2.1" }

- Fixed all import and asset paths in templates (6.2.0 regression)
- Downgraded webpack-asset-manifest-plugin - broke all asset paths

### 6.2.0 <small>December 22, 2020</small> { id="6.2.0" }

- Added support for navigation sections
- Added support for navigation expansion
- Added support for integrating table of contents into navigation
- Added support for autohiding header on scroll
- Added support for hiding navigation and table of contents per page
- Added support for arbitrary items in navigation tabs
- Refactored navigation tabs to simplify grouping behavior
- Fixed anchor offset for permalinks in Safari (partial revert)
- Fixed #2098: Active tab sometimes not highlighted correctly
- Improved appearance for horizontal rulers
- Improved Spanish and Swedish translations

### 6.1.7 <small>December 6, 2020</small> { id="6.1.7" }

- Fixed #2081: Fixed stats for private GitHub repositories
- Fixed alignment for admonition icon alignment for right-to-left languages

### 6.1.6 <small>November 22, 2020</small> { id="6.1.6" }

- Fixed #2048: Math formulas show scrollbars (Windows)

### 6.1.5 <small>November 15, 2020</small> { id="6.1.5" }

- Fixed search reset button not showing/hiding correctly

### 6.1.4 <small>November 7, 2020</small> { id="6.1.4" }

- Fixed sidebar jitter when scrolling footer into view

### 6.1.3 <small>November 5, 2020</small> { id="6.1.3" }

- Added support for keywords `meta` tag
- Fixed #2027: Line numbers don't scale with smaller font size
- Fixed link colors for black and white on `slate` color scheme
- Removed focus outline on scrolling code blocks for pointer devices

### 6.1.2 <small>October 31, 2020</small> { id="6.1.2" }

- Fixed sizing of icons in admonitions, task lists, etc. (6.1.1 regression)

### 6.1.1 <small>October 31, 2020</small> { id="6.1.1" }

- Fixed #2019: Page title not correctly updated when using instant loading

### 6.1.0 <small>October 17, 2020</small> { id="6.1.0" }

- Fixed #1973: Added support for printing in dark mode
- Fixed #1974: Added support for printing content tabs
- Fixed #1995: Improved customizability of details extension

### 6.0.2 <small>October 4, 2020</small> { id="6.0.2" }

- Added Georgian translations
- Added escaping for link `title` attributes where necessary
- Fixed #1956: Pages with whitespace in names have invalid links in search
- Removed unnecessary (duplicated) link `title` attributes

### 6.0.1 <small>September 26, 2020</small> { id="6.0.1" }

- Fixed stemmer support for `file://` protocol through `iframe-worker`
- Fixed details marker showing for search result in Firefox
- Fixed tabbing behavior when search query is not empty
- Switched TypeScript compilation target to ES2015
- Reduced size of JavaScript by 30% (`176kb` → `124kb`)
- Removed `mkdocs` and `readthedocs` themes from Docker image

### 6.0.0 <small>September 25, 2020</small> { id="6.0.0" }

- Improved search result look and feel
- Improved search result stability while typing
- Improved search result grouping (pages + headings)
- Improved search result relevance and scoring
- Added display of missing query terms to search results
- Reduced size of vendor bundle by 25% (`84kb` → `67kb`)
- Reduced size of the Docker image to improve CI build performance
- Removed hero partial in favor of custom implementation
- Removed deprecated front matter features

---

### 5.5.14 <small>September 23, 2020</small> { id="5.5.14" }

- Improved spacing around image captions
- Fixed #1939: Long tables cause header overlap in print view

### 5.5.13 <small>September 19, 2020</small> { id="5.5.13" }

- Improved abbreviations on touch devices

### 5.5.12 <small>August 31, 2020</small> { id="5.5.12" }

- Fixed #1638: occasional `404` for images when using instant loading

### 5.5.11 <small>August 28, 2020</small> { id="5.5.11" }

- Fixed Disqus integration, as the minifier killed the config

### 5.5.10 <small>August 28, 2020</small> { id="5.5.10" }

- Improved rendering by moving Disqus integration after page load
- Fixed #1887: Moved navigation icons to CSS to reduce size of HTML

### 5.5.9 <small>August 26, 2020</small> { id="5.5.9" }

- Added Esperanto translations
- Fixed #1884: External links not included in navigation tabs

### 5.5.8 <small>August 23, 2020</small> { id="5.5.8" }

- Removed focus outline on `details` and content tabs for pointer devices
- Improved accessibility of content tabs (now navigable via arrow keys)
- Fixed #1877: `404` on search index when search is disabled
- Fixed some memleaks in observable subscriptions
- Fixed color definitions for `theme-color` meta tag

### 5.5.7 <small>August 16, 2020</small> { id="5.5.7" }

- Improved contrast ratio to 4.5:1 for syntax highlighting
- Improved contrast ratio to 4.5:1 for table of contents

### 5.5.6 <small>August 12, 2020</small> { id="5.5.6" }

- Switched base template for `404.html` to `main.html`
- Fixed #1864: GitHub organisation stats not loading

### 5.5.5 <small>August 11, 2020</small> { id="5.5.5" }

- Fixed missing vendor and worker distribution files

### 5.5.4 <small>August 11, 2020</small> { id="5.5.4" }

- Added support for sortable data tables

### 5.5.3 <small>August 4, 2020</small> { id="5.5.3" }

- Fixed search for languages other than English (5.5.1 regression)

### 5.5.2 <small>August 3, 2020</small> { id="5.5.2" }

- Improved highlight colors and spacing for `ins`, `del` and `mark`
- Changed some keyboard symbols for better equivalents
- Removed focus `outline` for details and code blocks on touch devices
- Fixed margins for admonitions (5.5.1 regression)
- Fixed too small content tab labels (5.5.1 regression)
- Fixed icon repeating for custom admonition icons

### 5.5.1 <small>August 1, 2020</small> { id="5.5.1" }

- Improved typesetting by basing `font-size` and spacings on `em`
- Improved print view by slightly scaling down `font-size`
- Changed custom site title (metadata) to be suffixed with site name
- Fixed top- and bottom spacing of paragraphs inside table cells

### 5.5.0 <small>July 24, 2020</small> { id="5.5.0" }

- Rewrite of entire documentation
- Rewrite of syntax highlighting to be customizable with CSS variables
- Improved syntax highlighting to work with light and dark theme
- Improved `slate` color scheme to be more customizable and easier on the eyes
- Added licenses of icon sets to distribution files
- Fixed stale document titles in Google Analytics when using instant loading
- Fixed width of previous and next footer links for tablet and above
- Fixed issues with top scroll margin for footnotes
- Fixed top margin for tabbed content when using a JavaScript highlighter
- Deprecated metadata-based redirects, source links and heroes

### 5.4.0 <small>June 29, 2020</small> { id="5.4.0" }

- Added support to wrap searches in quotes to switch from `OR` to `AND`
- Fixed highlighting of numbers in search results

### 5.3.3 <small>June 24, 2020</small> { id="5.3.3" }

- Added Bengali translations
- Fixed #1773: Search for numbers does not return any result (regression)

### 5.3.2 <small>June 21, 2020</small> { id="5.3.2" }

- Improved search typeahead experience with non-Latin characters
- Fixed #1753: Japanese search doesn't work anymore

### 5.3.1 <small>June 20, 2020</small> { id="5.3.1" }

- Fixed #1761: Duplication of search worker when subscribing to observable

### 5.3.0 <small>June 15, 2020</small> { id="5.3.0" }

- Added support for color schemes based on user preference
- Fixed #1755: Tokenizer separator setting ignored

### 5.2.3 <small>June 6, 2020</small> { id="5.2.3" }

- Improved search typeahead behavior for some languages (`de`, `fr`, ...)
- Improved styles for scrollbars on Firefox
- Fixed #1741: Removed `preconnect` hint for Google Analytics

### 5.2.2 <small>May 26, 2020</small> { id="5.2.2" }

- Fixed #1728: Legacy Edge doesn't support `deg` values in `hsla` colors

### 5.2.1 <small>May 22, 2020</small> { id="5.2.1" }

- Fixed color of links in table headers, e.g. footnotes
- Fixed color scheme not being applied without primary or accent color
- Fixed hover delay for links inside code blocks

### 5.2.0 <small>May 18, 2020</small> { id="5.2.0" }

- Added color schemes implementation + dark mode
- Fixed #1583: Missing option for separate link colors

### 5.1.7 <small>May 16, 2020</small> { id="5.1.7" }

- Added keyboard focus support for overflowing code blocks
- Fixed #1696: Infinite loop in some cases when using instant loading

### 5.1.6 <small>May 9, 2020</small> { id="5.1.6" }

- Added Burmese translations
- Added general anchor offset solution using `scroll-margin-top`
- Fixed #1653: Instant loading shouldn't intercept links to `*.html` files

### 5.1.5 <small>May 3, 2020</small> { id="5.1.5" }

- Added `name` attribute for social links to set link `title`
- Fixed #1623: Allow arbitrary links in social links
- Fixed #1664: Height of `iframe` is not adjustable
- Fixed #1667: Sidebars are scrolled to bottom on load (bug in Chrome 81+)

### 5.1.4 <small>April 30, 2020</small> { id="5.1.4" }

- Switched to [@mdi/svg] Material Design icon package
- Fixed #1655: Navigation may disappear after switching viewports
- Fixed #1659: Unnecessary scrollbar for search results on Windows
- Fixed occasional distortions for images with explicit dimensions
- Fixed errors in German translations

  [@mdi/svg]: https://github.com/Templarian/MaterialDesign-SVG

### 5.1.3 <small>April 26, 2020</small> { id="5.1.3" }

- Fixed overflowing content area after switch to flexbox

### 5.1.2 <small>April 26, 2020</small> { id="5.1.2" }

- Added status information to search observable
- Added status information to search modal
- Removed announcement bar from print media
- Removed media query packing logic due to race conditions
- Fixed #1520: Gracefully disable search on `file://` if Worker fails
- Fixed re-submission of query after search is initialized
- Fixed jitter of sidebars on all browsers by switching to `sticky`

### 5.1.1 <small>April 17, 2020</small> { id="5.1.1" }

- Added new FontAwesome icons
- Fixed #1609: Instant loading doesn't honor `target=_blank`
- Fixed GitHub stars count rounding errors
- Fixed GitLab stars count retrieval

### 5.1.0 <small>April 12, 2020</small> { id="5.1.0" }

- Added support for icons from Markdown through [mkdocs-material-extensions]

  [mkdocs-material-extensions]: https://github.com/facelessuser/mkdocs-material-extensions

### 5.0.2 <small>April 10, 2020</small> { id="5.0.2" }

- Added CSS source maps to distribution files
- Fixed errors in Chinese (Traditional) translations
- Fixed creation of stale directory on installation from git
- Improved overflow scrolling behavior on iOS (reduced bundle size by `4kb`)

### 5.0.1 <small>April 7, 2020</small> { id="5.0.1" }

- Fixed syntax error in Spanish translation

### 5.0.0 <small>April 7, 2020</small> { id="5.0.0" }

- Reactive architecture – try `app.dialog$.next("Hi!")` in the console
- Instant loading – make Material behave like a Single Page Application
- Improved CSS customization with CSS variables – set your brand's colors
- Improved CSS resilience, e.g. proper sidebar locking for customized headers
- Improved icon integration and configuration – now including over 5k icons
- Added possibility to use any icon for logo, repository and social links
- Search UI does not freeze anymore (moved to web worker)
- Search index built only once when using instant loading
- Improved extensible keyboard handling
- Support for prebuilt search indexes
- Support for displaying stars and forks for GitLab repositories
- Support for scroll snapping of sidebars and search results
- Reduced HTML and CSS footprint due to deprecation of Internet Explorer support
- Slight facelifting of some UI elements (admonitions, tables, ...)

### 4.6.3 <small>February 14, 2020</small> { id="4.6.3" }

- Removed optional third-party plugins from `requirements.txt`
- Updated Docker image to contain all supported third-party plugins

### 4.6.2 <small>February 8, 2020</small> { id="4.6.2" }

- Added Romanian translations
- Fixed #1451: Inconsistent spacing for fenced code blocks

### 4.6.1 <small>February 8, 2020</small> { id="4.6.1" }

- Fixed #1324: Metadata author only rendering first character
- Fixed #1393: Set `tabindex` to `0` for skip to content link
- Fixed code blocks after Markdown 3.2 release
- Fixed errors in Japanese translations
- Improved Google Lighthouse score

### 4.6.0 <small>December 11, 2019</small> { id="4.6.0" }

- Added support for [git-revision-date-localized-plugin]
- Fixed invalid character in Google Fonts URL

  [git-revision-date-localized-plugin]: https://github.com/timvink/mkdocs-git-revision-date-localized-plugin

### 4.5.1 <small>December 2, 2019</small> { id="4.5.1" }

- Added Thai translations
- Fixed missing assets in GitHub release `.zip` and `.tar.gz`

### 4.5.0 <small>November 16, 2019</small> { id="4.5.0" }

- Fixed #1330: Upgraded EmojiOne to Tweomji due to licensing issues
- Fixed #1339: Temporarily pinned PyMdown and Markdown due to
- Fixed errors in Greek translations
- Improved GitHub statistics retrieval

### 4.4.3 <small>October 3, 2019</small> { id="4.4.3" }

- Added Estonian translations
- Fixed removal of copyright banners in minified JavaScript
- Removed unnecessary title attributes from links in table of contents

### 4.4.2 <small>August 27, 2019</small> { id="4.4.2" }

- Added Afrikaans translations
- Fixed broken page title when `h1` contained HTML tags
- Improved accessibility for IE users
- Removed unnecessary `title` attributes from links in navigation

### 4.4.1 <small>August 22, 2019</small> { id="4.4.1" }

- Added support for `black` as a primary color
- Fixed broken footer bar when `h1` contained HTML tags

### 4.4.0 <small>June 15, 2019</small> { id="4.4.0" }

- Added Slovenian translations
- Reverted template minification in favor of `mkdocs-minify-plugin`
- Fixed #1114: Tabs don't reappear when default `font-size` is smaller than `16`

### 4.3.1 <small>May 23, 2019</small> { id="4.3.1" }

- Fixed spelling error in Danish translations

### 4.3.0 <small>May 17, 2019</small> { id="4.3.0" }

- Added support for changing header through metadata title property
- Added `font-display: swap` to Google Font loading logic
- Removed whitespace from templates, saving `4kb` (`.7kb` gzipped) per request
- Fixed alignment of repository icons on tablet and desktop

### 4.2.0 <small>April 28, 2019</small> { id="4.2.0" }

- Added Norwegian (Nynorsk) translations
- Fixed loss of focus in non-form input elements due to search hotkeys
- Fixed #1067: Search hotkeys not working for mobile/tablet screensize
- Fixed #1068: Search not correctly aligned for tablet screensize

### 4.1.2 <small>April 16, 2019</small> { id="4.1.2" }

- Fixed #1072: HTML tags appearing in navigation link titles

### 4.1.1 <small>March 28, 2019</small> { id="4.1.1" }

- Fixed minor CSS errors detected during validation

### 4.1.0 <small>March 22, 2019</small> { id="4.1.0" }

- Fixed #1023: Search for Asian languages broken after Lunr.js update
- Fixed #1026: contenteditable elements loose focus on hotkeys

### 4.0.2 <small>March 1, 2019</small> { id="4.0.2" }

- Fixed #1012: HTML character entities appear in search result titles

### 4.0.1 <small>February 13, 2019</small> { id="4.0.1" }

- Fixed #762, #816: Glitch in sidebar when collapsing items
- Fixed #869: Automatically expand details before printing

### 4.0.0 <small>February 13, 2019</small> { id="4.0.0" }

- Added background on hover for table rows
- Removed Google Tag Manager and reverted to Google Analytics
- Removed blocks in partials - Jinja doesn't support them
- Fixed #911: Chrome breaks layout if system language is Chinese (**BREAKING**)
- Fixed #976: Removed FastClick

---

### 3.3.0 <small>January 29, 2019</small> { id="3.3.0" }

- Moved Google Analytics integration into `head` using Google Tag Manager
- Fixed #972: Unicode slugifier breaks table of contents blur on scroll
- Fixed #974: Additional links in table of contents break blur on scroll

### 3.2.0 <small>December 28, 2018</small> { id="3.2.0" }

- Added support for redirects using metadata refresh
- Fixed #921: Load Google Analytics snippet asynchronously

### 3.1.0 <small>November 17, 2018</small> { id="3.1.0" }

- Added support for Progressive Web App Manifest
- Fixed #915: Search bug in Safari (upgraded Lunr.js)

### 3.0.6 <small>October 26, 2018</small> { id="3.0.6" }

- Added Taiwanese translations
- Fixed #906: JavaScript code blocks evaluated in search results

### 3.0.5 <small>October 23, 2018</small> { id="3.0.5" }

- Added Croatian and Indonesian translations
- Fixed #899: Skip-to-content link invalid from 2nd level on
- Fixed #902: Missing URL filter in footer for FontAwesome link

### 3.0.4 <small>September 3, 2018</small> { id="3.0.4" }

- Updated Dutch translations
- Fixed #856: Removed preconnect meta tag if Google Fonts are disabled

### 3.0.3 <small>August 7, 2018</small> { id="3.0.3" }

- Fixed #841: Additional path levels for extra CSS and JS

### 3.0.2 <small>August 6, 2018</small> { id="3.0.2" }

- Fixed #839: Lunr.js stemmer imports incorrect

### 3.0.1 <small>August 5, 2018</small> { id="3.0.1" }

- Fixed #838: Search result links incorrect

### 3.0.0 <small>August 5, 2018</small> { id="3.0.0" }

- Upgraded MkDocs to 1.0 (**BREAKING**)
- Upgraded Python in official Docker image to 3.6
- Added Serbian and Serbo-Croatian translations

---

### 2.9.4 <small>July 29, 2018</small> { id="2.9.4" }

- Fixed build error after MkDocs upgrade

### 2.9.3 <small>July 29, 2018</small> { id="2.9.3" }

- Added link to home for logo in drawer
- Fixed dependency problems between MkDocs and Tornado

### 2.9.2 <small>June 29, 2018</small> { id="2.9.2" }

- Added Hindi and Czech translations

### 2.9.1 <small>June 18, 2018</small> { id="2.9.1" }

- Added support for different spellings for theme color
- Fixed #799: Added support for webfont minification in production
- Fixed #800: Added `.highlighttable` as an alias for `.codehilitetable`

### 2.9.0 <small>June 13, 2018</small> { id="2.9.0" }

- Added support for theme color on Android
- Fixed #796: Rendering of nested tabbed code blocks

### 2.8.0 <small>June 10, 2018</small> { id="2.8.0" }

- Added support for grouping code blocks with tabs
- Added Material and FontAwesome icon fonts to distribution files (GDPR)
- Added note on compliance with GDPR
- Added Slovak translations
- Fixed #790: Prefixed `id` attributes with `__` to avoid name clashes

### 2.7.3 <small>April 26, 2018</small> { id="2.7.3" }

- Added Finnish translations

### 2.7.2 <small>April 9, 2018</small> { id="2.7.2" }

- Fixed rendering issue for `details` on Edge

### 2.7.1 <small>March 21, 2018</small> { id="2.7.1" }

- Added Galician translations
- Fixed #730: Scroll chasing error on home page if Disqus is enabled
- Fixed #736: Reset drawer and search upon back button invocation

### 2.7.0 <small>March 6, 2018</small> { id="2.7.0" }

- Added ability to set absolute URL for logo
- Added Hebrew translations

### 2.6.6 <small>February 22, 2018</small> { id="2.6.6" }

- Added preconnect for Google Fonts for faster loading
- Fixed #710: With tabs sidebar disappears if JavaScript is not available

### 2.6.5 <small>February 22, 2018</small> { id="2.6.5" }

- Reverted `--dev-addr` flag removal from `Dockerfile`

### 2.6.4 <small>February 21, 2018</small> { id="2.6.4" }

- Added Catalan translations
- Fixed incorrect margins for buttons in Firefox and Safari
- Replaced package manager `yarn` with `npm 5.6`
- Reverted GitHub stars rounding method
- Removed `--dev-addr` flag from `Dockerfile` for Windows compatibility

### 2.6.3 <small>February 18, 2018</small> { id="2.6.3" }

- Added Vietnamese translations

### 2.6.2 <small>February 12, 2018</small> { id="2.6.2" }

- Added Arabic translations
- Fixed incorrect rounding of amount of GitHub stars
- Fixed double-layered borders for tables

### 2.6.1 <small>February 11, 2018</small> { id="2.6.1" }

- Added ability to override Disqus integration using metadata
- Fixed #690: Duplicate slashes in source file URLs
- Fixed #696: Active page highlight not working with default palette
- Adjusted German translations

### 2.6.0 <small>February 2, 2018</small> { id="2.6.0" }

- Moved default search configuration to default translation (English)
- Added support to automatically set text direction from translation
- Added support to disable search stop word filter in translation
- Added support to disable search trimmer in translation
- Added Persian translations
- Fixed support for Polish search
- Fixed disappearing GitHub, GitLab and Bitbucket repository icons

### 2.5.5 <small>January 31, 2018</small> { id="2.5.5" }

- Added Hungarian translations

### 2.5.4 <small>January 29, 2018</small> { id="2.5.4" }

- Fixed #683: `gh-deploy` fails inside Docker

### 2.5.3 <small>January 25, 2018</small> { id="2.5.3" }

- Added Ukrainian translations

### 2.5.2 <small>January 22, 2018</small> { id="2.5.2" }

- Added default search language mappings for all localizations
- Fixed #673: Error loading non-existent search language
- Fixed #675: Uncaught reference error when search plugin disabled

### 2.5.1 <small>January 20, 2018</small> { id="2.5.1" }

- Fixed permalink for main headline
- Improved missing translation handling with English as a fallback
- Improved accessibility with skip-to-content link

### 2.5.0 <small>January 13, 2018</small> { id="2.5.0" }

- Added support for right-to-left languages

### 2.4.0 <small>January 11, 2018</small> { id="2.4.0" }

- Added focus state for clipboard buttons
- Fixed #400: Search bar steals tab focus
- Fixed search not closing on ++enter++ when result is selected
- Fixed search not closing when losing focus due to ++tab++
- Fixed collapsed navigation links getting focus
- Fixed `outline` being cut off on ++tab++ focus of navigation links
- Fixed bug with first search result navigation being ignored
- Removed search result navigation via ++tab++ (use ++up++ and ++down++)
- Removed `outline` resets for links
- Improved general tabbing behavior on desktop

### 2.3.0 <small>January 9, 2018</small> { id="2.3.0" }

- Added `example` (synonym: `snippet`) style for admonitions
- Added synonym `abstract` for `summary` style for admonitions

### 2.2.6 <small>December 27, 2017</small> { id="2.2.6" }

- Added Turkish translations
- Fixed unclickable area below header in case JavaScript is not available

### 2.2.5 <small>December 18, 2017</small> { id="2.2.5" }

- Fixed #639: Broken default favicon

### 2.2.4 <small>December 18, 2017</small> { id="2.2.4" }

- Fixed #638: Build breaks with Jinja < 2.9

### 2.2.3 <small>December 13, 2017</small> { id="2.2.3" }

- Fixed #630: Admonition sets padding on any last child
- Adjusted Chinese (Traditional) translations

### 2.2.2 <small>December 8, 2017</small> { id="2.2.2" }

- Added Dutch translations
- Adjusted targeted link and footnote offsets
- Simplified admonition styles and fixed padding bug

### 2.2.1 <small>December 2, 2017</small> { id="2.2.1" }

- Fixed #616: Minor styling error with title-only admonitions
- Removed border for table of contents and improved spacing

### 2.2.0 <small>November 22, 2017</small> { id="2.2.0" }

- Added support for hero teaser
- Added Portuguese translations
- Fixed #586: Footnote backref target offset regression
- Fixed #605: Search stemmers not correctly loaded

### 2.1.1 <small>November 21, 2017</small> { id="2.1.1" }

- Replaced deprecated `babel-preset-es2015` with `babel-preset-env`
- Refactored Gulp build pipeline with Webpack
- Removed right border on sidebars
- Fixed broken color transition on header

### 2.1.0 <small>November 19, 2017</small> { id="2.1.0" }

- Added support for `white` as a primary color
- Added support for sliding site name and title
- Fixed redundant clipboard button when using line numbers on code blocks
- Improved header appearance by making it taller
- Improved tabs appearance
- Improved CSS customizability by leveraging inheritance
- Removed scroll shadows via `background-attachment`

### 2.0.4 <small>November 5, 2017</small> { id="2.0.4" }

- Fixed `details` not opening with footnote reference

### 2.0.3 <small>November 5, 2017</small> { id="2.0.3" }

- Added Japanese translations
- Fixed #540: Jumping to anchor inside `details` doesn't open it
- Fixed active link colors in footer

### 2.0.2 <small>November 1, 2017</small> { id="2.0.2" }

- Added Russian translations
- Fixed #542: Horizontal scrollbar between `1220px` and `1234px`
- Fixed #553: Metadata values only rendering first character
- Fixed #558: Flash of unstyled content
- Fixed favicon regression caused by deprecation upstream

### 2.0.1 <small>October 31, 2017</small> { id="2.0.1" }

- Fixed error when initializing search
- Fixed styles for link to edit the current page
- Fixed styles on nested admonition in details

### 2.0.0 <small>October 31, 2017</small> { id="2.0.0" }

- Upgraded MkDocs to 0.17.1 (__BREAKING__)
- Added support for easier configuration of search tokenizer
- Added support to disable search
- Added Korean translations

---

### 1.12.2 <small>October 26, 2017</small> { id="1.12.2" }

- Added Italian, Norwegian, French and Chinese translations

### 1.12.1 <small>October 22, 2017</small> { id="1.12.1" }

- Added Polish, Swedish and Spanish translations
- Improved downward compatibility with custom partials
- Temporarily pinned MkDocs version within Docker image to 0.16.3
- Fixed #519: Missing theme configuration file

### 1.12.0 <small>October 20, 2017</small> { id="1.12.0" }

- Added support for setting language(s) via `mkdocs.yml`
- Added support for default localization
- Added German and Danish translations
- Fixed #374: Search bar misalignment on big screens

### 1.11.0 <small>October 19, 2017</small> { id="1.11.0" }

- Added localization to clipboard
- Refactored localization logic

### 1.10.4 <small>October 18, 2017</small> { id="1.10.4" }

- Improved print styles of code blocks
- Improved search UX (don't close on enter if no selection)
- Fixed #495: Vertical scrollbar on short pages

### 1.10.3 <small>October 11, 2017</small> { id="1.10.3" }

- Fixed #484: Vertical scrollbar on some MathJax formulas
- Fixed #483: Footnote backref target offset regression

### 1.10.2 <small>October 6, 2017</small> { id="1.10.2" }

- Fixed #468: Sidebar shows scrollbar if content is shorter (in Safari)

### 1.10.1 <small>September 14, 2017</small> { id="1.10.1" }

- Fixed #455: Bold code blocks rendered with normal font weight

### 1.10.0 <small>September 1, 2017</small> { id="1.10.0" }

- Added support to make logo default icon configurable
- Fixed uninitialized overflow scrolling on main pane for iOS
- Fixed error in mobile navigation in case JavaScript is not available
- Fixed incorrect color transition for nested panes in mobile navigation
- Improved checkbox styles for Tasklist from PyMdown Extension package

### 1.9.0 <small>August 29, 2017</small> { id="1.9.0" }

- Added `info` (synonym: `todo`) style for admonitions
- Added `question` (synonym: `help`, `faq`) style for admonitions
- Added support for Details from PyMdown Extensions package
- Improved admonition styles to match details
- Improved styles for social links in footer
- Replaced ligatures with Unicode code points to avoid broken layout
- Upgraded PyMdown Extensions package dependency to >= 3.4

### 1.8.1 <small>August 7, 2017</small> { id="1.8.1" }

- Fixed #421: Missing pagination for GitHub API

### 1.8.0 <small>August 2, 2017</small> { id="1.8.0" }

- Added support for lazy-loading of search results for better performance
- Added support for customization of search tokenizer/separator
- Fixed #424: Search doesn't handle capital letters anymore
- Fixed #419: Search doesn't work on whole words

### 1.7.5 <small>July 25, 2017</small> { id="1.7.5" }

- Fixed #398: Forms broken due to search shortcuts
- Improved search overall user experience
- Improved search matching and highlighting
- Improved search accessibility

### 1.7.4 <small>June 21, 2017</small> { id="1.7.4" }

- Fixed functional link colors in table of contents for active palette
- Fixed #368: Compatibility issues with IE11

### 1.7.3 <small>June 7, 2017</small> { id="1.7.3" }

- Fixed error when setting language to Japanese for site search

### 1.7.2 <small>June 6, 2017</small> { id="1.7.2" }

- Fixed offset of search box when `repo_url` is not set
- Fixed non-disappearing tooltip

### 1.7.1 <small>June 1, 2017</small> { id="1.7.1" }

- Fixed wrong `z-index` order of header, overlay and drawer
- Fixed wrong offset of targeted footnote back references

### 1.7.0 <small>June 1, 2017</small> { id="1.7.0" }

- Added "copy to clipboard" buttons to code blocks
- Added support for multilingual site search
- Fixed search term highlighting for non-latin languages

### 1.6.4 <small>May 24, 2017</small> { id="1.6.4" }

- Fixed #337: JavaScript error for GitHub organization URLs

### 1.6.3 <small>May 16, 2017</small> { id="1.6.3" }

- Fixed #329: Broken source stats for private or unknown GitHub repos

### 1.6.2 <small>May 15, 2017</small> { id="1.6.2" }

- Fixed #316: Fatal error for git clone on Windows
- Fixed #320: Chrome 58 creates double underline for `abbr` tags
- Fixed #323: Ligatures rendered inside code blocks
- Fixed miscalculated sidebar height due to missing margin collapse
- Changed deprecated MathJax CDN to Cloudflare

### 1.6.1 <small>April 23, 2017</small> { id="1.6.1" }

- Fixed following of active/focused element if search input is focused
- Fixed layer order of search component elements

### 1.6.0 <small>April 22, 2017</small> { id="1.6.0" }

- Added build test for Docker image on Travis
- Added search overlay for better user experience (focus)
- Added language from localizations to `html` tag
- Fixed #270: source links broken for absolute URLs
- Fixed missing top spacing for first targeted element in content
- Fixed too small footnote divider when using larger font sizes

### 1.5.5 <small>April 20, 2017</small> { id="1.5.5" }

- Fixed #282: Browser search (<kbd>Meta</kbd>+<kbd>F</kbd>) is hijacked

### 1.5.4 <small>April 8, 2017</small> { id="1.5.4" }

- Fixed broken highlighting for two or more search terms
- Fixed missing search results when only a `h1` is present
- Fixed unresponsive overlay on Android

### 1.5.3 <small>April 7, 2017</small> { id="1.5.3" }

- Fixed deprecated calls for template variables
- Fixed wrong palette color for focused search result
- Fixed JavaScript errors on 404 page
- Fixed missing top spacing on 404 page
- Fixed missing right spacing on overflow of source container

### 1.5.2 <small>April 5, 2017</small> { id="1.5.2" }

- Added requirements as explicit dependencies in `setup.py`
- Fixed non-synchronized transitions in search form

### 1.5.1 <small>March 30, 2017</small> { id="1.5.1" }

- Fixed rendering and offset of targeted footnotes
- Fixed #238: Link on logo is not set to `site_url`

### 1.5.0 <small>March 24, 2017</small> { id="1.5.0" }

- Added support for localization of search placeholder
- Added keyboard events for quick access of search
- Added keyboard events for search control
- Added opacity on hover for search buttons
- Added git hook to skip CI build on non-src changes
- Fixed non-resetting search placeholder when input is cleared
- Fixed error for unescaped parentheses in search term
- Fixed #229: Button to clear search missing
- Fixed #231: Escape key doesn't exit search
- Removed old-style figures from font feature settings

### 1.4.1 <small>March 16, 2017</small> { id="1.4.1" }

- Fixed invalid destructuring attempt on NodeList (in Safari, Edge, IE)

### 1.4.0 <small>March 16, 2017</small> { id="1.4.0" }

- Added support for grouping searched sections by documents
- Added support for highlighting of search terms
- Added support for localization of search results
- Fixed #216: table of contents icon doesn't show if `h1` is not present
- Reworked style and layout of search results for better usability

### 1.3.0 <small>March 11, 2017</small> { id="1.3.0" }

- Added support for page-specific title and description using metadata
- Added support for linking source files to documentation
- Fixed jitter and offset of sidebar when zooming browser
- Fixed incorrectly initialized tablet sidebar height
- Fixed regression for #1: GitHub stars break if `repo_url` ends with a `/`
- Fixed undesired white line below copyright footer due to base font scaling
- Fixed issue with whitespace in path for scripts
- Fixed #205: support non-fixed (static) header
- Refactored footnote references for better visibility
- Reduced repaints to a minimum for non-tabs configuration
- Reduced contrast of edit button (slightly)

### 1.2.0 <small>March 3, 2017</small> { id="1.2.0" }

- Added `quote` (synonym: `cite`) style for admonitions
- Added help message to build pipeline
- Fixed wrong navigation link colors when applying palette
- Fixed #197: Link missing in tabs navigation on deeply nested items
- Removed unnecessary dev dependencies

### 1.1.1 <small>February 26, 2017</small> { id="1.1.1" }

- Fixed incorrectly displayed nested lists when using tabs

### 1.1.0 <small>February 26, 2017</small> { id="1.1.0" }

- Added tabs navigation feature (optional)
- Added Disqus integration (optional)
- Added a high resolution Favicon with the new logo
- Added static type checking using Facebook's Flow
- Fixed #173: Dictionary elements have no bottom spacing
- Fixed #175: Tables cannot be set to 100% width
- Fixed race conditions in build related to asset revisioning
- Fixed accidentally re-introduced Permalink on top-level headline
- Fixed alignment of logo in drawer on IE11
- Refactored styles related to tables
- Refactored and automated Docker build and PyPI release
- Refactored build scripts

### 1.0.5 <small>February 18, 2017</small> { id="1.0.5" }

- Fixed #153: Sidebar flows out of constrained area in Chrome 56
- Fixed #159: Footer jitter due to JavaScript if content is short

### 1.0.4 <small>February 16, 2017</small> { id="1.0.4" }

- Fixed #142: Documentation build errors if `h1` is defined as raw HTML
- Fixed #164: PyPI release does not build and install
- Fixed offsets of targeted headlines
- Increased sidebar font size by `0.12rem`

### 1.0.3 <small>January 22, 2017</small> { id="1.0.3" }

- Fixed #117: Table of contents items don't blur on fast scrolling
- Refactored sidebar positioning logic
- Further reduction of repaints

### 1.0.2 <small>January 15, 2017</small> { id="1.0.2" }

- Fixed #108: Horizontal scrollbar in content area

### 1.0.1 <small>January 14, 2017</small> { id="1.0.1" }

- Fixed massive repaints happening when scrolling
- Fixed footer back reference positions in case of overflow
- Fixed header logo from showing when the menu icon is rendered
- Changed scrollbar behavior to only show when content overflows

### 1.0.0 <small>January 13, 2017</small> { id="1.0.0" }

- Introduced Webpack for more sophisticated JavaScript bundling
- Introduced ESLint and Stylelint for code style checks
- Introduced more accurate Material Design colors and shadows
- Introduced modular scales for harmonic font sizing
- Introduced git-hooks for better development workflow
- Rewrite of CSS using the BEM methodology and SassDoc guidelines
- Rewrite of JavaScript using ES6 and Babel as a transpiler
- Rewrite of Admonition, Permalinks and CodeHilite integration
- Rewrite of the complete typographical system
- Rewrite of Gulp asset pipeline in ES6 and separation of tasks
- Removed Bower as a dependency in favor of NPM
- Removed custom icon build in favor of the Material Design icon set
- Removed `_blank` targets on links due to vulnerability: http://bit.ly/1Mk2Rtw
- Removed unversioned assets from build directory
- Restructured templates into base templates and partials
- Added build and watch scripts in `package.json`
- Added support for Metadata and Footnotes Markdown extensions
- Added support for PyMdown Extensions package
- Added support for collapsible sections in navigation
- Added support for separate table of contents
- Added support for better accessibility through REM-based layout
- Added icons for GitHub, GitLab and BitBucket integrations
- Added more detailed documentation on specimen, extensions etc.
- Added a `404.html` error page for deployment on GitHub Pages
- Fixed live reload chain in watch mode when saving a template
- Fixed variable references to work with MkDocs 0.16

---

### 0.2.4 <small>June 26, 2016</small> { id="0.2.4" }

- Fixed improperly set default favicon
- Fixed #33: Protocol relative URL for webfonts doesn't work with `file://`
- Fixed #34: IE11 on Windows 7 doesn't honor `max-width` on `main` tag
- Fixed #35: Add styling for blockquotes

### 0.2.3 <small>May 16, 2016</small> { id="0.2.3" }

- Fixed #25: Highlight inline fenced blocks
- Fixed #26: Better highlighting for keystrokes
- Fixed #30: Suboptimal syntax highlighting for PHP

### 0.2.2 <small>March 20, 2016</small> { id="0.2.2" }

- Fixed #15: Document Pygments dependency for CodeHilite
- Fixed #16: Favicon could not be set through `mkdocs.yml`
- Fixed #17: Put version into own container for styling
- Fixed #20: Fix rounded borders for tables

### 0.2.1 <small>March 12, 2016</small> { id="0.2.1" }

- Fixed #10: Invisible header after closing search bar with <kbd>ESC</kbd> key
- Fixed #13: Table cells don't wrap
- Fixed empty list in table of contents when no headline is defined
- Corrected wrong path for static asset monitoring in Gulpfile.js
- Set up tracking of site search for Google Analytics

### 0.2.0 <small>February 24, 2016</small> { id="0.2.0" }

- Fixed #6: Include multiple color palettes via `mkdocs.yml`
- Fixed #7: Better colors for links inside admonition notes and warnings
- Fixed #9: Text for prev/next footer navigation should be customizable
- Refactored templates (replaced `if`/`else` with modifiers where possible)

### 0.1.3 <small>February 21, 2016</small> { id="0.1.3" }

- Fixed #3: Ordered lists within an unordered list have `::before` content
- Fixed #4: Click on Logo/Title without Github-Repository: `"None"`
- Fixed #5: Page without headlines renders empty list in table of contents
- Moved Modernizr to top to ensure basic usability in IE8

### 0.1.2 <small>February 16, 2016</small> { id="0.1.2" }

- Fixed styles for deep navigational hierarchies
- Fixed webfont delivery problem when hosted in subdirectories
- Fixed print styles in mobile/tablet configuration
- Added option to configure fonts in `mkdocs.yml` with fallbacks
- Changed styles for admonition notes and warnings
- Set download link to latest version if available
- Set up tracking of outgoing links and actions for Google Analytics

### 0.1.1 <small>February 11, 2016</small> { id="0.1.1" }

- Fixed #1: GitHub stars don't work if the repo_url ends with a `/`
- Updated NPM and Bower dependencies to most recent versions
- Changed footer/copyright link to Material theme to GitHub pages
- Made MkDocs building/serving in build process optional
- Set up continuous integration with Travis

### 0.1.0 <small>February 9, 2016</small> { id="0.1.0" }

- Initial release
