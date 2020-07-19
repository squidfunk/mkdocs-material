---
template: overrides/main.html
---

# Changing the fonts

Material for MkDocs makes it easy to change the typeface of your project
documentation, as it directly integrates with [Google Fonts][1]. Alternatively,
fonts can be custom-loaded if self-hosting is preferred or another destination
should be used.

  [1]: https://fonts.google.com

## Configuration

### Regular font

[:octicons-file-code-24: Source][2] · :octicons-tools-24: Default: [`Roboto`][3]

The _regular font_ is used for all body copy, headlines, and essentially
everything that does not need to be proportionally spaced. It can be set to any
valid [Google Font][1] with:

``` yaml
theme:
  font:
    text: Roboto
```

The typeface will be loaded in 300, 400, _400i_ and __700__.

  [2]: https://github.com/squidfunk/mkdocs-material/blob/master/src/base.html#L120-L139
  [3]: https://fonts.google.com/specimen/Roboto

### Proportional font

[:octicons-file-code-24: Source][2] · :octicons-tools-24: Default:
[`Roboto Mono`][4]

The _proportional font_ is used for code blocks and can be configured separately.
Just like the regular font, it can be set to any valid [Google Font][1] from
`mkdocs.yml` with:

``` yaml
theme:
  font:
    code: Roboto Mono
```

The typeface will be loaded in 400.

  [4]: https://fonts.google.com/specimen/Roboto+Mono

## Customization

If you want to load fonts from other destinations or don't want to use Google
Fonts for [data privacy][5] reasons, e.g. _due to GDPR_, add the following lines
to `mkdocs.yml`:

``` yaml
theme:
  font: false
```

This will prevent typefaces from being loaded from Google Fonts. As a fallback,
common system fonts will be used automatically. Additionally, if you want to
load a font from another destination, you may either follow the guide on [theme
extension][6] and [override the `fonts` block][7] with a `style` tag, or use an
[additional stylesheet][8] to add the necessary `@font-face` definition:

``` css
@font-face {
  font-family: "<font>";
  src: "...";
}
```

The font can then be configured to be used as the regular or proportional font:

=== "Regular font"

    ``` css
    body, input {
      font-family: "<font>", -apple-system, Helvetica, Arial, sans-serif;
    }
    ```

=== "Proportional font"

    ``` css
    pre, code, kbd {
      font-family: "<font>", SFMono-Regular, Consolas, Menlo, monospace;
    }
    ```

  [5]: ../data-privacy.md
  [6]: ../customization.md#extending-the-theme
  [7]: ../customization.md#overriding-blocks
  [8]: ../customization.md#additional-stylesheets
