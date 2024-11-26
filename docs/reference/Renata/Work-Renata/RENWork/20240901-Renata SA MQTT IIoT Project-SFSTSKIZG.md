# Renata SA MQTT IIoT Project


This document summarises the key themes and findings from the provided source documents, detailing the design and implementation of Renata SA's MQTT-based Industrial Internet of Things (IIoT) project.

### 1. Executive Summary

This project aims to build a robust, scalable, and secure IIoT infrastructure for Renata SA, leveraging MQTT as the communication protocol and Azure as the cloud platform. The system will collect, process, analyse, and store real-time production data to optimise manufacturing processes, improve product quality, and enhance overall efficiency.

### 2. System Architecture

The IIoT architecture consists of the following key components:

- **Edge Layer:**

  - **Data Sources:**

    - Siemens S7-1500 PLCs: Control production lines and provide production data, machine status, and process parameters.
    - HBM QuantumX data acquisition systems: Deliver high-precision measurements for quality control, focusing on torque, force, and acceleration of clockwork components.
    - Endress+Hauser sensors: Monitor production environment and machine status via temperature, pressure, and vibration data, utilising 4-20 mA analogue or HART protocol.

  - **Edge Gateways:**

    - Moxa industrial IoT gateways (e.g., ThingsPro Gateway): Provide connectivity and data pre-processing.
    - Edge computing devices with NanoMQ: Handle local MQTT processing for fast response times.

- **MQTT Broker:**

  - EMQX Enterprise Cluster: Hosted on Azure Kubernetes Service (AKS) for high availability and scalability, managing up to 100 million concurrent MQTT connections.

- **Azure Cloud Services:**

  - **Core Services:**

    - Azure IoT Hub: Provides device management, security, and bi-directional communication with edge devices.
    - Azure Event Hubs: Ingests high-volume data streams from the MQTT broker.
    - Azure Stream Analytics: Enables real-time data processing and analysis, including anomaly detection, KPI calculation, and data correlation.
    - Azure Data Lake Storage Gen2: Offers cost-effective storage for large volumes of raw and processed data.
    - Azure Synapse Analytics: Performs big data analytics, data warehousing, and long-term trend analysis.

  - **Security Services:**

    - Azure Firewall: Provides network security and threat protection.
    - Azure VPN Gateway: Enables secure remote connections.
    - Azure Key Vault: Manages encryption keys and secrets.

  - **Monitoring & Operations Services:**

    - Azure Monitor: Offers comprehensive resource monitoring and alerting.
    - Grafana: Provides custom dashboards and visualisation for key performance indicators (KPIs).
    - Azure Log Analytics: Enables centralised log management and analysis.

- **Technology Stack:**

  The project utilises a modern and robust technology stack:

  - **Edge:** Siemens S7-1500 PLC, HBM QuantumX, Endress+Hauser sensors, Moxa ThingsPro Gateway, NanoMQ, Docker.
  - **Cloud:** Azure IoT Hub, Event Hubs, Stream Analytics, Data Lake Storage Gen2, Synapse Analytics, Firewall, VPN Gateway, Key Vault, Monitor, Log Analytics.
  - **Development:** Python, JavaScript/TypeScript, C#, Visual Studio Code, Azure DevOps, OpenAPI (Swagger), Azure API Management.
  - **Monitoring:** Azure Monitor, Grafana, Azure Log Analytics, Elastic Stack (ELK), Azure Alerts, PagerDuty.

### 3. Key Design Decisions & Configurations

- **MQTT Broker:**

  - EMQX Enterprise Edition selected for its robust features, scalability, and commercial support.
  - Minimum three-node cluster deployed on AKS for high availability.
  - Configuration includes QoS settings, topic structure, rule engine configuration, security settings, and integration with Azure services.

- **Topic Structure:**

  - Hierarchical topic structure implemented for efficient data organisation and filtering (e.g., `renata/location/area/production_line/device_type/device_id/measurement_type`).
  - Naming conventions ensure consistency and clarity.
  - Wildcards used for flexible subscriptions.

- **QoS Configuration:**

  - QoS 2 for critical production data requiring guaranteed delivery (e.g., control commands, alarms).
  - QoS 1 for essential process data (e.g., sensor measurements, status updates).
  - QoS 0 for non-critical, high-frequency data (e.g., debugging information).

- **Azure IoT Hub:**

  - Configured for device management, authentication, message routing, and integration with EMQX.
  - Secure device provisioning using X.509 certificates or DPS.
  - Geo-replication enabled for disaster recovery.

- **Data Processing & Storage:**

  - Azure Stream Analytics performs real-time data filtering, aggregation, anomaly detection, KPI calculation, and data enrichment.
  - Azure Data Lake Storage Gen2 provides cost-effective storage for raw and processed data, organised in Hot, Cool, and Archive tiers based on data lifecycle.
  - Flexible schema design accommodates various data types and future expansion.
  - Data security ensured through encryption at rest and in transit, access control, and regular security audits.

- **Security:**

  - Multi-layered security approach includes device authentication (X.509 certificates, token-based), TLS encryption (TLS 1.3), data encryption (AES-256, Azure Storage Service Encryption), and role-based access control (RBAC).
  - Granular access control implemented through ACLs in EMQX, restricting access to MQTT topics based on user roles and device identities.

- **Performance and Scalability:**

  - Multi-layered load balancing ensures optimal resource utilisation and scalability.
  - Auto-scaling implemented for EMQX pods, AKS cluster, and Azure services based on CPU load, memory usage, connection count, and message throughput.
  - Caching strategies employed for frequently accessed data to improve performance and reduce latency.

- **Monitoring and Alerting:**

  - Centralised logging system based on ELK stack and Azure services provides comprehensive system visibility.
  - Monitoring dashboards in Grafana visualise key performance metrics for EMQX, Azure services, network, and overall system health.
  - Alerting system configured for critical events, including infrastructure issues, application errors, security breaches, and business process deviations.

- **Backup and Disaster Recovery:**

  - Comprehensive backup and recovery strategies ensure data protection and business continuity.
  - Regular backups of EMQX configuration data and persistent data.
  - Azure services leverage built-in redundancy and disaster recovery capabilities.
  - Business Continuity Plan outlines procedures for minimising downtime and ensuring rapid recovery in case of major disruptions.

### 4. Project Status & Next Steps

The project documentation suggests that the system architecture, design choices, and configurations have been finalised. The next steps likely involve:

1. Implementation of detailed component configurations and integrations.
2. Rigorous testing and validation of the entire system.
3. Gradual rollout to production, starting with pilot implementations.
4. Continuous monitoring, performance optimisation, and fine-tuning.
5. Regular security audits and penetration testing.
6. Ongoing maintenance, updates, and documentation.

### 5. Conclusion

Renata SA's MQTT-based IIoT project represents a significant investment in modernising their production environment and leveraging data-driven insights. The project employs a well-defined architecture, robust technologies, and comprehensive security measures to ensure scalability, performance, and data security. Successful implementation and operation of this project will likely lead to improved production efficiency, enhanced product quality, and better-informed business decisions.
