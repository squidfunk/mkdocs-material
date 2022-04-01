---
template: overrides/main.html
title: Getting started
---

# Conventions

## Symbols

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
    before opening an issue.

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
