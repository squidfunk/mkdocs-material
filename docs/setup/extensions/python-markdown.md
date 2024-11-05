# Python Markdown

Material for MkDocs supports a large number of [Python Markdown] extensions,
which is part of what makes it so attractive for technical writing. Following
is a list of all supported extensions, linking to the relevant sections of the
reference for which features they need to be enabled.

  [Python Markdown]: https://python-markdown.github.io/

## Supported extensions

### Abbreviations

<!-- md:version 1.0.0 -->
<!-- md:extension [abbr][Abbreviations] -->

The [Abbreviations] extension adds the ability to add a small tooltip to an
element, by wrapping it with an `abbr` tag. Only plain text (no markup) is
supported. Enable it via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - abbr
```

No configuration options are available. See reference for usage:

- [Adding abbreviations]
- [Adding a glossary]

  [Abbreviations]: https://python-markdown.github.io/extensions/abbreviations/
  [Adding abbreviations]: ../../reference/tooltips.md#adding-abbreviations
  [Adding a glossary]: ../../reference/tooltips.md#adding-a-glossary

### Admonition

<!-- md:version 0.1.0 -->
<!-- md:extension [admonition][Admonition] -->

The [Admonition] extension adds support for admonitions, more commonly known as
_call-outs_, which can be defined in Markdown by using a simple syntax. Enable
it via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - admonition
```

No configuration options are available. See reference for usage:

- [Adding admonitions]
- [Changing the title]
- [Removing the title]
- [Supported types]

  [Admonition]: https://python-markdown.github.io/extensions/admonition/
  [Adding admonitions]: ../../reference/admonitions.md#usage
  [Changing the title]: ../../reference/admonitions.md#changing-the-title
  [Removing the title]: ../../reference/admonitions.md#removing-the-title
  [Supported types]: ../../reference/admonitions.md#supported-types

### Attribute Lists

<!-- md:version 0.1.0 -->
<!-- md:extension [attr_list][Attribute Lists] -->

The [Attribute Lists] extension allows to add HTML attributes and CSS classes
to [almost every][Attribute Lists limitations] Markdown inline- and block-level
element with a special syntax. Enable it via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - attr_list
```

No configuration options are available. See reference for usage:

- [Using annotations]
- [Using grids]
- [Adding buttons]
- [Adding tooltips]
- [Using icons with colors]
- [Using icons with animations]
- [Image alignment]
- [Image lazy-loading]

  [Attribute Lists]: https://python-markdown.github.io/extensions/attr_list/
  [Attribute Lists limitations]: https://python-markdown.github.io/extensions/attr_list/#limitations
  [Using grids]: ../../reference/grids.md#using-grids
  [Adding buttons]: ../../reference/buttons.md#adding-buttons
  [Adding tooltips]: ../../reference/tooltips.md#adding-tooltips
  [Using icons with colors]: ../../reference/icons-emojis.md#with-colors
  [Using icons with animations]: ../../reference/icons-emojis.md#with-animations
  [Image alignment]: ../../reference/images.md#image-alignment
  [Image lazy-loading]: ../../reference/images.md#image-lazy-loading

### Definition Lists

<!-- md:version 1.1.0 -->
<!-- md:extension [def_list][Definition Lists] -->

The [Definition Lists] extension adds the ability to add definition lists (more
commonly known as [description lists] – `dl` in HTML) via Markdown to a
document. Enable it via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - def_list
```

No configuration options are available. See reference for usage:

- [Using definition lists]

  [Definition Lists]: https://python-markdown.github.io/extensions/definition_lists/
  [description lists]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl
  [Using definition lists]: ../../reference/lists.md#using-definition-lists

### Footnotes

<!-- md:version 1.0.0 -->
<!-- md:extension [footnotes][Footnotes] -->

The [Footnotes] extension allows to define inline footnotes, which are then
rendered below all Markdown content of a document. Enable it via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - footnotes
```

No configuration options are supported. See reference for usage:

- [Adding footnote references]
- [Adding footnote content]

  [Footnotes]: https://python-markdown.github.io/extensions/footnotes/
  [Adding footnote references]: ../../reference/footnotes.md#adding-footnote-references
  [Adding footnote content]: ../../reference/footnotes.md#adding-footnote-content

### Markdown in HTML

<!-- md:version 0.1.0 -->
<!-- md:extension [md_in_html][Markdown in HTML] -->

The [Markdown in HTML] extension allows for writing Markdown inside of HTML,
which is useful for wrapping Markdown content with custom elements. Enable it
via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - md_in_html
```

> By default, Markdown ignores any content within a raw HTML block-level
> element. With the `md_in_html` extension enabled, the content of a raw HTML
> block-level element can be parsed as Markdown by including a `markdown`
> attribute on the opening tag. The `markdown` attribute will be stripped from
> the output, while all other attributes will be preserved.

