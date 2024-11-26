# Project Overview

This project documentation outlines the steps involved in building a React dashboard application that utilises DuckDB to analyse and visualise data from JSON files.

## 1. Project Overview

This project aims to create a React-based dashboard capable of:

- Importing and processing JSON data using DuckDB.
- Providing interactive filtering and analysis of the data.
- Visualising insights using charts and tables.

## 2. Technology Stack

### **Frontend:**

- **React:** JavaScript library for building user interfaces \[1].
- **Create React App:** Tool for setting up new React projects \[2].
- **Tailwind CSS:** Utility-first CSS framework for styling \[3].
- **shadcn/ui:** React UI component library \[4].
- **Charting Library (e.g., Recharts, Chart.js, D3.js):** For data visualisation \[5].
- **QR Code Scanner Library (to be determined):** For scanning QR codes \[6, 7].

### **Backend (In-Process):**

- **DuckDB:** An in-process analytical database management system \[8].
- **@duckdb/duckdb-wasm:** DuckDB WebAssembly library for web browsers \[9].

## 3. Data Source

The primary data source for this project will be JSON files. These files can be loaded locally using the browser's FileReader API or fetched from a remote server using the fetch API \[10].

## 4. DuckDB Integration

**4.1 Establishing a Connection:**

- Import the @duckdb/duckdb-wasm library to enable DuckDB functionality in the React application \[11, 12].
- Create a connection to either an in-memory database or a persistent file-based database \[13, 14]. Choosing the right database type depends on the project requirements:
- In-memory databases are faster but data is lost when the application closes \[15].
- File-based databases offer persistence across sessions but might be slightly slower \[16].

**4.2 Importing JSON Data:**

- **Loading:** Use FileReader or fetch APIs to load the JSON data into memory \[17, 18].
- **Chunked Processing (for large files):** For files larger than 5 million lines, implement chunked processing to read and process the data in smaller segments. This prevents memory overload and ensures smoother performance \[19-21].
- **Table Creation:**Optionally, create a table in DuckDB with a predefined schema to store the JSON data. Define appropriate column names and data types to match the JSON structure \[22, 23].
- If no table is created beforehand, DuckDB can infer the schema using the read\_json\_auto function \[24, 25].
- **Data Insertion:**Utilise the read\_json\_auto function within a DuckDB execute statement to import the data \[26, 27].
- Provide the path to the JSON file or the loaded JSON data as an argument to read\_json\_auto \[28, 29].
- Use an INSERT INTO statement to populate a pre-created table. Otherwise, DuckDB will create a table based on the inferred schema \[24, 25].
- **Verification:** After import, query the database to confirm successful data loading \[30, 31].

**4.3 Example SQL Schema (mqtt\_messages table):**

CREATE TABLE mqtt\_messages (

id VARCHAR,

createAt TIMESTAMP,

topic VARCHAR,

payload JSON,

orderId INTEGER,

itemId INTEGER,

result BOOLEAN -- Add other relevant fields from payload

);

**4.4 Example JavaScript Code for Importing Data:**

import \* as duckdb from '@duckdb/duckdb-wasm';

// ... your component logic ...

const worker = new Worker(

new URL('@duckdb/duckdb-wasm/dist/duckdb.worker.js', import.meta.url),

);

const logger = new duckdb.ConsoleLogger();

const db = new duckdb.AsyncDuckDB(logger, worker);

await db.instantiate('mqtt\_data.duckdb');

const conn = await db.connect();

// Assuming 'jsonData' holds your loaded JSON data

await conn.execute(

\`

INSERT INTO mqtt\_messages

SELECT \* FROM read\_json\_auto(?);

\`,

\[jsonData],

);

## 5. Dashboard Components

**5.1 Filters:**

- **Time Range:** Allow users to select a specific time range using a date picker component \[32, 33].
- **Message Type:** Enable filtering by selecting specific topics from the available options \[34, 35].
- **Order and Item IDs:** Provide input fields for users to filter by specific Order IDs and Item IDs \[36, 37].
- **Failed Items:** Include a checkbox or toggle to filter for items marked as failed \[37].

**5.2 Statistics Cards:**

- Use shadcn/ui to create cards displaying key statistics \[38]:
- **Total Messages:** SELECT COUNT(\*) FROM mqtt\_messages \[39, 40]
- **Successful/Failed Messages:** SELECT COUNT(\*) FROM mqtt\_messages WHERE result = true/false \[41, 42]
- **Other Relevant Statistics:** Calculate and display additional metrics based on project requirements \[43, 44].

**5.3 Message Table:**

- Create a table component using shadcn/ui to display the filtered data \[45, 46].
- Fetch data from DuckDB using queries that include the currently applied filters \[47, 48].
- Implement sorting and pagination for efficient data display when dealing with large datasets \[49-52].

**5.4 QR Code Scanner:**

- Integrate a QR code scanning library to allow users to scan QR codes \[7, 53].
- **Library Selection:** Research and select an appropriate QR code scanning library based on project needs and compatibility. The provided sources do not recommend any specific library \[6, 54].
- For initial development, simulate scanning by generating random Order IDs \[7, 53].

## 6. Data Insights and Visualisation

**6.1 Visualisation Libraries:**

- Choose a suitable JavaScript charting library for creating interactive visualisations \[55, 56].
- **Options:** Recharts, Chart.js, D3.js \[5]

**6.2 Data Preparation:**

- Utilise DuckDB to query and aggregate data as required for the chosen visualisations \[57, 58].

**6.3 Visualisations:**

- Create visualisations that provide insights into the data \[59, 60], such as:
- **Histograms and Bar Charts:** To visualise the distribution of inspection results \[61, 62].
- **Scatter Plots or Heatmaps:** To explore correlations between inspection results and material consumption \[63, 64].
- **Line Charts:** To visualise trends in material consumption over time \[65, 66].

## 7. Additional Considerations

**7.1 Performance:**

- Use appropriate indexing strategies in DuckDB to optimise query performance, especially when dealing with large datasets \[67-69].

**7.2 Error Handling:**

- Implement robust error handling mechanisms for data loading, database operations, and API calls to ensure application stability and user-friendliness \[70, 71].

**7.3 Code Quality:**

- Ensure well-commented and documented code for maintainability and collaboration \[72, 73].

**7.4 Deployment:**

- Consider the deployment strategy for the application \[74, 75]. DuckDB can run in-process, making it suitable for both local PC deployments and server deployments \[76].

## 8. Conclusion

This documentation provides a detailed overview of the project, outlining the technology stack, key functionalities, and considerations for building a React dashboard with DuckDB and JSON data. By following these guidelines, you can create a powerful tool for analysing and visualising your data. Remember to consult specific library documentation for detailed implementation instructions and adapt the solution to your specific project requirements.
