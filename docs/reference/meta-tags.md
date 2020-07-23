---
template: overrides/main.html
---

# Meta tags

<!-- TBD -->

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

Metadata is written as a series of key-value pairs at the beginning of the
Markdown document, delimited by a blank line which ends the metadata context.
Naturally, the metadata is stripped from the document before rendering the
actual page content and made available to the theme.

Example:

``` markdown
---
title: Lorem ipsum dolor sit amet
description: Nullam urna elit, malesuada eget finibus ut, ac tortor.
---

# Headline

...
```

See the next section which covers the supported metadata.

### Setting a hero

Material for MkDocs exposes a simple text-only page-local hero via Metadata, as
you can see on the current page when you scroll to the top. It's as simple as:

``` markdown
hero: Set heroes with metadata
```



accessing that document's URL will automatically redirect to `/new/url`.

### Overrides

#### Page title

The page title can be overridden on a per-document basis:

``` markdown
title: Lorem ipsum dolor sit amet
```

This will set the `title` tag inside the document `head` for the current page
to the provided value. It will also override the default behavior of Material
for MkDocs which appends the site title using a dash as a separator to the page
title.

#### Page description

The page description can also be overridden on a per-document basis:

``` yaml
description: Nullam urna elit, malesuada eget finibus ut, ac tortor.
```

This will set the `meta` tag containing the site description inside the
document `head` for the current page to the provided value.
