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

[:octicons-file-code-24: Source][3] · 
:octicons-unlock-24: Feature flag

When _autohiding_ is enabled, the header is automatically hidden when the
user scrolls past a certain threshold, leaving more space for content. Add the
following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - header.autohide
```

  [3]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/stylesheets/main/layout/_header.scss

## Customization

### Announcement bar

Material for MkDocs includes an announcement bar, which is the perfect place to
display project news or other important information to the user. When the user
scrolls past the header, the bar will automatically disappear. In order to add
an announcement bar, [extend the theme][4] and [override the `announce`
block][5], which is empty by default:

``` html
{% block announce %}
  <!-- Add your announcement here, including arbitrary HTML -->
{% endblock %}
```

  [4]: ../customization.md#extending-the-theme
  [5]: ../customization.md#overriding-blocks-recommended
