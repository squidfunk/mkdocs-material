Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-04-13
ModifyDate: 2016-02-13
AAVersion: 4.9

#Disease-Modifying Anti-Rheumatic Drug Therapy for Rheumatoid Arthritis - Dispensing

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Disease-Modifying Anti-Rheumatic Drug Therapy for Rheumatoid Arthritis - Dispensing |
| **Long Display Name** | Disease-Modifying Anti-Rheumatic Drug Therapy for Rheumatoid Arthritis |
| **Short Display Name** | Anti-Rheumatic Drugs for RA |
| **Description** | The percentage of patients who were diagnosed with rheumatoid arthritis and who were dispensed at least one ambulatory prescription for a disease-modifying anti-rheumatic drug (DMARD). |
| **Purpose** | Rheumatoid Arthritis is a debilitating disease affecting 1.3 million Americans. Although there is no cure for RA, DMARDs may effectively protect joints and minimize inflammation in other organs, slowing progression of the disease and reducing pain (CDC, 2012). |
| **Denominator** | Patients 18 and older with at least two rheumatoid arthritis diagnoses during the first 11 months of the measurement period. |
| **Denominator Exclusions** | Patients with a pregnancy diagnosis during the measurement period or an HIV diagnosis any time before the end of the measurement period. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients who received at least one prescription for a disease-modifying anti-rheumatic drug (DMARD). |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria)<br><br>Remove patients from the denominator and numerator if they meet the *denominator exclusion* criteria. |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 AND D4 |
| |  | D1 | Patient age >= 18 at measurement period end |
| | AND | D2 | Patient had BCBS pharmacy benefit coverage for entire MP |
| | AND | D3 | Patient had at least two diagnoses of rheumatoid arthritis at outpatient or nonacute inpatient encounters during 1 to 12 months before period end |
| | AND | D4 | Patient had 1 or more medical visits in the 3 years prior to the MP end date as indicated by HEDIS Outpatient CPT |
| | Value Sets | | D3: HEDIS Rheumatoid Arthritis, HEDIS Outpatient, HEDIS Nonacute Inpatient Stay<br>D4: HEDIS Outpatient CPT |
| **Denominator Exclusions** | | | EX1 OR EX2 |
| |  | EX1 | Patient had a pregnancy diagnosis during 1 year before measurement period end |
| | OR | EX2 | Patient had an HIV diagnosis before period end |
| | Value Sets | | EX1: HEDIS Pregnancy<br>EX2: HEDIS HIV |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | Patient had a dispensed prescription for a DMARD during the measurement period |
| | Value Sets | | N1: HEDIS DMARD, NCQA DMARD (Table ART-C) |
| **Numerator Exclusions** | | | None |
