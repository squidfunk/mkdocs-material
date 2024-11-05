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

<!-- md:version 9.3.2 -->
<!-- md:default `true` -->

Use this setting to enable or disable rendering of tags. The plugin still
extracts tags from all pages, e.g., for [exporting tags] without rendering them.
Rendering can be disabled with:

``` yaml
plugins:
  - tags:
      tags: false
```

This setting is automatically disabled if [`export_only`][config.export_only]
is enabled.

  [exporting tags]: #export

---

#### <!-- md:setting config.tags_file -->

<!-- md:version 8.2.0 -->
<!-- md:default none -->

!!! info "This setting is not needed in [Insiders]"

    Insiders ships a __ground up rewrite of the tags plugin__ which is infinitely
    more powerful than the current version in the community edition. It allows
    for an arbitrary number of tags indexes (listings), [scoped listings],
    [shadow tags], [nested tags], and much more.

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

  [Insiders]: ../insiders/index.md
  [scoped listings]: ../setup/setting-up-tags.md#scoped-listings
  [shadow tags]: ../setup/setting-up-tags.md#shadow-tags
  [nested tags]: ../setup/setting-up-tags.md#nested-tags

---

#### <!-- md:setting config.tags_slugify -->

<!-- md:sponsors -->
<!-- md:version insiders-4.25.0 -->
<!-- md:default [`pymdownx.slugs.slugify`][pymdownx.slugs.slugify] -->

Use this setting to change the function for generating URL-compatible slugs
from post titles. By default, the [`slugify`][pymdownx.slugs.slugify] function
from [Python Markdown Extensions] is used as follows:

``` yaml
plugins:
  - tags:
      tags_slugify: !!python/object/apply:pymdownx.slugs.slugify
        kwds:
          case: lower
```

The default configuration is Unicode-aware and should produce good slugs for all
languages. Of course, you can also provide a custom slugification function for
more granular control.

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

#### <!-- md:setting config.tags_slugify_format -->

<!-- md:sponsors -->
<!-- md:version insiders-4.48.0 -->
<!-- md:default `tag:{slug}` -->

Use this setting to change the format string that is used when generating tag
slugs. It is a good idea to prefix tag slugs with a string that makes them
unique, the default being:

``` yaml
plugins:
  - tags:
      tags_slugify_format: "tag:{slug}"
```

The following placeholders are available:

- `slug` – Tag slug, slugified with [`tags_slugify`][config.tags_slugify]

---

#### <!-- md:setting config.tags_hierarchy -->

<!-- md:sponsors -->
<!-- md:version insiders-4.48.0 -->
<!-- md:default `false` -->
<!-- md:flag experimental -->

Use this setting to enable support for tag hierarchies (nested tags, e.g.,
`foo/bar`). If you intend to create hierarchical listings of tags, you can
enable this setting in `mkdocs.yml` with:

``` yaml
plugins:
  - tags:
      tags_hierarchy: true
```

---

#### <!-- md:setting config.tags_hierarchy_separator -->

<!-- md:sponsors -->
<!-- md:version insiders-4.48.0 -->
<!-- md:default `/` -->
<!-- md:flag experimental -->

Use this setting to change the separator that is used when creating tag
hierarchies. By default, tags are separated by a forward slash `/`, but you
can change this to any string, e.g., `.`:

``` yaml
plugins:
  - tags:
      tags_hierarchy_separator: .
```

---

#### <!-- md:setting config.tags_sort_by -->

<!-- md:sponsors -->
<!-- md:version insiders-4.26.2 -->
<!-- md:default `material.plugins.tags.tag_name` -->

Use this setting to specify a custom function for comparing tags. By default,
tag comparison is case-sensitive, but you can use `tag_name_casefold` for
case-insensitive comparison:

``` yaml
plugins:
  - tags:
      tags_sort_by: !!python/name:material.plugins.tags.tag_name_casefold
```

You can also define your own comparison function, which must return a string
or number representing the tag, that is used for sorting, and reference it in
[`tags_sort_by`][config.tags_sort_by].

---

#### <!-- md:setting config.tags_sort_reverse -->

<!-- md:sponsors -->
<!-- md:version insiders-4.26.2 -->
<!-- md:default `false` -->

