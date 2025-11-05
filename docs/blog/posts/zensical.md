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
  We are thrilled to announce Zensical, our next-gen static site generator
  that addresses and overcomes the technical limitations of MkDocs
social:
  cards_layout: default/only/image
  cards_layout_options:
    background_image: docs/assets/images/zensical-social.png
title: Zensical - A modern static site generator
slug: zensical
---

# Zensical – A modern static site generator built by the Material for MkDocs team

__We are thrilled to announce [Zensical], our next-gen static site generator designed to simplify the process of building documentation sites. Distilled from a decade of experience, Zensical is our effort to overcome the technical limitations of MkDocs, reaching far beyond its capabilities.__

Zensical is the result of thousands of hours of work – built from the ground up for a modern and comfortable authoring experience, while making it easy for developers to extend and customize Zensical through its upcoming module system. Our goal is to support docs-as-code workflows with tens of thousands of pages, without compromising performance or usability.

To make the transition seamless, [compatibility] comes first. We're putting significant effort into ensuring a smooth migration from Material for MkDocs for all users. Zensical can natively read `mkdocs.yml`, allowing you to build your existing project with minimal changes. As of now, a subset of plugins is supported, and we're working on feature parity in the coming months.

Zensical is fully Open Source, licensed under MIT, and can be used for any purpose, including for commercial use. We're also saying goodbye to our sponsorware model, replacing it with our new offering for professional users: [Zensical Spark]. This allows us to stay independent, maximizing user value, as we shape the future of Zensical together with you.

_You can subscribe to [our newsletter] to stay in the loop_.

<!-- more -->

  [Zensical]: https://zensical.org/
  [compatibility]: #maximum-compatibility
  [Zensical Spark]: #zensical-spark
  [our newsletter]: https://zensical.org/about/newsletter/

---

__This is the second article in a four-part series:__

1. [Transforming Material for MkDocs]
2. Zensical – A modern static site generator built by the creators of Material for MkDocs.
3. What happens to the features in Insiders <small>coming November 11, 2025</small>
4. A path forward for our community <small>coming November 18, 2025</small>

  [Transforming Material for MkDocs]: ./transforming-material-for-mkdocs.md

## Why Zensical?

Since its initial release in 2016, Material for MkDocs has helped tens of thousands of teams to publish and maintain reliable documentation. However, in recent years, it has become apparent that we were running up against limitations of our core dependency, MkDocs. These limitations proved impossible to overcome as they are deeply rooted in its architecture.

We also mentioned in our [update on our foundational work] that MkDocs must be considered a supply chain risk, since it's unmaintained since August 2024. It has seen no releases in over a year and is accumulating unresolved issues and pull requests. These developments have forced us to cut our ties to MkDocs as a dependency.

In order to map out a path forward, we went back to the drawing board, talked to dozens of our professional users and thoroughly analyzed the MkDocs ecosystem. We didn't just want to create a fork or port of MkDocs, but decided to rethink static site generation from first principles.

With Zensical, we are creating a modern static site generator, which is compatible with your content and customizations, and addresses MkDocs' limitations. While Material for MkDocs is built on top of MkDocs, __Zensical consolidates both projects into one coherent stack__, covering static site generation, theming, and customization. What you can expect today:

