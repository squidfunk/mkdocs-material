# PyMdown Extensions

[PyMdown Extensions][] is a collection of Markdown extensions that add some
great features to the standard Markdown library. For this reason, the
**installation of this package is highly recommended** as it's well-integrated
with the Material theme.

## Installation

The PyMdown Extensions package can be installed with the following command:

``` sh
pip install pymdown-extensions
```

## Extensions

### GitHub Flavored Markdown

Most of the extensions included in the PyMdown Extensions package try to bring
the Markdown experience closer to GitHub Flavored Markdown (GFM):

- [BetterEm][] improves the handling of emphasis markup (**bold** and *italic*)
  within Markdown by providing a more sophisticated parser for better detecting
  start and end tokens. Read the documentation for usage notes.

- [MagicLink][] detects links in Markdown and auto-generates the necessary
  markup, so no special syntax is required. It auto-links HTTP(S) and FTP
  links, as well as references to email addresses.

- [GitHub Emoji][] adds the ability to insert emojis, which does not only
  include the :octocat: emojis, but also a :shit:-load of emojis that we use in
  our daily lives. See the [Emoji Cheat Sheet][] for a list of all available
  emojis. Happy scrolling :tada:

- [SuperFences][] provides the ability to nest code blocks under blockquotes,
  lists and other block elements, which the [Fenced Code Blocks][] extension
  from the standard Markdown library doesn't parse correctly.

- [Tasklist][] adds support for styled checkbox lists. This is useful for
  keeping track of tasks and showing what has been done and has yet to be done.
  The usage of this extension is documented [here][].

- [Tilde][] provides an easy way to ~~strike through~~ cross out text.
  The portion of text that should be erased must be enclosed in two tildes
  `~~...~~`, and the extension will take care of the rest.

The PyMdown Extensions package adds a shorthand to enable all of the included
extensions that provide the GFM experience. However, usage of the shorthand is
discouraged, because some extensions are not supported, as the Material theme
uses the counterparts included in the standard Markdown library.

To enable all extensions add the following lines to your `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.betterem
  - pymdownx.githubemoji
  - pymdownx.magiclink
  - pymdownx.superfences
  - pymdownx.tasklist(custom_checkbox=true)
  - pymdownx.tilde
```

### Syntactic Sugar

There are three other extensions that add further syntactic sugar:

- [Caret][] is the sister extension of [Tilde][] and makes it possible to
  highlight ^^inserted text^^. The portion of text that should be marked as
  added must be enclosed in two carets `^^...^^`, the extension will do the
  rest.

- [Mark][] add the ability to ==mark text==.
- SmartSymbols

- Inlinehilite --- own documentation file
- Critic --- own documentation file

[PyMdown Extensions]: http://facelessuser.github.io/pymdown-extensions/
[usage notes]: https://facelessuser.github.io/pymdown-extensions/usage_notes/
[BetterEm]: https://facelessuser.github.io/pymdown-extensions/extensions/betterem/
[MagicLink]: https://facelessuser.github.io/pymdown-extensions/extensions/magiclink/
[GitHub Emoji]: https://facelessuser.github.io/pymdown-extensions/extensions/githubemoji/
[Emoji Cheat Sheet]: http://www.webpagefx.com/tools/emoji-cheat-sheet/
[SuperFences]: https://facelessuser.github.io/pymdown-extensions/extensions/superfences/
[Fenced Code Blocks]: https://pythonhosted.org/Markdown/extensions/fenced_code_blocks.html
[Tasklist]: https://facelessuser.github.io/pymdown-extensions/extensions/tasklist/
[here]: /extensions/pymdown/tasklist
[Tilde]: https://facelessuser.github.io/pymdown-extensions/extensions/tilde/
[Caret]: https://facelessuser.github.io/pymdown-extensions/extensions/caret/
[Mark]: https://facelessuser.github.io/pymdown-extensions/extensions/mark/
