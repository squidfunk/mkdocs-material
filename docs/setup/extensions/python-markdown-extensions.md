---
template: overrides/main.html
---

# Python Markdown Extensions

The [Python Markdown Extensions] package is an excellent collection of
additional Markdown extensions that make technical writing a breeze. Material
for MkDocs lists this package as an explicit dependency, so it's automatically
installed with a supported version.

  [Python Markdown Extensions]: https://facelessuser.github.io/pymdown-extensions/

## Supported extensions

The following extensions are all supported by Material for MkDocs and therefore
strongly recommended. See the [overview][Extensions] page for a minimal and
recommended configuration.

  [Extensions]: index.md

### Arithmatex

[:octicons-workflow-24: Extension][Arithmatex] ·
[:octicons-tag-24: 1.0.0 – present][Arithmatex support]

The [Arithmatex] extension allows for rendering of block and inline block
equations, and integrates seamlessly with [MathJax][^1], a library for
mathematical typesetting. Enable it via `mkdocs.yml`:

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

=== ":octicons-file-code-16: docs/javascripts/config.js"

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

=== ":octicons-file-code-16: mkdocs.yml"

    ``` yaml
    extra_javascript:
      - javascripts/config.js
      - https://polyfill.io/v3/polyfill.min.js?features=es6
      - https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js
    ```

Arithmatex can be configured in many different ways, for which Material for
MkDocs might not provide native support. See the [Arithmatex documentation][Arithmatex] for more information.

See reference for usage:

- [Using block syntax]
- [Using inline block syntax]

  [Arithmatex]: https://facelessuser.github.io/pymdown-extensions/extensions/arithmatex/
  [Arithmatex support]: https://github.com/squidfunk/mkdocs-material/releases/tag/1.0.0
  [Arithmatex documentation on KaTeX]: https://facelessuser.github.io/pymdown-extensions/extensions/arithmatex/#loading-katex
  [MathJax]: https://www.mathjax.org/
  [KaTeX]: https://github.com/Khan/KaTeX
  [additional JavaScript]: ../../customization.md#additional-javascript
  [Using block syntax]: ../../reference/mathjax.md#using-block-syntax
  [Using inline block syntax]: ../../reference/mathjax.md#using-inline-block-syntax

### Critic

[:octicons-workflow-24: Extension][Critic] ·
[:octicons-tag-24: 1.0.0 – present][Critic support]

The [Critic] extension allows for the usage of [Critic Markup] to highlight
added, deleted or updated sections in a Markdown document, e.g. for tracking 
changes. Enable it via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.critic
```

The following configuration options are supported:

`mode`{ #mode }

:   :octicons-milestone-24: Default: `view` – This option defines how the markup 
    should be parsed, i.e. whether to just `view` all suggested changes, or
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

See reference for usage:

- [Highlighting changes]

  [Critic]: https://facelessuser.github.io/pymdown-extensions/extensions/critic/
  [Critic support]: https://github.com/squidfunk/mkdocs-material/releases/tag/1.0.0
  [Critic Markup]: https://github.com/CriticMarkup/CriticMarkup-toolkit
  [Highlighting changes]: ../../reference/formatting.md#highlighting-changes

### Details

[:octicons-workflow-24: Extension][Details] ·
[:octicons-tag-24: 1.9.0 – present][Details support]

The [Details] extension supercharges the [Admonition] extension, making the
resulting _call-outs_ collapsible, allowing them to be opened and closed by the
user. Enable it via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.details
```

No configuration options are available. See reference for usage:

- [Collapsible blocks]

  [Details]: https://facelessuser.github.io/pymdown-extensions/extensions/details/
  [Details support]: https://github.com/squidfunk/mkdocs-material/releases/tag/1.9.0
  [Admonition]: python-markdown.md#admonition
  [Collapsible blocks]: ../../reference/admonitions.md#collapsible-blocks

### Emoji

