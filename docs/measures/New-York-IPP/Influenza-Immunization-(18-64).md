Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-04-13
ModifyDate: 2016-02-13
AAVersion: 4.9

#Flu Shots for Adults (18-64)

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Flu Shots for Adults (18-64) |
| **Long Display Name** | Flu Shots for Adults (18-64) |
| **Short Display Name** | Influenza Immunization (18-64) |
| **Description** | Percentage of patients = 18 years of age to 64 years of age who received an influenza immunization OR who reported previous receipt of an influenza immunization in the measurement period. |
| **Purpose** | The disease burden of influenza is large, and the potential for prevention is high. Influenza infections result in significant health care expenditures each year, and the vaccine is safe and effective. Specifications are consistent with current recommendations from the Advisory Committee on Immunization Practices (ACIP). This group has an increased prevalence of people with high-risk medical conditions, and age-specific strategies have been more successful to increase vaccine coverage than those based on medical conditions. Healthy adults in this age group without high-risk conditions will benefit by reduced number of illnesses, physician visits, missed workdays and antibiotic use, and will have reduced disease transmission from contacts who are at high-risk for influenza-related complication. |
| **Denominator** | Patients = 18 years of age to 64 years of age. |
| **Denominator Exclusions** | Patient has documentation of: Medical reason(s) for not receiving influenza immunization (e.g., patient allergy, other medical reasons) recorded before the end of the measurement period. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients from the denominator who received an influenza immunization OR who reported previous receipt of an influenza immunization in the measurement period. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria)<br><br>Remove patients from the denominator and numerator if they meet the *denominator exclusion* criteria. |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 |
| |  | D1 | Patient is = 18 years of age to 64 years of age at the beginning of the measurement period |
| | AND | D2 | Patient had 1 or more medical visits in the 3 years prior to the MP end date as indicated by HEDIS Outpatient CPT Value Set. |
| | Value Sets | | D2: HEDIS Outpatient CPT |
| **Denominator Exclusions** | | | EX1 |
| |  | EX1 | Patient has documentation of medical reason(s) for not receiving influenza immunization (e.g., patient allergy, other medical reasons) recorded before the end of the measurement period |
| | Value Sets | | EX1: Arcadia Custom Medical Reason No Flu Shot |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 OR N2 |
| |  | N1 | Patient received an influenza immunization in the measurement period  |
| | OR | N2 | Patient reported previous receipt of an influenza immunization in the measurement period |
| | Value Sets | | N1: VSAC Influenza Vaccinations<br>N2: VSAC Influenza Vaccinations |
| **Numerator Exclusions** | | | None |
