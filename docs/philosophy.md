---
template: overrides/main.html
---

# Philosophy

Before settling for Material for MkDocs, it's a good idea to understand the
philosophy behind the project, in order to make sure it aligns with your goals.
This page explains the design principles anchored in Material for MkDocs, and
discusses the [conventions] used in this documentation.

  [conventions]: #conventions

## Design principles

- __It's just Markdown__: Focus on the content of your documentation and create
  a professional static site in minutes. No need to know HTML,CSS or JavaScript
  – let Material for MkDocs do the heavy lifting for you.

- __Works on all devices__: Serve your documentation with confidence – the 
  underling layout automatically adapts to perfectly fit the available screen 
  estate, no matter the type or size of the viewing device.

- __Made to measure__: Change the colors, fonts, language, icons, logo and much
  more with a few lines of configuration. Material for MkDocs can be easily 
  extended and provides tons of options to alter appearance and behavior.

- __Fast and lightweight__: Don't let your users wait – get incredible value
  with a small footprint, by using one of the fastest themes around with
  excellent performance, yielding great search engine rankings and happy
  users that return.

- __Accessible__: Make accessibility a priority – users can navigate your
  documentation with touch devices, keyboard, and screen readers. Semantic
  markup ensures that your documentation works for everyone.

- __Open Source__: Trust 10,000+ users – choose a mature and well-funded
  solution built with state-of-the-art Open Source technologies. Keep ownership
  of your content without fear of vendor lock-in. Licensed under MIT.

## Conventions

### Symbols

This documentation use some symbols for illustration purposes. Before you read
on, please make sure you've made yourself familiar with the following list of
conventions:

[:octicons-heart-fill-24:{ .mdx-heart } &nbsp; Insiders][Insiders]{ .mdx-insiders }

:   Some features are not yet available in the community edition, but only as
    part of the Insiders build of Material for MkDocs. Please consult the 
    [Insiders] guide to learn how to get access.

:octicons-tag-24: &nbsp; __{x.x.x}__

:   The tag icon in conjunction with a version number denotes when a specific 
    feature or behavior was added. Make sure you're at least on this version
    if you want to use it.

:octicons-file-code-24: &nbsp; __{file.ext}__

:   The source file icon together with a file name is sometimes used in code
    examples which span multiple files. The file name (or path) always starts
    from the location of `mkdocs.yml`.

:octicons-milestone-24: &nbsp; __Default__: _value_

:   Some properties in `mkdocs.yml` have default values for when the author
    does not explicitly define them. The default value of the property is always
    included.

:octicons-unlock-24: &nbsp; __Feature flag__

:   Most of the features are hidden behind feature flags, which means they must
    be explicitly enabled via `mkdocs.yml`. This allows for the existence of
    potentially orthogonal features.

:octicons-beaker-24: &nbsp; __Experimental__

:   Some newer features are still considered experimental, which means they
    might (although rarely) change at any time, including their complete removal 
    (which hasn't happened yet).


:octicons-cpu-24: &nbsp; __Plugin__

:   Several features are implemented through MkDocs excellent plugin
    architecture, some of which are built-in and distributed with Material for
    MkDocs, so no installation is required.

:octicons-package-24: &nbsp; __Utility__

:   Besides plugins, there are some utilities that build on top of MkDocs in
    order to provide extended functionality, like for example support for
    versioning.

  [Insiders]: insiders/index.md
