Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-02-04
ModifyDate: 2016-02-04
AAVersion: 4.9

#Statin Prescription Coverage for Diabetes Patients

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Statin Prescription Coverage for Diabetes Patients |
| **Long Display Name** | Statin Prescription Coverage for Diabetes Patients |
| **Short Display Name** | DM Statin Rx Coverage |
| **Description** | The percentage of patients 18-75 years of age with diabetes (type 1 and type 2) who are taking their statin medication as prescribed. |
| **Purpose** | Appropriate medication management targeting glycemic control, hypertension, and lipid management is important for reducing morbidity and mortality, and improving long-term quality of life for patients diagnosed with Diabetes. Lifestyle changes such as nutrition therapy, weight loss, increased exercise, and appropriate education and self-management strategies are pivotal to improved outcomes. Inadequate access to care for chronic disease management as well as the cost of medication can contribute to poor control of T2DM and associated cardiovascular risk factors. |
| **Denominator** | Patient had one or more medical visits in the three years prior to the MP end date.<br>AND<br>Patient had an active diagnosis of Diabetes Type I or Type II at least 90 days prior to the MP start date.<br>AND<br>Patient is prescribed a statin medication at least 90 days prior to the MP start date. |
| **Denominator Exclusions** | Patient has an allergy to statins. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patient has an active prescription for at least 80% of the measurement period. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria)<br><br>Remove patients from the denominator and numerator if they meet the *denominator exclusion* criteria. |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 AND D4 |
| |  | D1 | Patient had one or more medical visits in the three years prior to the MP end date, as indicated by CPT codes in HEDIS (Outpatient Value Set, Observation Value Set, ED Value Set, Acute Inpatient Value Set, Nonacute Inpatient Value Set) |
| | AND | D2 | Patient is 18-75 years of age as of the last day of the measurement period |
| | AND | D3 | Patient had at least one diagnosis of type I diabetes or type II diabetes during the three years before MP End Date, as indicated by the ICD codes in HEDIS (Diabetes Value Set) |
| | AND | D4 | Patient had at least one active prescription between 3 years before MP End Date and 90 days before MP Start Date as indicated by the NDC codes in Arcadia Custom Drug Codes for Statin Inclusion Value Set) |
| | Value Sets | | D1: HEDIS Outpatient, HEDIS Observation, HEDIS ED, HEDIS Acute Inpatient, HEDIS Nonacute Inpatient<br>D3: HEDIS Diabetes<br>D4: Arcadia Custom Drug Codes for Statin Inclusion |
| **Denominator Exclusions** | | | EX1 |
| |  | EX1 | Patient has contraindication to Statins as indicated by the CPT codes in Arcadia Custom ACE, ARB, & Statin Exclusion Value Set |
| | Value Sets | | EX1: Arcadia Custom ACE, ARB, & Statin Exclusion |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | For at least 80% of the MP the patient must have at least one prescription for statin active as indicated by the NDC codes in Arcadia Custom Drug Codes for Statin Inclusion Value Set |
| | Value Sets | | N1: Arcadia Custom Drug Codes for Statin Inclusion |
| **Numerator Exclusions** | | | None |
