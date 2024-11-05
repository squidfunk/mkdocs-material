# Building an optimized site

Material for MkDocs, by default, allows to build optimized sites that rank great
on search engines, load fast (even on slow networks), and work perfectly without
JavaScript. Additionally, the [built-in optimize plugin] adds support for
further useful automatic optimization techniques.

  [built-in optimize plugin]: #built-in-optimize-plugin

## Configuration

### Built-in projects plugin

<!-- md:sponsors -->
<!-- md:version insiders-4.38.0 -->
<!-- md:plugin [projects] – built-in -->
<!-- md:flag experimental -->

The built-in projects plugin allows to split your documentation into multiple
distinct MkDocs projects, __build them concurrently__ and
__serve them together__. Add the following to `mkdocs.yml`:

``` yaml
plugins:
  - projects
```

For a list of all settings, please consult the [plugin documentation].

  [projects]: ../plugins/projects.md
  [plugin documentation]: ../plugins/projects.md

??? info "Use cases for the projects plugin"

    Ideal use cases for the projects plugin are:

    - Building a multi-language site
    - Building a blog alongside your documentation
    - Splitting large code bases for better performance

    Note that the plugin is currently experimental. We're releasing it early,
    so that we can improve it together with our users and make it even more
    powerful as we discover new use cases.

#### Scope

<!-- md:version 8.0.0 -->
<!-- md:default none -->

There might be a use case, where you want to share user-level settings like
the selected [color palette], or [cookie consent] across all projects. To do
so, add the following lines to `mkdocs.yml`:

``` yaml
extra:
  scope: /
```

!!! example "How it works"

    Suppose you have this site structure:
    ```
    .
    └── /
        ├── subsite-a/
        ├── subsite-b/
        └── subsite-c/
    ```
    By default, each site will have its own scope (`/subsite-a/`, `/subsite-b/`,
    `/subsite-c/`). To modify this behaviour, add the following lines to
    `mkdocs.yml`:

    ``` yaml
    extra:
      scope: /
    ```

    By setting it to `/`, it should allow you to share the following preferences
    across the main site and all subsites:

    - [Cookie consent][cookie consent]
    - [Linking of content tabs, i.e. active tab]
    - [Color palette][color palette]

  [Scope support]: https://github.com/squidfunk/mkdocs-material/releases/tag/8.0.0
  [cookie consent]: ../setup/ensuring-data-privacy.md#cookie-consent
  [Linking of content tabs, i.e. active tab]: ../reference/content-tabs.md
  [color palette]: ../setup/changing-the-colors.md#color-palette

### Built-in optimize plugin

<!-- md:sponsors -->
<!-- md:version insiders-4.29.0 -->
<!-- md:plugin [optimize] – built-in -->
<!-- md:flag experimental -->

The built-in optimize plugin automatically identifies and optimizes all media
files as part of the build using compression and conversion techniques. Add
the following lines to `mkdocs.yml`:

``` yaml
plugins:
  - optimize
```

For a list of all settings, please consult the [plugin documentation][optimize].

  [optimize]: ../plugins/optimize.md
