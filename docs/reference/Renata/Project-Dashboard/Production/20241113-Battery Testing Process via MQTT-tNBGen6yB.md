# Battery Testing Process via MQTT

## 1. Introduction

The Lightning-Welding System (ASA) executes a series of 20 automated tests on each battery. Each test is designed with distinct objectives, boundary conditions, and quality implications. This document provides a comprehensive analysis of each stage involved in the testing process.

The following message contains the inspection results for a single battery, identified by `orderId` and `itemId`. It includes 20 inspection readings, each with `limitMax`, `limitMin`, `uom`, `value`, and `result` fields. The `result` field indicates whether the inspection passed or failed.

```json
{
  "id": "message_07f7cd5b-1fcb-4357-9580-404cbfbd591d",
  "createAt": "2024-11-07 18:11:13:262",
  "out": false,
  "payload": {
    "orderId": 10041663,
    "itemId": 40200,
    "inspection1": { ... },
    "inspection2": { ... },
    ...
  },
  "qos": 2,
  "retain": false,
  "topic": "RenataBatteriesSA/Itingen/ASA/inspection-results",
  "meta": {
    "msgType": "JSON"
  },
  "connectionId": "6e6a3755-7999-4add-9e98-2c106aa2e5ba"
}
```

The following additional message contains material consumption data:

```json
{
  "id": "message_572ce28a-1676-4131-ae73-f679020b42a3",
  "createAt": "2024-11-07 18:11:30:612",
  "out": false,
  "payload": {
    "orderId": 10041663,
    "type": 1,
    "materialId": 2002420,
    "quantity": 0.12,
    "uom": "m",
    "timestamp": 1730999486593
  },
  "qos": 2,
  "retain": false,
  "topic": "RenataBatteriesSA/Itingen/ASA/quantities",
  "meta": {
    "msgType": "JSON"
  },
  "connectionId": "6e6a"
}
```

## 2. Overview of the Test Sequence

### 2.1 Process Flow Sequence

