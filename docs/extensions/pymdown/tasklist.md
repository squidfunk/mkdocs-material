# Tasklist

The [Tasklist][] extension included in the [PyMdown Extensions][] package adds
support for styled checkbox lists. This is useful for keeping track of tasks
and showing what has been done and has yet to be done.

## Installation

Make sure that the PyMdown Extensions package [is installed][] and add the
following lines to your `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.tasklist(custom_checkbox=true)
```

The `custom_checkbox` flag adds additional markup for better styling, so it is
highly recommended to add this flag, as the Material theme supports it.

## Usage

Checkbox lists are like regular lists, but prefixed with `[ ]` empty or `[x]`
filled checkboxes.

Example:

``` markdown
* [x] Lorem ipsum dolor sit amet, consectetur adipiscing elit
* [x] Nulla lobortis egestas semper
* [x] Curabitur elit nibh, euismod et ullamcorper at, iaculis feugiat est
* [ ] Vestibulum convallis sit amet nisi a tincidunt
    * [x] In hac habitasse platea dictumst
    * [x] In scelerisque nibh non dolor mollis congue sed et metus
    * [x] Sed egestas felis quis elit dapibus, ac aliquet turpis mattis
    * [ ] Praesent sed risus massa
* [ ] Aenean pretium efficitur erat, donec pharetra, ligula non scelerisque
* [ ] Nulla vel eros venenatis, imperdiet enim id, faucibus nisi
```

Result:

* [x] Lorem ipsum dolor sit amet, consectetur adipiscing elit
* [x] Nulla lobortis egestas semper
* [x] Curabitur elit nibh, euismod et ullamcorper at, iaculis feugiat est
* [ ] Vestibulum convallis sit amet nisi a tincidunt
    * [x] In hac habitasse platea dictumst
    * [x] In scelerisque nibh non dolor mollis congue sed et metus
    * [x] Sed egestas felis quis elit dapibus, ac aliquet turpis mattis
    * [ ] Praesent sed risus massa
* [ ] Aenean pretium efficitur erat, donec pharetra, ligula non scelerisque
* [ ] Nulla vel eros venenatis, imperdiet enim id, faucibus nisi

[Tasklist]: https://facelessuser.github.io/pymdown-extensions/extensions/tasklist/
[PyMdown Extensions]: https://facelessuser.github.io/pymdown-extensions
[is installed]: /extensions/pymdown/overview/#installation
