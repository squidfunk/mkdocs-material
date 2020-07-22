---
template: overrides/main.html
---

# Adding a comment system

Material for MkDocs is natively integrated with [Disqus][1], a comment system
that provides a wide range of features like social integrations, user profiles,
as well as spam and moderation tools. Of course, other comment systems can be 
integrated, too.

  [1]: https://disqus.com/

## Configuration

### Disqus

First, ensure you've set [`site_url`][2] in `mkdocs.yml`. Then, to integrate
Material for MkDocs with [Disqus][1], create an account and a site giving you a
[shortname][3], and add it to `mkdocs.yml`:

``` yaml
extra:
  disqus: <shortname>
```

This will insert a comment system on _every page, except the index page_.

  [2]: https://www.mkdocs.org/user-guide/configuration/#site_url
  [3]: https://help.disqus.com/en/articles/1717111-what-s-a-shortname

## Customization

### Selective integration

If the [Metadata][4] extension is enabled, you can disable or enable Disqus for
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

  [4]: ../reference/meta-tags.md#metadata
