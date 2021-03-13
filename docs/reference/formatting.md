---
template: overrides/main.html
---

# Formatting

Material for MkDocs provides support for several HTML elements that can be used 
to highlight sections of a document or apply specific formatting. Additionally, 
[Critic Markup][1] is supported, adding the ability to display suggested changes
for a document.

  [1]: http://criticmarkup.com/

## Configuration

### Critic

[:octicons-file-code-24: Source][2] · [:octicons-workflow-24: Extension][3]

The [Critic][3] extension, which is part of [Python Markdown Extensions][4], 
allows for the __usage of [Critic Markup][1] to highlight changes__ in a
document, and can be enabled via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.critic
```

The following options are supported:

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

  [2]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/stylesheets/main/extensions/pymdownx/_critic.scss
  [3]: https://facelessuser.github.io/pymdown-extensions/extensions/critic/
  [4]: https://facelessuser.github.io/pymdown-extensions/

### BetterEm

The [BetterEm][5] extension, which is part of [Python Markdown Extensions][4], 
improves the handling of Markup to emphasize text (e.g. __bold__  and _italic_), 
and can be enabled via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.betterem:
      smart_enable: all
```

  [5]: https://facelessuser.github.io/pymdown-extensions/extensions/betterem/

### Caret, Mark & Tilde

The [Caret][6], [Mark][7] and [Tilde][8] extensions, which are part of [Python 
Markdown Extensions][4], allow for the __highlighting of text__, as well as
__handling sub- and superscripts__:

``` yaml
markdown_extensions:
  - pymdownx.caret
  - pymdownx.mark
  - pymdownx.tilde
```

  [6]: https://facelessuser.github.io/pymdown-extensions/extensions/caret/
  [7]: https://facelessuser.github.io/pymdown-extensions/extensions/mark/
  [8]: https://facelessuser.github.io/pymdown-extensions/extensions/tilde/

### SmartSymbols

The [SmartSymbols][9] extension, which is also part of [Python Markdown 
Extensions][4], __converts special characters into their corresponding
symbols__, and can be enabled via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.smartsymbols
```

See the [official documentation][9] for a list of supported symbols.

  [9]: https://facelessuser.github.io/pymdown-extensions/extensions/smartsymbols/

## Usage

### Highlighting changes

When [Critic][10] is enabled, [Critic Markup][1] can be used, which adds the
ability to _highlight suggested changes_, as well as add _inline comments_ to a 
document:

  [10]: #critic

_Example_:

``` markdown
Text can be {​--deleted--} and replacement text {​++added++}. This can also be
combined into {​~~one~>a single~~} operation. {​==Highlighting==} is also
possible {​>>and comments can be added inline<<}.

{​==

Formatting can also be applied to blocks, by putting the opening and closing
tags on separate lines and adding new lines between the tags and the content.

==}
```

_Result_:

Text can be {--deleted--} and replacement text {++added++}. This can also be
combined into {~~one~>a single~~} operation. {==Highlighting==} is also
possible {>>and comments can be added inline<<}.

{==

Formatting can also be applied to blocks, by putting the opening and closing
tags on separate lines and adding new lines between the tags and the content.

==}

### Highlighting text

When the [Caret, Mark & Tilde][11] extensions are enabled, text can be 
highlighted with a nicer syntax than using the corresponding `mark`, `ins` and 
`del` HTML tags:

_Example_:

``` markdown 
- ==This was marked==
- ^^This was inserted^^
- ~~This was deleted~~
```

_Result_:

- ==This was marked==
- ^^This was inserted^^
- ~~This was deleted~~

  [11]: #caret-mark-tilde

### Sub- and superscripts

When the [Caret & Tilde][11] extensions are enabled, text can be sub- and 
superscripted with a nicer syntax than using the corresponding `sub` and `sup` 
HTML tags:

_Example_:

``` markdown 
- H~2~0
- A^T^A
```

_Result_:

- H~2~0
- A^T^A

  [11]: #caret-mark-tilde
