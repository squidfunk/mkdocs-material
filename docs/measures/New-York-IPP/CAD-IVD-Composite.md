Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-02-04
ModifyDate: 2016-02-04
AAVersion: 4.9

#Optimal CAD/IVD Care Composite (BP AND ASA)

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Optimal CAD/IVD Care Composite (BP AND ASA) |
| **Long Display Name** | Optimal CAD/IVD Care Composite |
| **Short Display Name** | CAD/IVD Composite |
| **Description** | The percentage of patients 18-75 years of age who had a diagnosis of Obstructive or non-obstructive CAD or ischemic vascular disease and who are on aspirin or other antithrombolytic therapy and whose most recent BP in the measurement year was <140/90. |
| **Purpose** |  |
| **Denominator** | Patient had one or more medical visits in the three years prior to the MP end date.<br>AND<br>Patient had an active diagnosis of Obstructive or non obstructive CAD or ischemic vascular disease at any point during the MP. |
| **Denominator Exclusions** | Patients with a history of bleeding disorder, allergy to aspirin or antithrombotic medication. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients from denominator with documentation of an active order for aspirin or other antithrombolytic therapy.<br>AND<br>Patients from denominator with documentation of their most recent BP value in the MP less than 140 systolic and less than 90 diastolic. Patient is NOT numerator compliant if the result is missing or if BP was not performed during the measurement year. If there are multiple BPs on the same date of service use the lowest systolic result and the lowest diastolic result, even if from different tests. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria)<br><br>Remove patients from the denominator and numerator if they meet the *denominator exclusion* criteria. |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 |
| |  | D1 | Patient had one or more medical visits in the three years prior to the MP end date, indicated by CPT codes in indicated by CPT codes in Arcadia Custom CAD/IVD Denominator Value Set |
| | AND | D2 | Patient is 18-75 years of age as of the last day of the measurement period |
| | AND | D3 | Patient had an active diagnosis of Obstructive or non-obstructive CAD or ischemic vascular disease at any point during the MP as indicated by Arcadia Custom CAD/IVD Denominator Value Set |
| | Value Sets | | D1: Arcadia Custom CAD/IVD Denominator<br>D2: Arcadia Custom CAD/IVD Denominator |
| **Denominator Exclusions** | | | EX1 |
| |  | EX1 | Patients with a history of bleeding disorder, allergy to aspirin or antithrombotic medication as indicated by the codes in Arcadia Custom Antithrombotic Therapy Denominator Exclusion Value Set |
| | Value Sets | | EX1: Arcadia Custom Antithrombotic Therapy Denominator Exclusion |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 AND N2 AND N3 |
| |  | N1 | Patient has documentation of a new or existing ACTIVE order for aspirin or other antithrombolytic therapy, as indicated by the codes in Arcadia Custom Antithrombotic Therapy Numerator Value Set |
| | AND | N2 | Patient has documentation of at least one completed BP during the MP as indicated by the codes in Arcadia Custom Blood Pressure Numerator Value Set |
| | AND | N3 | The result of the most recent BP value in the MP was less than 140 systolic and less than 90 diastolic, as indicated as a vital in the vitals section of an EHR, or as indicated by a code from the following HEDIS value sets: Systolic Less Than 140, Diastolic Less Than 80, Diastolic 80-89. If there are multiple BPs on the same date of service, use the lowest systolic and the lowest diastolic recorded. These results can be from different tests, as long as they were conducted on the same day |
| | Value Sets | | N1: Arcadia Custokm Antithrombotic Therapy Numerator<br>N2: Arcadia Custom Blood Pressure Numerator<br>N3: HEDIS Systolic Less Than 140, HEDIS Diastolic Less Than 80, HEDIS Diastolic 80-89 |
| **Numerator Exclusions** | | | None |
