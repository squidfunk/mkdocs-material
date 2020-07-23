---
template: overrides/main.html
---

# Footnotes

Footnotes are a great way to add references to supplemental or additional
information for a specific section of a document without interrupting the
document flow. Material for MkDocs provides the ability to insert inline
footnotes and render them at the bottom of the page.

## Configuration

### Footnotes

[:octicons-file-code-24: Source][1] · [:octicons-workflow-24: Extension][2]

The [Footnotes][2] extension, which is part of the standard Markdown library,
adds the ability to add inline footnotes to a document and can be enabled via
`mkdocs.yml`:

``` yaml
markdown_extensions:
  - footnotes
```

  [1]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/stylesheets/main/extensions/markdown/_footnotes.scss
  [2]: https://python-markdown.github.io/extensions/footnotes/

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

Short statements can be written on the same line.

_Example_:

``` markdown
[^1]: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

_Result_:

[Jump to footnote at the bottom of the page](#fn:1)

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

[Jump to footnote at the bottom of the page](#fn:2)
