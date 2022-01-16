---
template: overrides/main.html
---

# Adding a git repository

If your documentation is related to source code, Material for MkDocs provides
the ability to display information to the project's repository as part of the
static site, including statistics like stars and forks. Furthermore, individual
documents can be linked to specific source files.

## Configuration

### Repository

[:octicons-tag-24: 0.1.0][repo_url support] ·
:octicons-milestone-24: Default: _none_

In order to display a link to the repository of your project as part of your
documentation, set [`repo_url`][repo_url] in `mkdocs.yml` to the public URL of
your repository, e.g.:

``` yaml
repo_url: https://github.com/squidfunk/mkdocs-material
```

The link to the repository will be rendered next to the search bar on big
screens and as part of the main navigation drawer on smaller screen sizes.
Additionally, for public repositories hosted on [GitHub] or [GitLab], the
number of stars and forks is automatically requested and rendered.

  [repo_url support]: https://github.com/squidfunk/mkdocs-material/releases/tag/0.1.0
  [repo_url]: https://www.mkdocs.org/user-guide/configuration/#repo_url

### Repository name

[:octicons-tag-24: 0.1.0][repo_name support] ·
:octicons-milestone-24: Default: _automatically set to_ `GitHub`, `GitLab` _or_
`Bitbucket`

MkDocs will infer the source provider by examining the URL and try to set the
_repository name_ automatically. If you wish to customize the name, set
[`repo_name`][repo_name] in `mkdocs.yml`:

``` yaml
repo_name: squidfunk/mkdocs-material
```

  [repo_name support]: https://github.com/squidfunk/mkdocs-material/releases/tag/0.1.0
  [repo_name]: https://www.mkdocs.org/user-guide/configuration/#repo_name

### Repository icon

[:octicons-tag-24: 5.0.0][icon.repo support] ·
:octicons-milestone-24: Default:
[`fontawesome/brands/git-alt`][icon.repo default]

While the default repository icon is a generic git icon, it can be set to
any icon bundled with the theme by referencing a valid icon path in
`mkdocs.yml`:

``` yaml
theme:
  icon:
    repo: fontawesome/brands/git-alt # (1)!
```

1.  Enter a few keywords to find the perfect icon using our [icon search] and
    click on the shortcode to copy it to your clipboard:

    <div class="mdx-iconsearch" data-mdx-component="iconsearch">
      <input class="md-input md-input--stretch mdx-iconsearch__input" placeholder="Search icon" data-mdx-component="iconsearch-query" value="git" />
      <div class="mdx-iconsearch-result" data-mdx-component="iconsearch-result" data-mdx-mode="file">
        <div class="mdx-iconsearch-result__meta"></div>
        <ol class="mdx-iconsearch-result__list"></ol>
      </div>
    </div>

Some popular choices:

- :fontawesome-brands-git: – `fontawesome/brands/git`
- :fontawesome-brands-git-alt: – `fontawesome/brands/git-alt`
- :fontawesome-brands-git-square: – `fontawesome/brands/git-square`
- :fontawesome-brands-github: – `fontawesome/brands/github`
- :fontawesome-brands-github-alt: – `fontawesome/brands/github-alt`
- :fontawesome-brands-github-square: – `fontawesome/brands/github-square`
- :fontawesome-brands-gitlab: – `fontawesome/brands/gitlab`
- :fontawesome-brands-gitkraken: – `fontawesome/brands/gitkraken`
- :fontawesome-brands-bitbucket: – `fontawesome/brands/bitbucket`
- :fontawesome-solid-trash: – `fontawesome/solid/trash`

  [icon.repo support]: https://github.com/squidfunk/mkdocs-material/releases/tag/5.0.0
  [icon.repo default]: https://github.com/squidfunk/mkdocs-material/blob/master/material/.icons/fontawesome/brands/git-alt.svg
  [icon search]: ../reference/icons-emojis.md#search

### Edit button

[:octicons-tag-24: 0.1.0][edit_uri support] ·
:octicons-milestone-24: Default: _automatically set_

