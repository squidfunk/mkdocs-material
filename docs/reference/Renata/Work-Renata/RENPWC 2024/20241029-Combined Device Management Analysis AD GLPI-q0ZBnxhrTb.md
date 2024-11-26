# Combined Device Management Analysis AD GLPI


**Document Classification:** CONFIDENTIAL  
**Organization:** Renata SA  
**Prepared By:** ISM Team  
**Role:** Information Security Management  
**Reference:** REN-DEV-COMBINED-2024-001  
**Date:** October 29, 2024  

## Executive Summary

### Scope
This analysis combines data from both Azure Active Directory and GLPI Asset Management systems to provide a comprehensive view of Renata SA's device landscape and management practices.

### Key Findings
1. **System Coverage:**
   - Azure AD Registered Devices: 168
   - GLPI Registered Devices: 379
   - Overlap Analysis Required: ~211 devices
2. **Compliance Status:**
   - AD Compliance Rate: 84.5%
   - GLPI Asset Tracking: 96.3%
3. **Critical Areas:** 4 identified
4. **Overall Risk Level:** Medium-Low

## 1. Cross-System Device Analysis

### 1.1 Total Device Count Comparison
| Category | Azure AD | GLPI | Variance |
|----------|-----------|------|-----------|
| Total Devices | 168 | 379 | +211 |
| Active/In Use | 145 | 365 | +220 |
| Pending/Stock | 18 | 11 | -7 |
| Other Status | 5 | 3 | -2 |

### 1.2 Device Models Distribution
| Model | AD Count | GLPI Count | Notes |
|-------|-----------|------------|--------|
| HP EliteDesk 800 Series | 48 | 105 | GLPI includes older models |
| HP EliteBook x360 1040 | 32 | 94 | Multiple generations tracked |
| Surface Pro Devices | 18 | 18 | Consistent tracking |
| Other Models | 70 | 162 | Variance in classification |

## 2. Operating System Landscape

### 2.1 Windows Version Distribution
| Version | AD Count | GLPI Count | Compliance Status |
|---------|-----------|------------|-------------------|
| Windows 10 Enterprise | 112 | 321 | Compliant |
| Windows 11 | 4 | 7 | Compliant |
| Windows Server | 0 | 4 | Compliant |
| Other/Unspecified | 52 | 47 | Review Required |

### 2.2 Update Status
| Update Status | AD | GLPI | Action Required |
|---------------|-----|------|----------------|
| Fully Updated | 112 | 242 | Monitor |
| Requiring Updates | 56 | 137 | Schedule Updates |
| Critical Updates | 8 | N/A | Immediate Action |

## 3. Management System Coverage

### 3.1 System Registration Status
| System | Managed | Pending | Not Managed |
|--------|----------|----------|--------------|
| Azure AD | 142 (84.5%) | 18 (10.7%) | 8 (4.8%) |
| GLPI | 365 (96.3%) | 11 (2.9%) | 3 (0.8%) |

### 3.2 Cross-System Compliance
| State | AD Count | GLPI Count | Action |
|-------|-----------|------------|---------|
| Compliant | 124 | 338 | Routine Monitoring |
| Non-Compliant | 36 | 41 | Review Required |
| Unknown | 8 | 0 | Assessment Needed |

## 4. Device Groups and Categories

### 4.1 Critical Systems
| Category | AD Count | GLPI Count | Management Priority |
|----------|-----------|------------|-------------------|
| Production Systems | 48 | 48 | High |
| Development Workstations | 24 | 24 | High |
| Management Systems | 32 | 32 | High |
| Mobile Workforce | 46 | 134 | Medium |

### 4.2 Department Distribution
| Department | AD Tracked | GLPI Tracked | Notes |
|------------|------------|---------------|--------|
| Production | 68 | 72 | Minor variance |
| IT | 45 | 45 | Consistent |
| Development | 32 | 32 | Consistent |
| Other | 23 | 230 | Significant variance |

## 5. Risk Assessment

### 5.1 System-Specific Risks

#### Azure AD Risks
1. Non-Compliant Devices (36)
   - Windows Update Issues: 24
   - Management Agent Issues: 8
   - Configuration Drift: 4

#### GLPI Risks
1. Inactive Devices (37)
   - No Recent Activity: 25
   - Location Verification Needed: 12
   - Usage Assessment Required: All

### 5.2 Cross-System Gaps
| Category | Current State | Target | Gap |
|----------|---------------|--------|-----|
| Device Registration | 85% | 98% | 13% |
| Update Compliance | 78% | 95% | 17% |
| Asset Tracking | 96% | 98% | 2% |

## 6. Action Plan

### 6.1 Immediate Actions (30 Days)
1. Reconcile device count differences between systems
2. Update non-compliant devices (36 AD + 41 GLPI)
3. Implement cross-system validation procedures

### 6.2 Short-term Actions (90 Days)
1. Standardize device naming across systems
2. Implement automated compliance reporting
3. Resolve registration gaps

### 6.3 Long-term Strategy
1. System integration improvements
2. Automated cross-system validation
3. Enhanced reporting capabilities

## 7. System Integration Recommendations

### 7.1 Data Synchronization
1. Implement automated sync between AD and GLPI
2. Standardize device categorization
3. Unified compliance reporting

### 7.2 Process Improvements
1. Centralized device registration
2. Unified compliance checking
3. Automated discrepancy resolution

## Authorization

This document represents the combined analysis of Azure AD and GLPI device management systems at Renata SA and has been prepared under the supervision of the Information Security Management team.

---

*Generated: October 29, 2024*  
*Classification: CONFIDENTIAL*  
*Organization: Renata SA*  
*Reference: REN-DEV-COMBINED-2024-001*  
*Systems: Azure AD, GLPI*