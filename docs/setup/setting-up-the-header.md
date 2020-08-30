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
:octicons-unlock-24: Feature flag · 
:octicons-beaker-24: Experimental ·
[:octicons-heart-fill-24:{: .tx-heart } Insiders only][3]{: .tx-insiders }

When _auto-hiding_ is activated, the header is automatically hidden when the
user scrolls past a certain threshold, leaving more space for content. It can
be enabled via `mkdocs.yml` with:

``` yaml
theme:
  features:
    - header.hide
```

_Give this feature a try on [the official documentation][4] built with Material
for MkDocs Insiders!_

  [3]: ../insiders.md
  [4]: https://squidfunk.github.io/mkdocs-material-insiders/

## Customization

### Announcement bar

Material for MkDocs includes an announcement bar, which is the perfect place to
display project news or other important information to the user. When the user
scrolls past the header, the bar will automatically disappear. In order to add
an announcement bar, [extend the theme][5] and [override the `announce`
block][6], which is empty by default:

``` html
{% block announce %}
  <!-- Add your announcement here, including arbitrary HTML -->
{% endblock %}
```

  [5]: ../customization.md#extending-the-theme
  [6]: ../customization.md#overriding-blocks
