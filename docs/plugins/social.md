---
title: Built-in social plugin
icon: material/share-circle
---

# Built-in social plugin

The social plugin automatically and intelligently generates beautiful and highly
customizable social cards in different [layouts][default layouts] for each page
of your project, rendering as preview images whenever you or somebody else share
a link to your project on social media.

## Objective

### How it works

The plugin automatically generates a customizable social card for each page
of your project, which appears as a preview image when sharing a link to your
project on social media, without the use of external services and just
[a single line of configuration][configuration].

With the use of an efficient [image processing] library, the plugin allows to
define [custom layouts] for social cards, which can be adapted to match your
project's style and branding. While it would technically be much simpler to
generate social cards by using a web browser and an automation framework like
[Puppeteer][^1], it would add further liabilities to your toolchain, with the
potential to make build pipelines more complex, much more resource intense,
and significantly slower.

  [^1]:
    [GitHub wrote in their blog] that they use [Puppeteer] to generate social
    card images for repositories, issues, commits, discussions, and basically
    everything else that appear as preview images when shared on social media.

The generated social cards are [cached] and stored in the
[`site` directory][mkdocs.site_dir], and thus self-hosted, ensuring that your
project doesn't depend on external services. In order to generate social cards
images, a few [dependencies] need to be available on your system.

  [configuration]: #configuration
  [image processing]: requirements/image-processing.md
  [custom layouts]: ../setup/setting-up-social-cards.md#customization
  [Puppeteer]: https://github.com/puppeteer/puppeteer
  [GitHub wrote in their blog]: https://github.blog/2021-06-22-framework-building-open-graph-images/
  [cached]: #caching
  [dependencies]: #configuration

### When to use it

There's one particular case when we don't recommend to use the plugin: when you
build [offline-capable documentation] to offer it as a download. Otherwise, it
always makes sense to enable the plugin, as links to your documentation shared
on social media will appear much more appealing.

Even more interestingly, the plugin can be combined with other built-in plugins
that Material for MkDocs offers, in order to create sophisticated build
pipelines tailored to your project:

<div class="grid cards" markdown>

-   :material-newspaper-variant-outline: &nbsp; __[Built-in blog plugin][blog]__

    ---

    The social plugin automatically generates beautiful and customizable
    social cards for each post and page, showing as previews on social media.

    ---

    __Links to your blog render beautiful social cards when shared on social media__

-   :material-file-tree: &nbsp; __[Built-in meta plugin][meta]__

    ---

    The meta plugin can be used to [change the layout][meta.social.cards_layout]
    for social cards or [change specific layout options]
    [meta.social.cards_layout_options] like [background][option.background_color]
    or [color][option.color] for a subset of pages.

    ---

    __Your documentation can use completely different social cards per section__

</div>

  [offline-capable documentation]: ../setup/building-for-offline-usage.md
  [blog]: blog.md
  [meta]: meta.md

## Configuration

<!-- md:version 8.5.0 -->
<!-- md:plugin [social] – built-in -->
<!-- md:flag multiple -->
<!-- md:flag experimental -->

In order to get started with the social plugin, just add the following lines to
`mkdocs.yml`, and observe how Material for MkDocs generates beautiful social
cards for you:

``` yaml
plugins:
  - social
```

The social plugin is built into Material for MkDocs and doesn't need to be
installed.

However, in order to generate social card images, it's necessary to install the
dependencies for [image processing], if they're not already available on your
system. The linked guide includes instructions for several operating systems
and mentions some alternative environments.

  [social]: social.md

### General

The following settings are available:

---

#### <!-- md:setting config.enabled -->

<!-- md:version 8.5.0 -->
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

#### <!-- md:setting config.concurrency -->

<!-- md:sponsors -->
<!-- md:version insiders-4.33.0 -->
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

The plugin implements an [intelligent caching] mechanism, ensuring that social
cards are only regenerated when their contents change or they're not already
contained in the cache. If any of the variables used in a layout changes, the
plugin detects it and regenerates the social card.

The following settings are available for caching:

  [intelligent caching]: requirements/caching.md

