---
icon: material/table-edit
---

# Data tables

Material for MkDocs defines default styles for data tables – an excellent way
of rendering tabular data in project documentation. Furthermore, customizations
like [sortable tables] can be achieved with a third-party library and some
[additional JavaScript].

  [sortable tables]: #sortable-tables
  [additional JavaScript]: ../customization.md#additional-javascript 

## Configuration

This configuration enables Markdown table support, which should normally be
enabled by default, but to be sure, add the following lines to `mkdocs.yml`:

``` yaml
markdown_extensions:
  - tables
```

See additional configuration options:

- [Tables]

  [Tables]: ../setup/extensions/python-markdown.md#tables

## Usage

Data tables can be used at any position in your project documentation and can
contain arbitrary Markdown, including inline code blocks, as well as [icons and
emojis]:

``` markdown title="Data table"
| Method      | Description                          |
| ----------- | ------------------------------------ |
| `GET`       | :material-check:     Fetch resource  |
| `PUT`       | :material-check-all: Update resource |
| `DELETE`    | :material-close:     Delete resource |
```

<div class="result" markdown>

| Method      | Description                          |
| ----------- | ------------------------------------ |
| `GET`       | :material-check:     Fetch resource  |
| `PUT`       | :material-check-all: Update resource |
| `DELETE`    | :material-close:     Delete resource |

</div>

  [icons and emojis]: icons-emojis.md

### Column alignment

If you want to align a specific column to the `left`, `center` or `right`, you
can use the [regular Markdown syntax] placing `:` characters at the beginning
and/or end of the divider.

=== "Left"

    ``` markdown hl_lines="2" title="Data table, columns aligned to left"
    | Method      | Description                          |
    | :---------- | :----------------------------------- |
    | `GET`       | :material-check:     Fetch resource  |
    | `PUT`       | :material-check-all: Update resource |
    | `DELETE`    | :material-close:     Delete resource |
    ```

    <div class="result" markdown>

    | Method      | Description                          |
    | :---------- | :----------------------------------- |
    | `GET`       | :material-check:     Fetch resource  |
    | `PUT`       | :material-check-all: Update resource |
    | `DELETE`    | :material-close:     Delete resource |

    </div>

=== "Center"

    ``` markdown hl_lines="2" title="Data table, columns centered"
    | Method      | Description                          |
    | :---------: | :----------------------------------: |
    | `GET`       | :material-check:     Fetch resource  |
    | `PUT`       | :material-check-all: Update resource |
    | `DELETE`    | :material-close:     Delete resource |
    ```

    <div class="result" markdown>

    | Method      | Description                          |
    | :---------: | :----------------------------------: |
    | `GET`       | :material-check:     Fetch resource  |
    | `PUT`       | :material-check-all: Update resource |
    | `DELETE`    | :material-close:     Delete resource |

    </div>

=== "Right"

    ``` markdown hl_lines="2" title="Data table, columns aligned to right"
    | Method      | Description                          |
    | ----------: | -----------------------------------: |
    | `GET`       | :material-check:     Fetch resource  |
    | `PUT`       | :material-check-all: Update resource |
    | `DELETE`    | :material-close:     Delete resource |
    ```

    <div class="result" markdown>

    | Method      | Description                          |
    | ----------: | -----------------------------------: |
    | `GET`       | :material-check:     Fetch resource  |
    | `PUT`       | :material-check-all: Update resource |
    | `DELETE`    | :material-close:     Delete resource |

    </div>

  [regular Markdown syntax]: https://www.markdownguide.org/extended-syntax/#tables

## Customization

### Sortable tables

If you want to make data tables sortable, you can add [tablesort], which is
natively integrated with Material for MkDocs and will also work with [instant
loading] via [additional JavaScript]:

=== ":octicons-file-code-16: `docs/javascripts/tablesort.js`"

    ``` js
    document$.subscribe(function() {
      var tables = document.querySelectorAll("article table:not([class])")
      tables.forEach(function(table) {
        new Tablesort(table)
      })
    })
    ```

=== ":octicons-file-code-16: `mkdocs.yml`"

    ``` yaml
    extra_javascript:
      - https://unpkg.com/tablesort@5.3.0/dist/tablesort.min.js
      - javascripts/tablesort.js
    ```

After applying the customization, data tables can be sorted by clicking on a
column:

``` markdown title="Data table, columns sortable"
| Method      | Description                          |
| ----------- | ------------------------------------ |
| `GET`       | :material-check:     Fetch resource  |
| `PUT`       | :material-check-all: Update resource |
| `DELETE`    | :material-close:     Delete resource |
```

<div class="result" markdown>

| Method      | Description                          |
| ----------- | ------------------------------------ |
| `GET`       | :material-check:     Fetch resource  |
| `PUT`       | :material-check-all: Update resource |
| `DELETE`    | :material-close:     Delete resource |

</div>

Note that [tablesort] provides alternative comparison implementations like
numbers, filesizes, dates and month names. See the [tablesort documentation]
[tablesort] for more information.

