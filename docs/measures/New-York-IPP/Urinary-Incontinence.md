Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-02-04
ModifyDate: 2016-02-04
AAVersion: 4.9

#Management of Urinary Incontinence

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Management of Urinary Incontinence |
| **Long Display Name** | Management of Urinary Incontinence |
| **Short Display Name** | Urinary Incontinence |
| **Description** | The percentage of patients 65 years of age or older who reported having a urine leakage problem in the past six months and who received treatment for their current urine leakage problem. |
| **Purpose** | Urinary incontinence (UI) is one of the most common conditions affecting patients residing in long-term care (LTC)/post-acute (PA) facilities (Thompson, 2004), affecting more than 59% of all such patients (Jones et al., 2009). The prevalence of UI usually increases with age; however, it is not a normal part of aging. If left untreated, UI may be associated with negative outcomes including falls (Chirarelli, Mackenzie, & Osmotherly, 2009), skin issues (Farage et al., 2007), urinary tract infections (UTIs) (Omli et al., 2010), numerous psychological effects (Sexton et al., 2011) and dependence often leading to placement in a LTC/PA facility. There are several types of UI and modifiable risk factors that can be managed effectively thereby enhancing quality of life. Individualized treatment goals and plans of care designed with patient collaboration and patient preference are pivotal in achieving successful outcomes. |
| **Denominator** | Patient had one or more medical visits in the three years prior to the MP end date.<br>AND<br>Patient had an active diagnosis of Urinary leakage during the 6 months prior to the MP end date. |
| **Denominator Exclusions** | N/A |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patient received treatment for urinary leakage problem. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria) |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 AND D4 |
| |  | D1 | Patient had one or more medical visits in the three years prior to the MP end date as indicated by CPT codes in HEDIS (Outpatient CPT Value Set) |
| | AND | D2 | Patient is 65 years of age or older as of the last day of the measurement period. |
| | AND | D3 | Patient had an encounter during the MP. |
| | AND | D4 | Patient reported urinary leakage during the 6 months prior to the MP end date as indicated by codes in Arcadia Custom Urinary Leakage Denominator Value Set, (in the case of multiple events, use the earliest event) |
| | Value Sets | | D1: HEDIS Outpatient CPT<br>D4: Arcadia Custom Urinary Leakage Denominator |
| **Denominator Exclusions** | | | None |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | Patient received treatment for urinary leakage as indicated by the codes in Arcadia Custom Urinary Incontinence Numerator Value Set |
| | Value Sets | | N1: Arcadia Custom Urinary Incontinence Numerator |
| **Numerator Exclusions** | | | None |
