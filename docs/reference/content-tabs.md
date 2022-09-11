---
template: overrides/main.html
icon: material/tab
---

# Content tabs

Sometimes, it's desirable to group alternative content under different tabs,
e.g. when describing how to access an API from different languages or
environments. Material for MkDocs allows for beautiful and functional tabs,
grouping code blocks and other content.

## Configuration

This configuration enables content tabs, and allows to nest arbitrary content
inside content tabs, including code blocks and ... more content tabs! Add the 
following lines to `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.superfences
  - pymdownx.tabbed:
      alternate_style: true 
```

See additional configuration options:

- [SuperFences]
- [Tabbed]

  [SuperFences]: ../setup/extensions/python-markdown-extensions.md#superfences
  [Tabbed]: ../setup/extensions/python-markdown-extensions.md#tabbed

### Anchor links

[:octicons-heart-fill-24:{ .mdx-heart } Sponsors only][Insiders]{ .mdx-insiders } ·
[:octicons-tag-24: insiders-4.17.0][Insiders] ·
:octicons-beaker-24: Experimental

In order to link to content tabs and share them more easily, [Insiders] adds
an anchor link to each content tab automatically, which you can copy via right
click or open in a new tab:

=== "Open me in a new tab ..."

=== "... or me ..."

=== "... or even me"

You can copy the link of the tab and create a link on the same or any other
page. For example, you can [jump to the third tab above this paragraph][tab_1]
or to the [publishing guide for Insiders][tab_2].

  [Insiders]: ../insiders/index.md
  [tab_1]: #__tabbed_1_3
  [tab_2]: ../publishing-your-site.md#__tabbed_1_2

### Linked content tabs

[:octicons-tag-24: 8.3.0][Linked content tabs support] ·
:octicons-unlock-24: Feature flag ·
:octicons-beaker-24: Experimental

When enabled, all content tabs across the whole documentation site will be
linked and switch to the same label when the user clicks on a tab. Add the 
following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - content.tabs.link
```

Content tabs are linked based on their label, not offset. This means that all
tabs with the same label will be activated when a user clicks a content tab
regardless of order inside a container. Furthermore, this feature is fully
integrated with [instant loading] and persisted across page loads.

=== "Feature enabled"

    [![Linked content tabs enabled]][Linked content tabs enabled]

=== "Feature disabled"

    [![Linked content tabs disabled]][Linked content tabs disabled]

  [Linked content tabs support]: https://github.com/squidfunk/mkdocs-material/releases/tag/8.3.0
  [instant loading]: ../setup/setting-up-navigation.md#instant-loading
  [Linked content tabs enabled]: ../assets/screenshots/content-tabs-link.png
  [Linked content tabs disabled]: ../assets/screenshots/content-tabs.png

## Usage

### Grouping code blocks

Code blocks are one of the primary targets to be grouped, and can be considered
a special case of content tabs, as tabs with a single code block are always
rendered without horizontal spacing:

``` title="Content tabs with code blocks"
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

<div class="result" markdown>

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

</div>

### Grouping other content

When a content tab contains more than one code block, it is rendered with
horizontal spacing. Vertical spacing is never added, but can be achieved
by nesting tabs in other blocks:

``` title="Content tabs"
=== "Unordered list"

    * Sed sagittis eleifend rutrum
    * Donec vitae suscipit est
    * Nulla tempor lobortis orci

=== "Ordered list"

    1. Sed sagittis eleifend rutrum
    2. Donec vitae suscipit est
    3. Nulla tempor lobortis orci
```

<div class="result" markdown>

=== "Unordered list"

    * Sed sagittis eleifend rutrum
    * Donec vitae suscipit est
    * Nulla tempor lobortis orci

=== "Ordered list"

    1. Sed sagittis eleifend rutrum
    2. Donec vitae suscipit est
    3. Nulla tempor lobortis orci

</div>

### Embedded content

When [SuperFences] is enabled, content tabs can contain arbitrary nested
content, including further content tabs, and can be nested in other blocks like
[admonitions] or blockquotes:

``` title="Content tabs in admonition"
!!! example

    === "Unordered List"

        ``` markdown
        * Sed sagittis eleifend rutrum
        * Donec vitae suscipit est
        * Nulla tempor lobortis orci
        ```

    === "Ordered List"

        ``` markdown
        1. Sed sagittis eleifend rutrum
        2. Donec vitae suscipit est
        3. Nulla tempor lobortis orci
        ```
```

<div class="result" markdown>

!!! example

    === "Unordered List"

        ``` markdown
        * Sed sagittis eleifend rutrum
        * Donec vitae suscipit est
        * Nulla tempor lobortis orci
        ```

    === "Ordered List"

        ``` markdown
        1. Sed sagittis eleifend rutrum
        2. Donec vitae suscipit est
        3. Nulla tempor lobortis orci
        ```

</div>

  [admonitions]: admonitions.md
