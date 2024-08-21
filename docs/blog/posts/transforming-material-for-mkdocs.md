---
date: 2024-08-19
authors:
  - squidfunk
  - alexvoss
  - katharinalisalin
categories:
  - General
description: >
  We are transforming Material for MkDocs to ensure its community continues to thrive and doubling down on our commitment to Open Source.
title: How we're transforming Material for MkDocs
---

# Transforming Material for MkDocs

__We are working on an amazing set of features which has required some behind-the-scenes work we are now ready to share in a series of posts. Here, we give an overview of our goals, features in the making, things that kept us up at night, and our commitment to Open Source.__

We know it's been quite a while since our last update, which is why we're eager to share what's happening in and around Material for MkDocs with you. For the largest part of 2024, we've been focused on transforming the core of Material for MkDocs preparing the ground for new, interconnected features that are amongst the most frequently requested.

This article is the first in a series where we'll explore how we aim to support our users through improved information retrieval, provide better support for multi-lingual sites and versioning, as well as improve the overall authoring experience. We outline our vision for the projects' evolution and describe what we have been working on. In this and the coming blog posts, we will share our progress with you, and we're excited to hear your thoughts.

<!-- more -->

_Please note that this post includes several technical details in the footnotes, specifically on challenges. Feel free to skip them if you're not interested in the specifics._

## A success story

In 2024, Material for MkDocs has firmly established itself as a leading tool in the documentation framework landscape, with more than 5 million downloads each month as of this writing. What began as @squidfunk's personal project has evolved into a versatile resource for creating comprehensive documentation sites, personal websites, blogs, and notably, for managing knowledge both within and outside of organizations.

With almost [50,000] public GitHub projects depending on Material for MkDocs, it's clear that the framework has made a substantial impact. Tens of thousands of authors rely on us to deliver documentation to millions of users each month.[^1] Beyond its adoption by [many popular Open Source projects], Material for MkDocs is trusted and financially supported by major corporations such as [AWS], [Microsoft], and [Siemens], among many other companies and individuals. We're very grateful for the continued support we receive, which allows us to devote our time to this project, making writing documentation enjoyable.

  [^1]:
    We've collected invaluable feedback from enterprises and other Open Source maintainers, which revealed that the actual numbers are even higher. Many organizations leverage the framework within private infrastructures, such as self-hosted platforms like GitLab, for internal knowledge management. This suggests that the true reach of Material for MkDocs extends far beyond what is publicly visible.

  [50,000]: https://github.com/squidfunk/mkdocs-material/network/dependents
  [many popular Open Source projects]: https://github.com/squidfunk/mkdocs-material?tab=readme-ov-file#trusted-by-
  [AWS]: https://x.com/squidfunk/status/1740389441284579767
  [Microsoft]: https://x.com/squidfunk/status/1801909506391105840
  [Siemens]: https://x.com/squidfunk/status/1699799988069646761

Our users particularly appreciate Material for MkDocs for its ease of use and straightforward setup. It simplifies the process by handling the complexities of web technologies for you, so you can build a production-ready static site in minutes without needing to invest years into mastering frontend development or JavaScript. This makes it accessible to a wide range of users, regardless of their technical background. Additionally, Material for MkDocs is MIT-licensed and free to use, which has contributed to its widespread adoption, and allows everybody to build sophisticated documentation sites at no cost.

Our vision is to provide you with the tools that allow you to __own your docs__, enable you to develop your own processes for producing amazing documentation and to avoid being locked into costly subscription services even for doing simple things. We believe it is important that these tools should be easy to set up and configure to suit your needs but should also give you the freedom to adapt them further, if needed. This is why we are always striving to ensure our architectures are modular and future-proof.[^2]

  [^2]:
    The [built-in plugins] that Material for MkDocs ships perfectly outline this principle, as they are complementary to each other and can be used in combination to build sophisticated pipelines. This modular design allows users to pick and choose the features they need, ensuring that the framework remains lightweight and flexible.

    For instance, the [privacy plugin] can work together with the [optimize plugin] so that external assets can be passed through the same optimization pipeline as the rest of your documentation. This means you can store and edit unoptimized files outside of your repository, and let both plugins automatically build an optimized site for you.

  [built-in plugins]: ../../plugins/index.md
  [privacy plugin]: ../../plugins/privacy.md
  [optimize plugin]: ../../plugins/optimize.md

