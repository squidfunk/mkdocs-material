Status: Client-Ready
Author: Bill Baranowski
CreateDate: 2016-04-04
ModifyDate: 2016-04-04
AAVersion: 4.9

#Screening for Clinical Depression and Follow-Up Plan (CMS2v5)

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Screening for Clinical Depression and Follow-Up Plan (CMS2v5) |
| **Long Display Name** | Screening for Clinical Depression and Follow-Up Plan (CMS2v5) |
| **Short Display Name** | Depression Screening/Follow-up |
| **Source** | CMS (https://www.cms.gov/Regulations-and-Guidance/Legislation/EHRIncentivePrograms/Downloads/eCQM_2014_EP_June2015.zip) |
| **Description** | Percentage of patients aged 12 years and older screened for clinical depression on the date of the encounter using an age appropriate standardized depression screening tool AND if positive, a follow-up plan is documented on the date of the positive screen. |
| **Purpose** | The World Health Organization (WHO), as seen in Pratt & Brody (2008), found that major depression was the leading cause of disability worldwide. Depression causes suffering, decreases quality of life, and causes impairment in social and occupational functioning. It is associated with increased health care costs as well as with higher rates of many chronic medical conditions. Studies have shown that a higher number of depression symptoms are associated with poor health and impaired functioning, whether or not the criteria for a diagnosis of major depression are met. |
| **Target** | 50% (configurable by client)% (configurable by client) |
| **Target Source** | Arcadia Default |
| **Denominator** | All patients aged 12 years and older before the beginning of the measurement period with at least one eligible encounter during the measurement period. |
| **Denominator Exclusions** | Patients with an active diagnosis for Depression or a diagnosis of Bipolar Disorder. |
| **Denominator Exceptions** | Patients who refused screening, patients in urgent or emergent situations where delaying treatment would jeopardize their health, and patients in a situation where their functional capacity or motivation to improve may impact the accuracy of results of standardized depression assessment tools (for example: certain court appointed cases or cases of delirium). |
| **Numerator** | Patients screened for clinical depression on the date of the encounter using an age appropriate standardized tool AND if positive, a follow-up plan is documented on the date of the positive screen. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria) |
| **Notes** | This measure does not use VSAC "Medical or Other reason not done" or VSAC "Patient Reason refused" exception value sets because the product does not currently support SNOMEDCT.<br><br>This measure does not count the following depression screening value sets because the current product does not support LOINC or SNOMEDCT: VSAC Adolescent Depression Screening, VSAC Adult Depression Screening, VSAC Negative Depression Screening, VSAC Positive Depression Screening<br><br>The measure does not support the following depression follow-up value sets because the product does not currently support SNOMEDCT: VSAC Additional Evaluation for Depression - Adolescent, VSAC Referral for Depression Adolescent, VSAC Follow-Up for Depression - Adolescent, VSAC Additional Evaluation for Depression - Adult, VSAC Referral for Depression Adult, VSAC Follow-Up for Depression - Adult, VSAC Suicide Risk Assessment |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 and D2 |
| |  | D1 | Patient is 12 years of age or older as of the period start date. |
| | AND | D2 | Patient had an eligible encounter during the period. If there are multiple use the most recent for the exclusion and numerator criteria. |
| | Value Sets | | D2: VSAC Depression Screening Encounter Codes |
| **Denominator Exclusions** | | | EX1 OR EX2 |
| |  | EX1 | Patient had a depression diagnosis starting before and overlapping with the eligible encounter from D2. |
| | OR | EX2 | Patient had a bipolar diagnosis starting before and overlapping with the eligible encounter from D2. |
| | Value Sets | | EX1: VSAC Depresssion<br>EX2: VSAC Bipolar |
| **Denominator Exceptions** | | | EXP1 OR EXP2 |
| |  | EXP1 | Patient had a medical reason for not having a depression screening documented during 1 year before period end. |
| | OR | EXP2 | Patient refused a depression screening during 1 year before period end. |
| | Value Sets | | EXP1: Arcadia Custom Medical Reason - No Depression Screen<br>EXP2: Arcadia Custom Patient Reason - No Depression Screen |
| **Numerator** | | | (N1 AND (N2 OR (N3 AND N4))) OR (N5 AND (N6 OR (N7 AND N8))) |
| |  | N1 | Patient is less than 18 years of age and had an adolescent-appropriate depression screening at the eligible encounter from D2. |
| | AND | N2 | Result of screening from N1 is negative. |
| | OR | N3 | Result of screening from N1 is positive. |
| | AND | N4 | An adolescent-appropriate follow-up plan for depression was documented on the day of or the day following the screening from N1. |
| | OR | N5 | Patient is at least 18 years of age and had an adult-appropriate depression screening at the eligible encounter from D2. |
| | AND | N6 | Result of screening from N1 is negative. |
| | OR | N7 | Result of screening from N1 is positive. |
| | AND | N8 | An adult-appropriate follow-up plan for depression was documented on the day of or the day following the screening from N5. |
| | Value Sets | | N1: Arcadia Custom Depression Screening<br>N2: Arcadia Custom Depression Screening<br>N3: Arcadia Custom Depression Screening<br>N4: VSAC Depression Medications - Adolescent, Arcadia Custom Depression Follow Up Plan<br>N5: Arcadia Custom Depression Screening<br>N6: Arcadia Custom Depression Screening<br>N7: Arcadia Custom Depression Screening<br>N8: VSAC Depression Medications - Adult, Arcadia Custom Depression Follow Up Plan |
| **Numerator Exclusions** | | | None |
