## Adolescent Well Care Visits

|Attribute|Description|
|---------|-----------|
|**Display Name**|Adolescent Well Care Visits|
|**Display Short Name**|Adolescent Well Care Visits|
|**Description**|The percentage of patients 12–21 years of age who had at least one comprehensive well-care visit with a PCP or an OB/GYN during the measurement year.|
|**Source**|http://www.oregon.gov/oha/analytics/Pages/CCO-Baseline-Data.aspx : Adolescent Well Care Visits - 2016.pdf|
|**Purpose**|Adolescence is a time of transition between childhood and adult life and is accompanied by dramatic changes. Accidents, homicide and suicide are the leading causes of adolescent deaths. Sexually transmitted diseases, substance abuse, pregnancy and antisocial behavior are important causes of—or result from—physical, emotional and social adolescent problems. The American Medical Association (AMA) Guidelines for Adolescent Preventive Services, the federal government's Bright Futures (1994; 2000; 2002) program and the American Academy of Pediatrics (AAP) (2000) guidelines all recommend comprehensive annual check-ups for adolescents. | 
|**Target**|62%|
|**Measurement Period (MP)**| The measure is calculated for a selected period of time, defined by:<ul><li>Selected MP End Date: The last day of the selected measurement period</li><li> Selected MP Start Date: One year prior to the MP end date </li></ul>
|**Denominator**|Patients 12-21 years of age as of the end of the measurement period, who had any interaction during the measurement period.|
|**Denominator Exclusions**|None|
|**Denominator Exceptions**|None|
|**Numerator**|Patients who had at least one comprehensive well-care visit  during the measurement year.|
|**Numerator Exclusion**|None|
|**Grain**|Person|
|**Unit**|Percent|
|**Notes**|Based on HEDIS 2016 Physician Measurement measure. Deviations from HEDIS® specifications for numerator: HEDIS® requires well-care visits to be with a primary care practitioner or OB/GYN practitioner. OHA specifications drop this requirement and count all well-care visits by any provider types.|


# Criteria

|Component|Logic|Ref #|Criteria|
|---------|-----|-------|--------|
|**Denominator**| | | D1 AND D2 |
| | | D1 | Patient is 12 to 21 years of age as of the end of the measurement period |
| | AND | D2 | Patient had any interaction during the measurement period |
| | Value Sets | | None |
|**Denominator Exclusions**| | | None |
| | Value Sets | | None |
|**Denominator Exceptions**| | | None |
| | Value Sets | | None |
|**Numerator**| | | N1 |
| | | N1 | Patient has at least one comprehensive well-care visit with a PCP or OB/GYN practitioner during the year before measurement period end |
| | Value Sets | | N1: HEDIS Well-Care Value Set |
|**Numerator Exclusions**| | | None |
| | Value Sets | | None |