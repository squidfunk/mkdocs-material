# USB and Peripheral Device Management Analysis - Chronological GLPI


**Document Classification:** CONFIDENTIAL  
**Organization:** Renata SA  
**Prepared By:** ISM Team  
**Role:** Information Security Management  
**Reference:** REN-USB-CHRON-2024-001  
**Date:** October 29, 2024  

## Executive Summary

### Scope
This audit provides a chronological analysis of USB and peripheral devices registered in GLPI throughout 2023-2024, tracking device additions, removals, and management patterns over time.

### Key Statistics
- Total Devices Tracked: 1,415
- Active Device Types: 16 categories
- Primary Manufacturers: 89 vendors
- Locations Covered: 37 distinct areas

## 1. Device Category Distribution

### 1.1 Storage Devices
| Type | Count | Status |
|------|--------|---------|
| USB Memory Sticks | 89 | Managed |
| USB External SSDs | 3 | Managed |
| Card Readers | 16 | Monitored |

### 1.2 Input/Output Devices
| Type | Count | Category |
|------|--------|-----------|
| Keyboards | 16 | Input |
| USB Dongles | 1 | Special |
| Other Peripherals | 1,306 | Various |

## 2. Manufacturer Analysis

### 2.1 Primary Manufacturers
| Manufacturer | Device Count | Percentage |
|--------------|--------------|------------|
| Synaptics, Inc. | 156 | 11.0% |
| Plantronics, Inc. | 134 | 9.5% |
| DisplayLink | 138 | 9.8% |
| HP, Inc | 135 | 9.5% |
| Apple, Inc. | 113 | 8.0% |
| Others | 739 | 52.2% |

### 2.2 Storage Device Vendors
| Manufacturer | Devices | Risk Level |
|--------------|---------|------------|
| SanDisk Corp. | 19 | Monitored |
| Alcor Micro Corp. | 89 | Monitored |
| Western Digital | 5 | Monitored |
| Others | 24 | Monitored |

## 3. Location Distribution

### 3.1 Primary Locations
| Location | Device Count | Security Level |
|----------|--------------|----------------|
| Dellenboden | 138 | Standard |
| OG68, IT | 70 | Enhanced |
| EG95, RS | 66 | Standard |
| IT-Lager | 37 | Restricted |
| EG99, I-NProd. | 35 | Enhanced |
| Other Locations | 454 | Various |

### 3.2 Departmental Distribution
| Department | Devices | Control Level |
|------------|---------|---------------|
| IT Operations | 107 | High |
| Production | 66 | Medium |
| Management | 31 | Standard |
| Development | 25 | High |
| Other | 571 | Various |

## 4. Device Type Analysis

### 4.1 Biometric Devices
- Total Fingerprint Readers: 170
  - Synaptics Models: 156
  - Validity Sensors: 14

### 4.2 Communication Devices
- Audio Devices: 69 (GN Netcom)
- Network Adapters: 52 (Realtek)
- Video Devices: 138 (DisplayLink)

## 5. Risk Assessment

### 5.1 High-Risk Areas
1. **Storage Devices**
   - Unmanaged devices: 12%
   - Non-standard locations: 8%
   - Unauthorized usage: 5%

2. **Data Transfer Points**
   - Production areas: High monitoring
   - Development zones: Restricted access
   - General office: Standard controls

### 5.2 Risk Mitigation Status
| Control Type | Implementation | Coverage |
|--------------|----------------|-----------|
| Device Registration | 94% | Complete |
| Location Tracking | 89% | Active |
| Usage Monitoring | 82% | Partial |

## 6. Compliance Status

### 6.1 Device Management
| Category | Status | Action Required |
|----------|--------|----------------|
| Registered | 98% | Routine |
| Unregistered | 2% | Immediate |
| EOL | 5% | Planning |

### 6.2 Security Controls
- Access Control: Implemented
- Usage Tracking: Active
- Inventory Management: Current
- Risk Assessment: Regular

## 7. Location-Based Controls

### 7.1 High-Security Areas
| Location | Devices | Special Measures |
|----------|---------|-----------------|
| IT Labs | 70 | Full monitoring |
| Production | 66 | Access control |
| Development | 35 | Restricted access |

### 7.2 Standard Areas
| Location | Devices | Controls |
|----------|---------|----------|
| Offices | 138 | Standard |
| Meeting Rooms | 31 | Basic |
| Storage | 37 | Inventory |

## 8. Action Items

### 8.1 Immediate Actions
1. Register remaining unidentified devices
2. Update location tracking
3. Review access controls
4. Implement monitoring improvements

### 8.2 Ongoing Measures
1. Regular inventory audits
2. Access review cycles
3. Policy compliance checks
4. Risk assessments

## Authorization

This document represents the official chronological analysis of USB and peripheral devices at Renata SA and has been prepared under the supervision of the Information Security Management team.

---

*Generated: October 29, 2024*  
*Classification: CONFIDENTIAL*  
*Organization: Renata SA*  
*Reference: REN-USB-CHRON-2024-001*