---
title: Built-in blog plugin
icon: material/newspaper-variant-outline
---

# Built-in blog plugin

The blog plugin makes it very easy to build a blog, either as a sidecar to
your documentation or standalone. Focus on your content while the engine does
all the heavy lifting, automatically generating [archive] and [category] pages,
configurable [post URLs][post_url_format], [pagination] and more.

  [archive]: #archive
  [category]: #categories
  [pagination]: #pagination

## Objective

### How it works

[MkDocs] is a platform primarily targetted towards creating documentation, ...

### When to use it

## Configuration

<!-- md:version 9.2.0 --> ·
<!-- md:default `true` -->

As with all [built-in plugins], enabling the blog plugin to do its work is
straight-forward. Just add the following lines to `mkdocs.yml`, and start
writing your first blog post immediately:

``` yaml
plugins:
  - blog
```

  [built-in plugins]: index.md

### General

The following settings are available:

---

#### `enabled`

<!-- md:version 9.2.0 --> ·
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

#### `blog_dir`

<!-- md:version 9.2.0 --> ·
<!-- md:default `blog` -->

Use this setting to change the folder where you store your posts. The name of
the folder is included in the generated URLs as a prefix for all posts and index
pages. Change it with:

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

#### `blog_toc`

<!-- md:version 9.2.0 --> ·
<!-- md:default `false` -->

Use this setting to instruct the table of contents to display post titles on
index pages. Enabling this setting also enables [`archive_toc`][archive_toc]
and [`categories_toc`][categories_toc], unless they are explicitly defined:

``` yaml
plugins:
  - blog:
      blog_toc: true
```

  [archive_toc]: #archive_toc
  [categories_toc]: #categories_toc

### Posts

The following settings are available for posts:

---

#### `post_date_format`

<!-- md:version 9.2.0 --> ·
<!-- md:default `long` -->

Use this setting to change the date format of posts. The plugin uses [babel] to
render dates locale-aware using the configured [site language]. The following
formats are supported:

=== "Monday, January 31, 2023"

    ``` yaml
    plugins:
      - blog:
          post_date_format: full
    ```

=== "January 31, 2023"

    ``` yaml
    plugins:
      - blog:
          post_date_format: long
    ```

=== "Jan 31, 2023"

    ``` yaml
    plugins:
      - blog:
          post_date_format: medium
    ```

=== "1/31/22"

    ``` yaml
    plugins:
      - blog:
          post_date_format: short
    ```

Note that depending on the [site language], those formats might look different
for other languages. Additionally, [babel] supports a [pattern syntax]
which allows for custom formats.

  [babel]: https://pypi.org/project/Babel/
  [site language]: ../setup/changing-the-language.md#site-language
  [pattern syntax]: https://babel.pocoo.org/en/latest/dates.html#pattern-syntax

---

#### `post_url_date_format`

<!-- md:version 9.2.0 --> ·
<!-- md:default `yyyy/MM/dd` -->

Use this setting to change the date format used in post URLs. The format string
must adhere to [babel]'s [pattern syntax] and should not contain whitespace.
Some popular choices:

=== ":material-link: blog/2023/01/31/:material-dots-horizontal:/"

    ``` yaml
    plugins:
      - blog:
          post_url_date_format: yyyy/MM/dd
    ```

=== ":material-link: blog/2023/01/:material-dots-horizontal:/"

    ``` yaml
    plugins:
      - blog:
          post_url_date_format: yyyy/MM
    ```

=== ":material-link: blog/2023/:material-dots-horizontal:/"

    ``` yaml
    plugins:
      - blog:
          post_url_date_format: yyyy
    ```

If you want to remove the date from post URLs, e.g. when your blog features
mostly evergreen content, you can remove the `date` placeholder from the
[`post_url_format`][post_url_format] format string.

  [post_url_format]: #post_url_format

---

#### `post_url_format`

<!-- md:version 9.2.0 --> ·
<!-- md:default `{date}/{slug}` -->

