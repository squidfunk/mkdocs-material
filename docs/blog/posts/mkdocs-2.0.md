---
date:
  created: 2026-02-18
  updated: 2026-03-22
authors:
  - squidfunk
  - alexvoss
  - katharinalisalin
categories:
  - General
description: >
  MkDocs 2.0 is a ground-up rewrite of the documentation tool tens of thousands of projects rely on, introducing potentially significant breaking changes
slug: mkdocs-2.0
---


# What MkDocs 2.0 means for your documentation projects

Last update: March 27, 2026 – see [update log].

---

__Three weeks ago, MkDocs 2.0 was announced – a ground-up rewrite of the documentation tool tens of thousands of projects rely on, introducing potentially significant breaking changes.__

Material for MkDocs depends on MkDocs as its underlying framework and central dependency. We maintain Material for MkDocs, but we have no control over MkDocs itself.

We've taken the time to thoroughly evaluate and test the [MkDocs 2.0 pre-release] and want to share our findings, including what it might mean for your documentation projects, and where [Zensical], our new static site generator that is _compatible with MkDocs 1.x_, fits into the picture.

__If you've missed it__: [MkDocs 1.x is unmaintained], with issues and PRs piling up and no releases in the past 18 months, and seemingly no plans to fix long-standing issues like [live-reload problems]. More importantly, it's unclear whether security issues will be addressed, and whether the project will receive any updates at all in the future.

_Please note that MkDocs 2.0 is still in pre-release, and the information in this article is based on the current state of the project. We keep it updated as we learn more._

  [MkDocs 2.0 pre-release]: https://github.com/encode/mkdocs
  [Zensical]: zensical.md
  [update log]: #updates

<!-- more -->

## What's changing in MkDocs 2.0

Based on the [official announcement], the published [roadmap], and several prior comments and statements from the project's maintainer, MkDocs 2.0 is intended as a ground-up rewrite of the project to reduce complexity – and it comes with some important trade-offs:

- __MkDocs 2.0 is incompatible with Material for MkDocs__ – If your documentation is built with Material for MkDocs, it will cease to work with MkDocs 2.0. Material for MkDocs makes extensive use of the templating and plugin systems of MkDocs 1.x, and the changes that MkDocs 2.0 introduces are not backward-compatible.

- __MkDocs 2.0 won't have a plugin system__ – MkDocs 2.0 is being rewritten with a focus on theming, deliberately [removing plugin support to simplify the codebase]. We believe [the plugin ecosystem] is one of the cornerstones of MkDocs' success and widespread adoption, and its removal will affect workflows and customizations that teams have built over time.

- __MkDocs 2.0 brings breaking changes for themes__ – MkDocs 2.0 comes with a completely rewritten theming system. For instance, [navigation is passed to themes as pre-rendered HTML] rather than structured data. This makes it technically impossible to implement features like navigation tabs, collapsible sections, and other advanced navigation patterns.

    It also limits how navigation can be styled in themes, since the HTML of the navigation cannot be adjusted to fit the theme's structure and design.

- __MkDocs 2.0 has a closed contribution model__ – MkDocs 2.0 moves to a "maintainer-driven issues" model, where community members are [asked not to open issues or pull requests], and "feature requests are generally not accepted". It's unclear how users should report bugs or seek fixes when they encounter problems.

- __MkDocs 2.0 is currently unlicensed__ – MkDocs 2.0 doesn't specify a license, which has implications for how it can be used and contributed to by the community. It's unclear what the rationale behind this decision is, but it should be critically evaluated by teams and organizations that rely on MkDocs for their documentation projects.

- __MkDocs 2.0 has a new configuration format__ – MkDocs 2.0 uses TOML for configuration, which is incompatible with the YAML format used in MkDocs 1.x. As a result, existing `mkdocs.yml` files will currently not work with MkDocs 2.0. There is no migration path for existing projects.

A release date has not been announced, so planning around a specific timeline remains difficult. However, the direction of travel has been hinted at by the maintainer on several occasions, and the pre-release version already confirms the impact of these changes on existing projects.

  [official announcement]: https://github.com/mkdocs/mkdocs/discussions/4077
  [roadmap]: https://github.com/squidfunk/mkdocs-material/issues/8478#issuecomment-3778358483
  [asked not to open issues or pull requests]: https://github.com/encode/mkdocs?tab=contributing-ov-file#maintainer-driven-issues
  [removing plugin support to simplify the codebase]: https://github.com/mkdocs/mkdocs/discussions/3815#discussioncomment-10398312
  [the plugin ecosystem]: https://github.com/mkdocs/catalog?tab=readme-ov-file#contents
  [navigation is passed to themes as pre-rendered HTML]: https://www.encode.io/mkdocs/styling/#templates
  [MkDocs 1.x is unmaintained]: https://github.com/mkdocs/mkdocs/discussions/4010
  [live-reload problems]: https://github.com/squidfunk/mkdocs-material/issues/8478

