# Permalinks

Permalinks are a feature of the [Table of Contents][1] extension, which is part
of the standard Markdown library. The extension inserts an anchor at the end of
each headline, which makes it possible to directly link to a subpart of the
document.

  [1]: https://pythonhosted.org/Markdown/extensions/toc.html

## Installation

To enable permalinks, add the following to your `mkdocs.yml`:

``` yaml
markdown_extensions:
  - toc(permalink=true)
```

This will add a link containing the paragraph symbol `¶` at the end of each
headline (exactly like on the page you're currently viewing), which the
Material theme will make appear on hover. In order to change the text of the
permalink, a string can be passed, e.g.:

``` markdown
markdown_extensions:
  - toc(permalink=Link)
```

## Usage

When enabled, permalinks are inserted automatically.
