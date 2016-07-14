Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-02-04
ModifyDate: 2016-02-04
AAVersion: 4.9

#Statin Prescription Coverage for CAD-IVD Patients

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Statin Prescription Coverage for CAD-IVD Patients |
| **Long Display Name** | Statin Prescription Coverage for CAD-IVD Patients |
| **Short Display Name** | CAD IVD Statin Rx Coverage |
| **Description** | The percentage of patients, 18-75 years of age, with a diagnosis of obstructive or nonobstructive CAD or ischemic vascular disease who are taking a statin medication as prescribed. |
| **Purpose** | Elevated cholesterol is a chronic condition that requires life-long therapy and adherence to medications. Statins are the most effective and best tolerated cholesterol lowering medications for most individuals and have been associated with decreased cardio-vascular morbidity and mortality. |
| **Denominator** | Patient had one or more medical visits in the three years prior to the MP end date.<br>AND<br>Patient had an active diagnosis of CAD/IVD at least 90 days prior to MP start date.<br>AND<br>Patient is prescribed a statin medication at least 90 days prior to MP start date. |
| **Denominator Exclusions** | Patient has an allergy to statins. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patient has an active prescription for Statins for at least 80% of the MP. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria)<br><br>Remove patients from the denominator and numerator if they meet the *denominator exclusion* criteria. |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 AND D4 |
| |  | D1 | Patient had one or more medical visits in the three years prior to the MP end date, indicated by CPT codes in indicated by CPT codes in Arcadia Custom CAD/IVD Denominator Value Set |
| | AND | D2 | Patient is 18-75 years of age as of the last day of the measurement period. |
| | AND | D3 | Patient had at least one diagnosis of CAD/IVD during the three years before MP End Date, as indicated by the codes in Arcadia Custom CAD/IVD Denominator Value Set. |
| | AND | D4 | Patient had at least one active prescription for a Statin, during three years before MP End Date to 90 days before MP Start Date, as defined by the NDC codes in Arcadia Custom Drug Codes for Statin Inclusion Value Set. |
| | Value Sets | | D1: Arcadia Custom CAD/IVD Denominator<br>D3: Arcadia Custom CAD/IVD Denominator<br>D4: Arcadia Custom Drug Codes for Statin Inclusion |
| **Denominator Exclusions** | | | EX1 |
| |  | EX1 | Patient has contraindication to Statins as indicated by the CPT codes in Arcadia Custom ACE, ARB, & Statin Exclusion Value Set. |
| | Value Sets | | EX1: Arcadia Custom ACE, ARB, & Statin Exclusion |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | At least one of the prescriptions was active for at least 80% the MP.<br>**Will look back to 120 days before MP start date to include prescriptions that may have started before the measurement period began. |
| **Numerator Exclusions** | | | None |
