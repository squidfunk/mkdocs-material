---
template: overrides/main.html
---

# Changelog

## Material for MkDocs Insiders

### 1.4.1 <small>_ September 6, 2020</small>

* Improved typeahead and search result relevance and scoring

### 1.4.0 <small>_ August 30, 2020</small>

* Added support for auto-hiding header on scroll

### 1.3.0 <small>_ August 26, 2020</small>

* Added support for user-selectable color palettes

### 1.2.0 <small>_ August 11, 2020</small>

* Added feature to expand navigation by default

### 1.1.0 <small>_ August 3, 2020</small>

* Added highlighting of search results

### 1.0.0 <small>_ July 14, 2020</small>

* Added grouping of search results
* Added missing query terms to search result
* Improved search result relevance and scoring

## Material for MkDocs

### 5.5.12 <small>_ August 31, 2020</small>

* Fixed #1638: occasional `404` for images when using instant loading

### 5.5.11 <small>_ August 28, 2020</small>

* Fixed Disqus integration, as the minifier killed the config

### 5.5.10 <small>_ August 28, 2020</small>

* Improved rendering by moving Disqus integration after page load
* Fixed #1887: Moved navigation icons to CSS to reduce size of HTML

### 5.5.9 <small>_ August 26, 2020</small>

* Added Esperanto translations
* Fixed #1884: External links not included in navigation tabs

### 5.5.8 <small>_ August 23, 2020</small>

* Removed focus outline on `details` and content tabs for pointer devices
* Improved accessibility of content tabs (now navigable via arrow keys)
* Fixed #1877: `404` on search index when search is disabled
* Fixed some memleaks in observable subscriptions
* Fixed color definitions for `theme-color` meta tag

### 5.5.7 <small>_ August 16, 2020</small>

* Improved contrast ratio to 4.5:1 for syntax highlighting
* Improved contrast ratio to 4.5:1 for table of contents

### 5.5.6 <small>_ August 12, 2020</small>

* Switched base template for `404.html` to `main.html`
* Fixed #1864: GitHub organisation stats not loading

### 5.5.5 <small>_ August 11, 2020</small>

* Fixed missing vendor and worker distribution files

### 5.5.4 <small>_ August 11, 2020</small>

* Added support for sortable data tables

### 5.5.3 <small>_ August 4, 2020</small>

* Fixed search for languages other than English (5.5.1 regression)

### 5.5.2 <small>_ August 3, 2020</small>

* Improved highlight colors and spacing for `ins`, `del` and `mark`
* Changed some keyboard symbols for better equivalents
* Removed focus `outline` for details and code blocks on touch devices
* Fixed margins for Admonitions (5.5.1 regression)
* Fixed too small content tab labels (5.5.1 regression)
* Fixed icon repeating for custom admonition icons

### 5.5.1 <small>_ August 1, 2020</small>

* Improved typesetting by basing `font-size` and spacings on `em`
* Improved print view by slightly scaling down `font-size`
* Changed custom site title (metadata) to be suffixed with site name
* Fixed top- and bottom spacing of paragraphs inside table cells

### 5.5.0 <small>_ July 24, 2020</small>

* Rewrite of entire documentation
* Rewrite of syntax highlighting to be customizable with CSS variables
* Improved syntax highlighting to work with light and dark theme
* Improved `slate` color scheme to be more customizable and easier on the eyes
* Added licenses of icon sets to distribution files
* Fixed stale document titles in Google Analytics when using instant loading
* Fixed width of previous and next footer links for tablet and above
* Fixed issues with top scroll margin for footnotes
* Fixed top margin for tabbed content when using a JavaScript highlighter
* Deprecated metadata-based redirects, source links and heroes

### 5.4.0 <small>_ June 29, 2020</small>

* Added support to wrap searches in quotes to switch from `OR` to `AND`
* Fixed highlighting of numbers in search results

### 5.3.3 <small>_ June 24, 2020</small>

* Added Bengali translations
* Fixed #1773: Search for numbers does not return any result (regression)

### 5.3.2 <small>_ June 21, 2020</small>

* Improved search typeahead experience with non-Latin characters
* Fixed #1753: Japanese search doesn't work anymore

