---
template: overrides/main.html
---

# Setting up navigation

A clear and concise navigation structure is an important aspect of good project 
documentation. Material for MkDocs provides a multitude of options to configure
the behavior of navigational elements, including [tabs][1] and [sections][2],
and its flag-ship feature: [instant loading][3].

  [1]: #navigation-tabs
  [2]: #navigation-sections
  [3]: #instant-loading

## Configuration

### Instant loading

[:octicons-file-code-24: Source][4] ·
:octicons-unlock-24: Feature flag

When _instant loading_ is enabled, clicks on all internal links will be
intercepted and dispatched via [XHR][5] without fully reloading the page. Add
the following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - navigation.instant
```

The resulting page is parsed and injected and all event handlers and components
are rebound automatically. This means that __Material for MkDocs behaves like a
Single Page Application__, which is especially useful for large documentation
sites that come with a massive search index, as the search index will now
remain intact in-between document switches.

_Material for MkDocs is the only MkDocs theme offering this feature._

  [4]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/javascripts/integrations/instant/index.ts
  [5]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest

### Anchor tracking

[:octicons-file-code-24: Source][9] ·
:octicons-unlock-24: Feature flag ·
[:octicons-heart-fill-24:{ .mdx-heart } Insiders only][9]{ .mdx-insiders }

When _anchor tracking_ is enabled, the URL in the address bar is automatically
updated with the active anchor as highlighted in the table of contents. Add the
following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - navigation.tracking
```

### Navigation tabs

[:octicons-file-code-24: Source][6] · :octicons-unlock-24: Feature flag

When _tabs_ are enabled, top-level sections are rendered in a menu layer below
the header for viewports above `1220px`, but remain as-is on mobile.[^1] Add
the following lines to `mkdocs.yml`:

  [^1]:
    Prior to version 6.2, navigation tabs had a slightly different behavior.
    All top-level pages (i.e. all top-level entries that directly refer to an
    `*.md` file) defined inside the `nav` entry of `mkdocs.yml` were grouped
    under the first tab which received the title of the first page. This made
    it impossible to include a top-level page (or external link) as a tab item,
    as was reported in #1884 and #2072. From version 6.2 on, navigation tabs
    include all top-level pages and sections.

``` yaml
theme:
  features:
    - navigation.tabs
```

=== "With tabs"

    [![With tabs][7]][7]

=== "Without tabs"

    [![Without tabs][8]][8]

  [6]: https://github.com/squidfunk/mkdocs-material/blob/master/src/partials/tabs.html
  [7]: ../assets/screenshots/navigation-tabs.png
  [8]: ../assets/screenshots/navigation.png

#### Sticky navigation tabs

[:octicons-file-code-24: Source][9] ·
:octicons-unlock-24: Feature flag ·
:octicons-beaker-24: Experimental ·
[:octicons-heart-fill-24:{ .mdx-heart } Insiders only][9]{ .mdx-insiders }

When _sticky tabs_ are enabled, navigation tabs will lock below the header and
always remain visible when scrolling down. Just add the following two feature
flags to `mkdocs.yml`:

``` yaml
theme:
  features:
    - navigation.tabs
    - navigation.tabs.sticky
```

=== "With sticky tabs"

    [![With sticky tabs][10]][10]

=== "Without sticky tabs"

    [![Without sticky tabs][11]][11]

  [9]: ../insiders/index.md
  [10]: ../assets/screenshots/navigation-tabs-sticky.png
  [11]: ../assets/screenshots/navigation-tabs-collapsed.png

### Navigation sections

[:octicons-file-code-24: Source][12] ·
:octicons-unlock-24: Feature flag

When _sections_ are enabled, top-level sections are rendered as groups in the
sidebar for viewports above `1220px`, but remain as-is on mobile. Add the
following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - navigation.sections
```

=== "With sections"

    [![With sections][13]][13]

=== "Without sections"

    [![Without sections][8]][8]

  [12]: https://github.com/squidfunk/mkdocs-material/blob/master/src/partials/nav-item.html
  [13]: ../assets/screenshots/navigation-sections.png

Both feature flags, _tabs_ and _sections_, can be combined with each other. If
both feature flags are enabled, sections are rendered for level 2 navigation
items.

### Navigation expansion

[:octicons-file-code-24: Source][12] ·
:octicons-unlock-24: Feature flag

When _expansion_ is enabled, the left sidebar will expand all collapsible
subsections by default, so the user doesn't have to open subsections manually.
Add the following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - navigation.expand
```

