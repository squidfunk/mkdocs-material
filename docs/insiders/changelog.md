---
template: overrides/main.html
---

# Changelog

## Material for MkDocs Insiders

### 4.7.0 <small>_ January 25, 2022</small> { id="4.7.0" }

- Added native support for offline search

### 4.6.1 <small>_ January 16, 2022</small> { id="4.6.1" }

- Fixed #3459: Section index pages picking up wrong title

### 4.6.0 <small>_ January 11, 2022</small> { id="4.6.0" }

- Added support for annotations (outside of code blocks)

### 4.5.2 <small>_ January 8, 2022</small> { id="4.5.2" }

- Fixed #3440: Content tab indicator not moving when using linking
- Fixed #3445: Content tab switch flickers/jitters when using linking

### 4.5.1 <small>_ January 2, 2022</small> { id="4.5.1" }

- Added support for setting initial state of cookie consent
- Fixed #3396: Disappearing link in navigation due to Safari bug

### 4.5.0 <small>_ December 16, 2021</small> { id="4.5.0" }

- Added support for navigation icons

### 4.4.0 <small>_ December 10, 2021</small> { id="4.4.0" }

- Added support for code annotation anchor links (deep linking)
- Added new code annotation syntax modifier to strip comment
- Updated German translations for cookie consent

### 4.3.0 <small>_ December 5, 2021</small> { id="4.3.0" }

- Added support for custom fonts in social cards
- Fixed #3300: Announcement bar reappearing when using instant loading

### 4.2.0 <small>_ December 2, 2021</small> { id="4.2.0" }

- Added support for dismissable announcement bar
- Added support for named placeholders in feedback widget

### 4.1.0 <small>_ November 30, 2021</small> { id="4.1.0" }

- Added support for passing page title to feedback forms

### 4.0.0 <small>_ November 28, 2021</small> { id="4.0.0" }

- Removed deprecated content tabs legacy implementation
- Removed deprecated `seealso` admonition type
- Removed deprecated `site_keywords` setting (unsupported by MkDocs)
- Removed deprecated prebuilt search index support
- Removed deprecated web app manifest – use customization
- Removed `extracopyright` variable – use new `copyright` partial
- Removed Disqus integation – use customization
- Switched to `:is()` selectors for simple selector lists
- Switched autoprefixer from `last 4 years` to `last 2 years`
- Improved CSS overall to match modern standards
- Improved CSS variable semantics for fonts
- Improved extensibility by restructuring partials
- Improved handling of `details` when printing
- Improved keyboard navigation for footnotes
- Fixed #3214: Search highlighting breaks site when empty

### 3.2.3 <small>_ November 20, 2021</small> { id="3.2.3" }

- Updated Swedish and French translations
- Removed support for `.mermaid-experimental` class (now `.mermaid`)
- Fixed #3202: Cookie consent not dismissable on `file://` locations
- Fixed #3216: Cookie consent not dismissed when invoked via anchor
- Fixed #3232: Mermaid.js sometimes runs twice (race condition)

### 3.2.2 <small>_ November 6, 2021</small> { id="3.2.2" }

- Fixed always last feedback rating being sent
- Fixed #3145: Code annotations eat whole comment lines
- Fixed #3170: Feedback widget doesn't send data to GA4

### 3.2.1 <small>_ November 4, 2021</small> { id="3.2.1" }

- Added support for custom Mermaid.js version via additional JavaScript
- Fixed some configuration edge cases for tags plugin (3.1.5 regression)
- Fixed feedback widget title not being centered in Firefox
- Fixed #3179: Safari doesn't send request for feedback widget

### 3.2.0 <small>_ October 31, 2021</small> { id="3.2.0" }

- Added support for feedback widget (Was this page helpful?)

### 3.1.5 <small>_ October 28, 2021</small> { id="3.1.5" }

- Fixed #3144: Rogue link when using tags with auto-populated navigation
- Fixed #3147: Code block line numbers appear in search results
- Fixed #3158: Social cards do not strip HTML tags from title

### 3.1.4 <small>_ October 17, 2021</small> { id="3.1.4" }

- Fixed #2974: Text cropped with other fonts than `Roboto` in social plugin
- Fixed #3099: Encoding problems with non-latin character in social plugin
- Fixed #3112: Japanese segmenter not executed as part of new tokenizer
- Fixed tags (front matter) appearing in search with disabled tags plugin

### 3.1.3 <small>_ October 12, 2021</small> { id="3.1.3" }

- Added warnings to search plugin for unsupported options and syntax
- Fixed #3503: Search sometimes returns entire page
- Fixed #3089: Single-line code annotations disappear when printing

