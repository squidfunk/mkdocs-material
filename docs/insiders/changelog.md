---
template: overrides/main.html
---

# Changelog

## Material for MkDocs Insiders

### 2.13.2 <small>_ August 25, 2021</small>

- Fixed #2965: Social plugin error when primary color is not defined

### 2.13.1 <small>_ August 21, 2021</small>

- Fixed #2948: Social cards are not cached
- Fixed #2953: Mermaid.js diagrams can't be centered anymore

### 2.13.0 <small>_ August 7, 2021</small>

- Added support for custom colors in social cards

### 2.12.2 <small>_ August 4, 2021</small>

- Fixed #2891: Division by zero error in social plugin

### 2.12.1 <small>_ July 26, 2021</small>

- Fixed error in social plugin when `site_description` was not set
- Fixed error in social plugin for non-ASCII characters

### 2.12.0 <small>_ July 25, 2021</small>

- Added support for social cards

### 2.11.1 <small>_ July 20, 2021</small>

- Fixed order of tags index, now sorted alphabetically

### 2.11.0 <small>_ July 18, 2021</small>

- Improved Mermaid.js intergration, now stable
- Added support for sequence diagrams
- Added support for entity relationship diagrams
- Added support for cookie consent configuration
- Added feature flag to always enable annotations

### 2.10.0 <small>_ July 10, 2021</small>

- Added support for cookie consent
- Fixed #2807: Back-to-top button not hidden when using sticky tabs

### 2.9.2 <small>_ May 30, 2021</small>

- Moved tags to partial for easier customization
- Added support for hiding tags on any page

### 2.9.1 <small>_ May 24, 2021</small>

- Added missing guard for linking of content tabs

### 2.9.0 <small>_ May 23, 2021</small>

- Added support for linking of content tabs

### 2.8.0 <small>_ May 12, 2021</small>

- Added support for boosting pages in search

### 2.7.2 <small>_ May 8, 2021</small>

- Fixed #2638: Warnings shown when using `tags` plugin without directory URLs

### 2.7.1 <small>_ May 3, 2021</small>

- Fixed `git-revision-date-localized` plugin integration (2.7.0 regression)

### 2.7.0 <small>_ May 1, 2021</small>

- Added support for tags (with search integration)

### 2.6.0 <small>_ April 11, 2021</small>

- Stay on page when switching versions

### 2.5.0 <small>_ March 28, 2021</small>

- Added support for version warning

### 2.4.0 <small>_ March 20, 2021</small>

- Added support for custom admonition icons
- Fixed #2444: Code block annotations with extra comments have wrong index

### 2.3.1 <small>_ March 14, 2021</small>

- Fixed anchor offset for permalinks when using sticky navigation tabs

### 2.3.0 <small>_ March 13, 2021</small>

- Added support for back-to-top button

### 2.2.1 <small>_ March 4, 2021</small>

- Fixed #2382: Repository stats failing when no release tag is present

### 2.2.0 <small>_ February 28, 2021</small>

- Added support for code block annotations

### 2.1.0 <small>_ February 26, 2021</small>

- Added support for anchor tracking

### 2.0.0 <small>_ February 24, 2021</small>

- Migrated Insiders to the new architecture
- Swapped color palette toggle configuration

### 1.17.0 <small>_ January 31, 2021</small>

- Added support for section index pages

### 1.16.1 <small>_ January 26, 2021</small>

- Fixed #2249: Instant loading + sticky tabs result in invalid links
- Fixed #2248: Search highlighting URL parameter always added
- Fixed #2235: Version selector doesn't select current version for aliases

### 1.16.0 <small>_ January 7, 2021</small>

- Added latest release to repository info (GitHub)
- Slight facelift of repository info (lighter fonts, spacing and icons)

### 1.15.0 <small>_ January 2, 2021</small>

- Added support for native Mermaid.js integration

### 1.14.0 <small>_ December 30, 2020</small>

- Added support for sharing searches

### 1.13.2 <small>_ December 22, 2020</small>

- Fixed version selector + sticky tabs navigation rendering issues
- Fixed version selector wrapping

### 1.13.1 <small>_ December 20, 2020</small>

- Removed horizontal scrollbars on language and version selector
- Fixed type conversion in JavaScript config

### 1.13.0 <small>_ December 13, 2020</small>

- Refactored navigation tabs to simplify grouping behavior
- Added support for sticky navigation tabs
- Added support for arbitrary links in navigation tabs
- Fixed #2098: Subsequent active subsection not highlighted correctly

### 1.12.1 <small>_ December 8, 2020</small>

- Fixed empty language selector being shown

### 1.12.0 <small>_ December 6, 2020</small>

- Added support for adding a language selector

### 1.11.2 <small>_ November 29, 2020</small>

- Fixed #2068: Search highlight interprets code blocks as JavaScript

### 1.11.1 <small>_ November 29, 2020</small>

- Refactored styling to be more stable and easier to adjust
- Fixed some styling regressions from latest features

### 1.11.0 <small>_ November 22, 2020</small>

- Added support for rendering admonitions as inline blocks

### 1.10.0 <small>_ November 15, 2020</small>

- Added support for integrating table of contents into navigation

### 1.9.0 <small>_ November 7, 2020</small>

- Added support for hiding navigation and table of contents on any page
- Removed autohiding table of contents when empty

### 1.8.0 <small>_ November 1, 2020</small>

- Added support for navigation sections
- Fixed appearance of inactive search suggestions

### 1.7.0 <small>_ October 25, 2020</small>

- Added support for deploying multiple versions
- Fixed alignment of sidebar when content area is too small

### 1.6.0 <small>_ October 11, 2020</small>

- Added support for search suggestions to save keystrokes
- Added support for removing __Made with Material for MkDocs__ from footer
- Fixed #1915: search should go to first result by pressing ++enter++

### 1.5.1 <small>_ September 21, 2020</small>

- Fixed content area stretching to whole width for long code blocks

### 1.5.0 <small>_ September 19, 2020</small>

- Added support for autohiding table of contents when empty

### 1.4.1 <small>_ September 6, 2020</small>

- Improved typeahead and search result relevance and scoring

### 1.4.0 <small>_ August 30, 2020</small>

- Added support for autohiding header on scroll

### 1.3.0 <small>_ August 26, 2020</small>

- Added support for user-selectable color palettes

### 1.2.0 <small>_ August 11, 2020</small>

- Added feature to expand navigation by default

### 1.1.0 <small>_ August 3, 2020</small>

- Added highlighting of search results

### 1.0.0 <small>_ July 14, 2020</small>

- Added grouping of search results
- Added missing query terms to search result
- Improved search result relevance and scoring
