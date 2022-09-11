---
template: overrides/main.html
---

# Setting up site analytics

As with any other service offered on the web, understanding how your project
documentation is actually used can be an essential success factor. Material for
MkDocs natively integrates with [Google Analytics] and offers a customizable
[cookie consent] and a [feedback widget].

  [Google Analytics]: https://developers.google.com/analytics
  [cookie consent]: ensuring-data-privacy.md#cookie-consent
  [feedback widget]: #was-this-page-helpful

## Configuration

### Google Analytics

[:octicons-tag-24: 7.1.8][Google Analytics support] ·
:octicons-milestone-24: Default: _none_

Material for MkDocs integrates with both, Google Analytics 4 and the now phasing
out Universal Analytics. Depending on the given property prefix, add the
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

??? question "How to measure site search usage?"

    Besides page views and events, [site search] can be tracked to better
    understand how people use your documentation and what they expect to find.
    In order to enable site search tracking, the following steps are required:

    === ":material-google-analytics: Google Analytics 4"

        1. Go to your Google Analytics __admin settings__
        2. Select the property for the respective tracking code
        3. Select the __data streams__ tab and click the corresponding URL
        4. Click the gear icon within the __enhanced measurement__ section
        5. Ensure that __site search__ is enabled

    === ":material-google-analytics: Universal Analytics"

        1.  Go to your Google Analytics __admin settings__
        2.  Select the property for the respective tracking code
        3.  Go to the __view settings__ tab
        4.  Scroll down and enable __site search settings__
        5.  Set the __query parameter__ to `q`

  [site search]: setting-up-site-search.md

### Was this page helpful?

[:octicons-tag-24: 8.4.0][Was this page helpful? support] ·
:octicons-milestone-24: Default: _none_ ·
:octicons-beaker-24: Experimental

A simple [feedback widget] can be included at the bottom of each page,
encouraging users to give instant feedback whether a page was helpful or not.
Add the following lines to `mkdocs.yml`:

``` yaml
extra:
  analytics: # (1)!
    feedback:
      title: Was this page helpful?
      ratings:
        - icon: material/emoticon-happy-outline
          name: This page was helpful
          data: 1
          note: >-
            Thanks for your feedback!
        - icon: material/emoticon-sad-outline
          name: This page could be improved
          data: 0
          note: >- # (2)!
            Thanks for your feedback! Help us improve this page by
            using our <a href="..." target="_blank" rel="noopener">feedback form</a>.
```

1.  This feature is natively integrated with [Google Analytics][analytics],
    which is why `provider` and `property` are also required. However, it's also
    possible to provide a [custom feedback integration].

2.  You can add arbitrary HTML tags to the note which is shown after the user
    submitted the feedback, e.g. to link to a feedback form.

Both properties, `title` and `ratings`, are required. Note that it's allowed to
define more than two ratings, e.g. to implement a 1-5 star rating. Since the
feedback widget sends data to a third-party service, it is, of course, natively 
integrated with the [cookie consent] feature[^1].

  [^1]:
    If the user doesn't accept the `analytics` cookie, the feedback widget is
    not shown.

??? question "How to visualize the collected feedback ratings?"

    To visualize feedback ratings you'll need to create a custom report with
    [Google Analytics] that will quickly show you the worst- and best-rated
    pages of your project documentation.

    === ":material-google-analytics: Google Analytics 4"

        1.  Go to your Google Analytics __dashboard__

        2.  Go to the __configure__ page on the left hand menu, then select
            __custom definitions__

        3.  Click the __custom metrics__ tab and then __create custom metrics__, 
            enter the following values:

            * Metric name: Page helpful
            * Description: Was this page helpful?
            * Event parameter: `data`
            * Unit of measurement: Standard

        4.  Go to the __explore__ page on the left hand menu, create a new
            __blank exploration__

        5.  Configure the report as follows:

            * Dimensions: Add `Event name` and `Page location`
            * Metrics: Add `Event count` and `Page helpful`
              (the custom metric created in step 3)
            * Rows: `Page location`
            * Values: Drag in both `Event count` and `Page helpful`
            * Filters: Add a new filter for 
              `Event name / exactly matches / feedback`

        !!! warning "Delay in data availability"

            The report may take 24 hours or longer to begin displaying data

    === ":material-google-analytics: Universal Analytics"

        1. Go to your Google Analytics __dashboard__
        2. Open the __customization__ panel on the left and go to __custom reports__
        3. Create a __new custom report__ and set a custom __title__ and __name__
        4. Add `Avg. Value` and `Total Events` to __metric group__
        5. Add `Event Label` to __dimension drilldown__
        6. Add `Event Category` to __filters__ and filter for the value __feedback__

    Now, after you've saved the report and collected some feedback ratings,
    you'll have a list of all pages with the total number of ratings, and an
    average rating per page. This should help you identify pages that need to
    be improved:

    [![feedback report]][feedback report]

The following properties are available for each rating:

