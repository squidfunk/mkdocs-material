# Setting up navigation

A clear and concise navigation structure is an important aspect of good project
documentation. Material for MkDocs provides a multitude of options to configure
the behavior of navigational elements, including [tabs] and [sections], and one
of its flagship features: [instant loading].

  [tabs]: #navigation-tabs
  [sections]: #navigation-sections
  [instant loading]: #instant-loading

Additional navigation can be configured [in the footer] as well as with the
[tags plugin]. The [blog plugin] also sets up additional navigation.

[in the footer]: setting-up-the-footer.md#navigation
[tags plugin]: ../plugins/tags.md
[blog plugin]: ../plugins/blog.md

## Configuration

### Instant loading

<!-- md:version 5.0.0 -->
<!-- md:feature -->

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

!!! info "The [`site_url`][mkdocs.site_url] setting must be set"

    Note that you must set [`site_url`][mkdocs.site_url] when using instant
    navigation, as instant navigation relies on the generated `sitemap.xml`
    which will be empty if this setting is omitted. Example:

    ``` yaml
    site_url: https://example.com
    ```

  [XHR]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest

#### Instant prefetching

<!-- md:sponsors -->
<!-- md:version insiders-4.36.0 -->
<!-- md:feature -->
<!-- md:flag experimental -->

Instant prefetching is a new experimental feature that will start to fetch a
page once the user hovers over a link. This will reduce the perceived loading
time for the user, especially on slow connections, as the page will be available
immediately upon navigation. Enable it with:

``` yaml
theme:
  features:
    - navigation.instant
    - navigation.instant.prefetch
```

#### Progress indicator

<!-- md:version 9.4.3 -->
<!-- md:feature -->
<!-- md:flag experimental -->

In order to provide a better user experience on slow connections when using
instant navigation, a progress indicator can be enabled. It will be shown at
the top of the page and will be hidden once the page has fully loaded. You can
enable it in `mkdocs.yml` with:

``` yaml
theme:
  features:
    - navigation.instant
    - navigation.instant.progress
```

The progress indicator will only show if the page hasn't finished loading after
400ms, so that fast connections will never show it for a better instant
experience.

### Instant previews :material-alert-decagram:{ .mdx-pulse title="Added on January 28, 2024" }

<!-- md:sponsors -->
<!-- md:version insiders-4.52.0 -->
<!-- md:feature -->
<!-- md:flag experimental -->

Instant previews are a brand new feature that allow the user to preview another
site of your documentation without navigating to it. They can be very helpful to
keep the user in context. Instant previews can be enabled on any header link
with the `data-preview` attribute:

```` markdown title="Link with instant preview"
``` markdown
[Attribute Lists](#){ data-preview }
```
````

<div class="result" markdown>

