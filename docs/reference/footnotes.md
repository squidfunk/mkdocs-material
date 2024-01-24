---
icon: material/format-align-bottom
---

# Footnotes

Footnotes are a great way to add supplemental or additional information to a
specific word, phrase or sentence without interrupting the flow of a document.
Material for MkDocs provides the ability to define, reference and render
footnotes.

## Configuration

This configuration adds the ability to define inline footnotes, which are then
rendered below all Markdown content of a document. Add the following lines to
`mkdocs.yml`:

``` yaml
markdown_extensions:
  - footnotes
```

See additional configuration options:

- [Footnotes]

  [Footnotes]: ../setup/extensions/python-markdown.md#footnotes

### Footnote tooltips :material-alert-decagram:{ .mdx-pulse title="Added on January 24, 2024" }

<!-- md:sponsors -->
<!-- md:version insiders-4.51.0 -->
<!-- md:flag experimental -->

[Insiders] allows to render footnotes as inline tooltips, so the user can read
the footnote without leaving the context of the document. Footnote tooltips can
be enabled in `mkdocs.yml` with:

``` yaml
theme:
  features:
    - content.footnote.tooltips
```

__Footnote tooltips are enabled on our documentation__, so to try it out, you
can just hover or focus any footnote on this page or any other page of our
documentation.

  [Insiders]: ../insiders/index.md

## Usage

### Adding footnote references

A footnote reference must be enclosed in square brackets and must start with a
caret `^`, directly followed by an arbitrary identifier, which is similar to
the standard Markdown link syntax.

``` title="Text with footnote references"
Lorem ipsum[^1] dolor sit amet, consectetur adipiscing elit.[^2]
```

<div class="result" markdown>

Lorem ipsum[^1] dolor sit amet, consectetur adipiscing elit.[^2]

</div>

### Adding footnote content

The footnote content must be declared with the same identifier as the reference.
It can be inserted at an arbitrary position in the document and is always
rendered at the bottom of the page. Furthermore, a backlink to the footnote
reference is automatically added.

#### on a single line

Short footnotes can be written on the same line:

``` title="Footnote"
[^1]: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

<div class="result" markdown>

[:octicons-arrow-down-24: Jump to footnote](#fn:1)

</div>

  [^1]: Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### on multiple lines

Paragraphs can be written on the next line and must be indented by four spaces:

``` title="Footnote"
[^2]:
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
```

<div class="result" markdown>

[:octicons-arrow-down-24: Jump to footnote](#fn:2)

</div>

[^2]:
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus
    auctor massa, nec semper lorem quam in massa.
