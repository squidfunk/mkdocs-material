Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-04-13
ModifyDate: 2016-02-13
AAVersion: 4.9

#Medication Adherence for Cholesterol (Statins) - Dispensing

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Medication Adherence for Cholesterol (Statins) - Dispensing |
| **Long Display Name** | Cholesterol Medication Adherence (Dispensing Version) |
| **Short Display Name** | Chol Dispensing Adherence |
| **Description** | Percent of patients 18 years and older that adhere to their prescribed drug therapy for statin cholesterol medications. |
| **Purpose** |  One of the most important ways patients can manage their health is by taking medication as directed. The plan, the doctor, and the member can work together to find ways to help the member take their medication as directed. Percent of plan members with a prescription for a cholesterol medication (a statin drug) who fill their prescription often enough to cover 80% or more of the time they are supposed to be taking the medication. |
| **Denominator** | Patients 18 years and older with at least two fills of either the same medication or different medications within the drug class during the measurement period. |
| **Denominator Exclusions** | N/A |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients from denominator who were dispensed Statin medication for at least 80% of the measurement period. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria) |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 AND D4 |
| |  | D1 | 18 years or older at measurement period start |
| | AND | D2 | 2 dispensed prescriptions for the same or different Statin medications, during the measurement period |
| | AND | D3 | Patient had BCBS Pharmacy Benefit Coverage for the entire measurement period |
| | AND | D4 | Patient had 1 or more medical visits in the 3 years prior to the MP end date as indicated by HEDIS Outpatient CPT Value Set |
| | Value Sets | | D2: HEDIS Drug table SPC-B (High and Moderate-Intensity Statin Medications)<br>D4: HEDIS Outpatient CPT |
| **Denominator Exclusions** | | | None |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | Dispensed a Statin medication covering at least 80% of the measurement period |
| | Value Sets | | N1: HEDIS Drug table SPC-B |
| **Numerator Exclusions** | | | None |
