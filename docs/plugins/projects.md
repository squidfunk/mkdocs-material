---
title: Built-in projects plugin
icon: material/folder-open
---

# Built-in projects plugin

The projects plugin adds the ability to split your main project into multiple
distinct projects, build them concurrently and preview them together as one.
This is particularly useful when creating a multi-language project, but can also
be used to split very large projects into smaller parts.

## Objective

### How it works

The plugin scans the configured [`projects` directory][config.projects_dir] for
`mkdocs.yml` files, identifies all nested projects and builds them concurrently.
If not configured otherwise, the plugin expects that your project has
the following directory layout, e.g. for a multi-language project:

``` { .sh .no-copy }
.
├─ docs/
├─ projects/
│  ├─ en/
│  │  ├─ docs/
│  │  └─ mkdocs.yml
│  └─ de/
│     ├─ docs/
│     └─ mkdocs.yml
└─ mkdocs.yml
```

One of the most useful and interesting features of the plugin is that it allows
[previewing your site] from the main project, while still being able to preview
and build each project individually. This is especially useful for
multi-language projects.

If, when [previewing your site], you change a file in one of the projects, the
plugin only rebuilds this project and makes sure that MkDocs will also reload
the associated files. This also creates the opportunity for splitting your
main project into several projects for a better editing experience.

There are some [limitations], but we're working hard to remove them.

  [previewing your site]: ../creating-your-site.md#previewing-as-you-write
  [limitations]: #limitations

### When to use it

The plugin came into existence because we needed a convenient and scalable
method to build our [examples] repository, which features many self-contained
and runnable projects that users can download and use as a basis when
boostrapping a new project or [creating a reproduction].

When you want to create a multi-language project, or have a very large existing
project, you might consider using the plugin, as it makes managing, editing
and building more comfortable.

  [examples]: https://github.com/mkdocs-material/examples
  [creating a reproduction]: ../guides/creating-a-reproduction.md

## Configuration

<!-- md:sponsors -->
<!-- md:version insiders-4.38.0 -->
<!-- md:plugin [projects] – built-in -->
<!-- md:flag experimental -->

In order to get started with the projects plugin, just add the following lines
to `mkdocs.yml`, and split your main project into several distinct projects that
can be built concurrently:

``` yaml
plugins:
  - projects
```

The projects plugin is built into Material for MkDocs and doesn't need to be
installed.

  [projects]: projects.md

### General

The following settings are available:

---

#### <!-- md:setting config.enabled -->

<!-- md:sponsors -->
<!-- md:version insiders-4.38.0 -->
<!-- md:default `true` -->

Use this setting to enable or disable the plugin when [building your project].
If you want to disable the plugin, e.g., for local builds, you can use an
[environment variable][mkdocs.env] in `mkdocs.yml`:

``` yaml
plugins:
  - projects:
      enabled: !ENV [CI, false]
```

This configuration enables the plugin only during continuous integration (CI).

  [building your project]: ../creating-your-site.md#building-your-site

---

#### <!-- md:setting config.concurrency -->

<!-- md:sponsors -->
<!-- md:version insiders-4.38.0 -->
<!-- md:default available CPUs - 1 -->

With more CPUs available, the plugin can do more work in parallel, and thus
build projects faster. If you want to disable concurrent processing completely,
use:

``` yaml
plugins:
  - projects:
      concurrency: 1
```

By default, the plugin uses all available CPUs - 1 with a minimum of 1.

### Caching

The plugin implements an [intelligent caching] mechanism, ensuring that a
project is only rebuilt when its contents change. While the initial build might
take some time, it's a good idea to use caching, as it will speed up consecutive
builds.

The following settings are available for caching:

  [intelligent caching]: requirements/caching.md

---

#### <!-- md:setting config.cache -->

<!-- md:sponsors -->
<!-- md:version insiders-4.38.0 -->
<!-- md:default `true` -->

Use this setting to instruct the plugin to bypass the cache, in order to
rebuild all projects, even though the cache may not be stale. It's normally not
necessary to specify this setting, except for when debugging the plugin itself.
Caching can be disabled with:

``` yaml
plugins:
  - projects:
      cache: false
```

---

#### <!-- md:setting config.cache_dir -->

<!-- md:sponsors -->
<!-- md:version insiders-4.38.0 -->
<!-- md:default `.cache/plugin/projects` -->

It is normally not necessary to specify this setting, except for when you want
to change the path within your root directory where the metadata is cached.
If you want to change it, use:

``` yaml
plugins:
  - projects:
      cache_dir: my/custom/dir
```

### Projects

The following settings are available for projects:

---

#### <!-- md:setting config.projects -->

<!-- md:sponsors -->
<!-- md:version insiders-4.38.0 -->
<!-- md:default `true` -->

Use this setting to enable or disable building of projects. Currently, the
plugin's sole purpose is to build projects, so it's equivalent to the
[`enabled`][config.enabled] setting, but in the future, other features might be
added. If you want to disable building of projects, use:

``` yaml
plugins:
  - projects:
      projects: false
```

---

#### <!-- md:setting config.projects_dir -->

<!-- md:sponsors -->
<!-- md:version insiders-4.38.0 -->
<!-- md:default `projects` -->

Use this setting to change the folder where your projects are located. It's
normally not necessary to change this setting, but if you want to rename the
folder or change its file system location, use:

``` yaml
plugins:
  - projects:
      projects_dir: projects
```

Note that the [`projects` directory][config.projects_dir] is solely used for
project organization – it is not included in project URLs, since projects are
automatically hoisted by the plugin.

The provided path is resolved from the root directory.

### Hoisting

The following settings are available for hoisting:

---

#### <!-- md:setting config.hoisting -->

<!-- md:sponsors -->
<!-- md:version insiders-4.39.0 -->
<!-- md:default `true` -->

Use this setting to enable or disable hoisting of themes files to the main
project. If you disable this setting, each project receives a copy of the
theme's files, which can be considered redundant:

``` yaml
plugins:
  - projects:
      hoisting: false
```

It's generally advisable to enable hoisting, as it yields faster deployments
and faster loading of your project's sites, because the files are the same for
all projects and can be deduplicated.

### Limitations

The plugin is one of the latest additions to Material for MkDocs, which means it
is rather young and has some limitations. We're working hard to remove them, and
we're happy to receive feedback and learn about your requirements in ?5800.
Current limitations are:

- __Basic multi-language support only__: we'll be investigating how to provide
  better support for multi-language projects, allowing to easier interlink
  projects and switch between them.

- __Separate search indexes and sitemaps__: currently, the projects are entirely
  separate, which means they will have separate search indexes and sitemaps.
