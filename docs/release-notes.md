# Release notes

## Upgrading

To upgrade Material to the latest version, use pip:

``` sh
pip install --upgrade mkdocs-material
```

To determine the currently installed version, use the following command:

``` sh
pip show mkdocs-material | grep -E ^Version
# Version 1.0.3
```

## Changelog

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
