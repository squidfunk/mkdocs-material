---
title: Built-in optimize plugin
icon: material/image-size-select-small
---


# Built-in optimize plugin

## Installation

## Configuration

### General

The following settings are available:

---

#### `enabled`

<!-- md:sponsors --> ·
<!-- md:version insiders-4.29.0 --> ·
<!-- md:default `true` -->

Use this setting to enable or disable the plugin when [building your project].
If you want to disable the plugin, e.g., for local builds, you can use an
[environment variable][mkdocs.env] in `mkdocs.yml`:

``` yaml
plugins:
  - social:
      enabled: !ENV [CI, false]
```

This configuration enables the plugin only during continuous integration (CI).

  [building your project]: ../creating-your-site.md#building-your-site

---

#### `concurrency`

<!-- md:sponsors --> ·
<!-- md:version insiders-4.29.0 --> ·
<!-- md:default available CPUs - 1 -->

With more CPUs available, the plugin can do more work in parallel, and thus
complete media file optimization faster. If you want to disable concurrent
processing completely, use:

``` yaml
plugins:
  - social:
      concurrency: 1
```

By default, the plugin uses all available CPUs - 1 with a minimum of 1.

### Caching

The plugin implements an intelligent caching mechanism, ensuring that a media
file or asset is only passed through the optimization pipeline when its contents
change. If you swap out or update an image, the plugin detects it and updates
the optimized version of the media file.

The following settings are available for caching:

---

#### `cache`

<!-- md:sponsors --> ·
<!-- md:version insiders-4.29.0 --> ·
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

#### `cache_dir`

<!-- md:sponsors --> ·
<!-- md:version insiders-4.29.0 --> ·
<!-- md:default `.cache/plugin/optimize` -->

It is normally not necessary to specify this setting, except for when you want
to change the path within your project directory where media files are cached.
If you want to change it, use:

``` yaml
plugins:
  - optimize:
      cache_dir: path/to/folder
```

If you're using [multiple instances] of the plugin, it can be a good idea to
set different cache directories for both instances, so that they don't interfere
with each other.

  [multiple instances]: #

### Optimization

#### `optimize_png`
#### `optimize_png_speed`
#### `optimize_png_strip`

#### `optimize_jpg`
#### `optimize_jpg_quality`
#### `optimize_jpg_progressive`

### Reporting

#### `print_gain`
#### `print_gain_summary`
