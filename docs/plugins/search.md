---
template: overrides/main.html
---

# Search

The [built-in search plugin][1] provides client-side search inside the browser
and is implemented using [lunr.js][2] which includes stemmers for the English
language by default, while stemmers for other languages are included with 
[lunr-languages][3], both of which are integrated with this theme.

!!! tip "Make search work offline"

    While search will not work for the `file://` protocol, as web workers and
    the use of `XMLHTTPRequest` are both blocked by modern browsers for security
    reasons, the [localsearch][4] plugin and @squidfunk's [iframe-worker][5]
    polyfill add support for cases where this is a mandatory requirement, e.g.,
    for offline use.

  [1]: https://www.mkdocs.org/user-guide/configuration/#search
  [2]: https://lunrjs.com
  [3]: https://github.com/MihaiValentin/lunr-languages
  [4]: https://github.com/wilhelmer/mkdocs-localsearch
  [5]: https://github.com/squidfunk/iframe-worker

## Installation

The search plugin is a built-in plugin, and thus doesn't need to be installed.

## Configuration

Add the following lines to `mkdocs.yml`:

``` yaml
plugins:
  - search
```

### Language

> Default: best match for `theme.language`, automatically set

Material for MkDocs selects the (best-)matching stemmer for the given theme
language. Multilingual search can be enabled in `mkdocs.yml` by explicitly
defining the search language(s):

``` yaml
plugins:
  - search:
      lang:
        - en
        - de
        - ru
```

The following language codes are supported:

<style>
  .md-language-list {
    -webkit-columns: 2;
       -moz-columns: 2;
            columns: 2;
  }
  .md-language-list li {
    -webkit-column-break-inside: avoid;
              page-break-inside: avoid;
                   break-inside: avoid;
  }
</style>
<ul class="md-language-list">
  <li><code>ar</code> / Arabic</li>
  <li><code>da</code> / Danish</li>
  <li><code>du</code> / Dutch</li>
  <li><code>en</code> / English</li>
  <li><code>fi</code> / Finnish</li>
  <li><code>fr</code> / French</li>
  <li><code>de</code> / German</li>
  <li><code>hu</code> / Hungarian</li>
  <li><code>it</code> / Italian</li>
  <li><code>ja</code> / Japanese</li>
  <li><code>no</code> / Norwegian</li>
  <li><code>pt</code> / Portuguese</li>
  <li><code>ro</code> / Romanian</li>
  <li><code>ru</code> / Russian</li>
  <li><code>es</code> / Spanish</li>
  <li><code>sv</code> / Swedish</li>
  <li><code>th</code> / Thai</li>
  <li><code>tr</code> / Turkish</li>
  <li><code>vi</code> / Vietnamese</li>
</ul>

!!! warning "Only specify the languages you really need"

    Be aware that including support for other languages increases the general
    JavaScript payload by around 20kb (before `gzip`) and by another 15-30kb
    per language.

### Tokenization

> Default: `[\s\-]+`

The separator for tokenization can be customized which makes it possible to
index parts of words that are separated by `-` or `.`:

``` yaml
plugins:
  - search:
      separator: '[\s\-\.]+'
```

### Prebuilding :hatching_chick:

> Default: `false`

MkDocs can generate a [prebuilt index][6] of all pages during build time, which
provides performance improvements at the cost of more bandwidth. This may be
beneficial for large documentation projects that are served with appropriate
HTTP headers (e.g. `Content-Encoding: gzip`).

Material for MkDocs 5 finally brings experimental support for prebuilt indexes
which can be enabled by adding the following lines to `mkdocs.yml`:

``` yaml
plugins:
  - search:
      prebuild_index: true
```

  [6]: https://www.mkdocs.org/user-guide/configuration/#prebuild_index

## Usage

When enabled, a search bar is shown in the header.