If the repository URL points to a [GitHub], [GitLab] or [Bitbucket] repository,
an edit button is displayed at the top of each document. This behavior can be
changed by setting [`edit_uri`][edit_uri] in `mkdocs.yml`:

=== "Customize edit path"

    ``` yaml
    edit_uri: edit/master/docs/
    ```

=== "Hide edit button"

    ``` yaml
    edit_uri: ""
    ```

  [edit_uri support]: https://github.com/squidfunk/mkdocs-material/releases/tag/0.1.0
  [edit_uri]: https://www.mkdocs.org/user-guide/configuration/#edit_uri
  [GitHub]: https://github.com/
  [GitLab]: https://about.gitlab.com/
  [Bitbucket]: https://bitbucket.org/

### Revision date

[:octicons-tag-24: 4.6.0][git-revision-date support] ·
[:octicons-cpu-24: Plugin][git-revision-date]

The [git-revision-date] plugin adds support for displaying the date a
document was last updated at the bottom of each page. It can be installed
with `pip`:

```
pip install mkdocs-git-revision-date-plugin
```

Then, add the following lines to `mkdocs.yml`:

``` yaml
plugins:
  - git-revision-date
```

The following configuration options are supported:

`enabled_if_env`{ #enabled-if-env }

:   :octicons-milestone-24: Default: _none_ – When specified, the plugin will
    only be invoked if the environment variable exists. This makes it easy to
    disable extraction for cases when the repository is not available:

    ``` yaml
    plugins:
      - git-revision-date:
          enabled_if_env: CI
    ```

The other configuration options of this extension are not officially supported
by Material for MkDocs, which is why they may yield unexpected results. Use
them at your own risk.

  [git-revision-date support]: https://github.com/squidfunk/mkdocs-material/releases/tag/4.6.0
  [git-revision-date]: https://github.com/zhaoterryy/mkdocs-git-revision-date-plugin

### Revision date, localized

[:octicons-tag-24: 4.6.0][git-revision-date-localized support] ·
[:octicons-cpu-24: Plugin][git-revision-date-localized]

Similarly, the [git-revision-date-localized] plugin adds support for adding
a localized update and creation date at the bottom of each page. It can be
installed with `pip`:

```
pip install mkdocs-git-revision-date-localized-plugin
```

Then, add the following to `mkdocs.yml`:

``` yaml
plugins:
  - git-revision-date-localized
```

The following configuration options are supported:

`type`{ #type }

:   :octicons-milestone-24: Default: `date` – The format of the date to be
    displayed. Valid values are `date`, `datetime`, `iso_date`, `iso_datetime`
    and `timeago`:

    ``` yaml
    plugins:
      - git-revision-date-localized:
          type: date
    ```

`fallback_to_build_date`{ #fallback-to-build-date }

:   :octicons-milestone-24: Default: `false` – Enables falling back to
    the time when `mkdocs build` was executed. Can be used as a fallback when
    the build is performed outside of a git repository:

    ``` yaml
    plugins:
      - git-revision-date-localized:
          fallback_to_build_date: true
    ```

`enable_creation_date`{ #enable-creation-date }

:   [:octicons-tag-24: 7.1.4][enable_creation_date support] ·
    :octicons-milestone-24: Default: `false` – Enables the display of the
    creation date of the file associated with the page next to the last updated
    date at the bottom of the page:

    ``` yaml
    plugins:
      - git-revision-date-localized:
          enable_creation_date: true
    ```


The other configuration options of this extension are not officially supported
by Material for MkDocs, which is why they may yield unexpected results. Use
them at your own risk.

  [git-revision-date-localized support]: https://github.com/squidfunk/mkdocs-material/releases/tag/4.6.0
  [git-revision-date-localized]: https://github.com/timvink/mkdocs-git-revision-date-localized-plugin
  [enable_creation_date support]: https://github.com/squidfunk/mkdocs-material/releases/tag/7.1.4
