---
title: Built-in optimize plugin
icon: material/rabbit
---

# Built-in optimize plugin

The optimize plugin automatically identifies and optimizes all media files when
[building your project] by using common compression and conversion techniques.
As a result, your site loads significantly faster and yields better rankings in
search engines.

---

<!-- md:sponsors --> __Sponsors only__ – this plugin is currently reserved to
[our awesome sponsors].

  [building your project]: ../creating-your-site.md#building-your-site
  [our awesome sponsors]: ../insiders/index.md

## Objective

### How it works

The plugin scans the [`docs` directory][mkdocs.docs_dir] for media files and
assets, optimizing them automatically in order to reduce the final size of the
[`site` directory][mkdocs.site_dir]. This leads to faster loading times as you
ship less bytes to your users, as well as a smaller download for
[offline-capable documentation].

Optimized images are [intelligently cached][intelligent caching], which is why
the plugin will only optimize media files that changed since the last build.
This makes it possible to swap out or update images, without having to worry
about optimizing them, or even worse, forgetting to do so.

In order to optimize media files, a few [dependencies] need to be available on
your system.

  [offline-capable documentation]: ../setup/building-for-offline-usage.md
  [dependencies]: #configuration

### When to use it

It's generally recommended to use the plugin, as media files are optimized
automatically without the need for intervention, ensuring that your site loads
as fast as possible. Optimized media files are one of the key components for a
high and consistent ranking in search engines.

Additionally, the plugin can be combined with other built-in plugins
that Material for MkDocs offers, in order to create sophisticated
build pipelines tailored to your project:

<div class="grid cards" markdown>

-   :material-shield-account: &nbsp; __[Built-in privacy plugin][privacy]__

    ---

    The privacy plugin makes it easy to use unoptimized external assets, passing
    them to the optimize plugin before copying them to the [`site` directory]
    [mkdocs.site_dir].

    ---

    __External media files can be automatically downloaded and optimized__

-   :material-connection: &nbsp; __[Built-in offline plugin][offline]__

    ---

    The offline plugin adds support for building offline-capable documentation,
    so you can distribute the [`site` directory][mkdocs.site_dir] as a `.zip`
    file that can be downloaded.

    ---

    __Your documentation can be distributed as a smaller `.zip` download__

</div>

  [privacy]: privacy.md
  [offline]: offline.md

## Configuration

<!-- md:sponsors -->
<!-- md:version insiders-4.29.0 -->
<!-- md:plugin [optimize] – built-in -->
<!-- md:flag multiple -->
<!-- md:flag experimental -->

As with all [built-in plugins], getting started with the optimize plugin is
straightforward. Just add the following lines to `mkdocs.yml`, and observe how
media files are optimized automatically:

``` yaml
plugins:
  - optimize
```

The optimize plugin is built into Material for MkDocs and doesn't need to be
installed.

However, in order to optimize all media files, it's necessary to install the
dependencies for [image processing], if they're not already available on your
system. The linked guide includes instructions for several operating systems
and mentions some alternative environments.

  [optimize]: optimize.md
  [built-in plugins]: index.md
  [image processing]: requirements/image-processing.md

### General

The following settings are available:

---

#### <!-- md:setting config.enabled -->

<!-- md:sponsors -->
<!-- md:version insiders-4.29.0 -->
<!-- md:default `true` -->

Use this setting to enable or disable the plugin when [building your project].
If you want to disable the plugin, e.g., for local builds, you can use an
[environment variable][mkdocs.env] in `mkdocs.yml`:

``` yaml
plugins:
  - optimize:
      enabled: !ENV [CI, false]
```

This configuration enables the plugin only during continuous integration (CI).

---

#### <!-- md:setting config.concurrency -->

<!-- md:sponsors -->
<!-- md:version insiders-4.29.0 -->
<!-- md:default available CPUs - 1 -->

With more CPUs available, the plugin can do more work in parallel, and thus
complete media file optimization faster. If you want to disable concurrent
processing completely, use:

``` yaml
plugins:
  - optimize:
      concurrency: 1
```

By default, the plugin uses all available CPUs - 1 with a minimum of 1.

### Caching

The plugin implements an [intelligent caching] mechanism, ensuring that a media
file or asset is only passed through the optimization pipeline when its contents
change. If you swap out or update an image, the plugin detects it and updates
the optimized version of the media file.

The following settings are available for caching:

  [intelligent caching]: requirements/caching.md

---

#### <!-- md:setting config.cache -->

<!-- md:sponsors -->
<!-- md:version insiders-4.29.0 -->
<!-- md:default `true` -->

Use this setting to instruct the plugin to bypass the cache, in order to
re-optimize all media files, even though the cache may not be stale. It's
normally not necessary to specify this setting, except for when debugging
the plugin itself. Caching can be disabled with:

``` yaml
plugins:
  - optimize:
      cache: false
```

---

#### <!-- md:setting config.cache_dir -->

<!-- md:sponsors -->
<!-- md:version insiders-4.29.0 -->
<!-- md:default `.cache/plugin/optimize` -->

It is normally not necessary to specify this setting, except for when you want
to change the path within your root directory where media files are cached.
If you want to change it, use:

``` yaml
plugins:
  - optimize:
      cache_dir: my/custom/dir
```

If you're using [multiple instances] of the plugin, it can be a good idea to
set different cache directories for both instances, so that they don't interfere
with each other.

  [multiple instances]: index.md#multiple-instances

### Optimization

Documentation often makes use of screenshots or diagrams for better
visualization of things, both of which are prime candidates for optimization.
The plugin automatically optimizes images using [pngquant] for `.png` files,
and [Pillow] for `.jpg` files.