## What this means for you

It's worth paying attention: the long-term direction of MkDocs is shifting in ways that diverge from how many documentation teams – and their tooling – currently operate.

While your existing MkDocs projects should continue to work today, be aware that future updates to MkDocs 1.x are unlikely. MkDocs 2.0, in its current form, is not a drop-in replacement for MkDocs 1.x, and does not provide a clear migration path for existing projects.

??? info "How to disable the MkDocs 2.0 incompatibility warning"

    Starting in Material for Mkdocs 9.7.2, a warning is printed during a build about the upcoming MkDocs 2.0 changes. We added this warning to ensure users are aware of the potential impact of MkDocs 2.0 on their projects, and to encourage them to evaluate their options and plan accordingly.

    To disable this warning, set this environment variable:

    ``` bash
    export NO_MKDOCS_2_WARNING=1
    ```

## We raised concerns early

All of this isn't coming as a surprise to us, given that the maintainer has presented his plans in an open video call [back in August 2024]. Since it was unclear whether the maintainer would follow through with these plans, we only mentioned it in a footnote, but the pre-release version of MkDocs 2.0 confirms that there will be significant breaking changes for existing projects:

Here's a summary of [the timeline of events]:

> After [we raised this issue] with the maintainers of MkDocs [...], and [maintainership changed] mid 2024, work on a [ground-up rewrite] that aims to address slow reloads by [rendering only the page currently being built] has started. It's still unclear how this rewrite will integrate with the requirements of existing plugins. Complex plugins such as [mkdocstrings], or our [built-in blog] and [tags] plugins require a coordinated build of all pages to accurately resolve links between pages and to computed resources, which cannot be determined without building the entire project.

> __Update__{ title="August 21, 2024" }: The new maintainer now publicly stated that he's working towards a new version of MkDocs that [does not require or support plugins], and mentions it will be equally capable through offering customization via templating, themes, and styling, which he also mentioned to us and several other users in [a team call on August 1]. In this call, [we raised objections multiple times] in regards to how this will impact the ecosystem, to no avail. No intention or roadmap for plugin support was provided. This development is orthogonal to our goal empowering users and organizations to adapt the core framework to their requirements by the means of modularity. We're working on resolving this situation, and will provide a way forward for our community.

The moment we learned about these plans, [we immediately started working] on what would eventually become [Zensical] – a new static site generator designed to be backward-compatible with MkDocs 1.x and a reliable long-term home for your existing documentation projects.

For years, we were trying to improve MkDocs from within. We authored [12 plugins], which gave us a deep understanding of the plugin API's limitations. We conducted quantitative and qualitative analyses of the ecosystem to identify where MkDocs was falling short and talked to dozens of organizations and key ecosystem members. We raised these issues and repeatedly got nowhere. When the new direction of MkDocs 2.0 became apparent, the thinking was already done.

We considered forking MkDocs, but quickly realized it wasn't viable: every plugin in the ecosystem has a direct dependency on `mkdocs`, which means forking MkDocs would require forking every single one of its [300 plugins] – __like moving an entire city at once__.[^1]

  [^1]:
    Forking is technically feasible by interposing on all MkDocs imports at runtime using Python's import hook machinery (i.e., custom `sys.meta_path` finders/loaders or `importlib` wrappers). In this model, one effectively shadows MkDocs modules by resolving import requests to alternative implementations, or by proxying and patching objects during module initialization.

    However, this approach fundamentally relies on strict API and behavioral compatibility with MkDocs' internal module graph. Because imports are resolved dynamically and cached after first load, any divergence in function signatures, class layouts, side effects, or import order can introduce subtle breakage. As a result, all internal APIs – not just the public surface – must be preserved with near-exact fidelity.

    In practice, this reduces the "fork" to a thin layer of indirection rather than a true divergence. Core functionality cannot be meaningfully refactored or redesigned without violating the implicit contracts embedded throughout the codebase. Consequently, the deeper systemic and structural limitations of MkDocs 1.x remain effectively unchanged under this strategy.

