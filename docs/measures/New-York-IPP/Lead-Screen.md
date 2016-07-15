Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-02-04
ModifyDate: 2016-02-04
AAVersion: 4.9

#Lead Screening

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Lead Screening |
| **Long Display Name** | Lead Screening |
| **Short Display Name** | Lead Screen |
| **Description** | Children who turned two years old during the measurement year who have had at least one capillary or venous blood test on or before the second birthday. |
| **Purpose** | Children 1 to 5 years of age have the highest prevalence of elevated blood levels of any age group in the U.S., although the prevalence has declined over the past several decades. Even with these decreases, an estimated 310,000 children in this country remain at risk for exposure to harmful levels of lead (Centers for Disease Control and Prevention [CDC], 2005). Lead poisoning in childhood primarily affects the central nervous system, the kidneys, and the blood-forming organs. Adverse effects in young children have been noted at levels as low as 10 micrograms per deciliter (Committee on Measuring Lead in Critical Populations & National Research Council, 1993). |
| **Denominator** | Patient turned two years of age during the MP. |
| **Denominator Exclusions** | N/A |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients from denominator with documentation of at least one capillary or venous blood test on or before the second birthday. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria) |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 |
| |  | D1 | Patient had one or more medical visits in the three years prior to the MP end date as indicated by CPT codes in HEDIS (Outpatient CPT Value Set) |
| | AND | D2 | Patient turned two years of age during the MP |
| | Value Sets | | D1: HEDIS Outpatient CPT |
| **Denominator Exclusions** | | | None |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | Patient has documentation of one completed capillary or Venous blood test for lead poisoning on or before their second birthday, as indicated by the codes in HEDIS (Lead Tests Value Set) |
| | Value Sets | | N1: HEDIS Lead Tests |
| **Numerator Exclusions** | | | None |