Use this setting to change the format string that is used when generating post
URLs. You can freely combine placeholders, and join them with slashes or other
characters:

=== ":material-link: blog/2023/:material-dots-horizontal:/"

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

- `categories` – Post categories, slugified with [`categories_slugify`][categories_slugify]
- `date` – Post date, formatted with [`post_url_date_format`][post_url_date_format]
- `slug` – Post title, slugified with [`post_slugify`][post_slugify]
- `file` – Post filename without `*.md` extension

If you remove the `date` placeholder, make sure that post URLs don't collide
with URLs of other pages hosted under the [`blog` directory][blog_dir], as this
leads to undefined behavior.

  [categories_slugify]: #categories_slugify
  [post_url_date_format]: #post_url_date_format
  [post_slugify]: #post_slugify
  [blog_dir]: #blog_dir

---

#### `post_url_max_categories`

<!-- md:version 9.2.0 --> ·
<!-- md:default `1` -->

Use this setting to control the number of categories that are included in the
post URL if the `categories` placeholder is part of
[`post_url_format`][post_url_format] and the post defines categories:

``` yaml
plugins:
  - blog:
      post_url_format: "{categories}/{slug}"
      post_url_max_categories: 2
```

If more than one category is given, they are joined with `/` after slugifying.

---

#### `post_slugify`

<!-- md:version 9.2.0 --> ·
<!-- md:default [`toc.slugify`][toc.slugify] -->

Use this setting to change the function to use for generating URL-compatible
slugs from post titles. [Python Markdown Extensions] comes with a Unicode-aware
[`slugify`][pymdownx.slugs.slugify] function:

=== "Unicode"

    ``` yaml
    plugins:
      - blog:
          post_slugify: !!python/object/apply:pymdownx.slugs.slugify
            kwds:
              case: lower
    ```

=== "Unicode, case-sensitive"

    ``` yaml
    plugins:
      - blog:
          post_slugify: !!python/object/apply:pymdownx.slugs.slugify
    ```
When your project features non-European languages, it's advisable to use this
configuration.

  [toc.slugify]: https://github.com/Python-Markdown/markdown/blob/1337d0891757e192165668d2606db36cf08e65a9/markdown/extensions/toc.py#L26-L33
  [pymdownx.slugs.slugify]: https://github.com/facelessuser/pymdown-extensions/blob/01c91ce79c91304c22b4e3d7a9261accc931d707/pymdownx/slugs.py#L59-L65
  [Python Markdown Extensions]: https://facelessuser.github.io/pymdown-extensions/extras/slugs/

---

#### `post_slugify_separator`

<!-- md:version 9.2.0 --> ·
<!-- md:default `-` -->

Use this setting to change the separator that is passed to the slugification
function set as part of [`post_slugify`][post_slugify]. While the default is a
hyphen, it can be set to any string:

``` yaml
plugins:
  - blog:
      post_slugify_separator: _
```

---

#### `post_excerpt`

<!-- md:version 9.2.0 --> ·
<!-- md:default `optional` -->

By default, the plugin makes post excerpts optional. When a post doesn't define
an excerpt, index pages render the entire post. This setting can be used to
make post excerpts required:

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

When post excerpts are required, posts without excerpts raise an error.

---

#### `post_excerpt_max_authors`

<!-- md:version 9.2.0 --> ·
<!-- md:default `1` -->

Use this setting to specify the number of authors rendered in post excerpts. While
each post may be written by multiple authors, this setting allows to limit the
display to just a few or even a single author, or disable authors in post
excerpts entirely:

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

This only applies to post excerpts on index pages. Posts always render all
authors.

---

#### `post_excerpt_max_categories`

<!-- md:version 9.2.0 --> ·
<!-- md:default `5` -->

Use this setting to set the number of categories rendered in post excerpts. While
each post may be assigned to multiple categories, this setting allows to limit the
display to just a few or even a single category, or disable categories in post
excerpts entirely:

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

