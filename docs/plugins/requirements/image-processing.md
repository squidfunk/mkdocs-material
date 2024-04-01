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

## Troubleshooting

### Cairo library was not found

After following the installation guide above it may happen that you still get
the following error:

```bash
no library called "cairo-2" was found
no library called "cairo" was found
no library called "libcairo-2" was found
cannot load library 'libcairo.so.2': error 0x7e.  Additionally, ctypes.util.find_library() did not manage to locate a library called 'libcairo.so.2'
cannot load library 'libcairo.2.dylib': error 0x7e.  Additionally, ctypes.util.find_library() did not manage to locate a library called 'libcairo.2.dylib'
cannot load library 'libcairo-2.dll': error 0x7e.  Additionally, ctypes.util.find_library() did not manage to locate a library called 'libcairo-2.dll'
```

This means that the [`cairosvg`][PyPi CairoSVG] package was installed, but the
underlying [`cairocffi`][PyPi CairoCFFI] dependency couldn't [find][cffi-dopen]
the installed library. Depending on the operating system the library lookup
process is different:

!!! tip
    Before proceeding remember to fully restart any open Terminal windows, and
    their parent hosts like IDEs to reload any environmental variables, which
    were altered during the installation process. This might be the quick fix.

=== ":material-apple: macOS"

    On macOS the library lookup checks inside paths defined in [dyld][osx-dyld].
    Additionally each library `name` is checked in [three variants][find-library-macOS]
    with the `libname.dylib`, `name.dylib` and `name.framework/name` format.

    [Homebrew] should set every needed variable to point at the installed
    library directory, but if that didn't happen, you can use the debug script
    below to see what paths are looked up.

    A [known workaround][cffi-issue] is to add the Homebrew lib path directly
    before running MkDocs:

    ```bash
    export DYLD_FALLBACK_LIBRARY_PATH=/opt/homebrew/lib
    ```

    View source code of [cairo-lookup-macos.py]

    ```bash title="Python Debug macOS Script"
    curl "https://raw.githubusercontent.com/squidfunk/mkdocs-material/master/includes/debug/cairo-lookup-macos.py" | python -
    ```

=== ":fontawesome-brands-windows: Windows"

    On Windows the library lookup checks inside the paths defined in the
    environmental `PATH` variable. Additionally each library `name` is checked
    in [two variants][find-library-Windows] with the `name` and `name.dll` format.

    The default installation path of [GTK runtime] is:

    ```powershell
    C:\Program Files\GTK3-Runtime Win64
    ```

    and the libraries are in the `<INSTALL-DIR>\lib` directory. Use the debug
    script below to check if the path is included. If it isn't then:

    1. Press ++windows+r++.
    2. Run the `SystemPropertiesAdvanced` applet.
    3. Select "Environmental Variables" at the bottom.
    4. Add the whole path to the `lib` directory to your `Path` variable.
    5. Click OK on all open windows to apply changes.
    6. Fully restart any open Terminal windows and their parent hosts like IDEs.

    ```powershell title="You can also list paths using PowerShell"
    $env:Path -split ';'
    ```

    View source code of [cairo-lookup-windows.py]

    ```powershell title="PowerShell - Python Debug Windows Script"
    (Invoke-WebRequest "https://raw.githubusercontent.com/squidfunk/mkdocs-material/master/includes/debug/cairo-lookup-windows.py").Content | python -
    ```

=== ":material-linux: Linux"

    On Linux the library lookup can [differ greatly][find-library-Linux] and is
    dependent from the installed distribution. For tested Ubuntu and Manjaro
    systems Python runs shell commands to check which libraries are available in
    [`ldconfig`][ubuntu-ldconfig], in the [`gcc`][ubuntu-gcc]/`cc` compiler, and
    in [`ld`][ubuntu-ld].

    You can extend the `LD_LIBRARY_PATH` environmental variable with an absolute
    path to a library directory containing `libcairo.so` etc. Run this directly
    before MkDocs:

    ```bash
    export LD_LIBRARY_PATH=/absolute/path/to/lib:$LD_LIBRARY_PATH
    ```

    You can also modify the `/etc/ld.so.conf` file.

    The Python script below shows, which function is being run to find installed
    libraries. You can check the source to find out what specific commands are
    executed on your system during library lookup.

    View source code of [cairo-lookup-linux.py]

    ```bash title="Python Debug Linux Script"
    curl "https://raw.githubusercontent.com/squidfunk/mkdocs-material/master/includes/debug/cairo-lookup-linux.py" | python -
    ```

  [PyPi CairoSVG]: https://pypi.org/project/CairoSVG
  [PyPi CairoCFFI]: https://pypi.org/project/CairoCFFI
  [osx-dyld]: https://www.unix.com/man-page/osx/1/dyld/
  [ubuntu-ldconfig]: https://manpages.ubuntu.com/manpages/focal/en/man8/ldconfig.8.html
  [ubuntu-ld]: https://manpages.ubuntu.com/manpages/xenial/man1/ld.1.html
  [ubuntu-gcc]: https://manpages.ubuntu.com/manpages/trusty/man1/gcc.1.html
  [cffi-issue]: https://github.com/squidfunk/mkdocs-material/issues/5121
  [cffi-dopen]: https://github.com/Kozea/cairocffi/blob/f1984d644bbc462ef0ec33b97782cf05733d7b53/cairocffi/__init__.py#L24-L49
  [find-library-macOS]: https://github.com/python/cpython/blob/4d58a1d8fb27048c11bcbda3da1bebf78f979335/Lib/ctypes/util.py#L70-L81
  [find-library-Windows]: https://github.com/python/cpython/blob/4d58a1d8fb27048c11bcbda3da1bebf78f979335/Lib/ctypes/util.py#L59-L67
  [find-library-Linux]: https://github.com/python/cpython/blob/4d58a1d8fb27048c11bcbda3da1bebf78f979335/Lib/ctypes/util.py#L92
  [cairo-lookup-macos.py]: https://raw.githubusercontent.com/squidfunk/mkdocs-material/master/includes/debug/cairo-lookup-macos.py
  [cairo-lookup-windows.py]: https://raw.githubusercontent.com/squidfunk/mkdocs-material/master/includes/debug/cairo-lookup-windows.py
  [cairo-lookup-linux.py]: https://raw.githubusercontent.com/squidfunk/mkdocs-material/master/includes/debug/cairo-lookup-linux.py
