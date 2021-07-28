---
template: overrides/main.html
search:
  boost: 1.05
---

# Setting up site search

Material for MkDocs provides an excellent, client-side search implementation,
omitting the need for the integration of third-party services, which might
be tricky to integrate to be compliant with data privacy regulations. Moreover,
with some effort, search can be made available [offline][1].

  [1]: #offline-search

## Configuration

### Built-in search

[:octicons-file-code-24: Source][2] ·
[:octicons-cpu-24: Plugin][3]

The [built-in search plugin][3] integrates seamlessly with Material for MkDocs,
adding multilingual client-side search with [lunr][4] and [lunr-languages][5].
It's enabled by default, but must be re-added to `mkdocs.yml` when other plugins
are used:

``` yaml
plugins:
  - search
```

The following options are supported:

`lang`{ #lang }

:   :octicons-milestone-24: Default: _automatically set_ – This option allows
    to include the language-specific stemmers provided by [lunr-languages][5].
    Note that Material for MkDocs will set this automatically based on the
    [site language][6], but it may be overridden, e.g. to support multiple
    languages:

    === "A single language"

        ``` yaml
        plugins:
          - search:
              lang: ru
        ```

    === "Multiple languages"

        ``` yaml
        plugins:
          - search:
              lang:
                - en
                - ru
        ```

    The following languages are supported:

    <div class="mdx-columns" markdown="1">

    - `ar` – Arabic
    - `da` – Danish
    - `du` – Dutch
    - `en` – English
    - `fi` – Finnish
    - `fr` – French
    - `de` – German
    - `hu` – Hungarian
    - `it` – Italian
    - `ja` – Japanese
    - `no` – Norwegian
    - `pt` – Portuguese
    - `ro` – Romanian
    - `ru` – Russian
    - `es` – Spanish
    - `sv` – Swedish
    - `th` – Thai
    - `tr` – Turkish
    - `vi` – Vietnamese

    </div>

    _Material for MkDocs also tries to support languages that are not part of
    this list by choosing the stemmer yielding the best result automatically_.

    !!! warning "Only specify the languages you really need"

        Be aware that including support for other languages increases the general
        JavaScript payload by around 20kb (before `gzip`) and by another 15-30kb
        per language.

`separator`{ #separator }

:   :octicons-milestone-24: Default: _automatically set_ – The separator for
    indexing and query tokenization can be customized, making it possible to
    index parts of words separated by other characters than whitespace and `-`,
    e.g. by including `.`:

    ``` yaml
    plugins:
      - search:
          separator: '[\s\-\.]+'
    ```

`prebuild_index`{ #prebuild-index }

:   :octicons-milestone-24: Default: `false` · :octicons-beaker-24:
    Experimental – MkDocs can generate a [prebuilt index][7] of all pages during
    build time, which provides performance improvements at the cost of more
    bandwidth, as it reduces the build time of the search index:

    ``` yaml
    plugins:
      - search:
          prebuild_index: true
    ```
    
    This may be beneficial for large documentation projects served with
    appropriate headers, i.e. `Content-Encoding: gzip`, but benchmarking before
    deployment is recommended.

_Material for MkDocs doesn't provide official support for the other options of
this plugin, so they may be supported but might yield unexpected results.
Use them at your own risk._

  [2]: https://github.com/squidfunk/mkdocs-material/tree/master/src/assets/javascripts/integrations/search
  [3]: https://www.mkdocs.org/user-guide/configuration/#search
  [4]: https://lunrjs.com
  [5]: https://github.com/MihaiValentin/lunr-languages
  [6]: changing-the-language.md#site-language
  [7]: https://www.mkdocs.org/user-guide/configuration/#prebuild_index

### Search suggestions

[:octicons-file-code-24: Source][8] ·
:octicons-unlock-24: Feature flag ·
:octicons-beaker-24: Experimental

When _search suggestions_ are enabled, the search will display the likeliest
completion for the last word, saving the user many key strokes by accepting the
suggestion with the ++arrow-right++ key.

Add the following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - search.suggest
```

Searching for [:octicons-search-24: ^^search su^^][9] yields ^^search suggestions^^ as a suggestion:

[![Search suggestions][10]][10]

  [8]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/javascripts/components/search/suggest/index.ts
  [9]: ?q=search+su
  [10]: ../assets/screenshots/search-suggestions.png

### Search highlighting

[:octicons-file-code-24: Source][11] ·
:octicons-unlock-24: Feature flag ·
:octicons-beaker-24: Experimental

When _search highlighting_ is enabled and a user clicks on a search result,
Material for MkDocs will highlight all occurrences after following the link.
Add the following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - search.highlight
```

Searching for [:octicons-search-24: ^^code blocks^^][12] yields:

[![Search highlighting][13]][13]

  </figcaption>
</figure>

  [11]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/javascripts/components/search/highlight/index.ts
  [12]: ../reference/code-blocks.md?h=code+blocks
  [13]: ../assets/screenshots/search-highlighting.png

### Search sharing

[:octicons-file-code-24: Source][14] ·
:octicons-unlock-24: Feature flag ·
:octicons-beaker-24: Experimental

When _search sharing_ is activated, a :material-share-variant: share button is
rendered next to the reset button, which allows to deep link to the current
search query and result. Add the following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - search.share
```

When a user clicks the share button, the URL is automatically copied to the
clipboard.

[![Search sharing][15]][15]

  [14]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/javascripts/components/search/share/index.ts
  [15]: ../assets/screenshots/search-share.png

### Offline search

[:octicons-file-code-24: Source][16] ·
[:octicons-cpu-24: Plugin][17]

If you distribute your documentation as `*.html` files, the built-in search
will not work out-of-the-box due to the restrictions modern browsers impose for
security reasons. This can be mitigated with the [localsearch][17] plugin in
combination with @squidfunk's [iframe-worker][18] polyfill.

For setup instructions, refer to the [official documentation][19].

  [16]: https://github.com/squidfunk/mkdocs-material/blob/master/src/base.html
  [17]: https://github.com/wilhelmer/mkdocs-localsearch/
  [18]: https://github.com/squidfunk/iframe-worker
  [19]: https://github.com/wilhelmer/mkdocs-localsearch#installation-material-v5

!!! tip

    When distributing documentation as HTML files to be opened from the file
    system, you will also want to set `use_directory_urls: false` in
    `mkdocs.yml` to make page links function correctly.

## Usage

### Boosting a page

[:octicons-file-code-24: Source][20] ·
:octicons-note-24: Metadata ·
[:octicons-heart-fill-24:{ .mdx-heart } Insiders only][20]{ .mdx-insiders }

In order to give specific pages a higher relevance in search, [lunr][4] supports
page-specific boosts, which can be defined for each page by leveraging the
[Metadata][21] extension:

``` bash
---
search:
  boost: 100
---

# Document title
...
```

  [20]: ../insiders/index.md
  [21]: ../../reference/meta-tags/#metadata

## Customization

The search implementation of Material for MkDocs is probably its most
sophisticated feature, as it tries to balance a _great typeahead experience_,
_good performance_, _accessibility_, and a result list that is _easy to scan_.
This is where Material for MkDocs deviates from other themes.

The following section explains how search can be customized to tailor it to
your needs.

### Query transformation

[:octicons-file-code-24: Source][22] ·
:octicons-mortar-board-24: Difficulty: _easy_

When a user enters a query into the search box, the query is pre-processed
before it is submitted to the search index. Material for MkDocs will apply the
following transformations, which can be customized by [extending the theme][23]:

``` ts
export function defaultTransform(query: string): string {
  return query
    .split(/"([^"]+)"/g) /* (1) */
      .map((terms, index) => index & 1
        ? terms.replace(/^\b|^(?![^\x00-\x7F]|$)|\s+/g, " +")
        : terms
      )
      .join("")
    .replace(/"|(?:^|\s+)[*+\-:^~]+(?=\s+|$)/g, "") /* (2) */
    .trim() /* (3) */
}
```

1. Search for terms in quotation marks and prepend a `+` modifier to denote
   that the resulting document must contain all terms, converting the query
   to an `AND` query (as opposed to the default `OR` behavior). While users
   may expect terms enclosed in quotation marks to map to span queries, i.e.
   for which order is important, `lunr` doesn't support them, so the best
   we can do is to convert the terms to an `AND` query.

2. Replace control characters which are not located at the beginning of the
   query or preceded by white space, or are not followed by a non-whitespace
   character or are at the end of the query string. Furthermore, filter
   unmatched quotation marks.

3. Trim excess whitespace from left and right.

If you want to switch to the default behavior of the `mkdocs` and `readthedocs`
themes, both of which don't transform the query prior to submission, or
customize the `transform` function, you can do this by [overriding the
`config` block][24]:

``` html
{% block config %}
  {{ super() }}
  <script>
    var __search = {
      transform: function(query) {
        return query
      }
    }
  </script>
{% endblock %}
```

The `transform` function will receive the query string as entered by the user
and must return the processed query string to be submitted to the search index.

  [22]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/javascripts/integrations/search/transform/index.ts
  [23]: ../customization.md#extending-the-theme
  [24]: ../customization.md#overriding-blocks-recommended

### Custom search

[:octicons-file-code-24: Source][25] ·
:octicons-mortar-board-24: Difficulty: _challenging_

Material for MkDocs implements search as part of a [web worker][26]. If you
want to switch the web worker with your own implementation, e.g. to submit
search to an external service, you can add a custom JavaScript file to the
`docs` directory and [override the `config` block][23]:

``` html
{% block config %}
  {{ super() }}
  <script>
    var __search = {
      worker: "<url>"
    }
  </script>
{% endblock %}
```

Communication with the search worker is implemented using a designated message
format using _discriminated unions_, i.e. through the `type` property of the
message. See the following interface definitions to learn about the message
formats:

- [:octicons-file-code-24: `SearchMessage`][27]
- [:octicons-file-code-24: `SearchIndex` and `SearchResult`][28]

The sequence and direction of messages is rather intuitive:

- :octicons-arrow-right-24: `SearchSetupMessage`
- :octicons-arrow-left-24: `SearchReadyMessage`
- :octicons-arrow-right-24: `SearchQueryMessage`
- :octicons-arrow-left-24: `SearchResultMessage`

  [25]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/javascripts/integrations/search/worker
  [26]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
  [27]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/javascripts/integrations/search/worker/message/index.ts
  [28]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/javascripts/integrations/search/_/index.ts
