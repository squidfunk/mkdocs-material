---
template: overrides/main.html
---

# How to upgrade

Upgrade to the latest version with:

```
pip install --upgrade mkdocs-material
```

Show the currently installed version with:

```
pip show mkdocs-material
```

## Upgrading from 7.x to 8.x

### What's new?

- Added support for code annotations
- Added support for anchor tracking
- Added support for version warning
- Added `copyright` partial for easier override
- Removed deprecated content tabs legacy implementation
- Removed deprecated `seealso` admonition type
- Removed deprecated `site_keywords` setting (unsupported by MkDocs)
- Removed deprecated prebuilt search index support
- Removed deprecated web app manifest – use customization
- Removed `extracopyright` variable – use new `copyright` partial
- Removed Disqus integation – use customization
- Switched to `:is()` selectors for simple selector lists
- Switched autoprefixer from `last 4 years` to `last 2 years`
- Improved CSS overall to match modern standards
- Improved CSS variable semantics for fonts
- Improved extensibility by restructuring partials
- Improved handling of `details` when printing
- Improved keyboard navigation for footnotes
- Fixed #3214: Search highlighting breaks site when empty

### Changes to `mkdocs.yml`

#### `pymdownx.tabbed`

Support for the legacy style of the [Tabbed] extension was dropped in favor
of the new, alternate implementation which has [better behavior on mobile 
viewports]:

=== "8.x"

    ``` yaml
    markdown_extensions:
      - pymdownx.tabbed:
          alternate_style: true 
    ```

=== "7.x"

    ``` yaml
    markdown_extensions:
      - pymdownx.tabbed
    ```

  [Tabbed]: setup/extensions/python-markdown-extensions.md#tabbed
  [better behavior on mobile viewports]: https://twitter.com/squidfunk/status/1424740370596958214

#### `pymdownx.superfences`

The `*-experimental` suffix must be removed from the [custom fence][SuperFences]
class property, which is used to target code blocks to be rendered as [diagrams]
using [Mermaid.js]:

=== "8.x"

    ``` yaml
    markdown_extensions:
      - pymdownx.superfences:
          custom_fences:
            - name: mermaid
              class: mermaid
              format: !!python/name:pymdownx.superfences.fence_code_format
    ```

=== "7.x"

    ``` yaml
    markdown_extensions:
      - pymdownx.superfences:
          custom_fences:
            - name: mermaid
              class: mermaid-experimental
              format: !!python/name:pymdownx.superfences.fence_code_format
    ```

  [SuperFences]: setup/extensions/python-markdown-extensions.md#superfences
  [diagrams]: reference/diagrams.md
  [Mermaid.js]: https://mermaid-js.github.io/mermaid/

#### `google_analytics`

This option was [deprecated in MkDocs 1.2.0], as the implementation of a
JavaScript-based analytics integration is the responsibility of a theme.
The following lines must be changed:

=== "8.x"

    ``` yaml
    extra:
      analytics:
        provider: google
        property: UA-XXXXXXXX-X
    ```

=== "7.x"

    ``` yaml
    google_analytics:
      - UA-XXXXXXXX-X
      - auto
    ```

  [deprecated in MkDocs 1.2.0]: https://www.mkdocs.org/about/release-notes/#backward-incompatible-changes-in-12

### Changes to `*.html` files { data-search-exclude }

The templates have undergone a set of changes to make them future-proof. If
you've used theme extension to override a block or template, make sure that it
matches the new structure:

- If you've overridden a __block__, check `base.html` for potential changes
- If you've overridden a __template__, check the respective `*.html` file for
  potential changes

=== ":octicons-file-code-16: base.html"

    ``` diff
    @@ -13,11 +13,6 @@
           {% elif config.site_description %}
             <meta name="description" content="{{ config.site_description }}">
           {% endif %}
    -      {% if page and page.meta and page.meta.keywords %}
    -        <meta name="keywords" content="{{ page.meta.keywords }}">
    -      {% elif config.site_keywords %}
    -        <meta name="keywords" content="{{ config.site_keywords }}">
    -      {% endif %}
           {% if page and page.meta and page.meta.author %}
             <meta name="author" content="{{ page.meta.author }}">
           {% elif config.site_author %}
    @@ -61,15 +56,13 @@
                 font.text | replace(' ', '+') + ':300,400,400i,700%7C' +
                 font.code | replace(' ', '+')
               }}&display=fallback">
    -        <style>:root{--md-text-font-family:"{{ font.text }}";--md-code-font-family:"{{ font.code }}"}</style>
    +        <style>:root{--md-text-font:"{{ font.text }}";--md-code-font:"{{ font.code }}"}</style>
           {% endif %}
         {% endblock %}
    -    {% if config.extra.manifest %}
    -      <link rel="manifest" href="{{ config.extra.manifest | url }}" crossorigin="use-credentials">
    -    {% endif %}
         {% for path in config["extra_css"] %}
           <link rel="stylesheet" href="{{ path | url }}">
         {% endfor %}
    +    {% include "partials/javascripts/base.html" %}
         {% block analytics %}
           {% include "partials/integrations/analytics.html" %}
         {% endblock %}
    @@ -89,7 +82,6 @@
         <body dir="{{ direction }}">
       {% endif %}
         {% set features = config.theme.features or [] %}
    -    {% include "partials/javascripts/base.html" %}
         {% if not config.theme.palette is mapping %}
           {% include "partials/javascripts/palette.html" %}
         {% endif %}
    @@ -106,13 +98,25 @@
         </div>
         <div data-md-component="announce">
           {% if self.announce() %}
    -        <aside class="md-banner md-announce">
    -          <div class="md-banner__inner md-announce__inner md-grid md-typeset">
    +        <aside class="md-banner">
    +          <div class="md-banner__inner md-grid md-typeset">
                 {% block announce %}{% endblock %}
               </div>
             </aside>
           {% endif %}
         </div>
    +    {% if config.extra.version %}
    +      <div data-md-component="outdated" hidden>
    +        <aside class="md-banner md-banner--warning">
    +          {% if self.outdated() %}
    +            <div class="md-banner__inner md-grid md-typeset">
    +              {% block outdated %}{% endblock %}
    +            </div>
    +            {% include "partials/javascripts/outdated.html" %}
    +          {% endif %}
    +        </aside>
    +      </div>
    +    {% endif %}
         {% block header %}
           {% include "partials/header.html" %}
         {% endblock %}
    @@ -156,25 +160,7 @@
               <div class="md-content" data-md-component="content">
                 <article class="md-content__inner md-typeset">
                   {% block content %}
    -                {% if page.edit_url %}
    -                  <a href="{{ page.edit_url }}" title="{{ lang.t('edit.link.title') }}" class="md-content__button md-icon">
    -                    {% include ".icons/material/pencil.svg" %}
    -                  </a>
    -                {% endif %}
    -                {% if not "\x3ch1" in page.content %}
    -                  <h1>{{ page.title | d(config.site_name, true)}}</h1>
    -                {% endif %}
    -                {{ page.content }}
    -                {% if page and page.meta %}
    -                  {% if page.meta.git_revision_date_localized or
    -                        page.meta.revision_date
    -                  %}
    -                    {% include "partials/source-file.html" %}
    -                  {% endif %}
    -                {% endif %}
    -              {% endblock %}
    -              {% block disqus %}
    -                {% include "partials/integrations/disqus.html" %}
    +                {% include "partials/content.html" %}
                   {% endblock %}
                 </article>
               </div>
    ```

    ``` diff
    @@ -38,13 +38,6 @@
             <meta name="description" content="{{ config.site_description }}" />
           {% endif %}

    -      <!-- Page keywords -->
    -      {% if page and page.meta and page.meta.keywords %}
    -        <meta name="keywords" content="{{ page.meta.keywords }}" />
    -      {% elif config.site_keywords %}
    -        <meta name="keywords" content="{{ config.site_keywords }}" />
    -      {% endif %}
    -
           <!-- Page author -->
           {% if page and page.meta and page.meta.author %}
             <meta name="author" content="{{ page.meta.author }}" />
    @@ -120,27 +113,21 @@
             />
             <style>
               :root {
    -            --md-text-font-family: "{{ font.text }}";
    -            --md-code-font-family: "{{ font.code }}";
    +            --md-text-font: "{{ font.text }}";
    +            --md-code-font: "{{ font.code }}";
               }
             </style>
           {% endif %}
         {% endblock %}

    -    <!-- Progressive Web App Manifest -->
    -    {% if config.extra.manifest %}
    -      <link
    -        rel="manifest"
    -        href="{{ config.extra.manifest | url }}"
    -        crossorigin="use-credentials"
    -      />
    -    {% endif %}
    -
         <!-- Custom style sheets -->
         {% for path in config["extra_css"] %}
           <link rel="stylesheet" href="{{ path | url }}" />
         {% endfor %}

    +    <!-- Helper functions for inline scripts -->
    +    {% include "partials/javascripts/base.html" %}
    +
         <!-- Analytics -->
         {% block analytics %}
           {% include "partials/integrations/analytics.html" %}
    @@ -172,7 +159,6 @@

         <!-- Retrieve features from configuration -->
         {% set features = config.theme.features or [] %}
    -    {% include "partials/javascripts/base.html" %}

         <!-- User preference: color palette -->
         {% if not config.theme.palette is mapping %}
    @@ -214,14 +200,28 @@
         <!-- Announcement bar -->
         <div data-md-component="announce">
           {% if self.announce() %}
    -        <aside class="md-banner md-announce">
    -          <div class="md-banner__inner md-announce__inner md-grid md-typeset">
    +        <aside class="md-banner">
    +          <div class="md-banner__inner md-grid md-typeset">
                 {% block announce %}{% endblock %}
               </div>
             </aside>
           {% endif %}
         </div>

    +    <!-- Version warning -->
    +    {% if config.extra.version %}
    +      <div data-md-component="outdated" hidden>
    +        <aside class="md-banner md-banner--warning">
    +          {% if self.outdated() %}
    +            <div class="md-banner__inner md-grid md-typeset">
    +              {% block outdated %}{% endblock %}
    +            </div>
    +            {% include "partials/javascripts/outdated.html" %}
    +          {% endif %}
    +        </aside>
    +      </div>
    +    {% endif %}
    +
         <!-- Header -->
         {% block header %}
           {% include "partials/header.html" %}
    @@ -295,49 +295,11 @@
                   {% block content %}
    -
    -                <!-- Edit button -->
    -                {% if page.edit_url %}
    -                  <a
    -                    href="{{ page.edit_url }}"
    -                    title="{{ lang.t('edit.link.title') }}"
    -                    class="md-content__button md-icon"
    -                  >
    -                    {% include ".icons/material/pencil.svg" %}
    -                  </a>
    -                {% endif %}
    -
    -                <!--
    -                  Hack: check whether the content contains a h1 headline. If it
    -                  doesn't, the page title (or respectively site name) is used
    -                  as the main headline.
    -                -->
    -                {% if not "\x3ch1" in page.content %}
    -                  <h1>{{ page.title | d(config.site_name, true)}}</h1>
    -                {% endif %}
    -
    -                <!-- Markdown content -->
    -                {{ page.content }}
    -
    -                <!-- Last update of source file -->
    -                {% if page and page.meta %}
    -                  {% if page.meta.git_revision_date_localized or
    -                        page.meta.revision_date
    -                  %}
    -                    {% include "partials/source-file.html" %}
    -                  {% endif %}
    -                {% endif %}
    -              {% endblock %}
    -
    -              <!-- Disqus integration -->
    -              {% block disqus %}
    -                {% include "partials/integrations/disqus.html" %}
    +                {% include "partials/content.html" %}
                   {% endblock %}
                 </article>
               </div>
    ```

