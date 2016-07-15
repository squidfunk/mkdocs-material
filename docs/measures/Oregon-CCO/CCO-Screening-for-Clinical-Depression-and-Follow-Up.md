## Screening for Clinical Depression and Follow-Up Plan

|Attribute|Description|
|---------|-----------|
|**Display Name**|Screening for Clinical Depression and Follow-Up Plan (NQF 0418)|
|**Display Short Name**|Depression Screen|
|**Description**|Percentage of patients aged 12 years and older screened for clinical depression on the date of the encounter using an age appropriate standardized depression screening tool AND if positive, a follow-up plan is documented on the date of the positive screen.|
|**Source**|http://www.oregon.gov/oha/analytics/Pages/CCO-Baseline-Data.aspx : Depression Screening - 2016.pdf|
|**Purpose**| The World Health Organization (WHO), as seen in Pratt & Brody (2008), found that major depression was the leading cause of disability worldwide. Depression causes suffering, decreases quality of life, and causes impairment in social and occupational functioning. It is associated with increased health care costs as well as with higher rates of many chronic medical conditions. Studies have shown that a higher number of depression symptoms are associated with poor health and impaired functioning, whether or not the criteria for a diagnosis of major depression are met. |
|**Target**|25%|
|**Measurement Period (MP)**| The measure is calculated for a selected period of time, defined by:<ul><li>Selected MP End Date: The last day of the selected measurement period</li><li> Selected MP Start Date: One year prior to the MP end date </li></ul>
|**Denominator**|All patients aged 12 years and older before the beginning of the measurement period with at least one eligible encounter during the measurement period.|
|**Denominator Exclusions**|Patients with an active diagnosis for Depression or a diagnosis of Bipolar Disorder.|
|**Denominator Exceptions**|Patient refuses to participate, patient is in an urgent or emergent situation, or situations where the patient’s function capacity or motivation to improve may impact the accuracy of standardized depression assessment tools (for example: certain court appointed cases or cases of delirium).|
|**Numerator**|Patients screened for clinical depression on the date of the encounter using an age appropriate standardized tool AND if positive, a follow-up plan is documented on the date of the positive screen.|
|**Numerator Exclusion**|None|
|**Grain**|Person|
|**Unit**|Percent|
|**Notes**|Based on the eCQM measure NQF0418. The current product does not support LOINC, HCPCS, or SNOMEDCT, so some value sets are partially supported and the following value sets are not used: VSAC Adolescent Depression Screening, VSAC Adult Depression Screening, VSAC Negative Depression Screening, VSAC Positive Depression Screening, VSAC Additional Evaluation for Depression - Adolescent, VSAC Referral for Depression Adolescent, VSAC Follow-Up for Depression - Adolescent, VSAC Additional Evaluation for Depression - Adult, VSAC Referral for Depression Adult, VSAC Follow-Up for Depression - Adult, and VSAC Suicide Risk Assessment. Where possible, Arcadia custom value sets will be used instead.|


##Criteria

|Component|Logic|Ref #|Criteria|
|---------|-----|-------|--------|
|**Denominator**| | | D1 AND D2 |
| | | D1 | Patient age >= 12 at period start |
| | AND | D2 | Patient had an eligible encounter during the measurement period |
| | Value Sets | | <ul><li>D2: VSAC Depression Screening Encounter Codes</li></ul>|
|**Denominator Exclusions**| | | EX1 OR EX2 |
| | | EX1 | Patient had a diagnosis of depression starting before and active during encounter D2 |
| | OR | EX2 | Patient had a diagnosis of bipolar disorder starting before and active during encounter D2 |
| | Value Sets | | <ul><li>EX1: VSAC Depression Diagnosis</li><li>EX2: VSAC Bipolar Diagnosis</li></ul>|
|**Denominator Exceptions**| | | EX1 OR EX2 |
| | | EX1 | There was a valid medical reason for not performing screening during the year before period end |
| | OR | EX2 | Patient refused screening during the year before period end |
| | Value Sets | | <ul><li>EX1: VSAC Medical or Other Reason Not Done; Arcadia Custom "Medical Reason - No Depression Screen"</li><li>EX2: VSAC Patient Reason Refused; Arcadia Custom "Patient Reason - No Depresion Screen"</li></ul>|
|**Numerator**| | | (N1 AND (N2 OR (N3 AND N4))) OR (N5 AND (N6 OR (N7 AND N8))) |
| | | N1 | Patient age < 18 at the start of the measurement period |
| | AND | N2 | Patient had an adolescent depression screen during encounter D2 with a negative result |
| | OR | N3 | Patient had an adolescent depression screen during encounter D2 with a positive result |
| | AND | N4 | Patient had an appropriate depression follow-up plan or medication starting the day of or the day after encounter D2 |
| | OR | N5 | Patient age >= 18 at the start of the measurement period |
| | AND | N6 | Patient had an adult depression screen during encounter D2 with a negative result |
| | OR | N7 | Patient had an adult depression screen during encounter D2 with a positive result |
| | AND | N8 | Patient had an appropriate depression follow-up plan or medication starting the day of or the day after encounter D2 |
| | Value Sets | | <ul><li>N2, N3, N6, and N7: Arcadia Custom Depression Screening; Arcadia Custom PHQ-9 Screening</li><li>N4: VSAC Depression Medications – Adolescent</li><li>N8: VSAC Depression Medications – Adult</li><li>N4 and N8: Arcadia Custom Depression Follow Up Plan</li></ul> |
|**Numerator Exclusions**| | | None |
