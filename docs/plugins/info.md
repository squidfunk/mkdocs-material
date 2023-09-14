---
title: Built-in info plugin
icon: material/information
---

# Built-in info plugin

The info plugin is a utility that is solely intended to create self-contained
[minimal reproductions] as `.zip` files when [reporting bugs] or proposing
[change requests], making communication between us maintainers and you much
easier, as we have a common ground to work on.

  [minimal reproductions]: ../guides/creating-a-reproduction.md
  [reporting bugs]: ../contributing/reporting-a-bug.md
  [change requests]: ../contributing/requesting-a-change.md

## Objective

### How it works

The plugin helps you to prepare a minimal reproduction by collecting the
necessary information about the environment and configuration of your project.
This makes it easier for us to fix bugs, as it requires that you
[upgrade to the latest version] and [remove your customizations].

When following these principles, you can be confident that you don't report a
bug that has already been fixed in a subsequent release, or which is caused by
one of your customizations. Even more importantly, you actively help
us to fix the bug as quickly as possible.

The output of the plugin is a `.zip` file that you can share with us maintainers.

  [Upgrade to the latest version]: ../contributing/reporting-a-bug.md#upgrade-to-latest-version
  [Remove your customizations]: ../contributing/reporting-a-bug.md#remove-customizations


### When to use it

Whenever you're [reporting a bug][reporting bugs] or have something to discuss,
like a question or [change request][change requests], you should attach
a small, self-contained minimal reproduction. Runnable examples help to make
communication much more efficient, giving us maintainers more time to benefit
more users by pushing the project forward. Minimal reproductions are mandatory
for bug reports.

## Configuration

<!-- md:version 9.0.0 -->
<!-- md:plugin [info] – built-in -->

In order to get started with the built-in info plugin, just add the following
lines to `mkdocs.yml`, and quickly [create a minimal reproduction] to share
with us maintainers:

``` yaml
plugins:
  - info
```

The info plugin is built into Material for MkDocs and doesn't need to be
installed.

  [info]: info.md
  [create a minimal reproduction]: ../guides/creating-a-reproduction.md

### General

The following settings are available:

---

#### <!-- md:setting config.enabled -->

<!-- md:version 9.0.0 -->
<!-- md:default `true` -->

Use this setting to enable or disable the plugin when [building your project].
It's normally not necessary to specify this setting, but if you want to disable
the plugin, use:

``` yaml
plugins:
  - info:
      enabled: false
```

  [building your project]: ../creating-your-site.md#building-your-site

---

#### <!-- md:setting config.enabled_on_serve -->

<!-- md:version 9.0.6 -->
<!-- md:default `false` -->

Use this setting to control whether the plugin should be enabled when
[previewing your site]. It's normally not necessary to specify this setting,
but if you want to change this behavior, use:

``` yaml
plugins:
  - info:
      enabled_on_serve: true
```

This setting streamlines the process of creating and inspecting minimal
reproductions, as it allows to quickly iterate on the reproduction without
having to disable the plugin first.

  [previewing your site]: ../creating-your-site.md#previewing-as-you-write

### Archive

---

#### <!-- md:setting config.archive -->

<!-- md:version 9.0.0 -->
<!-- md:default `true` -->

Use this setting to control whether the plugin should create a `.zip` file
from the project or exit after the version check. This setting is solely
intended for debugging the plugin itself:

``` yaml
plugins:
  - info:
      archive: false
```

---

#### <!-- md:setting config.archive_stop_on_violation -->

<!-- md:version 9.0.0 -->
<!-- md:default `true` -->

Use this setting to control whether the plugin should stop creating the `.zip`
file when one of the [requirements] is not satisfied. This setting must only be
used when [reporting a bug][reporting bugs] that is related to a customization
[explicitly mentioned in our documentation]. You can change it with:

``` yaml
plugins:
  - info:
      archive_stop_on_violation: false
```

If you're using this setting when [reporting a bug][reporting bugs], please
explain why you think it is necessary to include customizations. If you're
unsure, please ask us first by [creating a discussion].

  [requirements]: #how-it-works
  [explicitly mentioned in our documentation]: ?q=%22extends+base%22
  [creating a discussion]: https://github.com/squidfunk/mkdocs-material/discussions
