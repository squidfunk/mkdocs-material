---
date: 2025-11-05
authors:
  - squidfunk
  - alexvoss
  - katharinalisalin
  - pawamoy
categories:
  - General
description: >
  tbd
title: Insiders – Now free for everyone
slug: insiders-now-free-for-everyone
---

# Material for MkDocs Insiders – Now free for everyone

__[9.7.0], the final version of Material for MkDocs, includes all features that were previously exclusive to sponsors, making Material for MkDocs Insiders available to everyone!__

As we're shifting our efforts to [Zensical], Material for MkDocs is entering [maintenance mode]. This means that while we'll continue to fix critical bugs and security issues for 12 month at least, no new features will be added to Material for MkDocs.

We're also discontinuing our sponsorware model, saying [goodbye to GitHub Sponsors]. If you were a sponsor of our work, you already received an email mentioning that your sponsorship was cancelled. As one of the numerous individuals and organizations sponsoring Material for MkDocs over the past years – thank you! Your continued support has been invaluable.

Now, we want everyone to benefit from all features we have developed for Material for MkDocs, which is why we're making all Insiders features available to everyone!

This is the logical next step in our journey as we focus on Zensical – our next-generation static site generator built from the ground up to overcome MkDocs' technical limitations. Zensical is fully [Open Source, licensed under MIT], maintains [compatibility with Material for MkDocs], and can build your existing projects with minimal changes.

In the coming months, we'll close the [feature parity] gap, bringing the expressiveness of Material for MkDocs to Zensical.

_You can subscribe to [our newsletter] to stay in the loop_.

<!-- more -->

  [9.7.0]: ../../changelog/index.md#9.7.0
  [Zensical]: https://zensical.org
  [maintenance mode]: https://github.com/squidfunk/mkdocs-material/issues/8523
  [goodbye to GitHub Sponsors]: zensical.md#goodbye-github-sponsors
  [compatibility with Material for MkDocs]: zensical.md#maximum-compatibility
  [Open Source, licensed under MIT]: https://zensical.org/about/license/
  [feature parity]: https://zensical.org/compatibility/features/
  [our newsletter]: https://zensical.org/about/newsletter/

---

__This is the third article in a four-part series:__

1. [Transforming Material for MkDocs]
2. [Zensical – A modern static site generator built by the creators of Material for MkDocs]
3. Material for MkDocs Insiders – Now free for everyone
4. A path forward for our community <small>coming November 18, 2025</small>

  [Transforming Material for MkDocs]: transforming-material-for-mkdocs.md
  [Zensical – A modern static site generator built by the creators of Material for MkDocs]: zensical.md

## Available features

Our sponsors have enjoyed exclusive access to the following premium features
for quite some time. With the release of [9.7.0], all these features are now available to everyone:

<div class="mdx-columns" markdown>

- [x] [Blog plugin: pinned posts]
- [x] [Instant previews]
- [x] [Footnote tooltips]
- [x] [Tags plugin: advanced settings]
- [x] [Tags plugin: nested tags]
- [x] [Tags plugin: shadow tags]
- [x] [Stay on page when switching languages]
- [x] [Blog plugin: author profiles]
- [x] [Blog plugin: advanced settings]
- [x] [Projects plugin]
- [x] [Instant prefetching]
- [x] [Social plugin: custom layouts]
- [x] [Social plugin: background images]
- [x] [Code range selection]
- [x] [Code annotations: custom selectors]
- [x] [Privacy plugin: advanced settings]
- [x] [Optimize plugin]
- [x] [Navigation path] (Breadcrumbs)
- [x] [Typeset plugin]
- [x] [Privacy plugin: external links]

</div>

  [Optimize plugin]: ../../plugins/optimize.md
  [Navigation path]: ../../setup/setting-up-navigation.md#navigation-path
  [Blog plugin: advanced settings]: ../../setup/setting-up-a-blog.md#advanced-settings
  [Blog plugin: author profiles]: ../../setup/setting-up-a-blog.md#adding-author-profiles
  [Blog plugin: pinned posts]: ../../setup/setting-up-a-blog.md#pinning-a-post
  [Instant prefetching]: ../../setup/setting-up-navigation.md#instant-prefetching
  [Typeset plugin]: ../../plugins/typeset.md
  [Footnote tooltips]: ../../reference/footnotes.md#footnote-tooltips
  [Privacy plugin: external links]: ../../plugins/privacy.md#external-links
  [Privacy plugin: advanced settings]: ../../setup/ensuring-data-privacy.md#advanced-settings
  [Instant previews]: ../../setup/setting-up-navigation.md#instant-previews
  [Social plugin: custom layouts]: ../../setup/setting-up-social-cards.md#customization
  [Social plugin: background images]: ../../plugins/social.md#option.background_image
  [Code range selection]: ../../reference/code-blocks.md#code-selection-button
  [Code annotations: custom selectors]: ../../reference/code-blocks.md#custom-selectors
  [Stay on page when switching languages]: ../../setup/changing-the-language.md#stay-on-page
  [Projects plugin]: ../../plugins/projects.md
  [Tags plugin: nested tags]: ../../setup/setting-up-tags.md#nested-tags
  [Tags plugin: shadow tags]: ../../setup/setting-up-tags.md#shadow-tags
  [Tags plugin: advanced settings]: ../../setup/setting-up-tags.md#advanced-settings

