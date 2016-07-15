Status: Client-Ready
Author: Bill Baranowski
CreateDate: 2016-04-06
ModifyDate: 2016-04-06
AAVersion: 4.10

#Body Mass Index (BMI) Screening and Follow-Up Plan (CMS69v4.1)

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Body Mass Index (BMI) Screening and Follow-Up Plan (CMS69v4.1) |
| **Long Display Name** | Body Mass Index (BMI) Screening and Follow-Up Plan (CMS69v4.1) |
| **Short Display Name** | Adult Weight |
| **Source** | CMS (https://www.cms.gov/Regulations-and-Guidance/Legislation/EHRIncentivePrograms/Downloads/eCQM_2014_EP_June2015.zip) |
| **Description** | Percentage of patients aged 18 years and older with a BMI documented during the current encounter or during the previous six months AND if the BMI is outside of normal parameters, a follow-up plan is documented during the encounter or during the previous six months of the current encounter.<br><br>For age 18 to 64 "normal parameters" are between 18.5 and 25 kg/m2; for age 65+ they are between 23 and 30 kg/m2. |
| **Purpose** | Winter et al. (2014) performed a meta-analysis looking at the relationship between BMI and all-cause mortality among adults 65 and older. They identified a higher risk of mortality among those with a BMI <23 kg/m2 and recommended monitoring weight status in this group to address any modifiable causes of weight loss promptly with due consideration of individual comorbidities. Dahl et al. (2013) reported that old persons (70-79) who were overweight had a lower mortality risk than old persons who were of normal weight, even after controlling for weight change and multimorbidity. The study also shows that persons who increased or decreased in BMI had a greater mortality risk than those who had a stable BMI, particularly those aged 70 to 79. Their results provide support to the belief that the World Health Organization guidelines for BMI are overly restrictive in old age.<br><br>Obesity is also associated with an increased risk of death, particularly in adults younger than age 65 years and has been shown to reduce life expectancy by 6 to 20 years depending on age and race (LeBlanc et al., 2011). Masters et al. (2013) also showed mortality due to obesity varied by race and sex. They estimated adult deaths between 1986 and 2006 associated with overweight and obesity was 5.0% and 15.6% for Black and White men, and 26.8% and 21.7% for Black and White women, respectively. They also found a stronger association than previous research demonstrated between obesity and mortality risk at older ages.<br><br>In the National Center of Health Statistics (NCHS) Health E-Stat, Fryer & Ogden (2012) reported that poor nutrition or underlying health conditions can result in underweight. Results from the 2007-2010 National Health and Nutrition Examination Survey (NHANES), using measured heights and weights, indicate an estimated 1.7% of U.S. adults are underweight with women more likely to be underweight than men (2012).<br><br>In a cohort study conducted by Borrell & Lalitha (2014), data from NHANES III (1988-1994) was linked to the National Death Index mortality file with follow-up to 2006, and showed that when compared to their normal weight counterparts (BMI 18.5-25 kg/m2), underweight (BMI <18.5 kg/m2) had significantly higher death rates (Hazard Ratio=2.27; 95% confidence intervals (CI) = 1.78, 2.90). |
| **Target** | 50% (configurable by client)% (configurable by client) |
| **Target Source** | Arcadia Default |
| **Denominator** | There are 2 rates reported for this measure<ul><li>Rate 1: Patients 18 through 64 with an eligible encounter during the measurement period.</li><li>Rate 2: Patients 65 years and older with an eligible encounter during the measurement period.</li></ul> |
| **Denominator Exclusions** | <ul><li>Rate 1: Patients who are pregnant, have evidence of palliative care, refuse measurement of height and/or weight, or have a medical reason for not having a BMI recorded.</li><li>Rate 2: Patients who have evidence of palliative care, refuse measurement of height and/or weight, or have a medical reason for not having a BMI recorded</li></ul> |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients with a documented BMI during the encounter or during the previous six months, AND when the BMI is outside of normal parameters, a follow-up plan is documented during the encounter or during the six months previous to the current encounter. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria) |
| **Notes** | This measure does not directly use the "VSAC Medical or Other reason not done" or "VSAC Patient Reason refused" exception value sets; instead Arcadia works with each data source individually to capture these data concepts.<br><br>This measure does not directly use the "VSAC BMI LOINC Value" value set because Arcadia works with each data source individually to capture BMI data.<br><br>This measure does not use "VSAC Referrals where weight assessment may occur" as a valid follow-up because the product does not currently support SNOMEDCT; instead Arcadia works with each data source individually to capture referrals to the following specialties (referenced in the technical criteria as "Arcadia Custom Referral for BMI"):<br>Exercise Physiologist, Family Practice, General Internal Medicine, General Pediatrics, General Practice, General Surgery, Geriatrics, Internal Medicine, Mental Health, Nutritionist, Occupational Therapist, PCP, Pediatrics, Physical Medicine Rehab, Physical Therapist, Registered Dietician, Surgeon |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 |
| |  | D1 | Patient had an eligible encounter during the period. |
| | AND | D2 | <ul><li>Rate 1: Patient was between 18 and 64 years of age at the encounter from D1.</li><li>Rate 2: Patient was at least 65 years of age at the encounter from D1.</li></ul> |
| | Value Sets | | D1: VSAC BMI Encounter Code Set |
| **Denominator Exclusions** | | | EX1 OR EX2 OR EX3 OR EX4 |
| |  | EX1 | Patient had evidence of palliative care before the encounter from D1. |
| | OR | EX2 | Patient had a medical reason for not recording BMI during the encounter from D1. |
| | OR | EX3 | Patient refused to have a BMI recorded during the encounter from D1. |
| | OR | EX4 | Valid for Rate 1 only: Patient was pregnant during 1 year before period end. |
| | Value Sets | | EX1: VSAC Palliative Care, Arcadia Custom Terminal Illness<br>EX2: Arcadia Custom Medical Reason - No BMI<br>EX3: Arcadia Custom Patient Reason - No BMI<br>EX4: VSAC Pregnancy Dx |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 AND (N2 OR (N3 AND N4) OR (N5 AND N6)) |
| |  | N1 | Patient had a BMI recorded at the encounter from D1 or during the 6 months prior. If there are multiple values use the most recent. |
| | AND | N2 | <ul><li>Rate 1: The BMI result was >= 18.5 kg/m2 and < 25 kg/m2.</li><li>Rate 2: The BMI result was >= 23 kg/m2 and < 30 kg/m2.</li></ul> |
| | OR | N3 | The BMI result was above the range given in N2. |
| | AND | N4 | Patient had a follow-up plan for above normal BMI documented at the encounter from D1 or during the 6 months prior. |
| | OR | N5 | The BMI result was below the range given in N2. |
| | AND | N6 | Patient had a follow-up plan for below normal BMI documented at the encounter from D1 or during the 6 months prior. |
| | Value Sets | | N1: Arcadia Custom BMI<br>N2: Arcadia Custom BMI<br>N3: Arcadia Custom BMI<br>N4: VSAC Above Normal Follow-up, VSAC Above Normal Medications, Arcadia Custom BMI Follow Up, Arcadia Custom Nutrition Counseling, Arcadia Custom Physical Activity Counseling, Arcadia Custom Referral for BMI<br>N5: Arcadia Custom BMI<br>N6: VSAC Below Normal Follow up, VSAC Below Normal Medications, Arcadia Custom BMI Follow Up, Arcadia Custom Nutrition Counseling, Arcadia Custom Physical Activity Counseling, Arcadia Custom Referral for BMI |
| **Numerator Exclusions** | | | None |
