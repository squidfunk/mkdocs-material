---
status: new
---

# Setting up a blog

Material for MkDocs makes it very easy to build a blog, either as a sidecar to
your documentation or standalone. Focus on your content while the engine does
all the heavy lifting, automatically generating [archive] and [category]
indexes, [post slugs], configurable [pagination] and more.

---

__Check out our [blog], which is created with the new [built-in blog plugin]!__

  [archive]: #archive
  [category]: #categories
  [post slugs]: #+blog.post_url_format
  [pagination]: #pagination
  [blog]: ../blog/index.md

## Configuration

### Built-in blog plugin

[:octicons-heart-fill-24:{ .mdx-heart } Sponsors only][Insiders]{ .mdx-insiders } ·
[:octicons-tag-24: insiders-4.23.0][Insiders] ·
:octicons-cpu-24: Plugin ·
:octicons-beaker-24: Experimental

The built-in blog plugin adds support for building a blog from a folder of
posts, which are annotated with dates and other structured data. First, add the
following lines to `mkdocs.yml`:

``` yaml
plugins:
  - blog
```

> If you need to be able to build your documentation with and without
> [Insiders], please refer to the [built-in plugins] section to learn how
> shared configurations help to achieve this.

By default, the built-in blog plugin assumes that your blog is hosted inside
the `blog` subfolder of your documentation ([this is configurable]). Next,
you need to create the following structure:

``` sh
.
├─ docs/
│  └─ blog/
│     ├─ posts/
│     └─ index.md
└─ mkdocs.yml
```

Since the built-in blog plugin auto-generates [archive] and [category] indexes,
it must know where to add those to the navigation. Thus, make sure to add a
`blog/index.md` file in `mkdocs.yml`:

``` yaml
nav:
  - Blog:
    - blog/index.md # (1)!
```

1.  Within this file, you can specify the title of your blog, which is then
    picked up and used by the built-in blog plugin:

    ``` markdown
    # Blog
    ```

The following configuration options are available:

[`enabled`](#+blog.enabled){ #+blog.enabled }

:   :octicons-milestone-24: Default: `true` – This option specifies whether
    the plugin is enabled when building your project. If you want to speed up
    local builds, you can use an [environment variable]:

    ``` yaml
    plugins:
      - blog:
          enabled: !ENV [CI, false]
    ```

[`blog_dir`](#+blog.blog_dir){ #+blog.blog_dir }

:   :octicons-milestone-24: Default: `blog` – This option specifies the folder
    where your posts and metadata live. The name of the folder will also be
    included in the generated URLs as a prefix to all blog-related pages. If
    you want to build a standalone blog, change it to `.`:

    === "Subdirectory"

        ``` yaml
        plugins:
          - blog:
              blog_dir: path/to/folder
        ```

    === "Standalone"

        ``` yaml
        plugins:
          - blog:
              blog_dir: .
        ```

    The path must be defined relative to [`docs_dir`][docs_dir].

__The built-in blog plugin has dozens of options that allow for advanced
configuration. It's a good idea to [start writing your first post], and come
back here later for fine-tuning the output.__

---

  [Insiders]: ../insiders/index.md
  [built-in plugins]: ../insiders/getting-started.md#built-in-plugins
  [this is configurable]: #+blog.blog_dir
  [environment variable]: https://www.mkdocs.org/user-guide/configuration/#environment-variables
  [docs_dir]: https://www.mkdocs.org/user-guide/configuration/#docs_dir
  [start writing your first post]: #writing-your-first-post

#### Posts

The following configuration options are available for posts:

[`post_date_format`](#+blog.post_date_format){ #+blog.post_date_format }

:   :octicons-milestone-24: Default: `long` – This option specifies the date
    format that is used when posts are rendered. Under the hood, the
    [built-in blog plugin] leverages [Babel] to render dates locale-aware using
    the configured [site language]. The following formats are supported:

    === "Monday, January 31, 2022"

        ``` yaml
        plugins:
          - blog:
              post_date_format: full
        ```

    === "January 31, 2022"
    
        ``` yaml
        plugins:
          - blog:
              post_date_format: long
        ```

    === "Jan 31, 2022"

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

    Note that depending on the [site language], formats might look different
    for other languages. Additionally, [Babel] supports a [pattern syntax]
    which allows for custom formats.

[`post_url_date_format`](#+blog.post_url_date_format){ #+blog.post_url_date_format }

:   :octicons-milestone-24: Default: `yyyy/MM/dd` – This option specifies the
    date format that is used in the URL of the post. The format string must
    adhere to [Babel]'s [pattern syntax]. Some examples:

    === ":material-link: blog/2022/01/31/:material-dots-horizontal:/"

        ``` yaml
        plugins:
          - blog:
              post_url_date_format: yyyy/MM/dd
        ```

    === ":material-link: blog/2022/01/:material-dots-horizontal:/"

        ``` yaml
        plugins:
          - blog:
              post_url_date_format: yyyy/MM
        ```

    === ":material-link: blog/2022/:material-dots-horizontal:/"

        ``` yaml
        plugins:
          - blog:
              post_url_date_format: yyyy
        ```

    If you want to exclude the date altogether, e.g. when your blog features
    mostly evergreen content, you can remove the `date` placeholder from
    the format string (see below).

[`post_url_format`](#+blog.post_url_format){ #+blog.post_url_format }

:   :octicons-milestone-24: Default: `{date}/{slug}` – This option specifies the
    format string that is used for the URL of the post. The following
    placeholders are currently supported:

    - `date` – Replaced with the post's date, as configured in
      [`post_url_date_format`][post_url_date_format].

    - `slug` – Replaced with a slug generated from the post's title.

    - `file` – Replaced with the post's file name.

    === ":material-link: blog/2022/:material-dots-horizontal:/"

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

    If you remove the `date` placeholder, make sure that post URLs don't
    collide with other the URLs of other pages added to the blog section, as
    this leads to undefined behavior.

[`post_slugify`](#+blog.post_slugify){ #+blog.post_slugify }

:   :octicons-milestone-24: Default: `headerid.slugify` – This option specifies
    which function to use for generating URL-compatible slugs from post titles. 
    [Python Markdown Extensions] comes with several Unicode-aware
    slug functions which should be a good choice for non-ASCII languages:

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

[`post_slugify_separator`](#+blog.post_slugify_separator){ #+blog.post_slugify_separator }

:   :octicons-milestone-24: Default: `-` – This option specifies the separator
    which is used by the slug function. By default, a hyphen is used, but it can
    be changed to any string, including the empty string:

    ``` yaml
    plugins:
      - blog:
          post_slugify_separator: "-"
    ```

[`post_excerpt`](#+blog.post_excerpt){ #+blog.post_excerpt }

:   :octicons-milestone-24: Default: `optional` – This option specifies whether
    [post excerpts] should be considered being optional or required by the
    [built-in blog plugin] when generating indexes. If excerpts are required,
    the plugin terminates with an error if a post doesn't define an excerpt:

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

[`post_excerpt_max_authors`](#+blog.post_excerpt_max_authors){ #+blog.post_excerpt_max_authors }

:   :octicons-milestone-24: Default: `1` – This option specifies the number of
    authors rendered in post excerpts. While each post may be written by
    multiple authors, this setting allows to limit the display to just a few or
    even a single author, or disable authors in excerpts altogether:

    === "Render up to 2 authors in excerpts"

        ``` yaml
        plugins:
          - blog:
              post_excerpt_max_authors: 2
        ```

    === "Disable authors in excerpts"

        ``` yaml
        plugins:
          - blog:
              post_excerpt_max_authors: 0
        ```

[`post_excerpt_max_categories`](#+blog.post_excerpt_max_categories){ #+blog.post_excerpt_max_categories }

:   :octicons-milestone-24: Default: `5` – This option specifies the number of
    categories rendered in post excerpts. While each post may be assigned to
    multiple categories, the [built-in blog plugin] can be instructed to only
    show the first `n` categories to keep it short and concise:

    === "Render up to 2 categories in excerpts"

        ``` yaml
        plugins:
          - blog:
              post_excerpt_max_categories: 2
        ```

    === "Disable categories in excerpts"

        ``` yaml
        plugins:
          - blog:
              post_excerpt_max_categories: 0
        ```

[`post_excerpt_separator`](#+blog.post_excerpt_separator){ #+blog.post_excerpt_separator }

:   :octicons-milestone-24: Default: `<!-- more -->` – This option specifies
    the separator the [built-in blog plugin] will look for in a post's content
    when generating [post excerpts]. All content after the separator is not
    considered to be part of the excerpt.

[`post_readtime`](#+blog.post_readtime){ #+blog.post_readtime }

:   :octicons-milestone-24: Default: `true` – This option specifies whether the
    [built-in blog plugin] should compute the reading time of a post
    automatically, which is then rendered in post excerpts, as well as in the
    posts themselves. If you want to disable reading time computation, add:

    ``` yaml
    plugins:
      - blog:
          post_readtime: false
    ```

[`post_readtime_words_per_minute`](#+blog.post_readtime_words_per_minute){ #+blog.post_readtime_words_per_minute }

:   :octicons-milestone-24: Default: `265` – This option specifies the number
    of words that a reader is expected to read per minute when computing the
    reading time of a post. If you feel that estimation is not quite right,
    you can fine-tune reading time computation with the following setting:

    ``` yaml
    plugins:
      - blog:
          post_readtime_words_per_minute: 265
    ```

  [built-in blog plugin]: #built-in-blog-plugin
  [site language]: changing-the-language.md#site-language
  [Babel]: https://pypi.org/project/Babel/
  [pattern syntax]: https://babel.pocoo.org/en/latest/dates.html#pattern-syntax
  [post_url_date_format]: #+blog.post_url_date_format
  [post excerpts]: #adding-an-excerpt
  [Python Markdown Extensions]: https://facelessuser.github.io/pymdown-extensions/extras/slugs/

#### Archive

The following configuration options are available for archive index generation:

[`archive`](#+blog.archive){ #+blog.archive }

:   :octicons-milestone-24: Default: `true` – This option specifies whether the
    [built-in blog plugin] should generate archive indexes. An archive indexes
    shows all posts for a specific interval (e.g. year, month, etc.) in
    reverse chronological order. If you want to disable archive index
    generation, add:

    ``` yaml
    plugins:
      - blog:
          archive: false
    ```

[`archive_name`](#+blog.archive_name){ #+blog.archive_name }

:   :octicons-milestone-24: Default: _automatically set_ – This option specifies
    the title of the archive section which the [built-in blog plugin] will
    generate and add to the navigation. If this setting is omitted, it's
    sourced from the translations, falling back to English. Change it with:

    ``` yaml
    plugins:
      - blog:
          archive_name: Archive
    ```

[`archive_date_format`](#+blog.archive_date_format){ #+blog.archive_date_format }

:   :octicons-milestone-24: Default: `yyyy` – This option specifies the date
    format that is used when archive indexes are rendered. The format string
    must adhere to [Babel]'s [pattern syntax]. Popular settings are:

    === "2022"

        ``` yaml
        plugins:
          - blog:
              archive_date_format: yyyy
        ```

    === "January 2022"
    
        ``` yaml
        plugins:
          - blog:
              archive_date_format: MMMM yyyy
        ```

[`archive_url_date_format`](#+blog.archive_url_date_format){ #+blog.archive_url_date_format }

:   :octicons-milestone-24: Default: `yyyy` – This option specifies the date
    format that is used in the archive index URL. The format string must adhere
    to [Babel]'s [pattern syntax]. Some examples:

    === ":material-link: blog/archive/2022/"

        ``` yaml
        plugins:
          - blog:
              archive_url_date_format: yyyy
        ```

    === ":material-link: blog/archive/2022/01/"

        ``` yaml
        plugins:
          - blog:
              archive_url_date_format: yyyy/MM
        ```

[`archive_url_format`](#+blog.archive_url_format){ #+blog.archive_url_format }

:   :octicons-milestone-24: Default: `archive/{date}` – This option specifies
    the format string that is used for the URL of the archive index, and can
    be used to localize the URL:

    === ":material-link: blog/archive/2022/"

        ``` yaml
        plugins:
          - blog:
              archive_url_format: "archive/{date}"
        ```

    === ":material-link: blog/2022/"

        ``` yaml
        plugins:
          - blog:
              archive_url_format: "{date}"
        ```

#### Categories

The following configuration options are available for category index generation:

[`categories`](#+blog.categories){ #+blog.categories }

:   :octicons-milestone-24: Default: `true` – This option specifies whether the
    [built-in blog plugin] should generate category indexes. A category indexes
    shows all posts for a specific category in reverse chronological order. If
    you want to disable category index generation, add:

    ``` yaml
    plugins:
      - blog:
          categories: false
    ```

[`categories_name`](#+blog.categories_name){ #+blog.categories_name }

:   :octicons-milestone-24: Default: _automatically set_ – This option specifies
    the title of the category section which the [built-in blog plugin] will
    generate and add to the navigation. If this setting is omitted, it's
    sourced from the translations, falling back to English. Change it with:

    ``` yaml
    plugins:
      - blog:
          categories_name: Categories
    ```

[`categories_url_format`](#+blog.categories_url_format){ #+blog.categories_url_format }

:   :octicons-milestone-24: Default: `category/{slug}` – This option specifies
    the format string that is used for the URL of the category index, and can
    be used to localize the URL:

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

[`categories_slugify`](#+blog.categories_slugify){ #+blog.categories_slugify }

:   :octicons-milestone-24: Default: `headerid.slugify` – This option specifies
    which function to use for generating URL-compatible slugs from categories. 
    [Python Markdown Extensions] comes with several Unicode-aware
    slug functions which should be a good choice for non-ASCII languages:

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

[`categories_slugify_separator`](#+blog.categories_slugify_separator){ #+blog.categories_slugify_separator }

:   :octicons-milestone-24: Default: `-` – This option specifies the separator
    which is used by the slug function. By default, a hyphen is used, but it can
    be changed to any string, including the empty string:

    ``` yaml
    plugins:
      - blog:
          categories_slugify_separator: "-"
    ```

[`categories_allowed`](#+blog.categories_allowed){ #+blog.categories_allowed }

:   :octicons-milestone-24: Default: _none_ – This option specifies the
    categories that are allowed to be used in posts. If this setting is omitted,
    the [built-in blog plugin] will not check category names. Use this option to
    define a list of categories in order to catch typos:

    ``` yaml
    plugins:
      - blog:
          categories_allowed:
            - General
            - Search
            - Performance
    ```

#### Pagination

The following configuration options are available for index pagination:

[`pagination`](#+blog.pagination){ #+blog.pagination }

:   :octicons-milestone-24: Default: `true` – This option specifies whether the
    [built-in blog plugin] should paginate the index. The index shows all posts
    in reverse chronological order, which can be many. If you want to disable
    index pagination, add:

    ``` yaml
    plugins:
      - blog:
          pagination: false
    ```

[`pagination_per_page`](#+blog.pagination_per_page){ #+blog.pagination_per_page }

:   :octicons-milestone-24: Default: `10` – This option specifies the number
    of posts rendered on a single index page. If more posts are found, they are
    assigned to a 2nd page, and so on. If you have large [post excerpts], it
    might be a good idea to reduce the number of posts per page:

    ``` yaml
    plugins:
      - blog:
          pagination_per_page: 5
    ```

[`pagination_url_format`](#+blog.pagination_url_format){ #+blog.pagination_url_format }

:   :octicons-milestone-24: Default: `page/{page}` – This option specifies
    the format string that is used for the URL of the paginated index, and can
    be used to localize the URL:

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

[`pagination_template`](#+blog.pagination_template){ #+blog.pagination_template }

:   :octicons-milestone-24: Default: `~2~` – This option specifies the format
    string that is provided to the [paginate] module, which allows to customize
    how pagination is constructed. Popular choices:

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

    The [paginate] module exposes the following placeholders:

    - `$first_page` – number of first reachable page
    - `$last_page` – number of last reachable page
    - `$page` – number of currently selected page
    - `$page_count` – number of reachable pages
    - `$items_per_page` – maximal number of items per page
    - `$first_item` – index of first item on the current page
    - `$last_item` – index of last item on the current page
    - `$item_count` – total number of items
    - `$link_first` – link to first page (unless this is first page)
    - `$link_last` – link to last page (unless this is last page)
    - `$link_previous` – link to previous page (unless this is first page)
    - `$link_next` – link to next page (unless this is last page)

  [paginate]: https://pypi.org/project/paginate/

[`pagination_keep_content`](#+blog.pagination_keep_content){ #+blog.pagination_keep_content }

:   :octicons-milestone-24: Default: `false` – This option specifies whether
    paginated index pages should inherit the custom content from the index
    page, i.e. the content of `blog/index.md`:

    ``` yaml
    plugins:
      - blog:
          pagination_keep_content: true
    ```

#### Authors

The following configuration options are available for author info:

[`authors`](#+blog.authors){ #+blog.authors }

:   :octicons-milestone-24: Default: `true` – This option specifies whether the
    [built-in blog plugin] should generate author info. If it is enabled, the
    plugin will look up authors in a file called `.authors.yml` and include
    authors in indexes and in posts. If you want to disable this behavior, add:

    ``` yaml
    plugins:
      - blog:
          authors: false
    ```

[`authors_file`](#+blog.authors_file){ #+blog.authors_file }

:   :octicons-milestone-24: Default: `.authors.yml` – This option specifies the
    name of the file where the authors for your posts resides. The default
    settings assumes that the file is called `.authors.yml` (mind the `.` at
    the beginning):

    ``` yaml
    plugins:
      - blog:
          authors_file: .authors.yml
    ```

    The path must be defined relative to [`blog_dir`][this is configurable].
    Also see the section on [adding authors].

  [adding authors]: #adding-authors

#### Drafts

The following configuration options are available for drafts:

[`draft`](#+blog.draft){ #+blog.draft }

:   :octicons-milestone-24: Default: `false` – This option specifies whether the
    [built-in blog plugin] should also include posts marked as drafts when the
    site is being built. Including draft posts might be desired in deploy
    previews, which is why it exists in the first place:

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

[`draft_on_serve`](#+blog.draft_on_serve){ #+blog.draft_on_serve }

:   :octicons-milestone-24: Default: `true` – This option specifies whether
    posts marked as drafts should be included [when previewing your site] with
    `mkdocs serve`. By default, drafts are rendered when previewing, but skipped
    when the site is being built:

    ``` yaml
    plugins:
      - blog:
          draft_on_serve: true
    ```

[`draft_if_future_date`](#+blog.draft_if_future_date){ #+blog.draft_if_future_date }

:   :octicons-milestone-24: Default: `false` – This option specifies whether the
    [built-in blog plugin] should mark posts with a future date as drafts. When
    the date passed today, the post is automatically unmarked and included when
    the site is being built:

    ``` yaml
    plugins:
      - blog:
          draft_if_future_date: true
    ```

  [when previewing your site]: ../creating-your-site.md#previewing-as-you-write

### RSS

[:octicons-heart-fill-24:{ .mdx-heart } Sponsors only][Insiders]{ .mdx-insiders } ·
[:octicons-tag-24: insiders-4.23.0][Insiders] ·
[:octicons-cpu-24: Plugin][rss]

The [built-in blog plugin] integrates seamlessly with the [RSS plugin][rss],
which provides a simple way to add an RSS feed to your blog (or to your whole 
documentation). Install it with `pip`:

```
pip install mkdocs-rss-plugin
```

Then, add the following lines to `mkdocs.yml`:

``` yaml
plugins:
  - rss:
      match_path: blog/posts/.* # (1)!
      date_from_meta:
        as_creation: date
      categories:
        - categories
        - tags # (2)!
```

1.  The RSS plugin allows to filter for URLs to be included in the feed. In
    this example, only blog posts will be part of the feed.

2.  If you want to include a post's categories as well as its tags in the feed,
    add both `categories` and `tags` here.

The following configuration options are supported:

[`enabled`](#+rss.enabled){ #+rss.enabled }

:   :octicons-milestone-24: Default: `true` – This option specifies whether
    the plugin is enabled when building your project. If you want to speed up
    local builds, you can use an [environment variable]:

    ``` yaml
    plugins:
      - rss:
          enabled: !ENV [CI, false]
    ```

[`match_path`](#+rss.match_path){ #+rss.match_path }

:   :octicons-milestone-24: Default: `.*` – This option specifies which
    pages should be included in the feed. For example, to only include blog
    posts in the feed, use the following regular expression:

    ``` yaml
    plugins:
      - rss:
          match_path: blog/posts/.*
    ```

[`date_from_meta`](#+rss.date_from_meta){ #+rss.date_from_meta }

:   :octicons-milestone-24: Default: _none_ – This option specifies which
    front matter property should be used as a creation date of a page in the 
    feed. It's recommended to use the `date` property:

    ``` yaml
    plugins:
      - rss:
          date_from_meta:
            as_creation: date
    ```

[`categories`](#+rss.categories){ #+rss.categories }

:   :octicons-milestone-24: Default: _none_ – This option specifies which
    front matter properties are used as categories as part of the feed. If you
    use [categories] and [tags], add both with the following lines:

    ``` yaml
    plugins:
      - rss:
          categories:
            - categories
            - tags
    ```

[`comments_path`](#+rss.comments_path){ #+rss.comments_path }

:   :octicons-milestone-24: Default: _none_ – This option specifies the anchor
    at which comments for a post or page can be found. If you've integrated a
    [comment system], add the following lines:

    ``` yaml
    plugins:
      - rss:
          comments_path: "#__comments"
    ```

Material for MkDocs will automatically add the [necessary metadata] to your site
which will make the RSS feed discoverable by browsers and feed readers. Note
that the [RSS plugin][rss] comes with several other configuration options.
For further information, see the [documentation].

  [rss]: https://guts.github.io/mkdocs-rss-plugin/
  [categories]: #categories
  [tags]: setting-up-tags.md#built-in-tags-plugin
  [comment system]: adding-a-comment-system.md
  [necessary metadata]: https://guts.github.io/mkdocs-rss-plugin/configuration/#integration
  [theme extension]: ../customization.md
  [documentation]: https://guts.github.io/mkdocs-rss-plugin/configuration/

## Usage

### Writing your first post

After you've successfully set up the [built-in blog plugin], it's time to write
your first post. The plugin doesn't assume any specific directory structure, so
you're completely free in how you organize your posts, as long as they are all
located inside the `posts` directory:

``` sh
.
├─ docs/
│  └─ blog/
│     ├─ posts/
│     │  └─ hello-world.md # (1)!
│     └─ index.md
└─ mkdocs.yml
```

1.  If you'd like to arrange posts differently, you're free to do so. The URLs
    are built from the format specified in [`post_url_format`][post slugs] and
    the titles and dates of posts, no matter how they are organized
    inside the `posts` directory.

Create a new file called `hello-world.md` and add the following lines:

``` yaml
---
draft: true # (1)!
date: 2022-01-31
categories:
  - Hello
  - World
---

# Hello world!
...
```

1.  If you mark a post as a [draft], a red marker appears next to the post date 
    on index pages. When the site is built, drafts are not included in the 
    output. [This behavior can be changed], e.g. for rendering drafts when 
    building deploy previews.

When you spin up the [live preview server], you should be greeted by your first
post! You'll also realize, that [archive] and [category] indexes have been
automatically generated for you.

  [draft]: #drafts
  [This behavior can be changed]: #+blog.draft
  [live preview server]: ../creating-your-site.md#previewing-as-you-write

#### Adding an excerpt

The blog index, as well as [archive] and [category] indexes can either list the
entire content of each post, or excerpts of posts. An excerpt can be created by
adding a `<!-- more -->` separator after the first few paragraphs of a post:

``` py
# Hello world!

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
massa, nec semper lorem quam in massa.

<!-- more -->
...
```

When the [built-in blog plugin] generates all indexes, the content before the
[excerpt separator] is automatically extracted, allowing the user to start
reading a post before deciding to jump in.

  [excerpt separator]: #+blog.post_excerpt_separator

#### Adding authors

In order to add a little more personality to your posts, you can associate each
post with one or multiple [authors]. First, create the
[`.authors.yml`][authors_file] file in your blog directory, and add an author:

``` yaml
squidfunk:
  name: Martin Donath
  description: Creator
  avatar: https://github.com/squidfunk.png
```

The [`.authors.yml`][authors_file] file associates each author with an
identifier (in this example `squidfunk`), which can then be used in posts.
The following properties are available for each author:

[`name`](#+blog.authors_file.name){ #+blog.authors_file.name }

:   :octicons-milestone-24: Default: _none_ · :octicons-alert-24: __Required__ –
    This property must define a name for the author. The name is displayed in
    the left sidebar of each post as part of the author info.

[`description`](#+blog.authors_file.description){ #+blog.authors_file.description }

:   :octicons-milestone-24: Default: _none_ · :octicons-alert-24: __Required__ –
    This property can be used to add a short description for the author, e.g.
    the role or profession of the author, or any other title.

[`avatar`](#+blog.authors_file.avatar){ #+blog.authors_file.avatar }

:   :octicons-milestone-24: Default: _none_ · :octicons-alert-24: __Required__ –
    This property must point to a valid image URL, internal or external, and is
    used as part of posts and excerpts as the author's avatar.

Now, you can assign one or more authors to a post by referencing their
identifiers in the front matter of the Markdown file under the `authors`
property. For each author, a small profile is rendered in the left sidebar of
each post, as well as in post excerpts on index pages:

``` yaml
---
date: 2022-01-31
authors:
  - squidfunk
    ...
---

# Hello world!
...
```

  [authors]: #authors
  [authors_file]: #+blog.authors_file

#### Adding categories

Categories are an excellent way for grouping your posts thematically on
dedicated index pages. This way, a user interested in a specific topic can
explore all of your posts on this topic. Make sure [categories] are enabled and
add them to the front matter `categories` property:

``` yaml
---
date: 2022-01-31
categories:
  - Hello
  - World
---

# Hello world!
...
```

If you want to save yourself from typos when typing out categories, you can
define your desired categories in `mkdocs.yml` as part of the
[`categories_allowed`][categories_allowed] configuration option. The
[built-in blog plugin] will stop the build if a category is not found within
the list.

  [categories_allowed]: #+blog.categories_allowed

#### Adding tags

Besides [categories], the [built-in blog plugin] also integrates with the
[built-in tags plugin]. If you add tags in the front matter `tags` property as
part of a post, the post is linked from the [tags index]:

``` yaml
---
date: 2022-01-31
tags:
  - Foo
  - Bar
---

# Hello world!
...
```

As usual, the tags are rendered above the main headline and posts are linked 
on the tags index page, if configured. Note that posts are, as pages, only
linked with their titles.

  [built-in tags plugin]: setting-up-tags.md#built-in-tags-plugin
  [tags index]: setting-up-tags.md#adding-a-tags-index

#### Adding related links

Related links offer the perfect way to prominently add a _further reading_ 
section to your post that is included in the left sidebar, guiding the user to 
other destinations of your documentation. Use the front matter `links` property 
to add related links to a post:

``` yaml
---
date: 2022-01-31
links:
  - setup/setting-up-site-search.md#built-in-search-plugin
  - insiders/index.md#how-to-become-a-sponsor
---

# Hello world!
...
```

You can use the exact same syntax as for the [`nav`][nav] section in
`mkdocs.yml`, which means you can set explicit titles for links, add external
links and even use nesting:

``` yaml
---
date: 2022-01-31
links:
  - setup/setting-up-site-search.md#built-in-search-plugin
  - insiders/index.md#how-to-become-a-sponsor
  - Nested section:
    - External link: https://example.com
    - setup/setting-up-site-search.md
---

# Hello world!
...
```

If you look closely, you'll realize that you can even use an anchor to link to
a specific section of a document, extending the possiblities of the [`nav`][nav] 
syntax in `mkdocs.yml`. The [built-in blog plugin] resolves the anchor and sets 
the title of the anchor as a [subtitle] of the related link.

Note that all links must be relative to [`docs_dir`][docs_dir], as is also the
case for the [`nav`][nav] setting.

  [nav]: https://www.mkdocs.org/user-guide/configuration/#nav
  [subtitle]: ../reference/index.md#setting-the-page-subtitle

#### Linking from and to posts

While [post URLs][post slugs] are dynamically computed, the [built-in blog 
plugin] ensures that all links from and to posts and a post's assets are 
correct. If you want to link to a post, just use the path to the Markdown file 
as a link reference (links must be relative):

``` markdown
[Hello World!](blog/posts/hello-world.md)
```

Linking from a post to a page, e.g. the index, follows the same method:

``` markdown
[Blog](../index.md)
```

All assets inside the `posts` directory are copied to the `blog/assets` folder 
when the site is being built. Of course, you can also reference assets from
posts outside of the `posts` directory. The [built-in blog plugin] ensures that
all links are correct.

#### Setting the reading time

When [enabled], the [readtime] package is used to compute the expected reading
time of each post, which is rendered as part of the post and post excerpt.
Nowadays, many blogs show reading times, which is why the [built-in blog plugin] 
offers this capability as well.

Sometimes, however, the computed reading time might not feel accurate, or
result in odd and unpleasant numbers. For this reason, reading time can be 
overridden and explicitly set with the front matter `readtime` property for a
post:

``` yaml
---
date: 2022-01-31
readtime: 15
---

# Hello world!
...
```

This will disable automatic reading time computation.

  [readtime]: https://pypi.org/project/readtime/
  [enabled]: #+blog.post_readtime

#### Setting defaults

If you have a lot of posts, it might feel redundant to define all of the above
for each post. Luckily, the [built-in meta plugin] allows to set default front
matter properties per folder. You can group your posts by categories, or
authors, and add a `.meta.yml` file to set common properties:

``` sh
.
├─ docs/
│  └─ blog/
│     ├─ posts/
│     ├─ .meta.yml # (1)!
│     └─ index.md
└─ mkdocs.yml
```

1.  As already noted, you can also place a `.meta.yml` file in nested folders
    of the `posts` directory. This file then can define all front matter
    properties that are valid in posts, e.g.:

    ``` yaml
    authors:
      - squidfunk
    categories:
      - Hello
      - World
    ```

Note that order matters – the [built-in meta plugin] must be defined before the
blog plugin in `mkdocs.yml`, so that all set defaults are correctly picked up
by the [built-in blog plugin]:

``` yaml
plugins:
  - meta
  - blog
```

Lists and dictionaries in `.meta.yml` files are merged and deduplicated with the
values defined for a post, which means you can define common properties in
`.meta.yml` and then add specific properties or overrides for each post.

  [built-in meta plugin]: ../reference/index.md#built-in-meta-plugin

### Adding pages

Besides posts, it's also possible to add static pages to your blog by listing
the pages in the [`nav`][nav] section of `mkdocs.yml`. All generated indexes
are included after the last specified page. For example, to add a page on the 
authors of the blog, add the following to `mkdocs.yml`:

``` yaml
nav:
  - Blog:
    - blog/index.md
    - blog/authors.md
      ...
```

## Customization

### Custom index pages

[:octicons-tag-24: insiders-4.24.0][Insiders] ·
:octicons-beaker-24: Experimental

If you want to add custom content to automatically generated [archive] and 
[category] indexes, e.g. to add a category description prior to the list of
posts, you can manually create the category page in the same location where
the [built-in blog plugin] would create it:

``` sh
.
├─ docs/
│  └─ blog/
│     ├─ category/
│     │  └─ hello.md #(1)!
│     ├─ posts/
│     └─ index.md
└─ mkdocs.yml
```

1.  The easiest way is to first [add the category] to the blog post, then take
    the URL generated by the [built-in blog plugin] and create the file at the
    corresponding location in the [`blog_dir`][this is configurable] folder.

    Note that the shown directory listing is based on the default configuration.
    If you specify different values for the following options, be sure to adjust
    the path accordingly:

    - [`blog_dir`][this is configurable]
    - [`categories_url_format`][categories_url_format]
    - [`categories_slugify`][categories_slugify]

You can now add arbitrary content to the newly created file, or set specific
front matter properties for this page, e.g. to change the [page description]:

``` yaml
---
description: Nullam urna elit, malesuada eget finibus ut, ac tortor.
---

# Hello
...
```

All post excerpts belonging to the category are automatically appended.

  [add the category]: #adding-categories
  [page description]: ../reference/index.md#setting-the-page-description
  [categories_url_format]: #+blog.categories_url_format
  [categories_slugify]: #+blog.categories_slugify

### Overriding templates

The [built-in blog plugin] is built on the same basis as Material for MkDocs,
which means you can override all templates used for the blog by using
[theme extension] as usual.

The following templates are added by the [built-in blog plugin]:

- [`blog.html`][blog.html] – Template for blog index
- [`blog-post.html`][blog-post.html] – Template for blog post
- [`blog-archive.html`][blog-archive.html] – Template for blog archive index
- [`blog-category.html`][blog-category.html] – Template for blog category index

  [theme extension]: ../customization.md#extending-the-theme

  [blog.html]: https://github.com/squidfunk/mkdocs-material-insiders/blob/master/src/blog.html
  [blog-post.html]: https://github.com/squidfunk/mkdocs-material-insiders/blob/master/src/blog-post.html
  [blog-archive.html]: https://github.com/squidfunk/mkdocs-material-insiders/blob/master/src/blog-archive.html
  [blog-category.html]: https://github.com/squidfunk/mkdocs-material-insiders/blob/master/src/blog-category.html
