---
template: overrides/main.html
icon: material/plus-circle
---

# Annotations

One of the flagship features of Material for MkDocs is the ability to inject
annotations – little markers that can be added almost anywhere in a document
and expand a tooltip containing arbitrary Markdown on click or keyboard focus.

## Configuration

This configuration allows to add annotations to all inline- and block-level
elements, as well as code blocks, and nest annotations inside each other. Add
the following lines to `mkdocs.yml`:

``` yaml
markdown_extensions:
  - attr_list
  - md_in_html
  - pymdownx.superfences
```

See additional configuration options:

- [Attribute Lists]
- [Markdown in HTML]
- [SuperFences]

  [Attribute Lists]: ../setup/extensions/python-markdown.md#attribute-lists
  [Markdown in HTML]: ../setup/extensions/python-markdown.md#markdown-in-html
  [SuperFences]: ../setup/extensions/python-markdown-extensions.md#superfences

## Usage

### Using annotations

[:octicons-heart-fill-24:{ .mdx-heart } Insiders][Insiders]{ .mdx-insiders } ·
[:octicons-tag-24: insiders-4.6.0][Insiders] ·
:octicons-beaker-24: Experimental

Annotations consist of two parts: a marker, which can be placed anywhere in
a block marked with the `annotate` class, and content located in a list below
the block containing the marker:

``` markdown title="Text with annotations"
Lorem ipsum dolor sit amet, (1) consectetur adipiscing elit.
{ .annotate }

1.  :man_raising_hand: I'm an annotation! I can contain `code`, __formatted
    text__, images, ... basically anything that can be expressed in Markdown.
```

<div class="result" markdown>

Lorem ipsum dolor sit amet, (1) consectetur adipiscing elit.
{ .annotate }

1.  :man_raising_hand: I'm an annotation! I can contain `code`, __formatted
    text__, images, ... basically anything that can be written in Markdown.

</div>

Note that the `annotate` class must only be added to the outermost block. All
nested elements can use the same list to define annotations, except when
annotations are nested themselves.

  [Insiders]: ../insiders/index.md

#### in annotations

When [SuperFences] is enabled, annotations can be nested inside annotations by
adding the `annotate` class to the list item hosting the annotation content,
repeating the process:

``` markdown title="Text with nested annotations"
Lorem ipsum dolor sit amet, (1) consectetur adipiscing elit.
{ .annotate }

1.  :man_raising_hand: I'm an annotation! (1)
    { .annotate }

    1.  :woman_raising_hand: I'm an annotation as well!
```

<div class="result" markdown>

Lorem ipsum dolor sit amet, (1) consectetur adipiscing elit.
{ .annotate }

1.  :man_raising_hand: I'm an annotation! (1)
    { .annotate style="margin-bottom: 0" }

    1.  :woman_raising_hand: I'm an annotation as well!

</div>

#### in admonitions

The titles and bodies of [admonitions] can also host annotations by adding the
`annotate` modifier after the type qualifier, which is similar to how
[inline blocks] work:

``` markdown title="Admonition with annotations"
!!! note annotate "Phasellus posuere in sem ut cursus (1)"

    Lorem ipsum dolor sit amet, (2) consectetur adipiscing elit. Nulla et
    euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo
    purus auctor massa, nec semper lorem quam in massa.

1.  :man_raising_hand: I'm an annotation!
2.  :woman_raising_hand: I'm an annotation as well!
```

<div class="result" markdown>

!!! note annotate "Phasellus posuere in sem ut cursus (1)"

    Lorem ipsum dolor sit amet, (2) consectetur adipiscing elit. Nulla et
    euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo
    purus auctor massa, nec semper lorem quam in massa.

1.  :man_raising_hand: I'm an annotation!
2.  :woman_raising_hand: I'm an annotation as well!

</div>

  [admonitions]: admonitions.md
  [inline blocks]: admonitions.md#inline-blocks

#### in content tabs

Content tabs can host annotations by adding the `annotate` class to the block
of a dedicated content tab (and not to the container, which is not supported):

``` markdown title="Content tabs with annotations"
=== "Tab 1"

    Lorem ipsum dolor sit amet, (1) consectetur adipiscing elit.
    { .annotate }

    1.  :man_raising_hand: I'm an annotation!

=== "Tab 2"

    Phasellus posuere in sem ut cursus (1)
    { .annotate }

    1.  :woman_raising_hand: I'm an annotation as well!
```

<div class="result" markdown>

=== "Tab 1"

    Lorem ipsum dolor sit amet, (1) consectetur adipiscing elit.
    { .annotate }

    1.  :man_raising_hand: I'm an annotation!

=== "Tab 2"

    Phasellus posuere in sem ut cursus (1)
    { .annotate }

    1.  :woman_raising_hand: I'm an annotation as well!

</div>

#### in everything else

The [Attribute Lists] extension is the key ingredient for adding annotations to 
most elements, but it has some [limitations]. However, it's always possible to
leverage the [Markdown in HTML] extension to wrap arbitrary elements with a
`div` with the `annotate` class:

```` html title="HTML with annotations"
<div class="annotate" markdown>

> Lorem ipsum dolor sit amet, (1) consectetur adipiscing elit.

</div>

1.  :man_raising_hand: I'm an annotation!
````

<div class="result" markdown>
  <div class="annotate" markdown>

> Lorem ipsum dolor sit amet, (1) consectetur adipiscing elit.

  </div>

1.  :man_raising_hand: I'm an annotation!

</div>

With this trick, annotations can also be added to blockquotes, lists, and many
other elements that are not supported by the [Attribute Lists] extension.
Furthermore, note that [code blocks follow different semantics].

!!! warning "Known limitations"

    Please note that annotations currently don't work in [data tables] as
    reported in #3453, as data tables are scrollable elements and positioning
    is very tricky to get right. This might be fixed in the future.

  [limitations]: https://python-markdown.github.io/extensions/attr_list/#limitations
  [code blocks follow different semantics]: code-blocks.md#adding-annotations
  [data tables]: data-tables.md
