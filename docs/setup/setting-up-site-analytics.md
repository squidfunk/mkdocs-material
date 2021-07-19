---
template: overrides/main.html
---

# Setting up site analytics

As with any other service offered on the web, understanding how your project
documentation is actually used can be an essential success factor. Material for
MkDocs natively integrates with [Google Analytics][1] and offers a customizable
and extendable [cookie consent][2].

  [1]: https://developers.google.com/analytics
  [2]: #cookie-consent

## Configuration

### Google Analytics

[:octicons-file-code-24: Source][3] · :octicons-milestone-24: Default: _none_

Material for MkDocs integrates with both, Google Analytics 4 and the now phasing
out Universal Analytics (`UA-*`). Depending on the prefix of the property, add
the following to `mkdocs.yml`:

=== "Google Analytics 4"

    ``` yaml
    extra:
      analytics:
        provider: google
        property: G-XXXXXXXXXX
    ```

=== "Universal Analytics"

    ``` yaml
    extra:
      analytics:
        provider: google
        property: UA-XXXXXXXX-X
    ```

  [3]: https://github.com/squidfunk/mkdocs-material/blob/master/src/partials/integrations/analytics.html

#### Site search tracking

Besides basic page views, _site search_ can also be tracked to understand better
how people use your documentation and what they expect to find. To enable
search tracking:

1. Go to your Google Analytics __admin settings__
2. Select the property for the respective tracking code
3. Go to the __view settings__ tab.
4. Scroll down and enable __site search settings__
5. Set the __query parameter__ to `q`.

_Site search tracking is not supported with Google Analytics 4 due to the much
more complicated manual setup. If you want to set up site search tracking
yourself, [this tutorial][4] might be a good start._

  [4]: https://www.analyticsmania.com/post/track-site-search-with-google-tag-manager-and-google-analytics/

### Cookie consent

[:octicons-file-code-24: Source][5] ·
:octicons-milestone-24: Default: _none_ ·
[:octicons-heart-fill-24:{ .mdx-heart } Insiders only][5]{ .mdx-insiders }

Material for MkDocs ships a native and extensible cookie consent form, which
asks the user for his consent prior to setting up analytics. Add the following
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

1. You can add arbitrary HTML tags in the `description`, e.g. to link to your
   terms of service or other parts of the site.

Note that both, `title` and `description`, are required. If Google Analytics was
configured via `mkdocs.yml`, the cookie consent will automatically include a
setting for the user to disable it. Furthermore, [custom cookies][6] can be
integrated by using the `cookies` field:

===  "Change cookie name"

    ``` yaml
    extra:
      consent:
        cookies:
          analytics: Custom name # (1)
    ```

    1. The default name of the `analytics` cookie is `Google Analytics`.

===  "Add custom cookie"

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

[![With tabs][7]][7]

  [5]: ../insiders/index.md
  [6]: #custom-cookies
  [7]: ../assets/screenshots/consent.png

## Customization

### Custom site analytics

[:octicons-file-code-24: Source][3] ·
:octicons-mortar-board-24: Difficulty: _moderate_

In order to integrate another analytics service provider offering a 
JavaScript-based tracking solution, you can [extend the theme][8] and add a new 
`custom.html` partial [here][9]. The name of the partial can then be used to 
configure the custom integration from `mkdocs.yml`:

``` yaml
extra:
  analytics:
    provider: custom # (1)
    key: value # (2)
```

1. Of course, you can change the name to the partial to anything you like.
2. You can add arbitrary `key` and `value` combinations to configure your custom
   integration. This is especially useful if you're sharing the custom
   integration across multiple repositories.

  [8]: ../customization.md#extending-the-theme
  [9]: https://github.com/squidfunk/mkdocs-material/tree/master/src/partials/integrations/analytics

#### Instant loading

If you're using [instant loading][10], you may use the `location$` observable,
which will emit the current `URL` to listen for navigation events and register
a page view event with:

``` js
location$.subscribe(function(url) {
  /* Track a page event */
})
```

Note that this must be integrated with [additional JavaScript][11].

  [10]: setting-up-navigation.md#instant-loading
  [11]: ../customization.md#additional-javascript

### Custom cookies

[:octicons-file-code-24: Source][3] ·
:octicons-mortar-board-24: Difficulty: _moderate_

If you've customized the [cookie consent][12] and added a `custom` cookie, the
user will be prompted to accept your custom cookie. Use
[additional JavaScript][11] to check whether the user accepted it:

``` js
var consent = __md_get("__consent")
if (consent && consent.custom) {
  /* The user accepted the cookie */
}
```

  [12]: #cookie-consent