Use this setting to reverse the order in which tags are sorted when comparing
them. By default, tags are sorted in ascending order, but you can reverse
ordering as follows:

``` yaml
plugins:
  - tags:
      tags_sort_reverse: true
```

---

#### <!-- md:setting config.tags_name_property -->

<!-- md:sponsors -->
<!-- md:version insiders-4.48.0 -->
<!-- md:default [`tags`][meta.tags] -->

Use this setting to change the name of the front matter property that is used by
the plugin. It is normally not necessary to change this setting, but if you want
to change it, you can use:

``` yaml
plugins:
  - tags:
      tags_name_property: tags
```

---

#### <!-- md:setting config.tags_name_variable -->

<!-- md:sponsors -->
<!-- md:version insiders-4.48.0 -->
<!-- md:default `tags` -->

Use this setting to change the name of the template variable that is used by
the plugin. It is normally not necessary to change this setting, but if you want
to change it, you can use:

``` yaml
plugins:
  - tags:
      tags_name_variable: tags
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

### Listings

The following settings are available for listings:

---

#### <!-- md:setting config.listings -->

<!-- md:sponsors -->
<!-- md:version insiders-4.48.0 -->
<!-- md:default `true` -->

Use this setting to enable or disable listings. It is normally not necessary to
change this setting, as listings are created entirely by inline comments, but
you can disable them if necessary with:

``` yaml
plugins:
  - tags:
      listings: false
```

This setting is automatically disabled if [`export_only`][config.export_only]
is enabled.

  [exporting tags]: #export

---

#### <!-- md:setting config.listings_map -->

<!-- md:sponsors -->
<!-- md:version insiders-4.48.0 -->
<!-- md:default none -->

Use this define listing configurations that you can then reference in listings
with a custom identifier. Sharing configurations is a good idea, especially
when you have many tag listings:

``` yaml
plugins:
  - tags:
      listings_map:
        custom-id:
          scope: true
          exclude: Internal
```

Then, just reference the listing identifier:

``` html
<!-- material/tags custom-id -->
```

See the [listings section] for a list of all available settings.

  [listings section]: #listing-configuration

---

#### <!-- md:setting config.listings_sort_by -->

<!-- md:sponsors -->
<!-- md:version insiders-4.39.0 -->
<!-- md:default `material.plugins.tags.item_title` -->

Use this setting to specify a custom function for comparing listing items. By
default, items are ordered by their titles, but you can change the sorting
criterion with the following configuration:

=== "Sort by item title"

    ``` yaml
    plugins:
      - tags:
          listings_sort_by: !!python/name:material.plugins.tags.item_title
    ```

=== "Sort by item URL"

    ``` yaml
    plugins:
      - tags:
          listings_sort_by: !!python/name:material.plugins.tags.item_url
    ```

You can also define your own comparison function, which must return a string
or number representing the item, that is used for sorting, and reference it in
[`listings_sort_by`][config.listings_sort_by].

---

#### <!-- md:setting config.listings_sort_reverse -->

<!-- md:sponsors -->
<!-- md:version insiders-4.39.0 -->
<!-- md:default `false` -->

Use this setting to reverse the order in which items are sorted when comparing
them. By default, items are sorted in ascending order, but you can reverse
ordering as follows:

``` yaml
plugins:
  - tags:
      listings_sort_reverse: true
```

---

#### <!-- md:setting config.listings_tags_sort_by -->

<!-- md:sponsors -->
<!-- md:version insiders-4.48.0 -->
<!-- md:default `material.plugins.tags.tag_name` -->

Use this setting to specify a custom function for comparing tags in listings. By
default, tag comparison is case-sensitive, but you can use `tag_name_casefold`
for case-insensitivity:

``` yaml
plugins:
  - tags:
      tags_sort_by: !!python/name:material.plugins.tags.tag_name_casefold
```

You can also define your own comparison function, which must return a string
or number representing the tag, that is used for sorting, and reference it in
[`tags_sort_by`][config.tags_sort_by].

---

#### <!-- md:setting config.listings_tags_sort_reverse -->

<!-- md:sponsors -->
<!-- md:version insiders-4.48.0 -->
<!-- md:default `false` -->

Use this setting to reverse the order in which tags are sorted when comparing
them. By default, tags are sorted in ascending order, but you can reverse
ordering as follows:

``` yaml
plugins:
  - tags:
      tags_sort_reverse: true
