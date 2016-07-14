Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-02-04
ModifyDate: 2016-02-04
AAVersion: 4.9

#Fall Risk Management

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Fall Risk Management |
| **Long Display Name** | Fall Risk Management |
| **Short Display Name** | Fall Risk Management |
| **Description** | Percentage of patients 65 years of age or older who had a fall or had problems with balance or walking in the past 12 months, who were seen by a practitioner in the MP and who received fall risk intervention from their current practitioner. |
| **Purpose** | Unintentional injuries are the fifth leading cause of death in older adults, and falls are responsible for two-thirds of these deaths (Clark, Lord, & Webster, 1993). Falls can have serious psychological and social consequences. Many elderly people who fall develop a fear of subsequent falls, which can result in self-imposed functional limitations. Of those older adults who fall, 20-30 percent suffer moderate to severe injuries that may reduce mobility and independence, as well as increase the risk of premature death (Sterling, O'Connor, & Bonadies, 2001; Grisso et al., 1992). Because falls have the potential to cause serious harm and significantly limit functional status of the elderly, a clinical practice to routinely monitor and manage risk factors can have significant impact in preventing unintentional injuries from falls. |
| **Denominator** | Patient is 65 years of age or older and has had one or more medical visits in the three years prior to the MP end date. <br>AND<br>Patient had a diagnosis of a fall or a problem with balance during the Measurement period. |
| **Denominator Exclusions** | Patient had a negative fall risk screening during the measurement period.<br>OR<br>Patient has no Fall Plan of Care documented during the measurement period for Medical or Other Reasons. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients from denominator who have had a follow-up encounter with their PCP with evidence of fall risk intervention during that visit. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria)<br><br>Remove patients from the denominator and numerator if they meet the *denominator exclusion* criteria. |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 |
| |  | D1 | Patient had one or more medical encounters in the three years prior to the MP end date |
| | AND | D2 | Patient is 65 years of age or older as of the first day of the measurement period |
| | AND | D3 | Patient had fall or problem with balance within the MP as specified by HEDIS Falls Value Set, CPTII code 1100F, and Arcadia Custom Positive Fall Risk Screening (Maintenance) |
| | Value Sets | | D3: HEDIS Falls-CPTII code 1100F, Arcadia Custom Positive Fall Risk Screening |
| **Denominator Exclusions** | | | EX1 OR EX2 |
| |  | EX1 | Patient had a negative fall risk screening during the measurement period as specified by: CPT II 1101F, Arcadia Custom Negative Fall Risk Screening codes (maintenance) |
| | OR | EX2 | Patient did NOT have a Fall Plan of Care documented during measurement period for Medical or Other reasons, as specified by: CPT II 0518F with 1P, CPT II 0518F with 8P |
| | Value Sets | | EX1: CPT II 1101F, Arcadia Custom Negative Fall Risk Screening<br>EX2: CPT II 0518F with 1P, CPT II 0518F with 8P |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | Patient has Fall Plan of Care documented during 12 months before period end, as documented by the CPTII code 0518F or Arcadia Custom Fall Plan of Care (maintenance) |
| | Value Sets | | N1: CPTII code 0518F, Arcadia Custom Fall Plan of Care |
| **Numerator Exclusions** | | | None |
