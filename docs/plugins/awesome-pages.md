---
template: overrides/main.html
---

# Awesome pages

The [mkdocs-awesome-pages-plugin][1] omits the need to specify all pages in the
`nav` entry of `mkdocs.yml` and gives you control over page visibility, titles
and order on a directory level.

!!! success "Bundled with the official Docker image"

    This plugin is already installed for your convenience when you use the
    official [Docker image][2], so the installation step can be skipped. Read
    the [getting started guide][3] to get up and running with Docker.

  [1]: https://github.com/lukasgeiter/mkdocs-awesome-pages-plugin/
  [2]: https://hub.docker.com/r/squidfunk/mkdocs-material/
  [3]: ../getting-started.md#with-docker-recommended

## Installation

Install the plugin using `pip`:

``` sh
pip install mkdocs-awesome-pages-plugin
```

## Configuration

Add the following lines to `mkdocs.yml`:

``` yaml
plugins:
  - search # necessary for search to work
  - awesome-pages
```

## Usage

If the `nav` entry in `mkdocs.yml` is omitted, MkDocs will automatically include
all pages in a specific order. This plugin allows for more fine-grained control
on a per-directory basis. In order to configure behavior for a specific
directory, create a YAML file named `.pages` in it and set one of the following
options.

### Setting a directory title

The directory title, which is shown as part of the navigation, can be set with:

``` yaml
title: Lorem ipsum dolor sit amet
```

### Changing the order of pages

The order of pages and subsections can be configured with:

``` yaml
arrange:
  - page-1.md
  - page-2.md
  - subdirectory
```

### Excluding a directory

A directory can be hidden (i.e. excluded) with:

``` yaml
hide: true
```

### Collapsing single-page directories

Directories which contain a single page can be collapsed with:

``` yaml
collapse: true
```
