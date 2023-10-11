# Creating a reproduction

A reproduction is a simplified version of a bug that demonstrates the specific
scenario in which the bug occurred. It includes all necessary minimal settings
and instructions and should be as simple as possible while still demonstrating
the issue.

## Guide

### Environment <small>optional</small> { #environment }

We recommend using a [virtual environment], which is an isolated Python runtime.
If you are in a virtual environment, any packages that you install or upgrade
will be local to the environment. If you run into problems, you can
just delete and recreate the environment. It's trivial to set up:

-   Create a new virtual environment with:

    ```
    python3 -m venv venv
    ```

-   Activate the environment with:

    === ":material-apple: macOS"

        ``` sh
        . venv/bin/activate
        ```

    === ":fontawesome-brands-windows: Windows"

        ``` sh
        . venv/Scripts/activate
        ```

    === ":material-linux: Linux"

        ``` sh
        . venv/bin/activate
        ```


    Your terminal should now print `(venv)` before the prompt, which is how you
    know that you are inside the virtual environment that you just created.

-   Exit the environment with:

    ```
    deactivate
    ```

  [virtual environment]: https://realpython.com/what-is-pip/#using-pip-in-a-python-virtual-environment

### Minimal reproduction

Following the instructions below, you will set up a skeleton project to create
a reproduction. As mentioned above, we recommend using a [virtual environment],
so create a new folder in your working directory and a new virtual environment
inside it. Next:

1.  As mentioned in our [bug reporting guide], ensure that you're running the
    latest version of Material for MkDocs, which might already include a fix for
    the bug:

    ```
    pip install --upgrade --force-reinstall mkdocs-material
    ```

2.  Bootstrap a new documentation project using the `mkdocs` executable,
    which you use as a basis for the reproduction. It's essential to create a
    new, empty project for this:

    ```
    mkdocs new .
    ```

    Start by adding the [minimal configuration] in `mkdocs.yml`:

    ``` yaml
    theme:
      name: material
    ```

3.  Now, only add the necessary settings to `mkdocs.yml` to keep the
    reproduction minimal. If you are creating a reproduction for a rendering
    bug, create only the necessary amount of Markdown documents. __Repeat this
    step until the bug you want to report can be observed.__

4.  As a last step, before packing everything into a `.zip` file, double-check
    all settings and documents if they are essential to the reproduction, which
    means that the bug does not occur when they are omitted. Remove all
    non-essential lines and files.

  [bug reporting guide]: ../contributing/reporting-a-bug.md#upgrade-to-latest-version
  [minimal configuration]: ../creating-your-site.md#minimal-configuration

### Creating a `.zip` file

Material for MkDocs 9.0.0 includes a new plugin solely intended to create
reproductions for bug reports. When the built-in info plugin is enabled, MkDocs
will add all relevant files to a `.zip`, print a summary to the terminal and
exit. Add the following lines to `mkdocs.yml`:

``` yaml
plugins:
  - info
```

Now, when running `mkdocs build`, a file called `example.zip` is automatically
created, containing the minimal reproduction you can directly attach to your bug
report.

```
INFO     -  Started archive creation for bug report
INFO     -  Archive successfully created:

  example/.dependencies.json 859.0 B
  example/.versions.log 83.0 B
  example/docs/index.md 282.0 B
  example/mkdocs.yml 56.0 B

  example.zip 1.8 kB
```
