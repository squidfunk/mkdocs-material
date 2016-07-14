#Colorectal Cancer Screening

|Attribute|Description|
|---------|-----------|
|**Display Name**|Colorectal Cancer Screening|
|**Display Short Name**|Colorectal Cancer Screen|
|**Description**|Percentage of patients 51-75 years of age who were screened for colorectal cancer.|
|**Source**|http://www.oregon.gov/oha/analytics/Pages/CCO-Baseline-Data.aspx : Colorectal Cancer Screening - 2016.pdf|
|**Purpose**| Colorectal cancer is the third leading cause of cancer death in the United States (American Cancer Society 2010).<br>Screening for colorectal cancer is extremely important as there are no signs or symptoms of the cancer in the early stages. If the disease is caught in its earliest stages, it has a five-year survival rate of 91%; however, the disease is often not caught this early. While screening is extremely effective in detecting colorectal cancer, it remains underutilized (American Cancer Society 2010).<br>Fecal occult blood tests, colonoscopy, and flexible sigmoidoscopy are shown to be effective screening methods (United States Preventive Services Task Force, 2008). Colorectal screening of individuals with no symptoms can identify polyps whose removal can prevent more than 90% of colorectal cancers (Rozen 2004).<br>Studies have shown that the cost-effectiveness of colorectal cancer screening is $40,000 per life year gained, which is similar to the cost-effectiveness of mammography for breast cancer screening (Hawk and Levin 2005). |
|**Target**|47%*|
|**Measurement Period (MP)**| The measure is calculated for a selected period of time, defined by:<ul><li>Selected MP End Date: The last day of the selected measurement period</li><li> Selected MP Start Date: One year prior to the MP end date </li></ul>
|**Denominator**|Patients 51-75 years of age as of measurement period end date|
|**Denominator Exclusions**|Patients with Colorectal Cancer or a Total Colectomy before period end.|
|**Denominator Exceptions**|None|
|**Numerator**|Patients with an FOBT during 1 year before period end, a flexible sigmoidoscopy during 5 years before period end, or a colonoscopy during 10 years before period end.|
|**Numerator Exclusion**|None|
|**Grain**|Person|
|**Unit**|Percent|
|**Notes**|Based on the HEDIS 2016 Physican Measurement measure. Note that FOBTs from electronic data are assumed to have the required number of samples as recommended by HEDIS.<br>*Target based on OHA 2015 benchmark, as the 2016 benchmark is not yet available.|


##Criteria

|Component|Logic|Ref #|Criteria|
|---------|-----|-------|--------|
|**Denominator**| | | D1 AND D2 |
| | | D1 | Patient age between 51 and 75 at period end |
| | AND | D2 | Patient had any interaction during 2 years before period end |
| | Value Sets | | None |
|**Denominator Exclusions**| | | EX1 OR EX2 |
| | | EX1 | Patient had a Colorectal Cancer diagnosis before period end |
| | OR | EX2 | Patient had a Total Colectomy procedure before period end |
| | Value Sets | | EX1: HEDIS 2015 Colorectal Cancer Value Set<br>EX2: HEDIS 2015 Total Colectomy Value Set, Arcadia Custom Colectomy Value Set |
|**Denominator Exceptions**| | | None |
|**Numerator**| | | N1 OR N2 OR N3 |
| | | N1 | Patient had an FOBT during 1 year before period end |
| | OR | N2 | Patient had a flexible sigmoidoscopy during 5 years before period end |
| | OR | N3 | Patient had a colonoscopy during 10 years before period end |
| | Value Sets | | N1: HEDIS 2015 FOBT Value Set, Arcadia Custom FOBT<br>N2: HEDIS 2015 Flexible Sigmoidoscopy Value Set, Arcadia Custom Flexible Sigmoidoscopy<br>N3: HEDIS 2015 Colonoscopy Value Set, Arcadia Custom Colonoscopy |
|**Numerator Exclusions**| | | None |
