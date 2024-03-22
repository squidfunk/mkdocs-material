---
title: Built-in blog plugin
icon: material/newspaper-variant-outline
---

# Built-in blog plugin

The blog plugin makes it very easy to build a blog, either as a sidecar to
your documentation or as the main thing. Focus on your content while the plugin
does all the heavy lifting, generating a view of all latest posts, [archive] and
[category] pages, configurable [pagination] and much more.

  [archive]: #archive
  [category]: #categories
  [pagination]: #pagination

## Objective

### How it works

The plugin scans the configured [`posts` directory][config.post_dir] for
`.md` files from which paginated views[^1] are automatically generated. If not
configured otherwise, the plugin expects that your project has the following
directory layout, and will create any missing directories or files for you:

  [^1]:
    Views are pages that are automatically generated, i.e., the entry point to
    your blog listing all latest posts, as well as [archive] and [category]
    pages that list all posts associated with them through [metadata] in
    chronological order.

``` { .sh .no-copy }
.
├─ docs/
│  └─ blog/
│     ├─ posts/
│     └─ index.md
└─ mkdocs.yml
```

The `index.md` file in the [`blog` directory][config.blog_dir] is the entry
point to your blog – a paginated view listing all posts in reverse chronological
order. Besides that, the plugin supports automatically creating [archive] and
[category] pages that list a subset of posts for a time interval or category.

[Post URLs][config.post_url_format] are completely configurable, no matter if
you want your URLs to include the post's date or not. Rendered dates always
display in the locale of the [site language] of your project. Like in other
static blog frameworks, posts can be annotated with a variety of [metadata],
allowing for easy integration with other [built-in plugins], e.g., the
[social] and [tags] plugin.

Posts can be organized in nested folders with a directory layout that suits your
specific needs, and can make use of all components and syntax that Material for
MkDocs offers, including [admonitions], [annotations], [code blocks],
[content tabs], [diagrams], [icons], [math], and more.

  [metadata]: #metadata
  [built-in plugins]: index.md
  [social]: social.md
  [tags]: tags.md
  [admonitions]: ../reference/admonitions.md
  [annotations]: ../reference/annotations.md
  [code blocks]: ../reference/code-blocks.md
  [content tabs]: ../reference/content-tabs.md
  [diagrams]: ../reference/diagrams.md
  [icons]: ../reference/icons-emojis.md
  [math]: ../reference/math.md

### When to use it

If you want to add a blog to your project, or migrate from another blog
framework to Material for MkDocs because of its excellent technical writing
capabilities, this plugin is a great choice, as it integrates perfectly with
many other built-in plugins:

<div class="grid cards" markdown>

-   :material-file-tree: &nbsp; __[Built-in meta plugin][meta]__

    ---

    The meta plugin makes it easy to apply [metadata] to a subset of posts,
    including authors, tags, categories, draft status, as well as social card
    layouts.

    ---

    __Simpler organization, categorization and management of post metadata__

-   :material-share-circle: &nbsp; __[Built-in social plugin][social]__

    ---

    The social plugin automatically generates beautiful and customizable
    social cards for each post and page, showing as previews on social media.

    ---

    __Links to your blog render beautiful social cards when shared on social
    media__

-   :material-rabbit: &nbsp; __[Built-in optimize plugin][optimize]__

    ---

    The optimize plugin automatically identifies and optimizes all media files
    that you reference in your project by using compression and conversion
    techniques.

    ---

    __Your blog loads faster as smaller images are served to your users__

-   :material-tag-text: &nbsp; __[Built-in tags plugin][tags]__

    ---

    The tags plugin allows to categorize posts alongside with pages in your
    project, to improve their discoverability and connect posts to your
    documentation.

    ---

    __Your documentation's tag system integrates with your blog__

</div>

  [meta]: meta.md
  [social]: social.md
  [optimize]: optimize.md
  [tags]: tags.md

## Configuration

<!-- md:version 9.2.0 -->
<!-- md:plugin [blog] – built-in -->
<!-- md:flag multiple -->
<!-- md:flag experimental -->

As with all [built-in plugins], getting started with the blog plugin is
straightforward. Just add the following lines to `mkdocs.yml`, and you can
start writing your first post:

``` yaml
plugins:
  - blog
```

The blog plugin is built into Material for MkDocs and doesn't need to be
installed.

  [blog]: blog.md
  [built-in plugins]: index.md

### Navigation

If you do not have site navigation configured in your `mkdocs.yml` then there is
nothing more to do. The blog [archive] and [category] pages will automatically
appear underneath the automatically generated navigation.

If you do have a navigation structure defined then you will need to specify
where the blog should appear in this. Create a [navigation section with an index
page] for the blog:

```yaml
theme:
  name: material
  features:
    - navigation.indexes
nav:
  - ...
  - Blog:
    - blog/index.md
```

The [archive] and [category] pages will appear within that section as
subsections beneath pages in the blog section. In this case, they would appear
after `index.md`. The path to the `index.md` file must match
[blog_dir][config.blog_dir]. This means that you can name the blog navigation
entry anything you like: 'Blog' or 'News' or perhaps 'Tips'.

