# Project Tree Stuckture

## **Document Control**
- **Author**: Marc Strub
- **Position**: Operational Technology Manager (OTM)
- **Organization**: Renata SA
- **Document Status**: Draft 1.4
- **Classification**: Confidential
- **Version Date**: October 2024
- **Next Review**: April 2025

## **Executive Summary**

This document outlines the data security measures and compliance controls implemented by Renata SA in the production of batteries for ABIT. It focuses on the secure data flow from our Programmable Logic Controllers (PLCs) in the Operational Technology (OT) production line to data storage. Compliance and audit processes are exclusively managed by the Operational Technology Manager (OTM), Marc Strub. K&S are involved solely as a maintenance team for the hardware they built. Additionally, unannounced audits are conducted by an independent internal Audit Team from our parent company, the Swatch Group. This document ensures adherence to EU regulations, including the General Data Protection Regulation (GDPR), to meet ABIT's compliance requirements.

## **Table of Contents**

1. **System Overview**
   - 1.1 Architecture Diagram
   - 1.2 Component Description
   - 1.3 Technology Stack

2. **MQTT Broker Architecture**
   - 2.1 Broker Selection
     - 2.1.1 Comparison Matrix
     - 2.1.2 EMQX Specifications
   - 2.2 Cluster Configuration
     - 2.2.1 High Availability
     - 2.2.2 Load Balancing
   - 2.3 Topic Structure
     - 2.3.1 Naming Conventions
     - 2.3.2 Hierarchy Design
   - 2.4 QoS Configuration

3. **Cloud Infrastructure**
   - 3.1 Azure IoT Hub
     - 3.1.1 Hub Configuration
     - 3.1.2 Device Provisioning
   - 3.2 Azure Event Hubs
     - 3.2.1 Data Ingestion and Streaming
   - 3.3 Azure Stream Analytics
     - 3.3.1 Real-Time Processing
   - 3.4 Azure Data Lake
     - 3.4.1 Long-Term Storage
   - 3.5 Azure Kubernetes Service
     - 3.5.1 EMQX Deployment

4. **Edge Computing**
   - 4.1 Edge Device Specifications
   - 4.2 Local Data Processing
   - 4.3 Edge-to-Cloud Synchronization

5. **Data Flow and Integration**
   - 5.1 Data Collection Pipeline
   - 5.2 Data Processing Workflow
   - 5.3 Database Integration
     - 5.3.1 Schema Design
     - 5.3.2 Database Selection
   - 5.4 API Design
     - 5.4.1 REST API Specification
     - 5.4.2 GraphQL Schema

6. **Security Architecture**
   - 6.1 Authentication
     - 6.1.1 Device Authentication
     - 6.1.2 User Authentication
   - 6.2 Encryption
     - 6.2.1 TLS Configuration
     - 6.2.2 Data Encryption
   - 6.3 Access Control
     - 6.3.1 RBAC Model
     - 6.3.2 ACL Configuration

7. **Scalability and Performance**
   - 7.1 Load Balancing
   - 7.2 Auto-Scaling
   - 7.3 Caching Strategies
   - 7.4 Performance Metrics

8. **Monitoring and Logging**
   - 8.1 Centralized Logging System
   - 8.2 Monitoring Dashboards
   - 8.3 Alerting
   - 8.4 Audit Trails

9. **Disaster Recovery and Backup**
   - 9.1 Backup Strategies
   - 9.2 Recovery Processes
   - 9.3 Business Continuity Plan

10. **Data Transfer from Switzerland to the EU**
    - 10.1 Compliance with GDPR
    - 10.2 Azure's Support for Compliance
    - 10.3 Data Residency Benefits
    - 10.4 Implementing Data Protection Measures
    - 10.5 Conclusion

11. **References**
    - References for Azure
    - References for AWS

12. **Appendices**
    - Appendix A: Data Flow Diagrams
    - Appendix B: Security Policies
    - Appendix C: Incident Response Procedures
    - Appendix D: Compliance Certificates

13. **Document History**
    - Version history and changes

14. **Approval**
    - Signatures and dates

