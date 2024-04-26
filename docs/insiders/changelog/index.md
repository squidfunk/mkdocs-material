# Changelog

## Material for MkDocs Insiders

### 4.53.8 <small>April 26, 2024</small> { id="4.53.8" }

- Fixed #7052: Preview extension automatically including all pages
- Fixed #7051: Instant previews mounting on footnote references
- Fixed #5165: Improved tooltips not mounting in sidebar for typeset plugin

### 4.53.7 <small>April 25, 2024</small> { id="4.53.7" }

- Fixed #7060: Incorrect resolution of translation when using static-i18n

### 4.53.6 <small>April 5, 2024</small> { id="4.53.6" }

- Ensure working directory is set for projects when using projects plugin
- Fixed #6970: Incorrect relative paths in git submodules with projects plugin

### 4.53.5 <small>April 2, 2024</small> { id="4.53.5" }

- Fixed social plugin crashing when no colors are specified in palettes

### 4.53.4 <small>March 31, 2024</small> { id="4.53.4" }

- Fixed #6973: Escaping issue in tags extra files deprecation helper

### 4.53.3 <small>March 23, 2024</small> { id="4.53.3" }

- Added support for font variants in social plugin
- Improved resilience of font resolution in social plugin
- Fixed tag listing sometimes not being auto-populated
- Fixed tag listing scope not being correctly resolved
- Fixed #6941: Meta plugin adding duplicate entries
- Fixed #6928: Social plugin crashes for some fonts

### 4.53.2 <small>March 18, 2024</small> { id="4.53.2" }

- Fixed abort on first non-matching configuration in preview extension
- Fixed #6914: Meta files take precedence over front matter

### 4.53.1 <small>March 6, 2024</small> { id="4.53.1" }

- Fixed #6877: Projects plugin computes incorrect path to assets
- Fixed #6869: Blog plugin should emit warning on invalid related link

### 4.53.0 <small>February 24, 2024</small> { id="4.53.0" }

- Added support for automatic instant previews
- Added support for pinned blog posts

### 4.52.3 <small>February 21, 2024</small> { id="4.52.3" }

- Fixed resolution of URLs in instant previews
- Fixed instant previews not mounting for same-page links

### 4.52.2 <small>February 7, 2024</small> { id="4.52.2" }

- Fixed #6735: Instant previews misplaced when below tabs

### 4.52.1 <small>January 30, 2024</small> { id="4.52.1" }

- Fixed #6705: Navigation path not being hidden when specified
- Fixed #6703: New tags plugin crashes on Windows (2nd attempt)

### 4.52.0 <small>January 28, 2024</small> { id="4.52.0" }

- Added support for instant previews
- Fixed footnote tooltips positioning edge cases
- Fixed #6703: New tags plugin crashes on Windows

### 4.51.0 <small>January 24, 2024</small> { id="4.51.0" }

- Added support for footnote tooltips

### 4.50.0 <small>January 19, 2024</small> { id="4.50.0" }

- Added configurable logging capabilities to privacy plugin

### 4.49.2 <small>January 9, 2024</small> { id="4.49.2" }

- Fixed missing attribute lists extension for tags plugin
- Fixed #6627: New tags plugin crashes on Python 3.8

### 4.49.1 <small>January 7, 2024</small> { id="4.49.1" }

- Improved interop of new tags plugin with other plugins
- Fixed #6594: Tags plugin doesn't work with mkdocs-macros plugin
- Fixed #6569: Social plugin crashes if in different file system location

### 4.49.0 <small>December 29, 2023</small> { id="4.49.0" }

- Added support for exporting tags and mappings
- Added support for disabling tags and/or listings or both
- Fixed tag links from pages to listings on homepage

### 4.48.0 <small>December 23, 2023</small> { id="4.48.0" }

- Rewrite of tags plugin, now much more powerful
- Added support for nested tags (tag hierarchies, e.g. foo/bar)
- Added support for shadow tags (by list, prefix or suffix)
- Added support for custom tag layouts and templates
- Added support for hiding tags in table of contents
- Added support for configurable inline tag listings
- Added support for automatically linking to closest tag listing
- Added support for scoped listings (limit to subsection of site)
- Added support for multiple instances of tags plugin
- Added support for changing front matter property and template variable
- Added support for tag slugification format strings
- Fixed #6510: Projects plugin out of memory on Linux (4.47.1 regression)
- Fixed projects plugin not notifying plugins about serve mode
- Fixed projects plugin skipping projects on prefix match
- Deprecated tags_file and tags_extra_files settings
- Modernized tags plugin code base

### 4.47.1 <small>December 11, 2023</small> { id="4.47.1" }

- Improved editing experience for projects plugin
- Improved resilience of optimize and social plugin
- Fixed race condition when writing manifest in optimize and social plugin
- Fixed #6475: Logo not taking precedence over icon in social card
- Fixed #6399: Projects plugin doesn't pick up added/removed projects
- Fixed #6306: Projects plugin cache not correctly updated

### 4.47.0 <small>December 8, 2023</small> { id="4.47.0" }

