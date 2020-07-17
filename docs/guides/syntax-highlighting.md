---
template: overrides/main.html
---

# Syntax highlighting

Code blocks and examples are an essential part of technical project
documentation. Material for MkDocs provides different ways to set up syntax
highlighting for code blocks, either during build time using [Pygments][1] or
during runtime using a JavaScript syntax highlighter.

  [1]: https://pygments.org

## Configuration

### Highlight

[:octicons-file-code-24: Source][2] · [:octicons-workflow-24: Extension][3]

The [highlight][3] extension, which is part of [Python Markdown Extensions][4],
integrates with Material for MkDocs and provides several options for
configuring syntax highlighting of code blocks:

`use_pygments`

:   This option allows to control whether highlighting should be carried out
    during build time by [Pygments][1] (default, recommended) or runtime with
    a JavaScript highlighter. Remember to add the necessary 
    [additional stylesheets][5] and [JavaScript][6] if you want to use the
    latter:

    === "Pygments"

        ``` yaml
        markdown_extensions:
          - pymdownx.highlight:
              use_pygments: true
        ```

    === "JavaScript"

        ``` yaml
        markdown_extensions:
          - pymdownx.highlight:
              use_pygments: false
        ```

    ??? example "Syntax highlighting with [Highlight.js][7]"

        Highlight.js can be integrated by including the respective stylesheet
        and JavaScript from a [CDN][8] in `mkdocs.yml`:

        ``` yaml
        extra_javascript:
          - https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.1/highlight.min.js
        extra_css:
          - https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.1/styles/default.min.css
        ```

        Additionally, the following function must be called:

        ``` js
        hljs.initHighlighting()
        ```

  [2]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/stylesheets/extensions/pymdown/_highlight.scss
  [3]: https://facelessuser.github.io/pymdown-extensions/extensions/highlight/
  [4]: https://facelessuser.github.io/pymdown-extensions/
  [5]: ../customization.md#additional-stylesheets
  [6]: ../customization.md#additional-javascript
  [7]: https://highlightjs.org/
  [8]: https://cdnjs.com/libraries/highlight.js/
