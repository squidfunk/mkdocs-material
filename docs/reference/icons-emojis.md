---
template: overrides/main.html
---

# Icons + Emojis

One of the best features of Material for MkDocs is the possibility to use [more
than _7.000 icons_][1] and _thousands of emojis_ in your project documentation
with practically zero additional effort. Furthermore, custom icons can be used
in `mkdocs.yml`, documents and templates.

## Configuration

### Emoji

[:octicons-file-code-24: Source][2] · [:octicons-workflow-24: Extension][3]

The [Emoji][3] extension, which is part of [Python Markdown Extensions][4],
adds the ability to __integrate emojis and icons__ in the `*.svg` file format,
which are inlined when [building your site][5]:

``` yaml
markdown_extensions:
  - pymdownx.emoji:
      emoji_index: !!python/name:materialx.emoji.twemoji
      emoji_generator: !!python/name:materialx.emoji.to_svg
```

The following icon sets are bundled with Material for MkDocs:

* :material-material-design: – [Material Design][6]
* :fontawesome-brands-font-awesome-flag: – [FontAwesome][7]
* :octicons-mark-github-16: – [Octicons][8]

You can also add [additional icons][9]. When using emojis, it's recommended to
consult the official documentation of [Python Markdown Extensions][3] to learn
about configuration options.

  [1]: https://github.com/squidfunk/mkdocs-material/tree/master/material/.icons
  [2]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/stylesheets/main/extensions/pymdownx/_emoji.scss
  [3]: https://facelessuser.github.io/pymdown-extensions/extensions/emoji/
  [4]: https://facelessuser.github.io/pymdown-extensions/
  [5]: ../creating-your-site.md#building-your-site
  [6]: https://materialdesignicons.com/
  [7]: https://fontawesome.com/icons?d=gallery&m=free
  [8]: https://octicons.github.com/
  [9]: ../setup/changing-the-logo-and-icons.md#additional-icons

## Usage

### Using emojis

Emojis can be integrated in Markdown by putting the shortcode of the emoji
between two colons. If you're using [Twemoji][10] (recommended), you can look up
the shortcodes at [Emojipedia][11].

_Example_:

```
:smile: 
```

_Result_:

:smile:

  [10]: https://twemoji.twitter.com/
  [11]: https://emojipedia.org/twitter/

### Using icons

When [Emoji][12] is enabled, icons can be used similar to emojis, by referencing
a valid path to any icon bundled with the theme, which are located in the
[`.icons`][1] directory, and replacing `/` with `-`:

_Example_:

```
* :material-account-circle: – `.icons/material/account-circle.svg`
* :fontawesome-regular-laugh-wink: – `.icons/fontawesome/regular/laugh-wink.svg`
* :octicons-octoface-16: – `.icons/octicons/octoface-16.svg`
```

_Result_:

* :material-account-circle: – [`.icons/material/account-circle.svg`][13]
* :fontawesome-regular-laugh-wink: – [`.icons/fontawesome/regular/laugh-wink.svg`][14]
* :octicons-octoface-16: – [`.icons/octicons/octoface-16.svg`][15]

  [12]: #emoji
  [13]: https://raw.githubusercontent.com/squidfunk/mkdocs-material/master/material/.icons/material/account-circle.svg
  [14]: https://raw.githubusercontent.com/squidfunk/mkdocs-material/master/material/.icons/fontawesome/regular/laugh-wink.svg
  [15]: https://raw.githubusercontent.com/squidfunk/mkdocs-material/master/material/.icons/octicons/octoface-16.svg