[Attribute Lists](extensions/python-markdown.md#attribute-lists){ data-preview }

</div>

!!! info "Limitations"

    Instant previews are still an experimental feature and currently limited to
    headerlinks. This means, you can use them on any internal link that points
    to a header on another page, but not other elements with `id` attributes.
    After we have gathered enough feedback, we will consider extending this
    feature to other, and possibly arbitrary elements.

#### Automatic previews

<!-- md:sponsors -->
<!-- md:version insiders-4.53.0 -->
<!-- md:extension -->
<!-- md:flag experimental -->

The recommended way to work with instant previews is to use the Markdown
extension that is included with Material for MkDocs, as it allows you to enable
instant previews on a per-page or per-section level for your documentation:

``` yaml
markdown_extensions:
  - material.extensions.preview:
      targets:
        include:
          - changelog/index.md
          - customization.md
          - insiders/changelog/*
          - setup/extensions/*
```

The above configuration is what we use for our documentation. We've enabled
instant previews for our changelogs, customization guide, and Insiders sections,
as well as for all Markdown extensions that we support.

!!! info "Full configuration example"

    ``` yaml
    markdown_extensions:
      - material.extensions.preview:
          sources: # (1)!
            include:
              - ...
            exclude:
              - ...
          targets: # (2)!
            include:
              - ...
            exclude:
              - ...
    ```

    1.  Sources specify the pages _on_ which instant previews should be enabled.
        If this setting is omitted, instant previews will be enabled on all
        pages. You can use patterns to include or exclude pages. Exclusion is
        evaluated on top of inclusion, so if a page is matched by both, it will
        be excluded.

    2.  Targets specify the pages _to_ which instant previews should be enabled.
        This is the recommended way to enable instant previews.
---

Instant previews can also be enabled globally by adding the following lines to
`mkdocs.yml`, which will enable instant previews for all header links,
alleviating the need to add data attributes:

``` yaml
theme:
  features:
    - navigation.instant.preview
```

!!! info "The [`site_url`][mkdocs.site_url] setting must be set"

    Note that you must set [`site_url`][mkdocs.site_url] when using instant
    previews, as instant previews rely on the generated `sitemap.xml`
    which will be empty if this setting is omitted. Example:

    ``` yaml
    site_url: https://example.com
    ```

### Anchor tracking

<!-- md:version 8.0.0 -->
<!-- md:feature -->

When anchor tracking is enabled, the URL in the address bar is automatically
updated with the active anchor as highlighted in the table of contents. Add the
following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - navigation.tracking
```

### Navigation tabs

<!-- md:version 1.1.0 -->
<!-- md:feature -->

When tabs are enabled, top-level sections are rendered in a menu layer below
the header for viewports above `1220px`, but remain as-is on mobile.[^1] Add
the following lines to `mkdocs.yml`:

  [^1]:
    Prior to <!-- md:version 6.2.0 -->, navigation tabs had a slightly different
    behavior. All top-level pages (i.e. all top-level entries directly
    referring to a `*.md` file) defined inside the `nav` entry of `mkdocs.yml`
    were grouped under the first tab which received the title of the first page.
    This made it impossible to include a top-level page (or external link) as a
    tab item, as was reported in #1884 and #2072. From <!-- md:version 6.2.0 -->
    on, navigation tabs include all top-level pages and sections.

``` yaml
theme:
  features:
    - navigation.tabs
```

=== "With tabs"

    [![Navigation tabs enabled]][Navigation tabs enabled]

=== "Without"

    [![Navigation tabs disabled]][Navigation tabs disabled]

  [Navigation tabs enabled]: ../assets/screenshots/navigation-tabs.png
  [Navigation tabs disabled]: ../assets/screenshots/navigation.png

#### Sticky navigation tabs

<!-- md:version 7.3.0 -->
<!-- md:feature -->

When sticky tabs are enabled, navigation tabs will lock below the header and
always remain visible when scrolling down. Just add the following two feature
flags to `mkdocs.yml`:

``` yaml
theme:
  features:
    - navigation.tabs
    - navigation.tabs.sticky
```

=== "With sticky tabs"

    [![Sticky navigation tabs enabled]][Sticky navigation tabs enabled]

=== "Without"

    [![Sticky navigation tabs disabled]][Sticky navigation tabs disabled]

  [Sticky navigation tabs enabled]: ../assets/screenshots/navigation-tabs-sticky.png
  [Sticky navigation tabs disabled]: ../assets/screenshots/navigation-tabs-collapsed.png

### Navigation sections

<!-- md:version 6.2.0 -->
<!-- md:feature -->

When sections are enabled, top-level sections are rendered as groups in the
sidebar for viewports above `1220px`, but remain as-is on mobile. Add the
following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - navigation.sections
```

=== "With sections"

    [![Navigation sections enabled]][Navigation sections enabled]

=== "Without"

    [![Navigation sections disabled]][Navigation sections disabled]

  [Navigation sections enabled]: ../assets/screenshots/navigation-sections.png
  [Navigation sections disabled]: ../assets/screenshots/navigation.png

Both feature flags, [`navigation.tabs`][tabs] and
[`navigation.sections`][sections], can be combined with each other. If both
feature flags are enabled, sections are rendered for level 2 navigation items.

### Navigation expansion

<!-- md:version 6.2.0 -->
<!-- md:feature -->

When expansion is enabled, the left sidebar will expand all collapsible
subsections by default, so the user doesn't have to open subsections manually.
Add the following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - navigation.expand
```

=== "With expansion"

    [![Navigation expansion enabled]][Navigation expansion enabled]

=== "Without"

    [![Navigation expansion disabled]][Navigation expansion disabled]

  [Navigation expansion enabled]: ../assets/screenshots/navigation-expand.png
  [Navigation expansion disabled]: ../assets/screenshots/navigation.png

### Navigation path <small>Breadcrumbs</small> { id=navigation-path }

<!-- md:sponsors -->
<!-- md:version insiders-4.28.0 -->
<!-- md:feature -->
<!-- md:flag experimental -->

When navigation paths are activated, a breadcrumb navigation is rendered above
the title of each page, which might make orientation easier for users visiting your
documentation on devices with smaller screens. Add the following lines to
`mkdocs.yml`:

``` yaml
theme:
  features:
    - navigation.path
```

=== "With navigation path"

    [![Navigation path enabled]][Navigation path enabled]

=== "Without"

    [![Navigation path disabled]][Navigation path disabled]

  [Navigation path enabled]: ../assets/screenshots/navigation-path-on.png
  [Navigation path disabled]: ../assets/screenshots/navigation-path-off.png

### Navigation pruning

<!-- md:version 9.2.0 -->
<!-- md:feature -->
<!-- md:flag experimental -->

When pruning is enabled, only the visible navigation items are included in the
rendered HTML, __reducing the size of the built site by 33% or more__. Add the
following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - navigation.prune # (1)!
```

1.  This feature flag is not compatible with
    [`navigation.expand`][navigation.expand], as navigation expansion requires
    the complete navigation structure.

This feature flag is especially useful for documentation sites with 100+ or even
1,000+ of pages, as the navigation makes up a significant fraction of the HTML.
Navigation pruning will replace all expandable sections with links to the first
page in that section (or the section index page).

  [navigation.expand]: #navigation-expansion

### Section index pages

<!-- md:version 7.3.0 -->
<!-- md:feature -->

When section index pages are enabled, documents can be directly attached to
sections, which is particularly useful for providing overview pages. Add the
following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - navigation.indexes # (1)!
```

1.  This feature flag is not compatible with [`toc.integrate`][toc.integrate],
    as sections cannot host the table of contents due to missing space.

=== "With section index pages"

    [![Section index pages enabled]][Section index pages enabled]

=== "Without"

    [![Section index pages disabled]][Section index pages disabled]

In order to link a page to a section, create a new document with the name
`index.md` in the respective folder, and add it to the beginning of your
navigation section:

``` yaml
nav:
  - Section:
    - section/index.md # (1)!
    - Page 1: section/page-1.md
    ...
    - Page n: section/page-n.md
```

1.  MkDocs also considers files called `README.md` as [index pages].

  [Section index pages enabled]: ../assets/screenshots/navigation-index-on.png
  [Section index pages disabled]: ../assets/screenshots/navigation-index-off.png
  [toc.integrate]: #navigation-integration
  [index pages]: https://www.mkdocs.org/user-guide/writing-your-docs/#index-pages

### Table of contents

#### Anchor following

<!-- md:version 8.5.0 -->
<!-- md:feature -->
<!-- md:flag experimental -->

When anchor following for the [table of contents] is enabled, the sidebar is
automatically scrolled so that the active anchor is always visible. Add the
following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - toc.follow
```

#### Navigation integration

<!-- md:version 6.2.0 -->
<!-- md:feature -->

When navigation integration for the [table of contents] is enabled, it is always
rendered as part of the navigation sidebar on the left. Add the following lines
to `mkdocs.yml`:

``` yaml
theme:
  features:
    - toc.integrate # (1)!
```

1.  This feature flag is not compatible with
    [`navigation.indexes`][navigation.indexes], as sections cannot host the
    table of contents due to missing space.

=== "With navigation integration"

    [![Navigation integration enabled]][Navigation integration enabled]

=== "Without"

    [![Navigation integration disabled]][Navigation integration disabled]

  [table of contents]: extensions/python-markdown.md#table-of-contents
  [Navigation integration enabled]: ../assets/screenshots/toc-integrate.png
  [Navigation integration disabled]: ../assets/screenshots/navigation-tabs.png
  [navigation.indexes]: #section-index-pages

### Back-to-top button

<!-- md:version 7.1.0 -->
<!-- md:feature -->

A back-to-top button can be shown when the user, after scrolling down, starts
to scroll up again. It's rendered centered and just below the header. Add the
following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - navigation.top
```

## Usage

### Hiding the sidebars

<!-- md:version 6.2.0 -->
<!-- md:flag metadata -->

The navigation and/or table of contents sidebars can be hidden for a document
with the front matter `hide` property. Add the following lines at the top of a
Markdown file:

``` yaml
---
hide:
  - navigation
  - toc
---

# Page title
...
```

=== "Hide navigation"

    [![Hide navigation enabled]][Hide navigation enabled]

=== "Hide table of contents"

    [![Hide table of contents enabled]][Hide table of contents enabled]

=== "Hide both"

    [![Hide both enabled]][Hide both enabled]

  [Hide navigation enabled]: ../assets/screenshots/hide-navigation.png
  [Hide table of contents enabled]: ../assets/screenshots/hide-toc.png
  [Hide both enabled]: ../assets/screenshots/hide-navigation-toc.png

### Hiding the navigation path

<!-- md:sponsors -->
<!-- md:version insiders-4.28.0 -->
<!-- md:flag metadata -->

While the [navigation path] is rendered above the main headline, sometimes, it
might be desirable to hide it for a specific page, which can be achieved with
the front matter `hide` property:

``` yaml
---
hide:
  - path
---

# Page title
...
```

  [navigation path]: #navigation-path

## Customization

### Keyboard shortcuts

Material for MkDocs includes several keyboard shortcuts that make it possible
to navigate your project documentation via keyboard. There are two modes:

<!-- md:option mode:search -->

:   This mode is active when the _search is focused_. It provides several key
    bindings to make search accessible and navigable via keyboard:

    * ++arrow-down++ , ++arrow-up++ : select next / previous result
    * ++esc++ , ++tab++ : close search dialog
    * ++enter++ : follow selected result

<!-- md:option mode:global -->

:   This mode is active when _search is not focussed_ and when there's no other
    focussed element that is susceptible to keyboard input. The following keys
    are bound:

    * ++f++ , ++s++ , ++slash++ : open search dialog
    * ++p++ , ++comma++ : go to previous page
    * ++n++ , ++period++ : go to next page

Let's say you want to bind some action to the ++x++ key. By using [additional
JavaScript], you can subscribe to the `keyboard$` observable and attach
your custom event listener:

=== ":octicons-file-code-16: `docs/javascripts/shortcuts.js`"

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

=== ":octicons-file-code-16: `mkdocs.yml`"

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

=== ":octicons-file-code-16: `docs/stylesheets/extra.css`"

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

=== ":octicons-file-code-16: `mkdocs.yml`"

    ``` yaml
    extra_css:
      - stylesheets/extra.css
    ```

  [additional style sheet]: ../customization.md#additional-css