=== ":octicons-file-code-16: partials/copyright.html"

    ``` diff
    @@ -0,0 +1,16 @@
    +{#-
    +  This file was automatically generated - do not edit
    +-#}
    +<div class="md-copyright">
    +  {% if config.copyright %}
    +    <div class="md-copyright__highlight">
    +      {{ config.copyright }}
    +    </div>
    +  {% endif %}
    +  {% if not config.extra.generator == false %}
    +    Made with
    +    <a href="https://squidfunk.github.io/mkdocs-material/" target="_blank" rel="noopener">
    +      Material for MkDocs
    +    </a>
    +  {% endif %}
    +</div>
    ```

=== ":octicons-file-code-16: partials/footer.html"

    ``` diff
    @@ -41,21 +40,10 @@
       {% endif %}
       <div class="md-footer-meta md-typeset">
         <div class="md-footer-meta__inner md-grid">
    -      <div class="md-footer-copyright">
    -        {% if config.copyright %}
    -          <div class="md-footer-copyright__highlight">
    -            {{ config.copyright }}
    -          </div>
    -        {% endif %}
    -        {% if not config.extra.generator == false %}
    -          Made with
    -          <a href="https://squidfunk.github.io/mkdocs-material/" target="_blank" rel="noopener">
    -            Material for MkDocs
    -          </a>
    -        {% endif %}
    -        {{ extracopyright }}
    -      </div>
    -      {% include "partials/social.html" %}
    +      {% include "partials/copyright.html" %}
    +      {% if config.extra.social %}
    +        {% include "partials/social.html" %}
    +      {% endif %}
         </div>
       </div>
     </footer>
    ```

=== ":octicons-file-code-16: partials/social.html"

    ``` diff
    @@ -4,17 +4,15 @@
    -{% if config.extra.social %}
    -  <div class="md-footer-social">
    -    {% for social in config.extra.social %}
    -      {% set title = social.name %}
    -      {% if not title and "//" in social.link %}
    -        {% set _,url = social.link.split("//") %}
    -        {% set title = url.split("/")[0] %}
    -      {% endif %}
    -      <a href="{{ social.link }}" target="_blank" rel="noopener" title="{{ title | e }}" class="md-footer-social__link">
    -        {% include ".icons/" ~ social.icon ~ ".svg" %}
    -      </a>
    -    {% endfor %}
    -  </div>
    -{% endif %}
    +<div class="md-social">
    +  {% for social in config.extra.social %}
    +    {% set title = social.name %}
    +    {% if not title and "//" in social.link %}
    +      {% set _, url = social.link.split("//") %}
    +      {% set title  = url.split("/")[0] %}
    +    {% endif %}
    +    <a href="{{ social.link }}" target="_blank" rel="noopener" title="{{ title | e }}" class="md-social__link">
    +      {% include ".icons/" ~ social.icon ~ ".svg" %}
    +    </a>
    +  {% endfor %}
    +</div>
    ```

## Upgrading from 6.x to 7.x

### What's new?

- Added support for deploying multiple versions
- Added support for integrating a language selector
- Added support for rendering admonitions as inline blocks
- Rewrite of the underlying reactive architecture
- Removed Webpack in favor of reactive build strategy (–480 dependencies)
- Fixed keyboard navigation for code blocks after content tabs switch

### Changes to `mkdocs.yml`

#### `extra.version.method`

The versioning method configuration was renamed to `extra.version.provider` to
allow for different versioning strategies in the future:

=== "7.x"

    ``` yaml
    extra:
      version:
        provider: mike
    ```

=== "6.x"

    ``` yaml
    extra:
      version:
        method: mike
    ```

### Changes to `*.html` files { data-search-exclude }

The templates have undergone a set of changes to make them future-proof. If
you've used theme extension to override a block or template, make sure that it
matches the new structure:

- If you've overridden a __block__, check `base.html` for potential changes
- If you've overridden a __template__, check the respective `*.html` file for
  potential changes

