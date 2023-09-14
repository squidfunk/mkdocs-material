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

The plugin scans all pages for the [`tags`][meta.tags] metadata property and
generates a tags index, which is an inverted list of tags and the pages they
appear on. The tags index can be located anywhere in the [`nav`][mkdocs.nav],
allowing for maximum flexibility when adding tags to your project.

### When to use it

If you want to add one or multiple tags indexes to your project, the tags
plugin is a perfect choice as it makes this process ridiculously simple.
Additionally, it integrates perfectly with several of the other
[built-in plugins] that Material for MkDocs offers:

<div class="grid cards" markdown>

-   :material-file-tree: &nbsp; __[Built-in meta plugin][meta]__

    ---

    The meta plugin makes it possible to ensure that subsections of your
    project are annotated with [specific tags][meta.tags], so they can't be
    forgotten when adding pages.

    ---

    __Simpler organization and management of tags in different subsections__

-   :material-newspaper-variant-outline: &nbsp; __[Built-in blog plugin][blog]__

    ---

    The tags plugin allows to categorize posts alongside with pages in your
    project, to improve their discoverability and connect posts to your
    documentation.

    ---

    __Your documentation's tag system integrates with your blog__

</div>

  [meta]: meta.md
  [blog]: blog.md
  [built-in plugins]: index.md

## Configuration

<!-- md:version 8.2.0 -->
<!-- md:plugin [tags] – built-in -->
<!-- md:flag multiple -->

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

### General

The following settings are available:

---

#### <!-- md:setting config.enabled -->

<!-- md:version 9.1.7 -->
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

<!-- md:version 9.2.9 -->
<!-- md:default `true` -->

Use this setting to enable or disable handling of tags. Currently, the plugin's
sole purpose is to process tags, so it's equivalent to the [`enabled`]
[config.enabled] setting, but in the future, other features might be added.
If you want to disable handling of tags, use:

``` yaml
plugins:
  - tags:
      tags: false
```

---

#### <!-- md:setting config.tags_file -->

<!-- md:version 8.2.0 -->
<!-- md:default none -->

Use this setting to specify the location of the tags index, which is the page
used to render a list of all tags and their associated pages. If this setting is
specified, tags become clickable, pointing to the corresponding section in the
tags index:

``` yaml
plugins:
  - tags:
      tags_file: tags.md
```

The page holding the tags index can be linked anywhere in the [`nav`][mkdocs.nav]
section of `mkdocs.yml`. This setting is not required – you should only use it
if you want to have a tags index.

The provided path is resolved from the [`docs` directory][mkdocs.docs_dir].

---

#### <!-- md:setting config.tags_extra_files -->

<!-- md:sponsors -->
<!-- md:version insiders-4.20.0 -->
<!-- md:default none -->

Use this setting to specify the locations of additional tags indexes, which are
pages that render a subset of the tags index, in order to provide scoped tags
indexes for specific sections:

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

<!-- md:sponsors -->
<!-- md:version insiders-4.25.0 -->
<!-- md:default [`toc.slugify`][toc.slugify] -->

Use this setting to change the function to use for generating URL-compatible
slugs from tags. [Python Markdown Extensions] comes with a Unicode-aware
[`slugify`][pymdownx.slugs.slugify] function:

=== "Unicode"

    ``` yaml
    plugins:
      - tags:
          tags_slugify: !!python/object/apply:pymdownx.slugs.slugify
            kwds:
              case: lower
    ```

=== "Unicode, case-sensitive"

    ``` yaml
    plugins:
      - tags:
          tags_slugify: !!python/object/apply:pymdownx.slugs.slugify
    ```

When your project features non-European languages, it's advisable to use this
configuration. Of course, you can also provide a custom slugification function
for more granular control.

  [toc.slugify]: https://github.com/Python-Markdown/markdown/blob/1337d0891757e192165668d2606db36cf08e65a9/markdown/extensions/toc.py#L26-L33
  [pymdownx.slugs.slugify]: https://github.com/facelessuser/pymdown-extensions/blob/01c91ce79c91304c22b4e3d7a9261accc931d707/pymdownx/slugs.py#L59-L65
  [Python Markdown Extensions]: https://facelessuser.github.io/pymdown-extensions/extras/slugs/

