---
template: overrides/main.html
---

# Changing the language

Material for MkDocs supports internationalization (i18n) and provides
translations for template variables and labels in 50+ languages. Additionally,
the site search can be configured to use a language-specific stemmer, if
available.

## Configuration

### Site language

[:octicons-tag-24: 1.12.0][language support] ·
:octicons-milestone-24: Default: `en`

You can set the site language in `mkdocs.yml` with:

``` yaml
theme:
  language: en # (1)!
```

1.  HTML5 only allows to set a [single language per document], which is why
    Material for MkDocs only supports setting a canonical language for the
    entire project, i.e. one per `mkdocs.yml`.

    The easiest way to build a multi-language documentation is to create one
    project in a subfolder per language, and then use the [language selector]
    to interlink those projects.

The following languages are supported:

<div class="mdx-columns" markdown>

- `af` – Afrikaans
- `ar` – Arabic
- `bg` – Bulgarian
- `bn` – Bengali (Bangla)
- `ca` – Catalan
- `cs` – Czech
- `da` – Danish
- `de` – German
- `el` – Greek
- `en` – English
- `eo` – Esperanto
- `es` – Spanish
- `et` – Estonian
- `fa` – Persian (Farsi)
- `fi` – Finnish
- `fr` – French
- `gl` – Galician
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
- `lv` – Latvian
- `mk` – Macedonian
- `mn` – Mongolian
- `ms` – Bahasa Malaysia
- `my` – Burmese
- `nl` – Dutch
- `nn` – Norwegian (Nynorsk)
- `no` – Norwegian
- `pl` – Polish
- `pt` – Portuguese
- `pt-BR` – Portuguese (Brasilian)
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
- `uz` – Uzbek
- `vi` – Vietnamese
- `zh` – Chinese (Simplified)
- `zh-Hant` – Chinese (Traditional)
- `zh-TW` – Chinese (Taiwanese)
- [Add language]

</div>

Note that some languages will produce unreadable anchor links due to the way
the default slug function works. Consider using a [Unicode-aware slug function].

  [language support]: https://github.com/squidfunk/mkdocs-material/releases/tag/1.12.0
  [single language per document]: https://www.w3.org/International/questions/qa-html-language-declarations.en#attributes
  [language selector]: #site-language-selector
  [Unicode-aware slug function]: extensions/python-markdown.md#toc-slugify
  [Add language]: https://github.com/squidfunk/mkdocs-material/issues/new?template=translate.yml&title=New+language%3A+%7Breplace+with+language+name%7D

### Site language selector

[:octicons-tag-24: 7.0.0][alternate support] ·
:octicons-milestone-24: Default: _none_ ·
:octicons-beaker-24: Experimental

If your documentation is available in multiple languages, a language selector
pointing to those languages can be added to the header. Alternate languages
can be defined via `mkdocs.yml`.

``` yaml
extra:
  alternate:
    - name: English
      link: /en/ # (1)!
      lang: en
    - name: Deutsch
      link: /de/
      lang: de
```

1.  Note that this must be an absolute link. If it includes a domain part, it's
    used as defined. Otherwise the domain part of the [`site_url`][site_url] as
    set in `mkdocs.yml` is prepended to the link.

The following properties are available for each alternate language:

`name`{ #language-name }

:   :octicons-milestone-24: Default: _none_ · :octicons-alert-24: Required –
    This value of this property is used inside the language selector as the
    name of the language and must be set to a non-empty string.

`link`{ #language-link }

:   :octicons-milestone-24: Default: _none_ · :octicons-alert-24: Required –
    This property must be set to an absolute link, which might also point to
    another domain or subdomain not necessarily generated with MkDocs.

`lang`{ #language-lang }

:   :octicons-milestone-24: Default: _none_ · :octicons-alert-24: Required –
    This property must contain an [ISO 639-1 language code] and is used for
    the `hreflang` attribute of the link, improving discoverability via search
    engines.

[![Language selector preview]][Language selector preview]

  [alternate support]: https://github.com/squidfunk/mkdocs-material/releases/tag/7.0.0
  [site_url]: https://www.mkdocs.org/user-guide/configuration/#site_url
  [ISO 639-1 language code]: https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
  [Language selector preview]: ../assets/screenshots/language-selection.png

### Directionality

[:octicons-tag-24: 2.5.0][direction support] ·
:octicons-milestone-24: Default: _automatically set_

While many languages are read `ltr` (left-to-right), Material for MkDocs also
supports `rtl` (right-to-left) directionality which is deduced from the
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
      var name = document.querySelector("#__code_3 code span.l")
      name.textContent = attr
    })
  })
</script>

  [direction support]: https://github.com/squidfunk/mkdocs-material/releases/tag/2.5.0

## Customization

### Custom translations

If you want to customize some of the translations for a language, just follow
the guide on [theme extension] and create a new partial in the `overrides`
folder. Then, import the [translations] of the language as a fallback and only
adjust the ones you want to override:

=== ":octicons-file-code-16: overrides/partials/languages/custom.html"

    ``` html
    <!-- Import translations for language and fallback -->
    {% import "partials/languages/de.html" as language %}
    {% import "partials/languages/en.html" as fallback %} <!-- (1)! -->

    <!-- Define custom translations -->
    {% macro override(key) %}{{ {
      "source.file.date.created": "Erstellt am", <!-- (2)! -->
      "source.file.date.updated": "Aktualisiert am"
    }[key] }}{% endmacro %}

    <!-- Re-export translations -->
    {% macro t(key) %}{{
      override(key) or language(key) or fallback.t(key)
    }}{% endmacro %}
    ```

    1.  Note that `en` must always be used as a fallback language, as it's the
        default theme language.

    2.  Check the [list of available languages], pick the translation you want
        to override for your language and add them here.

=== ":octicons-file-code-16: mkdocs.yml"

    ``` yaml
    theme:
      language: custom
    ```

  [theme extension]: ../customization.md#extending-the-theme
  [translations]: https://github.com/squidfunk/mkdocs-material/blob/master/src/partials/languages/
  [list of available languages]: https://github.com/squidfunk/mkdocs-material/blob/master/src/partials/languages/
