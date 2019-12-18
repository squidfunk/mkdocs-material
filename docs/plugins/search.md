# Search

MkDocs enables the search plugin by default if there is no `plugins` entry set in `mkdocs.yml`. If additional plugins are installed, the `search` plugin must be added to your `mkdocs.yml`. See [Site search][1] for more information about how to use search with Material.

  [1]: ../getting-started.md#site-search

## Installation

Add the following lines to your `mkdocs.yml`:

``` yaml
plugins:
  - search
```

!!! warning "Remember to re-add the `search` plugin"

    If you have no `plugins` entry in your config file yet, you'll likely also
    want to add the `search` plugin. MkDocs enables it by default if there is
    no `plugins` entry set.
