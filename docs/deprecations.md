---
template: overrides/main.html
---

# Deprecations

This page includes a list of deprecations, indicating which features should not
be used anymore, as they will be removed in a future release.

## Front matter

### Redirects

:octicons-archive-24: Deprecated: 5.5.0 ·
:octicons-trash-24: Will be removed in 6.0

The `redirect` key, which could be added via [Metadata][1], allowed to
specify a redirect URL from within a markdown page to a new address, to notify
the user when content was moved:

``` markdown
---
redirect: /path/to/new/file
---
```

The [mkdocs-redirects][2] plugin provides the ability to define redirect
mappings via `mkdocs.yml`, which is considered to be a much better solution to
achieve the same result:

``` yaml
plugins:
  - search
  - redirects:
      redirect_maps:
        path/to/old/file.md: path/to/new/file.md
```

  [1]: reference/meta-tags.md#metadata
  [2]: https://github.com/datarobot/mkdocs-redirects

### Linking sources

:octicons-archive-24: Deprecated: 5.5.0 ·
:octicons-trash-24: Will be removed in 6.0

The `source` and `path` keys, which could be added via [Metadata][1], showed
a source icon at the top right of a document, linking a document to a single
source file:

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

This will render as:

[:octicons-file-code-24: Source][4]


  [3]: setup/changing-the-logo-and-icons.md#icons
  [4]: https://github.com/squidfunk/mkdocs-material/blob/master/docs/deprecations.md
