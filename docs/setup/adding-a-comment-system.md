---
template: overrides/main.html
disqus: mkdocs material
---

# Adding a comment system

Material for MkDocs is natively integrated with [Disqus][1], a comment system
that provides a wide range of features like social integrations, user profiles,
as well as spam and moderation tools. Of course, other comment systems can be 
integrated, too.

  [1]: https://disqus.com/

## Configuration

### Disqus

[:octicons-file-code-24: Source][2] ·
:octicons-milestone-24: Default: _none_

First, ensure you've set [`site_url`][3] in `mkdocs.yml`. Then, to integrate
Material for MkDocs with [Disqus][1], create an account and a site giving you a
[shortname][4], and add it to `mkdocs.yml`:

``` yaml
extra:
  disqus: <shortname>
```

This will insert a comment system on _every page, except the index page_.

  [2]: https://github.com/squidfunk/mkdocs-material/blob/master/src/partials/integrations/disqus.html
  [3]: https://www.mkdocs.org/user-guide/configuration/#site_url
  [4]: https://help.disqus.com/en/articles/1717111-what-s-a-shortname

## Customization

### Selective integration

[:octicons-file-code-24: Source][2] ·
:octicons-mortar-board-24: Difficulty: _easy_

If the [Metadata][5] extension is enabled, you can disable or enable Disqus for
specific pages by adding the following to the front matter of a page:

=== "Enable Disqus"

    ``` markdown
    ---
    disqus: <shortname>
    ---
    ```

=== "Disable Disqus"

    ``` markdown
    ---
    disqus: ""
    ---
    ```

  [5]: ../reference/meta-tags.md#metadata
