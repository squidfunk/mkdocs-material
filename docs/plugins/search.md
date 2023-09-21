---
title: Built-in search plugin
icon: material/magnify
---

# Built-in search plugin

The search plugin adds a search bar to the header, allowing users to search your
documentation. It's powered by [lunr.js], a lightweight full-text search engine
for the browser, elimininating the need for external services, and even works
when building [offline-capable documentation].

  [lunr.js]: https://lunrjs.com/
  [offline-capable documentation]: ../setup/building-for-offline-usage.md

## Objective

### How it works

The plugin scans the generated HTML and builds a search index from all pages and
sections by extracting the section titles and contents. It preserves some inline
formatting like code blocks and lists, but removes all other formatting, so the
search index is as small as possible.

When a user visits your site, the search index is shipped to the browser,
indexed with [lunr.js] and made available for fast and simple querying – no
server needed. This ensures that the search index is always up to date with
your documentation, yielding accurate results.

### When to use it

It's generally recommended to use the plugin, as interactive search functionality
is a vital part of every good documentation. Additionally, the plugin integrates
perfectly with several of the other [built-in plugins] that Material for MkDocs
offers:

<div class="grid cards" markdown>

-   :material-connection: &nbsp; __[Built-in offline plugin][offline]__

    ---

    The offline plugin adds support for building offline-capable documentation,
    so you can distribute the [`site` directory][mkdocs.site_dir] as a `.zip`
    file that can be downloaded.

    ---

    __Your documentation can work without connectivity to the internet__

-   :material-file-tree: &nbsp; __[Built-in meta plugin][meta]__

    ---

    The meta plugin makes it easy to [boost][meta.search.boost] specific
    sections in search results or to [exclude][meta.search.exclude] them
    entirely from being indexed, giving more granular control over search.

    ---

    __Simpler organization and management of search in different subsections__

</div>

  [offline]: offline.md
  [meta]: meta.md
  [built-in plugins]: index.md

## Configuration

<!-- md:version 9.0.0 -->
<!-- md:plugin [search] – built-in -->

As with all [built-in plugins], getting started with the search plugin is
straightforward. Just add the following lines to `mkdocs.yml`, and your users
will be able to search your documentation:

``` yaml
plugins:
  - search
```

The search plugin is built into Material for MkDocs and doesn't need to be
installed.

  [search]: search.md
  [built-in plugins]: index.md

### General

The following settings are available:

---

#### <!-- md:setting config.enabled -->

<!-- md:version 9.2.9 -->
<!-- md:default `true` -->

Use this setting to enable or disable the plugin when [building your project].
It's normally not necessary to specify this setting, but if you want to disable
the plugin, use:

``` yaml
plugins:
  - search:
      enabled: false
```

  [building your project]: ../creating-your-site.md#building-your-site

### Search

The following settings are available for search:

---

#### <!-- md:setting config.lang -->

<!-- md:version 9.0.0 -->
<!-- md:default computed -->

Use this setting to specify the language of the search index, enabling [stemming]
support for other languages than English. The default value is automatically
computed from the [site language], but can be explicitly set to another language
or even multiple languages with:

=== "Set language"

    ``` yaml
    plugins:
      - search:
          lang: en
    ```

=== "Add further languages"

    ``` yaml
    plugins:
      - search:
          lang: # (1)!
            - en
            - de
    ```

    1.  Be aware that including support for further languages increases the
        base JavaScript payload by around 20kb and by another 15-30kb per
        language, all before `gzip`.

  [stemming]: https://en.wikipedia.org/wiki/Stemming
  [site language]: ../setup/changing-the-language.md#site-language
  [lunr languages]: https://github.com/MihaiValentin/lunr-languages

Language support is provided by [lunr languages], a collection of
language-specific stemmers and stop words for [lunr.js] maintained by the
Open Source community.

---

The following languages are currently supported by [lunr languages]:

<div class="mdx-columns" markdown>

- `ar` – Arabic
- `da` – Danish
- `de` – German
- `du` – Dutch
- `en` – English
- `es` – Spanish
- `fi` – Finnish
- `fr` – French
- `hi` – Hindi
- `hu` – Hungarian
- `hy` – Armenian
- `it` – Italian
- `ja` – Japanese
- `kn` - Kannada
- `ko` – Korean
- `no` – Norwegian
- `pt` – Portuguese
- `ro` – Romanian
- `ru` – Russian
- `sa` – Sanskrit
- `sv` – Swedish
- `ta` – Tamil
- `te` – Telugu
- `th` – Thai
- `tr` – Turkish
- `vi` – Vietnamese
- `zh` – Chinese

</div>

If [lunr languages] doesn't provide support for the selected [site language],
the plugin falls back to another language that yields the best stemming results.
If you discover that the search results are not satisfactory, you can contribute
to [lunr languages] by adding support for your language.

---

#### <!-- md:setting config.separator -->

<!-- md:version 9.0.0 -->
<!-- md:default computed -->

Use this setting to specify the separator used to split words when building the
search index on the client side. The default value is automatically computed
from the [site language], but can also be explicitly set to another value with:

``` yaml
plugins:
  - search:
      separator: '[\s\-,:!=\[\]()"/]+|(?!\b)(?=[A-Z][a-z])|\.(?!\d)|&[lg]t;'
```

Separators support [positive and negative lookahead assertions], which allows
for rather complex expressions that yield precise control over how words are
split when building the search index.

