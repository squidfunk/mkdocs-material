Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-02-04
ModifyDate: 2016-02-04
AAVersion: 4.9

#Colorectal Cancer Screening

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Colorectal Cancer Screening |
| **Long Display Name** | Colorectal Cancer Screening |
| **Short Display Name** | Colo Cancer Screen |
| **Description** | Percent of patients 51 - 75 years of age with one or more screenings for colorectal cancer. |
| **Purpose** | Colorectal cancer (CRC) is the second leading cause of cancer-related deaths in the United States (U.S. Preventive Services Task Force, 2002). Unlike other screening tests that only detect disease, some methods of CRC screening can detect premalignant polyps and guide their removal, which, in theory, can prevent the cancer from developing. Compelling evidence gathered during the past decade shows that systematic screening can reduce mortality from CRC. Colorectal screening may also lower mortality by allowing detection of cancer at earlier stages, when treatment is more effective (Kavanagh et al., 1998). |
| **Denominator** | Patient had one or more medical visits in the three years prior to the MP end date.<br>AND<br>Patient is 51-75 years of age. |
| **Denominator Exclusions** | Patient has colorectal cancer or has undergone a total colectomy. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patient had one or more screenings for colorectal cancer defined by one of the following criteria:<br>-FOBT during measurement year<br>-Flexible sigmoidoscopy within the past 5 years<br>-Colonoscopy within the past 10 years |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria)<br><br>Remove patients from the denominator and numerator if they meet the *denominator exclusion* criteria. |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 |
| |  | D1 | Patient had one or more medical visits in the three years prior to the MP end date as indicated by CPT codes in HEDIS (Outpatient CPT Value Set) |
| | AND | D2 | Patient is 51-75 years of age |
| | Value Sets | | D1: HEDIS Outpatient CPT |
| **Denominator Exclusions** | | | EX1 |
| |  | EX1 | Patient has an active diagnosis of Colorectal Cancer or has undergone a total colectomy as indicated by the codes in HEDIS (Colorectal Cancer Value Set, Total Colectomy Value Set) |
| | Value Sets | | EX1: HEDIS Colorectal Cancer, HEDIS Total Colectomy |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 OR N2 OR N3 |
| |  | N1 | Patient had a FOBT during measurement year, as indicated by the codes in HEDIS (FOBT Value Set) |
| | OR | N2 | Patient had a Flexible sigmoidoscopy within the past 5 years from the MP end date, as indicated by the codes in HEDIS (Flexible Sigmoidoscopy Value Set) |
| | OR | N3 | Patient had a Colonoscopy within the past 10 years from the MP end date, as indicated by the codes in HEDIS (Colonoscopy Value Set) |
| | Value Sets | | N1: HEDIS FOBT<br>N2: HEDIS Flexible Sigmoidoscopy<br>N3: HEDIS Colonoscopy |
| **Numerator Exclusions** | | | None |