- Added support for staying on page when switching languages
- Added configurable logging capabilities to projects plugin
- Removed temporary warning on blog plugin authors file format change
- Fixed projects plugin logging messages twice on Linux systems
- Fixed projects plugin trying to hoist theme assets of divergent themes
- Fixed compatibility of optimize plugin and projects plugin
- Fixed compatibility of social plugin and projects plugin
- Fixed #6448: Code line selection broken for code blocks with custom ids
- Fixed #6437: Projects plugin crashing for certain site URL configurations
- Fixed #6414: Projects plugin doesn't prefix messages coming from projects

### 4.46.0 <small>November 26, 2023</small> { id="4.46.0" }

- Added support for author profiles in blog plugin
- Fixed custom index pages yielding two navigation items (4.45.0 regression)

### 4.45.0 <small>November 24, 2023</small> { id="4.45.0" }

- Added support for sorting blog categories by post count or custom function
- Improved tags plugin to generate Unicode-aware slugs by default
- Fixed non-deterministic order of multiple authors in blog plugin

### 4.44.0 <small>November 23, 2023</small> { id="4.44.0" }

- Added pagination settings for archive pages in blog plugin
- Added pagination settings for category pages in blog plugin

### 4.43.1 <small>November 19, 2023</small> { id="4.43.1" }

- Added third-party theme support in projects plugin, improving editing
- Fixed #6360: Projects plugin crashes when theme is not Material for MkDocs
- Fixed #6306: Projects plugin not reloading nested project configuration

### 4.43.0 <small>November 5, 2023</small> { id="4.43.0" }

- Added support for GitLab committers (document contributors)
- Fixed #6264: Fixed compatibility with Python < 3.10
- Fixed #6254: Meta plugin not applying meta files to blog posts

### 4.42.3 <small>October 27, 2023</small> { id="4.42.3" }

- Fixed #6251: Cards in grids cut off on very small screens
- Fixed #6241: Using social plugin + static-i18n plugin errors

### 4.42.2 <small>October 14, 2023</small> { id="4.42.2" }

- Fixed #6186: Privacy plugin ignores hash fragments on images
- Fixed #6180: Projects plugin crashing when adding or removing files

### 4.42.1 <small>October 5, 2023</small> { id="4.42.1" }

- Fixed spacing of related links in blog posts on small screens

### 4.42.0 <small>September 19, 2023</small> { id="4.42.0" }

- Added support for using git submodules in projects plugin
- Added support for transforming project configurations
- Improved resilience of optimize and blog plugin
- Fixed optimize plugin crashing on `.jpeg` extension
- Fixed project URLs not using site URLs in projects plugin

### 4.41.0 <small>September 11, 2023</small> { id="4.41.0" }

- Improved multi-instance support for optimize plugin
- Added inclusion and exclusion patterns for optimize plugin
- Added transparent keyword for color handling in social plugin
- Changed default quality of PNGs to 3 in optimize plugin
- Fixed #5979: meta file not detected in root of docs directory

### 4.40.4 <small>September 4, 2023</small> { id="4.40.4" }

- Fixed privacy plugin choking on boolean HTML5 attributes
- Fixed wrapping of inline code blocks in typeset table of contents
- Fixed blog plugin error when running under dirty reload

### 4.40.3 <small>September 2, 2023</small> { id="4.40.3" }

- Fixed #5946: Docker image missing pngquant for optimize plugin

### 4.40.2 <small>August 31, 2023</small> { id="4.40.2" }

- Added configurable error handling capabilities for social plugin
- Fixed #5922: Blog plugin shows no posts when building a standalone blog
- Fixed #5914: Tags plugin tags_extra_files errors (4.39.3 regression)
- Fixed #5904: Blog plugin sometimes excludes files (4.40.1 regression)

### 4.40.1 <small>August 27, 2023</small> { id="4.40.1" }

- Fixed #5902: ResizeObserver polyfill not detected by privacy plugin
- Fixed empty category pages in blog plugin (4.40.0 regression)

### 4.40.0 <small>August 26, 2023</small> { id="4.40.0" }

- Added logo, title and description options to social plugin default layouts
- Fixed privacy plugin compatibility issue with Python < 3.10
- Fixed #5896: Blog plugin errors when using custom index pages

### 4.39.3 <small>August 24, 2023</small> { id="4.39.3" }

- Fixed lxml dependency missing in Docker container (4.39.2 regression)

### 4.39.2 <small>August 23, 2023</small> { id="4.39.2" }

- Fixed color palette toggle being reversed (9.2.0 regression)

### 4.39.1 <small>August 21, 2023</small> { id="4.39.1" }

- Fixed git diff in tags plugin after merging back 9.2.0 changes

### 4.39.0 <small>August 3, 2023</small> { id="4.39.0" }

- Added support for hoisting theme media files when building projects
- Added support for sorting pages on tags index for tags plugin
- Added support for adding date of last update to blog posts
- Fixed #5797: Parse error in typeset plugin (4.38.1 regression)

### 4.38.1 <small>August 1, 2023</small> { id="4.38.1" }

- Improved nested serve mode for projects plugin
- Improved compat in privacy plugin with third-party plugins
- Fixed #5790: Typeset plugin ignores data-toc-label attribute
- Fixed #5778: Interplay of privacy plugin with git-revision-date-localized
- Fixed #5773: Info plugin erroring when community edition is in beta

