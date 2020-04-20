# Icon Sets

With Material 5.0, it is now possible to customize the icons used in the documentation with `.svg` icons. It ships three icon sets, providing over 5k icons:

1. [Material Design icons](https://material.io/resources/icons/)
2. [FontAwesome icons](https://fontawesome.com/icons?d=gallery&m=free)
3. [GitHub's Octicons](https://octicons.github.com/)

However, you can add your own custom icons or third party icon sets to your documentation.

!!! tip
    Because icons are directly inlined into the html, they must be in the `.svg` vector format. If you have a bitmap (e.g. `.png`), you will need to [trace](https://inkscape.org/doc/tutorials/tracing/tutorial-tracing.html) them using [inkscape](https://inkscape.org) or similar tools so that they can be converted to a `.svg` format.

## Goal

With this tutorial, we will add [Bootstrap Icons][bootstrap-icons], a ready-to-use icon set. These icons will be used to customize the icons available in within `mkdocs.yml`, namely `theme.icon` and the social icons `extra.social.icon`.

## Setup

All icons provided by Material are placed within the `.icons` folder. Each icon set provided is placed within its own sub-folder to avoid naming conflicts for the same icon name. They are accessible using the relative file name (without extension): `fontawesome/brands/github`.

In order to add the Bootstrap Icons, we will need to extend the theme to gain access to the `.icons` folder. For that, we create an folder `theme` (or any other name) within the project root and specify it as `custom_dir`.

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

## Usage

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

[bootstrap-icons]: https://icons.getbootstrap.com/