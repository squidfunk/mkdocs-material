---
template: overrides/main.html
---

# Setting up navigation

A clear and concise navigation structure is an important aspect of good project 
documentation. Material for MkDocs provides several options to configure the
behavior of navigational elements, including [tabs][1] and [sections][2], and
its flag-ship feature: [instant loading][3].

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
the header on big screens (but not when the sidebar is hidden). They can be
enabled via `mkdocs.yml` with:

``` yaml
theme:
  features:
    - navigation.tabs
```

=== "With tabs"

    [![With tabs][7]][7]

=== "Without tabs"

    [![Without tabs][8]][8]

Note that all __top-level pages__ (i.e. all top-level entries that directly
refer to an `*.md` file) defined inside the [`nav`][9] entry of `mkdocs.yml`
will be grouped under the first tab which will receive the title of the first
page.

This means that there will effectively be no collapsible subsections for the
first tab, because each subsection is rendered as another tab. If you want more
fine-grained control, _i.e. collapsible subsections for the first tab_, you can
use __top-level sections__, so that the top-level is entirely made up of
sections. This is illustrated in the following example:

=== "Top-level pages"

    ``` yaml
    nav:
      - Tab 1 + Page 1.1
      - Page 1.2
      - Tab 2:
        - Page 2.1
        - Page 2.2
        - Page 2.3
      - Page 1.3
    ```

=== "Top-level sections"

    ``` yaml
    nav:
      - Tab 1:
        - Page 1.1
        - Page 1.2
        - Page 1.3
      - Tab 2:
        - Page 2.1
        - Page 2.2
        - Page 2.3
    ```

Also note that tabs are only shown for larger screens, so make sure that
navigation is plausible on mobile devices. As another example, see the
[`mkdocs.yml`][10] used to render these pages.

  [6]: https://github.com/squidfunk/mkdocs-material/blob/master/src/partials/tabs.html
  [7]: ../assets/screenshots/navigation-tabs.png
  [8]: ../assets/screenshots/navigation.png
  [9]: https://www.mkdocs.org/user-guide/configuration/#nav
  [10]: https://github.com/squidfunk/mkdocs-material/blob/master/mkdocs.yml

### Navigation sections

[:octicons-file-code-24: Source][11] ·
:octicons-unlock-24: Feature flag ·
[:octicons-heart-fill-24:{: .tx-heart } Insiders only][11]{: .tx-insiders }

When _sections_ are enabled, top-level sections are rendered as groups in the
sidebar on big screens (but not when the sidebar is hidden). It can be enabled
via `mkdocs.yml`:

``` yaml
theme:
  features:
    - navigation.sections
```

=== "With sections"

    [![With sections][12]][12]

=== "Without sections"

    [![Without sections][8]][8]

  [11]: ../insiders.md
  [12]: ../assets/screenshots/navigation-sections.png

Both feature flags, _tabs_ and _sections_, can be combined with each other. If
both feature flags are enabled, sections are rendered for 2nd level navigation
items.

### Navigation expansion

[:octicons-file-code-24: Source][11] ·
:octicons-unlock-24: Feature flag ·
[:octicons-heart-fill-24:{: .tx-heart } Insiders only][11]{: .tx-insiders }

When _expansion_ is enabled, the left sidebar will expand all collapsible
subsections by default, so the user doesn't have to open subsections manually.
It can be enabled via `mkdocs.yml` with:

``` yaml
theme:
  features:
    - navigation.expand
```

=== "With expansion"

    [![With expansion][13]][13]

=== "Without expansion"

    [![Without expansion][8]][8]

  [13]: ../assets/screenshots/navigation-expand.png

### Table of contents

[:octicons-file-code-24: Source][14] · [:octicons-workflow-24: Extension][15]

The [Table of contents][16] extension, which is part of the standard Markdown
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
    produce good and readable identifiers. Consider using another slug function
    like for example those from [Python Markdown Extensions][17]:

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

    Note that MkDocs will not generate [anchor links][18] for levels outside
    the range defined with `toc_depth`. However, Material for MkDocs also allows
    to [hide the table of contents][19] on a specific page while keeping
    permalinks.

_Material for MkDocs doesn't provide official support for the other options of
this extension, so they may be supported but can also yield weird results. Use
them at your own risk._

  [14]: https://github.com/squidfunk/mkdocs-material/blob/master/src/partials/toc.html
  [15]: https://python-markdown.github.io/extensions/toc/
  [16]: https://python-markdown.github.io/extensions/toc/#usage
  [17]: https://facelessuser.github.io/pymdown-extensions/extras/slugs/
  [18]: #permalink
  [19]: #hide-the-sidebars

### Hide the sidebars

[:octicons-file-code-24: Source][11] ·
[:octicons-heart-fill-24:{: .tx-heart } Insiders only][11]{: .tx-insiders }

Sometimes it's desirable to hide the navigation and/or table of contents
sidebar, especially when there's a single navigation item. This can be done for
any page using the [Metadata][20] extension:

``` yaml
---
hide:
  - navigation # Hide navigation
  - toc        # Hide table of contents
---

...
```

=== "Hide navigation"

    [![Hide navigation][21]][21]

=== "Hide table of contents"

    [![Hide table of contents][22]][22]

=== "Hide both"

    [![Hide navigation and table of contents][23]][23]

  [20]: ../../reference/meta-tags/#metadata
  [21]: ../assets/screenshots/hide-navigation.png
  [22]: ../assets/screenshots/hide-toc.png
  [23]: ../assets/screenshots/hide-navigation-toc.png

## Customization

### Keyboard shortcuts

[:octicons-file-code-24: Source][24] ·
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
JavaScript][25], you can subscribe to the `keyboard$` observable and attach
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

  [24]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/javascripts/integrations/keyboard/index.ts
  [25]: ../customization.md#additional-javascript