[navigation section with an index page]: ../setup/setting-up-navigation.md#section-index-pages

### General

The following settings are available:

---

#### <!-- md:setting config.enabled -->

<!-- md:version 9.2.0 -->
<!-- md:default `true` -->

Use this setting to enable or disable the plugin when [building your project].
It's normally not necessary to specify this setting, but if you want to disable
the plugin, use:

``` yaml
plugins:
  - blog:
      enabled: false
```

  [building your project]: ../creating-your-site.md#building-your-site

---

#### <!-- md:setting config.blog_dir -->

<!-- md:version 9.2.0 -->
<!-- md:default `blog` -->

Use this setting to change the path where your blog is located in the
[`docs` directory][mkdocs.docs_dir]. The path is included in the generated
URLs as a prefix for all posts and views. You can change it with:

=== "Documentation + Blog"

    ``` yaml
    plugins:
      - blog:
          blog_dir: blog
    ```

=== "Blog only"

    ``` yaml
    plugins:
      - blog:
          blog_dir: .
    ```

The provided path is resolved from the [`docs` directory][mkdocs.docs_dir].

---

#### <!-- md:setting config.blog_toc -->

<!-- md:version 9.2.0 -->
<!-- md:default `false` -->

Use this setting to leverage the table of contents to display post titles in
views. This might be useful, if your post excerpts are rather long. If you want
to enable it, use:

``` yaml
plugins:
  - blog:
      blog_toc: true
```

### Posts

The following settings are available for posts:

---

#### <!-- md:setting config.post_dir -->

<!-- md:version 9.2.0 -->
<!-- md:default `{blog}/posts` -->

Use this setting to change the folder where your posts are located. It's
normally not necessary to change this setting, but if you want to rename the
folder or change its file system location, use:

``` yaml
plugins:
  - blog:
      post_dir: "{blog}/articles"
```

Note that the [`posts` directory][config.post_dir] is solely used for post
organization – it is not included in post URLs, since they are automatically
and comfortably generated by this plugin.

The following placeholders are available:

- `blog` – [`blog` directory][config.blog_dir]

The provided path is resolved from the [`docs` directory][mkdocs.docs_dir].

---

#### <!-- md:setting config.post_date_format -->

<!-- md:version 9.2.0 -->
<!-- md:default `long` -->

Use this setting to change the date format of posts. This plugin uses [babel]
to render dates in the configured [site language]. You can use [babel]'s
[pattern syntax] or the following shortcodes:

=== "Monday, January 31, 2024"

    ``` yaml
    plugins:
      - blog:
          post_date_format: full
    ```

=== "January 31, 2024"

    ``` yaml
    plugins:
      - blog:
          post_date_format: long
    ```

=== "Jan 31, 2024"

    ``` yaml
    plugins:
      - blog:
          post_date_format: medium
    ```

=== "1/31/24"

    ``` yaml
    plugins:
      - blog:
          post_date_format: short
    ```

Note that depending on the [site language], results might look different for
other languages.

  [babel]: https://pypi.org/project/Babel/
  [site language]: ../setup/changing-the-language.md#site-language
  [pattern syntax]: https://babel.pocoo.org/en/latest/dates.html#pattern-syntax

---

#### <!-- md:setting config.post_url_date_format -->

<!-- md:version 9.2.0 -->
<!-- md:default `yyyy/MM/dd` -->

Use this setting to change the date format used in post URLs. The format string
must adhere to [babel]'s [pattern syntax] and should not contain whitespace.
Some popular choices:

=== ":material-link: blog/2024/01/31/:material-dots-horizontal:/"

    ``` yaml
    plugins:
      - blog:
          post_url_date_format: yyyy/MM/dd
    ```

=== ":material-link: blog/2024/01/:material-dots-horizontal:/"

    ``` yaml
    plugins:
      - blog:
          post_url_date_format: yyyy/MM
    ```

=== ":material-link: blog/2024/:material-dots-horizontal:/"

    ``` yaml
    plugins:
      - blog:
          post_url_date_format: yyyy
    ```

If you want to remove the date from post URLs, e.g., when your blog features
mostly evergreen content, you can remove the `date` placeholder from the
[`post_url_format`][config.post_url_format] format string.

---

#### <!-- md:setting config.post_url_format -->

<!-- md:version 9.2.0 -->
<!-- md:default `{date}/{slug}` -->

Use this setting to change the format string that is used when generating post
URLs. You can freely combine placeholders, and join them with slashes or other
characters:

=== ":material-link: blog/2024/:material-dots-horizontal:/"

    ``` yaml
    plugins:
      - blog:
          post_url_format: "{date}/{slug}"
    ```

=== ":material-link: blog/:material-dots-horizontal:/"

    ``` yaml
    plugins:
      - blog:
          post_url_format: "{slug}"
    ```

The following placeholders are available:

