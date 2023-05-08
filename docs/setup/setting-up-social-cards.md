---
status: new
---

# Setting up social cards

Material for MkDocs can automatically create beautiful social cards for your 
documentation, which appear as link previews on social media platforms. You 
can select from a variety of [pre-designed layouts][default layouts] or create
[custom layouts] to match your unique style and branding.

<figure markdown>

[![Layout default variant]][Layout default variant]

  <figcaption markdown>

Social card of [formatting] reference.

  </figcaption>
</figure>

  [custom layouts]: #custom-layouts
  [formatting]: ../reference/formatting.md

## Configuration

### Built-in social plugin

[:octicons-tag-24: 8.5.0][Social cards support] ·
:octicons-cpu-24: Plugin ·
:octicons-beaker-24: Experimental

The built-in social plugin automatically generate a custom preview image for 
each page. Install all [dependencies for image processing][^1] and add the 
following lines to `mkdocs.yml`:

  [^1]:
    The awesome thing about social cards is that they are generated during 
    build time and directly distributed with your documentation, no external 
    services involved. While it would technically be simpler to generate 
    social cards using a web browser and an automation framework like 
    [Puppeteer], it would add further liabilities to the toolchain, with the 
    potential to make build pipelines more complex and resource intense.

    For this reason, Material for MkDocs again follows its core principle of 
    making it as simple and powerful as possible, providing an easy-to-use 
    framework for building [custom layouts] using Python image processing 
    libraries. Additionally, this means that there's no necessity for internet
    access in CI environments.

``` yaml
plugins:
  - social
```

> Note that [Insiders] contains a ground up rewrite of the social plugin that 
> generates images much more efficiently in parallel and allows to build 
> entirely [custom layouts].

The following configuration options are available:

[`enabled`](#+social.enabled){ #+social.enabled }

:   :octicons-milestone-24: Default: `true` – This option specifies whether
    the plugin is enabled when building your project. If you want to speed up
    local builds, you can use an [environment variable]:

    ``` yaml
    plugins:
      - social:
          enabled: !ENV [CI, false]
    ```

[`concurrency`](#+social.concurrency){ #+social.concurrency }

:   [:octicons-tag-24: insiders-4.33.0][Insiders] · :octicons-milestone-24: 
    Default: _number of CPUs_ – How many CPUs the plugin is allowed to use when
    generating social cards. With more CPUs, the plugin can do more work in the
    same time, thus complete generation faster. Concurrent processing can be
    disabled with:

    ``` yaml
    plugins:
      - social:
          concurrency: 1
    ```

  [Social cards support]: https://github.com/squidfunk/mkdocs-material/releases/tag/8.5.0
  [built-in plugins]: ../insiders/getting-started.md#built-in-plugins
  [dependencies for image processing]: dependencies/image-processing.md
  [Puppeteer]: https://github.com/puppeteer/puppeteer
  [Insiders]: ../insiders/index.md
  [environment variable]: https://www.mkdocs.org/user-guide/configuration/#environment-variables

#### Social cards

The following configuration options are available for social card generation:

[`cards`](#+social.cards){ #+social.cards }

:   :octicons-milestone-24: Default: `true` – This option specifies whether
    to generate social card images. If you want to switch the plugin off, e.g.
    for local builds, you can use an [environment variable]:

    ``` yaml
    plugins:
      - social:
          cards: !ENV [CI, false]
    ```

[`cards_dir`](#+social.cards_dir){ #+social.cards_dir }

:   :octicons-milestone-24: Default: `assets/images/social` – This option
    specifies where the generated social cards will be stored. While it's
    usually not necessary to change this option, change it with:

    ``` yaml
    plugins:
      - social:
          cards_dir: assets/images/social
    ```

[`cards_color`](#+social.cards_color){ #+social.cards_color }

:   :octicons-milestone-24: Default: [`theme.palette.primary`][primary color] – 
    This option specifies the colors for the background `fill` and foreground
    `text` when generating the social card:

    ``` yaml
    plugins:
      - social:
          cards_color:
            fill: "#0FF1CE"
            text: "#FFFFFF"
    ```

    !!! warning "If you're using [Insiders], use [`cards_layout_params`](#+social.cards_layout_params)"

[`cards_font`](#+social.cards_font){ #+social.cards_font }

:   :octicons-milestone-24: Default: [`theme.font.text`][font] – This option
    specifies which font to use for rendering the social card, which can be
    any font hosted on [Google Fonts]:

    ``` yaml
    plugins:
      - social:
          cards_font: Ubuntu
    ```

    !!! warning "If you're using [Insiders], use [`cards_layout_params`](#+social.cards_layout_params)"

[`cards_layout_dir`](#+social.cards_layout_dir){ #+social.cards_layout_dir }

:   [:octicons-tag-24: insiders-4.33.0][Insiders] · :octicons-milestone-24:
    Default: _project root_ – This option specifies where the social plugin
    should try to resolve [custom layouts] from, taking precedence over the
    included layouts:

    ``` yaml
    plugins:
      - social:
          cards_layout_dir: .overrides/social/layouts
    ```

[`cards_layout`](#+social.cards_layout){ #+social.cards_layout } :material-alert-decagram:{ .mdx-pulse title="Added on May 8, 2023" }

:   [:octicons-tag-24: insiders-4.33.0][Insiders] · :octicons-milestone-24:
    Default: `default` – Layout specification the social card should use. The
    plugin includes the following layouts which make use of the [color palette]
    and [font]:

    === "`default`"

        ``` yaml
        plugins:
          - social:
              cards_layout: default
        ```

        This layout uses the configured [primary color] as a background:

        [![Layout default]][Layout default]

    === "`default/variant`"

        ``` yaml
        plugins:
          - social:
              cards_layout: default/variant
        ```

        This layout includes the [page icon] as a watermark, if defined:

        [![Layout default variant]][Layout default variant]

    === "`default/accent`"

        ``` yaml
        plugins:
          - social:
              cards_layout: default/accent
        ```

        This layout uses the configured [accent color] as a background:

        [![Layout default accent]][Layout default accent]

    === "`default/invert`"

        ``` yaml
        plugins:
          - social:
              cards_layout: default/invert
        ```

        This layout inverts the background and foreground colors:

        [![Layout default invert]][Layout default invert]

    All of the `default` layouts use the following variables:

    - :material-page-layout-header: – `config.site_name`
    - :material-page-layout-body: – `page.meta.title` or `page.title`
    - :material-page-layout-footer: – `page.meta.description` or `config.site_description`
    - :material-page-layout-sidebar-right: – `theme.logo` or `theme.icon.logo`

[`cards_layout_params`](#+social.cards_layout_params){ #+social.cards_layout_params }

:   [:octicons-tag-24: insiders-4.33.0][Insiders] · :octicons-milestone-24:
    Default: _none_ – This option allows to set [parameters] as provided by
    the layout specification. For [custom layouts], this key can be used to
    provide layout-specific options, making layouts entirels configurable.

    ---

    All [`default`][default layouts] layouts specify the following parameters:

    [`background_color`](#+social.cards_layout_params.background_color){ #+social.cards_layout_params.background_color }

    :   Set a background color, which can be a [CSS color keyword], a 3, 4, 6
        or 8 letter HEX color code. Alpha channels are supported as well:

        ``` yaml
        plugins:
          - social:
              cards_layout_params:
                background_color: "#0FF1CE"
        ```

    [`background_image`](#+social.cards_layout_params.background_image){ #+social.cards_layout_params.background_image }

    :   Set a background image. If a `background_color` is set, like for the
        [`default`][default layouts] layouts, the image is tinted (overlayed)
        with the color. Thus, the background color must be (partially)
        transparent for the image to become visible:

        ``` yaml
        plugins:
          - social:
              cards_layout_params:
                background_color: "#00000000"
                background_image: .overrides/social/background.png
        ```

        The path of the image must be defined relative to the project root.

    [`color`](#+social.cards_layout_params.color){ #+social.cards_layout_params.color }

    :   Set a foreground color, which can be a [CSS color keyword], a 3, 4, 6
        or 8 letter HEX color code. The color is primarily used to tint text and
        icons:

        ``` yaml
        plugins:
          - social:
              cards_layout_params:
                color: "#0FF1CE"
        ```

    [`font_family`](#+social.cards_layout_params.font_family){ #+social.cards_layout_params.font_family }

    :   Set a font family. This overrides the [font] that is set as part of the
        theme configuration. The [built-in social plugin] will automatically
        download the font from [Google Fonts]:

        ``` yaml
        plugins:
          - social:
              cards_layout_params:
                font_family: Ubuntu
        ```

  [color palette]: ./changing-the-colors.md#color-palette
  [primary color]: ./changing-the-colors.md#primary-color
  [accent color]: ./changing-the-colors.md#accent-color
  [font]: ./changing-the-fonts.md#regular-font
  [Google Fonts]: https://fonts.google.com/
  [page icon]: ../reference/index.md#setting-the-page-icon
  [Layout default]: ../assets/screenshots/social-cards.png
  [Layout default variant]: ../assets/screenshots/social-cards-variant.png
  [Layout default accent]: ../assets/screenshots/social-cards-accent.png
  [Layout default invert]: ../assets/screenshots/social-cards-invert.png
  [parameters]: #parameters
  [default layouts]: #+social.cards_layout
  [CSS color keyword]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#color_keywords

#### Caching

The [built-in social plugin] implements an intelligent caching mechanism,
ensuring that social cards are only re-generated when they're not contained in
the cache or their contents change. If any of the variables used in a layout 
changes, the plugin will detect it and re-generate the card.

The following configuration options are available for caching:

[`cache`](#+social.cache){ #+social.cache }

:   [:octicons-tag-24: insiders-4.33.0][Insiders] · :octicons-milestone-24:
    Default: `true` – Whether the plugin queries its cache for an existing
    artifact before starting a generation job. It's normally not necessary to
    change this setting, except for when debugging the plugin itself. Caching
    can be disabled with:

    ``` yaml
    plugins:
      - social:
          cache: false
    ```

[`cache_dir`](#+social.cache_dir){ #+social.cache_dir }

:   :octicons-milestone-24: Default: `.cache/plugins/social` – This option
    specifies the file system location of the plugin's cache. It's normally not
    necessary to change this setting, except for when debugging the plugin
    itself. The cache directory can be changed with:

    ``` yaml
    plugins:
      - social:
          cache_dir: .cache/plugins/social
    ```

    By default, all built-in plugins that implement caching will create a
    `.cache` directory in the same folder your `mkdocs.yml` resides, and create
    subfolders to not interfere with each other. If you use multiple instances
    of this plugin, it could be necessary to change this setting.

  [built-in social plugin]: #built-in-social-plugin
  [publishing guide]: ../publishing-your-site.md#with-github-actions

## Usage

If you want to adjust the title or set a custom description for the social card,
you can set the front matter `title` and `description` properties, which take 
precedence over the default values.

- [Changing the title]
- [Changing the description]

  [Changing the title]: ../reference/index.md#setting-the-page-title
  [Changing the description]: ../reference/index.md#setting-the-page-description


### Choosing a font

Some fonts do not contain CJK characters, like for example the
[default font, `Roboto`][font]. In case your `site_name`, `site_description`, or
page title contain CJK characters, choose another font from [Google Fonts] which
comes with CJK characters, e.g. one from the `Noto Sans` font family:

=== "Chinese (Simplified)"

    ``` yaml
    plugins:
      - social:
          cards_font: Noto Sans SC
    ```

=== "Chinese (Traditional)"

    ``` yaml
    plugins:
      - social:
          cards_font: Noto Sans TC
    ```

=== "Japanese"

    ``` yaml
    plugins:
      - social:
          cards_font: Noto Sans JP
    ```

=== "Korean"

    ``` yaml
    plugins:
      - social:
          cards_font: Noto Sans KR
    ```

## Customization

### Custom layouts

[:octicons-heart-fill-24:{ .mdx-heart } Sponsors only][Insiders]{ .mdx-insiders } ·
[:octicons-tag-24: insiders-4.33.0][Insiders] ·
:octicons-beaker-24: Experimental

!!! info "Custom layout guide coming shortly"

    We're working hard to explain in detail how to build custom layouts. If you
    want to start to build a custom layout right away before we finish the guide,
    check out the [source code of the `default` layout](https://github.com/squidfunk/mkdocs-material-insiders/blob/master/src/plugins/social/layouts/default.yml)
    and watch the [demo on Twitter](https://twitter.com/squidfunk/status/1654832324272431104).

#### Parameters