### 5.3.1 <small>_ June 20, 2020</small>

* Fixed #1761: Duplication of search worker when subscribing to observable

### 5.3.0 <small>_ June 15, 2020</small>

* Added support for color schemes based on user preference
* Fixed #1755: Tokenizer separator setting ignored

### 5.2.3 <small>_ June 6, 2020</small>

* Improved search typeahead behavior for some languages (`de`, `fr`, ...)
* Improved styles for scrollbars on Firefox
* Fixed #1741: Removed `preconnect` hint for Google Analytics

### 5.2.2 <small>_ May 26, 2020</small>

* Fixed #1728: Legacy Edge doesn't support `deg` values in `hsla` colors

### 5.2.1 <small>_ May 22, 2020</small>

* Fixed color of links in table headers, e.g. footnotes
* Fixed color scheme not being applied without primary or accent color
* Fixed hover delay for links inside code blocks

### 5.2.0 <small>_ May 18, 2020</small>

* Added color schemes implementation + dark mode
* Fixed #1583: Missing option for separate link colors

### 5.1.7 <small>_ May 16, 2020</small>

* Added keyboard focus support for overflowing code blocks
* Fixed #1696: Infinite loop in some cases when using instant loading

### 5.1.6 <small>_ May 9, 2020</small>

* Added Burmese translations
* Added general anchor offset solution using `scroll-margin-top`
* Fixed #1653: Instant loading shouldn't intercept links to `*.html` files

### 5.1.5 <small>_ May 3, 2020</small>

* Added `name` attribute for social links to set link `title`
* Fixed #1623: Allow arbitrary links in social links
* Fixed #1664: Height of `iframe` is not adjustable
* Fixed #1667: Sidebars are scrolled to bottom on load (bug in Chrome 81+)

### 5.1.4 <small>_ April 30, 2020</small>

* Switched to [@mdi/svg][3] Material Design icon package
* Fixed #1655: Navigation may disappear after switching viewports
* Fixed #1659: Unnecessary scrollbar for search results on Windows
* Fixed occasional distortions for images with explicit dimensions
* Fixed errors in German translations

  [3]: https://github.com/Templarian/MaterialDesign-SVG

### 5.1.3 <small>_ April 26, 2020</small>

* Fixed overflowing content area after switch to flexbox

### 5.1.2 <small>_ April 26, 2020</small>

* Added status information to search observable
* Added status information to search modal
* Removed announcement bar from print media
* Removed media query packing logic due to race conditions
* Fixed #1520: Gracefully disable search on `file://` if Worker fails
* Fixed re-submission of query after search is initialized
* Fixed jitter of sidebars on all browsers by switching to `sticky`

### 5.1.1 <small>_ April 17, 2020</small>

* Added new FontAwesome icons
* Fixed #1609: Instant loading doesn't honor `target=_blank`
* Fixed GitHub stars count rounding errors
* Fixed GitLab stars count retrieval

### 5.1.0 <small>_ April 12, 2020</small>

* Added support for icons from Markdown through [mkdocs-material-extensions][2]

  [2]: https://github.com/facelessuser/mkdocs-material-extensions

### 5.0.2 <small>_ April 10, 2020</small>

* Added CSS source maps to distribution files
* Fixed errors in Chinese (Traditional) translations
* Fixed creation of stale directory on installation from git
* Improved overflow scrolling behavior on iOS (reduced bundle size by `4kb`)

### 5.0.1 <small>_ April 7, 2020</small>

* Fixed syntax error in Spanish translation

### 5.0.0 <small>_ April 7, 2020</small>

* Reactive architecture – try `app.dialog$.next("Hi!")` in the console
* Instant loading – make Material behave like a Single Page Application
* Improved CSS customization with CSS variables – set your brand's colors
* Improved CSS resilience, e.g. proper sidebar locking for customized headers
* Improved icon integration and configuration – now including over 5k icons
* Added possibility to use any icon for logo, repository and social links
* Search UI does not freeze anymore (moved to web worker)
* Search index built only once when using instant loading
* Improved extensible keyboard handling
* Support for prebuilt search indexes
* Support for displaying stars and forks for GitLab repositories
* Support for scroll snapping of sidebars and search results
* Reduced HTML and CSS footprint due to deprecation of Internet Explorer support
* Slight facelifting of some UI elements (Admonitions, tables, ...)