- `categories` – Post categories, slugified with [`categories_slugify`][config.categories_slugify]
- `date` – Post date, formatted with [`post_url_date_format`][config.post_url_date_format]
- `slug` – Post title, slugified with [`post_slugify`][config.post_slugify], or explicitly set via [`slug`][meta.slug] metadata property
- `file` – Post filename without `.md` file extension

If you remove the `date` placeholder, make sure that post URLs don't collide
with URLs of other pages hosted under the [`blog` directory][config.blog_dir],
as this leads to undefined behavior.

---

#### <!-- md:setting config.post_url_max_categories -->

<!-- md:version 9.2.0 -->
<!-- md:default `1` -->

Use this setting to set an upper bound for the number of categories included in
post URLs if the `categories` placeholder is part of [`post_url_format`]
[config.post_url_format] and the post defines categories:

``` yaml
plugins:
  - blog:
      post_url_format: "{categories}/{slug}"
      post_url_max_categories: 2
```

If more than one category is given, they are joined with `/` after slugifying.

---

#### <!-- md:setting config.post_slugify -->

<!-- md:version 9.2.0 -->
<!-- md:default [`pymdownx.slugs.slugify`][pymdownx.slugs.slugify] -->

Use this setting to change the function for generating URL-compatible slugs
from post titles. By default, the [`slugify`][pymdownx.slugs.slugify] function
from [Python Markdown Extensions] is used as follows:

``` yaml
plugins:
  - blog:
      post_slugify: !!python/object/apply:pymdownx.slugs.slugify
        kwds:
          case: lower
```

The default configuration is Unicode-aware and should produce good slugs for all
languages. Of course, you can also provide a custom slugification function for
more granular control.

  [pymdownx.slugs.slugify]: https://github.com/facelessuser/pymdown-extensions/blob/01c91ce79c91304c22b4e3d7a9261accc931d707/pymdownx/slugs.py#L59-L65
  [Python Markdown Extensions]: https://facelessuser.github.io/pymdown-extensions/extras/slugs/

---

#### <!-- md:setting config.post_slugify_separator -->

<!-- md:version 9.2.0 -->
<!-- md:default `-` -->

Use this setting to change the separator that is passed to the slugification
function set as part of [`post_slugify`][config.post_slugify]. While the default
is a hyphen, it can be set to any string, e.g., `_`:

``` yaml
plugins:
  - blog:
      post_slugify_separator: _
```

---

#### <!-- md:setting config.post_excerpt -->

<!-- md:version 9.2.0 -->
<!-- md:default `optional` -->

By default, the plugin makes post excerpts optional. When a post doesn't define
an excerpt, views include the entire post. This setting can be used to make
post excerpts required:

=== "Optional"

    ``` yaml
    plugins:
      - blog:
          post_excerpt: optional
    ```

=== "Required"

    ``` yaml
    plugins:
      - blog:
          post_excerpt: required
    ```

When post excerpts are required, posts without excerpt separators raise an
error. Thus, this setting is useful when you want to make sure that all posts
have excerpts defined.

---

#### <!-- md:setting config.post_excerpt_max_authors -->

<!-- md:version 9.2.0 -->
<!-- md:default `1` -->

Use this setting to set an upper bound for the number of authors rendered in
post excerpts. While each post may be written by multiple authors, this setting
allows to limit the display to just a few or even a single author, or disable
authors in post excerpts:

=== "Render up to 2 authors"

    ``` yaml
    plugins:
      - blog:
          post_excerpt_max_authors: 2
    ```

=== "Disable authors"

    ``` yaml
    plugins:
      - blog:
          post_excerpt_max_authors: 0
    ```

This only applies to post excerpts in views. Posts always render all authors.

---

#### <!-- md:setting config.post_excerpt_max_categories -->

<!-- md:version 9.2.0 -->
<!-- md:default `5` -->

Use this setting to set an upper bound for the number of categories rendered in
post excerpts. While each post may be assigned to multiple categories, this
setting allows to limit the display to just a few or even a single category, or
disable categories in post excerpts:

=== "Render up to 2 categories"

    ``` yaml
    plugins:
      - blog:
          post_excerpt_max_categories: 2
    ```

=== "Disable categories"

    ``` yaml
    plugins:
      - blog:
          post_excerpt_max_categories: 0
    ```

This only applies to post excerpts in views. Posts always render all categories.

---

#### <!-- md:setting config.post_excerpt_separator -->

<!-- md:version 9.2.0 -->
<!-- md:default <code>&lt;!-- more --&gt;</code> -->

Use this setting to set the separator the plugin will look for in a post's
content when generating post excerpts. All content __before__ the separator is
considered to be part of the excerpt:

``` yaml
plugins:
  - blog:
      post_excerpt_separator: <!-- more -->
```

It is common practice to use an HTML comment as a separator.

---

#### <!-- md:setting config.post_readtime -->

<!-- md:version 9.2.0 -->
<!-- md:default `true` -->

Use this setting to control whether the plugin should automatically compute the
reading time of a post, which is then rendered in post excerpts, as well as in
posts themselves:

``` yaml
plugins:
  - blog:
      post_readtime: false
```

---

