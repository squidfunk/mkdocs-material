---
template: overrides/main.html
---

# Setting up navigation

A clear and concise navigation structure is an important aspect of good project 
documentation. Material for MkDocs provides a multitude of options to configure
the behavior of navigational elements, including [tabs][navigation.tabs] and
[sections][navigation.sections], and its flag-ship feature: [instant loading]
[navigation.instant].

  [navigation.tabs]: #navigation-tabs
  [navigation.sections]: #navigation-sections
  [navigation.instant]: #instant-loading

## Configuration

### Instant loading

[:octicons-tag-24: 5.0.0][navigation.instant support] ·
:octicons-unlock-24: Feature flag

When instant loading is enabled, clicks on all internal links will be
intercepted and dispatched via [XHR] without fully reloading the page. Add
the following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - navigation.instant
```

The resulting page is parsed and injected and all event handlers and components
are rebound automatically, i.e., __Material for MkDocs now behaves like a Single
Page Application__. Now, the search index survives navigation, which is
especially useful for large documentation sites.

  [navigation.instant support]: https://github.com/squidfunk/mkdocs-material/releases/tag/5.2.0
  [XHR]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest

### Anchor tracking

[:octicons-tag-24: 8.0.0][Anchor tracking support] ·
:octicons-unlock-24: Feature flag ·
:octicons-beaker-24: Experimental

When anchor tracking is enabled, the URL in the address bar is automatically
updated with the active anchor as highlighted in the table of contents. Add the
following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - navigation.tracking
```

  [Anchor tracking support]: https://github.com/squidfunk/mkdocs-material/releases/tag/8.0.0

### Navigation tabs

[:octicons-tag-24: 1.1.0][navigation.tabs support] ·
:octicons-unlock-24: Feature flag

When tabs are enabled, top-level sections are rendered in a menu layer below
the header for viewports above `1220px`, but remain as-is on mobile.[^1] Add
the following lines to `mkdocs.yml`:

  [^1]:
    Prior to :octicons-tag-24: 6.2.0, navigation tabs had a slightly different
    behavior. All top-level pages (i.e. all top-level entries directly
    refefring to a `*.md` file) defined inside the `nav` entry of `mkdocs.yml`
    were grouped under the first tab which received the title of the first page.
    This made it impossible to include a top-level page (or external link) as a
    tab item, as was reported in #1884 and #2072. From :octicons-tag-24: 6.2.0
    on, navigation tabs include all top-level pages and sections.

``` yaml
theme:
  features:
    - navigation.tabs
```

=== ":octicons-check-circle-fill-16: Enabled"

    [![navigation.tabs enabled]][navigation.tabs enabled]

=== ":octicons-skip-16: Disabled"

    [![navigation.tabs disabled]][navigation.tabs disabled]

  [navigation.tabs support]: https://github.com/squidfunk/mkdocs-material/releases/tag/1.1.0
  [navigation.tabs enabled]: ../assets/screenshots/navigation-tabs.png
  [navigation.tabs disabled]: ../assets/screenshots/navigation.png

#### Sticky navigation tabs

[:octicons-tag-24: 7.3.0][navigation.tabs.sticky support] ·
:octicons-unlock-24: Feature flag ·
:octicons-beaker-24: Experimental

When sticky tabs are enabled, navigation tabs will lock below the header and
always remain visible when scrolling down. Just add the following two feature
flags to `mkdocs.yml`:

``` yaml
theme:
  features:
    - navigation.tabs
    - navigation.tabs.sticky
```

=== ":octicons-check-circle-fill-16: Enabled"

    [![navigation.tabs.sticky enabled]][navigation.tabs.sticky enabled]

=== ":octicons-skip-16: Disabled"

    [![navigation.tabs.sticky disabled]][navigation.tabs.sticky disabled]

  [navigation.tabs.sticky support]: https://github.com/squidfunk/mkdocs-material/releases/tag/7.3.0
  [navigation.tabs.sticky enabled]: ../assets/screenshots/navigation-tabs-sticky.png
  [navigation.tabs.sticky disabled]: ../assets/screenshots/navigation-tabs-collapsed.png

