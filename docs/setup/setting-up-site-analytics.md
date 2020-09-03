---
template: overrides/main.html
---

# Setting up site analytics

As with any other service offered on the web, understanding how your project
documentation is actually used can be an essential success factor. While
Material for MkDocs natively integrates with [Google Analytics][1], [other
analytics services][2] can be used, too.

  [1]: https://developers.google.com/analytics
  [2]: #other-analytics-providers

## Configuration

### Google Analytics

[:octicons-file-code-24: Source][3] · :octicons-milestone-24: Default: _none_

After heading over to your [Google Analytics][1] account to [create a new
property][4] in order to obtain a unique tracking id of the form
`UA-XXXXXXXX-X`, add it to `mkdocs.yml`:

``` yaml
google_analytics:
  - UA-XXXXXXXX-X
  - auto
```

  [3]: https://github.com/squidfunk/mkdocs-material/blob/master/src/partials/integrations/analytics.html
  [4]: https://support.google.com/analytics/answer/1042508

#### Site search tracking

Besides basic page views, _site search_ can also be tracked to understand better
how people use your documentation and what they expect to find. To enable
search tracking:

1. Go to your Google Analytics __admin settings__
2. Select the property for the respective tracking code
3. Go to the __view settings__ tab.
4. Scroll down and enable __site search settings__
5. Set the __query parameter__ to `q`.

## Customization

### Other analytics providers

[:octicons-file-code-24: Source][3] ·
:octicons-mortar-board-24: Difficulty: _easy_

In order to integrate another analytics service provider offering an
asynchronous JavaScript-based tracking solution, you can [extend the theme][5]
and [override the `analytics` block][6]:

``` html
{% block analytics %}
  <!-- Add custom analytics integration here -->
{% endblock %}
```

  [5]: ../customization.md#extending-the-theme
  [6]: ../customization.md#overriding-blocks

If you're using [instant loading][7], you may use the `location$` observable,
which will emit the current `URL` to listen for navigation events and register
a page view event with:

``` js
app.location$.subscribe(function(url) {
  /* Add custom page event tracking here */
})
```

Note that this must be integrated with [additional JavaScript][8], and cannot be
included as part of the `analytics` block, as it is included in the `head` of
the document.

  [7]: setting-up-navigation.md#instant-loading
  [8]: ../customization.md#additional-javascript
