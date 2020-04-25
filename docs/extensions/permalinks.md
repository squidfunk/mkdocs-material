---
template: overrides/main.html
---

# Permalinks

Permalinks are a feature of the [Table of Contents][1] extension, which is part
of the standard Markdown library. The extension inserts an anchor at the end of
each headline, which makes it possible to directly link to a specific section
of the document.

  [1]: https://python-markdown.github.io/extensions/toc/

## Configuration

Add the following lines to `mkdocs.yml`:

``` yaml
markdown_extensions:
  - toc:
      permalink: true
```

This will add a link containing the paragraph symbol `¶` at the end of each
headline (exactly like on the page you're currently viewing), which Material
for MkDocs will make appear on hover. In order to change the text of the
permalink, a string can be passed, e.g.:

``` yaml
markdown_extensions:
  - toc:
      permalink: Link
```

## Usage

When enabled, permalinks are inserted automatically.