---

#### <!-- md:setting config.tags_slugify_separator -->

<!-- md:sponsors -->
<!-- md:version insiders-4.25.0 -->
<!-- md:default `-` -->

Use this setting to change the separator that is passed to the slugification
function set as part of [`tags_slugify`][config.tags_slugify]. While the default
is a hyphen, it can be set to any string, e.g., `_`:

``` yaml
plugins:
  - tags:
      tags_slugify_separator: _
```

---

#### <!-- md:setting config.tags_compare -->

<!-- md:sponsors -->
<!-- md:version insiders-4.26.2 -->
<!-- md:default none -->

Use this setting to specify a custom function for comparing tags. By default,
tag comparison is case-sensitive, but you can use the `casefold` function
for case-insensitive comparison:

``` yaml
plugins:
  - tags:
      tags_compare: !!python/name:material.plugins.tags.casefold
```

You can also define your own comparison function, which must return a string
representing the tag, that is used for sorting, and reference it in
[`tags_compare`][config.tags_compare].

---

#### <!-- md:setting config.tags_compare_reverse -->

<!-- md:sponsors -->
<!-- md:version insiders-4.26.2 -->
<!-- md:default `false` -->

Use this setting to reverse the order in which tags are sorted when comparing
them. By default, tags are sorted in ascending order, but you can reverse
ordering as follows:

``` yaml
plugins:
  - tags:
      tags_compare_reverse: true
```

---

#### <!-- md:setting config.tags_pages_compare -->

<!-- md:sponsors -->
<!-- md:version insiders-4.39.0 -->
<!-- md:default none -->

Use this setting to specify a custom function for comparing pages. By default,
pages occur in order of appearance, but you can sort them by using the following
configuration:

=== "Sort by page title"

    ``` yaml
    plugins:
      - tags:
          tags_pages_compare: !!python/name:material.plugins.tags.page_title
    ```

=== "Sort by page URL"

    ``` yaml
    plugins:
      - tags:
          tags_pages_compare: !!python/name:material.plugins.tags.page_url
    ```

You can also define your own comparison function, which must return a string
representing the page, that is used for sorting, and reference it in
[`tags_pages_compare`][config.tags_pages_compare].

---

#### <!-- md:setting config.tags_pages_compare_reverse -->

<!-- md:sponsors -->
<!-- md:version insiders-4.39.0 -->
<!-- md:default `false` -->

Use this setting to reverse the order in which pages are sorted when comparing
them. By default, pages are sorted in ascending order, but you can reverse
ordering as follows:

``` yaml
plugins:
  - tags:
      tags_pages_compare_reverse: true
```

---

#### <!-- md:setting config.tags_allowed -->

<!-- md:sponsors -->
<!-- md:version insiders-4.25.0 -->
<!-- md:default none -->

The plugin allows to check tags against a predefined list, in order to catch
typos or make sure that tags are not arbitrarily added. Specify the tags you
want to allow with:

``` yaml
plugins:
  - tags:
      tags_allowed:
        - HTML5
        - JavaScript
        - CSS
```

The plugin stops the build if a page references a tag that is not part of
this list. Pages can be assigned to tags by using the [`tags`][meta.tags]
metadata property.

## Usage

### Metadata

The following properties are available:

---

#### <!-- md:setting meta.tags -->

<!-- md:version 8.2.0 -->
<!-- md:flag metadata -->
<!-- md:default none -->

Use this property to associate a page with one or more tags, making the page
appear in the generated tags index. Tags are defined as a list of strings
(whitespaces are allowed):

``` yaml
---
tags:
  - HTML5
  - JavaScript
  - CSS
---

# Page title
...
```

If you want to prevent accidental typos when assigning tags to pages, you can
set a predefined list of allowed tags in `mkdocs.yml` by using the
[`tags_allowed`][config.tags_allowed] setting.
