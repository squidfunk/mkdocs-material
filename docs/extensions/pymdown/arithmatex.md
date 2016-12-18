# Arithmatex <small>MathJax</small>

[Arithmatex][1] integrates [MathJax][2] with Markdown and is included in the
[PyMdown Extensions][3] package. It parses block-style and inline equations
written in TeX markup and outputs them in mathematical notation.

  [1]: https://facelessuser.github.io/pymdown-extensions/extensions/arithmatex/
  [2]: https://www.mathjax.org/
  [3]: https://facelessuser.github.io/pymdown-extensions

## Installation

Make sure that the PyMdown Extensions package [is installed][4] and add the
following lines to your `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.arithmatex
```

The MathJax runtime is automatically included if the extension is enabled, so
there is no need for extra JavaScript.

  [4]: /extensions/pymdown/overview/#installation

## Usage

MathJax searches for `:::tex $$...$$` (blocks) and `:::tex $...$` (inline)
equations, parses their contents and renders them in mathematical notation.
See [this thread][5] on StackExchange for a short introduction and quick
reference on how to write equations in TeX syntax.

  [5]: http://meta.math.stackexchange.com/questions/5020/

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
