---
template: overrides/main.html
---

# Setting up versioning

Material for MkDocs makes it easy to deploy multiple versions of your project
documentation by integrating with external utilities that add those capabilities
to MkDocs, i.e. [mike][1]. When deploying a new version, older versions of your
documentation remain untouched.

  [1]: https://github.com/jimporter/mike

## Configuration

### Versioning

[:octicons-file-code-24: Source][2] ·
[:octicons-package-24: Utility][1] ·
:octicons-beaker-24: Experimental ·
[:octicons-heart-fill-24:{: .tx-heart } Insiders only][2]{: .tx-insiders }

[mike][1] makes it easy to deploy multiple versions of your project
documentation. It integrates natively with Material for MkDocs and can be
enabled via `mkdocs.yml`:

``` yaml
extra:
  version:
    method: mike
```

This will render a version selector in the header next to the title of your
project:

[![Version selection][3]][3]

[Try this feature][4]{: .md-button .md-button--primary }

_This feature is enabled in the [versioning example][4] built with Insiders._

!!! quote "[Why use mike?][5]"

    mike is built around the idea that once you've generated your docs for a
    particular version, you should never need to touch that version again. This
    means you never have to worry about breaking changes in MkDocs, since your
    old docs (built with an old version of MkDocs) are already generated and
    sitting in your `gh-pages` branch.

    While mike is flexible, it's optimized around putting your docs in a
    `<major>.<minor>` directory, with optional aliases (e.g. `latest` or `dev`)
    to particularly notable versions. This makes it easy to make permalinks to
    whatever version of the documentation you want to direct people to.

_Note that you don't need to run `mike install-extras` as noted in the
[official documentation][6], as [mike][1] is now natively integrated with
Material for MkDocs._

  [2]: ../insiders.md
  [3]: ../assets/screenshots/versioning.png
  [4]: https://squidfunk.github.io/mkdocs-material-example-versioning/
  [5]: https://github.com/jimporter/mike#why-use-mike
  [6]: https://github.com/jimporter/mike#usage

## Usage

While this section outlines the basic workflow for publishing new versions, 
it's best to check out the [official documentation][4] to make yourself familar
with [mike][1].

### Publishing a new version

If you want to publish a new version of your project documentation, choose a
version identifier and update the alias set as the default version with:

```
mike deploy --push --update-aliases 0.1 latest
```

Note that every version will be deployed as a subdirectory of your `site_url`,
e.g.:

- _docs.example.com/0.1_
- _docs.example.com/0.2_
- ...

### Setting a default version

When starting with [mike][1], a good idea is to set an alias as a default
version, e.g. `latest`, and when publishing a new version, always update the
alias to point to the latest version:

```
mike set-default --push latest
```

When publishing a new version, [mike][1] will create a redirect in the root of
your project documentation to the version associated with the alias:

_docs.example.com_ :octicons-arrow-right-24: _docs.example.com/0.1_