=== ":octicons-file-code-16: base.html"

    ``` diff
    @@ -61,7 +61,7 @@
                 font.text | replace(' ', '+') + ':300,400,400i,700%7C' +
                 font.code | replace(' ', '+')
               }}&display=fallback">
    -        <style>body,input{font-family:"{{ font.text }}",-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif}code,kbd,pre{font-family:"{{ font.code }}",SFMono-Regular,Consolas,Menlo,monospace}</style>
    +        <style>:root{--md-text-font-family:"{{ font.text }}";--md-code-font-family:"{{ font.code }}"}</style>
           {% endif %}
         {% endblock %}
         {% if config.extra.manifest %}
    @@ -131,7 +131,7 @@
                   {% if page and page.meta and page.meta.hide %}
                     {% set hidden = "hidden" if "navigation" in page.meta.hide %}
                   {% endif %}
    -              <div class="md-sidebar md-sidebar--primary" data-md-component="navigation" {{ hidden }}>
    +              <div class="md-sidebar md-sidebar--primary" data-md-component="sidebar" data-md-type="navigation" {{ hidden }}>
                     <div class="md-sidebar__scrollwrap">
                       <div class="md-sidebar__inner">
                         {% include "partials/nav.html" %}
    @@ -143,7 +143,7 @@
                   {% if page and page.meta and page.meta.hide %}
                     {% set hidden = "hidden" if "toc" in page.meta.hide %}
                   {% endif %}
    -              <div class="md-sidebar md-sidebar--secondary" data-md-component="toc" {{ hidden }}>
    +              <div class="md-sidebar md-sidebar--secondary" data-md-component="sidebar" data-md-type="toc" {{ hidden }}>
                     <div class="md-sidebar__scrollwrap">
                       <div class="md-sidebar__inner">
                         {% include "partials/toc.html" %}
    @@ -152,7 +152,7 @@
                   </div>
                 {% endif %}
               {% endblock %}
    -          <div class="md-content">
    +          <div class="md-content" data-md-component="content">
                 <article class="md-content__inner md-typeset">
                   {% block content %}
                     {% if page.edit_url %}
    @@ -183,10 +183,18 @@
             {% include "partials/footer.html" %}
           {% endblock %}
         </div>
    -    {% block scripts %}
    -      <script src="{{ 'assets/javascripts/vendor.18f0862e.min.js' | url }}"></script>
    -      <script src="{{ 'assets/javascripts/bundle.994580cf.min.js' | url }}"></script>
    -      {%- set translations = {} -%}
    +    <div class="md-dialog" data-md-component="dialog">
    +      <div class="md-dialog__inner md-typeset"></div>
    +    </div>
    +    {% block config %}
    +      {%- set app = {
    +        "base": base_url,
    +        "features": features,
    +        "translations": {},
    +        "search": "assets/javascripts/workers/search.217ffd95.min.js" | url,
    +        "version": config.extra.version or None
    +      } -%}
    +      {%- set translations = app.translations -%}
           {%- for key in [
             "clipboard.copy",
             "clipboard.copied",
    @@ -204,19 +212,12 @@
           ] -%}
             {%- set _ = translations.update({ key: lang.t(key) }) -%}
           {%- endfor -%}
    -      <script id="__lang" type="application/json">
    -        {{- translations | tojson -}}
    -      </script>
    -      {% block config %}{% endblock %}
    -      <script>
    -        app = initialize({
    -          base: "{{ base_url }}",
    -          features: {{ features or [] | tojson }},
    -          search: Object.assign({
    -            worker: "{{ 'assets/javascripts/worker/search.9c0e82ba.min.js' | url }}"
    -          }, typeof search !== "undefined" && search)
    -        })
    +      <script id="__config" type="application/json">
    +        {{- app | tojson -}}
           </script>
    +    {% endblock %}
    +    {% block scripts %}
    +      <script src="{{ 'assets/javascripts/bundle.926459b3.min.js' | url }}"></script>
           {% for path in config["extra_javascript"] %}
             <script src="{{ path | url }}"></script>
           {% endfor %}
    ```

=== ":octicons-file-code-16: partials/footer.html"

    ``` diff
    -    <div class="md-footer-nav">
    -      <nav class="md-footer-nav__inner md-grid" aria-label="{{ lang.t('footer.title') }}">
    -        {% if page.previous_page %}
    -          <a href="{{ page.previous_page.url | url }}" class="md-footer-nav__link md-footer-nav__link--prev" rel="prev">
    -            <div class="md-footer-nav__button md-icon">
    -              {% include ".icons/material/arrow-left.svg" %}
    -            </div>
    -            <div class="md-footer-nav__title">
    -              <div class="md-ellipsis">
    -                <span class="md-footer-nav__direction">
    -                  {{ lang.t("footer.previous") }}
    -                </span>
    -                {{ page.previous_page.title }}
    -              </div>
    -            </div>
    -          </a>
    -        {% endif %}
    -        {% if page.next_page %}
    -          <a href="{{ page.next_page.url | url }}" class="md-footer-nav__link md-footer-nav__link--next" rel="next">
    -            <div class="md-footer-nav__title">
    -              <div class="md-ellipsis">
    -                <span class="md-footer-nav__direction">
    -                  {{ lang.t("footer.next") }}
    -                </span>
    -                {{ page.next_page.title }}
    -              </div>
    +    <nav class="md-footer__inner md-grid" aria-label="{{ lang.t('footer.title') }}">
    +      {% if page.previous_page %}
    +        <a href="{{ page.previous_page.url | url }}" class="md-footer__link md-footer__link--prev" rel="prev">
    +          <div class="md-footer__button md-icon">
    +            {% include ".icons/material/arrow-left.svg" %}
    +          </div>
    +          <div class="md-footer__title">
    +            <div class="md-ellipsis">
    +              <span class="md-footer__direction">
    +                {{ lang.t("footer.previous") }}
    +              </span>
    +              {{ page.previous_page.title }}
                 </div>
    -            <div class="md-footer-nav__button md-icon">
    -              {% include ".icons/material/arrow-right.svg" %}
    +          </div>
    +        </a>
    +      {% endif %}
    +      {% if page.next_page %}
    +        <a href="{{ page.next_page.url | url }}" class="md-footer__link md-footer__link--next" rel="next">
    +          <div class="md-footer__title">
    +            <div class="md-ellipsis">
    +              <span class="md-footer__direction">
    +                {{ lang.t("footer.next") }}
    +              </span>
    +              {{ page.next_page.title }}
                 </div>
    -          </a>
    -        {% endif %}
    -      </nav>
    -    </div>
    +          </div>
    +          <div class="md-footer__button md-icon">
    +            {% include ".icons/material/arrow-right.svg" %}
    +          </div>
    +        </a>
    +      {% endif %}
    +    </nav>
       {% endif %}
       <div class="md-footer-meta md-typeset">
         <div class="md-footer-meta__inner md-grid">
    ```

=== ":octicons-file-code-16: partials/header.html"

    ``` diff
    @@ -6,21 +6,21 @@
       {% set site_url = site_url ~ "/index.html" %}
     {% endif %}
     <header class="md-header" data-md-component="header">
    -  <nav class="md-header-nav md-grid" aria-label="{{ lang.t('header.title') }}">
    -    <a href="{{ site_url }}" title="{{ config.site_name | e }}" class="md-header-nav__button md-logo" aria-label="{{ config.site_name }}">
    +  <nav class="md-header__inner md-grid" aria-label="{{ lang.t('header.title') }}">
    +    <a href="{{ site_url }}" title="{{ config.site_name | e }}" class="md-header__button md-logo" aria-label="{{ config.site_name }}">
           {% include "partials/logo.html" %}
         </a>
    -    <label class="md-header-nav__button md-icon" for="__drawer">
    +    <label class="md-header__button md-icon" for="__drawer">
           {% include ".icons/material/menu" ~ ".svg" %}
         </label>
    -    <div class="md-header-nav__title" data-md-component="header-title">
    -      <div class="md-header-nav__ellipsis">
    -        <div class="md-header-nav__topic">
    +    <div class="md-header__title" data-md-component="header-title">
    +      <div class="md-header__ellipsis">
    +        <div class="md-header__topic">
               <span class="md-ellipsis">
                 {{ config.site_name }}
               </span>
             </div>
    -        <div class="md-header-nav__topic">
    +        <div class="md-header__topic" data-md-component="header-topic">
               <span class="md-ellipsis">
                 {% if page and page.meta and page.meta.title %}
                   {{ page.meta.title }}
    @@ -31,14 +31,35 @@
             </div>
           </div>
         </div>
    +    <div class="md-header__options">
    +      {% if config.extra.alternate %}
    +        <div class="md-select">
    +          {% set icon = config.theme.icon.alternate or "material/translate" %}
    +          <span class="md-header__button md-icon">
    +            {% include ".icons/" ~ icon ~ ".svg" %}
    +          </span>
    +          <div class="md-select__inner">
    +            <ul class="md-select__list">
    +              {% for alt in config.extra.alternate %}
    +                <li class="md-select__item">
    +                  <a href="{{ alt.link | url }}" class="md-select__link">
    +                    {{ alt.name }}
    +                  </a>
    +                </li>
    +                {% endfor %}
    +            </ul>
    +          </div>
    +        </div>
    +      {% endif %}
    +    </div>
         {% if "search" in config["plugins"] %}
    -      <label class="md-header-nav__button md-icon" for="__search">
    +      <label class="md-header__button md-icon" for="__search">
             {% include ".icons/material/magnify.svg" %}
           </label>
           {% include "partials/search.html" %}
         {% endif %}
         {% if config.repo_url %}
    -      <div class="md-header-nav__source">
    +      <div class="md-header__source">
             {% include "partials/source.html" %}
           </div>
         {% endif %}
    ```

=== ":octicons-file-code-16: partials/source.html"

    ``` diff
    @@ -4,5 +4,5 @@
     {% import "partials/language.html" as lang with context %}
    -<a href="{{ config.repo_url }}" title="{{ lang.t('source.link.title') }}" class="md-source">
    +<a href="{{ config.repo_url }}" title="{{ lang.t('source.link.title') }}"  class="md-source" data-md-component="source">
       <div class="md-source__icon md-icon">
         {% set icon = config.theme.icon.repo or "fontawesome/brands/git-alt" %}
         {% include ".icons/" ~ icon ~ ".svg" %}
    ```