### 4.6.3 <small>_ February 14, 2020</small>

* Removed optional third-party plugins from `requirements.txt`
* Updated Docker image to contain all supported third-party plugins

### 4.6.2 <small>_ February 8, 2020</small>

* Added Romanian translations
* Fixed #1451: Inconsistent spacing for fenced code blocks

### 4.6.1 <small>_ February 8, 2020</small>

* Fixed #1324: Metadata author only rendering first character
* Fixed #1393: Set `tabindex` to `0` for skip to content link
* Fixed code blocks after Markdown 3.2 release
* Fixed errors in Japanese translations
* Improved Google Lighthouse score

### 4.6.0 <small>_ December 11, 2019</small>

* Added support for [mkdocs-git-revision-date-localized-plugin][1]
* Fixed invalid character in Google Fonts URL

  [1]: https://github.com/timvink/mkdocs-git-revision-date-localized-plugin

### 4.5.1 <small>_ December 2, 2019</small>

* Added Thai translations
* Fixed missing assets in GitHub release `.zip` and `.tar.gz`

### 4.5.0 <small>_ November 16, 2019</small>

* Fixed #1330: Upgraded EmojiOne to Tweomji due to licensing issues
* Fixed #1339: Temporarily pinned PyMdown and Markdown due to
* Fixed errors in Greek translations
* Improved GitHub statistics retrieval

### 4.4.3 <small>_ October 3, 2019</small>

* Added Estonian translations
* Fixed removal of copyright banners in minified JavaScript
* Removed unnecessary title attributes from links in table of contents

### 4.4.2 <small>_ August 27, 2019</small>

* Added Afrikaans translations
* Fixed broken page title when `h1` contained HTML tags
* Improved accessibility for IE users
* Removed unnecessary `title` attributes from links in navigation

### 4.4.1 <small>_ August 22, 2019</small>

* Added support for `black` as a primary color
* Fixed broken footer bar when `h1` contained HTML tags

### 4.4.0 <small>_ June 15, 2019</small>

* Added Slovenian translations
* Reverted template minification in favor of `mkdocs-minify-plugin`
* Fixed #1114: Tabs don't reappear when default `font-size` is smaller than `16`

### 4.3.1 <small>_ May 23, 2019</small>

* Fixed spelling error in Danish translations

### 4.3.0 <small>_ May 17, 2019</small>

* Added support for changing header through metadata title property
* Added `font-display: swap` to Google Font loading logic
* Removed whitespace from templates, saving `4kb` (`.7kb` gzipped) per request
* Fixed alignment of repository icons on tablet and desktop

### 4.2.0 <small>_ April 28, 2019</small>

* Added Norwegian (Nynorsk) translations
* Fixed loss of focus in non-form input elements due to search hotkeys
* Fixed #1067: Search hotkeys not working for mobile/tablet screensize
* Fixed #1068: Search not correctly aligned for tablet screensize

### 4.1.2 <small>_ April 16, 2019</small>

* Fixed #1072: HTML tags appearing in navigation link titles

### 4.1.1 <small>_ March 28, 2019</small>

* Fixed minor CSS errors detected during validation

### 4.1.0 <small>_ March 22, 2019</small>

* Fixed #1023: Search for Asian languages broken after Lunr.js update
* Fixed #1026: contenteditable elements loose focus on hotkeys

### 4.0.2 <small>_ March 1, 2019</small>

* Fixed #1012: HTML character entities appear in search result titles

### 4.0.1 <small>_ February 13, 2019</small>

* Fixed #762, #816: Glitch in sidebar when collapsing items
* Fixed #869: Automatically expand details before printing

### 4.0.0 <small>_ February 13, 2019</small>

* Added background on hover for table rows
* Removed Google Tag Manager and reverted to Google Analytics
* Removed blocks in partials - Jinja doesn't support them
* Fixed #911: Chrome breaks layout if system language is Chinese (**BREAKING**)
* Fixed #976: Removed FastClick

### 3.3.0 <small>_ January 29, 2019</small>

