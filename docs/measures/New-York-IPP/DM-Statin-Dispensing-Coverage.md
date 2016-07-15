Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-02-04
ModifyDate: 2016-02-04
AAVersion: 4.9

#Statin Dispensing Coverage for Diabetes Patients Currently on Medication

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Statin Dispensing Coverage for Diabetes Patients Currently on Medication |
| **Long Display Name** | Statin Dispensing Coverage for Diabetes Patients Currently on Medication |
| **Short Display Name** | DM Statin Dispensing Coverage |
| **Description** | The percentage of patients 18-75 years of age with diabetes (type 1 and type 2) who had Statin prescriptions dispensed. |
| **Purpose** | Appropriate medication management targeting glycemic control, hypertension, and lipid management is important for reducing morbidity and mortality, and improving long-term quality of life for patients diagnosed with Diabetes. Lifestyle changes such as nutrition therapy, weight loss, increased exercise, and appropriate education and self-management strategies are pivotal to improved outcomes. Inadequate access to care for chronic disease management as well as the cost of medication can contribute to poor control of T2DM and associated cardiovascular risk factors. |
| **Denominator** | Patient had one or more medical visits in the three years prior to the MP end date.<br>AND<br>Patient had an active diagnosis of Diabetes Type I or Type II at least 90 days prior to MP start date.<br>AND<br>Patient is dispensed a statin medication at least 90 days prior to the start of the MP and had at least one fill during the MP.<br>AND<br>Patient had an Excellus Pharmacy Benefit for the entire MP. |
| **Denominator Exclusions** | Patient has an allergy to statins. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patient had a Statin prescription dispensed and was covered by the medication for at least 80% of the measurement period. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria)<br><br>Remove patients from the denominator and numerator if they meet the *denominator exclusion* criteria. |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 AND D4 AND D5 AND D6 |
| |  | D1 | Patient had one or more medical visits in the three years prior to the MP end date, indicated by CPT codes in indicated by CPT codes in HEDIS (Outpatient Value Set, Observation Value Set, ED Value Set, Acute Inpatient Value Set, Nonacute Inpatient Value Set) |
| | AND | D2 | Patient is 18-75 years of age as of the last day of the measurement period |
| | AND | D3 | Patient had at least one diagnosis of type I diabetes or type II diabetes between three years before MP End Date and 90 days before MP Start Date, as indicated by the ICD codes in HEDIS (Diabetes Value Set) |
| | AND | D4 | Patient had at least one prescription fill for a statin as indicated by the NDC codes in Arcadia Custom Drug Codes for Statin Inclusion Value Set in the 90 days prior to MP start date |
| | AND | D5 | Patient had at least one prescription fill for a statin as indicated by the NDC codes in Arcadia Custom Drug Codes for Statin Inclusion Value Set in the current MP |
| | AND | D6 | Patient has Excellus Pharmacy Benefit for the entire measurement period |
| | Value Sets | | D1: HEDIS Outpatient, HEDIS Observation, HEDIS ED, HEDIS Acute Inpatient, HEDIS Nonacute Inpatient<br>D3: HEDIS Diabetes<br>D4: Arcadia Custom Drug Codes for Statin Inclusion<br>D5: Arcadia Custom Drug Codes for Statin Inclusion |
| **Denominator Exclusions** | | | EX1 |
| |  | EX1 | Patient has contraindication to Statins as indicated by the CPT codes in Arcadia Custom ACE, ARB, & Statin Exclusion Value Set |
| | Value Sets | | EX1: Arcadia Custom ACE, ARB, & Statin Exclusion |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | Patient had prescription(s) for Statin dispensed and was covered by the medication for at least 80% of the measurement period.<br>**Will look back to 120 days before MP start date to include dispensing events for prescriptions that may have started before the measurement period began |
| **Numerator Exclusions** | | | None |