---

## **1. System Overview**

### **1.1 Architecture Diagram**

[Include updated architecture diagrams that illustrate the overall system, including data flow from PLCs to Azure services.]

### **1.2 Component Description**

- **PLCs (Programmable Logic Controllers)**: Devices that collect real-time operational data from the production line.
- **Edge Devices**: Siemens SIMATIC IPC127E devices that aggregate and preprocess data.
- **Layer 3 Switches**: Siemens SCALANCE XM416-4C switches that manage network traffic.
- **MQTT Broker**: EMQX Enterprise deployed on Azure Kubernetes Service for handling MQTT messages.
- **Cloud Services**: Microsoft Azure services used for data storage, processing, and analytics.

### **1.3 Technology Stack**

- **Programming Languages**: Java (for MQTT data format), Python, etc.
- **Protocols**: MQTT over TLS/SSL, HTTPS
- **Platforms**: Microsoft Azure, Azure Kubernetes Service
- **Databases**: Azure Data Lake, SQL Databases

## **2. MQTT Broker Architecture**

### **2.1 Broker Selection**

#### **2.1.1 Comparison Matrix**

[Provide a matrix comparing different MQTT brokers, justifying the selection of EMQX Enterprise.]

#### **2.1.2 EMQX Specifications**

- **Features**: High throughput, clustering, authentication mechanisms, etc.
- **Compliance**: Supports MQTT 5.0, secure communication protocols.

### **2.2 Cluster Configuration**

#### **2.2.1 High Availability**

- Implementing EMQX in a clustered environment to ensure no single point of failure.

#### **2.2.2 Load Balancing**

- Using Azure Load Balancer to distribute traffic across EMQX nodes.

### **2.3 Topic Structure**

#### **2.3.1 Naming Conventions**

- Define standardized topic names for consistency.

#### **2.3.2 Hierarchy Design**

- Establish a hierarchical topic structure that reflects organizational and data flow hierarchies.

### **2.4 QoS Configuration**

- Utilize appropriate Quality of Service levels to balance performance and reliability.

## **3. Cloud Infrastructure**

### **3.1 Azure IoT Hub**

#### **3.1.1 Hub Configuration**

- Configure Azure IoT Hub for device connectivity and message routing.

#### **3.1.2 Device Provisioning**

- Implement automated device provisioning using the Device Provisioning Service (DPS).

### **3.2 Azure Event Hubs**

#### **3.2.1 Data Ingestion and Streaming**

- Use Event Hubs for scalable data ingestion from IoT Hub.

### **3.3 Azure Stream Analytics**

#### **3.3.1 Real-Time Processing**

- Set up Stream Analytics jobs for real-time data processing and analytics.

### **3.4 Azure Data Lake**

#### **3.4.1 Long-Term Storage**

- Store processed data in Azure Data Lake for long-term retention and advanced analytics.

### **3.5 Azure Kubernetes Service**

#### **3.5.1 EMQX Deployment**

- Deploy EMQX broker on Azure Kubernetes Service for scalability and management.

## **4. Edge Computing**

### **4.1 Edge Device Specifications**

- Hardware specifications of Siemens SIMATIC IPC127E devices.

### **4.2 Local Data Processing**

- Preprocessing data at the edge to reduce latency and bandwidth usage.

### **4.3 Edge-to-Cloud Synchronization**

- Secure and reliable synchronization mechanisms between edge devices and cloud services.

## **5. Data Flow and Integration**

### **5.1 Data Collection Pipeline**

- Overview of the data collection process from PLCs to cloud storage.

### **5.2 Data Processing Workflow**

- Steps involved in processing data, including transformation and enrichment.

### **5.3 Database Integration**

#### **5.3.1 Schema Design**

- Designing database schemas to efficiently store and query data.

#### **5.3.2 Database Selection**

- Choosing appropriate databases (SQL, NoSQL) based on data requirements.

### **5.4 API Design**

#### **5.4.1 REST API Specification**

- Defining RESTful APIs for data access and manipulation.

#### **5.4.2 GraphQL Schema**