With forking being impractical, we had to start from scratch.

  [we immediately started working]: transforming-material-for-mkdocs.md
  [the timeline of events]: transforming-material-for-mkdocs.md#fn:7
  [back in August 2024]: https://github.com/mkdocs/mkdocs/discussions/3671#discussioncomment-10164237
  [300 plugins]: https://github.com/mkdocs/catalog?tab=readme-ov-file#contents
  [we raised this issue]: https://github.com/mkdocs/mkdocs/issues/3695
  [maintainership changed]: https://github.com/mkdocs/mkdocs/discussions/3677
  [ground-up rewrite]: https://github.com/mkdocs/sketch
  [rendering only the page currently being built]: https://github.com/mkdocs/mkdocs/issues/3695#issuecomment-2117939743
  [mkdocstrings]: https://mkdocstrings.github.io/
  [built-in blog]: ../../plugins/blog.md
  [tags]: ../../plugins/tags.md
  [does not require or support plugins]: https://github.com/mkdocs/mkdocs/discussions/3815#discussioncomment-10398312
  [a team call on August 1]: https://github.com/mkdocs/mkdocs/discussions/3671#discussioncomment-10164237
  [we raised objections multiple times]: https://github.com/mkdocs/mkdocs/discussions/3671#discussioncomment-10215445
  [a reliable, backward-compatible home]: https://zensical.org/compatibility/
  [12 plugins]: ../../plugins/index.md

## Where Zensical comes in

[Zensical][website] is designed to be a __drop-in replacement for MkDocs 1.x__, with the goal of building your existing projects without any changes. _We're not fully there yet_ – supporting the most popular MkDocs plugins in the ecosystem is an ambitious undertaking – but it's our current focus, and we're fully committed to getting there.

Rather than turning this into a marketing pitch, we encourage you to read the [announcement post][Zensical] if you'd like to understand how Zensical differs from MkDocs and what you can already expect today. Additionally, the [compatibility section] on our website offers an overview of what features are already supported without changes.

We also encourage you to do your own research, evaluate the implications for your projects, and consider all available options. If you've relied on Material for MkDocs professionally, valued our work, and are looking for a clear path forward, we're offering [hands-on support for migration].

_If you have any questions, feel free to reach out to Kathi at hello@zensical.org._

## Updates

- __March 27, 2026__: In [Talk Python To Me #542](https://talkpython.fm/episodes/show/542), Martin Donath shares the backstory of Zensical, and reflects on the lessons learned maintaining  Material for MkDocs for almost a decade.

- __March 22, 2026__: In _[The Slow Collapse of MkDocs]_, Florian Maas outlines the entire timeline of events starting in 2014 that eventually led to the fracturing of the MkDocs ecosystem.

- __March 10, 2026__: We released 9.7.5, which limits the version range of MkDocs to `<2`. This ensures that your builds will continue to work, even if MkDocs 2.0 is released.

- __March 10, 2026__: Access to the `mkdocs` package for the maintainers removed on March 9 [seems to have been restored](https://github.com/orgs/ProperDocs/discussions/1#discussioncomment-16060966), including the original creator of MkDocs.

- __March 9, 2026__: One of the previous maintainers [changed ownership of the `mkdocs` package on PyPI](https://web.archive.org/web/20260310162839/https://github.com/mkdocs/mkdocs/discussions/4089)[^2], removing access for all other maintainers, including the original creator of MkDocs.

[^2]:
  The link points to the web archive, as the original post has been edited multiple times by the previous maintainer.

- __March 4, 2026__: We added a paragraph explaining that prior attempts on resolving the situation were unsuccessful and why we decided to find a new path for our community.

- __March 3, 2026__: We added a paragraph on the new contribution model that MkDocs 2.0 is adopting, and the implications for users and contributors from our perspective.

- __February 27, 2026__: We added a note on the `NO_MKDOCS_2_WARNING` environment variable to disable the MkDocs 2.0 incompatibility warning in Material for MkDocs.

- __February 19, 2026__: The published MkDocs 2.0 roadmap was deleted. The link now points to an issue comment that contains a screenshot of the last available version of the roadmap.

- __February 13, 2026__: The mention of compatibility planned for MkDocs 1.x and MkDocs 2.0 projects was removed from the MkDocs 2.0 [`README.md`](https://github.com/encode/mkdocs/commit/313d3e8#diff-b335630551682c19a781afebcf4d07bf978fb1f8ac04c6bf87428ed5106870f5L52).

  [The Slow Collapse of MkDocs]: https://fpgmaas.com/blog/collapse-of-mkdocs/
  [compatibility section]: https://zensical.org/compatibility/features/
  [hands-on support for migration]: https://zensical.org/spark/
  [website]: https://zensical.org
  [why we built Zensical]: zensical.md
  [feature parity]: https://zensical.org/compatibility/features/
  [module system]: https://zensical.org/about/roadmap/#module-system