[:octicons-workflow-24: Extension][Emoji] ·
[:octicons-tag-24: 1.0.0 – present][Emoji support]

The [Emoji] extension automatically inlines bundled and custom icons and emojis
in `*.svg` file format into the resulting HTML page. Enable it via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.emoji:
      emoji_index: !!python/name:materialx.emoji.twemoji # (1)
      emoji_generator: !!python/name:materialx.emoji.to_svg
```

1.  [Python Markdown Extensions] uses the `pymdownx` namespace, but in order to
    support the inlining of icons, the `materialx` namespace must be used, as it
    extends the functionality of `pymdownx`.

The following configuration options are supported:

`emoji_index`{ #emoji_index }

:   :octicons-milestone-24: Default: `emojione` – This option defines which set
    of emojis is used for rendering. Note that the use of `emojione` is not
    recommended due to [restrictions in licensing][Emoji index]:

    ``` yaml
    markdown_extensions:
      - pymdownx.emoji:
          emoji_index: !!python/name:materialx.emoji.twemoji
    ```

`emoji_generator`{ #emoji_generator }

:   :octicons-milestone-24: Default: `to_png` – This option defines how the
    resolved emoji or icon shortcode is render. Note that icons can only be
    used together with the `to_svg` configuration:

    ``` yaml
    markdown_extensions:
      - pymdownx.emoji:
          emoji_generator: !!python/name:materialx.emoji.to_svg
    ```

`options.custom_icons`{ #custom_icons }

:   :octicons-milestone-24: Default: _none_ – This option allows to list folders
    with additional icon sets to be used in Markdown documents, which is 
    explained in more detail in the [icon customization guide].

    ``` yaml
    markdown_extensions:
      - pymdownx.emoji:
          emoji_index: !!python/name:materialx.emoji.twemoji
          emoji_generator: !!python/name:materialx.emoji.to_svg
          options:
            custom_icons:
              - overrides/.icons
    ```

See reference for usage:

- [Using emojis]
- [Using icons]
- [Using icons in templates]

  [Emoji]: https://facelessuser.github.io/pymdown-extensions/extensions/details/
  [Emoji support]: https://github.com/squidfunk/mkdocs-material/releases/tag/1.0.0
  [Emoji index]: https://facelessuser.github.io/pymdown-extensions/extensions/emoji/#default-emoji-indexes
  [icon customization guide]: ../changing-the-logo-and-icons.md#additional-icons
  [Using emojis]: ../../reference/icons-emojis.md#using-emojis
  [Using icons]: ../../reference/icons-emojis.md#using-icons
  [Using icons in templates]: ../../reference/icons-emojis.md#using-icons-in-templates

### Highlight

[:octicons-workflow-24: Extension][Highlight] ·
[:octicons-tag-24: 5.0.0 – present][Highlight support] ·
:octicons-zap-24: Supersedes [CodeHilite]

The [Highlight] extension adds support for syntax highlighting of code blocks
(with the help of [SuperFences][SuperFences #]) and inline code blocks (with
the help of [InlineHilite][InlineHilite #]). Enable it via
`mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.highlight
  - pymdownx.superfences # (1)
