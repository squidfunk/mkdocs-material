---
template: overrides/main.html
---

# Meta tags

In HTML, `meta` tags allow to provide additional metadata for a document, e.g.
page titles and descriptions, additional assets to be loaded, and [Open Graph]
[1] data. While metadata can always be added via [customization][2], some tags
can be configured.

  [1]: https://ogp.me/
  [2]: #customization

## Configuration

### Metadata

The [Metadata][3] extension, which is part of the standard Markdown library,
adds the ability to add [front matter][4] to a document and can be enabled via
`mkdocs.yml`:

``` yaml
markdown_extensions:
  - meta
```

Front matter is written as a series of key-value pairs at the beginning of the
Markdown document, delimited by a blank line which ends the YAML context.

  [3]: https://github.com/squidfunk/mkdocs-material/blob/master/src/base.html
  [4]: https://jekyllrb.com/docs/front-matter/

## Usage

### Setting the page title

If the [Metadata][5] extension is enabled, the page title can be overridden on
a per-document basis with custom front matter:

``` markdown
---
title: Lorem ipsum dolor sit amet
---
```

This will set the `title` tag inside the document `head` for the current page
to the provided value. Note that the site title is appended using a dash as a
separator, which is the default behavior.

  [5]: #metadata

### Setting the page description

If the [Metadata][5] extension is enabled, the page description can also be
overridden on a per-document basis with custom front matter:

``` markdown
---
description: Nullam urna elit, malesuada eget finibus ut, ac tortor.
---
```

This will set the `meta` tag containing the site description inside the
document `head` for the current page to the provided value.

### Adding a web app manifest

A [web app manifest][6] is a simple JSON file that specifies how your web application should behave when installed on the user's mobile device or desktop, which can be set via `mkdocs.yml`:

``` yaml
extra:
  manifest: manifest.webmanifest
```
  
  [6]: https://developers.google.com/web/fundamentals/web-app-manifest/

## Customization

### Open Graph

In order to add [Open Graph][1] data to your document, you can [extend the
theme][7] and [override the `extrahead` block][8] to add the respective `meta`
tags to the template:

``` html
{% block extrahead %}
  {% set title = config.site_name %}
  {% if page and page.meta and page.meta.title %}
    {% set title = title ~ " - " ~ page.meta.title %}
  {% elif page and page.title and not page.is_homepage %}
    {% set title = title ~ " - " ~ page.title | striptags %}
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

  [7]: ../customization.md#extending-the-theme
  [8]: ../customization.md#overriding-blocks

### Twitter Cards

When you post links to your project documentation on [Twitter][9], it's
highly recommended to add [Twitter's `meta` tags][10] to optimize the preview
of your tweet:

``` html
{% block extrahead %}
  {% set title = config.site_name %}
  {% if page and page.meta and page.meta.title %}
    {% set title = title ~ " - " ~ page.meta.title %}
  {% elif page and page.title and not page.is_homepage %}
    {% set title = title ~ " - " ~ page.title | striptags %}
  {% endif %}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="<username>" />
  <meta name="twitter:creator" content="<username>" />
  <meta name="twitter:title" content="{{ title }}" />
  <meta name="twitter:description" content="{{ config.site_description }}" />
  <meta name="twitter:image" content="<url>" />
{% endblock %}
```

You should also [check the preview][11] of your Twitter Card.

  [9]: https://twitter.com
  [10]: https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/abouts-cards
  [11]: https://cards-dev.twitter.com/validator