[`icon`](#+analytics.feedback.ratings.icon){ #+analytics.feedback.ratings.icon }

:   :octicons-milestone-24: Default: _none_ · :octicons-alert-24: __Required__ –
    This property must point to a valid icon path referencing [any icon bundled
    with the theme][custom icons], or the build will not succeed. Some popular
    combinations:

    * :material-emoticon-happy-outline: + :material-emoticon-sad-outline: – `material/emoticon-happy-outline` + `material/emoticon-sad-outline`
    * :material-thumb-up-outline: + :material-thumb-down-outline: – `material/thumb-up-outline` + `material/thumb-down-outline`
    * :material-heart: + :material-heart-broken: – `material/heart` + `material/heart-broken`

[`name`](#+analytics.feedback.ratings.name){ #+analytics.feedback.ratings.name }

:   :octicons-milestone-24: Default: _none_ · :octicons-alert-24: __Required__ –
    The value of this property is shown on user interaction (i.e. keyboard focus
    or mouse hover), explaining the meaning of the rating behind the icon.

[`data`](#+analytics.feedback.ratings.data){ #+analytics.feedback.ratings.data }

:   :octicons-milestone-24: Default: _none_ · :octicons-alert-24: __Required__ –
    The value of this property is sent as a data value with the custom event
    that is transmitted to Google Analytics[^2] (or any custom integration).

  [^2]:
    Note that for Google Analytics, the data value must be an integer.

[`note`](#+analytics.feedback.ratings.note){ #+analytics.feedback.ratings.note }

:   :octicons-milestone-24: Default: _none_ · :octicons-alert-24: __Required__ –
    The value of this property is shown after the user selected the rating.
    It may contain arbitrary HTML tags, which is especially useful to ask the
    user to provide more detailed feedback for the current page through a form.
    It's also possible to pre-fill forms with the URL and title of the current
    page by using the following placeholders:

    - `{url}` – Page URL
    - `{title}` – Page title

    ```
    https://github.com/.../issues/new/?title=[Feedback]+{title}+-+{url}
    ```

    In this example, when clicking the link, the user is redirected to the "new 
    issue" form of your repository, with a pre-filled title including the path
    of the current document, e.g.:

    ```
    [Feedback] Setting up site analytics – /setup/setting-up-site-analytics/
    ```

    An alternative to GitHub issues is [Google Forms].

  [Was this page helpful? support]: https://github.com/squidfunk/mkdocs-material/releases/tag/8.4.0
  [feedback widget]: #feedback
  [analytics]: #google-analytics
  [feedback report]: ../assets/screenshots/feedback-report.png
  [custom feedback integration]: #custom-site-feedback
  [custom icons]: https://github.com/squidfunk/mkdocs-material/tree/master/material/.icons
  [Google Forms]: https://www.google.com/forms/about/

## Usage

### Hiding the feedback widget

The [feedback widget] can be hidden for a document with the front matter `hide` property. Add the following lines at the top of a Markdown file:

``` yaml
---
hide:
  - feedback
---

# Document title
...
```

## Customization

### Custom site analytics

In order to integrate another analytics service provider offering a 
JavaScript-based tracking solution, just follow the guide on [theme extension]
and create a new partial in the `overrides` folder. The name of the partial is
used to configure the custom integration via `mkdocs.yml`:

=== ":octicons-file-code-16: `overrides/partials/integrations/analytics/custom.html`"

    ``` html
    <script>
      /* Add custom analytics integration here, e.g. */
      var property = "{{ config.extra.analytics.property }}" // (1)!

      /* Wait for page to load and application to mount */
      document.addEventListener("DOMContentLoaded", function() {
        location$.subscribe(function(url) {
          /* Add custom page event tracking here */ // (2)!
        })
      })
    </script>
    ```

    1.  As an example, this variable receives the value set in `mkdocs.yml`,
        which is `"foobar"` for `property`.
    2.  If you're using [instant loading], you can use the `location$`
        observable to listen for navigation events, which always emits the
        current `URL`.

=== ":octicons-file-code-16: `mkdocs.yml`"

    ``` yaml
    extra:
      analytics:
        provider: custom
        property: foobar # (1)!
    ```

    1.  You can add arbitrary key-value combinations to configure your
        custom integration. This is especially useful if you're sharing the
        custom integration across multiple repositories.

  [theme extension]: ../customization.md#extending-the-theme
  [instant loading]: setting-up-navigation.md#instant-loading

### Custom site feedback

A custom feedback widget integration just needs to process the events that are
generated by users interacting with the feedback widget with the help of some
[additional JavaScript]:

=== ":octicons-file-code-16: `docs/javascripts/feedback.js`"

    ``` js
    var feedback = document.forms.feedback
    feedback.addEventListener("submit", function(ev) {
      ev.preventDefault()

      /* Retrieve page and feedback value */
      var page = document.location.pathname
      var data = ev.submitter.getAttribute("data-md-value")

      /* Send feedback value */
      console.log(page, data)
    })
    ```

=== ":octicons-file-code-16: `mkdocs.yml`"

    ``` yaml
    extra_javascript:
      - javascripts/feedback.js
    ```

&nbsp;
{ #feedback style="margin: 0; height: 0" }

  [additional JavaScript]: ../customization.md#additional-javascript
