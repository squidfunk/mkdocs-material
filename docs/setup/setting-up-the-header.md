# Setting up the header

Material for MkDocs' header can be customized to show an announcement bar that
disappears upon scrolling, and provides some options for further configuration.
It also includes the [search bar] and a place to display your project's
[git repository], as explained in those dedicated guides.

  [search bar]: setting-up-site-search.md
  [git repository]: adding-a-git-repository.md

## Configuration

### Automatic hiding

<!-- md:version 6.2.0 -->
<!-- md:feature -->

When autohiding is enabled, the header is automatically hidden when the
user scrolls past a certain threshold, leaving more space for content. Add the
following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - header.autohide
```

### Hiding the page title

<!-- md:version 9.4.4 -->
<!-- md:flag metadata -->

In documents missing a `<h1>` at the top of the page, Material for MkDocs
automatically inserts a title. If you want to provide your own hero graphic or
main heading (like for a landing page), it can be useful to hide the page title,
as it consumes quite a bit of vertical space. 

A document's title can be hidden with the front matter `hide` property. Add the
following lines at the top of a Markdown file:

```yaml
---
hide:
  - title
---
```

### Announcement bar

<!-- md:version 5.0.0 -->
<!-- md:flag customization -->

Material for MkDocs includes an announcement bar, which is the perfect place to
display project news or other important information to the user. When the user
scrolls past the header, the bar will automatically disappear. In order to add
an announcement bar, [extend the theme] and [override the `announce`
block][overriding blocks], which is empty by default:

``` html
{% extends "base.html" %}

{% block announce %}
  <!-- Add announcement here, including arbitrary HTML -->
{% endblock %}
```

  [extend the theme]: ../customization.md#extending-the-theme
  [overriding blocks]: ../customization.md#overriding-blocks

#### Mark as read

<!-- md:version 8.4.0 -->
<!-- md:feature -->
<!-- md:flag experimental -->

In order to render temporary announcements that can be marked as read by the
user, a button to dismiss the current announcement can be included. Add the
following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - announce.dismiss
```

When the user clicks the button, the current announcement is dismissed and not
displayed again until the content of the announcement changes. This is handled
automatically.

[Scroll to the top of this page][top] to see it in action.

  [top]: #
