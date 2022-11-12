# Setting up tags

Material for MkDocs adds first-class support for categorizing pages with tags,
which adds the possibility to group related pages and make them discoverable
via search and a dedicated [tags index]. If your documentation is large, tags
can help to discover relevant information faster.

  [tags index]: #adding-a-tags-index

## Configuration

### Built-in tags plugin

[:octicons-tag-24: 8.2.0][Tags support] ·
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

[`enabled`](#+tags.enabled){ #+tags.enabled }

:   :octicons-milestone-24: Default: `true` – This option specifies whether
    the plugin is enabled when building your project. If you want to speed up
    local builds, you can use an [environment variable]:

    ``` yaml
    plugins:
      - tags:
          enabled: !ENV [CI, false]
    ```

[`tags_file`](#+tags.tags_file){ #+tags.tags_file }

:   :octicons-milestone-24: Default: _none_ – This option specifies which page
    should be used to render the tags index. See the section on [adding a tags 
    index][tags index] for more information. If this option is specified, tags
    become clickable, pointing to the corresponding section in the tags index:

    ``` yaml
    plugins:
      - tags:
          tags_file: tags.md
    ```

    The page holding the tags index can be linked anywhere in the `nav` section
    of `mkdocs.yml`. Note, however, that this options is not required – only use
    it if you want a tags index page.

[`tags_extra_files`](#+tags.tags_extra_files){ #+tags.tags_extra_files }

:   [:octicons-tag-24: insiders-4.20.0][Insiders] · :octicons-milestone-24: 
    Default: _none_ – This option specifies additional pages, i.e. to render
    subsets of the [tags index], in order to provide scoped tags indexes for 
    specific sections:

    ``` yaml
    plugins:
      - tags:
          tags_extra_files:
            compatibility.md:
              - compat # (1)!
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

    Note that the values listed under each tags extra file must be alphanumeric
    [tag identifiers], not tags themselves. See #3864 for more information.

[`tags_slugify`](#+tags.tags_slugify){ #+tags.tags_slugify }

:   [:octicons-tag-24: insiders-4.25.0][Insiders] · :octicons-milestone-24: 
    Default: `headerid.slugify` – This option specifies which function to use for 
    generating URL-compatible slugs from tags. [Python Markdown Extensions] 
    includes several Unicode-aware slug functions which are a good choice for 
    non-ASCII languages:

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

[`tags_slugify_separator`](#+tags.tags_slugify_separator){ #+tags.tags_slugify_separator }

:   [:octicons-tag-24: insiders-4.25.0][Insiders] · :octicons-milestone-24: 
    Default: `-` – This option specifies the separator which is used by the slug function. By default, a hyphen is used, but it can
    be changed to any string:

    ``` yaml
    plugins:
      - tags:
          tags_slugify_separator: "-"
    ```

[`tags_compare`](#+tags.tags_compare){ #+tags.tags_compare }

:   [:octicons-tag-24: insiders-4.26.2][Insiders] · :octicons-milestone-24:
    Default: `None` – This option specifies which function to use when
    comparing tag values for sorting. If you wish to compare tags irregardless
    of casing, use:

    ``` yaml
    plugins:
      - tags:
          tags_compare: !!python/name:material.plugins.tags.plugin.casefold
    ```

    You can also define your own comparison function which must return a tag
    value (as a string) that is used for sorting, and reference it accordingly.

[`tags_compare_reverse`](#+tags.tags_compare_reverse){ #+tags.tags_compare_reverse }

:   [:octicons-tag-24: insiders-4.26.2][Insiders] · :octicons-milestone-24:
    Default: `false` – This option specifies whether tags are sorted in reverse
    order. It is mainly provided for completeness. To change direction, use:

    ``` yaml
    plugins:
      - tags:
          tags_compare_reverse: true
    ```

[`tags_allowed`](#+tags.tags_allowed){ #+tags.tags_allowed } :material-alert-decagram:{ .mdx-pulse title="Added on October 2, 2022" }

:   [:octicons-tag-24: insiders-4.25.0][Insiders] · :octicons-milestone-24: 
    Default: _none_ – This option allows the author to define explicitly which
    tags are allowed to be used on pages. If this setting is omitted, the
    [built-in tags plugin] won't check tag names. Use this option to define a
    list of tags in order to catch typos:

    ``` yaml
    plugins:
      - tags:
          tags_allowed:
            - HTML5
            - JavaScript
            - CSS
    ```

  [Tags support]: https://github.com/squidfunk/mkdocs-material/releases/tag/8.2.0
  [environment variable]: https://www.mkdocs.org/user-guide/configuration/#environment-variables
  [Insiders]: ../insiders/index.md
  [tag identifiers]: #tag-icons-and-identifiers
  [Python Markdown Extensions]: https://facelessuser.github.io/pymdown-extensions/extras/slugs/

### Tag icons and identifiers

[:octicons-tag-24: 8.5.0][Tag icons support] ·
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

  [Tag icons support]: https://github.com/squidfunk/mkdocs-material/releases/tag/8.5.0
  [custom icon]: changing-the-logo-and-icons.md#additional-icons
  [icon search]: ../reference/icons-emojis.md#search

## Usage

### Adding tags

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

  [built-in tags plugin]: #built-in-tags-plugin
  [built-in meta plugin]: ../reference/index.md#built-in-meta-plugin

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

# Document title
...
```
