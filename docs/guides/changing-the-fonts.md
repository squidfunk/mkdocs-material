---
template: overrides/main.html
---

# Changing the fonts

## Configuration

> Default: `Roboto` and `Roboto Mono`

The [Roboto font family][1] is the default font included with the theme,
specifically the regular sans-serif type for text and the `monospaced` type for
code. Both fonts are loaded from [Google Fonts][2] and can be changed to any
supported typeface, like for example the [Ubuntu font family][3]:

``` yaml
theme:
  font:
    text: Ubuntu
    code: Ubuntu Mono
```

The text font will be loaded in weights 400 and **700**, the `monospaced` font
in regular weight. If you want to load fonts from other destinations or don't
want to use Google Fonts for data privacy reasons, just set `font` to `false`:

``` yaml
theme:
  font: false
```

  [1]: https://fonts.google.com/specimen/Roboto
  [2]: https://fonts.google.com
  [3]: https://fonts.google.com/specimen/Ubuntu

## Customization

TBD
