---
template: overrides/main.html
---

# Python Markdown

Material for MkDocs supports a large number of [Python Markdown] extensions,
which is part of what makes it so attractive for technical writing. Following
is a list of all supported extensions, linking to the relevant sections of the
[reference] for what features they need to be enabled.

  [Python Markdown]: https://python-markdown.github.io/
  [reference]: ../../reference/abbreviations.md

## Supported extensions

The following extensions are all supported by Material for MkDocs and therefore
strongly recommended. See the [overview][Extensions] page for a minimal and
recommended configuration.

  [Extensions]: index.md

### Abbreviations

[:octicons-workflow-24: Extension][Abbreviations] ·
[:octicons-tag-24: 1.0.0 – present][Abbreviations support]

The [Abbreviations] extension adds the ability to add a small tooltip to an
element, by wrapping it with an `abbr` tag. Note that only plain text is
supported. Enable it via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - abbr
```

No configuration options are available. See reference for usage:

- [Adding abbreviations]
- [Adding a glossary]

  [Abbreviations]: https://python-markdown.github.io/extensions/abbreviations/
  [Abbreviations support]: https://github.com/squidfunk/mkdocs-material/releases/tag/1.0.0
  [Adding abbreviations]: ../../reference/abbreviations.md#adding-abbreviations
  [Adding a glossary]: ../../reference/abbreviations.md#adding-a-glossary

### Admonition

[:octicons-workflow-24: Extension][Admonition] ·
[:octicons-tag-24: 0.1.0 – present][Admonition support]

The [Admonition] extension adds support for admonitions, more commonly known as 
_call-outs_, which can be added to Markdown by using a simple syntax. Enable it
via `mkdocs.yml`:

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
  [Admonition support]: https://github.com/squidfunk/mkdocs-material/releases/tag/0.1.0
  [Adding admonitions]: ../../reference/admonitions.md#usage
  [Changing the title]: ../../reference/admonitions.md#changing-the-title
  [Removing the title]: ../../reference/admonitions.md#removing-the-title
  [Supported types]: ../../reference/admonitions.md#supported-types

### Attribute Lists

[:octicons-workflow-24: Extension][Attribute Lists] ·
[:octicons-tag-24: 0.1.0 – present][Attribute Lists support]

The [Attribute Lists] extension allows to add HTML attributes and CSS classes
to [almost every][Attribute Lists limitations] Markdown inline- and block-level
element with a special syntax. Enable it via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - attr_list
```

No configuration options are available. See reference for usage:

- [Adding buttons]
- [Adding icons with colors]
- [Image alignment]
- [Image lazy-loading]

  [Attribute Lists]: https://python-markdown.github.io/extensions/attr_list/
  [Attribute Lists support]: https://github.com/squidfunk/mkdocs-material/releases/tag/0.1.0
  [Attribute Lists limitations]: https://python-markdown.github.io/extensions/attr_list/#limitations
  [Adding buttons]: ../../reference/buttons.md#adding-buttons
  [Adding icons with colors]: ../../reference/buttons.md#with-colors
  [Image alignment]: ../../reference/images.md#image-alignment
  [Image lazy-loading]: ../../reference/images.md#image-lazy-loading

### Definition Lists

[:octicons-workflow-24: Extension][Definition Lists] ·
[:octicons-tag-24: 1.1.0 – present][Definition Lists support]

The [Definition Lists] extension adds the ability to add definition lists (more
commonly known as [description lists] `dl` in HTML) to any Markdown document.
Enable it via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - def_list
```

No configuration options are available. See reference for usage:

- [Using definition lists]

  [Definition Lists]: https://python-markdown.github.io/extensions/definition_lists/
  [Definition Lists support]: https://github.com/squidfunk/mkdocs-material/releases/tag/1.1.0
  [description lists]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl
  [Using definition lists]: ../../reference/lists.md#using-definition-lists

### Footnotes

[:octicons-workflow-24: Extension][Footnotes] ·
[:octicons-tag-24: 1.0.0 – present][Footnotes support]

The [Footnotes] extension allows to define footnotes inline with the content,
which are then rendered after the content of the Markdown document. Enable it
via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - footnotes
```

No configuration options are supported. See reference for usage:

- [Adding footnote references]
- [Adding footnote content]

  [Footnotes]: https://python-markdown.github.io/extensions/footnotes/
  [Footnotes support]: https://github.com/squidfunk/mkdocs-material/releases/tag/1.0.0
  [Adding footnote references]: ../../reference/footnotes.md#adding-footnote-references
  [Adding footnote content]: ../../reference/footnotes.md#adding-footnote-content

### Metadata

[:octicons-workflow-24: Extension][Metadata] ·
[:octicons-tag-24: 1.0.0 – present][Metadata support]

