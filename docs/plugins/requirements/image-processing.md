---
icon: material/image-sync-outline
---

# Image processing

Some of the [built-in plugins] depend on external libraries for efficient image
processing, most notably the [social] plugin to generate [social cards], and the
[optimize] plugin for applying [image optimization]. This guide explains how to
install those libraries in different environments.

  [built-in plugins]: ../index.md
  [social]: ../social.md
  [social cards]: ../../setup/setting-up-social-cards.md
  [optimize]: ../optimize.md
  [image optimization]: ../../setup/building-an-optimized-site.md

## Dependencies

The libraries for image processing are entirely optional, and only need to be
installed if you want to use the [social] plugin or the [optimize] plugin. The
libraries are listed under the `imaging` extra:

```
pip install "mkdocs-material[imaging]"
```

This will install compatible versions of the following packages:

- [Pillow]
- [CairoSVG]

  [Pillow]: https://pillow.readthedocs.io/
  [CairoSVG]: https://cairosvg.org/

### Cairo Graphics

[Cairo Graphics] is a graphics library and dependency of [Pillow], which
Material for MkDocs makes use of for generating [social cards] and performing
[image optimization]. See the following section which explains how to install
[Cairo Graphics] and its dependencies on your system:

=== ":material-apple: macOS"

    Make sure [Homebrew] is installed, which is a modern package manager for
    macOS. Next, use the following command to install all necessary
    dependencies:

    ```
    brew install cairo freetype libffi libjpeg libpng zlib
    ```

=== ":fontawesome-brands-windows: Windows"

    As stated in the [installation guide], the easiest way to get up and running
    with the [Cairo Graphics] library on Windows is by installing [GTK+]. You
    can also download a precompiled [GTK runtime].

=== ":material-linux: Linux"

    There are several package managers for Linux with varying availability per
    distribution. The [installation guide] explains how to install the [Cairo
    Graphics] library for your distribution:

    === ":material-ubuntu: Ubuntu"

        ```
        apt-get install libcairo2-dev libfreetype6-dev libffi-dev libjpeg-dev libpng-dev libz-dev
        ```

    === ":material-fedora: Fedora"

        ```
        yum install cairo-devel freetype-devel libffi-devel libjpeg-devel libpng-devel zlib-devel
        ```

    === ":fontawesome-brands-suse: openSUSE"

        ```
        zypper install cairo-devel freetype-devel libffi-devel libjpeg-devel libpng-devel zlib-devel
        ```

The following environments come with a preinstalled version of [Cairo Graphics]:

- [x] No installation needed in [Docker image]
- [x] No installation needed in [GitHub Actions] (Ubuntu)

  [Cairo Graphics]: https://www.cairographics.org/
  [Homebrew]: https://brew.sh/
  [installation guide]: https://www.cairographics.org/download/
  [GTK+]: https://www.gtk.org/docs/installations/windows/
  [GTK runtime]: https://github.com/tschoonj/GTK-for-Windows-Runtime-Environment-Installer/releases
  [Docker image]: https://hub.docker.com/r/squidfunk/mkdocs-material/
  [GitHub Actions]: ../../publishing-your-site.md#with-github-actions

### pngquant

[pngquant] is an excellent library for lossy PNG compression, and a direct
dependency of the [built-in optimize plugin]. See the following section which
explains how to install [pngquant] system:

=== ":material-apple: macOS"

    Make sure [Homebrew] is installed, which is a modern package manager for
    macOS. Next, use the following command to install all necessary
    dependencies:

    ```
    brew install pngquant
    ```

=== ":fontawesome-brands-windows: Windows"

    Installing [pngquant] on Windows is a little more involved. The
    [pngquant-winbuild] repository contains a guide on how to set up an
    environment for building [pngquant] on Windows.

=== ":material-linux: Linux"

    All popular Linux distributions, regardless of package manager, should
    allow to install [pngquant] with the bundled package manager. For example,
    on Ubuntu, [pngquant] can be installed with:

    ```
    apt-get install pngquant
    ```

    The same is true for `yum` and `zypper`.

The following environments come with a preinstalled version of [pngquant]:

- [x] No installation needed in [Docker image]

  [pngquant]: https://pngquant.org/
  [built-in optimize plugin]: ../../plugins/optimize.md
  [pngquant-winbuild]: https://github.com/jibsen/pngquant-winbuild
