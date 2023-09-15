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

<!-- md:version 0.1.0 -->
<!-- md:plugin -->

The built-in search plugin integrates seamlessly with Material for MkDocs,
adding multilingual client-side search with [lunr] and [lunr-languages]. It's
enabled by default, but must be re-added to `mkdocs.yml` when other plugins
are used:

``` yaml
plugins:
  - search
```

For a list of all settings, please consult the [plugin documentation].

  [plugin documentation]: ../plugins/search.md

  [lunr]: https://lunrjs.com
  [lunr-languages]: https://github.com/MihaiValentin/lunr-languages

### Search suggestions

<!-- md:version 7.2.0 -->
<!-- md:feature -->
<!-- md:flag experimental -->

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

  [Search suggestions example]: ?q=search+su

### Search highlighting

<!-- md:version 7.2.0 -->
<!-- md:feature -->
<!-- md:flag experimental -->

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

  [Search highlighting example]: ../reference/code-blocks.md?h=code+blocks

### Search sharing

<!-- md:version 7.2.0 -->
<!-- md:feature -->

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

## Usage

### Search boosting

<!-- md:version 8.3.0 -->
<!-- md:flag metadata -->

Pages can be boosted in search with the front matter `search.boost` property,
which will make them rank higher. Add the following lines at the top of a
Markdown file:

=== ":material-arrow-up-circle: Rank up"

    ``` yaml
    ---
    search:
      boost: 2 # (1)!
    ---

    # Page title
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

    # Page title
    ...
    ```

### Search exclusion

<!-- md:version 9.0.0 -->
<!-- md:flag metadata -->
<!-- md:flag experimental -->

Pages can be excluded from search with the front matter `search.exclude`
property, removing them from the index. Add the following lines at the top of a
Markdown file:

``` yaml
---
search:
  exclude: true
---

# Page title
...
```

#### Excluding sections

When [Attribute Lists] is enabled, specific sections of pages can be excluded
from search by adding the `data-search-exclude` pragma after a Markdown
heading:

=== ":octicons-file-code-16: `docs/page.md`"

    ``` markdown
    # Page title

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
    # Page title

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