---

#### <!-- md:setting config.cache -->

<!-- md:sponsors -->
<!-- md:version insiders-4.33.0 -->
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

#### <!-- md:setting config.cache_dir -->

<!-- md:version 8.5.0 -->
<!-- md:default `.cache/plugin/social` -->

It is normally not necessary to specify this setting, except for when you want
to change the path within your root directory where social card images are
cached. If you want to change it, use:

``` yaml
plugins:
  - social:
      cache_dir: my/custom/dir
```

If you're using [multiple instances] of the plugin, it can be a good idea to
set different cache directories for both instances, so that they don't interfere
with each other.

  [multiple instances]: index.md#multiple-instances

### Logging

The following settings are available for logging:

---

#### <!-- md:setting config.log -->

<!-- md:sponsors -->
<!-- md:version insiders-4.40.2 -->
<!-- md:default `true` -->

Use this setting to control whether the plugin should only log errors when
generating social cards without terminating the build, e.g., invalid references
to icons. To terminate the build, use:

``` yaml
plugins:
  - social:
      log: false
```

---

#### <!-- md:setting config.log_level -->

<!-- md:sponsors -->
<!-- md:version insiders-4.40.2 -->
<!-- md:default `warn` -->

Use this setting to control the log level that the plugin should employ when
encountering errors, which requires that the [`log`][config.log] setting is
enabled. The following log levels are available:

=== "`warn`"

    ``` yaml
    plugins:
      - social:
          log_level: warn
    ```

    Errors are reported as warnings, terminating the build in
    [`strict`][mkdocs.strict] mode.

=== "`info`"

    ``` yaml
    plugins:
      - social:
          log_level: info
    ```

    Errors are only reported as informational messages.

=== "`ignore`"

    ``` yaml
    plugins:
      - social:
          log_level: ignore
    ```

    Errors are only reported when using the `--verbose` flag.

### Social cards

The following settings are available for social card generation:

---

#### <!-- md:setting config.cards -->

<!-- md:version 8.5.0 -->
<!-- md:default `true` -->

Use this setting to enable or disable social card generation. Currently, the
plugin's sole purpose is to generate social cards, so it's equivalent to the
[`enabled`][config.enabled] setting, but in the future, other features might be
added. If you want to disable social card generation, use:

``` yaml
plugins:
  - social:
      cards: false
```

---

#### <!-- md:setting config.cards_dir -->

<!-- md:version 8.5.0 -->
<!-- md:default `assets/images/social` -->

It is normally not necessary to specify this setting, except for when you want
to change the path within the [`site` directory][mkdocs.site_dir] where
social cards are stored. If you want to change it, use:

``` yaml
plugins:
  - social:
      cards_dir: my/custom/dir
```

This configuration stores the generated images at `my/custom/dir` in the
[`site` directory][mkdocs.site_dir].

---

#### <!-- md:setting config.cards_layout_dir -->

<!-- md:sponsors -->
<!-- md:version insiders-4.33.0 -->
<!-- md:default `layouts` -->

If you want to build a [custom social card layout][custom layouts], use this
setting to change the folder where you store your custom layouts, the default
being a folder called `layouts` in your root directory:

``` yaml
plugins:
  - social:
      cards_layout_dir: layouts
```

The provided path is resolved from the root directory.

!!! tip "Where to store custom layouts"

    Our recommendation is to locate the folder outside of the
    [`docs` directory][mkdocs.docs_dir], to make sure that your [custom layouts]
    are not copied to the [`site` directory][mkdocs.site_dir] when
    [building your project], e.g., by adhering to the following directory
    layout:

    ``` { .sh .no-copy }
    .
    ├─ docs/
    │  └─ *.md
    ├─ layouts/
    │  └─ *.yml
    └─ mkdocs.yml
    ```

---

#### <!-- md:setting config.cards_layout -->

<!-- md:sponsors -->
<!-- md:version insiders-4.33.0 -->
<!-- md:default `default` -->

