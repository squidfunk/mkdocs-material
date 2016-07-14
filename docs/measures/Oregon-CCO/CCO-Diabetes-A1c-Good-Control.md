


# Hemoglobin A1c Good Control



| Attribute | Description |
|----------------------------------------|---------------------------------------------------------------------------------------------------------------|
| **Name** | Diabetes: Hemoglobin A1c Good Control |
| **Display Name** | Diabetes: A1c Good Control |
| **Display Short Name** | DM A1c Good Control |
| **Description** | Percentage of patients 18-75 years of age with diabetes who had hemoglobin A1c < 9.0% during the measurement period. |
| **Source/Code** | 2016 Reporting Year http://www.oregon.gov/oha/analytics/Pages/CCO-Baseline-Data.aspx : Diabetes HbA1c Poor Control - 2016.pdf; based on eCQM measure CMS122v4/NQF0059 https://www.cms.gov/Regulations-and-Guidance/Legislation/EHRIncentivePrograms/Downloads/eCQM_2014_EP_June2015.zip |
| **Target** | 19% |
| **Measurement Period (MP)** | The measure is calculated for a selected period of time, defined by:<ul><li>Selected MP End Date: The last day of the selected measurement period</li><li> Selected MP Start Date: One year prior to the MP end date </li></ul>|
| **Denominator** | Patients 18-75 years of age with diabetes with an encounter during the measurement period  
|**Denominator Exclusions**|None|
|**Denominator Exceptions**|None|
|**Numerator**|Patients whose most recent A1c level (performed during the measurement period) is < 9.0% |
|**Numerator Exclusion**|None|
|**Grain**|Person|
|**Unit**|Percent|
|**Notes**||


**Criteria**


|Component|Logic|Ref #|Criteria|
|---------|-----|-------|--------|
|**Denominator**| | | D1 AND D2 AND D3 AND D4|
| | | D1 | Age at period start >= 18 |
| | AND | D2 | Patient age at period end < 75 |
| | AND | D3 | Patient had an active diabetes diagnosis during period |
| | AND | D4 | Patient had an encounter during period |
| |  Value Sets | | D3: VSAC Diabetes Value Set <br> D4: VSAC Annual Wellness Visit Value Set, VSAC Face-to-Face Interaction Value Set, VSAC Home Healthcare Services Value Set, VSAC Office Visit Value Set, VSAC Preventive Care Services - Established Office Visit, 18 and Up Value Set, VSAC Preventive Care Services-Initial Office Visit, 18 and Up Value Set|
|**Denominator Exclusions**| | | None |
|**Denominator Exceptions**| | | None |
|**Numerator**| | | N1 and N2 |
| | | N1 | Patient had an A1c performed during one year before period end |
| | | N2 | Patient's most recent A1c during one year before period end was < 9.0% |
| | Value Sets | | N1 and N2: Custom Arcadia A1c Result Value Set |
|**Numerator Exclusions**| | | None |
