---
date: 2026-02-18
authors:
  - squidfunk
  - alexvoss
  - katharinalisalin
categories:
  - General
icon: fontawesome/solid-warning
description: >
  tbd
slug: mkdocs-2.0
---


# What MkDocs 2.0 means for your documentation projects

---

__Three weeks ago, MkDocs 2.0 was announced — a ground-up rewrite of the documentation tool tens of thousands of projects rely on, introducing potentially significant breaking changes.__

We've taken the time to thoroughly evaluate and test the pre-release version, and want to share what we know, what it might mean for your documentation projects, and where [Zensical], our new static site generator that is _compatible with MkDocs 1.x_, fits into the picture.

_Please note that MkDocs 2.0 is still in pre-release, and the information in this article is based on the current state of the project. We will keep it updated as we learn more._

  [Zensical]: zensical.md

<!-- more -->

## What's changing in MkDocs 2.0

Based on the [official announcement], the published [roadmap], and several prior comments and statements from the project's maintainer, MkDocs 2.0 is intended as a ground-up rewrite of the project to reduce complexity — and it comes with some important trade-offs:

- __MkDocs 2.0 won't have a plugin system__ – MkDocs 2.0 is being rewritten with a focus on theming, deliberately [removing plugin support to simplify the codebase]. We believe [the plugin ecosystem] is one of the cornerstones of MkDocs' success and wide-spread adoption, and its removal will affect workflows and customizations that teams have built over time.

- __MkDocs 2.0 brings breaking changes for themes__ – MkDocs 2.0 comes with a completely rewritten theming system. For instance, [navigation is passed to themes as pre-rendered HTML] rather than structured data. This makes it technically impossible to implement features like navigation tabs, collapsible sections, and other advanced navigation patterns.

    It also limits how navigation can be styled in themes, since the HTML of the navigation cannot be adjusted to fit the theme's structure and design.

- __MkDocs 2.0 is incompatible with Material for MkDocs__ – If your documentation is built with Material for MkDocs, it will cease to work with MkDocs 2.0. Material for MkDocs makes extensive use of the templating and plugin systems of MkDocs 1.x, and the changes that MkDocs 2.0 introduces are not backward-compatible.

- __MkDocs 2.0 has a new configuration format__ – MkDocs 2.0 uses TOML for configuration, which is entirely different from the YAML format used in MkDocs 1.x. As a result, existing `mkdocs.yml` files will currently do not work with MkDocs 2.0. There is currently no migration path for existing projects, but the [roadmap] mentions _legacy version support_.

- __MkDocs 2.0 is currently unlicensed__ – MkDocs 2.0 doesn't specify a license, which has implications for how it can be used and contributed to by the community. It's unclear what the rationale behind this decision is, but should be critically evaluated by teams and organizations that rely on MkDocs for their documentation projects.

A release date has not been announced, so planning around a specific timeline remains difficult. However, the direction of travel has been hinted at by the maintainer on several occasions, and the pre-release version already confirms the impact of these changes on existing projects.

Additionally, it's important to note that [MkDocs 1.x is unmaintained], with seemingly no plans to fix long-standing issues like [recent problems with live-reload].

  [official announcement]: https://github.com/mkdocs/mkdocs/discussions/4077
  [roadmap]: https://www.encode.io/mkdocs/roadmap/
  [removing plugin support to simplify the codebase]: https://github.com/mkdocs/mkdocs/discussions/3815#discussioncomment-10398312
  [the plugin ecosystem]: https://github.com/mkdocs/catalog?tab=readme-ov-file#contents
  [navigation is passed to themes as pre-rendered HTML]: https://www.encode.io/mkdocs/styling/#templates
  [MkDocs 1.x is unmaintained]: https://github.com/mkdocs/mkdocs/discussions/4010
  [recent problems with live-reload]: https://github.com/squidfunk/mkdocs-material/issues/8478

## What this means for you

It's worth paying attention: the long-term direction of MkDocs is shifting in ways that diverge from how many documentation teams — and their tooling — currently operate.

While your existing MkDocs projects should continue to work today, be aware that future updates to MkDocs 1.x are unlikely. MkDocs 2.0, in its current form, is not a drop-in replacement for MkDocs 1.x, and does not provide a clear migration path for existing projects.

## Where Zensical comes in

This is part of [why we built Zensical], our new static site generator, designed from the start to be [a reliable, backward-compatible home] for your existing MkDocs projects.

We've designed Zensical to be as compatible as possible with Material for MkDocs and with the broader MkDocs ecosystem. We maintain compatibility across these key areas:

- [x] __Build configuration__ – Use your existing `mkdocs.yml` file. No new config format to learn, and no need to create a `zensical.toml`.

- [x] __Content and front-matter__ – Python Markdown and all extensions work without changes. Your existing content builds as-is.

- [x] __Project structure and URLs__ – Files stay where they are. URLs and anchors remain identical, preserving bookmarks, external links, and SEO.

- [x] __Template overrides__ – Minor adjustments for MiniJinja compatibility (already shipped in recent Material for MkDocs versions). HTML structure remains unchanged.

- [x] __Custom CSS and JavaScript__ – Generated HTML, CSS variables, and JavaScript APIs remain compatible with your existing customizations.

We're working hard on [feature parity], bringing support to Zensical for the most popular MkDocs plugins, and ensuring that your existing projects can be migrated with minimal effort.

Additionally, we're working on a much more flexible [module system], which will supersede the plugin system of MkDocs 1.x and enable you to build custom features and integrations in a more maintainable way.

  [why we built Zensical]: zensical.md
  [a reliable, backward-compatible home]: https://zensical.org/compatibility/
  [feature parity]: https://zensical.org/compatibility/features/
  [module system]: https://zensical.org/about/roadmap/#module-system

## The story behind Zensical

@squidfunk joined the [Talk Python To Me] podcast to share Zensical's origin story, why we built it from scratch, and what's ahead of us. You can watch the full episode here:

<div style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe src="https://www.youtube.com/embed/V1BvvIPUzes?si=gLzT8zbjIc06-fmu" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
</div>

This episode will soon also be available as an audio-only episode on all major platforms.

  [Talk Python To Me]: https://talkpython.fm
