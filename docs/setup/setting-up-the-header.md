---
template: overrides/main.html
---

# Setting up the header

Material for MkDocs' header can be customized to show an announcement bar that 
disappears upon scrolling, and provides some options for further configuration.
It also includes the [search bar] and a place to display your project's
[git repository], as explained in those dedicated guides.

  [search bar]: setting-up-site-search.md
  [git repository]: adding-a-git-repository.md

## Configuration

### Automatic hiding

[:octicons-tag-24: 6.2.0][Automatic hiding support] ·
:octicons-unlock-24: Feature flag

When autohiding is enabled, the header is automatically hidden when the
user scrolls past a certain threshold, leaving more space for content. Add the
following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - header.autohide
```

  [Automatic hiding support]: https://github.com/squidfunk/mkdocs-material/releases/tag/6.2.0

### Announcement bar

[:octicons-tag-24: 5.0.0][Announcement bar support] ·
:octicons-file-symlink-file-24: Customization

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

  [Announcement bar support]: https://github.com/squidfunk/mkdocs-material/releases/tag/5.0.0
  [extend the theme]: ../customization.md#extending-the-theme
  [overriding blocks]: ../customization.md#overriding-blocks

#### Mark as read

[:octicons-tag-24: 8.4.0][dismiss support] ·
:octicons-unlock-24: Feature flag ·
:octicons-beaker-24: Experimental

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

  [dismiss support]: https://github.com/squidfunk/mkdocs-material/releases/tag/8.4.0
  [top]: #