### 4.38.0 <small>July 29, 2023</small> { id="4.38.0" }

- Added projects plugin for building nested projects
- Updated privacy plugin to new MkDocs API

### 4.37.1 <small>July 28, 2023</small> { id="4.37.1" }

- Updated MkDocs to 1.5.1
- Fixed deprecation warning in social plugin due to MkDocs upgrade
- Fixed #5772: Privacy plugin fails due to API change in MkDocs

### 4.37.0 <small>July 7, 2023</small> { id="4.37.0" }

- Added support for overriding social cards settings per page
- Added new social card `default/only/image` layout
- Improved resilience of optimize and social plugin
- Fixed rendering bugs for pruned navigation items
- Fixed jumping of content tabs anchor links when instant loading is enabled
- Fixed #5676: Optimize plugin doesn't check for `pngquant`

### 4.36.1 <small>June 23, 2023</small> { id="4.36.1" }

- Fixed #5618: Date comparison breaking for drafts in blog plugin

### 4.36.0 <small>June 15, 2023</small> { id="4.36.0" }

- Added support for instant prefetching to speed up slow connections
- Improved stability of anchor link removal in built-in typeset plugin
- Improved performance of regular expressions in typeset plugin
- Removed unnecessary import test for `cairosvg` in optimize plugin
- Fixed #5590: Regular expression for anchor link removal too greedy

### 4.35.3 <small>June 1, 2023</small> { id="4.35.3" }

- Fixed #5579: Abbreviations in headlines filtered by typeset plugin

### 4.35.2 <small>May 29, 2023</small> { id="4.35.2" }

- Fixed #5555: Blog plugin crashes when computing readtime for emojis

### 4.35.1 <small>May 20, 2023</small> { id="4.35.1" }

- Fixed internal handling of errors in social plugin

### 4.35.0 <small>May 20, 2023</small> { id="4.35.0" }

- Improve editing experience and stability of social plugin
- Added support for custom layout syntax validation in social plugin
- Added support for layer origin for easier placement in social plugin
- Added support for in- and exclusion patterns in social plugin
- Catch and print syntax errors in custom layouts

### 4.34.1 <small>May 16, 2023</small> { id="4.34.1" }

- Disable social plugin debug mode by default on mkdocs build
- Added warning in social plugin debug mode when font style couldn't be found
- Set default concurrency of built-in multi-threaded plugins to CPUs - 1
- Fixed #5521: Social plugin triggers race condition when downloading fonts
- Fixed #5515: Social plugin crashes when concurrency is set to 1

### 4.34.0 <small>May 14, 2023</small> { id="4.34.0" }

- Added support for new overflow mode to auto-fit text in social plugin
- Reduced subtle rendering bugs in (code) annotations due to subpixel rounding
- Improved print styles for (code) annotation lists
- Improved performance of social plugin, now 3x as fast
- Improved interop of typeset plugin with MkDocstrings
- Fixed logo location for variants of default template in social plugin
- Fixed #5446: Built-in typeset plugin picks up headings in code blocks

### 4.33.2 <small>May 12, 2023</small> { id="4.33.2" }

- Fixed #5508: Social plugin crashes trying to copy cards on Docker/Windows
- Fixed #5507: Social plugin crashes on serve when layouts folder doesn't exist
- Fixed #5505: Social plugin trying to resolve logo in wrong location
- Fixed #5496: Annotations with nested lists incorrectly mounted
- Fixed #5493: Social plugin crashes on Python 3.8

### 4.33.1 <small>May 9, 2023</small> { id="4.33.1" }

- Added support for SVG background images in social plugin

### 4.33.0 <small>May 8, 2023</small> { id="4.33.0" }

- Added support for custom layouts for social plugin
- Added support for background images for social cards

### 4.32.6 <small>April 22, 2023</small> { id="4.32.6" }

- Fixed #5336: Interplay of blog plugin with git-revision-date-localized

### 4.32.5 <small>April 7, 2023</small> { id="4.32.5" }

- Fixed #5322: Navigation tabs hoist nested page icons

### 4.32.4 <small>March 24, 2023</small> { id="4.32.4" }

- Fixed #5241: Built-in typeset plugin jams navigation for anchors in headings

### 4.32.3 <small>March 9, 2023</small> { id="4.32.3" }

- Fixed Docker image release workflow (9.1.0 regression)
- Fixed #5159: Missing underline for abbreviations (9.1.0 regression)

### 4.32.2 <small>February 23, 2023</small> { id="4.32.2" }

- Fixed #5127: Privacy plugin not handling large number of occurrences
- Fixed #5126: Privacy plugin breaks when replacing specific emojis

### 4.32.1 <small>February 23, 2023</small> { id="4.32.1" }

- Fixed code block spans interfering with copying
- Fixed #5077: Privacy plugin breaks image `alt` text encoding
- Fixed #5079: Privacy plugin removing `rel=me` on external links

### 4.32.0 <small>February 19, 2023</small> { id="4.32.0" }

- Added support for custom selectors for code annotations
- Added support for code line range selection for better sharing

### 4.31.0 <small>February 18, 2023</small> { id="4.31.0" }

- Added support for table of contents on blog index and archive pages
- Fixed #4512: Allow custom search field boosts (experimental)

