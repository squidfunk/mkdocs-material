---
title: Built-in tags plugin
icon: material/tag-text
---

# Built-in tags plugin

The tags plugin adds first-class support for categorizing pages with the use
of tags, adding the possibility to group related pages and make them
discoverable via search and dedicated tags indexes. If your documentation is
large, tags can help to discover relevant information faster.

## Objective

### How it works

tbd

### When to use it

tbd

<div class="grid cards" markdown>

-   :material-file-tree: &nbsp; __[Built-in meta plugin]__

    ---

    The meta plugin makes it possible to ensure that subsections of your
    project are annotated with [specific tags][meta.tags], so they can't be
    forgotten when adding pages.

    ---

    __Simpler organization and management of tags in different subsections__

-   :material-newspaper-variant-outline: &nbsp; __[Built-in blog plugin]__

    ---

    The tags plugin allows to categorize posts alongside with pages in your
    project, to improve their discoverability and connect posts to your
    documentation.

    ---

    __Your documentation's tag system integrates with your blog__

</div>

  [Built-in meta plugin]: meta.md
  [Built-in blog plugin]: blog.md

## Configuration

<!-- md:version 8.2.0 --> ·
<!-- md:flag plugin [tags] (built-in) -->

As with all [built-in plugins], getting started with the tags plugin is
straightforward. Just add the following lines to `mkdocs.yml`, and start using
[tags][meta.tags] to categorize your pages:

``` yaml
plugins:
  - tags
```

The tags plugin is built into Material for MkDocs and doesn't need to be
installed.

  [tags]: tags.md
  [built-in plugins]: index.md

### General

The following settings are available:

---

#### <!-- md:setting config.enabled -->

<!-- md:version 9.1.7 --> ·
<!-- md:default `true` -->

Use this setting to enable or disable the plugin when [building your project].
It's normally not necessary to specify this setting, but if you want to disable
the plugin, use:

``` yaml
plugins:
  - tags:
      enabled: false
```

  [building your project]: ../creating-your-site.md#building-your-site

### Tags

The following settings are available for tags:

---

#### <!-- md:setting config.tags -->

<!-- md:version 9.2.9 --> ·
<!-- md:default `true` -->

Use this setting to enable or disable handling of tags. Currently, the plugin's
sole purpose is to process tags, so it's equivalent to the
[`enabled`][config.enabled] setting, but in the future, other features might be
added. If you want to disable handling of tags, use:

``` yaml
plugins:
  - tags:
      tags: false
```

---

#### <!-- md:setting config.tags_file -->

<!-- md:version 8.2.0 --> ·
<!-- md:default none -->

Use this setting to specify the location of the tags index page which will be
used to render a list of all tags and their associated pages. If this option is
specified, tags become clickable, pointing to the corresponding section in the
tags index:

``` yaml
plugins:
  - tags:
      tags_file: tags.md
```

The page holding the tags index can be linked anywhere in the [`nav`][mkdocs.nav]
section of `mkdocs.yml`. This options is not required – you should only use it
if you want to have a tags index page.

The provided path is resolved from the [`docs` directory][mkdocs.docs_dir].

---

#### <!-- md:setting config.tags_extra_files -->

<!-- md:sponsors --> ·
<!-- md:version insiders-4.20.0 --> ·
<!-- md:default none -->

Use this setting to specify the locations of additional tags index pages that
render only a subset of the tags index, in order to provide scoped tags indexes
for specific sections:

``` yaml
plugins:
  - tags:
      tags_extra_files:
        extra-1.md: [tag-id-1, tag-id-2, ...]
        extra-2.md: [tag-id-3, tag-id-4, ...]
        ...
```

The provided path is resolved from the [`docs` directory][mkdocs.docs_dir].

---

#### <!-- md:setting config.tags_slugify -->

---

#### <!-- md:setting config.tags_slugify_separator -->

---

#### <!-- md:setting config.tags_compare -->

---

#### <!-- md:setting config.tags_compare_reverse -->

---

#### <!-- md:setting config.tags_pages_compare -->

---

#### <!-- md:setting config.tags_pages_compare_reverse -->

---

#### <!-- md:setting config.tags_allowed -->

## Usage

### Metadata

#### <!-- md:setting meta.tags -->

tbd
