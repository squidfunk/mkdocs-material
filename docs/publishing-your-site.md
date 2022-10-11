---
template: overrides/main.html
---

# Publishing your site

The great thing about hosting project documentation in a `git` repository is
the ability to deploy it automatically when new changes are pushed. MkDocs
makes this ridiculously simple.

## GitHub Pages

If you're already hosting your code on GitHub, [GitHub Pages] is certainly
the most convenient way to publish your project documentation. It's free of
charge and pretty easy to set up.

  [GitHub Pages]: https://pages.github.com/

GitHub offers two options for configuring a GitHub Pages [publishing source]:

1. Publishing from a build artifact with GitHub Actions
2. Publishing from a branch

### Publishing from a build artifact with GitHub Actions

Using [GitHub Actions], you can automate the deployment of your project
documentation. Publishing from a build artifact with GitHub Actions is the
[default GitHub Pages deployment method].

As the GitHub Pages docs on configuring a [publishing source] explain, the
advantage of publishing a build artifact is that the compiled site files do not
need to be committed to the repo.

To deploy your documentation with GitHub Actions, create a YAML file in the
`.github/workflows` directory, e.g. `.github/workflows/ci.yml`, and copy and
paste the following contents:

=== "Material for MkDocs"

    ``` yaml
    name: ci # (1)!
    on:
      push:
        branches:
          - master # (2)!
          - main
    permissions: # (3)!
      contents: read
      id-token: write
      pages: write
    concurrency: # (4)!
      cancel-in-progress: true
      group: "pages"
    jobs:
      build:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - uses: actions/setup-python@v3
            with:
              python-version: "3.x"
          - name: Install dependencies
            run: pip install mkdocs-material # (5)!
          - name: Build site
            run: mkdocs build
          - name: Upload build artifact
            uses: actions/upload-pages-artifact@v1
            with:
              path: "site" # (6)!
      deploy:
        needs: build # (7)!
        environment: # (8)!
          name: github-pages
          url: ${{ steps.deploy-pages.outputs.page_url }}
        runs-on: ubuntu-latest
        steps:
          - name: Deploy site
            id: deploy-pages
            uses: actions/deploy-pages@v1 # (9)!
    ```

    1.  You can change the name to your liking.

    2.  At some point, GitHub renamed `master` to `main`. If your default branch
        is named `master`, you can safely remove `main`, and vice versa.

    3.  Settings under the `permissions` key ensure that the [GITHUB_TOKEN]
        automatically provisioned by GitHub Actions has the necessary permissions
        to publish the site.

    4.  Settings under the [concurrency key] ensure that only one deployment is
        going on at a time.

    5.  This is the place to install further [MkDocs plugins] or Markdown
        extensions with `pip` to be used during the build:

        ``` sh
        pip install \
          mkdocs-material \
          mkdocs-awesome-pages-plugin \
          ...
        ```

    6.  MkDocs will save the built site in the `site` directory. This step will
        upload the `site` directory as a [GitHub Actions build artifact].

    7.  The [needs key] ensures that the site will only deploy if the build
        was successful.

    8.  Settings under the `environment` key create a [deployment environment]
        with the GitHub Pages default name `github-pages`. GitHub recommends
        setting an environment protection rule so that only the default or
        main branch can trigger deployments.

    9.  [actions/deploy-pages] will deploy the site to GitHub Pages.

=== "Insiders"

    ``` yaml
    name: ci
    on:
      push:
        branches:
          - master
          - main
    permissions:
      contents: read
      id-token: write
      pages: write
    concurrency:
      cancel-in-progress: true
      group: "pages"
    env:
      GH_TOKEN: ${{ secrets.GH_TOKEN }} # (1)!
    jobs:
      build:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - uses: actions/setup-python@v3
            with:
              python-version: "3.x"
          - name: Install dependencies
          - run: pip install git+https://${GH_TOKEN}@github.com/squidfunk/mkdocs-material-insiders.git
          - name: Build site
            run: mkdocs build
          - name: Upload build artifact
            uses: actions/upload-pages-artifact@v1
            with:
              path: "site"
      deploy:
        needs: build
        environment:
          name: github-pages
          url: ${{ steps.deploy-pages.outputs.page_url }}
        runs-on: ubuntu-latest
        steps:
          - name: Deploy site
            id: deploy-pages
            uses: actions/deploy-pages@v1
    ```

    1.  Remember to set the `GH_TOKEN` environment variable to the value of your
        [personal access token] when deploying [Insiders], which can be done
        using [GitHub secrets].

