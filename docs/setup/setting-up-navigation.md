---
template: overrides/main.html
---

# Setting up navigation

A clear and concise navigation structure is an important aspect of good project 
documentation. Material for MkDocs provides several options to configure the
behavior of navigational elements, some of those through _feature flags_.

## Configuration

### Instant loading

[:octicons-file-code-24: Source][1] · 
:octicons-unlock-24: Feature flag · 
:octicons-beaker-24: Experimental

When _instant loading_ is activated, clicks on all internal links will be
intercepted and dispatched via [XHR][2] without fully reloading the page. It
can be enabled via `mkdocs.yml` with:

``` yaml
theme:
  features:
    - instant
```

The resulting page is parsed and injected and all event handlers and components
are rebound automatically. This means that __Material for MkDocs behaves like a
Single Page Application__, which is especially useful for large documentation
sites that come with a massive search index, as the search index will now
remain intact in-between document switches.

  [1]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/javascripts/integrations/instant/index.ts
  [2]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest

### Navigation expansion

[:octicons-file-code-24: Source][3] ·
:octicons-unlock-24: Feature flag ·
:octicons-beaker-24: Experimental ·
[:octicons-heart-fill-24:{: .tx-heart } Insiders only][3]{: .tx-insiders }

When `navigation.expand` is activated, the left sidebar will expand all
collapsible subsections by default, so the user doesn't have to do it manually.
It can be enabled via `mkdocs.yml` with:

``` yaml
theme:
  features:
    - navigation.expand
```

  [3]: ../insiders.md

### Navigation tabs

[:octicons-file-code-24: Source][4] · :octicons-unlock-24: Feature flag

When _tabs_ are activated, top-level sections are rendered in a menu layer
below the header on big screens (but not when the sidebar is hidden). It can be
enabled via `mkdocs.yml` with:

``` yaml
theme:
  features:
    - tabs
```

Note that all __top-level pages__ (i.e. all top-level entries that directly
refer to an `*.md` file) defined inside the [`nav`][5] entry of `mkdocs.yml`
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

Note that tabs are only shown for larger screens, so make sure that navigation
is plausible on mobile devices. As another example, see the [`mkdocs.yml`][6]
used to render these pages.

  [4]: https://github.com/squidfunk/mkdocs-material/blob/master/src/partials/tabs.html
  [5]: https://www.mkdocs.org/user-guide/configuration/#nav
  [6]: https://github.com/squidfunk/mkdocs-material/blob/master/mkdocs.yml

### Table of contents

[:octicons-file-code-24: Source][7] · [:octicons-workflow-24: Extension][8]

The [Table of contents][9] extension, which is part of the standard Markdown
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
    like for example those from [Python Markdown Extensions][10]:

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

_Material for MkDocs doesn't provide official support for the other options of
this extension, so they may be supported but can also yield weird results. Use
them at your own risk._

  [7]: https://github.com/squidfunk/mkdocs-material/blob/master/src/partials/toc.html
  [8]: https://python-markdown.github.io/extensions/toc/
  [9]: https://python-markdown.github.io/extensions/toc/#usage
  [10]: https://facelessuser.github.io/pymdown-extensions/extras/slugs/

## Customization

### Keyboard shortcuts

[:octicons-file-code-24: Source][11] ·
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
JavaScript][12], you can subscribe to the `keyboard$` observable and attach
your custom event listener:

``` js
app.keyboard$.subscribe(key => {
  if (key.mode === "global" && key.type === "x") {
    /* Add custom keyboard handler here */
    key.claim()
  }
})
```

The call to `#!js key.claim()` will essentially execute `#!js preventDefault()`
on the underlying event, so the keypress will not propagate further and touch
other event listeners.

  [11]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/javascripts/integrations/keyboard/index.ts
  [12]: ../customization.md#additional-javascript
