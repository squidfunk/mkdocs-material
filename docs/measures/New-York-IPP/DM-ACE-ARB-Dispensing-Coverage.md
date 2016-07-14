Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-02-04
ModifyDate: 2016-02-04
AAVersion: 4.9

#Diabetes ACE/ARB Dispensing Coverage

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Diabetes ACE/ARB Dispensing Coverage |
| **Long Display Name** | Diabetes ACE/ARB Dispensing Coverage |
| **Short Display Name** | DM ACE/ARB Dispensing Coverage |
| **Description** | The percentage of patients 18-75 years of age with diabetes (type 1 and type 2) who were dispensed an ACE-I/ARB medication for at least 80% of the measurement period. |
| **Purpose** | Appropriate medication management targeting glycemic control, hypertension, and lipid management is important for reducing morbidity and mortality, and improving long-term quality of life for patients diagnosed with Diabetes. Lifestyle changes such as nutrition therapy, weight loss, increased exercise, and appropriate education and self-management strategies are pivotal to improved outcomes. Inadequate access to care for chronic disease management as well as the cost of medication can contribute to poor control of T2DM and associated cardiovascular risk factors. |
| **Denominator** | Patient had one or more medical visits in the three years prior to the MP end date.<br>AND<br>Patient had an active diagnosis of Diabetes Type I or Type II at least 90 days prior to MP start date.<br>AND<br>Patient is dispensed an ACE-I or ARB medication at least 90 days prior to MP start date and had at least one fill anytime in the measurement period
.<br>AND<br>Patient has Excellus Pharmacy Benefit for the entire MP. |
| **Denominator Exclusions** | Patient has an allergy to ACE/ARB. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patient was dispensed ACE-I or ARB medication and covered by the medication for at least 80% of the measurement period. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria)<br><br>Remove patients from the denominator and numerator if they meet the *denominator exclusion* criteria. |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 AND D4 AND D5 AND D6 |
| |  | D1 | Patient had one or more medical visits in the three years prior to the MP end date as indicated by the CPT codes in HEDIS (Outpatient CPT Value Set) |
| | AND | D2 | Patient is 18-75 years of age as of the last day of the measurement period |
| | AND | D3 | Patient had at least one diagnosis of type I diabetes or type II diabetes from 91 days before period start date to three years prior to MP end date, as indicated by the ICD codes in HEDIS (Diabetes Value Set) |
| | AND | D4 | Patient had at least one prescription fill for an ACE- I or an ARB as indicated by the NDC codes in Arcadia Custom Drug/Antibiotic Codes for ACE/ARB Inhibitors in the 90 days prior to MP start date |
| | AND | D5 | Patient had at least one prescription fill for an ACE- I or an ARB as indicated by the NDC codes in Arcadia Custom Drug/Antibiotic Codes for ACE/ARB Inhibitors in the current MP |
| | AND | D6 | Patient has an Excellus Pharmacy Benefit for the entire measurement period |
| | Value Sets | | D1: HEDIS Outpatient CPT<br>D3: HEDIS Diabetes<br>D4: Arcadia Custom Drug/Antibiotic Codes for ACE/ARB Inhibitors<br>D5: Arcadia Custom Drug/Antibiotic Codes for ACE/ARB Inhibitors |
| **Denominator Exclusions** | | | EX1 |
| |  | EX1 | Patient has contraindication to ACE/ARB as indicated by the CPT codes in Arcadia Custom ACE, ARB, & Statin Exclusion Value Set |
| | Value Sets | | EX1: Arcadia Custom ACE, ARB, & Statin Exclusion |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | Patient is dispensed and covered for ACE-I or an ARB prescription for at least 80% of the measurement period.<br>*Will look back to 120 days before MP start date to include dispensing events for prescriptions that may have started before the measurement period began |
| **Numerator Exclusions** | | | None |
