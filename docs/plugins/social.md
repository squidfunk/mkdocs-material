---
title: Built-in social plugin
icon: material/share-variant
---


# Built-in social plugin

The social plugin automatically and intelligently generates beautiful and
customizable social cards for each page of your project, rendering as preview
images whenever you or somebody else shares a link to your project on social
media.

## Objective

### How it works

### When to use it

Material for MkDocs can automatically create beautiful social cards for your
documentation, which appear as preview images on social media platforms. You
can select from several [pre-designed layouts][default layouts] or create
custom layouts to match your project's style and branding.

  [default layouts]: #cards_layout

## Features

- :material-smart-card: Automatically generate social cards
- :material-code-tags-check: Automatically add meta tags to pages
- :material-image-edit-outline: Supports entirely custom layouts
- :material-layers: Supports multiple instances
- :material-multicast: Supports concurrency
- ???

@todo: each feature should be linked to a section in the setup docs.

## Installation

The built-in social plugin is included with Material for MkDocs and doesn't
need to be installed. However, in order to automatically create images, it's
necessary to install the [dependencies for image processing][^1], if they're
not already available on your system.

  [^1]:
    The awesome thing about social cards is that they are generated during
    build time and directly distributed with your documentation, no external
    services involved. While it would technically be simpler to generate
    social cards using a web browser and an automation framework like
    [Puppeteer], it would add further liabilities to your toolchain, with the
    potential to make build pipelines more complex and resource intense.

    For this reason, Material for MkDocs again follows its core principle of
    making things as simple and powerful as possible, providing an easy-to-use
    framework for building [custom layouts] using Python image processing
    libraries.

  [dependencies for image processing]: dependencies/image-processing.md
  [Puppeteer]: https://github.com/puppeteer/puppeteer

## Configuration

<!-- md:version 8.5.0 --> ·
<!-- md:flag plugin built-in -->

In order to get started with the built-in social plugin, just add the following
lines to `mkdocs.yml`, and observe how Material for MkDocs generates beautiful
social cards for you:

``` yaml
plugins:
  - social
```

The plugin comes with many options and the ability to create [custom layouts].

!!! info "Differences between [Insiders] and Community Edition"

    <!-- md:version insiders-4.33.0 --> ships an entire rewrite of the built-in
    social plugin, adding support for [custom layouts].

- supports multi instance
- insiders has new features
- explain what a layout is
- Pillow, the imaging library that is used to generate images, understands
several formats for color, including...

  [Insiders]: ../insiders/index.md

### General

The following settings are available:

---

#### `enabled`

<!-- md:version 8.5.0 --> ·
<!-- md:default `true` -->

Use this setting to enable or disable the plugin when [building your project].
If you want to disable the plugin, e.g., for local builds, you can use an
[environment variable][mkdocs.env] in `mkdocs.yml`:

``` yaml
plugins:
  - social:
      enabled: !ENV [CI, false]
```

This configuration enables the plugin only during continuous integration (CI).

  [building your project]: ../creating-your-site.md#building-your-site

---

#### `concurrency`

<!-- md:sponsors --> ·
<!-- md:version insiders-4.33.0 --> ·
<!-- md:default available CPUs - 1 -->

With more CPUs available, the plugin can do more work in parallel, and thus
complete social card generation faster. If you want to disable concurrent
processing completely, use:

``` yaml
plugins:
  - social:
      concurrency: 1
```

By default, the plugin uses all available CPUs - 1 with a minimum of 1.

### Caching

The plugin implements an intelligent caching mechanism, ensuring that social
cards are only re-generated when they're not already contained in the cache or
their contents change. If any of the variables used in a layout changes, the
plugin detects it and re-generates the social card.

The following settings are available for caching:

---

#### `cache`

<!-- md:sponsors --> ·
<!-- md:version insiders-4.33.0 --> ·
<!-- md:default `true` -->

Use this setting to instruct the plugin to bypass the cache, in order to
re-generate social cards for all pages, even though the cache may not be stale.
It's normally not necessary to specify this setting, except for when debugging
the plugin itself. Caching can be disabled with:

``` yaml
plugins:
  - social:
      cache: false
```

---

#### `cache_dir`

<!-- md:version 8.5.0 --> ·
<!-- md:default `.cache/plugin/social` -->

It is normally not necessary to specify this setting, except for when you want
to change the path within your project directory where social card images are
cached. If you want to change it, use:

``` yaml
plugins:
  - social:
      cache_dir: path/to/folder
```

If you're using [multiple instances] of the plugin, it can be a good idea to
set different cache directories for both instances, so that they don't interfere
with each other.

  [built-in social plugin]: #built-in-social-plugin
  [publishing guide]: ../publishing-your-site.md#with-github-actions
  [multiple instances]: #