* Moved Google Analytics integration into `head` using Google Tag Manager
* Fixed #972: Unicode slugifier breaks table of contents blur on scroll
* Fixed #974: Additional links in table of contents break blur on scroll

### 3.2.0 <small>_ December 28, 2018</small>

* Added support for redirects using metadata refresh
* Fixed #921: Load Google Analytics snippet asynchronously

### 3.1.0 <small>_ November 17, 2018</small>

* Added support for Progressive Web App Manifest
* Fixed #915: Search bug in Safari (upgraded Lunr.js)

### 3.0.6 <small>_ October 26, 2018</small>

* Added Taiwanese translations
* Fixed #906: JavaScript code blocks evaluated in search results

### 3.0.5 <small>_ October 23, 2018</small>

* Added Croatian and Indonesian translations
* Fixed #899: Skip-to-content link invalid from 2nd level on
* Fixed #902: Missing URL filter in footer for FontAwesome link

### 3.0.4 <small>_ September 3, 2018</small>

* Updated Dutch translations
* Fixed #856: Removed preconnect meta tag if Google Fonts are disabled

### 3.0.3 <small>_ August 7, 2018</small>

* Fixed #841: Additional path levels for extra CSS and JS

### 3.0.2 <small>_ August 6, 2018</small>

* Fixed #839: Lunr.js stemmer imports incorrect

### 3.0.1 <small>_ August 5, 2018</small>

* Fixed #838: Search result links incorrect

### 3.0.0 <small>_ August 5, 2018</small>

* Upgraded MkDocs to 1.0 (**BREAKING**)
* Upgraded Python in official Docker image to 3.6
* Added Serbian and Serbo-Croatian translations

### 2.9.4 <small>_ July 29, 2018</small>

* Fixed build error after MkDocs upgrade

### 2.9.3 <small>_ July 29, 2018</small>

* Added link to home for logo in drawer
* Fixed dependency problems between MkDocs and Tornado

### 2.9.2 <small>_ June 29, 2018</small>

* Added Hindi and Czech translations

### 2.9.1 <small>_ June 18, 2018</small>

* Added support for different spellings for theme color
* Fixed #799: Added support for webfont minification in production
* Fixed #800: Added `.highlighttable` as an alias for `.codehilitetable`

### 2.9.0 <small>_ June 13, 2018</small>

* Added support for theme color on Android
* Fixed #796: Rendering of nested tabbed code blocks

### 2.8.0 <small>_ June 10, 2018</small>

* Added support for grouping code blocks with tabs
* Added Material and FontAwesome icon fonts to distribution files (GDPR)
* Added note on compliance with GDPR
* Added Slovak translations
* Fixed #790: Prefixed `id` attributes with `__` to avoid name clashes

### 2.7.3 <small>_ April 26, 2018</small>

* Added Finnish translations

### 2.7.2 <small>_ April 9, 2018</small>

* Fixed rendering issue for `details` on Edge

### 2.7.1 <small>_ March 21, 2018</small>

* Added Galician translations
* Fixed #730: Scroll chasing error on home page if Disqus is enabled
* Fixed #736: Reset drawer and search upon back button invocation

### 2.7.0 <small>_ March 6, 2018</small>

* Added ability to set absolute URL for logo
* Added Hebrew translations

### 2.6.6 <small>_ February 22, 2018</small>

* Added preconnect for Google Fonts for faster loading
* Fixed #710: With tabs sidebar disappears if JavaScript is not available

### 2.6.5 <small>_ February 22, 2018</small>

* Reverted `--dev-addr` flag removal from `Dockerfile`

### 2.6.4 <small>_ February 21, 2018</small>

* Added Catalan translations
* Fixed incorrect margins for buttons in Firefox and Safari
* Replaced package manager `yarn` with `npm 5.6`
* Reverted GitHub stars rounding method
* Removed `--dev-addr` flag from `Dockerfile` for Windows compatibility

### 2.6.3 <small>_ February 18, 2018</small>

* Added Vietnamese translations

### 2.6.2 <small>_ February 12, 2018</small>

* Added Arabic translations
* Fixed incorrect rounding of amount of GitHub stars
* Fixed double-layered borders for tables

### 2.6.1 <small>_ February 11, 2018</small>

