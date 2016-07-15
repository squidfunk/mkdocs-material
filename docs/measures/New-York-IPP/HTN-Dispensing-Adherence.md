Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-04-13
ModifyDate: 2016-02-13
AAVersion: 4.9

#Medication Adherence for Hypertension Medications - Dispensing

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Medication Adherence for Hypertension Medications - Dispensing |
| **Long Display Name** | Hypertension Medication Adherence (Dispensing Version) |
| **Short Display Name** | HTN Dispensing Adherence |
| **Description** | Percent of patients 18 years and older that adhere to their prescribed hypertension drug therapy for renin angiotensin system (RAS) antagonists [angiotensin converting enzyme inhibitor (ACEI), angiotensin receptor blocker (ARB), or direct renin inhibitor medications] by filling their prescriptions often enough to cover 80% or more of the time they are supposed to be taking the medication. |
| **Purpose** | One of the most important ways patients can manage their health is by taking medication as directed. The plan, the doctor, and the member can work together to find ways to help the member take their medication as directed. Percent of plan members with a prescription for a blood pressure medication who fill their prescription often enough to cover 80% or more of the time they are supposed to be taking the medication. |
| **Denominator** | Patients 18 years and older with Hypertension. |
| **Denominator Exclusions** | A diagnosis of ESRD at any time during the measurement period. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients from denominator who were dispensed Hypertension drug therapy for renin angiotensin system (RAS) antagonists [angiotensin converting enzyme inhibitor (ACEI), angiotensin receptor blocker (ARB), or direct renin inhibitor medications] for at least 80% of the measurement period. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria)<br><br>Remove patients from the denominator and numerator if they meet the *denominator exclusion* criteria. |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND (D3 OR D4) AND D5 |
| |  | D1 | 18 years or older at measurement period start |
| | AND | D2 | Patient had BCBS Pharmacy Benefit Coverage for the entire measurement period |
| | AND | D3 | 2 dispensed prescriptions for angiotensin converting enzyme inhibitor (ACEI), or angiotensin receptor blocker (ARB), or direct renin inhibitor during the measurement period |
| | OR | D4 | An assessment of Hypertension during the measurement period |
| | AND | D5 | Patient had 1 or more medical visits in the 3 years prior to the MP end date as indicated by HEDIS Outpatient CPT Value Set |
| | Value Sets | | D3: HEDIS Drug table CDC-L (ACE Inhibitors/ARBs)<br>D4: HEDIS Essential Hypertension<br>D5: HEDIS Outpatient CPT |
| **Denominator Exclusions** | | | EX1 |
| |  | EX1 | A diagnosis of ESRD at any point during the measurement period |
| | Value Sets | | EX1: HEDIS ESRD |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | Dispensed medication covering at least 80% of the measurement period |
| | Value Sets | | N1: HEDIS Drug table CDC-L (ACE Inhibitors/ARBs) |
| **Numerator Exclusions** | | | None |
