---
date: 2023-09-22
authors: [squidfunk]
categories:
  - Build
  - Performance
links:
  - publishing-your-site.md#with-github-actions
  - creating-your-site.md#building-your-site
---

# Using `git sparse-checkout` for faster documentation builds

__Leveraging `git sparse-checkout` in GitHub Actions enabled us to speed up
documentation builds in our repository, cutting checkout times from 20 to 30
seconds to just 2 seconds.__

Developing an efficient approach to build documentation in CI workflows is
essential, especially when working in large repositories with thousands of
commits, like ours. Of course, we want to build documentation quickly and
efficiently, ensuring fast and productive workflows. When using both the
wonderful [`git-committers`][git-committers] and [`git-revision-date-localized`]
[git-revision-date-localized] plugins to display [document contributors] and
[dates] at the bottom of each page, we are required to set `fetch-depth: 0`,
which resulted in checkout times of 20 to 30 seconds on our repository. By
leveraging [`git sparse-checkout`][git sparse-checkout] within [GitHub Actions],
check out time was brought down to 2 seconds.

  [git sparse-checkout]: https://git-scm.com/docs/git-sparse-checkout
  [GitHub Actions]: ../../publishing-your-site.md#with-github-actions
  [git-revision-date-localized]: https://github.com/timvink/mkdocs-git-revision-date-localized-plugin
  [git-committers]: https://github.com/ojacques/mkdocs-git-committers-plugin-2
  [document contributors]: ../../setup/adding-a-git-repository.md#document-contributors
  [dates]: ../../setup/adding-a-git-repository.md#document-dates

<!-- more -->

## A Primer

[`git sparse-checkout`][git sparse-checkout] allows you to check out only a
subset of the files in a repository, making it incredibly useful for large
repositories where a full checkout takes long and includes many files that are
not relevant when building documentation.

## GitHub Actions

To enable [`git sparse-checkout`][git sparse-checkout] within [GitHub Actions]
and ensure that you are only building the documentation that you need, add the
following lines to your workflow file:

``` yaml
- uses: actions/checkout@v4
  with:
    fetch-depth: 0
    sparse-checkout: |
      docs
      includes
```

[`git sparse-checkout`][git sparse-checkout] always checks out all files
residing in the repository’s root. This means that regardless of the specified
paths or directories for sparse checkout, the files located in the root of the
repository will always be included in the checkout process.

Thus, you only need to specify the directories that are necessary for building
documentation. In our case, we only need the `docs` and `includes` folders,
but if you need additional directories, you can just add them to the end of the
list. A complete example workflow for [GitHub Actions]:

``` yaml hl_lines="13-18"
name: documentation
on:
  push:
    branches:
      - master
      - main
permissions:
  contents: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
          sparse-checkout: |
            docs
            includes
      - uses: actions/setup-python@v4
        with:
          python-version: 3.x
      - run: pip install mkdocs-material
      - run: mkdocs gh-deploy --force
```

## Conclusion

That's all there is! We're super happy with the results and hope that this will
help you to speed up your documentation builds in [GitHub Actions] as well. As
always, feel free to share your thoughts and experiences in the comments below.