The [Metadata] extension adds the ability to attach arbitrary key-value pairs
to a Markdown document via front matter written in YAML syntax. It can be
enabled via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - meta
```

No configuration options are available. See reference for usage:

- [Setting the page title]
- [Setting the page description]
- [Hiding the sidebars]
- [Adding tags]

  [Metadata]: https://python-markdown.github.io/extensions/meta_data/
  [Metadata support]: https://github.com/squidfunk/mkdocs-material/releases/tag/1.0.0
  [Setting the page title]: ../../reference/meta-tags.md#setting-the-page-title
  [Setting the page description]: ../../reference/meta-tags.md#setting-the-page-description
  [Hiding the sidebars]: ../../setup/setting-up-navigation.md#hiding-the-sidebars
  [Adding tags]: ../../setup/setting-up-tags.md#adding-tags

### Markdown in HTML

[:octicons-workflow-24: Extension][Markdown in HTML] ·
[:octicons-tag-24: 0.1.0 – present][Markdown in HTML support]

The [Markdown in HTML] extension allows the author to write Markdown inside of
HTML, which is useful for wrapping Markdown with custom markup. Enable it via
`mkdocs.yml`:

``` yaml
markdown_extensions:
  - md_in_html
```

> By default, Markdown ignores any content within a raw HTML block-level
> element. With the `md_in_html` extension enabled, the content of a raw HTML
> block-level element can be parsed as Markdown by including a markdown
> attribute on the opening tag. The markdown attribute will be stripped from
> the output, while all other attributes will be preserved.

No configuration options are available. See reference for usage:

- [Image captions]

  [Markdown in HTML]: https://python-markdown.github.io/extensions/md_in_html/
  [Markdown in HTML support]: https://github.com/squidfunk/mkdocs-material/releases/tag/0.1.0
  [Image captions]: ../../reference/images.md#image-captions

### Table of Contents

[:octicons-workflow-24: Extension][Table of Contents] ·
[:octicons-tag-24: 0.1.0 – present][Table of Contents support]

The [Table of Contents] extension generates a table of contents from a Markdown
document, which Material for MkDocs will render as part of the resulting page.
Enable it via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - toc:
      permalink: true
```

The following configuration options are supported:

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
    like for example those from [Python Markdown Extensions][Pymdownx Slug]:

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

  [Table of Contents]: https://python-markdown.github.io/extensions/toc/
  [Table of Contents support]: https://github.com/squidfunk/mkdocs-material/releases/tag/0.1.0
  [Pymdownx Slug]: https://facelessuser.github.io/pymdown-extensions/extras/slugs/

### Tables

[:octicons-workflow-24: Extension][Tables] ·
[:octicons-tag-24: 0.1.0 – present][Tables support]

The [Tables] extension adds the ability to create tables in Markdown documents
by using a simple syntax. Enabled it via `mkdocs.yml` (albeit it should be
enabled by default):

``` yaml
markdown_extensions:
  - tables
```

No configuration options are available. See reference for usage:

- [Using data tables]
- [Column alignment]

  [Tables]: https://python-markdown.github.io/extensions/tables/
  [Tables support]: https://github.com/squidfunk/mkdocs-material/releases/tag/0.1.0
  [Using data tables]: ../../reference/data-tables.md#using-data-tables
  [Column alignment]: ../../reference/data-tables.md#column-alignment

## Superseded extensions

The following [Python Markdown] extensions are not (or might not be) supported 
anymore, and are therefore not recommended for use. Instead, the alternatives
should be considered.

### Fenced Code Blocks

[:octicons-workflow-24: Extension][Fenced Code Blocks] ·
[:octicons-tag-24: 0.1.0 – present][Fenced Code Blocks support]

Superseded by [SuperFences]. This extension might still work, but the
[SuperFences] extension is superior in many ways, as it allows for arbitrary 
nesting, and therefore strongly recommended.

  [Fenced Code Blocks]: https://python-markdown.github.io/extensions/fenced_code_blocks/
  [Fenced Code Blocks support]: https://github.com/squidfunk/mkdocs-material/releases/tag/0.1.0
  [SuperFences]: https://facelessuser.github.io/pymdown-extensions/extensions/superfences/

### CodeHilite

[:octicons-workflow-24: Extension][CodeHilite] ·
[:octicons-tag-24: 0.1.0 – 5.5.14][CodeHilite support]

Superseded by [Highlight]. Support for CodeHilite was dropped in version 6.0.0,
as [Highlight] has a better integration with other great extensions like 
[SuperFences] and [InlineHilite].

  [CodeHilite]: https://python-markdown.github.io/extensions/code_hilite/
  [CodeHilite support]: https://github.com/squidfunk/mkdocs-material/releases/tag/0.1.0
  [Highlight]: https://facelessuser.github.io/pymdown-extensions/extensions/superfences/
  [InlineHilite]: https://facelessuser.github.io/pymdown-extensions/extensions/inlinehilite/