### 3.1.2 <small>_ October 6, 2021</small> { id="3.1.2" }

- Fixed incorrect path separators for social cards on Windows

### 3.1.1 <small>_ September 26, 2021</small> { id="3.1.1" }

- Fixed ordering bug in search exclusion logic

### 3.1.0 <small>_ September 26, 2021</small> { id="3.1.0" }

- Added support for excluding pages, sections, and elements from search
- Fixed #2803: Code block annotations not visible when printing

### 3.0.1 <small>_ September 19, 2021</small> { id="3.0.1" }

- Added support for using literal `h1-6` tags for search plugin
- Fixed search plugin breaking on void elements without slashes
- Fixed search plugin filtering link contents from headlines
- Fixed search plugin handling of multiple `h1` headlines
- Fixed search plugin handling of missing `h1` headlines

### 3.0.0 <small>_ September 13, 2021</small> { id="3.0.0" }

- Rewrite of MkDocs' search plugin
- Added support for rich search previews
- Added support for tokenizer with lookahead
- Improved search indexing performance (twice as fast)
- Improved search highlighting

### 2.13.3 <small>_ September 1, 2021</small> { id="2.13.3" }

- Added support for disabling social card generation

### 2.13.2 <small>_ August 25, 2021</small> { id="2.13.2" }

- Fixed #2965: Social plugin error when primary color is not defined

### 2.13.1 <small>_ August 21, 2021</small> { id="2.13.1" }

- Fixed #2948: Social cards are not cached
- Fixed #2953: Mermaid.js diagrams can't be centered anymore

### 2.13.0 <small>_ August 7, 2021</small> { id="2.13.0" }

- Added support for custom colors in social cards

### 2.12.2 <small>_ August 4, 2021</small> { id="2.12.2" }

- Fixed #2891: Division by zero error in social plugin

### 2.12.1 <small>_ July 26, 2021</small> { id="2.12.1" }

- Fixed error in social plugin when `site_description` was not set
- Fixed error in social plugin for non-ASCII characters

### 2.12.0 <small>_ July 25, 2021</small> { id="2.12.0" }

- Added support for social cards

### 2.11.1 <small>_ July 20, 2021</small> { id="2.11.1" }

- Fixed order of tags index, now sorted alphabetically

### 2.11.0 <small>_ July 18, 2021</small> { id="2.11.0" }

- Improved Mermaid.js intergration, now stable
- Added support for sequence diagrams
- Added support for entity relationship diagrams
- Added support for cookie consent configuration
- Added feature flag to always enable annotations

### 2.10.0 <small>_ July 10, 2021</small> { id="2.10.0" }

- Added support for cookie consent
- Fixed #2807: Back-to-top button not hidden when using sticky tabs

### 2.9.2 <small>_ May 30, 2021</small> { id="2.9.2" }

- Moved tags to partial for easier customization
- Added support for hiding tags on any page

### 2.9.1 <small>_ May 24, 2021</small> { id="2.9.1" }

- Added missing guard for linking of content tabs

### 2.9.0 <small>_ May 23, 2021</small> { id="2.9.0" }

- Added support for linking of content tabs

### 2.8.0 <small>_ May 12, 2021</small> { id="2.8.0" }

- Added support for boosting pages in search

### 2.7.2 <small>_ May 8, 2021</small> { id="2.7.2" }

- Fixed #2638: Warnings shown when using `tags` plugin without directory URLs

### 2.7.1 <small>_ May 3, 2021</small> { id="2.7.1" }

- Fixed `git-revision-date-localized` plugin integration (2.7.0 regression)

### 2.7.0 <small>_ May 1, 2021</small> { id="2.7.0" }

- Added support for tags (with search integration)

### 2.6.0 <small>_ April 11, 2021</small> { id="2.6.0" }

- Stay on page when switching versions

### 2.5.0 <small>_ March 28, 2021</small> { id="2.5.0" }

- Added support for version warning

### 2.4.0 <small>_ March 20, 2021</small> { id="2.4.0" }

- Added support for custom admonition icons
- Fixed #2444: Code block annotations with extra comments have wrong index

### 2.3.1 <small>_ March 14, 2021</small> { id="2.3.1" }

- Fixed anchor offset for permalinks when using sticky navigation tabs

### 2.3.0 <small>_ March 13, 2021</small> { id="2.3.0" }

- Added support for back-to-top button

### 2.2.1 <small>_ March 4, 2021</small> { id="2.2.1" }

