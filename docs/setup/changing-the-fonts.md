# Changing the fonts

Material for MkDocs makes it easy to change the typeface of your project
documentation, as it directly integrates with [Google Fonts]. Alternatively,
fonts can be custom-loaded if self-hosting is preferred for data privacy reasons
or another destination should be used.

  [Google Fonts]: https://fonts.google.com

## Configuration

### Regular font

<!-- md:version 0.1.2 -->
<!-- md:default [`Roboto`][Roboto] -->

The regular font is used for all body copy, headlines, and essentially
everything that does not need to be monospaced. It can be set to any
valid [Google Font][Google Fonts] via `mkdocs.yml`:

``` yaml
theme:
  font:
    text: Roboto
```

The typeface will be loaded in 300, 400, _400i_ and __700__.

  [Roboto]: https://fonts.google.com/specimen/Roboto

### Monospaced font

<!-- md:version 0.1.2 -->
<!-- md:default [`Roboto Mono`][Roboto Mono] -->

The _monospaced font_ is used for code blocks and can be configured separately.
Just like the regular font, it can be set to any valid [Google Font]
[Google Fonts] via `mkdocs.yml`:

``` yaml
theme:
  font:
    code: Roboto Mono
```

The typeface will be loaded in 400.

  [Roboto Mono]: https://fonts.google.com/specimen/Roboto+Mono

### Autoloading

<!-- md:version 1.0.0 -->
<!-- md:default none -->

If you want to prevent typefaces from being loaded from [Google Fonts], e.g.
to adhere to [data privacy] regulations, and fall back to system fonts, add the
following lines to `mkdocs.yml`:

``` yaml
theme:
  font: false
```

!!! tip "Automatically bundle Google Fonts"

    The [built-in privacy plugin] makes it easy to use Google Fonts
    while complying with the __General Data Protection Regulation__ (GDPR),
    by automatically downloading and self-hosting the web font files.

  [data privacy]: https://developers.google.com/fonts/faq/privacy
  [built-in privacy plugin]:../plugins/privacy.md

## Customization

### Additional fonts

If you want to load an (additional) font from another destination or override
the system font, you can use an [additional style sheet] to add the
corresponding `@font-face` definition:

=== ":octicons-file-code-16: `docs/stylesheets/extra.css`"

    ``` css
    @font-face {
      font-family: "<font>";
      src: "...";
    }
    ```

=== ":octicons-file-code-16: `mkdocs.yml`"

    ``` yaml
    extra_css:
      - stylesheets/extra.css
    ```

The font can then be applied to specific elements, e.g. only headlines, or
globally to be used as the site-wide regular or monospaced font:

=== "Regular font"

    ``` css
    :root {
      --md-text-font: "<font>"; /* (1)! */
    }
    ```

    1.  Always define fonts through CSS variables and not `font-family`, as
        this would disable the system font fallback.

=== "Monospaced font"

    ``` css
    :root {
      --md-code-font: "<font>";
    }
    ```

  [additional style sheet]: ../customization.md#additional-css
