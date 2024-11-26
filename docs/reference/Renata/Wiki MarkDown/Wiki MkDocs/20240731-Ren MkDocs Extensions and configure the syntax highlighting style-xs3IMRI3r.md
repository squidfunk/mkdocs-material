# Ren MkDocs Extensions and configure the syntax highlighting style

### Step 1: Install Required Packages

Make sure you have `mkdocs-material` and `pymdown-extensions` installed:

```sh
pip install mkdocs-material pymdown-extensions
```

### Step 2: Update `mkdocs.yml` Configuration

Edit your `mkdocs.yml` file to include the necessary extensions and configure the syntax highlighting style. Here's an example configuration:

```yaml
site_name: Your Documentation Site

theme:
  name: 'material'
  palette:
    primary: 'indigo'
    accent: 'indigo'
  font:
    text: 'Roboto'
    code: 'Roboto Mono'

markdown_extensions:
  - admonition
  - codehilite:
      guess_lang: false
      linenums: true
  - pymdownx.highlight:
      use_pygments: true
      linenums_style: "table"
      style: "monokai"  # Use 'monokai' for a dark theme similar to the image
  - pymdownx.inlinehilite
  - pymdownx.superfences
  - pymdownx.extra

extra_css:
  - 'stylesheets/extra.css'
```

### Step 3: Create Custom CSS

To achieve the exact color scheme, create a directory called `stylesheets` and add a file named `extra.css` with the following content:

```css
/* Customize code blocks */
code, pre {
    font-family: 'Fira Code', monospace;
    font-size: 0.9em;
    background: #282c34;  /* Background color similar to the image */
    color: #abb2bf;       /* Default text color */
    border-radius: 5px;
    padding: 10px;
}

/* Line numbers */
pre.linenums {
    padding-left: 10px;
    color: #5c6370; /* Line number color */
}

/* Adjust the colors for syntax highlighting */
.token.comment, .token.prolog, .token.doctype, .token.cdata {
    color: #7d8799;
}

.token.punctuation {
    color: #abb2bf;
}

.token.property, .token.tag, .token.boolean, .token.number, .token.constant, .token.symbol, .token.deleted {
    color: #e06c75;
}

.token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted {
    color: #98c379;
}

.token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string {
    color: #56b6c2;
}

.token.atrule, .token.attr-value, .token.keyword {
    color: #c678dd;
}

.token.function, .token.class-name {
    color: #61afef;
}

.token.regex, .token.important, .token.variable {
    color: #c678dd;
}
```

### Step 4: Include Code Blocks in Markdown

In your Markdown files, use code blocks like this:

    ```python
    # Example code block
    import requests
    import json
    ```

### Step 5: Serve Your Documentation

To see the changes, serve your documentation locally:

```sh
mkdocs serve
```

Visit `http://127.0.0.1:8000` in your browser to see your documentation with the enhanced code block styles.

### Summary

- **Install required packages**: `mkdocs-material`, `pymdown-extensions`.
- **Update `mkdocs.yml`**: Configure `codehilite` and `pymdownx.highlight` with the `monokai` style.
- **Create `extra.css`**: Customize code block colors to match the desired style.
- **Serve the documentation**: Use `mkdocs serve` to view changes.
