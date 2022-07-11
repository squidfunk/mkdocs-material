---
template: overrides/main.html
icon: material/format-font
---

# Formatting

Material for MkDocs provides support for several HTML elements that can be used 
to highlight sections of a document or apply specific formatting. Additionally, 
[Critic Markup] is supported, adding the ability to display suggested changes
for a document.

  [Critic Markup]: https://github.com/CriticMarkup/CriticMarkup-toolkit

## Configuration

This configuration enables support for keyboard keys, tracking changes in
documents, defining sub- and superscript and highlighting text. Add the 
following lines to `mkdocs.yml`:

``` yaml
markdown_extensions:
  - pymdownx.critic
  - pymdownx.caret
  - pymdownx.keys
  - pymdownx.mark
  - pymdownx.tilde
```

See additional configuration options:

- [Critic]
- [Caret, Mark & Tilde]
- [Keys]

  [Critic]: ../setup/extensions/python-markdown-extensions.md#critic
  [Caret, Mark & Tilde]: ../setup/extensions/python-markdown-extensions.md#caret-mark-tilde
  [Keys]: ../setup/extensions/python-markdown-extensions.md#keys

## Usage

### Highlighting changes

When [Critic] is enabled, [Critic Markup] can be used, which adds the ability to 
highlight suggested changes, as well as add inline comments to a document:

``` title="Text with suggested changes"
Text can be {--deleted--} and replacement text {++added++}. This can also be
combined into {~~one~>a single~~} operation. {==Highlighting==} is also
possible {>>and comments can be added inline<<}.

{==

Formatting can also be applied to blocks by putting the opening and closing
tags on separate lines and adding new lines between the tags and the content.

==}
```

<div class="result" markdown>

Text can be <del class="critic">deleted</del> and replacement text
<ins class="critic">added</ins>. This can also be combined into
<del class="critic">one</del><ins class="critic">a single</ins> operation.
<mark class="critic">Highlighting</mark> is also possible
<span class="critic comment">and comments can be added inline</span>.

<div>
  <mark class="critic block">
    <p>
      Formatting can also be applied to blocks by putting the opening and
      closing tags on separate lines and adding new lines between the tags and
      the content.
    </p>
  </mark>
</div>

</div>

### Highlighting text

When [Caret, Mark & Tilde] are enabled, text can be highlighted with a simple 
syntax, which is more convenient that directly using the corresponding
[`mark`][mark], [`ins`][ins] and [`del`][del] HTML tags:

``` title="Text with highlighting"
- ==This was marked==
- ^^This was inserted^^
- ~~This was deleted~~
```

<div class="result" markdown>

- ==This was marked==
- ^^This was inserted^^
- ~~This was deleted~~

</div>

  [mark]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark
  [ins]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ins
  [del]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/del

### Sub- and superscripts

When [Caret & Tilde][Caret, Mark & Tilde] are enabled, text can be sub- and 
superscripted with a simple syntax, which is more convenient than directly
using the corresponding [`sub`][sub] and [`sup`][sup] HTML tags:

``` markdown title="Text with sub- und superscripts"
- H~2~O
- A^T^A
```

<div class="result" markdown>

- H~2~O
- A^T^A

</div>

  [sub]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sub
  [sup]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sup

### Adding keyboard keys

When [Keys] is enabled, keyboard keys can be rendered with a simple syntax.
Consult the [Python Markdown Extensions] documentation to learn about all
available shortcodes:

``` markdown title="Keyboard keys"
++ctrl+alt+del++
```

<div class="result" markdown>

++ctrl+alt+del++

</div>

  [Python Markdown Extensions]: https://facelessuser.github.io/pymdown-extensions/extensions/keys/#extendingmodifying-key-map-index
