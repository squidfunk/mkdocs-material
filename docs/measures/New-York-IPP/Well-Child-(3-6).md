Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-04-13
ModifyDate: 2016-02-13
AAVersion: 4.9

#Well-Child Visits in the Third, Fourth, Fifth and Sixth Years of Life

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Well-Child Visits in the Third, Fourth, Fifth and Sixth Years of Life |
| **Long Display Name** | Well-Child Visits for Ages 3-6 |
| **Short Display Name** | Well-Child (3-6) |
| **Description** | The percentage of patients 3-6 years of age who received one or more well-child visits with a PCP during the measurement year. |
| **Purpose** | Well-child visits during the preschool and early school years are particularly important. A child can be helped through early detection of vision, speech and language problems. Intervention can improve communication skills and avoid or reduce language and learning problems. The American Academy of Pediatrics (AAP) (2000) recommends annual well-child visits for 2 to 6 year-olds. |
| **Denominator** |  |
| **Denominator Exclusions** | N/A |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients who had 1 or more well child visits with a PCP during the measurement period. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria) |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 |
| |  | D1 | Age at period end equal to or between 3 and 6 years |
| | AND | D2 | Patient had 1 or more medical visits in the 3 years prior to the MP end date as indicated by HEDIS Outpatient CPT Value Set |
| | Value Sets | | D2: HEDIS Outpatient CPT |
| **Denominator Exclusions** | | | None |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | A well child visit with a PCP during the measurement period |
| | Value Sets | | N1: HEDIS Well-Care |
| **Numerator Exclusions** | | | None |