### 4.30.2 <small>February 13, 2023</small> { id="4.30.2" }

- Fixed privacy plugin excludes not working (4.30.0 regression)

### 4.30.1 <small>February 12, 2023</small> { id="4.30.1" }

- Fixed privacy plugin not handling static templates (e.g. `404.html`)

### 4.30.0 <small>February 6, 2023</small> { id="4.30.0" }

- Rewrite of privacy plugin for concurrency, now twice as fast
- Added support for explicit inclusion for privacy plugin
- Added optimization support for privacy plugin (+ optimize plugin)

### 4.29.0 <small>January 21, 2023</small> { id="4.29.0" }

- Added built-in optimize plugin for automatically compressing images
- Switched reporting in built-in privacy plugin to `info` level

### 4.28.1 <small>January 17, 2023</small> { id="4.28.1" }

- Fixed built-in info plugin erroring for Insiders on version check
- Fixed #4865: Navigation paths render bug when there's no top-level section
- Fixed #4875: Added support for hiding navigation paths
- Improved navigation path to not render for a single item

### 4.28.0 <small>January 14, 2023</small> { id="4.28.0" }

- Added support for navigation path (breadcrumbs)

### 4.27.1 <small>December 20, 2022</small> { id="4.27.1" }

- Fixed rendering of succeeding navigation items in typeset plugin
- Fixed #4795: Built-in typeset plugin changes MkDocs' title precedence
- Fixed #4724: Blog plugin not rendering integrate table of contents

### 4.27.0 <small>December 20, 2022</small> { id="4.27.0" }

- Added built-in typeset plugin to preserve formatting in sidebars
- Added URL and table of contents support for blog categories

### 4.26.6 <small>November 28, 2022</small> { id="4.26.6" }

- Fixed #4683: Tags plugin crashes when a tag is empty

### 4.26.5 <small>November 27, 2022</small> { id="4.26.5" }

- Fixed #4632: Post excerpt title link doesn't point to top of the page

### 4.26.4 <small>November 27, 2022</small> { id="4.26.4" }

- Fixed redundant file extension when using privacy plugin

### 4.26.3 <small>November 15, 2022</small> { id="4.26.3" }

- Fixed #4637: Attachments w/o titles in related links error in blog plugin
- Fixed #4631: Remote favicons not downloaded and inlined by privacy plugin

### 4.26.2 <small>November 3, 2022</small> { id="4.26.2" }

- Updated MkDocs to 1.4.2
- Added support for tag compare functions when sorting on index pages
- Fixed footnotes being rendered in post excerpts without separators
- Fixed error in blog plugin when `toc` extension is not enabled
- Fixed issues with invalid asset paths and linked post titles
- Fixed #4572: Privacy plugin fails when symlinks cannot be created
- Fixed #4545: Blog plugin doesn't automatically link headline to post
- Fixed #4542: Blog plugin doesn't allow for multiple instances
- Fixed #4532: Blog plugin doesn't allow for mixed use of date and datetime

### 4.26.1 <small>October 22, 2022</small> { id="4.26.1" }

- Improved reporting of configuration errors in tags plugin
- Fixed #4515: Privacy plugin fails when site URL is not defined
- Fixed #4514: Privacy plugin doesn't fetch Google fonts (4.26.0 regression)

### 4.26.0 <small>October 18, 2022</small> { id="4.26.0" }

- Refactored privacy plugin to prepare for new features
- Added support for `rel=noopener` links in privacy plugin
- Resolve encoding issues with blog and privacy plugin

### 4.25.5 <small>October 16, 2022</small> { id="4.25.5" }

- Updated MkDocs to 1.4.1
- Added namespace prefix to built-in plugins
- Updated `content` and `header` partial

### 4.25.4 <small>October 9, 2022</small> { id="4.25.4" }

- Fixed other path issues for standalone blogs (4.24.2 regression)

### 4.25.3 <small>October 9, 2022</small> { id="4.25.3" }

- Fixed #4457: Posts not collected for standalone blog (4.24.2 regression)

### 4.25.2 <small>October 4, 2022</small> { id="4.25.2" }

- Fixed #4452: Blog and tags plugin crash when specifying slugify function

### 4.25.1 <small>October 3, 2022</small> { id="4.25.1" }

- Updated `mkdocs-rss-plugin` in `Dockerfile` to fix MkDocs compat errors

### 4.25.0 <small>October 2, 2022</small> { id="4.25.0" }

- Added support for navigation subtitles
- Added support for defining an allow list for built-in tags plugin
- Added support for custom slugify functions for built-in tags plugin
- Improved stability of search plugin when using `--dirtyreload`

### 4.24.2 <small>October 1, 2022</small> { id="4.24.2" }

- Updated MkDocs to 1.4
- Fixed compatibility issues with MkDocs 1.4
- Fixed incorrectly generated paths in privacy plugin
- Fixed blog index page not showing navigation when using meta plugin

### 4.24.1 <small>September 30, 2022</small> { id="4.24.1" }

- Fixed #4430: build error when enabling consent without repository URL

### 4.24.0 <small>September 27, 2022</small> { id="4.24.0" }