* Added ability to override Disqus integration using metadata
* Fixed #690: Duplicate slashes in source file URLs
* Fixed #696: Active page highlight not working with default palette
* Adjusted German translations

### 2.6.0 <small>_ February 2, 2018</small>

* Moved default search configuration to default translation (English)
* Added support to automatically set text direction from translation
* Added support to disable search stop word filter in translation
* Added support to disable search trimmer in translation
* Added Persian translations
* Fixed support for Polish search
* Fixed disappearing GitHub, GitLab and Bitbucket repository icons

### 2.5.5 <small>_ January 31, 2018</small>

* Added Hungarian translations

### 2.5.4 <small>_ January 29, 2018</small>

* Fixed #683: `gh-deploy` fails inside Docker

### 2.5.3 <small>_ January 25, 2018</small>

* Added Ukrainian translations

### 2.5.2 <small>_ January 22, 2018</small>

* Added default search language mappings for all localizations
* Fixed #673: Error loading non-existent search language
* Fixed #675: Uncaught reference error when search plugin disabled

### 2.5.1 <small>_ January 20, 2018</small>

* Fixed permalink for main headline
* Improved missing translation handling with English as a fallback
* Improved accessibility with skip-to-content link

### 2.5.0 <small>_ January 13, 2018</small>

* Added support for right-to-left languages

### 2.4.0 <small>_ January 11, 2018</small>

* Added focus state for clipboard buttons
* Fixed #400: Search bar steals tab focus
* Fixed search not closing on ++enter++ when result is selected
* Fixed search not closing when losing focus due to ++tab++
* Fixed collapsed navigation links getting focus
* Fixed `outline` being cut off on ++tab++ focus of navigation links
* Fixed bug with first search result navigation being ignored
* Removed search result navigation via ++tab++ (use ++up++ and ++down++)
* Removed `outline` resets for links
* Improved general tabbing behavior on desktop

### 2.3.0 <small>_ January 9, 2018</small>

* Added `example` (synonym: `snippet`) style for Admonition
* Added synonym `abstract` for `summary` style for Admonition

### 2.2.6 <small>_ December 27, 2017</small>

* Added Turkish translations
* Fixed unclickable area below header in case JavaScript is not available

### 2.2.5 <small>_ December 18, 2017</small>

* Fixed #639: Broken default favicon

### 2.2.4 <small>_ December 18, 2017</small>

* Fixed #638: Build breaks with Jinja < 2.9

### 2.2.3 <small>_ December 13, 2017</small>

* Fixed #630: Admonition sets padding on any last child
* Adjusted Chinese (Traditional) translations

### 2.2.2 <small>_ December 8, 2017</small>

* Added Dutch translations
* Adjusted targeted link and footnote offsets
* Simplified Admonition styles and fixed padding bug

### 2.2.1 <small>_ December 2, 2017</small>

* Fixed #616: Minor styling error with title-only admonition blocks
* Removed border for table of contents and improved spacing

### 2.2.0 <small>_ November 22, 2017</small>

* Added support for hero teaser
* Added Portuguese translations
* Fixed #586: Footnote backref target offset regression
* Fixed #605: Search stemmers not correctly loaded

### 2.1.1 <small>_ November 21, 2017</small>

* Replaced deprecated `babel-preset-es2015` with `babel-preset-env`
* Refactored Gulp build pipeline with Webpack
* Removed right border on sidebars
* Fixed broken color transition on header

### 2.1.0 <small>_ November 19, 2017</small>

* Added support for `white` as a primary color
* Added support for sliding site name and title
* Fixed redundant clipboard button when using line numbers on code blocks
* Improved header appearance by making it taller
* Improved tabs appearance
* Improved CSS customizability by leveraging inheritance
* Removed scroll shadows via `background-attachment`

### 2.0.4 <small>_ November 5, 2017</small>

* Fixed `details` not opening with footnote reference

### 2.0.3 <small>_ November 5, 2017</small>

* Added Japanese translations
* Fixed #540: Jumping to anchor inside `details` doesn't open it
* Fixed active link colors in footer

### 2.0.2 <small>_ November 1, 2017</small>