This only applies to post excerpts on index pages. Posts always render all
categories.

---

#### `post_excerpt_separator`

<!-- md:version 9.2.0 --> ·
<!-- md:default `<!-- more -​->` -->

Use this setting to set the separator the plugin will look for in a post's
content when generating post excerpts. All content after the separator is not
considered to be part of the excerpt:

``` yaml
plugins:
  - blog:
      post_excerpt_separator: <!-- more -->
```

It is common practice to use an HTML comment as a separator.

---

#### `post_readtime`

<!-- md:version 9.2.0 --> ·
<!-- md:default `true` -->

Use this setting to control whether the plugin should automatically compute the
reading time of a post using [readtime], which is then rendered in post excerpts,
as well as in posts themselves:

``` yaml
plugins:
  - blog:
      post_readtime: false
```

  [readtime]: https://pypi.org/project/readtime/

---

#### `post_readtime_words_per_minute`

<!-- md:version 9.2.0 --> ·
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

#### `archive`

<!-- md:version 9.2.0 --> ·
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

#### `archive_name`

<!-- md:version 9.2.0 --> ·
<!-- md:default automatically set -->

Use this setting to change the title of the archive section the plugin adds to
the navigation. If this setting is omitted, it's sourced from the translations.
If you want to change it, use:

``` yaml
plugins:
  - blog:
      archive_name: Archive
```

---

#### `archive_date_format`

<!-- md:version 9.2.0 --> ·
<!-- md:default `yyyy` -->

Use this setting to change the date format used for archive page titles. The
format string must adhere to [babel]'s [pattern syntax]. Some popular choices:

=== "2023"

    ``` yaml
    plugins:
      - blog:
          archive_date_format: yyyy
    ```

=== "January 2023"

    ``` yaml
    plugins:
      - blog:
          archive_date_format: MMMM yyyy
    ```

---

#### `archive_url_date_format`

<!-- md:version 9.2.0 --> ·
<!-- md:default `yyyy` -->

Use this setting to change the date format used for archive page URLs. The
format string must adhere to [babel]'s [pattern syntax] and should not contain
whitespace. Some popular choices:

=== ":material-link: blog/archive/2023/"

    ``` yaml
    plugins:
      - blog:
          archive_url_date_format: yyyy
    ```

=== ":material-link: blog/archive/2023/01/"

    ``` yaml
    plugins:
      - blog:
          archive_url_date_format: yyyy/MM
    ```

---

#### `archive_url_format`

<!-- md:version 9.2.0 --> ·
<!-- md:default `archive/{date}` -->

Use this setting to change the format string that is used when generating
archive page URLs. You can freely combine placeholders, and join them with
slashes or other characters:

=== ":material-link: blog/archive/2023/"

    ``` yaml
    plugins:
      - blog:
          archive_url_format: "archive/{date}"
    ```

=== ":material-link: blog/2023/"

    ``` yaml
    plugins:
      - blog:
          archive_url_format: "{date}"
    ```

The following placeholders are available:

- `date` – Archive page date, formatted with [`archive_url_date_format`][archive_url_date_format]

  [archive_url_date_format]: #archive_url_date_format

---

#### `archive_toc`

<!-- md:version 9.2.0 --> ·
<!-- md:default `false` -->

Use this setting to instruct the table of contents to display post titles on all
archive pages. This setting is automatically enabled when [`blog_toc`][blog_toc]
is enabled, unless explicitly defined:

``` yaml
plugins:
  - blog:
      archive_toc: true
```

  [blog_toc]: #blog_toc

### Categories

The following settings are available for category pages:

---

#### `categories`

<!-- md:version 9.2.0 --> ·
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

#### `categories_name`

<!-- md:version 9.2.0 --> ·
<!-- md:default automatically set -->

Use this setting to change the title of the category section the plugin adds to
the navigation. If this setting is omitted, it's sourced from the translations.
If you want to change it, use:

``` yaml
plugins:
  - blog:
      categories_name: Categories
```

