---
template: overrides/main.html
title: Blog
search:
  exclude: true
---

<style>
  .md-sidebar--secondary:not([hidden]) {
    visibility: hidden;
  }
</style>

# Blog

## [The past, present and future]

__2021 was a fantastic year for this project as we shipped many new awesome
features, saw significant user growth and leveraged GitHub Sponsors to make the
project sustainable.__

<aside class="mdx-author" markdown>
![@squidfunk][@squidfunk avatar]

<span>__Martin Donath__ · @squidfunk</span>
<span>
:octicons-calendar-24: December 27, 2021 ·
:octicons-clock-24: 10 min read
</span>
</aside>

  [@squidfunk avatar]: https://avatars.githubusercontent.com/u/932156

---

Today, together, MkDocs and Material for MkDocs are among the most popular
options when it comes to choosing a static site generator and theme for your
technical documentation project. Material for MkDocs ensures that your
content is always perfectly presented to your audience, regardless of screen
resolution or device capabilities. It has evolved to a framework for technical
writing, offering many features, some of which are yet to be found in other
static site generators. However, we're far from the end, as 2022 is going to
bring some interesting new capabilities.

  [:octicons-arrow-right-24: Continue reading][The past, present and future]

  [The past, present and future]: 2021/the-past-present-and-future.md

## [Excluding content from search]

__The latest Insiders release brings three new simple ways to exclude dedicated
parts of a document from the search index, allowing for more fine-grained
control.__

<aside class="mdx-author" markdown>
![@squidfunk][@squidfunk avatar]

<span>__Martin Donath__ · @squidfunk</span>
<span>
:octicons-calendar-24: September 26, 2021 ·
:octicons-clock-24: 5 min read ·
[:octicons-tag-24: 7.3.0+insiders-3.1.1][insiders-3.1.1]
</span>
</aside>

---

Two weeks ago, Material for MkDocs Insiders shipped a brand new search plugin,
yielding massive improvements in usability, but also in speed and size of the
search index. Interestingly, as discussed in the previous blog article, we only
scratched the surface of what's now possible. This release brings some useful
features that enhance the writing experience, allowing for more fine-grained
control of what pages, sections and blocks of a Markdown file should be indexed
by the built-in search functionality.

[:octicons-arrow-right-24: Continue reading][Excluding content from search]

  [Excluding content from search]: 2021/excluding-content-from-search.md
  [insiders-3.1.1]: ../insiders/changelog.md#3.1.1

## [Search: better, faster, smaller]

__This is the story of how we managed to completely rebuild client-side search,
delivering a significantly better user experience while making it faster and
smaller at the same time.__

<aside class="mdx-author" markdown>
![@squidfunk][@squidfunk avatar]

<span>__Martin Donath__ · @squidfunk</span>
<span>
:octicons-calendar-24: September 13, 2021 ·
:octicons-clock-24: 15 min read ·
[:octicons-tag-24: 7.2.6+insiders-3.0.0][insiders-3.0.0]
</span>
</aside>

---

The search of Material for MkDocs is by far one of its best and most-loved
assets: multilingual, offline-capable, and most importantly: _all client-side_.
It provides a solution to empower the users of your documentation to find what
they're searching for instantly without the headache of managing additional
servers. However, even though several iterations have been made, there's still
some room for improvement, which is why we rebuilt the search plugin and
integration from the ground up. This article shines some light on the internals
of the new search, why it's much more powerful than the previous version, and
what's about to come.

[:octicons-arrow-right-24: Continue reading][Search: better, faster, smaller]

  [Search: better, faster, smaller]: 2021/search-better-faster-smaller.md
  [insiders-3.0.0]: ../insiders/changelog.md#3.0.0
