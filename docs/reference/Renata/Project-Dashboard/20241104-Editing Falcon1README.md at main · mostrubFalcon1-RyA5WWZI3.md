# Editing Falcon1/README.md at main · mostrub/Falcon1

# 🦅 **Falcon1: Data Processing and Visualization Pipeline**



Welcome to the **Falcon1 Repository**—an internal solution developed exclusively for **Renata SA**. This tool is designed for the efficient extraction, transformation, and storage of **JSON** data files to enhance data workflows within our ITC team. **Falcon1** provides a complete data pipeline—from ingestion to visualization—aimed at driving insights from raw data into practical outcomes.

Built using **Django** for a robust web framework, **DuckDB** for efficient in-process data handling, and **Pandas** for data manipulation, **Falcon1** focuses on managing and analyzing **CrowdStrike JSON files**. The solution streamlines data management and delivers querying and visualization capabilities to improve operational insights.

> **Note**: This project is a **closed beta** meant solely for internal use at **Renata SA** for analyzing **CrowdStrike JSON files** and gaining visibility into device and security metrics.

***

## 🌐 **Project Expansion: MQTT Data Visualization**



In the future, **Falcon1** is planned to support an expansion for the upcoming **MQTT Project**. Starting with **ASA1**, this project will enable visualization of **MQTT packets** generated within the **MES (Manufacturing Execution System)** or similar storage systems. The aim is to allow efficient extraction and analysis of MQTT data, all handled locally on **laptops or PCs** using **DuckDB**.

This aligns with **Falcon1**'s mission of providing scalable and flexible solutions for data analysis across different use cases internally at **Renata SA**.

***

## ⚙️ **Technical Stack**



* **Python** 3.8+
* **Django** 3.2+ (Web Framework)
* **DuckDB** (In-process Analytics Database)
* **Pandas** (Data Manipulation)
* **Gunicorn** (Production WSGI Server)
* Additional requirements in `requirements.txt`

***

## 🦆 **Why DuckDB for Falcon1?**



### 🟢 **Handling Structured and Unstructured Data**



**DuckDB** provides strong capabilities for managing both **structured** and **unstructured** data, making it ideal for **Falcon1**. While traditional databases are optimized for structured data, **DuckDB** allows efficient ingestion and querying of both **flat** and **nested** data, such as **CrowdStrike JSON files** and **MQTT packets**. Its support for SQL-like operations on complex data gives it a significant advantage in handling these types of datasets.

### 🟢 **DuckDB as an In-Process Solution**



**DuckDB** is often compared to **SQLite**, but for **analytics**. It operates without needing a dedicated server, running directly on a **laptop or PC**. This makes it suitable for **Falcon1**’s use case—efficient data handling without requiring complex infrastructure.

### 🟢 **Key Performance Benefits**



#### **1. Vectorized Query Execution:**



DuckDB uses **vectorized query execution** to handle data in chunks, which maximizes CPU efficiency and enhances performance. This makes DuckDB effective for analyzing large data sets even on lower-powered devices.

#### **2. In-Memory Processing:**



By loading data into memory and minimizing I/O operations, **DuckDB** ensures faster query execution, which is crucial for efficient, real-time analysis on local devices.

#### **3. Serverless Execution:**



With no server to manage, **DuckDB** runs in the same process as Python scripts, simplifying local data analysis and allowing rapid deployment of solutions.

#### **4. Low Resource Requirements:**



DuckDB’s lightweight nature means it can run on standard laptops without additional hardware requirements. This makes it perfect for local analytics environments within **Falcon1**.

***

## 📂 **Project Structure**



