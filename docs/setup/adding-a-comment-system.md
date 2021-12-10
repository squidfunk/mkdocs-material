---
template: overrides/main.html
---

# Adding a comment system

Material for MkDocs allows to easily add the third-party comment system of your
choice to the footer of every page by using [theme extension]. On this page do
we show two examples using [Disqus] and [Giscus] respectively.

  [Disqus]: https://disqus.com/
  [Giscus]: https://giscus.app/

## Customization

### Extending the theme

In order to integrate a third-party comment provider offering a JavaScript-based
solution, follow the guide on [theme extension], copy the contents from the
[`content.html`][content partial] partial and create a file at the same location
in the `overrides` folder:

=== ":octicons-file-code-16: Disqus integration"

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
            "{{ page.canonical_url | replace(config.site_url, '') }}" // (1)
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

=== ":octicons-file-code-16: Giscus integration"
    
    Please make sure to follow all required steps for Giscus to
    work, including adding the Giscus app to your repository and
    enabling the Discussion feature for it.

    ``` html
    <!-- Add copied contents from original content.html here -->

    <!-- Get setting from mkdocs.yml, but allow page-level overrides -->
    {% set disqus = config.extra.giscus %}
    {% if page and page.meta and page.meta.disqus is string %}
      {% set disqus = page.meta.giscus %}
    {% endif %}

    <!-- Inject Disqus into current page -->
    {% if not page.is_homepage and giscus %}
      <h2 id="__comments">{{ lang.t("meta.comments") }}</h2>
      <div class="giscus"></div> <!-- (1) -->
      <script>
        var giscus_config = function() {
          this.page.url = "{{ page.canonical_url }}"
          this.page.identifier =
            "{{ page.canonical_url | replace(config.site_url, '') }}" // (2)
        }

        /* Set up for the first time */
        if (typeof GISCUS === "undefined") {
          var script = document.createElement("script")
          script.async = true
          script.src = "https://{{ disqus }}.disqus.com/embed.js"
          script.setAttribute("data-repo", "squidfunk/mkdocs-material") // (3)
          script.setAttribute("data-repo-id", "eyxxxxx=")
          script.setAttribute("data-category", "discussion")
          script.setAttribute("data-category-id", "abc123")
          script.setAttribute("data-mapping", "pathname")
          script.setAttribute("data-reactions-enabled", "1")
          script.setAttribute("data-emit-metadata", "0")
          script.setAttribute("data-theme", "light")
          script.setAttribute("data-lang", "en")
          script.setAttribute("crossorigin", "anonymous")

          /* Inject script tag */
          document.body.appendChild(script)

        /* Set up on navigation (instant loading) */
        } else {
          GISCUS.reset({
            reload: true,
            config: giscus_config
          })
        }
      </script>
    {% endif %}
    ```
    
    1.  The div needs to be called `giscus` as that sets where the comment system should be located at
    2.  Ensure you've set [`site_url`][site_url] in `mkdocs.yml`.
    3.  Please see the [Giscus site][Giscus] what each `data-x` attribute is used for.

  [site_url]: https://www.mkdocs.org/user-guide/configuration/#site_url

### mkdocs.yml

All you have to do now is set the right value inside the `mkdocs.yml` under the
`extra` section.

Note that the version with Disqus is used as identifier for what comment system
to load while on Giscus it is only used to enable/disable it by default.

=== ":octicons-file-code-16: Disqus"

    ``` yaml
    extra:
      disqus: <shortname> # (1)
    ```

    1.  Add your Disqus [shortname] here.
    
=== ":octicons-file-code-16: Giscus"

    ``` yaml
    extra:
      giscus: 'yes'
    ```

  [theme extension]: ../customization.md#extending-the-theme
  [content partial]: https://github.com/squidfunk/mkdocs-material/blob/master/src/partials/content.html
  [shortname]: https://help.disqus.com/en/articles/1717111-what-s-a-shortname

#### on a single page

When [Metadata] is enabled, Disqus/Giscus can be enabled or disabled for a single page
with custom front matter. Add the following lines at the top of a Markdown file:

=== ":octicons-check-circle-fill-16: Enabled"

    ``` bash
    ---
    disqus: <shortname> # (1)
    ---

    # Document title
    ...
    ```
    
    1.  Change this to `giscus: yes` for Giscus.

=== ":octicons-skip-16: Disabled"

    ``` bash
    ---
    disqus: "" # (1)
    ---

    # Document title
    ...
    ```
    
    1.  Change this to `giscus: ""` for Giscus.

  [Metadata]: extensions/python-markdown.md#metadata

