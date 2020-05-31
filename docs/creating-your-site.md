---
template: overrides/main.html
---

# Creating your site

After you've installed Material for MkDocs, bootstrap your site using the
`mkdocs` executable. Change to the directory where you want your documentation
to be located and enter:

``` sh
mkdocs new .
```

This will create the following structure along your existing files:

```
├─ docs/
│  └─ index.md
└─ mkdocs.yml
```

## Configuration

Depending on your [installation method][1], you can now add the following lines
to `mkdocs.yml` in your project root. If you installed Material for MkDocs with
`pip` or pulled the Docker image, add:

``` yaml
theme:
  name: material
```

If you cloned Material for MkDocs from GitHub, add:

``` yaml
theme:
  name: null
  custom_dir: mkdocs-material/material
```

!!! todo "Add note about many customization options with links to guides"

## Previewing

MkDocs includes a live preview server, so you can preview your changes as you
write your documentation. Start it with:

```
mkdocs serve
```

If you're running Material for MkDocs from within Docker, use:

=== "Unix"

    ```
    docker run --rm -it -p 8000:8000 -v ${PWD}:/docs squidfunk/mkdocs-material
    ```

=== "Windows"

    ```
    docker run --rm -it -p 8000:8000 -v "%cd%":/docs squidfunk/mkdocs-material
    ```

Point your browser to [localhost:8000][2] and you should see:

[![Creating your site][3]][3]

  [1]: getting-started.md#installation
  [2]: http://localhost:8000
  [3]: assets/screenshots/creating-your-site.png
