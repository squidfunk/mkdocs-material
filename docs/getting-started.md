---
template: overrides/main.html
---

# Getting started

Material for MkDocs is a theme for [MkDocs][1], a static site generator geared
towards (technical) project documentation. If you're familar with Python, you
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

=== "Community edition"

    ``` sh
    pip install mkdocs-material
    ```

=== "Sponsor edition"

    ``` sh
    pip install git+https://$GH_TOKEN@github.com/squidfunk/mkdocs-material-next.git
    ```

This will automatically install compatible versions of all dependencies:
[MkDocs][1], [Markdown][5], [Pygments][6] and [Python Markdown Extensions][7].
Material for MkDocs always strives to support the latest versions, so there's
no need to install those packages separately.

Note that in order to install the [sponsor edition][8], you'll need to [become
a sponsor][9], create a [personal access token][10], and set the `GH_TOKEN`
environment variable to the token's value.

  [5]: https://python-markdown.github.io/
  [6]: https://pygments.org/
  [7]: https://facelessuser.github.io/pymdown-extensions/
  [8]: sponsorship.md
  [9]: sponsorship.md#how-to-become-a-sponsor
  [10]: https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token

### with docker

The official [Docker image][11] is a great way to get up and running in a few
minutes, as it comes with all dependencies pre-installed. Pull the image for the 
`latest` version with:

```
docker pull squidfunk/mkdocs-material
```

The `mkdocs` executable is provided as an entry point and `serve` is the 
default command. If you're not familar with Docker don't worry, we have you
covered in the following sections.

  [11]: https://hub.docker.com/r/squidfunk/mkdocs-material/

### with git

Material for MkDocs can be directly used from [GitHub][12] by cloning the
repository into a subfolder of your project root which might be useful if you
want to use the very latest version:

=== "Community edition"

    ``` sh
    git clone https://github.com/squidfunk/mkdocs-material.git
    ```

=== "Sponsor edition"

    ``` sh
    git clone git@github.com:squidfunk/mkdocs-material-next.git mkdocs-material
    ```

The theme will reside in the folder `mkdocs-material/material`. Note that when
cloning from `git`, you must install all required dependencies yourself:

``` sh
pip install -r mkdocs-material/requirements.txt
```

  [12]: https://github.com/squidfunk/mkdocs-material
