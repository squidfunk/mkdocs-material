path: tree/master/docs/extensions
source: metadata.md

# Metadata

The [Metadata][1] extension makes it possible to add metadata to a document
which gives more control over the theme in a page-specific context.

  [1]: https://pythonhosted.org/Markdown/extensions/meta_data.html

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

### Overriding the title

The page title can be overridden on a per-document level:

``` markdown
title: Lorem ipsum dolor sit amet
```

This will set the `title` tag inside the document `head` for the current page
to the provided value. It will also override the default behavior of Material
for MkDocs which appends the site title using a dash as a separator to the page
title.

### Overriding the description

The page description can also be overridden on a per-document level:

``` yaml
description: Nullam urna elit, malesuada eget finibus ut, ac tortor.
```

This will set the `meta` tag containing the site description inside the
document `head` for the current page to the provided value.

### Linking sources

When a document is related to a specific set of source files and the `repo_url`
is defined inside the project's `mkdocs.yml`, the files can be linked using the
`source` key:

``` markdown
source: file.js
```

A new entry at the bottom of the table of contents is generated that is linking
to the section listing the linked source files. Multiple files can be linked by
adding filenames on separate lines:

``` markdown
source: file.js
        file.css
```

The filenames are appended to the `repo_url` set in your `mkdocs.yml`, but can
be prefixed with a `path` to ensure correct path resolving:

Example:

``` markdown
path: tree/master/docs/extensions
source: metadata.md
```

Result:

See the [source][2] section for the resulting output.

  [2]: #__source