#### <!-- md:setting config.post_readtime_words_per_minute -->

<!-- md:version 9.2.0 -->
<!-- md:default `265` -->

Use this setting to change the number of words that a reader is expected to read
per minute when computing the reading time of a post. If you want to fine-tune
it, use:

``` yaml
plugins:
  - blog:
      post_readtime_words_per_minute: 300
```

A reading time of 265 words per minute is considered to be the
[average reading time of an adult].

  [average reading time of an adult]: https://help.medium.com/hc/en-us/articles/214991667-Read-time

### Archive

The following settings are available for archive pages:

---

#### <!-- md:setting config.archive -->

<!-- md:version 9.2.0 -->
<!-- md:default `true` -->

Use this setting to enable or disable archive pages. An archive page shows all
posts for a specific interval (e.g. year, month, etc.) in reverse order. If you
want to disable archive pages, use:

``` yaml
plugins:
  - blog:
      archive: false
```

---

#### <!-- md:setting config.archive_name -->

<!-- md:version 9.2.0 -->
<!-- md:default computed -->

Use this setting to change the title of the archive section the plugin adds to
the navigation. If this setting is omitted, it's sourced from the translations.
If you want to change it, use:

``` yaml
plugins:
  - blog:
      archive_name: Archive
```

---

#### <!-- md:setting config.archive_date_format -->

<!-- md:version 9.2.0 -->
<!-- md:default `yyyy` -->

Use this setting to change the date format used for archive page titles. The
format string must adhere to [babel]'s [pattern syntax]. Some popular choices:

=== "2024"

    ``` yaml
    plugins:
      - blog:
          archive_date_format: yyyy
    ```

=== "January 2024"

    ``` yaml
    plugins:
      - blog:
          archive_date_format: MMMM yyyy
    ```

Note that depending on the [site language], results might look different for
other languages.

---

#### <!-- md:setting config.archive_url_date_format -->

<!-- md:version 9.2.0 -->
<!-- md:default `yyyy` -->

Use this setting to change the date format used for archive page URLs. The
format string must adhere to [babel]'s [pattern syntax] and should not contain
whitespace. Some popular choices:

=== ":material-link: blog/archive/2024/"

    ``` yaml
    plugins:
      - blog:
          archive_url_date_format: yyyy
    ```

=== ":material-link: blog/archive/2024/01/"

    ``` yaml
    plugins:
      - blog:
          archive_url_date_format: yyyy/MM
    ```

---

#### <!-- md:setting config.archive_url_format -->

<!-- md:version 9.2.0 -->
<!-- md:default `archive/{date}` -->

Use this setting to change the format string that is used when generating
archive page URLs. You can freely combine placeholders, and join them with
slashes or other characters:

=== ":material-link: blog/archive/2024/"

    ``` yaml
    plugins:
      - blog:
          archive_url_format: "archive/{date}"
    ```

=== ":material-link: blog/2024/"

    ``` yaml
    plugins:
      - blog:
          archive_url_format: "{date}"
    ```

The following placeholders are available:

- `date` – Archive date, formatted with [`archive_url_date_format`][config.archive_url_date_format]

---

#### <!-- md:setting config.archive_pagination -->

<!-- md:sponsors -->
<!-- md:version insiders-4.44.0 -->
<!-- md:default `true` -->

Use this setting to enable or disable pagination for archive pages. The value
of this setting is inherited from [`pagination`][config.pagination], unless it's
explicitly set. To disable pagination, use:

``` yaml
plugins:
  - blog:
      archive_pagination: false
```

---

#### <!-- md:setting config.archive_pagination_per_page -->

<!-- md:sponsors -->
<!-- md:version insiders-4.44.0 -->
<!-- md:default `10` -->

Use this setting to change the number of posts rendered per archive page. The
value of this setting is inherited from [`pagination_per_page`]
[config.pagination_per_page], unless it's explicitly set. To change it, use:

``` yaml
plugins:
  - blog:
      archive_pagination_per_page: 5
```

---

#### <!-- md:setting config.archive_toc -->

<!-- md:version 9.2.0 -->
<!-- md:default `false` -->

Use this setting to leverage the table of contents to display post titles on all
archive pages. The value of this setting is inherited from [`blog_toc`]
[config.blog_toc], unless it's explicitly set. To change it, use

``` yaml
plugins:
  - blog:
      archive_toc: true
```

### Categories

The following settings are available for category pages:

---

#### <!-- md:setting config.categories -->

<!-- md:version 9.2.0 -->
<!-- md:default `true` -->

Use this setting to enable or disable category pages. A category page shows all
posts for a specific category in reverse chronological order. If you want to
disable category pages, use:

``` yaml
plugins:
  - blog:
      categories: false
```

---

#### <!-- md:setting config.categories_name -->

<!-- md:version 9.2.0 -->
<!-- md:default computed -->

Use this setting to change the title of the category section the plugin adds to
the navigation. If this setting is omitted, it's sourced from the translations.
If you want to change it, use:

``` yaml
plugins:
  - blog:
      categories_name: Categories
```