The plugin ships a growing list of [`default` layouts][default layouts] for
social cards. If you've created a [custom social card layout][custom layouts],
you can instruct the plugin to use it exactly as one of the included layouts:

``` yaml
plugins:
  - social:
      cards_layout: my-custom-layout
```

The provided path is resolved from the[
`layouts` directory][config.cards_layout_dir].

!!! tip "How custom layouts are resolved"

    By default, the plugin will load your [custom layouts] from a folder named
    `layouts` in your root directory. If your layout is called
    `my-custom-layout`, the directory layout must adhere to:

    ``` { .sh .no-copy }
    .
    ├─ docs/
    │  └─ *.md
    ├─ layouts/
    │  └─ my-custom-layout.yml
    └─ mkdocs.yml
    ```

---

#### <!-- md:setting config.cards_layout_options -->

<!-- md:version 9.1.10 -->
<!-- md:default none -->

Use this setting to set options for the layout specified via [`cards_layout`]
[config.cards_layout] (if the layout supports it), which allows for making
layouts easily and entirely configurable:

``` yaml
plugins:
  - social:
      cards_layout_options:
        <option>: <value>
```

When creating a [custom layout][custom layouts], you are completely free in
defining which parts of your layout can be parametrized. The [`default` layouts]
[default layouts] included with the plugin support the following options:

<div class="mdx-columns" markdown>

- [`background_color`][option.background_color]
- [`background_image`][option.background_image]
- [`color`][option.color]
- [`font_family`][option.font_family]
- [`font_variant`][option.font_variant]
- [`logo`][option.logo]
- [`title`][option.title]
- [`description`][option.description]

</div>


  [default layouts]: #layouts

---

#### <!-- md:setting config.cards_include -->

<!-- md:sponsors -->
<!-- md:version insiders-4.35.0 -->
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

This configuration enables social card generation for all pages that are
contained in the `blog` folder and its subfolders inside the [`docs` directory]
[mkdocs.docs_dir].

---

#### <!-- md:setting config.cards_exclude -->

<!-- md:sponsors -->
<!-- md:version insiders-4.35.0 -->
<!-- md:default none -->

Use this setting to disable social card generation for subsections of your
project, e.g., when using [multiple instances] of the plugin to generate
different social cards for different subsections:

``` yaml
plugins:
  - social:
      cards_exclude:
        - changelog/*
```

This configuration disables social card generation for all pages that are
contained in the `changelog` folder and its subfolders inside the
[`docs` directory][mkdocs.docs_dir].

### Debugging

The plugin includes a special mode for debugging layouts, which is very useful
when creating [custom layouts], as it allows for quicker iteration and better
understanding of composition.

The following settings are available for debugging:

---

#### <!-- md:setting config.debug -->

<!-- md:sponsors -->
<!-- md:version insiders-4.33.0 -->
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

#### <!-- md:setting config.debug_on_build -->

<!-- md:sponsors -->
<!-- md:version insiders-4.34.1 -->
<!-- md:default `false` -->

By default, the plugin automatically disables [`debug`][config.debug] mode when
[building your project], so you can be sure that debug overlays are never
deployed to production. If you want to change that, use:

``` yaml
plugins:
  - social:
      debug_on_build: true
```

It's normally not necessary to change this setting, as it's just intended to
be a safety net.

---

#### <!-- md:setting config.debug_grid -->

<!-- md:sponsors -->
<!-- md:version insiders-4.33.0 -->
<!-- md:default `true` -->

When [`debug`][config.debug] mode is enabled, this setting specifies whether a
dot grid is rendered on top of all layers, to allow for better alignment. If you
want to switch the grid off, use:

``` yaml
plugins:
  - social:
      debug_grid: false
```

---

#### <!-- md:setting config.debug_grid_step -->

<!-- md:sponsors -->
<!-- md:version insiders-4.33.0 -->
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

#### <!-- md:setting config.debug_color -->

<!-- md:sponsors -->
<!-- md:version insiders-4.33.0 -->
<!-- md:default `grey` -->

Use this setting to specify the color of the outlines that are added to each
layer and the dot grid that is rendered on top of all layers. If you need to
change it, use:

``` yaml
plugins:
  - social:
      debug_color: yellow
```

In rare cases, it might be necessary to change this setting if the dot grid or
the outlines are hard to distinguish, as the plugin will automatically adjust
the color if not explicitly set.

## Usage

### Metadata

The plugin allows to override a subset of settings through metadata (front
matter) in order to customize social card generation, e.g., to set [options for
the included `default` layouts][default layouts] for a single page, or even
[for an entire subsection] of your project by leveraging the [meta] plugin.

The following properties are available:

  [for an entire subsection]: meta.md#how-it-works
  [meta]: meta.md

---

#### <!-- md:setting meta.social.cards -->

<!-- md:sponsors -->
<!-- md:version insiders-4.37.0 -->
<!-- md:flag metadata -->
<!-- md:default none -->

Use this property to override the [`cards`][config.cards] setting for the given
page:

``` yaml
---
social:
  cards: false
---

# Page title
...
```

---

#### <!-- md:setting meta.social.cards_layout -->

<!-- md:sponsors -->
<!-- md:version insiders-4.37.0 -->
<!-- md:flag metadata -->
<!-- md:default none -->
<!-- md:flag experimental -->

Use this property to override the [`cards_layout`][config.cards_layout] setting
for the given page:

``` yaml
---
social:
  cards_layout: my-custom-layout
---

# Page title
...
```

---

#### <!-- md:setting meta.social.cards_layout_options -->

<!-- md:sponsors -->
<!-- md:version insiders-4.37.0 -->
<!-- md:flag metadata -->
<!-- md:default none -->

Use this property to override the [`cards_layout_options`]
[config.cards_layout_options] setting for the given page:

``` yaml
---
social:
  cards_layout_options:
    background_color: blue             # Change background color
    background_image: null             # Remove background image
---

# Page title
...
```

Setting an option to `#!yaml null` resets the option.

### Layouts

While it is possible and simple to build [custom layouts], the plugin ships
several predefined layouts, all of which are prefixed with `default`. The
following layouts are included:

=== "`default`"

    ``` yaml
    plugins:
      - social:
          cards_layout: default
    ```

    <div class="result" markdown>

    ![Layout default]

    This layout sets the following defaults:

    - [`background_color`][option.background_color]
      – <!-- md:default [`theme.palette.primary`][primary color] -->

    - [`font_family`][option.font_family]
      – <!-- md:default [`theme.font.text`][font] -->

    </div>

=== "`default/variant`"

    ``` yaml
    plugins:
      - social:
          cards_layout: default/variant
    ```

    <div class="result" markdown>

    ![Layout default variant]

    This layout includes the [page icon] and sets the following defaults:

    - [`background_color`][option.background_color]
      – <!-- md:default [`theme.palette.primary`][primary color] -->

    - [`font_family`][option.font_family]
      – <!-- md:default [`theme.font.text`][font] -->

    </div>

=== "`default/accent`"

    ``` yaml
    plugins:
      - social:
          cards_layout: default/accent
    ```

    <div class="result" markdown>

    ![Layout default accent]

    This layout sets the following defaults:

    - [`background_color`][option.background_color]
      – <!-- md:default [`theme.palette.accent`][accent color] -->

    - [`font_family`][option.font_family]
      – <!-- md:default [`theme.font.text`][font] -->

    </div>

=== "`default/invert`"

    ``` yaml
    plugins:
      - social:
          cards_layout: default/invert
    ```

    <div class="result" markdown>

    ![Layout default invert]

    This layout sets the following defaults:

    - [`color`][option.background_color]
      – <!-- md:default [`theme.palette.primary`][primary color] -->

    - [`font_family`][option.font_family]
      – <!-- md:default [`theme.font.text`][font] -->

    </div>

=== "`default/only/image`"

    ``` yaml
    plugins:
      - social:
          cards_layout: default/only/image
          cards_layout_options:
            background_image: layouts/background.png

    ```

    <div class="result" markdown>

    This layout only shows the given background image and scales it to cover.

    </div>

