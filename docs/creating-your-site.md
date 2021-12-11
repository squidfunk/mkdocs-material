---
template: overrides/main.html
---

# Creating your site

After you've [installed] Material for MkDocs, you can bootstrap your project 
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

  [installed]: getting-started.md

## Configuration

### Minimal configuration

Simply add the following lines to `mkdocs.yml` to enable the theme. Note that
since there are several [installation methods], minimal configuration might be
slightly different:

=== ":fontawesome-brands-python: pip"

    ``` yaml
    theme:
      name: material
    ```

=== ":fontawesome-brands-docker: docker"

    ``` yaml
    theme:
      name: material
    ```

=== ":fontawesome-brands-git-alt: git"

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

    When you clone from GitHub, you must list all of the themes' defaults
    explicitly, because [`mkdocs_theme.yml`][mkdocs_theme.yml] is not
    loaded automatically as described in the [custom theme guide].

  [installation methods]: getting-started.md#installation
  [mkdocs_theme.yml]: https://github.com/squidfunk/mkdocs-material/blob/master/src/mkdocs_theme.yml
  [custom theme guide]: https://www.mkdocs.org/user-guide/custom-themes/#creating-a-custom-theme

### Advanced configuration

Material for MkDocs comes with many configuration options. The setup section
explains in great detail how to configure and customize colors, fonts, icons
and much more:

<div class="mdx-columns" markdown>

- [Changing the colors]
- [Changing the fonts]
- [Changing the language]
- [Changing the logo and icons]
- [Setting up navigation]
- [Setting up site search]
- [Setting up site analytics]
- [Setting up social cards]
- [Setting up tags]
- [Setting up versioning]
- [Setting up the header]
- [Setting up the footer]
- [Adding a git repository]
- [Adding a comment system]

</div>

Furthermore, see the list of supported [Markdown extensions] that are natively
integrated with Material for MkDocs, delivering a low-effort and unprecedented 
technical writing experience.

  [Changing the colors]: setup/changing-the-colors.md
  [Changing the fonts]: setup/changing-the-fonts.md
  [Changing the language]: setup/changing-the-language.md
  [Changing the logo and icons]: setup/changing-the-logo-and-icons.md
  [Setting up navigation]: setup/setting-up-navigation.md
  [Setting up site search]: setup/setting-up-site-search.md
  [Setting up site analytics]: setup/setting-up-site-analytics.md
  [Setting up social cards]: setup/setting-up-social-cards.md
  [Setting up tags]: setup/setting-up-tags.md
  [Setting up versioning]: setup/setting-up-versioning.md
  [Setting up the header]: setup/setting-up-the-header.md
  [Setting up the footer]: setup/setting-up-the-footer.md
  [Adding a git repository]: setup/adding-a-git-repository.md
  [Adding a comment system]: setup/adding-a-comment-system.md
  [Markdown extensions]: setup/extensions/index.md

## Previewing as you write

MkDocs includes a live preview server, so you can preview your changes as you
write your documentation. The server will automatically rebuild the site upon
saving. Start it with:

``` sh
mkdocs serve # (1)!
```

1.  If you have a large documentation project, it might take minutes until
    MkDocs has rebuilt all pages for you to preview. If you're only interested
    in the current page, the [`--dirtyreload`][--dirtyreload] flag will make
    rebuilds much faster:

    ```
    mkdocs serve --dirtyreload
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

Point your browser to [localhost:8000][live preview] and you should see:

[![Creating your site]][Creating your site]

  [--dirtyreload]: https://www.mkdocs.org/about/release-notes/#support-for-dirty-builds-990
  [live preview]: http://localhost:8000
  [Creating your site]: assets/screenshots/creating-your-site.png

## Building your site

When you're finished editing, you can build a static site from your Markdown
files with:

```
mkdocs build
```

The contents of this directory make up your project documentation. There's no
need for operating a database or server, as it is completely self-contained.
The site can be hosted on [GitHub Pages], [GitLab Pages], a CDN of your choice
or your private web space.

  [GitHub Pages]: publishing-your-site.md#github-pages
  [GitLab pages]: publishing-your-site.md#gitlab-pages
