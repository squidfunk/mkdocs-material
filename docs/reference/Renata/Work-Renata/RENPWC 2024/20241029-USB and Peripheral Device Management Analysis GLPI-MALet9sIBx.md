# USB and Peripheral Device Management Analysis GLPI


**Document Classification:** CONFIDENTIAL  
**Organization:** Renata SA  
**Prepared By:** ISM Team  
**Role:** Information Security Management  
**Reference:** REN-USB-AUDIT-2024-001  
**Date:** October 29, 2024  

## Executive Summary

### Scope
This audit analyzes USB and peripheral devices registered in GLPI, including removable storage devices, input devices, biometric readers, and other connected peripherals.

### Key Findings
1. **Total USB Devices:** 589 unique peripherals
2. **Critical Storage Devices:** 87 USB storage devices identified
3. **Biometric Devices:** 64 fingerprint readers
4. **Risk Level:** Medium

## 1. Device Categories

### 1.1 Storage Devices
| Type | Count | Risk Level |
|------|--------|------------|
| USB Flash Drives | 53 | High |
| External HDDs | 12 | Medium |
| Card Readers | 22 | Medium |

### 1.2 Input Devices
| Type | Count | Risk Level |
|------|--------|------------|
| Keyboards | 15 | Low |
| Barcode Scanners | 18 | Low |
| Webcams | 24 | Medium |
| Audio Devices | 42 | Low |

### 1.3 Biometric Devices
| Model | Count | Status |
|-------|--------|---------|
| Synaptics FS7604/5/6 | 45 | Active |
| Validity Sensors VFS | 19 | Active |

## 2. Inventory Analysis

### 2.1 Storage Device Distribution
| Department | Flash Drives | HDDs | Access Level |
|------------|--------------|------|--------------|
| IT | 18 | 4 | Controlled |
| Production | 12 | 2 | Restricted |
| Management | 8 | 3 | Standard |
| Development | 15 | 3 | Controlled |

### 2.2 Asset Status
| Status | Count | Percentage |
|--------|--------|------------|
| Active/In Use | 542 | 92% |
| In Stock | 35 | 6% |
| Retired/Repair | 12 | 2% |

## 3. Risk Assessment

### 3.1 Critical Concerns
1. **Removable Storage**
   - Unmanaged flash drives: 23
   - Personal devices detected: 15
   - Non-inventoried devices: 8

2. **Biometric Security**
   - Outdated firmware: 12 devices
   - Uncalibrated readers: 5
   - Pending updates: 7

### 3.2 Compliance Status
| Category | Compliant | Non-Compliant | Unknown |
|----------|-----------|---------------|---------|
| Storage Encryption | 78% | 12% | 10% |
| Device Registration | 94% | 4% | 2% |
| Access Control | 89% | 8% | 3% |

## 4. Location Analysis

### 4.1 Physical Distribution
| Location | Devices | Control Level |
|----------|---------|---------------|
| Main Office | 245 | Standard |
| Production Floor | 156 | Enhanced |
| IT Labs | 98 | Restricted |
| External Sites | 90 | Monitored |

### 4.2 Department Assignment
| Department | Count | Special Controls |
|------------|-------|-----------------|
| IT | 125 | Full Monitoring |
| Production | 98 | Limited Access |
| R&D | 87 | Enhanced Security |
| Management | 76 | Standard Controls |
| Other | 203 | Basic Controls |

## 5. Manufacturer Analysis

### 5.1 Primary Vendors
| Manufacturer | Devices | Support Status |
|--------------|---------|----------------|
| Synaptics | 64 | Active |
| SanDisk | 28 | Active |
| Logitech | 26 | Active |
| Kingston | 18 | Active |
| Others | 453 | Various |

### 5.2 EOL Analysis
| Status | Count | Action Required |
|--------|--------|----------------|
| Supported | 498 | Routine Maintenance |
| Near EOL | 56 | Planning Replacement |
| EOL | 35 | Immediate Action |

## 6. Action Items

### 6.1 Immediate Actions (30 Days)
1. Register all unmanaged storage devices
2. Update biometric device firmware
3. Review non-compliant devices
4. Implement storage encryption policy

### 6.2 Short-term Actions (90 Days)
1. Replace EOL devices
2. Standardize USB storage procurement
3. Update device registration process
4. Implement automated compliance checking

### 6.3 Long-term Improvements
1. Device management system integration
2. Enhanced monitoring capabilities
3. Department-specific controls
4. Automated inventory updates

## 7. Compliance Requirements

### 7.1 Storage Device Policy
- Mandatory encryption
- Registration requirement
- Usage limitations
- Data transfer protocols

### 7.2 Access Controls
- Department-based restrictions
- Physical security measures
- Usage monitoring
- Incident reporting

## 8. Special Considerations

### 8.1 High-Risk Areas
1. Production Floor
   - Limited USB access
   - Monitored data transfer
   - Dedicated devices only

2. R&D Department
   - Encrypted storage only
   - Access logging
   - Regular audits

### 8.2 Exception Management
- Documented approvals
- Temporary permissions
- Risk assessments
- Regular reviews

## Authorization

This document represents the official USB and peripheral device analysis of Renata SA and has been prepared under the supervision of the Information Security Management team.

---

*Generated: October 29, 2024*  
*Classification: CONFIDENTIAL*  
*Organization: Renata SA*  
*Reference: REN-USB-AUDIT-2024-001*