- Implementing GraphQL for flexible data queries.

## **6. Security Architecture**

### **6.1 Authentication**

#### **6.1.1 Device Authentication**

- Using X.509 certificates for device identity verification.

#### **6.1.2 User Authentication**

- Implementing multi-factor authentication and role-based access control.

### **6.2 Encryption**

#### **6.2.1 TLS Configuration**

- Configuring TLS 1.2/1.3 for secure communications.

#### **6.2.2 Data Encryption**

- Encrypting data at rest using AES-256 encryption.

### **6.3 Access Control**

#### **6.3.1 RBAC Model**

- Defining roles and permissions within the system.

#### **6.3.2 ACL Configuration**

- Setting up Access Control Lists for resource protection.

## **7. Scalability and Performance**

### **7.1 Load Balancing**

- Utilizing Azure Load Balancer for distributing workloads.

### **7.2 Auto-Scaling**

- Implementing auto-scaling policies based on performance metrics.

### **7.3 Caching Strategies**

- Using caching mechanisms to improve system responsiveness.

### **7.4 Performance Metrics**

- Monitoring system performance indicators such as latency, throughput, and error rates.

## **8. Monitoring and Logging**

### **8.1 Centralized Logging System**

- Aggregating logs using Azure Monitor or ELK stack.

### **8.2 Monitoring Dashboards**

- Creating dashboards for real-time system monitoring.

### **8.3 Alerting**

- Setting up alerts for predefined thresholds and anomalies.

### **8.4 Audit Trails**

- Maintaining audit logs for security and compliance purposes.

## **9. Disaster Recovery and Backup**

### **9.1 Backup Strategies**

- Regular backups of critical data and configurations.

### **9.2 Recovery Processes**

- Documented procedures for system recovery in case of failures.

### **9.3 Business Continuity Plan**

- Ensuring minimal disruption to operations during adverse events.

## **10. Data Transfer from Switzerland to the EU**

### **10.1 Compliance with GDPR**

Storing all our data in Switzerland while serving customers in the EU involves navigating both Swiss data protection laws and the EU’s General Data Protection Regulation (GDPR). Switzerland is recognized by the EU as providing an adequate level of data protection, which facilitates data transfers between the two regions without requiring additional safeguards.

#### **10.1.1 Key GDPR Requirements**

- **Data Processing Agreements**: We have appropriate data processing agreements in place with any third parties involved in handling the data.
- **Data Subject Rights**: Processes are implemented to uphold the rights of data subjects, such as the right to access, rectify, or delete their data.
- **Lawful Basis for Processing**: A lawful basis for processing personal data is established, such as consent or contractual necessity.

Storing data in Switzerland aligns with GDPR requirements, provided that the Swiss data protection standards meet or exceed those mandated by the GDPR.

### **10.2 Azure’s Support for Compliance**

Azure offers robust tools and services to help ensure compliance with both Swiss data protection laws and GDPR:

- **Compliance Certifications**: Azure’s Swiss data centers comply with the Swiss Federal Act on Data Protection (FADP) and are aligned with GDPR requirements, providing necessary compliance certifications.
- **Data Encryption**: Azure ensures that data is encrypted both at rest and in transit, safeguarding against unauthorized access.
- **Access Controls**: Granular access controls help manage who can access data, ensuring that only authorized personnel have the necessary permissions.

### **10.3 Data Residency Benefits**

Storing data in Switzerland offers several advantages:

- **Enhanced Privacy**: Switzerland’s stringent data protection laws provide a high level of privacy.
- **Reduced Latency**: For Swiss-based operations, local data storage results in lower latency and improved performance.
- **Regulatory Alignment**: Operating within Switzerland’s legal framework simplifies compliance, as we are subject to a single set of data protection laws recognized as adequate by the EU.

### **10.4 Implementing Data Protection Measures**

To ensure full compliance and secure data handling, we have implemented the following measures:

- **Regular Audits**: Conduct regular audits to verify compliance with both Swiss and EU data protection regulations.
- **Training and Awareness**: Staff are trained on data protection best practices and GDPR requirements to minimize the risk of data breaches.
- **Incident Response Plan**: An incident response plan is developed and maintained to address potential data breaches promptly and effectively.

