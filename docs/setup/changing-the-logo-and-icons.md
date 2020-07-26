---
template: overrides/main.html
---

# Changing the logo and icons

When installing Material for MkDocs, you immediately get access to _over 7.000 
icons_ ready to be used for customization of specific parts of the theme and/or 
when writing your documentation in Markdown. Not enough? You can also [add
additional icons][1] with minimal effort.

  [1]: #additional-icons

## Configuration

### Logo

[:octicons-file-code-24: Source][2] ·
:octicons-milestone-24: Default: `material/library`

There're two ways to specify a _logo_: it must be a valid path to [any icon 
bundled with the theme][3], or to a user-provided image located in the `docs`
folder. Both can be set via `mkdocs.yml`:

=== "Icon"

    ``` yaml
    theme:
      icon:
        logo: material/library
    ```

=== "Image"

    ``` yaml
    theme:
      logo: assets/logo.png
    ```

  [2]: https://github.com/squidfunk/mkdocs-material/blob/master/src/partials/logo.html
  [3]: https://github.com/squidfunk/mkdocs-material/tree/master/material/.icons

### Favicon

[:octicons-file-code-24: Source][4] ·
:octicons-milestone-24: Default: `assets/images/favicon.png`

The _favicon_ can be changed to a path pointing to a user-provided image, which 
must be located in the `docs` folder. It can be set via `mkdocs.yml`:

``` yaml
theme:
  favicon: images/favicon.png
```

  [4]: https://github.com/squidfunk/mkdocs-material/blob/master/src/base.html#L71

### Icons

[:octicons-file-code-24: Source][3] · [:octicons-workflow-24: Extension][5]

The [Emoji][5] extension, which is part of [Python Markdown Extensions][6],
adds the ability to __integrate icons__ in the `*.svg` file format, which are
inlined when [building your site][7]:

``` yaml
markdown_extensions:
  - pymdownx.emoji:
      emoji_index: !!python/name:materialx.emoji.twemoji
      emoji_generator: !!python/name:materialx.emoji.to_svg
```

The following icon sets are bundled with Material for MkDocs:

* :material-material-design: – [Material Design][8]
* :fontawesome-brands-font-awesome-flag: – [FontAwesome][9]
* :octicons-mark-github-16: – [Octicons][10]

If you want to add [additional icons][1], read on.

  [5]: https://facelessuser.github.io/pymdown-extensions/extensions/emoji/
  [6]: https://facelessuser.github.io/pymdown-extensions/
  [7]: ../creating-your-site.md#building-your-site
  [8]: https://materialdesignicons.com/
  [9]: https://fontawesome.com/icons?d=gallery&m=free
  [10]: https://octicons.github.com/

## Customization

### Additional icons

[:octicons-file-code-24: Source][3] · 
:octicons-mortar-board-24: Difficulty: _moderate_

In order to add additional icons, [extend the theme][11], and create a folder
named `.icons` in the [`custom_dir`][12] you want to use for overrides. Next,
add your `*.svg` icons into a subfolder of the `.icons` folder. Let's say you 
downloaded and unpacked the [Bootstrap][13] icon set, and want to add it to
your project documentation. The structure of your project should look like this:

``` sh
.
├─ docs/
│  └─ index.md
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
      emoji_index: !!python/name:materialx.emoji.twemoji
      emoji_generator: !!python/name:materialx.emoji.to_svg
      options:
        custom_icons:
          - overrides/.icons
```

You should now be able to use the :fontawesome-brands-bootstrap: Bootstrap
icons.

  [11]: ../customization.md#extending-the-theme
  [12]: https://www.mkdocs.org/user-guide/configuration/#custom_dir
  [13]: https://icons.getbootstrap.com/
