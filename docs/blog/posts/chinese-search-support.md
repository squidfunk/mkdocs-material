---
date: 2022-05-05
authors: [squidfunk]
title: Chinese search support
description: >
  Insiders adds Chinese language support for the built-in search plugin – a
  feature that has been requested many times
categories:
  - Search
links:
  - blog/posts/search-better-faster-smaller.md
  - plugins/search.md#segmentation
  - insiders/how-to-sponsor.md
---

# Chinese search support – 中文搜索​支持

__Insiders adds experimental Chinese language support for the [built-in search
plugin] – a feature that has been requested for a long time given the large
number of Chinese users.__

After the United States and Germany, the third-largest country of origin of
Material for MkDocs users is China. For a long time, the [built-in search plugin]
didn't allow for proper segmentation of Chinese characters, mainly due to
missing support in [lunr-languages] which is used for search tokenization and
stemming. The latest Insiders release adds long-awaited Chinese language support
for the built-in search plugin, something that has been requested by many users.

<!-- more -->

_Material for MkDocs終於​支持​中文​了！文本​被​正確​分割​並且​更​容易​找到。_
{ style="display: inline" }

_This article explains how to set up Chinese language support for the built-in
search plugin in a few minutes._
{ style="display: inline" }

  [built-in search plugin]: ../../plugins/search.md
  [lunr-languages]: https://github.com/MihaiValentin/lunr-languages

## Configuration

Chinese language support for Material for MkDocs is provided by [jieba], an
excellent Chinese text segmentation library. If [jieba] and [regex] packages
are installed, the built-in search plugin automatically detects Chinese
characters and runs them through the segmenter. You can install them with:

```
pip install jieba regex
```

The next step is only required if you specified the [`separator`][separator]
configuration in `mkdocs.yml`. Text is segmented with [zero-width whitespace]
characters, so it renders exactly the same in the search modal. Adjust
`mkdocs.yml` so that the [`separator`][separator] includes the `\u200b`
character:

``` yaml
plugins:
  - search:
      separator: '[\s\u200b\-]'
```

That's all that is necessary.

## Usage

If you followed the instructions in the configuration guide, Chinese words will
now be tokenized using [jieba]. Try searching for
[:octicons-search-24: 支持][q=支持] to see how it integrates with the
built-in search plugin.

---

Note that this is an experimental feature, and I, @squidfunk, am not
proficient in Chinese (yet?). If you find a bug or think something can be
improved, please [open an issue].

  [jieba]: https://pypi.org/project/jieba/
  [regex]: https://pypi.org/project/regex/
  [zero-width whitespace]: https://en.wikipedia.org/wiki/Zero-width_space
  [separator]: ../../plugins/search.md#config.separator
  [q=支持]: ?q=支持
  [open an issue]: https://github.com/squidfunk/mkdocs-material/issues/new/choose
