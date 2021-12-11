---
template: overrides/main.html
---

# Adding a comment system

Material for MkDocs allows to easily add the third-party comment system of your
choice to the footer of every page by using [theme extension]. As an example,
we'll be integrating [Disqus] a wildly popular comment provider, but others
can be integrate with the same principles

  [Disqus]: https://disqus.com/

## Customization

### Disqus integration

In order to integrate a third-party comment provider offering a JavaScript-based
solution, follow the guide on [theme extension], copy the contents from the
[`content.html`][content partial] partial and create a file at the same location
in the `overrides` folder:

=== ":octicons-file-code-16: overrides/partials/content.html"

    ``` html
    <!-- Add copied contents from original content.html here -->

    <!-- Get setting from mkdocs.yml, but allow page-level overrides -->
    {% set disqus = config.extra.disqus %}
    {% if page and page.meta and page.meta.disqus is string %}
      {% set disqus = page.meta.disqus %}
    {% endif %}

    <!-- Inject Disqus into current page -->
    {% if not page.is_homepage and disqus %}
      <h2 id="__comments">{{ lang.t("meta.comments") }}</h2>
      <div id="disqus_thread"></div>
      <script>
        var disqus_config = function() {
          this.page.url = "{{ page.canonical_url }}"
          this.page.identifier =
            "{{ page.canonical_url | replace(config.site_url, '') }}" // (1)!
        }

        /* Set up for the first time */
        if (typeof DISQUS === "undefined") {
          var script = document.createElement("script")
          script.async = true
          script.src = "https://{{ disqus }}.disqus.com/embed.js"
          script.setAttribute("data-timestamp", Date.now())

          /* Inject script tag */
          document.body.appendChild(script)

        /* Set up on navigation (instant loading) */
        } else {
          DISQUS.reset({
            reload: true,
            config: disqus_config
          })
        }
      </script>
    {% endif %}
    ```

    1.  Ensure you've set [`site_url`][site_url] in `mkdocs.yml`.

=== ":octicons-file-code-16: mkdocs.yml"

    ``` yaml
    extra:
      disqus: <shortname> # (1)!
    ```

    1.  Add your Disqus [shortname] here.

  [theme extension]: ../customization.md#extending-the-theme
  [content partial]: https://github.com/squidfunk/mkdocs-material/blob/master/src/partials/content.html
  [shortname]: https://help.disqus.com/en/articles/1717111-what-s-a-shortname

#### on a single page

When [Metadata] is enabled, Disqus can be enabled or disabled for a single page
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
