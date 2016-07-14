Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-04-13
ModifyDate: 2016-02-13
AAVersion: 4.9

#Cervical Cancer Screening

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Cervical Cancer Screening |
| **Long Display Name** | Cervical Cancer Screening |
| **Short Display Name** | Cervical Cancer Screen |
| **Description** | The percentage of women 21-64 years of age who were screened for cervical cancer using either of the following criteria: (1) Women age 21-64 who had cervical cytology performed every three years. (2) Women age 30-64 who had cervical cytology/human papillomavirus (HPV) co-testing performed every five years. |
| **Purpose** | Effective screening and treatments decrease the incidence of cases and deaths from cervical cancer in the population. |
| **Denominator** | Women age 24-64 years as of the end of the MP. |
| **Denominator Exclusions** | Patients who had a hysterectomy with no residual cervix, cervical agenesis, or acquired absence of cervix any time before the end of the measurement period. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients who either: (1) Had cervical cytology performed within the 3 year period prior to measurement period end date OR (2) Had cervical cytology/human papillomavirus (HPV) co-testing performed within the 5 year period prior to measurement period end date and are 30-64 years of age. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria)<br><br>Remove patients from the denominator and numerator if they meet the *denominator exclusion* criteria. |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 AND D4 |
| |  | D1 | Patient is female |
| | AND | D2 | >= 24 years old at measurement period end |
| | AND | D3 | <= 64 years old at measurement period end |
| | AND | D4 | Patient had 1 or more medical visits in the 3 years prior to the MP end date as indicated by HEDIS Outpatient CPT |
| | Value Sets | | D4: HEDIS Outpatient CPT |
| **Denominator Exclusions** | | | EX1 AND EX2 |
| |  | EX1 | Patient had hysterectomy with no residual cervix, cervical agenesis, or acquired absence of cervix before measurement period end |
| | AND | EX2 | Patient did not have a Pap test during the measurement period |
| | Value Sets | | EX1: HEDIS Absence of Cervix, Arcadia Custom Maintenance Absence of Cervix<br>EX2: HEDIS Cervical Cytology |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 OR (N2 AND N3 AND (N4 AND N5 AND N6 AND N7)) |
| |  | N1 | Patient had cervical cytology within 3 years prior to measurement period end |
| | OR | N2 | Patient is >= 30 years old at measurement period end |
| | AND | N3 | Patient had cervical cytology within 5 years prior to measurement period end |
| | AND | N4 | Patient age >= 30 on date of cervical cytology (N3) |
| | AND | N5 | Patient had human papillomavirus (HPV) test within 5 years prior to measurement period end |
| | AND | N6 | Patient age >= 30 on date of HPV test (N5) |
| | AND | N7 | Cervical cytology (N3) and HPV test (N5) are within 4 days of each other |
| | Value Sets | | N1: HEDIS Cervical Cytology, Arcadia Custom Maintenance, Completed Order, Result: PAP Test<br>N3: HEDIS Cervical Cytology, Arcadia Custom Maintenance, Completed Order, Result: PAP Test<br>N5: HEDIS HPV Tests, Arcadia Custom Maintenance, Completed Order, Result: HPV Test |
| **Numerator Exclusions** | | | None |
