---
title: Built-in tags plugin
icon: material/tag-text
---

# Built-in tags plugin

The tags plugin adds first-class support for categorizing pages with the use
of tags, adding the possibility to group related pages and make them
discoverable via search and a dedicated tags index. If your documentation is
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

---

#### <!-- md:setting config.enabled -->

### Tags

---

#### <!-- md:setting config.tags -->

---

#### <!-- md:setting config.tags_file -->

---

#### <!-- md:setting config.tags_extra_files -->

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
