---
icon: material/shape-outline
---

# Drawio

[Drawio] is a popular tool and library for creating diagrams and charts
in browsers. This documentation site provides information on how to integrate
the [mkdocs-drawio] MkDocs plugin with the [instant-loading] feature of Material.

  [Drawio]: https://www.drawio.com/
  [mkdocs-drawio]: https://github.com/tuunit/mkdocs-drawio
  [instant-loading]: ../setup/setting-up-navigation.md#instant-loading

## Configuration

The following configuration enables support for rendering drawio diagrams with
the [instant-loading] feature.

To use the [mkdocs-drawio] plugin within your project, add the following lines
to your `mkdocs.yml`.

=== ":octicons-file-code-16: `docs/javascripts/drawio-reload.js`"

    ``` js
    document$.subscribe(({ body }) => {
      GraphViewer.processElements()
    })
    ```

=== ":octicons-file-code-16: `mkdocs.yml`"

    ``` yaml
    plugins:
      - drawio

    extra_javascript:
      - https://viewer.diagrams.net/js/viewer-static.min.js
      - javascripts/drawio-reload.js
    ```

See additional configuration options:

- [mkdocs-drawio]
- [instant-loading]

## Usage

Add your Drawio diagrams as you would any other image type like so:

```markdown
![](my-diagram.drawio)
```

Furthermore, you can use the `Alt` text to select certain pages of your Drawio Diagrams:

```markdown
![Page-2](my-diagram.drawio)
![my-custom-page-name](my-diagram.drawio)
```