---

#### <!-- md:setting config.categories_url_format -->

<!-- md:version 9.2.0 -->
<!-- md:default `category/{slug}` -->

Use this setting to change the format string that is used when generating
category page URLs. You can freely combine placeholders, and join them with
slashes or other characters:

=== ":material-link: blog/category/:material-dots-horizontal:/"

    ``` yaml
    plugins:
      - blog:
          categories_url_format: "category/{slug}"
    ```

=== ":material-link: blog/:material-dots-horizontal:/"

    ``` yaml
    plugins:
      - blog:
          categories_url_format: "{slug}"
    ```

The following placeholders are available:

- `slug` – Category, slugified with [`categories_slugify`][config.categories_slugify]

---

#### <!-- md:setting config.categories_slugify -->

<!-- md:version 9.2.0 -->
<!-- md:default [`pymdownx.slugs.slugify`][pymdownx.slugs.slugify] -->

Use this setting to change the function for generating URL-compatible slugs
from categories. By default, the [`slugify`][pymdownx.slugs.slugify] function
from [Python Markdown Extensions] is used as follows:

``` yaml
plugins:
  - blog:
      post_slugify: !!python/object/apply:pymdownx.slugs.slugify
        kwds:
          case: lower
```

The default configuration is Unicode-aware and should produce good slugs for all
languages. Of course, you can also provide a custom slugification function for
more granular control.

---

#### <!-- md:setting config.categories_slugify_separator -->

<!-- md:version 9.2.0 -->
<!-- md:default `-` -->

Use this setting to change the separator that is passed to the slugification
function set as part of [`categories_slugify`][config.categories_slugify]. While
the default is a hyphen, it can be set to any string, e.g., `_`:

``` yaml
plugins:
  - blog:
      categories_slugify_separator: _
```

---

#### <!-- md:setting config.categories_sort_by -->

<!-- md:sponsors -->
<!-- md:version insiders-4.45.0 -->
<!-- md:default `material.plugins.blog.view_name` -->

Use this setting to specify a custom function for sorting categories. For
example, if you want to sort categories by the number of posts they contain,
use the following configuration:

``` yaml
plugins:
  - blog:
      categories_sort_by: !!python/name:material.plugins.blog.view_post_count
```

Don't forget to enable [`categories_sort_reverse`][config.categories_sort_reverse].
You can define your own comparison function, which must return something
that can be compared while sorting, i.e., a string or number.

---

#### <!-- md:setting config.categories_sort_reverse -->

<!-- md:sponsors -->
<!-- md:version insiders-4.45.0 -->
<!-- md:default `false` -->

Use this setting to reverse the order in which categories are sorted. By
default, categories are sorted in ascending order, but you can reverse ordering
as follows:

``` yaml
plugins:
  - blog:
      categories_sort_reverse: true
```

---

#### <!-- md:setting config.categories_allowed -->

<!-- md:version 9.2.0 -->
<!-- md:default none -->

The plugin allows to check categories against a predefined list, in order to
catch typos or make sure that categories are not arbitrarily added. Specify the
categories you want to allow with:

``` yaml
plugins:
  - blog:
      categories_allowed:
        - Search
        - Performance
```

The plugin stops the build if a post references a category that is not part of
this list. Posts can be assigned to categories by using the [`categories`]
[meta.categories] metadata property.

---

#### <!-- md:setting config.categories_pagination -->

<!-- md:sponsors -->
<!-- md:version insiders-4.44.0 -->
<!-- md:default `true` -->

Use this setting to enable or disable pagination for category pages. The value
of this setting is inherited from [`pagination`][config.pagination], unless it's
explicitly set. To disable pagination, use:

``` yaml
plugins:
  - blog:
      categories_pagination: false
```

---

#### <!-- md:setting config.categories_pagination_per_page -->

<!-- md:sponsors -->
<!-- md:version insiders-4.44.0 -->
<!-- md:default `10` -->

Use this setting to change the number of posts rendered per category page. The
value of this setting is inherited from [`pagination_per_page`]
[config.pagination_per_page], unless it's explicitly set. To change it, use:

``` yaml
plugins:
  - blog:
      categories_pagination_per_page: 5
```

---

#### <!-- md:setting config.categories_toc -->

<!-- md:version 9.2.0 -->
<!-- md:default `false` -->

Use this setting to leverage the table of contents to display post titles on all
category pages. The value of this setting is inherited from [`blog_toc`]
[config.blog_toc], unless it's explicitly set. To change it, use:

``` yaml
plugins:
  - blog:
      categories_toc: true
```

### Authors

The following settings are available for authors:

---

#### <!-- md:setting config.authors -->

<!-- md:version 9.2.0 -->
<!-- md:default `true` -->

Use this setting to enable or disable post authors. If this setting is enabled,
the plugin will look for a file named [`.authors.yml`][config.authors_file] and
render authors in posts and views. Disable this behavior with:

``` yaml
plugins:
  - blog:
      authors: false
```

---

#### <!-- md:setting config.authors_file -->

