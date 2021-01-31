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
intercepted and dispatched via [XHR][5] without fully reloading the page. It
can be enabled via `mkdocs.yml` with:

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

### Navigation tabs

[:octicons-file-code-24: Source][6] · :octicons-unlock-24: Feature flag

When _tabs_ are enabled, top-level sections are rendered in a menu layer below
the header for viewports above `1220px`, but remain as-is on mobile.[^1] They
can be enabled via `mkdocs.yml`:

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
[:octicons-heart-fill-24:{: .tx-heart } Insiders only][9]{: .tx-insiders }

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

  [9]: ../insiders.md
  [10]: ../assets/screenshots/navigation-tabs-sticky.png
  [11]: ../assets/screenshots/navigation-tabs-collapsed.png

### Navigation sections

[:octicons-file-code-24: Source][12] ·
:octicons-unlock-24: Feature flag

When _sections_ are enabled, top-level sections are rendered as groups in the
sidebar for viewports above `1220px`, but remain as-is on mobile. They can also
be enabled via `mkdocs.yml`:

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
It can be enabled via `mkdocs.yml` with:

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
[:octicons-heart-fill-24:{: .tx-heart } Insiders only][9]{: .tx-insiders }

When _section indexes_ are enabled, documents can be directly attached to
sections, which is especially useful for providing overview pages. This can be
enabled via `mkdocs.yml` with:

``` yaml
theme:
  features:
    - navigation.indexes
```

=== "With section index pages"

    [![With expansion][15]][15]

=== "Without section index pages"

    [![Without expansion][16]][16]

In order to link a page to the section, create a new Markdown document with the
name `index.md` in the respective folder, and add it to the beginning of your
navigation section like so:

``` yaml
nav:
  - Section:
    - section/index.md
    - Page 1: section/page-1.md
    ...
    - Page n: section/page-n.md
```

_This feature flag can be combined with all other feature flags, e.g. [tabs][1]
and [sections][2], except for when integrating the table of contents into the
navigation with_ `toc.integrate`.

  [15]: ../assets/screenshots/navigation-index-on.png
  [16]: ../assets/screenshots/navigation-index-off.png

### Table of contents

[:octicons-file-code-24: Source][17] · [:octicons-workflow-24: Extension][18]

The [Table of contents][19] extension, which is part of the standard Markdown
library, provides some options that are supported by Material for MkDocs to
customize its appearance:

`permalink`{: #permalink }

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

`slugify`{: #slugify }

:   :octicons-milestone-24: Default: `headerid.slugify` – This option allows for 
    customization of the slug function. For some languages, the default may not
    produce good and readable identifiers – consider using another slug function
    like for example those from [Python Markdown Extensions][20]:

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

`toc_depth`{: #toc_depth }

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

    Note that MkDocs will not generate [anchor links][21] for levels outside
    the range defined with `toc_depth`. However, Material for MkDocs also allows
    to [hide the table of contents][22] on a specific page while keeping
    permalinks.

_Material for MkDocs doesn't provide official support for the other options of
this extension, so they may be supported but can also yield weird results. Use
them at your own risk._

  [17]: https://github.com/squidfunk/mkdocs-material/blob/master/src/partials/toc.html
  [18]: https://python-markdown.github.io/extensions/toc/
  [19]: https://python-markdown.github.io/extensions/toc/#usage
  [20]: https://facelessuser.github.io/pymdown-extensions/extras/slugs/
  [21]: #permalink
  [22]: #hide-the-sidebars

#### Navigation integration

[:octicons-file-code-24: Source][23] ·
:octicons-unlock-24: Feature flag

When _integration_ is enabled, the table of contents is rendered as part of
the navigation for viewports above `1220px`, but remains as-is on mobile. This
can be enabled via `mkdocs.yml`:

``` yaml
theme:
  features:
    - toc.integrate
```

=== "Integrate table of contents"

    [![Integrate table of contents][24]][24]

=== "Separate table of contents"

    [![Separate table of contents][8]][8]

  [23]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/stylesheets/main/layout/_nav.scss
  [24]: ../assets/screenshots/toc-integrate.png

The content section will now always stretch to the right side, resulting in
more space for your content. This feature flag can be combined with all other
feature flags, e.g. [tabs][1] and [sections][2]. 

### Hide the sidebars

[:octicons-file-code-24: Source][25] ·
:octicons-note-24: Metadata

Sometimes it's desirable to hide the navigation and/or table of contents
sidebar, especially when there's a single navigation item. This can be done for
any page using the [Metadata][26] extension:

``` yaml
---
hide:
  - navigation # Hide navigation
  - toc        # Hide table of contents
---

...
```

=== "Hide navigation"

    [![Hide navigation][27]][27]

=== "Hide table of contents"

    [![Hide table of contents][28]][28]

=== "Hide both"

    [![Hide navigation and table of contents][29]][29]

  [25]: https://github.com/squidfunk/mkdocs-material/blob/master/src/base.html
  [26]: ../../reference/meta-tags/#metadata
  [27]: ../assets/screenshots/hide-navigation.png
  [28]: ../assets/screenshots/hide-toc.png
  [29]: ../assets/screenshots/hide-navigation-toc.png

## Customization

### Keyboard shortcuts

[:octicons-file-code-24: Source][30] ·
:octicons-mortar-board-24: Difficulty: _easy_

Material for MkDocs includes several keyboard shortcuts that make it possible
to navigate your project documentation via keyboard. There're two modes:

`search`{: #search }

:   This mode is active when the _search is focused_. It provides several key
    bindings to make search accessible and navigable via keyboard:

    * ++arrow-down++ , ++arrow-up++ : select next / previous result
    * ++esc++ , ++tab++ : close search dialog
    * ++enter++ : follow selected result

`global`{: #global }

:   This mode is active when _search is not focussed_ and when there's no other
    focussed element that is susceptible to keyboard input. The following keys
    are bound:

    * ++f++ , ++s++ , ++slash++ : open search dialog
    * ++p++ , ++comma++ : go to previous page
    * ++n++ , ++period++ : go to next page

Let's say you want to bind some action to the ++x++ key. By using [additional
JavaScript][31], you can subscribe to the `keyboard$` observable and attach
your custom event listener:

``` js
app.keyboard$.subscribe(function(key) {
  if (key.mode === "global" && key.type === "x") {
    /* Add custom keyboard handler here */
    key.claim()
  }
})
```

The call to `#!js key.claim()` will essentially execute `#!js preventDefault()`
on the underlying event, so the keypress will not propagate further and touch
other event listeners.

  [30]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/javascripts/integrations/keyboard/index.ts
  [31]: ../customization.md#additional-javascript

### Content area width

[:octicons-file-code-24: Source][32] ·
:octicons-mortar-board-24: Difficulty: _easy_

The width of the content area is set so the length of each line doesn't exceed
80-100 characters, depending on the width of the characters. While this
is a reasonable default, as longer lines tend to be harder to read, it may be
desirable to increase the overall width of the content area, or even make it
stretch to the entire available space.

This can easily be achieved with an [additional stylesheet][33] and a few lines
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

  [32]: https://github.com/squidfunk/mkdocs-material/blob/aeaa00a625abf952f355164de02c539b061e6127/src/assets/stylesheets/main/layout/_base.scss
  [33]: ../customization.md#additional-css