* Added Russian translations
* Fixed #542: Horizontal scrollbar between `1220px` and `1234px`
* Fixed #553: Metadata values only rendering first character
* Fixed #558: Flash of unstyled content
* Fixed favicon regression caused by deprecation upstream

### 2.0.1 <small>_ October 31, 2017</small>

* Fixed error when initializing search
* Fixed styles for link to edit the current page
* Fixed styles on nested admonition in details

### 2.0.0 <small>_ October 31, 2017</small>

* Upgraded MkDocs to 0.17.1 (__BREAKING__)
* Added support for easier configuration of search tokenizer
* Added support to disable search
* Added Korean translations

### 1.12.2 <small>_ October 26, 2017</small>

* Added Italian, Norwegian, French and Chinese translations

### 1.12.1 <small>_ October 22, 2017</small>

* Added Polish, Swedish and Spanish translations
* Improved downward compatibility with custom partials
* Temporarily pinned MkDocs version within Docker image to 0.16.3
* Fixed #519: Missing theme configuration file

### 1.12.0 <small>_ October 20, 2017</small>

* Added support for setting language(s) via `mkdocs.yml`
* Added support for default localization
* Added German and Danish translations
* Fixed #374: Search bar misalignment on big screens

### 1.11.0 <small>_ October 19, 2017</small>

* Added localization to clipboard
* Refactored localization logic

### 1.10.4 <small>_ October 18, 2017</small>

