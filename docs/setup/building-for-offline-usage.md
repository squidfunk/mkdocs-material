# Building for offline usage

If you want to ship your documentation together with your product, MkDocs has
you covered – with support from themes, [MkDocs] allows for building
offline-capable documentation. Notably, Material for MkDocs offers offline
support for many of its features.

  [MkDocs]: https://www.mkdocs.org

## Configuration

### Built-in offline plugin

<!-- md:version 9.0.0 -->
<!-- md:plugin [offline] – built-in -->

The built-in offline plugin makes sure that the [site search] works when you
distribute the contents of your [site directory] as a download. Simply add
the following lines to `mkdocs.yml`:

``` yaml
plugins:
  - offline
```

For a list of all settings, please consult the [plugin documentation].

  [offline]: ../plugins/offline.md
  [plugin documentation]: ../plugins/offline.md

!!! tip "Automatically bundle all external assets"

    The [built-in privacy plugin] makes it easy to use external assets
    while building documentation for offline usage, as it will automatically
    download all external assets to distribute them with your documentation.

  [site search]: setting-up-site-search.md
  [site directory]: https://www.mkdocs.org/user-guide/configuration/#site_dir
  [built-in privacy plugin]:../plugins/privacy.md

#### Limitations

Material for MkDocs offers many interactive features, some of which will not
work from the file system due to the restrictions of modern browsers: all
features that use the `fetch` API will error.

Thus, when building for offline usage, make sure to disable the following
configuration settings: [instant loading], [site analytics], [git repository],
[versioning] and [comment systems].

  [Instant loading]: setting-up-navigation.md#instant-loading
  [Site analytics]: setting-up-site-analytics.md
  [Versioning]: setting-up-versioning.md
  [Git repository]: adding-a-git-repository.md
  [Comment systems]: adding-a-comment-system.md
