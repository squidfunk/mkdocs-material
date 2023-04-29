---
icon: material/alphabet-greek
---

# MathJax

[KaTeX] is a Lightning-fast library to display mathematical expressions
in the browser.

  [KaTeX]: https://katex.org/

KaTeX isn't supported by default, but can be easily integrated with Material for MkDocs.

## Configuration

This configuration enables support for rendering block and inline block
equations through [KaTex]. Create a configuration file and add the following
lines to `mkdocs.yml`:

=== ":octicons-file-code-16: `docs/javascripts/katex.js`"

    ``` js
    document$.subscribe(() => { // (1)!
      renderMathInElement(document.body, {
        delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false},
        {left: '\\(', right: '\\)', display: false},
        {left: '\\[', right: '\\]', display: true},
        ],
    });
    })
    ```

    1. This integrates MathJax with [instant loading].

=== ":octicons-file-code-16: `overrides/main.html`"

    ```html
    {% extends "base.html" %}

    {% block libs %}
      <!--katex scripts-->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.7/katex.min.css" integrity="sha512-t2ALGTyUR6g1HJiHCmSTge2yGseGofdO88Q+zOWQx/N0ikecVw0YuyOet9xZDV8+Vx0Y0n1a3f3Qx3V9CcnsKA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.7/katex.min.js" integrity="sha512-EKW5YvKU3hpyyOcN6jQnAxO/L8gts+YdYV6Yymtl8pk9YlYFtqJgihORuRoBXK8/cOIlappdU6Ms8KdK6yBCgA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.7/contrib/auto-render.min.js" integrity="sha512-iWiuBS5nt6r60fCz26Nd0Zqe0nbk1ZTIQbl3Kv7kYsX+yKMUFHzjaH2+AnM6vp2Xs+gNmaBAVWJjSmuPw76Efg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
      
      {{ super() }}
    {% endblock %}
    ```

=== ":octicons-file-code-16: `mkdocs.yml`"

    ``` yaml
    extra_javascript:
      - javascripts/katex.js
    ```

  [instant loading]: ../setup/setting-up-navigation.md#instant-loading

## Usage

### Using block syntax

Blocks must be enclosed in `#!latex $$...$$` or `#!latex \[...\]` on separate
lines.

### Using inline block syntax

Inline blocks must be enclosed in `#!latex $...$` or `#!latex \(...\)`.