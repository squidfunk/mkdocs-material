# Setting up social cards

Material for MkDocs can automatically create beautiful social cards for your
documentation, which appear as link previews on social media platforms. You
can select from several [pre-designed layouts][default layouts] or create
[custom layouts] to match your unique style and branding.

---

:fontawesome-brands-youtube:{ style="color: #EE0F0F" }
__[How to build custom social cards]__ by @james-willett – :octicons-clock-24:
24m – Learn how to create entirely custom social cards perfectly matching your
branding for each page automatically!

  [How to build custom social cards]: https://www.youtube.com/watch?v=4OjnOc6ftJ8

<figure markdown>

[![Layout default variant]][Layout default variant]

  <figcaption markdown>

Social card of our [formatting] reference

  </figcaption>
</figure>

  [default layouts]: ../plugins/social.md#layouts
  [custom layouts]: #customization
  [formatting]: ../reference/formatting.md
  [Layout default variant]: ../assets/screenshots/social-cards-variant.png

## Configuration

### Built-in social plugin

<!-- md:version 8.5.0 -->
<!-- md:plugin -->
<!-- md:flag experimental -->

The built-in social plugin automatically generate a custom preview image for
each page. Install all [dependencies for image processing] and add the
following lines to `mkdocs.yml`:

``` yaml
plugins:
  - social
```

For a list of all settings, please consult the [plugin documentation].

  [plugin documentation]: ../plugins/social.md

!!! info "The [`site_url`][site_url] setting must be set"

    Note that you must set [`site_url`][site_url] when using the social plugin,
    or the generated cards will not be correctly linked. Social media services
    like Twitter and Facebook demand that social previews point to an absolute
    URL, which the plugin can only compute when [`site_url`][site_url] is set.
    Example:

    ``` yaml
    site_url: https://example.com
    ```

  [dependencies for image processing]: ../plugins/requirements/image-processing.md
  [site_url]: https://www.mkdocs.org/user-guide/configuration/#site_url

## Usage

If you want to adjust the title or set a custom description for the social card,
you can set the front matter [`title`][Changing the title] and
[`description`][Changing the description] properties, which take precedence over
the defaults, or use:

