---
template: overrides/main.html
---

# PyMdown Extensions

[PyMdown Extensions][1] is a collection of Markdown extensions that add some
great missing features to the standard Markdown library. A compatible version
is always included with the theme.

  [1]: https://facelessuser.github.io/pymdown-extensions/

## Configuration

The following list of extensions that are part of the PyMdown Extensions
package are recommended to be used together with Material for MkDocs:

``` yaml
markdown_extensions:
  - pymdownx.arithmatex
  - pymdownx.betterem:
      smart_enable: all
  - pymdownx.caret
  - pymdownx.critic
  - pymdownx.details
  - pymdownx.emoji:
      emoji_index: !!python/name:pymdownx.emoji.twemoji
      emoji_generator: !!python/name:pymdownx.emoji.to_svg
  - pymdownx.inlinehilite
  - pymdownx.magiclink
  - pymdownx.mark
  - pymdownx.smartsymbols
  - pymdownx.superfences
  - pymdownx.tasklist:
      custom_checkbox: true
  - pymdownx.tabbed
  - pymdownx.tilde
```

## Usage

### Arithmatex <small>MathJax</small>

<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_CHTML"></script>

[Arithmatex][2] integrates Material for MkDocs with [MathJax][3] which parses
block-style and inline equations written in TeX markup and outputs them in
mathematical notation. See [this thread][4] for a short introduction and quick
reference on how to write equations in TeX syntax.

Besides activating the extension in the `mkdocs.yml`, the MathJax JavaScript
runtime needs to be included. This can be done with [additional JavaScript][5]:

``` yaml
extra_javascript:
  - https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_CHTML
```

If you want to override the default MathJax configuration, you can do this by
adding another JavaScript file **before** the MathJax runtime which contains
the MathJax configuration, e.g.:

``` js
window.MathJax = {
  tex2jax: {
    inlineMath: [ ["\\(","\\)"] ],
    displayMath: [ ["\\[","\\]"] ]
  },
  TeX: {
    TagSide: "right",
    TagIndent: ".8em",
    MultLineWidth: "85%",
    equationNumbers: {
      autoNumber: "AMS",
    },
    unicode: {
      fonts: "STIXGeneral,'Arial Unicode MS'"
    }
  },
  displayAlign: "left",
  showProcessingMessages: false,
  messageStyle: "none"
};
```

Then, add the following lines to `mkdocs.yml`:

``` yaml
extra_javascript:
  - javascripts/extra.js
  - https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_CHTML
```

  [2]: https://facelessuser.github.io/pymdown-extensions/extensions/arithmatex/
  [3]: https://www.mathjax.org/
  [4]: https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference
  [5]: ../customization.md#additional-javascript

#### Blocks

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

#### Inline

Inline equations must be enclosed in `:::tex $...$`:

Example:

``` tex
Lorem ipsum dolor sit amet: $p(x|y) = \frac{p(y|x)p(x)}{p(y)}$
```

Result:

Lorem ipsum dolor sit amet: $p(x|y) = \frac{p(y|x)p(x)}{p(y)}$

### BetterEm

[BetterEm][6] improves the handling of emphasis markup (**bold** and *italic*)
within Markdown by providing a more sophisticated parser for better detecting
start and end tokens. Read the documentation for [usage notes][7].

  [6]: https://facelessuser.github.io/pymdown-extensions/extensions/betterem/
  [7]: https://facelessuser.github.io/pymdown-extensions/usage_notes/

### Caret

[Caret][8] makes it possible to highlight ^^inserted text^^. The portion of
text that should be marked as added must be enclosed in two carets `^^...^^`.

  [8]: https://facelessuser.github.io/pymdown-extensions/extensions/caret/

### Critic

[Critic][9] implements [Critic Markup][10], a Markdown extension that enables
the tracking of changes (additions, deletions and comments) on documents.
During compilation of the Markdown document, changes can be rendered (default),
accepted or rejected.

