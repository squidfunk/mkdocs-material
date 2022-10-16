---
template: overrides/main.html
icon: material/emoticon-happy-outline
---

# Icons, Emojis

One of the best features of Material for MkDocs is the possibility to use [more
than 8,000 icons][icon search] and thousands of emojis in your project 
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
  - attr_list
  - pymdownx.emoji:
      emoji_index: !!python/name:materialx.emoji.twemoji
      emoji_generator: !!python/name:materialx.emoji.to_svg
```

The following icon sets are bundled with Material for MkDocs:

- :material-material-design: – [Material Design]
- :fontawesome-brands-font-awesome: – [FontAwesome]
- :octicons-mark-github-16: – [Octicons]

See additional configuration options:

- [Attribute Lists]
- [Emoji]
- [Emoji with custom icons]

  [Material Design]: https://materialdesignicons.com/
  [FontAwesome]: https://fontawesome.com/search?m=free
  [Octicons]: https://octicons.github.com/
  [Attribute Lists]: ../setup/extensions/python-markdown.md#attribute-lists
  [Emoji]: ../setup/extensions/python-markdown-extensions.md#emoji
  [Emoji with custom icons]: ../setup/extensions/python-markdown-extensions.md#custom-icons

## Usage

### Using emojis

Emojis can be integrated in Markdown by putting the shortcode of the emoji
between two colons. If you're using [Twemoji] (recommended), you can look up
the shortcodes at [Emojipedia]:

``` title="Emoji"
:smile: 
```

<div class="result" markdown>

:smile:

</div>

  [Twemoji]: https://twemoji.twitter.com/
  [Emojipedia]: https://emojipedia.org/twitter/

### Using icons

When [Emoji] is enabled, icons can be used similar to emojis, by referencing
a valid path to any icon bundled with the theme, which are located in the
[`.icons`][custom icons] directory, and replacing `/` with `-`:

``` title="Icon"
:fontawesome-regular-face-laugh-wink:
```

<div class="result" markdown>

:fontawesome-regular-face-laugh-wink:

</div>

  [custom icons]: https://github.com/squidfunk/mkdocs-material/tree/master/material/.icons

#### with colors

When [Attribute Lists] is enabled, custom CSS classes can be added to icons by
suffixing the icon with a special syntax. While HTML allows to use [inline
styles], it's always recommended to add an [additional style sheet] and move
declarations into dedicated CSS classes:

<style>
  .twitter {
    color: #1DA1F2;
  }
</style>

=== ":octicons-file-code-16: docs/stylesheets/extra.css"

    ``` css
    .twitter {
      color: #1DA1F2;
    }
    ```

=== ":octicons-file-code-16: mkdocs.yml"

    ``` yaml
    extra_css:
      - stylesheets/extra.css
    ```

After applying the customization, add the CSS class to the icon shortcode:

``` markdown title="Icon with color"
:fontawesome-brands-twitter:{ .twitter }
```

<div class="result" markdown>

:fontawesome-brands-twitter:{ .twitter }

</div>

  [Attribute Lists]: ../setup/extensions/python-markdown.md#attribute-lists
  [inline styles]: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/style
  [additional style sheet]: ../customization.md#additional-css

#### with animations

Similar to adding [colors], it's just as easy to add [animations] to icons by
using an [additional style sheet], defining a `@keyframes` rule and adding a
dedicated CSS class to the icon:

=== ":octicons-file-code-16: docs/stylesheets/extra.css"

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

=== ":octicons-file-code-16: mkdocs.yml"

    ``` yaml
    extra_css:
      - stylesheets/extra.css
    ```

After applying the customization, add the CSS class to the icon shortcode:

``` markdown title="Icon with animation"
:octicons-heart-fill-24:{ .heart }
```

<div class="result" markdown>

:octicons-heart-fill-24:{ .mdx-heart }

</div>

  [colors]: #with-colors
  [animations]: https://developer.mozilla.org/en-US/docs/Web/CSS/animation

## Customization

### Using icons in templates

When you're [extending the theme] with partials or blocks, you can simply
reference any icon that's [bundled with the theme][icon search] with Jinja's
[`include`][include] function and wrap it with the `.twemoji` CSS class:

``` html
<span class="twemoji">
  {% include ".icons/fontawesome/brands/twitter.svg" %} <!-- (1)! -->
</span>
```

1.  Enter a few keywords to find the perfect icon using our [icon search] and
    click on the shortcode to copy it to your clipboard:

    <div class="mdx-iconsearch" data-mdx-component="iconsearch">
      <input class="md-input md-input--stretch mdx-iconsearch__input" placeholder="Search icon" data-mdx-component="iconsearch-query" value="brands twitter" />
      <div class="mdx-iconsearch-result" data-mdx-component="iconsearch-result" data-mdx-mode="file">
        <div class="mdx-iconsearch-result__meta"></div>
        <ol class="mdx-iconsearch-result__list"></ol>
      </div>
    </div>

This is exactly what Material for MkDocs does in its templates.

  [extending the theme]: ../customization.md#extending-the-theme
  [include]: https://jinja.palletsprojects.com/en/2.11.x/templates/#include
