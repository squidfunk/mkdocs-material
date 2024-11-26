# Secure Workforce and OT Device Access Stephan

**Document Classification:** CONFIDENTIAL  
**Organization:** Renata SA  
**Prepared By:** ISM Team  
**Role:** Information Security Management  
**Reference:** REN-ZT-OT-2024-003  
**Date:** October 29, 2024  

### Secure Workforce and OT Device Access with Zero Trust Principles | Yubico

**Audit Scope:** Zero Trust Authentication for Workforce and OT Device Access  
**Compliance Framework:** ISO/IEC 27001:2022, NIST SP 800-63 (MFA Guidelines), Zero Trust Framework  

---

**Scope of Implementation**

Yubico’s YubiKey solution is currently being tested within Renata SA’s IT department on Windows 10, Windows 11, iOS, and Android platforms. The testing process involves IT personnel, including myself, Arik, as well as Beat Schneider, to evaluate integration with Microsoft 365 (M365), Azure, and mobile ecosystems. The goal is to expand implementation to high-risk departments such as Finance and users with elevated privileges. Additionally, the solution will be rolled out to OT devices as part of a planned future expansion.

**Key Findings and Observations**

1. **Zero Trust Compliance**: YubiKey’s architecture supports Renata SA’s Zero Trust model by enforcing strict identity verification, thereby mitigating vulnerabilities commonly associated with traditional credentials and SMS-based MFA.

2. **Enhanced Security for M365, Azure, and Multi-Platform Devices**: Testing has confirmed successful integration across M365, Azure, and mobile platforms (iOS, Android, Windows 10, and Windows 11), with scalability planned for OT environments.

3. **Apple Device Compliance Enforcement**: In line with best practices, Apple has activated YubiKey only after validating key security principles, reinforcing strong MFA standards within Renata SA’s Apple ecosystem.

4. **Dual-Key Policy for Increased Security**: Each user is issued two YubiKeys—one for regular use and a backup securely stored in a safe. This dual-key policy ensures continued access while maintaining a high level of security, particularly for users in high-risk roles and OT environments.

**Audit Methodology**

### Standards Applied

- ISO/IEC 27001:2022
- NIST SP 800-63 (Multi-Factor Authentication)
- Zero Trust Security Framework  

### Data Collection and Evaluation

This audit report is based on the results gathered during testing across iOS, Android, Windows 10, and Windows 11 platforms. The data sources include direct testing feedback from myself and Beat Schneider, analysis of access logs, and compatibility assessments within M365, Azure, and mobile environments.

**Testing Details of YubiKey Models**

Renata SA is currently evaluating the following YubiKey models:

1. **YubiKey Bio Series**
   - **Capabilities**: Passwordless MFA, strong 2FA
   - **Authentication**: Biometric and PIN-based login
   - **Compatibility**: Desktop and web authentication across devices
   - **Physical Features**: IP68 rated, crush resistant, USB-C and USB-A options, battery-free, no moving parts

2. **YubiKey 5 FIPS Series**
   - **Capabilities**: Six model options including keychain and Nano models
   - **Form Factors**: USB-A, USB-C, NFC, and Lightning support
   - **Physical Features**: IP68 rated, crush resistant, battery-free, no moving parts

These models are under evaluation for their suitability across Renata SA’s infrastructure, including IT, mobile, and OT environments.