Broken into its parts, this separator induces the following behavior:

=== "Special characters"

    ```
    [\s\-,:!=\[\]()"/]+
    ```

    The first part of the expression inserts token boundaries for each
    document before and after whitespace, hyphens, commas, brackets and
    other special characters. If several of those special characters are
    adjacent, they are treated as one.

=== "Case changes"

    ```
    (?!\b)(?=[A-Z][a-z])
    ```

    Many programming languages have naming conventions like `PascalCase` or
    `camelCase`. By adding this subexpression to the separator,
    [words are split at case changes], tokenizing the word `PascalCase`
    into `Pascal` and `Case`.

=== "Version strings"

    ```
    \.(?!\d)
    ```

    When adding `.` to the separator, version strings like `1.2.3` are split
    into `1`, `2` and `3`, which makes them undiscoverable via search. When
    using this subexpression, a small lookahead is introduced which will
    [preserve version strings] and keep them discoverable.

=== "HTML/XML tags"

    ```
    &[lg]t;
    ```

    If your documentation includes HTML/XML code examples, you may want to allow
    users to find [specific tag names]. Unfortunately, the `<` and `>` control
    characters are encoded in code blocks as `&lt;` and `&gt;`. Adding this
    subexpression to the separator allows for just that.

  [positive and negative lookahead assertions]: https://www.regular-expressions.info/lookaround.html
  [words are split at case changes]: ?q=searchHighlight
  [preserve version strings]: ?q=9.0.0
  [specific tag names]: ?q=script

---

#### <!-- md:setting config.pipeline -->

<!-- md:version 9.0.0 -->
<!-- md:default computed -->
<!-- md:flag experimental -->

Use this setting to specify the [pipeline functions] that are used to filter and
expand tokens after tokenizing them with the [`separator`][config.separator] and
before adding them to the search index. The default value is automatically
computed from the [site language], but can also be explicitly set with:

``` yaml
plugins:
  - search:
      pipeline:
        - stemmer
        - stopWordFilter
        - trimmer
```

The following pipeline functions can be used:

- `stemmer` – Stem tokens to their root form, e.g. `running` to `run`
- `stopWordFilter` – Filter common words according, e.g. `a`, `the`, etc.
- `trimmer` – Trim whitespace from tokens

  [pipeline functions]: https://lunrjs.com/guides/customising.html#pipeline-functions

### Segmentation

The plugin supports text segmentation of Chinese via [jieba], a popular
Chinese text segmentation library. Other languages like Japanese and Korean are
currently segmented on the client side, but we're considering to move this
functionality into the plugin in the future.

The following settings are available for segmentation:

  [jieba]: https://pypi.org/project/jieba/

---

#### <!-- md:setting config.jieba_dict -->

<!-- md:version 9.2.0 -->
<!-- md:default none -->
<!-- md:flag experimental -->

Use this setting to specify a [custom dictionary] to be used by [jieba] for
segmenting text, replacing the default dictionary. [jieba] comes with
several dictionaries, which can be used with:

``` yaml
plugins:
  - search:
      jieba_dict: dict.txt
```

The following dictionaries are provided by [jieba]:

- [dict.txt.small] – 占用内存较小的词典文件
- [dict.txt.big] – 支持繁体分词更好的词典文件

The provided path is resolved from the root directory.

  [custom dictionary]: https://github.com/fxsjy/jieba#%E5%85%B6%E4%BB%96%E8%AF%8D%E5%85%B8
  [dict.txt.small]: https://github.com/fxsjy/jieba/raw/master/extra_dict/dict.txt.small
  [dict.txt.big]: https://github.com/fxsjy/jieba/raw/master/extra_dict/dict.txt.big

---

#### <!-- md:setting config.jieba_dict_user -->

<!-- md:version 9.2.0 -->
<!-- md:default none -->
<!-- md:flag experimental -->

Use this setting to specify an additional [user dictionary] to be used by
[jieba] for segmenting text, augmenting the default dictionary. User
dictionaries are ideal for tuning the segmenter:

``` yaml
plugins:
  - search:
      jieba_dict_user: user_dict.txt
```

The provided path is resolved from the root directory.

  [user dictionary]: https://github.com/fxsjy/jieba#%E8%BD%BD%E5%85%A5%E8%AF%8D%E5%85%B8

## Usage

### Metadata

The following properties are available:

---

#### <!-- md:setting meta.search.boost -->

<!-- md:version 8.3.0 -->
<!-- md:flag metadata -->
<!-- md:default none -->

Use this property to increase or decrease the relevance of a page in the search
results, giving more weight to them. Use values above `1` to rank up and values
below `1` to rank down:

=== ":material-arrow-up-circle: Rank up"

    ``` yaml
    ---
    search:
      boost: 2 # (1)!
    ---

    # Page title
    ...
    ```

    1.  When boosting pages, always start with low values.

=== ":material-arrow-down-circle: Rank down"

    ``` yaml
    ---
    search:
      boost: 0.5
    ---

    # Page title
    ...
    ```

---

#### <!-- md:setting meta.search.exclude -->

<!-- md:version 9.0.0 -->
<!-- md:flag metadata -->
<!-- md:default none -->

Use this property to exclude a page from the search results. Note that this will
not only remove the page, but also all subsections of the page from the search
results:

``` yaml
---
search:
  exclude: true
---

# Page title
...
```