<!-- md:version 9.2.0 -->
<!-- md:default `{blog}/.authors.yml` -->

Use this setting to change the path of the file where the author information for
your posts resides. It's normally not necessary to change this setting, but if
you need to, use:

``` yaml
plugins:
  - blog:
      authors_file: "{blog}/.authors.yml"
```

The following placeholders are available:

- `blog` – [`blog` directory][config.blog_dir]

The provided path is resolved from the [`docs` directory][mkdocs.docs_dir].

!!! info "Format of author information"

    The `.authors.yml` file must adhere to the following format:

    ``` yaml title=".authors.yml"
    authors:
      <author>:
        name: string        # Author name
        description: string # Author description
        avatar: url         # Author avatar
        slug: url           # Author profile slug
        url: url            # Author website URL
    ```

    Note that `<author>` must be set to an identifier for associating authors
    with posts, e.g., a GitHub username like `squidfunk`. This identifier can
    then be used in the [`authors`][meta.authors] metadata property of
    a post. Multiple authors are supported. As an example, see
    [the `.authors.yml` file][.authors.yml] we're using for our blog.

  [.authors.yml]: https://github.com/squidfunk/mkdocs-material/blob/master/docs/blog/.authors.yml

---

#### <!-- md:setting config.authors_profiles -->

<!-- md:sponsors -->
<!-- md:version insiders-4.46.0 -->
<!-- md:default `false` -->

Use this setting to enable or disable automatically generated author profiles.
An author profile shows all posts by an author in reverse chronological order.
You can enable author profiles with:

``` yaml
plugins:
  - blog:
      authors_profiles: true
```

---

#### <!-- md:setting config.authors_profiles_name -->

<!-- md:sponsors -->
<!-- md:version insiders-4.46.0 -->
<!-- md:default computed -->

Use this setting to change the title of the authors section the plugin adds to
the navigation. If this setting is omitted, it's sourced from the translations.
If you want to change it, use:

``` yaml
plugins:
  - blog:
      authors_profiles_name: Authors
```

---

#### <!-- md:setting config.authors_profiles_url_format -->

<!-- md:sponsors -->
<!-- md:version insiders-4.46.0 -->
<!-- md:default `author/{slug}` -->

Use this setting to change the format string that is used when generating
author profile URLs. You can freely combine placeholders, and join them with
slashes or other characters:

=== ":material-link: blog/author/:material-dots-horizontal:/"

    ``` yaml
    plugins:
      - blog:
          authors_profiles_url_format: "author/{slug}"
    ```

=== ":material-link: blog/:material-dots-horizontal:/"

    ``` yaml
    plugins:
      - blog:
          authors_profiles_url_format: "{slug}"
    ```

The following placeholders are available:

- `slug` – Author slug or identifier from [`authors_file`][config.authors_file]
- `name` – Author name from [`authors_file`][config.authors_file]

---

#### <!-- md:setting config.authors_profiles_pagination -->

<!-- md:sponsors -->
<!-- md:version insiders-4.46.0 -->
<!-- md:default `true` -->

Use this setting to enable or disable pagination for author profiles. The value
of this setting is inherited from [`pagination`][config.pagination], unless it's
explicitly set. To disable pagination, use:

``` yaml
plugins:
  - blog:
      authors_profiles_pagination: false
```

---

#### <!-- md:setting config.authors_profiles_pagination_per_page -->

<!-- md:sponsors -->
<!-- md:version insiders-4.46.0 -->
<!-- md:default `10` -->

Use this setting to change the number of posts rendered per archive page. The
value of this setting is inherited from [`pagination_per_page`]
[config.pagination_per_page], unless it's explicitly set. To change it, use:

``` yaml
plugins:
  - blog:
      authors_profiles_pagination_per_page: 5
```

---

#### <!-- md:setting config.authors_profiles_toc -->

<!-- md:sponsors -->
<!-- md:version insiders-4.46.0 -->
<!-- md:default `false` -->

Use this setting to leverage the table of contents to display post titles on all
author profiles. The value of this setting is inherited from [`blog_toc`]
[config.blog_toc], unless it's explicitly set. To change it, use:

``` yaml
plugins:
  - blog:
      authors_profiles_toc: true
```

### Pagination

The following settings are available for pagination:

---

#### <!-- md:setting config.pagination -->

<!-- md:version 9.2.0 -->
<!-- md:default `true` -->

Use this setting to enable or disable pagination in views – generated pages
that show posts or subsets of posts in reverse chronological order. If you want
to disable pagination, use:

``` yaml
plugins:
  - blog:
      pagination: false
```

---

#### <!-- md:setting config.pagination_per_page -->

<!-- md:version 9.2.0 -->
<!-- md:default `10` -->

Use this setting to change the number of posts rendered per page. If you have
rather long post excerpts, it can be a good idea to reduce the number of posts
per page:

``` yaml
plugins:
  - blog:
      pagination_per_page: 5
```

---

#### <!-- md:setting config.pagination_url_format -->

<!-- md:version 9.2.0 -->
<!-- md:default `page/{page}` -->

