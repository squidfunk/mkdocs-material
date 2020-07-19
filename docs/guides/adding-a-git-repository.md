---
template: overrides/main.html
---

# Adding a git repository

- link edit button
- link related source file (via metadata)

## Configuration

To include a link to the repository of your project within your documentation,
set the following variables via your project's `mkdocs.yml`:

``` yaml
repo_name: squidfunk/mkdocs-material
repo_url: https://github.com/squidfunk/mkdocs-material
```

The name of the repository will be rendered next to the search bar on big
screens and as part of the main navigation drawer on smaller screen sizes.
Additionally, for GitHub and GitLab, the number of stars and forks is shown.
Note that the repository icon can be explicitly set through `theme.icon.repo`.

!!! question "Why is there an edit button at the top of every article?"

    If the `repo_url` is set to a GitHub or BitBucket repository, and the
    `repo_name` is set to *GitHub* or *BitBucket* (implied by default), an
    edit button will appear at the top of every article. This is the automatic
    behavior that MkDocs implements. See the [MkDocs documentation][20] on more
    guidance regarding the `edit_uri` attribute, which defines whether the edit
    button is shown or not.

  [20]: https://www.mkdocs.org/user-guide/configuration/#edit_uri
