---
template: overrides/main.html
---

# Setting up site analytics

As with any other service offered on the web, understanding how your project
documentation is actually used can be an essential success factor. While
Material for MkDocs natively integrates with [Google Analytics][1], [other
analytics providers][2] can be used, too.

  [1]: https://developers.google.com/analytics
  [2]: #other-analytics-providers

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
:octicons-beaker-24: Experimental ·
[:octicons-heart-fill-24:{ .mdx-heart } Insiders only][5]{ .mdx-insiders }

Material for MkDocs ships a native and extensible cookie consent form, which
when enabled will ask the user for his consent prior to sending analytics.
Add the following to `mkdocs.yml`:

``` yaml
extra:
  consent: true
```

When a user first visits your site, a cookie consent form is rendered:

[![With tabs][6]][6]

  [5]: ../insiders/index.md
  [6]: ../assets/screenshots/consent.png

_Let's get this feature out of the experimental status! You are encouraged to
share your feedback in #1914, so we can provide the necessary configuration
options for easy customizations. If you wish to customize it today, you can
override_ `partials/consent.html`.

## Customization

### Other analytics providers

[:octicons-file-code-24: Source][3] ·
:octicons-mortar-board-24: Difficulty: _easy_

In order to integrate another analytics service provider offering an
asynchronous JavaScript-based tracking solution, you can [extend the theme][7]
and [override the `analytics` block][8]:

``` html
{% block analytics %}
  <!-- Add custom analytics integration here -->
{% endblock %}
```

  [7]: ../customization.md#extending-the-theme
  [8]: ../customization.md#overriding-blocks-recommended

If you're using [instant loading][9], you may use the `location$` observable,
which will emit the current `URL` to listen for navigation events and register
a page view event with:

``` js
location$.subscribe(function(url) {
  /* Add custom page event tracking here */
})
```

Note that this must be integrated with [additional JavaScript][10], and cannot be
included as part of the `analytics` block, as it is included in the `head` of
the document.

  [9]: setting-up-navigation.md#instant-loading
  [10]: ../customization.md#additional-javascript
