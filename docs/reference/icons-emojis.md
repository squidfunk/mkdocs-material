---
template: overrides/main.html
---

# Icons + Emojis

One of the best features of Material for MkDocs is the possibility to use [more
than 8.000 icons][icon search] and thousands of emojis in your project 
documentation with practically zero additional effort. Moreover, custom icons 
can be added and used in `mkdocs.yml`, documents and templates.

  [icon search]: #search

## Search

<div class="mdx-iconsearch" data-mdx-component="iconsearch">
  <input
    class="md-input md-input--stretch mdx-iconsearch__input"
    placeholder="Search the icon and emoji database"
    data-mdx-component="iconsearch-query"
  />
  <div class="mdx-iconsearch-result" data-mdx-component="iconsearch-result">
    <div class="mdx-iconsearch-result__meta"></div>
    <ol class="mdx-iconsearch-result__list"></ol>
  </div>
</div>
<small>
  :octicons-light-bulb-16:
  **Tip:** Enter some keywords to find icons and emojis and click on the
  shortcode to copy it to your clipboard.
</small>

## Configuration

This configuration enables the use of icons and emojis by using simple
shortcodes which can be discovered through the [icon search]. Add the following
lines to `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.emoji:
      emoji_index: !!python/name:materialx.emoji.twemoji
      emoji_generator: !!python/name:materialx.emoji.to_svg
```

The following icon sets are bundled with Material for MkDocs:

- :material-material-design: – [Material Design]
- :fontawesome-brands-font-awesome: – [FontAwesome]
- :octicons-mark-github-16: – [Octicons]

See additional configuration options:

- [Emoji]
- [Emoji with custom icons]

  [Material Design]: https://materialdesignicons.com/
  [FontAwesome]: https://fontawesome.com/icons?d=gallery&m=free
  [Octicons]: https://octicons.github.com/
  [additional icons]: ../setup/changing-the-logo-and-icons.md#additional-icons
  [Emoji]: ../setup/extensions/python-markdown-extensions.md#emoji
  [Emoji with custom icons]: ../setup/extensions/python-markdown-extensions.md#custom_icons

## Usage

### Using emojis

Emojis can be integrated in Markdown by putting the shortcode of the emoji
between two colons. If you're using [Twemoji] (recommended), you can look up
the shortcodes at [Emojipedia].

_Example_:

```
:smile: 
```

_Result_:

:smile:

  [Twemoji]: https://twemoji.twitter.com/
  [Emojipedia]: https://emojipedia.org/twitter/

### Using icons

When [Emoji] is enabled, icons can be used similar to emojis, by referencing
a valid path to any icon bundled with the theme, which are located in the
[`.icons`][1] directory, and replacing `/` with `-`:

_Example_:

```
- :material-account-circle: – `.icons/material/account-circle.svg`
- :fontawesome-regular-laugh-wink: – `.icons/fontawesome/regular/laugh-wink.svg`
- :octicons-repo-push-16: – `.icons/octicons/repo-push-16.svg`
```

_Result_:

- :material-account-circle: – [`.icons/material/account-circle.svg`][14]
- :fontawesome-regular-laugh-wink: – [`.icons/fontawesome/regular/laugh-wink.svg`][15]
- :octicons-repo-push-16: – [`.icons/octicons/repo-push-16.svg`][16]

  [14]: https://raw.githubusercontent.com/squidfunk/mkdocs-material/master/material/.icons/material/account-circle.svg
  [15]: https://raw.githubusercontent.com/squidfunk/mkdocs-material/master/material/.icons/fontawesome/regular/laugh-wink.svg
  [16]: https://raw.githubusercontent.com/squidfunk/mkdocs-material/master/material/.icons/octicons/repo-push-16.svg

#### with colors

When the [Attribute List][17] extension is enabled, custom CSS classes and
attributes can be added to icons by suffixing the icon with a special syntax.
While HTML and CSS allow to use [inline styles][18], it's always best to add
an [additional stylesheet][19] and put styles into dedicated CSS classes:

``` css
.medium {
  color: #00AB6C;
}
.twitter {
  color: #1DA1F2;
}
.facebook {
  color: #4267B2;
}
```

Then, simply add the CSS class to the icon.

<style>
  .medium {
    color: #00AB6C;
  }
  .twitter {
    color: #1DA1F2;
  }
  .facebook {
    color: #4267B2;
  }
</style>

_Example_:

``` markdown
- :fontawesome-brands-medium:{ .medium } – Medium
- :fontawesome-brands-twitter:{ .twitter } – Twitter
- :fontawesome-brands-facebook:{ .facebook } – Facebook
```

_Result_:

- :fontawesome-brands-medium:{ .medium } – Medium
- :fontawesome-brands-twitter:{ .twitter } – Twitter
- :fontawesome-brands-facebook:{ .facebook } – Facebook

  [17]: #attribute-list
  [18]: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/style
  [19]: ../customization.md#additional-css

#### with animations

Similar to adding [colors][20], it's just as easy to add [CSS animations][21] to
icons by using an [additional stylesheet][6], defining a `#!css @keyframes` rule
and adding the dedicated CSS class to the icon:

``` css
@keyframes heart {
  0%, 40%, 80%, 100% {
    transform: scale(1);
  }
  20%, 60% {
    transform: scale(1.15);
  }
}
.heart {
  animation: heart 1000ms infinite;
}
```

Then, simply add the CSS class to the icon.

_Example_:

``` markdown
:octicons-heart-fill-24:{ .heart }
```

_Result_:

:octicons-heart-fill-24:{ .mdx-heart }

  [20]: #with-colors
  [21]: https://developer.mozilla.org/en-US/docs/Web/CSS/animation

## Customization

### Using icons in templates

When you're [extending the theme][22] with partials or blocks, you can simply
reference any icon that's [bundled with the theme][1] with Jinja's
[`include`][23] function and wrap it with the `twemoji` class:

``` html
<span class="twemoji">
  {% include ".icons/fontawesome/brands/twitter.svg" %}
</span>
```

This is exactly what Material for MkDocs does in its templates.

  [22]: ../customization.md#extending-the-theme
  [23]: https://jinja.palletsprojects.com/en/2.11.x/templates/#include
