---
template: overrides/main.html
---

# Setting up site analytics

As with any other service that is offered on the web, understanding how your
documentation is actually used can be an essential success factor. While
Material for MkDocs natively integrates with [Google Analytics][1], other 
analytics services can be used, too.

  [1]: https://developers.google.com/analytics

## Configuration

### Site analytics

[:octicons-file-code-24: Source][2] · :octicons-milestone-24: Default: _none_

After heading over to your [Google Analytics][1] account to [create a new
property][3] in order to obtain a new tracking id of the form `UA-XXXXXXXX-X`,
add it to `mkdocs.yml`:

``` yaml
google_analytics:
  - UA-XXXXXXXX-X
  - auto
```

Publish and refresh your site, and you should see events bubbling up.

  [2]: https://github.com/squidfunk/mkdocs-material/blob/master/src/partials/integrations/analytics.html
  [3]: https://support.google.com/analytics/answer/1042508

### Site search analytics

Besides basic page views, _site search_ can also be tracked to better understand
how people use your documentation and what they expect to find. To enable
search tracking:

1. Go to your Google Analytics __admin settings__
2. Select the property for the respective tracking code
3. Go to the __view settings__ tab.
4. Scroll down and enable __site search settings__
5. Set the __query parameter__ to `q`.

## Customization

### Other analytics services

[:octicons-file-code-24: Source][2] · 
:octicons-mortar-board-24: Difficulty: _easy_

In order to integrate another analytics service provider offering an
asynchronous JavaScript-based tracking solution, you can [extend the theme][4]
and [override the `analytics` block][5].

  [4]: ../customization.md#extending-the-theme
  [5]: ../customization.md#overriding-blocks

### Instant loading

[:octicons-file-code-24: Source][2] · 
:octicons-mortar-board-24: Difficulty: _easy_

If you're using [instant loading][6], you can use the `DOMContentSwitch` event
to listen for navigation events and register a page view event with:

``` js
document.addEventListener("DOMContentSwitch", function() {
  /* Register page event here */
})
```

  [6]: setting-up-navigation.md#instant-loading
