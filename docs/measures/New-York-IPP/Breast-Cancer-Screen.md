Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-02-04
ModifyDate: 2016-02-04
AAVersion: 4.9

#Breast Cancer Screening

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Breast Cancer Screening |
| **Long Display Name** | Breast Cancer Screening (BCS) |
| **Short Display Name** | Breast Cancer Screen |
| **Description** | Percentage of female patients 52-74 years of age that have had a Mammogram within the last 27 months. |
| **Purpose** | Breast cancer is the second most common type of cancer among American women, with approximately 178,000 new cases reported each year (American Cancer Society [ACS], 2007). It is most common in women over 50. Women whose breast cancer is detected early have more treatment choices and better chances for survival. Mammography screening has been shown to reduce mortality by 20 to 30 percent among women 40 and older. A mammogram can reveal tumors too small to be felt by hand; it can also show other changes in the breast that may suggest cancer. Mammograms are the most effective method for detecting breast cancer when it is most treatable (USPSTF, 2002; "AAFP periodic," 2005; Ferrini et al., 1996). When high-quality equipment is used and well-trained radiologists read the x-rays, 85 to 90 percent of cancers are detectable. |
| **Denominator** | Patient is 52-74 years of age and had one or more medical visits in the three years prior to the MP End Date.<br>AND<br>Patient is female. |
| **Denominator Exclusions** | Patient underwent a double mastectomy. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients from denominator with documentation of a mammogram within the last 27 months. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria)<br><br>Remove patients from the denominator and numerator if they meet the *denominator exclusion* criteria. |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 |
| |  | D1 | Patient had one or more medical visits in the three years prior to the MP End Date as indicated by CPT codes in HEDIS (Outpatient CPT Value Set) |
| | AND | D2 | Patient is female |
| | AND | D3 | Patient is 52-74 years of age at the end of the MP |
| | Value Sets | | D1: HEDIS Outpatient CPT |
| **Denominator Exclusions** | | | EX1 OR EX2 |
| |  | EX1 | Patient has undergone a Double Mastectomy, as indicated by the codes in HEDIS (Bilateral Mastectomy Value Set), (Unilateral value set [with Bilateral Modifier Value Set]), two (Unilateral Mastectomy Value Set) with dates of services 14 or more days apart OR ACO Breast Cancer Mammogram Medical Exclusion Value Set. |
| | OR | EX2 | Patient has both of the following: Unilateral Mastectomy (Unilateral Mastectomy Value Set) with Right Modifier Value Set.<br>AND<br>Unilateral Mastectomy (unilateral Mastectomy Value Set) with Left Modifier Value Set. |
| | Value Sets | | EX1: HEDIS Bilateral Mastectomy, HEDIS Unilateral with Bilateral Modifier<br>EX2: HEDIS Unilateral with Right Modifier and Left Modifier |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | Patient has documentation of mammogram result within 27 months of the MP end date, as indicated by the codes in HEDIS (Mammography Value Set) and ACO Breast Cancer Mammogram Value Set. |
| | Value Sets | | N1: HEDIS Mammography |
| **Numerator Exclusions** | | | None |