## Challenges

Now, let's talk about our journey and the particular challenges we're addressing. With "we", we're referring to the incredible team that @squidfunk was fortunate to build around his original work, thanks to the financial support he receives from his [sponsors]. This remarkable team includes @alexvoss and @katharinalisalin, whose invaluable contributions in research, development, and community support have been essential to the project's ongoing success.

Together, we've started exploring new technologies, incorporating the feedback we received from our users, and rethinking critical components from first principles, serving our growing community one of the best frameworks to create documentation.

  [sponsors]: https://github.com/sponsors/squidfunk

This section highlights the key areas we've been focusing on.

### Search and discovery

From our perspective, search is a cornerstone of any effective documentation site, enabling users to swiftly locate the information they need. From the start, we've relied on [Lunr.js], a popular client-side search library that has streamlined the deployment of documentation sites without needing an external service. Over the years, Lunr.js has served us well by answering millions of queries on sites built with Material for MkDocs. Yet, as our users' needs evolved, we encountered limitations that proved difficult to overcome.

  [Lunr.js]: https://github.com/olivernn/lunr.js

We learned that the [BM25 ranking algorithm] at the core of Lunr.js (as in many other search implementations) isn't well-suited for effective and stable typeahead. Adding new documents can influence existing rankings, requiring manual adjustments[^3] that are cumbersome and hard to scale. Furthermore, Lunr.js has performance issues that stem from its design not fully leveraging modern JavaScript engines and optimizations, making it slower and memory-intensive.[^4]

  [^3]:
    Boosting documents in [BM25][BM25 ranking algorithm] can lead to challenges, particularly with a changing corpus of documents. Relevance is calculated based on term frequency and the importance of terms across the entire corpus. Boosting a document involves adjusting its weight to make it more prominent in search results.

    As new documents are added or existing ones are modified, the overall distribution of term frequencies and their importance can shift. This recalibration can diminish the effectiveness of the boost, making it harder to maintain consistent ranking across a changing dataset. Essentially, the boosted documents may not stay as prominent or relevant as intended, leading to imbalances and scalability issues in search results.

  [^4]:
    Lunr.js uses JavaScript objects to index and manage search data, which introduces inefficiencies due to how JavaScript engines handle object operations. JavaScript engines optimize performance using techniques like inline caching and object shape optimization. However, these optimizations rely on predictable and consistent object structures.

    The dynamic nature of Lunr.js' indexing — where documents can have varying structures — prevents the engine from applying these optimizations effectively. This means that while JavaScript engines can optimize for fixed, predictable object structures, they struggle with the polymorphic and fluid nature of Lunr.js's indexing, leading to performance issues as the amount of data grows.

  [BM25 ranking algorithm]: https://en.wikipedia.org/wiki/Okapi_BM25

Over the last years, we've invested substantially into [improving the search experience]. For instance, expanding Lunr.js' functionality to add support for [rich search previews] and [tokenizer lookahead] demanded substantial engineering effort. Lunr.js allows to customize tasks such as stemming, stopword filtering, and trimming with [pipeline functions], but it makes it particularly hard to add extensions like term highlighting or alternative ranking methods. Compounded by the fact that Lunr.js has been [unmaintained since 2020], it became clear that we needed to find a more powerful solution. We've looked at alternative JavaScript-based libraries to keep our client-side search, but none met our requirements or lived up to our expectations.

  [improving the search experience]: search-better-faster-smaller.md
  [rich search previews]: search-better-faster-smaller.md#rich-search-previews
  [tokenizer lookahead]: search-better-faster-smaller.md#tokenizer-lookahead
  [pipeline functions]: https://lunrjs.com/guides/customising.html#pipeline-functions
  [unmaintained since 2020]: https://github.com/olivernn/lunr.js/releases/tag/

