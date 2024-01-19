---
title: Built-in privacy plugin
icon: material/shield-account
---


# Built-in privacy plugin

The privacy plugin offers a streamlined solution for automatically self-hosting
external assets. With just a single line of configuration, the plugin can
automatically identify and download external assets, making GDPR compliance
as effortless as it can possibly be.

## Objective

### How it works

The plugin scans the generated HTML for external assets, i.e., scripts, style
sheets, images, and web fonts, downloads them, stores them in the
[`site` directory][mkdocs.site_dir] and replaces all references with links to
the downloaded copies for effortless self-hosting. For example:

``` html
<script src="https://example.com/script.js"></script>
```

This external script is downloaded, and the link is replaced with:

``` html
<script src="assets/external/example.com/script.js"></script>
```

Of course, scripts and style sheets can reference further external assets,
which is why this process is repeated recursively until no further external
assets are detected:

- Scripts are scanned for further scripts, style sheets and JSON files
- Style sheets are scanned for images and web fonts

Additionally, hints like [`preconnect`][preconnect], used to reduce latency when
requesting external assets, are removed from the output, as they're not
necessary when self-hosting. After the plugin has done it's work, your project
will be free of requests to external services.

There are some [limitations].

  [preconnect]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preconnect
  [limitations]: #limitations

### When to use it

The plugin was developed to make compliance with the 2018 European
__General Data Protection Regulation__ (GDPR) as simple as possible, while
retaining the flexibility and power that Material for MkDocs offers, like for
example its tight integration with [Google Fonts].

But, that's only the start. For example, if your project includes a lot of
images, enabling the plugin allows to move them outside of your repository, as
the plugin will automatically download and store them in the [`site` directory]
[mkdocs.site_dir] when [building your project].

Even more interestingly, the plugin can be combined with other built-in plugins
that Material for MkDocs offers, in order to create sophisticated build
pipelines tailored to your project:

<div class="grid cards" markdown>

-   :material-rabbit: &nbsp; __[Built-in optimize plugin][optimize]__

    ---

    The optimize plugin allows to optimize all downloaded external assets
    detected by the privacy plugin by using compression and conversion
    techniques.

    ---

    __External media files are automatically downloaded and optimized__

-   :material-connection: &nbsp; __[Built-in offline plugin][offline]__

    ---

    The offline plugin adds support for building [offline-capable documentation],
    so you can distribute the [`site` directory][mkdocs.site_dir] as a `.zip`
    file that can be downloaded.

    ---

    __Your documentation can work without connectivity to the internet__

</div>

  [Google Fonts]: ../setup/changing-the-fonts.md
  [building your project]: ../creating-your-site.md#building-your-site
  [optimize]: optimize.md
  [offline]: offline.md
  [offline-capable documentation]: ../setup/building-for-offline-usage.md

## Configuration

<!-- md:version 9.5.0 -->
<!-- md:plugin [privacy] – built-in -->
<!-- md:flag multiple -->
<!-- md:flag experimental -->

As with all [built-in plugins], getting started with the privacy plugin is
straightforward. Just add the following lines to `mkdocs.yml`, and start
effortlessly self-hosting external assets:

``` yaml
plugins:
  - privacy
```

The privacy plugin is built into Material for MkDocs and doesn't need to be
installed.

  [privacy]: privacy.md
  [built-in plugins]: index.md

### General

The following settings are available:

---

#### <!-- md:setting config.enabled -->

<!-- md:version 9.5.0 -->
<!-- md:default `true` -->

Use this setting to enable or disable the plugin when [building your project].
If you want to disable the plugin, e.g., for local builds, you can use an
[environment variable][mkdocs.env] in `mkdocs.yml`:

``` yaml
plugins:
  - privacy:
      enabled: !ENV [CI, false]
```

This configuration enables the plugin only during continuous integration (CI).

---

#### <!-- md:setting config.concurrency -->

<!-- md:version 9.5.0 -->
<!-- md:default available CPUs - 1 -->

