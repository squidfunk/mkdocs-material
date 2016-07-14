Status: Internal-Only
Author: Bill Baranowski
CreateDate: 2016-02-04
ModifyDate: 2016-02-26
AAVersion: 4.9

# Medication Adherence for Diabetes Medications



| Attribute | Description |
|----------------------------------------|---------------------------------------------------------------------------------------------------------------|
| **Name** | Medication Adherence for Diabetes Medications |
| **Display Name** | Medication Adherence for Diabetes Medications|
| **Display Short Name** | Med Adherence- Diabetes |
| **Description** | Percentage of patients 18 years and older that fill their prescribed drug therapy across classes of diabetes medications: biguanides, sulfonylureas, thiazolidinediones, DiPeptidyl Peptidase (DPP)-IV Inhibitors, incretin mimetics, meglitinides and sodium glucose cotransporter 2 (SGLT) inhibitors, to cover 80% or more of the time they are supposed to be taking the medication|
| **Source/Code** | Medicare 2016 Part C and D Star Rating Technical Notes |
| **Purpose** | Diabetic patients often require chronic treatment with oral diabetes agents to lower their risk of diabetic complications, adverse cardiovascular disease outcomes, and mortality. Adherence to chronic medication regimens has been documented in the literature to be less than optimal. Poor adherence can reduce the effectiveness of treatment, and interventions to improve adherence can provide opportunities for quality improvement |
| **Measurement Period (MP)** | The measure is calculated for a selected period of time, defined by:<ul><li>Selected MP End Date: The last day of the selected measurement period</li><li> Selected MP Start Date: One year prior to the MP end date </li></ul>|
| **Denominator** | Patients 18 years and older with Diabetes. 
| **Denominator Exclusions** |Patients identified as having steroid induced diabetes, gestational diabetes, ESRD or a prescription for insulin|
| **Denominator Exceptions** | NONE |
| **Numerator** | Patients from denominator who were dispensed Diabetes medication for at least 80% of the measurement period |
| **Numerator Exclusions** | NONE |
| **Grain** | Patient |
| **Calculation** | (Sum of Numerator Metric)/ (Sum of Denominator Metric) |
| **Scale** | Percent |
| **Unit** | Percentage |
| **Notes** | According to Medicare 2016 Part C and D Star Rating Technical Notes: “Diabetes medication” means a biguanide drug, a sulfonylurea drug, a thiazolidinedione drug, a DPP-IV inhibitor, an incretin mimetic drug, a meglitinide drug or a SGLT2 inhibitor. Plan members who take insulin are not included. Accordingly, we have removed Insulin and Amylin from HEDIS Table CDC-A to define diabetes medication prescriptions. Also, Insulin medications from HEDIS Table CDC-A have been used for the exclusion criteria. <br> <br> This measure has been built in two versions: clinical data source only and claims data source only versions.   |

**Criteria**

|Component|Logic|Ref #|Criteria|
|---------|-----|-------|--------|
|**Denominator**| | | D1 AND (D2 OR D3)|
| | | D1 | 18 years or older at measurement period start |
| | AND | D2 | 2 prescriptions for diabetes medication during the measurement period  |
| | OR | D3 | An assessment of Diabetes during the measurement period |
| |  Value Sets | | D2: Hedis 2016 Drug table CDC-A (Prescriptions to Identify Members with Diabetes- Insulin and Amylin drugs removed) <br> D3: Hedis 2016 Diabetes |
|**Denominator Exclusions**| | |EX1  |
| | | EX1 | Gestational or Steroid Induced Diabetes during 24 months before period end|
| | | EX2 | A diagnosis of ESRD during the measurement period|
| | | EX3 | A prescription for insulin during the measurement period|
| |  Value Sets | | Ex1: Hedis 2016 Diabetes Exclusions <br> Ex2: Hedis 2016 ESRD <br> Ex3: Hedis 2016 Drug table CDC-A (Prescriptions to Identify Members with Diabetes- Insulin only)   |
|**Denominator Exceptions**| | | None |
|**Numerator**| | | N1 |
| | | N1 | Dispensed medication covering at least 80% of the measurement period. |
| | Value Sets | | N1: Hedis 2016 Drug table CDC-A (Prescriptions to Identify Members with Diabetes- Insulin and Amylin drugs removed) |
|**Numerator Exclusions**| | | None |