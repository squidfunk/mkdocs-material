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
