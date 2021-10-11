---
template: overrides/main.html
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

## Usage

### Adding footnote references

A footnote reference must be enclosed in square brackets and must start with a
caret `^`, directly followed by an arbitrary identifier, which is similar to
the standard Markdown link syntax.

_Example_:

``` markdown
Lorem ipsum[^1] dolor sit amet, consectetur adipiscing elit.[^2]
```

_Result_:

Lorem ipsum[^1] dolor sit amet, consectetur adipiscing elit.[^2]

### Adding footnote content

The footnote content must be declared with the same identifier as the reference.
It can be inserted at an arbitrary position in the document and is always
rendered at the bottom of the page. Furthermore, a backlink to the footnote
reference is automatically added.

#### on a single line

Short footnotes can be written on the same line.

_Example_:

``` markdown
[^1]: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

_Result_:

[:octicons-arrow-down-24: Jump to footnote](#fn:1)

  [^1]: Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### on multiple lines

Paragraphs can be written on the next line and must be indented by four spaces.

_Example_:

``` markdown
[^2]:
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
```

_Result_:

[^2]:
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus
    auctor massa, nec semper lorem quam in massa.

[:octicons-arrow-down-24: Jump to footnote](#fn:2)
