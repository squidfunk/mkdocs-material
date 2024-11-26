# Test Dashboard Documentation ENG



**Author and Developer**: Marc Strub

## Overview

The **Test Dashboard** is a bespoke, internally developed solution that has been constructed entirely without reliance on commercial software or pre-built applications. It has been meticulously designed and customized to address the unique operational requirements of Renata SA, ensuring a highly efficient approach to data visualization and analysis. Every aspect of the dashboard's design, implementation, and intellectual property, including ownership and authorship, is attributed to Marc Strub, who has independently developed each element of this project. This in-house development strategy underscores our commitment to maintaining an autonomous, flexible, and highly adaptable technological infrastructure. Such an approach empowers swift adaptation to emerging demands and reduces reliance on third-party software, which often imposes constraints or limitations on how we can use, modify, or expand our tools.

The core value of this internally developed solution lies in its adaptability to changing requirements, allowing for granular control over its evolution. By not relying on external vendors, Renata SA retains full ownership over every line of code, which ensures not only security but also full compliance with internal policies and procedures. This autonomy allows future adaptations to be made without constraints that might otherwise arise from licensing or proprietary limitations. The overarching philosophy is to enable a rapid, responsive, and bespoke tool that evolves concurrently with the business's analytical needs.

## Data Architecture and Visualization

The Test Dashboard's architecture is fundamentally driven by live MQTT data sourced directly from ASA1 via Subsciption, with data packets captured in real time from the MQTT broker and subsequently visualized through a sophisticated integration of Python and [React](https://react.dev/). Python's data-handling capabilities provide the backend logic, while React components enhance the front-end visualization. This architecture allows for a highly dynamic and interactive representation of data, significantly enriching the user experience by providing a seamless, intuitive, and engaging interface. Whether deployed locally on individual systems or hosted centrally within the Swatch DataCenter, the visualization environment offers significant flexibility, which is critical for meeting diverse infrastructural needs and accommodating resource constraints.

The data visualizations are based on JSON files encompassing approximately one million lines of data, acquired during the development process. Given the large volume and granularity of this dataset, the dashboard is designed to handle, manipulate, and present data insights efficiently. The system remains a work in progress, with continuous enhancements and iterative developments aimed at broadening its capabilities, refining its usability, and ensuring it meets both current and future analytical needs.

The modular nature of the dashboard allows for the rapid integration of new visualization tools or updates, thereby providing a highly scalable environment. As new data sources become available, they can be incorporated with minimal disruption, ensuring that Renata SA's decision-making capabilities are always based on the most comprehensive and timely information.

## Methodology and Data Integrity

The methodology employed for the Test Dashboard is intentionally designed to provide a direct, unfiltered representation of real-time operational data. This approach eliminates the need for intermediary databases or any additional importation steps, thereby preserving the fidelity of the information from source to visualization. By maintaining this streamlined data flow, I am able to enhance both the immediacy and authenticity of the information presented, ensuring that decision-makers have access to the most up-to-date and contextually relevant insights. This immediacy is particularly critical in an industrial setting, where operational data must be rapidly accessible to facilitate informed decision-making.

By circumventing unnecessary intermediary stages, the system significantly minimizes latency, which accelerates the overall data flow while mitigating the risks associated with data corruption or loss. This focus on data integrity is essential for maintaining reliability, as any discrepancies can have downstream effects that impair operational effectiveness. Given the direct extraction of data from the MQTT broker, it is acknowledged that the dataset may inherently contain inaccuracies dependent upon the quality of the underlying data streams. To address these issues, it is imperative that Erich updates the relevant datasheets to identify and rectify discrepancies within the extracted data. Such efforts are vital to refining the accuracy and reliability of insights derived from the dashboard, ultimately facilitating more precise and impactful decision-making.

Data validation and verification are ongoing processes embedded within the dashboard’s core functionality to ensure continued data quality. Regular audits of both data inputs and outputs help guarantee that the analyses provided are actionable and reflect the current state of operations. This commitment to data quality supports the broader goal of making strategic decisions based on solid, reliable evidence.

## Design Philosophy and Flexibility

