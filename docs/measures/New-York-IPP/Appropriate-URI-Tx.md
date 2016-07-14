Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-02-04
ModifyDate: 2016-02-04
AAVersion: 4.9

#Treatment of Children with a URI

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Treatment of Children with a URI |
| **Long Display Name** | Appropriate Treatment (prescribed) of Children with URI |
| **Short Display Name** | Appropriate URI Tx |
| **Description** | Percentage of children 3 months of age to 18 years of age who were given a diagnosis of URI and were NOT prescribed an antibiotic. |
| **Purpose** | The common cold (or upper respiratory infection [URI]) is a frequent reason for children visiting the doctor's office. Though existing clinical guidelines do not support the use of antibiotics for the common cold, physicians often prescribe them for this ailment (Rosenstein et al., 1998). Pediatric clinical practice guidelines (Rosenstein et al., 1998) do not recommend antibiotics for a majority of upper respiratory tract infections because of the viral etiology of these infections, including the common cold. |
| **Denominator** | Patient is 3 months of age to 18 years of age and had one or more medical visits in the three years prior to the MP end date.<br>AND<br>Patient had an encounter and active diagnosis of an Upper Respiratory Infection at any point during the MP. |
| **Denominator Exclusions** | Patients with a competing diagnosis, comorbid condition, more than one diagnosis on encounter date, or with an active antibiotic prescription on the episode date or in the 30 days prior to episode date. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients from denominator who were not prescribed antibiotics for a URI within three days of the diagnosis date. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria) |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 AND D4 AND D5 AND D6 AND D7 |
| |  | D1 | Patient is 3 months of age at the MP start date through 18 years of age as of the last day of the measurement period. |
| | AND | D2 | Patient had a URI diagnosis from an outpatient or ED encounter between 18 months prior to the measurement year end date (e.g., July 1) and 6 months prior to the measurement period end date (e.g., June 30) as indicated by HEDIS (ED Value Set, URI Value Set). |
| | AND | D3 | ED visit from D3 did NOT result in an inpatient admission. |
| | AND | D4 | Patient was NOT diagnosed on the assessment with any other problem in addition to URI on diagnosis date as indicated by HEDIS (Pharyngitis Value Set, Competing Diagnosis Value Set). |
| | AND | D5 | Patient did NOT have a new or refill prescription for an antibiotic ordered 30 days prior to the diagnosis date of URI or was active on the encounter date as indicated in Arcadia Custom Pharyngitis/URI Drug Code Value Set. |
| | AND | D6 | Patient did NOT have a competing diagnosis on the assessment at any point during the 30 days prior to the diagnosis date of URI or 7 days following the diagnosis date of URI. |
| | AND | D7 | Encounter is the earliest encounter with diagnosis that meets the criteria. (i.e. Only the first qualifying diagnosis counts for measure calculation) |
| | Value Sets | | D2: HEDIS ED, HEDIS URI<br>D5: HEDIS Pharyngitis, HEDIS Competing Diagnosis<br>D6: Arcadia Custom Pharyngitis/URI Drug Code |
| **Denominator Exclusions** | | | None |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | Patient was NOT prescribed an antibiotic for the diagnosis of URI on or within 3 days of the earliest D2 visit that meets D3, D4, D5 and D6. |
| | Value Sets | | N1: Arcadia Custom Pharyngitis/URI Drug Code |
| **Numerator Exclusions** | | | None |
