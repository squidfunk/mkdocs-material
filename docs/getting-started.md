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
  [2]: #with-pip-recommended
  [3]: #with-docker
  [4]: troubleshooting.md

## Installation

### with pip <small>recommended</small> { data-toc-label="with pip" }

Material for MkDocs can be installed with `pip`:

```
pip install mkdocs-material
```

This will automatically install compatible versions of all dependencies:
[MkDocs][1], [Markdown][5], [Pygments][6] and [Python Markdown Extensions][7].
Material for MkDocs always strives to support the latest versions, so there's
no need to install those packages separately.

  [5]: https://python-markdown.github.io/
  [6]: https://pygments.org/
  [7]: https://facelessuser.github.io/pymdown-extensions/

### with docker

The official [Docker image][8] is a great way to get up and running in a few
minutes, as it comes with all dependencies pre-installed. Pull the image for the 
`latest` version with:

```
docker pull squidfunk/mkdocs-material
```

The `mkdocs` executable is provided as an entry point and `serve` is the 
default command. If you're not familiar with Docker don't worry, we have you
covered in the following sections.

The following plugins are bundled with the Docker image:

- [mkdocs-minify-plugin][9]
- [mkdocs-redirects][10]

  [8]: https://hub.docker.com/r/squidfunk/mkdocs-material/
  [9]: https://github.com/byrnereese/mkdocs-minify-plugin
  [10]: https://github.com/datarobot/mkdocs-redirects

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

Material for MkDocs can be directly used from [GitHub][11] by cloning the
repository into a subfolder of your project root which might be useful if you
want to use the very latest version:

```
git clone https://github.com/squidfunk/mkdocs-material.git
```

The theme will reside in the folder `mkdocs-material/material`. When cloning
from `git`, you must install all required dependencies yourself:

```
pip install -r mkdocs-material/requirements.txt
```

  [11]: https://github.com/squidfunk/mkdocs-material