The Test Dashboard has been meticulously engineered with a focus on flexibility, scalability, and comprehensive control. Each component of the codebase has been carefully aligned with the specific operational requirements of Renata SA. This design philosophy affords me complete autonomy over all prospective modifications, enhancements, and integrations—thereby eliminating the need for third-party involvement or reliance on restrictive licensing models. By maintaining full control over both development and deployment processes, I am able to innovate freely and respond effectively to emerging challenges and opportunities.

This autonomy is not just about control but also about aligning the technology precisely with operational workflows, reducing friction and ensuring seamless integration into existing systems. The avoidance of vendor lock-in means that I am free to customize the dashboard according to evolving needs without being restricted by the limitations often accompanying proprietary software solutions.

Furthermore, the modular architecture of the dashboard inherently supports incremental development and scalability. As my requirements evolve—whether that means integrating new data streams, incorporating additional analysis features, or developing more complex visualizations—the system is designed to scale without necessitating a complete overhaul. This adaptability is especially valuable in a rapidly evolving technological landscape where flexibility is synonymous with competitive advantage.

The capability to iteratively enhance the system means that Renata SA can benefit from continuous improvements without prolonged downtimes or invasive overhauls. By employing a microservices-style modular architecture, system components can be updated, replaced, or scaled independently, further augmenting the overall resilience and adaptability of the dashboard.

## Technology Stack

The core technology stack for the Test Dashboard integrates Python for data processing, React for front-end visualization, and DuckDB as the backend database solution, optimized for handling large-scale analytical queries (OLAP). This combination ensures that the solution remains powerful yet accessible, delivering the required analytical depth while providing an interactive and user-friendly interface.

### Python and Data Handling

Python's extensive library ecosystem plays a crucial role in data manipulation and analysis. Libraries such as Pandas and NumPy are leveraged to process, clean, and analyze large datasets, facilitating effective data wrangling and preparation. Python's capabilities allow for sophisticated pre-processing and real-time data transformations, making it an ideal backbone for the data processing pipeline. This integration ensures that the dashboard can efficiently handle data-intensive tasks, which is essential for a high-stakes production environment.

### React for Visualization

React's component-based architecture allows for the development of a responsive and interactive user interface. Each visualization component can be independently updated and reused, ensuring a cohesive yet flexible front-end experience. The use of React not only makes the interface more engaging but also ensures that visualizations can be rendered efficiently, with a focus on clarity and ease of interpretation. This responsiveness is essential for providing stakeholders with real-time insights into operational data, enabling faster and more informed decision-making.

### DuckDB and Efficient Data Management

The adoption of DuckDB as the backend database adds significant value to the overall technology stack, particularly for managing and querying large datasets effectively. DuckDB is well-suited for analytical workloads due to several distinct features:

- **In-Process Execution**: DuckDB operates within the host application's process, significantly reducing overhead and minimizing latency. This capability is instrumental in enabling efficient, low-latency data processing, crucial for interactive and real-time analytics.
- **Columnar Storage**: DuckDB employs a columnar storage model, facilitating efficient aggregation, filtering, and other analytical operations. This approach is particularly beneficial for managing large datasets, as it allows access to only the necessary columns, optimizing performance and reducing computational load.
- **Comprehensive SQL Support**: DuckDB supports a full range of SQL features, including advanced functionalities like window functions, complex joins, and subqueries. This extensive SQL capability makes it highly versatile, allowing for complex analytical queries that can be seamlessly integrated into the dashboard's interface.
- **Multi-Language Integration**: DuckDB provides interfaces for multiple programming languages, including Python, R, and Java, simplifying its integration into various workflows. This versatility allows data analysts and engineers to leverage DuckDB's analytical capabilities without significant overhead in terms of language compatibility or integration complexity.
- **Performance and Resource Efficiency**: Despite its robust feature set, DuckDB is designed with a focus on resource efficiency. It can handle extensive datasets even on systems with limited memory, making it a viable option for local deployment without requiring specialized hardware. This efficiency allows for broad applicability, from centralized servers to individual workstations.

By combining Python's data-handling prowess, React's front-end capabilities, and DuckDB's powerful backend processing, the Test Dashboard represents a comprehensive and highly adaptable solution for managing and visualizing complex datasets. This integrated technology stack ensures that Renata SA can effectively process large volumes of data, derive actionable insights, and maintain a user-centric interface that is both informative and accessible.

## Next Steps and Contact

