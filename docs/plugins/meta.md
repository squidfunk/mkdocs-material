---
title: Built-in meta plugin
icon: material/file-tree
---


# Built-in meta plugin

The meta plugin solves the problem of setting metadata (front matter) for all
pages in a folder, i.e., a subtree of your project, which is particularly useful
to ensure that a certain subset of pages features specific tags, uses a custom
template, or is attributed to an author.

## Objective

### How it works

The plugin scans your [`docs` directory][mkdocs.docs_dir] for `.meta.yml` files,
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

When defining metadata, lists and dictionaries are recursively merged, which
means you can append values to a list and add or set specific properties in a
dictionary on arbitrary levels.

### When to use it

While the plugin itself doesn't offer much functionality beyond adding and
merging metadata, it is a perfect companion for many of the other built-in
plugins that Material for MkDocs offers. Some of the most powerful combinations
of the meta plugin and other built-in plugins are:

<div class="grid cards" markdown>

-   :material-share-variant: &nbsp; __[Built-in social plugin]__

    ---

    The meta plugin can be used to [change the layout] for social cards or
    [change specific layout options], e.g. background, colors or icons, for a
    subset of pages.

    ``` yaml title=".meta.yml"
    social:
      cards_layout: default/variant
    ```

-   :material-newspaper-variant-outline: &nbsp; __[Built-in blog plugin]__

    ---

    The meta plugin allows to automatically attribute blog posts to specific
    [authors] and [categories], ensuring that blog posts are always correctly
    annotated.

    ``` yaml title=".meta.yml"
    authors:
      - squidfunk
    ```

-   :material-tag-multiple-outline: &nbsp; __[Built-in tags plugin]__

    ---

    The meta plugin makes it possible to ensure that entire subtrees of your
    project are annotated with specific tags, so they aren't forgotten when
    adding new pages.

    ``` yaml title=".meta.yml"
    tags:
      - Example
    ```

-   :material-magnify: &nbsp; __[Built-in search plugin]__

    ---

    The meta plugin makes it easy to boost specific sections in search results
    or to exclude them entirely from being indexed, giving more granular control
    over search.

    ``` yaml title=".meta.yml"
    search:
      exclude: true
    ```

</div>

  [Built-in social plugin]: social.md
  [change the layout]: ../setup/setting-up-social-cards.md#changing-the-layout
  [change specific layout options]: ../setup/setting-up-social-cards.md#parametrizing-the-layout

  [Built-in blog plugin]: blog.md
  [authors]: ../setup/setting-up-a-blog.md#adding-authors
  [categories]: ../setup/setting-up-a-blog.md#adding-categories

  [Built-in tags plugin]: tags.md
  [Built-in search plugin]: search.md

## Configuration

<!-- md:sponsors --> ·
<!-- md:version insiders-4.21.0 --> ·
<!-- md:flag plugin [meta] (built-in) -->

Getting started with the meta plugin is trivial. Just add the following lines to
`mkdocs.yml`, and you can instantly start creating `.meta.yml` files in your
[`docs` directory][mkdocs.docs_dir]:

``` yaml
plugins:
  - meta
```

  [meta]: meta.md

### General

The following settings are available:

---

#### `enabled`

<!-- md:sponsors --> ·
<!-- md:version insiders-4.38.0 --> ·
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

#### `meta_file`

<!-- md:sponsors --> ·
<!-- md:version insiders-4.21.0 --> ·
<!-- md:default `**/.meta.yml` -->

Use this setting to change the pattern of the file the plugin will look for when
scanning your [`docs` directory][mkdocs.docs_dir]. It's normally not necessary
to change this setting, but if you want to, use:

``` yaml
plugins:
  - meta:
      meta_file: "**/.meta.yml" # (1)!
```

1.  Note that it's strongly recommended to prefix meta files with a `.` to
    instruct MkDocs to [not treat them as documentation content][mkdocs.dotfiles].
    Otherwise, they'd be copied to the [`site` directory][mkdocs.site_dir] when
    you're [building your project].