### Navigation sections

[:octicons-tag-24: 6.2.0][navigation.sections support] ·
:octicons-unlock-24: Feature flag

When sections are enabled, top-level sections are rendered as groups in the
sidebar for viewports above `1220px`, but remain as-is on mobile. Add the
following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - navigation.sections
```

=== ":octicons-check-circle-fill-16: Enabled"

    [![navigation.sections enabled]][navigation.sections enabled]

=== ":octicons-skip-16: Disabled"

    [![navigation.sections disabled]][navigation.sections disabled]

  [navigation.sections support]: https://github.com/squidfunk/mkdocs-material/releases/tag/6.2.0
  [navigation.sections enabled]: ../assets/screenshots/navigation-sections.png
  [navigation.sections disabled]: ../assets/screenshots/navigation.png

Both feature flags, [`navigation.tabs`][navigation.tabs] and
[`navigation.sections`][navigation.sections], can be combined with each other.
If both feature flags are enabled, sections are rendered for level 2 navigation
items.

### Navigation expansion

[:octicons-tag-24: 6.2.0][navigation.expand support] ·
:octicons-unlock-24: Feature flag

When expansion is enabled, the left sidebar will expand all collapsible
subsections by default, so the user doesn't have to open subsections manually.
Add the following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - navigation.expand
```

=== ":octicons-check-circle-fill-16: Enabled"

    [![navigation.expand enabled]][navigation.expand enabled]

=== ":octicons-skip-16: Disabled"

    [![navigation.expand disabled]][navigation.expand disabled]

  [navigation.expand support]: https://github.com/squidfunk/mkdocs-material/releases/tag/6.2.0
  [navigation.expand enabled]: ../assets/screenshots/navigation-expand.png
  [navigation.expand disabled]: ../assets/screenshots/navigation.png

### Section index pages

[:octicons-tag-24: 7.3.0][navigation.indexes support] ·
:octicons-unlock-24: Feature flag ·
:octicons-beaker-24: Experimental

When section index pages are enabled, documents can be directly attached to
sections, which is particularly useful for providing overview pages. Add the
following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - navigation.indexes
```

=== ":octicons-check-circle-fill-16: Enabled"

    [![navigation.indexes enabled]][navigation.indexes enabled]

=== ":octicons-skip-16: Disabled"

    [![navigation.indexes disabled]][navigation.indexes disabled]

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

This feature flag is not compatible with [`toc.integrate`][toc.integrate].

  [navigation.indexes support]: https://github.com/squidfunk/mkdocs-material/releases/tag/7.3.0
  [navigation.indexes enabled]: ../assets/screenshots/navigation-index-on.png
  [navigation.indexes disabled]: ../assets/screenshots/navigation-index-off.png
  [toc.integrate]: #integrated-table-of-contents

### Integrated table of contents

[:octicons-tag-24: 6.2.0][toc.integrate support] ·
:octicons-unlock-24: Feature flag

When navigation integration for the [table of contents] is enabled, it is always
rendered as part of the navigation sidebar on the left. Add the following lines
to `mkdocs.yml`:

``` yaml
theme:
  features:
    - toc.integrate
