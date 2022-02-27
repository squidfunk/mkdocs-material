---
template: overrides/main.html
---

# Ensuring data privacy

Material for MkDocs makes compliance with data privacy regulations very easy, 
as it offers a native [cookie consent] solution to seek explicit consent from
users before setting up [tracking]. Additionally, external assets can be
automatically downloaded for self-hosting.

  [cookie consent]: setting-up-site-analytics.md#cookie-consent
  [tracking]: setting-up-site-analytics.md

## Configuration

### Built-in privacy plugin

[:octicons-heart-fill-24:{ .mdx-heart } Insiders][Insiders]{ .mdx-insiders } ·
[:octicons-tag-24: insiders-4.9.0][Insiders] ·
:octicons-cpu-24: Plugin ·
:octicons-beaker-24: Experimental

The built-in privacy plugin automatically identifies [external assets] as part
of the build process and download all assets for dead simple self-hosting. Add
the following lines to `mkdocs.yml`:

``` yaml
plugins:
  - privacy # (1)!
```

1.  Note that the privacy plugin should be located at the end of the list of
    `plugins`, as it will scan the resulting HTML for resources to download and
    replace. If a plugin after the privacy plugin adds further
    [external assets], these assets will not be downloaded.

The following configuration options are available:

`enabled`{ #enabled }

:   :octicons-milestone-24: Default: `true` – This option specifies whether
    the plugin is enabled when building your project. If you want to switch
    the plugin off, e.g. for local builds, use an [environment variable]:

    ``` yaml
    plugins:
      - privacy:
          enabled: !ENV [PRIVACY, false]
    ```

`externals`{ #externals }

:   :octicons-milestone-24: Default: `bundle` – This option specifies what the
    plugin should do when encountering external assets. There are two options:
    while `report` will issue warning messages during the build, `bundle` will
    automatically download all external files and adjust all references:

    ``` yaml
    plugins:
      - privacy:
          externals: bundle
    ```

    If you've removed all external assets from your project via [customization],
    it's still a good idea to enable the plugin and set the mode to `report`,
    as the plugin will make sure that there are no hidden external links in any
    Markdown files that were unintentionally added.

    Using `report` in [strict mode] will make the build fail when external
    assets are detected.

    [customization]: ../customization.md
    [strict mode]: https://www.mkdocs.org/user-guide/configuration/#strict

`externals_directory`{ #externals-directory }

:   :octicons-milestone-24: Default: `assets/externals` – This option
    specifies where the downloaded [external assets] will be stored. It's
    normally not necessary to change this option:

    ``` yaml
    plugins:
      - privacy:
          externals_directory: assets/externals
    ```

  [external assets]: #how-it-works
  [environment variable]: https://www.mkdocs.org/user-guide/configuration/#environment-variables

??? question "Why can't Material for MkDocs bundle all assets by design?"

    The primary reason why Material for MkDocs can't just bundle all of its own
    assets is the integration with [Google Fonts], which offers over a thousand
    different fonts that can be used to render your documentation. Most of the
    fonts include several weights and are split up into different character sets 
    to keep the download size small, so the browser only downloads what is
    really needed. For Roboto, our default [regular font], this results in [42
    `*.woff2` files in total][example].
    
    If Material for MkDocs would bundle all font files, the download size would
    be in the hundreds of megabytes, slowing down automated builds. Furthermore, 
    authors might add external assets like third-party scripts or stylesheets 
    that would need to be remembered to be defined as further local assets.
    
    This is the very reason the [built-in privacy plugin] exists — it automates
    the process of downloading all external assets manually to ensure compliance
    with GDPR. Note that there are some [technical limitations].

  [Google Fonts]: changing-the-fonts.md
  [regular font]: changing-the-fonts.md#regular-font
  [example]: #example
  [technical limitations]: #limitations

#### How it works

The [built-in privacy plugin] scans the resulting HTML for links to external
resources, including external scripts, style sheets, images and web fonts, and
downloads them to bundle them with your documentation site. Every URL refering
to an external resource, no matter if part of a template or Markdown file is
then replaced with the URL to the local copy. An example:

``` html
<script src="https://example.com/script.js"></script>
```

The external script is downloaded, and the link is replaced with:

``` html
<script src="assets/externals/example.com/script.js"></script>
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
    └─ assets/externals/
       ├─ cdnjs.cloudflare.com/ajax/tablesort/5.2.1/tablesort.min.js
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

  [Insiders]: ../insiders/index.md
