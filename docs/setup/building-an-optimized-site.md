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