Text can be {--deleted--} and replacement text {++added++}. This can also be
combined into {~~one~>a single~~} operation. {==Highlighting==} is also
possible {>>and comments can be added inline<<}.

{==

Formatting can also be applied to blocks, by putting the opening and closing
tags on separate lines and adding new lines between the tags and the content.

==}

  [9]: https://facelessuser.github.io/pymdown-extensions/extensions/critic/
  [10]: http://criticmarkup.com/

### Details

[Details][11] adds [collapsible Admonition blocks][12] which can contain
arbitrary content using the HTML5 `details` and `summary` tags. Additionally,
all Admonition qualifiers can be used, e.g. `note`, `question`, `warning` etc.:

??? question "How many Prolog programmers does it take to change a lightbulb?"

    Yes.

  [11]: https://facelessuser.github.io/pymdown-extensions/extensions/details/
  [12]: ../admonition/#collapsible-blocks

### Emoji :tada:

[Emoji][13] adds the ability to insert, well, emojis! :smile:

By default, [Emoji][13] uses JoyPixles' emoji under the former name EmojiOne.
Recent versions of the extension lock support to an older version (2.2.7) due
to JoyPixels' newer, less permissible licenses included in later releases. This
restricts support to Unicode 9. To get the latest support for the current
Unicode version, you can use Twemoji instead which has a much more permissable
license. Simply override the default emoji index being used:

``` yaml
markdown_extensions:
  - pymdownx.emoji:
      emoji_index: !!python/name:pymdownx.emoji.twemoji
      emoji_generator: !!python/name:pymdownx.emoji.to_svg
```

