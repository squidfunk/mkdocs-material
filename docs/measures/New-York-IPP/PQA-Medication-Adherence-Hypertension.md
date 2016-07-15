Status: Internal-Only
Author: Bill Baranowski
CreateDate: 2016-02-04
ModifyDate: 2016-02-26
AAVersion: 4.9

# Medication Adherence for Hypertension Medications



| Attribute | Description |
|----------------------------------------|---------------------------------------------------------------------------------------------------------------|
| **Name** | Medication Adherence for Hypertension Medications |
| **Display Name** | Medication Adherence for Hypertension Medications|
| **Display Short Name** | Med Adherence- Hypertension  |
| **Description** | Percent of patients 18 years and older that adhere to their prescribed hypertension drug therapy for renin angiotensin system (RAS) antagonists [angiotensin converting enzyme inhibitor (ACEI), angiotensin receptor blocker (ARB), or direct renin inhibitor medications] by filling their prescriptions often enough to cover 80% or more of the time they are supposed to be taking the medication|
| **Source/Code** | Medicare 2016 Part C and D Star Rating Technical Notes |
| **Purpose** | Hypertension patients often require chronic treatment with anti-hypertensive agents to lower their risk of complications, adverse cardiovascular disease outcomes, and mortality. Adherence to chronic medication regimens has been documented in the literature to be less than optimal. Poor adherence can reduce the effectiveness of treatment, and interventions to improve adherence can provide opportunities for quality improvement |
| **Measurement Period (MP)** | The measure is calculated for a selected period of time, defined by:<ul><li>Selected MP End Date: The last day of the selected measurement period</li><li> Selected MP Start Date: One year prior to the MP end date </li></ul>|
| **Denominator** | Patients 18 years and older with Hypertension. 
| **Denominator Exclusions** |A diagnosis of ESRD at any time during the measurement period|
| **Denominator Exceptions** | None |
| **Numerator** | Patients from denominator who were dispensed Hypertension drug therapy for renin angiotensin system (RAS) antagonists [angiotensin converting enzyme inhibitor (ACEI), angiotensin receptor blocker (ARB), or direct renin inhibitor medications]  for at least 80% of the measurement period |
| **Numerator Exclusions** | None |
| **Grain** | Patient |
| **Calculation** | (Sum of Numerator Metric)/ (Sum of Denominator Metric) |
| **Scale** | Percent |
| **Unit** | Percentage |
| **Notes** | Hedis 2016 value sets will be used to calculate this measure. In addition, a diagnosis of hypertension will satisfy the denominator in the absence of medication data |

**Criteria**

|Component|Logic|Ref #|Criteria|
|---------|-----|-------|--------|
|**Denominator**| | | D1 AND (D2 OR D3)|
| | | D1 | 18 years or older at measurement period start |
| | AND | D2 | 2 prescriptions for angiotensin converting enzyme inhibitor (ACEI), angiotensin receptor blocker (ARB), or direct renin inhibitor during the measurement period  |
| | OR | D3 | An assessment of Hypertension during the measurement period |
| |  Value Sets | | D2: Hedis 2016 Drug table CDC-L (ACE Inhibitors/ARBs) <br> D3: Hedis 2016 Essential Hypertension |
|**Denominator Exclusions**| | |EX1 |
| | | EX1 | A diagnosis of ESRD at any point during the measurement period |
| |  Value Sets | | EX1: Hedis 2016 ESRD |
|**Denominator Exceptions**| | | None |
|**Numerator**| | | N1 |
| | | N1 | Dispensed medication covering at least 80% of the measurement period. |
| | Value Sets | | N1: Hedis 2016 Drug table CDC-L (ACE Inhibitors/ARBs) |
|**Numerator Exclusions**| | | None |