```plaintext
┌─────────────────┐
│ Station 2       │
├─────────────────┤         ┌─────────────────┐         ┌─────────────────┐
│ - DMC Reading   │    →    │ Station 8       │    →    │ Station 10      │
│ - Initial Check │         │ - Thickness     │         │ - Welding       │
│ - Electrical    │         │ - Height        │         │ - Positioning   │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

### 2.2 Temporal Sequence (Derived from Real-Time Messaging)

```plaintext
Start: DMC Inspection  (0ms)      → inspection1
↓
Mechanical Inspections (+4.075ms) → inspection2-14
↓
Welding Inspection    (+5.792ms)  → specific inspections
↓
Electrical Tests      (+22.417ms) → inspection15-18
```

## 3. Detailed Analysis of Inspection Positions

### 3.1 Position 1: Data Matrix Code (DMC) Quality

```json
"inspection1": {
    "limitMax": 0,
    "limitMin": 0,
    "value": 0,
    "uom": "%",
    "result": true,
    "timestamp": 1730999366405
}
```

**Objective**: Validate the quality and readability of the DMC marking.

- **Location**: Station 2 (KSR St.2)
- **Significance**: Essential for traceability in the production process.
- **Typical Metrics**: Binary outcome of Pass/Fail, indicated as 0/100%.
- **Frequent Issues**: Insufficient contrast, damaged or degraded codes.

### 3.2 Position 2: Battery Thickness

```json
"inspection2": {
    "limitMax": 1.87,
    "limitMin": 1.67,
    "value": 1.846,
    "uom": "mm",
    "result": true,
    "timestamp": 1730999370480
}
```

**Objective**: Ensure that the battery thickness is within acceptable tolerances for proper assembly.

- **Location**: Station 8 (KSR St.8)
- **Measurement Point**: Central area of the battery.
- **Critical Dimensional Specifications**:
  - Target Thickness: 1.77mm ± 0.10mm
  - Measured Value Example: 1.846mm (within permissible limits)
- **Quality Implications**:
  - Excessive Thickness: Potential assembly complications.
  - Insufficient Thickness: Potential indicator of missing components.

### 3.3-3.8 Weld Point Quality Checks

```json
"inspection3": {
    "limitMax": 80,
    "limitMin": 5,
    "value": 11,
    "uom": "%px",
    "result": true,
    "timestamp": 1730999372197
},
// ... (Inspections 4-8 follow similar pattern)
```

**Objective**: Conduct an optical inspection of the weld points for integrity.

- **Location**: Station 10 (KSR St.10)
- **Measurement Specifics**:
  - Positions 3-5: Positive Terminal Weld Points (3 discrete points).
  - Positions 6-8: Negative Terminal Weld Points (3 discrete points).
- **Methodology**: Optical pixel analysis used to quantify weld quality.
- **Quality Parameters**:
  - Positive Terminal: Acceptable range of 5-80 pixels.
  - Negative Terminal: Acceptable range of 5-50 pixels.
- **Common Deficiencies**:
  - Insufficient Weld: < 5 pixels.
  - Excessive Weld: Exceeds pixel threshold.
  - Asymmetrical Welds: Indicate improper energy distribution.

### 3.9-3.11 Terminal Height Measurements

```json
"inspection9": {
    "limitMax": 0,
    "limitMin": 0,
    "value": -0.141,
    "uom": "mm",
    "result": true,
    "timestamp": 1730999371930
},
"inspection10": {
    "limitMax": 0,
    "limitMin": 0,
    "value": -0.128,
    "uom": "mm",
    "result": true,
    "timestamp": 1730999371930
},
"inspection11": {
    "limitMax": 0.2,
    "limitMin": -0.2,
    "value": -0.013,
    "uom": "mm",
    "result": true,
    "timestamp": 1730999371930
}
```

**Objective**: Verify the height accuracy of the terminal welds.

- **Location**: Station 8/10 (KSR St.8/10)
- **Measurements**:
  - Position 9: Height of Negative Terminal.
  - Position 10: Height of Positive Terminal.
  - Position 11: Differential Height Measurement.
- **Critical Specifications**:
  - Standard Reference Height: 0mm.
  - Maximum Permissible Difference: ± 0.2mm.
- **Quality Implications**:
  - Significant height deviations can disrupt downstream assembly.
  - Precision is crucial for compatibility with automated handling systems.

### 3.12-3.14 Terminal Position Measurements

```json
"inspection12": {
    "limitMax": 2.3,
    "limitMin": 1.7,
    "value": 2.0,
    "uom": "mm",
    "result": true,
    "timestamp": 1730999372197
},
// ... (Inspections 13-14 similar)
```

**Objective**: Confirm the precise positioning of the battery terminals.

- **Location**: Station 10 (KSR St.10)
- **Measurements**:
  - Position 12: Gap between terminals.
  - Position 13: Position of the Negative Terminal.
  - Position 14: Position of the Positive Terminal.
- **Dimensional Standards**:
  - Terminal Gap: 2.0mm ± 0.3mm.
  - Terminal Position: 10.4mm ± 0.4mm.

### 3.15-3.18 Electrical Measurements

```json
"inspection15": {
    "limitMax": 1.7,
    "limitMin": 1.57,
    "value": 1.588,
    "uom": "V",
    "result": true,
    "timestamp": 1730999388822
},
// ... (Inspections 16-18 follow)
```

**Objective**: Validate the electrical characteristics of the battery.

- **Location**: Packing Station 2
- **Testing Sequence**:
  1. Open Circuit Voltage (U0).
  2. Load Voltage (U2).
  3. Internal Resistance (Ri).
  4. Temperature Monitoring.
- **Specifications**:
  - U0: Acceptable range of 1.57V - 1.70V.
  - U2: Acceptable range of 1.36V - 1.52V.
  - Ri: Resistance between 0Ω - 30Ω.
  - Temperature: 0°C - 100°C (monitoring only).

### 3.19-3.20 Special Status Flags

```json
"inspection19": {
    "limitMax": 0,
    "limitMin": 0,
    "value": 0,
    "uom": "true/false",
    "result": false,
    "timestamp": 1730999388822
},
"inspection20": {
    "limitMax": 0,
    "limitMin": 0,
    "value": 0,
    "uom": "true/false",
    "result": false,
    "timestamp": 1730999388822
}
```

**Objective**: Indicate critical system states.

- **Position 19**: Non-OK Status/Operator Intervention Required.
- **Position 20**: Sample Part Indicator.
- **Applications**:
  - Quality Assurance and Traceability.
  - Process Validation.
  - Measurement Systems Analysis (MSA).

## 4. Material Consumption Reports

### 4.1 Material Types

```json
{
  "orderId": 10041663,
  "type": 1,
  "materialId": 2002468,
  "quantity": 0.12,
  "uom": "m",
  "timestamp": 1730999464987
}
```

**Material Tracking**:

- **Type 1**: Raw Material Consumption.
- **Type 2**: Finished Products.
- **Type 3**: Scrap or Defective Parts.

### 4.2 Material Pairing

Example derived from real-time messages:

```plaintext
Material 2002468: 0.12m @ 1730999464987
Material 2002420: 0.12m @ 1730999464991
Time Difference: 4ms
```

- Materials are always used in pairs.
- Consumption is synchronized.
- Quantities are matched precisely.

