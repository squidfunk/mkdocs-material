Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-04-13
ModifyDate: 2016-02-13
AAVersion: 4.9

#Flu Shots for Adults (65+)

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Flu Shots for Adults (65+) |
| **Long Display Name** | Flu Shots for Adults (65+) |
| **Short Display Name** | Influenza Immunization (65+) |
| **Description** | Percentage of patients = 65 years of age who received an influenza immunization OR who reported previous receipt of an influenza immunization in the measurement period. |
| **Purpose** | Influenza accounts for 10,000 to 40,000 or more deaths each year in the United States (U.S.) (Harper et al., 2005). Older adults are at high risk for developing serious infections (such as pneumonia) following the flu. For this reason, experts recommend that all adults over 65 receive a flu vaccination every year to reduce the risk of developing serious complications if they become infected. Vaccination programs against influenza have been shown to reduce the incidence of illness and death and are cost-effective, as well. |
| **Denominator** | Patients = 65 years of age. |
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
| |  | D1 | Patient is = 65 years of age at the beginning of the measurement period |
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