To address these challenges, we've embarked on developing a new search system from first principles that not only matches but already exceeds the capabilities of Lunr.js. Built from the ground up, this system is faster, more compact, and most importantly: modular. It is based on a growing core evolving around two core concepts we isolated to be essential – engines and plugins – allowing for flexible configuration and assembly of components like text indexing, vector embeddings, filtering, ranking, highlighting, and more. Every part of it can be replaced or extended, enabling users to tailor the search system to their specific needs.

Our new search system, which we will release as a separate MIT-licensed Open Source project, is designed to handle a wide range of scenarios — from small blogs to large documentation projects. Of course, it supports offline use and integrates seamlessly with both client and server environments. The advanced ranking system provides fine-tuned control, and integration with third-party services is now more straightforward.

__:octicons-goal-16: Goal – Empower users to quickly find the information they need while freeing authors from managing external services, by providing a search system that adapts to diverse content types.__

You might wonder why it's not yet available. The process of developing this system from scratch and uncovering its potential has led us to re-evaluate core concepts of Material for MkDocs. As a result, we've decided to postpone the release of the new search system to integrate it into the broader update that we've started to work on. If you keep on reading, you'll learn about further reasons why we've decided to follow this approach.

We're excited to share more details about this update in one of the next posts in this series.

### Translations and versioning

Supporting multi-language sites in MkDocs is the [most requested feature on our discussion board] and in conversations with users, yet it presents significant challenges, as MkDocs does not natively support it. The same applies to versioning, which also involves synchronisation of multi-project builds. While the MkDocs ecosystem has developed [various plugins and tools] to address these issues, there is still substantial untapped potential. We began exploring these areas but quickly encountered problems that hindered our progress.

  [most requested feature on our discussion board]: https://github.com/squidfunk/mkdocs-material/discussions/2346
  [various plugins and tools]: https://github.com/mkdocs/catalog?tab=readme-ov-file#-site-building-site-management

As you may know, our initial effort involved the [projects plugin] that aims to extend MkDocs to add support for multi-project environments as a solid foundation to support multi-language sites and versioning. Unfortunately, we encountered significant challenges due to MkDocs' internal architecture and design constraints, which we're working actively on resolving.[^5]

  [^5]:
    When developing the [projects plugin], we initially made [good progress], including adding support for nested projects and allowing for a tree structure where sub-projects can have further sub-projects. However, we quickly encountered difficulties, particularly with cross-project navigation. To illustrate, imagine that each project can link to any other project, which makes handling these interconnections complex, especially when dealing with circular dependencies — such as Project A linking to Project B and vice versa.

    Implementing multi-project support in MkDocs is particularly challenging due to the lack of an official programmatic API, which complicates efforts to extend its functionality. Moreover, resolving navigation issues before building projects is crucial for ensuring proper interconnectivity. These challenges combined made the development of the projects plugin a complex endeavor.

  [projects plugin]: ../../plugins/projects.md
  [good progress]: https://github.com/squidfunk/mkdocs-material/discussions/5800

__:octicons-goal-16: Goal – Enable scaling documentation to any size or team structure by offering seamless methods for integrating multiple documentation projects, whether they involve different languages, versions, or distinct sections of an overall body of work.__

As a result, we are developing a new approach to offer a more comprehensive and robust solution for both multi-language support and versioning. This new approach also intersects with adjacent functionalities like search, as many of our users are interested in [federated search] capabilities that combine results from multiple documentation sites into a unified search interface. Overcoming this challenge is one of the major hurdles we need to address before releasing the new search system.

  [federated search]: https://github.com/squidfunk/mkdocs-material/issues/5230

### Editing and collaboration

