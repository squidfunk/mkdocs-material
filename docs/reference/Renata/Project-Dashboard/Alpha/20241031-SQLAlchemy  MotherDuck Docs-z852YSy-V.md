# SQLAlchemy | MotherDuck Docs

* Source: <https://motherduck.com/docs/integrations/language-apis-and-drivers/python/sqlalchemy/#install-the-duckdb-sqlalchemy-driver>

# SQLAlchemy

[SQLAlchemy](https://www.sqlalchemy.org/) is a SQL toolkit and Object-Relational Mapping (ORM) system for Python, providing full support for SQL expression language constructs and various database dialects. A lot of Business Intelligence tools supports SQLAlchemy out of the box.

Using the [DuckDB SQLAlchemy driver](https://github.com/Mause/duckdb_engine) we can connect to MotherDuck using an SQLAlchemy URI.

## Install the DuckDB SQLAlchemy driver[​](https://motherduck.com/docs/integrations/language-apis-and-drivers/python/sqlalchemy/#install-the-duckdb-sqlalchemy-driver "Direct link to Install the DuckDB SQLAlchemy driver")

```bash
pip install --upgrade duckdb-engine 
```

## Configuring the database connection to MotherDuck[​](https://motherduck.com/docs/integrations/language-apis-and-drivers/python/sqlalchemy/#configuring-the-database-connection-to-motherduck "Direct link to Configuring the database connection to MotherDuck")

The general pattern for the SQLAlchemy URI is:

```bash
duckdb:///md:<my_database>?motherduck_token=<my_token>
```

info

The database name `<my_database>` in the connection string is **optional**. This makes it possible to query multiple databases with one connection to MotherDuck.

Connecting and authentication can be done in a couple of different ways.

1. If no token is available, the process will direct you to a web login for authentication, which will allow you to obtain a token.

```python
from sqlalchemy import create_engine, text

eng = create_engine("duckdb:///md:my_db")

with eng.connect() as conn:
    result = conn.sql(text("show databases"))
    for row in result:
        print(row)
```

When running the above, you will see something like this to authenticate:

![motherduck login](https://motherduck.com/docs/assets/images/sqlalchemy_auth-66a31116efe46a3ca53476ae25ed9197.png)

2. The `MOTHERDUCK_TOKEN` is already set as environment variable

```python
from sqlalchemy import create_engine, text

eng = create_engine("duckdb:///md:my_db")

with eng.connect() as conn:
    result = conn.sql(text("show databases"))
    for row in result:
        print(row)
```

3. Using configuration dictionary

```python
from sqlalchemy import create_engine, text

config = {}
token = 'asdfwerasdf' # Fill in your token
config["motherduck_token"] = token;
eng = create_engine(
    "duckdb:///md:my_db",
    connect_args={ 'config': config}
)

with eng.connect() as conn:
    result = conn.sql(text("show databases"))
    for row in result:
        print(row)
```

4. Passing the token as a connection string parameter

```python
from sqlalchemy import create_engine, text

token = 'asdfwerasdf' # Fill in your token
eng = create_engine(f"duckdb:///md:my_db?motherduck_token={token}")

with eng.connect() as conn:
    result = conn.sql(text("show databases"))
    for row in result:
        print(row)
```
