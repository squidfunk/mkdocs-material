# How to upgrade

When upgrading Insiders, you should always check the version of Material for
MkDocs which makes up the first part of the version qualifier, e.g., Insiders
`4.x.x` is currently based on `9.x.x`:

```
9.x.x-insiders-4.x.x
```

If the major version increased, it's a good idea to consult the [upgrade
guide] and go through the steps to ensure your configuration is up to date and
all necessary changes have been made. 

  [upgrade guide]: ../upgrade.md
  [list of tags]: https://github.com/squidfunk/mkdocs-material-insiders/tags

Depending on how you installed and what you want to upgrade to you
need to run different commands:

=== "pip upgrade to release"

    If you installed Insiders via `pip` and you want to upgrade to a
    specific release, pick the tag from the [list of tags] and replace 
    the tag at the end of the URL of the command given below:

    ```
    pip install --upgrade git+https://${GH_TOKEN}@github.com/squidfunk/mkdocs-material-insiders.git@9.4.2-insiders-4.42.0
    ```

=== "pip upgrade to latest development"

    If you installed Insiders via `pip` and want to upgrade to the
    latest development version, run:

    ```
    pip install --upgrade git+https://${GH_TOKEN}@github.com/squidfunk/mkdocs-material-insiders.git
    ```

=== "git upgrade"

    If you installed Insiders via `git`, you will first need to check
    out the version you want to install into your workspace. After
    this is done, you can run `pip` to install that version.

    First, make sure that your local clone is up-to-date with the
    upstream repository by running `git pull`.

    You can look up the tags using `git tag --sort -refname` or you
    can consult the [list of tags]. Then, checkout the tag you want to
    use by replacing the one given in the command below (twice)and running 
    it from your workspace[^detached]:
      
      [^detached]:
        The `--detach` argument serves to tell `git` that you are ok to
        have your workspace in the [detached head] state, which is
        perfectly fine to have here.
        
      [detached head]: https://www.git-tower.com/learn/git/faq/detached-head-when-checkout-commit/

    ``` 
    cd mkdocs-material 
    git checkout --detach tags/9.4.2-insiders-4.42.0 
    ```

    Now, change back to the parent directory in which your Git
    repository lives and run `pip`:

    ```
    cd .. 
    pip install -e mkdocs-material
    ```


