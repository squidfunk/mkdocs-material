---
template: overrides/main.html
---

# Setting up tags

Material for MkDocs adds first-class support for categorizing pages with tags,
which adds the possibility to group related pages and make them discoverable
via search and a dedicated tags index. If your documentation is large, tags
can help to discover relevant information faster.

## Configuration

### Built-in tags

[:octicons-heart-fill-24:{ .mdx-heart } Insiders][Insiders]{ .mdx-insiders } ·
[:octicons-tag-24: insiders-2.7.0][Insiders] ·
:octicons-cpu-24: Plugin ·
:octicons-beaker-24: Experimental

The built-in tags plugin adds the ability to categorize any page with tags
as part of the front matter of the page. In order to add support for tags, add
the following lines to `mkdocs.yml`:

``` yaml
plugins:
  - tags
```

The following configuration options are available:

`tags_file`{ #tags-file }

:   :octicons-milestone-24: Default: _none_ – This option specifies which file
    should be used to render the tags index. See the section on [adding a tags 
    index] for more information. If this option is specified, tags will
    become clickable, pointing to the corresponding section in the tags index:

    ``` yaml
    plugins:
      - tags:
          tags_file: tags.md
    ```

    The page holding the tags index can be linked anywhere in the `nav` section
    of `mkdocs.yml`. Note, however, that this options is not required. If this
    option is not specified, tags are still rendered and searchable,
    but without a tags index.

  [Insiders]: ../insiders/index.md
  [adding a tags index]: #adding-a-tags-index

## Usage

### Adding tags

When both, the [built-in tags] plugin and [Metadata] extension are enabled,
tags can be added for a document with custom front matter. Add the following
lines at the top of a Markdown file:

``` bash
---
tags:
  - insiders
  - brand new
---

...
```

The page will now render with those tags above the main headline and within the
search preview, which now allows to __find pages by tags__, as shown in the
following screenshots:

=== "Tags"

    [![Tags preview]][Tags preview]

=== "Tag search"

    [![Tag search preview]][Tag search preview]

  [built-in tags]: #built-in-tags
  [Metadata]: extensions/python-markdown.md#metadata
  [Tags preview]: ../assets/screenshots/tags.png
  [Tag search preview]: ../assets/screenshots/tags-search.png

### Adding a tags index

The [built-in tags] plugin allows to define a file to render a [tags index]
[tags.tags_file], which can be any page that is part of the `nav` section. To
add a tags index, create a page, e.g. `tags.md`:

``` markdown
# Tags

Following is a list of relevant tags:

[TAGS]
```

The `[TAGS]` marker specifies the position of the tags index, i.e. it is
replaced with the actual tags index when the page is rendered. You can include
arbitrary content before and after the marker:

[![Tags index][9]][9]

  [tags.tags_file]: #tags-file
  [9]: ../assets/screenshots/tags-index.png

### Hiding the tags

While the tags are rendered above the main headline, sometimes, it might be
desirable to hide them for a specific page, which can be achieved by using the
[Metadata] extension:

``` bash
---
hide:
  - tags
---

# Document title
...
```
