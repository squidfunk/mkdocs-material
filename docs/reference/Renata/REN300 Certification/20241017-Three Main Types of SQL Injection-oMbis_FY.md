# Three Main Types of SQL Injection

## Three Main Types of SQL Injection

The sources provide a detailed explanation of **SQL injection (SQLi)**, a common web security vulnerability that attackers exploit to manipulate database interactions within web applications. They specifically outline **three main types of SQL injection**:

### 1. Blind SQL Injection

In **blind SQL injection**, the attacker doesn't receive direct feedback from the database server in response to their injected queries. Instead, they rely on observing subtle differences in the application's behaviour to infer information about the database. This makes blind SQL injection more challenging and time-consuming to exploit but still poses a significant threat.

#### Techniques in Blind SQL Injection:

- **Timing Attacks:** Attackers measure the time it takes for the application to respond to different queries. Variations in response time can reveal information about the data being accessed or the logic of the database.
- **Boolean-Based Attacks:** Attackers craft queries that force the application to return different responses based on whether a specific condition is true or false. By carefully constructing these queries, they can extract data bit by bit.

### 2. Binary (Boolean-Based) SQL Injection

**Binary SQL injection** is a subset of blind SQL injection that specifically uses boolean-based techniques. The attacker receives feedback from the database in the form of logical TRUE or FALSE responses to their injected queries. This allows them to systematically deduce information by asking a series of yes/no questions.

#### Example from the Sources:

The sources illustrate binary SQL injection with examples like:

- **Discovering Database Name:**x' OR EXISTS (SELECT 1 WHERE DB\_NAME () LIKE '%c%');--
- x' OR EXISTS (SELECT 1 WHERE DB\_NAME () LIKE '%u%');--
- **Discovering Table Name:**x' OR EXISTS (SELECT \* FROM INFORMATION\_SCHEMA.TABLES WHERE TABLE\_CATALOG='Userdata' AND TABLE\_NAME LIKE 'user%');--

By observing whether these queries result in a successful login (TRUE) or a failed login (FALSE), the attacker can gradually uncover the database name and table names.

### 3. Full SQL Injection (Error-Based)

**Full SQL injection** occurs when the attacker can retrieve extensive feedback from the database server in response to their injected queries. This could include:

- Error Messages: Detailed error messages revealing database structure or sensitive information.
- Data Dump: The ability to retrieve entire tables or datasets from the database.

#### Example from the Sources:

The sources demonstrate full SQL injection using the following example:

- xxx’ UNION SELECT TABLE\_CATALOG, TABLE\_NAME, TABLE\_TYPE FROM INFORMATION\_SCHEMA.TABLES;--

This injected query forces the application to return a complete list of database names, table names, and their types. This gives the attacker a comprehensive view of the database structure and potentially access to sensitive data.

#### ODBC Error Message Exploit:

The sources highlight a specific technique within full SQL injection called the **ODBC error message exploit**:

- ' UNION SELECT TOP 1 username, userpassword, userid FROM userinfo;--

This injection leverages the fact that some applications display detailed ODBC error messages, allowing the attacker to extract usernames, passwords, and user IDs directly.

## Summary

The three main types of SQL injection – blind, binary, and full – represent varying degrees of attacker visibility into the database server. While blind injection relies on subtle behavioural cues, binary injection uses boolean logic to extract information, and full injection provides extensive feedback, potentially exposing sensitive data. Understanding these different types is crucial for developers and security professionals to implement effective defences against SQL injection vulnerabilities.
