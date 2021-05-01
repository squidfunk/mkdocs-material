---
template: overrides/main.html
---

# Troubleshooting

## Theme not recognized

Operating systems:
:fontawesome-brands-apple:
:fontawesome-brands-windows:
:fontawesome-brands-linux:

!!! error "Error: Unrecognized theme"

    ``` sh
    mkdocs serve
    # => INFO    -  Building documentation...
    # => ERROR   -  Config value: 'theme'. Error: Unrecognised theme 'material'.
    # => ...
    # => ConfigurationError: Aborted with 1 Configuration Errors!
    ```

If you run into this error, the most common reason is that you installed MkDocs
through some package manager (e.g. `brew` or `apt-get`) and Material for MkDocs
through `pip`, so both packages end up in different locations. MkDocs only
checks its install location for themes.

## Inadequate permissions

Operating systems: :fontawesome-brands-apple:

!!! error "Error: Permission denied"

    ``` sh
    pip install mkdocs-material
    # => Could not install packages due to an EnvironmentError: [Errno 13] Permission denied: '...'
    # => Consider using the --user option or check the permissions.
    ```

When you're running the pre-installed version of Python on macOS, `pip` tries
to install packages in a folder for which your user might not have the adequate
permissions. There are three possible solutions for this, the recommended one
of which is to use virtual environments:

=== "Virtual environments"

    If you're installing Material for MkDocs with `pip`, the easiest way to make
    sure that you end up with the correct versions and without any
    incompatibility problems between packages it to use a [virtual
    environment][1]. First, ensure that you have a Python version of 3 or
    higher installed:

    ```
    python --version
    ```

    If you're good to go, create and activate a virtual environment with:

    ```
    python -m venv venv
    source ./venv/bin/activate
    ```

    Note that the second `venv` is the name of the folder where to create the
    virtual environment – you may choose it as you like. Your terminal should
    now print `(venv)` before the prompt and the `python` executable should be
    located inside the folder you just created.

    Next, [install Material for MkDocs][2] with `pip`, which will download and
    install all packages in the `venv` folder you just created, including MkDocs
    and its dependencies:

    ```
    pip install mkdocs-material
    ```

    Verify that MkDocs and Material for MkDocs were both installed correctly:

    ```
    mkdocs --version
    mkdocs serve --help
    ```

    MkDocs should list `material` as an option under the `--theme` flag. When
    you're finished working with MkDocs, you can exit the virtual environment
    with:

    ```
    deactivate
    ```

=== "User space"

    Provide the `--user` flag to the install command and `pip` will install the
    package in a user-site location. While this is not a global installation,
    it's still not isolated and may lead to problems when you use different
    versions of Material for MkDocs in other projects:

    ```
    pip install --user mkdocs-material
    ```

=== "Upgrade Python"

    Upgrade your Python installation by installing Python with [Homebrew][3].
    This should eliminate a lot of problems you will run into with `pip`. Yet,
    it's still not an isolated installation which may also lead to the same
    problems as installing in user space:

    ```
    brew upgrade python
    ```

  [1]: https://docs.python.org/3/tutorial/venv.html
  [2]: getting-started.md#with-pip-recommended
  [3]: https://brew.sh/
