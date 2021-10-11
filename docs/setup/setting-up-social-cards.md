---
template: overrides/main.html
---

# Setting up social cards

Social cards, also known as social previews, are images that are displayed when
a link to your project documentation is shared on social media. Material for
MkDocs can generate beautiful social cards automatically, using the [colors]
[palette.primary], [fonts][font.text] and [logo][^1] defined in `mkdocs.yml`.

  [^1]:
    Both types of logos, images (`theme.logo`) and icons (`theme.icon.logo`)
    are supported. While an image logo is used as-is, icons are filled with the
    color used in the header (white or black), which depends on the primary
    color.

  [palette.primary]: changing-the-colors.md#primary-color
  [font.text]: changing-the-fonts.md#regular-font
  [logo]: changing-the-logo-and-icons.md#logo

## Configuration

### Built-in social cards

[:octicons-heart-fill-24:{ .mdx-heart } Insiders][Insiders]{ .mdx-insiders } ·
[:octicons-tag-24: insiders-2.12.0][Insiders] ·
:octicons-cpu-24: Plugin ·
:octicons-beaker-24: Experimental

The built-in social cards plugin generates a social preview image for every page
and adds the necessary meta tags, so it's displayed on social media when shared.
First, ensure you've set [`site_url`][site_url] in `mkdocs.yml`.[^2] Then, add
the following lines to `mkdocs.yml` to enable the plugin:

  [^2]:
    When using this plugin, the [`site_url`][site_url] setting is mandatory, as
    social preview images don't work with relative URLs.

``` yaml
plugins:
  - social
```

For example, the page on [setting up site analytics] renders as:

<figure markdown>

[![Social cards preview]][Social cards preview]

  <figcaption markdown>

Want to try it out? Copy the current URL and paste it into [Twitter's Card
validator] to see how social cards look in action.

  </figcaption>
</figure>

The following configuration options are available:

`cards_color`{ #cards-color }

:   [:octicons-tag-24: insiders-2.13.0][Insiders] · :octicons-milestone-24:
    Default: [primary color][palette.primary] – This option specifies which
    colors to use for the background `fill` and foreground `text` when
    generating the social card:

    ``` yaml
    plugins:
      - social:
          cards_color:
            fill: "#0FF1CE" # (1)
            text: "#FFFFFF"
    ```

    1.  Colors can either be defined as HEX colors, or as [CSS color keywords].
        Note that HEX colors must be enclosed in quotes.

`cards_directory`{ #cards-directory }

:   :octicons-milestone-24: Default: `assets/images/social` – This option
    specifies where the generated social card images will be written to. It's
    normally not necessary to change this option:

    ``` yaml
    plugins:
      - social:
          cards_directory: assets/images/social
    ```

  [Insiders]: ../insiders/index.md
  [site_url]: https://www.mkdocs.org/user-guide/configuration/#site_url
  [setting up site analytics]: setting-up-site-analytics.md
  [Social cards preview]: ../assets/screenshots/social-cards.png
  [Twitter's Card validator]: https://cards-dev.twitter.com/validator
  [meta tags]: #meta-tags
  [CSS color keywords]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#color_keywords

#### Caching <small>recommended</small> { #caching data-toc-label="Caching" }

The [built-in social cards] plugin automatically fetches the fonts you define
in `mkdocs.yml` from Google Fonts, and uses them to render the text that is
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

  [built-in social cards]: #built-in-social-cards
  [publishing guide]: ../publishing-your-site.md#with-github-actions

#### Meta tags

The [built-in social cards] plugin automatically sets all necessary `meta` tags,
equivalent to the following two customizations, which you can set manually when
you don't want to use it:

=== ":material-graph: Open Graph"

    ``` html
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
you can use the [Metadata] extension, which takes precedence over the
default values.

- [Changing the title]
- [Changing the description]

  [Metadata]: extensions/python-markdown.md#metadata
  [Changing the title]: ../reference/meta-tags.md#setting-the-page-title
  [Changing the description]: ../reference/meta-tags.md#setting-the-page-description
