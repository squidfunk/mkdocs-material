# Permalinks

Permalinks are a feature of the [Table of Contents][] extension, which is part
of the standard Markdown library. The extension inserts a link at the end of
each headline, which makes it possible to directly link to a subpart of the
document.

## Installation

To enable Permalinks, add the following to your `mkdocs.yml`:

``` markdown
- toc:
    permalink: true
```

This will add a link containing the paragraph symbol "¶" at the end of each
headline (exactly like on the page you're currently viewing), which the
Material theme will make appear on hover. In order to change the text of the
permalink, a string can be passed, e.g.:

``` markdown
- toc:
    permalink: "Permalink"
```

## Usage

When enabled, permalinks are inserted automatically.

[Table of Contents]: https://pythonhosted.org/Markdown/extensions/toc.html
