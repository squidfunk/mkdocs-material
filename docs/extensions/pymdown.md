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
  - pymdownx.githubemoji
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
uses the counterparts included in the standard Markdown library.

#### BetterEm

[BetterEm][2] improves the handling of emphasis markup (**bold** and *italic*)
within Markdown by providing a more sophisticated parser for better detecting
start and end tokens. Read the documentation for [usage notes][3].

  [2]: https://facelessuser.github.io/pymdown-extensions/extensions/betterem/
  [3]: https://facelessuser.github.io/pymdown-extensions/usage_notes/

#### GitHub Emoji

[GitHub Emoji][4] adds the ability to insert emojis, which does not only
include the :octocat: emojis, but also a :shit:-load of emojis that we use in
our daily lives. See the [Emoji Cheat Sheet][5] for a list of all available
emojis. Happy scrolling :tada:

  [4]: https://facelessuser.github.io/pymdown-extensions/extensions/githubemoji/
  [5]: http://www.webpagefx.com/tools/emoji-cheat-sheet/

#### MagicLink

[MagicLink][6] detects links in Markdown and auto-generates the necessary
markup, so no special syntax is required. It auto-links HTTP(S) and FTP links,
as well as references to email addresses:

  [6]: https://facelessuser.github.io/pymdown-extensions/extensions/magiclink/

#### SuperFences

[SuperFences][7] provides the ability to nest code blocks under blockquotes,
lists and other block elements, which the [Fenced Code Blocks][8] extension
from the standard Markdown library doesn't parse correctly.

  [7]: https://facelessuser.github.io/pymdown-extensions/extensions/superfences/
  [8]: https://pythonhosted.org/Markdown/extensions/fenced_code_blocks.html

#### Tasklist

[Tasklist][9] adds support for styled checkbox lists. This is useful for
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

[9]: https://facelessuser.github.io/pymdown-extensions/extensions/tasklist/

#### Tilde

[Tilde][10] provides an easy way to ~~strike through~~ cross out text.
The portion of text that should be erased must be enclosed in two tildes
`~~...~~`, and the extension will take care of the rest.

  [10]: https://facelessuser.github.io/pymdown-extensions/extensions/tilde/

### More syntactic sugar

#### Caret

[Caret][11] is the sister extension of [Tilde][12] and makes it possible to
highlight ^^inserted text^^. The portion of text that should be marked as added
must be enclosed in two carets `^^...^^`.

  [11]: https://facelessuser.github.io/pymdown-extensions/extensions/caret/
  [12]: #tilde

#### Mark

[Mark][13] adds the ability to ==highlight text== like it was marked with a
==yellow text marker==. The portion of text that should be highlighted must be
enclosed in two equal signs `==...==`.

  [13]: https://facelessuser.github.io/pymdown-extensions/extensions/mark/

#### SmartSymbols

[SmartSymbols][14] converts markup for special characters into their
corresponding symbols, e.g. arrows (<--, -->, <-->), trademark and copyright
symbols ((c), (tm), (r)) and fractions (1/2, 1/4, ...).

  [14]: https://facelessuser.github.io/pymdown-extensions/extensions/smartsymbols/

#### Critic

[Critic][15] implements [Critic Markup][16], a Markdown extension that enables
the tracking of changes (additions, deletions and comments) on documents.
During compilation of the Markdown document, changes can be rendered (default),
accepted or rejected.

Text can be {--deleted--} and replacement text {++added++}. This can also be
combined in {~~one~>a single~~} operation. {==Highlighting==} is also possible
{>>and comments can be added inline<<}.

  [15]: https://facelessuser.github.io/pymdown-extensions/extensions/critic/
  [16]: http://criticmarkup.com/

### Arithmatex <small>MathJax</small>

<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML"></script>

[Arithmatex][17] integrates Material with [MathJax][18] which parses
block-style and inline equations written in TeX markup and outputs them in
mathematical notation. See [this thread][19] for a short introduction and quick
reference on how to write equations in TeX syntax.

Besides activating the extension in the `mkdocs.yml`, the MathJax JavaScript
runtime needs to be included. This can be done with
[additional JavaScript][20]:

``` yaml
extra_javascript:
  - 'https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML'
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
  - 'extra.js'
  - 'https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML'
```

  [17]: https://facelessuser.github.io/pymdown-extensions/extensions/arithmatex/
  [18]: https://www.mathjax.org/
  [19]: http://meta.math.stackexchange.com/questions/5020/
  [20]: ../customization.md#additional-javascript

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

[InlineHilite][21] adds support for inline code highlighting. It's useful for
short snippets included within body copy, e.g. `#!js var test = 0;` and can be
achived by prefixing inline code with a shebang and language identifier,
e.g. `#!js`.

  [21]: https://facelessuser.github.io/pymdown-extensions/extensions/inlinehilite/
