# Reference

Material for MkDocs is packed with many great features that make technical
writing a joyful activity. This section of the documentation explains how to set up
a page, and showcases all available specimen that can be used directly from
within Markdown files.

## Configuration

## Usage

### Setting the page `title`

Each page has a designated title, which is used in the navigation sidebar, for
[social cards] and in other places. While MkDocs attempts to automatically
determine the title of a page in a [four step process], the title can also be
explicitly set with the front matter `title` property:

``` yaml
---
title: Lorem ipsum dolor sit amet # (1)!
---

# Page title
...
```

1.  This line sets the [`title`][title] inside the HTML document's
    [`head`][head] for the generated page to the given value. Note that the
    site title, which is set via [`site_name`][site_name], is appended with a
    dash.

  [social cards]: ../setup/setting-up-social-cards.md
  [four step process]: https://www.mkdocs.org/user-guide/writing-your-docs/#meta-data
  [title]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title
  [head]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head
  [site_name]: https://www.mkdocs.org/user-guide/configuration/#site_name

### Setting the page `description`

A Markdown file can include a description that is added to the `meta` tags of
a page, and is also used for [social cards]. It's a good idea to set a
[`site_description`][site_description] in `mkdocs.yml` as a fallback value if
the author does not explicitly define a description for a Markdown file:

``` yaml
---
description: Nullam urna elit, malesuada eget finibus ut, ac tortor. # (1)!
---

# Page title
...
```

1.  This line sets the `meta` tag containing the description inside the
    document `head` for the current page to the provided value.

  [site_description]: https://www.mkdocs.org/user-guide/configuration/#site_description

### Setting the page `icon`

<!-- md:version 9.2.0 -->
<!-- md:flag experimental -->

An icon can be assigned to each page, which is then rendered as part of the
navigation sidebar, as well as [navigation tabs], if enabled. Use the front
matter `icon` property to reference an icon, adding the following lines at the
top of a Markdown file:

``` yaml
---
icon: material/emoticon-happy # (1)!
---

# Page title
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
  [navigation tabs]: ../setup/setting-up-navigation.md#navigation-tabs

### Setting the page `status`

<!-- md:version 9.2.0 -->
<!-- md:flag experimental -->
<!-- md:example page-status -->

A status can be assigned to each page, which is then displayed as part of the
navigation sidebar. First, associate a status identifier with a description by
adding the following to `mkdocs.yml`:

``` yaml
extra:
  status:
    <identifier>: <description> # (1)!
```

1.  The identifier can only include alphanumeric characters, as well as dashes
    and underscores. For example, if you have a status `Recently added`, you can
    set `new` as an identifier:

    ``` yaml
    extra:
      status:
        new: Recently added
    ```

The page status can now be set with the front matter `status` property. For
example, you can mark a page as `new` with the following lines at the top of a
Markdown file:

``` yaml
---
status: new
---

# Page title
...
```

The following status identifiers are already defined:

- :material-alert-decagram: – `new`
- :material-trash-can: – `deprecated`

You can define a custom page status this way but if you want it to
have an icon other than the default one you need to also configure
that in your `extra.css`. We have an [example for a custom
page status] to get you started.

[example for a custom page status]: https://mkdocs-material.github.io/examples/page-status/

### Setting the page `subtitle`

<!-- md:sponsors -->
<!-- md:version insiders-4.25.0 -->
<!-- md:flag experimental -->

Each page can define a subtitle, which is then rendered below the title as part
of the navigation sidebar by using the front matter `subtitle` property, and
adding the following lines:

``` yaml
---
subtitle: Nullam urna elit, malesuada eget finibus ut, ac tortor
---

# Page title
...
```

### Setting the page `template`

If you're using [theme extension] and created a new page template in the
`overrides` directory, you can enable it for a specific page. Add the following
lines at the top of a Markdown file:

``` yaml
---
template: custom.html
---

# Page title
...
```

??? question "How to set a page template for an entire folder?"

    With the help of the [built-in meta plugin], you can set a custom template
    for an entire section and all nested pages, by creating a `.meta.yml` file
    in the corresponding folder with the following content:

    ``` yaml
    template: custom.html
    ```

  [theme extension]: ../customization.md#extending-the-theme
  [built-in meta plugin]: ../plugins/meta.md

## Customization

### Using metadata in templates

#### :material-check-all: on all pages

In order to add custom `meta` tags to your document, you can [extend the theme
][theme extension] and [override the `extrahead` block][overriding blocks],
e.g. to add indexing policies for search engines via the `robots` property:

``` html
{% extends "base.html" %}

{% block extrahead %}
  <meta name="robots" content="noindex, nofollow" />
{% endblock %}
```

  [overriding blocks]: ../customization.md#overriding-blocks

#### :material-check: on a single page

If you want to set a `meta` tag on a single page, or want to set different
values for different pages, you can use the `page.meta` object inside your
template override, e.g.:

``` html
{% extends "base.html" %}

{% block extrahead %}
  {% if page and page.meta and page.meta.robots %}
    <meta name="robots" content="{{ page.meta.robots }}" />
  {% else %}
    <meta name="robots" content="index, follow" />
  {% endif %}
{% endblock %}
```

You can now use `robots` exactly like [`title`][title] and
[`description`][description] to set values. Note that in this case, the
template defines an `else` branch, which would set a default if none was given.

  [title]: #setting-the-page-title
  [description]: #setting-the-page-description
