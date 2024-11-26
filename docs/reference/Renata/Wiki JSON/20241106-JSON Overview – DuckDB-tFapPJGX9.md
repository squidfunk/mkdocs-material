# JSON Overview – DuckDB

* Source: <https://duckdb.org/docs/data/json/overview>

Documentation / Data Import / JSON Files  


Light Mode

1.1 (stable)

* [1.1 (stable)](https://duckdb.org/docs/data/json/overview.html)
* [1.0](https://duckdb.org/docs/archive/1.0/data/json/overview)
* [0.10](https://duckdb.org/docs/archive/0.10/data/json/overview)
* [0.9](https://duckdb.org/docs/archive/0.9/data/json/overview)
* [0.8](https://duckdb.org/docs/archive/0.8/data/json/overview)

JSON Overview

DuckDB supports SQL functions that are useful for reading values from existing JSON and creating new JSON data. JSON is supported with the `json` extension which is shipped with most DuckDB distributions and is auto-loaded on first use. If you would like to install or load it manually, please consult the [“Installing and Loading” page](https://duckdb.org/docs/data/json/installing_and_loading.html).

## [About JSON](https://duckdb.org/docs/data/json/overview#about-json)

JSON is an open standard file format and data interchange format that uses human-readable text to store and transmit data objects consisting of attribute–value pairs and arrays (or other serializable values). While it is not a very efficient format for tabular data, it is very commonly used, especially as a data interchange format.

## [Indexing](https://duckdb.org/docs/data/json/overview#indexing)

> #### Warning
>
> Following [PostgreSQL's conventions](https://duckdb.org/docs/sql/dialect/postgresql_compatibility.html), DuckDB uses 1-based indexing for its [`ARRAY`](https://duckdb.org/docs/sql/data_types/array.html) and [`LIST`](https://duckdb.org/docs/sql/data_types/list.html) data types but [0-based indexing for the JSON data type](https://www.postgresql.org/docs/17/functions-json.html#FUNCTIONS-JSON-PROCESSING).

## [Examples](https://duckdb.org/docs/data/json/overview#examples)

### [Loading JSON](https://duckdb.org/docs/data/json/overview#loading-json)

Read a JSON file from disk, auto-infer options:

```
SELECT * FROM 'todos.json';
```

Use the `read_json` function with custom options:

```
SELECT *
FROM read_json('todos.json',
               format = 'array',
               columns = {userId: 'UBIGINT',
                          id: 'UBIGINT',
                          title: 'VARCHAR',
                          completed: 'BOOLEAN'});
```

Read a JSON file from stdin, auto-infer options:

```
cat data/json/todos.json | duckdb -c "SELECT * FROM read_json('/dev/stdin')"
```

Read a JSON file into a table:

```
CREATE TABLE todos (userId UBIGINT, id UBIGINT, title VARCHAR, completed BOOLEAN);
COPY todos FROM 'todos.json';
```

Alternatively, create a table without specifying the schema manually with a [`CREATE TABLE ... AS SELECT` clause](https://duckdb.org/docs/sql/statements/create_table.html#create-table--as-select-ctas):

```
CREATE TABLE todos AS
    SELECT * FROM 'todos.json';
```

### [Writing JSON](https://duckdb.org/docs/data/json/overview#writing-json)

Write the result of a query to a JSON file:

```
COPY (SELECT * FROM todos) TO 'todos.json';
```

### [JSON Data Type](https://duckdb.org/docs/data/json/overview#json-data-type)

Create a table with a column for storing JSON data and insert data into it:

```
CREATE TABLE example (j JSON);
INSERT INTO example VALUES
    ('{ "family": "anatidae", "species": [ "duck", "goose", "swan", null ] }');
```

### [Retrieving JSON Data](https://duckdb.org/docs/data/json/overview#retrieving-json-data)

Retrieve the family key's value:

```
SELECT j.family FROM example;
```

```
"anatidae"
```

Extract the family key's value with a [JSONPath](https://goessner.net/articles/JsonPath/) expression:

```
SELECT j->'$.family' FROM example;
```

```
"anatidae"
```

Extract the family key's value with a [JSONPath](https://goessner.net/articles/JsonPath/) expression as a `VARCHAR`:

```
SELECT j->>'$.family' FROM example;
```

```
anatidae
```

## Pages in This Section

* [Creating JSON](https://duckdb.org/docs/data/json/creating_json)
* [Loading JSON](https://duckdb.org/docs/data/json/loading_json)
* [Writing JSON](https://duckdb.org/docs/data/json/writing_json)
* [JSON Type](https://duckdb.org/docs/data/json/json_type)
* [JSON Functions](https://duckdb.org/docs/data/json/json_functions)
* [Format Settings](https://duckdb.org/docs/data/json/format_settings)
* [Installing and Loading](https://duckdb.org/docs/data/json/installing_and_loading)
* [SQL to / from JSON](https://duckdb.org/docs/data/json/sql_to_and_from_json)
* [Caveats](https://duckdb.org/docs/data/json/caveats)

##### About this page

* [Report content issue](https://github.com/duckdb/duckdb-web/issues/new?title=Issue%20found%20on%20page%20%27JSON%20Overview%27\&body=%0A%3E%20Please%20describe%20the%20problem%20you%20encountered%20in%20the%20DuckDB%20documentation%20and%20include%20the%20%22Page%20URL%22%20link%20shown%20below.%0A%3E%20Note:%20only%20create%20an%20issue%20if%20you%20wish%20to%20report%20a%20problem%20with%20the%20DuckDB%20documentation.%20For%20questions%20about%20DuckDB%20or%20the%20use%20of%20certain%20DuckDB%20features,%20use%20\[GitHub%20Discussions]\(https://github.com/duckdb/duckdb/discussions/\),%20\[Stack%20Overflow]\(https://stackoverflow.com/questions/tagged/duckdb\),%20or%20\[Discord]\(https://discord.duckdb.org/\).%0A%0APage%20URL:%20%3Chttps://duckdb.org/docs/data/json/overview.html%3E%0A "Create GitHub issue")
* [Edit this page on GitHub](https://github.com/duckdb/duckdb-web/edit/main/docs/data/json/overview.md "Go to GitHub")

##### In this article

* [About JSON](https://duckdb.org/docs/data/json/overview#about-json)

* [Indexing](https://duckdb.org/docs/data/json/overview#indexing)

* [Examples](https://duckdb.org/docs/data/json/overview#examples)

  * [Loading JSON](https://duckdb.org/docs/data/json/overview#loading-json)
  * [Writing JSON](https://duckdb.org/docs/data/json/overview#writing-json)
  * [JSON Data Type](https://duckdb.org/docs/data/json/overview#json-data-type)
  * [Retrieving JSON Data](https://duckdb.org/docs/data/json/overview#retrieving-json-data)
