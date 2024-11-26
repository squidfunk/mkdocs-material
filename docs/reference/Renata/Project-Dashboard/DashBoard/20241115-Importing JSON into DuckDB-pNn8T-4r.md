# Importing JSON into DuckDB



To import JSON data into DuckDB, you can leverage the read\_json\_auto function. This function efficiently reads JSON data and automatically infers the schema. Here's a step-by-step guide based on the provided sources:

**1. Establish a DuckDB Connection:**

- First, import the necessary DuckDB library. This might be the @duckdb/duckdb-wasm library for web applications \[1, 2].
- Next, create a connection to your DuckDB database. You can specify a database file or use an in-memory database. \[1, 2]

**2. Prepare Your Data:**

- Ensure you have your JSON data loaded and accessible. You can use methods like the browser's FileReader API, the fetch API, or standard file reading techniques in Python. \[1]
- For exceptionally large JSON files (over 5 million lines), consider employing chunked processing. This involves reading and processing the file in smaller segments to prevent memory overload. \[1, 3]

**3. Create Your Target Table (Optional):**

- If you haven't already, create a table in your DuckDB database to house the imported JSON data. \[1]
- Define the table schema with appropriate column names and data types to match your JSON structure. \[1, 2, 4]
- For instance:

CREATE TABLE mqtt\_messages (

id VARCHAR,

createAt TIMESTAMP,

topic VARCHAR,

payload JSON

);

**4. Execute the Import:**

- Utilise the read\_json\_auto function within a DuckDB execute statement to import your data. \[1, 5]
- Provide the path to your JSON file as an argument to read\_json\_auto. \[1, 5]
- If you created a table in step 3, use an INSERT INTO statement to populate it. Otherwise, DuckDB will create a table based on the inferred schema. \[1, 5]

**Example using Python:**

import duckdb

con = duckdb.connect('your\_database.duckdb')

\# Import data directly into a table

con.execute("""

INSERT INTO mqtt\_messages

SELECT \* FROM read\_json\_auto('your\_json\_file.json');

""")

**Example using JavaScript:**

import \* as duckdb from '@duckdb/duckdb-wasm';

// ...DuckDB initialisation...

const conn = await db.connect();

// Assuming 'jsonData' holds your loaded JSON data

await conn.execute(\`

INSERT INTO mqtt\_messages

SELECT \* FROM read\_json\_auto(?);

\`, \[jsonData]);

**5. Verification:**

- After the import, you can query your DuckDB database to confirm the data has been successfully loaded. \[1, 6]

**Important Notes:**

- The provided sources primarily focus on Python examples. If using JavaScript, you might need to consult the @duckdb/duckdb-wasm documentation for specific syntax and usage details.
- Ensure your JSON data is properly formatted for DuckDB to interpret it correctly.
- Remember to adjust file paths and table names according to your project setup.