With more CPUs available, the plugin can do more work in parallel, and thus
complete handling of external assets faster. If you want to disable concurrent
processing completely, use:

``` yaml
plugins:
  - privacy:
      concurrency: 1
```

By default, the plugin uses all available CPUs - 1 with a minimum of 1.

### Caching

The plugin implements an [intelligent caching] mechanism, ensuring that external
assets are only downloaded when they're not already contained in the cache.
While the initial build might take some time, it's a good idea to use caching,
as it will speed up consecutive builds.

The following settings are available for caching:

  [intelligent caching]: requirements/caching.md

---

#### <!-- md:setting config.cache -->

<!-- md:version 9.5.0 -->
<!-- md:default `true` -->

Use this setting to instruct the plugin to bypass the cache, in order to
re-schedule downloads for all external assets, even though the cache may not be
stale. It's normally not necessary to specify this setting, except for when
debugging the plugin itself. Caching can be disabled with:

``` yaml
plugins:
  - privacy:
      cache: false
```

---

#### <!-- md:setting config.cache_dir -->

<!-- md:version 9.5.0 -->
<!-- md:default `.cache/plugin/privacy` -->

It is normally not necessary to specify this setting, except for when you want
to change the path within your root directory where downloaded copies are
cached. If you want to change it, use:

``` yaml
plugins:
  - privacy:
      cache_dir: my/custom/dir
```

If you're using [multiple instances] of the plugin, it can be a good idea to
set different cache directories for both instances, so that they don't interfere
with each other.

  [multiple instances]: index.md#multiple-instances

### Logging

The following settings are available for logging:

---

#### <!-- md:setting config.log -->

<!-- md:sponsors -->
<!-- md:version insiders-4.50.0 -->
<!-- md:default `true` -->

Use this setting to control whether the plugin should display log messages when
building your site. While not being recommended, you can disable logging with:

``` yaml
plugins:
  - privacy:
      log: false
```

---

#### <!-- md:setting config.log_level -->

<!-- md:sponsors -->
<!-- md:version insiders-4.50.0 -->
<!-- md:default `info` -->

Use this setting to control the log level that the plugin should employ when
encountering errors, which requires that the [`log`][config.log] setting is
enabled. The following log levels are available:

=== "`error`"

    ``` yaml
    plugins:
      - privacy:
          log_level: error
    ```

    Only errors are reported.

