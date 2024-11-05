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

#### Advanced settings

<!-- md:sponsors -->
<!-- md:version insiders-4.48.0 -->
<!-- md:flag experimental -->

The following advanced settings are currently reserved to our [sponsors]
[Insiders]. They are entirely optional, and only add additional capabilities to
the tags plugin:

<!-- - [`listings_layout`][config.listings_layout] -->
- [`listings_toc`][config.listings_toc]

We'll add more settings here in the near future.

  [Insiders]: ../insiders/index.md
  [config.listings_layout]: ../plugins/tags.md#config.listings_layout
  [config.listings_toc]: ../plugins/tags.md#config.listings_toc

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

The [built-in tags plugin] allows to define a file to render a tags index,
which can be any page that is part of the `nav` section. To add a tags index,
create a page, e.g. `tags.md`:

``` markdown
# Tags

Following is a list of relevant tags:

<!-- material/tags -->
```

Then in your `mkdocs.yml` file, add the following.

``` yaml
plugins:
  - tags:
      tags_file: tags.md # (1)!
```

1. This setting is not necessary when using [Insiders].

Note that the path to `tags.md` is relative to the `docs/` directory.

The tags marker specifies the position of the tags index, i.e. it is
replaced with the actual tags index when the page is rendered. You can include
arbitrary content before and after the marker:

[![Tags index][tags index enabled]][tags index enabled]

  [tags.tags_file]: #tags-file
  [tags index enabled]: ../assets/screenshots/tags-index.png

### Advanced features

[Insiders] ships a __ground up rewrite of the tags plugin__ which is infinitely
more powerful than the current version in the community edition. It allows
for an arbitrary number of tags indexes (listings), [scoped listings],
[shadow tags], [nested tags], and much more.

  [scoped listings]: #scoped-listings
  [shadow tags]: #shadow-tags
  [nested tags]: #nested-tags

#### Configurable listings

<!-- md:sponsors -->
<!-- md:version insiders-4.48.0 -->
<!-- md:flag experimental -->

Listings can be configured in `mkdocs.yml` or directly at the location of the
marker that you position in a Markdown document. Some examples:

- __Use [scoped listings]__: limit the tags index to pages that are on the same
  level of the subsection of the documentation the page is in:

    ``` html
    <!-- material/tags { scope: true } -->
    ```

- __List only specific tags__: limit the tags index to a single or multiple
  selected tags, e.g., `Foo` and `Bar`, excluding all other tags:

    ``` html
    <!-- material/tags { include: [Foo, Bar] } -->
    ```

- __Exclude pages with specific tags__: don't include pages that are tagged
  with specific tags, e.g. `Internal`. This can be any tag, including a shadow
  tag:

    ``` html
    <!-- material/tags { exclude: [Internal] } -->
    ```

- __Enable or disable tags inside the table of contents__: specify whether the
  table of contents lists all tags under the nearest headline:

    ``` html
    <!-- material/tags { toc: false } -->
    ```

See the [listing configuration] for all options.

  [listing configuration]: ../plugins/tags.md#listing-configuration

#### Scoped listings

<!-- md:sponsors -->
<!-- md:version insiders-4.48.0 -->
<!-- md:flag experimental -->

If your documentation is large, you might want to consider using scoped listings
which will only include pages that are on the same level or below the page
containing the listing. Just use:

``` html
<!-- material/tags { scope: true } -->
```

If you plan to use multiple scoped indexes, it's a good idea to define a
listing configuration in `mkdocs.yml`, which you can then reference by its id:

``` yaml
plugins:
  - tags:
      listings_map:
        scoped:
          scope: true
```

You can now use:

``` html
<!-- material/tags scoped -->
```

#### Shadow tags

<!-- md:sponsors -->
<!-- md:version insiders-4.48.0 -->
<!-- md:flag experimental -->

Shadow tags are tags that are solely meant to organization, which can be
included or excluded for rendering with a simple flag. They can be enumerated
in the [`shadow_tags`][config.shadow_tags] setting:

``` yaml
plugins:
  - tags:
      shadow_tags:
        - Draft
        - Internal
```

If a document is tagged with `Draft`, the tag will only be rendered if
[`shadow`][config.shadow] setting is enabled, and excluded when it is disabled.
This is an excellent opportunity for using tags for structuring.

  [config.shadow]: ../plugins/tags.md#config.shadow
  [config.shadow_tags]: ../plugins/tags.md#config.shadow_tags

#### Nested tags

<!-- md:sponsors -->
<!-- md:version insiders-4.48.0 -->
<!-- md:flag experimental -->

[Insiders] ships support for nested tags. The
[`tags_hierarchy_separator`][config.tags_hierarchy_separator] allows to create
hierarchies of tags, e.g., `Foo/Bar`. Nested tags will be rendered as children
of the parent tag:

``` yaml
plugins:
  - tags:
      tags_hierarchy: true
```

  [config.tags_hierarchy_separator]: ../plugins/tags.md#config.tags_hierarchy_separator

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
