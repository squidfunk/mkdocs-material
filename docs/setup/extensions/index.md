---
template: overrides/main.html
title: Extensions
---

# Extensions

=== "Recommended"

    ``` yaml
    markdown_extensions:

      # Python Markdown
      - abbr
      - admonition
      - attr_list
      - def_list
      - footnotes
      - meta
      - md_in_html
      - toc:
          permalink: true

      # Python Markdown Extensions
      - pymdownx.arithmatex:
          generic: true
      - pymdownx.betterem:
          smart_enable: all
      - pymdownx.caret
      - pymdownx.details
      - pymdownx.emoji:
          emoji_index: !!python/name:materialx.emoji.twemoji
          emoji_generator: !!python/name:materialx.emoji.to_svg
      - pymdownx.highlight
      - pymdownx.inlinehilite
      - pymdownx.keys
      - pymdownx.mark
      - pymdownx.smartsymbols
      - pymdownx.superfences
      - pymdownx.tabbed:
          alternate_style: true
      - pymdownx.tasklist:
          custom_checkbox: true
      - pymdownx.tilde
    ```

=== "Minimal"

    ``` yaml
    markdown_extensions:

      # Python Markdown
      - meta
      - toc:
          permalink: true

      # Python Markdown Extensions
      - pymdownx.highlight
      - pymdownx.superfences
    ```
