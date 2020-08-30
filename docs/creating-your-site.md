---
template: overrides/main.html
---

# Creating your site

After you've [installed][1] Material for MkDocs, you can bootstrap your project 
documentation using the `mkdocs` executable. Go to the directory where you want
your project to be located and enter:

```
mkdocs new .
```

Alternatively, if you're running Material for MkDocs from within Docker, use:

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
.
├─ docs/
│  └─ index.md
└─ mkdocs.yml
```

  [1]: getting-started.md

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

Material for MkDocs comes with a lot of configuration options. The _setup_
section explains in great detail how to configure and customize colors, fonts,
icons and much more:

* [Changing the colors][3]
* [Changing the fonts][4]
* [Changing the language][5]
* [Changing the logo and icons][6]
* [Setting up navigation][7]
* [Setting up site search][8]
* [Setting up site analytics][9]
* [Setting up the header][10]
* [Adding social links][11]
* [Adding a git repository][12]
* [Adding a comment system][13]
<!-- * [Adding a landing page][14] -->

  [2]: getting-started.md#installation
  [3]: setup/changing-the-colors.md
  [4]: setup/changing-the-fonts.md
  [5]: setup/changing-the-language.md
  [6]: setup/changing-the-logo-and-icons.md
  [7]: setup/setting-up-navigation.md
  [8]: setup/setting-up-site-search.md
  [9]: setup/setting-up-site-analytics.md
  [10]: setup/setting-up-the-header.md
  [11]: setup/adding-social-links.md
  [12]: setup/adding-a-git-repository.md
  [13]: setup/adding-a-comment-system.md
  <!--[14]: setup/adding-a-landing-page.md-->

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

Point your browser to [localhost:8000][15] and you should see:

[![Creating your site][16]][15]

  [15]: http://localhost:8000
  [16]: assets/creating-your-site.png

## Building your site

When you're finished editing, you can build a static site from your Markdown
files with:

```
mkdocs build
```

The contents of this directory make up your project documentation. There's no
need for operating a database or server, as it is completely self-contained.
The site can be hosted on [GitHub Pages][17], [GitLab Pages][18], a CDN of your
choice or your private web space.

  [17]: publishing-your-site.md#github-pages
  [18]: publishing-your-site.md#gitlab-pages