=== ":octicons-file-code-16: partials/toc.html"

    ``` diff
    @@ -12,7 +12,7 @@
           <span class="md-nav__icon md-icon"></span>
           {{ lang.t("toc.title") }}
         </label>
    -    <ul class="md-nav__list" data-md-scrollfix>
    +    <ul class="md-nav__list" data-md-component="toc" data-md-scrollfix>
           {% for toc_item in toc %}
             {% include "partials/toc-item.html" %}
           {% endfor %}
    ```

## Upgrading from 5.x to 6.x

### What's new?

- Improved search result look and feel
- Improved search result stability while typing
- Improved search result grouping (pages + headings)
- Improved search result relevance and scoring
- Added display of missing query terms to search results
- Reduced size of vendor bundle by 25% (84kb → 67kb)
- Reduced size of the Docker image to improve CI build performance
- Removed hero partial in favor of custom implementation
- Removed deprecated front matter features

### Changes to `mkdocs.yml`

Following is a list of changes that need to be made to `mkdocs.yml`. Note that
you only have to adjust the value if you defined it, so if your configuration
does not contain the key, you can skip it.

#### `theme.features`

All feature flags that can be set from `mkdocs.yml`, like [tabs] and
[instant loading], are now prefixed with the name of the component or
function they apply to, e.g. `navigation.*`:

=== "6.x"

    ``` yaml
    theme:
      features:
        - navigation.tabs
        - navigation.instant
    ```

=== "5.x"

    ``` yaml
    theme:
      features:
        - tabs
        - instant
    ```

  [tabs]: setup/setting-up-navigation.md#navigation-tabs
  [instant loading]: setup/setting-up-navigation.md#instant-loading

### Changes to `*.html` files { data-search-exclude }

The templates have undergone a set of changes to make them future-proof. If
you've used theme extension to override a block or template, make sure that it
matches the new structure:

- If you've overridden a __block__, check `base.html` for potential changes
- If you've overridden a __template__, check the respective `*.html` file for
  potential changes

=== ":octicons-file-code-16: base.html"

    ``` diff
    @@ -22,13 +22,6 @@

     {% import "partials/language.html" as lang with context %}

    -<!-- Theme options -->
    -{% set palette = config.theme.palette %}
    -{% if not palette is mapping %}
    -  {% set palette = palette | first %}
    -{% endif %}
    -{% set font = config.theme.font %}
    -
     <!doctype html>
     <html lang="{{ lang.t('language') }}" class="no-js">
       <head>
    @@ -45,21 +38,8 @@
             <meta name="description" content="{{ config.site_description }}" />
           {% endif %}

    -      <!-- Redirect -->
    -      {% if page and page.meta and page.meta.redirect %}
    -        <script>
    -          var anchor = window.location.hash.substr(1)
    -          location.href = '{{ page.meta.redirect }}' +
    -            (anchor ? '#' + anchor : '')
    -        </script>
    -
    -        <!-- Fallback in case JavaScript is not available -->
    -        <meta http-equiv="refresh" content="0; url={{ page.meta.redirect }}" />
    -        <meta name="robots" content="noindex" />
    -        <link rel="canonical" href="{{ page.meta.redirect }}" />
    -
           <!-- Canonical -->
    -      {% elif page.canonical_url %}
    +      {% if page.canonical_url %}
             <link rel="canonical" href="{{ page.canonical_url }}" />
           {% endif %}

    @@ -96,20 +76,21 @@
           <link rel="stylesheet" href="{{ 'assets/stylesheets/main.css' | url }}" />

           <!-- Extra color palette -->
    -      {% if palette.scheme or palette.primary or palette.accent %}
    +      {% if config.theme.palette %}
    +        {% set palette = config.theme.palette %}
             <link
               rel="stylesheet"
               href="{{ 'assets/stylesheets/palette.css' | url }}"
             />
    -      {% endif %}

    -      <!-- Theme-color meta tag for Android -->
    -      {% if palette.primary %}
    -        {% import "partials/palette.html" as map %}
    -        {% set primary = map.primary(
    -          palette.primary | replace(" ", "-") | lower
    -        ) %}
    -        <meta name="theme-color" content="{{ primary }}" />
    +        <!-- Theme-color meta tag for Android -->
    +        {% if palette.primary %}
    +          {% import "partials/palette.html" as map %}
    +          {% set primary = map.primary(
    +            palette.primary | replace(" ", "-") | lower
    +          ) %}
    +          <meta name="theme-color" content="{{ primary }}" />
    +        {% endif %}
           {% endif %}
         {% endblock %}

    @@ -120,7 +101,8 @@
         {% block fonts %}

           <!-- Load fonts from Google -->
    -      {% if font != false %}
    +      {% if config.theme.font != false %}
    +        {% set font = config.theme.font %}
             <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin />
             <link
              rel="stylesheet"
    @@ -169,8 +151,12 @@

       <!-- Text direction and color palette, if defined -->
       {% set direction = config.theme.direction or lang.t('direction') %}
    -  {% if palette.scheme or palette.primary or palette.accent %}
    -    {% set scheme  = palette.scheme | lower %}
    +  {% if config.theme.palette %}
    +    {% set palette = config.theme.palette %}
    +    {% if not palette is mapping %}
    +      {% set palette = palette | first %}
    +    {% endif %}
    +    {% set scheme  = palette.scheme  | replace(" ", "-") | lower %}
         {% set primary = palette.primary | replace(" ", "-") | lower %}
         {% set accent  = palette.accent  | replace(" ", "-") | lower %}
         <body
    @@ -179,18 +165,19 @@
           data-md-color-primary="{{ primary }}"
           data-md-color-accent="{{ accent }}"
         >
    +
    +      <!-- Experimental: set color scheme based on preference -->
    +      {% if "preference" == scheme %}
    +        <script>
    +          if (matchMedia("(prefers-color-scheme: dark)").matches)
    +            document.body.setAttribute("data-md-color-scheme", "slate")
    +        </script>
    +      {% endif %}
    +
       {% else %}
         <body dir="{{ direction }}">
       {% endif %}

    -    <!-- Experimental: set color scheme based on preference -->
    -    {% if "preference" == palette.scheme %}
    -      <script>
    -        if (matchMedia("(prefers-color-scheme: dark)").matches)
    -          document.body.setAttribute("data-md-color-scheme", "slate")
    -      </script>
    -    {% endif %}
    -
         <!--
           State toggles - we need to set autocomplete="off" in order to reset the
           drawer on back button invocation in some browsers
    @@ -243,15 +230,11 @@
         <div class="md-container" data-md-component="container">

           <!-- Hero teaser -->
    -      {% block hero %}
    -        {% if page and page.meta and page.meta.hero %}
    -          {% include "partials/hero.html" with context %}
    -        {% endif %}
    -      {% endblock %}
    +      {% block hero %}{% endblock %}

           <!-- Tabs navigation -->
           {% block tabs %}
    -        {% if "tabs" in config.theme.features %}
    +        {% if "navigation.tabs" in config.theme.features %}
               {% include "partials/tabs.html" %}
             {% endif %}
           {% endblock %}
    @@ -310,13 +293,6 @@
                       </a>
                     {% endif %}

    -                <!-- Link to source file -->
    -                {% block source %}
    -                  {% if page and page.meta and page.meta.source %}
    -                    {% include "partials/source-link.html" %}
    -                  {% endif %}
    -                {% endblock %}
    -
                     <!--
                       Hack: check whether the content contains a h1 headline. If it
                       doesn't, the page title (or respectively site name) is used
    @@ -370,7 +346,10 @@
             "search.result.placeholder",
             "search.result.none",
             "search.result.one",
    -        "search.result.other"
    +        "search.result.other",
    +        "search.result.more.one",
    +        "search.result.more.other",
    +        "search.result.term.missing"
           ] -%}
             {%- set _ = translations.update({ key: lang.t(key) }) -%}
           {%- endfor -%}
    ```

=== ":octicons-file-code-16: partials/hero.html"

    ``` diff
    @@ -1,12 +0,0 @@
    -{#-
    -  This file was automatically generated - do not edit
    --#}
    -{% set class = "md-hero" %}
    -{% if "tabs" not in config.theme.features %}
    -  {% set class = "md-hero md-hero--expand" %}
    -{% endif %}
    -<div class="{{ class }}" data-md-component="hero">
    -  <div class="md-hero__inner md-grid">
    -    {{ page.meta.hero }}
    -  </div>
    -</div>
    ```