!!! tip "[mkdocstrings Insiders is now free] as well"

    With [Timothée joining the Zensical team], he announced that all features previously reserved to his sponsors as part of [mkdocstrings] Insiders are now free for everyone as well!

  [mkdocstrings Insiders is now free]: https://pawamoy.github.io/posts/sunsetting-the-sponsorware-strategy/
  [Timothée joining the Zensical team]: zensical.md#were-growing-our-team
  [mkdocstrings]: https://mkdocstrings.github.io/

## How to upgrade

You can upgrade with the following command:

```
pip install --upgrade mkdocs-material
```

## Switching from Insiders

If you've been a user of Insiders, we recommend to switch to the community edition as soon as possible, as it includes all Insiders features. This will make it much easier to handle third-party contributions, since no personal access tokens are necessary.

__From now on, bug fixes that we make to Material for MkDocs will only be released to the community edition. Security vulnerabilities will be fixed in both editions.__

Thus, please adjust your `requirements.txt` and GitHub Actions workflows:

```diff
- pip install git+https://${GH_TOKEN}@github.com/squidfunk/mkdocs-material-insiders. git
+ pip install mkdocs-material

```

The Insiders repository itself will remain available for the next 6 months. When you build your project with Insiders, it will now show an informational message pointing to this blog post.

- __On February 1, 2026, this message will be turned into a warning__.
- __On May 1, 2026, the Insiders repository will be deleted__.

## Sunsetting preparation

Entering [maintenance mode], we're preparing Material for MkDocs for sunsetting.

!!! warning "Material for MkDocs is now in maintenance mode"

    We want to be transparent about the risks of staying on Material for MkDocs. With [MkDocs unmaintained] and facing fundamental supply chain concerns, we cannot guarantee Material for MkDocs will continue working reliably in the future. We're aware that transitioning takes time, which is why we commit to support it at least for the next 12 months, fixing critical bugs and security vulnerabilities as needed, but the path forward is with Zensical.

    If documentation plays a critical role in your organization, and you're worried how this might affect your business, consider joining [Zensical Spark](https://zensical.org/spark/), or feel free to schedule a call by reaching out at contact@zensical.org.

  [MkDocs unmaintained]: https://github.com/squidfunk/mkdocs-material/discussions/8461

### Deprecations

While we release all features to the general public, at the same time, we're deprecating the [Projects plugin] and the [Typeset plugin] due to maintainability issues. This means that these plugins will not receive any further updates, including no more bug fixes.

The reason for this decision is that both plugins rely on too many workarounds to make them work with MkDocs, and subsequently have been key motivators to create [Zensical]. If you rely on these plugins, and they work for your use case, you can of course continue to use them.

__With Zensical, we'll be shipping proper [sub-project support], including [internationalization] and [versioning], designing these features together with our professional users in [Zensical Spark].__

  [Zensical Spark]: https://zensical.org/spark/
  [sub-project support]: https://zensical.org/about/roadmap/#subprojects
  [internationalization]: https://zensical.org/about/roadmap/#internationalization
  [versioning]: https://zensical.org/about/roadmap/#versioning

### Version ranges

Material for MkDocs has used semver version ranges for dependencies to ensure compatibility. With the advent of [9.7.0], we're switching from semver to minimal version ranges. This provides more flexibility in dependency resolution, specifically to allow users to use newer versions of dependencies that include important bug fixes or security patches.

### Security

We will not transfer ownership of the Material for MkDocs repository to another individual or organization. The repository and PyPI package will remain under the ownership of @squidfunk, which preserves the trusted supply chain our users depend on.

Thus, if you wish to take on maintenance of Material for MkDocs, please create a fork.

## Looking ahead

### Achieving sustainability

Where Material for MkDocs relied on sponsorware, Zensical takes a new approach,
to ensure it evolves to meet the needs of organizations building complex, enterprise-scale documentation.

[Zensical Spark] is a collaborative space where professional users have a direct voice in shaping Zensical's future. Through a [structured design process] and together with our Zensical Spark members, we identify opportunities, validate proposals, and define priorities – turning their real-world documentation challenges into features that benefit the entire community.

Reach out at contact@zensical.org to schedule a call to learn more about Zensical Spark, discuss your organization's needs, and how it helps us to make Zensical sustainable.

  [Zensical Spark]: https://zensical.org/spark/
  [structured design process]: https://zensical.org/spark/methodology/#our-approach

### Our commitment to you

If you're currently using Material for MkDocs, there's no need to rush. We're committed to keeping it secure and functional for the next 12 months while we focus our efforts on [Zensical].

The [9.7.0] release marks a significant shift – every Insiders feature is now available to everyone, with no sponsorship required. As we build [Zensical], each of these features will be rearchitected and improved. Zensical is entirely free and Open Source, ensuring the entire community benefits from our work without barriers.

When you're ready to explore what's next, [Zensical is compatible with Material for MkDocs] and designed to be a natural evolution of the ideas and principles you already know.

_You can subscribe to [our newsletter] to stay in the loop_.

  [Zensical is compatible with Material for MkDocs]: zensical.md#maximum-compatibility
