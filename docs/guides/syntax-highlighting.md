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

The [Highlight][3] extension, which is part of [Python Markdown Extensions][4],
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

        Highlight.js can be integrated by creating an [additional JavaScript][6]
        file initializing the highlighter and including the respective
        stylesheet and JavaScript from a [CDN][8] serving Highlight.js in
        `mkdocs.yml`:

        === "docs/javascripts/extra.js"

            ``` js
            hljs.initHighlighting()
            ```

        === "mkdocs.yml"

            ``` yaml
            extra_javascript:
              - https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.1/highlight.min.js
              - javascripts/extra.js
            extra_css:
              - https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.1/styles/default.min.css
            ```

        Note that Highlight.js has no affiliation with the Highlight extension.

`linenums`

:   This option will add line numbers to _all_ code blocks. If you wish to add
    line numbers to _some_, but not all code blocks, consult the section on
    [adding line numbers][9] later in this document, which also contains some
    tips on working with line numbers:

    ``` yaml
    markdown_extensions:
      - pymdownx.highlight:
          linenums: true
    ```

`linenums_style`

:   The Highlight extension provides three ways to add line numbers, all of
    which are supported by Material for MkDocs. While `table` (default,
    recommended) wraps a code block in a table, `inline` and `pymdownx.inline`
    render line numbers as part of the line itself:

    ``` yaml
    markdown_extensions:
      - pymdownx.highlight:
          linenums_style: pymdownx.inline
    ```

    Note that `inline` will put line numbers next to the actual code, which
    means that they will be included when selecting text with the cursor or 
    copying a code block to the clipboard. Thus, the usage of `table` or
    `pymdownx.inline` is recommended.

_Material for MkDocs doesn't provide official support for the other options of
this extension, so they may be supported but can also yield weird results. Use
them at your own risk._

  [2]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/stylesheets/extensions/pymdown/_highlight.scss
  [3]: https://facelessuser.github.io/pymdown-extensions/extensions/highlight/
  [4]: https://facelessuser.github.io/pymdown-extensions/
  [5]: ../customization.md#additional-stylesheets
  [6]: ../customization.md#additional-javascript
  [7]: https://highlightjs.org/
  [8]: https://cdnjs.com/libraries/highlight.js/
  [9]: #adding-line-numbers

### InlineHilite

[:octicons-file-code-24: Source][2] · [:octicons-workflow-24: Extension][10]

The [InlineHilite][10] extension, which is part of [Python Markdown 
Extensions][4] also integrates with Material for MkDocs and adds support for
syntax highlighting of inline code blocks. It's built on top of the
[Highlight][3] extension and can be enabled from `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.inlinehilite
```

See the section on [inline code blocks][11] for usage information.

  [10]: https://facelessuser.github.io/pymdown-extensions/extensions/inlinehilite/
  [11]: #inline-code-blocks

## Customization

While syntax highlighting is implemented with [Pygments][1] or JavaScript,
Material for MkDocs defines the [appeareance][12] of code blocks, which can be
adjusted with [additional stylesheets][5].

  [12]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/stylesheets/extensions/_codehilite.scss

## Usage

This section discusses how to use different syntax highlighting features with
[Pygments][1] – the default highlighter – so they don't apply when using
a JavaScript syntaxhighlighter.

### Specifying the language

Code blocks must be enclosed with two separate lines containing three backticks.
To add code highlighting to those blocks, add the language short name directly
after the opening block. See the [list of available lexers][13] to find the
short name for a given language.

_Example_:

```` markdown
``` python
import tensorflow as tf
```
````

_Result_:

``` python
import tensorflow as tf
```

  [13]: https://pygments.org/docs/lexers/

### Adding line numbers

Line numbers can be added to a code block by using the `linenums="<start>"`
option directly after the short name, whereas `<start>` represents the starting
line number. A code block can start from a line number other than `1`, which
allows splitting large code blocks for readability.

_Example_:

```` markdown
``` python linenums="1"
""" Bubble sort """
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```
````

_Result_:

``` python linenums="1"
""" Bubble sort """
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```

### Highlighting specific lines

Specific lines can be highlighted by passing the line numbers to the `hl_lines`
argument placed right after the language short name. Note that line counts start
at `1`, regardless of the starting line number specified as part of `linenums`.

_Example_:

```` markdown
``` python hl_lines="3 4"
""" Bubble sort """
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```
````

_Result_:

``` python linenums="1" hl_lines="3 4"
""" Bubble sort """
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```

### Inline code blocks

When [InlineHilite][14] is enabled, inline code blocks can be highlighted by
prefixing them with a shebang-like sequence, i.e. `#!`, directly followed by
the language short name.

_Example_:

```
The `#!python range()` function is used to generate a sequence of numbers.
```

_Result_:

The `#!python range()` function is used to generate a sequence of numbers.

  [14]: #inlinehilite