- Added support for custom content on index pages (blog)
- Added support for keeping content on paginated index pages (blog)
- Added support for limiting categories in post excerpts (blog)
- Added support for simple override of templates via front matter (blog)
- Added icon in navigation for pages with encrypted content
- Fixed #4396: Front matter of index pages not inherited by pagination (blog)
- Improved performance by building post excerpts once (blog)

### 4.23.6 <small>September 22, 2022</small> { id="4.23.6" }

- Fixed #4389: Blog posts in first week of year in wrong archive
- Fixed (= switched) footer previous and next links for blog posts

### 4.23.5 <small>September 18, 2022</small> { id="4.23.5" }

- Fixed #4367: Improved blog plugin date handling for MultiMarkdown syntax
- Fixed #4374: Fixed invalid URLs of related links to other blog posts

### 4.23.4 <small>September 14, 2022</small> { id="4.23.4" }

- Fixed #4365: Recursion error in blog plugin due to `deepcopy`
- Fixed path errors for blog plugin on Windows
- Fixed publishing workflow in forked repositories

### 4.23.3 <small>September 13, 2022</small> { id="4.23.3" }

- Fixed previous and next page links for drafts of blog posts

### 4.23.2 <small>September 13, 2022</small> { id="4.23.2" }

- Fixed #4348: Blog plugin crashes on custom `nav` title
- Fixed blog plugin crashing when category contained only drafts
- Fixed rendering of content from blog index file

### 4.23.1 <small>September 12, 2022</small> { id="4.23.1" }

- Fixed #4345: Blog plugin errors with default settings

### 4.23.0 <small>September 12, 2022</small> { id="4.23.0" }

- Added blogging support via built-in blog plugin

### 4.22.1 <small>September 7, 2022</small> { id="4.22.1" }

- Fixed #4217: Tooltips in data tables render in wrong position

### 4.22.0 <small>August 21, 2022</small> { id="4.22.0" }

- Added support for navigation status

### 4.21.1 <small>August 13, 2022</small> { id="4.21.1" }

- Fixed #4176: Broken image when avatar is served by Gravatar
- Fixed #4212: Deferred search initialization for file:// locations

### 4.21.0 <small>July 17, 2022</small> { id="4.21.0" }

- Added meta plugin: set front matter for all pages in a folder
- Fixed #4114: Tags plugin fails if only `tags_extra_files` is set

### 4.20.1 <small>July 11, 2022</small> { id="4.20.1" }

- Fixed #4105: Tags plugin fails if `tags_file` is not set (4.20.0 regression)

### 4.20.0 <small>July 7, 2022</small> { id="4.20.0" }

- Added support for additional tags indexes
- Fixed #4100: Tag icons not shown in tags index

### 4.19.2 <small>July 4, 2022</small> { id="4.19.2" }

- Fixed #4051: Privacy plugin fails if symlinking isn't allowed on Windows

### 4.19.1 <small>June 25, 2022</small> { id="4.19.1" }

- Added `mkdocs-git-committers-plugin` to Dockerfile
- Added `mkdocs-git-revision-date-localized-plugin` to Dockerfile

### 4.19.0 <small>June 24, 2022</small> { id="4.19.0" }

- Added support for document contributors
- Updated French translations for cookie consent

### 4.18.2 <small>June 16, 2022</small> { id="4.18.2" }

- Fixed #4026: Fixed tooltips not mounted for nested navigation links

### 4.18.1 <small>June 14, 2022</small> { id="4.18.1" }

- Fixed #3990: Chinese search highlighting not working on non-boundaries

### 4.18.0 <small>June 11, 2022</small> { id="4.18.0" }

- Added support for automatic dark/light mode
- Fixed #4009: Privacy plugin uses invalid paths for file cache on Windows

### 4.17.2 <small>June 5, 2022</small> { id="4.17.2" }

- Added support for custom jieba dictionaries (Chinese search)

### 4.17.1 <small>June 5, 2022</small> { id="4.17.1" }

- Added support for cookie consent reject button
- Added support for cookie consent custom button ordering
- Fixed #3988: Content tab not focused after alternating anchor links

### 4.17.0 <small>June 4, 2022</small> { id="4.17.0" }

- Added support for content tabs anchor links (deep linking)
- Fixed #3975: Detect composition events in search interface (Chinese)
- Fixed #3980: Search plugin doesn't use title set via front matter

### 4.16.2 <small>May 29, 2022</small> { id="4.16.2" }

- Fixed #3961: Nested sections triggered build error for navigation tabs

### 4.16.1 <small>May 28, 2022</small> { id="4.16.1" }

- Switched feedback widget rating titles to tooltips
- Improved contrast of link colors for light/dark color schemes
- Fixed #3950: Sticky navigation tabs rendering broken (4.15.2 regression)
- Fixed #3958: Links invisible when using `white` primary color

### 4.16.0 <small>May 25, 2022</small> { id="4.16.0" }

- Added support for navigation pruning
- Fixed search results for non-segmented characters (4.15.2 regression)

### 4.15.2 <small>May 22, 2022</small> { id="4.15.2" }

- Removed workaround for `abbr` on touch devices (superseded by tooltips)
- Fixed #3915: Improved Chinese search query segmentation
- Fixed #3938: Fixed tooltips position for navigation titles with ellipsis