---

#### `categories_url_format`

<!-- md:version 9.2.0 --> ·
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

- `slug` – Category, slugified with [`categories_slugify`][categories_slugify]

---

#### `categories_slugify`

<!-- md:version 9.2.0 --> ·
<!-- md:default [`toc.slugify`][toc.slugify] -->

Use this setting to change the function to use for generating URL-compatible
slugs from categories. [Python Markdown Extensions] comes with a Unicode-aware
[`slugify`][pymdownx.slugs.slugify] function:

=== "Unicode"

    ``` yaml
    plugins:
      - blog:
          categories_slugify: !!python/object/apply:pymdownx.slugs.slugify
            kwds:
              case: lower
    ```

=== "Unicode, case-sensitive"

    ``` yaml
    plugins:
      - blog:
          categories_slugify: !!python/object/apply:pymdownx.slugs.slugify
    ```
When your project features non-European languages, it's advisable to use this
configuration.

---

#### `categories_slugify_separator`

<!-- md:version 9.2.0 --> ·
<!-- md:default `-` -->

Use this setting to change the separator that is passed to the slugification
function set as part of [`categories_slugify`][categories_slugify]. While the
default is a hyphen, it can be set to any string:

``` yaml
plugins:
  - blog:
      categories_slugify_separator: _
```

---

#### `categories_allowed`

<!-- md:version 9.2.0 --> ·
<!-- md:default none -->

The plugin allows to check categories against an allow list, in order to catch
typos or make sure that categories are not arbitrarily added. Define the allow
list with:

``` yaml
plugins:
  - blog:
      categories_allowed:
        - General
        - Search
        - Performance
```

---

#### `categories_toc`

<!-- md:version 9.2.0 --> ·
<!-- md:default `false` -->

Use this setting to instruct the table of contents to display post titles on all
category pages. This setting is automatically enabled when [`blog_toc`][blog_toc]
is enabled, unless explicitly defined:

``` yaml
plugins:
  - blog:
      categories_toc: true
```

  [blog_toc]: #blog_toc

### Pagination

The following settings are available for pagination:

---

#### `pagination`

<!-- md:version 9.2.0 --> ·
<!-- md:default `true` -->

Use this setting to enable or disable pagination on index pages – generated
pages that show posts or subsets of posts in reverse chronological order. If
you want to disable pagination, use:

``` yaml
plugins:
  - blog:
      pagination: false
```

---

#### `pagination_per_page`

<!-- md:version 9.2.0 --> ·
<!-- md:default `10` -->

Use this setting to change the number of posts rendered per index page. If you
have large post excerpts, it can be a good idea to reduce the number of posts
per page:

``` yaml
plugins:
  - blog:
      pagination_per_page: 5
```

---

#### `pagination_url_format`

<!-- md:version 9.2.0 --> ·
<!-- md:default `{date}/{slug}` -->

Use this setting to change the format string that is used when generating
paginated index page URLs. You can freely combine placeholders, and join them
with slashes or other characters:

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

#### `pagination_template`

<!-- md:version 9.2.0 --> ·
<!-- md:default `~2~` -->

The plugin uses [paginate] to generate the pagination markup using a special
syntax. Use this setting to customize how pagination is constructed. Some
popular choices:

=== "1 2 3 .. n"

    ``` yaml
    plugins:
      - blog:
          pagination_template: "~2~"
    ```

=== "1 2 3 .. n :material-chevron-right: :material-chevron-double-right:"

    ``` yaml
    plugins:
      - blog:
          pagination_template: "$link_first $link_previous ~2~ $link_next $link_last"
    ```

=== "1 :material-chevron-right:"

    ``` yaml
    plugins:
      - blog:
          pagination_template: "$link_previous $page $link_next"
    ```

The following placeholders are supported by [paginate]:

