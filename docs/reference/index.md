---
template: overrides/main.html
---

# Reference

Material for MkDocs is packed with many great features that make technical
writing a pleasure. This section of the documentation explains how to set up
a page, and showcases all available specimen that can be used directly from
within Markdown files.

## Configuration

This configuration allows to set a title and description for a page, change the
template or define an icon to be rendered in the navigation. Add the following 
lines to `mkdocs.yml`:

``` yaml
markdown_extensions:
  - meta
```

See additional configuration options:

- [Metadata]

  [front matter]: https://jekyllrb.com/docs/front-matter/
  [Metadata]: ../setup/extensions/python-markdown.md#metadata

## Usage

### Setting the page title

When [Metadata] is enabled, the page title can be overridden for a document with
some custom front matter. Add the following lines at the top of a Markdown file:

``` sh
---
title: Lorem ipsum dolor sit amet # (1)!
---

# Document title
...
```

1.  This will set the [`title`][title] inside the HTML document's [`head`][head]
    for the generated page to this value. Note that the site title, which is set
    via [`site_name`][site_name], is appended with a dash.

  [title]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title
  [head]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head
  [site_name]: https://www.mkdocs.org/user-guide/configuration/#site_name

### Setting the page description

When [Metadata] is enabled, the page description can be overridden for a
document with custom front matter. Add the following lines at the top of a
Markdown file:

``` sh
---
description: Nullam urna elit, malesuada eget finibus ut, ac tortor. # (1)!
---

# Document title
...
```

1.  This will set the `meta` tag containing the site description inside the
    document `head` for the current page to the provided value.

### Setting the page icon

[:octicons-heart-fill-24:{ .mdx-heart } Sponsors only][Insiders]{ .mdx-insiders } ·
[:octicons-tag-24: insiders-4.5.0][Insiders] ·
:octicons-beaker-24: Experimental

An icon can be assigned to each page, which is then rendered as part of the
navigation sidebar. Ensure [Metadata] is enabled and add the following lines
at the top of a Markdown file:

``` sh
---
icon: material/emoticon-happy # (1)!
---

# Document title
...
```

1.  Enter a few keywords to find the perfect icon using our [icon search] and
    click on the shortcode to copy it to your clipboard:

    <div class="mdx-iconsearch" data-mdx-component="iconsearch">
      <input class="md-input md-input--stretch mdx-iconsearch__input" placeholder="Search icon" data-mdx-component="iconsearch-query" value="emoticon happy" />
      <div class="mdx-iconsearch-result" data-mdx-component="iconsearch-result" data-mdx-mode="file">
        <div class="mdx-iconsearch-result__meta"></div>
        <ol class="mdx-iconsearch-result__list"></ol>
      </div>
    </div>

  [Insiders]: ../insiders/index.md
  [icon search]: icons-emojis.md#search

### Setting the page template

If you're using [theme extension] and created a new page template in the
`overrides` directory, you can enable it for a specific page. Add the following 
lines at the top of a Markdown file:

``` sh
---
template: custom.html
---

# Document title
...
```

  [theme extension]: ../customization.md#extending-the-theme

## Customization

### Using metadata in templates

#### on all pages

In order to add custom `meta` tags to your document, you can [extend the theme
][theme extension] and [override the `extrahead` block][overriding blocks],
e.g. to add indexing policies for search engines via the `robots` property:

``` html
{% extends "base.html" %}

{% block extrahead %}
  <meta property="robots" content="noindex, nofollow" />
{% endblock %}
```

  [overriding blocks]: ../customization.md#overriding-blocks

#### on a single page

If you want to set a `meta` tag on a single page, or want to set different
values for different pages, you can use the `page.meta` object inside your
template override, e.g.:

``` html
{% extends "base.html" %}

{% block extrahead %}
  {% if page and page.meta and page.meta.robots %}
    <meta property="robots" content="{{ page.meta.robots }}" />
  {% else %}
    <meta property="robots" content="index, follow" />
  {% endif %}
{% endblock %}
```

You can now use `robots` exactly like [`title`][title] and
[`description`][description] to set values. Note that in this case, the
template defines an `else` branch, which would set a default if none was given.

  [title]: #setting-the-page-title
  [description]: #setting-the-page-description
