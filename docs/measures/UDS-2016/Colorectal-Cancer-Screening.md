Status: Client-Ready
Author: Josh Stephens
CreateDate: 2016-04-05
ModifyDate: 2016-04-05
AAVersion: 4.10

#Colorectal Cancer Screening (CMS130v4)

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Colorectal Cancer Screening (CMS130v4) |
| **Long Display Name** | Colorectal Cancer Screening |
| **Short Display Name** | Colorectal Cancer Screening |
| **Source** | CMS (https://www.cms.gov/Regulations-and-Guidance/Legislation/EHRIncentivePrograms/Downloads/eCQM_2014_EP_June2015.zip) |
| **Description** | Percentage of adults 50-75 years of age who had appropriate screening for colorectal cancer. |
| **Purpose** | An estimated 142,570 men and women were diagnosed with colon cancer in 2010. In the same year, 51,370 were estimated to have died from the disease, making colorectal cancer the third leading cause of cancer death in the United States (American Cancer Society 2010). Screening for colorectal cancer is extremely important as there are no signs or symptoms of the cancer in the early stages. If the disease is caught in its earliest stages, it has a five-year survival rate of 91%; however, the disease is often not caught this early. While screening is extremely effective in detecting colorectal cancer, it remains underutilized (American Cancer Society 2010). Fecal occult blood tests, colonoscopy, and flexible sigmoidoscopy are shown to be effective screening methods (United States Preventive Services Task Force, 2008). Colorectal screening of individuals with no symptoms can identify polyps whose removal can prevent more than 90% of colorectal cancers (Rozen 2004). Studies have shown that the cost-effectiveness of colorectal cancer screening is $40,000 per life year gained, which is similar to the cost-effectiveness of mammography for breast cancer screening (Hawk and Levin 2005). |
| **Target** | 50% (configurable by client)% (configurable by client) |
| **Target Source** | Arcadia Default |
| **Denominator** | Patients 50-75 years of age with a visit during the measurement period |
| **Denominator Exclusions** | Patients with a diagnosis or past history of total colectomy or colorectal cancer |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients with one or more screenings for colorectal cancer. Appropriate screenings are defined by any one of the following criteria: Fecal occult blood test (FOBT) during the measurement period. Flexible sigmoidoscopy during the measurement period or the four years prior to the measurement period. Colonoscopy during the measurement period or the nine years prior to the measurement period |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria) |
| **Notes** | The VSAC face-to-face interaction value set contains SNOMED codes that are not supported and therefore are not used in the calculation of this measure. The VSAC Fecal Occult Blood Test (FOBT) contains Loinc codes which are not supported and are therefore not used in the calculation of this measure |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 |
| |  | D1 | 50 years or older at the measurement period start |
| | AND | D2 | 74 years or younger at the measurement period end |
| | AND | D3 | A valid encounter during the measurement period |
| | Value Sets | | D3: VSAC Office Visit, VSAC  Preventive Care Services - Established Office Visit, 18 and Up, VSAC Preventive Care Services-Initial Office Visit, 18 and Up, VSAC Home Healthcare Services, VSAC Annual Wellness Visit |
| **Denominator Exclusions** | | | EX1 OR EX2 |
| |  | EX1 | Total Colectomy before the end of the measurement period |
| | OR | EX2 | Colon cancer before the end of the measurement period |
| | Value Sets | | EX1: VSAC Total Colectomy, Custom Arcadia Colectomy maintenance<br>EX2: VSAC Malignant Neoplasm of Colon |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 OR N2 OR N3 |
| |  | N1 | A colonoscopy during 9 years before the measurement period end |
| | OR | N2 | A flexible sigmoidoscopy during 4 years before the measurement period end |
| | OR | N3 | A fecal occult blood test during the measurement period |
| | Value Sets | | N1: VSAC Colonoscopy, Custom Arcadia Colonoscopy maintenance<br>N2: VSAC Flexible Sigmoidoscopy, Custom Arcadia Flexible Sigmoidoscopy maintenance, completed order or result<br>N3: Custom Arcadia FOBT maintenance, completed order or result |
| **Numerator Exclusions** | | | None |
