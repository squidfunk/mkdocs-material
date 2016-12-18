# Inlinehilite

The [Inlinehilite][1] extension included in the [PyMdown Extensions][2] package
adds support for inline code highlighting. It's useful for short snippets
included with body copy.

  [1]: https://facelessuser.github.io/pymdown-extensions/extensions/inlinehilite/
  [2]: https://facelessuser.github.io/pymdown-extensions

## Installation

Make sure that the PyMdown Extensions package [is installed][] and add the
following lines to your `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.inlinehilite
```

## Usage

Syntax is similar to usual code highlighting, with the langauge shebang followed by one space. If you need to escape the highlight (like we're about to), add a space prior to the shebang.

For example, `#!js var test = 0;`, which was achieved using ` #!js var test = 0;`. Alternatively, you can use the triple colon, ` :::js var test = 0;` to produce the same result, `:::js var test = 0;`.