Now, when a new commit is pushed to either the `master` or `main` branches,
the static site is automatically built and deployed. Push your changes to see
the workflow in action.

If the GitHub Page doesn't show up after a few minutes, go to the settings of
your repository and ensure that the [publishing source] for your GitHub
Page is set to "GitHub Actions."

Your documentation should shortly appear at `<username>.github.io/<repository>`.

### Publishing from a branch with GitHub Actions

To deploy your documentation by publishing from a branch with GitHub Actions,
create a YAML file in the `.github/workflows` directory, e.g.
`.github/workflows/ci.yml`, and copy and paste the following contents:

=== "Material for MkDocs"

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
        steps:
          - uses: actions/checkout@v3
          - uses: actions/setup-python@v3
            with:
              python-version: 3.x
          - run: pip install mkdocs-material
          - run: mkdocs gh-deploy --force # (1)!
    ```

    1.  The [`mkdocs gh-deploy --force` command] will build the site, commit the
        site files to the `gh-pages` branch, and force-push the branch.

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
          - uses: actions/checkout@v3
          - uses: actions/setup-python@v3
            with:
              python-version: 3.x
          - run: pip install git+https://${GH_TOKEN}@github.com/squidfunk/mkdocs-material-insiders.git
          - run: mkdocs gh-deploy --force
    env:
      GH_TOKEN: ${{ secrets.GH_TOKEN }} # (1)!
    ```

    1.  Remember to set the `GH_TOKEN` environment variable to the value of your
        [personal access token] when deploying [Insiders], which can be done
        using [GitHub secrets].

If the GitHub Page doesn't show up after a few minutes, go to the settings of
your repository and ensure that the [publishing source] for your GitHub
Page is set to the `gh-pages` branch.

  [GitHub Actions]: https://github.com/features/actions
  [MkDocs plugins]: https://github.com/mkdocs/mkdocs/wiki/MkDocs-Plugins
  [personal access token]: https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token
  [Insiders]: insiders/index.md
  [GitHub secrets]: https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets
  [publishing source]: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
  [`mkdocs gh-deploy --force` command]: https://www.mkdocs.org/user-guide/deploying-your-docs/
  [default GitHub Pages deployment method]: https://github.blog/2022-08-10-github-pages-now-uses-actions-by-default/
  [GITHUB_TOKEN]: https://docs.github.com/en/actions/security-guides/automatic-token-authentication
  [concurrency key]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#concurrency
  [GitHub Actions build artifact]: https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts
  [needs key]: https://docs.github.com/en/actions/learn-github-actions/contexts#needs-context
  [deployment environment]: https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment
  [actions/deploy-pages]: https://github.com/actions/deploy-pages

### Publishing from a branch manually

If you prefer to deploy your project documentation manually, you can just invoke
the following command from the directory containing the `mkdocs.yml` file:

```
mkdocs gh-deploy --force
```

## GitLab Pages

If you're hosting your code on GitLab, deploying to [GitLab Pages] can be done
by using the [GitLab CI] task runner. At the root of your repository, create a
task definition named `.gitlab-ci.yml` and copy and paste the following
contents:

=== "Material for MkDocs"

    ``` yaml
    image: python:latest
    pages:
      stage: deploy
      only:
        - master # (1)!
        - main
      script:
        - pip install mkdocs-material
        - mkdocs build --site-dir public
      artifacts:
        paths:
          - public
    ```

    1.  At some point, GitLab renamed `master` to `main`. If your default branch
        is named `master`, you can safely remove `main`, vice versa.

=== "Insiders"

    ``` yaml
    image: python:latest
    pages:
      stage: deploy
      only:
        - master
        - main
      script: # (1)!
        - pip install git+https://${GH_TOKEN}@github.com/squidfunk/mkdocs-material-insiders.git
        - mkdocs build --site-dir public
      artifacts:
        paths:
          - public
    ```

    1.  Remember to set the `GH_TOKEN` environment variable to the value of your
        [personal access token] when deploying [Insiders], which can be done
        using [masked custom variables].

Now, when a new commit is pushed to `master`, the static site is automatically
built and deployed. Commit and push the file to your repository to see the
workflow in action.

Your documentation should shortly appear at `<username>.gitlab.io/<repository>`.

  [GitLab Pages]: https://gitlab.com/pages
  [GitLab CI]: https://docs.gitlab.com/ee/ci/
  [masked custom variables]: https://docs.gitlab.com/ee/ci/variables/#create-a-custom-variable-in-the-ui