### Social cards

The following settings are available for social card generation:

---

#### `cards`

<!-- md:version 8.5.0 --> ·
<!-- md:default `true` -->

Use this setting to enable or disable social card generation. Currently, the
plugin's sole purpose is to generate social cards, so it's equivalent to the
[`enabled`][enabled] setting, but in the future, other features might be added.
If you want to disable social card generation, use:

``` yaml
plugins:
  - social:
      cards: false
```

  [enabled]: #enabled

---

#### `cards_dir`

<!-- md:version 8.5.0 --> ·
<!-- md:default `assets/images/social` -->

It is normally not necessary to specify this setting, except for when you want
to change the path within your [`site` directory][site_dir] from which social
cards are served. If you want to change it, use:

``` yaml
plugins:
  - social:
      cards_dir: path/to/folder
```

This configuration copies the generated images to `site/path/to/folder`.

  [site_dir]: https://www.mkdocs.org/user-guide/configuration/#site_dir

---

#### `cards_layout_dir`

<!-- md:sponsors --> ·
<!-- md:version insiders-4.33.0 --> ·
<!-- md:default `layouts` -->

If you want to build a [custom social card layout][custom layouts], use this
setting to change the folder where you store your custom layouts, the default
being a foldercalled `layouts` in your project directory:

``` yaml
plugins:
  - social:
      cards_layout_dir: layouts
```

The provided path is resolved from the project directory.

!!! tip "Where to store custom layouts?"

    Our recommendation is to locate the folder outside of the
    [`docs` directory][mkdocs.docs_dir], to make sure that your [custom layouts] are
    not copied to the [`site` directory][site_dir] when [building your project],
    e.g., by adhering to the following directory layout:

    ``` { .sh .no-copy }
    .
    ├─ docs/
    │  └─ *.md
    ├─ layouts/
    │  └─ *.yml
    └─ mkdocs.yml
    ```

  [custom layouts]: ../setup/setting-up-social-cards.md#customization

---

#### `cards_layout`

<!-- md:sponsors --> ·
<!-- md:version insiders-4.33.0 --> ·
<!-- md:default `default` -->

The plugin includes several layouts for social cards, all of which are prefixed
with `default`. If you've created a [custom social card layout][custom layouts],
you can instruct the plugin to use it with:

``` yaml
plugins:
  - social:
      cards_layout: my-custom-layout
```

By default, the plugin will load your [custom layouts] from a folder named
`layouts` in your project directory. If your layout is called `my-custom-layout`,
the directory layout should be like:

``` { .sh .no-copy }
.
├─ docs/
│  └─ *.md
├─ layouts/
│  └─ my-custom-layout.yml
└─ mkdocs.yml
```

The folder can be changed via [`cards_layout_dir`][cards_layout_dir] to any
folder or subfolder.

  [cards_layout_dir]: #cards_layout_dir

---

#### `cards_layout_options`

<!-- md:version 9.1.10 --> ·
<!-- md:default none -->

Use this setting to set options for the layout specified via
[`cards_layout`][cards_layout] (if the layout supports it), which allows for
making layouts easily and entirely configurable:

``` yaml
plugins:
  - social:
      cards_layout_options:
        <key>: <value>
```

When creating a [custom layout][custom layouts], you are completely free in
defining which parts of your layout can be configured. All
[`default`][default layouts] layouts included with the plugin support the
following options:

- `background_color`
- `background_image`
- `color`
- `font_family`

  [cards_layout]: #cards_layout

---

#### `cards_include`

<!-- md:sponsors --> ·
<!-- md:version insiders-4.35.0 --> ·
<!-- md:default none -->

Use this setting to enable social card generation for subsections of your
project, e.g., when using [multiple instances] of the plugin to generate
different social cards for different subsections:

``` yaml
plugins:
  - social:
      cards_include:
        - blog/*
```

This configuration will enable social card generation for all pages that are
contained in the `blog` folder and its subfolders inside your [`docs` directory]
[mkdocs.docs_dir].

---

#### `cards_exclude`

<!-- md:sponsors --> ·
<!-- md:version insiders-4.35.0 --> ·
<!-- md:default none -->

Use this setting to disable social card generation for subsections of your
project, e.g., when using [multiple instances] of the plugin to generate
different social cards for different subsections:

``` yaml
plugins:
  - social:
      cards_include:
        - changelog/*.md
```