=== "With expansion"

    [![With expansion][14]][14]

=== "Without expansion"

    [![Without expansion][8]][8]

  [14]: ../assets/screenshots/navigation-expand.png

### Section index pages

[:octicons-file-code-24: Source][9] ·
:octicons-unlock-24: Feature flag ·
:octicons-beaker-24: Experimental ·
[:octicons-heart-fill-24:{ .mdx-heart } Insiders only][9]{ .mdx-insiders }

When _section index pages_ are enabled, documents can be directly attached to
sections, which is particularly useful for providing overview pages. Add the
following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - navigation.indexes
```

=== "With section index pages"

    [![With expansion][15]][15]

=== "Without section index pages"

    [![Without expansion][16]][16]

In order to link a page to a section, create a new document with the name
`index.md` in the respective folder, and add it to the beginning of your
navigation section:

``` yaml
nav:
  - Section:
    - section/index.md
    - Page 1: section/page-1.md
    ...
    - Page n: section/page-n.md
```

_This feature flag can be combined with all other feature flags, e.g. [tabs][1]
and [sections][2], except for table of contents [navigation integration][17].
Note that it doesn't rely on third-party plugins[^2]._

  [^2]:
    If you don't want to use the native integration, the
    [mkdocs-section-index][18] plugin might be an alternative. However, note
    that this plugin may not be compatible with all navigation-related features
    offered by Material for MkDocs.

  [15]: ../assets/screenshots/navigation-index-on.png
  [16]: ../assets/screenshots/navigation-index-off.png
  [17]: #navitation-intergation
  [18]: https://github.com/oprypin/mkdocs-section-index

### Back-to-top button

[:octicons-file-code-24: Source][19] ·
:octicons-unlock-24: Feature flag

A _back-to-top button_ can be shown when the user, after scrolling down, starts
to scroll up again. It's rendered in the lower right corner of the viewport. Add
the following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - navigation.top
```

<figure markdown="1">

[![back-to-top button][20]][20]

  <figcaption markdown="1">

A demo is worth a thousand words — check it out at
[squidfunk.github.io/mkdocs-material-insiders][21]

  </figcaption>
</figure>

  [19]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/stylesheets/main/layout/_top.scss
  [20]: ../assets/screenshots/back-to-top.png
  [21]: https://squidfunk.github.io/mkdocs-material-insiders/setup/setting-up-navigation/#back-to-top-button

### Table of contents

[:octicons-file-code-24: Source][22] · [:octicons-workflow-24: Extension][23]

The [Table of contents][24] extension, which is part of the standard Markdown
library, provides some options that are supported by Material for MkDocs to
customize its appearance:

`permalink`{ #permalink }

:   :octicons-milestone-24: Default: `false` – This option adds an anchor link
    containing the paragraph symbol `¶` or another custom symbol at the end of
    each headline, exactly like on the page you're currently viewing, which
    Material for MkDocs will make appear on hover:

    === "¶"

        ``` yaml
        markdown_extensions:
          - toc:
              permalink: true
        ```

    === "⚓︎"

        ``` yaml
        markdown_extensions:
          - toc:
              permalink: ⚓︎
        ```

`slugify`{ #slugify }

:   :octicons-milestone-24: Default: `headerid.slugify` – This option allows for 
    customization of the slug function. For some languages, the default may not
    produce good and readable identifiers – consider using another slug function
    like for example those from [Python Markdown Extensions][24]:

    === "Unicode"

        ``` yaml
        markdown_extensions:
          - toc:
              slugify: !!python/name:pymdownx.slugs.uslugify
        ```

    === "Unicode, case-sensitive"

        ``` yaml
        markdown_extensions:
          - toc:
              slugify: !!python/name:pymdownx.slugs.uslugify_cased
        ```

`toc_depth`{ #toc_depth }

:   :octicons-milestone-24: Default: `6` – Define the range of levels to be
    included in the table of contents. This may be useful for project
    documentation with deeply structured headings to decrease the length of the
    table of contents, or to remove the table of contents altogether:

    === "Hide levels 4-6"

        ``` yaml
        markdown_extensions:
          - toc:
              toc_depth: 3
        ```

    === "Hide table of contents"

        ``` yaml
        markdown_extensions:
          - toc:
              toc_depth: 0
        ```

_Material for MkDocs doesn't provide official support for the other options of
this extension, so they may be supported but might yield unexpected results.
Use them at your own risk._

  [22]: https://github.com/squidfunk/mkdocs-material/blob/master/src/partials/toc.html
  [23]: https://python-markdown.github.io/extensions/toc/
  [24]: https://python-markdown.github.io/extensions/toc/#usage
  [25]: https://facelessuser.github.io/pymdown-extensions/extras/slugs/

#### Navigation integration

[:octicons-file-code-24: Source][26] ·
:octicons-unlock-24: Feature flag

When _integration_ is enabled, the table of contents is rendered as part of
the navigation for viewports above `1220px`, but remains as-is on mobile. Add
the following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - toc.integrate
```

=== "Integrate table of contents"

    [![Integrate table of contents][27]][27]

=== "Separate table of contents"

    [![Separate table of contents][7]][7]

  [26]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/stylesheets/main/layout/_nav.scss
  [27]: ../assets/screenshots/toc-integrate.png

The content section will now always stretch to the right side, resulting in
more space for your content. This feature flag can be combined with all other
feature flags, e.g. [tabs][1] and [sections][2]. 

## Usage

### Hiding the sidebars

[:octicons-file-code-24: Source][28] ·
:octicons-note-24: Metadata

Sometimes it's desirable to hide the navigation and/or table of contents
sidebar, especially when there's a single navigation item. This can be done for
any page using the [Metadata][29] extension:

``` yaml
---
hide:
  - navigation # Hide navigation
  - toc        # Hide table of contents
---

...
```

=== "Hide navigation"

    [![Hide navigation][30]][30]

=== "Hide table of contents"

    [![Hide table of contents][31]][31]

=== "Hide both"

    [![Hide navigation and table of contents][32]][32]

  [28]: https://github.com/squidfunk/mkdocs-material/blob/master/src/base.html
  [29]: ../../reference/meta-tags/#metadata
  [30]: ../assets/screenshots/hide-navigation.png
  [31]: ../assets/screenshots/hide-toc.png
  [32]: ../assets/screenshots/hide-navigation-toc.png

## Customization

### Keyboard shortcuts

[:octicons-file-code-24: Source][33] ·
:octicons-mortar-board-24: Difficulty: _easy_

Material for MkDocs includes several keyboard shortcuts that make it possible
to navigate your project documentation via keyboard. There're two modes:

`search`{ #search }

:   This mode is active when the _search is focused_. It provides several key
    bindings to make search accessible and navigable via keyboard:

    * ++arrow-down++ , ++arrow-up++ : select next / previous result
    * ++esc++ , ++tab++ : close search dialog
    * ++enter++ : follow selected result

`global`{ #global }

:   This mode is active when _search is not focussed_ and when there's no other
    focussed element that is susceptible to keyboard input. The following keys
    are bound:

    * ++f++ , ++s++ , ++slash++ : open search dialog
    * ++p++ , ++comma++ : go to previous page
    * ++n++ , ++period++ : go to next page

Let's say you want to bind some action to the ++x++ key. By using [additional
JavaScript][34], you can subscribe to the `keyboard$` observable and attach
your custom event listener:

``` js
keyboard$.subscribe(function(key) {
  if (key.mode === "global" && key.type === "x") {
    /* Add custom keyboard handler here */
    key.claim()
  }
})
```

The call to `#!js key.claim()` will essentially execute `#!js preventDefault()`
on the underlying event, so the keypress will not propagate further and touch
other event listeners.

  [33]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/javascripts/integrations/keyboard/index.ts
  [34]: ../customization.md#additional-javascript

### Content area width

[:octicons-file-code-24: Source][35] ·
:octicons-mortar-board-24: Difficulty: _easy_

The width of the content area is set so the length of each line doesn't exceed
80-100 characters, depending on the width of the characters. While this
is a reasonable default, as longer lines tend to be harder to read, it may be
desirable to increase the overall width of the content area, or even make it
stretch to the entire available space.

This can easily be achieved with an [additional stylesheet][36] and a few lines
of CSS:

=== "Increase width"

    ``` css
    .md-grid {
      max-width: 1440px;
    }
    ```

=== "Stretch to fit"

    ``` css
    .md-grid {
      max-width: initial;
    }
    ```

  [35]: https://github.com/squidfunk/mkdocs-material/blob/aeaa00a625abf952f355164de02c539b061e6127/src/assets/stylesheets/main/layout/_base.scss
  [36]: ../customization.md#additional-css
