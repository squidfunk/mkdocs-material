Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-02-04
ModifyDate: 2016-02-04
AAVersion: 4.9

#Diabetics with Blood Pressure Control

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Diabetics with Blood Pressure Control |
| **Long Display Name** | Diabetes: Blood Pressure Control |
| **Short Display Name** | DM BP Control |
| **Description** | Percentage of patients 18-75 years of age with diagnosis of diabetes (Type 1 or Type 2) whose most recent BP was less than 140/90. |
| **Purpose** | High blood pressure is one of the most common risk factors for cardiovascular disease and stroke. Less than half of those with hypertension have their condition controlled. Uncontrolled and untreated hypertension was associated with increased risk of total and cardiovascular mortality among the general hypertensive population. |
| **Denominator** | Patient had one or more medical visits in the three years prior to the MP end date.<br>AND<br>Patient had an active diagnosis of Diabetes Type I or Type II at any point during the MP. |
| **Denominator Exclusions** | N/A |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients from denominator with documentation of their most recent BP value in the MP was less than 140 systolic and less than 90 diastolic. Patient is NOT numerator compliant if the result is missing or if BP was not performed during the measurement year. If there are multiple BPs on the same date of service use the lowest systolic result and the lowest diastolic result, even if from different tests. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria) |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 |
| |  | D1 | Patient had one or more medical visits in the three years prior to the MP end date, indicated by CPT codes in HEDIS (Outpatient Value Set, Observation Value Set, ED Value Set, Acute Inpatient Value Set, Nonacute Inpatient Value Set) |
| | AND | D2 | Patient is 18-75 years of age |
| | AND | D3 | Patient had an active diagnosis of type I diabetes or type II diabetes at any point during the MP as indicated by the ICD codes in HEDIS (Diabetes Value Set) |
| | Value Sets | | D1: HEDIS Outpatient, HEDIS Observation, HEDIS ED, HEDIS Acute Inpatient, HEDIS Nonacute Inpatient<br>D3: HEDIS Diabetes |
| **Denominator Exclusions** | | | None |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | (N1 AND N2) OR N3 |
| |  | N1 | Patient has documentation of at least one completed BP during the MP as indicated by the Arcadia Custom Blood Pressure Code Value Set |
| | AND | N2 | The result of the most recent blood pressure value in the MP was less than 140 systolic and less than 90 diastolic. If there are multiple BPs on the same date of service, use the lowest systolic and the lowest diastolic recorded. These results can be from different tests, as long as they were conducted on the same day |
| | OR | N3 | The most recent codes indicated in HEDIS (Systolic Less Than 140 value Set, Diastolic Less Than 180 Value Set, Diastolic Less Than 80-89 Value Set) |
| | Value Sets | | N1: Arcadia Custom Blood Pressure Code<br>N3: HEDIS Systolic Less Than 140, HEDIS Diastolic Less Than 80, HEDIS Diastolic Less Than 80-89 |
| **Numerator Exclusions** | | | None |
