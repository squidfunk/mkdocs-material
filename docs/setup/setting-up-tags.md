---
template: overrides/main.html
---

# Setting up tags

Material for MkDocs adds first-class support for categorizing pages with tags,
which adds the possibility to group related pages and make them discoverable
via search and a dedicated [tags index]. If your documentation is large, tags
can help to discover relevant information faster.

  [tags index]: #adding-a-tags-index

## Configuration

### Built-in tags plugin

[:octicons-tag-24: 8.2.0][tags support] ·
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
    index][tags index] for more information. If this option is specified, tags
    will become clickable, pointing to the corresponding section in the tags
    index:

    ``` yaml
    plugins:
      - tags:
          tags_file: tags.md
    ```

    The page holding the tags index can be linked anywhere in the `nav` section
    of `mkdocs.yml`. Note, however, that this options is not required – only use
    it if you want a tags index page.

`tags_extra_files`{ #tags-extra-files } :material-alert-decagram:{ .mdx-pulse title="Added on July 7, 2022" }

:   [:octicons-tag-24: insiders-4.20.0][Insiders] · :octicons-milestone-24: 
    Default: _none_ – This option allows to define additional pages to render
    subsets of the [tags index], in order to provide scoped tags indexes for
    specific sections:

    ``` yaml
    plugins:
      - tags:
          tags_extra_files:
            compatibility.md:
              - compat #(1)!
            web.md:
              - html
              - js
              - css
    ```

    1.  Each page can be assigned a list of [tag identifiers], which must be
        defined as part of `extra.tags` in `mkdocs.yml`:

        ``` yaml
        extra:
          tags:
            Compatibility: compat
            HTML5: html
            JavaScript: js
            CSS: css
        ```

        In this example, all pages with the tag `Compatibility` will be included 
        in the additional tags index on `compatibility.md`, all pages defining
        at least one of the tags `HTML5`, `JavaScript` or `CSS` will be included
        in the additional tags index on `web.md`.

    See #3864 for additional use cases.

  [tags support]: https://github.com/squidfunk/mkdocs-material/releases/tag/8.2.0
  [tag identifiers]: #tag-icons

### Tag icons

[:octicons-heart-fill-24:{ .mdx-heart } Sponsors only][Insiders]{ .mdx-insiders } ·
[:octicons-tag-24: insiders-4.13.0][Insiders] ·
:octicons-beaker-24: Experimental

Each tag can be associated with an icon, which is then rendered inside the tag.
Before assigning icons to tags, associate each tag with a unique identifier,
by adding the following to `mkdocs.yml`:

``` yaml
extra:
  tags:
    <tag>: <identifier> # (1)!
```

1.  The identifier can only include alphanumeric characters, as well as dashes
    and underscores. For example, if you have a tag `Compatibility`, you can
    set `compat` as an identifier:

    ``` yaml
    extra:
      tags:
        Compatibility: compat
    ```

    Identifiers can be reused between tags. Tags which are not explicitly
    associated will use the default tag icon which is :material-pound:

Next, each identifier can be associated with an icon, or even a [custom icon],
by adding the following lines to `mkdocs.yml` under the `theme.icon`
configuration setting:

=== "Tag icon"

    ``` yaml
    theme:
      icon:
        tag:
          <identifier>: <icon> # (1)!
    ```

    1.  Enter a few keywords to find the perfect icon using our [icon search] and
        click on the shortcode to copy it to your clipboard:

        <div class="mdx-iconsearch" data-mdx-component="iconsearch">
          <input class="md-input md-input--stretch mdx-iconsearch__input" placeholder="Search icon" data-mdx-component="iconsearch-query" value="tag" />
          <div class="mdx-iconsearch-result" data-mdx-component="iconsearch-result" data-mdx-mode="file">
            <div class="mdx-iconsearch-result__meta"></div>
            <ol class="mdx-iconsearch-result__list"></ol>
          </div>
        </div>

=== "Tag default icon"

    ``` yaml
    theme:
      icon:
        tag:
          default: <icon>
    ```

??? example "Expand to inspect example"

    ``` yaml
    theme:
      icon:
        tag:
          html: fontawesome/brands/html5
          js: fontawesome/brands/js
          css:  fontawesome/brands/css3
    extra:
      tags:
        HTML5: html
        JavaScript: js
        CSS: css
    ```

  [Insiders]: ../insiders/index.md
  [custom icon]: changing-the-logo-and-icons.md#additional-icons
  [icon search]: ../reference/icons-emojis.md#search

## Usage

### Adding tags

When both, the [built-in tags plugin] and [Metadata] extension are enabled,
tags can be added for a document with custom front matter. Add the following
lines at the top of a Markdown file:

``` sh
---
tags:
  - HTML5
  - JavaScript
  - CSS
  - Other
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

  [built-in tags plugin]: #built-in-tags-plugin
  [Metadata]: extensions/python-markdown.md#metadata
  [Tags preview]: ../assets/screenshots/tags.png
  [Tag search preview]: ../assets/screenshots/tags-search.png

### Adding a tags index

The [built-in tags plugin] allows to define a file to render a [tags index]
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

### Hiding tags on a page

While the tags are rendered above the main headline, sometimes, it might be
desirable to hide them for a specific page, which can be achieved by using the
[Metadata] extension:

``` sh
---
hide:
  - tags
---

# Document title
...
```