- Fixed #2382: Repository stats failing when no release tag is present

### 2.2.0 <small>_ February 28, 2021</small> { id="2.2.0" }

- Added support for code block annotations

### 2.1.0 <small>_ February 26, 2021</small> { id="2.1.0" }

- Added support for anchor tracking

### 2.0.0 <small>_ February 24, 2021</small> { id="2.0.0" }

- Migrated Insiders to the new architecture
- Swapped color palette toggle configuration

### 1.17.0 <small>_ January 31, 2021</small> { id="1.17.0" }

- Added support for section index pages

### 1.16.1 <small>_ January 26, 2021</small> { id="1.16.1" }

- Fixed #2249: Instant loading + sticky tabs result in invalid links
- Fixed #2248: Search highlighting URL parameter always added
- Fixed #2235: Version selector doesn't select current version for aliases

### 1.16.0 <small>_ January 7, 2021</small> { id="1.16.0" }

- Added latest release to repository info (GitHub)
- Slight facelift of repository info (lighter fonts, spacing and icons)

### 1.15.0 <small>_ January 2, 2021</small> { id="1.15.0" }

- Added support for native Mermaid.js integration

### 1.14.0 <small>_ December 30, 2020</small> { id="1.14.0" }

- Added support for sharing searches

### 1.13.2 <small>_ December 22, 2020</small> { id="1.13.2" }

- Fixed version selector + sticky tabs navigation rendering issues
- Fixed version selector wrapping

### 1.13.1 <small>_ December 20, 2020</small> { id="1.13.1" }

- Removed horizontal scrollbars on language and version selector
- Fixed type conversion in JavaScript config

### 1.13.0 <small>_ December 13, 2020</small> { id="1.13.0" }

- Refactored navigation tabs to simplify grouping behavior
- Added support for sticky navigation tabs
- Added support for arbitrary links in navigation tabs
- Fixed #2098: Subsequent active subsection not highlighted correctly

### 1.12.1 <small>_ December 8, 2020</small> { id="1.12.1" }

- Fixed empty language selector being shown

### 1.12.0 <small>_ December 6, 2020</small> { id="1.12.0" }

- Added support for adding a language selector

### 1.11.2 <small>_ November 29, 2020</small> { id="1.11.2" }

- Fixed #2068: Search highlight interprets code blocks as JavaScript

### 1.11.1 <small>_ November 29, 2020</small> { id="1.11.1" }

- Refactored styling to be more stable and easier to adjust
- Fixed some styling regressions from latest features

### 1.11.0 <small>_ November 22, 2020</small> { id="1.11.0" }

- Added support for rendering admonitions as inline blocks

### 1.10.0 <small>_ November 15, 2020</small> { id="1.10.0" }

- Added support for integrating table of contents into navigation

### 1.9.0 <small>_ November 7, 2020</small> { id="1.9.0" }

- Added support for hiding navigation and table of contents on any page
- Removed autohiding table of contents when empty

### 1.8.0 <small>_ November 1, 2020</small> { id="1.8.0" }

- Added support for navigation sections
- Fixed appearance of inactive search suggestions

### 1.7.0 <small>_ October 25, 2020</small> { id="1.7.0" }

- Added support for deploying multiple versions
- Fixed alignment of sidebar when content area is too small

### 1.6.0 <small>_ October 11, 2020</small> { id="1.6.0" }

- Added support for search suggestions to save keystrokes
- Added support for removing __Made with Material for MkDocs__ from footer
- Fixed #1915: search should go to first result by pressing ++enter++

### 1.5.1 <small>_ September 21, 2020</small> { id="1.5.1" }

- Fixed content area stretching to whole width for long code blocks

### 1.5.0 <small>_ September 19, 2020</small> { id="1.5.0" }

- Added support for autohiding table of contents when empty

### 1.4.1 <small>_ September 6, 2020</small> { id="1.4.1" }

- Improved typeahead and search result relevance and scoring

### 1.4.0 <small>_ August 30, 2020</small> { id="1.4.0" }

- Added support for autohiding header on scroll

### 1.3.0 <small>_ August 26, 2020</small> { id="1.3.0" }

- Added support for user-selectable color palettes

### 1.2.0 <small>_ August 11, 2020</small> { id="1.2.0" }

- Added feature to expand navigation by default

### 1.1.0 <small>_ August 3, 2020</small> { id="1.1.0" }

- Added highlighting of search results

### 1.0.0 <small>_ July 14, 2020</small> { id="1.0.0" }

- Added grouping of search results
- Added missing query terms to search result
- Improved search result relevance and scoring
