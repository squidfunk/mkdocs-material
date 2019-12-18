# Minify HTML

[mkdocs-minify-plugin][1] is an extension that minifies HTML by stripping all whitespace from the generated documentation.

  [1]: https://github.com/byrnereese/mkdocs-minify-plugin

## Installation

Install the plugin using `pip` with the following command:

``` sh
pip install mkdocs-minify-plugin
```

Next, add the following lines to your `mkdocs.yml`:

``` yaml
plugins:
  - search
  - minify:
      minify_html: true
```

!!! warning "Remember to re-add the `search` plugin"

    If you have no `plugins` entry in your config file yet, you'll likely also
    want to add the `search` plugin. MkDocs enables it by default if there is
    no `plugins` entry set.

## Usage

The output is automatically minified by the plugin.
