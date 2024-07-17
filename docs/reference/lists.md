---
icon: material/format-list-bulleted
---

# Lists

Material for MkDocs supports several flavors of lists that cater to different
use cases, including _unordered lists_ and _ordered lists_, which are supported
through standard Markdown, as well as _definition lists_ and _task lists_, which
are supported through extensions.

## Configuration

This configuration enables the use of definition lists, tasks lists and sane lists, which
are both not part of the standard Markdown syntax. Add the following lines to
`mkdocs.yml`:

``` yaml
markdown_extensions:
  - def_list
  - sane_lists
  - pymdownx.tasklist:
      custom_checkbox: true
```

See additional configuration options:

- [Definition Lists]
- [Tasklist]
- [Sane Lists]

  [Definition Lists]: ../setup/extensions/python-markdown.md#definition-lists
  [Tasklist]: ../setup/extensions/python-markdown-extensions.md#tasklist
  [Sane Lists]: ../setup/extensions/python-markdown.md#sane-lists

## Usage

### Using unordered lists

Unordered lists can be written by prefixing a line with a `-`, `*` or `+` list
marker, all of which can be used interchangeably. Furthermore, all flavors
of lists can be nested inside each other:

``` markdown title="List, unordered"
- Nulla et rhoncus turpis. Mauris ultricies elementum leo. Duis efficitur
  accumsan nibh eu mattis. Vivamus tempus velit eros, porttitor placerat nibh
  lacinia sed. Aenean in finibus diam.

    * Duis mollis est eget nibh volutpat, fermentum aliquet dui mollis.
    * Nam vulputate tincidunt fringilla.
    * Nullam dignissim ultrices urna non auctor.
```

<div class="result" markdown>

- Nulla et rhoncus turpis. Mauris ultricies elementum leo. Duis efficitur
  accumsan nibh eu mattis. Vivamus tempus velit eros, porttitor placerat nibh
  lacinia sed. Aenean in finibus diam.

    * Duis mollis est eget nibh volutpat, fermentum aliquet dui mollis.
    * Nam vulputate tincidunt fringilla.
    * Nullam dignissim ultrices urna non auctor.

</div>

### Using ordered lists

Ordered lists must start with a number immediately followed by a dot. The
numbers do not need to be consecutive and can be all set to `1.`, as they will
be re-numbered when rendered:

``` markdown title="List, ordered"
1.  Vivamus id mi enim. Integer id turpis sapien. Ut condimentum lobortis
    sagittis. Aliquam purus tellus, faucibus eget urna at, iaculis venenatis
    nulla. Vivamus a pharetra leo.

    1.  Vivamus venenatis porttitor tortor sit amet rutrum. Pellentesque aliquet
        quam enim, eu volutpat urna rutrum a. Nam vehicula nunc mauris, a
        ultricies libero efficitur sed.

    2.  Morbi eget dapibus felis. Vivamus venenatis porttitor tortor sit amet
        rutrum. Pellentesque aliquet quam enim, eu volutpat urna rutrum a.

        1.  Mauris dictum mi lacus
        2.  Ut sit amet placerat ante
        3.  Suspendisse ac eros arcu
```

<div class="result" markdown>

1.  Vivamus id mi enim. Integer id turpis sapien. Ut condimentum lobortis
    sagittis. Aliquam purus tellus, faucibus eget urna at, iaculis venenatis
    nulla. Vivamus a pharetra leo.

    1.  Vivamus venenatis porttitor tortor sit amet rutrum. Pellentesque aliquet
        quam enim, eu volutpat urna rutrum a. Nam vehicula nunc mauris, a
        ultricies libero efficitur sed.

    2.  Morbi eget dapibus felis. Vivamus venenatis porttitor tortor sit amet
        rutrum. Pellentesque aliquet quam enim, eu volutpat urna rutrum a.

        1.  Mauris dictum mi lacus
        2.  Ut sit amet placerat ante
        3.  Suspendisse ac eros arcu

</div>

### Using definition lists

When [Definition Lists] is enabled, lists of arbitrary key-value pairs, e.g. the
parameters of functions or modules, can be enumerated with a simple syntax:

``` markdown title="Definition list"
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

<div class="result" markdown>

`Lorem ipsum dolor sit amet`

:   Sed sagittis eleifend rutrum. Donec vitae suscipit est. Nullam tempus
    tellus non sem sollicitudin, quis rutrum leo facilisis.

`Cras arcu libero`

:   Aliquam metus eros, pretium sed nulla venenatis, faucibus auctor ex. Proin
    ut eros sed sapien ullamcorper consequat. Nunc ligula ante.

    Duis mollis est eget nibh volutpat, fermentum aliquet dui mollis.
    Nam vulputate tincidunt fringilla.
    Nullam dignissim ultrices urna non auctor.

</div>

### Using task lists

When [Tasklist] is enabled, unordered list items can be prefixed with `[ ]` to
render an unchecked checkbox or `[x]` to render a checked checkbox, allowing
for the definition of task lists:

``` markdown title="Task list"
- [x] Lorem ipsum dolor sit amet, consectetur adipiscing elit
- [ ] Vestibulum convallis sit amet nisi a tincidunt
    * [x] In hac habitasse platea dictumst
    * [x] In scelerisque nibh non dolor mollis congue sed et metus
    * [ ] Praesent sed risus massa
- [ ] Aenean pretium efficitur erat, donec pharetra, ligula non scelerisque
```

<div class="result" markdown>

- [x] Lorem ipsum dolor sit amet, consectetur adipiscing elit
- [ ] Vestibulum convallis sit amet nisi a tincidunt
    * [x] In hac habitasse platea dictumst
    * [x] In scelerisque nibh non dolor mollis congue sed et metus
    * [ ] Praesent sed risus massa
- [ ] Aenean pretium efficitur erat, donec pharetra, ligula non scelerisque

</div>

### Using sane lists

The [Sane Lists] extension prevents the mixing of list types.
In other words, an ordered list will not continue when an unordered
list item is encountered and vice versa.

=== "With Sane Lists"
    ``` markdown
    1. Ordered item 1
    2. Ordered item 2

    * Unordered item 1
    * Unordered item 2
    ```

    <div class="result" markdown>

    1. Ordered item 1
    2. Ordered item 2

    * Unordered item 1
    * Unordered item 2

    </div>

=== "Without Sane Lists"
    ``` markdown
    1. Ordered item 1
    2. Ordered item 2

    * Unordered item 1
    * Unordered item 2
    ```

    <div class="result" markdown>
      <ol>
        <li>Ordered item 1</li>
        <li>Ordered item 2</li>
        <li>Unordered item 1</li>
        <li>Unordered item 2</li>
      </ol>
    </div>

A side effect of this extensions is that, unlike the default behavior of Markdown,
if a blank line is not included between a paragraph and a list, the different list
type will be completely ignored and will be rendered as a continuation of the
previous list item.

=== "With Sane Lists"
    ``` markdown
    A Paragraph.
    * Not a list item.

    1. Ordered list item.
    * Not a separate list item.
    ```

    <div class="result" markdown>

    A Paragraph.
    * Not a list item.

    1. Ordered list item.
    * Not a separate list item.

    </div>

=== "Without Sane Lists"
    ``` markdown
    A Paragraph.
    * Not a list item.

    1. Ordered list item.
    * Not a separate list item.
    ```

    <div class="result" markdown>
      <p>A Paragraph.
      * Not a list item.</p>
      <ol>
        <li>Ordered list item.</li>
        <li>Not a separate list item.</li>
      </ol>
    </div>

#### Defining starting numbers

When [Sane Lists] is enabled, the starting number of ordered
lists can be defined with the first number in the list:

``` markdown title="Starting number"
5. Lorem ipsum dolor sit amet, consectetur adipiscing elit
1. Vestibulum convallis sit amet nisi a tincidunt
1. In hac habitasse platea dictumst
```

<div class="result" markdown>

5. Lorem ipsum dolor sit amet, consectetur adipiscing elit
1. Vestibulum convallis sit amet nisi a tincidunt
1. In hac habitasse platea dictumst

</div>
