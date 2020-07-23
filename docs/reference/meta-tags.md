---
template: overrides/main.html
---

# Meta tags

## Configuration

### Metadata

The [Metadata][1] extension, which is part of the standard Markdown library,
adds the ability to add front matter to a document and can be enabled via
`mkdocs.yml`:

``` yaml
markdown_extensions:
  - meta
```

  [1]: https://github.com/squidfunk/mkdocs-material/blob/master/src/base.html

## Usage

Front matter is written as a series of key-value pairs at the beginning of the
Markdown document, delimited by a blank line which ends the YAML context.
Naturally, front matter is stripped from the document before rendering the
actual page content and made available to the theme:

``` markdown
---
title: Lorem ipsum dolor sit amet
description: Nullam urna elit, malesuada eget finibus ut, ac tortor.
---

# Headline

...
```

### Setting the page title

The page title can be overridden on a per-document basis:

``` markdown
---
title: Lorem ipsum dolor sit amet
---
```

This will set the `title` tag inside the document `head` for the current page
to the provided value. It will also override the default behavior of Material
for MkDocs which appends the site title using a dash as a separator to the page
title.

### Setting the page description

The page description can also be overridden on a per-document basis:

``` markdown
---
description: Nullam urna elit, malesuada eget finibus ut, ac tortor.
---
```

This will set the `meta` tag containing the site description inside the
document `head` for the current page to the provided value.