- [`cards_layout_options.title`](../plugins/social.md#option.title)
- [`cards_layout_options.description`](../plugins/social.md#option.description)

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
          cards_layout_options:
            font_family: Noto Sans SC
    ```

=== "Chinese (Traditional)"

    ``` yaml
    plugins:
      - social:
          cards_layout_options:
            font_family: Noto Sans TC
    ```

=== "Japanese"

    ``` yaml
    plugins:
      - social:
          cards_layout_options:
            font_family: Noto Sans JP
    ```

=== "Korean"

    ``` yaml
    plugins:
      - social:
          cards_layout_options:
            font_family: Noto Sans KR
    ```

  [font]: changing-the-fonts.md#regular-font

### Changing the layout

<!-- md:version insiders-4.37.0 -->
<!-- md:flag metadata -->
<!-- md:flag experimental -->

If you want to use a different layout for a single page (e.g. your landing
page), you can use the `social` front matter property together with the
[`cards_layout`](../plugins/social.md#meta.social.cards_layout) key, exactly as
in `mkdocs.yml`:

``` yaml
---
social:
  cards_layout: custom
---

# Page title
...
```

You can apply those changes for entire subtrees of your documentation, e.g.,
to generate different social cards for your blog and API reference, by using
the [built-in meta plugin].

  [built-in meta plugin]: ../plugins/meta.md

### Parametrizing the layout

<!-- md:version insiders-4.37.0 -->
<!-- md:flag metadata -->
<!-- md:flag experimental -->

Besides changing the entire layout, you can override all options that a layout
exposes. This means you can parametrize social cards with custom front matter
properties, such as `tags`, `date`, `author` or anything you can think of.
Simply define [`cards_layout_options`](../plugins/social.md#meta.social.cards_layout_options):

``` yaml
---
social:
  cards_layout_options:
    background_color: blue # Change background color
    background_image: null # Remove background image
---

# Page title
...
```

You can apply those changes for entire subtrees of your documentation, e.g.,
to generate different social cards for your blog and API reference, by using
the [built-in meta plugin].

### Disabling social cards

<!-- md:version insiders-4.37.0 -->
<!-- md:flag metadata -->
<!-- md:flag experimental -->

If you wish to disable social cards for a page, simply add the following to the
front matter of the Markdown document:

``` yaml
---
social:
  cards: false
---

# Page title
...
```

## Customization

<!-- md:sponsors -->
<!-- md:version insiders-4.33.0 -->
<!-- md:flag experimental -->

[Insiders] ships a ground up rewrite of the [built-in social plugin] and
introduces a brand new layout system based on a combination of YAML and
[Jinja templates] – the same engine Material for MkDocs uses for HTML
templating – allowing for the creation of complex custom layouts:

<div class="mdx-social">
  <div class="mdx-social__layer">
    <div class="mdx-social__image">
      <span class="mdx-social__label">Layer 0</span>
      <img src="../../assets/screenshots/social-cards-layer-0.png" />
    </div>
  </div>
  <div class="mdx-social__layer">
    <div class="mdx-social__image">
      <span class="mdx-social__label">Layer 1</span>
      <img src="../../assets/screenshots/social-cards-layer-1.png" />
    </div>
  </div>
  <div class="mdx-social__layer">
    <div class="mdx-social__image">
      <span class="mdx-social__label">Layer 2</span>
      <img src="../../assets/screenshots/social-cards-layer-2.png" />
    </div>
  </div>
  <div class="mdx-social__layer">
    <div class="mdx-social__image">
      <span class="mdx-social__label">Layer 3</span>
      <img src="../../assets/screenshots/social-cards-layer-3.png" />
    </div>
  </div>
  <div class="mdx-social__layer">
    <div class="mdx-social__image">
      <span class="mdx-social__label">Layer 4</span>
      <img src="../../assets/screenshots/social-cards-layer-4.png" />
    </div>
  </div>
  <div class="mdx-social__layer">
    <div class="mdx-social__image">
      <span class="mdx-social__label">Layer 5</span>
      <img src="../../assets/screenshots/social-cards-layer-5.png" />
    </div>
  </div>
</div>

Social cards are composed of layers, analogous to how they are represented in
graphic design software such as Adobe Photoshop. As many layers are common
across the cards generated for each page (e.g., backgrounds or logos), the
built-in social plugin can automatically deduplicate layers and render them
just once, substantially accelerating card generation. The generated cards are
cached to ensure they are only regenerated when their contents change.

Layouts are written in YAML syntax. Before starting to create a custom layout,
it is a good idea to [study the pre-designed layouts] (link to [Insiders]
repository), in order to get a better understanding of how they work. Then,
create a new layout and reference it in `mkdocs.yml`:

=== ":octicons-file-code-16: `layouts/custom.yml`"

    ``` yaml
    size: { width: 1200, height: 630 }
    layers: []
    ```

=== ":octicons-file-code-16: `mkdocs.yml`"

    ``` yaml
    plugins:
      - social:
          cards_layout_dir: layouts
          cards_layout: custom
          debug: true
    ```

Note that the `.yml` file extension should be omitted. Next, run `mkdocs serve`,
and see how the `.cache` directory is populated with the generated cards. Open
any card in your editor, so you can see your changes immediately. Since we
haven't defined any layers, the cards are transparent.

The following sections explain how to create custom layouts.

  [Insiders]: ../insiders/index.md
  [built-in social plugin]: ../plugins/social.md
  [Google Fonts]: https://fonts.google.com/
  [Jinja templates]: https://jinja.palletsprojects.com/en/3.1.x/
  [study the pre-designed layouts]: https://github.com/squidfunk/mkdocs-material-insiders/tree/master/src/plugins/social/layouts

### Size and offset

Each layer has an associated size and offset, which is defined in pixels. The
`size` is defined by a `width` and `height` property, and the `offset` by `x`
and `y` properties:

``` yaml
size: { width: 1200, height: 630 }
layers:
  - size: { width: 1200, height: 630 }
    offset: { x: 0, y: 0 }
```

If the `size` is omitted, it defaults to the size of the layout. If the `offset`
is omitted, it defaults to the top left corner, which is the default `origin`.
Saving the layout and reloading renders:

![Layer size]

The layer outline and grid are visible because we enabled [`debug`][debug]
mode in `mkdocs.yml`. The top left shows the layer index and offset, which is
useful for alignment and composition.

  [Layer size]: ../assets/screenshots/social-cards-layer-size.png
  [debug]: ../plugins/social.md#debugging

#### Origin

<!-- md:version insiders-4.35.0 -->
<!-- md:flag experimental -->

The `origin` for the `x` and `y` values can be changed, so that the layer is
aligned to one of the edges or corners of the layout, e.g., to the bottom right
corner of the layout:

``` yaml hl_lines="5"
size: { width: 1200, height: 630 }
layers:
  - size: { width: 1200, height: 630 }
    offset: { x: 0, y: 0 }
    origin: end bottom
```

The following table shows the supported values:

<figure markdown>

| Origin         |                 |              |
| -------------- | --------------- | ------------ |
| :material-arrow-top-left:    `start top`    | :material-arrow-up:     `center top`    | :material-arrow-top-right:    `end top`    |
| :material-arrow-left:        `start center` | :material-circle-small: `center`        | :material-arrow-right:        `end center` |
| :material-arrow-bottom-left: `start bottom` | :material-arrow-down:   `center bottom` | :material-arrow-bottom-right: `end bottom` |

  <figcaption>
    Supported values for origin
  </figcaption>
</figure>

### Backgrounds

Each layer can be assigned a background color and image. If both are given, the
color is rendered on top of the image, allowing for semi-transparent, tinted
backgrounds:

=== "Background color"

    ``` yaml
    size: { width: 1200, height: 630 }
    layers:
      - background:
          color: "#4051b5"
    ```

    ![Layer background color]

=== "Background image"

    ``` yaml
    size: { width: 1200, height: 630 }
    layers:
      - background:
          image: layouts/background.png
    ```

    ![Layer background image]

=== "Background image, tinted"

    ``` yaml
    size: { width: 1200, height: 630 }
    layers:
      - background:
          image: layouts/background.png
          color: "#4051b5ee" # (1)!
    ```

    1.  The color value can be set to a [CSS color keyword], or a 3, 4, 6 or 8
        letter HEX color code, allowing for semi-transparent layers.

    ![Layer background]

Background images are automatically scaled to fit the layer while preserving
aspect-ratio. Notice how we omitted `size` and `offset`, because we want to
fill the entire area of the social card.

[Layer background color]: ../assets/screenshots/social-cards-layer-background-color.png
[Layer background image]: ../assets/screenshots/social-cards-layer-background-image.png
[Layer background]: ../assets/screenshots/social-cards-layer-background.png

### Typography

Now, we can add dynamic typography that is sourced from Markdown files - this is
the actual raison d'être of the [built-in social plugin]. [Jinja templates] are
used to render a text string that is then added to the image:

``` yaml
size: { width: 1200, height: 630 }
layers:
  - size: { width: 832, height: 310 }
    offset: { x: 62, y: 160 }
    typography:
      content: "{{ page.title }}" # (1)!
      align: start
      color: white
      line:
        amount: 3
        height: 1.25
      font:
        family: Roboto
        style: Bold
```

1.  The following variables can be used in [Jinja templates]:

    - [`config.*`][config variable]
    - [`page.*`][page variable]
    - [`layout.*`][layout options]

    The author is free in defining `layout.*` options, which can be used to pass
    arbitrary data to the layout from `mkdocs.yml`.

This renders a text layer with the title of the page with a line height of 1.25,
and a maximum number of 3 lines. The plugin automatically computes the font size
from the line height, the number of lines, and font metrics like ascender and
descender.[^2] This renders:

  [^2]:
    If the plugin would require the author to specify the font size and line
    height manually, it would be impossible to guarantee that the text fits
    into the layer. For this reason we implemented a declarative approach,
    where the author specifies the desired line height and number of lines, and
    the plugin computes the font size automatically.

![Layer typography]

  [config variable]: https://www.mkdocs.org/dev-guide/themes/#config
  [page variable]: https://www.mkdocs.org/dev-guide/themes/#page
  [Layer typography]: ../assets/screenshots/social-cards-layer-typography.png

#### Overflow

If the text overflows the layer, there are two possible behaviors: either the
text is automatically truncated and shortened with an ellipsis, or the text is
automatically scaled down to fit the layer:

``` { .markdown .no-copy }
# If we use a very long headline, we can see how the text will be truncated
```

=== ":octicons-ellipsis-16: Ellipsis"

    ![Layer typography ellipsis]

=== ":material-arrow-collapse: Shrink"

    ![Layer typography shrink]

While truncating with an ellipsis is the default, auto-shrinking can be enabled
by setting `overflow` to `shrink`:

``` yaml hl_lines="7"
size: { width: 1200, height: 630 }
layers:
  - size: { width: 832, height: 310 }
    offset: { x: 62, y: 160 }
    typography:
      content: "{{ page.title }}"
      overflow: shrink
      align: start
      color: white
      line:
        amount: 3
        height: 1.25
      font:
        family: Roboto
        style: Bold
```

  [Layer typography ellipsis]: ../assets/screenshots/social-cards-layer-typography-ellipsis.png
  [Layer typography shrink]: ../assets/screenshots/social-cards-layer-typography-shrink.png

#### Alignment

Text can be aligned to all corners and edges of the layer. For example, if we
want to align the text to the middle of the layer, we can set `align` to  `start center`, which will render as:

![Layer typography align]

  [Layer typography align]: ../assets/screenshots/social-cards-layer-typography-align.png

The following table shows the supported values:

<figure markdown>

| Alignment      |                 |              |
| -------------- | --------------- | ------------ |
| :material-arrow-top-left:    `start top`    | :material-arrow-up:     `center top`    | :material-arrow-top-right:    `end top`    |
| :material-arrow-left:        `start center` | :material-circle-small: `center`        | :material-arrow-right:        `end center` |
| :material-arrow-bottom-left: `start bottom` | :material-arrow-down:   `center bottom` | :material-arrow-bottom-right: `end bottom` |

  <figcaption>
    Supported values for text alignment
  </figcaption>
</figure>

#### Font

The [built-in social plugin] integrates with [Google Fonts] and will
automatically download the font files for you. The `font` property accepts a
`family` and `style` property, where the `family` must be set to the name of the
font, and the `style` to one of the supported font styles. For example, setting
`family` to `Roboto` will automatically download the following files:

``` { .sh .no-copy #example }
.cache/plugins/social/fonts
└─ Roboto/
    ├─ Black.ttf
    ├─ Black Italic.ttf
    ├─ Bold.ttf
    ├─ Bold Italic.ttf
    ├─ Italic.ttf
    ├─ Light.ttf
    ├─ Light Italic.ttf
    ├─ Medium.ttf
    ├─ Medium Italic.ttf
    ├─ Regular.ttf
    ├─ Thin.ttf
    └─ Thin Italic.ttf
```

In that case, the author can use `Bold` or `Medium Italic` as the `style`. If
the font style specified in the layer is not part of the font family, the
font always falls back to `Regular` and prints a warning in [`debug`][debug]
mode, as `Regular` is included with all font families.

### Icons

Authors can leverage the full range of icons that are shipped with Material for
MkDocs, or even provide custom icons by using theme extension and going through
the process described in the guide on [additional icons]. Icons can even be
tinted by using the `color` property:

``` yaml
size: { width: 1200, height: 630 }
layers:
  - background:
      color: "#4051b5"
  - size: { width: 144, height: 144 }
    offset: { x: 992, y: 64 }
    icon:
      value: material/cat
      color: white
```

This will render the icon in the top right corner of the social card:

![Layer icon]

The possibilities are endless. For example, icons can be used to draw shapes
like circles:

``` yaml
size: { width: 1200, height: 630 }
layers:
  - background:
      color: "#4051b5"
  - size: { width: 2400, height: 2400 }
    offset: { x: -1024, y: 64 }
    icon:
      value: material/circle
      color: "#5c6bc0"
  - size: { width: 1800, height: 1800 }
    offset: { x: 512, y: -1024 }
    icon:
      value: material/circle
      color: "#3949ab"
```

This will add two circles to the background:

![Layer icon circles]

### Tags

The new [built-in social plugin] gives full flexibility of the meta tags that
are added to your site, which are necessary to instruct services like Twitter
or Discord how to display your social card. All default layouts use the following
set of tags, which you can copy to your layout and adapt:

``` yaml
definitions:

  - &page_title_with_site_name >-
    {%- if not page.is_homepage -%}
      {{ page.meta.get("title", page.title) }} - {{ config.site_name }}
    {%- else -%}
      {{ page.meta.get("title", page.title) }}
    {%- endif -%}

  - &page_description >-
    {{ page.meta.get("description", config.site_description) or "" }}

tags:

  og:type: website
  og:title: *page_title_with_site_name
  og:description: *page_description
  og:image: "{{ image.url }}"
  og:image:type: "{{ image.type }}"
  og:image:width: "{{ image.width }}"
  og:image:height: "{{ image.height }}"
  og:url: "{{ page.canonical_url }}"

  twitter:card: summary_large_image
  twitter:title: *page_title_with_site_name
  twitter:description: *page_description
  twitter:image: "{{ image.url }}"
```

Note that this example makes use of [YAML anchors] to minify repetition. The
 `definitions` property is solely intended for the definition on aliases that
 can then be referenced with anchors.

  [YAML anchors]: https://support.atlassian.com/bitbucket-cloud/docs/yaml-anchors/

__Are you missing something? Please [open a discussion] and let us know!__

  [additional icons]: ./changing-the-logo-and-icons.md#additional-icons
  [Layer icon]: ../assets/screenshots/social-cards-layer-icon.png
  [Layer icon circles]: ../assets/screenshots/social-cards-layer-icon-circles.png
  [open a discussion]: https://github.com/squidfunk/mkdocs-material/discussions/new
