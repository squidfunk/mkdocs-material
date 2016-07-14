Status: Client-Ready
Author: Bill Baranowski
CreateDate: 2016-04-04
ModifyDate: 2016-04-04
AAVersion: 4.10

#Tobacco Use: Screening and Cessation Intervention (CMS138v4)

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Tobacco Use: Screening and Cessation Intervention (CMS138v4) |
| **Long Display Name** | Tobacco Use: Screening and Cessation Intervention (CMS138v4) |
| **Short Display Name** | Tobacco Screening/Cessation |
| **Source** | CMS (https://www.cms.gov/Regulations-and-Guidance/Legislation/EHRIncentivePrograms/Downloads/eCQM_2014_EP_June2015.zip) |
| **Description** | Percentage of patients aged 18 years and older who were screened for tobacco use one or more times within 24 months AND who received cessation counseling intervention if identified as a tobacco user. |
| **Purpose** | This measure is intended to promote adult tobacco screening and tobacco cessation interventions for those who use tobacco products. There is good evidence that tobacco screening and brief cessation intervention (including counseling and/or pharmacotherapy) is successful in helping tobacco users quit. Tobacco users who are able to stop smoking lower their risk for heart disease, lung disease, and stroke. |
| **Target** | 50% (configurable by client)% (configurable by client) |
| **Target Source** | Arcadia Default |
| **Denominator** | All patients aged 18 years and older seen for at least two visits or at least one preventive visit during the measurement period. |
| **Denominator Exclusions** | N/A |
| **Denominator Exceptions** | Documentation of medical reason(s) for not screening for tobacco use (eg, limited life expectancy, other medical reason). |
| **Numerator** | Patients who were screened for tobacco use at least once within 24 months AND who received tobacco cessation intervention if identified as a tobacco user. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria) |
| **Notes** | The VSAC Face-to-Face Interaction and VSAC Annual Wellness Visit value sets are not used for criteria D3 because the product does not currently support SNOMEDCT or HCPCS. The VSAC Tobacco Use Screening value set is not used for N1 because the product does not currently support LOINC. The VSAC Tobacco Non-User and VSAC Tobacco User value sets are not used in N2 and N3 because the product does not currently support SNOMEDCT. The VSAC Medical Reason and VSAC Limited Life Expectancy exception value sets are not used because the product does not currently support SNOMEDCT. |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND (D2 OR D3) |
| |  | D1 | Patient is 18 years of age or older as of the period start date. |
| | AND | D2 | Patient had at least 2 visits during the period. |
| | OR | D3 | Patient had a preventive visit during the period. |
| | Value Sets | | D2: VSAC Psych Visit - Diagnostic Evaluation; VSAC Health and Behavioral Assessment - Initial; VSAC Health and Behavioral Assessment, Reassessment; VSAC Health & Behavioral Assessment - Individual; VSAC Occupational Therapy Evaluation; VSAC Office Visit; VSAC Psych Visit - Psychotherapy; VSAC Psychoanalysis; VSAC Ophthalmological Services<br>D3: VSAC Preventive Care Services - Group Counseling; VSAC Preventive Care Services - Other; VSAC Preventive Care Services-Initial Office Visit, 18 and Up; VSAC Preventive Care Services - Established Office Visit, 18 and Up; VSAC Preventive Care Services-Individual Counseling; VSAC Speech and Hearing Evaluation |
| **Denominator Exclusions** | | | None |
| **Denominator Exceptions** | | | EXP1 |
| |  | EXP1 | Patient had a medical reason for not being screened for tobacco use (limited life expectancy for example) during 2 years before period end. |
| | Value Sets | | EXP1: Arcadia Custom Medical Reason - No Tobacco Screening, Arcadia Custom Terminal Illness |
| **Numerator** | | | N1 AND (N2 OR (N3 AND N4)) |
| |  | N1 | Patient was screened for tobacco use during 2 years before period end. If there were multiple screenings use the most recent for N2 and N3. |
| | AND | N2 | Patient was identified as a tobacco non-user at the screening from N1. |
| | OR | N3 | Patient was identified as a tobacco user at the screening from N1. |
| | AND | N4 | Patient received a cessation intervention during 2 years before period end. |
| | Value Sets | | N1: Arcadia Custom Tobacco/Smoking Status<br>N2: Arcadia Custom Tobacco/Smoking Status (Value: Tobacco Non-User)<br>N3: Arcadia Custom Tobacco/Smoking Status (Value: Tobacco User)<br>N4: Tobacco Use Cessation Counseling, Tobacco Use Cessation Pharmacotherapy, Arcadia Custom Tobacco/Smoking Cessation Counseling |
| **Numerator Exclusions** | | | None |