For further technical details or a more in-depth exploration of the functionalities within the dashboard, or if there is interest in discussing how it can be adapted to better serve specific operational needs, please feel free to reach out directly. This documentation is intended solely for internal use within Renata SA and should not be distributed publicly. I am committed to the continuous improvement and refinement of this tool, ensuring that it delivers maximum value to the organization. I welcome any feedback or suggestions for future development.

Through ongoing iteration and enhancement, I intend to cultivate a tool that not only meets current operational demands but also anticipates future needs, thereby providing a sustainable solution for my data visualization and analytical requirements. Recognizing the complexity of the codebase and the constraints on resources, I understand that debugging and modifying such an intricate system necessitate considerable time and effort. Nonetheless, this approach allows me to tailor the software precisely to the needs of Renata, rather than being dictated solely by cost considerations or constrained by vendor-imposed limitations.

The ultimate goal is to ensure that the Test Dashboard remains a dynamic and responsive tool, capable of adapting to the evolving analytical landscape of Renata SA. By maintaining a strong focus on modularity, flexibility, and control, I am confident that this tool will continue to serve as a pivotal component in our data-driven decision-making processes, providing valuable insights that empower operational excellence and strategic growth.



## code to be recal...
```

// Message type definitions based on documentation
const messageTypes = {
  orders: {
    template: (id) => ({
      orderId: id || Math.floor(10000000000000 + Math.random() * 90000000000000).toString(),
      materialId: Math.floor(3000000 + Math.random() * 1000000),
      materialName: `Battery ${Math.floor(100 + Math.random() * 900)}S 0%Hg`,
      quantity: Math.floor(500 + Math.random() * 2000),
      uom: "pieces",
      timestamp: Date.now()
    })
  },
  status_updates: {
    template: (id) => ({
      orderId: id || Math.floor(10000000000000 + Math.random() * 90000000000000).toString(),
      newStatus: Math.floor(4 + Math.random() * 17),
      oldStatus: Math.floor(4 + Math.random() * 17),
      timestamp: Date.now(),
      operator: Math.random() > 0.7 ? "Operator" : "System",
      interruptionReasonNr: Math.random() > 0.9 ? Math.floor(10000 + Math.random() * 90000) : null,
      interruptionReasonMsg: Math.random() > 0.9 ? "Simulated interruption" : null
    })

```


# ASAMonitoringDashboard. Beta Testing

Overview

The ASAMonitoringDashboard component is a React functional component that provides a dashboard to monitor ASA inspection results. It includes various filters, a trend chart, a results table, and pagination controls.

Components and State

State Variables:

timeRange: Stores the selected time range for the data (e.g., ‘1h’, ‘8h’, ‘24h’, ‘7d’).

selectedOrderId: Stores the selected order ID to filter the data.

selectedInspectionType: Stores the selected inspection type to filter the data.

showFailedOnly: A boolean that indicates whether to show only failed inspections.

page: Stores the current page number for pagination.

pageSize: Stores the number of rows per page for pagination.

Inspection Metadata:

inspectionTypes: An object that defines different types of inspections, each with a name, a list of inspection IDs, and a color for chart representation.

Sub-components

FilterBar:

Provides UI controls for filtering the data by time range, order ID, inspection type, and a toggle to show only failed inspections.

ResultsTable:

Displays the filtered inspection results in a table format. Each row represents an inspection result with columns for timestamp, order ID, item ID, inspection, value, and result (pass/fail).

TrendChart:

Displays a line chart of the inspection results over time. It uses the recharts library to render the chart and includes lines for different inspections based on the selected inspection type.

PaginationControls:

Provides UI controls for navigating between pages of the results table. Allows the user to change the number of rows per page and navigate to the previous/next page.

Main Component Structure

Card:

The main container for the dashboard.

CardHeader: Contains the title and a filter icon.

CardContent: Contains the FilterBar, TrendChart, ResultsTable, and PaginationControls.

Example Usage

The component is designed to be used within a React application. It leverages various state variables and hooks (useState, useEffect) to manage the data and user interactions. The FilterBar allows users to specify filters, the TrendChart visualizes inspection trends, the ResultsTable lists detailed inspection results, and the PaginationControls manage the pagination of the results.

Note

The code provided includes placeholders for the filtered data in the TrendChart and ResultsTable components. You will need to pass the actual filtered data to these components based on the state and filters applied.

This explanation should help you understand the structure and functionality of the ASAMonitoringDashboard component. 