```

=== ":octicons-check-circle-fill-16: Enabled"

    [![toc.integrate enabled]][toc.integrate enabled]

=== ":octicons-skip-16: Disabled"

    [![toc.integrate disabled]][toc.integrate disabled]

This feature flag is not compatible with [`navigation.indexes`]
[navigation.indexes].

  [table of contents]: extensions/python-markdown.md#table-of-contents
  [toc.integrate support]: https://github.com/squidfunk/mkdocs-material/releases/tag/7.3.0
  [toc.integrate enabled]: ../assets/screenshots/toc-integrate.png
  [toc.integrate disabled]: ../assets/screenshots/navigation-tabs.png
  [navigation.indexes]: #section-index-pages

### Back-to-top button

[:octicons-tag-24: 7.1.0][navigation.top support] ·
:octicons-unlock-24: Feature flag

A back-to-top button can be shown when the user, after scrolling down, starts
to scroll up again. It's rendered centered and just below the header. Add the
following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - navigation.top
```

  [navigation.top support]: https://github.com/squidfunk/mkdocs-material/releases/tag/7.1.0

## Usage

### Hiding the sidebars

When [Metadata] is enabled, the navigation and/or table of contents sidebars
can be hidden for a document with custom front matter. Add the following lines
at the top of a Markdown file:

``` bash
---
hide:
  - navigation
  - toc
---

# Document title
...
```

=== "Hide navigation"

    [![hide.navigation enabled]][hide.navigation enabled]

=== "Hide table of contents"

    [![hide.toc enabled]][hide.toc enabled]

=== "Hide both"

    [![hide.* enabled]][hide.* enabled]

  [Metadata]: extensions/python-markdown.md#metadata
  [hide.navigation enabled]: ../assets/screenshots/hide-navigation.png
  [hide.toc enabled]: ../assets/screenshots/hide-toc.png
  [hide.* enabled]: ../assets/screenshots/hide-navigation-toc.png

## Customization

### Keyboard shortcuts

Material for MkDocs includes several keyboard shortcuts that make it possible
to navigate your project documentation via keyboard. There're two modes:

`search`{ #mode-search }

:   This mode is active when the _search is focused_. It provides several key
    bindings to make search accessible and navigable via keyboard:

    * ++arrow-down++ , ++arrow-up++ : select next / previous result
    * ++esc++ , ++tab++ : close search dialog
    * ++enter++ : follow selected result

`global`{ #mode-global }

:   This mode is active when _search is not focussed_ and when there's no other
    focussed element that is susceptible to keyboard input. The following keys
    are bound:

    * ++f++ , ++s++ , ++slash++ : open search dialog
    * ++p++ , ++comma++ : go to previous page
    * ++n++ , ++period++ : go to next page

Let's say you want to bind some action to the ++x++ key. By using [additional
JavaScript], you can subscribe to the `keyboard$` observable and attach
your custom event listener:

=== ":octicons-file-code-16: docs/javascripts/shortcuts.js"

    ``` js
    keyboard$.subscribe(function(key) {
      if (key.mode === "global" && key.type === "x") {
        /* Add custom keyboard handler here */
        key.claim() // (1)!
      }
    })
    ```

    1.  The call to `key.claim()` will execute `preventDefault()` on the
        underlying event, so the keypress will not propagate further and
        touch other event listeners.

=== ":octicons-file-code-16: mkdocs.yml"

    ``` yaml
    extra_javascript:
      - javascripts/shortcuts.js
    ```

  [additional JavaScript]: ../customization.md#additional-javascript

### Content area width

The width of the content area is set so the length of each line doesn't exceed
80-100 characters, depending on the width of the characters. While this
is a reasonable default, as longer lines tend to be harder to read, it may be
desirable to increase the overall width of the content area, or even make it
stretch to the entire available space.

This can easily be achieved with an [additional style sheet] and a few lines
of CSS:

=== ":octicons-file-code-16: docs/stylesheets/extra.css"

    ``` css
    .md-grid {
      max-width: 1440px; /* (1)! */
    }
    ```

    1.  If you want the content area to always stretch to the available screen
        space, reset `max-width` with the following CSS:

        ``` css
        .md-grid {
          max-width: initial;
        }
        ```

=== ":octicons-file-code-16: mkdocs.yml"

    ``` yaml
    extra_css:
      - stylesheets/extra.css
    ```

  [additional style sheet]: ../customization.md#additional-css