To view all the available short names and emoji available, see
[Emoji's documentation][18] on your chosen index which includes links to the
files containing the short names and emoji associated with each supported
index.

In addition, you can access all the Material icons and Fontawesome icons by using
MkDocs Material's custom emoji index. It extends the Twemoji index with new short
names that access any of the included icons. To use the custom index, you need to
use the following options when including the Emoji extension:

```
  - pymdownx.emoji:
      emoji_index: !!python/name:material.emoji.material
      emoji_generator: !!python/name:material.emoji.to_svg
```

Then we can access any of the icons:

=== "Markdown"
    ```
    We can use Material Icons :material-airplane:.

    We can also use Fontawesome Icons :fontawesome-solid-ambulance:.

    That's not all, we can also use Octicons :octicons-octoface:.
    ```

=== "Results"
    We can use Material Icons :material-airplane:.

    We can also use Fontawesome Icons :fontawesome-solid-ambulance:.

    That's not all, we can also use Octicons :octicons-octoface:.

!!! warning "Legal disclaimer"

    Material has no affiliation with [JoyPixles][15] or [Twemoji][14], both
    of which are licensed under [CC BY 4.0][16]. When including images or CSS
    from either provider, please read their licenses to ensure proper
    attribution: [EmojiOne][17] or [Twemoji][14].

  [13]: https://facelessuser.github.io/pymdown-extensions/extensions/emoji/
  [14]: https://twemoji.twitter.com/
  [15]: https://www.joypixels.com/
  [16]: https://creativecommons.org/licenses/by/4.0/legalcode
  [17]: https://github.com/joypixels/emojione#emojione-version-2
  [18]: https://facelessuser.github.io/pymdown-extensions/extensions/emoji/#default-emoji-indexes

### InlineHilite

[InlineHilite][19] adds support for inline code highlighting. It's useful for
short snippets included within body copy, e.g. `#!js var test = 0;` and can be
activated by prefixing inline code with a shebang and language identifier,
e.g. `#!js`.

  [19]: https://facelessuser.github.io/pymdown-extensions/extensions/inlinehilite/

### MagicLink

[MagicLink][20] detects links in Markdown and auto-generates the necessary
markup, so no special syntax is required. It auto-links `http[s]://` and
`ftp://` links, as well as references to email addresses.

  [20]: https://facelessuser.github.io/pymdown-extensions/extensions/magiclink/

### Mark

[Mark][21] adds the ability to ==highlight text== like it was marked with a
==text marker==. The portion of text that should be highlighted must be
enclosed in two equal signs `==...==`.

  [21]: https://facelessuser.github.io/pymdown-extensions/extensions/mark/

### SmartSymbols

[SmartSymbols][22] converts markup for special characters into their
corresponding symbols, e.g. arrows (<--, -->, <-->), trademark and copyright
symbols ((c), (tm), (r)) and fractions (1/2, 1/4, ...).

  [22]: https://facelessuser.github.io/pymdown-extensions/extensions/smartsymbols/

### SuperFences

[SuperFences][23] provides the ability to nest code blocks under blockquotes,
lists and other block elements, which the [Fenced Code Blocks][24] extension
from the standard Markdown library doesn't parse correctly.

SuperFences does also allow [grouping code blocks with tabs][25].

  [23]: https://facelessuser.github.io/pymdown-extensions/extensions/superfences/
  [24]: https://python-markdown.github.io/extensions/fenced_code_blocks/
  [25]: codehilite.md#grouping-code-blocks

### Tabbed

[Tabbed][26] adds support for creating tabbed groups of Markdown content.

Example:

``` markdown
=== "Fruit List"
    - :apple: Apple
    - :banana: Banana
    - :kiwi: Kiwi

=== "Fruit Table"
    Fruit           | Color
    --------------- | -----
    :apple:  Apple  | Red
    :banana: Banana | Yellow
    :kiwi:   Kiwi   | Green
```

Result:

=== "Fruit List"
    - :apple: Apple
    - :banana: Banana
    - :kiwi: Kiwi

=== "Fruit Table"
    Fruit           | Color
    --------------- | -----
    :apple:  Apple  | Red
    :banana: Banana | Yellow
    :kiwi:   Kiwi   | Green

[26]: https://facelessuser.github.io/pymdown-extensions/extensions/superfences/

### Tasklist

[Tasklist][27] adds support for styled checkbox lists. This is useful for
keeping track of tasks and showing what has been done and has yet to be done.
Checkbox lists are like regular lists, but prefixed with `[ ]` for empty or
`[x]` for filled checkboxes.

Example:

``` markdown
* [x] Lorem ipsum dolor sit amet, consectetur adipiscing elit
* [x] Nulla lobortis egestas semper
* [x] Curabitur elit nibh, euismod et ullamcorper at, iaculis feugiat est
* [ ] Vestibulum convallis sit amet nisi a tincidunt
    * [x] In hac habitasse platea dictumst
    * [x] In scelerisque nibh non dolor mollis congue sed et metus
    * [x] Sed egestas felis quis elit dapibus, ac aliquet turpis mattis
    * [ ] Praesent sed risus massa
* [ ] Aenean pretium efficitur erat, donec pharetra, ligula non scelerisque
* [ ] Nulla vel eros venenatis, imperdiet enim id, faucibus nisi
```

Result:

* [x] Lorem ipsum dolor sit amet, consectetur adipiscing elit
* [x] Nulla lobortis egestas semper
* [x] Curabitur elit nibh, euismod et ullamcorper at, iaculis feugiat est
* [ ] Vestibulum convallis sit amet nisi a tincidunt
    * [x] In hac habitasse platea dictumst
    * [x] In scelerisque nibh non dolor mollis congue sed et metus
    * [x] Sed egestas felis quis elit dapibus, ac aliquet turpis mattis
    * [ ] Praesent sed risus massa
* [ ] Aenean pretium efficitur erat, donec pharetra, ligula non scelerisque
* [ ] Nulla vel eros venenatis, imperdiet enim id, faucibus nisi

[27]: https://facelessuser.github.io/pymdown-extensions/extensions/tasklist/

### Tilde

[Tilde][28] provides an easy way to ~~strike through~~ cross out text.
The portion of text that should be erased must be enclosed in two tildes
`~~...~~` and the extension will take care of the rest.

[28]: https://facelessuser.github.io/pymdown-extensions/extensions/tilde/