### 4.15.1 <small>May 14, 2022</small> { id="4.15.1" }

- Improved performance of element focus observables
- Fixed #3531: Added prev/next buttons to content tabs
- Fixed tooltip positioning when host element is hidden

### 4.15.0 <small>May 8, 2022</small> { id="4.15.0" }

- Added support for improved tooltips
- Fixed #3785: Show tooltip on hover for overflowing navigation link

### 4.14.0 <small>May 5, 2022</small> { id="4.14.0" }

- Added Chinese language support to built-in search plugin
- Fixed all-numeric page titles raising error in social plugin

### 4.13.2 <small>April 30, 2022</small> { id="4.13.2" }

- Improved caching of downloaded resources in privacy plugin
- Fixed #3851: External images not downloaded by privacy plugin

### 4.13.1 <small>April 25, 2022</small> { id="4.13.1" }

- Fixed #3839: Tags plugin breaks without icons (4.13.0 regression)

### 4.13.0 <small>April 24, 2022</small> { id="4.13.0" }

- Added support for tag icons

### 4.12.0 <small>March 27, 2022</small> { id="4.12.0" }

- Added support for card grids and grid layouts
- Fixed #3685: Annotations sometimes broken when using instant loading
- Fixed #3742: Automatically add Mermaid.js when building for offline usage

### 4.11.0 <small>March 6, 2022</small> { id="4.11.0" }

- Added support for excluding external assets from privacy plugin

### 4.10.1 <small>March 2, 2022</small> { id="4.10.1" }

- Added missing build dependencies to Dockerfile
- Fixed encoding issues in privacy plugin, now forcing UTF-8 encoding
- Fixed #3624: Scroll to active navigation item unreliable in Firefox
- Fixed #3642: Privacy plugin errors when font setting was omitted

### 4.10.0 <small>February 27, 2022</small> { id="4.10.0" }

- Added support for offline plugin (supersedes offline search support)
- Improved built-in privacy plugin to download nested JavaScript assets
- Refactored configuration of built-in privacy plugin

### 4.9.1 <small>February 21, 2022</small> { id="4.9.1" }

- Fixed #3610: missing `lxml` dependency for privacy plugin
- Fixed error when charset is missing in `content-type` header

### 4.9.0 <small>February 20, 2022</small> { id="4.9.0" }

- Added privacy plugin: automatic downloading of external assets

### 4.8.3 <small>February 13, 2022</small> { id="4.8.3" }

- Fixed #3560: Mermaid diagrams don't render for `file://` locations

### 4.8.2 <small>February 10, 2022</small> { id="4.8.2" }

- Fixed #3559: Mermaid diagrams don't render inside closed `details`

### 4.8.1 <small>February 6, 2022</small> { id="4.8.1" }

- Fixed jump back to top on mobile when using anchor following

### 4.8.0 <small>February 6, 2022</small> { id="4.8.0" }

- Added support for anchor following table of contents (= auto scroll)

### 4.7.2 <small>February 2, 2022</small> { id="4.7.2" }

- Fixed #3526: Transparent sidebar title due to Safari bug
- Fixed #3528: Firefox sometimes clips text in flow chart diagrams

### 4.7.1 <small>January 30, 2022</small> { id="4.7.1" }

- Fixed #3506: Tags index not respecting title set via front matter

### 4.7.0 <small>January 25, 2022</small> { id="4.7.0" }

- Added native support for offline search

### 4.6.1 <small>January 16, 2022</small> { id="4.6.1" }

- Fixed #3459: Section index pages picking up wrong title

### 4.6.0 <small>January 11, 2022</small> { id="4.6.0" }

- Added support for annotations (outside of code blocks)

### 4.5.2 <small>January 8, 2022</small> { id="4.5.2" }

- Fixed #3440: Content tab indicator not moving when using linking
- Fixed #3445: Content tab switch flickers/jitters when using linking

### 4.5.1 <small>January 2, 2022</small> { id="4.5.1" }

- Added support for setting initial state of cookie consent
- Fixed #3396: Disappearing link in navigation due to Safari bug

### 4.5.0 <small>December 16, 2021</small> { id="4.5.0" }

- Added support for navigation icons

### 4.4.0 <small>December 10, 2021</small> { id="4.4.0" }

- Added support for code annotation anchor links (deep linking)
- Added new code annotation syntax modifier to strip comment
- Updated German translations for cookie consent

### 4.3.0 <small>December 5, 2021</small> { id="4.3.0" }

- Added support for custom fonts in social cards
- Fixed #3300: Announcement bar reappearing when using instant loading

### 4.2.0 <small>December 2, 2021</small> { id="4.2.0" }

- Added support for dismissible announcement bar
- Added support for named placeholders in feedback widget

### 4.1.0 <small>November 30, 2021</small> { id="4.1.0" }

- Added support for passing page title to feedback forms

### 4.0.0 <small>November 28, 2021</small> { id="4.0.0" }

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

### 3.2.3 <small>November 20, 2021</small> { id="3.2.3" }

- Updated Swedish and French translations
- Removed support for `.mermaid-experimental` class (now `.mermaid`)
- Fixed #3202: Cookie consent not dismissable on `file://` locations
- Fixed #3216: Cookie consent not dismissed when invoked via anchor
- Fixed #3232: Mermaid.js sometimes runs twice (race condition)

