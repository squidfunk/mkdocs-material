---
title: Built-in typeset plugin
icon: material/format-title
status: deprecated
---

# Built-in typeset plugin

The typeset plugin allows to preserve the enriched presentation of titles and
headlines within the navigation and table of contents. This means that code
blocks, icons, emojis and any other inline formatting can be rendered exactly
as defined in the page's content.

!!! bug "The built-in typeset plugin is deprecated"

    [Material for MkDocs is in maintenance mode]. The typeset plugin, which was
    formely part of the [Insiders] edition, was released in <!-- md:version 9.7.0 -->, the last release that includes all features from the Insiders edition.
    Unfortunately, the typeset plugin turned out impossible to maintain, and
    was one of the key motivators to create [Zensical].

    ---

    __If you're considering the typeset plugin, please be aware that known issues will <u>not</u> be fixed.__

  [Material for MkDocs is in maintenance mode]: https://github.com/squidfunk/mkdocs-material/issues/8523
  [Zensical]: ../blog/posts/zensical.md
  [Insiders]: ../insiders/index.md

## Objective

### How it works

When [building your project], MkDocs extracts the plain text from headlines and
drops the original formatting. This is generally useful and a good idea, since
this information is made available to other plugins that might have problems
when being passed HTML instead of plain text.

However, it also means that the entire formatting is lost.

The plugin hooks into the rendering process, extracts the original headlines,
and makes them available to be used in templates and plugins. The templates of
Material for MkDocs use this information to render an enriched version of the
navigation and table of contents.

  [building your project]: ../creating-your-site.md#building-your-site

### When to use it

It's generally recommended to use the plugin, because it is a drop-in solution
that doesn't require any configuration and is designed to work out of the box.
Since it doesn't overwrite but only adds information, it's not expected to
interfere with other plugins.

## Configuration

<!-- md:version 9.7.0 -->
<!-- md:plugin [typeset] – built-in -->
<!-- md:flag experimental -->

As with all [built-in plugins], getting started with the typeset plugin is
straightforward. Just add the following lines to `mkdocs.yml`, and observe the
enriched navigation and table of contents:

``` yaml
plugins:
  - typeset
```

The typeset plugin is built into Material for MkDocs and doesn't need to be
installed.

  [typeset]: typeset.md
  [built-in plugins]: index.md

### General

The following settings are available:

---

#### <!-- md:setting config.enabled -->

<!-- md:version 9.7.0 -->
<!-- md:default `true` -->

Use this setting to enable or disable the plugin when [building your project].
It's normally not necessary to specify this setting, but if you want to disable
the plugin, use:

``` yaml
plugins:
  - typeset:
      enabled: false
```

  [building your project]: ../creating-your-site.md#building-your-site
