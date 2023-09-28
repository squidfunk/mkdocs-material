# Setting up tags

Material for MkDocs adds first-class support for categorizing pages with tags,
which adds the possibility to group related pages and make them discoverable
via search and a dedicated [tags index]. If your documentation is large, tags
can help to discover relevant information faster.

  [tags index]: #adding-a-tags-index

## Configuration

### Built-in tags plugin

<!-- md:version 8.2.0 -->
<!-- md:plugin -->

The built-in tags plugin adds the ability to categorize any page with tags
as part of the front matter of the page. In order to add support for tags, add
the following lines to `mkdocs.yml`:

``` yaml
plugins:
  - tags
```

For a list of all settings, please consult the [plugin documentation].

  [plugin documentation]: ../plugins/tags.md

### Tag icons and identifiers

<!-- md:version 8.5.0 -->
<!-- md:flag experimental -->
<!-- md:example tags-with-icons -->

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

Next, each identifier can be associated with an icon, even a [custom icon], by
adding the following lines to `mkdocs.yml` under the `theme.icon` configuration
setting:

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

  [custom icon]: changing-the-logo-and-icons.md#additional-icons
  [icon search]: ../reference/icons-emojis.md#search

## Usage

### Adding tags

<!-- md:version 8.2.0 -->
<!-- md:example tags -->

When the [built-in tags plugin] is enabled, tags can be added for a document
with the front matter `tags` property. Add the following lines at the top of a
Markdown file:

``` sh
---
tags:
  - HTML5
  - JavaScript
  - CSS
---

...
```

The page will now render with those tags above the main headline and within the
search preview, which now allows to __find pages by tags__.

??? question "How to set tags for an entire folder?"

    With the help of the [built-in meta plugin], you can ensure that tags are
    set for an entire section and all nested pages, by creating a `.meta.yml`
    file in the corresponding folder with the following content:

    ``` yaml
    tags:
      - HTML5
      - JavaScript
      - CSS
    ```

    The tags set in `.meta.yml` are merged and deduplicated with the tags
    defined for a page, which means you can define common tags in `.meta.yml`
    and then add specific tags for each page. The tags in `.meta.yml` are
    appended.

  [built-in tags plugin]: ../plugins/tags.md
  [built-in meta plugin]: ../plugins/meta.md

### Adding a tags index

<!-- md:version 8.2.0 -->
<!-- md:example tags -->

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

[![Tags index][tags index enabled]][tags index enabled]

  [tags.tags_file]: #tags-file
  [tags index enabled]: ../assets/screenshots/tags-index.png

### Hiding tags on a page

While the tags are rendered above the main headline, sometimes, it might be
desirable to hide them for a specific page, which can be achieved with the
front matter `hide` property:

``` yaml
---
hide:
  - tags
---

# Page title
...
```
