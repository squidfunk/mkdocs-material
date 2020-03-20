# Awesome Pages Plugin

[mkdocs-awesome-pages-plugin][1] is an extension that that simplifies configuring page titles and their order.

  [1]: https://github.com/lukasgeiter/mkdocs-awesome-pages-plugin/

## Installation

Install the plugin using `pip` with the following command:

``` sh
pip install mkdocs-awesome-pages-plugin
```

Next, add the following lines to your `mkdocs.yml`:

``` yaml
plugins:
  - search
  - awesome-pages
```

!!! warning "Remember to re-add the `search` plugin"

    If you have no `plugins` entry in your config file yet, you'll likely also
    want to add the `search` plugin. MkDocs enables it by default if there is
    no `plugins` entry set.

## Usage


### Set Directory Title

Create a YAML file named `.pages` in a directory and set the `title` to override the title of that directory in the navigation:

```yaml
title: Page Title
```

### Arrange Pages

Create a YAML file named `.pages` in a directory and set the `arrange` attribute to change the order of how child pages appear in the navigation. This works for actual pages as well as subdirectories.

```yaml
title: Page Title
arrange:
    - page1.md
    - page2.md
    - subdirectory
```

### Hide Directory

Create a YAML file named `.pages` in a directory and set the `hide` attribute to `true` to hide the directory, including all sub-pages and sub-sections, from the navigation:

```yaml
hide: true
```

### Collapse Pages

This plugin supports collapsing directories that contain a single page

If you want to enable or disable collapsing of a single page, without applying the setting recursively, create a YAML file called `.pages` in the directory and set `collapse` to `true` or `false`:

```yaml
collapse: true
```