=== ":octicons-file-code-16: partials/source-link"

    ``` diff
    @@ -1,14 +0,0 @@
    -{#-
    -  This file was automatically generated - do not edit
    --#}
    -{% import "partials/language.html" as lang with context %}
    -{% set repo = config.repo_url %}
    -{% if repo | last == "/" %}
    -  {% set repo = repo[:-1] %}
    -{% endif %}
    -{% set path = page.meta.path | default("") %}
    -<a href="{{ [repo, path, page.meta.source] | join('/') }}" title="{{ page.meta.source }}" class="md-content__button md-icon">
    -  {{ lang.t("meta.source") }}
    -  {% set icon = config.theme.icon.repo or "fontawesome/brands/git-alt" %}
    -  {% include ".icons/" ~ icon ~ ".svg" %}
    -</a>
    ```

## Upgrading from 4.x to 5.x

### What's new?

- Reactive architecture – try `#!js app.dialog$.next("Hi!")` in the console
- [Instant loading] – make Material behave like a Single Page Application
- Improved CSS customization with [CSS variables] – set your brand's colors
- Improved CSS resilience, e.g. proper sidebar locking for customized headers
- Improved [icon integration] and configuration – now including over 5k icons
- Added possibility to use any icon for logo, repository and social links
- Search UI does not freeze anymore (moved to web worker)
- Search index built only once when using instant loading
- Improved extensible keyboard handling
- Support for [prebuilt search indexes]
- Support for displaying stars and forks for GitLab repositories
- Support for scroll snapping of sidebars and search results
- Reduced HTML and CSS footprint due to deprecation of Internet Explorer support
- Slight facelifting of some UI elements (admonitions, tables, ...)

  [CSS variables]: setup/changing-the-colors.md#custom-colors
  [icon integration]: reference/icons-emojis.md#search
  [prebuilt search indexes]: setup/setting-up-site-search.md#built-in-search

### Changes to `mkdocs.yml`

Following is a list of changes that need to be made to `mkdocs.yml`. Note that
you only have to adjust the value if you defined it, so if your configuration
does not contain the key, you can skip it.

#### `theme.feature`

Optional features like [tabs] and [instant loading] are now implemented as
flags and can be enabled by listing them in `mkdocs.yml` under `theme.features`:

=== "5.x"

    ``` yaml
    theme:
      features:
        - tabs
        - instant
    ```

=== "4.x"

    ``` yaml
    theme:
      feature:
        tabs: true
    ```

#### `theme.logo.icon`

The logo icon configuration was centralized under `theme.icon.logo` and can now
be set to any of the [icons bundled with the theme][icon integration]:

=== "5.x"

    ``` yaml
    theme:
      icon:
        logo: material/cloud
    ```

=== "4.x"

    ``` yaml
    theme:
      logo:
        icon: cloud
    ```

#### `extra.repo_icon`

The repo icon configuration was centralized under `theme.icon.repo` and can now
be set to any of the [icons bundled with the theme][icon integration]:

=== "5.x"

    ``` yaml
    theme:
      icon:
        repo: fontawesome/brands/gitlab
    ```

=== "4.x"

    ``` yaml
    extra:
      repo_icon: gitlab
    ```

#### `extra.search.*`

Search is now configured as part of the [plugin options]. Note that the
search languages must now be listed as an array of strings and the `tokenizer`
was renamed to `separator`:

=== "5.x"

    ``` yaml
    plugins:
      - search:
          separator: '[\s\-\.]+'
          lang:
            - en
            - de
            - ru
    ```

=== "4.x"

    ``` yaml
    extra:
      search:
        language: en, de, ru
        tokenizer: '[\s\-\.]+'
    ```

  [plugin options]: setup/setting-up-site-search.md#built-in-search

#### `extra.social.*`

Social links stayed in the same place, but the `type` key was renamed to `icon`
in order to match the new way of specifying which icon to be used:

=== "5.x"

    ``` yaml
    extra:
      social:
        - icon: fontawesome/brands/github-alt
          link: https://github.com/squidfunk
    ```

=== "4.x"

    ``` yaml
    extra:
      social:
        - type: github
          link: https://github.com/squidfunk
    ```

### Changes to `*.html` files { data-search-exclude }

The templates have undergone a set of changes to make them future-proof. If
you've used theme extension to override a block or template, make sure that it 
matches the new structure:

- If you've overridden a __block__, check `base.html` for potential changes
- If you've overridden a __template__, check the respective `*.html` file for
  potential changes

