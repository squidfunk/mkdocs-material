---
template: overrides/main.html
---

# Setting up site analytics

As with any other service offered on the web, understanding how your project
documentation is actually used can be an essential success factor. Material for
MkDocs natively integrates with [Google Analytics] and offers a customizable
and extendable [cookie consent][extra.consent].

  [Google Analytics]: https://developers.google.com/analytics
  [extra.consent]: #cookie-consent

## Configuration

### Google Analytics

[:octicons-tag-24: 7.1.8][Google Analytics support] ·
:octicons-milestone-24: Default: _none_

Material for MkDocs integrates with both, Google Analytics 4 and the now phasing
out Universal Analytics (`UA-*`). Depending on the property prefix, add the
following lines to `mkdocs.yml`:

=== ":material-google-analytics: Google Analytics 4"

    ``` yaml
    extra:
      analytics:
        provider: google
        property: G-XXXXXXXXXX
    ```

=== ":material-google-analytics: Universal Analytics"

    ``` yaml
    extra:
      analytics:
        provider: google
        property: UA-XXXXXXXX-X
    ```

  [Google Analytics support]: https://github.com/squidfunk/mkdocs-material/releases/tag/7.1.8

#### Site search tracking

Besides basic page views, site search can also be tracked to understand better
how people use your documentation and what they expect to find. To enable
search tracking:

1.  Go to your Google Analytics __admin settings__
2.  Select the property for the respective tracking code
3.  Go to the __view settings__ tab.
4.  Scroll down and enable __site search settings__
5.  Set the __query parameter__ to `q`.

Site search tracking is not supported with Google Analytics 4 due to the more
complicated manual setup. If you want to set up site search tracking yourself,
[this tutorial][tutorial] is a good start.

  [tutorial]: https://www.analyticsmania.com/post/track-site-search-with-google-tag-manager-and-google-analytics/

### Cookie consent

[:octicons-heart-fill-24:{ .mdx-heart } Insiders][Insiders]{ .mdx-insiders } ·
[:octicons-tag-24: insiders-2.10.0][Insiders] ·
:octicons-milestone-24: Default: _none_

Material for MkDocs ships a native and extensible cookie consent form which
asks the user for his consent prior to sending any analytics. Add the following
to `mkdocs.yml`:

``` yaml
extra:
  consent:
    title: Cookie consent
    description: > # (1)
      We use cookies to recognize your repeated visits and preferences, as well
      as to measure the effectiveness of our documentation and whether users
      find what they're searching for. With your consent, you're helping us to
      make our documentation better.
```

1.  You can add arbitrary HTML tags in the `description`, e.g. to link to your
    terms of service or other parts of the site.

Note that both, `title` and `description`, are required. If Google Analytics was
configured via `mkdocs.yml`, the cookie consent will automatically include a
setting for the user to disable it. Furthermore, [custom cookies] can be
integrated by using the `cookies` field:

===  "Custom cookie name"

    ``` yaml
    extra:
      consent:
        cookies:
          analytics: Custom name # (1)
    ```

    1. The default name of the `analytics` cookie is `Google Analytics`.

===  "Custom cookie"

    ``` yaml
    extra:
      consent:
        cookies:
          analytics: Google Analytics # (1)
          custom: Custom cookie
    ```

    1. If you add a custom cookie to the `cookies` field, the `analytics` cookie 
       must be added back explicitly, or analytics won't be triggered.

When a user first visits your site, a cookie consent form is rendered:

[![extra.consent enabled]][extra.consent enabled]

In order to comply with GDPR, users must be able to change their cookie settings
at any time. This can be done by creating a simple link as part of any document,
e.g. your privacy policy:

``` markdown
[Change cookie settings](#__consent){ .md-button }
```

  [Insiders]: ../insiders/index.md
  [custom cookies]: #custom-cookies
  [extra.consent enabled]: ../assets/screenshots/consent.png

## Customization

### Custom site analytics

In order to integrate another analytics service provider offering a 
JavaScript-based tracking solution, just follow the guide on [theme extension]
and create a new partial in the `overrides` folder. The name of the partial is
used to configure the custom integration via `mkdocs.yml`:

=== ":octicons-file-code-16: partials/integrations/analytics/custom.html"

    ``` html
    <script>
      /* Add custom analytics integration here, e.g. */
      var property = "{{ config.extra.analytics.property }}" // (1)

      /* Wait for page to load and application to mount */
      document.addEventListener("DOMContentLoaded", function() {
        location$.subscribe(function(url) {
          /* Add custom page event tracking here */ // (2)
        })
      })
    </script>
    ```

    1.  As an example, this variable receives the value set in `mkdocs.yml`,
        which is `"foobar"` for `property`.
    2.  If you're using [instant loading], you can use the `location$`
        observable to listen for navigation events, which always emits the
        current `URL`.

=== ":octicons-file-code-16: mkdocs.yml"

    ``` yaml
    extra:
      analytics:
        provider: custom
        property: foobar # (1)
    ```

    1.  You can add arbitrary key-value combinations to configure your
        custom integration. This is especially useful if you're sharing the
        custom integration across multiple repositories.

  [theme extension]: ../customization.md#extending-the-theme
  [instant loading]: setting-up-navigation.md#instant-loading

### Custom cookies

If you've customized the [cookie consent][extra.consent] and added a `custom`
cookie, the user will be prompted to accept your custom cookie. Use [additional
JavaScript] to check whether the user accepted it:

=== ":octicons-file-code-16: docs/javascripts/consent.js"

    ``` js
    var consent = __md_get("__consent")
    if (consent && consent.custom) {
      /* The user accepted the cookie */
    }
    ```

=== ":octicons-file-code-16: mkdocs.yml"

    ``` yaml
    extra_javascript:
      - javascripts/consent.js
    ```

  [additional JavaScript]: ../customization.md#additional-javascript
