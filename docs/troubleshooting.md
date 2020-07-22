---
template: overrides/main.html
---

# Troubleshooting

## Inadequate permissions

> Operating systems: 
> :fontawesome-brands-apple:

!!! error "Error: Permission denied"

    ``` sh
    pip install mkdocs-material
    # => Could not install packages due to an EnvironmentError: [Errno 13] Permission denied: '...'  
    # => Consider using the --user option or check the permissions.
    ```

When you're running the pre-installed version of Python on macOS, `pip` tries
to install packages in a folder for which your user might not have the adequate
permissions. There are three possible solutions for this:

1. __Installing in a virtual environment__: Virtual environments provide an easy
   way of encapsulation. 

2. __Installing in user space__: Provide the `--user` flag to the install
   command and `pip` will install the package in a user-site location. Note
   that while this is not a global installation, it's still not

3. __Switching to a homebrewed Python__: Upgrade your Python installation to a
   self-contained solution by installing Python with Homebrew. This should
   eliminate a lot of problems you could be having with `pip`.

### Virtual environments

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
inside the folder you just created.

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
 
## Theme not recognized

> Operating systems: 
> :fontawesome-brands-apple: 
> :fontawesome-brands-windows: 
> :fontawesome-brands-linux:

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
