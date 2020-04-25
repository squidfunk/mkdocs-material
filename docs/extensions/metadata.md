---
template: overrides/main.html
hero: Set heroes with metadata
path: tree/master/docs/extensions
source: metadata.md
---

# Metadata

[Metadata][1] is an extension included in the standard Markdown library that
makes it possible to control certain properties in a page-specific context,
e.g. the page title or description.

  [1]: https://python-markdown.github.io/extensions/meta_data/

## Configuration

Add the following lines to `mkdocs.yml`:

``` yaml
markdown_extensions:
  - meta
```

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
path: path/to/file
source: file.js
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

### Linking sources

When a document is related to a specific source file and the `repo_url` is
defined inside the project's `mkdocs.yml`, the file can be linked using the
`source` key:

``` markdown
source: file.js
```

The filename is appended to the `repo_url` set in `mkdocs.yml`, but can be
prefixed with a `path` to ensure correct path resolving. The name of the source
file is shown in the tooltip.

Example:

``` markdown
path: tree/master/docs/extensions
source: metadata.md
```

### Redirecting to another page

It's sometimes necessary to move documents around in the navigation tree and
redirect users from the old URL to the new one. The `redirect` meta-tag allows
to create a redirection from the current document to the address specified in
the tag.

For instance, if your document contains:

``` markdown
redirect: /new/url
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

#### Disqus

As described in the [getting started guide][3], Disqus can be enabled on a
per-document basis:

``` markdown
disqus: your-shortname
```

Disqus can also be disabled for a specific page by setting it to an empty value:

``` markdown
disqus:
```

  [3]: ../getting-started.md#disqus
