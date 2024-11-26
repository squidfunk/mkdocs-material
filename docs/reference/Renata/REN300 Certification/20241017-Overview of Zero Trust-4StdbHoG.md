# Overview of Zero Trust

> [!NOTE]
> Zero Trust is a security concept, strategy and architectural design approach rather than a singular product \[1].

**Zero Trust Assumptions**

- An attacker is **already present** \[2].
- **No network** or device is inherently trusted \[2].

Therefore, **every connection** needs to be:

- **Authenticated:** Verify the user or device \[2].
- **Authorised:** Verify access privileges \[2].

### Zero Trust Maturity Model (ZTMM)

The ZTMM is a potential roadmap for designing and implementing a Zero Trust architecture \[1]. This model divides the enterprise into five pillars, built on three overarching capabilities \[1]:

**Pillars**

- Identity
- Devices
- Network
- Applications
- Workloads, and Data

**Capabilities**

- Visibility and Analytics
- Automation and Orchestration
- Governance

The pillars are likely to advance at different speeds, allowing a phased implementation of Zero Trust \[3].

#### Stages of Maturity \[4, 5]

The ZTMM has four maturity stages:

- **Traditional:** Manually configured and static security policies. Least privilege is only established during provisioning and responses are manual with limited data correlation.
- **Initial:** Some automation is implemented with basic visibility and analytics. Policies are updated periodically and incident response is somewhat coordinated.
- **Advanced:** Automated configuration of policies and controls and comprehensive monitoring. Systems can self-report and adapt to changing conditions.
- **Optimal:** Fully automated, just-in-time configurations with dynamic policies based on real-time monitoring. Least privilege access is enforced based on a device's needs and dependencies, with full situational awareness.

**Important Concepts** \[6, 7]

- Zero Trust adoption is a **continuous process**, not a one-time implementation.
- It requires an organisational **mindset shift**.
- Implementation is incremental.
- Thoroughly assess the impact of Zero Trust on operations and safety before full implementation.

> [!TIP]
> ### Applying Zero Trust to ICS/OT Networks
> 
> #### Key Steps \[7-11]:
> 
> - **Mapping:** Create a comprehensive inventory of all assets and devices, including network connections (LAN, WAN, remote access), protocols used, workflows, and dependencies.
> - **Microsegmentation:** Divide the network into small, isolated segments of related devices to manage and control communication between them.
> - **Multifactor Authentication (MFA):** Implement MFA wherever possible for network access to eliminate reliance on single-factor authentication.
> - **Data Diodes:** Employ unidirectional gateways or data diodes for one-way data transfer between network segments to prevent attacks from propagating.
> - **Policy and Procedures:** Establish and enforce policies and procedures that require authentication and authorisation for every connection, based on dynamic, real-time information.
> - **Monitoring:** Use a Security Information and Event Management (SIEM) solution to collect logs from all assets, collaborate on threat analysis, and inform dynamic policies for granting or denying access.
