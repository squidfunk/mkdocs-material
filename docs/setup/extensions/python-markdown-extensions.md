---
template: overrides/main.html
---

# Python Markdown Extensions

The [Python Markdown Extensions] package is an excellent collection of
additional extensions perfectly suited for advanced technical writing. Material
for MkDocs lists this package as an explicit dependency, so it's automatically
installed with a supported version.

  [Python Markdown Extensions]: https://facelessuser.github.io/pymdown-extensions/

## Supported extensions

### Arithmatex

[:octicons-tag-24: 1.0.0][Arithmatex support] ·
[:octicons-workflow-24: Extension][Arithmatex]

The [Arithmatex] extension allows for rendering of block and inline block
equations and integrates seamlessly with [MathJax][^1] – a library for
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

=== ":octicons-file-code-16: `docs/javascripts/mathjax.js`"

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

=== ":octicons-file-code-16: `mkdocs.yml`"

    ``` yaml
    extra_javascript:
      - javascripts/mathjax.js
      - https://polyfill.io/v3/polyfill.min.js?features=es6
      - https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js
    ```

The other configuration options of this extension are not officially supported
by Material for MkDocs, which is why they may yield unexpected results. Use
them at your own risk.

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

### BetterEm

[:octicons-tag-24: 0.1.0][BetterEm support] ·
[:octicons-workflow-24: Extension][BetterEm]

The [BetterEm] extension improves the detection of Markup to emphasize text
in Markdown using special characters, i.e. for `**bold**` and `_italic_`
formatting. Enable it via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.betterem
```

The configuration options of this extension are not specific to Material for
MkDocs, as they only impact the Markdown parsing stage. See the [BetterEm 
documentation][BetterEm] for more information.

  [BetterEm]: https://facelessuser.github.io/pymdown-extensions/extensions/betterem/
  [BetterEm support]: https://github.com/squidfunk/mkdocs-material/releases/tag/0.1.0

### Caret, Mark & Tilde

[:octicons-tag-24: 1.0.0][Caret support] ·
[:octicons-workflow-24: Extension][Caret]

The [Caret], [Mark] and [Tilde] extensions add the ability to highlight text
and define sub- and superscript using a simple syntax. Enable them together
via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.caret
  - pymdownx.mark
  - pymdownx.tilde
```

The configuration options of this extension are not specific to Material for
MkDocs, as they only impact the Markdown parsing stage. See the [Caret], [Mark]
and [Tilde documentation][Tilde] for guidance.

See reference for usage:

- [Highlighting text]
- [Sub- and superscripts]

  [Caret]: https://facelessuser.github.io/pymdown-extensions/extensions/caret/
  [Caret support]: https://github.com/squidfunk/mkdocs-material/releases/tag/1.0.0
  [Mark]: https://facelessuser.github.io/pymdown-extensions/extensions/mark/
  [Tilde]: https://facelessuser.github.io/pymdown-extensions/extensions/tilde/
  [Highlighting text]: ../../reference/formatting.md#highlighting-text
  [Sub- and superscripts]: ../../reference/formatting.md#sub-and-superscripts

### Critic

[:octicons-tag-24: 1.0.0][Critic support] ·
[:octicons-workflow-24: Extension][Critic]

The [Critic] extension allows for the usage of [Critic Markup] to highlight
added, deleted or updated sections in a document, i.e. for tracking changes in
Markdown syntax. Enable it via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.critic
```

The following configuration options are supported:

[`mode`](#+pymdownx.critic.mode){ #+pymdownx.critic.mode }

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

[:octicons-tag-24: 1.9.0][Details support] ·
[:octicons-workflow-24: Extension][Details]

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

[:octicons-tag-24: 1.0.0][Emoji support] ·
[:octicons-workflow-24: Extension][Emoji]

The [Emoji] extension automatically inlines bundled and custom icons and emojis
in `*.svg` file format into the resulting HTML page. Enable it via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.emoji:
      emoji_index: !!python/name:materialx.emoji.twemoji # (1)!
      emoji_generator: !!python/name:materialx.emoji.to_svg
```

1.  [Python Markdown Extensions] uses the `pymdownx` namespace, but in order to
    support the inlining of icons, the `materialx` namespace must be used, as it
    extends the functionality of `pymdownx`.

The following configuration options are supported:

