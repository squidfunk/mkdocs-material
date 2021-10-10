---
template: overrides/main.html
---

# Setting up the header

Material for MkDocs' header can be customized to show an announcement bar that 
disappears upon scrolling, and provides some options for further configuration.
It also includes the [search bar][1] and a place to display your project's
[git repository][2], as explained in those dedicated guides.

  [1]: setting-up-site-search.md
  [2]: adding-a-git-repository.md

## Configuration

### Automatic hiding

:octicons-unlock-24: Feature flag ·
[:octicons-tag-24: 6.2.0][Automatic hiding support]

When _autohiding_ is enabled, the header is automatically hidden when the
user scrolls past a certain threshold, leaving more space for content. Add the
following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - header.autohide
```

  [Automatic hiding support]: https://github.com/squidfunk/mkdocs-material/releases/tag/6.2.0

## Customization

### Announcement bar

:octicons-file-symlink-file-24: Customization ·
[:octicons-tag-24: 5.0.0][Announcement bar support]

Material for MkDocs includes an announcement bar, which is the perfect place to
display project news or other important information to the user. When the user
scrolls past the header, the bar will automatically disappear. In order to add
an announcement bar, [extend the theme][4] and [override the `announce`
block][5], which is empty by default:

``` html
{% extends "base.html" %}

{% block announce %}
  <!-- Add your announcement here, including arbitrary HTML -->
{% endblock %}
```

  [Announcement bar support]: https://github.com/squidfunk/mkdocs-material/releases/tag/6.2.0

  [4]: ../customization.md#extending-the-theme
  [5]: ../customization.md#overriding-blocks-recommended