=== ":octicons-file-code-16: base.html"

    ``` diff
    @@ -4,7 +4,6 @@
     {% import "partials/language.html" as lang with context %}
    -{% set feature = config.theme.feature %}
     {% set palette = config.theme.palette %}
     {% set font = config.theme.font %}
     <!doctype html>
    @@ -30,19 +29,6 @@
           {% elif config.site_author %}
             <meta name="author" content="{{ config.site_author }}">
           {% endif %}
    -      {% for key in [
    -        "clipboard.copy",
    -        "clipboard.copied",
    -        "search.language",
    -        "search.pipeline.stopwords",
    -        "search.pipeline.trimmer",
    -        "search.result.none",
    -        "search.result.one",
    -        "search.result.other",
    -        "search.tokenizer"
    -      ] %}
    -        <meta name="lang:{{ key }}" content="{{ lang.t(key) }}">
    -      {% endfor %}
           <link rel="shortcut icon" href="{{ config.theme.favicon | url }}">
           <meta name="generator" content="mkdocs-{{ mkdocs_version }}, mkdocs-material-5.0.0">
         {% endblock %}
    @@ -56,9 +42,9 @@
           {% endif %}
         {% endblock %}
         {% block styles %}
    -      <link rel="stylesheet" href="{{ 'assets/stylesheets/application.********.css' | url }}">
    +      <link rel="stylesheet" href="{{ 'assets/stylesheets/main.********.min.css' | url }}">
           {% if palette.primary or palette.accent %}
    -        <link rel="stylesheet" href="{{ 'assets/stylesheets/application-palette.********.css' | url }}">
    +        <link rel="stylesheet" href="{{ 'assets/stylesheets/palette.********.min.css' | url }}">
           {% endif %}
           {% if palette.primary %}
             {% import "partials/palette.html" as map %}
    @@ -69,20 +55,17 @@
           {% endif %}
         {% endblock %}
         {% block libs %}
    -      <script src="{{ 'assets/javascripts/modernizr.********.js' | url }}"></script>
         {% endblock %}
         {% block fonts %}
           {% if font != false %}
             <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin>
             <link rel="stylesheet" href="https://fonts.googleapis.com/css?family={{
                 font.text | replace(' ', '+') + ':300,400,400i,700%7C' +
                 font.code | replace(' ', '+')
               }}&display=fallback">
             <style>body,input{font-family:"{{ font.text }}","Helvetica Neue",Helvetica,Arial,sans-serif}code,kbd,pre{font-family:"{{ font.code }}","Courier New",Courier,monospace}</style>
           {% endif %}
         {% endblock %}
    -    <link rel="stylesheet" href="{{ 'assets/fonts/material-icons.css' | url }}">
         {% if config.extra.manifest %}
           <link rel="manifest" href="{{ config.extra.manifest | url }}" crossorigin="use-credentials">
         {% endif %}
    @@ -95,47 +77,50 @@
         {% endblock %}
         {% block extrahead %}{% endblock %}
       </head>
    +  {% set direction = config.theme.direction | default(lang.t('direction')) %}
       {% if palette.primary or palette.accent %}
         {% set primary = palette.primary | replace(" ", "-") | lower %}
         {% set accent  = palette.accent  | replace(" ", "-") | lower %}
    -    <body dir="{{ lang.t('direction') }}" data-md-color-primary="{{ primary }}" data-md-color-accent="{{ accent }}">
    +    <body dir="{{ direction }}" data-md-color-primary="{{ primary }}" data-md-color-accent="{{ accent }}">
       {% else %}
    -    <body dir="{{ lang.t('direction') }}">
    +    <body dir="{{ direction }}">
       {% endif %}
    -    <svg class="md-svg">
    -      <defs>
    -        {% set platform = config.extra.repo_icon or config.repo_url %}
    -        {% if "github" in platform %}
    -          {% include "assets/images/icons/github.f0b8504a.svg" %}
    -        {% elif "gitlab" in platform %}
    -          {% include "assets/images/icons/gitlab.6dd19c00.svg" %}
    -        {% elif "bitbucket" in platform %}
    -          {% include "assets/images/icons/bitbucket.1b09e088.svg" %}
    -        {% endif %}
    -      </defs>
    -    </svg>
         <input class="md-toggle" data-md-toggle="drawer" type="checkbox" id="__drawer" autocomplete="off">
         <input class="md-toggle" data-md-toggle="search" type="checkbox" id="__search" autocomplete="off">
    -    <label class="md-overlay" data-md-component="overlay" for="__drawer"></label>
    +    <label class="md-overlay" for="__drawer"></label>
    +    <div data-md-component="skip">
    +      {% if page.toc | first is defined %}
    +        {% set skip = page.toc | first %}
    +        <a href="{{ skip.url | url }}" class="md-skip">
    +          {{ lang.t('skip.link.title') }}
    +        </a>
    +      {% endif %}
    +    </div>
    +    <div data-md-component="announce">
    +      {% if self.announce() %}
    +        <aside class="md-announce">
    +          <div class="md-announce__inner md-grid md-typeset">
    +            {% block announce %}{% endblock %}
    +          </div>
    +        </aside>
    +      {% endif %}
    +    </div>
         {% block header %}
           {% include "partials/header.html" %}
         {% endblock %}
    -    <div class="md-container">
    +    <div class="md-container" data-md-component="container">
           {% block hero %}
             {% if page and page.meta and page.meta.hero %}
               {% include "partials/hero.html" with context %}
             {% endif %}
           {% endblock %}
    -      {% if feature.tabs %}
    -        {% include "partials/tabs.html" %}
    -      {% endif %}
    +      {% block tabs %}
    +        {% if "tabs" in config.theme.features %}
    +          {% include "partials/tabs.html" %}
    +        {% endif %}
    +      {% endblock %}
    -      <main class="md-main" role="main">
    -        <div class="md-main__inner md-grid" data-md-component="container">
    +      <main class="md-main" data-md-component="main">
    +        <div class="md-main__inner md-grid">
               {% block site_nav %}
                 {% if nav %}
                   <div class="md-sidebar md-sidebar--primary" data-md-component="navigation">
    @@ -160,41 +141,25 @@
                 <article class="md-content__inner md-typeset">
                   {% block content %}
                     {% if page.edit_url %}
    -                  <a href="{{ page.edit_url }}" title="{{ lang.t('edit.link.title') }}" class="md-icon md-content__icon">&#xE3C9;</a>
    +                  <a href="{{ page.edit_url }}" title="{{ lang.t('edit.link.title') }}" class="md-content__button md-icon">
    +                    {% include ".icons/material/pencil.svg" %}
    +                  </a>
                     {% endif %}
    +                {% block source %}
    +                  {% if page and page.meta and page.meta.source %}
    +                    {% include "partials/source-link.html" %}
    +                  {% endif %}
    +                {% endblock %}
                     {% if not "\x3ch1" in page.content %}
                       <h1>{{ page.title | default(config.site_name, true)}}</h1>
                     {% endif %}
                     {{ page.content }}
    -                {% block source %}
    -                  {% if page and page.meta and page.meta.source %}
    -                    <h2 id="__source">{{ lang.t("meta.source") }}</h2>
    -                    {% set repo = config.repo_url %}
    -                    {% if repo | last == "/" %}
    -                      {% set repo = repo[:-1] %}
    -                    {% endif %}
    -                    {% set path = page.meta.path | default([""]) %}
    -                    {% set file = page.meta.source %}
    -                    <a href="{{ [repo, path, file] | join('/') }}" title="{{ file }}" class="md-source-file">
    -                      {{ file }}
    -                    </a>
    -                  {% endif %}
    -                {% endblock %}
    +                {% if page and page.meta %}
    +                  {% if page.meta.git_revision_date_localized or
    +                        page.meta.revision_date
    +                  %}
    +                    {% include "partials/source-date.html" %}
    -                {% if page and page.meta and (
    -                      page.meta.git_revision_date_localized or
    -                      page.meta.revision_date
    -                ) %}
    -                  {% set label = lang.t("source.revision.date") %}
    -                  <hr>
    -                  <div class="md-source-date">
    -                    <small>
    -                      {% if page.meta.git_revision_date_localized %}
    -                        {{ label }}: {{ page.meta.git_revision_date_localized }}
    -                      {% elif page.meta.revision_date %}
    -                        {{ label }}: {{ page.meta.revision_date }}
    -                      {% endif %}
    -                    </small>
    -                  </div>
                     {% endif %}
                   {% endblock %}
                   {% block disqus %}
    @@ -208,29 +174,35 @@
             {% include "partials/footer.html" %}
           {% endblock %}
         </div>
         {% block scripts %}
    -      <script src="{{ 'assets/javascripts/application.********.js' | url }}"></script>
    -      {% if lang.t("search.language") != "en" %}
    -        {% set languages = lang.t("search.language").split(",") %}
    -        {% if languages | length and languages[0] != "" %}
    -          {% set path = "assets/javascripts/lunr/" %}
    -          <script src="{{ (path ~ 'lunr.stemmer.support.js') | url }}"></script>
    -          {% for language in languages | map("trim") %}
    -            {% if language != "en" %}
    -              {% if language == "ja" %}
    -                <script src="{{ (path ~ 'tinyseg.js') | url }}"></script>
    -              {% endif %}
    -              {% if language in ("ar", "da", "de", "es", "fi", "fr", "hu", "it", "ja", "nl", "no", "pt", "ro", "ru", "sv", "th", "tr", "vi") %}
    -                <script src="{{ (path ~ 'lunr.' ~ language ~ '.js') | url }}"></script>
    -              {% endif %}
    -            {% endif %}
    -          {% endfor %}
    -          {% if languages | length > 1 %}
    -            <script src="{{ (path ~ 'lunr.multi.js') | url }}"></script>
    -          {% endif %}
    -        {% endif %}
    -      {% endif %}
    -      <script>app.initialize({version:"{{ mkdocs_version }}",url:{base:"{{ base_url }}"}})</script>
    +      <script src="{{ 'assets/javascripts/vendor.********.min.js' | url }}"></script>
    +      <script src="{{ 'assets/javascripts/bundle.********.min.js' | url }}"></script>
    +      {%- set translations = {} -%}
    +      {%- for key in [
    +        "clipboard.copy",
    +        "clipboard.copied",
    +        "search.config.lang",
    +        "search.config.pipeline",
    +        "search.config.separator",
    +        "search.result.placeholder",
    +        "search.result.none",
    +        "search.result.one",
    +        "search.result.other"
    +      ] -%}
    +        {%- set _ = translations.update({ key: lang.t(key) }) -%}
    +      {%- endfor -%}
    +      <script id="__lang" type="application/json">
    +        {{- translations | tojson -}}
    +      </script>
    +      {% block config %}{% endblock %}
    +      <script>
    +        app = initialize({
    +          base: "{{ base_url }}",
    +          features: {{ config.theme.features | tojson }},
    +          search: Object.assign({
    +            worker: "{{ 'assets/javascripts/worker/search.********.min.js' | url }}"
    +          }, typeof search !== "undefined" && search)
    +        })
    +      </script>
           {% for path in config["extra_javascript"] %}
             <script src="{{ path | url }}"></script>
           {% endfor %}
    ```

=== ":octicons-file-code-16: partials/footer.html"

    ``` diff
    @@ -5,34 +5,34 @@
         <div class="md-footer-nav">
    -      <nav class="md-footer-nav__inner md-grid">
    +      <nav class="md-footer-nav__inner md-grid" aria-label="{{ lang.t('footer.title') }}">
             {% if page.previous_page %}
    -          <a href="{{ page.previous_page.url | url }}" title="{{ page.previous_page.title | striptags }}" class="md-flex md-footer-nav__link md-footer-nav__link--prev" rel="prev">
    -            <div class="md-flex__cell md-flex__cell--shrink">
    -              <i class="md-icon md-icon--arrow-back md-footer-nav__button"></i>
    +          <a href="{{ page.previous_page.url | url }}" title="{{ page.previous_page.title | striptags }}" class="md-footer-nav__link md-footer-nav__link--prev" rel="prev">
    +            <div class="md-footer-nav__button md-icon">
    +              {% include ".icons/material/arrow-left.svg" %}
                 </div>
    -            <div class="md-flex__cell md-flex__cell--stretch md-footer-nav__title">
    -              <span class="md-flex__ellipsis">
    +            <div class="md-footer-nav__title">
    +              <div class="md-ellipsis">
                     <span class="md-footer-nav__direction">
                       {{ lang.t("footer.previous") }}
                     </span>
                     {{ page.previous_page.title }}
    -              </span>
    +              </div>
                 </div>
               </a>
             {% endif %}
             {% if page.next_page %}
    -          <a href="{{ page.next_page.url | url }}" title="{{ page.next_page.title | striptags }}" class="md-flex md-footer-nav__link md-footer-nav__link--next" rel="next">
    -            <div class="md-flex__cell md-flex__cell--stretch md-footer-nav__title">
    -              <span class="md-flex__ellipsis">
    +          <a href="{{ page.next_page.url | url }}" title="{{ page.next_page.title | striptags }}" class="md-footer-nav__link md-footer-nav__link--next" rel="next">
    +            <div class="md-footer-nav__title">
    +              <div class="md-ellipsis">
                     <span class="md-footer-nav__direction">
                       {{ lang.t("footer.next") }}
                     </span>
                     {{ page.next_page.title }}
    -              </span>
    +              </div>
                 </div>
    -            <div class="md-flex__cell md-flex__cell--shrink">
    -              <i class="md-icon md-icon--arrow-forward md-footer-nav__button"></i>
    +            <div class="md-footer-nav__button md-icon">
    +              {% include ".icons/material/arrow-right.svg" %}
                 </div>
               </a>
             {% endif %}
    ```

