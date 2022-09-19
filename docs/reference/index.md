---
template: overrides/main.html
---

# Reference

Material for MkDocs is packed with many great features that make technical
writing a pleasure. This section of the documentation explains how to set up
a page, and showcases all available specimen that can be used directly from
within Markdown files.

## Configuration

### Built-in meta plugin :material-alert-decagram:{ .mdx-pulse title="Added on July 17, 2022" }

[:octicons-heart-fill-24:{ .mdx-heart } Sponsors only][Insiders]{ .mdx-insiders } ·
[:octicons-tag-24: insiders-4.21.0][Insiders] ·
:octicons-cpu-24: Plugin ·
:octicons-beaker-24: Experimental

The built-in meta plugin allows to __set front matter per folder__, which is
especially handy to ensure that all pages in a folder use specific templates or 
tags. Add the following lines to `mkdocs.yml`:

``` yaml
plugins:
  - meta # (1)!
```

1.  Note that the meta plugin should be located at the beginning of the list
    of `plugins`, so that other plugins (including the [built-in blog plugin])
    will pick up the set defaults.

> If you need to be able to build your documentation with and without
> [Insiders], please refer to the [built-in plugins] section to learn how
> shared configurations help to achieve this.

The following configuration options are available:

[`meta_file`](#+meta.meta_file){ #+meta.meta_file }

:   :octicons-milestone-24: Default: `**/.meta.yml` – This option specifies the
    name of the meta files that the plugin should look for. The default setting
    assumes that meta files are called `.meta.yml`:

    ``` yaml
    plugins:
      - meta:
          meta_file: '**/.meta.yml' # (1)!
    ```

    1.  Note that it's strongly recommended to prefix meta files with a `.`,
        since otherwise they would be included in the build output.

  [built-in blog plugin]: ../setup/setting-up-a-blog.md#built-in-blog-plugin
  [built-in plugins]: ../insiders/getting-started.md#built-in-plugins

## Usage

### Setting the page title

The page title can be overridden for a document with the front matter `title`
property. Add the following lines at the top of a Markdown file:

``` yaml
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

The page description can be overridden for a document with the front matter
`description` property. Add the following lines at the top of a Markdown file:

``` yaml
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
navigation sidebar. Add the following lines at the top of a Markdown file:

``` yaml
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

### Setting the page status

[:octicons-heart-fill-24:{ .mdx-heart } Sponsors only][Insiders]{ .mdx-insiders } ·
[:octicons-tag-24: insiders-4.22.0][Insiders] ·
:octicons-beaker-24: Experimental

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

The page status can now be set for a document with the front matter `status`
property. For example, you can mark a page as `new` with the following lines at 
the top of a Markdown file:

``` yaml
---
status: new
---

# Document title
...
```

The following status identifiers are currently supported:

- :material-alert-decagram: – `new`
- :material-trash-can: – `deprecated`

### Setting the page template

If you're using [theme extension] and created a new page template in the
`overrides` directory, you can enable it for a specific page. Add the following 
lines at the top of a Markdown file:

``` yaml
---
template: custom.html
---

# Document title
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
  [built-in meta plugin]: #built-in-meta-plugin

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