This configuration will disable social card generation for all pages that are
contained in the `changelog` folder inside your
[`docs` directory][mkdocs.docs_dir].

  [primary color]: ../setup/changing-the-colors.md#primary-color
  [accent color]: ../setup/changing-the-colors.md#accent-color
  [font]: ../setup/changing-the-fonts.md#regular-font
  [Google Fonts]: https://fonts.google.com/
  [CSS color keyword]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#color_keywords

### Debugging

The plugin includes a special mode for debugging layouts, which is very useful
when creating [custom layouts], as it allows for quicker iteration and better
understanding of composition.

The following settings are available for debugging:

---

#### `debug`

<!-- md:sponsors --> ·
<!-- md:version insiders-4.33.0 --> ·
<!-- md:default `false` -->

Use this setting to enable a special mode for debugging your layout, which
renders each layer with a colored outline and its `x` and `y` offsets, and
overlays a dot grid for alignment, so it's easier to understand how the
distinct layers of your layout are composed together:

``` yaml
plugins:
  - social:
      debug: true
```

---

#### `debug_on_build`

<!-- md:sponsors --> ·
<!-- md:version insiders-4.34.1 --> ·
<!-- md:default `false` -->

By default, the plugin automatically disables [`debug`][debug] mode when
[building your project], so you can be sure that debug overlays are never
deployed to production. If you want to change it, use:

``` yaml
plugins:
  - social:
      debug_on_build: true
```

It's normally not necessary to change this setting, as it's just intended to
be a safety net.

  [debug]: #debug

---

#### `debug_grid`

<!-- md:sponsors --> ·
<!-- md:version insiders-4.33.0 --> ·
<!-- md:default `true` -->

When [`debug`][debug] mode is enabled, this setting specifies whether a dot grid
is rendered on top of all layers, to allow for better alignment. If you want to
switch the grid off, use:

``` yaml
plugins:
  - social:
      debug_grid: false
```

---

#### `debug_grid_step`

<!-- md:sponsors --> ·
<!-- md:version insiders-4.33.0 --> ·
<!-- md:default `32` -->

Use this setting to specify the step size of the dot grid in pixels, if enabled,
which can be useful to create perfectly aligned layers for ideal composition.
It you want to change it, use:

``` yaml
plugins:
  - social:
      debug_grid_step: 64
```

---

#### `debug_color`

<!-- md:sponsors --> ·
<!-- md:version insiders-4.33.0 --> ·
<!-- md:default `grey` -->

Use this setting to specify the color of the outlines that are added to each
layer and the dot grid that is rendered on top of all layers. If you need to
change it, use:

``` yaml
plugins:
  - social:
      debug_color: yellow
```

It might be necessary to change this setting if the dot grid or the outlines
are hard to distinguish.

### Deprecations

The following settings have been available, but are now deprecated:

---

#### `cards_color`

<!-- md:version 8.5.0 --> ·
<!-- md:flag deprecated use [`cards_layout_options`][cards_layout_options] --> ·
<!-- md:default [`theme.palette.primary`][primary color] -->

Use this setting to change the background `fill` and foreground `text` colors
for the [`default`][default layouts] layouts (doesn't apply to
[custom layouts]) that are included with the plugin:

=== "Old configuration"

    ``` yaml
    plugins:
      - social:
          cards_color:
            fill: "#0FF1CE"
            text: "#FFFFFF"
    ```

=== "New configuration"

    ``` yaml
    plugins:
      - social:
          cards_layout_options:
            background_color: "#0FF1CE"
            color: "#FFFFFF"
    ```

  [cards_layout_options]: #cards_layout_options

---

#### `cards_font`

<!-- md:version 8.5.0 --> ·
<!-- md:flag deprecated use [`cards_layout_options`][cards_layout_options] --> ·
<!-- md:default [`theme.font.text`][font] -->

Use this setting to change the font (automatically fetched from [Google Fonts])
for the [`default`][default layouts] layouts (doesn't apply to
[custom layouts][custom social card layout]) that are included with the plugin:

``` yaml
plugins:
  - social:
      cards_font: Ubuntu
```

## Usage

### Metadata

Blabla

---

#### `cards`

<!-- md:sponsors --> ·
<!-- md:version insiders-4.37.0 --> ·
<!-- md:flag metadata --> ·
<!-- md:flag experimental -->

---

#### `cards_layout`

<!-- md:sponsors --> ·
<!-- md:version insiders-4.37.0 --> ·
<!-- md:flag metadata --> ·
<!-- md:flag experimental -->

---

#### `cards_layout_options`

<!-- md:sponsors --> ·
<!-- md:version insiders-4.37.0 --> ·
<!-- md:flag metadata --> ·
<!-- md:flag experimental -->

HOLA
