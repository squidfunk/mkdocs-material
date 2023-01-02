---
search:
  boost: 1.05
---

# Setting up site search

Material for MkDocs provides an excellent client-side search implementation,
omitting the need for the integration of third-party services, which might
not be compliant with privacy regulations. Moreover, search even works
[offline], allowing users to download your documentation.

  [offline]: building-for-offline-usage.md

## Configuration

### Built-in search plugin

[:octicons-tag-24: 0.1.0][Search support] ·
:octicons-cpu-24: Plugin

The built-in search plugin integrates seamlessly with Material for MkDocs,
adding multilingual client-side search with [lunr] and [lunr-languages]. It's 
enabled by default, but must be re-added to `mkdocs.yml` when other plugins
are used:

``` yaml
plugins:
  - search
```

The following configuration options are supported:

[`lang`](#+search.lang){ #+search.lang }

:   :octicons-milestone-24: Default: _automatically set_ – This option allows
    to include the language-specific stemmers provided by [lunr-languages].
    Note that Material for MkDocs will set this automatically based on the
    [site language], but it may be overridden, e.g. to support multiple
    languages:

    === "A single language"

        ``` yaml
        plugins:
          - search:
              lang: en
        ```

    === "Multiple languages"

        ``` yaml
        plugins:
          - search:
              lang: # (1)!
                - en
                - de
        ```

        1.  Be aware that including support for other languages increases the
            general JavaScript payload by around 20kb (before `gzip`) and by
            another 15-30kb per language.

    The following languages are supported:

    <div class="mdx-columns" markdown>

    - `ar` – Arabic
    - `da` – Danish
    - `de` – German
    - `du` – Dutch
    - `en` – English
    - `es` – Spanish
    - `fi` – Finnish
    - `fr` – French
    - `hu` – Hungarian
    - `it` – Italian
    - `ja` – Japanese
    - `no` – Norwegian
    - `pt` – Portuguese
    - `ro` – Romanian
    - `ru` – Russian
    - `sv` – Swedish
    - `th` – Thai
    - `tr` – Turkish
    - `vi` – Vietnamese

    </div>

    Material for MkDocs goes to great lengths to support languages that are not
    part of this list by automatically falling back to the stemmer yielding the
    best result.

[`separator`](#+search.separator){ #+search.separator }

:   :octicons-milestone-24: Default: _automatically set_ – The separator for
    indexing and query tokenization can be customized, making it possible to
    index parts of words separated by other characters than whitespace and `-`,
    e.g. by including `.`:

    ``` yaml
    plugins:
      - search:
          separator: '[\s\-\.]+'
    ```

    With :octicons-tag-24: 9.0.0, a faster and more flexible tokenizer method
    is shipped, allowing for __tokenizing with lookahead__, which yields more
    influence on the way documents are indexed. As a result, we use the
    following separator setting for this site's search:

    ``` yaml
    plugins:
      - search:
          separator: '[\s\-,:!=\[\]()"/]+|(?!\b)(?=[A-Z][a-z])|\.(?!\d)|&[lg]t;'
    ```

    Broken into its parts, the separator induces the following behavior:

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

        [:octicons-arrow-right-24: Read more on tokenizing case changes]
        [tokenize case changes]

    === "Version strings"

        ```
        \.(?!\d)
        ```

        When adding `.` to the separator, version strings like `1.2.3` are split
        into `1`, `2` and `3`, which makes them undiscoverable via search. When
        using this subexpression, a small lookahead is introduced which will
        [preserve version strings] and keep them discoverable.

        [:octicons-arrow-right-24: Read more on tokenizing version numbers]
        [tokenize version numbers]

    === "HTML/XML tags"

        ```
        &[lg]t;
        ```

        If your documentation includes HTML/XML code examples, you may want to allow
        users to find specific tag names. Unfortunately, the `<` and `>` control
        characters are encoded in code blocks as `&lt;` and `&gt;`. Adding this
        subexpression to the separator allows for just that.

        [:octicons-arrow-right-24: Read more on tokenizing HTML/XML tags]
        [tokenize html-xml tags]

  [Search support]: https://github.com/squidfunk/mkdocs-material/releases/tag/0.1.0
  [lunr]: https://lunrjs.com
  [lunr-languages]: https://github.com/MihaiValentin/lunr-languages
  [lunr's default tokenizer]: https://github.com/olivernn/lunr.js/blob/aa5a878f62a6bba1e8e5b95714899e17e8150b38/lunr.js#L413-L456
  [site language]: changing-the-language.md#site-language
  [words are split at case changes]: ?q=searchHighlight
  [preserve version strings]: ?q=9.0.0
  [tokenize case changes]: ../blog/posts/search-better-faster-smaller.md#case-changes
  [tokenize version numbers]: ../blog/posts/search-better-faster-smaller.md#version-numbers
  [tokenize html-xml tags]: ../blog/posts/search-better-faster-smaller.md#htmlxml-tags

#### Chinese language support

[:octicons-heart-fill-24:{ .mdx-heart } Sponsors only][Insiders]{ .mdx-insiders } ·
[:octicons-tag-24: insiders-4.14.0][Insiders] ·
:octicons-beaker-24: Experimental

[Insiders] adds search support for the Chinese language (see our [blog article]
[chinese search] from May 2022) by integrating with the text segmentation
library [jieba], which can be installed with `pip`.

``` sh
pip install jieba
```

If [jieba] is installed, the [built-in search plugin] automatically detects
Chinese characters and runs them through the segmenter. The following
configuration options are available:

[`jieba_dict`](#+search.jieba_dict){ #+search.jieba_dict }

:   [:octicons-tag-24: insiders-4.17.2][Insiders] · :octicons-milestone-24:
    Default: _none_ – This option allows for specifying a [custom dictionary]
    to be used by [jieba] for segmenting text, replacing the default dictionary:

    ``` yaml
    plugins:
      - search:
          jieba_dict: dict.txt # (1)!
    ```

    1.  The following alternative dictionaries are provided by [jieba]:

        - [dict.txt.small] – 占用内存较小的词典文件
        - [dict.txt.big] – 支持繁体分词更好的词典文件

[`jieba_dict_user`](#+search.jieba_dict_user){ #+search.jieba_dict_user }

:   [:octicons-tag-24: insiders-4.17.2][Insiders] · :octicons-milestone-24:
    Default: _none_ – This option allows for specifying an additional
    [user dictionary] to be used by [jieba] for segmenting text, augmenting the
    default dictionary:

    ``` yaml
    plugins:
      - search:
          jieba_dict_user: user_dict.txt
    ```

    User dictionaries can be used for tuning the segmenter to preserve
    technical terms.

  [Insiders]: ../insiders/index.md
  [chinese search]: ../blog/posts/chinese-search-support.md
  [jieba]: https://pypi.org/project/jieba/
  [built-in search plugin]: #built-in-search-plugin
  [custom dictionary]: https://github.com/fxsjy/jieba#%E5%85%B6%E4%BB%96%E8%AF%8D%E5%85%B8
  [dict.txt.small]: https://github.com/fxsjy/jieba/raw/master/extra_dict/dict.txt.small
  [dict.txt.big]: https://github.com/fxsjy/jieba/raw/master/extra_dict/dict.txt.big
  [user dictionary]: https://github.com/fxsjy/jieba#%E8%BD%BD%E5%85%A5%E8%AF%8D%E5%85%B8

### Search suggestions

[:octicons-tag-24: 7.2.0][Search suggestions support] ·
:octicons-unlock-24: Feature flag ·
:octicons-beaker-24: Experimental

When search suggestions are enabled, the search will display the likeliest
completion for the last word which can be accepted with the ++arrow-right++ key.
Add the following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - search.suggest
```

Searching for [:octicons-search-24: search su][Search suggestions example]
yields ^^search suggestions^^ as a suggestion.

  [Search suggestions support]: https://github.com/squidfunk/mkdocs-material/releases/tag/7.2.0
  [Search suggestions example]: ?q=search+su

### Search highlighting

[:octicons-tag-24: 7.2.0][Search highlighting support] ·
:octicons-unlock-24: Feature flag ·
:octicons-beaker-24: Experimental

When search highlighting is enabled and a user clicks on a search result,
Material for MkDocs will highlight all occurrences after following the link.
Add the following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - search.highlight
```

Searching for [:octicons-search-24: code blocks][Search highlighting example]
highlights all occurrences of both terms.

  [Search highlighting support]: https://github.com/squidfunk/mkdocs-material/releases/tag/7.2.0
  [Search highlighting example]: ../reference/code-blocks.md?h=code+blocks

### Search sharing

[:octicons-tag-24: 7.2.0][Search sharing support] ·
:octicons-unlock-24: Feature flag

When search sharing is activated, a :material-share-variant: share button is
rendered next to the reset button, which allows to deep link to the current
search query and result. Add the following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - search.share
```

When a user clicks the share button, the URL is automatically copied to the
clipboard.

  [Search sharing support]: https://github.com/squidfunk/mkdocs-material/releases/tag/7.2.0

## Usage

### Search boosting

[:octicons-tag-24: 8.3.0][boost support]

Pages can be boosted in search with the front matter `search.boost` property,
which will make them rank higher. Add the following lines at the top of a
Markdown file:

=== ":material-arrow-up-circle: Rank up"

    ``` yaml
    ---
    search:
      boost: 2 # (1)!
    ---

    # Document title
    ...
    ```

    1.  :woman_in_lotus_position: When boosting pages, be gentle and start with
        __low values__.

=== ":material-arrow-down-circle: Rank down"

    ``` yaml
    ---
    search:
      boost: 0.5
    ---

    # Document title
    ...
    ```

  [boost support]: https://github.com/squidfunk/mkdocs-material/releases/tag/8.3.0

### Search exclusion

[:octicons-tag-24: 9.0.0][exclusion support] ·
:octicons-beaker-24: Experimental

Pages can be excluded from search with the front matter `search.exclude`
property, removing them from the index. Add the following lines at the top of a 
Markdown file:

``` yaml
---
search:
  exclude: true
---

# Document title
...
```

  [exclusion support]: https://github.com/squidfunk/mkdocs-material/releases/tag/9.0.0

#### Excluding sections

When [Attribute Lists] is enabled, specific sections of pages can be excluded
from search by adding the `data-search-exclude` pragma after a Markdown
heading:

=== ":octicons-file-code-16: `docs/page.md`"

    ``` markdown
    # Document title

    ## Section 1

    The content of this section is included

    ## Section 2 { data-search-exclude }

    The content of this section is excluded
    ```

=== ":octicons-codescan-16: `search_index.json`"

    ``` json
    {
      ...
      "docs": [
        {
          "location":"page/",
          "text":"",
          "title":"Document title"
        },
        {
          "location":"page/#section-1",
          "text":"<p>The content of this section is included</p>",
          "title":"Section 1"
        }
      ]
    }
    ```

  [Attribute Lists]: extensions/python-markdown.md#attribute-lists

#### Excluding blocks

When [Attribute Lists] is enabled, specific sections of pages can be excluded
from search by adding the `data-search-exclude` pragma after a Markdown
inline- or block-level element:

=== ":octicons-file-code-16: `docs/page.md`"

    ``` markdown
    # Document title

    The content of this block is included

    The content of this block is excluded
    { data-search-exclude }
    ```

=== ":octicons-codescan-16: `search_index.json`"

    ``` json
    {
      ...
      "docs": [
        {
          "location":"page/",
          "text":"<p>The content of this block is included</p>",
          "title":"Document title"
        }
      ]
    }
    ```
