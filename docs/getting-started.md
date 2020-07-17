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

``` sh
pip install mkdocs-material
```

This will automatically install compatible versions of all dependencies:
[MkDocs][1], [Markdown][5], [Pygments][6] and [PyMdown Extensions][7]. Material
for MkDocs always strives to support the latest versions, so there's no need to
install those packages separately.

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
default command. If you're not familar with Docker don't worry, we have you
covered in the following sections.

  [8]: https://hub.docker.com/r/squidfunk/mkdocs-material/

### with git

Material for MkDocs can be directly used from [GitHub][9] by cloning the
repository into a subfolder of your project root which might be useful if you
want to use the very latest version:

``` sh
git clone https://github.com/squidfunk/mkdocs-material.git
```

The theme will reside in the folder `mkdocs-material/material`. Note that when
cloning from `git`, you must install all required dependencies yourself:

``` sh
pip install -r mkdocs-material/requirements.txt
```

  [9]: https://github.com/squidfunk/mkdocs-material
