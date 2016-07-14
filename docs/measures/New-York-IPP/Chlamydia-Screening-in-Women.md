Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-04-13
ModifyDate: 2016-02-13
AAVersion: 4.9

#Chlamydia Screening in Women

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Chlamydia Screening in Women |
| **Long Display Name** | Chlamydia Screening in Women |
| **Short Display Name** | Chlamydia Screening in Women |
| **Description** | The percentage of women 16-24 years of age who were identified as sexually active and who had at least one test for chlamydia during the measurement period. |
| **Purpose** | Chlamydia trachomatis is the most common sexually transmitted disease (STD) in the United States (U.S.). The Centers for Disease Control and Prevention (CDC) estimates that approximately three million people are infected with chlamydia each year. Risk factors associated with becoming infected with chlamydia are the same as risks for contracting other STDs (e.g., multiple sex partners). Chlamydia is more prevalent among adolescent (15 to 19) and young adult (20 to 24) women. Screening is essential because the majority of women who have the condition do not experience symptoms. The main objective of chlamydia screening is to prevent pelvic inflammatory disease (PID), infertility, and ectopic pregnancy, all of which have very high rates of occurrence among women with untreated chlamydia infection. The specifications for this measure are consistent with current clinical guidelines, such as those of the U.S. Preventive Services Task Force (USPSTF) (2001). |
| **Denominator** | All sexually active females ages 16-24 years. |
| **Denominator Exclusions** | Patients who qualified for the denominator with a pregnancy test alone and who also had a prescription for isotretinoin (treatment for severe acne) or X-ray within 6 days of the pregnancy test. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients from the denominator who had at least one chlamydia test during the measurement period. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria)<br><br>Remove patients from the denominator and numerator if they meet the *denominator exclusion* criteria. |
| **Notes** | The HEDIS specification suggests reporting separately for 3 age groups (16-20, 21-24, and 16-24), but this measure is the combined 16-24 version. |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND (D3 OR D4) AND D5 |
| |  | D1 | Age between 16 and 24 years at measurement period end |
| | AND | D2 | Gender is female |
| | AND | D3 | Dispensed a prescription for a contraceptive during measurement period |
| | OR | D4 | An indication of sexual activity in the measurement period |
| | AND | D5 | Patient had 1 or more medical visits in the 3 years prior to MP end date as indicated by HEDIS Outpatient CPT Value Set |
| | Value Sets | | D3: HEDIS Drug Table CHL-A<br>D4: HEDIS Pregnancy, HEDIS Pregnancy Tests, HEDIS Sexual Activity, Arcadia Custom Effective Contraceptive<br>D5: HEDIS Outpatient CPT |
| **Denominator Exclusions** | | | EX1 AND (EX2 AND (EX3 OR EX4)) |
| |  | EX1 | Patient qualified for the denominator based on a pregnancy test alone |
| | AND | EX2 | Evidence of a pregnancy test exclusion during the measurement period |
| | AND | EX3 | A prescription for Isotretinoin during 6 days after the pregnancy test |
| | OR | EX4 | An X-ray during 6 days after the pregnancy test |
| | Value Sets | | EX1: HEDIS Pregnancy Tests<br>EX2: HEDIS Pregnancy Test Exclusion<br>EX3: HEDIS Drug Table CHL-E<br>EX4: HEDIS Diagnostic Radiology |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | At least one chlamydia test during the measurement period |
| | Value Sets | | N1: HEDIS Chlamydia Test, Arcadia Custom Chlamydia Screening |
| **Numerator Exclusions** | | | None |
