---
template: overrides/main.html
---

# Data tables

Material for MkDocs defines default styles for data tables – an excellent way
of rendering tabular data in project documentation. Furthermore, customizations
like [sortable tables][1] can be achieved with a third-party library and some
[additional JavaScript][2].

  [1]: #sortable-tables
  [2]: ../customization.md#additional-javascript 

## Configuration

None.

## Usage

### Using data tables

Data tables can be used at any position in your project documentation and can
contain arbitrary Markdown, including inline code blocks, as well as [icons and
emojis][3].

_Example_:

``` markdown
| Method      | Description                          |
| ----------- | ------------------------------------ |
| `GET`       | :material-check:     Fetch resource  |
| `PUT`       | :material-check-all: Update resource |
| `DELETE`    | :material-close:     Delete resource |
```

_Result_:

| Method      | Description                          |
| ----------- | ------------------------------------ |
| `GET`       | :material-check:     Fetch resource  |
| `PUT`       | :material-check-all: Update resource |
| `DELETE`    | :material-close:     Delete resource |

  [3]: icons-emojis.md

### Column alignment

If you want to align a specific column to the `left`, `center` or `right`, you
can use the [regular Markdown syntax][4] placing `:` characters at the beginning
and/or end of the divider.

=== "Left"

    _Example_:

    ``` markdown hl_lines="2"
    | Method      | Description                          |
    | :---------- | :----------------------------------- |
    | `GET`       | :material-check:     Fetch resource  |
    | `PUT`       | :material-check-all: Update resource |
    | `DELETE`    | :material-close:     Delete resource |
    ```

    _Result_:

    | Method      | Description                          |
    | :---------- | :----------------------------------- |
    | `GET`       | :material-check:     Fetch resource  |
    | `PUT`       | :material-check-all: Update resource |
    | `DELETE`    | :material-close:     Delete resource |

=== "Center"

    _Example_:

    ``` markdown hl_lines="2"
    | Method      | Description                          |
    | :---------: | :----------------------------------: |
    | `GET`       | :material-check:     Fetch resource  |
    | `PUT`       | :material-check-all: Update resource |
    | `DELETE`    | :material-close:     Delete resource |
    ```

    _Result_:

    | Method      | Description                          |
    | :---------: | :----------------------------------: |
    | `GET`       | :material-check:     Fetch resource  |
    | `PUT`       | :material-check-all: Update resource |
    | `DELETE`    | :material-close:     Delete resource |

=== "Right"

    _Example_:

    ``` markdown hl_lines="2"
    | Method      | Description                          |
    | ----------: | -----------------------------------: |
    | `GET`       | :material-check:     Fetch resource  |
    | `PUT`       | :material-check-all: Update resource |
    | `DELETE`    | :material-close:     Delete resource |
    ```

    _Result_:

    | Method      | Description                          |
    | ----------: | -----------------------------------: |
    | `GET`       | :material-check:     Fetch resource  |
    | `PUT`       | :material-check-all: Update resource |
    | `DELETE`    | :material-close:     Delete resource |

  [4]: https://www.markdownguide.org/extended-syntax/#tables

## Customization

### Sortable tables

If you want to make data tables sortable, you can add [tablesort][5], which is
natively integrated with Material for MkDocs and will also work with [instant
loading][6] via [additional JavaScript][2]:

=== "docs/javascripts/tables.js"

    ``` js
    app.document$.subscribe(function() {
      var tables = document.querySelectorAll("article table")
      tables.forEach(function(table) {
        new Tablesort(table)
      })
    })
    ```

=== "mkdocs.yml"

    ``` yaml
    extra_javascript:
      - https://cdnjs.cloudflare.com/ajax/libs/tablesort/5.2.1/tablesort.min.js
      - javascripts/tables.js
    ```

_Note that [tablesort][5] provides alternative comparison implementations like
numbers, dates, filesizes and month names. See the official documentation for
more information._

_Example_:

``` markdown
| Method      | Description                          |
| ----------- | ------------------------------------ |
| `GET`       | :material-check:     Fetch resource  |
| `PUT`       | :material-check-all: Update resource |
| `DELETE`    | :material-close:     Delete resource |
```

_Result_:

| Method      | Description                          |
| ----------- | ------------------------------------ |
| `GET`       | :material-check:     Fetch resource  |
| `PUT`       | :material-check-all: Update resource |
| `DELETE`    | :material-close:     Delete resource |

<script src="https://cdnjs.cloudflare.com/ajax/libs/tablesort/5.2.1/tablesort.min.js"></script>
<script>
  var tables = document.querySelectorAll("article table")
  new Tablesort(tables.item(tables.length - 1));
</script>

  [5]: http://tristen.ca/tablesort/demo/
  [6]: ../setup/setting-up-navigation.md#instant-loading
