Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-04-13
ModifyDate: 2016-02-13
AAVersion: 4.9

#Asthma Medication Ratio - Dispensing

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Asthma Medication Ratio - Dispensing |
| **Long Display Name** | Asthma Medication Ratio |
| **Short Display Name** | Asthma Medication Ratio |
| **Description** | Percentage of patients 5-64 years of age with persistent asthma whose asthma controller medications make up 50% or more of their total asthma medications. |
| **Purpose** | Medications for asthma are usually categorized into long-term controller medications used to achieve and maintain control of persistent asthma and quick-reliever medications used to treat acute symptoms and exacerbations (Scottish Intercollegiate Guidelines Network [SIGN] & British Thoracic Society, 2009). Appropriate ratios for these medications could potentially prevent a significant proportion of asthma-related costs (hospitalizations, emergency room visits, missed work and school days) (Akinbami et al., 2009). |
| **Denominator** | Patients age 5-64 with evidence of persistent asthma during the measurement year AND during the year before. |
| **Denominator Exclusions** | Patients with any of the following before measurement period end: emphysema, COPD, obstructive chronic bronchitis, chronic respiratory condition due to fumes/vapors, cystic fibrosis, or acute respiratory failure. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients whose asthma controller medications make up 50% or more of their total asthma medications. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria)<br><br>Remove patients from the denominator and numerator if they meet the *denominator exclusion* criteria. |
| **Notes** | The HEDIS specifications include age stratifications for 5-11, 12-18, 19-50, 51-64, 65-85, and 5-85 (Medicaid reports 5-64 and Medicare reports 18-85); this measure is the 5-64 version.This measure takes a simplified approach to counting asthma medication dispensing events (for identifying persistent asthma in the denominator), as compared with HEDIS. To find the number of dispensing events count the number of days of the period covered by oral asthma prescriptions. 0-59 days counts as 1 dispensing event, 60-89 counts as 2, 90-119 counts as 3, and 120-149 counts as 4, and so on. Then add the number of inhalers and injections dispensed.This measure also takes a simplified approach to counting "units of medication" for the ratio in the numerator, as compared with HEDIS. Each individual oral asthma prescription counts as 1 or more units. To get the number of units, divide the total days supply for the prescription by 30 and round down to a minimum of 1. Each injection and inhalation counts as 1 unit. |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 AND D4 AND D5 AND D6 AND D7 |
| |  | D1 | Patient age between 5 and 64 on the last day of the measurement period |
| | AND | D2 | Patient had BCBS Pharmacy Benefit Coverage for the entire measurement period  |
| | AND | D3 | Patient had a pharmacy claim or prescription written during the year before period end |
| | AND | D4 | Patient had a pharmacy claim or prescription written between 1 and 2 years before period end |
| | AND | D5 | Patient had evidence of persistent asthma during the year before period end (see below for definition of "evidence of persistent asthma") |
| | AND | D6 | Patient had evidence of persistent asthma between 1 and 2 years before period end (see below for definition of "evidence of persistent asthma") |
| | AND | D7 | Patient had 1 or more medical visits in the 3 years prior to the MP end date as indicated by HEDIS Outpatient CPT Value Set |
| | Value Sets | | D5: HEDIS Asthma, HEDIS ED, HEDIS Acute Inpatient, HEDIS Outpatient, HEDIS Observation, HEDIS Table MMA-A: Asthma Medications (Oral), HEDIS Table MMA-A: Asthma Medications (Inhaler and Injection), HEDIS Table MMA-A: Asthma Medications (Non-Leukotriene Modifier, Non-Antibody Inhibitor)<br>D6: HEDIS Asthma, HEDIS ED, HEDIS Acute Inpatient, HEDIS Outpatient, HEDIS Observation, HEDIS Table MMA-A: Asthma Medications (Oral), HEDIS Table MMA-A: Asthma Medications (Inhaler and Injection), HEDIS Table MMA-A: Asthma Medications (Non-Leukotriene Modifier, Non-Antibody Inhibitor)<br>D7: HEDIS Outpatient CPT |
| **Denominator Exclusions** | | | EX1 OR EX2 OR EX3 OR EX4 OR EX5 OR EX6 OR EX7 |
| |  | EX1 | Patient has an emphysema diagnosis before period end |
| | OR | EX2 | Patient had a COPD diagnosis before period end |
| | OR | EX3 | Patient had an obstructive chronic bronchitis diagnosis before period end |
| | OR | EX4 | Patient had a diagnosis of a chronic respiratory condition due to fumes/vapors before period end |
| | OR | EX5 | Patient had a cystic fibrosis diagnosis before period end |
| | OR | EX6 | Patient had a diagnosis of acute respiratory failure before period end |
| | OR | EX7 | Patient had no asthma controller medications or reliever medications dispensed during the year before period end |
| | Value Sets | | EX1: HEDIS Emphysema, HEDIS Other Emphysema<br>EX2: HEDIS COPD<br>EX3: HEDIS Obstructive Chronic Bronchitis<br>EX4: HEDIS Chronic Respiratory Conditions Due to Fumes/Vapors<br>EX5: HEDIS Cystic Fibrosis<br>EX6: HEDIS Acute Respiratory Failure<br>EX7: HEDIS Table AMR-A: Asthma Medications |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | The units of asthma controller medications divided by the total units of all asthma medications is greater than or equal to 0.5. |
| | Value Sets | | N1: HEDIS Table AMR-A: Asthma Controller Medications, HEDIS Table AMR-A: Asthma Medications |
| **Numerator Exclusions** | | | None |


###Criteria for "Evidence of Persistent Asthma"
This section defines "persistent asthma" which is referenced in D4 and D5. For D4 the criteria below must all be met during the year before the period end date. For D5 the criteria must all be met in the time range between 1 and 2 years before the period end date.

|Logic|Ref #|Criteria|
|-----|-----|--------|
| | | C1 OR C2 OR (C3 AND C4) OR (C5 AND (C6 OR C7)) |
| | C1 | Patient had an ED encounter with asthma as a diagnosis |
| OR | C2 | Patient had an acute inpatient encounter with asthma as a diagnosis |
| OR | C3 | Patient had at least 4 outpatient or observation encounters with asthma as a diagnosis |
| AND | C4 | Patient had at least 2 asthma medication dispensing events (see Notes section above for a detailed definition of a dispensing event) |
| OR | C5 | Patient had at least 4 asthma medication dispensing events (see Notes section above for a detailed definition of a dispensing event) |
| AND | C6 | Patient had at least 1 asthma medication that is neither a leukotriene modifier nor an antibody inhibitor |
| OR | C7 | Patient had a diagnosis of asthma |
| | Value Sets | C1: HEDIS Asthma, HEDIS ED<br>C2: HEDIS Asthma, HEDIS Acute Inpatient<br> C3: HEDIS Asthma, HEDIS Outpatient, HEDIS Observation<br>C4 AND C5: HEDIS Table MMA-A: Asthma Medications<br>C6: HEDIS Table MMA-A: Asthma Medications<br>C7: HEDIS Asthma |