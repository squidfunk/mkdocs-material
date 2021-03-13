---
template: overrides/main.html
---

# Icons + Emojis

One of the best features of Material for MkDocs is the possibility to use [more
than 8.000 icons][1] and thousands of emojis in your project documentation
with practically zero additional effort. Furthermore, custom icons can be added
and used in `mkdocs.yml`, documents and templates.

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
  **Tip:** Enter some keywords to find the perfect icon or emoji and click on
  the shortcode to copy it to your clipboard.
</small>

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

- :material-material-design: – [Material Design][6]
- :fontawesome-brands-font-awesome-flag: – [FontAwesome][7]
- :octicons-mark-github-16: – [Octicons][8]

You can also add [additional icons][9]. When using emojis, it's recommended to
consult the official documentation of [Python Markdown Extensions][3] to learn
about configuration options.

  [1]: icons-emojis.md#search
  [2]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/stylesheets/main/extensions/pymdownx/_emoji.scss
  [3]: https://facelessuser.github.io/pymdown-extensions/extensions/emoji/
  [4]: https://facelessuser.github.io/pymdown-extensions/
  [5]: ../creating-your-site.md#building-your-site
  [6]: https://materialdesignicons.com/
  [7]: https://fontawesome.com/icons?d=gallery&m=free
  [8]: https://octicons.github.com/
  [9]: ../setup/changing-the-logo-and-icons.md#additional-icons

### Attribute List

The [Attribute List][10] extension, which is part of the standard Markdown
library, allows to __add HTML attributes and CSS classes to Markdown elements__,
and can be enabled via `mkdocs.yml`

``` yaml
markdown_extensions:
  - attr_list
```

  [10]: https://python-markdown.github.io/extensions/attr_list/

## Usage

### Using emojis

Emojis can be integrated in Markdown by putting the shortcode of the emoji
between two colons. If you're using [Twemoji][11] (recommended), you can look up
the shortcodes at [Emojipedia][12].

_Example_:

```
:smile: 
```

_Result_:

:smile:

  [11]: https://twemoji.twitter.com/
  [12]: https://emojipedia.org/twitter/

### Using icons

When [Emoji][13] is enabled, icons can be used similar to emojis, by referencing
a valid path to any icon bundled with the theme, which are located in the
[`.icons`][1] directory, and replacing `/` with `-`:

_Example_:

```
- :material-account-circle: – `.icons/material/account-circle.svg`
- :fontawesome-regular-laugh-wink: – `.icons/fontawesome/regular/laugh-wink.svg`
- :octicons-octoface-24: – `.icons/octicons/octoface-24.svg`
```

_Result_:

- :material-account-circle: – [`.icons/material/account-circle.svg`][14]
- :fontawesome-regular-laugh-wink: – [`.icons/fontawesome/regular/laugh-wink.svg`][15]
- :octicons-octoface-24: – [`.icons/octicons/octoface-24.svg`][16]

  [13]: #emoji
  [14]: https://raw.githubusercontent.com/squidfunk/mkdocs-material/master/material/.icons/material/account-circle.svg
  [15]: https://raw.githubusercontent.com/squidfunk/mkdocs-material/master/material/.icons/fontawesome/regular/laugh-wink.svg
  [16]: https://raw.githubusercontent.com/squidfunk/mkdocs-material/master/material/.icons/octicons/octoface-24.svg

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
