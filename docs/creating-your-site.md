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

=== "Unix, Powershell"

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

Simply add the following lines to `mkdocs.yml` to enable the theme. Note that
since there are several [installation methods][2], configuration might be
slightly different:

=== "pip, docker"

    ``` yaml
    theme:
      name: material
    ```

=== "git"

    ``` yaml
    theme:
      name: null
      custom_dir: mkdocs-material/material

      # 404 page
      static_templates:
        - 404.html

      # Necessary for search to work properly
      include_search_page: false
      search_index_only: true

      # Default values, taken from mkdocs_theme.yml
      language: en
      font:
        text: Roboto
        code: Roboto Mono
      favicon: assets/favicon.png
      icon:
        logo: logo
    ```

_If you cloned Material for MkDocs from GitHub, you must list all of the themes'
defaults, because_ [`mkdocs_theme.yml`][3] _is not loaded automatically as
[described in the official documentation][4]._

  [2]: getting-started.md#installation
  [3]: https://github.com/squidfunk/mkdocs-material/blob/master/src/mkdocs_theme.yml
  [4]: https://www.mkdocs.org/user-guide/custom-themes/#creating-a-custom-theme

### Advanced configuration

Material for MkDocs comes with many configuration options. The _setup_ section
explains in great detail how to configure and customize colors, fonts, icons
and much more:

<div class="mdx-columns" markdown="1">

- [Changing the colors][5]
- [Changing the fonts][6]
- [Changing the language][7]
- [Changing the logo and icons][8]
- [Setting up navigation][9]
- [Setting up site search][10]
- [Setting up site analytics][11]
- [Setting up tags][12]
- [Setting up versioning][13]
- [Setting up the header][14]
- [Setting up the footer][15]
- [Adding a git repository][16]
- [Adding a comment system][17]

</div>

  [5]: setup/changing-the-colors.md
  [6]: setup/changing-the-fonts.md
  [7]: setup/changing-the-language.md
  [8]: setup/changing-the-logo-and-icons.md
  [9]: setup/setting-up-navigation.md
  [10]: setup/setting-up-site-search.md
  [11]: setup/setting-up-site-analytics.md
  [12]: setup/setting-up-tags.md
  [13]: setup/setting-up-versioning.md
  [14]: setup/setting-up-the-header.md
  [15]: setup/setting-up-the-footer.md
  [16]: setup/adding-a-git-repository.md
  [17]: setup/adding-a-comment-system.md

## Previewing as you write

MkDocs includes a live preview server, so you can preview your changes as you
write your documentation. The server will automatically rebuild the site upon
saving. Start it with:

```
mkdocs serve
```

If you're running Material for MkDocs from within Docker, use:

=== "Unix, Powershell"

    ```
    docker run --rm -it -p 8000:8000 -v ${PWD}:/docs squidfunk/mkdocs-material
    ```

=== "Windows"

    ```
    docker run --rm -it -p 8000:8000 -v "%cd%":/docs squidfunk/mkdocs-material
    ```

Point your browser to [localhost:8000][18] and you should see:

[![Creating your site][19]][19]

  [18]: http://localhost:8000
  [19]: assets/screenshots/creating-your-site.png

## Building your site

When you're finished editing, you can build a static site from your Markdown
files with:

```
mkdocs build
```

The contents of this directory make up your project documentation. There's no
need for operating a database or server, as it is completely self-contained.
The site can be hosted on [GitHub Pages][20], [GitLab Pages][21], a CDN of your
choice or your private web space.

  [20]: publishing-your-site.md#github-pages
  [21]: publishing-your-site.md#gitlab-pages
