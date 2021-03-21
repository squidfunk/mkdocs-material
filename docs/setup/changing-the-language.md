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

<div class="mdx-columns" markdown="1">

- `af` – Afrikaans
- `ar` – Arabic
- `bg` – Bulgarian
- `bn` – Bengali (Bangla)
- `ca` – Catalan
- `cs` – Czech
- `da` – Danish
- `de` – German
- `en` – English
- `eo` – Esperanto
- `es` – Spanish
- `et` – Estonian
- `fa` – Persian (Farsi)
- `fi` – Finnish
- `fr` – French
- `gl` – Galician
- `gr` – Greek
- `he` – Hebrew
- `hi` – Hindi
- `hr` – Croatian
- `hu` – Hungarian
- `id` – Indonesian
- `is` – Icelandic
- `it` – Italian
- `ja` – Japanese
- `ka` – Georgian
- `kr` – Korean
- `my` – Burmese
- `nl` – Dutch
- `nn` – Norwegian (Nynorsk)
- `no` – Norwegian
- `pl` – Polish
- `pt` – Portuguese
- `ro` – Romanian
- `ru` – Russian
- `sh` – Serbo-Croatian
- `si` – Sinhalese
- `sk` – Slovak
- `sl` – Slovenian
- `sr` – Serbian
- `sv` – Swedish
- `th` – Thai
- `tr` – Turkish
- `uk` – Ukrainian
- `vi` – Vietnamese
- `zh` – Chinese (Simplified)
- `zh-Hant` – Chinese (Traditional)
- `zh-TW` – Chinese (Taiwanese)
- [Add language](https://bit.ly/38F5RCa)

</div>

_Note that some languages will produce unreadable anchor links, due to the way
the default slug function works. Consider using a Unicode-aware slug function,
as [documented here][2]._

  [1]: https://github.com/squidfunk/mkdocs-material/blob/master/src/partials/languages/en.html
  [2]: setting-up-navigation.md#slugify

### Site language selector

[:octicons-file-code-24: Source][3] ·
:octicons-beaker-24: Experimental

If your documentation is available in multiple languages, a _language selector_
can be added to the header next to the search bar. Alternate languages can be
defined via `mkdocs.yml`:

``` yaml
extra:
  alternate:

    # Switch to English
    - name: English
      link: <your-site>/en/
      lang: en

    # Switch to German
    - name: Deutsch
      link: <your-site>/de/
      lang: de

    # Switch to Japanese
    - name: 日本語
      link: <your-site>/ja/
      lang: ja
```

This will render a language selector in the header next to the search bar:

[![Language selection][4]][4]

  [3]: https://github.com/squidfunk/mkdocs-material/blob/master/src/partials/header.html
  [4]: ../assets/screenshots/language-selection.png

### Site search language

[:octicons-file-code-24: Source][5] ·
:octicons-milestone-24: Default: _automatically set_

Some languages, like Arabic or Japanese, need dedicated stemmers for search to
work properly. Material for MkDocs relies on [lunr-languages][6] to provide this
functionality. See the guide detailing how to [set up site search][7] for
more information.

  [5]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/javascripts/integrations/search/worker/main/index.ts
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

Click on a tile to change the directionality:

<div class="mdx-switch">
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

  [8]: https://github.com/squidfunk/mkdocs-material/blob/master/src/base.html

## Customization

### Custom translations

[:octicons-file-code-24: Source][1] ·
:octicons-mortar-board-24: Difficulty: _easy_

If you want to customize some of the translations for your language, just follow
the guide on [theme extension][9] and create a new partial in
`partials/languages`, e.g. `en-custom.html`. Next, look up the translation you
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
