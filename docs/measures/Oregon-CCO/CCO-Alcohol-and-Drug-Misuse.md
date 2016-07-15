## Alcohol and Drug Misuse SBIRT

|Attribute|Description|
|---------|-----------|
|**Display Name**|Alcohol and Drug Misuse Screening, Brief Intervention, and Referral to Treatment|
|**Display Short Name**|Alcohol/Drug Misuse SBIRT|
|**Description**|Percentage of patients at least 12 years old with an outpatient encounter during the measurement period who received one or more screening, brief intervention, and referral to treatment (SBIRT) services.|
|**Source**|2016 Reporting Year http://www.oregon.gov/oha/analytics/Pages/CCO-Baseline-Data.aspx : Alcohol and Drug Misuse (SBIRT) - 2016.pdf|
|**Purpose**| | 
|**Target**|12%|
|**Measurement Period (MP)**| The measure is calculated for a selected period of time, defined by:<ul><li>Selected MP End Date: The last day of the selected measurement period</li><li> Selected MP Start Date: One year prior to the MP end date </li></ul>
|**Denominator**|Members age 12 years as of measurement period end who had an outpatient encounter during the measurement period.|
|**Denominator Exclusions**|None|
|**Denominator Exceptions**|None|
|**Numerator**|Members age 12 years as of measurement period end with one or more screening, brief intervention, and referral to treatment (SBIRT) services.|
|**Numerator Exclusion**|None|
|**Grain**|Person|
|**Unit**|Percent|
|**Notes**| |


##Criteria

|Component|Logic|Ref #|Criteria|
|---------|-----|-------|--------|
|**Denominator**| | | D1 AND D2 |
| | | D1 | Patient age >= 12 at the end of the measurement period |
| | AND | D2 | Patient had an outpatient encounter during the measurement period |
| | Value Sets | | <ul><li>D2: HEDIS Outpatient Value Set, CCO Outpatient Value Set</li></ul> |
|**Denominator Exclusions**| | | None |
|**Denominator Exceptions**| | | None |
|**Numerator**| | | N1 OR (N2 AND N3) |
| | | N1 | Patient had at least one SBIRT service at a non-ED encounter during the year before measurement period end |
| | OR | N2 | Patient had a CPT code of 99420 (administration and interpretation of health risk assessment instrument) at a non-ED encounter during the year before measurement period end |
| | AND | N3 | Patient had an ICD9 code of V82.9 (screening for unspecified condition) or an ICD10 code of Z13.9 (encounter for screening, unspecified) concurrent with event N2 |
| | Value Sets | | <ul><li>N1: CCO SBIRT Service</li><li>N2:CCO Health Risk Assessment, CCO Encounter for Screening</li><li>N3: HEDIS ED Value Set, HEDIS ED Procedure Code Value Set</li></ul> |
|**Numerator Exclusions**| | | None |