```

---

#### <!-- md:setting config.listings_directive -->

<!-- md:sponsors -->
<!-- md:version insiders-4.48.0 -->
<!-- md:default `material/tags` -->

Use this setting to change the name of the directive the plugin will look for
when processing pages. If you want to use a shorter directive than
`material/tags`, you could use:

``` yaml
plugins:
  - tags:
      listings_directive: $tags
```

Using this setting, listings must now be referenced as such:

``` html
<!-- $tags { include: [foo, bar] } -->
```

---

#### <!-- md:setting config.listings_toc -->

<!-- md:sponsors -->
<!-- md:version insiders-4.48.0 -->
<!-- md:default `true` -->

Use this setting to enable or disable tags showing up in the table of contents.
If you don't want tags to show up in the table of contents, you can disable this
behavior with:

``` yaml
plugins:
  - tags:
      listings_toc: false
```

### Shadow tags

The following settings are available for shadow tags:

---

#### <!-- md:setting config.shadow -->

<!-- md:sponsors -->
<!-- md:version insiders-4.48.0 -->
<!-- md:default `false` -->

Use this setting to specify whether the plugin should include shadow tags on
pages and in listings when [building your project], which might be useful for
deploy previews:

=== "Show shadow tags"

    ``` yaml
    plugins:
      - tags:
          shadow: true
    ```

=== "Hide shadow tags"

    ``` yaml
    plugins:
      - tags:
          shadow: false
    ```

---

#### <!-- md:setting config.shadow_on_serve -->

<!-- md:sponsors -->
<!-- md:version insiders-4.48.0 -->
<!-- md:default `true` -->

Use this setting to control whether the plugin should include shadow tags on
pages and in listings when [previewing your site]. If you don't wish to include
them when previewing, use:

``` yaml
plugins:
  - tags:
      shadow_on_serve: false
```

  [previewing your site]: ../creating-your-site.md#previewing-as-you-write

---

#### <!-- md:setting config.shadow_tags -->

<!-- md:sponsors -->
<!-- md:version insiders-4.48.0 -->
<!-- md:default none -->

The plugin allows to specify a predefined list of shadow tags which can be
included and excluded from builds by using the [`shadow`][config.shadow]
setting. Shadow tags must be specified as a list:

``` yaml
plugins:
  - tags:
      shadow_tags:
        - Draft
        - Internal
```

---

#### <!-- md:setting config.shadow_tags_prefix -->

<!-- md:sponsors -->
<!-- md:version insiders-4.48.0 -->
<!-- md:default none -->

Use this setting to specify a string that is checked as a prefix for each tag.
If the tag starts with this string, the tag is marked as a shadow tag. A common
practice is to use `_` as a prefix:

``` yaml
plugins:
  - tags:
      shadow_tags_prefix: _
```

---

#### <!-- md:setting config.shadow_tags_suffix -->

<!-- md:sponsors -->
<!-- md:version insiders-4.48.0 -->
<!-- md:default none -->

Use this setting to specify a string that is checked as a suffix for each tag.
If the tag ends with this string, the tag is marked as a shadow tag. One option
can be to use `Internal` as a suffix:


``` yaml
plugins:
  - tags:
      shadow_tags_suffix: Internal
```

### Export

The following settings are available for exporting:

---

#### <!-- md:setting config.export -->

<!-- md:sponsors -->
<!-- md:version insiders-4.49.0 -->
<!-- md:default `true` -->

Use this setting to control whether the plugin creates a `tags.json` file
inside your [`site` directory][mkdocs.site_dir], which can then be consumed by
other plugins and projects:

``` yaml
plugins:
  - tags:
      export: true
```

---

#### <!-- md:setting config.export_file -->

<!-- md:sponsors -->
<!-- md:version insiders-4.49.0 -->
<!-- md:default `tags.json` -->

Use this setting to change the path of the file where the exported tags are
stored. It's normally not necessary to change this setting, but if you need to,
use:

``` yaml
plugins:
  - tags:
      export_file: tags.json
