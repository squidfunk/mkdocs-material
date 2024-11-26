# EMQX Products for On-Premises and Hybrid Deployments



### Overview
Each EMQX product contributes to a comprehensive security strategy for MQTT messaging and IoT deployments. From core features like enhanced authentication and SSL/TLS in the EMQX Broker to advanced capabilities like SSO and audit logging in EMQX Enterprise, and managed security in EMQX Cloud, these products are designed to meet the rigorous security demands of modern IoT environments. Here is an overview of EMQX products that can be run on-premises or in a hybrid environment.

## EMQX Products

### 1. **EMQX Broker**
The EMQX Broker is the core product that provides MQTT messaging capabilities. It supports MQTT 5.0, 3.1.1, and 3.1 protocols and is designed for high-performance and scalable message routing.

#### On-Premises Capabilities:
- **Enhanced Authentication**: Supports multiple authentication methods, including Username/Password, JWT, and OAuth 2.0 [oai_citation:1,Leveraging Enhanced Authentication for MQTT Security | EMQ](https://www.emqx.com/en/blog/leveraging-enhanced-authentication-for-mqtt-security) [oai_citation:2,Blog - MQTT Security | EMQ](https://www.emqx.com/en/blog/category/security).
- **Authorization**: Implements fine-grained Access Control Lists (ACLs) to control who can publish and subscribe to topics [oai_citation:3,Leveraging Enhanced Authentication for MQTT Security | EMQ](https://www.emqx.com/en/blog/leveraging-enhanced-authentication-for-mqtt-security).
- **SSL/TLS**: Provides encryption for data in transit, ensuring confidentiality and integrity of messages [oai_citation:4,Fortifying MQTT Communication Security With SSL/TLS | EMQ](https://www.emqx.com/en/blog/fortifying-mqtt-communication-security-with-ssl-tls).
- **Rate Limiting**: Protects against Denial of Service (DoS) attacks by limiting the rate of incoming messages [oai_citation:5,Understanding MQTT Security: A Comprehensive Overview | EMQ](https://www.emqx.com/en/blog/understanding-mqtt-security-a-comprehensive-overview).

### 2. **EMQX Enterprise**
EMQX Enterprise is a commercial version of the EMQX Broker that includes additional features for enhanced security, scalability, and management.

#### On-Premises Capabilities:
- **Single Sign-On (SSO)**: Integrates with LDAP, SAML, and other identity providers for centralized authentication [oai_citation:6,Security Guide | EMQX Docs](https://docs.emqx.com/en/emqx/latest/access-control/security-guide.html).
- **Audit Logging**: Captures detailed logs of user actions and system events for compliance and forensic analysis [oai_citation:7,Security Guide | EMQX Docs](https://docs.emqx.com/en/emqx/latest/access-control/security-guide.html).
- **High Availability and Disaster Recovery**: Ensures continuous availability and data integrity through clustering and data replication [oai_citation:8,Security Guide | EMQX Docs](https://docs.emqx.com/en/emqx/latest/access-control/security-guide.html).

#### Hybrid Deployment:
- EMQX Enterprise can be deployed in a hybrid environment, combining on-premises and cloud resources to balance load and ensure high availability across different geographic locations.

### 3. **EMQX Cloud**
EMQX Cloud is a fully managed MQTT messaging service hosted on public cloud providers like AWS, Azure, and Google Cloud. It offers the benefits of EMQX without the overhead of managing the infrastructure.

#### Hybrid Deployment:
- **Managed Security**: Includes automated updates and security patches to ensure the system is protected against the latest threats [oai_citation:9,Security Guide | EMQX Docs](https://docs.emqx.com/en/emqx/latest/access-control/security-guide.html).
- **Compliance**: Adheres to industry standards and regulatory requirements, providing certifications and compliance reports [oai_citation:10,Security Guide | EMQX Docs](https://docs.emqx.com/en/emqx/latest/access-control/security-guide.html).
- **Scalable Security**: Leverages cloud-native security features such as virtual private clouds (VPCs), security groups, and IAM policies [oai_citation:11,Security Guide | EMQX Docs](https://docs.emqx.com/en/emqx/latest/access-control/security-guide.html).
- Can be integrated with on-premises solutions to create a hybrid environment, where sensitive data can be processed on-premises while leveraging cloud resources for scalability and high availability.

### 4. **EMQX Edge**
EMQX Edge is a lightweight MQTT broker designed for edge computing environments. It provides local processing and filtering of data at the edge, reducing latency and bandwidth usage.

#### On-Premises Capabilities:
- **Local Data Processing**: Enhances privacy and security by processing sensitive data locally before sending it to the cloud [oai_citation:12,Security Guide | EMQX Docs](https://docs.emqx.com/en/emqx/latest/access-control/security-guide.html).
- **Secure Connectivity**: Supports secure connections using SSL/TLS, ensuring that data transmitted from edge devices to central systems is protected [oai_citation:13,Security Guide | EMQX Docs](https://docs.emqx.com/en/emqx/latest/access-control/security-guide.html).
- **Edge-to-Cloud Security**: Integrates with EMQX Cloud for secure, scalable communication between edge devices and cloud services [oai_citation:14,Security Guide | EMQX Docs](https://docs.emqx.com/en/emqx/latest/access-control/security-guide.html).

### 5. **EMQX Neuron**
EMQX Neuron is an industrial IoT (IIoT) data integration platform that supports various industrial protocols and integrates them with MQTT.

#### On-Premises Capabilities:
- **Protocol Conversion Security**: Ensures secure translation and transmission of data between different industrial protocols and MQTT [oai_citation:15,Security Guide | EMQX Docs](https://docs.emqx.com/en/emqx/latest/access-control/security-guide.html).
- **Data Encryption**: Encrypts data during protocol conversion and transmission to maintain data confidentiality and integrity [oai_citation:16,Security Guide | EMQX Docs](https://docs.emqx.com/en/emqx/latest/access-control/security-guide.html).
- **Secure Access Control**: Implements strict access control mechanisms to prevent unauthorized access to industrial systems and data [oai_citation:17,Security Guide | EMQX Docs](https://docs.emqx.com/en/emqx/latest/access-control/security-guide.html).

### Summary
By leveraging these EMQX products, organizations can deploy robust and secure MQTT messaging infrastructures either on-premises, in the cloud, or in a hybrid environment. Each product offers specific features that enhance security, scalability, and manageability, ensuring that IoT deployments are resilient and compliant with industry standards.

- **On-Premises**: EMQX Broker, EMQX Enterprise, EMQX Edge, and EMQX Neuron.
- **Hybrid**: EMQX Enterprise and EMQX Cloud, leveraging a combination of on-premises and cloud resources for optimal performance and security.

These products collectively contribute to a comprehensive security strategy for MQTT messaging and IoT deployments, addressing various security needs across different layers of the network and application stack.