Use this setting to change the format string that is used when generating
paginated view URLs. You can freely combine placeholders, and join them with
slashes or other characters:

=== ":material-link: blog/page/n/"

    ``` yaml
    plugins:
      - blog:
          pagination_url_format: "page/{page}"
    ```

=== ":material-link: blog/n/"

    ``` yaml
    plugins:
      - blog:
          pagination_url_format: "{page}"
    ```

The following placeholders are available:

- `page` – Page number

---

#### <!-- md:setting config.pagination_format -->

<!-- md:version 9.2.0 -->
<!-- md:default `~2~` -->

The plugin uses the [paginate] module to generate the pagination markup using a
special syntax. Use this setting to customize how pagination is constructed.
Some popular choices:

=== "1 2 3 .. n"

    ``` yaml
    plugins:
      - blog:
          pagination_format: "~2~"
    ```

=== "1 2 3 .. n :material-chevron-right: :material-chevron-double-right:"

    ``` yaml
    plugins:
      - blog:
          pagination_format: "$link_first $link_previous ~2~ $link_next $link_last"
    ```

=== "1 :material-chevron-right:"

    ``` yaml
    plugins:
      - blog:
          pagination_format: "$link_previous $page $link_next"
    ```

The following placeholders are supported by [paginate]:

- `#!css $first_page` – Number of first reachable page
- `#!css $last_page` – Number of last reachable page
- `#!css $page` – Number of currently selected page
- `#!css $page_count` – Number of reachable pages
- `#!css $items_per_page` – Maximal number of items per page
- `#!css $first_item` – Index of first item on the current page
- `#!css $last_item` – Index of last item on the current page
- `#!css $item_count` – Total number of items
- `#!css $link_first` – Link to first page (unless on first page)
- `#!css $link_last` – Link to last page (unless on last page)
- `#!css $link_previous` – Link to previous page (unless on first page)
- `#!css $link_next` – Link to next page (unless on last page)

  [paginate]: https://pypi.org/project/paginate/

---

#### <!-- md:setting config.pagination_if_single_page -->

<!-- md:version 9.2.0 -->
<!-- md:default `false` -->

Use this setting to control whether pagination should be automatically disabled
when the view only consists of a single page. If you want to always render
pagination, use:

``` yaml
plugins:
  - blog:
      pagination_if_single_page: true
```

---

#### <!-- md:setting config.pagination_keep_content -->

<!-- md:version 9.2.0 -->
<!-- md:default `false` -->

Use this setting to enable or disable persistence of content, i.e., if paginated
views should also display the content of their containing view. If you want to
enable this behavior, use:

``` yaml
plugins:
  - blog:
      pagination_keep_content: true
```

### Drafts

The following settings are available for drafts:

---

#### <!-- md:setting config.draft -->

<!-- md:version 9.2.0 -->
<!-- md:default `false` -->

Rendering [draft posts][meta.draft] can be useful in deploy previews. Use this
setting to specify whether the plugin should include posts marked as drafts when
[building your project]:

=== "Render drafts"

    ``` yaml
    plugins:
      - blog:
          draft: true
    ```

=== "Don't render drafts"

    ``` yaml
    plugins:
      - blog:
          draft: false
    ```

---

#### <!-- md:setting config.draft_on_serve -->

<!-- md:version 9.2.0 -->
<!-- md:default `true` -->

Use this setting to control whether the plugin should include posts marked as
drafts when [previewing your site]. If you don't wish to include draft posts
when previewing, use:

``` yaml
plugins:
  - blog:
      draft_on_serve: false
```

  [previewing your site]: ../creating-your-site.md#previewing-as-you-write

---

#### <!-- md:setting config.draft_if_future_date -->

<!-- md:version 9.2.0 -->
<!-- md:default `false` -->

The plugin can automatically mark posts with future dates as drafts. When the
date is past today, the post is automatically included when
[building your project], unless explicitly marked as draft:

``` yaml
plugins:
  - blog:
      draft_if_future_date: true
```

## Usage

### Metadata

Posts can define a handful of metadata properties that specify how the plugin
renders them, in which views they are integrated, and how they are linked to
each other. The metadata of each post is validated against a schema to allow for
a quicker discovery of syntax errors.

The following properties are available:

---

#### <!-- md:setting meta.authors -->

<!-- md:version 9.2.0 -->
<!-- md:flag metadata -->
<!-- md:default none -->

Use this property to associate a post with [authors] by providing a list of
identifiers as defined in the [`authors_file`][config.authors_file]. If an
author can't be resolved, the plugin will terminate with an error:

``` yaml
---
authors:
  - squidfunk # (1)!
---

# Post title
...
```

1.  Authors are linked by using their identifiers. As an example, see
    [the `.authors.yml` file][.authors.yml] we're using for our blog.

  [authors]: #authors

---

#### <!-- md:setting meta.categories -->

<!-- md:version 9.2.0 -->
<!-- md:flag metadata -->
<!-- md:default none -->

Use this property to associate a post with one or more [categories][category],
making the post a part of the generated category page. Categories are defined
as a list of strings (whitespaces are allowed):

