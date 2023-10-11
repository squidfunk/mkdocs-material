---
icon: material/database-outline
---

# Caching

Some of the [built-in plugins] implement intelligent caching mechanisms, which
massively speed up consecutive builds by reducing the amount of work that needs
to be done. This guide explains how to configure caching in different
environments.

## Prerequisites

Caching is entirely optional but enabled by default. It can be disabled per
plugin. If not configured otherwise, plugins will cache their data in the
`.cache` folder in the root of your project. For this reason it's recommended
to create a `.gitignore` file in the root of your project:

``` title=".gitignore"
.cache
```

This ensures that cached files are not added to your git repository – something
that is generally not recommended to do unless absolutely necessary. In some
cases, you might need to check in cached files, e.g. when you need to
pre-generate [social cards] locally, e.g., when you're not be able to install
the image processing dependencies in your continuous integration (CI)
environment.

In this case, we recommend changing the `cache_dir` setting – something that all
plugins that implement caching share – to a folder which you add to your git
repository.

  [built-in plugins]: ../index.md
  [social cards]: ../../setup/setting-up-social-cards.md
