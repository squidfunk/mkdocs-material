---
template: overrides/main.html
---

# Getting started

Material for MkDocs is a theme for [MkDocs][1], a static site generator geared
towards technical documentation. If you're familar with Python, you can install
Material for MkDocs with [`pip`][2], the Python package manager. If not, we
recommended using [`docker`][3].

  [1]: https://www.mkdocs.org
  [2]: #with-pip
  [3]: #with-docker

## Installation

### with pip

Material for MkDocs can be installed with `pip`:

``` sh
pip install mkdocs-material
```

This will automatically install compatible versions of all dependencies:
[MkDocs][1], [Markdown][4], [Pygments][5] and [PyMdown Extensions][6]. Material
for MkDocs always strives to support the latest versions, so there's no need to
install those packages separately.

If you're running into problems, read the section on [virtual environments][7].

  [4]: https://python-markdown.github.io/
  [5]: https://pygments.org/
  [6]: https://facelessuser.github.io/pymdown-extensions/
  [7]: #virtual-environments

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

## Virtual environments

If you're installing Material for MkDocs with `pip`, the easiest way to make
sure that you end up with the correct versions and without any incompatibility
problems between packages it to use a [virtual environment][9]. First, ensure
that you have a Python version of 3 or higher installed:

``` sh
python --version
```

If you're good to go, create and activate a virtual environment with:

```
python -m venv venv
source ./venv/bin/activate
```

Note that the second `venv` is the name of the folder where to create the
virtual environment – you may choose it as you like. Your terminal should now
print `(venv)` before the prompt and the `python` executable should be located
inside the folder you just created:

``` sh
which python
```

Next, install Material for MkDocs with `pip`, which will download and install
all packages in the `venv` folder you just created, including MkDocs and its 
dependencies:

``` sh
pip install mkdocs-material
```

Verify that MkDocs and Material for MkDocs were both installed correctly:

``` sh
mkdocs --version
mkdocs serve --help
```

MkDocs should list `material` as an option under the `--theme` flag. When you're 
finished working with MkDocs, you can exit the virtual environment with:

```
deactivate
```

  [9]: https://docs.python.org/3/tutorial/venv.html
