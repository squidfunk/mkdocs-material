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

<!-- md:version 8.4.0 -->
<!-- md:default none -->
<!-- md:flag experimental -->
<!-- md:example cookie-consent -->

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

<!-- md:option consent.title -->

:   <!-- md:default none --> <!-- md:flag required -->
    This property sets the title of the cookie consent, which is rendered at the
    top of the form and must be set to a non-empty string.

<!-- md:option consent.description -->

:   <!-- md:default none --> <!-- md:flag required -->
    This property sets the description of the cookie consent, is rendered below
    the title, and may include raw HTML (e.g. a links to the terms of service).

<!-- md:option consent.cookies -->

:   <!-- md:default none --> This property allows to add custom
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

<!-- md:option consent.actions -->

:   <!-- md:default `[accept, manage]` --> This property defines
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
  [Cookie consent enabled]: ../assets/screenshots/consent.png

#### Change cookie settings

In order to comply with GDPR, users must be able to change their cookie settings
at any time. This can be done by adding a simple link to your [copyright notice]
in `mkdocs.yml`:

``` yaml
copyright: >
  Copyright &copy; 2016 - 2024 Martin Donath –
  <a href="#__consent">Change cookie settings</a>
```

  [copyright notice]: setting-up-the-footer.md#copyright-notice

### Built-in privacy plugin

<!-- md:version 9.5.0 -->
<!-- md:plugin [privacy][built-in privacy plugin] -->
<!-- md:flag experimental -->

The built-in privacy plugin automatically identifies external assets as part
of the build process and downloads all assets for very simple self-hosting. Add
the following lines to `mkdocs.yml`:

``` yaml
plugins:
  - privacy
```

For a list of all settings, please consult the [plugin documentation].

  [plugin documentation]: ../plugins/privacy.md

!!! tip "Hosting images externally and optimizing them automatically"

    This option makes the [built-in privacy plugin] an excellent choice for
    when you want to host assets like images outside of your git repository
    in another location to keep them fresh and your repository lean.

    Additionally, as of <!-- md:version insiders-4.30.0 -->, the
    built-in privacy plugin was entirely rewritten and now works perfectly
    with the [built-in optimize plugin], which means that external assets
    can be passed through the same optimization pipeline as the rest of your
    documentation. This means you can store and edit unoptimized files
    outside of your repository, and let both plugins built a highly
    optimized site for you.

    If you want to implement separate pipelines, i.e., optimize some images
    differently from others or exclude some images from downloading, you can
    use multiple instances of the [built-in privacy plugin].

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

  [Google Fonts]: changing-the-fonts.md
  [regular font]: changing-the-fonts.md#regular-font
  [example]: #example
  [built-in optimize plugin]: ../plugins/optimize.md

??? example "Expand to inspect example"

    For the official documentation, the [built-in privacy plugin] downloads the
    following resources:

    ``` { .sh .no-copy #example }
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

  [built-in privacy plugin]: ../plugins/privacy.md
  [preconnect]: https://developer.mozilla.org/en-US/docs/Web/Performance/dns-prefetch

#### Advanced settings

<!-- md:sponsors -->
<!-- md:version insiders-4.50.0 -->

The following advanced settings are currently reserved to our [sponsors]
[Insiders]. They are entirely optional, and don't affect the functionality of
the blog, but can be helpful for customizations:

- [`log`][config.log]
- [`log_level`][config.log_level]

We'll add more settings here, as we discover new use cases.

  [Insiders]: ../insiders/index.md
  [config.log]: ../plugins/privacy.md#config.log
  [config.log_level]: ../plugins/privacy.md#config.log_level

## Customization

### Custom cookies

<!-- md:version 8.4.0 -->
<!-- md:example custom-cookies -->

If you've customized the [cookie consent] and added a `custom` cookie, the user
will be prompted to accept or reject your custom cookie. Once the user accepts
or rejects the cookie consent, or [changes the settings], the page reloads[^1].
Use [additional JavaScript] to query the result:

  [^1]:
    We reload the page to make interop with custom cookies simpler. If Material
    for MkDocs would implement a callback-based approach, the author would need
    to make sure to correctly update all scripts that use cookies. Additionally,
    the cookie consent is only answered initially, which is why we consider this
    to be a good trade-off of DX and UX.

=== ":octicons-file-code-16: `docs/javascripts/consent.js`"

    ``` js
    var consent = __md_get("__consent")
    if (consent && consent.custom) {
      /* The user accepted the cookie */
    } else {
      /* The user rejected the cookie */
    }
    ```

=== ":octicons-file-code-16: `mkdocs.yml`"

    ``` yaml
    extra_javascript:
      - javascripts/consent.js
    ```

  [additional JavaScript]: ../customization.md#additional-javascript
  [changes the settings]: #change-cookie-settings
