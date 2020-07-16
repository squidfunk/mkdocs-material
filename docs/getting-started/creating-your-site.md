---
template: overrides/main.html
---

# Creating your site

After you've [installed][1] Material for MkDocs, you can bootstrap your project 
documentation using the `mkdocs` executable. Go to the directory where you want
your project to be located and enter:

``` sh
mkdocs new .
```

If you're running Material for MkDocs from within Docker, use:

=== "Unix"

    ```
    docker run --rm -it -v ${PWD}:/docs squidfunk/mkdocs-material new .
    ```

=== "Windows"

    ```
    docker run --rm -it -v "%cd%":/docs squidfunk/mkdocs-material new .
    ```

This will create the following structure:

```
├─ docs/
│  └─ index.md
└─ mkdocs.yml
```

  [1]: ../getting-started.md

## Configuration

### Minimal configuration

Depending on your [installation method][2], you can now add the following lines
to `mkdocs.yml` in your project root. If you installed Material for MkDocs using
`pip` or `docker`, add:

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

### Advanced configuration

Material for MkDocs comes with a lot of configuration options. The _guides_
section explains in great detail how to configure and customize colors, fonts,
icons and much more:

* [Changing colors][3]
* [Changing the fonts][4]
* [Changing the language][5]
* [Navigation structure][6]
* [Syntax highlighting][7]
* [Adding a landing page][8]
* [Adding an announcement bar][9]
* [Adding icons and emojis][10]
* [Adding footer links][11]
* [Adding site analytics][12]
* [Adding a comment system][13]

  [2]: ../getting-started.md#installation
  [3]: ../guides/changing-colors.md
  [4]: ../guides/changing-the-fonts.md
  [5]: ../guides/changing-the-language.md
  [6]: ../guides/navigation-structure.md
  [7]: ../guides/syntax-highlighting.md
  [8]: ../guides/adding-a-landing-page.md
  [9]: ../guides/adding-an-announcement-bar.md
  [10]: ../guides/adding-icons-and-emojis.md
  [11]: ../guides/adding-footer-links.md
  [12]: ../guides/adding-site-analytics.md
  [13]: ../guides/adding-a-comment-system.md

## Previewing as you write

MkDocs includes a live preview server, so you can preview your changes as you
write your documentation. The server will automatically rebuild the site upon
saving. Start it with:

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

Point your browser to [localhost:8000][14] and you should see:

[![Creating your site][15]][14]

  [14]: http://localhost:8000
  [15]: ../assets/guides/creating-your-site.png

## Building your site

When you're finished editing, you can build a static site from your Markdown
files with:

```
mkdocs build
```

The contents of this directory make up your project documentation. There's no
need for operating a database or server, as it is completely self-contained.
The site can be hosted on [GitHub Pages][16], [GitLab Pages][17], a CDN of your
choice or your private web space.

  [16]: publishing-your-site.md#github-pages
  [17]: publishing-your-site.md#gitlab-pages