The [`default` layouts][default layouts] are very flexible and comfortable to
use, as they replicate the original behavior of the plugin, sourcing default
values for all options from other `theme` settings.

The following options are available:

  [Layout default]: ../assets/screenshots/social-cards.png
  [Layout default variant]: ../assets/screenshots/social-cards-variant.png
  [Layout default accent]: ../assets/screenshots/social-cards-accent.png
  [Layout default invert]: ../assets/screenshots/social-cards-invert.png

  [primary color]: ../setup/changing-the-colors.md#primary-color
  [page icon]: ../reference/index.md#setting-the-page-icon
  [accent color]: ../setup/changing-the-colors.md#accent-color
  [font]: ../setup/changing-the-fonts.md#regular-font

---

#### <!-- md:setting option.background_color -->

<!-- md:version 9.1.10 -->
<!-- md:default computed -->

Use this option to change the background color of the generated social card.
The value can be set to a valid color value [supported by pillow], the imaging
library used for card generation:

=== "Hexadecimal"

    ``` yaml
    plugins:
      - social:
          cards_layout_options:
            background_color: "#ff1493" # (1)!
    ```

    1.  The following notations are supported, whereas each character after the
        `#` must be a valid hexadecimal in the range `#!css 0-F`:

        - `#!css #rgb` – Color (short)
        - `#!css #rgba` – Color + alpha (short)
        - `#!css #rrggbb` – Color
        - `#!css #rrggbbaa` – Color + alpha

=== "Color function"

    ``` yaml
    plugins:
      - social:
          cards_layout_options:
            background_color: rgb(255, 20, 147) # (1)!
    ```

    1.  The following functions are supported, listing the allowed maximum
        values with the minimum values all being `#!css 0` or `#!css 0%`:

        - `#!css rgb(255, 255, 255)` – Red, green and blue
        - `#!css hsl(360, 100%, 100%)` – Hue, saturation and lightness
        - `#!css hsv(360, 100%, 100%)` – Hue, saturation and value

=== "Color name"

    ``` yaml
    plugins:
      - social:
          cards_layout_options:
            background_color: deeppink # (1)!
    ```

    1.  See the [`<named-color>`][named-color] CSS data type for a list of
        supported color names. Note that some might not be available.

If this options is used together with [`background_image`]
[option.background_image], the color is rendered on top of the image which
allows for tinting images. If you want to remove the background color, use:

``` yaml
plugins:
  - social:
      cards_layout_options:
        background_color: transparent
```

  [supported by pillow]: https://pillow.readthedocs.io/en/stable/reference/ImageColor.html#color-names
  [named-color]: https://developer.mozilla.org/en-US/docs/Web/CSS/named-color

---

#### <!-- md:setting option.background_image -->

<!-- md:sponsors -->
<!-- md:version insiders-4.33.0 -->
<!-- md:default none -->

Use this option to define a background image for the generated social card. Note
that the image is tinted with the [`background_color`][option.background_color],
which can also be set to `transparent`:

=== "Image"

    ``` yaml
    plugins:
      - social:
          cards_layout_options:
            background_image: layouts/background.png
            background_color: transparent
    ```

=== "Image with tint"

    ``` yaml
    plugins:
      - social:
          cards_layout_options:
            background_image: layouts/background.png
            background_color: "#ff149366"
    ```

The provided path is resolved from the root directory.

---

#### <!-- md:setting option.color -->

<!-- md:version 9.1.10 -->
<!-- md:default computed -->

Use this option to change the foreground color of the generated social card.
The value can be set to a valid color value [supported by pillow], the imaging
library used for card generation:

=== "Hexadecimal"

    ``` yaml
    plugins:
      - social:
          cards_layout_options:
            color: "#ffffff" # (1)!
    ```

    1.  The following notations are supported, whereas each character after the
        `#` must be a valid hexadecimal in the range `#!css 0-F`:

        - `#!css #rgb` – Color (short)
        - `#!css #rgba` – Color + alpha (short)
        - `#!css #rrggbb` – Color
        - `#!css #rrggbbaa` – Color + alpha

