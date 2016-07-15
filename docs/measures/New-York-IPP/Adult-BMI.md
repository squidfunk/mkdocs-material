Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-04-13
ModifyDate: 2016-02-13
AAVersion: 4.9

#Adult BMI

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Adult BMI |
| **Long Display Name** | Adult BMI Assessment |
| **Short Display Name** | Adult BMI |
| **Description** | The percentage of patients aged 18-74 years of age who had an outpatient visit and whose BMI was documented during the measurement period or the year prior to the measurement period. |
| **Purpose** | BMI is an effective measurement used by clinicians to screen those who are at risk of weight related health problems. Screening can reduce the side effects associated with over/under weight as measured by BMI and provide appropriate counseling and intervention. |
| **Denominator** | Patients aged 18 as of 1 year prior to the measurement period start to 74 years, at measurement period end, who had an outpatient visit during the measurement period or the year prior. |
| **Denominator Exclusions** | N/A |
| **Denominator Exceptions** | N/A |
| **Numerator** | For patients 21 years or older on the date of service, BMI during the measurement period or the year prior. For patients younger than 21 years of age on the date of service, BMI percentile during the measurement period or year prior. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria) |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 |
| |  | D1 | Age at period start >= 19 years |
| | AND | D2 | Age at period end <= 74 years |
| | AND | D3 | Patient had an outpatient visit during the 2 years before measurement period end as indicated by HEDIS (Outpatient CPT Value Set) |
| | Value Sets | | D3: HEDIS Outpatient CPT |
| **Denominator Exclusions** | | | None |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 OR N2 OR (N3 AND N4) OR (N5 AND N6) |
| |  | N1 | BMI documented as a CPTII code during 2 years before period end |
| | OR | N2 | BMI and Weight documented as vitals during 2 years before period end |
| | OR | N3 | BMI percentile recorded as a CPTII code during 2 years before period end |
| | AND | N4 | Age at BMI percentile recording < 21 years |
| | OR | N5 | BMI Percentile, Height and Weight documented as vitals during 2 years before period end |
| | AND | N6 | Age at BMI percentile recording < 21 years |
| | Value Sets | | N1: HEDIS BMI<br>N2: Arcadia Custom Vitals<br>N3: HEDIS BMI Percentile<br>N5: Arcadia Custom Vitals |
| **Numerator Exclusions** | | | None |
