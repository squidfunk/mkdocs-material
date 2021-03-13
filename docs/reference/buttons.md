---
template: overrides/main.html
---

# Buttons

Material for MkDocs provides dedicated styles for primary and secondary buttons
that can be added to any link, `label` or `button` element. This is especially
useful for documents or landing pages with dedicated _call-to-actions_.

## Configuration

### Attribute List

The [Attribute List][1] extension, which is part of the standard Markdown
library, allows to __add HTML attributes and CSS classes to Markdown elements__,
and can be enabled via `mkdocs.yml`

``` yaml
markdown_extensions:
  - attr_list
```

  [1]: https://python-markdown.github.io/extensions/attr_list/

## Usage

### Adding buttons

When the [Attribute List][2] extension is enabled, any clickable element can be
converted into a button by adding the `.md-button` CSS class, which will receive
the selected [primary color][3].

_Example_:

``` markdown
[Subscribe to our mailing list](#){ .md-button }
```

_Result_:

[Subscribe to our mailing list][4]{ .md-button }

  [2]: #attribute-list
  [3]: ../setup/changing-the-colors.md#primary-color
  [4]: javascript:alert$.next("Done!")

### Adding primary buttons

If you want to display a filled, primary button (like on the [landing page][5]
of Material for MkDocs), add both the `.md-button` and `.md-button--primary`
CSS classes.

_Example_:

``` markdown
[Subscribe to our mailing list](#){ .md-button .md-button--primary }
```

_Result_:

[Subscribe to our mailing list][4]{ .md-button .md-button--primary }

  [5]: ../index.md

### Adding icon buttons

Of course, icons can be added to both types of buttons by using the [regular
icon syntax][6] and referencing a valid path to [any icon bundled with the
theme][7].

_Example_:

``` markdown
[Submit :fontawesome-solid-paper-plane:](#){ .md-button .md-button--primary }
```

_Result_:

[Submit :fontawesome-solid-paper-plane:][4]{ .md-button .md-button--primary }

  [6]: icons-emojis.md#using-icons
  [7]: icons-emojis.md#search