=== ":octicons-file-code-16: partials/header.html"

    ``` diff
    @@ -4,51 +4,43 @@
     <header class="md-header" data-md-component="header">
    -  <nav class="md-header-nav md-grid">
    -    <div class="md-flex">
    -      <div class="md-flex__cell md-flex__cell--shrink">
    -        <a href="{{ config.site_url | default(nav.homepage.url, true) | url }}" title="{{ config.site_name }}" aria-label="{{ config.site_name }}" class="md-header-nav__button md-logo">
    -          {% if config.theme.logo.icon %}
    -            <i class="md-icon">{{ config.theme.logo.icon }}</i>
    -          {% else %}
    -            <img alt="logo" src="{{ config.theme.logo | url }}" width="24" height="24">
    -          {% endif %}
    -        </a>
    -      </div>
    -      <div class="md-flex__cell md-flex__cell--shrink">
    -        <label class="md-icon md-icon--menu md-header-nav__button" for="__drawer"></label>
    -      </div>
    -      <div class="md-flex__cell md-flex__cell--stretch">
    -        <div class="md-flex__ellipsis md-header-nav__title" data-md-component="title">
    -          {% if config.site_name == page.title %}
    -            {{ config.site_name }}
    -          {% else %}
    -            <span class="md-header-nav__topic">
    -              {{ config.site_name }}
    -            </span>
    -            <span class="md-header-nav__topic">
    -              {% if page and page.meta and page.meta.title %}
    -                {{ page.meta.title }}
    -              {% else %}
    -                {{ page.title }}
    -              {% endif %}
    -            </span>
    -          {% endif %}
    +  <nav class="md-header-nav md-grid" aria-label="{{ lang.t('header.title') }}">
    +    <a href="{{ config.site_url | default(nav.homepage.url, true) | url }}" title="{{ config.site_name }}" class="md-header-nav__button md-logo" aria-label="{{ config.site_name }}">
    +      {% include "partials/logo.html" %}
    +    </a>
    +    <label class="md-header-nav__button md-icon" for="__drawer">
    +      {% include ".icons/material/menu" ~ ".svg" %}
    +    </label>
    +    <div class="md-header-nav__title" data-md-component="header-title">
    +      {% if config.site_name == page.title %}
    +        <div class="md-header-nav__ellipsis md-ellipsis">
    +          {{ config.site_name }}
             </div>
    -      </div>
    -      <div class="md-flex__cell md-flex__cell--shrink">
    -        {% if "search" in config["plugins"] %}
    -          <label class="md-icon md-icon--search md-header-nav__button" for="__search"></label>
    -          {% include "partials/search.html" %}
    -        {% endif %}
    -      </div>
    -      {% if config.repo_url %}
    -        <div class="md-flex__cell md-flex__cell--shrink">
    -          <div class="md-header-nav__source">
    -            {% include "partials/source.html" %}
    -          </div>
    +      {% else %}
    +        <div class="md-header-nav__ellipsis">
    +          <span class="md-header-nav__topic md-ellipsis">
    +            {{ config.site_name }}
    +          </span>
    +          <span class="md-header-nav__topic md-ellipsis">
    +            {% if page and page.meta and page.meta.title %}
    +              {{ page.meta.title }}
    +            {% else %}
    +              {{ page.title }}
    +            {% endif %}
    +          </span>
             </div>
           {% endif %}
         </div>
    +    {% if "search" in config["plugins"] %}
    +      <label class="md-header-nav__button md-icon" for="__search">
    +        {% include ".icons/material/magnify.svg" %}
    +      </label>
    +      {% include "partials/search.html" %}
    +    {% endif %}
    +    {% if config.repo_url %}
    +      <div class="md-header-nav__source">
    +        {% include "partials/source.html" %}
    +      </div>
    +    {% endif %}
       </nav>
     </header>
    ```

=== ":octicons-file-code-16: partials/hero.html"

    ``` diff
    @@ -4,9 +4,8 @@
    -{% set feature = config.theme.feature %}
     {% set class = "md-hero" %}
    -{% if not feature.tabs %}
    +{% if "tabs" not in config.theme.features %}
       {% set class = "md-hero md-hero--expand" %}
     {% endif %}
     <div class="{{ class }}" data-md-component="hero">
    ```

=== ":octicons-file-code-16: partials/language.html"

    ``` diff
    @@ -4,12 +4,4 @@
     {% import "partials/language/" + config.theme.language + ".html" as lang %}
     {% import "partials/language/en.html" as fallback %}
    -{% macro t(key) %}{{ {
    -  "direction": config.theme.direction,
    -  "search.language": (
    -    config.extra.search | default({})
    -  ).language,
    -  "search.tokenizer": (
    -    config.extra.search | default({})
    -  ).tokenizer | default("", true),
    -}[key] or lang.t(key) or fallback.t(key) }}{% endmacro %}
    +{% macro t(key) %}{{ lang.t(key) | default(fallback.t(key)) }}{% endmacro %}
    ```

=== ":octicons-file-code-16: partials/logo.html"

    ``` diff
    @@ -0,0 +1,9 @@
    +{#-
    +  This file was automatically generated - do not edit
    +-#}
    +{% if config.theme.logo %}
    +  <img src="{{ config.theme.logo | url }}" alt="logo">
    +{% else %}
    +  {% set icon = config.theme.icon.logo or "material/library" %}
    +  {% include ".icons/" ~ icon ~ ".svg" %}
    +{% endif %}
    ```

=== ":octicons-file-code-16: partials/nav-item.html"

    ``` diff
    @@ -14,9 +14,15 @@
         {% endif %}
         <label class="md-nav__link" for="{{ path }}">
           {{ nav_item.title }}
    +      <span class="md-nav__icon md-icon">
    +        {% include ".icons/material/chevron-right.svg" %}
    +      </span>
         </label>
    -    <nav class="md-nav" data-md-component="collapsible" data-md-level="{{ level }}">
    +    <nav class="md-nav" aria-label="{{ nav_item.title }}" data-md-level="{{ level }}">
           <label class="md-nav__title" for="{{ path }}">
    +        <span class="md-nav__icon md-icon">
    +          {% include ".icons/material/arrow-left.svg" %}
    +        </span>
             {{ nav_item.title }}
           </label>
           <ul class="md-nav__list" data-md-scrollfix>
    @@ -39,6 +45,9 @@
         {% if toc | first is defined %}
           <label class="md-nav__link md-nav__link--active" for="__toc">
             {{ nav_item.title }}
    +        <span class="md-nav__icon md-icon">
    +          {% include ".icons/material/table-of-contents.svg" %}
    +        </span>
           </label>
         {% endif %}
         <a href="{{ nav_item.url | url }}" title="{{ nav_item.title | striptags }}" class="md-nav__link md-nav__link--active">
    ```

=== ":octicons-file-code-16: partials/nav.html"

    ``` diff
    @@ -4,14 +4,10 @@
    -<nav class="md-nav md-nav--primary" data-md-level="0">
    -  <label class="md-nav__title md-nav__title--site" for="__drawer">
    -    <a href="{{ config.site_url | default(nav.homepage.url, true) | url }}" title="{{ config.site_name }}" class="md-nav__button md-logo">
    -      {% if config.theme.logo.icon %}
    -        <i class="md-icon">{{ config.theme.logo.icon }}</i>
    -      {% else %}
    -        <img alt="logo" src="{{ config.theme.logo | url }}" width="48" height="48">
    -      {% endif %}
    +<nav class="md-nav md-nav--primary" aria-label="{{ lang.t('nav.title') }}" data-md-level="0">
    +  <label class="md-nav__title" for="__drawer">
    +    <a href="{{ config.site_url | default(nav.homepage.url, true) | url }}" title="{{ config.site_name }}" class="md-nav__button md-logo" aria-label="{{ config.site_name }}">
    +      {% include "partials/logo.html" %}
         </a>
         {{ config.site_name }}
       </label>
    ```

