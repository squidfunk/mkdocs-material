---
title: Built-in group plugin
icon: material/format-list-group
---

# Built-in group plugin

The group plugin allows to group plugins into logical units to conditionally
enable or disable them for specific environments with the use of
[environment variables][mkdocs.env], e.g., to only enable a subset of
plugins when [building your project] during continuous integration (CI).

  [building your project]: ../creating-your-site.md#building-your-site

## Objective

### How it works

The plugin conditionally and lazily loads all plugins that are part of a group
if and only if the group is enabled, which means that the plugin doesn't add any
overhead when the group is disabled. It also means that the grouped plugins
only need to be installed when the group is enabled.

The plugins that are part of the group are executed in the same order as if
they were defined at the top-level in the list of [`plugins`][mkdocs.plugins].
Thus, order is preserved and deterministic.

### When to use it

Whenever you're using multiple plugins that are only required in specific
environments, e.g., when building your project during continuous integration
(CI), the plugin is the perfect utility for making configuration simpler, as it
removes the need for splitting configuration into multiple files.

It can be used with any built-in or third-party plugin.

## Configuration

<!-- md:version 9.3.0 -->
<!-- md:plugin [group] – built-in -->
<!-- md:flag multiple -->
<!-- md:flag experimental -->

As with all [built-in plugins], getting started with the group plugin is
straightforward. Just add the following lines to `mkdocs.yml`, and start
splitting plugins into logical units:

``` yaml
plugins:
  - group
```

The group plugin is built into Material for MkDocs and doesn't need to be
installed.

  [group]: group.md
  [built-in plugins]: index.md

### General

The following settings are available:

---

#### <!-- md:setting config.enabled -->

<!-- md:version 9.3.0 -->
<!-- md:default `false` -->

Use this setting to enable or disable the plugin when [building your project].
The plugin behaves differently than all other built-in plugins – __it is
disabled by default__. To enable a group, use:

``` yaml
plugins:
  - group:
      enabled: !ENV CI # (1)!
```

1.  If you only want to use the group plugin for better organization and
    always want to enable the plugins that are part of it, use:

    ``` yaml
    plugins:
      - group:
          enabled: true
    ```

The decision to disable the plugin by default was made to simplify the usage
of environment variables, as it removes the need to provide a default value for
an environment variable.

Now, when [building your project], you can enable a group by setting the
[environment variable][mkdocs.env]:

``` sh
CI=true mkdocs build
```

  [building your project]: ../creating-your-site.md#building-your-site

---

#### <!-- md:setting config.plugins -->

<!-- md:version 9.3.0 -->
<!-- md:default none -->

Use this setting to list the plugins that are part of the group. The syntax is
exactly the same as for the [`plugins`][mkdocs.plugins] setting, so you can
simply copy the list of plugins that you want to group, e.g:

``` yaml
plugins:
  - group:
      plugins:
        - optimize
        - minify
```

The plugins mentioned here are just used for illustration purposes.
