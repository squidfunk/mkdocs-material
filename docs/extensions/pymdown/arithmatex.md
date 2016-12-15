# Arithmatex <small>MathJax</small>

[Arithmatex][] integrates [MathJax][] with Markdown and is included in the
[PyMdown Extensions][] package. It parses block-style and inline equations
written in TeX markup and outputs them in mathematical notation.

## Installation

Make sure that the PyMdown Extensions package [is installed][] and add the
following lines to your `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.arithmatex
```

The MathJax runtime is automatically included if the extension is enabled, so
there is no need for extra JavaScript.

## Usage

MathJax searches for `:::tex $$...$$` (blocks) and `:::tex $...$` (inline)
equations, parses their contents and renders them in mathematical notation.
See [this thread][] on StackExchange for a short introduction and quick
reference on how to write equations in TeX syntax.

### Blocks

Blocks are enclosed in `:::tex $$...$$` which are placed on separate lines.

Example:

``` tex
$$
\frac{n!}{k!(n-k)!} = \binom{n}{k}
$$
```

Result:

$$
\frac{n!}{k!(n-k)!} = \binom{n}{k}
$$

### Inline

Inline equations need to be enclosed in `:::tex $...$`:

Example:

``` tex
Lorem ipsum dolor sit amet: $p(x|y) = \frac{p(y|x)p(x)}{p(y)}$
```

Result:

Lorem ipsum dolor sit amet: $p(x|y) = \frac{p(y|x)p(x)}{p(y)}$

[Arithmatex]: https://facelessuser.github.io/pymdown-extensions/extensions/arithmatex/
[MathJax]: https://www.mathjax.org/
[PyMdown Extensions]: https://facelessuser.github.io/pymdown-extensions
[is installed]: /extensions/pymdown/overview/#installation
[this thread]: http://meta.math.stackexchange.com/questions/5020/
