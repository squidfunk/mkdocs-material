---
template: overrides/main.html
title: Getting started
---

# Getting started

Material for MkDocs is a theme for [MkDocs][1], a static site generator geared
towards (technical) project documentation. If you're familiar with Python, you
can install Material for MkDocs with [`pip`][2], the Python package manager.
If not, we recommended using [`docker`][3].

In case you're running into problems, consult the [troubleshooting][4] section.

  [1]: https://www.mkdocs.org
  [2]: #with-pip
  [3]: #with-docker
  [4]: troubleshooting.md

## Installation

### with pip

Material for MkDocs can be installed with `pip`:

=== "Material for MkDocs"

    ```
    pip install mkdocs-material
    ```

=== "Insiders"

    ``` sh
    pip install git+https://${GH_TOKEN}@github.com/squidfunk/mkdocs-material-insiders.git
    ```

This will automatically install compatible versions of all dependencies:
[MkDocs][1], [Markdown][5], [Pygments][6] and [Python Markdown Extensions][7].
Material for MkDocs always strives to support the latest versions, so there's
no need to install those packages separately.

_Note that in order to install [Insiders][8], you'll need to [become a
sponsor][9], create a personal access token[^1], and set the_ `GH_TOKEN`
_environment variable to the token's value._

  [^1]:
    In order to use `pip` to install from the private repository over HTTPS, the
    [personal access token][14] requires the [`repo`][15] scope. The creation
    and usage of an access token is only necessary when installing Insiders
    over HTTPS, which is the recommended way when building from within a CI/CD
    workflow, e.g. using [GitHub Pages][16] or [GitLab Pages][17].

  [5]: https://python-markdown.github.io/
  [6]: https://pygments.org/
  [7]: https://facelessuser.github.io/pymdown-extensions/
  [8]: insiders.md
  [9]: insiders.md#how-to-become-a-sponsor

### with docker

The official [Docker image][10] is a great way to get up and running in a few
minutes, as it comes with all dependencies pre-installed. Pull the image for the 
`latest` version with:

=== "Material for MkDocs"

    ```
    docker pull squidfunk/mkdocs-material
    ```

=== "Insiders"

    ```
    docker login -u ${GH_USERNAME} -p ${GH_TOKEN} ghcr.io
    docker pull ghcr.io/squidfunk/mkdocs-material-insiders
    ```

The `mkdocs` executable is provided as an entry point and `serve` is the 
default command. If you're not familiar with Docker don't worry, we have you
covered in the following sections.

The following plugins are bundled with the Docker image:

- [mkdocs-minify-plugin][11]
- [mkdocs-redirects][12]

_Note that in order to install [Insiders][8], you'll need to [become a
sponsor][9], create a personal access token[^2], and set the_ `GH_TOKEN` 
_environment variable to the token's value._

  [^2]:
    If you want to use `docker` to pull the private Docker image from the
    [GitHub Container Registry][18], the [personal access token][14] requires
    the [`read:packages`][15] scope. Note that you need to login before pulling
    the Docker image. As an example, see the [`publish`][19] workflow of the
    Material for MkDocs repository.

  [10]: https://hub.docker.com/r/squidfunk/mkdocs-material/
  [11]: https://github.com/byrnereese/mkdocs-minify-plugin
  [12]: https://github.com/datarobot/mkdocs-redirects

??? question "How to add plugins to the Docker image?"

    Material for MkDocs bundles useful and common plugins while trying not to
    blow up the size of the official image. If the plugin you want to use is
    not included, create a new `Dockerfile` and extend the official Docker image
    with your custom installation routine:

    ``` Dockerfile
    FROM squidfunk/mkdocs-material
    RUN pip install ...
    ```

    Next, you can build the image with the following command:

    ```
    docker build -t squidfunk/mkdocs-material .
    ```

    The new image can be used exactly like the official image.

### with git

Material for MkDocs can be directly used from [GitHub][13] by cloning the
repository into a subfolder of your project root which might be useful if you
want to use the very latest version:

=== "Material for MkDocs"

    ```
    git clone https://github.com/squidfunk/mkdocs-material.git
    ```

=== "Insiders"

    ```
    git clone git@github.com:squidfunk/mkdocs-material-insiders.git mkdocs-material
    ```

The theme will reside in the folder `mkdocs-material/material`. When cloning
from `git`, you must install all required dependencies yourself:

```
pip install -r mkdocs-material/requirements.txt
```

_Note that in order to install [Insiders][8], you'll need to [become a
sponsor][9]._

  [13]: https://github.com/squidfunk/mkdocs-material

  [14]: https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token
  [15]: https://docs.github.com/en/developers/apps/scopes-for-oauth-apps#available-scopes
  [16]: publishing-your-site.md#github-pages
  [17]: publishing-your-site.md#gitlab-pages
  [18]: https://docs.github.com/en/free-pro-team@latest/packages/getting-started-with-github-container-registry/about-github-container-registry
  [19]: https://github.com/squidfunk/mkdocs-material/blob/master/.github/workflows/publish.yml
