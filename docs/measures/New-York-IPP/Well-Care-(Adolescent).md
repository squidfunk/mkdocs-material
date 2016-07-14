Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-04-13
ModifyDate: 2016-02-13
AAVersion: 4.9

#Adolescent Well-Care Visits

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Adolescent Well-Care Visits |
| **Long Display Name** | Adolescent Well-Care Visits |
| **Short Display Name** | Well-Care (Adolescent) |
| **Description** | The percentage of patients 12-21 years of age who had at least one comprehensive well-care visit with a PCP or an OB/GYN during the measurement year. |
| **Purpose** | Adolescence is a time of transition between childhood and adult life and is accompanied by dramatic changes. Accidents, homicide and suicide are the leading causes of adolescent deaths. Sexually transmitted diseases, substance abuse, pregnancy and antisocial behavior are important causes of-or result from-physical, emotional and social adolescent problems. The American Medical Association (AMA) Guidelines for Adolescent Preventive Services, the federal government's Bright Futures (1994; 2000; 2002) program and the American Academy of Pediatrics (AAP) (2000) guidelines all recommend comprehensive annual check-ups for adolescents. |
| **Denominator** | Patients aged 12-21 as of the measurement period end. |
| **Denominator Exclusions** | N/A |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients who had 1 or more comprehensive well care visits with a PCP or OB/GYN during the measurement period. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria) |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 |
| |  | D1 | Age at period end between 12 and 21 |
| | AND | D2 | Patient had 1 or more medical visits in the 3 years prior to the MP end date as indicated by HEDIS Outpatient CPT Value Set |
| | Value Sets | | D2: HEDIS Outpatient CPT |
| **Denominator Exclusions** | | | None |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | A well care visit with a PCP or OB/GYN during the measurement period |
| | Value Sets | | N1: HEDIS Well-Care |
| **Numerator Exclusions** | | | None |
