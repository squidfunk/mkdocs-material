Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-02-04
ModifyDate: 2016-02-04
AAVersion: 4.9

#Hypertension BP Control

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Hypertension BP Control |
| **Long Display Name** | Hypertension Control BP<140/90 |
| **Short Display Name** | HTN BP Control |
| **Description** | The percentage of patients 18-85 years of age who had a diagnosis of Hypertension and whose most recent BP was adequately controlled during the measurement year based on the following criteria:<br>-Members 18-59 years of age whose BP was <140/90 mmHg<br>-Members 60-85 years of age with a diagnosis of diabetes whose BP was <140/90 mmHg<br>-Members 60-85years of age without a diagnosis of diabetes whose BP was <150/90 mmHg. |
| **Purpose** | Approximately 67 million Americans have high blood pressure (Centers for Disease Control and Prevention [CDC], 2012). Treatment to improve hypertension includes dietary and lifestyle changes, as well as appropriate use of medications. |
| **Denominator** | Patient had one or more medical visits in the three years prior to the MP end date.<br>AND<br>Patient had an active diagnosis of Hypertension at any point during the MP. |
| **Denominator Exclusions** | Patients who have evidence of ESRD or have undergone a kidney transplant on or prior to the MP end date.<br><br>Patients who were pregnant during the measurement period. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients from denominator with documentation of their most recent BP value in the MP was less than 140 systolic and less than 90 diastolic. Patient is NOT numerator compliant if the result is missing or if BP was not performed during the measurement year. If there are multiple BPs on the same date of service use the lowest systolic result and the lowest diastolic result, even if from different tests. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria)<br><br>Remove patients from the denominator and numerator if they meet the *denominator exclusion* criteria. |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 |
| |  | D1 | Patient had one or more medical visits in the three years prior to the MP end date as indicated by CPT codes in HEDIS (Outpatient CPT Value Set) |
| | AND | D2 | Patient is 18-85 years of age as of the MP end date |
| | AND | D3 | Patient had an active diagnosis of hypertension at any point during the MP as indicated by codes in HEDIS (Essential Hypertension Value Set) |
| | Value Sets | | D1: HEDIS Outpatient CPT<br>D3: HEDIS Essential Hypertension |
| **Denominator Exclusions** | | | EX1 OR EX2 |
| |  | EX1 | Patients who have an active diagnosis of ESRD or have undergone a kidney transplant on or prior to the MP end date, as indicated by codes in HEDIS (ESRD Value Set, ESRD Obsolete Value Set, or Kidney Transplant Value Set) |
| | OR | EX2 | Patients who were pregnant during the MP as indicated by codes in HEDIS Pregnancy Value Set |
| | Value Sets | | EX1: HEDIS ESRD, HEDIS ESRD Obsolete, HEDIS Kidney Transplant<br>EX2: HEDIS Pregnancy |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 AND ((N2 AND N3) OR (N4 AND N5 AND N6 AND (N7 OR N8)) OR (N9 AND N10)) |
| |  | N1 | Patient has documentation of at least one completed BP, as indicated by the Arcadia Custom Blood Pressure Numerator Value Set, during the MP. If there are multiple BPs on the same date of service, use the lowest systolic and the lowest diastolic recorded. These results can be from different readings, as long as they were conducted on the same day |
| | AND | N2 | Patient is between the ages of 18-59 at the end of the MP |
| | AND | N3 | The result of the most recent BP value in the MP was less than 140 mm/hg systolic AND less than 90 mm/hg diastolic |
| | OR | N4 | Patient is between the ages of 60-85 at the end of the MP |
| | AND | N5 | Patient has a diagnosis of diabetes, from outpatient, inpatient encounter, or pharmacy data, during the MP or the year prior to the MP |
| | AND | N6 | The result of the most recent BP value in the MP was less than 140 mm/hg systolic AND less than 90 mm/hg diastolic |
| | AND | N7 | Patient has NOT had a diagnosis of polycystic ovaries prior to the last day MP |
| | OR | N8 | Patient has NOT had a diagnosis of gestational diabetes or steroid-induced diabetes during the MP or the year prior to the measurement period |
| | OR | N9 | Patient is between the ages of 60-85 without diabetes |
| | AND | N10 |  The result of the most recent BP value in the MP was less than 150 mm/hg systolic AND less than 90 mm/hg diastolic |
| | Value Sets | | N1: Arcadia Custom Blood Pressure Numerator |
| **Numerator Exclusions** | | | None |
