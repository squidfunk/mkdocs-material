Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-04-13
ModifyDate: 2016-02-13
AAVersion: 4.9

#Weight Assessment and Counseling Children and Adolescents (Nutrition Counseling)

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Weight Assessment and Counseling Children and Adolescents (Nutrition Counseling) |
| **Long Display Name** | Adolescent Nutrition Counsel |
| **Short Display Name** | Adolescent Nutrition Counsel |
| **Description** | The percentage of patients 3-17 years of age who had an outpatient visit with a PCP or OB/GYN and who had evidence of the following during the measurement year: Counseling for nutrition. |
| **Purpose** | In the past 30 years, the prevalence of overweight and obesity has increased sharply for children. Among young people, the prevalence of overweight increased from 5.0 percent to 13.9 percent for those aged 2 to 5 years; from 6.5 percent to 18.8 percent for those aged 6 to 11 years; and from 5.0 percent to 17.4 percent for those aged 12 to 19 years. In 2000, the estimated total cost of obesity in the United States (U.S.) was about $117 billion. Promoting regular physical activity and healthy eating, as well as creating an environment that supports these behaviors, is essential to addressing the problem (CDC, 2007). |
| **Denominator** | Patients 3-17 years of age as of the measurement period end date who had an outpatient visit with a PCP or OB/GYN practitioner during the measurement period. |
| **Denominator Exclusions** | A diagnosis of pregnancy during the measurement period. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Evidence of counseling for nutrition or referral for nutrition education during the measurement period. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria)<br><br>Remove patients from the denominator and numerator if they meet the *denominator exclusion* criteria. |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 |
| |  | D1 | Age at period end >= 3 |
| | AND | D2 | Age at period end <= 17 |
| | AND | D3 | Outpatient visit with PCP or OB/GYN during measurement period |
| | Value Sets | | D3: HEDIS Outpatient CPT |
| **Denominator Exclusions** | | | EX1 |
| |  | EX1 | Diagnoses of Pregnancy during 12 months before measurement period end |
| | Value Sets | | EX1: HEDIS Pregnancy |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | Evidence of referral for counseling for nutrition during measurement period. Counseling for nutrition during the measurement year, EHR documentation must include a date with at least one of the following: Discussion of current nutrition behaviors, Checklist indicating nutrition was addressed, Counseling or referral for nutrition education, Patient received educational materials on nutrition during a face-to-face visit, Anticipatory guidance for nutrition, Weight or obesity counseling |
| | Value Sets | | N1: HEDIS Nutrition Counseling |
| **Numerator Exclusions** | | | None |
