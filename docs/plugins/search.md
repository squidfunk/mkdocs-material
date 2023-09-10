---
title: Built-in search plugin
icon: material/magnify
---

# Built-in search plugin

## Objective

### How it works

  [lunr.js]: https://lunrjs.com/

### When to use it

## Configuration

<!-- md:version 9.0.0 --> ·
<!-- md:flag plugin [search] (built-in) -->

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

<!-- md:version 9.2.9 --> ·
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

<!-- md:version 9.0.0 --> ·
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
language-specific stemmers and stop words for [lunr.js] provided by the
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
Material for MkDocs will fall back to another language that yields the best
results. If you find that the search results are not satisfactory, you can
contribute to [lunr languages] by adding support for your language.

---

#### <!-- md:setting config.separator -->

<!-- md:version 9.0.0 --> ·
<!-- md:default computed -->



---

#### <!-- md:setting config.pipeline -->

### Segmentation

The following settings are available for segmentation:

---

#### <!-- md:setting config.jieba_dict -->

---

#### <!-- md:setting config.jieba_dict_user -->
