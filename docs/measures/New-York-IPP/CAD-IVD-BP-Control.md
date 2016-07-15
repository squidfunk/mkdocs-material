Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-02-04
ModifyDate: 2016-02-04
AAVersion: 4.9

#CAD/IVD Patients with BP <140/90

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | CAD/IVD Patients with BP <140/90 |
| **Long Display Name** | Coronary Artery Disease/Ischemic Vascular Disease: Blood Pressure Control |
| **Short Display Name** | CAD/IVD BP Control |
| **Description** | The percentage of patients 18-75 years of age who had a diagnosis of obstructive or non-obstructive CAD or ischemic vascular disease and whose most recent BP in the measurement year was <140/90. |
| **Purpose** | Treatment of coronary artery disease is aimed at controlling symptoms and slowing or stopping the progression of disease.  |
| **Denominator** | Patients had one or more medical visits in the three years prior to the MP end date.<br>AND<br>Patients had an active diagnosis of obstructive or non-obstructive CAD or ischemic vascular disease at any point during the MP. |
| **Denominator Exclusions** | N/A |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients from denominator with documentation of their most recent BP value in the MP less than 140 systolic and less than 90 diastolic. Patient is NOT numerator compliant if the result is missing or if BP was not performed during the measurement year. If there are multiple BPs on the same date of service use the lowest systolic result and the lowest diastolic result, even if from different tests. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria) |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 |
| |  | D1 | Patient had one or more medical visits in the three years prior to the MP end date as indicated by CPT codes in Arcadia Custom CAD/IVD Denominator |
| | AND | D2 | Patient is 18-75 years of age |
| | AND | D3 | Patient had an active diagnosis of CAD/IVD at any point during the MP as indicated by the Arcadia Custom CAD/IVD Denominator Value Set |
| | Value Sets | | D1: Arcadia Custom CAD/IVD Denominator<br>D3: Arcadia Custom CAD/IVD Denominator |
| **Denominator Exclusions** | | | None |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | (N1 AND N2) OR N3 |
| |  | N1 | Patient has documentation of at least one completed BP during the MP as indicated by the codes in Arcadia Custom Blood Pressure Numerator Value Set |
| | AND | N2 | The result of the most recent BP value in the MP was less than 140 systolic and less than 90 diastolic. If there are multiple BPs on the same date of service, use the lowest systolic and the lowest diastolic recorded. These results can be from different tests, as long as they were conducted on the same day |
| | OR | N3 | The most recent codes indicated in HEDIS (Systolic Less Than 140 value Set, Diastolic Less Than 180 Value Set, Diastolic Less Than 80-89 Value Set) |
| | Value Sets | | N1: Arcadia Custom Blood Pressure Numerator<br>N3: HEDIS Systolic Less Than 140, HEDIS Diastolic Less Than 80, HEDIS Diastolic Less Than 80-89 |
| **Numerator Exclusions** | | | None |