The following settings are available for optimization:

  [pngquant]: https://pngquant.org/
  [Pillow]: https://pillow.readthedocs.io/

---

#### <!-- md:setting config.optimize -->

<!-- md:sponsors -->
<!-- md:version insiders-4.41.0 -->
<!-- md:default `true` -->

Use this setting to enable or disable media file optimization. Currently,
the plugin's sole purpose is to optimize media files, so it's equivalent to the
[`enabled`][config.enabled] setting, but in the near future, other features
might be added. If you want to disable optimization, use:

``` yaml
plugins:
  - optimize:
      optimize: false
```

---

#### <!-- md:setting config.optimize_png -->

<!-- md:sponsors -->
<!-- md:version insiders-4.29.0 -->
<!-- md:default `true` -->

Use this setting to enable or disable the optimization of `.png` files. It's
normally not necessary to specify this setting, but if you want to disable
the optimization of `.png` files, use:

``` yaml
plugins:
  - optimize:
      optimize_png: false
```

---

#### <!-- md:setting config.optimize_png_speed -->

<!-- md:sponsors -->
<!-- md:version insiders-4.29.0 -->
<!-- md:default `3` of `1-10` -->

Use this setting to specify the speed/quality tradeoff that [pngquant] applies
when optimizing `.png` files. The lower the number, the more aggressively
[pngquant] will try to optimize:

=== "Slower <small>smaller</small>"

    ``` yaml
    plugins:
      - optimize:
          optimize_png_speed: 1
    ```

=== "Faster <small>larger</small>"

    ``` yaml
    plugins:
      - optimize:
          optimize_png_speed: 10
    ```

A factor of `10` has 5% lower quality, but is 8x faster than the default `3`.

---

#### <!-- md:setting config.optimize_png_strip -->

<!-- md:sponsors -->
<!-- md:version insiders-4.29.0 -->
<!-- md:default `true` -->

Use this setting to specify whether [pngquant] should strip optional metadata
from `.png` files that are not required to display the image, e.g., [EXIF].
If you want to preserve metadata, use:

``` yaml
plugins:
  - optimize:
      optimize_png_strip: false
```

  [EXIF]: https://en.wikipedia.org/wiki/Exif

---

#### <!-- md:setting config.optimize_jpg -->

<!-- md:sponsors -->
<!-- md:version insiders-4.29.0 -->
<!-- md:default `true` -->

Use this setting to enable or disable the optimization of `.jpg` files. It's
normally not necessary to specify this setting, but if you want to disable
the optimization of `.jpg` files, use:

``` yaml
plugins:
  - optimize:
      optimize_jpg: false
```

---

#### <!-- md:setting config.optimize_jpg_quality -->

<!-- md:sponsors -->
<!-- md:version insiders-4.29.0 -->
<!-- md:default `60` of `0-100` -->

Use this setting to specify the image quality that [Pillow] applies when
optimizing `.jpg` files. If the images look blurry, it's a good idea to
fine-tune and change this setting:

``` yaml
plugins:
  - optimize:
      optimize_jpg_quality: 75
```

---

#### <!-- md:setting config.optimize_jpg_progressive -->

<!-- md:sponsors -->
<!-- md:version insiders-4.29.0 -->
<!-- md:default `true` -->

Use this setting to specify whether [Pillow] should use progressive encoding
when optimizing `.jpg` files, rendering faster on slow connections. If you want
to disable progressive encoding, use:

``` yaml
plugins:
  - optimize:
      optimize_jpg_progressive: false
```

  [progressive encoding]: https://medium.com/hd-pro/jpeg-formats-progressive-vs-baseline-73b3938c2339

---

#### <!-- md:setting config.optimize_include -->

<!-- md:sponsors -->
<!-- md:version insiders-4.41.0 -->
<!-- md:default none -->

Use this setting to enable media file optimization for specific directories
of your project, e.g., when using [multiple instances] of the plugin to optimize
media files differently:

``` yaml
plugins:
  - optimize:
      optimize_include:
        - screenshots/*
```

This configuration enables optimization for all media files that are contained
in the `screenshots` folder and its subfolders inside the [`docs` directory]
[mkdocs.docs_dir].

---

#### <!-- md:setting config.optimize_exclude -->

<!-- md:sponsors -->
<!-- md:version insiders-4.41.0 -->
<!-- md:default none -->

Use this setting to disable media file optimization for specific directories
of your project, e.g., when using [multiple instances] of the plugin to optimize
media files differently:

``` yaml
plugins:
  - social:
      optimize_exclude:
        - vendor/*
```

This configuration disables optimization for all media files that are contained
in the `vendor` folder and its subfolders inside the [`docs` directory]
[mkdocs.docs_dir].

### Reporting

The following settings are available for reporting:

---

#### <!-- md:setting config.print_gain -->

<!-- md:sponsors -->
<!-- md:version insiders-4.29.0 -->
<!-- md:default `true` -->

Use this setting to control whether the plugin should print the number of bytes
gained after optimizing each file. If you want to disable this behavior, use:

``` yaml
plugins:
  - optimize:
      print_gain: false
```

---

#### <!-- md:setting config.print_gain_summary -->

<!-- md:sponsors -->
<!-- md:version insiders-4.29.0 -->
<!-- md:default `true` -->

Use this setting to control whether the plugin should print the total number of
bytes gained after optimizing all files. If you want to disable this behavior,
use:

``` yaml
plugins:
  - optimize:
      print_gain_summary: false
```
