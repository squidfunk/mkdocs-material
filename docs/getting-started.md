---
template: overrides/main.html
title: Getting started
---

# Getting started

Material for MkDocs is a theme for [MkDocs], a static site generator geared
towards (technical) project documentation. If you're familiar with Python, you
can install Material for MkDocs with [`pip`][pip], the Python package manager.
If not, we recommended using [`docker`][docker].

  [MkDocs]: https://www.mkdocs.org
  [pip]: #with-pip
  [docker]: #with-docker

## Installation

### with pip <small>recommended</small> { #with-pip data-toc-label="with pip" }

Material for MkDocs can be installed with `pip`:

=== "Latest"

    ``` sh
    pip install mkdocs-material
    ```

=== "8.x"

    ``` sh
    pip install mkdocs-material=="8.*" #(1)!
    ```

    1.  Material for MkDocs uses [semantic versioning][^1], which is why it's a
        good idea to limit upgrades to the current major version.

        This will make sure that you don't accidentally [upgrade to the next
        major version], which may include breaking changes that silently break
        your site. Additionally, you can use `pip freeze` to create a lockfile,
        so builds are reproducible at all times:

        ```
        pip freeze > requirements.txt
        ```

        Now, the lockfile can be used for installation:

        ```
        pip install -r requirements.txt
        ```

  [^1]:
    Note that improvements of existing features are sometimes released as
    patch releases, like for example improved rendering of content tabs, as
    they're not considered to be new features.

This will automatically install compatible versions of all dependencies:
[MkDocs], [Markdown], [Pygments] and [Python Markdown Extensions]. Material for
MkDocs always strives to support the latest versions, so there's no need to
install those packages separately.

  [semantic versioning]: https://semver.org/
  [upgrade to the next major version]: upgrade.md
  [Markdown]: https://python-markdown.github.io/
  [Pygments]: https://pygments.org/
  [Python Markdown Extensions]: https://facelessuser.github.io/pymdown-extensions/

### with docker

The official [Docker image] is a great way to get up and running in a few
minutes, as it comes with all dependencies pre-installed. Pull the image for the 
`latest` version with:

=== "Latest"

    ```
    docker pull squidfunk/mkdocs-material
    ```

=== "8.x"

    ```
    docker pull squidfunk/mkdocs-material:8
    ```

The `mkdocs` executable is provided as an entry point and `serve` is the 
default command. If you're not familiar with Docker don't worry, we have you
covered in the following sections.

The following plugins are bundled with the Docker image:

- [mkdocs-minify-plugin]
- [mkdocs-redirects]

  [Docker image]: https://hub.docker.com/r/squidfunk/mkdocs-material/
  [mkdocs-minify-plugin]: https://github.com/byrnereese/mkdocs-minify-plugin
  [mkdocs-redirects]: https://github.com/datarobot/mkdocs-redirects

??? question "How to add plugins to the Docker image?"

    Material for MkDocs only bundles selected plugins in order to keep the size
    of the official image small. If the plugin you want to use is not included, 
    create a new `Dockerfile` and extend the official Docker image:

    ``` Dockerfile
    FROM squidfunk/mkdocs-material
    RUN pip install ...
    ```

    Next, you can build the image with the following command:

    ```
    docker build -t squidfunk/mkdocs-material .
    ```

    The new image can be used exactly like the official image.

!!! info ":material-apple: Apple Silicon (M1) and :fontawesome-brands-raspberry-pi: Raspberry Pi"

    The official Docker image is only available for `linux/amd64`. We recommend
    the [third-party image] by @afritzler if you want to run Material for MkDocs
    via Docker on `arm64` or `armv7`, as it is automatically built on every
    release:

    ```
    docker pull ghcr.io/afritzler/mkdocs-material
    ```

  [third-party image]: https://github.com/afritzler/mkdocs-material

### with git

Material for MkDocs can be directly used from [GitHub] by cloning the
repository into a subfolder of your project root which might be useful if you
want to use the very latest version:

```
git clone https://github.com/squidfunk/mkdocs-material.git
```

The theme will reside in the folder `mkdocs-material/material`. When cloning
from `git`, you must install all required dependencies yourself:

```
pip install -e mkdocs-material
```

  [GitHub]: https://github.com/squidfunk/mkdocs-material
