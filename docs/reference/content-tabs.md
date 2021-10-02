---
template: overrides/main.html
---

# Content tabs

Sometimes, it's desirable to group alternative content under different tabs,
e.g. when describing how to access an API from different languages or
environments. Material for MkDocs allows for beautiful and functional tabs,
grouping code blocks and other content.

## Configuration

### Tabbed

[:octicons-file-code-24: Source][1] · [:octicons-workflow-24: Extension][2]

The [Tabbed][2] extension, which is part of [Python Markdown Extensions][3],
integrates with Material for MkDocs and can be enabled via `mkdocs.yml`:

=== "Modern"

    ``` yaml
    markdown_extensions:
      - pymdownx.tabbed:
          alternate_style: true # (1)
    ```

    1. As of 7.3.1, support was added for the new [`alternate_style`][12] flag,
       which has much better behavior on smaller screen sizes, as content tabs
       are now scrollable and will overflow instead of break across multiple
       lines.

        __The legacy style will be deprecated with the next major release.__

  [12]: https://facelessuser.github.io/pymdown-extensions/extensions/tabbed/#alternate-style

=== "Legacy"

    ``` yaml
    markdown_extensions:
      - pymdownx.tabbed
    ```

  [1]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/stylesheets/main/extensions/pymdownx/_tabbed.scss
  [2]: https://facelessuser.github.io/pymdown-extensions/extensions/tabbed/
  [3]: https://facelessuser.github.io/pymdown-extensions/

### SuperFences

The [SuperFences][4] extension, which is also part of [Python Markdown
Extensions][3], allows for the __nesting of code and content blocks inside
tabs__, and is therefore strongly recommended:

``` yaml
markdown_extensions:
  - pymdownx.superfences
```

  [4]: https://facelessuser.github.io/pymdown-extensions/extensions/superfences/

## Usage

### Grouping code blocks

Code blocks are one of the primary targets to be grouped, and can be considered
a special case of content tabs, as tabs with a single code block are always
rendered without horizontal spacing.

_Example_:

```
=== "C"

    ``` c
    #include <stdio.h>

    int main(void) {
      printf("Hello world!\n");
      return 0;
    }
    ```

=== "C++"

    ``` c++
    #include <iostream>

    int main(void) {
      std::cout << "Hello world!" << std::endl;
      return 0;
    }
    ```
```

_Result_:

=== "C"

    ``` c
    #include <stdio.h>

    int main(void) {
      printf("Hello world!\n");
      return 0;
    }
    ```

=== "C++"

    ``` c++
    #include <iostream>

    int main(void) {
      std::cout << "Hello world!" << std::endl;
      return 0;
    }
    ```

### Grouping other content

When a content tab contains more than one code block, it is rendered with
horizontal spacing. Vertical spacing is never added, but can be achieved
by nesting tabs in other blocks.

_Example_:

```
=== "Unordered list"

    * Sed sagittis eleifend rutrum
    * Donec vitae suscipit est
    * Nulla tempor lobortis orci

=== "Ordered list"

    1. Sed sagittis eleifend rutrum
    2. Donec vitae suscipit est
    3. Nulla tempor lobortis orci
```

_Result_:

=== "Unordered list"

    * Sed sagittis eleifend rutrum
    * Donec vitae suscipit est
    * Nulla tempor lobortis orci

=== "Ordered list"

    1. Sed sagittis eleifend rutrum
    2. Donec vitae suscipit est
    3. Nulla tempor lobortis orci

### Linking content tabs

[:octicons-file-code-24: Source][5] ·
:octicons-beaker-24: Experimental ·
[:octicons-heart-fill-24:{ .mdx-heart } Insiders only][5]{ .mdx-insiders }

When _linking_ is enabled, all content tabs on a page will be linked and show
the same active tab when the user clicks on a label. Add the following lines
to `mkdocs.yml`:

``` yaml
theme:
  features:
    - content.tabs.link
```

Content tabs are linked based on their label, not offset. This means that all
tabs with the same label will be activated when a user clicks a content tab
regardless of order inside a container. Furthermore, this feature is fully
integrated with [instant loading][6] and persisted across page loads.

=== "With linking"

    [![With linking][7]][7]

=== "Without linking"

    [![Without linking][8]][8]

  [5]: ../insiders/index.md
  [6]: ../setup/setting-up-navigation.md#instant-loading
  [7]: ../assets/screenshots/content-tabs-link.png
  [8]: ../assets/screenshots/content-tabs.png

### Embedded content

When [SuperFences][9] is enabled, content tabs can contain arbitrary nested
content, including further content tabs, and can be nested in other blocks like
[admonitions][10], [details][11] or blockquotes:

_Example_:

``` markdown
!!! example

    === "Unordered List"

        _Example_:

        ``` markdown
        * Sed sagittis eleifend rutrum
        * Donec vitae suscipit est
        * Nulla tempor lobortis orci
        ```

        _Result_:

        * Sed sagittis eleifend rutrum
        * Donec vitae suscipit est
        * Nulla tempor lobortis orci

    === "Ordered List"

        _Example_:

        ``` markdown
        1. Sed sagittis eleifend rutrum
        2. Donec vitae suscipit est
        3. Nulla tempor lobortis orci
        ```

        _Result_:

        1. Sed sagittis eleifend rutrum
        2. Donec vitae suscipit est
        3. Nulla tempor lobortis orci
```

_Result_:

!!! example

    === "Unordered List"

        _Example_:

        ``` markdown
        * Sed sagittis eleifend rutrum
        * Donec vitae suscipit est
        * Nulla tempor lobortis orci
        ```

        _Result_:

        * Sed sagittis eleifend rutrum
        * Donec vitae suscipit est
        * Nulla tempor lobortis orci

    === "Ordered List"

        _Example_:

        ``` markdown
        1. Sed sagittis eleifend rutrum
        2. Donec vitae suscipit est
        3. Nulla tempor lobortis orci
        ```

        _Result_:

        1. Sed sagittis eleifend rutrum
        2. Donec vitae suscipit est
        3. Nulla tempor lobortis orci

  [9]: #superfences
  [10]: admonitions.md
  [11]: admonitions.md#details
