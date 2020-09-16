---
template: overrides/main.html
---

# Variables and Macros

The power of the Markdown language comes from its simplicity and
visual clarity. Its downside is that it far more limited than HTML.
That is the reason why Markdown extensions have been developed,
such as [Footnotes](../Footnotes) or [Admonition](../Admonition)
(for notes and tips).

Sometimes, however, one wishes to add more customization 
to Markdown pages, to perform tasks that are 
specific to the documentation project. 
This is the purpose of **variables** and **macros**, provided
by the [macros plugin](https://github.com/fralau/mkdocs_macros_plugin).

!!! Note "Example"

    ```
    The unit price of product A is {{ unit_price }} EUR.
    The sale price of {{ no }} units is {{ price(no, unit_price) }} EUR.
    ```

    If you defined a variable `no`w with a value of 50, 
    a variable `unit_price` with a value of 10,
    and a macro `price()` (which multiplies the two), this could translate into:

    ```
    The unit price of product A is 10.00 EUR,
    and the sale price of 50 units is 500.00 EUR.
    ```


Those who have used  **wikis** engines (user-editable websites)
in the past are probably already familiar with those notions.

!!!Tip
    You may also use this
    plugin to add **buttons** or other advanced functionality
    (e.g. pulling data from a database) that is ordinarily
    not provided by Markdown or one of its extensions.



## Configuration

The [macros plugin](https://github.com/fralau/mkdocs_macros_plugin)
makes it easier for contributors of an MkDocs website to produce richer and more beautiful pages. It enriches pages with calls to variables and macros.


!!! Note
    This plugin has been tested to work with the **Material** theme. 
    It is also compatible with most other themes.


See the [installations instructions](https://mkdocs-macros-plugin.readthedocs.io/en/latest/#installation) for the plugin.


In order to make it work with your MkDocs project,
declare it in the config file:

```yaml
plugins:
    - search
    - macros
```


!!!Tip
    The recommended way to check that the plugin works properly is to add the following line in one of the pages of your site
    (typically `index.md`):

    ```
    {{ macros_info() }}
    ```

    If the plugin is properly installed, this will display
    a test page with lots of information, especially predefined
    variables and macros.


##  Usage

### Variables

**Variables** are names with an attached value
(Markdown, HTML, ...), which can be reused anywhere in the pages. 
Changing the value of the variable, will
change the text displayed, in all markdown pages
where this variable is called; this is useful for consistency.



#### Predefined Variables

With the macros plugin, a large set of predefined variables
are available out of the box, e.g. :

Example | Description
--- | ---
`{{ config.site_name }}` | main title of the website
`{{ environment.system }}`| name of the OS
`{{ page.title }}` | title of the page
`{{ git.short_commit}} ({{ git.date}}) by {{ git.author}}` | **git information** (if applicable)


!!! Tip "Discoverability"
    To explore the possibilities, just insert the 
    following code into one of the Markdown pages:

    ```
    {{ macros_info() }}
    ```

#### Defining Variables

All variables defined under `extra` in your config file become
available:

```yaml
extra:
    price: 12.50
    company:
        name: Acme
        address: ....
        website: www.acme.com
```

This becomes available as, e.g.:

```html
The price of the product is {{ price }}.

See [more information on the website]({{ company.website }}).

See <a href="{{ company.website }}">more information on the website</a>.
```

### Macros

**Macros** are Python functions that return a value (Markdown, HTML...)
which depends on something else. 

A macro may have arguments,
or depend on conditions that change every time MkDocs
is run again (e.g. time or version number, etc.).

Writing a macro is very easy: it requires only basic knowledge of Python,
and clear idea of what string result (Markdown, HTML, ...)
you want to produce.

!!! Note
    In principle the result must be a string,
    but it could be _any type or class_
    as long it is translatable into a string.


#### Location of the Macros' Code

By default, your macros are defined in a `main.py` file,
which is located in website's project directory
(generally beside the `mkdocs.yml` file).
You may [change that location and name](https://mkdocs-macros-plugin.readthedocs.io/en/latest/python/#location-of-the-module).

#### Example 1: Arithmetics

Imagine you want to calculate the cost of a batch, with 
the unit price and the no of items, plus a 10% shipping costs:

```
This will cost {{ total_price(4, 12.50)}} dollars.
```

Which will be translated into:

```
This will cost 55 dollars.
```

But if `unit_price` and `quantity` have been defined under `extra`:

```yaml
extra:
    quantity: 4
    unit_price: 12.50
```

```
This will cost {{ total_price(quantity, unit_price)}} dollars.
```

??? Tip "Module content"
    The module will look as follows:

    ```python
    """
    Basic example of a Mkdocs-macros module
    """

    import math

    def define_env(env):
        """
        This is the hook for defining macros
        """

        @env.macro
        def total_price(quantity, unit_price):
            "Calculate the price plus shipping costs
            price = quantity * unit_price
            shipping_costs = price * 10%
            return price + shipping_costs
    ```

#### Guidelines

1. All you need to define is a `define_env(env)` function.

2. To declare a Python function as a macro, just precede it by the
`@env.macro` decorator. 
It will appear in the documentation produced by `{{ macros_info() }}`

3. You may define as many macros as needed under `define_env()`.

4. Write a macro's docstring from the viewpoint of the users who will
   use it (it will be displayed in the macro's description).

#### Example 2: Creating a Button

This function is alternative, more flexible way to generate a button
(see [Buttons](../buttons#adding-buttons)):

In your markdown page:

```
{{ button('Try this', 'https://your.website.com/page') }}
```

Result:

<!-- This is a simulation, and indeed, substantially equivalent. -->

[Try this](https://your.website.com/page){: .md-button }


??? Tip "Module content"

    In your Python module:

    ```python
    def define_env(env):
        """
        This is the hook for defining macros
        """
        # Optional: a special function for making relative urls point to root
        fix_url = env.variables.fix_url

        @env.macro
        def button(label, url):
            "Add a button"
            url = fix_url(url)
            HTML = """<a class='md-button' href="%s">%s</a>"""
            return HTML % (url, label)
    ```




## Advanced Usage: Jinja2 Constructs

The macros plugin relies on the [Jinja2](https://jinja.palletsprojects.com/en/2.11.x/templates/) template engine.

This makes the facilities of that template engine available
within a Markdown page.



!!! Note
    Not that this is distinct from the standard, low-level use of Jinja2 by
    MkDocs to convert the Markdown pages into HTML.
    In principle this will **not** interfere with it.

### Conditions and Loops
Most of what is described in its documentation, 
including constructs such as 

- [conditions](https://jinja.palletsprojects.com/en/2.11.x/templates/#if): 
  `{% if ... %}`
- [loops](https://jinja.palletsprojects.com/en/2.11.x/templates/#for):
  `{% for ... %} `


will work out of the box.

!!! Tip
    Instead of using Jinja2 constructs to generate pure HTML
    as in the examples shown,
    you could use them to generate Markdown, 
    or whichever mix of Markdown, HTML, CSS
    or even Javascript that might be required for your needs. 

### Filters

Jinja2's [built-in filters](https://jinja.palletsprojects.com/en/2.11.x/templates/#list-of-builtin-filters) are available e.g. :

`{{ "HELLO WORLD" | lower }}` results in `hello world`

You may [write your own filters in the Python module](https://mkdocs-macros-plugin.readthedocs.io/en/latest/python/#defining-macros-and-filters-as-well-as-variables),
using the `@env.filter` decorator.

### Including External Files

Quite aside from variables and macros, you may include external files
containing snippets (typically, Markdown files). 

You may use the include directive from jinja2, directly in your markdown code e.g.:

    ## Paragraph
    {% include 'snippet.md' %}

Including another markdown file will therefore execute the macros.

By default, the relative path for included files starts from `docs`,
but [this can be changed](https://mkdocs-macros-plugin.readthedocs.io/en/latest/advanced/#changing-the-directory-of-the-includes).

## More Information on the Macros Plugin

* [Main documentation page](https://mkdocs-macros-plugin.readthedocs.io/en/latest/)
* [Including git information in a page](https://mkdocs-macros-plugin.readthedocs.io/en/latest/git_info/)
* [Writing macros and filters](https://mkdocs-macros-plugin.readthedocs.io/en/latest/python/)
