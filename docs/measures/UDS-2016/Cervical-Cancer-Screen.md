Status: Client-Ready
Author: Josh Stephens
CreateDate: 2016-04-1
ModifyDate: 2016-04-1
AAVersion: 4.9

#Cervical Cancer Screen (CMS124v4)

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Cervical Cancer Screen (CMS124v4) |
| **Long Display Name** | Cervical Cancer Screen (CMS124v4) |
| **Short Display Name** | Cervical Cancer Screen |
| **Source** | CMS (https://www.cms.gov/Regulations-and-Guidance/Legislation/EHRIncentivePrograms/Downloads/eCQM_2014_EP_June2015.zip) |
| **Description** | Percentage of women 21-64 years of age, who received one or more Pap tests to screen for cervical cancer. |
| **Purpose** | Cervical cancer has a high survival rate when detected early, yet it is the second most common cancer among women worldwide (Myers et al. 2008). In the United States, about 12,000 women are diagnosed with cervical cancer each year. In 2010, more than 4,000 women died from cervical cancer (American Cancer Society 2010). For women in whom pre-cancerous lesions have been detected through Pap tests, the likelihood of survival is nearly 100 percent with appropriate evaluation, treatment and follow-up (American Cancer Society 2011). For women under 50 years old, cervical cancer is diagnosed in the early stage 61 percent of the time (American Cancer Society 2010). In 2008, the prevalence of recent Pap test use was lowest among older women, women with no health insurance and recent immigrants (American Cancer Society 2011). |
| **Target** | 50% (configurable by client)% (configurable by client) |
| **Target Source** | Arcadia Default |
| **Denominator** | Women 23-64 years of age with a visit during the measurement period |
| **Denominator Exclusions** | Women who had a hysterectomy with no residual cervix |
| **Denominator Exceptions** | N/A |
| **Numerator** | Women with one or more Pap tests during the measurement period or the two years prior to the measurement period |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria) |
| **Notes** | The following value sets contain LOINC and SNOMED codes that are not supported and therefore are not used in the measure calculation VSAC Face to Face Visits, VSAC PAP Test |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 AND D4 |
| |  | D1 | 23 years or older at the measurement period start |
| | AND | D2 | 63 years or younger at the measurement period end |
| | AND | D3 | Gender is female |
| | AND | D4 | A qualified visit during the measurement period |
| | Value Sets | | D4: VSAC Office Visit, VSAC Preventive Care Services - Established Office Visit, 18 and Up, VSAC Preventive Care Services-Initial Office Visit, 18 and Up, VSAC Home Healthcare Services |
| **Denominator Exclusions** | | | EX1 |
| |  | EX1 | A hysterectomy with no residual cervix performed before the end of the measurment period |
| | Value Sets | | EX1: VSAC Hysterectomy with No Residual Cervix, Custom Arcadia Hysterectomy maintenance |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | A completed PAP test during the measurement period or the 2 years prior to the measurement period |
| | Value Sets | | N1: Custom Arcadia PAP Test maintenance, completed order and result |
| **Numerator Exclusions** | | | None |
