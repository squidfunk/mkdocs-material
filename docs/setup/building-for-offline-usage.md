# Building for offline usage

If you want to ship your documentation together with your product, MkDocs has
you covered – with support from themes, [MkDocs] allows for building
offline-capable documentation. Luckily, Material for MkDocs offers offline
support for many of its features.

  [MkDocs]: https://www.mkdocs.org

## Configuration

### Built-in offline plugin

[:octicons-heart-fill-24:{ .mdx-heart } Sponsors only][Insiders]{ .mdx-insiders } ·
[:octicons-tag-24: insiders-4.10.0][Insiders] ·
:octicons-cpu-24: Plugin

The built-in offline plugin makes sure that the [site search] works when you
distribute the contents of your [site directory] as a download. Simply add
the following lines to `mkdocs.yml`:

``` yaml
plugins:
  - offline
```

> If you need to be able to build your documentation with and without
> [Insiders], please refer to the [built-in plugins] section to learn how
> shared configurations help to achieve this.

The plugin will automatically disable [`use_directory_urls`][use_directory_urls]
via `mkdocs.yml`, ensuring that users can open your documentation directly
from the local file system.

The following configuration options are available:

[`enabled`](#+offline.enabled){ #+offline.enabled }

:   :octicons-milestone-24: Default: `true` – This option specifies whether
    the plugin is enabled when building your project. If you want to switch
    the plugin off, e.g. for local builds, use an [environment variable]:

    ``` yaml
    plugins:
      - offline:
          enabled: !ENV [OFFLINE, false]
    ```

Now, after invoking `mkdocs build`, you can open `site/index.html` directly
in your browser and the [site search] will work as if the documentation was
hosted on a regular server.

!!! tip "Automatically bundle all external assets"

    The brand-new [built-in privacy plugin] makes it easy to use external assets
    while building documentation for offline usage, as it will automatically
    download all external assets to distribute them with your documentation.

  [Insiders]: ../insiders/index.md
  [site search]: setting-up-site-search.md
  [site directory]: https://www.mkdocs.org/user-guide/configuration/#site_dir
  [built-in plugins]: ../insiders/getting-started.md#built-in-plugins
  [use_directory_urls]: https://www.mkdocs.org/user-guide/configuration/#use_directory_urls
  [environment variable]: https://www.mkdocs.org/user-guide/configuration/#environment-variables
  [built-in privacy plugin]: ensuring-data-privacy.md#built-in-privacy-plugin

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