* Improved print styles of code blocks
* Improved search UX (don't close on enter if no selection)
* Fixed #495: Vertical scrollbar on short pages

### 1.10.3 <small>_ October 11, 2017</small>

* Fixed #484: Vertical scrollbar on some MathJax formulas
* Fixed #483: Footnote backref target offset regression

### 1.10.2 <small>_ October 6, 2017</small>

* Fixed #468: Sidebar shows scrollbar if content is shorter (in Safari)

### 1.10.1 <small>_ September 14, 2017</small>

* Fixed #455: Bold code blocks rendered with normal font weight

### 1.10.0 <small>_ September 1, 2017</small>

* Added support to make logo default icon configurable
* Fixed uninitialized overflow scrolling on main pane for iOS
* Fixed error in mobile navigation in case JavaScript is not available
* Fixed incorrect color transition for nested panes in mobile navigation
* Improved checkbox styles for Tasklist from PyMdown Extension package

### 1.9.0 <small>_ August 29, 2017</small>

* Added `info` (synonym: `todo`) style for Admonition
* Added `question` (synonym: `help`, `faq`) style for Admonition
* Added support for Details from PyMdown Extensions package
* Improved Admonition styles to match Details
* Improved styles for social links in footer
* Replaced ligatures with Unicode code points to avoid broken layout
* Upgraded PyMdown Extensions package dependency to >= 3.4

### 1.8.1 <small>_ August 7, 2017</small>

* Fixed #421: Missing pagination for GitHub API

### 1.8.0 <small>_ August 2, 2017</small>

* Added support for lazy-loading of search results for better performance
* Added support for customization of search tokenizer/separator
* Fixed #424: Search doesn't handle capital letters anymore
* Fixed #419: Search doesn't work on whole words

### 1.7.5 <small>_ July 25, 2017</small>

* Fixed #398: Forms broken due to search shortcuts
* Improved search overall user experience
* Improved search matching and highlighting
* Improved search accessibility

### 1.7.4 <small>_ June 21, 2017</small>

* Fixed functional link colors in table of contents for active palette
* Fixed #368: Compatibility issues with IE11

### 1.7.3 <small>_ June 7, 2017</small>

* Fixed error when setting language to Japanese for site search

### 1.7.2 <small>_ June 6, 2017</small>

* Fixed offset of search box when `repo_url` is not set
* Fixed non-disappearing tooltip

### 1.7.1 <small>_ June 1, 2017</small>

* Fixed wrong `z-index` order of header, overlay and drawer
* Fixed wrong offset of targeted footnote back references

### 1.7.0 <small>_ June 1, 2017</small>

* Added "copy to clipboard" buttons to code blocks
* Added support for multilingual site search
* Fixed search term highlighting for non-latin languages

### 1.6.4 <small>_ May 24, 2017</small>

* Fixed #337: JavaScript error for GitHub organization URLs

### 1.6.3 <small>_ May 16, 2017</small>

* Fixed #329: Broken source stats for private or unknown GitHub repos

### 1.6.2 <small>_ May 15, 2017</small>

* Fixed #316: Fatal error for git clone on Windows
* Fixed #320: Chrome 58 creates double underline for `abbr` tags
* Fixed #323: Ligatures rendered inside code blocks
* Fixed miscalculated sidebar height due to missing margin collapse
* Changed deprecated MathJax CDN to Cloudflare

### 1.6.1 <small>_ April 23, 2017</small>

* Fixed following of active/focused element if search input is focused
* Fixed layer order of search component elements

### 1.6.0 <small>_ April 22, 2017</small>

* Added build test for Docker image on Travis
* Added search overlay for better user experience (focus)
* Added language from localizations to `html` tag
* Fixed #270: source links broken for absolute URLs
* Fixed missing top spacing for first targeted element in content
* Fixed too small footnote divider when using larger font sizes

### 1.5.5 <small>_ April 20, 2017</small>

* Fixed #282: Browser search (<kbd>Meta</kbd>+<kbd>F</kbd>) is hijacked

### 1.5.4 <small>_ April 8, 2017</small>

* Fixed broken highlighting for two or more search terms
* Fixed missing search results when only a `h1` is present
* Fixed unresponsive overlay on Android

### 1.5.3 <small>_ April 7, 2017</small>

* Fixed deprecated calls for template variables
* Fixed wrong palette color for focused search result
* Fixed JavaScript errors on 404 page
* Fixed missing top spacing on 404 page
* Fixed missing right spacing on overflow of source container

### 1.5.2 <small>_ April 5, 2017</small>

* Added requirements as explicit dependencies in `setup.py`
* Fixed non-synchronized transitions in search form

### 1.5.1 <small>_ March 30, 2017</small>

* Fixed rendering and offset of targeted footnotes
* Fixed #238: Link on logo is not set to `site_url`

### 1.5.0 <small>_ March 24, 2017</small>

* Added support for localization of search placeholder
* Added keyboard events for quick access of search
* Added keyboard events for search control
* Added opacity on hover for search buttons
* Added git hook to skip CI build on non-src changes
* Fixed non-resetting search placeholder when input is cleared
* Fixed error for unescaped parentheses in search term
* Fixed #229: Button to clear search missing
* Fixed #231: Escape key doesn't exit search
* Removed old-style figures from font feature settings

### 1.4.1 <small>_ March 16, 2017</small>

* Fixed invalid destructuring attempt on NodeList (in Safari, Edge, IE)

### 1.4.0 <small>_ March 16, 2017</small>

* Added support for grouping searched sections by documents
* Added support for highlighting of search terms
* Added support for localization of search results
* Fixed #216: table of contents icon doesn't show if `h1` is not present
* Reworked style and layout of search results for better usability

### 1.3.0 <small>_ March 11, 2017</small>

* Added support for page-specific title and description using metadata
* Added support for linking source files to documentation
* Fixed jitter and offset of sidebar when zooming browser
* Fixed incorrectly initialized tablet sidebar height
* Fixed regression for #1: GitHub stars break if `repo_url` ends with a `/`
* Fixed undesired white line below copyright footer due to base font scaling
* Fixed issue with whitespace in path for scripts
* Fixed #205: support non-fixed (static) header
* Refactored footnote references for better visibility
* Reduced repaints to a minimum for non-tabs configuration
* Reduced contrast of edit button (slightly)

### 1.2.0 <small>_ March 3, 2017</small>

* Added `quote` (synonym: `cite`) style for Admonition
* Added help message to build pipeline
* Fixed wrong navigation link colors when applying palette
* Fixed #197: Link missing in tabs navigation on deeply nested items
* Removed unnecessary dev dependencies

### 1.1.1 <small>_ February 26, 2017</small>

* Fixed incorrectly displayed nested lists when using tabs

### 1.1.0 <small>_ February 26, 2017</small>

* Added tabs navigation feature (optional)
* Added Disqus integration (optional)
* Added a high resolution Favicon with the new logo
* Added static type checking using Facebook's Flow
* Fixed #173: Dictionary elements have no bottom spacing
* Fixed #175: Tables cannot be set to 100% width
* Fixed race conditions in build related to asset revisioning
* Fixed accidentally re-introduced Permalink on top-level headline
* Fixed alignment of logo in drawer on IE11
* Refactored styles related to tables
* Refactored and automated Docker build and PyPI release
* Refactored build scripts

### 1.0.5 <small>_ February 18, 2017</small>

* Fixed #153: Sidebar flows out of constrained area in Chrome 56
* Fixed #159: Footer jitter due to JavaScript if content is short

### 1.0.4 <small>_ February 16, 2017</small>

* Fixed #142: Documentation build errors if `h1` is defined as raw HTML
* Fixed #164: PyPI release does not build and install
* Fixed offsets of targeted headlines
* Increased sidebar font size by `0.12rem`

### 1.0.3 <small>_ January 22, 2017</small>

* Fixed #117: Table of contents items don't blur on fast scrolling
* Refactored sidebar positioning logic
* Further reduction of repaints

### 1.0.2 <small>_ January 15, 2017</small>

* Fixed #108: Horizontal scrollbar in content area

### 1.0.1 <small>_ January 14, 2017</small>

* Fixed massive repaints happening when scrolling
* Fixed footer back reference positions in case of overflow
* Fixed header logo from showing when the menu icon is rendered
* Changed scrollbar behavior to only show when content overflows

### 1.0.0 <small>_ January 13, 2017</small>

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
* Removed custom icon build in favor of the Material Design icon set
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

### 0.2.4 <small>_ June 26, 2016</small>

* Fixed improperly set default favicon
* Fixed #33: Protocol relative URL for webfonts doesn't work with `file://`
* Fixed #34: IE11 on Windows 7 doesn't honor `max-width` on `main` tag
* Fixed #35: Add styling for blockquotes

### 0.2.3 <small>_ May 16, 2016</small>

* Fixed #25: Highlight inline fenced blocks
* Fixed #26: Better highlighting for keystrokes
* Fixed #30: Suboptimal syntax highlighting for PHP

### 0.2.2 <small>_ March 20, 2016</small>

* Fixed #15: Document Pygments dependency for CodeHilite
* Fixed #16: Favicon could not be set through `mkdocs.yml`
* Fixed #17: Put version into own container for styling
* Fixed #20: Fix rounded borders for tables

### 0.2.1 <small>_ March 12, 2016</small>

* Fixed #10: Invisible header after closing search bar with <kbd>ESC</kbd> key
* Fixed #13: Table cells don't wrap
* Fixed empty list in table of contents when no headline is defined
* Corrected wrong path for static asset monitoring in Gulpfile.js
* Set up tracking of site search for Google Analytics

### 0.2.0 <small>_ February 24, 2016</small>

* Fixed #6: Include multiple color palettes via `mkdocs.yml`
* Fixed #7: Better colors for links inside admonition notes and warnings
* Fixed #9: Text for prev/next footer navigation should be customizable
* Refactored templates (replaced `if`/`else` with modifiers where possible)

### 0.1.3 <small>_ February 21, 2016</small>

* Fixed #3: Ordered lists within an unordered list have `::before` content
* Fixed #4: Click on Logo/Title without Github-Repository: `"None"`
* Fixed #5: Page without headlines renders empty list in table of contents
* Moved Modernizr to top to ensure basic usability in IE8

### 0.1.2 <small>_ February 16, 2016</small>

* Fixed styles for deep navigational hierarchies
* Fixed webfont delivery problem when hosted in subdirectories
* Fixed print styles in mobile/tablet configuration
* Added option to configure fonts in `mkdocs.yml` with fallbacks
* Changed styles for admonition notes and warnings
* Set download link to latest version if available
* Set up tracking of outgoing links and actions for Google Analytics

### 0.1.1 <small>_ February 11, 2016</small>

* Fixed #1: GitHub stars don't work if the repo_url ends with a `/`
* Updated NPM and Bower dependencies to most recent versions
* Changed footer/copyright link to Material theme to GitHub pages
* Made MkDocs building/serving in build process optional
* Set up continuous integration with Travis

### 0.1.0 <small>_ February 9, 2016</small>

* Initial release