- [5x faster rebuilds](#authoring-experience)
- [Modern design](#modern-design)
- [Blazing-fast search](#blazing-fast-search)

Although we haven't reached full feature parity yet, you can already use Zensical to build your existing Material for MkDocs projects with minimal changes.

_You can jump to the [compatibility] section to learn what is already supported._

  [update on our foundational work]: https://github.com/squidfunk/mkdocs-material/discussions/8461

## What you can expect

### Solid foundation

Our goal with Zensical is to create a coherent and modern stack, vertically integrating all parts of the authoring experience (AX), developer experience (DX), and user experience (UX). This gives us a significant competitive advantage over solutions that overly rely on third-party frameworks and dependencies, helping us to create much more robust Open Source software.

[ZRX], our new differential build engine, creates a solid foundation for Zensical, and is an Open Source project of its own. It's a fresh take on making differential data flows easy to build and a joy to work with. Most engineering effort has gone into ZRX, as it forms the backbone of Zensical, and will allow us to ship features faster.

Following the principle of architectural hoisting, we moved essential, reusable functionality into ZRX, which allows us to keep Zensical's core simple and focused on static site generation. ZRX handles the heavy lifting – differential builds, caching, and data flow orchestration.

With the upcoming [module system] and [component system], both of which are on our public [roadmap], Zensical will gain more degrees of freedom in the coming months, allowing you to extend and customize Zensical in ways that were previously impossible with MkDocs.

  [ZRX]: https://github.com/zensical/zrx/
  [module system]: https://zensical.org/about/roadmap/#module-system
  [component system]: https://zensical.org/about/roadmap/#component-system

### Modern design

Zensical brings a fresh, modern design that breaks out of the Materal Design aesthetic, creating a visual foundation that is more easily brandable and adaptable to different use cases. The new design prioritizes clarity, simplicity, and usability, while having a more professional finish:

<figure markdown>

![Zensical](./zensical/screenshot.png#gh-light-mode-only)
![Zensical](./zensical/screenshot-dark.png#gh-dark-mode-only)


  <figcaption markdown>Our public [roadmap], built with Zensical</figcaption>
</figure>

Right now, the layout and site structure of Zensical match Material for MkDocs closely, as we're focusing on ensuring maximum compatibility. Once we finish work on our upcoming [component system], we'll provide an alternative that is much more flexible and adaptable, and can be tailored to different use cases and branding requirements more easily.

_You can also keep the Material for MkDocs look and feel with a single line of configuration._

  [roadmap]: https://zensical.org/about/roadmap/

### Blazing-fast search

Client-side search isn't a compromise – for the vast majority of static sites, it's the best solution, since it's faster, involves zero maintenance, and doesn't require you to pay for a service.

As covered in depth in [the first part of this series], the current search implementation in Material for MkDocs has severe limitations, and is based on a now unmaintained library, which is why we decided to build a new search engine from scratch. It's based on the same goals as Zensical itself: performance, flexibility, and extensibility.

Disco, our modular and blazing-fast client-side search engine, is exclusively available in Zensical. When you build your site with Zensical, your users will immediately benefit from Disco's improved ranking algorithm, as well as its filtering and aggregation capabilities:

  [the first part of this series]: transforming-material-for-mkdocs.md#search-and-discovery

<figure markdown>

![Zensical](./zensical/screenshot-search.png#gh-light-mode-only)
![Zensical](./zensical/screenshot-search-dark.png#gh-dark-mode-only)

  <figcaption markdown>Disco on [zensical.org]</figcaption>
</figure>

In early 2026, we'll be releasing Disco as a standalone Open Source project. With the feedback of our professional users in [Zensical Spark], we're going to evolve the search experience, turning Disco into a highly configurable and customizable search engine that adapts to your needs.

_You can subscribe to [our newsletter] to receive news about Disco_.

  [zensical.org]: https://zensical.org/

### Authoring experience

Slow feedback loops can be a major pain point when writing documentation. Almost all of us know the feeling of waiting for the static site generator to finish building the site, just to see a small change reflected in the output. With Zensical, we're finally addressing this issue.

It's important to understand that we're not yet utilizing the differential capabilities of [ZRX] to the fullest extent, as we're forced to make several compromises to ensure maximum [compatibility] with Material for MkDocs at the moment. Markdown rendering needs to go through Python Markdown, which forces us to pay for extra marshalling costs.

While the initial build can sometimes be slower than with MkDocs, repeated builds – especially when serving the site – are already 4 to 5x faster, as only changed files need to be rebuilt.

We're also working on a new Markdown toolchain based on a CommonMark-compliant parser written in Rust, which will make Markdown processing significantly faster. We'll be tackling this as part of the upcoming [component system], which we'll start working on in early 2026. Once our new Markdown toolchain is ready, we'll provide automated tools to translate between Python Markdown and CommonMark, so you don't need to manually migrate your content.

### Maximum compatibility

Compatibility with Material for MkDocs is our top priority. We understand that switching to a new static site generator can be challenging, especially for large projects with many customizations. Therefore, we've put significant effort into ensuring that Zensical understands `mkdocs.yml` configuration files, so that you can build your projects with minimal changes.

This means your existing Markdown files, template overrides, CSS and JavaScript extensions don't need to be touched, primarily because we did not change the generated HTML, and rely on Python Markdown for processing your content.

However, plugins are a different story. In MkDocs, practically all plugins have side effects, making it impossible to parallelize builds. We started from first principles and asked: what should extensibility look like in a modern static site generator?
Our answer is the upcoming [module system], which takes a fundamentally different approach based on four core principles:

- Modules can inject, extend, and re-define functionality
- Modules are deterministic through topological ordering
- Modules foster reusability, with the possibility to remix them
- Modules can cooperate through well-defined contracts

We're working on shipping essential functionality as provided by MkDocs plugins as built-in modules. In early 2026, we will open the module system to third-party developers, so they can start building their own modules, as we see Zensical as the heart of a thriving ecosystem.

  [feature parity]: https://zensical.org/compatibility/features/
  [search]: ../../plugins/search.md
  [offline]: ../../plugins/offline.md

## Zensical Spark

Zensical Spark, [our offering for professionals], is the result of countless calls with professional users of Material for MkDocs. From startups to large enterprises, we enable organizations to realize complex projects in diverse environments. For this, we've created Zensical Spark as a collaborative space. If you're a professional user, Zensical Spark is for you, since:

- You can be confident that Zensical will continue to be developed and maintained in the long term as a set of interconnected and sustainable OSI-compliant Open Source projects.

- You can receive the support you need to successfully use, configure and customize Zensical in your organization, receiving first-class support from the Zensical team.

- You can influence the future development of Zensical by participating in [our new approach] to Open Source software development, helping us to build exactly what you need.

_Let's talk! If you're working in a professional context, reach out to contact@zensical.org to schedule a call and learn how Zensical Spark enables your team to transition to Zensical smoothly and have a voice in its continued development._

_You should also consider joining the [waiting list], since seats are limited._

  [our offering for professionals]: https://zensical.org/spark/
  [our new approach]: https://zensical.org/spark/methodology/
  [waiting list]: https://zensical.org/spark/join/

## We're growing our team

We're also excited to announce that we're growing [our team]:

__Timotheé Mazzucotelli, also known as @pawamoy, is joining Zensical!__

At Zensical, Tim is focusing on providing the same seamless experience for generating API reference documentation from source code (via docstrings) as he has done with [mkdocstrings], the second biggest project in the MkDocs ecosystem. With his expertise, and Zensical's new stack, we'll be pushing the boundaries of what's possible with API reference documentation.

  [mkdocstrings]: https://mkdocstrings.github.io/
  [our team]: https://zensical.org/about/team/

## Goodbye, GitHub Sponsors

Thank you! To all of you who have supported us over the years through GitHub Sponsors – we are incredibly grateful for your support. It has been invaluable in helping us to build, maintain and evolve Material for MkDocs, and we couldn't have done it without you. __Seriously, thank you!__

Material for MkDocs gave us something invaluable: experience building for tens of thousands of users, and the opportunity to build a team around Open Source software. It showed us that making a living from Open Source isn't just possible – we grew it into one of the largest sponsorware projects on GitHub and inspired others to pursue similar paths.

Now we're breaking new ground. Zensical is our next chapter, and we're professionalizing how we approach Open Source development. Our vision is to make Zensical free for everyone to use while building a sustainable business around it through [our new approach].

This transition means saying goodbye to GitHub Sponsors. It has served us exceptionally well, but as we professionalize and scale, we're making the leap from personal project to company – building a business and team that can meet the growing demands of professional users while staying true to our values.

We're doubling down on Open Source, developing software for everyone.

_If you want to continue supporting our work, please subscribe to [our newsletter]. We'll be providing new methods to support us in the coming months, with the possibility of getting exclusive goodies._

## Looking Ahead

Material for MkDocs grew organically in a pot that eventually became too small. With Zensical, we're building on solid foundations designed to grow with us – and with you.

!!! warning "Material for MkDocs is now in maintenance mode"

    We want to be transparent about the risks of staying on Material for MkDocs. With MkDocs unmaintained and facing fundamental supply chain concerns, we cannot guarantee Material for MkDocs will continue working reliably in the future. We're aware that transitioning takes time, which is why we commit to support it at least for the next 12 months, fixing critical bugs and security vulnerabilities as needed, but the path forward is with Zensical.

    If documentation plays a critical role in your organization, and you're worried how this might affect your business, consider joining [Zensical Spark](https://zensical.org/spark/), or feel free to schedule a call by reaching out at contact@zensical.org.

### Where we'll be in 12 months

Over the next 12 months, following our [phased transition strategy], we'll reach Phase 2 and 3 – introducing our [module system] and [component system], as well as CommonMark support. By replacing Python Markdown with a Rust-based Markdown parser, we'll unlock performance improvements and the modularity needed for flexible templating. This is where Zensical truly starts to unfold its capabilities.

Zensical is already powering real projects due to extensive compatibility with Material for MkDocs. We're actively working on closing the gap to reach full [feature parity].

You can [install Zensical now], and build your existing Material for MkDocs projects with it. If you run into a bug, please don't hesitate to [open an issue] – we're here to help.

### Connect with us

If you have questions we haven't addressed, please reach out to us at contact@zensical.org. We're currently collecting questions from the community about Zensical, and will address them in an FAQ section as part of our documentation in the coming weeks.

We're incredibly thankful that you have been part of our journey so far. With Zensical, we're embarking on a new chapter, and we couldn't be more excited to have you with us.

_You can subscribe to [our newsletter] to stay in the loop_.

  [phased transition strategy]: https://zensical.org/compatibility/#phased-transition-strategy
  [install Zensical now]: https://zensical.org/docs/get-started/
  [GitHub repository]: https://github.com/zensical/zensical
  [open an issue]: https://zensical.org/docs/community/get-involved/
