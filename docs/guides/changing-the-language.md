---
template: overrides/main.html
---

# Changing the language

Material for MkDocs supports internationalization (i18n) and provides
translations for template variables and labels in 40+ languages. Additionally,
search can be configured to use a language-specific stemmer (if available).

## Configuration

### Site language

[:octicons-file-code-24: Source][1] · :octicons-tools-24: Default: `en`

You can set the language from `mkdocs.yml` with:

``` yaml
theme:
  language: en
```

The following languages are supported:

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
  <li><code>af</code> / Afrikaans</li>
  <li><code>ar</code> / Arabic</li>
  <li><code>bn</code> / Bengali (Bangla)</li>
  <li><code>ca</code> / Catalan</li>
  <li><code>cs</code> / Czech</li>
  <li><code>da</code> / Danish</li>
  <li><code>de</code> / German</li>
  <li><code>en</code> / English</li>
  <li><code>es</code> / Spanish</li>
  <li><code>et</code> / Estonian</li>
  <li><code>fa</code> / Persian (Farsi)</li>
  <li><code>fi</code> / Finnish</li>
  <li><code>fr</code> / French</li>
  <li><code>gl</code> / Galician</li>
  <li><code>gr</code> / Greek</li>
  <li><code>he</code> / Hebrew</li>
  <li><code>hi</code> / Hindi</li>
  <li><code>hr</code> / Croatian</li>
  <li><code>hu</code> / Hungarian</li>
  <li><code>id</code> / Indonesian</li>
  <li><code>it</code> / Italian</li>
  <li><code>ja</code> / Japanese</li>
  <li><code>kr</code> / Korean</li>
  <li><code>my</code> / Burmese</li>
  <li><code>nl</code> / Dutch</li>
  <li><code>nn</code> / Norwegian (Nynorsk)</li>
  <li><code>no</code> / Norwegian</li>
  <li><code>pl</code> / Polish</li>
  <li><code>pt</code> / Portuguese</li>
  <li><code>ro</code> / Romanian</li>
  <li><code>ru</code> / Russian</li>
  <li><code>sh</code> / Serbo-Croatian</li>
  <li><code>si</code> / Slovenian</li>
  <li><code>sk</code> / Slovak</li>
  <li><code>sr</code> / Serbian</li>
  <li><code>sv</code> / Swedish</li>
  <li><code>th</code> / Thai</li>
  <li><code>tr</code> / Turkish</li>
  <li><code>uk</code> / Ukrainian</li>
  <li><code>vi</code> / Vietnamese</li>
  <li><code>zh</code> / Chinese (Simplified)</li>
  <li><code>zh-Hant</code> / Chinese (Traditional)</li>
  <li><code>zh-TW</code> / Chinese (Taiwanese)</li>
  <li>
    <a href="https://bit.ly/38F5RCa">
      Add language
    </a>
  </li>
</ul>

  [1]: https://github.com/squidfunk/mkdocs-material/blob/master/src/partials/language/en.html

### Site search

[:octicons-file-code-24: Source][2] · :octicons-tools-24: Default: best match
for `theme.language`, automatically set

Some languages, like Arabic or Japanese, need dedicated stemmers for search to
work properly. Material for MkDocs relies on [lunr-languages][3] to provide this 
functionality. See the [search plugin documentation][4] for more information.

  [2]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/javascripts/integrations/search/worker/main/index.ts#L49-L69
  [3]: https://github.com/MihaiValentin/lunr-languages
  [4]: ../plugins/search.md#language


### Directionality

[:octicons-file-code-24: Source][5] · :octicons-tools-24: Default: best match
for `theme.language`, automatically set

While many languages are read `ltr` (left-to-right), Material for MkDocs also
supports `rtl` (right-to-left) directionality which is inferred from the
selected language, but can also be set with:

``` yaml
theme:
  direction: ltr
```

:material-cursor-default-click-outline: click on a tile to change the
directionality:

<style>
  .md-typeset button[data-md-dir] {
    cursor: pointer;
    transition: opacity 250ms;
  }
  .md-typeset button[data-md-dir]:hover {
    opacity: 0.75;
  }
  .md-typeset button[data-md-dir] > code {
    display: block;
    color: var(--md-primary-bg-color);
    background-color: var(--md-primary-fg-color);
  }
</style>

<button data-md-dir="ltr"><code>ltr</code></button>
<button data-md-dir="rtl"><code>rtl</code></button>

<script>
  var buttons = document.querySelectorAll("button[data-md-dir]")
  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      var attr = this.getAttribute("data-md-dir")
      document.body.dir = attr
      var name = document.querySelector("#__code_1 code span:nth-child(5)")
      name.textContent = attr
    })
  })
</script>

  [5]: https://github.com/squidfunk/mkdocs-material/blob/master/src/base.html#L168
