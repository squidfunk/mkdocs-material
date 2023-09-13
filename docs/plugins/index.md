# Built-in plugins

Material for MkDocs started out as a theme for [MkDocs][mkdocs], but has since
evolved into a full-fledged framework for building and maintaining documentation.
The theme is still the core of the project, but it's now accompanied by a
growing number of complementary built-in plugins.

We strive to make those plugins as modular and generic as possible, so that they
can be used in a wide variety of projects and use cases. By providing useful
default settings, we also try to make them as easy to use as possible, so that
you can get started quickly and then adjust them to your needs later on. When
developing built-in plugins, we adhere to the following design principles:

- **Modularity:** Built-in plugins are designed to be modular, so that they can
  be easily combined to implement sophisticated pipelines. For example, the
  [offline], [optimize] and [privacy] plugin are meant to be used together to
  build truly [offline-capable documentation].

- **Interoperability:** Built-in plugins are designed to be as compatible as
  possible, so they can be used in combination with other built-in and
  third-party plugins. This is not always possible, as there are some use cases
  that are mutually exclusive, but we try to keep those to a minimum.

- **Performance:** Built-in plugins are designed to be as fast and
  memory-efficient as possible, so that they don't unnecessarily slow down
  builds. This is particularly important for large documentation projects with
  thousands of pages.

  [mkdocs]: https://www.mkdocs.org/
  [design principles]: ../design-principles.md
  [offline-capable documentation]: ../setup/building-for-offline-usage.md

## Categories

### Management

<div class="grid cards" markdown>

-   :material-format-list-group: &nbsp; __[Built-in group plugin][group]__

    ---

    tbd

    ---

    __tbd__

-   :material-file-tree: &nbsp; __[Built-in meta plugin][meta]__

    ---

    tbd

    ---

    __tbd__

-   :material-folder-open: &nbsp; __[Built-in projects plugin][projects]__

    ---

    tbd

    ---

    __tbd__

-   :material-information: &nbsp; __[Built-in info plugin][info]__

    ---

    tbd

    ---

    __tbd__


</div>

  [group]: group.md
  [info]: info.md
  [meta]: meta.md
  [projects]: meta.md

### Optimization

<div class="grid cards" markdown>

-   :material-share-circle: &nbsp; __[Built-in social plugin][social]__

    ---

    tbd

    ---

    __tbd__

-   :material-rabbit: &nbsp; __[Built-in optimize plugin][optimize]__

    ---

    The optimize plugin automatically identifies and optimizes all media files
    that you reference in your project by using compression and conversion
    techniques.

    ---

    __Your site loads faster as smaller images are shipped to your users__

-   :material-shield-account: &nbsp; __[Built-in privacy plugin][privacy]__

    ---

    tbd

    ---

    __tbd__

-   :material-connection: &nbsp; __[Built-in offline plugin][offline]__

    ---

    The offline plugin adds support for building offline-capable documentation,
    so you can distribute the [`site` directory][mkdocs.site_dir] as a `.zip`
    file that can be downloaded.

    ---

    __Your documentation can work without connectivity to the internet__

</div>

  [offline]: offline.md
  [optimize]: optimize.md
  [privacy]: privacy.md
  [social]: social.md

### Functionality

<div class="grid cards" markdown>

-   :material-newspaper-variant-outline: &nbsp; __[Built-in blog plugin][blog]__

    ---

    tbd

    ---

    __tbd__

-   :material-magnify: &nbsp; __[Built-in search plugin][search]__

    ---

    tbd

    ---

    __tbd__

-   :material-tag-text: &nbsp; __[Built-in tags plugin][tags]__

    ---

    tbd

    ---

    __tbd__

-   :material-format-title: &nbsp; __[Built-in typeset plugin][typeset]__

    ---

    tbd

    ---

    __tbd__

</div>

  [blog]: blog.md
  [search]: search.md
  [tags]: tags.md
  [typeset]: typeset.md

## Architecture

- Explain how to use plugins in community edition and Insiders

### Multiple instances

Several built-in plugins have support for multiple instances, which means that
they can be used multiple times in the same configuration file, allowing to
fine-tune behavior for separate sections of your project. Currently, the
following plugins have support for multiple instances:

<div class="mdx-columns" markdown>

- [Built-in blog plugin][blog]
- [Built-in group plugin][group]
- [Built-in optimize plugin][optimize]
- [Built-in privacy plugin][privacy]
- [Built-in social plugin][social]

</div>
