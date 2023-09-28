# Changing the logo and icons

When installing Material for MkDocs, you immediately get access to _over 8,000
icons_ ready to be used for customization of specific parts of the theme and/or
when writing your documentation in Markdown. Not enough? You can also add
[additional icons] with minimal effort.

  [additional icons]: #additional-icons

## Configuration

### Logo

<!-- md:version 0.1.0 -->
<!-- md:default `material/library` -->

The logo can be changed to a user-provided image (any type, incl. `*.png` and
`*.svg`) located in the `docs` folder, or to any icon bundled with the theme.
Add the following lines to `mkdocs.yml`:

=== ":octicons-image-16: Image"

    ``` yaml
    theme:
      logo: assets/logo.png
    ```

=== ":octicons-package-16: Icon, bundled"

    ``` yaml
    theme:
      icon:
        logo: material/library # (1)!
    ```

    1.  Enter a few keywords to find the perfect icon using our [icon search] and
        click on the shortcode to copy it to your clipboard:

        <div class="mdx-iconsearch" data-mdx-component="iconsearch">
          <input class="md-input md-input--stretch mdx-iconsearch__input" placeholder="Search icon" data-mdx-component="iconsearch-query" value="material library" />
          <div class="mdx-iconsearch-result" data-mdx-component="iconsearch-result" data-mdx-mode="file">
            <div class="mdx-iconsearch-result__meta"></div>
            <ol class="mdx-iconsearch-result__list"></ol>
          </div>
        </div>

  [icon search]: ../reference/icons-emojis.md#search

Normally, the logo in the header and sidebar links to the homepage of the
documentation, which is the same as `site_url`. This behavior can be changed
with the following configuration:

``` yaml
extra:
  homepage: https://example.com
```

### Favicon

<!-- md:version 0.1.0 -->
<!-- md:default [`assets/images/favicon.png`][Favicon default] -->

The favicon can be changed to a path pointing to a user-provided image, which
must be located in the `docs` folder. Add the following lines to `mkdocs.yml`:

``` yaml
theme:
  favicon: images/favicon.png
```

  [Favicon default]: https://github.com/squidfunk/mkdocs-material/blob/master/material/assets/images/favicon.png

### Site icons

[:octicons-tag-24: 9.2.0][Site icon support]

Most icons you see on your site, such as navigation icons, can also be changed. For example,
to change the navigation arrows in the footer, add the following lines to `mkdocs.yml`:

```yaml
theme:
  icon:
    previous: fontawesome/solid/angle-left
    next: fontawesome/solid/angle-right
```

The following is a complete list of customizable icons used by the theme:

| Icon name    | Purpose                                                                       |
|:-------------|:------------------------------------------------------------------------------|
| `logo`       | See [Logo](#logo)                                                             |
| `menu`       | Open drawer                                                                   |
| `alternate`  | Change language                                                               |
| `search`     | Search icon                                                                   |
| `share`      | Share search                                                                  |
| `close`      | Reset search, dismiss announcements                                           |
| `top`        | Back-to-top button                                                            |
| `edit`       | Edit current page                                                             |
| `view`       | View page source                                                              |
| `repo`       | Repository icon                                                               |
| `admonition` | See [Admonition icons](../reference/admonitions.md#admonition-icons)          |
| `tag`        | See [Tag icons and identifiers](setting-up-tags.md#tag-icons-and-identifiers) |
| `previous`   | Previous page in footer, hide search on mobile                                |
| `next`       | Next page in footer                                                           |

  [Site icon support]: https://github.com/squidfunk/mkdocs-material/releases/tag/9.2.0

## Customization

### Additional icons

In order to use custom icons, [extend the theme] and create a new folder named
`.icons` in the [`custom_dir`][custom_dir] you want to use for overrides.
Next, add your `*.svg` icons into a subfolder of the `.icons` folder. Let's say
you downloaded and unpacked the [Bootstrap] icon set, and want to add it to
your project documentation. The structure of your project should look like this:

``` { .sh .no-copy }
.
├─ overrides/
│  └─ .icons/
│     └─ bootstrap/
│        └─ *.svg
└─ mkdocs.yml
```

Then, add the following lines to `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.emoji:
      emoji_index: !!python/name:material.extensions.emoji.twemoji
      emoji_generator: !!python/name:material.extensions.emoji.to_svg
      options:
        custom_icons:
          - overrides/.icons
```

You can now use all :fontawesome-brands-bootstrap: Bootstrap icons anywhere in
Markdown files, as well as everywhere icons can be used in `mkdocs.yml`.
However, note that the syntaxes are slightly different:

- __Using icons in configuration__: take the path of the `*.svg` icon file
  starting at the `.icons` folder and drop the file extension, e.g. for
  `.icons/bootstrap/envelope-paper.svg`, use:

    ``` yaml
    theme:
      icon:
        logo: bootstrap/envelope-paper
    ```

- __Using icons in Markdown files__: additionally to taking the path from the
  `.icons` folder as noted above, replace all `/` with `-` and enclose the icon
  shortcode in two colons:

    ```
    :bootstrap-envelope-paper:
    ```

For further notes on icon usage, please consult the [icon reference].

  [extend the theme]: ../customization.md#extending-the-theme
  [custom_dir]: https://www.mkdocs.org/user-guide/configuration/#custom_dir
  [Bootstrap]: https://icons.getbootstrap.com/
  [icon reference]: ../reference/icons-emojis.md#using-icons
