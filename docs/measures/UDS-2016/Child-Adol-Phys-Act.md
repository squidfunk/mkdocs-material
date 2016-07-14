Status: Client-Ready
Author: Bill Baranowski
CreateDate: 2016-04-08
ModifyDate: 2016-04-08
AAVersion: 4.10

#Weight Assessment and Counseling for Nutrition and Physical Activity for Children and Adolescents, Numerator 3 (CMS155v4)

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Weight Assessment and Counseling for Nutrition and Physical Activity for Children and Adolescents, Numerator 3 (CMS155v4) |
| **Long Display Name** | Counseling for Physical Activity for Children and Adolescents (CMS155v4) |
| **Short Display Name** | Child/Adol Phys Act |
| **Source** | CMS (https://www.cms.gov/Regulations-and-Guidance/Legislation/EHRIncentivePrograms/Downloads/eCQM_2014_EP_June2015.zip) |
| **Description** | Percentage of patients 3-17 years of age who had an outpatient visit with a Primary Care Physician (PCP) or Obstetrician/Gynecologist (OB/GYN) and who had evidence of counseling for physical activity. |
| **Purpose** | One of the most important developments in pediatrics in the past two decades has been the emergence of a new chronic disease: obesity in childhood and adolescence. The rapidly increasing prevalence of obesity among children is one of the most challenging dilemmas currently facing pediatricians. National Health and Nutrition Examination Survey (NHANES) data from Cycle II (1976-1980) compared with data from Cycle III (1988-1994) documents an increase in the prevalence of obesity in all age, ethnic, and gender groups. NHANES data collected from 1999-2000 revealed a continued increase in the number of obese children. In that data collection, the prevalence of obesity (body mass index (BMI) > 95th percentile) was 10 percent among children 2-5 years of age and 15 percent among children 6-19 years of age. When children at risk for obesity (BMI of 85th-94th percentile) were included, the prevalence increased to 20 percent and 30 percent, respectively. Therefore, >1 of every 4 patients examined by pediatricians either is obese or is considered to be at high risk for developing this challenging health problem (O'Brien et al. 2004). |
| **Target** | 50% (configurable by client)% (configurable by client) |
| **Target Source** | Arcadia Default |
| **Denominator** | Patients 3-17 years of age with at least one outpatient visit with a primary care physician (PCP) or an obstetrician/gynecologist (OB/GYN) during the measurement period. |
| **Denominator Exclusions** | Patients who have a diagnosis of pregnancy during the measurement period. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients who had counseling for physical activity during a visit that occurs during the measurement period. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria) |
| **Notes** | Three age stratifications for this measure are included: one for patients 3 to 11, one for patients 12 to 17, and one for patients 3 to 17.<br><br>This measure does not use the VSAC Counseling for Physical Activity or VSAC Face-to-Face Interaction value sets because the product does not currently support SNOMEDCT. |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 |
| |  | D1 | Patient is at least 3 years of age as of the period start date. |
| | AND | D2 | Patient is less than 17 years of age as of the period end date. |
| | AND | D3 | Patient had an outpatient visit during the period. |
| | Value Sets | | D3: VSAC Office Visit; VSAC Preventive Care Services-Individual Counseling; VSAC Preventive Care- Initial Office Visit, 0 to 17; VSAC Preventive Care - Established Office Visit, 0 to 17; VSAC Preventive Care Services - Group Counseling; VSAC Home Healthcare Services |
| **Denominator Exclusions** | | | EX1 |
| |  | EX1 | Patient had a pregnancy diagnosis active during 12 months before period end. |
| | Value Sets | | EX1: VSAC Pregnancy; Arcadia Custom Pregnancy |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | Patient was counseled for physical activity during an outpatient visit. |
| | Value Sets | | N1: Arcadia Custom Physical Activity Counseling; VSAC Office Visit; VSAC Preventive Care Services-Individual Counseling; VSAC Preventive Care- Initial Office Visit, 0 to 17; VSAC Preventive Care - Established Office Visit, 0 to 17; VSAC Preventive Care Services - Group Counseling; VSAC Home Healthcare Services |
| **Numerator Exclusions** | | | None |
