---
template: overrides/main.html
---

# Changing the language

Material for MkDocs supports internationalization (i18n) and provides
translations for template variables and labels in 40+ languages. Additionally,
the site search can be configured to use a language-specific stemmer (if
available).

## Configuration

### Site language

[:octicons-file-code-24: Source][1] · :octicons-milestone-24: Default: `en`

You can set the _site language_ in `mkdocs.yml` with:

``` yaml
theme:
  language: en
```

The following languages are supported:

<ul class="tx-columns">
  <li><code>af</code> – Afrikaans</li>
  <li><code>ar</code> – Arabic</li>
  <li><code>bn</code> – Bengali (Bangla)</li>
  <li><code>ca</code> – Catalan</li>
  <li><code>cs</code> – Czech</li>
  <li><code>da</code> – Danish</li>
  <li><code>de</code> – German</li>
  <li><code>en</code> – English</li>
  <li><code>eo</code> – Esperanto</li>
  <li><code>es</code> – Spanish</li>
  <li><code>et</code> – Estonian</li>
  <li><code>fa</code> – Persian (Farsi)</li>
  <li><code>fi</code> – Finnish</li>
  <li><code>fr</code> – French</li>
  <li><code>gl</code> – Galician</li>
  <li><code>gr</code> – Greek</li>
  <li><code>he</code> – Hebrew</li>
  <li><code>hi</code> – Hindi</li>
  <li><code>hr</code> – Croatian</li>
  <li><code>hu</code> – Hungarian</li>
  <li><code>id</code> – Indonesian</li>
  <li><code>it</code> – Italian</li>
  <li><code>ja</code> – Japanese</li>
  <li><code>ka</code> – Georgian</li>
  <li><code>kr</code> – Korean</li>
  <li><code>my</code> – Burmese</li>
  <li><code>nl</code> – Dutch</li>
  <li><code>nn</code> – Norwegian (Nynorsk)</li>
  <li><code>no</code> – Norwegian</li>
  <li><code>pl</code> – Polish</li>
  <li><code>pt</code> – Portuguese</li>
  <li><code>ro</code> – Romanian</li>
  <li><code>ru</code> – Russian</li>
  <li><code>sh</code> – Serbo-Croatian</li>
  <li><code>si</code> – Slovenian</li>
  <li><code>sk</code> – Slovak</li>
  <li><code>sr</code> – Serbian</li>
  <li><code>sv</code> – Swedish</li>
  <li><code>th</code> – Thai</li>
  <li><code>tr</code> – Turkish</li>
  <li><code>uk</code> – Ukrainian</li>
  <li><code>vi</code> – Vietnamese</li>
  <li><code>zh</code> – Chinese (Simplified)</li>
  <li><code>zh-Hant</code> – Chinese (Traditional)</li>
  <li><code>zh-TW</code> – Chinese (Taiwanese)</li>
  <li>
    <a href="https://bit.ly/38F5RCa">
      Add language
    </a>
  </li>
</ul>

_Note that some languages will produce unreadable anchor links, due to the way
the default slug function works. Consider using a Unicode-aware slug function,
as [documented here][2]._

  [1]: https://github.com/squidfunk/mkdocs-material/blob/master/src/partials/language/en.html
  [2]: setting-up-navigation.md#slugify

### Site language selector

[:octicons-file-code-24: Source][3] ·
:octicons-beaker-24: Experimental ·
[:octicons-heart-fill-24:{: .tx-heart } Insiders only][3]{: .tx-insiders }

If your documentation is available in multiple languages, a _language selector_
can be added to the header next to the search bar. Languages can be defined via
`mkdocs.yml`:

``` yaml
extra:
  alternate:
    - name: English
      link: https://squidfunk.github.io/mkdocs-material-insiders/en/
      lang: en
    - name: Deutsch
      link: https://squidfunk.github.io/mkdocs-material-insiders/de/
      lang: de
    - name: 日本語
      link: https://squidfunk.github.io/mkdocs-material-insiders/jp/
      lang: jp
```

This will render a language selector in the header next to the search bar:

  [![Language selection][4]][4]

  [3]: ../insiders.md
  [4]: ../assets/screenshots/language-selection.png

This assumes that your project is structured into multiple subfolders, each of
which contain the entire documentation for a given language, e.g.:

``` sh
.
├─ en/
│  ├─ docs/
│  └─ mkdocs.yml
├─ de/
│  ├─ docs/
│  └─ mkdocs.yml
└─ jp/
   ├─ docs/
   └─ mkdocs.yml
```

### Site search language

[:octicons-file-code-24: Source][5] ·
:octicons-milestone-24: Default: _automatically set_

Some languages, like Arabic or Japanese, need dedicated stemmers for search to
work properly. Material for MkDocs relies on [lunr-languages][6] to provide this
functionality. See the guide detailing how to [set up site search][7] for
more information.

  [5]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/javascripts/integrations/search/worker/main/index.ts#L77-L108
  [6]: https://github.com/MihaiValentin/lunr-languages
  [7]: setting-up-site-search.md

### Directionality

[:octicons-file-code-24: Source][8] ·
:octicons-milestone-24: Default: _automatically set_

While many languages are read `ltr` (left-to-right), Material for MkDocs also
supports `rtl` (right-to-left) _directionality_ which is inferred from the
selected language, but can also be set with:

``` yaml
theme:
  direction: ltr
```

:material-cursor-default-click-outline: Click on a tile to change the
directionality:

<div class="tx-switch">
  <button data-md-dir="ltr"><code>ltr</code></button>
  <button data-md-dir="rtl"><code>rtl</code></button>
</div>

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

  [8]: https://github.com/squidfunk/mkdocs-material/blob/master/src/base.html#L185

## Customization

### Custom translations

[:octicons-file-code-24: Source][1] ·
:octicons-mortar-board-24: Difficulty: _easy_

If you want to customize some (or all) of the translations for your language,
you may follow the guide on [theme extension][9] and create a new partial in
`partials/language`, e.g. `en-custom.html`. Next, look up the translation you
want to change in the [base translation][1] and add it to the partial.

Let's say you want to change "__Table of contents__" to "__On this page__":

``` html
{% macro t(key) %}{{ {
  "toc.title": "On this page"
}[key] }}{% endmacro %}
```

Then, add the following lines to `mkdocs.yml`:

``` yaml
theme:
  language: en-custom
```

  [9]: ../customization.md#extending-the-theme
