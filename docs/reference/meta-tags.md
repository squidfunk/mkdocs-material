---
template: overrides/main.html
---

# Meta tags

## Configuration

### Metadata

The [Metadata][1] extension, which is part of the standard Markdown library,
adds the ability to add [front matter][2] to a document and can be enabled via
`mkdocs.yml`:

``` yaml
markdown_extensions:
  - meta
```

Front matter is written as a series of key-value pairs at the beginning of the
Markdown document, delimited by a blank line which ends the YAML context.

  [1]: https://github.com/squidfunk/mkdocs-material/blob/master/src/base.html
  [2]: https://jekyllrb.com/docs/front-matter/

## Usage

### Setting the page title

If the [Metadata][3] extension is enabled, the page title can be overridden on
a per-document basis with custom front matter:

``` markdown
---
title: Lorem ipsum dolor sit amet
---
```

This will set the `title` tag inside the document `head` for the current page
to the provided value. It will also override the default behavior of Material
for MkDocs which appends the site title using a dash as a separator to the page
title.

  [3]: #metadata

### Setting the page description

If the [Metadata][3] extension is enabled, the page description can also be 
overridden on a per-document basis with custom front matter:

``` markdown
---
description: Nullam urna elit, malesuada eget finibus ut, ac tortor.
---
```

This will set the `meta` tag containing the site description inside the
document `head` for the current page to the provided value.

### Adding a web app manifest

A [web app manifest][4] is a simple JSON file that specifies how your web application should behave when installed on the user's mobile device or desktop, which can be set via `mkdocs.yml`:

``` yaml
extra:
  manifest: manifest.webmanifest
```
  
  [4]: https://developers.google.com/web/fundamentals/web-app-manifest/
