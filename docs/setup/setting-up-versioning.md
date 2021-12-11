---
template: overrides/main.html
---

# Setting up versioning

Material for MkDocs makes it easy to deploy multiple versions of your project
documentation by integrating with external utilities that add those capabilities
to MkDocs, i.e. [mike]. When deploying a new version, older versions of your
documentation remain untouched.

  [mike]: https://github.com/jimporter/mike

## Configuration

### Versioning

[:octicons-tag-24: 7.0.0][version support] ·
[:octicons-package-24: Utility][mike]

[mike] makes it easy to deploy multiple versions of your project documentation.
It integrates natively with Material for MkDocs and can be enabled via
`mkdocs.yml`:

``` yaml
extra:
  version:
    provider: mike
```

This renders a version selector in the header:

<figure markdown>

[![Version selector preview]][Version selector preview]

  <figcaption markdown>

Check out the versioning example to see it in action –
[squidfunk.github.io/mkdocs-material-example-versioning][version example]

  </figcaption>
</figure>

!!! quote "[Why use mike?]"

    mike is built around the idea that once you've generated your docs for a
    particular version, you should never need to touch that version again. This
    means you never have to worry about breaking changes in MkDocs, since your
    old docs (built with an old version of MkDocs) are already generated and
    sitting in your `gh-pages` branch.

    While mike is flexible, it's optimized around putting your docs in a
    `<major>.<minor>` directory, with optional aliases (e.g. `latest` or `dev`)
    to particularly notable versions. This makes it easy to make permalinks to
    whatever version of the documentation you want to direct people to.

  [version support]: https://github.com/squidfunk/mkdocs-material/releases/tag/5.2.0
  [Version selector preview]: ../assets/screenshots/versioning.png
  [version example]: https://squidfunk.github.io/mkdocs-material-example-versioning/
  [Why use mike?]: https://github.com/jimporter/mike#why-use-mike

### Version warning

[:octicons-tag-24: 8.0.0][Version warning support] ·
:octicons-file-symlink-file-24: Customization

If you're using versioning, you might want to display a warning when the user
visits any other version than the latest version. Using [theme extension],
you can [override the `outdated` block][overriding blocks]:

``` html
{% extends "base.html" %}

{% block outdated %}
  You're not viewing the latest version.
  <a href="{{ '../' ~ base_url }}"> <!-- (1)! -->
    <strong>Click here to go to latest.</strong>
  </a>
{% endblock %}
```

1.  Given this value for the `href` attribute, the link will always redirect to 
    the root of your site, which will then redirect to the latest version. This
    ensures that older versions of your site do not depend on a specific alias,
    e.g. `latest`, to allow for changing the alias later on without breaking
    earlier versions.

This will render a version warning above the header:

[![Version warning preview]][Version warning preview]

The default version is identified by the `latest` alias. If you wish to set
another alias as the latest version, e.g. `stable`, add the following lines
to `mkdocs.yml`:

``` yaml
extra:
  version:
    default: stable
```

Make sure that this matches the [default version].

  [Version warning support]: https://github.com/squidfunk/mkdocs-material/releases/tag/8.0.0
  [theme extension]: ../customization.md#extending-the-theme
  [overriding blocks]: ../customization.md#overriding-blocks
  [Version warning preview]: ../assets/screenshots/version-warning.png
  [default version]: #setting-a-default-version

### Stay on page

[:octicons-heart-fill-24:{ .mdx-heart } Insiders][Insiders]{ .mdx-insiders } ·
[:octicons-tag-24: insiders-2.6.0][Insiders]

Insiders improves the user experience when switching between versions: if
version A and B contain a page with the same path name, the user will stay on
the current page:

=== "New behavior"

    ```
    docs.example.com/0.1/     -> docs.example.com/0.2/
    docs.example.com/0.1/foo/ -> docs.example.com/0.2/foo/
    docs.example.com/0.1/bar/ -> docs.example.com/0.2/bar/
    ```

=== "Old behavior"

    ```
    docs.example.com/0.1/     -> docs.example.com/0.2/
    docs.example.com/0.1/foo/ -> docs.example.com/0.2/
    docs.example.com/0.1/bar/ -> docs.example.com/0.2/
    ```

  [Insiders]: ../insiders/index.md

## Usage

While this section outlines the basic workflow for publishing new versions, 
it's best to check out [mike's documentation][mike] to make yourself familar
with its mechanics.

### Publishing a new version

If you want to publish a new version of your project documentation, choose a
version identifier and update the alias set as the default version with:

```
mike deploy --push --update-aliases 0.1 latest
```

Note that every version will be deployed as a subdirectory of your `site_url`,
e.g.:

- _docs.example.com/0.1/_
- _docs.example.com/0.2/_
- ...

### Setting a default version

When starting with [mike], a good idea is to set an alias as a default version,
e.g. `latest`, and when publishing a new version, always update the alias to
point to the latest version:

```
mike set-default --push latest
```

When publishing a new version, [mike] will create a redirect in the root of
your project documentation to the version associated with the alias:

_docs.example.com_ :octicons-arrow-right-24: _docs.example.com/0.1_
