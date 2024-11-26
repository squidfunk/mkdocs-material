# Multiple Device Assignment Audit Report ENG

**Document Classification:** CONFIDENTIAL
**Organization:** Renata SA
**Prepared By:** ISM Team
**Role:** Information Security Management
**Reference:** REN-MDA-AUDIT-2024-001
**Date:** October 29, 2024
**Data Source:** Microsoft Entra ID (Azure AD) CSV Export
**Export File:** AD_ExportDevice_2024-10-29.csv
**Export Date:** October 29, 2024
**Compliance Framework:** ISO/IEC 27001:2022

### Executive Summary
This report analyzes users with multiple device assignments within the organization. All data is based on active devices with login activity in 2024. The analysis shows that 16 users have been assigned multiple devices, with most assignments following clear business patterns (desktop + mobile device combinations).

---
## Key Findings
1. **Compliance Rate:** 100% of multiple device assignments show active usage in 2024
2. **Device Activity:** 94% of devices show login activity within the last 30 days
3. **Assignment Patterns:** Most users (15 of 16) have 2 devices; one user has 3 devices

## Detailed Analysis

### 1. Device Type Distribution

#### Mobile Devices
| Device Type | Count | Percentage |
|------------|--------|------------|
| Surface Pro (9 & 10) | 6 | 18.2% |
| EliteBook Series | 15 | 45.5% |
| Total Mobile | 21 | 63.7% |

#### Desktop/Workstation
| Device Type | Count | Percentage |
|------------|--------|------------|
| EliteDesk Series | 11 | 33.3% |
| Z2 Tower Workstation | 1 | 3.0% |
| Total Desktop | 12 | 36.3% |

### 2. Assignment Categories

#### A. Standard Desktop + Mobile Combinations
*Users with complementary device types for different work scenarios*

| User Name | Desktop Device | Mobile Device | Last Activity (Both Devices) |
|-----------|---------------|---------------|----------------------------|
| Grundmann, Sebastian | EliteDesk 800 G4 | EliteBook x360 1040 G8 | Within last 14 days |
| Leupi, Daniel | EliteDesk 800 G4 | EliteBook x360 1040 G6 | Within last 7 days |
| Chramosta, Thomas | EliteDesk 800 G4 | EliteBook x360 1040 G6 | Within last 7 days |
| Furer, Patrick | Z2 Tower G4 | EliteBook 850 G6 | Within last 14 days |

#### B. Multiple Mobile Devices
*Users with multiple portable devices*

| User Name | Primary Device | Secondary Device | Notes |
|-----------|---------------|------------------|--------|
| Wu, Qiong | Surface Pro 9 | Surface Pro 9 | Both actively used |
| Dema, Diona | Surface Pro 10 | EliteBook 860 G10 | Different form factors |
| Strub, Marc | Surface Pro 9 | Unspecified Device | Recent activity on both |

#### C. Workstation Upgrades/Transitions
*Users with sequential device upgrades*

| User Name | Older Model | Newer Model | Transition Status |
|-----------|------------|-------------|-------------------|
| Fiechter, Dominik | EliteDesk 800 G3 | EliteDesk 800 G4 | Active usage on both |
| Causevic, Amel | EliteDesk 800 G3 | EliteDesk 800 G4 | Active usage on both |

#### D. Special Cases
*Users with three or unique device combinations*

| User Name | Devices | Notes |
|-----------|---------|--------|
| Schwandt, Juan-Luis | 3 devices: EliteBook 840 G10, EliteBook x360 1030 G2, EliteDesk 800 G4 | Only user with 3 devices |

### 3. Activity Analysis

#### Recent Activity Pattern
- 85% of devices show login activity in October 2024
- 12% show activity in September 2024
- 3% show activity prior to September 2024

#### Usage Consistency
| Activity Pattern | Number of Users | Percentage |
|-----------------|-----------------|------------|
| Both devices used within 7 days | 12 | 75% |
| Both devices used within 30 days | 3 | 18.75% |
| Irregular usage pattern | 1 | 6.25% |

## Compliance Considerations

### Risk Assessment
1. **Low Risk Areas:**
   - All devices show recent activity
   - Clear business justification for most combinations
   - Consistent usage patterns

2. **Areas for Review:**
   - Three-device assignments (1 case)
   - Duplicate model assignments (Surface Pro 9 case)

### Recommendations

1. **Documentation Enhancement:**
   - Implement formal justification documentation for multiple device assignments
   - Create standard approval workflow for multiple device requests

2. **Policy Updates:**
   - Define clear criteria for multiple device assignments
   - Establish regular review cycles for multiple device assignments

3. **Monitoring Improvements:**
   - Implement quarterly review of device usage patterns
   - Create automated alerts for unusual device combinations

## Appendix A: Device Model Distribution
| Model | Count | Percentage |
|-------|--------|------------|
| EliteBook x360 1040 (all series) | 8 | 24.2% |
| EliteDesk 800 G4 DM 65W | 7 | 21.2% |
| Surface Pro (all models) | 6 | 18.2% |
| EliteBook 860 G10 | 4 | 12.1% |
| EliteBook 850 G6 | 3 | 9.1% |
| Other Models | 5 | 15.2% |

## Appendix B: Analysis Methodology

### Data Collection and Processing
This audit employs an advanced analytical approach examining all device usage through login patterns, regardless of assigned ownership. While the standard security controls and ISO compliance requirements remain unchanged across all Swatch Group companies, this specific analysis methodology has been developed by and for Renata SA to provide additional insights into our specific operational environment.

1. **Data Extraction:**
   - Complete device list export from Microsoft Entra ID (`AD_ExportDevice_2024-10-29.csv`)
   - Full login history for all devices
   - Hardware specifications and device metadata
   - User access patterns and timestamps

2. **Pattern Analysis:**
   - Python-based login sequence analysis
   - Cross-referencing of login timestamps with device assignments
   - Hardware type correlation
   - Temporal pattern recognition
   - User movement tracking between devices

3. **Compliance Verification:**
   - Identification of login pattern anomalies
   - Detection of Azure AD system-generated inconsistencies
   - Cross-validation of device ownership versus actual usage
   - Analysis of access pattern irregularities

This additional layer of analysis, while specific to Renata SA, operates within and enhances our standard security framework, enabling the identification of:
- Compliance issues missed by traditional audits
- System-generated errors in Azure AD
- Discrepancies between assigned and actual device usage
- Potential security risks through unusual access patterns

---

*Report generated from system audit data. All timestamps are in local time.*
*Document Classification: CONFIDENTIAL*
*Reference: REN-MDA-AUDIT-2024-001*