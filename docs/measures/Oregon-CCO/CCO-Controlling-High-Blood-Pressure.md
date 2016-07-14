## Controlling High Blood Pressure

|Attribute|Description|
|---------|-----------|
|**Display Name**|Controlling High Blood Pressure (NQF0018)|
|**Display Short Name**|Controlling High BP|
|**Description**|Percentage of patients 18-85 years of age who had a diagnosis of hypertension and whose blood pressure was adequately controlled (<140/90mmHg) during the measurement period.|
|**Source**|2016 Reporting Year http://www.oregon.gov/oha/analytics/Pages/CCO-Baseline-Data.aspx : Controlling Hypertension - 2016.pdf; based on eCQM measure CMS165v4/NQF0018 https://www.cms.gov/Regulations-and-Guidance/Legislation/EHRIncentivePrograms/Downloads/eCQM_2014_EP_June2015.zip|
|**Purpose**| Hypertension is a very significant health issue in the United States. Fifty million or more Americans have high blood pressure that warrants treatment, according to the National Health and Nutrition Examination Survey (NHANES) survey (Joint National Committee on Prevention, Detection, Evaluation, and Treatment of High Blood Pressure 2003). The United States Preventive Services Task Force (USPSTF) recommends that clinicians screen adults aged 18 and older for high blood pressure (United States Preventive Services Task Force 2007). |
|**Target**|69%|
|**Measurement Period (MP)**| The measure is calculated for a selected period of time, defined by:<ul><li>Selected MP End Date: The last day of the selected measurement period</li><li> Selected MP Start Date: One year prior to the MP end date </li></ul>
|**Denominator**|Patients 18-85 years of age who had a diagnosis of essential hypertension within the first six months of the measurement period or any time prior to the measurement period.|
|**Denominator Exclusions**|Patients with evidence of end stage renal disease (ESRD), dialysis or renal transplant before or during the measurement period. Also exclude patients with a diagnosis of pregnancy during the measurement period.|
|**Denominator Exceptions**|None|
|**Numerator**|Patients whose blood pressure at the most recent encounter is adequately controlled (systolic blood pressure < 140 mmHg and diastolic blood pressure < 90 mmHg) during the measurement period.|
|**Numerator Exclusion**|None|
|**Grain**|Person|
|**Unit**|Percent|
|**Notes**|VSAC Face-to-Face Interaction and VSAC Annual Wellness Visit value sets are not used for identifying office visits in the denominator because Arcadia does not support SNOMEDCT or HCPCS. VSAC Other Services Related to Dialysis and VSAC Dialysis Education value sets are not used for identifying exclusions because Arcadia does not support SNOMEDCT|


##Criteria

|Component|Logic|Ref #|Criteria|
|---------|-----|-------|--------|
|**Denominator**| | | D1 AND D2 AND D3 |
| | | D1 | Patient age between 18 and 85 at period start |
| | AND | D2 | Patient had an encounter during period |
| | AND | D3 | Patient had hypertension diagnosis at least 6 months before period end |
| | Value Sets | | <ul><li>D2: VSAC Office Visit; VSAC Preventive Care Services – Established Office Visit, 18 and Up; VSAC Preventive Care Services-Initial Office Visit, 18 and Up; VSAC Home Healthcare Services</li><li>D3: VSAC Essential Hypertension</li></ul>|
|**Denominator Exclusions**| | | EX1 OR EX2 OR EX3 OR EX4 OR EX5 |
| | | EX1 | Patient was pregnant during 1 year before period end |
| | OR | EX2 | Patient had ESRD before period end |
| | OR | EX3 | Patient had Chronic Kidney disease before period end |
| | OR | EX4 | Patient had dialysis before period end |
| | OR | EX5 | Patient had a kidney transplant before period end |
| | Value Sets | | EX1: VSAC Pregnancy<br>EX2: VSAC End Stage Renal Disease; VSAC ESRD Monthly Outpatient Services<br>EX3: VSAC Chronic Kidney Disease<br>EX4: VSAC Vascular Access for Dialysis; VSAC Dialysis Services; Arcadia Custom Dialysis<br>EX5: VSAC Kidney Transplant |
|**Denominator Exceptions**| | | None |
|**Numerator**| | | N1 |
| | | N1 | During the patient’s most recent outpatient encounter during the measurement period that overlaps with an active diagnosis of hypertension, the patient’s blood pressure was in control (systolic < 140 and diastolic < 90) |
| | Value Sets | | N1: VSAC Adult Outpatient Visit; VSAC Essential Hypertension; Arcadia Custom Systolic and Diastolic Vitals |
|**Numerator Exclusions**| | | None |
