Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-04-13
ModifyDate: 2016-02-13
AAVersion: 4.9

#Well Child Visit in the First 15 Months of Life

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Well Child Visit in the First 15 Months of Life |
| **Long Display Name** | Well Child Visits in the First 15 Months of Life |
| **Short Display Name** | Well-Child (15 mo) |
| **Description** | The percentage of patients who turned 15 months old during the measurement year and who had 6 or more well child visits with a PCP. |
| **Purpose** | The American Academy of Pediatrics (AAP) (2000) recommends six well-child visits in the first year of life: the first within the first month of life, and then at around 2, 4, 6, 9, and 12 months of age. These visits are of particular importance during the first year of life, when an infant undergoes substantial changes in abilities, physical growth, motor skills, hand-eye coordination and social and emotional growth. Regular check-ups are one of the best ways to detect physical, developmental, behavioral and emotional problems. They also provide an opportunity for the clinician to offer guidance and counseling to the parents. |
| **Denominator** | Patients who turned 15 months old during the measurement period and who had a claim or encounter during the measurement period and the year prior. |
| **Denominator Exclusions** | N/A |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients who had 6 or more well child visits with a PCP. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria) |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 AND D4 |
| |  | D1 | Age at period start <= 15 months |
| | AND | D2 | Age at period end >= 15 months |
| | AND | D3 | An interaction during the measurement period |
| | AND | D4 | An interaction during the 12 months prior to the measurement period |
| **Denominator Exclusions** | | | None |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | 6 or more well child visits with a PCP on or before the 15th month birthdate |
| | Value Sets | | N1: HEDIS Well-Care |
| **Numerator Exclusions** | | | None |