We had considered developing a live editor in response to MkDocs' [performance issues with large projects], which in most cases stem from compute-intensive plugins that don't employ caching. A [proof of concept] based on [Pyodide] (= running Python in the browser) [generated significant interest] among users and prompted many organizations and individuals to share their collaborative workflows for feedback. Sadly, implementing this live editor proved to be very challenging, as it would require rebuilding substantial parts of MkDocs.[^6] After discontinuing work on this approach, our progress with multi-project support has renewed our belief that we can finally solve the sluggish editing experience that was reported several times over the last years.[^7]

  [performance issues with large projects]: https://github.com/mkdocs/mkdocs/issues/3695#issuecomment-2093299518
  [proof of concept]: https://x.com/squidfunk/status/1338252230265360391
  [Pyodide]: https://pyodide.org/
  [generated significant interest]: https://github.com/squidfunk/mkdocs-material/issues/2110

  [^6]:
    Our [proof of concept] supported some features of Material for MkDocs but didn't cover them all. For instance, integrating support for icons or linking between documents would have necessitated reimplementing parts of MkDocs to bypass a full rebuild — something we obviously wanted to avoid. Additionally, certain links, such as those to blog posts generated from schemas, are not merely translated but computed dynamically, which means they cannot be inferred by replacing the `.md` extension with `.html`.

  [^7]:
    After [we raised this issue] with the maintainers of MkDocs again[^8], and [maintainership changed] mid 2024, work on a [ground-up rewrite] that aims to address slow reloads by [rendering only the page currently being built] has started. It's still unclear how this rewrite will integrate with the requirements of existing plugins. Complex plugins such as [mkdocstrings], or our [built-in blog] and [tags] plugins require a coordinated build of all pages to accurately resolve links between pages and to computed resources, which cannot be determined without building the entire project.

    __Update__{ title="August 21, 2024" }: The new maintainer now publicly stated that he's working towards a new version of MkDocs that [does not require or support plugins], and mentions it will be equally capable through offering customization via templating, themes, and styling, which he also mentioned to us and several other users in [a team call on August 1]. In this call, [we raised objections multiple times] in regards to how this will impact the ecosystem, to no avail. No intention or roadmap for plugin support was provided. This development is orthogonal to our goal empowering users and organizations to adapt the core framework to their requirements by the means of modularity. We're working on resolving this situation, and will provide a way forward for our community.

  [we raised this issue]: https://github.com/mkdocs/mkdocs/issues/3695
  [maintainership changed]: https://github.com/mkdocs/mkdocs/discussions/3677
  [ground-up rewrite]: https://github.com/mkdocs/sketch
  [rendering only the page currently being built]: https://github.com/mkdocs/mkdocs/issues/3695#issuecomment-2117939743
  [mkdocstrings]: https://mkdocstrings.github.io/
  [built-in blog]: ../../plugins/blog.md
  [tags]: ../../plugins/tags.md
  [does not require or support plugins]: https://github.com/mkdocs/mkdocs/discussions/3815
  [a team call on August 1]: https://github.com/mkdocs/mkdocs/discussions/3671#discussioncomment-10164237
  [we raised objections multiple times]: https://github.com/mkdocs/mkdocs/discussions/3671#discussioncomment-10215445

  [^8]:
    Previously raised issues include [#2418], [#2384], and [#1900].

  [#1900]: https://github.com/mkdocs/mkdocs/issues/1900
  [#2384]: https://github.com/mkdocs/mkdocs/issues/2384
  [#2418]: https://github.com/mkdocs/mkdocs/issues/2418

This brings us to collaboration, which wasn't initially on our list of priorities. However, throughout 2024, conversations with various organizations and maintainers of popular Open Source projects highlighted a frequent request for enhanced collaboration features. Many users expressed a need for capabilities that would allow non-technical team members to suggest and make changes to the documentation. We're genuinely grateful for this feedback, as it has come at a pivotal time. We recognize the need to streamline tracking and discussing changes, as well as to facilitate drive-by contributions.

__:octicons-goal-16: Goal – Everyone, regardless of their technical skill level, can easily work on and improve the documentation and contribute to a growing corpus of knowledge.__[^9]

  [^9]:
    We are actively aligning our future development efforts to address this, recognizing it as a key area for improvement. While it's not something we can deliver immediately, we are committed to making this vision a reality in our work.

This focus on collaboration aligns with how knowledge is managed in enterprises. In large organizations, documentation often exists in [information silos] — decentralized yet essential repositories of information. We understand the need to be able to unify these disparate sources into a coherent body of knowledge while preserving decentralized ownership. This also nicely aligns with our previously outlined work on multi-project support, as well as the new search system to implement [federated search] among multiple projects.

  [information silos]: https://en.wikipedia.org/wiki/Information_silo

### Large Language Models (LLMs)

Almost a year ago, we introduced an [experimental chatbot] on our documentation site. It quickly became one of the most anticipated features, with users requesting the ability to deploy similar functionality on their own sites, underscoring the growing demand for interactive documentation tools. However, we found that adding to the myriad of existing chat solutions and simply building another thin wrapper on top of ChatGPT is nonsense.

__:octicons-goal-16: Goal – We're envisioning creating a unified interface that seamlessly integrates advanced search, chat, and summarization features, providing an interactive documentation experience.__

  [experimental chatbot]: https://github.com/squidfunk/mkdocs-material/discussions/6240

As we delved into this ambitious project, we gained valuable insights from user feedback. Users began interacting with the chatbot in their native languages, an outcome we hadn't anticipated given that our documentation is in English. Remarkably (or obviously to those that work on LLMs year round), the chatbot responded in the same language. This ability of LLMs is one of the genuinely exciting features of these machine learning models as it has the potential to improve the accessibility of the documentation. However, while we employed state-of-the-art RAG methodologies, the results were mixed, and occasional hallucinations surfaced.

These experiences led us to prioritize enhancing our search capabilities before integrating LLM-based features. Building a search engine from scratch was already a substantial effort, and adding more complexity without a solid search foundation would be premature. By rearchitecting our search functionalities, we aim to create a robust platform that will seamlessly support advanced information retrieval and deliver a cohesive interactive documentation experience.

## Team, transparency, and growth

While we navigate the challenges and explore the opportunities of this project, we consider it essential to demonstrate how we're building a solid foundation for its continued growth and success. Please consider this an overview rather than a formal roadmap — our detailed plans are in the works. The goals we've highlighted represent the most impactful areas we aim to address.

Thanks to the generous support from our sponsors, we're fortunate to be assembling a team capable of dedicating significant time and expertise to this endeavor. This newfound capacity allows us to delve deeper into core development while also engaging more comprehensively with our user community. A special mention goes to @kamilkrzyskow, one of our invaluable [community experts], who has been essential in supporting users and fostering discussions on our platform.

  [community experts]: http://localhost:3000/mkdocs-material/insiders/community-experts-program/

With the team's support, @squidfunk can concentrate on the heart of development, while we have begun investing in user research. This effort is helping us understand how organizations and individuals interact with our tools, guiding the project's future direction based on real feedback from numerous conversations with users and companies.

Looking to expand our team further, we are committed to improving transparency and communication. Our previous work often happened behind the scenes due to time constraints, but we're now focused on making our processes more open and inviting for new contributors. By embracing this collaborative approach, we aim to enhance our tools and ensure they meet the evolving needs of our community.

## What's ahead of us

As we look into the future, some of the groundwork we're laying now is crucial for the exciting developments on the horizon. Many of the initiatives we've discussed represent foundational work that will set the stage for much more ambitious and innovative features. Once these core elements are in place, we'll deliver a range of exciting new functionalities that align with our vision and goals.

In the coming months, we'll be sharing more details about our plans and how they will contribute to our overarching objectives. While growth and innovation are at the forefront of our plans, we want to assure you that our core values remain unchanged. We are committed to maintaining the principles that have guided us thus far, ensuring that our growth is both healthy and consistent:

- Against recent industry trends with companies moving away from core ideas of Open Source, we are doubling down on our commitment to Open Source because we believe it's at the heart of the value proposition of our work and the [docs as code] approach.

  [docs as code]: https://www.writethedocs.org/guide/docs-as-code/

- Our [organic approach to growth] is part of this strategy as it keeps us independent of individual funding sources and pressures to provide a return on investment, which is what causes many other projects to turn away from the principles of Open Source.

  [organic approach to growth]: https://star-history.com/#squidfunk/mkdocs-material

- Likewise, we are driven by the needs of the community for a rich ecosystem of adaptations of the core framework. Extensibility and modularity are key for this and we are working hard to improve the developer experience by providing clear interfaces.

Stay tuned for updates as we continue to build on our progress and explore new possibilities. We're excited about the future and look forward to sharing more with you as we advance.

_Martin, Alex and Kathi_ :octicons-heart-fill-24:{ .mdx-heart .mdx-insiders }
