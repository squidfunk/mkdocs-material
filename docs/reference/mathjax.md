---
template: overrides/main.html
---

# MathJax

[MathJax][1] is a beautiful and accessible way to display _mathematical content_
in the browser, allows for writing formulas in different notations, including 
[LaTeX][2], [MathML][3] and [AsciiMath][4], and can be easily integrated with 
Material for MkDocs.

  [1]: https://www.mathjax.org/
  [2]: https://en.wikibooks.org/wiki/LaTeX/Mathematics
  [3]: https://en.wikipedia.org/wiki/MathML
  [4]: http://asciimath.org/

## Configuration

### Arithmatex

[:octicons-file-code-24: Source][5] · [:octicons-workflow-24: Extension][6]

The [Arithmatex][6] extension, which is part of of [Python Markdown
Extensions][7], allows the rendering of block and inline block equations, and
can be enabled via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.arithmatex:
      generic: true
```

Besides enabling the extension in `mkdocs.yml`, a MathJax configuration and 
the JavaScript runtime need to be included, which can be done with [additional 
JavaScript][8]:

=== "docs/javascripts/config.js"

    ``` js
    window.MathJax = {
      tex: {
        inlineMath: [["\\(", "\\)"]],
        displayMath: [["\\[", "\\]"]],
        processEscapes: true,
        processEnvironments: true
      },
      options: {
        ignoreHtmlClass: ".*|",
        processHtmlClass: "arithmatex"
      }
    };
    ```

=== "mkdocs.yml"

    ``` yaml
    extra_javascript:
      - javascripts/config.js
      - https://polyfill.io/v3/polyfill.min.js?features=es6
      - https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js
    ```

_MathJax can be configured in many different ways, for which Material for MkDocs 
might not provide native support. See the [official documentation][6] for more 
information._

!!! tip "Using MathJax with [instant loading][9]"

    There's no additional effort necessary to integrate _MathJax 3_ with
    [instant loading][7] – it's expected to work straight away. However, a
    previous version of this document explained how to integrate Material for
    MkDocs with _MathJax 2_, which doesn't exhibit this behavior. It's therefore
    highly recommended to switch to _MathJax 3_.

<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
<script>
  window.MathJax = {
    tex: {
      inlineMath: [["\\(", "\\)"]],
      displayMath: [["\\[", "\\]"]],
      processEscapes: true,
      processEnvironments: true
    },
    options: {
      ignoreHtmlClass: ".*|",
      processHtmlClass: "arithmatex"
    }
  };
</script>

  [5]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/stylesheets/main/extensions/pymdownx/_arithmatex.scss
  [6]: https://facelessuser.github.io/pymdown-extensions/extensions/arithmatex/
  [7]: https://facelessuser.github.io/pymdown-extensions/extensions/
  [8]: ../customization.md#additional-javascript
  [9]: ../setup/setting-up-navigation.md#instant-loading

## Usage

### Using block syntax

Blocks must be enclosed in `#!latex $$...$$` or `#!latex \[...\]`on separate lines:

_Example_:

``` latex
$$
\operatorname{ker} f=\{g\in G:f(g)=e_{H}\}{\mbox{.}}
$$
```

_Result_:

$$
\operatorname{ker} f=\{g\in G:f(g)=e_{H}\}{\mbox{.}}
$$

### Using inline block syntax

Inline blocks must be enclosed in `#!latex $...$` or `#!latex \(...\)`:

_Example_:

``` latex
The homomorphism $f$ is injective if and only if its kernel is only the 
singleton set $e_G$, because otherwise $\exists a,b\in G$ with $a\neq b$ such 
that $f(a)=f(b)$.
```

_Result_:

The homomorphism $f$ is injective if and only if its kernel is only the 
singleton set $e_G$, because otherwise $\exists a,b\in G$ with $a\neq b$ such 
that $f(a)=f(b)$.
