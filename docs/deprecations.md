---
template: overrides/main.html
---

# Deprecations

This page includes a list of deprecations, indicating which features of Material
for MkDocs were replaced with newer, more flexible alternatives, and thus should
not be used anymore.

## Front matter

### Redirect

:octicons-archive-24: Deprecated: 5.5.0 ·
:octicons-trash-24: Removal: 6.x

The `redirect` key, which could be added via [Metadata][1], allowed to
specify a redirect from within a document to a new address, which is a good
idea when moving content around:

``` markdown
---
redirect: /path/to/new/file
---
```

The [redirects][2] plugin provides the ability to define redirect mappings via
`mkdocs.yml`, which is considered to be a much better solution to achieve the
same result. It can be installed with `pip`:

```
pip install mkdocs-redirects
```

Redirect mappings can then be added to `mkdocs.yml`:

``` yaml
plugins:
  - redirects:
      redirect_maps:
        path/to/old/file.md: path/to/new/file.md
```

  [1]: reference/meta-tags.md#metadata
  [2]: https://github.com/datarobot/mkdocs-redirects

### Source link

:octicons-archive-24: Deprecated: 5.5.0 ·
:octicons-trash-24: Removal: 6.x

The `source` and `path` keys, which could be added via [Metadata][1], showed
a source icon at the top right corner of a document, linking a document to a
single source file:

``` markdown
---
path: tree/master/docs
source: deprecations.md
---
```

Only a single source file could be linked, which is useless if a document refers
to multiple files (or multiple sections within a single file). A more flexible
approach is to use the new [icon integration][3]:

``` markdown
[:octicons-file-code-24: Source](https://github.com/squidfunk/mkdocs-material/blob/master/docs/deprecations.md)
```

This will render as [:octicons-file-code-24: Source][4], which can be included
at arbitrary positions in any document.

  [3]: setup/changing-the-logo-and-icons.md#icons
  [4]: https://github.com/squidfunk/mkdocs-material/blob/master/docs/deprecations.md

### Hero

:octicons-archive-24: Deprecated: 5.5.0 ·
:octicons-trash-24: Removal: 6.x

The `hero` key, which could be added via [Metadata][1], allowed to render a
simple, text-only and page-local teaser text as part of a document. It could
be set from front matter with:

``` markdown
---
hero: Lorem ipsum dolor sit amet
---
```

The recommended way is to [override the `hero` block][5] via [theme
extension][6] for a specific page, which has the nice side effect that hero
templates can be shared among multiple pages:

=== "Markdown"

    ``` markdown
    ---
    template: overrides/hero.html
    ---
    ```

=== "Template"

    ``` html
    {% block hero %}
      <!-- Add custom hero here -->
    {% endblock %}
    ```

  [5]: customization.md#overriding-blocks
  [6]: customization.md#extending-the-theme
