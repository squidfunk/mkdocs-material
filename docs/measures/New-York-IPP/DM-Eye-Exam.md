Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-02-04
ModifyDate: 2016-02-04
AAVersion: 4.9

#Diabetics with Eye Examinations

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Diabetics with Eye Examinations |
| **Long Display Name** | Diabetes: Eye Exam |
| **Short Display Name** | DM Eye Exam |
| **Description** | Percentage of patients 18-75 years of age with diagnosis of diabetes (Type 1 or Type 2) that had an eye exam from an eye care professional (optometrist or ophthalmologist) within the measurement period. |
| **Purpose** | Diabetes mellitus (diabetes) is a group of diseases characterized by high blood glucose levels caused by the body's inability to correctly produce or utilize the hormone insulin (National Institute of Diabetes and Digestive and Kidney Diseases 2011). It is recognized as a leading cause of death and disability in the U.S. and is highly underreported as a cause of death (National Institute of Diabetes and Digestive and Kidney Diseases 2011). Diabetes may cause life-threatening, life-ending or life-altering complications, including end-stage kidney disease. Diabetic retinopathy is the most common diabetic eye disease and causes 21,000-24,000 new cases of blindness annually. |
| **Denominator** | Patient had one or more medical visits in the three years prior to the MP end date.<br>AND<br>Patient had an active diagnosis of Diabetes Type I or Type II at any point during the MP. |
| **Denominator Exclusions** | N/A |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients from denominator with documentation of a retinal or dilated eye examination during the MP or a negative retinal or dilated eye exam (negative for retinopathy) in the year prior to the MP start date. The rendering provider must be an Ophthalmologist or Optometrist. |
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
| |  | N1 | Patient has had an eye examination during the MP, as specified by the codes in HEDIS (Diabetic Retinal Screening Value Set, Diabetic Retinal Screening with Eye Care Professional Value Set) |
| | AND | N2 | The rendering provider for the eye examination must be an Ophthalmologist or an Optometrist, as specified by the codes in the Arcadia Custom Ophthalmology/Optometry Rendering Provider Eligibility value set |
| | OR | N3 | Patient had a negative result for a retinal or dilated eye exam (negative for retinopathy) in the year prior to the MP start date as indicated by a claim generated with a CPT II code of 3072F or any code in the Diabetic Retinal Screening Negative Value Set or other negative results data field |
| | Value Sets | | N1: HEDIS Diabetic Retinal Screening, HEDIS Diabetic Retinal Screening with Eye Care Professional<br>N2: Arcadia Custom Ophthalmology/Optometry Rendering Provider Eligibility<br>N3: HEDIS Diabetic Retinal Screening Negative |
| **Numerator Exclusions** | | | None |