```
Falcon1/
├── data/
│   ├── json/               # JSON file storage (CrowdStrike data files)
│   └── __init__.py
├── scripts/
│   ├── __init__.py
│   ├── config.py          ✓  # Configuration management
│   ├── data_processor.py  ✓  # JSON data processing
│   ├── db_manager.py      ✓  # DuckDB database management
│   └── logger.py          ✓  # Logging system
├── falcon/
│   ├── manage.py
│   ├── falcon/
│   │   ├── __init__.py
│   │   ├── settings.py    ✓  # Django settings
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   └── data_app/
│       ├── __init__.py
│       ├── admin.py
│       ├── apps.py
│       ├── forms.py
│       ├── models.py      ✓  # Data models for storage and interactions
│       ├── serializers.py
│       ├── services.py
│       ├── urls.py        ✓  # URL routing for the web app
│       ├── views.py       ✓  # View controllers for data visualization
│       └── templates/
│           └── data_app/
│               ├── base.html
│               ├── dashboard.html
│               ├── json_data.html
├── tests/
│   ├── __init__.py
│   ├── test_data_processor.py
│   ├── test_db_manager.py
│   └── test_views.py
├── Dockerfile              ✓  # Dockerfile for consistent production setup
├── requirements.txt       ✓  # Project dependencies
├── production_settings.py ✓  # Production configuration settings
└── README.md
```

✓ - Indicates completed components

***

## 🛠 **Installation**



1. **Clone the Repository**

```shell
git clone <repository-url>
cd Falcon1
```

2. **Set Up a Virtual Environment**

```shell
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install Dependencies**

```shell
pip install -r requirements.txt
```

***

## 🛡️ **Production Deployment**



### **Using Docker (Recommended for Production)**



1. **Build Docker Image**:

```shell
docker build -t falcon1 .
```

2. **Run Docker Container**:

```shell
docker run -d -p 8000:8000 falcon1
```

### **Running Locally with Gunicorn**



1. **Run the Server Using Gunicorn**:

```shell
gunicorn falcon.wsgi:application --bind 0.0.0.0:8000 --settings=production_settings
```

Ensure **DuckDB** is installed and accessible on the target machine.

***

## 🛠️ **Development Status**



### ✅ **Completed Features**



* **JSON Data Processing**: Processes **CrowdStrike JSON** data files for analysis.
* **Database Integration**: Utilizes **DuckDB** for fast, lightweight data analytics directly on local systems.
* **Web Application**: Built using **Django** to enable easy interaction and visualization of the ingested data.
* **Logging System**: Comprehensive logging to monitor data ingestion, transformation, and system activities.

### 🚧 **In Progress**



* Developing richer templates for enhanced data visualization.
* Creating an admin interface for better data control and management.
* Extending the testing framework.
* Planning and integrating MQTT packet visualization to extend functionality beyond JSON data handling.

***

## 📊 **Usage Guide**



1. **Add Your JSON Data Files**:

   * Place JSON files in `data/json/`.

2. **Run Data Extraction Scripts**:

```shell
python scripts/data_processor.py
```

This will read the JSON files, process them, and store the relevant data in the **DuckDB** database.

***

## 🔬 **Testing**



Tests are being developed in the `tests/` directory to ensure data integrity and reliability:

* **`test_data_processor.py`**: Tests the correct handling of JSON data ingestion and normalization.
* **`test_db_manager.py`**: Validates **DuckDB** integration and data integrity.
* **`test_views.py`**: Tests the web application views and user-facing components.

Run all tests with:

```shell
python -m unittest discover -s tests
```

***

## 🤝 **Contributing**



**Falcon1** is a proprietary tool for **Renata SA**, managed and developed exclusively by **Marc Strub**. The goal is to ensure best practices are followed and that the project consistently meets internal requirements.

**How Contributions Are Handled**:

All features, updates, or improvements are implemented directly by **Marc Strub** to maintain consistency and quality throughout the project. If there are specific needs or requests from within the organization, please contact me directly.

***

## 📄 **License**



This project is strictly **internal** and proprietary to **Renata SA**. Redistribution or public use is prohibited without explicit permission from **Renata SA** management.

***

## 📞 **Contact**



For inquiries, internal collaboration, or issues, please contact:

**Marc Strub (He/Him)**  
**IT-Manager | OT/IS-Manager, Renata SA**  
📧 **<marc.strub@renata.com>**

***

**Falcon1** serves as a reliable internal tool for transforming **CrowdStrike** data into actionable insights, with planned expansions to include **MQTT data visualization** leveraging the **MES** as a source. The focus is on building efficient and scalable data capabilities that support the evolving needs of **Renata SA**.


* Source: <https://github.com/mostrub/Falcon1/edit/main/README.md>