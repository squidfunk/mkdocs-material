Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-02-04
ModifyDate: 2016-02-04
AAVersion: 4.9

#Diabetics with HbA1c < 8.0

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Diabetics with HbA1c < 8.0 |
| **Long Display Name** | Diabetes: Hemoglobin A1c |
| **Short Display Name** | DM A1c<8.0 |
| **Description** | Percentage of patients 18-75 years of age with diagnosis of diabetes (Type 1 or Type 2) that had their most recent Hemoglobin A1c in control (less than 8). |
| **Purpose** | Diabetes mellitus (diabetes) is a group of diseases characterized by high blood glucose levels caused by the body's inability to correctly produce or utilize the hormone insulin. It is recognized as a leading cause of death and disability in the U.S. and is highly underreported as a cause of death. Diabetes may cause life-threatening, life-ending or life-altering complications, including poor circulation, nerve damage or neuropathy in the feet and eventual amputation. Nearly 60-70 percent of diabetics suffer from mild or severe nervous system damage (American Diabetes Association 2009). Randomized clinical trials have demonstrated that improved glycemic control, as evidenced by reduced levels of glycohemoglobin, correlates with a reduction in the development of microvascular complications in both Type 1 and Type 2 diabetes (Diabetes Control and Complications Trial Research Group 1993; Ohkubo 1995). |
| **Denominator** | Patient had one or more medical visits in the three years prior to the MP End Date.<br>AND<br>Patient had an active diagnosis of Diabetes Type I or Type II at any point during the MP. |
| **Denominator Exclusions** | N/A |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients from denominator with documentation of their most recent A1c value in the MP was less than 8. Patient is NOT numerator compliant if the result is missing or if an HbA1c test was not performed during the measurement year. |
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
| |  | N1 | Patient has a documented result for the most recent A1c order in the MP as noted by HEDIS (HbA1c Tests Value Set) |
| | AND | N2 | Value of the A1c result from N1 is A1c<8 |
| | OR | N3 | Claim generated with CPT2 Codes of 3044F |
| | Value Sets | | N1: HEDIS HbA1c Tests |
| **Numerator Exclusions** | | | None |
