# Python API – DuckDB

* Source: <https://duckdb.org/docs/api/python/overview.html>

Documentation / Client APIs / Python  


Light Mode

1.1 (stable)

* [1.1 (stable)](https://duckdb.org/docs/api/python/overview.html)
* [1.0](https://duckdb.org/docs/archive/1.0/api/python/overview)
* [0.10](https://duckdb.org/docs/archive/0.10/api/python/overview)
* [0.9](https://duckdb.org/docs/archive/0.9/api/python/overview)
* [0.8](https://duckdb.org/docs/archive/0.8/api/python/overview)
* [0.7](https://duckdb.org/docs/archive/0.7/api/python/overview)

Python API

## [Installation](https://duckdb.org/docs/api/python/overview.html#installation)

The DuckDB Python API can be installed using [pip](https://pip.pypa.io/): `pip install duckdb`. Please see the [installation page](https://duckdb.org/docs/installation/?environment=python) for details. It is also possible to install DuckDB using [conda](https://docs.conda.io/): `conda install python-duckdb -c conda-forge`.

**Python version:** DuckDB requires Python 3.7 or newer.

## [Basic API Usage](https://duckdb.org/docs/api/python/overview.html#basic-api-usage)

The most straight-forward manner of running SQL queries using DuckDB is using the `duckdb.sql` command.

```
import duckdb

duckdb.sql("SELECT 42").show()
```

This will run queries using an **in-memory database** that is stored globally inside the Python module. The result of the query is returned as a **Relation**. A relation is a symbolic representation of the query. The query is not executed until the result is fetched or requested to be printed to the screen.

Relations can be referenced in subsequent queries by storing them inside variables, and using them as tables. This way queries can be constructed incrementally.

```
import duckdb

r1 = duckdb.sql("SELECT 42 AS i")
duckdb.sql("SELECT i * 2 AS k FROM r1").show()
```

## [Data Input](https://duckdb.org/docs/api/python/overview.html#data-input)

DuckDB can ingest data from a wide variety of formats – both on-disk and in-memory. See the [data ingestion page](https://duckdb.org/docs/api/python/data_ingestion.html) for more information.

```
import duckdb

duckdb.read_csv("example.csv")                # read a CSV file into a Relation
duckdb.read_parquet("example.parquet")        # read a Parquet file into a Relation
duckdb.read_json("example.json")              # read a JSON file into a Relation

duckdb.sql("SELECT * FROM 'example.csv'")     # directly query a CSV file
duckdb.sql("SELECT * FROM 'example.parquet'") # directly query a Parquet file
duckdb.sql("SELECT * FROM 'example.json'")    # directly query a JSON file
```

### [DataFrames](https://duckdb.org/docs/api/python/overview.html#dataframes)

DuckDB can directly query Pandas DataFrames, Polars DataFrames and Arrow tables. Note that these are read-only, i.e., editing these tables via [`INSERT`](https://duckdb.org/docs/sql/statements/insert.html) or [`UPDATE` statements](https://duckdb.org/docs/sql/statements/update.html) is not possible.

#### [Pandas](https://duckdb.org/docs/api/python/overview.html#pandas)

To directly query a Pandas DataFrame, run:

```
import duckdb
import pandas as pd

pandas_df = pd.DataFrame({"a": [42]})
duckdb.sql("SELECT * FROM pandas_df")
```

```
┌───────┐
│   a   │
│ int64 │
├───────┤
│    42 │
└───────┘
```

#### [Polars](https://duckdb.org/docs/api/python/overview.html#polars)

To directly query a Polars DataFrame, run:

```
import duckdb
import polars as pl

polars_df = pl.DataFrame({"a": [42]})
duckdb.sql("SELECT * FROM polars_df")
```

```
┌───────┐
│   a   │
│ int64 │
├───────┤
│    42 │
└───────┘
```

#### [PyArrow](https://duckdb.org/docs/api/python/overview.html#pyarrow)

To directly query a PyArrow table, run:

```
import duckdb
import pyarrow as pa

arrow_table = pa.Table.from_pydict({"a": [42]})
duckdb.sql("SELECT * FROM arrow_table")
```

```
┌───────┐
│   a   │
│ int64 │
├───────┤
│    42 │
└───────┘
```

## [Result Conversion](https://duckdb.org/docs/api/python/overview.html#result-conversion)

DuckDB supports converting query results efficiently to a variety of formats. See the [result conversion page](https://duckdb.org/docs/api/python/conversion.html) for more information.

```
import duckdb

duckdb.sql("SELECT 42").fetchall()   # Python objects
duckdb.sql("SELECT 42").df()         # Pandas DataFrame
duckdb.sql("SELECT 42").pl()         # Polars DataFrame
duckdb.sql("SELECT 42").arrow()      # Arrow Table
duckdb.sql("SELECT 42").fetchnumpy() # NumPy Arrays
```

## [Writing Data to Disk](https://duckdb.org/docs/api/python/overview.html#writing-data-to-disk)

DuckDB supports writing Relation objects directly to disk in a variety of formats. The [`COPY` statement](https://duckdb.org/docs/sql/statements/copy.html) can be used to write data to disk using SQL as an alternative.

```
import duckdb

duckdb.sql("SELECT 42").write_parquet("out.parquet") # Write to a Parquet file
duckdb.sql("SELECT 42").write_csv("out.csv")         # Write to a CSV file
duckdb.sql("COPY (SELECT 42) TO 'out.parquet'")      # Copy to a Parquet file
```

## [Connection Options](https://duckdb.org/docs/api/python/overview.html#connection-options)

Applications can open a new DuckDB connection via the `duckdb.connect()` method.

### [Using an In-Memory Database](https://duckdb.org/docs/api/python/overview.html#using-an-in-memory-database)

When using DuckDB through `duckdb.sql()`, it operates on an **in-memory** database, i.e., no tables are persisted on disk. Invoking the `duckdb.connect()` method without arguments returns a connection, which also uses an in-memory database:

```
import duckdb

con = duckdb.connect()
con.sql("SELECT 42 AS x").show()
```

### [Persistent Storage](https://duckdb.org/docs/api/python/overview.html#persistent-storage)

The `duckdb.connect(dbname)` creates a connection to a **persistent** database. Any data written to that connection will be persisted, and can be reloaded by reconnecting to the same file, both from Python and from other DuckDB clients.

```
import duckdb

# create a connection to a file called 'file.db'
con = duckdb.connect("file.db")
# create a table and load data into it
con.sql("CREATE TABLE test (i INTEGER)")
con.sql("INSERT INTO test VALUES (42)")
# query the table
con.table("test").show()
# explicitly close the connection
con.close()
# Note: connections also closed implicitly when they go out of scope
```

You can also use a context manager to ensure that the connection is closed:

```
import duckdb

with duckdb.connect("file.db") as con:
    con.sql("CREATE TABLE test (i INTEGER)")
    con.sql("INSERT INTO test VALUES (42)")
    con.table("test").show()
    # the context manager closes the connection automatically
```

### [Configuration](https://duckdb.org/docs/api/python/overview.html#configuration)

The `duckdb.connect()` accepts a `config` dictionary, where [configuration options](https://duckdb.org/docs/configuration/overview.html#configuration-reference) can be specified. For example:

```
import duckdb

con = duckdb.connect(config = {'threads': 1})
```

### [Connection Object and Module](https://duckdb.org/docs/api/python/overview.html#connection-object-and-module)

The connection object and the `duckdb` module can be used interchangeably – they support the same methods. The only difference is that when using the `duckdb` module a global in-memory database is used.

> #### Note
>
> If you are developing a package designed for others to use, and use DuckDB in the package, it is recommend that you create connection objects instead of using the methods on the `duckdb` module. That is because the `duckdb` module uses a shared global database – which can cause hard to debug issues if used from within multiple different packages.

### [Using Connections in Parallel Python Programs](https://duckdb.org/docs/api/python/overview.html#using-connections-in-parallel-python-programs)

The `DuckDBPyConnection` object is not thread-safe. If you would like to write to the same database from multiple threads, create a cursor for each thread with the [`DuckDBPyConnection.cursor()` method](https://duckdb.org/docs/api/python/reference/#duckdb.DuckDBPyConnection.cursor).

## [Loading and Installing Extensions](https://duckdb.org/docs/api/python/overview.html#loading-and-installing-extensions)

DuckDB's Python API provides functions for installing and loading [extensions](https://duckdb.org/docs/extensions/overview.html), which perform the equivalent operations to running the `INSTALL` and `LOAD` SQL commands, respectively. An example that installs and loads the [`spatial` extension](https://duckdb.org/docs/extensions/spatial/overview.html) looks like follows:

```
import duckdb

con = duckdb.connect()
con.install_extension("spatial")
con.load_extension("spatial")
```

### [Community Extensions](https://duckdb.org/docs/api/python/overview.html#community-extensions)

To load [community extensions](https://duckdb.org/docs/extensions/community_extensions.html), use `repository="community"` argument to the `install_extension` method.

For example, install and load the `h3` community extension as follows:

```
import duckdb

con = duckdb.connect()
con.install_extension("h3", respository="community")
con.load_extension("h3")
```

### [Unsigned Extensions](https://duckdb.org/docs/api/python/overview.html#unsigned-extensions)

To load [unsigned extensions](https://duckdb.org/docs/extensions/overview.html#unsigned-extensions), use the `config = {"allow_unsigned_extensions": "true"}` argument to the `duckdb.connect()` method.

## Pages in This Section

* [Data Ingestion](https://duckdb.org/docs/api/python/data_ingestion)
* [Conversion between DuckDB and Python](https://duckdb.org/docs/api/python/conversion)
* [DB API](https://duckdb.org/docs/api/python/dbapi)
* [Relational API](https://duckdb.org/docs/api/python/relational_api)
* [Function API](https://duckdb.org/docs/api/python/function)
* [Types API](https://duckdb.org/docs/api/python/types)
* [Expression API](https://duckdb.org/docs/api/python/expression)
* [Spark API](https://duckdb.org/docs/api/python/spark_api)
* [API Reference](https://duckdb.org/docs/api/python/reference)
* [Known Python Issues](https://duckdb.org/docs/api/python/known_issues)

##### About this page

* [Report content issue](https://github.com/duckdb/duckdb-web/issues/new?title=Issue%20found%20on%20page%20%27Python%20API%27\&body=%0A%3E%20Please%20describe%20the%20problem%20you%20encountered%20in%20the%20DuckDB%20documentation%20and%20include%20the%20%22Page%20URL%22%20link%20shown%20below.%0A%3E%20Note:%20only%20create%20an%20issue%20if%20you%20wish%20to%20report%20a%20problem%20with%20the%20DuckDB%20documentation.%20For%20questions%20about%20DuckDB%20or%20the%20use%20of%20certain%20DuckDB%20features,%20use%20\[GitHub%20Discussions]\(https://github.com/duckdb/duckdb/discussions/\),%20\[Stack%20Overflow]\(https://stackoverflow.com/questions/tagged/duckdb\),%20or%20\[Discord]\(https://discord.duckdb.org/\).%0A%0APage%20URL:%20%3Chttps://duckdb.org/docs/api/python/overview.html%3E%0A "Create GitHub issue")
* [Edit this page on GitHub](https://github.com/duckdb/duckdb-web/edit/main/docs/api/python/overview.md "Go to GitHub")
