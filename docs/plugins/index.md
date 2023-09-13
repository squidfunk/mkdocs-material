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

The following plugins make working with large documentation projects easier by
providing better management capabilities, most notable management of plugins,
multiple projects, metadata. Additionally we provide a plugin that makes it
simple to report bugs:

<div class="grid cards" markdown>

-   :material-format-list-group: &nbsp; __[Built-in group plugin][group]__

    ---

    The group plugin allows to group plugins into logical units to conditionally
    enable or disable them for specific environments with the use of
    [environment variables][mkdocs.env].

    ---

    __Better management of plugins when building in different environments__

-   :material-file-tree: &nbsp; __[Built-in meta plugin][meta]__

    ---

    The meta plugin makes it easy to manage metadata (front matter) for all
    pages in a folder and all of its subfolders, i.e., a subsection of your
    project.

    ---

    __Simpler organization, categorization and management of pages__

-   :material-folder-open: &nbsp; __[Built-in projects plugin][projects]__

    ---

    The projects plugin allows to split your main project into multiple distinct
    projects, build them concurrently and preview them together as one.

    ---

    __Connect multiple projects together, and build them separately and as one__

-   :material-information: &nbsp; __[Built-in info plugin][info]__

    ---

    The info plugin is a small and useful utility that helps to create
    self-contained minimal reproductions, so we maintainers can fix bugs more
    quickly.

    ---

    __Your bug reports include all necessary information to fix them as fast as
    possible__


</div>

  [group]: group.md
  [info]: info.md
  [meta]: meta.md
  [projects]: meta.md

### Optimization

The following plugins are designed to help you build optimized documentation,
make it more accessible to your users, yield faster loading times and better
search engine rankings, beautiful preview images on social media and
make it GDPR compliant with a few lines of configuration:

<div class="grid cards" markdown>

-   :material-share-circle: &nbsp; __[Built-in social plugin][social]__

    ---

    The social plugin automatically generates beautiful and customizable
    social cards for each page of your documentation when links are shared on
    social media.

    ---

    __Links to your site render beautiful social cards when shared on social
    media__

-   :material-rabbit: &nbsp; __[Built-in optimize plugin][optimize]__

    ---

    The optimize plugin automatically identifies and optimizes all media files
    that you reference in your project by using compression and conversion
    techniques.

    ---

    __Your site loads faster as smaller images are served to your users__

-   :material-shield-account: &nbsp; __[Built-in privacy plugin][privacy]__

    ---

    The privacy plugin downloads external assets automatically for easy
    self-hosting, allowing for GDPR compliance with a single line of
    configuration.

    ---

    __Your documentation can be made GDPR compliant with minimal effort__

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

### Content

The following plugins are designed to help you set up a blog, provide search
functionality to your users, add tags to your pages and use the same typesetting
capabilities in specific parts of the documentation as in the main content:

<div class="grid cards" markdown>

-   :material-newspaper-variant-outline: &nbsp; __[Built-in blog plugin][blog]__

    ---

    The blog plugin adds first-class support for blogging to Material for
    MkDocs, either as a sidecar to your documentation or as a standalone
    installation.

    ---

    __Your blog is built with the same powerful engine as your documentation__

-   :material-magnify: &nbsp; __[Built-in search plugin][search]__

    ---

    The search plugin adds a search bar to the header, allowing users to search
    your documentation, so it's easier to find what they're looking for.

    ---

    __Your documentation is searchable without any external services, even
    offline__

-   :material-tag-text: &nbsp; __[Built-in tags plugin][tags]__

    ---

    The tags plugin adds first-class support for categorizing pages with the use
    of tags, adding the possibility to group related pages, improving discovery.

    ---

    __Your pages are categorized with tags, yielding additional context__

-   :material-format-title: &nbsp; __[Built-in typeset plugin][typeset]__

    ---

    The typeset plugin allows to preserve the enriched presentation of titles
    and headlines within the navigation and table of contents.

    ---

    __Sidebars preserve the same formatting as the headlines in your pages__

</div>

  [blog]: blog.md
  [search]: search.md
  [tags]: tags.md
  [typeset]: typeset.md

## Architecture

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
