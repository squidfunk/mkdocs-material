Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-04-13
ModifyDate: 2016-02-13
AAVersion: 4.9

#Use of High-Risk Medications in the Elderly - Dispensing

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Use of High-Risk Medications in the Elderly - Dispensing |
| **Long Display Name** | Use of High-Risk Medications in the Elderly (Less than 2) |
| **Short Display Name** | High-Risk Meds in Elderly |
| **Description** | The percentage of patients 66 years of age and older who received less than two different high-risk medications. |
| **Purpose** | This patient safety measure addresses medication management to prevent the harms associated with certain medications in the elderly. It identifies high-risk medications that should be avoided in the elderly population. Certain medications are associated with increased risk of harms from drug side-effects and drug toxicity, and pose a concern for patient safety (McLeod et al., 1997; Murray, 2000; Roose & Spatz, 1999). There is clinical consensus that these drugs pose increased risks in the elderly (Graal & Wolffenbuttel, 1999; Zhan et al., 2001; Fick et al., 2003). |
| **Denominator** | Patients 66 and older as of the end of the measurement period. |
| **Denominator Exclusions** | N/A |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients who received less than two high-risk medications during the measurement period. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria) |
| **Notes** | Based on HEDIS 2016 Physician Measurement measure. This measure is the inverse of the HEDIS measure, which reports the percentage of patients who received two or more different high-risk medications; that means a higher score is better for this measure, whereas in the HEDIS measure a lower score is better. The current product does not support highly detailed dosage data, so medications that only count as high-risk past a certain dosage (medications from Table DAE-C) will NOT be counted as high-risk medications. |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 |
| |  | D1 | Patient age >= 66 at measurement period end |
| | AND | D2 | Patient had BCBS pharmacy benefit coverage for entire MP |
| | AND | D3 | Patient had 1 or more medical visits in the 3 years prior to the MP end date as indicated by HEDIS Outpatient CPT Value Set |
| | Value Sets | | D3: HEDIS Outpatient CPT |
| **Denominator Exclusions** | | | None |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | Patient had fewer than 2 high-risk medications dispensed during the year before measurement period end. Note that medications from Table DAE-B only count as high-risk when they cover more than 90 days. See below before details concerning high risk medications |
| | Value Sets | | N1: High-Risk Medications (Table DAE-A); High-Risk Medications with Days Supply Criteria (Table DAE-B) |
| **Numerator Exclusions** | | | None |
