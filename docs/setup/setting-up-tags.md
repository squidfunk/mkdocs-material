---
template: overrides/main.html
tags:
  - insiders
  - brand new
---

# Setting up tags

Material for MkDocs adds first-class support for categorizing pages with tags,
which adds the possibility to group related pages and make them discoverable
via search and a dedicated tags index. If your documentation is large, tags
can help to discover relevant information faster.

## Configuration

### Built-in tags

[:octicons-file-code-24: Source][1] ·
[:octicons-cpu-24: Plugin][1] ·
:octicons-beaker-24: Experimental ·
[:octicons-heart-fill-24:{ .mdx-heart } Insiders only][1]{ .mdx-insiders }

The [built-in tags plugin][1] adds the ability to categorize any page with tags
as part of the front matter of the page. In order to add support for tags, add
the following lines to `mkdocs.yml`:

``` yaml
plugins:
  - tags
```

Note that no third-party plugin[^1] needs to be installed, as Material for
MkDocs provides its own implementation to allow for a meaningful integration.
The following options are available:

`tags_file`{ #tags_file }

:   :octicons-milestone-24: Default: _none_ – This option specifies which file
    should be used to render the tags index. See the section on [adding a tags 
    index][3] for more information. If this option is specified, tags will
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

  [^1]:
    The built-in tags plugin has no affiliation with [mkdocs-plugin-tags][2],
    another option to add tag support to MkDocs, which has several caveats:
    it requires a `title` set in the front matter for every page for which tags
    should be added, doesn't support all syntactic flavors of front matter,
    doesn't integrate tags in search and doesn't render tags on pages without
    additional effort. The built-in tags plugin supports all of these
    features out-of-the-box.

  [1]: ../insiders/index.md
  [2]: https://github.com/jldiaz/mkdocs-plugin-tags
  [3]: #adding-a-tags-index

## Usage

### Adding tags

[:octicons-file-code-24: Source][1] ·
:octicons-note-24: Metadata

If both, the [built-in tags plugin][4] and [Metadata][5] extension are enabled,
tags can be added for any page as part of the front matter, e.g. to add the tags
`insiders` and `brand new` to this page, add:

``` yaml
---
tags:
  - insiders
  - brand new
---

...
```

The page will now render with those tags below the main headline and within the
search preview, which now allows to __find pages by tags__, as shown in the
following screenshots:

=== "Tags"

    [![Tags][6]][6]

=== "Tag search"

    [![Tag search][7]][7]

  [4]: #built-in-tags
  [5]: ../../reference/meta-tags/#metadata
  [6]: ../assets/screenshots/tags.png
  [7]: ../assets/screenshots/tags-search.png

### Adding a tags index

The [built-in tags plugin][4] allows to define a file to render a [tags
index][8], which can be any page that is part of the `nav` section. To add a
tags index, create a page, e.g. `tags.md`:

``` markdown
# Tags

Following is a list of relevant tags:

[TAGS]
```

The `[TAGS]` marker specifies the position of the tags index, i.e. it is
replaced with the actual tags index when the page is rendered. You can include
arbitrary content before and after the marker:

[![Tags index][9]][9]

  [8]: #tags_file
  [9]: ../assets/screenshots/tags-index.png
