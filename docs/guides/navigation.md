---
template: overrides/main.html
---

# Navigation

A clear and concise navigation structure is an important aspect of good project 
documentation. Material for MkDocs provides several options to configure the
behavior of navigational elements, some of those through _feature flags_.

## Configuration

### Instant loading

[:octicons-file-code-24: Source][1] · :octicons-beaker-24: Experimental · 
:octicons-unlock-24: Feature flag

When _instant loading_ is activated, clicks on all internal links will be
intercepted and dispatched via [XHR][2] without fully reloading the page. It
can be enabled from `mkdocs.yml` with:

``` yaml
theme:
  features:
    - instant
```

The resulting page is parsed and injected and all event handlers and components
are automatically rebound. This means that __Material for MkDocs behaves like a
Single Page Application__, which is especially useful for large documentation
sites that come with a huge search index, as the search index will now remain
intact in-between document switches.

  [1]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/javascripts/integrations/instant/index.ts
  [2]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest

### Tabs navigation

[:octicons-file-code-24: Source][3] · :octicons-unlock-24: Feature flag

When _tabs_ are activated, top-level sections are rendered in a menu layer
below the header on big screens (but not when the sidebar is hidden). It can be
enabled from `mkdocs.yml` with:

``` yaml
theme:
  features:
    - tabs
```

Note that all __top-level pages__ (i.e. all top-level entries that directly
refer to an `*.md` file) defined inside the `nav` entry of `mkdocs.yml` will be
grouped under the first tab which will receive the title of the first page.

This means that there will effectively be no collapsible subsections for the
first tab, because each subsection is rendered as another tab. If you want more
fine-grained control, _i.e. collapsible subsections for the first tab_, you can
use __top-level sections__, so that the top-level is entirely made up of
sections. This is illustrated in the following example:

=== "Top-level pages"

    ``` yaml
    nav:
      - Tab 1
      - Page 1.1
      - Tab 2:
        - Page 2.1
        - Page 2.2
      - Page 1.2
    ```

=== "Top-level sections"

    ``` yaml
    nav:
      - Tab 1:
        - Page 1.1
        - Page 1.2
      - Tab 2:
        - Page 2.1
        - Page 2.2
    ```

Note that tabs are only shown for larger screens, so make sure that navigation
is plausible on mobile devices. As another example, see the [`mkdocs.yml`][4]
used to render these pages.

[3]: https://github.com/squidfunk/mkdocs-material/blob/master/src/partials/tabs.html
[4]: https://github.com/squidfunk/mkdocs-material/blob/master/mkdocs.yml

### Table of contents

[:octicons-file-code-24: Source][5] · [:octicons-workflow-24: Extension][6]

The [table of contents][7] extension, which is part of the standard Markdown
library, provides some options that are supported by Material for MkDocs to
customize its appearance:

`permalink`

:   This option adds an anchor link containing the paragraph symbol `¶` or
    another custom symbol at the end of each headline, exactly like on the page
    you're currently viewing, which Material for MkDocs will make appear on
    hover:

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

`slugify`

:   This option allows for customization of the slug function. For some
    languages, the standard slug function may not produce good and readable
    identifiers. Consider using another slug function like for example those
    from [PyMdown Extensions][8]:

    === "Unicode"

        ``` yaml
        markdown_extensions:
          - toc:
              slugify: pymdownx.slugs.uslugify
        ```

    === "Unicode, case-sensitive"

        ``` yaml
        markdown_extensions:
          - toc:
              slugify: pymdownx.slugs.uslugify_cased
        ```

`toc_depth`

:   Define the range of levels to be included in the table of contents. This is
    especially useful for project documentation with deeply structured headings
    to decrease the length of the table of contents, or to remove the table of
    contents altogether:

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
this extension, so they may yield weird results. Use them at your own risk._

  [5]: https://github.com/squidfunk/mkdocs-material/blob/master/src/partials/toc.html
  [6]: https://python-markdown.github.io/extensions/toc/
  [7]: https://python-markdown.github.io/extensions/toc/#usage
  [8]: https://facelessuser.github.io/pymdown-extensions/extras/slugs/
