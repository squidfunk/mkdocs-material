Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-02-04
ModifyDate: 2016-02-04
AAVersion: 4.9

#Medication Reconciliation Post-discharge

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Medication Reconciliation Post-discharge |
| **Long Display Name** | Medication Reconciliation Post-discharge |
| **Short Display Name** | Medication Reconciliation |
| **Description** | Percentage of discharges of patients 18 years of age or older for whom medications were reconciled on or within 30 days of discharge. |
| **Purpose** | Medications are often changed while a patient is hospitalized. Continuity between inpatient and on-going care is essential to preventing errors. |
| **Denominator** | Discharge of patients 18 years and older from an acute or nonacute inpatient visit.<br>AND<br>Patient had been discharged at least 30 days prior to the MP end date.<br>AND<br>Inpatient discharge NOT followed by a readmission or direct transfer to an acute or nonacute facility within the 30-day follow-up period. |
| **Denominator Exclusions** | N/A |
| **Denominator Exceptions** | N/A |
| **Numerator** | Medication Reconciliation conducted by a prescribing practitioner, clinical pharmacist, or registered nurse.<br>AND<br>Medication reconciliation occurred at an outpatient visit within 30 days of the patient's discharge. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria) |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 |
| |  | D1 | Inpatient discharge occurred during 12 months to 1 month before period end |
| | AND | D2 | Patient is 18 years of age or older at the end of the MP |
| | AND | D3 | Inpatient discharge NOT followed by a readmission or direct transfer to an acute or nonacute facility within the 30-day follow-up period |
| | Value Sets | | D3: HEDIS Acute Inpatient, HEDIS BH Nonacute inpatient, HEDIS Nonacute Inpatient, Arcadia Custom Inpatient Discharge (maintenance) |
| **Denominator Exclusions** | | | None |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | Medication reconciliation conducted by a prescribing practitioner, clinical pharmacist or registered nurse within 30 days of discharge date |
| | Value Sets | | N1: HEDIS Medication Reconciliation, Arcadia Custom Medication Reconciliation (maintenance) |
| **Numerator Exclusions** | | | None |