[`emoji_index`](#+pymdownx.emoji.emoji_index){ #+pymdownx.emoji.emoji_index }

:   :octicons-milestone-24: Default: `emojione` – This option defines which set
    of emojis is used for rendering. Note that the use of `emojione` is not
    recommended due to [restrictions in licensing][Emoji index]:

    ``` yaml
    markdown_extensions:
      - pymdownx.emoji:
          emoji_index: !!python/name:materialx.emoji.twemoji
    ```

[`emoji_generator`](#+pymdownx.emoji.emoji_generator){ #+pymdownx.emoji.emoji_generator }

:   :octicons-milestone-24: Default: `to_png` – This option defines how the
    resolved emoji or icon shortcode is render. Note that icons can only be
    used together with the `to_svg` configuration:

    ``` yaml
    markdown_extensions:
      - pymdownx.emoji:
          emoji_generator: !!python/name:materialx.emoji.to_svg
    ```

[`options.custom_icons`](#+pymdownx.emoji.options.custom_icons){ #+pymdownx.emoji.options.custom_icons }

:   :octicons-milestone-24: Default: _none_ – This option allows to list folders
    with additional icon sets to be used in Markdown or `mkdocs.yml`, which is 
    explained in more detail in the [icon customization guide]:

    ``` yaml
    markdown_extensions:
      - pymdownx.emoji:
          emoji_index: !!python/name:materialx.emoji.twemoji
          emoji_generator: !!python/name:materialx.emoji.to_svg
          options:
            custom_icons:
              - overrides/.icons
    ```

The other configuration options of this extension are not officially supported
by Material for MkDocs, which is why they may yield unexpected results. Use
them at your own risk.

See reference for usage:

- [Using emojis]
- [Using icons]
- [Using icons in templates]

  [Emoji]: https://facelessuser.github.io/pymdown-extensions/extensions/emoji/
  [Emoji support]: https://github.com/squidfunk/mkdocs-material/releases/tag/1.0.0
  [Emoji index]: https://facelessuser.github.io/pymdown-extensions/extensions/emoji/#default-emoji-indexes
  [icon customization guide]: ../changing-the-logo-and-icons.md#additional-icons
  [Using emojis]: ../../reference/icons-emojis.md#using-emojis
  [Using icons]: ../../reference/icons-emojis.md#using-icons
  [Using icons in templates]: ../../reference/icons-emojis.md#using-icons-in-templates

### Highlight

[:octicons-tag-24: 5.0.0][Highlight support] ·
[:octicons-workflow-24: Extension][Highlight] ·
:octicons-zap-24: Supersedes [CodeHilite]

The [Highlight] extension adds support for syntax highlighting of code blocks
(with the help of [SuperFences][pymdownx.superfences]) and inline code blocks
(with the help of [InlineHilite][pymdownx.inlinehilite]). Enable it via
`mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.highlight:
      anchor_linenums: true
  - pymdownx.superfences # (1)!
```

1.  [Highlight] is used by the [SuperFences][pymdownx.superfences] extension to
    perform syntax highlighting on code blocks, not the other way round, which
    is why this extension also needs to be enabled.

The following configuration options are supported:

[`use_pygments`](#+pymdownx.highlight.use_pygments){ #+pymdownx.highlight.use_pygments }

:   :octicons-milestone-24: Default: `true` – This option allows to control
    whether highlighting should be carried out during build time using
    [Pygments] or in the browser with a JavaScript syntax highlighter:

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
        integrated with some [additional JavaScript] and an [additional style
        sheet] in `mkdocs.yml`:

        === ":octicons-file-code-16: `docs/javascripts/highlight.js`"

            ``` js
            document$.subscribe(() => {
              hljs.highlightAll()
            })
            ```

        === ":octicons-file-code-16: `mkdocs.yml`"

            ``` yaml
            extra_javascript:
              - https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/highlight.min.js
              - javascripts/highlight.js
            extra_css:
              - https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/styles/default.min.css
            ```

        Note that [Highlight.js] has no affiliation with the
        [Highlight][pymdownx.highlight] extension.

    All following configuration options are only compatible with build-time
    syntax highlighting using [Pygments], so they don't apply if `use_pygments`
    is set to `false`.

[`auto_title`](#+pymdownx.highlight.auto_title){ #+pymdownx.highlight.auto_title }

:   :octicons-milestone-24: Default: `false` – This option will automatically
    add a [title] to all code blocks that shows the name of the language being
    used, e.g. `Python` is printed for a `py` block:

    ``` yaml
    markdown_extensions:
      - pymdownx.highlight:
          auto_title: true
    ```

[`linenums`](#+pymdownx.highlight.linenums){ #+pymdownx.highlight.linenums }

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

[`linenums_style`](#+pymdownx.highlight.linenums_style){ #+pymdownx.highlight.linenums_style }

:   :octicons-milestone-24: Default: `table` – The [Highlight] extension
    provides three ways to add line numbers, two of which are supported by
    Material for MkDocs. While `table` wraps a code block in a `<table>`
    element, `pymdownx-inline` renders line numbers as part of the line itself:

    ``` yaml
    markdown_extensions:
      - pymdownx.highlight:
          linenums_style: pymdownx-inline
    ```

    Note that `inline` will put line numbers next to the actual code, which
    means that they will be included when selecting text with the cursor or 
    copying a code block to the clipboard. Thus, the usage of either `table`
    or `pymdownx-inline` is recommended.

[`anchor_linenums`](#+pymdownx.highlight.anchor_linenums){ #+pymdownx.highlight.anchor_linenums }

:   [:octicons-tag-24: 8.1.0][anchor_linenums support] · :octicons-milestone-24:
    Default: `false` – If a code blocks contains line numbers, enabling this
    setting will wrap them with anchor links, so they can be hyperlinked and
    shared more easily:

    ``` yaml
    markdown_extensions:
      - pymdownx.highlight:
          anchor_linenums: true
    ```

The other configuration options of this extension are not officially supported
by Material for MkDocs, which is why they may yield unexpected results. Use
them at your own risk.

See reference for usage:

- [Using code blocks]
- [Adding a title]
- [Adding line numbers]
- [Highlighting specific lines]
- [Custom syntax theme]

  [Highlight]: https://facelessuser.github.io/pymdown-extensions/extensions/highlight/
  [Highlight support]: https://github.com/squidfunk/mkdocs-material/releases/tag/5.0.0
  [CodeHilite]: python-markdown.md#codehilite
  [pymdownx.superfences]: #superfences
  [pymdownx.inlinehilite]: #inlinehilite
  [Pygments]: https://pygments.org
  [additional style sheet]: ../../customization.md#additional-css
  [Highlight.js]: https://highlightjs.org/
  [title]: ../../reference/code-blocks.md#adding-a-title
  [anchor_linenums support]: https://github.com/squidfunk/mkdocs-material/releases/tag/8.1.0
  [Adding line numbers]: ../../reference/code-blocks.md#adding-line-numbers
  [Using code blocks]: ../../reference/code-blocks.md#usage
  [Adding a title]: ../../reference/code-blocks.md#adding-a-title
  [Highlighting specific lines]: ../../reference/code-blocks.md#highlighting-specific-lines
  [Custom syntax theme]: ../../reference/code-blocks.md#custom-syntax-theme

### InlineHilite

[:octicons-tag-24: 5.0.0][InlineHilite support] ·
[:octicons-workflow-24: Extension][InlineHilite]

The [InlineHilite] extension add support for syntax highlighting of inline code 
blocks. It's built on top of the [Highlight][pymdownx.highlight] extension, from
which it sources its configuration. Enable it via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.highlight
  - pymdownx.inlinehilite
```

The configuration options of this extension are not specific to Material for
MkDocs, as they only impact the Markdown parsing stage. The only exception is
the [`css_class`][InlineHilite options] option, which must not be changed. See the 
[InlineHilite documentation][InlineHilite] for guidance.

See reference for usage:

- [Highlighting inline code blocks]

  [InlineHilite]: https://facelessuser.github.io/pymdown-extensions/extensions/inlinehilite/
  [InlineHilite support]: https://github.com/squidfunk/mkdocs-material/releases/tag/5.0.0
  [InlineHilite options]: https://facelessuser.github.io/pymdown-extensions/extensions/inlinehilite/#options
  [pymdownx.highlight]: #highlight
  [Highlighting inline code blocks]: ../../reference/code-blocks.md#highlighting-inline-code-blocks

### Keys

[:octicons-tag-24: 1.0.0][Keys support] ·
[:octicons-workflow-24: Extension][Keys]

The [Keys] extension adds a simple syntax to allow for the rendering of keyboard 
keys and combinations, e.g. ++ctrl+alt+del++. Enable it via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.keys
```

The configuration options of this extension are not specific to Material for
MkDocs, as they only impact the Markdown parsing stage. The only exception is
the [`class`][Keys options] option, which must not be changed. See the 
[Keys documentation][Keys] for more information.

See reference for usage:

- [Adding keyboard keys]

  [Keys]: https://facelessuser.github.io/pymdown-extensions/extensions/keys/
  [Keys support]: https://github.com/squidfunk/mkdocs-material/releases/tag/1.0.0
  [Keys options]: https://facelessuser.github.io/pymdown-extensions/extensions/keys/#options
  [Adding keyboard keys]: ../../reference/formatting.md#adding-keyboard-keys

### SmartSymbols

[:octicons-tag-24: 0.1.0][SmartSymbols support] ·
[:octicons-workflow-24: Extension][SmartSymbols]

The [SmartSymbols] extension converts some sequences of characters into their 
corresponding symbols, e.h. copyright symbols or fractions. Enable it via
`mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.smartsymbols
```

The configuration options of this extension are not specific to Material for
MkDocs, as they only impact the Markdown parsing stage. See the [SmartSymbols 
documentation][SmartSymbols] for guidance.

  [SmartSymbols]: https://facelessuser.github.io/pymdown-extensions/extensions/smartsymbols/
  [SmartSymbols support]: https://github.com/squidfunk/mkdocs-material/releases/tag/0.1.0

### Snippets

[:octicons-tag-24: 0.1.0][Snippets support] ·
[:octicons-workflow-24: Extension][Snippets]

The [Snippets] extension adds the ability to embed content from arbitrary files
into a document, including other documents or source files, by using a simple
syntax. Enable it via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.snippets
```

The configuration options of this extension are not specific to Material for
MkDocs, as they only impact the Markdown parsing stage. See the [Snippets 
documentation][Snippets] for more information.

See reference for usage:

- [Adding a glossary]
- [Embedding external files]

  [Snippets]: https://facelessuser.github.io/pymdown-extensions/extensions/snippets/
  [Snippets support]: https://github.com/squidfunk/mkdocs-material/releases/tag/0.1.0
  [Adding a glossary]: ../../reference/tooltips.md#adding-a-glossary
  [Embedding external files]: ../../reference/code-blocks.md#embedding-external-files

### SuperFences

[:octicons-tag-24: 0.1.0][SuperFences support] ·
[:octicons-workflow-24: Extension][SuperFences] ·
:octicons-zap-24: Supersedes [Fenced Code Blocks]

The [SuperFences] extension allows for arbitrary nesting of code and content
blocks inside each other, including admonitions, tabs, lists and all other
elements. Enable it via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.superfences
```

The following configuration options are supported:

[`custom_fences`](#+pymdownx.superfences.custom_fences){ #+pymdownx.superfences.custom_fences }

:   :octicons-milestone-24: Default: _none_ – This option allows to define a
    handler for custom fences, e.g. to preserve the definitions of [Mermaid.js]
    diagrams to be interpreted in the browser:

    ``` yaml
    markdown_extensions:
      - pymdownx.superfences:
          custom_fences:
            - name: mermaid
              class: mermaid
              format: !!python/name:pymdownx.superfences.fence_code_format
    ```

    Note that this will primarily prevent syntax highlighting from being
    applied. See the reference on [diagrams] to learn how Mermaid.js is
    integrated with Material for MkDocs.

The other configuration options of this extension are not officially supported
by Material for MkDocs, which is why they may yield unexpected results. Use
them at your own risk.

See reference for usage:

- [Using annotations]
- [Using code blocks]
- [Using content tabs]
- [Using flowcharts]
- [Using sequence diagrams]
- [Using state diagrams]
- [Using class diagrams]
- [Using entity-relationship diagrams]

  [SuperFences]: https://facelessuser.github.io/pymdown-extensions/extensions/superfences/
  [SuperFences support]: https://github.com/squidfunk/mkdocs-material/releases/tag/0.1.0
  [Fenced Code Blocks]: python-markdown.md#fenced-code-blocks
  [Mermaid.js]: https://mermaid-js.github.io/mermaid/
  [diagrams]: ../../reference/diagrams.md
  [Using annotations]: ../../reference/annotations.md#usage
  [Using content tabs]: ../../reference/content-tabs.md#usage
  [Using flowcharts]: ../../reference/diagrams.md#using-flowcharts
  [Using sequence diagrams]: ../../reference/diagrams.md#using-sequence-diagrams
  [Using state diagrams]: ../../reference/diagrams.md#using-state-diagrams
  [Using class diagrams]: ../../reference/diagrams.md#using-class-diagrams
  [Using entity-relationship diagrams]: ../../reference/diagrams.md#using-entity-relationship-diagrams

### Tabbed

[:octicons-tag-24: 5.0.0][Tabbed support] ·
[:octicons-workflow-24: Extension][Tabbed]

The [Tabbed] extension allows the usage of content tabs, a simple way to group
related content and code blocks under accessible tabs. Enable it via
`mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.tabbed:
      alternate_style: true 
```

The following configuration options are supported:

[`alternate_style`](#+pymdownx.tabbed.alternate_style){ #+pymdownx.tabbed:alternate_style }

:   [:octicons-tag-24: 7.3.1][Tabbed alternate support] ·
    :octicons-milestone-24: Default: `false` · :octicons-alert-24: __Required__
    –  This option enables the content tabs [alternate style], which has
    [better behavior on mobile viewports], and is the only supported style:

    ``` yaml
    markdown_extensions:
      - pymdownx.tabbed:
          alternate_style: true 
    ```

The other configuration options of this extension are not officially supported
by Material for MkDocs, which is why they may yield unexpected results. Use
them at your own risk.

See reference for usage:

- [Grouping code blocks]
- [Grouping other content]
- [Embedded content]

  [Tabbed]: https://facelessuser.github.io/pymdown-extensions/extensions/tabbed/
  [Tabbed support]: https://github.com/squidfunk/mkdocs-material/releases/tag/5.0.0
  [Tabbed alternate support]: https://github.com/squidfunk/mkdocs-material/releases/tag/7.3.1
  [alternate style]: https://facelessuser.github.io/pymdown-extensions/extensions/tabbed/#alternate-style
  [better behavior on mobile viewports]: https://twitter.com/squidfunk/status/1424740370596958214
  [Grouping code blocks]: ../../reference/content-tabs.md#grouping-code-blocks
  [Grouping other content]: ../../reference/content-tabs.md#grouping-other-content
  [Embedded content]: ../../reference/content-tabs.md#embedded-content

### Tasklist

[:octicons-tag-24: 1.0.0][Tasklist support] ·
[:octicons-workflow-24: Extension][Tasklist]

The [Tasklist] extension allows for the usage of [GitHub Flavored Markdown]
inspired [task lists][Tasklist specification], following the same syntactical
conventions. Enable it via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.tasklist:
      custom_checkbox: true
```

The following configuration options are supported:

[`custom_checkbox`](#+pymdownx.tasklist.custom_checkbox){ #+pymdownx.tasklist:custom_checkbox }

:   :octicons-milestone-24: Default: `false` · This option toggles the rendering
    style of checkboxes, replacing native checkbox styles with beautiful icons, 
    and is therefore recommended:

    ``` yaml
    markdown_extensions:
      - pymdownx.tasklist:
          custom_checkbox: true
    ```

[`clickable_checkbox`](#+pymdownx.tasklist.clickable_checkbox){ #+pymdownx.tasklist:clickable_checkbox }

:   :octicons-milestone-24: Default: `false` · This option toggles whether
    checkboxes are clickable. As the state is not persisted, the use of this 
    option is _rather discouraged_ from a user experience perspective:

    ``` yaml
    markdown_extensions:
      - pymdownx.tasklist:
          clickable_checkbox: true
    ```

The other configuration options of this extension are not officially supported
by Material for MkDocs, which is why they may yield unexpected results. Use
them at your own risk.

See reference for usage:

- [Using task lists]

  [Tasklist]: https://facelessuser.github.io/pymdown-extensions/extensions/tasklist/
  [Tasklist support]: https://github.com/squidfunk/mkdocs-material/releases/tag/1.0.0
  [GitHub Flavored Markdown]: https://github.github.com/gfm/
  [Tasklist specification]: https://github.github.com/gfm/#task-list-items-extension-
  [Using task lists]: ../../reference/lists.md#using-task-lists