=== "`warn`"

    ``` yaml
    plugins:
      - privacy:
          log_level: warn
    ```

    Errors and warnings are reported, terminating the build in
    [`strict`][mkdocs.strict] mode. This includes warnings when symlinks cannot
    be created due to a lack of permissions on Windows systems (#6550).

=== "`info`"

    ``` yaml
    plugins:
      - privacy:
          log_level: info
    ```

    Errors, warnings and informational messages are reported, including which
    assets were successfully downloaded by the plugin.

=== "`debug`"

    ``` yaml
    plugins:
      - privacy:
          log_level: debug
    ```

    All messages are reported, including debug messages, if and only if MkDocs
    was started with the `--verbose` flag. Note that this will print a lot of
    messages and is only useful for debugging.

### External assets

The following settings are available for external assets:

---

#### <!-- md:setting config.assets -->

<!-- md:version 9.5.0 -->
<!-- md:default `true` -->

Use this setting to control whether the plugin should download external
assets. If you only want the plugin to process [external links], you can disable
handling of external assets with:

``` yaml
plugins:
  - privacy:
      assets: false
```

  [external links]: #external-links

---

#### <!-- md:setting config.assets_fetch -->

<!-- md:version 9.5.0 -->
<!-- md:default `true` -->

Use this setting to control whether the plugin should downloads or only report
external assets when they're encountered. If you already self-host all external
assets, this setting can be used as a safety net to detect links to external
assets placed by the author in pages:

``` yaml
plugins:
  - privacy:
      assets_fetch: true
```

---

#### <!-- md:setting config.assets_fetch_dir -->

<!-- md:version 9.5.0 -->
<!-- md:default `assets/external` -->

It is normally not necessary to specify this setting, except for when you want
to change the path within the [`site` directory][mkdocs.site_dir] where
external assets are stored. If you want to change it, use:

``` yaml
plugins:
  - privacy:
      assets_fetch_dir: my/custom/dir
```

This configuration stores the downloaded copies at `my/custom/dir` in the
[`site` directory][mkdocs.site_dir].

---

#### <!-- md:setting config.assets_include -->

<!-- md:sponsors -->
<!-- md:version insiders-4.37.0 -->
<!-- md:default none -->

Use this setting to enable downloading of external assets for specific origins,
e.g., when using [multiple instances] of the plugin to fine-tune processing of
external assets for different origins:

``` yaml
plugins:
  - privacy:
      assets_include:
        - unsplash.com/*
```

---

#### <!-- md:setting config.assets_exclude -->

<!-- md:sponsors -->
<!-- md:version insiders-4.37.0 -->
<!-- md:default none -->

Use this setting to disable downloading of external assets for specific origins,
e.g., when using [multiple instances] of the plugin to fine-tune processing of
external assets for different origins:

``` yaml
plugins:
  - privacy:
      assets_exclude: # (1)!
        - cdn.jsdelivr.net/npm/mathjax@3/*
        - giscus.app/*
```

1.  [MathJax] loads web fonts for typesetting of mathematical content
    through relative URLs, and thus cannot be automatically bundled by the
    privacy plugin. [MathJax can be self-hosted].

    [Giscus], which we recommend to use as a [comment system], uses a technique
    called code-splitting to load only the code that is necessary, which
    is implemented via relative URLs. [Giscus can be self-hosted] as well.

  [MathJax]: ../reference/math.md
  [MathJax can be self-hosted]: https://docs.mathjax.org/en/latest/web/hosting.html
  [Giscus]: https://giscus.app/
  [comment system]: ../setup/adding-a-comment-system.md
  [Giscus can be self-hosted]: https://github.com/giscus/giscus/blob/main/SELF-HOSTING.md

---

### External links

The following settings are available for external links:

---

#### <!-- md:setting config.links -->

<!-- md:sponsors -->
<!-- md:version insiders-4.37.0 -->
<!-- md:default `true` -->

Use this setting to instruct the plugin to parse and process external links to
annotate them for [improved security], or to automatically add additional
attributes to external links. If you want to disable processing of external
links, use:

``` yaml
plugins:
  - privacy:
      links: false
```

  [improved security]: https://developer.chrome.com/en/docs/lighthouse/best-practices/external-anchors-use-rel-noopener/

---

#### <!-- md:setting config.links_attr_map -->

<!-- md:sponsors -->
<!-- md:version insiders-4.37.0 -->
<!-- md:default none -->

Use this setting to specify additional attributes that should be added to
external links, for example, to add `target="_blank"` to all external links
so they open in a new tab:

``` yaml
plugins:
  - privacy:
      links_attr_map:
        target: _blank
```

---

#### <!-- md:setting config.links_noopener -->

<!-- md:sponsors -->
<!-- md:version insiders-4.37.0 -->
<!-- md:default `true` -->

It is normally not recommended to change this setting, as it will automatically
annotate external links that open in a new window with `rel="noopener"` for
[improved security]:

``` yaml
plugins:
  - privacy:
      links_noopener: true
```

## Limitations

Dynamically created URLs as part of scripts are not detected, and thus cannot be
downloaded automatically, as the plugin does not execute scripts – it only detects fully qualified URLs for downloading and replacement. In short, don't do this:

``` js
const cdn = "https://polyfill.io"
const url = `${cdn}/v3/polyfill.min.js`
```

Instead, always use fully qualified URLs:

``` js
const url ="https://polyfill.io/v3/polyfill.min.js"
```
