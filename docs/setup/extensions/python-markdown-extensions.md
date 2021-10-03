---
template: overrides/main.html
---

# Python Markdown Extensions

The [Python Markdown Extensions] package is an excellent collection of Markdown
extensions that make technical writing a breeze. Material for MkDocs views this 
package as a sibling of its own, which is why most provided extensions are
already natively supported.

  [Python Markdown Extensions]: https://facelessuser.github.io/pymdown-extensions/

## Supported extensions

The following extensions are all supported by Material for MkDocs and therefore
strongly recommended. See the [overview][Extensions] page for a minimal and
recommended configuration.

  [Extensions]: index.md

### Arithmatex

[:octicons-workflow-24: Extension][Arithmatex] ·
[:octicons-tag-24: 1.0.0 – present][Arithmatex support]

The [Arithmatex] extension allows for rendering of block and inline equations,
and integrates seamlessly with [MathJax][^1], a library for mathematical
typesetting. Enable it via `mkdocs.yml`:

  [^1]:
    Other libraries like [KaTeX] are also supported and can be integrated with
    some additional effort. See the [Arithmatex documentation on KaTeX] for
    further guidance, as this is beyond the scope of Material for MkDocs.

``` yaml
markdown_extensions:
  - pymdownx.arithmatex:
      generic: true
```

Besides enabling the extension in `mkdocs.yml`, a MathJax configuration and 
the JavaScript runtime need to be included, which can be done with a few lines
of [additional JavaScript]:

=== "`docs/javascripts/config.js`"

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

    document$.subscribe(() => {
      MathJax.typesetPromise()
    })
    ```

=== "`mkdocs.yml`"

    ``` yaml
    extra_javascript:
      - javascripts/config.js
      - https://polyfill.io/v3/polyfill.min.js?features=es6
      - https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js
    ```

Arithmatex can be configured in many different ways, for which Material for
MkDocs  might not provide native support. See the [Arithmatex documentation][Arithmatex] for more information.

  [Arithmatex]: https://facelessuser.github.io/pymdown-extensions/extensions/arithmatex/
  [Arithmatex support]: https://github.com/squidfunk/mkdocs-material/releases/tag/1.0.0
  [Arithmatex documentation on KaTeX]: https://facelessuser.github.io/pymdown-extensions/extensions/arithmatex/#loading-katex
  [MathJax]: https://www.mathjax.org/
  [KaTeX]: https://github.com/Khan/KaTeX
  [additional JavaScript]: ../../customization.md#additional-javascript

### Critic

[:octicons-workflow-24: Extension][Critic] ·
[:octicons-tag-24: 1.0.0 – present][Critic support]

The [Critic] extension allows for the usage of [Critic Markup] to highlight
additions, deletions or substitutions in a Markdown documents. It can be enabled
via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.critic
```

The following configuration options are supported:

`mode`{ #mode }

:   :octicons-milestone-24: Default: `view` – This option defines how the markup 
    should be parsed, i.e. whether to just `view` all suggest changes, or
    alternatively `accept` or `reject` them:

    === "View changes"

        ``` yaml
        markdown_extensions:
          - pymdownx.critic:
              mode: view
        ```

    === "Accept changes"

        ``` yaml
        markdown_extensions:
          - pymdownx.critic:
              mode: accept
        ```

    === "Reject changes"

        ``` yaml
        markdown_extensions:
          - pymdownx.critic:
              mode: reject
        ```

  [Critic]: https://facelessuser.github.io/pymdown-extensions/extensions/critic/
  [Critic support]: https://github.com/squidfunk/mkdocs-material/releases/tag/1.0.0
  [Critic Markup]: https://github.com/CriticMarkup/CriticMarkup-toolkit

### Details

The [Details] extension supercharges the [Admonition] extension, making the
resulting _call-outs_ collapsible, rendering


### Emoji

### Highlight

### InlineHilite

### Snippets

### SuperFences

### Tabbed

### Tasklist

### Other

- Caret
- Keys
- MagicLink
- Mark
- SmartSymbols
- Tilde
