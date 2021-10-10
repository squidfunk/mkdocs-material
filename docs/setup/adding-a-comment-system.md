---
template: overrides/main.html
---

# Adding a comment system

Material for MkDocs is natively integrated with [Disqus], a comment system that
provides a wide range of features like social integrations, user profiles, as
well as spam and moderation tools. Of course, other comment systems can be
integrated, too.

  [Disqus]: https://disqus.com/

## Configuration

### Disqus

[:octicons-tag-24: 1.1.0][Disqus support] ·
:octicons-milestone-24: Default: _none_

First, ensure you've set [`site_url`][site_url] in `mkdocs.yml`. Then, to
integrate Material for MkDocs with [Disqus], create an account and a site
giving you a [shortname], and add it to `mkdocs.yml`:

``` yaml
extra:
  disqus: <shortname>
```

This will insert a comment system on every page, except the index page.

  [Disqus support]: https://github.com/squidfunk/mkdocs-material/releases/tag/1.1.0
  [site_url]: https://www.mkdocs.org/user-guide/configuration/#site_url
  [shortname]: https://help.disqus.com/en/articles/1717111-what-s-a-shortname

## Customization

### Selective integration

When [Metadata] is enabled, Disqus can be enabled or disabled for a document
with custom front matter. Add the following lines at the top of a Markdown file:

=== ":octicons-check-circle-fill-16: Enabled"

    ``` bash
    ---
    disqus: <shortname>
    ---

    # Document title
    ...
    ```

=== ":octicons-skip-16: Disabled"

    ``` bash
    ---
    disqus: ""
    ---

    # Document title
    ...
    ```

  [Metadata]: extensions/python-markdown.md#metadata

### Other comment systems

In order to integrate another JavaScript-based comment system provider, you can
[extend the theme], create a new `main.html` in `overrides` and [override the
`disqus` block][overriding blocks]:

``` html
{% extends "base.html" %}

{% block disqus %}
  <!-- Add custom comment system integration here -->
{% endblock %}
```

  [extend the theme]: ../customization.md#extending-the-theme
  [overriding blocks]: ../customization.md#overriding-blocks
