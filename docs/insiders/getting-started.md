---
template: overrides/main.html
title: Switching to Insiders
---

# Switching to Insiders

Material for MkDocs Insiders is a fully compatible drop-in replacement for 
Material for MkDocs, and can be installed similar to the public version using
[`pip`][1], [`docker`][2] or [`git`][3]. When you sponsor @squidfunk, your
account is added to the list of collaborators of the private Insiders
repository.

  [1]: #with-pip-recommended
  [2]: #with-docker
  [3]: #with-git

## Requirements

In order to access the Insiders repository programmatically (from the command
line or GitHub Actions workflows), you need to create a [personal access 
token][4]:

1. Go to https://github.com/settings/tokens
2. Click on [Generate a new token][5]
3. Enter a name and select the [`repo`][6] scope
4. Generate the token and store it in a safe place

  [4]: https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token
  [5]: https://github.com/settings/tokens/new
  [6]: https://docs.github.com/en/developers/apps/scopes-for-oauth-apps#available-scopes

## Installation

### with pip

Material for MkDocs Insiders can be installed with `pip`:

``` sh
pip install git+https://${GH_TOKEN}@github.com/squidfunk/mkdocs-material-insiders.git
```

The `GH_TOKEN` environment variable must be set to the value of the personal
access token you generated in the previous step. Note that the personal access
token must be kept secret at all times, as it allows the owner to access your
private repositories.

### with docker

In case you want to use Material for MkDocs Insiders from within Docker, some additional steps are necessary. While we cannot provide a hosted Docker image
for Insiders[^1], [GitHub Container Registry][7] allows for simple and
comfortable self-hosting:

1. [Fork the Insiders repository][8]
2. Enable [GitHub Actions][9] on your fork[^2]
3. Create a new personal access token[^3]
    1. Go to https://github.com/settings/tokens
    2. Click on [Generate a new token][5]
    3. Enter a name and select the [`write:packages`][10] scope
    4. Generate the token and store it in a safe place
4. Add a [GitHub Actions secret][11] on your fork
    1. Set the name to `GHCR_TOKEN`
    2. Set the value to the personal access token created in the previous step
5. [Create a new release][12] to build and publish the Docker image
6. Install [Pull App][13] on your fork to stay in-sync with upstream

The [`publish`][14] workflow[^4] is automatically run when a new tag (release)
is created. When a new Insiders version is released on the upstream repository,
the [Pull App][13] will create a pull request with the changes and pull in the
new tag, which is picked up by the [`publish`][14] workflow that builds and
publishes the Docker image automatically to your private registry.

Now, you should be able to pull the Docker image from your private registry:

```
docker login -u ${GH_USERNAME} -p ${GHCR_TOKEN} ghcr.io
docker pull ghcr.io/${GH_USERNAME}/mkdocs-material-insiders
```

  [^1]:
    Earlier, Insiders provided a dedicated Docker image which was available to
    all sponsors. On March 21, 2021, the image was deprecated for the reasons
    outlined and discussed in #2442. It will be removed on June 1, 2021.

  [^2]:
    When forking a repository, GitHub will disables all workflows. While this
    is a reasonable default setting, you need to enable GitHub Actions to be
    able to automatically build and publish a Docker image on
    [GitHub Container Registry][7].

  [^3]:
    While you could just add the `write:packages` scope to the personal access
    token created to access the Insiders repository, it's safer to create a
    dedicated token which you'll only use for publishing the Docker image.

  [^4]:
    The Insiders repository contains three GitHub Actions workflows:

    - `build.yml` – Build and lint the project (disabled on forks)
    - `documentation.yml` – Build and deploy the documentation (disabled on forks)
    - `publish.yml` – Build and publish the Docker image

### with git

Of course, you can use Material for MkDocs Insiders directly from `git`:

```
git clone git@github.com:squidfunk/mkdocs-material-insiders.git mkdocs-material
```

The theme will reside in the folder `mkdocs-material/material`. When cloning
from `git`, you must install all required dependencies yourself:

```
pip install -r mkdocs-material/requirements.txt
```

  [7]: https://docs.github.com/en/packages/guides/about-github-container-registry
  [8]: https://github.com/squidfunk/mkdocs-material-insiders/fork
  [9]: https://docs.github.com/en/github/administering-a-repository/disabling-or-limiting-github-actions-for-a-repository
  [10]: https://docs.github.com/en/developers/apps/scopes-for-oauth-apps#available-scopes
  [11]: https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository
  [12]: https://docs.github.com/en/github/administering-a-repository/managing-releases-in-a-repository#creating-a-release
  [13]: https://github.com/apps/pull
  [14]: https://github.com/squidfunk/mkdocs-material-insiders/blob/master/.github/workflows/publish.yml
