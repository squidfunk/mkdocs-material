---
template: overrides/main.html
---

# Setting up social cards

Social cards, also known as social previews, are images that are displayed when
a link to your project documentation is shared on social media. Material for
MkDocs can generate beautiful social cards automatically, using the [colors]
[palette.primary], [fonts][font.text] and [logo][^1] defined in `mkdocs.yml`,
e.g.:

<figure markdown>

[![Social cards preview]][Social cards preview]

  <figcaption markdown>

The social preview image for the page on [setting up site analytics].
[Twitter's Card validator] shows how it will look when shared.

  </figcaption>
</figure>

  [^1]:
    Both types of logos, images (`theme.logo`) and icons (`theme.icon.logo`)
    are supported. While an image logo is used as-is, icons are filled with the
    color used in the header (white or black), which depends on the primary
    color.

  [palette.primary]: changing-the-colors.md#primary-color
  [font.text]: changing-the-fonts.md#regular-font
  [logo]: changing-the-logo-and-icons.md#logo
  [Social cards preview]: ../assets/screenshots/social-cards.png
  [setting up site analytics]: setting-up-site-analytics.md
  [Twitter's Card validator]: https://cards-dev.twitter.com/validator

## Configuration

### Built-in social plugin

[:octicons-heart-fill-24:{ .mdx-heart } Sponsors only][Insiders]{ .mdx-insiders } ·
[:octicons-tag-24: insiders-2.12.0][Insiders] ·
:octicons-cpu-24: Plugin ·
:octicons-beaker-24: Experimental

First, ensure you've installed all [dependencies] and have a valid [`site_url`]
[site_url], as social preview images must be referenced via absolute URLs.
Then, add the following lines to `mkdocs.yml`:

``` yaml
plugins:
  - social
```

> If you need to be able to build your documentation with and without
> [Insiders], please refer to the [built-in plugins] section to learn how
> shared configurations help to achieve this.

The following configuration options are available:

`cards`{ #cards }

:   :octicons-milestone-24: Default: `true` – This option specifies whether
    to generate social card images. If you want to switch the plugin off, e.g.
    for local builds, you can use an [environment variable]:

    ``` yaml
    plugins:
      - social:
          cards: !ENV [CARDS, false]
    ```

`cards_color`{ #cards-color }

:   [:octicons-tag-24: insiders-2.13.0][Insiders] · :octicons-milestone-24:
    Default: [`theme.palette.primary`][palette.primary] – This option specifies
    the colors for the background `fill` and foreground `text` when generating
    the social card:

    ``` yaml
    plugins:
      - social:
          cards_color:
            fill: "#0FF1CE" # (1)!
            text: "#FFFFFF"
    ```

    1.  Colors can either be defined as HEX colors, or as [CSS color keywords].
        Note that HEX colors must be enclosed in quotes.

`cards_font`{ #cards-font }

:   [:octicons-tag-24: insiders-4.3.0][Insiders] · :octicons-milestone-24:
    Default: [`theme.font.text`][font.text] – This option specifies which font
    to use for rendering the social card, which can be any font hosted on
    [Google Fonts]:

    ``` yaml
    plugins:
      - social:
          cards_font: Roboto
    ```

`cards_dir`{ #cards-dir }

:   :octicons-milestone-24: Default: `assets/images/social` – This option
    specifies where the generated social card images will be written to. It's
    normally not necessary to change this option:

    ``` yaml
    plugins:
      - social:
          cards_dir: assets/images/social
    ```

  [Insiders]: ../insiders/index.md
  [dependencies]: #dependencies
  [site_url]: https://www.mkdocs.org/user-guide/configuration/#site_url
  [built-in plugins]: ../insiders/getting-started.md#built-in-plugins
  [environment variable]: https://www.mkdocs.org/user-guide/configuration/#environment-variables
  [CSS color keywords]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#color_keywords
  [Google Fonts]: https://fonts.google.com

#### Dependencies

Two Python packages are installed alongside Material for MkDocs to generate the
social preview images, both of which are based on the [Cairo Graphics] library:

- [Pillow] – Python imaging library
- [CairoSVG] – Converter for `*.svg` files

The [Docker image] for Insiders comes with all dependencies pre-installed. If
you don't want to use Docker, see the following section which explains how to
install all dependencies on your system:

=== ":material-apple: macOS"

    Make sure [Homebrew] is installed, which is a modern package manager for
    macOS. Next, use the following command to install all necessary
    dependencies:

    ```
    brew install cairo freetype libffi libjpeg libpng zlib
    ```

=== ":fontawesome-brands-windows: Windows"

    As stated in the [installation guide], the easiest way to get up and running
    with the [Cairo Graphics] library on Windows is by installing [GTK+], since
    it has Cairo as a dependency.

=== ":material-linux: Linux"

    There are several package managers for Linux with varying availability per
    distribution. The [installation guide] explains how to install the [Cairo
    Graphics] library for your distribution:

    === ":material-ubuntu: Ubuntu"

        ```
        apt-get install libcairo2-dev libfreetype6-dev libffi-dev libjpeg-dev libpng-dev libz-dev
        ```

    === ":material-fedora: Fedora"

        ```
        yum install cairo-devel freetype-devel libffi-devel libjpeg-devel libpng-devel zlib-devel
        ```

    === ":fontawesome-brands-suse: openSUSE"

        ```
        zypper install cairo-devel freetype-devel libffi-devel libjpeg-devel libpng-devel zlib-devel
        ```

  [Cairo Graphics]: https://www.cairographics.org/
  [Pillow]: https://pillow.readthedocs.io/
  [CairoSVG]: https://cairosvg.org/
  [Docker image]: ../insiders/getting-started.md#with-docker
  [Homebrew]: https://brew.sh/
  [installation guide]: https://www.cairographics.org/download/
  [GTK+]: https://www.gtk.org/docs/installations/windows/

#### Caching <small>recommended</small> { #caching data-toc-label="Caching" }

The [built-in social plugin] automatically fetches the fonts you define in
`mkdocs.yml` from Google Fonts, and uses them to render the text that is
displayed on the social card. The font files and generated cards are both
written to the `.cache` directory, which is used in subsequent builds to detect
whether the social cards need to be regenerated. You might want to:

1.  Ignore the `.cache` directory in your project, by adding it to `.gitignore`.
2.  When building your site for publishing, use a build cache to save the
    `.cache` directory in between builds. Taking the example from the
    [publishing guide], add the following lines:

    ``` yaml hl_lines="15-18"
    name: ci
      on:
        push:
          branches:
            - master
            - main
      jobs:
        deploy:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v2
            - uses: actions/setup-python@v2
              with:
                python-version: 3.x
            - uses: actions/cache@v2
              with:
                key: ${{ github.ref }}
                path: .cache
            - run: pip install mkdocs-material
            - run: mkdocs gh-deploy --force
    ```

  [built-in social plugin]: #built-in-social-plugin
  [publishing guide]: ../publishing-your-site.md#with-github-actions

#### Meta tags

The [built-in social plugin] automatically sets all necessary `meta` tags,
equivalent to the following two customizations, which you can set manually when
you don't want to use it:

=== ":material-graph: Open Graph"

    ``` html
    {% extends "base.html" %}

    {% block extrahead %}
      {% set title = config.site_name %}
      {% if page and page.meta and page.meta.title %}
        {% set title = title ~ " - " ~ page.meta.title %}
      {% elif page and page.title and not page.is_homepage %}
        {% set title = title ~ " - " ~ page.title %}
      {% endif %}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="{{ title }}" />
      <meta property="og:description" content="{{ config.site_description }}" />
      <meta property="og:url" content="{{ page.canonical_url }}" />
      <meta property="og:image" content="<url>" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    {% endblock %}
    ```

=== ":fontawesome-brands-twitter: Twitter Cards"

    ``` html
    {% extends "base.html" %}

    {% block extrahead %}
      {% set title = config.site_name %}
      {% if page and page.meta and page.meta.title %}
        {% set title = title ~ " - " ~ page.meta.title %}
      {% elif page and page.title and not page.is_homepage %}
        {% set title = title ~ " - " ~ page.title %}
      {% endif %}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="{{ title }}" />
      <meta name="twitter:description" content="{{ config.site_description }}" />
      <meta name="twitter:image" content="<url>" />
    {% endblock %}
    ```

  [Twitter Cards]: https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/abouts-cards

## Usage

If you want to adjust the title or set a custom description for the social card,
you can set the front matter `title` and `description` properties, which take 
precedence over the default values.

- [Changing the title]
- [Changing the description]

  [Changing the title]: ../reference/index.md#setting-the-page-title
  [Changing the description]: ../reference/index.md#setting-the-page-description
