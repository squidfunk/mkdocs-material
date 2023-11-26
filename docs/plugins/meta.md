---
title: Built-in meta plugin
icon: material/file-tree
---

# Built-in meta plugin

The meta plugin solves the problem of setting metadata (front matter) for all
pages in a folder, i.e., a subsection of your project, which is particularly
useful to ensure that a certain subset of pages features specific tags, uses a
custom template, or is attributed to an author.

---

<!-- md:sponsors --> __Sponsors only__ – this plugin is currently reserved to
[our awesome sponsors].

  [our awesome sponsors]: ../insiders/index.md

## Objective

### How it works

The plugin scans the [`docs` directory][mkdocs.docs_dir] for `.meta.yml` files,
and recursively merges the contents of those files with the metadata (front
matter) of all pages that are contained in the same folder and all subfolders.
For example, if you want to add the tag <span class="md-tag">Example</span> to
multiple pages, use:

``` yaml title=".meta.yml"
tags:
  - Example
```

Now, given the following directory layout, if you store the file in the folder
named `example`, all pages in that folder receive the tag, while all pages
outside of the folder remain unaffected:

``` { .sh .no-copy hl_lines="4-8" }
.
├─ docs/
│  ├─ ...
│  ├─ example/
│  │  ├─ .meta.yml
│  │  ├─ a.md
│  │  ├─ ...
│  │  └─ z.md
│  └─ ...
└─ mkdocs.yml
```

When combining metadata, lists and dictionaries are recursively merged, which
means you can append values to a list and add or set specific properties in a
dictionary on arbitrary levels.

### When to use it

While the plugin itself doesn't offer much functionality beyond adding and
merging metadata, it is a perfect companion for many of the other built-in
plugins that Material for MkDocs offers. Some of the most powerful combinations
of the meta plugin and other built-in plugins are:

<div class="grid cards" markdown>

-   :material-share-circle: &nbsp; __[Built-in social plugin][social]__

    ---

    The meta plugin can be used to [change the layout] for social cards or
    [change specific layout options] like [background] or [color]
    for a subset of pages.

    ``` yaml title=".meta.yml"
    social:
      cards_layout: default/variant
    ```

-   :material-newspaper-variant-outline: &nbsp; __[Built-in blog plugin][blog]__

    ---

    The meta plugin allows to automatically associate blog posts with specific
    [authors] and [categories], ensuring that blog posts are always correctly
    annotated.

    ``` yaml title=".meta.yml"
    authors:
      - squidfunk
    ```

-   :material-tag-text: &nbsp; __[Built-in tags plugin][tags]__

    ---

    The meta plugin makes it possible to ensure that subsections of your
    project are annotated with [specific tags], so they can't be forgotten when
    adding pages.

    ``` yaml title=".meta.yml"
    tags:
      - Example
    ```

-   :material-magnify: &nbsp; __[Built-in search plugin][search]__

    ---

    The meta plugin makes it easy to [boost] specific sections in search results
    or to [exclude] them entirely from being indexed, giving more granular
    control over search.

    ``` yaml title=".meta.yml"
    search:
      exclude: true
    ```

</div>

  [social]: social.md
  [change the layout]: social.md#meta.social.cards_layout
  [change specific layout options]: social.md#meta.social.cards_layout_options
  [background]: social.md#option.background_color
  [color]: social.md#option.color
  [blog]: blog.md
  [authors]: blog.md#meta.authors
  [categories]: blog.md#meta.categories
  [tags]: tags.md
  [specific tags]: tags.md#meta.tags
  [search]: search.md
  [exclude]: search.md#meta.search.exclude
  [boost]: search.md#meta.search.boost

## Configuration

<!-- md:sponsors -->
<!-- md:version insiders-4.21.0 -->
<!-- md:plugin [meta] – built-in -->
<!-- md:flag experimental -->

As with all [built-in plugins], getting started with the meta plugin is
straightforward. Just add the following lines to `mkdocs.yml`, and start
applying metadata for multiple pages at once:

``` yaml
plugins:
  - meta
```

The meta plugin is included with Material for MkDocs and doesn't need to be
installed.

  [meta]: meta.md
  [built-in plugins]: index.md

### General

The following settings are available:

---

#### <!-- md:setting config.enabled -->

<!-- md:sponsors -->
<!-- md:version insiders-4.38.0 -->
<!-- md:default `true` -->

Use this setting to enable or disable the plugin when [building your project].
It's normally not necessary to specify this setting, but if you want to disable
the plugin, use:

``` yaml
plugins:
  - meta:
      enabled: false
```

  [building your project]: ../creating-your-site.md#building-your-site

### Meta file

The following settings are available for meta files:

---

#### <!-- md:setting config.meta_file -->

<!-- md:sponsors -->
<!-- md:version insiders-4.21.0 -->
<!-- md:default `.meta.yml` -->

Use this setting to change the meta file name the plugin will look for when
scanning the [`docs` directory][mkdocs.docs_dir]. It's normally not necessary to
change this setting, but if you want to change it, use:

``` yaml
plugins:
  - meta:
      meta_file: .meta.yml
```

The provided path is resolved from the [`docs` directory][mkdocs.docs_dir]
recursively.
