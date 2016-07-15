Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-02-04
ModifyDate: 2016-02-04
AAVersion: 4.9

#Weight Assessment and Counseling for Children and Adolescents (BMI)

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Weight Assessment and Counseling for Children and Adolescents (BMI) |
| **Long Display Name** | Adolescent Body Mass Index Screening Percentile |
| **Short Display Name** | Adolescent BMI Pct |
| **Description** | Children ages 3-17 years of age with an outpatient visit with a PCP or OB/GYN in the measurement year who have a BMI percentile documented in the measurement year. (Note: Because BMI norms for youth vary by age and gender, this measure evaluates whether BMI percentile is assessed rather than an absolute BMI value.) |
| **Purpose** | Obesity in children is associated with a broad spectrum of serious health issues, including obstructive sleep apnea, asthma, nonalcoholic fatty liver disease, type 2 diabetes mellitus, depression, orthopedic problems, and skin conditions (Barlow, 2007). While childhood obesity rates have stabilized over the past decade, the percentage of young children and adolescents who are overweight or obese remains high (Ogden et al., 2014). BMI is a cheap and easy initial screen for evaluating the health, growth, and development of children. Expert committee recommendations state that for children, BMI should be calculated and plotted at least annually and the classification of weight should be integrated with growth patterns, family history of obesity, and medical risks (Barlow, 2007). Used as a screening tool, BMI can raise concerns that prompt further assessment of clinical information and guide treatment of specific health issues (Barlow, 2007; Speiser et al., 2005). |
| **Denominator** | Patient between the ages of three and seventeen during the MP.<br>AND<br>Patient has an outpatient visit with a PCP or OB/GYN in the MP. |
| **Denominator Exclusions** | Patient is pregnant during the MP. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients who had a BMI percentile documented in the measurement year. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria)<br><br>Remove patients from the denominator and numerator if they meet the *denominator exclusion* criteria. |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 |
| |  | D1 | Patient is aged 3 and above during the MP |
| | AND | D2 | Patient is under the age of 18 for the entirety of the MP |
| | AND | D3 | Patient has had an encounter with a PCP or OB/GYN during the MP as indicated by the codes in HEDIS (Outpatient Value Set) |
| | Value Sets | | D3: HEDIS Outpatient |
| **Denominator Exclusions** | | | EX1 |
| |  | EX1 | Patient is pregnant during the MP, indicated by the Pregnancy ICD Codes found in HEDIS (Pregnancy Value Set) |
| | Value Sets | | EX1: HEDIS Pregnancy |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | Patient has a BMI percentile documented in the measurement year, as indicated by the codes in HEDIS (BMI Percentile Value Set) and Arcadia Custom BMI Percentile Vital Value Set |
| | Value Sets | | N1: HEDIS BMI Percentile, Arcadia Custom BMI Percentile Vital |
| **Numerator Exclusions** | | | None |