### **10.5 Conclusion**

Storing data in Switzerland while serving EU customers leverages Switzerland’s strong data protection laws and Azure’s compliant infrastructure. By ensuring compliance with GDPR and implementing robust data protection measures, we effectively manage and protect our EU customers’ data.

## **11. References**

### **References for Azure**

1. European Commission. *Adequacy Decisions*.
2. Microsoft Azure. *GDPR Compliance Offerings*.
3. Swiss Federal Data Protection and Information Commissioner (FDPIC). *Swiss Federal Act on Data Protection (FADP)*.
4. General Data Protection Regulation (GDPR). *Regulation (EU) 2016/679*.
5. Microsoft Azure. *Azure Data Protection and Security*.
6. European Commission. *EU-US Privacy Shield Replacement - Schrems II*.
7. Swiss Federal Council. *Data Protection in Switzerland*.
8. Microsoft Azure. *Compliance Certifications*.
9. International Organization for Standardization (ISO). *ISO/IEC 27001 Information Security Management*.
10. European Data Protection Board (EDPB). *Guidelines on Data Transfers*.

### **References for AWS**

1. Amazon Web Services. *AWS GDPR Compliance*.
2. European Commission. *Adequacy Decisions*.
3. Amazon Web Services. *Data Protection in AWS Data Centers in Switzerland*.
4. General Data Protection Regulation (GDPR). *Regulation (EU) 2016/679*.
5. Amazon Web Services. *AWS Security Documentation*.
6. Swiss Federal Council. *Data Protection in Switzerland*.
7. Amazon Web Services. *AWS Compliance Programs*.
8. Amazon Web Services. *Data Encryption in AWS*.
9. International Organization for Standardization (ISO). *ISO/IEC 27001 Information Security Management*.
10. European Data Protection Board (EDPB). *Guidelines on Data Transfers*.

## **12. Appendices**

### **Appendix A: Data Flow Diagrams**

[Include detailed diagrams illustrating the data flow from PLCs to Azure services.]

### **Appendix B: Security Policies**

[Provide comprehensive security policies related to data protection and compliance.]

### **Appendix C: Incident Response Procedures**

[Detail step-by-step procedures for responding to security incidents.]

### **Appendix D: Compliance Certificates**

[Include copies of relevant certifications and compliance documents.]

## **13. Document History**

- **Version 1.0**: Initial draft focusing on ABIT's compliance requirements.
- **Version 1.1**: Updated to reflect data storage within Switzerland and in-house data management.
- **Version 1.2**: Revised to include accurate data flow details and roles of external partners.
- **Version 1.3**: Updated to reflect that compliance and audits are exclusively conducted by the OTM (Marc Strub), with K&S involved only in hardware maintenance, and inclusion of unannounced audits by the Swatch Group Audit Team.
- **Version 1.4**: Incorporated missing sections from the documentation tree, translated German words to English, and added detailed sections on data transfer compliance and references.
- **Next Review**: April 2025

## **14. Approval**

- **Renata SA Representative**:
  - **Name**: Marc Strub
  - **Position**: Operational Technology Manager
  - **Signature**: ______________________
  - **Date**: ___________________________

- **ABIT Representative**:
  - **Name**: [ABIT Contact Name]
  - **Position**: [Position]
  - **Signature**: ______________________
  - **Date**: ___________________________

---

**Implementation Note**: This document will be maintained in our document management system with version control and regular reviews. It addresses the specific concerns of ABIT regarding data security, data flow, and compliance with EU regulations, ensuring transparency and adherence to the highest standards of data protection. The OTM, Marc Strub, is exclusively responsible for compliance and audit processes, ensuring independence and enforcement of compliance from hardware installation to access control and audits. Additionally, unannounced audits by the Swatch Group's internal Audit Team provide independent assessments of our compliance practices.

---

Please review the updated document. If there are any additional details or corrections needed, please let me know, and I'll be happy to make the necessary adjustments.