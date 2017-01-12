# Footnotes

[Footnotes][1] is another extension included in the standard Markdown library.
As the name says, it adds the ability to add footnotes to your documentation.

  [1]: https://pythonhosted.org/Markdown/extensions/footnotes.html

## Installation

Add the following lines to your `mkdocs.yml`:

``` yaml
markdown_extensions:
  - footnotes
```

## Usage

The markup for footnotes is similar to the standard Markdown markup for links.
A reference is inserted in the text, which can then be defined at any point in
the document.

### Inserting the reference

The footnote reference is enclosed in square brackets and starts with a caret,
followed by an arbitrary label which may contain numeric identifiers [1, 2, 3,
...] or names [Granovetter et al. 1998]. The rendered references are always
consecutive superscripted numbers.

Example:

``` markdown
Lorem ipsum[^1] dolor sit amet, consectetur adipiscing elit.[^2]
```

Result:

Lorem ipsum[^1] dolor sit amet, consectetur adipiscing elit.[^2]

### Inserting the content

The footnote content is also declared with a label, which must match the label
used for the footnote reference. It can be inserted at an arbitrary position in
the document and is always rendered at the bottom of the page. Furthermore, a
backlink is automatically added to the footnote reference.

#### on a single line

Short statements can be written on the same line.

Example:

``` markdown
[^1]: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

Result:

<a href="#fn:1">Jump to footnote at the bottom of the page</a>

  [^1]: Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### on multiple lines

Paragraphs should be written on the next line. As with all Markdown blocks, the
content must be indented by four spaces.

Example:

``` markdown
[^2]:
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
```

Result:

  [^2]:
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
      nulla. Curabitur feugiat, tortor non consequat finibus, justo purus
      auctor massa, nec semper lorem quam in massa.

<a href="#fn:2">Jump to footnote at the bottom of the page</a>
