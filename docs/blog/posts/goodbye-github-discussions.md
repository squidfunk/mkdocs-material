---
date: 2025-11-18
authors:
  - squidfunk
  - alexvoss
  - katharinalisalin
  - pawamoy
categories:
  - General
icon: material/comment-off-outline
description: >
  As Material for MkDocs entered maintenance mode and we're focusing our efforts on Zensical, our discussion board is now read-only
---

# Goodbye, GitHub Discussions

__With the launch of [Zensical], we're evolving how we work together with the community to ensure long-term sustainability and professional support, fostering meaningful collaboration.__

The launch of Zensical [two weeks ago] marked a significant milestone, as it establishes a new foundation for our mission to build scalable Open Source systems for technical writing. Additionally, we're adopting a structured, transparent, and community-driven approach to guide the evolution of our projects – prioritizing what to build, and shaping Zensical's future together.

[Our new approach] distills a decade of experience maintaining Material for MkDocs, allowing us to professionalize and scale our efforts from a small team to a fully organized operation, while keeping the software free and open to everyone.

As Material for MkDocs has entered [maintenance mode], __our discussion board is now read-only__.

In this article, we reflect on the challenges we've navigated, the lessons we've learned, as these experiences have shaped our approach to community management and support that we're building with Zensical.

_You can subscribe to [our newsletter] to stay in the loop_.

<!-- more -->

  [Our new approach]: https://zensical.org/docs/community/how-we-work/
  [maintenance mode]: https://github.com/squidfunk/mkdocs-material/issues/8523
  [Zensical]: https://zensical.org
  [two weeks ago]: zensical.md
  [our newsletter]: https://zensical.org/about/newsletter/

---

__This is the fourth and final article in a four-part series:__

1. [Transforming Material for MkDocs]
2. [Zensical – A modern static site generator built by the creators of Material for MkDocs]
3. [Material for MkDocs Insiders – Now free for everyone]
4. [Goodbye, GitHub Discussions]

  [Transforming Material for MkDocs]: transforming-material-for-mkdocs.md
  [Zensical – A modern static site generator built by the creators of Material for MkDocs]: zensical.md
  [Material for MkDocs Insiders – Now free for everyone]: insiders-now-free-for-everyone.md
  [Goodbye, GitHub Discussions]: goodbye-github-discussions.md

## GitHub Issues

Engagement with an Open Source project can take many forms – reporting bugs, submitting feature requests, seeking help, sharing ideas, participating in discussions, and contributing code. Each type of interaction requires a distinct approach to management.

Historically, we relied on our GitHub issue tracker to handle bug reports and feature requests. However, a significant portion of user inquiries – questions, support requests, and guidance – also found their way into the issue tracker. Over time, this blurred the lines between development work and support, making it increasingly difficult to maintain focus on core development tasks.

This is not unique to our project; many Open Source maintainers face similar challenges due to diverse skill levels and varying expectations within their communities. Clearly, Open Source projects needed a better solution to separate user support from development work.

## GitHub Discussions

In 2020, GitHub launched [GitHub Discussions] as a dedicated space for community interaction – a new channel to move support requests away from issue trackers. We immediately enabled discussions for Material for MkDocs, and redirected users to post questions and seek help.[^1]

  [^1]:
    Before adopting GitHub Discussions, we maintained a Gitter channel, but ultimately chose to [consolidate our support efforts into a single platform]. While GitHub Discussions appeared promising, its mechanics proved ineffective.

  [consolidate our support efforts into a single platform]: sunsetting-gitter.md

Then, as our community continued to expand – and as the vast majority of participants were seeking help rather than offering it – we launched the [Community Experts Program], giving those community members free access to Insiders for consistently providing high-quality assistance.

### Structural challenges

Despite these measures, we faced serveral structural challenges:

1. __Material for MkDocs? MkDocs? Same, same__ – All too often, we were perceived as the entry point for the entire ecosystem. As a result, many issues and discussions that actually belonged upstream – such as problems with Python Markdown, MkDocs plugins, or MkDocs itself – landed on our desk. This created additional triage work for redirecting issues.

2. __Yet another inbox__ – Although the discussion board was separate from the issue tracker, we ended up handling the majority of questions, effectively turning the discussion board into yet another inbox for us. Because the board is tied to the repository, unanswered discussions could be perceived as the project being unmaintained, putting pressure on us to respond.

3. __A notification for everything__ – GitHub's notification system contributed to this problem. Any interaction within an issue or a discussion subscribes you to the entire thread, resulting in notifications for every comment, including: __+1__ – taking 2 seconds to type and submit, delivering a notification to the inbox of all other participants.

4. __GitHub Discussions is a chat__ – Many users began treating GitHub Discussions more like a chat platform than a structured knowledge base. This created notification fatigue, reinforcing a pattern in which the community implicitly relied on maintainers to handle support requests. Everybody got a message, so the assumption was that things were taken care of – right?

5. __Bug reports on our discussion board__ – From time to time, our [contribution guidelines] were ignored, leading to spurious bug reports on our discussion board instead of our issue tracker – "search doesn't work" is not an actionable bug report. However, when users followed our [bug reporting guidelines], we were able to fix most bugs within 24-48 hours.

  [Community Experts Program]: https://github.com/squidfunk/mkdocs-material/discussions/6363
  [GitHub Discussions]: https://github.com/features/discussions
  [contribution guidelines]: https://squidfunk.github.io/mkdocs-material/contributing/
  [bug reporting guidelines]: https://squidfunk.github.io/mkdocs-material/contributing/reporting-a-bug/

