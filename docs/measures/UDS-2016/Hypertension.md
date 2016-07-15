Status: Client-Ready
Author: Bill Baranowski
CreateDate: 2016-04-05
ModifyDate: 2016-04-05
AAVersion: 4.9

#Controlling High Blood Pressure (CMS165v4)

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Controlling High Blood Pressure (CMS165v4) |
| **Long Display Name** | Controlling High Blood Pressure (CMS165v4) |
| **Short Display Name** | Hypertension |
| **Source** | CMS (https://www.cms.gov/Regulations-and-Guidance/Legislation/EHRIncentivePrograms/Downloads/eCQM_2014_EP_June2015.zip) |
| **Description** | Percentage of patients 18-85 years of age who had a diagnosis of hypertension and whose blood pressure was adequately controlled (<140/90mmHg) during the measurement period. |
| **Purpose** | Hypertension is a very significant health issue in the United States. Fifty million or more Americans have high blood pressure that warrants treatment, according to the National Health and Nutrition Examination Survey (NHANES) survey (Joint National Committee on Prevention, Detection, Evaluation, and Treatment of High Blood Pressure 2003). The United States Preventive Services Task Force (USPSTF) recommends that clinicians screen adults aged 18 and older for high blood pressure (United States Preventive Services Task Force 2007). |
| **Target** | 50% (configurable by client)% (configurable by client) |
| **Target Source** | Arcadia Default |
| **Denominator** | Patients 18-85 years of age who had a diagnosis of essential hypertension within the first six months of the measurement period or any time prior to the measurement period. |
| **Denominator Exclusions** | Patients with evidence of end stage renal disease (ESRD), dialysis or renal transplant before or during the measurement period. Also exclude patients with a diagnosis of pregnancy during the measurement period. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients whose blood pressure at the most recent visit is adequately controlled (systolic blood pressure < 140 mmHg and diastolic blood pressure < 90 mmHg) during the measurement period. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria) |
| **Notes** | VSAC Face-to-Face Interaction and VSAC Annual Wellness Visit value sets are not used for identifying office visits in the denominator because the product does not currently support SNOMEDCT or HCPCS. VSAC Other Services Related to Dialysis and VSAC Dialysis Education value sets are not used for identifying exclusions because the product does not currently support SNOMEDCT.<br><br>This measure does not directly use the VSAC Diastolic Blood Pressure or VSAC Systolic Blood Pressure value sets because Arcadia works with each data source individually to capture their blood pressure results. |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 AND D4 |
| |  | D1 | Patient is at least 18 years of age as of the period start date. |
| | AND | D2 | Patient is less than 85 years of age as of the period end date. |
| | AND | D3 | Patient had a diagnosis of hypertension active during 6 to 12 months before period end. |
| | AND | D4 | Patient had an eligible encounter during the period. |
| | Value Sets | | D3: VSAC Essential Hypertension<br>D4: VSAC Office Visits; VSAC Preventive Care Services - Established Office Visit, 18 and Up; VSAC Preventive Care Services-Initial Office Visit, 18 and Up; VSAC Home Healthcare Services |
| **Denominator Exclusions** | | | EX1 OR EX2 OR EX3 OR EX4 OR EX5 |
| |  | EX1 | Patient was pregnant during 1 year before period end. |
| | OR | EX2 | Patient had evidence of ESRD before period end. |
| | OR | EX3 | Patient had a diagnosis of chronic kidney disease before period end. |
| | OR | EX4 | Patient had dialysis before period end.  |
| | OR | EX5 | Patient had a kidney transplant before period end. |
| | Value Sets | | EX1: VSAC Pregnancy, Arcadia Custom Pregnancy<br>EX2: VSAC End Stage Renal Disease; VSAC ESRD Monthly Outpatient Services<br>EX3: VSAC Chronic Kidney Disease, Stage 5<br>EX4: VSAC Vascular Access for Dialysis; VSAC Dialysis Services; Arcadia Custom Dialysis<br>EX5: VSAC Kidney Transplant |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 AND N2 AND N3 |
| |  | N1 | Patient had an outpatient visit during 1 year before period end and overlapping with an active hypertension diagnosis. |
| | AND | N2 | Patient had a blood pressure reading at the outpatient visit from N1. If there are multiple outpatient visits choose the most recent one that had a blood pressure reading with systolic and diastolic recorded. |
| | AND | N3 | The blood pressure reading from N2 had a systolic result < 140 mmHg and a diastolic result < 90 mmHg. |
| | Value Sets | | N1: VSAC Adult Outpatient; VSAC Essential Hypertension<br>N2: Arcadia Custom Systolic; Arcadia Custom Diastolic<br>N3: Arcadia Custom Systolic; Arcadia Custom Diastolic |
| **Numerator Exclusions** | | | None |
