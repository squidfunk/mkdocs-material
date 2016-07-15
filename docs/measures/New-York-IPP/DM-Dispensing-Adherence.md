Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-04-13
ModifyDate: 2016-02-13
AAVersion: 4.9

#Medication Adherence for Diabetes Medications - Dispensing

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Medication Adherence for Diabetes Medications - Dispensing |
| **Long Display Name** | Diabetes Medication Adherence (Dispensing Version) |
| **Short Display Name** | DM Dispensing Adherence |
| **Description** | Percentage of patients 18 years and older that fill their prescribed drug therapy across classes of diabetes medications: biguanides, sulfonylureas, thiazolidinediones, DiPeptidyl Peptidase (DPP)-IV Inhibitors, incretin mimetics, meglitinides and sodium glucose cotransporter 2 (SGLT) inhibitors, to cover 80% or more of the time they are supposed to be taking the medication. |
| **Purpose** |  One of the most important ways patients can manage their health is by taking medication as directed. The plan, the doctor, and the member can work together to find ways to help the member take their medication as directed. Percent of plan members with a prescription for diabetes medication who fill their prescription often enough to cover 80% or more of the time they are supposed to be taking the medication. |
| **Denominator** | Patients 18 years and older with Diabetes. |
| **Denominator Exclusions** | Patients identified as having steroid induced diabetes, gestational diabetes, ESRD or a prescription for insulin. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients from denominator who were dispensed Diabetes medication for at least 80% of the measurement period. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria)<br><br>Remove patients from the denominator and numerator if they meet the *denominator exclusion* criteria. |
| **Notes** | According to Medicare 2016 Part C and D Star Rating Technical Notes: "Diabetes medication" means a biguanide drug, a sulfonylurea drug, a thiazolidinedione drug, a DPP-IV inhibitor, an incretin mimetic drug, a meglitinide drug or a SGLT2 inhibitor. Plan members who take insulin are not included. Accordingly, we have removed Insulin and Amylin from HEDIS Table CDC-A to define diabetes medication prescriptions. Also, Insulin medications from HEDIS Table CDC-A have been used for the exclusion criteria. |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND (D3 OR D4) AND D5 |
| |  | D1 | 18 years or older at measurement period start |
| | AND | D2 | Patient had BCBS Pharmacy Benefit Coverage for the entire measurement period |
| | AND | D3 | 2 dispensed prescriptions for diabetes medication during the measurement period |
| | OR | D4 | An assessment of Diabetes during the measurement period |
| | AND | D5 | Patient had 1 or more medical visits in the 3 years prior to the MP end date as indicated by HEDIS Outpatient CPT Value Set |
| | Value Sets | | D3: HEDIS Drug table CDC-A (Prescriptions to Identify Members with Diabetes- Insulin and Amylin drugs removed)<br>D4: HEDIS Diabetes<br>D5: HEDIS Outpatient CPT |
| **Denominator Exclusions** | | | EX1 OR EX2 OR EX3 |
| |  | EX1 | Gestational or Steroid Induced Diabetes during 24 months before period end |
| | OR | EX2 | A diagnosis of ESRD during the measurement period |
| | OR | EX3 | A prescription for insulin dispensed during the measurement period |
| | Value Sets | | EX1: HEDIS Diabetes Exclusions<br>EX2: HEDIS ESRD<br>EX3: HEDIS Drug table CDC-A (Prescriptions to Identify Members with Diabetes- Insulin only) |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | Dispensed medication covering at least 80% of the measurement period |
| | Value Sets | | N1: HEDIS Drug table CDC-A (Prescriptions to Identify Members with Diabetes- Insulin and Amylin drugs removed) |
| **Numerator Exclusions** | | | None |