### Addressing these challenges

We actively addressed these challenges in various ways over time: by introducing carefully crafted issue templates on our issue tracker and creating detailed step-by-step guides on how to report bugs, request changes, and create pull requests effectively.

Despite these efforts, success was limited. The underlying problem was that GitHub Discussions, while a step in the right direction, was not designed to handle the scale and diversity of our community. It lacked the structure and features necessary to support a large, active user base seeking help, making it impossible to fully resolve the challenges we faced. We believe that this is not unique to our project, but rather a systemic issue with GitHub Discussions, and that many Open Source maintainers encounter similar difficulties.

The [Community Experts Program] helped reduce some of the support burden, but it could not fully address the structural limitations of using GitHub Discussions for user support.

## Discussions now read-only

With Material for MkDocs in [maintenance mode], __our GitHub Discussion board is now read-only__ – it remains accessible but will no longer accept new discussions or comments. All existing answers stay in place, ensuring that users can still find solutions to previously solved problems.

!!! warning "Material for MkDocs is now in maintenance mode"

    We want to be transparent about the risks of staying on Material for MkDocs. With [MkDocs unmaintained] and facing fundamental supply chain concerns, we cannot guarantee Material for MkDocs will continue working reliably in the future. We're aware that transitioning takes time, which is why we commit to support it at least for the next 12 months, fixing critical bugs and security vulnerabilities as needed, but the path forward is with Zensical.

    If documentation plays a critical role in your organization, and you're worried how this might affect your business, consider joining [Zensical Spark](https://zensical.org/spark/), or feel free to schedule a call by reaching out at hello@zensical.org.

  [MkDocs unmaintained]: https://github.com/squidfunk/mkdocs-material/discussions/8461

### What this means for you

For issues and questions related to the broader MkDocs ecosystem, we encourage users to ask for assistance on the issue trackers and discussion boards of the respective upstream projects:

__MkDocs & Python Markdown__

- [MkDocs] – [Issues][MkDocs issues], [Discussions][MkDocs discussions]
- [Python Markdown] – [Issues][Python Markdown issues]
- [Pymdown Extensions] – [Issues][Pymdown Extensions issues], [Discussions][Pymdown Extensions discussions]

__Popular MkDocs plugins__

- [Mike] – [Issues][Mike issues], [Discussions][Mike discussions]
- [Macros] – [Issues][Macros issues], [Discussions][Macros discussions]
- [Git Revision Date Localized] – [Issues][Git Revision Date Localized issues]
- [Awesome Nav] – [Issues][Awesome Nav issues]
- [Static i18n] – [Issues][Static i18n issues]
- [MkDocs Literate Nav] – [Issues][MkDocs Literate Nav issues]

_For all other MkDocs plugins and Markdown extensions, please consult the [MkDocs catalog], and reach out to the maintainers of the respective projects._

_Join our [Discord] to become part of Zensical's growing community!_

## Looking ahead

This article concludes our four-part series reflecting on the journey of maintaining Material for MkDocs and how it has paved the way for Zensical – our next chapter.

[Our new approach] to community management and support is built directly on the lessons we've learned over the years. We are excited to begin this next chapter together with you and look forward to cultivating a vibrant, engaged, and sustainable community together.

_You can subscribe to [our newsletter] to stay in the loop_.

  [MkDocs]: https://github.com/mkdocs/mkdocs
  [MkDocs issues]: https://github.com/mkdocs/mkdocs/issues
  [MkDocs discussions]: https://github.com/mkdocs/mkdocs/discussions
  [Pymdown Extensions]: https://github.com/facelessuser/pymdown-extensions
  [Pymdown Extensions discussions]: https://github.com/facelessuser/pymdown-extensions/discussions
  [Pymdown Extensions issues]: https://github.com/facelessuser/pymdown-extensions/issues
  [Python Markdown]: https://github.com/Python-Markdown/markdown
  [Python Markdown issues]: https://github.com/Python-Markdown/markdown/issues
  [Mike]: https://github.com/jimporter/mike
  [Mike issues]: https://github.com/jimporter/mike/issues
  [Mike discussions]: https://github.com/jimporter/mike/discussions
  [Macros]: https://github.com/fralau/mkdocs-macros-plugin
  [Macros issues]: https://github.com/fralau/mkdocs-macros-plugin/issues
  [Macros discussions]: https://github.com/fralau/mkdocs-macros-plugin/discussions
  [Git Revision Date Localized]: https://github.com/timvink/mkdocs-git-revision-date-localized-plugin
  [Git Revision Date Localized issues]: https://github.com/timvink/mkdocs-git-revision-date-localized-plugin/issues
  [Awesome Nav]: https://github.com/lukasgeiter/mkdocs-awesome-nav
  [Awesome Nav issues]: https://github.com/lukasgeiter/mkdocs-awesome-nav/issues
  [Static i18n]: https://github.com/ultrabug/mkdocs-static-i18n
  [Static i18n issues]: https://github.com/ultrabug/mkdocs-static-i18n/issues
  [Static i18n discussions]: https://github.com/ultrabug/mkdocs-static-i18n/discussions
  [MkDocs Literate Nav]: https://github.com/oprypin/mkdocs-literate-nav
  [MkDocs Literate Nav issues]: https://github.com/oprypin/mkdocs-literate-nav/issues
  [MkDocs catalog]: https://github.com/mkdocs/catalog
  [Discord]: https://discord.gg/hqXRNq9CjT
