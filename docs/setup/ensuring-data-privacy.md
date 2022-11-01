# Ensuring data privacy

Material for MkDocs makes compliance with data privacy regulations very easy, 
as it offers a native [cookie consent] solution to seek explicit consent from
users before setting up [analytics]. Additionally, external assets can be
automatically downloaded for [self-hosting].

  [cookie consent]: #cookie-consent
  [analytics]: setting-up-site-analytics.md
  [self-hosting]: #built-in-privacy-plugin

## Configuration

### Cookie consent

[:octicons-tag-24: 8.4.0][Cookie consent support] ·
:octicons-milestone-24: Default: _none_ ·
:octicons-beaker-24: Experimental

Material for MkDocs ships a native and extensible cookie consent form which
asks the user for consent prior to sending requests to third parties. Add the
following to `mkdocs.yml`:

``` yaml
extra:
  consent:
    title: Cookie consent
    description: >- # (1)!
      We use cookies to recognize your repeated visits and preferences, as well
      as to measure the effectiveness of our documentation and whether users
      find what they're searching for. With your consent, you're helping us to
      make our documentation better.
```

1.  You can add arbitrary HTML tags in the `description`, e.g. to link to your
    terms of service or other parts of the site.

The following properties are available:

[`title`](#+consent.title){ #+consent.title }

:   :octicons-milestone-24: Default: _none_ · :octicons-alert-24: __Required__ –
    This property sets the title of the cookie consent, which is rendered at the 
    top of the form and must be set to a non-empty string.

[`description`](#+consent.description){ #+consent.description }

:   :octicons-milestone-24: Default: _none_ · :octicons-alert-24: __Required__ –
    This property sets the description of the cookie consent, is rendered below
    the title, and may include raw HTML (e.g. a links to the terms of service).

[`cookies`](#+consent.cookies){ #+consent.cookies }

:   :octicons-milestone-24: Default: _none_ – This property allows to add custom 
    cookies or change the initial `checked` state and name of built-in cookies.
    Currently, the following cookies are built-in:

    - __Google Analytics__ – `analytics` (enabled by default)
    - __GitHub__ – `github` (enabled by default)

    Each cookie must receive a unique identifier which is used as a key in the
    `cookies` map, and can be either set to a string, or to a map defining
    `name` and `checked` state:

    ===  "Custom cookie name"

        ``` yaml
        extra:
          consent:
            cookies:
              analytics: Custom name
        ```

    ===  "Custom initial state"

        ``` yaml
        extra:
          consent:
            cookies:
              analytics:
                name: Google Analytics
                checked: false
        ```

    ===  "Custom cookie"

        ``` yaml
        extra:
          consent:
            cookies:
              analytics: Google Analytics # (1)!
              custom: Custom cookie
        ```

        1.  If you define a custom cookie as part of the `cookies` property,
            the `analytics` cookie must be added back explicitly, or analytics
            won't be triggered.

    If Google Analytics was configured via `mkdocs.yml`, the cookie consent will
    automatically include a setting for the user to disable it. [Custom cookies]
    can be used from JavaScript.

[`actions`](#+consent.actions){ #+consent.actions }

:   :octicons-milestone-24: Default: `[accept, manage]` – This property defines
    which buttons are shown and in which order, e.g. to allow the user to accept 
    cookies and manage settings:

    ``` yaml
    extra:
      consent:
        actions:
          - accept
          - manage # (1)!
    ```

    1.  If the `manage` settings button is omitted from the `actions` property,
        the settings are always shown.

    The cookie consent form includes three types of buttons:

    - `accept` – Button to accept selected cookies
    - `reject` – Button to reject all cookies
    - `manage` – Button to manage settings

When a user first visits your site, a cookie consent form is rendered:

[![Cookie consent enabled]][Cookie consent enabled]

  [Custom cookies]: #custom-cookies
  [Cookie consent support]: https://github.com/squidfunk/mkdocs-material/releases/tag/8.4.0
  [Cookie consent enabled]: ../assets/screenshots/consent.png

#### Change cookie settings

In order to comply with GDPR, users must be able to change their cookie settings
at any time. This can be done by adding a simple link to your [copyright notice] 
in `mkdocs.yml`:

``` yaml
copyright: >
  Copyright &copy; 2016 - 2022 Martin Donath –
  <a href="#__consent">Change cookie settings</a>
```

  [copyright notice]: setting-up-the-footer.md#copyright-notice

### Built-in privacy plugin

[:octicons-heart-fill-24:{ .mdx-heart } Sponsors only][Insiders]{ .mdx-insiders } ·
[:octicons-tag-24: insiders-4.9.0][Insiders] ·
:octicons-cpu-24: Plugin ·
:octicons-beaker-24: Experimental

The built-in privacy plugin automatically identifies [external assets] as part
of the build process and downloads all assets for very simple self-hosting. Add
the following lines to `mkdocs.yml`:

``` yaml
plugins:
  - privacy
```

> If you need to be able to build your documentation with and without
> [Insiders], please refer to the [built-in plugins] section to learn how
> shared configurations help to achieve this.

The following configuration options are available:

[`enabled`](#+privacy.enabled){ #+privacy.enabled }

:   :octicons-milestone-24: Default: `true` – This option specifies whether
    the plugin is enabled when building your project. If you want to speed up
    local builds, you can use an [environment variable]:

    ``` yaml
    plugins:
      - privacy:
          enabled: !ENV [CI, false]
    ```

  [Insiders]: ../insiders/index.md
  [built-in plugins]: ../insiders/getting-started.md#built-in-plugins

#### External assets

The following configuration options are available for external assets:

[`external_assets`](#+privacy.external_assets){ #+privacy.external_assets }

:   :octicons-milestone-24: Default: `bundle` – This option specifies what the
    plugin should do when encountering external assets. There are two options:
    while `report` will issue warning messages during the build, `bundle` will
    automatically download all external files and adjust all references:

    ``` yaml
    plugins:
      - privacy:
          external_assets: bundle
    ```

    If you've removed all external assets from your project via [customization],
    it's still a good idea to enable the plugin and set the mode to `report`,
    as the plugin will make sure that there are no hidden external links in any
    Markdown files that were unintentionally added.

    Using `report` in [strict mode] will make the build fail when external
    assets are detected.

[`external_assets_dir`](#+privacy.external_assets_dir){ #+privacy.external_assets_dir }

:   :octicons-milestone-24: Default: `assets/external` – This option
    specifies where the downloaded [external assets] will be stored. It's
    normally not necessary to change this option:

    ``` yaml
    plugins:
      - privacy:
          external_assets_dir: assets/external
    ```

    The path must be defined relative to [`docs_dir`][docs_dir].

[`external_assets_exclude`](#+privacy.external_assets_exclude){ #+privacy.external_assets_exclude }

:   :octicons-milestone-24: Default: _none_ – This option allows to exclude
    certain external assets from processing by the privacy plugin, so they will
    not be downloaded and bundled during the build:

    ``` yaml
    plugins:
      - privacy:
          external_assets_exclude: # (1)!
            - cdn.jsdelivr.net/npm/mathjax@3/* 
            - giscus.app/*
    ```

    1.  [MathJax] loads web fonts for typesetting of mathematical content
        through relative URLs, and thus cannot be automatically bundled by the
        privacy plugin. [MathJax can be self-hosted].

        Giscus, which we recommend to use as a [comment system], uses a technique
        called code-splitting to load only the code that is necessary, which
        is implemented via relative URLs. [Giscus can be self-hosted] as well.

    Excluding specific external assets can be necessary if they contain
    dynamically created or relative URLs, which can't be resolved by the privacy
    plugin due to [technical limitations].

!!! question "Why can't Material for MkDocs bundle all assets by design?"

    The primary reason why Material for MkDocs can't just bundle all of its own
    assets is the integration with [Google Fonts], which offers over a thousand
    different fonts that can be used to render your documentation. Most of the
    fonts include several weights and are split up into different character sets 
    to keep the download size small, so the browser only downloads what is
    really needed. For Roboto, our default [regular font], this results in [42
    `*.woff2` files in total][example].
    
    If Material for MkDocs would bundle all font files, the download size would
    be in the hundreds of megabytes, slowing down automated builds. Furthermore, 
    authors might add external assets like third-party scripts or style sheets 
    that would need to be remembered to be defined as further local assets.
    
    This is the very reason the [built-in privacy plugin] exists — it automates
    the process of downloading all external assets manually to ensure compliance
    with GDPR with some some [technical limitations].

  [customization]: ../customization.md
  [strict mode]: https://www.mkdocs.org/user-guide/configuration/#strict
  [docs_dir]: https://www.mkdocs.org/user-guide/configuration/#docs_dir
  [MathJax]: ../reference/mathjax.md
  [MathJax can be self-hosted]: https://docs.mathjax.org/en/latest/web/hosting.html
  [Giscus can be self-hosted]: https://github.com/giscus/giscus/blob/main/SELF-HOSTING.md
  [comment system]: adding-a-comment-system.md
  [external assets]: #how-it-works
  [environment variable]: https://www.mkdocs.org/user-guide/configuration/#environment-variables
  [Google Fonts]: changing-the-fonts.md
  [regular font]: changing-the-fonts.md#regular-font
  [example]: #example
  [technical limitations]: #limitations

#### External links :material-alert-decagram:{ .mdx-pulse title="Added on October 18, 2022" }

[:octicons-heart-fill-24:{ .mdx-heart } Sponsors only][Insiders]{ .mdx-insiders } ·
[:octicons-tag-24: insiders-4.26.0][Insiders] ·
:octicons-beaker-24: Experimental

The following configuration options are available for external links:

[`external_links`](#+privacy.external_links){ #+privacy.external_links }

:   :octicons-milestone-24: Default: `true` – This option specifies whether the
    plugin should automatically annotate external links. By default,
    [`rel="noopener"`][noopener] is added to all links with `target="_blank"`:

    ``` yaml
    plugins:
      - privacy:
          external_links: true
    ```

[`external_links_attr_map`](#+privacy.external_links_attr_map){ #+privacy.external_links_attr_map }

:   :octicons-milestone-24: Default: _None_ – This option specifies custom
    attributes that should be added to external links, like for example
    `target="_blank"` so all external links open in a new window:

    ``` yaml
    plugins:
      - privacy:
          external_links_attr_map:
            target: _blank
    ```

[`external_links_noopener`](#+privacy.external_links_noopener){ #+privacy.external_links_noopener }

:   :octicons-milestone-24: Default: `true` – This option specifies whether the
    plugin should automatically add [`rel="noopener"`][noopener] to all links
    with `target="_blank"` for security reasons:

    ``` yaml
    plugins:
      - privacy:
          external_links_noopener: true
    ```

  [noopener]: https://mathiasbynens.github.io/rel-noopener/

#### How it works

The [built-in privacy plugin] scans the resulting HTML for links to external
resources, including external scripts, style sheets, images and web fonts, and
downloads them to bundle them with your documentation site. Every URL refering
to an external resource, no matter if part of a template or Markdown file, is
then replaced with the URL to the local copy. An example:

``` html
<script src="https://example.com/script.js"></script>
```

The external script is downloaded, and the link is replaced with:

``` html
<script src="assets/external/example.com/script.js"></script>
```

Style sheets are scanned for external `url(...)` references, e.g. images and
web fonts, which are then also downloaded and bundled with your documentation
site. This means that [Google Fonts] can be configured in `mkdocs.yml` as usual,
as the [built-in privacy plugin] automatically downloads and bundles all
dependent resources.

As a third measure, [`preconnect`][preconnect] hints used for DNS pre-fetching
which might also leak the visitors IP address to a third party are automatically
removed during the build process.

??? example "Expand to inspect example"

    For the official documentation, the [built-in privacy plugin] downloads the
    following resources:

    ``` { .sh id="example" }
    .
    └─ assets/external/
       ├─ unpkg.com/tablesort@5.3.0/dist/tablesort.min.js
       ├─ fonts.googleapis.com/css
       ├─ fonts.gstatic.com/s/
       │  ├─ roboto/v29/
       │  │  ├─ KFOjCnqEu92Fr1Mu51TjASc-CsTKlA.woff2
       │  │  ├─ KFOjCnqEu92Fr1Mu51TjASc0CsTKlA.woff2
       │  │  ├─ KFOjCnqEu92Fr1Mu51TjASc1CsTKlA.woff2
       │  │  ├─ KFOjCnqEu92Fr1Mu51TjASc2CsTKlA.woff2
       │  │  ├─ KFOjCnqEu92Fr1Mu51TjASc3CsTKlA.woff2
       │  │  ├─ KFOjCnqEu92Fr1Mu51TjASc5CsTKlA.woff2
       │  │  ├─ KFOjCnqEu92Fr1Mu51TjASc6CsQ.woff2
       │  │  ├─ KFOjCnqEu92Fr1Mu51TzBic-CsTKlA.woff2
       │  │  ├─ KFOjCnqEu92Fr1Mu51TzBic0CsTKlA.woff2
       │  │  ├─ KFOjCnqEu92Fr1Mu51TzBic1CsTKlA.woff2
       │  │  ├─ KFOjCnqEu92Fr1Mu51TzBic2CsTKlA.woff2
       │  │  ├─ KFOjCnqEu92Fr1Mu51TzBic3CsTKlA.woff2
       │  │  ├─ KFOjCnqEu92Fr1Mu51TzBic5CsTKlA.woff2
       │  │  ├─ KFOjCnqEu92Fr1Mu51TzBic6CsQ.woff2
       │  │  ├─ KFOkCnqEu92Fr1Mu51xEIzIFKw.woff2
       │  │  ├─ KFOkCnqEu92Fr1Mu51xFIzIFKw.woff2
       │  │  ├─ KFOkCnqEu92Fr1Mu51xGIzIFKw.woff2
       │  │  ├─ KFOkCnqEu92Fr1Mu51xHIzIFKw.woff2
       │  │  ├─ KFOkCnqEu92Fr1Mu51xIIzI.woff2
       │  │  ├─ KFOkCnqEu92Fr1Mu51xLIzIFKw.woff2
       │  │  ├─ KFOkCnqEu92Fr1Mu51xMIzIFKw.woff2
       │  │  ├─ KFOlCnqEu92Fr1MmSU5fABc4EsA.woff2
       │  │  ├─ KFOlCnqEu92Fr1MmSU5fBBc4.woff2
       │  │  ├─ KFOlCnqEu92Fr1MmSU5fBxc4EsA.woff2
       │  │  ├─ KFOlCnqEu92Fr1MmSU5fCBc4EsA.woff2
       │  │  ├─ KFOlCnqEu92Fr1MmSU5fCRc4EsA.woff2
       │  │  ├─ KFOlCnqEu92Fr1MmSU5fChc4EsA.woff2
       │  │  ├─ KFOlCnqEu92Fr1MmSU5fCxc4EsA.woff2
       │  │  ├─ KFOlCnqEu92Fr1MmWUlfABc4EsA.woff2
       │  │  ├─ KFOlCnqEu92Fr1MmWUlfBBc4.woff2
       │  │  ├─ KFOlCnqEu92Fr1MmWUlfBxc4EsA.woff2
       │  │  ├─ KFOlCnqEu92Fr1MmWUlfCBc4EsA.woff2
       │  │  ├─ KFOlCnqEu92Fr1MmWUlfCRc4EsA.woff2
       │  │  ├─ KFOlCnqEu92Fr1MmWUlfChc4EsA.woff2
       │  │  ├─ KFOlCnqEu92Fr1MmWUlfCxc4EsA.woff2
       │  │  ├─ KFOmCnqEu92Fr1Mu4WxKOzY.woff2
       │  │  ├─ KFOmCnqEu92Fr1Mu4mxK.woff2
       │  │  ├─ KFOmCnqEu92Fr1Mu5mxKOzY.woff2
       │  │  ├─ KFOmCnqEu92Fr1Mu72xKOzY.woff2
       │  │  ├─ KFOmCnqEu92Fr1Mu7GxKOzY.woff2
       │  │  ├─ KFOmCnqEu92Fr1Mu7WxKOzY.woff2
       │  │  └─ KFOmCnqEu92Fr1Mu7mxKOzY.woff2
       │  └─ robotomono/v13/
       │     ├─ L0xTDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vrtSM1J-gEPT5Ese6hmHSV0mf0h.woff2
       │     ├─ L0xTDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vrtSM1J-gEPT5Ese6hmHSZ0mf0h.woff2
       │     ├─ L0xTDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vrtSM1J-gEPT5Ese6hmHSd0mf0h.woff2
       │     ├─ L0xTDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vrtSM1J-gEPT5Ese6hmHSh0mQ.woff2
       │     ├─ L0xTDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vrtSM1J-gEPT5Ese6hmHSt0mf0h.woff2
       │     ├─ L0xTDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vrtSM1J-gEPT5Ese6hmHSx0mf0h.woff2
       │     ├─ L0xdDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrlnAIe2Imhk1T8rbociImtElOUlYIw.woff2
       │     ├─ L0xdDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrlnAIe2Imhk1T8rbociImtEleUlYIw.woff2
       │     ├─ L0xdDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrlnAIe2Imhk1T8rbociImtEluUlYIw.woff2
       │     ├─ L0xdDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrlnAIe2Imhk1T8rbociImtEm-Ul.woff2
       │     ├─ L0xdDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrlnAIe2Imhk1T8rbociImtEmOUlYIw.woff2
       │     └─ L0xdDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrlnAIe2Imhk1T8rbociImtEn-UlYIw.woff2
       └─ polyfill.io/v3/polyfill.min.js
    ```

  [built-in privacy plugin]: #built-in-privacy-plugin
  [preconnect]: https://developer.mozilla.org/en-US/docs/Web/Performance/dns-prefetch

#### Caching <small>recommended</small> { #caching data-toc-label="Caching" }

All downloaded files are written to the `.cache` directory, significantly 
reducing the duration of subsequent builds as only replacements need to be 
carried out. You might want to:

1.  Ignore the `.cache` directory in your project, by adding it to `.gitignore`.
2.  When building your site for publishing, use a build cache to save the
    `.cache` directory in between builds. Taking the example from the
    [publishing guide], add the following lines:

    ``` yaml hl_lines="15-18"
    name: ci
      on:
        push:
          branches:
            - master
            - main
      jobs:
        deploy:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v2
            - uses: actions/setup-python@v2
              with:
                python-version: 3.x
            - uses: actions/cache@v2
              with:
                key: ${{ github.ref }}
                path: .cache
            - run: pip install mkdocs-material
            - run: mkdocs gh-deploy --force
    ```

  [publishing guide]: ../publishing-your-site.md#with-github-actions

#### Limitations

Note that dynamically created URLs as part of scripts are not detected, and thus
cannot be automatically downloaded. The [built-in privacy plugin] does not
execute scripts – it can only detect fully qualified URLs to download and
replace.

In short, don't do this:

``` js
const cdn = "https://polyfill.io"
const url = `${cdn}/v3/polyfill.min.js`
```

Instead, always use fully qualified URLs:

``` js
const url ="https://polyfill.io/v3/polyfill.min.js"
```

## Customization

### Custom cookies

If you've customized the [cookie consent] and added a `custom` cookie, the user
will be prompted to accept your custom cookie. Use [additional JavaScript] to
check whether the user accepted it:

=== ":octicons-file-code-16: `docs/javascripts/consent.js`"

    ``` js
    var consent = __md_get("__consent")
    if (consent && consent.custom) {
      /* The user accepted the cookie */
    }
    ```

=== ":octicons-file-code-16: `mkdocs.yml`"

    ``` yaml
    extra_javascript:
      - javascripts/consent.js
    ```

  [additional JavaScript]: ../customization.md#additional-javascript