No configuration options are available. See reference for usage:

- [Using annotations]
- [Using grids]
- [Image captions]

  [Markdown in HTML]: https://python-markdown.github.io/extensions/md_in_html/
  [Using annotations]: ../../reference/annotations.md#usage
  [Using grids]: ../../reference/grids.md#usage
  [Image captions]: ../../reference/images.md#image-captions

### Table of Contents

<!-- md:version 0.1.0 -->
<!-- md:extension [toc][Table of Contents] -->

The [Table of Contents] extension automatically generates a table of contents
from a document, which Material for MkDocs will render as part of the resulting
page. Enable it via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - toc:
      permalink: true
```

The following configuration options are supported:

<!-- md:option toc.title -->

:   <!-- md:version 7.3.5 --> <!-- md:default computed --> –
    This option sets the title of the table of contents in the right navigation
    sidebar, which is normally automatically sourced from the translations for
    the [site language] as set in `mkdocs.yml`:

    ``` yaml
    markdown_extensions:
      - toc:
          title: On this page
    ```

<!-- md:option toc.permalink -->

:   <!-- md:default `false` --> This option adds an anchor link
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

<!-- md:option toc.permalink_title -->

:   <!-- md:default `Permanent link` --> This option sets the
    title of the anchor link which is shown on hover and read by screen readers.
    For accessibility reasons, it might be beneficial to change it to a more
    discernable name, stating that the anchor links to the section itself:

    ``` yaml
    markdown_extensions:
      - toc:
          permalink_title: Anchor link to this section for reference
    ```

<!-- md:option toc.slugify -->

:   <!-- md:default `toc.slugify` --> This option allows for
    customization of the slug function. For some languages, the default may not
    produce good and readable identifiers – consider using another slug function
    like for example those from [Python Markdown Extensions][Slugs]:

    === "Unicode"

        ``` yaml
        markdown_extensions:
          - toc:
              slugify: !!python/object/apply:pymdownx.slugs.slugify
                kwds:
                  case: lower
        ```

    === "Unicode, case-sensitive"

        ``` yaml
        markdown_extensions:
          - toc:
              slugify: !!python/object/apply:pymdownx.slugs.slugify {}
        ```

<!-- md:option toc.toc_depth -->

:   <!-- md:default `6` --> Define the range of levels to be
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

The other configuration options of this extension are not officially supported
by Material for MkDocs, which is why they may yield unexpected results. Use
them at your own risk.

  [Table of Contents]: https://python-markdown.github.io/extensions/toc/
  [site language]: ../changing-the-language.md#site-language
  [Slugs]: https://facelessuser.github.io/pymdown-extensions/extras/slugs/

### Tables

<!-- md:version 0.1.0 -->
<!-- md:extension [tables][Tables] -->

The [Tables] extension adds the ability to create tables in Markdown by using a
simple syntax. Enable it via `mkdocs.yml` (albeit it should be enabled by
default):

``` yaml
markdown_extensions:
  - tables
```

No configuration options are available. See reference for usage:

- [Using data tables]
- [Column alignment]

  [Tables]: https://python-markdown.github.io/extensions/tables/
  [Using data tables]: ../../reference/data-tables.md#usage
  [Column alignment]: ../../reference/data-tables.md#column-alignment

## Superseded extensions

The following [Python Markdown] extensions are not (or might not be) supported
anymore, and are therefore not recommended for use. Instead, the alternatives
should be considered.

### Fenced Code Blocks

<!-- md:version 0.1.0 -->
<!-- md:extension [fenced_code_blocks][Fenced Code Blocks] -->

Superseded by [SuperFences]. This extension might still work, but the
[SuperFences] extension is superior in many ways, as it allows for arbitrary
nesting, and is therefore recommended.

  [Fenced Code Blocks]: https://python-markdown.github.io/extensions/fenced_code_blocks/
  [SuperFences]: https://facelessuser.github.io/pymdown-extensions/extensions/superfences/

### CodeHilite

<!-- md:version 0.1.0 -->
<!-- md:extension [codehilite][CodeHilite] -->

Superseded by [Highlight]. Support for CodeHilite was dropped in
<!-- md:version 6.0.0 -->, as [Highlight] has a better integration with other
essential extensions like [SuperFences] and [InlineHilite].

  [CodeHilite]: https://python-markdown.github.io/extensions/code_hilite/
  [CodeHilite support]: https://github.com/squidfunk/mkdocs-material/releases/tag/0.1.0
  [Highlight]: https://facelessuser.github.io/pymdown-extensions/extensions/highlight/
  [InlineHilite]: https://facelessuser.github.io/pymdown-extensions/extensions/inlinehilite/