- `$first_page` – number of first reachable page
- `$last_page` – number of last reachable page
- `$page` – number of currently selected page
- `$page_count` – number of reachable pages
- `$items_per_page` – maximal number of items per page
- `$first_item` – index of first item on the current page
- `$last_item` – index of last item on the current page
- `$item_count` – total number of items
- `$link_first` – link to first page (unless on first page)
- `$link_last` – link to last page (unless on last page)
- `$link_previous` – link to previous page (unless on first page)
- `$link_next` – link to next page (unless on last page)

  [paginate]: https://pypi.org/project/paginate/

---

#### `pagination_keep_content`

<!-- md:version 9.2.0 --> ·
<!-- md:default `false` -->

Use this setting to enable or disable inheritance of content, i.e., if paginated
index pages should also display the content of their parent index page. If you
want to enable this behavior, use:

``` yaml
plugins:
  - blog:
      pagination_keep_content: true
```

### Authors

The following settings are available for authors:

---

#### `authors`

<!-- md:version 9.2.0 --> ·
<!-- md:default `true` -->

Use this setting to enable or disable post authors. If this setting is enabled,
the plugin will look for a file named [`.authors.yml`][authors_file] and render
authors in index pages and posts. To disable this, use:

``` yaml
plugins:
  - blog:
      authors: false
```

  [authors_file]: #authors_file

---

#### `authors_file`

<!-- md:version 9.2.0 --> ·
<!-- md:default `.authors.yml` -->

Use this setting to change the path of the file where the author information for
your posts resides. It's normally not necessary to change this setting, but if
you need to, use:

``` yaml
plugins:
  - blog:
      authors_file: .authors.yml # (1)!
```

1.  Note that it's strongly recommended to prefix author files with a `.` to
    instruct MkDocs to [not treat them as documentation content][mkdocs.dotfiles].
    Otherwise, they'd be copied to the [`site` directory][mkdocs.site_dir] when
    you're [building your project].

The provided path is resolved from the [`blog` directory][blog_dir].

!!! info "Format of `.authors.yml` file"

    The `.authors.yml` file must follow the following format:

    ``` yaml title=".authors.yml"
    <author>:
      name: string                         # Author name
      description: string                  # Author description
      avatar: url                          # Author avatar
    ```

    Note that `<author>` must be set to an identifier for associating authors
    with posts, e.g., a GitHub username like `squidfunk`. This identifier can
    then be used in the metadata of posts.

    As an example, see [the `.authors.yml` file][.authors.yml] we're using for
    our blog.

  [.authors.yml]: https://github.com/squidfunk/mkdocs-material/blob/master/docs/blog/.authors.yml

### Drafts

The following settings are available for drafts:

---

#### `draft`

<!-- md:version 9.2.0 --> ·
<!-- md:default `false` -->

Including draft posts might be desired in deploy previews. Use this setting to
specify whether the plugin should include posts marked as drafts when
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

#### `draft_on_serve`

<!-- md:version 9.2.0 --> ·
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

#### `draft_if_future_date`

<!-- md:version 9.2.0 --> ·
<!-- md:default `false` -->

The plugin can automatically mark posts with future dates as drafts. When the
date passed today, the post is automatically unmarked and included when
[building your project]:

``` yaml
plugins:
  - blog:
      draft_if_future_date: true
```

## Usage

### Metadata

#### `date`

<!-- md:version 9.2.0 --> ·
<!-- md:flag metadata -->

#### `draft`

<!-- md:version 9.2.0 --> ·
<!-- md:flag metadata -->

#### `authors`

<!-- md:version 9.2.0 --> ·
<!-- md:flag metadata -->

#### `categories`

<!-- md:version 9.2.0 --> ·
<!-- md:flag metadata -->

#### `links`

<!-- md:sponsors --> ·
<!-- md:version insiders-4.23.0 --> ·
<!-- md:flag metadata --> ·
<!-- md:flag experimental -->

#### `readtime`

<!-- md:version 9.2.0 --> ·
<!-- md:flag metadata -->

#### `tags`

<!-- md:version 9.2.0 --> ·
<!-- md:flag metadata -->
