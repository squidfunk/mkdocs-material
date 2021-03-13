---
template: overrides/main.html
---

# Lists

Material for MkDocs supports several flavors of lists that cater to different
use cases, including _unordered lists_ and _ordered lists_, which are supported
through standard Markdown, as well as _definition lists_ and _task lists_, which
are supported through extensions.

## Configuration

### Definition List

[:octicons-file-code-24: Source][1] · [:octicons-workflow-24: Extension][2]

The [Definition List][2] extension, which is part of the standard Markdown
library, adds the ability to add definitions lists to a document and can be 
enabled via `mkdocs.yml`:

``` yaml
markdown_extensions:
  - def_list
```

  [1]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/stylesheets/main/_typeset.scss
  [2]: https://python-markdown.github.io/extensions/definition_lists/

### Tasklist

[:octicons-file-code-24: Source][3] · [:octicons-workflow-24: Extension][4]

The [Tasklist][4] extension, which is part of [Python Markdown Extensions][5], 
adds support for lists with styled checkboxes, and provides several options for 
configuring the style:

`custom_checkbox`{ #custom-checkbox }

:   :octicons-milestone-24: Default: `false` · This option toggles the rendering
    style of checkboxes, replacing native checkbox styles with beautiful icons, 
    and is therefore _strongly recommended_:

    ``` yaml
    markdown_extensions:
      - pymdownx.tasklist:
          custom_checkbox: true
    ```

`clickable_checkbox`{ #clickable-checkbox }

:   :octicons-milestone-24: Default: `false` · This option toggles whether
    checkboxes are clickable. As the state is not persisted, the use of this 
    option is _rather discouraged_ from a user experience perspective:

    ``` yaml
    markdown_extensions:
      - pymdownx.tasklist:
          clickable_checkbox: true
    ```

  [3]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/stylesheets/main/extensions/pymdownx/_tasklist.scss
  [4]: https://facelessuser.github.io/pymdown-extensions/extensions/tasklist/
  [5]: https://facelessuser.github.io/pymdown-extensions/

## Usage

### Using unordered lists

An unordered list can be written by prefixing a line with a `-`, `*` or `+`
list marker, all of which can be used interchangeably. Furthermore, all flavors
of lists can be nested inside each other.

_Example_:

``` markdown
- Nulla et rhoncus turpis. Mauris ultricies elementum leo. Duis efficitur
  accumsan nibh eu mattis. Vivamus tempus velit eros, porttitor placerat nibh
  lacinia sed. Aenean in finibus diam.

    * Duis mollis est eget nibh volutpat, fermentum aliquet dui mollis.
    * Nam vulputate tincidunt fringilla.
    * Nullam dignissim ultrices urna non auctor.
```

_Result_:

- Nulla et rhoncus turpis. Mauris ultricies elementum leo. Duis efficitur
  accumsan nibh eu mattis. Vivamus tempus velit eros, porttitor placerat nibh
  lacinia sed. Aenean in finibus diam.

    * Duis mollis est eget nibh volutpat, fermentum aliquet dui mollis.
    * Nam vulputate tincidunt fringilla.
    * Nullam dignissim ultrices urna non auctor.

### Using ordered lists

An ordered list must start with a number immediately followed by a dot. The 
numbers do not need to be consecutive and can be all set to `1.`, as they will
be re-numbered when rendered.

_Example_:

``` markdown
1. Vivamus id mi enim. Integer id turpis sapien. Ut condimentum lobortis
  sagittis. Aliquam purus tellus, faucibus eget urna at, iaculis venenatis
  nulla. Vivamus a pharetra leo.

    1. Vivamus venenatis porttitor tortor sit amet rutrum. Pellentesque aliquet
      quam enim, eu volutpat urna rutrum a. Nam vehicula nunc mauris, a
      ultricies libero efficitur sed.

    2. Morbi eget dapibus felis. Vivamus venenatis porttitor tortor sit amet
      rutrum. Pellentesque aliquet quam enim, eu volutpat urna rutrum a.

        1. Mauris dictum mi lacus
        2. Ut sit amet placerat ante
        3. Suspendisse ac eros arcu
```

_Result_:

1. Vivamus id mi enim. Integer id turpis sapien. Ut condimentum lobortis
  sagittis. Aliquam purus tellus, faucibus eget urna at, iaculis venenatis
  nulla. Vivamus a pharetra leo.

    1. Vivamus venenatis porttitor tortor sit amet rutrum. Pellentesque aliquet
      quam enim, eu volutpat urna rutrum a. Nam vehicula nunc mauris, a
      ultricies libero efficitur sed.

    2. Morbi eget dapibus felis. Vivamus venenatis porttitor tortor sit amet
      rutrum. Pellentesque aliquet quam enim, eu volutpat urna rutrum a.

        1. Mauris dictum mi lacus
        2. Ut sit amet placerat ante
        3. Suspendisse ac eros arcu

### Using definition lists

[Definition lists][6] are a ideal for describing arbitrary key-value pairs, e.g. 
the parameters of functions or modules, as used within this documentation to 
describe extension or plugin parameters.

_Example_:

``` markdown
`Lorem ipsum dolor sit amet`
:   Sed sagittis eleifend rutrum. Donec vitae suscipit est. Nullam tempus
    tellus non sem sollicitudin, quis rutrum leo facilisis.

`Cras arcu libero`
:   Aliquam metus eros, pretium sed nulla venenatis, faucibus auctor ex. Proin
    ut eros sed sapien ullamcorper consequat. Nunc ligula ante.

    Duis mollis est eget nibh volutpat, fermentum aliquet dui mollis.
    Nam vulputate tincidunt fringilla.
    Nullam dignissim ultrices urna non auctor.
```

_Result_:

`Lorem ipsum dolor sit amet`
:   Sed sagittis eleifend rutrum. Donec vitae suscipit est. Nullam tempus
    tellus non sem sollicitudin, quis rutrum leo facilisis.

`Cras arcu libero`
:   Aliquam metus eros, pretium sed nulla venenatis, faucibus auctor ex. Proin
    ut eros sed sapien ullamcorper consequat. Nunc ligula ante.

    Duis mollis est eget nibh volutpat, fermentum aliquet dui mollis.
    Nam vulputate tincidunt fringilla.
    Nullam dignissim ultrices urna non auctor.

  [6]: #definition-list

### Using tasklists

When the [Tasklist][7] extension is enabled, unordered list items can be
prefixed with `[ ]` to render an unchecked or `[x]` to render a checked
checkbox.

_Example_:

``` markdown
- [x] Lorem ipsum dolor sit amet, consectetur adipiscing elit
- [ ] Vestibulum convallis sit amet nisi a tincidunt
    * [x] In hac habitasse platea dictumst
    * [x] In scelerisque nibh non dolor mollis congue sed et metus
    * [ ] Praesent sed risus massa
- [ ] Aenean pretium efficitur erat, donec pharetra, ligula non scelerisque
```

_Result_:

- [x] Lorem ipsum dolor sit amet, consectetur adipiscing elit
- [ ] Vestibulum convallis sit amet nisi a tincidunt
    * [x] In hac habitasse platea dictumst
    * [x] In scelerisque nibh non dolor mollis congue sed et metus
    * [ ] Praesent sed risus massa
- [ ] Aenean pretium efficitur erat, donec pharetra, ligula non scelerisque

  [7]: #tasklist