```

1.  [Highlight] is used by the [SuperFences][SuperFences #] extension to
    perform syntax highlighting on code blocks, not the other way round, which
    is why this extension also needs to be enabled.

    However, this only applies for when [Pygments] is used. If you use a
    JavaScript syntax highlighter, [SuperFences][SuperFences #] might not
    be necessary, but it's strongly recommended anyway.

The following configuration options are supported:

`use_pygments`{ #use-pygments }

:   :octicons-milestone-24: Default: `true` – This option allows to control
    whether highlighting should be carried out during build time using
    [Pygments] or runtime with a JavaScript syntax highlighter:

    === "Pygments"

        ``` yaml
        markdown_extensions:
          - pymdownx.highlight:
              use_pygments: true
          - pymdownx.superfences
        ```

    === "JavaScript"

        ``` yaml
        markdown_extensions:
          - pymdownx.highlight:
              use_pygments: false
        ```

        As an example, [Highlight.js], a JavaScript syntax highlighter, can be 
        integrated with some [additional JavaScript] and [CSS][additional CSS]
        in `mkdocs.yml`:

        === ":octicons-file-code-16: docs/javascripts/config.js"

            ``` js
            document$.subscribe(() => {
              hljs.highlightAll()
            })
            ```

        === ":octicons-file-code-16: mkdocs.yml"

            ``` yaml
            extra_javascript:
              - https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/highlight.min.js
              - javascripts/config.js
            extra_css:
              - https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/styles/default.min.css
            ```

        Note that [Highlight.js] has no affiliation with the Highlight extension.

`linenums`{ #linenums }

:   :octicons-milestone-24: Default: `false` – This option will add line numbers
    to _all_ code blocks. If you wish to add line numbers to _some_, but not all
    code blocks, consult the section on [adding line numbers][Adding line
    numbers] in the code block reference, which also contains some tips on
    working with line numbers:

    ``` yaml
    markdown_extensions:
      - pymdownx.highlight:
          linenums: true
    ```

`linenums_style`{ #linenums-style }

:   :octicons-milestone-24: Default: `table` – The [Highlight] extension
    provides three ways to add line numbers, all of which are supported by
    Material for MkDocs. While `table` wraps a code block in a table, `inline`
    and `pymdownx-inline` render line numbers as part of the line itself:

    ``` yaml
    markdown_extensions:
      - pymdownx.highlight:
          linenums_style: pymdownx-inline
    ```

    Note that `inline` will put line numbers next to the actual code, which
    means that they will be included when selecting text with the cursor or 
    copying a code block to the clipboard. Thus, the usage of either `table`
    or `pymdownx-inline` is recommended.

See reference for usage:

- [Specifying the language]
- [Adding line numbers]
- [Highlighting specific lines]
- [Custom syntax theme]

  [Highlight]: https://facelessuser.github.io/pymdown-extensions/extensions/highlight/
  [Highlight support]: https://github.com/squidfunk/mkdocs-material/releases/tag/5.0.0
  [CodeHilite]: python-markdown.md#codehilite
  [SuperFences #]: #superfences
  [InlineHilite #]: #inlinehilite
  [Pygments]: https://pygments.org
  [additional CSS]: ../../customization.md#additional-css
  [Highlight.js]: https://highlightjs.org/
  [Adding line numbers]: ../../reference/code-blocks.md#adding-line-numbers
  [Specifying the language]: ../../reference/code-blocks.md#specifying-the-language
  [Highlighting specific lines]: ../../reference/code-blocks.md#highlighting-specific-lines
  [Custom syntax theme]: ../../reference/code-blocks.md#custom-syntax-theme

### InlineHilite

[:octicons-workflow-24: Extension][InlineHilite] ·
[:octicons-tag-24: 5.0.0 – present][InlineHilite support]

The [InlineHilite] extension add support for syntax highlighting of inline code 
blocks. It's built on top of the [Highlight][Highlight #] extension, from which
it sources its configuration. Enable it via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.highlight
  - pymdownx.inlinehilite
```

No configuration options are supported. See reference for usage:

- [Highlighting inline code blocks]

  [InlineHilite]: https://facelessuser.github.io/pymdown-extensions/extensions/inlinehilite/
  [InlineHilite support]: https://github.com/squidfunk/mkdocs-material/releases/tag/5.0.0
  [Highlight #]: #highlight
  [Highlighting inline code blocks]: ../../reference/code-blocks.md#highlighting-inline-code-blocks

### Snippets

[:octicons-workflow-24: Extension][Snippets] ·
[:octicons-tag-24: 0.1.0 – present][Snippets support]

### SuperFences

TODO: document Mermaid setup!

### Tabbed

### Tasklist

### Other

- Caret
- Keys
- MagicLink
- Mark
- SmartSymbols
- Tilde
