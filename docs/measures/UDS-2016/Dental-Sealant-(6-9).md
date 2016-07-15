Status: Client-Ready
Author: Josh Stephens
CreateDate: 2016-04-11
ModifyDate: 2016-04-11
AAVersion: 4.9

#Oral Health Sealant for Children between 6 - 9 years (CMS277v5)

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Oral Health Sealant for Children between 6 - 9 years (CMS277v5) |
| **Long Display Name** | Oral Health Sealant for Children between 6 - 9 years (CMS277v5) |
| **Short Display Name** | Dental Sealant (6-9) |
| **Source** | CMS (https://www.cms.gov/Regulations-and-Guidance/Legislation/EHRIncentivePrograms/Downloads/eCQM_2014_EP_June2015.zip) |
| **Description** | Percentage of children, age 6-9 years, at moderate to high risk for caries who received a sealant on a first permanent molar during the measurement period |
| **Purpose** | Dental caries is the most common chronic disease in children in the United States. In 2009 to 2010, 14 percent of children aged 3 to 5 years had untreated dental caries. Among children aged 6 to 9 years, 17 percent had untreated dental caries, and among adolescents aged 13 to 15, 11 percent had untreated dental caries. Identifying caries early is important to reverse the disease process, prevent progression of caries, and reduce incidence of future lesions. Approximately three quarters of children younger than age 6 years did not have at least one visit to a dentist in the previous year. Evidence based Clinical Recommendations recommend that sealants should be placed on pits and fissures of children's primary and permanent teeth when it is determined that the tooth, or the patient, is at risk of experiencing caries. The evidence for sealant effectiveness in permanent molars is stronger than evidence for primary molars. |
| **Target** | 50% (configurable by client)% (configurable by client) |
| **Target Source** | Arcadia Default |
| **Denominator** | children who had an oral assessment or comprehensive or periodic oral evaluation visit in the measurement year and are at moderate to high risk for caries. |
| **Denominator Exclusions** | N/A |
| **Denominator Exceptions** | Children for whom all first permanent molars are non-sealable i.e., all molars are either decayed, have a filling, were previously sealed, or un-erupted/missing |
| **Numerator** | Children who received a sealant on a permanent first molar tooth in the measurement period. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria) |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 AND D4 |
| |  | D1 | Age at measurement period start >= 5 |
| | AND | D2 | Age at measurement period end < 9 |
| | AND | D3 | A valid encounter during the measurement period |
| | AND | D4 | Identified as having an elevated risk of caries during the measurement period |
| | Value Sets | | D3: VSAC Comprehensive or Periodic Oral Evaluation, VSAC Oral Assessment<br>D4: VSAC Cares Risk Assessment Performed and finding of elevated risk, VSAC Elevated Dental Caries Risk Diagnosis |
| **Denominator Exclusions** | | | None |
| **Denominator Exceptions** | | | EXP1 AND EXP2 AND EXP3 AND EXP4 |
| |  | EXP1 | Left mandibular molar can't be sealed due to being decayed, filled, unerupted or previously sealed before the measurement period end |
| | AND | EXP2 | Right mandibular molar can't be sealed due to being decayed, filled, unerupted or previously sealed before the measurement period end |
| | AND | EXP3 | Left maxillary molar can't be sealed due to being decayed, filled, unerupted or previously sealed before the measurement period end |
| | AND | EXP4 | Right maxillary molar can't be sealed due to being decayed, filled, unerupted or previously sealed before the measurement period end |
| | Value Sets | | EXP1: VSAC Unerupted teeth, VSAC Tooth Restoration of permanent molar, VSAC Procedure of sealant placement, VSAC Tooth Not Sealable<br>EXP2: VSAC Unerupted teeth, VSAC Tooth Restoration of permanent molar, VSAC Procedure of sealant placement, VSAC Tooth Not Sealable<br>EXP3: VSAC Unerupted teeth, VSAC Tooth Restoration of permanent molar, VSAC Procedure of sealant placement, VSAC Tooth Not Sealable<br>EXP4: VSAC Unerupted teeth, VSAC Tooth Restoration of permanent molar, VSAC Procedure of sealant placement, VSAC Tooth Not Sealable |
| **Numerator** | | | N1 |
| |  | N1 | Recieved a sealant on a mandibular/maxillary molar during 12 months before the measurement period end |
| | Value Sets | | N1: VSAC Procedure of sealant placement |
| **Numerator Exclusions** | | | None |
