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
  - pymdownx.betterem(smart_enable=all)
  - pymdownx.caret
  - pymdownx.critic
  - pymdownx.emoji:
      emoji_generator: !!python/name:pymdownx.emoji.to_svg
  - pymdownx.inlinehilite
  - pymdownx.magiclink
  - pymdownx.mark
  - pymdownx.smartsymbols
  - pymdownx.superfences
  - pymdownx.tasklist(custom_checkbox=true)
  - pymdownx.tilde
```

## Usage

### GitHub Flavored Markdown

Most of the extensions included in the PyMdown Extensions package try to bring
the Markdown experience closer to GitHub Flavored Markdown (GFM).

The PyMdown Extensions package adds a shorthand to enable all of the included
extensions that provide the GFM experience. However, usage of the shorthand is
discouraged, because some extensions are not supported, as the Material theme
uses some incompatible extensions included in the standard Markdown library.

#### BetterEm

[BetterEm][2] improves the handling of emphasis markup (**bold** and *italic*)
within Markdown by providing a more sophisticated parser for better detecting
start and end tokens. Read the documentation for [usage notes][3].

  [2]: https://facelessuser.github.io/pymdown-extensions/extensions/betterem/
  [3]: https://facelessuser.github.io/pymdown-extensions/usage_notes/

#### Emoji

[Emoji][4] adds the ability to insert a :shit:-load of emojis that we use in
our daily lives. See the [EmojiOne demo][5] for a list of all available
emojis. Happy scrolling :tada:

!!! warning "Legal disclaimer"

    Material has no affiliation with [EmojiOne][6] which is released under
    [CC BY 4.0][7]. When including EmojiOne images or CSS, please read the
    [EmojiOne license][8] to ensure proper usage and attribution.

  [4]: https://facelessuser.github.io/pymdown-extensions/extensions/emoji/
  [5]: http://emojione.com/demo/
  [6]: http://emojione.com
  [7]: https://creativecommons.org/licenses/by/4.0/legalcode
  [8]: http://emojione.com/licensing/

#### MagicLink

[MagicLink][9] detects links in Markdown and auto-generates the necessary
markup, so no special syntax is required. It auto-links `http[s]://` and
`ftp://` links, as well as references to email addresses:

  [9]: https://facelessuser.github.io/pymdown-extensions/extensions/magiclink/

#### SuperFences

[SuperFences][10] provides the ability to nest code blocks under blockquotes,
lists and other block elements, which the [Fenced Code Blocks][11] extension
from the standard Markdown library doesn't parse correctly.

  [10]: https://facelessuser.github.io/pymdown-extensions/extensions/superfences/
  [11]: https://pythonhosted.org/Markdown/extensions/fenced_code_blocks.html

#### Tasklist

[Tasklist][12] adds support for styled checkbox lists. This is useful for
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

[12]: https://facelessuser.github.io/pymdown-extensions/extensions/tasklist/

#### Tilde

[Tilde][13] provides an easy way to ~~strike through~~ cross out text.
The portion of text that should be erased must be enclosed in two tildes
`~~...~~` and the extension will take care of the rest.

  [13]: https://facelessuser.github.io/pymdown-extensions/extensions/tilde/

### More syntactic sugar

#### Caret

[Caret][14] is the sister extension of [Tilde][15] and makes it possible to
highlight ^^inserted text^^. The portion of text that should be marked as added
must be enclosed in two carets `^^...^^`.

  [14]: https://facelessuser.github.io/pymdown-extensions/extensions/caret/
  [15]: #tilde

#### Mark

[Mark][16] adds the ability to ==highlight text== like it was marked with a
==yellow text marker==. The portion of text that should be highlighted must be
enclosed in two equal signs `==...==`.

  [16]: https://facelessuser.github.io/pymdown-extensions/extensions/mark/

#### SmartSymbols

[SmartSymbols][17] converts markup for special characters into their
corresponding symbols, e.g. arrows (<--, -->, <-->), trademark and copyright
symbols ((c), (tm), (r)) and fractions (1/2, 1/4, ...).

  [17]: https://facelessuser.github.io/pymdown-extensions/extensions/smartsymbols/

#### Critic

[Critic][18] implements [Critic Markup][19], a Markdown extension that enables
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

  [18]: https://facelessuser.github.io/pymdown-extensions/extensions/critic/
  [19]: http://criticmarkup.com/

### Arithmatex <small>MathJax</small>

<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_CHTML"></script>

[Arithmatex][20] integrates Material with [MathJax][21] which parses
block-style and inline equations written in TeX markup and outputs them in
mathematical notation. See [this thread][22] for a short introduction and quick
reference on how to write equations in TeX syntax.

Besides activating the extension in the `mkdocs.yml`, the MathJax JavaScript
runtime needs to be included. This must be done with
[additional JavaScript][23]:

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

  [20]: https://facelessuser.github.io/pymdown-extensions/extensions/arithmatex/
  [21]: https://www.mathjax.org/
  [22]: http://meta.math.stackexchange.com/questions/5020/
  [23]: ../customization.md#additional-javascript

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

### InlineHilite

[InlineHilite][24] adds support for inline code highlighting. It's useful for
short snippets included within body copy, e.g. `#!js var test = 0;` and can be
achived by prefixing inline code with a shebang and language identifier,
e.g. `#!js`.

  [24]: https://facelessuser.github.io/pymdown-extensions/extensions/inlinehilite/
