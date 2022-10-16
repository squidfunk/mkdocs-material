---
template: overrides/main.html
---

# Adding a comment system

Material for MkDocs allows to easily add the third-party comment system of your
choice to the footer of any page by using [theme extension]. As an example,
we'll be integrating [Giscus], which is Open Source, free, and uses GitHub
discussions as a backend.

  [Giscus]: https://giscus.app/

## Customization

### Giscus integration

Before you can use [Giscus], you need to complete the following steps:

1.  __Install the [Giscus GitHub App]__ and grant access to the repository
    that should host comments as GitHub discussions. Note that this can be a
    repository different from your documentation.
2.  __Visit [Giscus] and generate the snippet__ through their configuration tool
    to load the comment system. Copy the snippet for the next step. The
    resulting snippet should look similar to this:

    ``` html
    <script
      src="https://giscus.app/client.js"
      data-repo="<username>/<repository>"
      data-repo-id="..."
      data-category="..."
      data-category-id="..."
      data-mapping="pathname"
      data-reactions-enabled="1"
      data-emit-metadata="1"
      data-theme="light"
      data-lang="en"
      crossorigin="anonymous"
      async
    >
    </script>
    ```

You can either integrate [Giscus] on every page by overriding the `main.html`
template, or create a new template (e.g. `blog.html`) to extend from `main.html`
which includes the comment system, so you can decide for each page whether you
want to allow comments or not.

In order to integrate [Giscus], follow the guide on [theme extension] and
[override the `content` block][overriding blocks], extending the default by
calling the `super()` function at the beginning of the block:

``` html hl_lines="8"
{% extends "base.html" %}

{% block content %}
  {{ super() }}

  <!-- Giscus -->
  <h2 id="__comments">{{ lang.t("meta.comments") }}</h2>
  <!-- Replace with generated snippet -->

  <!-- Reload on palette change -->
  <script>
    var palette = __md_get("__palette")
    if (palette && typeof palette.color === "object")
      if (palette.color.scheme === "slate") {
        var giscus = document.querySelector("script[src*=giscus]")
        giscus.setAttribute("data-theme", "dark") // (1)!
      }

    /* Register event handlers after documented loaded */
    document.addEventListener("DOMContentLoaded", function() {
      var ref = document.querySelector("[data-md-component=palette]")
      ref.addEventListener("change", function() {
        var palette = __md_get("__palette")
        if (palette && typeof palette.color === "object") {
          var theme = palette.color.scheme === "slate" ? "dark" : "light"

          /* Instruct Giscus to change theme */
          var frame = document.querySelector(".giscus-frame")
          frame.contentWindow.postMessage(
            { giscus: { setConfig: { theme } } },
            "https://giscus.app"
          )
        }
      })
    })
  </script>
{% endblock %}
```

1.  This code block ensures that [Giscus] renders with a dark theme when the
    palette is set to `slate`. Note that multiple dark themes are available,
    so you can change it to your liking.

Replace the highlighted line with the snippet you generated with the [Giscus]
configuration tool in the previous step. If you extended `main.html`, you should
now see the [Giscus] comment system at the bottom of each page. If you created
a new, separate template, you can enable Giscus by [setting the page template]
via front matter.

  [Giscus GitHub App]: https://github.com/apps/giscus
  [theme extension]: ../customization.md#extending-the-theme
  [overriding blocks]: ../customization.md#overriding-blocks
  [setting the page template]: ../reference/index.md#setting-the-page-template
