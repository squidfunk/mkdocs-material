## Follow-Up after Hospitalization for Mental Illness

|Attribute|Description|
|---------|-----------|
|**Display Name**|Follow-Up After Hospitalization for Mental Illness|
|**Display Short Name**|Follow-Up-Mental Illness |
|**Description**|The percentage of discharges for patients 6 years of age and older who were hospitalized for treatment of selected mental health disorders and had an outpatient visit, intensive outpatient encounter or partial hospitalization with a mental health provider.|
|**Source**|http://www.oregon.gov/oha/analytics/Pages/CCO-Baseline-Data.aspx : Follow Up After Hospitalization for Mental Illness - 2016.pdf|
|**Purpose**|  |
|**Target**|70%|
|**Measurement Period (MP)**| The measure is calculated for a selected period of time, defined by:<ul><li>Selected MP End Date: The last day of the selected measurement period</li><li> Selected MP Start Date: One year prior to the MP end date </li></ul>
|**Denominator**|Discharges from acute inpatient settings (including acute care psychiatric facilities) for members age 6 years of age and above who were hospitalized for treatment of selected mental health disorders.|
|**Denominator Exclusions**|Exclude discharges in which the patient was transferred directly or readmitted within 30-days after discharge to an acute or non-acute facility for a mental health or non-mental health principal diagnosis|
|**Denominator Exceptions**|None|
|**Numerator**| Patients who had an outpatient visit, within 7 days of discharge, or on the date of discharge.|
|**Numerator Exclusion**|None|
|**Grain**|Discharge|
|**Unit**|Percent|
|**Notes**|This measure will include all mental health diagnosis in the denominator, so will not limit the population to only those with a "primary mental health diagnosis". In addition, the measure will not exclude patients who were transferred to adult mental health residential services, as identified by modified HCPCS codes. These codes are not supported.|


## Criteria

|Component|Logic|Ref #|Criteria|
|---------|-----|-------|--------|
|**Denominator**| | | D1 AND D2 AND D3|
| | | D1 | Discharge from an inpatient setting during first 11 months of the measurement period |
| | AND | D2 | Patient has diagnosis of mental illness at the time of discharge (D1) |
| | AND | D3 | Patient is 6 years or older at the time of discharge (D1) |
| | Value Sets | | D1: CCO Acute Inpatient Discharge, Custom Arcadia Discharge <br> D2: CCO Mental illness|
|**Denominator Exclusions**| | | EX1 |
| | | EX1 | Discharges followed by a transfer or re-admit within 30 days |
| | Value Sets | | EX1: CCO Acute Inpatient Discharge, Custom Arcadia Discharge, Custom Arcadia Re-admit|
|**Denominator Exceptions**| | | None |
|**Numerator**| | | N1 |
| | | N1 | Follow-up visit with a mental health practitioner within 7 days of discharge (D1) |
| |OR| N2 | Transitional care management follow-up (7days) , 29 days after discharge (D1) |
| | Value Sets | |**N1:** CCO FUH Stand Alone Visits, <br> CCO FUH Visits Group 1 **WITH** CCO FUH POS Group 1 <br> CCO FUH Visits Group 2 **WITH** CCO FUH POS Group 2 <br> <br> **N2:** CCO TCM 7 Day|
|**Numerator Exclusions**| | | None |
