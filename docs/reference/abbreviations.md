---
template: overrides/main.html
---

# Abbreviations

Technical documentation often incurs the usage of a lot of acronyms, which may
need additional explanation, especially for new user of your project. For these
matters, Material for MkDocs uses a combination of Markdown extensions to
enable site-wide glossaries.

## Configuration

### Abbreviations

The [Abbreviations][1] extension, which is part of the standard Markdown
library, allows to __add additional content to parts of the text which are then
shown on hover__, e.g. for glossaries:

``` yaml
markdown_extensions:
  - abbr
```

  [1]: https://python-markdown.github.io/extensions/abbreviations/

### Snippets

The [Snippets][2] extension, which is part of [Python Markdown Extensions][3], 
allows to __insert content from other files__ or other, regular content, and can
be enabled via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.snippets
```

  [2]: https://facelessuser.github.io/pymdown-extensions/extensions/snippets/
  [3]: https://facelessuser.github.io/pymdown-extensions/

## Usage

### Adding abbreviations

When the [Abbreviations][4] extension is enabled, abbreviations can be defined
with a special syntax similar to URLs and [footnotes][5] at any point in the
Markdown document.

_Example_:

``` markdown
The HTML specification is maintained by the W3C.

*[HTML]: Hyper Text Markup Language
*[W3C]: World Wide Web Consortium
```

_Result_:

The HTML specification is maintained by the W3C.

*[HTML]: Hyper Text Markup Language
*[W3C]: World Wide Web Consortium

  [4]: #abbreviations_1
  [5]: footnotes.md

### Adding a glossary

When [Snippets][6] is enabled, content from other files can be embedded, which
is especially useful to include abbreviations from a central file – a glossary –
and embed them into any other file.

_Example_:

=== "docs/path/to/a/page.md"

    ```` markdown
    The HTML specification is maintained by the W3C.
    
    --8<--​ "includes/abbreviations.md"
    ````

=== "includes/abbreviations.md"

    ```` markdown
    *[HTML]: Hyper Text Markup Language
    *[W3C]: World Wide Web Consortium
    ````

_Result_:

The HTML specification is maintained by the W3C.

_Remember to locate the Markdown file containing the definitions outside of the_
`docs` _folder (here_ `includes` _is used), or MkDocs may complain about an 
unreferenced file._

  [6]: #snippets
