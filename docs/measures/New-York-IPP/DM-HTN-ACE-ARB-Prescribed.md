Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-02-04
ModifyDate: 2016-02-04
AAVersion: 4.9

#Diabetes Hypertension ACE/ARB Prescription

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Diabetes Hypertension ACE/ARB Prescription |
| **Long Display Name** | Diabetes Hypertension ACE/ARB Prescription |
| **Short Display Name** | DM/HTN ACE/ARB Prescribed |
| **Description** | The percentage of patients 18-75 years of age with diabetes (type 1 and type 2) and Hypertension who are taking an ACE-I or an ARB medication. |
| **Purpose** | Appropriate medication management targeting glycemic control, hypertension, and lipid management is important for reducing morbidity and mortality, and improving long-term quality of life for patients diagnosed with Diabetes. Lifestyle changes such as nutrition therapy, weight loss, increased exercise, and appropriate education and self-management strategies are pivotal to improved outcomes. Inadequate access to care for chronic disease management as well as the cost of medication can contribute to poor control of T2DM and associated cardiovascular risk factors. |
| **Denominator** | Patient had one or more medical visits in the three years prior to the MP end date.<br>AND<br>Patient had an active diagnosis of Diabetes Type I or Type II and Hypertension at least 90 days prior to MP start date. |
| **Denominator Exclusions** | Patient has an allergy to ACE/ARB. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patient is prescribed ACE-I or ARB at least once in the measurement period. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria)<br><br>Remove patients from the denominator and numerator if they meet the *denominator exclusion* criteria. |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 |
| |  | D1 | Patient had one or more medical visits in the three years prior to the MP end date as indicated by the CPT codes in HEDIS (Outpatient CPT Value Set) |
| | AND | D2 | Patient is 18-75 years of age as of the last day of the measurement period |
| | AND | D3 | Patient had at least one diagnosis of type I diabetes or type II diabetes and at least one diagnosis of Hypertension in the three years prior to the MP end date as indicated by the ICD codes in HEDIS (Diabetes Value Set, Hypertension Value Set) |
| | Value Sets | | D1: HEDIS Outpatient CPT<br>D3: HEDIS Diabetes, HEDIS Hypertension |
| **Denominator Exclusions** | | | EX1 |
| |  | EX1 | Patient has contraindication to ACE/ARB as indicated by the CPT codes in Arcadia Custom ACE, ARB, & Statin Exclusion Value Set |
| | Value Sets | | EX1: Arcadia Custom ACE, ARB, & Statin Exclusion |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | At least one prescription for ACE-I or ARB was active at any time in the MP.<br>*Will look back to 120 days before MP start date to include prescriptions that may have started before the measurement period began |
| **Numerator Exclusions** | | | None |