``` yaml
---
categories:
  - Search
  - Performance
---

# Post title
...
```

If you want to prevent accidental typos assigning categories to posts, you
can set a predefined list of allowed categories in `mkdocs.yml` by using
the [`categories_allowed`][config.categories_allowed] setting.

---

#### <!-- md:setting meta.date -->

<!-- md:version 9.2.0 -->
<!-- md:flag metadata -->
<!-- md:flag required -->

Use this property to specify a post's date. Note that this property is required,
which means the build fails when it's not set. Additional dates can be set by
using a slightly different syntax:

=== "Date"

    ``` yaml
    ---
    date: 2024-01-31
    ---

    # Post title
    ...
    ```

=== "Update date"

    ``` yaml
    ---
    date:
      created: 2024-01-31 # (1)!
      updated: 2024-02-01
    ---

    # Post title
    ...
    ```

    1.  Each post must have a creation date set.

=== "Custom date"

    ``` yaml
    ---
    date:
      created: 2024-01-31
      my_custom_date: 2024-02-01 # (1)!
    ---

    # Post title
    ...
    ```

    1.  The blog plugin validates all dates and allows to format them with
        [babel]'s [pattern syntax] in templates. When using theme extension,
        authors can add custom dates to templates.

        This was first requested in #5733.

The following date formats are supported:

- `2024-01-31`
- `2024-01-31T12:00:00`

---

#### <!-- md:setting meta.draft -->

<!-- md:version 9.2.0 -->
<!-- md:flag metadata -->
<!-- md:default none -->

Use this property to mark a post as draft. The plugin allows to include or
exclude posts marked as drafts when [building your project] using the
[`draft`][config.draft] setting. Mark a post as draft with:

``` yaml
---
draft: true
---

# Post title
...
```

---

#### <!-- md:setting meta.pin -->

<!-- md:sponsors -->
<!-- md:version insiders-4.53.0 -->
<!-- md:flag metadata -->
<!-- md:default `false` -->
<!-- md:flag experimental -->

Use this property to pin a post to the top of a view. In case multiple posts are
pinned, the pinned posts are sorted by descending order and appear before all
other posts. Pin a post with:

``` yaml
---
pin: true
---

# Post title
...
```

---

#### <!-- md:setting meta.links -->

<!-- md:sponsors -->
<!-- md:version insiders-4.23.0 -->
<!-- md:flag metadata -->
<!-- md:default none -->
<!-- md:flag experimental -->

Use this property to define a list of links that are rendered in the sidebar of
a post. The property follows the same syntax as [`nav`][mkdocs.nav] in
`mkdocs.yml`, supporting sections and even anchors:

=== "Links"

    ``` yaml
    ---
    links:
      - setup/setting-up-site-search.md
      - insiders/index.md
    ---

    # Post title
    ...
    ```

=== "Links with sections"

    ``` yaml
    ---
    links:
      - setup/setting-up-site-search.md
      - Insiders:
        - insiders/index.md
        - insiders/getting-started.md
    ---

    # Post title
    ...
    ```

=== "Links with anchors"

    ``` yaml
    ---
    links:
      - plugins/search.md # (1)!
      - Insiders:
        - insiders/index.md#how-to-become-a-sponsor
        - insiders/getting-started.md#requirements
    ---

    # Post title
    ...
    ```

    1.  If a link defines an anchor, the plugin resolves the anchor from the
        linked page and sets the anchor title as a [subtitle].

All relative links are resolved from the [`docs` directory][mkdocs.docs_dir].

  [subtitle]: ../reference/index.md#setting-the-page-subtitle

---

#### <!-- md:setting meta.readtime -->

<!-- md:version 9.2.0 -->
<!-- md:flag metadata -->
<!-- md:default computed -->

Use this property to explicitly set the reading time of a post in minutes. When
[`post_readtime`][config.post_readtime] is enabled, the plugin computes the
reading time of a post, which can be overridden with:

``` yaml
---
readtime: 15
---

# Post title
...
```

---

#### <!-- md:setting meta.slug -->

<!-- md:version 9.2.0 -->
<!-- md:flag metadata -->
<!-- md:default computed -->

Use this property to explicitly set the slug of a post. By default, the slug of
a post is automatically computed by the [`post_slugify`][config.post_slugify]
function from the post's title, which can be overridden with:

``` yaml
---
slug: help-im-trapped-in-a-universe-factory
---

# Post title
...
```

Slugs are passed to [`post_url_format`][config.post_url_format].

---

!!! question "Missing something?"

    When setting up your blog or migrating from another blog framework, you
    might discover that you're missing specific functionality – we're happy to
    consider adding it to the plugin! You can [open a discussion] to
    ask a question, or create a [change request] on our [issue tracker], so we
    can find out if it might be a good fit for the plugin.

  [open a discussion]: https://github.com/squidfunk/mkdocs-material/discussions
  [change request]: ../contributing/requesting-a-change.md
  [issue tracker]: https://github.com/squidfunk/mkdocs-material/issues
