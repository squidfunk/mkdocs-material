Status: Internal-Only
Author: Bill Baranowski
CreateDate: 2016-02-04
ModifyDate: 2016-02-26
AAVersion: 4.9

# Medication Adherence for Cholesterol (Statins)



| Attribute | Description |
|----------------------------------------|---------------------------------------------------------------------------------------------------------------|
| **Name** | Medication Adherence for Cholesterol (Statins) |
| **Display Name** | Medication Adherence for Cholesterol (Statins)|
| **Display Short Name** | Med Adherence - Cholesterol |
| **Description** | Percent of patients 18 years and older that adhere to their prescribed drug therapy for statin cholesterol medications.|
| **Source/Code** | Medicare 2016 Part C and D Star Rating Technical Notes |
| **Purpose** | Patients often require chronic treatment with lipid lowering agents to lower their risk of complications, adverse cardiovascular disease outcomes, and mortality. Adherence to chronic medication regimens has been documented in the literature to be less than optimal. Poor adherence can reduce the effectiveness of treatment, and interventions to improve adherence can provide opportunities for quality improvement. |
| **Measurement Period (MP)** | The measure is calculated for a selected period of time, defined by:<ul><li>Selected MP End Date: The last day of the selected measurement period</li><li> Selected MP Start Date: One year prior to the MP end date </li></ul>|
| **Denominator** | Patients 18 years and older with at least two fills of either the same medication or different medications within the drug class during the measurement period. 
| **Denominator Exclusions** |None|
| **Denominator Exceptions** | None |
| **Numerator** | Patients from denominator who were dispensed Statin medication for at least 80% of the measurement period |
| **Numerator Exclusions** | None |
| **Grain** | Patient |
| **Calculation** | (Sum of Numerator Metric)/ (Sum of Denominator Metric) |
| **Scale** | Percent |
| **Unit** | Percentage |
| **Notes** | Hedis 2016 value sets will be used to calculate this measure.   |

**Criteria**

|Component|Logic|Ref #|Criteria|
|---------|-----|-------|--------|
|**Denominator**| | | D1 AND D2|
| | | D1 | 18 years or older at measurement period start |
| | AND | D2 | 2 prescriptions for the same of different Statin medications, during the measurement period  |
| |  Value Sets | | D2: Hedis 2016 Drug table SPC-B (High and Moderate-Intensity Statin Medications) <br> D3: Hedis 2016 IVD |
|**Denominator Exclusions**| | |None |
|**Denominator Exceptions**| | | None |
|**Numerator**| | | N1 |
| | | N1 | Dispensed a Statin medication covering at least 80% of the measurement period. |
| | Value Sets | | N1: Hedis 2016 Drug table SPC-B  |
|**Numerator Exclusions**| | | None |