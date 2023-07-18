---
title: Built-in offline plugin
icon: material/wifi-strength-alert-outline
---


# Built-in offline plugin

[MkDocs][mkdocs] is one of the few frameworks that allow to build offline-capable
documentation that can be directly viewed by the user – no server needed. With
the offline plugin, you can distribute your [`site` directory][mkdocs.site_dir]
as a downloadable `*.zip` while retaining most interactive functionality.

## Objective

### How it works

After [building your project], switch to the [`site` directory][mkdocs.site_dir]
and open `index.html` in your browser – you're now viewing your documentation
from your local file system! Most browsers will denote this by showing `file://`
in the address bar. However, you'll realize that the site search is gone.

Material for MkDocs offers many interactive features, some of which will not
work from the local file system due to the restrictions of modern browsers. More
specifically and technically, any usage of the [Fetch API] will error with a
message like:

```
Cross origin requests are only supported for protocol schemes: http, [...]
```

Those restrictions are essential to preserve the security of the user, but
reduce the interactivity of your project. The offline plugin makes sure that
site search keeps working by moving the search index to a JavaScript file,
and leveraging @squidfunk's [iframe-worker] shim.

Additionally, the plugin automatically disables the
[`use_directory_urls`][mkdocs.use_directory_urls] setting, ensuring that users
can open your documentation directly from the local file system.

  [building your project]: ../creating-your-site.md#building-your-site
  [Fetch API]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
  [iframe-worker]: https://github.com/squidfunk/iframe-worker

### When to use it

As the name already indicates, the plugin should only be used when you're
[building your project] for offline distribution. It's also good to know, that
the offline plugin plays nicely with the following other plugins, helping to
create even better offline-capable documentation:

<div class="grid cards" markdown>

-   :material-shield-account: &nbsp; __[Built-in privacy plugin]__

    ---

    The privacy plugin makes it easy to use external assets when building for
    offline usage, as it automatically downloads them for distribution with
    your documentation.

    ---

    - [x] Your documentation can work without connectivity to the internet[^1]

-   :material-image-size-select-small: &nbsp; __[Built-in optimize plugin]__

    ---

    The optimize plugin automatically identifies and optimizes all media files
    that you reference in your project by using compression and conversion
    techniques.

    ---

    - [x] Your documentation can be distributed as a smaller `*.zip` download

</div>

  [^1]:
    You might wonder why the [privacy plugin][Built-in privacy plugin] is
    necessary to built truly offline-capable documentation with the offline
    plugin. While it's certainly possible to also add support for downloading
    external assets to the offline plugin, this functionality is already
    fully implemented in the privacy plugin and it's very raison d'être.

    Material for MkDocs follows a modular approach for its plugin system – many
    of the plugins work perfectly together and enhance each others
    functionalities, allowing to solve complex problems with a few lines
    of configuration.

  [Built-in privacy plugin]: privacy.md
  [Built-in optimize plugin]: optimize.md

## Configuration

<!-- md:version 9.0.0 --> ·
<!-- md:flag plugin [offline] (built-in) -->

As with all [built-in plugins], enabling the offline plugin to do its work is
straight-forward. Just add the following lines to `mkdocs.yml`, and start
building offline-capable documentation:

``` yaml
plugins:
  - offline
```

  [offline]: offline.md
  [built-in plugins]: index.md

### General

The following settings are available:

---

#### `enabled`

<!-- md:version 9.0.0 --> ·
<!-- md:default `true` -->

Use this setting to enable or disable the plugin when [building your project].
If you want to build online- as well as offline-capable documentation, it's a
good idea to use an [environment variable][mkdocs.env]:

``` yaml
plugins:
  - offline:
      enabled: !ENV [OFFLINE, false]
```

## Limitations
