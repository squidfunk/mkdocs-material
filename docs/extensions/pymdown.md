# PyMdown Extensions

[PyMdown Extensions][1] is a collection of Markdown extensions that add some
great features to the standard Markdown library. For this reason, the
**installation of this package is highly recommended** as it's well-integrated
with the Material theme.

  [1]: http://facelessuser.github.io/pymdown-extensions/

## Installation

The PyMdown Extensions package can be installed with the following command:

``` sh
pip install pymdown-extensions
```

The following list of extensions that are part of the PyMdown Extensions
package are recommended to be used together with the Material theme:

``` yaml
markdown_extensions:
  - pymdownx.arithmatex
  - pymdownx.betterem:
      smart_enable: all
  - pymdownx.caret
  - pymdownx.critic
  - pymdownx.details
  - pymdownx.emoji:
      emoji_generator: !!python/name:pymdownx.emoji.to_svg
  - pymdownx.inlinehilite
  - pymdownx.magiclink
  - pymdownx.mark
  - pymdownx.smartsymbols
  - pymdownx.superfences
  - pymdownx.tasklist:
      custom_checkbox: true
  - pymdownx.tilde
```

## Usage

### Arithmatex <small>MathJax</small>

<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_CHTML"></script>

[Arithmatex][2] integrates Material with [MathJax][3] which parses
block-style and inline equations written in TeX markup and outputs them in
mathematical notation. See [this thread][4] for a short introduction and quick
reference on how to write equations in TeX syntax.

Besides activating the extension in the `mkdocs.yml`, the MathJax JavaScript
runtime needs to be included. This must be done with
[additional JavaScript][5]:

``` yaml
extra_javascript:
  - 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_CHTML'
```

If you want to override the default MathJax configuration, you can do this by
adding another JavaScript file **before** the MathJax runtime in
`extra_javascript` which contains your MathJax configuration, e.g.:

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

In your `mkdocs.yml`, include it with:

``` yaml
extra_javascript:
  - 'javascripts/extra.js'
  - 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_CHTML'
```

  [2]: https://facelessuser.github.io/pymdown-extensions/extensions/arithmatex/
  [3]: https://www.mathjax.org/
  [4]: http://meta.math.stackexchange.com/questions/5020/
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

Inline equations need to be enclosed in `:::tex $...$`:

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

[Details][11] adds collapsible [Admonition-style blocks][12] which can contain
arbitrary content using the HTML5 `details` and `summary` tags. Additionally,
all Admonition qualifiers can be used, e.g. `note`, `question`, `warning` etc.:

??? question "How many Prolog programmers does it take to change a lightbulb?"

    Yes.

  [11]: https://facelessuser.github.io/pymdown-extensions/extensions/details/
  [12]: admonition.md

### Emoji

[Emoji][13] adds the ability to insert a :shit:-load of emojis that we use in
our daily lives. See the [EmojiOne demo][14] for a list of all available
emojis. Happy scrolling :tada:

!!! warning "Legal disclaimer"

    Material has no affiliation with [EmojiOne][15] which is released under
    [CC BY 4.0][16]. When including EmojiOne images or CSS, please read the
    [EmojiOne license][17] to ensure proper usage and attribution.

  [13]: https://facelessuser.github.io/pymdown-extensions/extensions/emoji/
  [14]: https://emoji.codes/
  [15]: http://emojione.com
  [16]: https://creativecommons.org/licenses/by/4.0/legalcode
  [17]: http://emojione.com/licensing/

### InlineHilite

[InlineHilite][18] adds support for inline code highlighting. It's useful for
short snippets included within body copy, e.g. `#!js var test = 0;` and can be
achived by prefixing inline code with a shebang and language identifier,
e.g. `#!js`.

  [18]: https://facelessuser.github.io/pymdown-extensions/extensions/inlinehilite/

### MagicLink

[MagicLink][19] detects links in Markdown and auto-generates the necessary
markup, so no special syntax is required. It auto-links `http[s]://` and
`ftp://` links, as well as references to email addresses.

  [19]: https://facelessuser.github.io/pymdown-extensions/extensions/magiclink/

### Mark

[Mark][20] adds the ability to ==highlight text== like it was marked with a
==text marker==. The portion of text that should be highlighted must be
enclosed in two equal signs `==...==`.

  [20]: https://facelessuser.github.io/pymdown-extensions/extensions/mark/

### SmartSymbols

[SmartSymbols][21] converts markup for special characters into their
corresponding symbols, e.g. arrows (<--, -->, <-->), trademark and copyright
symbols ((c), (tm), (r)) and fractions (1/2, 1/4, ...).

  [21]: https://facelessuser.github.io/pymdown-extensions/extensions/smartsymbols/

### SuperFences

[SuperFences][22] provides the ability to nest code blocks under blockquotes,
lists and other block elements, which the [Fenced Code Blocks][23] extension
from the standard Markdown library doesn't parse correctly.

SuperFences does also allow [grouping code blocks with tabs][24].

  [22]: https://facelessuser.github.io/pymdown-extensions/extensions/superfences/
  [23]: https://python-markdown.github.io/extensions/fenced_code_blocks/
  [24]: codehilite.md#grouping-code-blocks

### Tasklist

[Tasklist][25] adds support for styled checkbox lists. This is useful for
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

[25]: https://facelessuser.github.io/pymdown-extensions/extensions/tasklist/

### Tilde

[Tilde][26] provides an easy way to ~~strike through~~ cross out text.
The portion of text that should be erased must be enclosed in two tildes
`~~...~~` and the extension will take care of the rest.

  [26]: https://facelessuser.github.io/pymdown-extensions/extensions/tilde/
