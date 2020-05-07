# Icon Sets

With Material 5.0, it is now possible to customize the icons used in the documentation with `.svg` icons. It ships three icon sets, providing over 5k icons:

1. [Material Design icons](https://material.io/resources/icons/)
2. [FontAwesome icons](https://fontawesome.com/icons?d=gallery&m=free)
3. [GitHub's Octicons](https://octicons.github.com/)

However, you can add your own custom icons or third party icon sets to your documentation.

!!! tip
    Because icons are directly inlined into the html, they must be in the `.svg` vector format. If you have a bitmap (e.g. `.png`), you will need to [trace](https://inkscape.org/doc/tutorials/tracing/tutorial-tracing.html) them using [inkscape](https://inkscape.org) or similar tools so that they can be converted to a `.svg` format.

## Goal

With this tutorial, we will add [Bootstrap Icons][bootstrap-icons], a ready-to-use icon set. These icons will be used to customize the icons available in within `mkdocs.yml`, namely `theme.icon` and the social icons `extra.social.icon`. Furthermore, we will configure Material to access these icons from within any markdown file.

## Setup

All icons provided by Material are placed within the [`.icons`][material-icons] folder. Each icon set provided is placed within its own sub-folder to avoid naming conflicts for the same icon name. They are accessible using the relative file name (without extension): `fontawesome/brands/github`.

In order to add the Bootstrap Icons, we will need to extend the theme to gain access to your `.icons` folder. For that, we create an folder `theme` (or any other name) within the project root and specify it as `custom_dir`.

```yaml
theme:
    name: material
    custom_dir: theme
```

!!! warning
    Theme extension may be used for the following use cases:

    1. Overwrite assets locally provided by Material by specifying the exact relative file name (e.g. `.icons/logo.svg`). 
    2. Add custom assets to be discoverable by Material.

    When adding custom assets, please make sure that you do not accidentally overwrite other assets of Material by choosing a unique name for them. A list of provided assets can be found [here](https://github.com/squidfunk/mkdocs-material/tree/master/material).

In order to avoid accidentally overwriting any provided icons, it is recommended to create a unique folder (e.g. `bootstrap`) and place it in the `theme/.icons` folder, so that Material can find the icons.

A fully functional project structure should look like this:

```
docs
    index.md
theme
    .icons
        bootstrap
            *.svg
mkdocs.yml
```

### Embed Icon Sets in Markdown (optional)

To allow Material to access the icons for markdown files, we will use the [pymdownx.emoji extension][emoji-extension] with a custom icon index.

The extension will pick up the provided icon sets on its own. However, since the extension does not have access to your MkDocs environment, it cannot read your customized icons directly. If you have custom icons set specified, please refer to the "Custom Icon Set" tab below.

=== "Default"

    ```yaml
    markdown_extensions:
    - pymdownx.emoji:
        emoji_index: !!python/name:materialx.emoji.twemoji
        emoji_generator: !!python/name:materialx.emoji.to_svg
    ```

=== "Custom Icon Sets"

    ```yaml
    markdown_extensions:
    - pymdownx.emoji:
        emoji_index: !!python/name:materialx.emoji.twemoji
        emoji_generator: !!python/name:materialx.emoji.to_svg
        # Specify the relative path to your theme/.icons folder
        options:
            custom_icons: 
            - theme/.icons
    ```

!!! warning
    Some YAML linters display an error when specifying these python functions in the YAML file. Please do *not* escape them, because then MKDocs will throw an error when building.

## Usage

!!! tip
    You can find all provided icons [here][material-icons]. For easy reference, please refer to the official links to the icon sets.

You can now place any `.svg` icon within your folder `theme/.icons/bootstrap` to make them accessible (e.g. copy over all downloaded [Bootstrap Icons][bootstrap-icons]). They are referenced similar to the provided icon sets.

```yaml
theme:
    name: material
    custom_dir: theme

    icon:
        logo: bootstrap/bootstrap
        repo: bootstrap/archive

extra:
    social:
        - icon: bootstrap/bootstrap-fill
          link: https://getbootstrap.com/
```

If you configured Material to [embed icons in Markdown](#embed-icon-sets-in-markdown-optional), you can simply specify the icon by its path, separated by hyphens: `bootstrap/circle-square.svg` would become `:bootstrap-circle-square:`.

!!! example

    === "Output"

        * :material-account-circle: – Material Design icons
        * :fontawesome-regular-laugh-wink: – FontAwesome icons
        * :octicons-octoface: – GitHub's Octicons
        * <svg class="bi bi-circle-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M0 6a6 6 0 1112 0A6 6 0 010 6z"/><path d="M12.93 5h1.57a.5.5 0 01.5.5v9a.5.5 0 01-.5.5h-9a.5.5 0 01-.5-5v-1.57a6.953 6.953 0 01-1-.22v1.79A1.5 1.5 0 005.5 16h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 4h-1.79c.097.324.17.658.22 1z"/></svg> - Custom Icons

    === "Markdown"
        ``` markdown
        * :material-account-circle: – Material Design icons
        * :fontawesome-regular-laugh-wink: – FontAwesome icons
        * :octicons-octoface: – GitHub's Octicons
        * :bootstrap-circle-square: - Custom Icons
        ```

[bootstrap-icons]: https://icons.getbootstrap.com/
[material-icons]: https://github.com/squidfunk/mkdocs-material/tree/master/material/.icons
[emoji-extension]: https://facelessuser.github.io/pymdown-extensions/extensions/emoji/