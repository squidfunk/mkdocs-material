---
template: overrides/main.html
---

# Code blocks

Code blocks and examples are an essential part of technical project
documentation. Material for MkDocs provides different ways to set up syntax
highlighting for code blocks, either during build time using [Pygments][1] or
during runtime using a JavaScript syntax highlighter.

  [1]: https://pygments.org

## Configuration

### Highlight

[:octicons-file-code-24: Source][2] · [:octicons-workflow-24: Extension][3] ·
:octicons-zap-24: Supersedes: [CodeHilite][4]

The [Highlight][3] extension, which is part of [Python Markdown Extensions][5],
integrates with Material for MkDocs and provides several options for
configuring syntax highlighting of code blocks:

`use_pygments`{ #use-pygments }

:   :octicons-milestone-24: Default: `true` – This option allows to control
    whether highlighting should be carried out during build time by
    [Pygments][1] or runtime with a JavaScript highlighter. Remember to add the
    necessary  [additional stylesheets][6] and [JavaScript][7] if you want to
    use the latter:

    === "Pygments"

        ``` yaml
        markdown_extensions:
          - pymdownx.highlight
          - pymdownx.superfences
        ```

    === "JavaScript"

        ``` yaml
        markdown_extensions:
          - pymdownx.highlight:
              use_pygments: false
        ```

    ??? example "Syntax highlighting with Highlight.js"

        [Highlight.js][8] can be integrated by creating an [additional
        JavaScript][7] file initializing the highlighter and including the 
        respective stylesheet and JavaScript from a [CDN][9] serving
        Highlight.js in `mkdocs.yml`:

        === "docs/javascripts/config.js"

            ``` js
            document$.subscribe(() => {
              hljs.highlightAll()
            })
            ```

        === "mkdocs.yml"

            ``` yaml
            extra_javascript:
              - https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/highlight.min.js
              - javascripts/config.js
            extra_css:
              - https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/styles/default.min.css
            ```

        Note that Highlight.js has no affiliation with the Highlight extension.

`linenums`{ #linenums }

:   :octicons-milestone-24: Default: `false` – This option will add line numbers
    to _all_ code blocks. If you wish to add line numbers to _some_, but not all
    code blocks, consult the section on [adding line numbers][10] later in this
    document, which also contains some tips on working with line numbers:

    ``` yaml
    markdown_extensions:
      - pymdownx.highlight:
          linenums: true
    ```

`linenums_style`{ #linenums-style }

:   :octicons-milestone-24: Default: `table` – The Highlight extension provides
    three ways to add line numbers, all of which are supported by Material for
    MkDocs. While `table` wraps a code block in a table, `inline` and
    `pymdownx-inline` render line numbers as part of the line itself:

    ``` yaml
    markdown_extensions:
      - pymdownx.highlight:
          linenums_style: pymdownx-inline
    ```

    Note that `inline` will put line numbers next to the actual code, which
    means that they will be included when selecting text with the cursor or 
    copying a code block to the clipboard. Thus, the usage of `table` or
    `pymdownx-inline` is recommended.

_Material for MkDocs doesn't provide official support for the other options of
this extension, so they may be supported but might yield unexpected results.
Use them at your own risk._

  [2]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/stylesheets/main/extensions/pymdownx/_highlight.scss
  [3]: https://facelessuser.github.io/pymdown-extensions/extensions/highlight/
  [4]: https://python-markdown.github.io/extensions/code_hilite/
  [5]: https://facelessuser.github.io/pymdown-extensions/
  [6]: ../customization.md#additional-css
  [7]: ../customization.md#additional-javascript
  [8]: https://highlightjs.org/
  [9]: https://cdnjs.com/libraries/highlight.js/
  [10]: #adding-line-numbers

### InlineHilite

[:octicons-file-code-24: Source][2] · [:octicons-workflow-24: Extension][11]

The [InlineHilite][11] extension, which is part of [Python Markdown 
Extensions][5] also integrates with Material for MkDocs and adds support for
__syntax highlighting of inline code blocks__. It's built on top of the
[Highlight][3] extension and can be enabled via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.inlinehilite
```

See the section on [inline code blocks][12] for usage information.

  [11]: https://facelessuser.github.io/pymdown-extensions/extensions/inlinehilite/
  [12]: #highlighting-inline-code-blocks

### Keys

[:octicons-file-code-24: Source][13] · [:octicons-workflow-24: Extension][14]

The [Keys][14] extension, which is part of [Python Markdown Extensions][5],
allows for inserting __keyboard keys__, e.g. ++ctrl+alt+delete++ , and
can be enabled via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.keys
```

  [13]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/stylesheets/main/extensions/pymdownx/_keys.scss
  [14]: https://facelessuser.github.io/pymdown-extensions/extensions/keys/

### SuperFences

The [SuperFences][15] extension, which is also part of [Python Markdown
Extensions][5], allows for the __nesting of code blocks inside other blocks__,
and is therefore strongly recommended:

``` yaml
markdown_extensions:
  - pymdownx.superfences
```

  [15]: https://facelessuser.github.io/pymdown-extensions/extensions/superfences/

### Snippets

The [Snippets][16] extension, which is also part of [Python Markdown
Extensions][5], allows to __insert content from other files__ or other, regular
content, and can be enabled via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.snippets
```

  [16]: https://facelessuser.github.io/pymdown-extensions/extensions/snippets/

## Usage

This section discusses how to use different syntax highlighting features with
[Pygments][1] – the default highlighter – so they don't apply when using
a JavaScript syntax highlighter.

### Specifying the language

Code blocks must be enclosed with two separate lines containing three backticks.
To add code highlighting to those blocks, add the language short name directly
after the opening block. See the [list of available lexers][17] to find the
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

  [17]: https://pygments.org/docs/lexers/

### Adding annotations

[:octicons-file-code-24: Source][18] ·
:octicons-beaker-24: Experimental ·
[:octicons-heart-fill-24:{ .mdx-heart } Insiders only][18]{ .mdx-insiders }

Annotations offer a comfortable and friendly way to attach explanations to
arbitrary sections of code blocks by adding simple markers within block/inline
comments that refer to items of a list following the code block, i.e. `(1)`,
`(2)`, etc. Material for MkDocs detaches the list from the flow of the document,
injects the content of each list item into a tooltip, and links each list marker
to the corresponding tooltip.

In order to opt-in to annotation support, a slightly different syntax is
required – just add the respective [language short code][17] and the `.annotate`
class, after the three backticks.

Note that annotations can be __placed anywhere__ in a code block where a comment
for the language can be placed, which for JavaScript is `// (1)` and
`/* (2) */`, for Yaml `# (3)`, etc.

_Example_:

```` markdown
``` { .js .annotate }
document$.subscribe(function() { // (1)
  var tables = document.querySelectorAll(/* (2) */ "article table")
  tables.forEach(function(table) {
    new Tablesort(table)
  })
})
```

1. ...
2. ...
````

_Result_:

<figure markdown="1">

[![Annotations][19]][19]

  <figcaption markdown="1">

A demo is worth a thousand words — check it out at
[squidfunk.github.io/mkdocs-material-insiders][20]

  </figcaption>
</figure>

_Annotations require syntax highlighting with [Pygments][24] – they're currently
not compatible with other JavaScript-based syntax highlighters. Support may be
added later on._

  [18]: ../insiders/index.md
  [19]: ../assets/screenshots/annotations.png
  [20]: https://squidfunk.github.io/mkdocs-material-insiders/reference/code-blocks/#adding-annotations

### Adding line numbers

Line numbers can be added to a code block by using the `linenums="<start>"`
option directly after the short name, whereas `<start>` represents the starting
line number. A code block can start from a line number other than `1`, which
allows splitting large code blocks for readability.

_Example_:

```` markdown
``` python linenums="1"
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```
````

_Result_:

``` python linenums="1"
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
``` python hl_lines="2 3"
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```
````

_Result_:

``` python hl_lines="2 3"
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```

### Highlighting inline code blocks

When [InlineHilite][21] is enabled, inline code blocks can be highlighted by
prefixing them with a shebang-like sequence, i.e. `#!`, directly followed by
the [language short name][17].

_Example_:

``` markdown
The `#!python range()` function is used to generate a sequence of numbers.
```

_Result_:

The `#!python range()` function is used to generate a sequence of numbers.

  [21]: #inlinehilite

### Adding keyboard keys

When [Keys][22] is enabled, keyboard keys can be rendered with a simple syntax.
Consult the [Python Markdown Extensions][16] documentation to learn about all
available key codes.

_Example_:

``` markdown
++ctrl+alt+del++
```

_Result_:

++ctrl+alt+del++

  [22]: #keys

### Embedding external files

_Also known as transcludes or file transclusion in [MultiMarkdown][23]_.

When [Snippets][24] is enabled, content from other files can be embedded, which
is especially useful to reference and embed the contents of source files
directly into your project documentation.

_Example_:

```` markdown
```
--8<--​ ".browserslistrc"
```
````

_Result_:

```
last 4 years
```

Note that [Snippets][24] is not limited to code blocks, but can be used anywhere
from a document to move repeating content to separate files, which is also
explained in the [official documentation][16].

  [23]: https://fletcher.github.io/MultiMarkdown-5/transclusion.html
  [24]: #snippets

## Customization

### Custom syntax theme

[:octicons-file-code-24: Source][25] ·
:octicons-mortar-board-24: Difficulty: _easy_

If [Pygments][26] is used, Material for MkDocs provides the [styles for code
blocks][25], which are built with a custom and well-balanced palette that works
equally well for both [color schemes][27]:

- :material-checkbox-blank-circle:{ style="color: var(--md-code-hl-number-color) " } `--md-code-hl-number-color`
- :material-checkbox-blank-circle:{ style="color: var(--md-code-hl-special-color) " } `--md-code-hl-special-color`
- :material-checkbox-blank-circle:{ style="color: var(--md-code-hl-function-color) " } `--md-code-hl-function-color`
- :material-checkbox-blank-circle:{ style="color: var(--md-code-hl-constant-color) " } `--md-code-hl-constant-color`
- :material-checkbox-blank-circle:{ style="color: var(--md-code-hl-keyword-color) " } `--md-code-hl-keyword-color`
- :material-checkbox-blank-circle:{ style="color: var(--md-code-hl-string-color) " } `--md-code-hl-string-color`
- :material-checkbox-blank-circle:{ style="color: var(--md-code-hl-name-color) " } `--md-code-hl-name-color`
- :material-checkbox-blank-circle:{ style="color: var(--md-code-hl-operator-color) " } `--md-code-hl-operator-color`
- :material-checkbox-blank-circle:{ style="color: var(--md-code-hl-punctuation-color) " } `--md-code-hl-punctuation-color`
- :material-checkbox-blank-circle:{ style="color: var(--md-code-hl-comment-color) " } `--md-code-hl-comment-color`
- :material-checkbox-blank-circle:{ style="color: var(--md-code-hl-generic-color) " } `--md-code-hl-generic-color`
- :material-checkbox-blank-circle:{ style="color: var(--md-code-hl-variable-color) " } `--md-code-hl-variable-color`

Code block foreground, background and line highlight colors are defined via:

- :material-checkbox-blank-circle:{ style="color: var(--md-code-fg-color) " } `--md-code-fg-color`
- :material-checkbox-blank-circle:{ style="color: var(--md-code-bg-color) " } `--md-code-bg-color`
- :material-checkbox-blank-circle:{ style="color: var(--md-code-hl-color) " } `--md-code-hl-color`

Let's say you want to change the color of `#!js "strings"`. While there are
several [types of string tokens][28], Material for MkDocs assigns a single color
to most of them.

Create an [additional stylesheet][6], and add:

``` css
:root > * {
  --md-code-hl-string-color: #0FF1CE;
}
```

If you want to tweak a specific type of string, i.e. ``#!js `backticks` ``, you
can lookup the specific class name in the [syntax theme definition][29], and
override it as part of your additional stylesheet:

``` css
.highlight .sb {
  color: #0FF1CE;
}
```

  [25]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/stylesheets/main/_colors.scss#
  [26]: #use-pygments
  [27]: ../setup/changing-the-colors.md#color-scheme
  [28]: https://pygments.org/docs/tokens/#literals
  [29]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/stylesheets/main/extensions/pymdownx/_highlight.scss
