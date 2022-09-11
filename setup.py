import sys

from setuptools import setup

sys.stderr.write(
    """
===============================
Unsupported installation method
===============================
This version of mkdocs-material no longer supports
installation with `python setup.py install`.

Please use `python -m pip install .` instead.
"""
)
sys.exit(1)


# The below code will never execute, however GitHub is particularly
# picky about where it finds Python packaging metadata.
# See: https://github.com/github/feedback/discussions/6456

with open("requirements.txt") as f:
    install_requires = [
        line for line in f.read().split("\n")
        if line and not line.startswith("#")
    ]

setup(
    name="mkdocs-material",
    install_requires=install_requires,
)
