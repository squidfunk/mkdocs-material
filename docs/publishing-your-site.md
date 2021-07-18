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
    name: ci # (1)
    on:
      push:
        branches: # (2)
          - master
          - main
    jobs:
      deploy:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v2
          - uses: actions/setup-python@v2
            with:
              python-version: 3.x
          - run: pip install mkdocs-material # (3)
          - run: mkdocs gh-deploy --force
    ```

    1. You can change the name to your liking.

    2. At some point, GitHub renamed `master` to `main`. If your default branch
       is named `master`, you can safely remove `main`, vice versa.

    3. This is the place to install further [MkDocs plugins][3] or Markdown
       extensions with `pip` to be used during the build:

        ``` sh
        pip install \
          mkdocs-material \
          mkdocs-awesome-pages-plugin \
          ...
        ```

=== "Insiders"

    ``` yaml
    name: ci
    on:
      push:
        branches:
          - master
          - main
    jobs:
      deploy:
        runs-on: ubuntu-latest
        if: github.event.repository.fork == false
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

Now, when a new commit is pushed to either the `master` or `main` branches,
the static site is automatically built and deployed. Push your changes to see
the workflow in action.

Your documentation should shortly appear at `<username>.github.io/<repository>`.

_Remember to set the_ `GH_TOKEN` _environment variable to the value of your
[personal access token][4] when deploying [Insiders][5], which can be done
using [secrets][6]._

  [2]: https://github.com/features/actions
  [3]: https://github.com/mkdocs/mkdocs/wiki/MkDocs-Plugins
  [4]: https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token
  [5]: insiders/index.md
  [6]: https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets

### with MkDocs

If you prefer to deploy your project documentation manually, you can just invoke
the following command from the directory containing the `mkdocs.yml` file:

```
mkdocs gh-deploy --force
```

## GitLab Pages

If you're hosting your code on GitLab, deploying to [GitLab Pages][7] can be
done by using the [GitLab CI][8] task runner. At the root of your repository,
create a task definition named `.gitlab-ci.yml` and copy and paste the
following contents:

=== "Material for MkDocs"

    ``` yaml
    image: python:latest
    pages:
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
    pages:
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
[personal access token][4] when deploying [Insiders][5], which can be done
using [masked custom variables][9]._

  [7]: https://gitlab.com/pages
  [8]: https://docs.gitlab.com/ee/ci/
  [9]: https://docs.gitlab.com/ee/ci/variables/#create-a-custom-variable-in-the-ui
