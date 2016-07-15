Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-02-04
ModifyDate: 2016-02-04
AAVersion: 4.9

#Optimal Diabetes Care Composite 2 (A1c, BP, Nephropathy, & DRE)

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Optimal Diabetes Care Composite 2 (A1c, BP, Nephropathy, & DRE) |
| **Long Display Name** | Optimal Diabetes Care Composite 2 |
| **Short Display Name** | DM Composite 2 |
| **Description** | Percentage of patients 18-75 years of age with diagnoses of diabetes (Type 1 or Type 2) that had their most recent Hemoglobin A1c in control (less than 8), AND whose most recent BP was less than 140/90 AND that had an eye exam from an eye care professional (optometrist or ophthalmologist) within the measurement period AND who have nephropathy screening or evidence of nephropathy. |
| **Purpose** | Diabetes mellitus (diabetes) is a group of diseases characterized by high blood glucose levels caused by the body's inability to correctly produce or utilize the hormone insulin (National Institute of Diabetes and Digestive and Kidney Diseases 2011). It is recognized as a leading cause of death and disability in the U.S. and is highly underreported as a cause of death (National Institute of Diabetes and Digestive and Kidney Diseases 2011). Diabetes may cause life-threatening, life-ending or life-altering complications, including end-stage kidney disease. Diabetes is the primary cause of kidney failure, accounting for 44 percent of newly diagnosed cases in 2005 (National Institute of Diabetes and Digestive and Kidney Diseases 2011). |
| **Denominator** | Patient had one or more medical visits in the three years prior to the MP end date.<br>AND<br>Patient had an active diagnosis of Diabetes Type I or Type II at any point during the MP. |
| **Denominator Exclusions** | N/A |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients from denominator with documentation of their most recent A1c value in the MP less than 8.<br>AND<br>Patients from denominator with documentation of their most recent BP value in the MP less than 140 systolic and less than 90 diastolic.<br>AND<br>Patients from denominator with documentation of a retinal or dilated eye examination during the MP or a negative retinal or dilated eye exam (negative for retinopathy) in the year prior to the MP end date. The rendering provider must be an Ophthalmologist or Optometrist.<br>AND<br>Patients from denominator with documentation of having a nephropathy screening, or evidence for nephropathy treatment. Evidence for nephropathy treatment includes one of the following: ACE/ARB therapy within the measurement year; Evidence of stage 4 CKD; evidence of ESRD; evidence of a kidney transplant; a visit with a nephrologist; a positive macro albumin test; a urine microalbumin test; at least one ACE-1 or ARB dispensing event within the medical year can be counted towards the numerator.<br>Patient is NOT numerator compliant if the result is missing or if BP was not performed during the measurement year. If there are multiple BPs on the same date of service use the lowest systolic result and the lowest diastolic result, even if from different tests. Patient is NOT numerator compliant if the result is missing or if an HbA1c test was not performed during the measurement year. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria) |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 |
| |  | D1 | Patient had one or more medical visits in the three years prior to the MP end date, indicated by CPT codes in HEDIS (Outpatient Value Set, Observation Value Set, ED Value Set, Nonacute Inpatient Value Set, Acute Inpatient Value Set) |
| | AND | D2 | Patient is 18-75 years of age as of the last day of the measurement period |
| | AND | D3 | Patient had an active diagnosis of type I diabetes or type II diabetes at any point during the MP as indicated by the ICD codes in HEDIS (Diabetes Value Set) |
| | Value Sets | | D2: HEDIS Outpatient, HEDIS Observation, HEDIDS ED, HEDIS Nonacute Inpatient, HEDIS Acute Inpatient<br>D3: HEDIS Diabetes |
| **Denominator Exclusions** | | | None |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 AND N2 AND N3 AND N4 AND N5 AND N6 AND N7 AND (N8 OR N9 OR N10 OR N11 OR N12 OR N13 OR N14 OR N15) |
| |  | N1 | Patient has at least one documented HbA1c order in the MP, as indicated by the codes in HEDIS HbA1c Tests Value Set |
| | AND | N2 | Patient has a documented result for the most recent A1c order in the MP |
| | AND | N3 | Value of A1c result from N2 is A1c<8 |
| | AND | N4 | Patient has documentation of at least one completed BP during the MP as indicated by the codes in Arcadia Custom Blood Pressure Numerator Value Set |
| | AND | N5 | The result of the most recent BP value in the MP was less than 140 systolic and less than 90 diastolic, as indicated as a vital in the vitals section of an EHR, or as indicated by a code from the following HEDIS value sets: Systolic Less Than 140, Diastolic Less Than 80, Diastolic 80-89. If there are multiple BPs on the same date of service, use the lowest systolic and the lowest diastolic recorded. These results can be from different tests, as long as they were conducted on the same day |
| | AND | N6 | Patient has had an eye examination during the MP, as specified by the codes in Arcadia Custom Eye Exam Numerator Value Set |
| | AND | N7 | The rendering provider for the eye examination must be an Ophthalmologist or an Optometrist, as specified by the codes in HEDIS (Diabetic Retinal Screening Value Set, Diabetic Retinal Screening Value Set With Eye Care Professional Value Set, and Diabetic Retinal Screening Negative Value Set) |
| | AND | N8 | Patient has documentation of an encounter with a Nephrologist during the MP |
| | OR | N9 | Patient has an active diagnosis of Stage 4 CKD |
| | OR | N10 | Patient has an active diagnosis of ESRD |
| | OR | N11 | Patient has undergone a Kidney Transplant as defined by HEDIS Kidney Transplant Value Set |
| | OR | N12 | Patient has positive urine Macroalbumin test during the MP |
| | OR | N13 | Patient is on an ACE Inhibitor as listed in the Active Medication tab during the MP and defined by the NDC codes in Arcadia Custom Drug/Antibiotic Codes for ACE/ARB Inhibitors Value Set |
| | OR | N14 | Patient is on an ARB Inhibitor as listed in the Active Medication tab during the MP and defined by the NDC codes in Arcadia Custom Drug/Antibiotic Codes for ACE/ARB Inhibitors Value Set |
| | OR | N15 | Patient has an order and result from a Microalbumin test during the MP |
| | Value Sets | | N1: HEDIS HbA1c Tests<br>N4: Arcadia Custom Blood Pressure Numerator<br>N5: HEDIS Systolic Less Than 140, HEDIS Diastolic Less Than 80, HEDIS Diastolic 80-89<br>N6: Arcadia Custom Eye Exam Numerator<br>N7: HEDIS Diabetic Retinal Screening, HEDIS Diabetic Retinal Screening With Eye Care Professional, HEDIS Diabetic Retinal Screening Negative<br>N8: Arcadia Custom Nephropathy Numerator<br>N11: HEDIS Kidney Transplant<br>N13: Arcadia Custom Drug/Antibiotic Codes for ACE/ARB Inhibitors<br>N14: Arcadia Custom Drug/Antibiotic Codes for ACE/ARB Inhibitors |
| **Numerator Exclusions** | | | None |