=== "Color function"

    ``` yaml
    plugins:
      - social:
          cards_layout_options:
            color: rgb(255, 255, 255) # (1)!
    ```

    1.  The following functions are supported, listing the allowed maximum
        values with the minimum values all being `#!css 0` or `#!css 0%`:

        - `#!css rgb(255, 255, 255)` – Red, green and blue
        - `#!css hsl(360, 100%, 100%)` – Hue, saturation and lightness
        - `#!css hsv(360, 100%, 100%)` – Hue, saturation and value

=== "Color name"

    ``` yaml
    plugins:
      - social:
          cards_layout_options:
            color: white # (1)!
    ```

    1.  See the [`<named-color>`][named-color] CSS data type for a list of
        supported color names. Note that some might not be available.

---

#### <!-- md:setting option.font_family -->

<!-- md:version 9.1.10 -->
<!-- md:default computed -->

Use this option to change the font family of the generated social card. The
plugin automatically downloads the font from [Google Fonts], so the font must
point to an existing Google Font:

``` yaml
plugins:
  - social:
      cards_layout_options:
        font_family: Ubuntu
```

When you've found a font that you like on [Google Fonts], you can just copy the
name from the font's specimen page and use it as the value for this option –
no further configuration needed.

  [Google Fonts]: https://fonts.google.com/

---

#### <!-- md:setting option.font_variant -->

<!-- md:sponsors -->
<!-- md:version insiders-4.53.3 -->
<!-- md:default none -->

Use this option to change the font variant used to generate the social card.
If the downloaded font has variants like `Condensed` or `Expanded`, you can set
them with:

``` yaml
plugins:
  - social:
      cards_layout_options:
        font_variant: Condensed
```

The variant is combined with the style as used in the custom layout, so the
plugin is instructed to use combinations like `Condensed Regular` or
`Expanded Bold`.

---

#### <!-- md:setting option.logo -->

<!-- md:sponsors -->
<!-- md:version insiders-4.40.0 -->
<!-- md:default computed -->

Use this option to change the logo that is used in the generated social card.
By default, the plugin uses the [`theme.logo`][theme.logo] or [`theme.icon.logo`]
[theme.icon.logo] setting from `mkdocs.yml`. You can change it with:

``` yaml
plugins:
  - social:
      cards_layout_options:
        logo: layouts/logo.png
```

The provided path is resolved from the root directory.

  [theme.logo]: ../setup/changing-the-logo-and-icons.md#logo-image
  [theme.icon.logo]: ../setup/changing-the-logo-and-icons.md#logo-icon-bundled

---

#### <!-- md:setting option.title -->

<!-- md:sponsors -->
<!-- md:version insiders-4.40.0 -->
<!-- md:default computed -->

Use this option to change the title of the generated social card. This overrides
the computed page title as assigned by MkDocs, as well as the [`title`]
[meta.title] metadata property:

``` yaml
plugins:
  - social:
      cards_layout_options:
        title: My custom title
```

  [meta.title]: ../reference/index.md#setting-the-page-title

---

#### <!-- md:setting option.description -->

<!-- md:sponsors -->
<!-- md:version insiders-4.40.0 -->
<!-- md:default computed -->

Use this option to change the description of the generated social card. This
overrides the set [`site_description`][mkdocs.site_description], if defined, as
well as the [`description`][meta.description] metadata property:

``` yaml
plugins:
  - social:
      cards_layout_options:
        description: My custom description
```

  [meta.description]: ../reference/index.md#setting-the-page-description

---

!!! question "Missing something?"

    When setting up social cards, you might discover that you're missing
    specific functionality – we're happy to consider adding it to the plugin!
    You can [open a discussion] to ask a question, or create a [change request]
    on our [issue tracker], so we can find out if it might be a good fit for
    the plugin.

  [open a discussion]: https://github.com/squidfunk/mkdocs-material/discussions
  [change request]: ../contributing/requesting-a-change.md
  [issue tracker]: https://github.com/squidfunk/mkdocs-material/issues
