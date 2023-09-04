# Setting up site scope

There might be a use case, where you have multiple subsites built separately and aggregated on the main site.
Material for MkDocs keeps preferences separately for each subsite, but you can easily change that.

## Configuration

### Scope

[:octicons-tag-24: 8.0.0][Scope support] ·
:octicons-milestone-24: Default: `None`

Suppose you have this site structure:
```
.
└── /
    ├── subsite-a/
    ├── subsite-b/
    └── subsite-c/
```
By default, each site will have its own scope (`/subsite-a/`, `/subsite-b/`, `/subsite-c/`). To modify this behaviour, add the following lines to `mkdocs.yml`:

``` yaml
extra:
  scope: /
```

By setting it to `/`, it should allow you to share the following preferences across the main site and all subsites:

- [Cookie consent]
- [Linking of content tabs, i.e. active tab]
- [Color palette]

  [Scope support]: https://github.com/squidfunk/mkdocs-material/releases/tag/8.0.0
  [Cookie consent]: ../setup/ensuring-data-privacy.md#cookie-consent
  [Linking of content tabs, i.e. active tab]: ../reference/content-tabs.md
  [Color palette]: ../setup/changing-the-colors.md#color-palette
