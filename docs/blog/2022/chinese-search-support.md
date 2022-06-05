---
template: overrides/blog.html
title: Chinese search support
description: >
  Insiders adds Chinese language support for the built-in search plugin – a 
  feature that has been requested many times
hide:
  - feedback
---

# Chinese search support – 中文搜索​支持

__Insiders adds experimental Chinese language support for the [built-in search 
plugin] – a feature that has been requested for a long time given the large
number of Chinese users.__

<aside class="mdx-author" markdown>
![@squidfunk][@squidfunk avatar]

<span>__Martin Donath__ · @squidfunk</span>
<span>
:octicons-calendar-24: May 5, 2022 ·
:octicons-clock-24: 3 min read ·
[:octicons-tag-24: 8.2.13+insiders-4.14.0][insiders-4.14.0]
</span>
</aside>

  [built-in search plugin]: ../../setup/setting-up-site-search.md#built-in-search-plugin
  [@squidfunk avatar]: https://avatars.githubusercontent.com/u/932156
  [insiders-4.14.0]: ../../insiders/changelog.md#4.14.0

---

After the United States and Germany, the third-largest country of origin of
Material for MkDocs users is China. For a long time, the [built-in search plugin]
didn't allow for proper segmentation of Chinese characters, mainly due to 
missing support in [lunr-languages] which is used for search tokenization and
stemming. The latest Insiders release adds long-awaited Chinese language support
for the built-in search plugin, something that has been requested by many users.

_Material for MkDocs終於​支持​中文​了！文本​被​正確​分割​並且​更​容易​找到。_
{ style="display: inline" }

_This article explains how to set up Chinese language support for the built-in
search plugin in a few minutes._
{ style="display: inline" }

  [lunr-languages]: https://github.com/MihaiValentin/lunr-languages

## Configuration

Chinese language support for Material for MkDocs is provided by [jieba], an
excellent Chinese text segmentation library. If [jieba] is installed, the
built-in search plugin automatically detects Chinese characters and runs them
through the segmenter. You can install [jieba] with:

```
pip install jieba
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
  [zero-width whitespace]: https://en.wikipedia.org/wiki/Zero-width_space
  [separator]: ../../setup/setting-up-site-search.md#separator
  [q=支持]: ?q=支持
  [open an issue]: https://github.com/squidfunk/mkdocs-material/issues/new/choose