### 3.2.2 <small>November 6, 2021</small> { id="3.2.2" }

- Fixed always last feedback rating being sent
- Fixed #3145: Code annotations eat whole comment lines
- Fixed #3170: Feedback widget doesn't send data to GA4

### 3.2.1 <small>November 4, 2021</small> { id="3.2.1" }

- Added support for custom Mermaid.js version via additional JavaScript
- Fixed some configuration edge cases for tags plugin (3.1.5 regression)
- Fixed feedback widget title not being centered in Firefox
- Fixed #3179: Safari doesn't send request for feedback widget

### 3.2.0 <small>October 31, 2021</small> { id="3.2.0" }

- Added support for feedback widget (Was this page helpful?)

### 3.1.5 <small>October 28, 2021</small> { id="3.1.5" }

- Fixed #3144: Rogue link when using tags with auto-populated navigation
- Fixed #3147: Code block line numbers appear in search results
- Fixed #3158: Social cards do not strip HTML tags from title

### 3.1.4 <small>October 17, 2021</small> { id="3.1.4" }

- Fixed #2974: Text cropped with other fonts than `Roboto` in social plugin
- Fixed #3099: Encoding problems with non-latin character in social plugin
- Fixed #3112: Japanese segmenter not executed as part of new tokenizer
- Fixed tags (front matter) appearing in search with disabled tags plugin

### 3.1.3 <small>October 12, 2021</small> { id="3.1.3" }

- Added warnings to search plugin for unsupported options and syntax
- Fixed #3503: Search sometimes returns entire page
- Fixed #3089: Single-line code annotations disappear when printing

### 3.1.2 <small>October 6, 2021</small> { id="3.1.2" }

- Fixed incorrect path separators for social cards on Windows

### 3.1.1 <small>September 26, 2021</small> { id="3.1.1" }

- Fixed ordering bug in search exclusion logic

### 3.1.0 <small>September 26, 2021</small> { id="3.1.0" }

- Added support for excluding pages, sections, and elements from search
- Fixed #2803: Code block annotations not visible when printing

### 3.0.1 <small>September 19, 2021</small> { id="3.0.1" }

- Added support for using literal `h1-6` tags for search plugin
- Fixed search plugin breaking on void elements without slashes
- Fixed search plugin filtering link contents from headlines
- Fixed search plugin handling of multiple `h1` headlines
- Fixed search plugin handling of missing `h1` headlines

### 3.0.0 <small>September 13, 2021</small> { id="3.0.0" }

- Rewrite of MkDocs' search plugin
- Added support for rich search previews
- Added support for tokenizer with lookahead
- Improved search indexing performance (twice as fast)
- Improved search highlighting

### 2.13.3 <small>September 1, 2021</small> { id="2.13.3" }

- Added support for disabling social card generation

### 2.13.2 <small>August 25, 2021</small> { id="2.13.2" }

- Fixed #2965: Social plugin error when primary color is not defined

### 2.13.1 <small>August 21, 2021</small> { id="2.13.1" }

- Fixed #2948: Social cards are not cached
- Fixed #2953: Mermaid.js diagrams can't be centered anymore

### 2.13.0 <small>August 7, 2021</small> { id="2.13.0" }

- Added support for custom colors in social cards

### 2.12.2 <small>August 4, 2021</small> { id="2.12.2" }

- Fixed #2891: Division by zero error in social plugin

### 2.12.1 <small>July 26, 2021</small> { id="2.12.1" }

- Fixed error in social plugin when `site_description` was not set
- Fixed error in social plugin for non-ASCII characters

### 2.12.0 <small>July 25, 2021</small> { id="2.12.0" }

- Added support for social cards

### 2.11.1 <small>July 20, 2021</small> { id="2.11.1" }

- Fixed order of tags index, now sorted alphabetically

### 2.11.0 <small>July 18, 2021</small> { id="2.11.0" }

- Improved Mermaid.js integration, now stable
- Added support for sequence diagrams
- Added support for entity relationship diagrams
- Added support for cookie consent configuration
- Added feature flag to always enable annotations

### 2.10.0 <small>July 10, 2021</small> { id="2.10.0" }

- Added support for cookie consent
- Fixed #2807: Back-to-top button not hidden when using sticky tabs

### 2.9.2 <small>May 30, 2021</small> { id="2.9.2" }

- Moved tags to partial for easier customization
- Added support for hiding tags on any page

### 2.9.1 <small>May 24, 2021</small> { id="2.9.1" }

- Added missing guard for linking of content tabs

### 2.9.0 <small>May 23, 2021</small> { id="2.9.0" }

- Added support for linking of content tabs

### 2.8.0 <small>May 12, 2021</small> { id="2.8.0" }

- Added support for boosting pages in search

### 2.7.2 <small>May 8, 2021</small> { id="2.7.2" }

- Fixed #2638: Warnings shown when using `tags` plugin without directory URLs

### 2.7.1 <small>May 3, 2021</small> { id="2.7.1" }

- Fixed `git-revision-date-localized` plugin integration (2.7.0 regression)

### 2.7.0 <small>May 1, 2021</small> { id="2.7.0" }

