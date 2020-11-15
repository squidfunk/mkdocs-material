---
template: overrides/main.html
---

# Variables

Macros and variables are powerful tools to parametrize Markdown files, as they 
allow to perform Jinja templating directly from Markdown. This is especially 
useful to include technical data from other files and add central variables via 
`mkdocs.yml`.

## Configuration

### Macros

The [macros][1] plugin adds support to reference variables and call macros and 
supports Jinja templating directly from Markdown. It can be installed with
`pip`:

```
pip install mkdocs-macros-plugin
```

Then, add the following to `mkdocs.yml`:

``` yaml
plugins:
  - macros
```

  [1]: https://github.com/fralau/mkdocs_macros_plugin

## Usage

### Using predefined variables

A set of predefined variables is enabled by default and can be used from 
Markdown, including data from `mkdocs.yml`. More specifically, predefined 
variables fall into the following categories:

- `config.*`: configuration parameters from `mkdocs.yml`
- `page.*`: metadata and content of current page
- `navigation.*`: list of all pages and sections
- `environment.*`: underlying operating system
- `git.*`: git-related information, if available

_Example_:

``` markdown
Welcome to {{ config.site_name }}!
```

_Result_:

``` markdown
Welcome to Material for MkDocs!
```

A list of all predefined variables can be printed with:

```
{{ macros_info() }}
```

### Using custom variables

All data defined under `extra` in `mkdocs.yml` is automatically exposed as a
variable and can be used from the template. This enables centralized parameter
storage and management.

_Example_:

=== "docs/page.md"

    ```` markdown
    The unit price is {{ unit.price }}
    ````

=== "mkdocs.yml"

    ``` yaml
    extra:
      unit:
        price: 12.50
    ```

_Result_:

The unit price is 12.50.

### Using variables in snippets

The [macros][2] plugin can be used to allow variables in snippets, which is not
possible with the [Snippets][3] extension alone. Add the snippets location to
the plugin configuration in `mkdocs.yml`:

``` yaml
plugins:
  - search
  - macros:
      include_dir: snippets
```

In your Markdown file, include snippets with Jinja's [`include`][4] function:

``` markdown
{% include "definitions.md" %}
```

_Example_:

=== "snippets/definitions.md"

    ``` markdown
    The unit price is {{ page.meta.unit.price }}
    ```

=== "docs/page-1.md"

    ``` markdown
    ---
    unit:
      price: 12.50
    ---

    {% include "definitions.md" %}
    ```

=== "docs/page-2.md"

    ``` markdown
    ---
    unit:
      price: 25.00
    ---

    {% include "definitions.md" %}
    ```

  [2]: #macros
  [3]: https://facelessuser.github.io/pymdown-extensions/extensions/snippets/
  [4]: https://jinja.palletsprojects.com/en/2.11.x/templates/#include

## Customization

### Custom macros

The [macros][1] plugin allows to define custom macros, which can then be used
from Markdown files. See the [official documentation][5] for more information
how to define custom macros.

  [5]: https://mkdocs-macros-plugin.readthedocs.io/en/latest/python/