=== ":octicons-file-code-16: partials/search.html"

    ``` diff
    @@ -6,15 +6,18 @@
       <label class="md-search__overlay" for="__search"></label>
       <div class="md-search__inner" role="search">
         <form class="md-search__form" name="search">
    -      <input type="text" class="md-search__input" name="query" aria-label="Search" placeholder="{{ lang.t('search.placeholder') }}" autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" data-md-component="query" data-md-state="active">
    +      <input type="text" class="md-search__input" name="query" aria-label="{{ lang.t('search.placeholder') }}" placeholder="{{ lang.t('search.placeholder') }}" autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" data-md-component="search-query" data-md-state="active">
           <label class="md-search__icon md-icon" for="__search">
    +        {% include ".icons/material/magnify.svg" %}
    +        {% include ".icons/material/arrow-left.svg" %}
           </label>
    -      <button type="reset" class="md-icon md-search__icon" data-md-component="reset" tabindex="-1">
    -        &#xE5CD;
    +      <button type="reset" class="md-search__icon md-icon" aria-label="{{ lang.t('search.reset') }}" data-md-component="search-reset" tabindex="-1">
    +        {% include ".icons/material/close.svg" %}
           </button>
         </form>
         <div class="md-search__output">
           <div class="md-search__scrollwrap" data-md-scrollfix>
    -        <div class="md-search-result" data-md-component="result">
    +        <div class="md-search-result" data-md-component="search-result">
               <div class="md-search-result__meta">
                 {{ lang.t("search.result.placeholder") }}
               </div>
    ```

=== ":octicons-file-code-16: partials/social.html"

    ``` diff
    @@ -4,9 +4,12 @@
     {% if config.extra.social %}
       <div class="md-footer-social">
    -    <link rel="stylesheet" href="{{ 'assets/fonts/font-awesome.css' | url }}">
         {% for social in config.extra.social %}
    -      <a href="{{ social.link }}" target="_blank" rel="noopener" title="{{ social.type }}" class="md-footer-social__link fa fa-{{ social.type }}"></a>
    +      {% set _,rest = social.link.split("//") %}
    +      {% set domain = rest.split("/")[0] %}
    +      <a href="{{ social.link }}" target="_blank" rel="noopener" title="{{ domain }}" class="md-footer-social__link">
    +        {% include ".icons/" ~ social.icon ~ ".svg" %}
    +      </a>
         {% endfor %}
       </div>
     {% endif %}
    ```

=== ":octicons-file-code-16: partials/source-date.html"

    ``` diff
    @@ -0,0 +1,15 @@
    +{#-
    +  This file was automatically generated - do not edit
    +-#}
    +{% import "partials/language.html" as lang with context %}
    +{% set label = lang.t("source.revision.date") %}
    +<hr>
    +<div class="md-source-date">
    +  <small>
    +    {% if page.meta.git_revision_date_localized %}
    +      {{ label }}: {{ page.meta.git_revision_date_localized }}
    +    {% elif page.meta.revision_date %}
    +      {{ label }}: {{ page.meta.revision_date }}
    +    {% endif %}
    +  </small>
    +</div>
    ```

=== ":octicons-file-code-16: partials/source-link.html"

    ``` diff
    @@ -0,0 +1,13 @@
    +{#-
    +  This file was automatically generated - do not edit
    +-#}
    +{% import "partials/language.html" as lang with context %}
    +{% set repo = config.repo_url %}
    +{% if repo | last == "/" %}
    +  {% set repo = repo[:-1] %}
    +{% endif %}
    +{% set path = page.meta.path | default([""]) %}
    +<a href="{{ [repo, path, page.meta.source] | join('/') }}" title="{{ file }}" class="md-content__button md-icon">
    +  {{ lang.t("meta.source") }}
    +  {% include ".icons/" ~ config.theme.icon.repo ~ ".svg" %}
    +</a>
    ```

=== ":octicons-file-code-16: partials/source.html"

    ``` diff
    @@ -4,24 +4,11 @@
     {% import "partials/language.html" as lang with context %}
    -{% set platform = config.extra.repo_icon or config.repo_url %}
    -{% if "github" in platform %}
    -  {% set repo_type = "github" %}
    -{% elif "gitlab" in platform %}
    -  {% set repo_type = "gitlab" %}
    -{% elif "bitbucket" in platform %}
    -  {% set repo_type = "bitbucket" %}
    -{% else %}
    -  {% set repo_type = "" %}
    -{% endif %}
    -<a href="{{ config.repo_url }}" title="{{ lang.t('source.link.title') }}" class="md-source" data-md-source="{{ repo_type }}">
    -  {% if repo_type %}
    -    <div class="md-source__icon">
    -      <svg viewBox="0 0 24 24" width="24" height="24">
    -        <use xlink:href="#__{{ repo_type }}" width="24" height="24"></use>
    -      </svg>
    -    </div>
    -  {% endif %}
    +<a href="{{ config.repo_url }}" title="{{ lang.t('source.link.title') }}" class="md-source">
    +  <div class="md-source__icon md-icon">
    +    {% set icon = config.theme.icon.repo or "fontawesome/brands/git-alt" %}
    +    {% include ".icons/" ~ icon ~ ".svg" %}
    +  </div>
       <div class="md-source__repository">
         {{ config.repo_name }}
       </div>
    ```

=== ":octicons-file-code-16: partials/tabs-item.html"

    ``` diff
    @@ -4,7 +4,7 @@
    -{% if nav_item.is_homepage %}
    +{% if nav_item.is_homepage or nav_item.url == "index.html" %}
       <li class="md-tabs__item">
         {% if not page.ancestors | length and nav | selectattr("url", page.url) %}
           <a href="{{ nav_item.url | url }}" class="md-tabs__link md-tabs__link--active">
    ```

=== ":octicons-file-code-16: partials/tabs.html"

    ``` diff
    @@ -5,7 +5,7 @@
     {% if page.ancestors | length > 0 %}
       {% set class = "md-tabs md-tabs--active" %}
     {% endif %}
    -<nav class="{{ class }}" data-md-component="tabs">
    +<nav class="{{ class }}" aria-label="{{ lang.t('tabs.title') }}" data-md-component="tabs">
       <div class="md-tabs__inner md-grid">
         <ul class="md-tabs__list">
           {% for nav_item in nav %}
    ```

=== ":octicons-file-code-16: partials/toc-item.html"

    ``` diff
    @@ -6,7 +6,7 @@
         {{ toc_item.title }}
       </a>
       {% if toc_item.children %}
    -    <nav class="md-nav">
    +    <nav class="md-nav" aria-label="{{ toc_item.title }}">
           <ul class="md-nav__list">
             {% for toc_item in toc_item.children %}
               {% include "partials/toc-item.html" %}
    ```

=== ":octicons-file-code-16: partials/toc.html"

    ``` diff
    @@ -4,35 +4,22 @@
     {% import "partials/language.html" as lang with context %}
    -<nav class="md-nav md-nav--secondary">
    +<nav class="md-nav md-nav--secondary" aria-label="{{ lang.t('toc.title') }}">
       {% endif %}
       {% if toc | first is defined %}
         <label class="md-nav__title" for="__toc">
    +      <span class="md-nav__icon md-icon">
    +        {% include ".icons/material/arrow-left.svg" %}
    +      </span>
           {{ lang.t("toc.title") }}
         </label>
         <ul class="md-nav__list" data-md-scrollfix>
           {% for toc_item in toc %}
             {% include "partials/toc-item.html" %}
           {% endfor %}
    -      {% if page.meta.source and page.meta.source | length > 0 %}
    -        <li class="md-nav__item">
    -          <a href="#__source" class="md-nav__link md-nav__link--active">
    -            {{ lang.t("meta.source") }}
    -          </a>
    -        </li>
    -      {% endif %}
    -      {% set disqus = config.extra.disqus %}
    -      {% if page and page.meta and page.meta.disqus is string %}
    -        {% set disqus = page.meta.disqus %}
    -      {% endif %}
    -      {% if not page.is_homepage and disqus %}
    -        <li class="md-nav__item">
    -          <a href="#__comments" class="md-nav__link md-nav__link--active">
    -            {{ lang.t("meta.comments") }}
    -          </a>
    -        </li>
    -      {% endif %}
         </ul>
       {% endif %}
     </nav>
    ```

## Upgrading from 3.x to 4.x

### What's new?

Material for MkDocs 4 fixes incorrect layout on Chinese systems. The fix
includes a mandatory change of the base font-size from `10px` to `20px` which
means all `rem` values needed to be updated. Within the theme, `px` to `rem` 
calculation is now encapsulated in a new function called `px2rem` which is part
of the SASS code base.

If you use Material for MkDocs with custom CSS that is based on `rem` values,
note that those values must now be divided by 2. Now, `1.0rem` doesn't map to
`10px`, but `20px`. To learn more about the problem and implications, please
refer to #911 in which the problem was discovered and fixed.

### Changes to `mkdocs.yml`

None.

### Changes to `*.html` files

None.