```

The provided path is resolved from the [`site` directory][mkdocs.site_dir].

---

#### <!-- md:setting config.export_only -->

<!-- md:sponsors -->
<!-- md:version insiders-4.49.0 -->
<!-- md:default `false` -->

This setting is solely provided for convenience to disable the rendering of tags
and listings with a single setting (e.g. by using an environment variable),
while keeping the export functionality:

``` yaml
plugins:
  - tags:
      export_only: true
```

This will automatically disable the [`tags`][config.tags] and
[`listings`][config.listings] settings.

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

### Listing configuration

The listings configuration controls which tags are included in or excluded from
a listing and whether a listing only includes pages in the current scope.
Furthermore, listings can override some values from the global configuration.

The following settings are available:

---

#### <!-- md:setting listing.scope -->

<!-- md:sponsors -->
<!-- md:version insiders-4.48.0 -->
<!-- md:default `false` -->

This setting specifies whether the listing should only consider pages that are
within the current subsection of the documentation of the page the listing is
embedded in:

=== "Inline usage"

    ``` html
    <!-- material/tags { scope: true } -->
    ```

=== "Usage in `mkdocs.yml`"

    ``` yaml
    plugins:
      - tags:
          listings_map:
            custom-id:
              scope: false
    ```

    Then, just reference the listing identifier:

    ``` html
    <!-- material/tags custom-id -->
    ```

---

#### <!-- md:setting listing.shadow -->

<!-- md:sponsors -->
<!-- md:version insiders-4.49.0 -->
<!-- md:default computed -->

This setting specifies whether the listing should include shadow tags, which
allows to override the global [`shadow`][config.shadow] setting on a per-listing
basis:

=== "Inline usage"

    ``` html
    <!-- material/tags { shadow: true } -->
    ```

=== "Usage in `mkdocs.yml`"

    ``` yaml
    plugins:
      - tags:
          listings_map:
            custom-id:
              shadow: true
    ```

    Then, just reference the listing identifier:

    ``` html
    <!-- material/tags custom-id -->
    ```

---

#### <!-- md:setting listing.toc -->

<!-- md:sponsors -->
<!-- md:version insiders-4.48.0 -->
<!-- md:default [`listings_toc`][config.listings_toc] -->

This setting specifies whether the listing should render tags inside the table
of contents, allowing to override the global [`listings_toc`][config.listings_toc]
setting on a per-listing basis:

=== "Inline usage"

    ``` html
    <!-- material/tags { toc: true } -->
    ```

=== "Usage in `mkdocs.yml`"

    ``` yaml
    plugins:
      - tags:
          listings_map:
            custom-id:
              toc: true
    ```

    Then, just reference the listing identifier:

    ``` html
    <!-- material/tags custom-id -->
    ```

---

#### <!-- md:setting listing.include -->

<!-- md:sponsors -->
<!-- md:version insiders-4.48.0 -->
<!-- md:default none -->

Use this setting to specify which tags should be included in the listing. Each
page that features a tag that is part of this setting, is listed under the
respective tag:

=== "Inline usage"

    ``` html
    <!-- material/tags { include: [foo, bar] } -->
    ```

=== "Usage in `mkdocs.yml`"

    ``` yaml
    plugins:
      - tags:
          listings_map:
            custom-id:
              include:
                - foo
                - bar
    ```

    Then, just reference the listing identifier:

    ``` html
    <!-- material/tags custom-id -->
    ```

If this setting is left empty, all tags and pages are included.

---

#### <!-- md:setting listing.exclude -->

<!-- md:sponsors -->
<!-- md:version insiders-4.48.0 -->
<!-- md:default none -->

Use this setting to specify which tags should be excluded from the listing. Each
page that features a tag that is part of this setting, is excluded from the
listing entirely:

=== "Inline usage"

    ``` html
    <!-- material/tags { exclude: [foo, bar] } -->
    ```

=== "Usage in `mkdocs.yml`"

    ``` yaml
    plugins:
      - tags:
          listings_map:
            custom-id:
              exclude:
                - foo
                - bar
    ```

    Then, just reference the listing identifier:

    ``` html
    <!-- material/tags custom-id -->
    ```

If this setting is left empty, no tags or pages are excluded.
