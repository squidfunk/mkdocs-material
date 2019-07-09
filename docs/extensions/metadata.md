hero: Metadata enables hero teaser texts
path: tree/master/docs/extensions
source: metadata.md

# Metadata

The [Metadata][1] extension makes it possible to add metadata to a document
which gives more control over the theme in a page-specific context.

  [1]: https://python-markdown.github.io/extensions/meta_data/

## Installation

Add the following lines to your `mkdocs.yml`:

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
title: Lorem ipsum dolor sit amet
description: Nullam urna elit, malesuada eget finibus ut, ac tortor.
path: path/to/file
source: file.js

# Headline

...
```

See the next section which covers the metadata that is supported by Material.

### Setting a hero text

Material exposes a simple text-only page-local hero via Metadata, as you can
see on the current page when you scroll to the top. It's as simple as:

``` markdown
hero: Metadata enables hero teaser texts
```

### Linking sources

When a document is related to a specific set of source files and the `repo_url`
is defined inside the project's `mkdocs.yml`, the files can be linked using the
`source` key:

``` markdown
source: file.js
```

The filename is appended to the `repo_url` set in your `mkdocs.yml`, but can
be prefixed with a `path` to ensure correct path resolving:

Example:

``` markdown
path: tree/master/docs/extensions
source: metadata.md
```

Result:

See the [source][2] section for the resulting output.

  [2]: #__source

### Redirecting to another page

It's sometimes necessary to move documents around in the navigation tree and
redirect user from the old URL to the new one. The `redirect` meta-tag allows
to create a redirection from the current document to the address specified in
the tag.

For instance, if your document contains:

``` markdown
redirect: /new/url
```

accessing that document's URL will automatically redirect to `/new/url`.

### Overrides

#### Page title

The page title can be overridden on a per-document level:

``` markdown
title: Lorem ipsum dolor sit amet
```

This will set the `title` tag inside the document `head` for the current page
to the provided value. It will also override the default behavior of Material
for MkDocs which appends the site title using a dash as a separator to the page
title.

#### Page description

The page description can also be overridden on a per-document level:

``` yaml
description: Nullam urna elit, malesuada eget finibus ut, ac tortor.
```

This will set the `meta` tag containing the site description inside the
document `head` for the current page to the provided value.

#### Disqus

As described in the [getting started guide][3], the Disqus comments section can
be enabled on a per-document level:

``` markdown
disqus: your-shortname
```

Disqus can be disabled for a specific page by setting it to an empty value:

``` markdown
disqus:
```

  [3]: ../getting-started.md#disqus
