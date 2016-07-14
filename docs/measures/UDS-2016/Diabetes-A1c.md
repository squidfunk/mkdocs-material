Status: Client-Ready
Author: Bill Baranowski
CreateDate: 2016-04-06
ModifyDate: 2016-04-06
AAVersion: 4.10

#Diabetes: Hemoglobin A1c Poor Control (CMS122v4)

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Diabetes: Hemoglobin A1c Poor Control (CMS122v4) |
| **Long Display Name** | Diabetes: Hemoglobin A1c Not Poor Control (CMS122v4) |
| **Short Display Name** | Diabetes A1c |
| **Source** | CMS (https://www.cms.gov/Regulations-and-Guidance/Legislation/EHRIncentivePrograms/Downloads/eCQM_2014_EP_June2015.zip) |
| **Description** | Percentage of patients 18-75 years of age with diabetes who had hemoglobin A1c <= 9.0% during the measurement period. |
| **Purpose** | Diabetes mellitus (diabetes) is a group of diseases characterized by high blood glucose levels caused by the body's inability to correctly produce or utilize the hormone insulin. It is recognized as a leading cause of death and disability in the U.S. and is highly underreported as a cause of death. Diabetes may cause life-threatening, life-ending or life-altering complications, including poor circulation, nerve damage or neuropathy in the feet and eventual amputation. Nearly 60-70 percent of diabetics suffer from mild or severe nervous system damage (American Diabetes Association 2009).<br><br>Randomized clinical trials have demonstrated that improved glycemic control, as evidenced by reduced levels of glycohemoglobin, correlates with a reduction in the development of microvascular complications in both Type 1 and Type 2 diabetes (Diabetes Control and Complications Trial Research Group 1993; Ohkubo 1995). In particular, the Diabetes Control and Complications Trial (DCCT) showed that for patients with Type 1 diabetes mellitus, important clinical outcomes such as retinopathy (an important precursor to blindness), nephropathy (which precedes renal failure), and neuropathy (a significant cause of foot ulcers and amputation in patients with diabetes) are directly related to level of glycemic control (Diabetes Control and Complications Trial Research Group 1993). Similar reductions in complications were noted in a smaller study of intensive therapy of patients with Type 2 diabetes by Ohkubo and co-workers, which was conducted in the Japanese population (Ohkubo et al. 1995). |
| **Target** | 50% (configurable by client)% (configurable by client) |
| **Target Source** | Arcadia Default |
| **Denominator** | Patients 18-75 years of age with diabetes with a visit during the measurement period. |
| **Denominator Exclusions** | N/A |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients whose most recent A1c level (performed during the measurement period) is <= 9.0%. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria) |
| **Notes** | CMS122v4 is defined as the percentage of patients with out-of-control A1c results, so a lower percentage indicates better performance. This measure is the inverse of that, so a higher percentage indicates better performance.<br><br>This measure does not use VSAC Face-to-Face Interaction and VSAC Annual Wellness Visit because the product does not currently support SNOMEDCT or HCPCS.<br><br>This measure does not directly use the VSAC HbA1c Laboratory Test value set because Arcadia works with each data source individually to capture A1c results. |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 AND D4 |
| |  | D1 | Patient is at least 18 years of age as of the period start date. |
| | AND | D2 | Patient is less than 75 years of age as of the period end date |
| | AND | D3 | Patient had a diagnosis of diabetes active during the period. |
| | AND | D4 | Patient had an eligible encounter during the period. |
| | Value Sets | | D3: VSAC Diabetes<br>D4: VSAC Office Visit; VSAC Preventive Care Services - Established Office Visit, 18 and Up; VSAC Preventive Care Services-Initial Office Visit, 18 and Up; VSAC Home Healthcare Services;  |
| **Denominator Exclusions** | | | None |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 AND N2 |
| |  | N1 | Patient had an A1c test during 1 year before period end. If there are multiple use the most recent for N2. |
| | AND | N2 | The result of the A1c test was <= 9.0%. |
| | Value Sets | | N1: Arcadia Custom A1c<br>N2: Arcadia Custom A1c |
| **Numerator Exclusions** | | | None |
