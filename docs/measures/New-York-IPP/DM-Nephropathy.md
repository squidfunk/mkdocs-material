Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-02-04
ModifyDate: 2016-02-04
AAVersion: 4.9

#Diabetics with Nephropathy Care

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Diabetics with Nephropathy Care |
| **Long Display Name** | Diabetes Mellitus Nephropathy |
| **Short Display Name** | DM Nephropathy |
| **Description** | Percentage of patients 18-75 years of age with diagnosis of diabetes (Type 1 or Type 2) who have nephropathy screening or evidence of nephropathy. |
| **Purpose** | Diabetes mellitus (diabetes) is a group of diseases characterized by high blood glucose levels caused by the body's inability to correctly produce or utilize the hormone insulin (National Institute of Diabetes and Digestive and Kidney Diseases 2011). It is recognized as a leading cause of death and disability in the U.S. and is highly underreported as a cause of death (National Institute of Diabetes and Digestive and Kidney Diseases 2011). Diabetes may cause life-threatening, life-ending or life-altering complications, including end-stage kidney disease. Diabetes is the primary cause of kidney failure, accounting for 44 percent of newly diagnosed cases in 2005 (National Institute of Diabetes and Digestive and Kidney Diseases 2011). |
| **Denominator** | Patient had one or more medical visits in the three years prior to the MP end date.<br>AND<br>Patient had an active diagnosis of Diabetes Type I or Type II at any point during the MP. |
| **Denominator Exclusions** | N/A |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients from denominator with documentation of having a nephropathy screening, or evidence for nephropathy treatment. Evidence for nephropathy treatment includes one of the following: ACE/ARB therapy within the measurement year; Evidence of stage 4 CKD; evidence of ESRD; evidence of a kidney transplant; a visit with a nephrologist; a positive macro albumin test; a urine microalbumin test; at least one ACE-1 or ARB dispensing event within the medical year can be counted towards the numerator. |
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
| **Numerator** | | | N1 OR N2 OR N3 OR N4 OR N5 OR N6 OR N7 OR N8 OR N9 OR N10 |
| |  | N1 | Patient has documentation of an encounter with a Nephrologist during the MP (specialty derived from rendering provider specialty field) |
| | OR | N2 | Patient has an active diagnosis of Stage 4 CKD indicated in HEDIS (CKD Stage 4 Value Set) |
| | OR | N3 | Patient has an active diagnosis of ESRD as indicated in HEDIS (ESRD Value Set) |
| | OR | N4 | Patient has undergone a Kidney Transplant as indicated in HEDIS (Kidney Transplant Value Set) |
| | OR | N5 | Patient has positive urine Macroalbumin test during the MP as indicated by HEDIS (Positive Urine Macroalbumin Tests Value Set, Urine Macroalbumin Tests Value Set) |
| | OR | N6 | Patient is currently on an ACE Inhibitor as listed in the Active Medication tab during the MP |
| | OR | N7 | Patient is currently on an ARB Inhibitor as listed in the Active Medication tab during the MP |
| | OR | N8 | Patient has an order and result from a Microalbumin test during the MP |
| | OR | N9 | Patient has at least one ACE-1 or ARB dispensing event within the MP |
| | OR | N10 | Patient had nephropathy treatment during the MP as indicated in HEDIS (Nephropathy Treatment) |
| | Value Sets | | N2: HEDIS CKD Stage 4<br>N3: HEDIS ESRD<br>N4: HEDIS Kidney Transplant<br>N5: HEDIS Positive Urine Macroalbumin Tests or HEDIS Urine Macroalbumin Tests<br>N9: HEDIS Table CDC-L<br>N10: HEDIS Nephropathy Treatment |
| **Numerator Exclusions** | | | None |
