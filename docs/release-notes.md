# Release notes

## Upgrading

To upgrade Material to the latest version, use pip:

``` sh
pip install --upgrade mkdocs-material
```

To determine the currently installed version, use the following command:

``` sh
pip show mkdocs-material | grep -E ^Version
# Version 1.5.0
```

## Changelog

### 1.5.0 <small> _ March 24, 2017</small>

* Added support for localization of search placeholder
* Added keyboard events for quick access of search
* Added keyboard events for search control
* Added opacity on hover for search buttons
* Added git hook to skip CI build on non-src changes
* Fixed non-resetting search placeholder when input is cleared
* Fixed error for unescaped parentheses in search term
* Fixed [#229][229]: Button to clear search missing
* Fixed [#231][231]: Escape key doesn't exit search
* Removed old-style figures from font feature settings

  [229]: https://github.com/squidfunk/mkdocs-material/issues/229
  [231]: https://github.com/squidfunk/mkdocs-material/issues/231

### 1.4.1 <small> _ March 16, 2017</small>

* Fixed invalid destructuring attempt on NodeList (in Safari, Edge, IE)

### 1.4.0 <small> _ March 16, 2017</small>

* Added support for grouping searched sections by documents
* Added support for highlighting of search terms
* Added support for localization of search results
* Fixed [#216][216]: table of contents icon doesn't show if `h1` is not present
* Reworked style and layout of search results for better usability

  [216]: https://github.com/squidfunk/mkdocs-material/issues/216

### 1.3.0 <small> _ March 11, 2017</small>

* Added support for page-specific title and description using metadata
* Added support for linking source files to documentation
* Fixed jitter and offset of sidebar when zooming browser
* Fixed incorrectly initialized tablet sidebar height
* Fixed regression for [#1][1]: GitHub stars break if `repo_url` ends with a `/`
* Fixed undesired white line below copyright footer due to base font scaling
* Fixed issue with whitespace in path for scripts
* Fixed [#205][205]: support non-fixed (static) header
* Refactored footnote references for better visibility
* Reduced repaints to a minimum for non-tabs configuration
* Reduced contrast of edit button (slightly)

  [205]: https://github.com/squidfunk/mkdocs-material/issues/205

### 1.2.0 <small> _ March 3, 2017</small>

* Added `quote` (synonym: `cite`) style for Admonition
* Added help message to build pipeline
* Fixed wrong navigation link colors when applying palette
* Fixed [#197][197]: Link missing in tabs navigation on deeply nested items
* Removed unnecessary dev dependencies

  [197]: https://github.com/squidfunk/mkdocs-material/issues/197

### 1.1.1 <small> _ February 26, 2017</small>

* Fixed incorrectly displayed nested lists when using tabs

### 1.1.0 <small> _ February 26, 2017</small>

* Added tabs navigation feature (optional)
* Added Disqus integration (optional)
* Added a high resolution Favicon with the new logo
* Added static type checking using Facebook's Flow
* Fixed [#173][173]: Dictionary elements have no bottom spacing
* Fixed [#175][175]: Tables cannot be set to 100% width
* Fixed race conditions in build related to asset revisioning
* Fixed accidentally re-introduced Permalink on top-level headline
* Fixed alignment of logo in drawer on IE11
* Refactored styles related to tables
* Refactored and automated Docker build and PyPI release
* Refactored build scripts

  [173]: https://github.com/squidfunk/mkdocs-material/issues/173
  [175]: https://github.com/squidfunk/mkdocs-material/issues/175

### 1.0.5 <small> _ February 18, 2017</small>

* Fixed [#153][153]: Sidebar flows out of constrained area in Chrome 56
* Fixed [#159][159]: Footer jitter due to JavaScript if content is short

  [153]: https://github.com/squidfunk/mkdocs-material/issues/153
  [159]: https://github.com/squidfunk/mkdocs-material/issues/159

### 1.0.4 <small> _ February 16, 2017</small>

* Fixed [#142][142]: Documentation build errors if `h1` is defined as raw HTML
* Fixed [#164][164]: PyPI release does not build and install
* Fixed offsets of targeted headlines
* Increased sidebar font size by `0.12rem`

  [142]: https://github.com/squidfunk/mkdocs-material/issues/142
  [164]: https://github.com/squidfunk/mkdocs-material/issues/164

### 1.0.3 <small> _ January 22, 2017</small>

* Fixed [#117][117]: Table of contents items don't blur on fast scrolling
* Refactored sidebar positioning logic
* Further reduction of repaints

  [117]: https://github.com/squidfunk/mkdocs-material/issues/117

### 1.0.2 <small> _ January 15, 2017</small>

* Fixed [#108][108]: Horizontal scrollbar in content area

  [108]: https://github.com/squidfunk/mkdocs-material/issues/108

### 1.0.1 <small> _ January 14, 2017</small>

* Fixed massive repaints happening when scrolling
* Fixed footer back reference positions in case of overflow
* Fixed header logo from showing when the menu icon is rendered
* Changed scrollbar behavior to only show when content overflows

### 1.0.0 <small> _ January 13, 2017</small>

* Introduced Webpack for more sophisticated JavaScript bundling
* Introduced ESLint and Stylelint for code style checks
* Introduced more accurate Material Design colors and shadows
* Introduced modular scales for harmonic font sizing
* Introduced git-hooks for better development workflow
* Rewrite of CSS using the BEM methodology and SassDoc guidelines
* Rewrite of JavaScript using ES6 and Babel as a transpiler
* Rewrite of Admonition, Permalinks and CodeHilite integration
* Rewrite of the complete typographical system
* Rewrite of Gulp asset pipeline in ES6 and separation of tasks
* Removed Bower as a dependency in favor of NPM
* Removed custom icon build in favor of the Material Design iconset
* Removed `_blank` targets on links due to vulnerability: http://bit.ly/1Mk2Rtw
* Removed unversioned assets from build directory
* Restructured templates into base templates and partials
* Added build and watch scripts in `package.json`
* Added support for Metadata and Footnotes Markdown extensions
* Added support for PyMdown Extensions package
* Added support for collapsible sections in navigation
* Added support for separate table of contents
* Added support for better accessibility through REM-based layout
* Added icons for GitHub, GitLab and BitBucket integrations
* Added more detailed documentation on specimen, extensions etc.
* Added a `404.html` error page for deployment on GitHub Pages
* Fixed live reload chain in watch mode when saving a template
* Fixed variable references to work with MkDocs 0.16

### 0.2.4 <small> _ June 26, 2016</small>

* Fixed improperly set default favicon
* Fixed [#33][33]: Protocol relative URL for webfonts doesn't work with
  `file://`
* Fixed [#34][34]: IE11 on Windows 7 doesn't honor `max-width` on `main` tag
* Fixed [#35][35]: Add styling for blockquotes

  [33]: https://github.com/squidfunk/mkdocs-material/issues/25
  [34]: https://github.com/squidfunk/mkdocs-material/issues/26
  [35]: https://github.com/squidfunk/mkdocs-material/issues/30

### 0.2.3 <small> _ May 16, 2016</small>

* Fixed [#25][25]: Highlight inline fenced blocks
* Fixed [#26][26]: Better highlighting for keystrokes
* Fixed [#30][30]: Suboptimal syntax highlighting for PHP

  [25]: https://github.com/squidfunk/mkdocs-material/issues/25
  [26]: https://github.com/squidfunk/mkdocs-material/issues/26
  [30]: https://github.com/squidfunk/mkdocs-material/issues/30

### 0.2.2 <small> _ March 20, 2016</small>

* Fixed [#15][15]: Document Pygments dependency for CodeHilite
* Fixed [#16][16]: Favicon could not be set through `mkdocs.yml`
* Fixed [#17][17]: Put version into own container for styling
* Fixed [#20][20]: Fix rounded borders for tables

  [15]: https://github.com/squidfunk/mkdocs-material/issues/15
  [16]: https://github.com/squidfunk/mkdocs-material/issues/16
  [17]: https://github.com/squidfunk/mkdocs-material/issues/17
  [20]: https://github.com/squidfunk/mkdocs-material/issues/20

### 0.2.1 <small> _ March 12, 2016</small>

* Fixed [#10][10]: Invisible header after closing search bar with
  <kbd>ESC</kbd> key
* Fixed [#13][13]: Table cells don't wrap
* Fixed empty list in table of contents when no headline is defined
* Corrected wrong path for static asset monitoring in Gulpfile.js
* Set up tracking of site search for Google Analytics

  [10]: https://github.com/squidfunk/mkdocs-material/issues/10
  [13]: https://github.com/squidfunk/mkdocs-material/issues/13

### 0.2.0 <small> _ February 24, 2016</small>

* Fixed [#6][6]: Include multiple color palettes via `mkdocs.yml`
* Fixed [#7][7]: Better colors for links inside admonition notes and warnings
* Fixed [#9][9]: Text for prev/next footer navigation should be customizable
* Refactored templates (replaced `if`/`else` with modifiers where possible)

  [6]: https://github.com/squidfunk/mkdocs-material/issues/6
  [7]: https://github.com/squidfunk/mkdocs-material/issues/7
  [9]: https://github.com/squidfunk/mkdocs-material/issues/9

### 0.1.3 <small> _ February 21, 2016</small>

* Fixed [#3][3]: Ordered lists within an unordered list have `::before` content
* Fixed [#4][4]: Click on Logo/Title without Github-Repository: `"None"`
* Fixed [#5][5]: Page without headlines renders empty list in table of contents
* Moved Modernizr to top to ensure basic usability in IE8

  [3]: https://github.com/squidfunk/mkdocs-material/issues/3
  [4]: https://github.com/squidfunk/mkdocs-material/issues/4
  [5]: https://github.com/squidfunk/mkdocs-material/issues/5

### 0.1.2 <small> _ February 16, 2016</small>

* Fixed styles for deep navigational hierarchies
* Fixed webfont delivery problem when hosted in subdirectories
* Fixed print styles in mobile/tablet configuration
* Added option to configure fonts in `mkdocs.yml` with fallbacks
* Changed styles for admonition notes and warnings
* Set download link to latest version if available
* Set up tracking of outgoing links and actions for Google Analytics

### 0.1.1 <small> _ February 11, 2016</small>

* Fixed [#1][1]: GitHub stars don't work if the repo_url ends with a `/`
* Updated NPM and Bower dependencies to most recent versions
* Changed footer/copyright link to Material theme to GitHub pages
* Made MkDocs building/serving in build process optional
* Set up continuous integration with [Travis][2]

  [1]: https://github.com/squidfunk/mkdocs-material/issues/1
  [2]: https://travis-ci.org

### 0.1.0 <small> _ February 9, 2016</small>

* Initial release
