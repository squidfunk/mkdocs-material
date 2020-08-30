---
template: overrides/main.html
---

# Publishing your site

The great thing about hosting project documentation in a `git` repository is
the ability to deploy it automatically when new changes are pushed. MkDocs
makes this ridiculously simple.

## GitHub Pages

If you're already hosting your code on GitHub, [GitHub Pages][1] is certainly
the most convenient way to publish your project documentation. It's free of
charge and pretty easy to set up.

  [1]: https://pages.github.com/

### with GitHub Actions

Using [GitHub Actions][2] you can automate the deployment of your project
documentation. At the root of your repository, create a new GitHub Actions
workflow, e.g. `.github/workflows/ci.yml`, and copy and paste the following
contents:

=== "Material for MkDocs"

    ``` yaml
    name: ci
    on:
      push:
        branches:
          - master
    jobs:
      deploy:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v2
          - uses: actions/setup-python@v2
            with:
              python-version: 3.x
          - run: pip install mkdocs-material
          - run: mkdocs gh-deploy --force
    ```

=== "Insiders"

    ``` yaml
    name: ci
    on:
      push:
        branches:
          - master
    jobs:
      deploy:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v2
          - uses: actions/setup-python@v2
            with:
              python-version: 3.x
          - run: pip install git+https://${GH_TOKEN}@github.com/squidfunk/mkdocs-material-insiders.git
          - run: mkdocs gh-deploy --force
    env:
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
    ```

Now, when a new commit is pushed to `master`, the static site is automatically
built and deployed. Commit and push the file to your repository to see the
workflow in action.

Your documentation should shortly appear at `<username>.github.io/<repository>`.

_Remember to set the_ `GH_TOKEN` _environment variable to the value of your
[personal access token][3] when using [Material for MkDocs Insiders][4], which
can be done using [secrets][5]._

  [2]: https://github.com/features/actions
  [3]: https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token
  [4]: insiders.md
  [5]: https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets

### with MkDocs

If you prefer to deploy your project documentation manually, you can just invoke
the following command from the directory containing the `mkdocs.yml` file:

```
mkdocs gh-deploy --force
```

## GitLab Pages

If you're hosting your code on GitLab, deploying to [GitLab Pages][6] can be
done by using the [GitLab CI][7] task runner. At the root of your repository,
create a task definition named `.gitlab-ci.yml` and copy and paste the
following contents:

=== "Material for MkDocs"

    ``` yaml
    image: python:latest
    deploy:
      stage: deploy
      only:
        - master
      script:
        - pip install mkdocs-material
        - mkdocs build --site-dir public
      artifacts:
        paths:
          - public
    ```

=== "Insiders"

    ``` yaml
    image: python:latest
    deploy:
      stage: deploy
      only:
        - master
      script:
        - pip install git+https://${GH_TOKEN}@github.com/squidfunk/mkdocs-material-insiders.git
        - mkdocs build --site-dir public
      artifacts:
        paths:
          - public
    ```

Now, when a new commit is pushed to `master`, the static site is automatically
built and deployed. Commit and push the file to your repository to see the
workflow in action.

Your documentation should shortly appear at `<username>.gitlab.io/<repository>`.

_Remember to set the_ `GH_TOKEN` _environment variable to the value of your
[personal access token][3] when using [Material for MkDocs Insiders][4], which
can be done using [masked custom variables][8]._

  [6]: https://gitlab.com/pages
  [7]: https://docs.gitlab.com/ee/ci/
  [8]: https://docs.gitlab.com/ee/ci/variables/#create-a-custom-variable-in-the-ui
