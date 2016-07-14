Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-02-04
ModifyDate: 2016-02-04
AAVersion: 4.9

#Antibiotic Avoidance for Acute Bronchitis

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Antibiotic Avoidance for Acute Bronchitis |
| **Long Display Name** | Avoidance of Antibiotic Treatment in Adults with Acute Bronchitis |
| **Short Display Name** | ABX Avoidance for Bronchitis |
| **Description** | The percentage of adults 18-64 years of age with a diagnosis of acute bronchitis who were not prescribed an antibiotic prescription. |
| **Purpose** | Antibiotics are most often inappropriately prescribed for adults with acute bronchitis (Gonzales et al., 2001). Antibiotics are not indicated in clinical guidelines for treating adults with acute bronchitis who do not have a comorbidity or other infection for which antibiotics may be appropriate (Gonzales et al., 2001; Gonzales et al., 2001). Inappropriate antibiotic treatment of adults with acute bronchitis is of clinical concern, especially since misuse and overuse of antibiotics lead to antibiotic drug resistance (Steinman et al., 2004). Acute bronchitis consistently ranks among the 10 conditions that account for the most ambulatory office visits to United States physicians; furthermore, while the vast majority of acute bronchitis cases (more than 90 percent) have a nonbacterial cause, antibiotics are inappropriately prescribed 65 to 80 percent of the time (Gonzales et a., 2001; McCaig, Besser, & Hughes, 2003). |
| **Denominator** | Patients is 18-64 years of age and had one or more medical visits in the three years prior to the MP end date.<br>AND<br>Patients had an encounter and active diagnosis of Acute Bronchitis (ICD: 466.0) at any point during the MP. |
| **Denominator Exclusions** | Patients with a competing diagnosis, comorbid condition, or with an active antibiotic prescription during the 30 days prior to the diagnosis of bronchitis. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients from denominator that were not prescribed antibiotics for the diagnosis of Acute Bronchitis on or within 3 days of the diagnosis date. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria) |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND (D2 AND D3) AND (D4 AND D5 AND D6 AND D7) AND D8 |
| |  | D1 | Patient is 18 years as of January 1 of the year prior to the measurement year to 64 years of age as of end of the measurement year |
| | AND | D2 | Patient had an outpatient or ED visit up to 7 days prior to the MP end date i.e., if MP Jan 1-Dec 31 , eligible encounter was between Jan 1 - Dec 24 as indicated by the HEDIS (ED Value Set) |
| | AND | D3 | Patient did NOT have an ED visit that resulted in an inpatient admission |
| | AND | D4 | Patient had an active diagnosis of acute bronchitis in the assessment as indicated by the HEDIS (Acute Bronchitis Value Set) |
| | AND | D5 | Patient did NOT have a diagnosis of an active Comorbid Illness documented in the Problem list; or a Comorbid Illness in an assessment at any point during the 12 months prior to and including the diagnosis date of acute bronchitis. These Comorbid Illnesses are defined by the following HEDIS Code sets: HIV Value Set, Malignant Neoplasms Value Set, Emphysema Value Set, COPD Value Set, Cystic Fibrosis Value Set, Comorbid Conditions Value Set |
| | AND | D6 | Patient did NOT have a competing diagnosis in the assessment at any point during the 30 days prior to the diagnosis date of acute bronchitis through 7 days after the diagnosis date of acute bronchitis as indicated by HEDIS (Pharyngitis Value Set, Competing Diagnosis Value Set) |
| | AND | D7 | Patient did NOT have a new or refill prescription or order for an antibiotic prescribed 30 days prior to the diagnosis date of acute bronchitis or was active on the encounter date as indicated in the Arcadia Custom Acute Bronchitis Value Set |
| | AND | D8 | Encounter is the earliest encounter with diagnosis that meets the criteria.<br>(i.e. Only the first qualifying diagnosis counts for measure calculation) |
| | Value Sets | | D1: HEDIS ED<br>D4: HEDIS Acute Bronchitis<br>D5: HEDIS HIV, HEDIS Malignant Neoplasms, HEDIS Emphysema, HEDIS COPD, HEDIS Cystic Fibrosis, HEDIS Comorbid Conditions<br>D6: HEDIS Pharyngitis, HEDIS Competing Diagnosis<br>D7: Arcadia Custom Acute Bronchitis |
| **Denominator Exclusions** | | | None |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | Patient was NOT prescribed an antibiotic for the diagnosis of Acute Bronchitis, as defined by the NDC codes in HEDIS (AAB - D), on or within 3 days of diagnosis date |
| | Value Sets | | N1: HEDIS AAB - D |
| **Numerator Exclusions** | | | None |