- Added support for tags (with search integration)

### 2.6.0 <small>April 11, 2021</small> { id="2.6.0" }

- Stay on page when switching versions

### 2.5.0 <small>March 28, 2021</small> { id="2.5.0" }

- Added support for version warning

### 2.4.0 <small>March 20, 2021</small> { id="2.4.0" }

- Added support for custom admonition icons
- Fixed #2444: Code block annotations with extra comments have wrong index

### 2.3.1 <small>March 14, 2021</small> { id="2.3.1" }

- Fixed anchor offset for permalinks when using sticky navigation tabs

### 2.3.0 <small>March 13, 2021</small> { id="2.3.0" }

- Added support for back-to-top button

### 2.2.1 <small>March 4, 2021</small> { id="2.2.1" }

- Fixed #2382: Repository stats failing when no release tag is present

### 2.2.0 <small>February 28, 2021</small> { id="2.2.0" }

- Added support for code block annotations

### 2.1.0 <small>February 26, 2021</small> { id="2.1.0" }

- Added support for anchor tracking

### 2.0.0 <small>February 24, 2021</small> { id="2.0.0" }

- Migrated Insiders to the new architecture
- Swapped color palette toggle configuration

### 1.17.0 <small>January 31, 2021</small> { id="1.17.0" }

- Added support for section index pages

### 1.16.1 <small>January 26, 2021</small> { id="1.16.1" }

- Fixed #2249: Instant loading + sticky tabs result in invalid links
- Fixed #2248: Search highlighting URL parameter always added
- Fixed #2235: Version selector doesn't select current version for aliases

### 1.16.0 <small>January 7, 2021</small> { id="1.16.0" }

- Added latest release to repository info (GitHub)
- Slight facelift of repository info (lighter fonts, spacing and icons)

### 1.15.0 <small>January 2, 2021</small> { id="1.15.0" }

- Added support for native Mermaid.js integration

### 1.14.0 <small>December 30, 2020</small> { id="1.14.0" }

- Added support for sharing searches

### 1.13.2 <small>December 22, 2020</small> { id="1.13.2" }

- Fixed version selector + sticky tabs navigation rendering issues
- Fixed version selector wrapping

### 1.13.1 <small>December 20, 2020</small> { id="1.13.1" }

- Removed horizontal scrollbars on language and version selector
- Fixed type conversion in JavaScript config

### 1.13.0 <small>December 13, 2020</small> { id="1.13.0" }

- Refactored navigation tabs to simplify grouping behavior
- Added support for sticky navigation tabs
- Added support for arbitrary links in navigation tabs
- Fixed #2098: Subsequent active subsection not highlighted correctly

### 1.12.1 <small>December 8, 2020</small> { id="1.12.1" }

- Fixed empty language selector being shown

### 1.12.0 <small>December 6, 2020</small> { id="1.12.0" }

- Added support for adding a language selector

### 1.11.2 <small>November 29, 2020</small> { id="1.11.2" }

- Fixed #2068: Search highlight interprets code blocks as JavaScript

### 1.11.1 <small>November 29, 2020</small> { id="1.11.1" }

- Refactored styling to be more stable and easier to adjust
- Fixed some styling regressions from latest features

### 1.11.0 <small>November 22, 2020</small> { id="1.11.0" }

- Added support for rendering admonitions as inline blocks

### 1.10.0 <small>November 15, 2020</small> { id="1.10.0" }

- Added support for integrating table of contents into navigation

### 1.9.0 <small>November 7, 2020</small> { id="1.9.0" }

- Added support for hiding navigation and table of contents on any page
- Removed autohiding table of contents when empty

### 1.8.0 <small>November 1, 2020</small> { id="1.8.0" }

- Added support for navigation sections
- Fixed appearance of inactive search suggestions

### 1.7.0 <small>October 25, 2020</small> { id="1.7.0" }

- Added support for deploying multiple versions
- Fixed alignment of sidebar when content area is too small

### 1.6.0 <small>October 11, 2020</small> { id="1.6.0" }

- Added support for search suggestions to save keystrokes
- Added support for removing __Made with Material for MkDocs__ from footer
- Fixed #1915: search should go to first result by pressing ++enter++

### 1.5.1 <small>September 21, 2020</small> { id="1.5.1" }

- Fixed content area stretching to whole width for long code blocks

### 1.5.0 <small>September 19, 2020</small> { id="1.5.0" }

- Added support for autohiding table of contents when empty

### 1.4.1 <small>September 6, 2020</small> { id="1.4.1" }

- Improved typeahead and search result relevance and scoring

### 1.4.0 <small>August 30, 2020</small> { id="1.4.0" }

- Added support for autohiding header on scroll

### 1.3.0 <small>August 26, 2020</small> { id="1.3.0" }

- Added support for user-selectable color palettes

### 1.2.0 <small>August 11, 2020</small> { id="1.2.0" }

- Added feature to expand navigation by default

### 1.1.0 <small>August 3, 2020</small> { id="1.1.0" }

- Added highlighting of search results

### 1.0.0 <small>July 14, 2020</small> { id="1.0.0" }

- Added grouping of search results
- Added missing query terms to search result
- Improved search result relevance and scoring