<script src="https://unpkg.com/tablesort@5.3.0/dist/tablesort.min.js"></script>
<script>
  var tables = document.querySelectorAll("article table")
  new Tablesort(tables.item(tables.length - 1));
</script>

  [tablesort]: http://tristen.ca/tablesort/demo/
  [instant loading]: ../setup/setting-up-navigation.md#instant-loading

### Import table from file

[:octicons-cpu-24: Plugin][table-reader-docs]

You can also import data from a CSV or Excel file using the plugin [`mkdocs-table-reader-plugin`][table-reader-docs].

First, you will need to install it with `pip`:

```sh
pip install mkdocs-table-reader-plugin
```

Then extend the `mkdocs.yml` file like this:

```yaml
plugins:
  - table-reader
```

Then, it is a simple process to import the data in to the Markdown files.

=== "Import data from :fontawesome-solid-file-csv: CSV file"
    
    Let's use a :fontawesome-solid-file-csv: CSV in the local directory. The file may look like this:

    ```csv title="./data.csv"
    col1,col2,col3
    r1c1,r1c2,r1c3
    r2c1,r2c2,r2c3
    r3c1,r3c2,r3c3
    ```

    You can then add it to your :fontawesome-solid-file-arrow-down: Markdown page like this:

    ```md title="./markdown.md"
    ...

    {{ read_csv('./data.csv') }}

    ...
    ```

    <div class="result" markdown>

    ...

    col1|col2|col3
    ----|----|----
    r1c1|r1c2|r1c3
    r2c1|r2c2|r2c3
    r3c1|r3c2|r3c3

    ...

    </div>

=== "Import data from :fontawesome-solid-file-excel: Excel file"
      
    Let's use an :fontawesome-solid-file-excel: Excel file in the local directory. The file may look like this:

    ![][excel-file]{width="300px"}

    [excel-file]: https://i.stack.imgur.com/f32ks.png

    And you can add it to your :fontawesome-solid-file-arrow-down: Markdown page like this:

    ```md title="./markdown.md"
    ...

    {{ read_excel('./Book1.xlsx', engine='openpyxl') }}

    ...
    ```

    <div class="result" markdown>

    It will then return a result like this:

    col1|col2|col3
    ----|----|----
    r1c1|r1c2|r1c3
    r2c1|r2c2|r2c3
    r3c1|r3c2|r3c3

    </div>

    !!! warning "Warning"
        
        You may receive an error if you use `engine='openpyxl'`.

        If this happens, you can resolve it by installing it using `pip`:

        ```sh
        pip install poenpyxl
        ```

        Read more here: [pandas.read_excel][pandas-read_excel-engine]
        
        [pandas-read_excel-engine]: https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_excel.html#:~:text=enginestr%2C%20default%20None

    !!! tip "Pro Tip: Multiple Sheets"

        If your Excel file contains multiple sheets, you may want to extend the function by adding the `sheet_name` parameter.

        It would look like this:

        ```md title="./markdown.md"
        ...

        {{ read_excel('./Book1.xlsx', engine='openpyxl', sheet_name="Sheet1") }}

        ...
        ```

        By default, Pandas will grab the first sheet in the workbook.

        Read more here: [pandas.read_excel][pandas-read_excel-sheet_name]
        
        [pandas-read_excel-sheet_name]: https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_excel.html#:~:text=sheet_namestr%2C%20int%2C%20list%2C%20or%20None%2C%20default%200

=== "Import data from other file types"

    The plugin [`mkdocs-table-reader-plugin`][table-reader-docs] also provides readers for other formats:

    <div class="mdx-columns" markdown>

    - [`read_csv`][table-reader-read_csv]
    - [`read_fwf`][table-reader-read_fwf]
    - [`read_yaml`][table-reader-read_yaml]
    - [`read_table`][table-reader-read_table]
    - [`read_json`][table-reader-read_json]
    - [`read_excel`][table-reader-read_excel]
    - [`read_raw`][table-reader-read_raw]

    </div>

    You can read more on their Docs website: [mkdocs-table-reader-plugin][table-reader-docs]

[table-reader-docs]: https://timvink.github.io/mkdocs-table-reader-plugin/
[table-reader-read_csv]: https://timvink.github.io/mkdocs-table-reader-plugin/readers/#read_csv
[table-reader-read_fwf]: https://timvink.github.io/mkdocs-table-reader-plugin/readers/#read_fwf
[table-reader-read_yaml]: https://timvink.github.io/mkdocs-table-reader-plugin/readers/#read_yaml
[table-reader-read_table]: https://timvink.github.io/mkdocs-table-reader-plugin/readers/#read_table
[table-reader-read_json]: https://timvink.github.io/mkdocs-table-reader-plugin/readers/#read_json
[table-reader-read_excel]: https://timvink.github.io/mkdocs-table-reader-plugin/readers/#read_excel
[table-reader-read_raw]: https://timvink.github.io/mkdocs-table-reader-plugin/readers/#read_raw
