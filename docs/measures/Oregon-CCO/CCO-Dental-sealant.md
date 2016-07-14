


# Dental Sealants on Permanent Molars for Children



| Attribute | Description |
|----------------------------------------|---------------------------------------------------------------------------------------------------------------|
| **Name** | Dental Sealants on Permanent Molars for Children |
| **Display Name** | Dental Sealants on Permanent Molars for Children |
| **Display Short Name** | Dental Sealants |
| **Description** | Individuals aged 6 to 14 who had a dental visit where carries risk was assessed and received a seal on a molar tooth.   |
| **Source/Code** | http://www.oregon.gov/oha/analytics/CCOData/Dental%20Sealants%20-%202016.pdf <br> Modified by OHA from: http://www.medicaid.gov/Medicaid-CHIP-Program-Information/By-Topics/Benefits/Downloads/CMS-416-instructions.pdf   |
| **Target** | 20% |
| **Purpose** | Dental caries is the most common chronic disease in children in the United States. In 2009–2010, 14% of children aged 3–5 years had untreated dental caries. Among children aged 6–9 years, 17% had untreated dental caries, and among adolescents aged 13–15, 11% had untreated dental caries. Identifying caries early is important to reverse the disease process, prevent progression of caries, and reduce incidence of future lesions. Approximately three quarters of children younger than age 6 years did not have at least one visit to a dentist in the previous year. Evidence-based Clinical Recommendations recommend that sealants should be placed on pits and fissures of children’s primary and permanent teeth when it is determined that the tooth, or the patient, is at risk of experiencing caries. The evidence for sealant effectiveness in permanent molars is stronger than evidence for primary molars. |
| **Measurement Period (MP)** | The measure is calculated for a selected period of time, defined by:<ul><li>Selected MP End Date: The last day of the selected measurement period</li><li> Selected MP Start Date: One year prior to the MP end date </li></ul>|
| **Denominator** | Individuals aged 6 to 14 who had a dental visit where caries risk was assessed or were identified as having elevated caries risk.   
|**Denominator Exclusions**|None|
|**Denominator Exceptions**|None|
|**Numerator**|Received a sealant on a permanent molar tooth. |
|**Numerator Exclusion**|None|
|**Grain**|Patient|
|**Unit**|Percent|
|**Notes**|2 age ranges are reported. Ages 6 to 9 and ages 10 to 14. Only medical claims will be used to calculate this measure|


# Criteria For Ages 6 to 9


|Component|Logic|Ref #|Criteria|
|---------|-----|-------|--------|
|**Denominator**| | | D1 AND (D2 OR D3) |
| | | D1 | Age between 6 and 9 at measurement period end |
| | AND | D2 | Had a dental visit where caries risk was assessed during the measurement period |
| | OR | D3 | Evidence of elevated caries risk |
| |  Value Sets | |D2: CCO Caries Risk Value Set <br> D3: CCO Elevated Risk value set  |
|**Denominator Exclusions**| | | None |
| |  Value Sets | |None |
|**Denominator Exceptions**| | | None |
|**Numerator**| | | N1 |
| | | N1 | Received at least one sealant on a permanent molar tooth during the measurement period. |
| | Value Sets | |N1: CCO Dental Sealant Value Set, Custom Arcadia Dental Sealant |
|**Numerator Exclusions**| | | None |

# Criteria For Ages 10 to 14


|Component|Logic|Ref #|Criteria|
|---------|-----|-------|--------|
|**Denominator**| | | D1 AND (D2 OR D3) |
| | | D1 | Age between 10 and 14 at measurement period end |
| | AND | D2 | Had a dental visit where caries risk was assessed during the measurement period |
| | OR | D3 | Evidence of elevated caries risk |
| |  Value Sets | |D2: CCO Caries Risk Value Set <br> D3: CCO Elevated Risk value set  |
|**Denominator Exclusions**| | | None |
| |  Value Sets | |None |
|**Denominator Exceptions**| | | None |
|**Numerator**| | | N1 |
| | | N1 | Received at least one sealant on a permanent molar tooth during the measurement period. |
| | Value Sets | |N1: CCO Dental Sealant Value Set, Custom Arcadia Dental Sealant |
|**Numerator Exclusions**| | | None |