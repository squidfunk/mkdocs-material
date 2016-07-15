Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-02-04
ModifyDate: 2016-02-04
AAVersion: 4.9

#Appropriate Testing of Children with Pharyngitis

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Appropriate Testing of Children with Pharyngitis |
| **Long Display Name** | Child Pharyngitis Testing |
| **Short Display Name** | Approp Test Child Pharyngitis |
| **Description** | Percentage of children 2 years of age to 18 years of age who were given a diagnosis of Pharyngitis, prescribed an antibiotic, and received a streptococcus test. |
| **Purpose** | Pharyngitis is the only condition among upper respiratory infections (URIs) where diagnosis is validated easily and objectively through administrative and laboratory data, and it can serve as an important indicator of appropriate antibiotic use among all respiratory tract infections. Overuse of antibiotics has been directly linked to the prevalence of antibiotic resistance; promoting judicious use of antibiotics is important to reducing levels of antibiotic resistance (Gonzales et al., 2001). Pediatric clinical practice guidelines (Schwartz et al., 1998) recommend that only children diagnosed with group A streptococcus (strep) pharyngitis, based on appropriate lab tests, be treated with antibiotics. |
| **Denominator** | Patient is 2 years of age to 18 years of age and had one or more medical visits in the three years prior to the MP end date.<br>AND<br>Patient had an encounter and active diagnosis of Pharyngitis at any point during the MP.<br>AND<br>Patient was prescribed an antibiotic on or within 3 days of diagnosis date. |
| **Denominator Exclusions** | Patient does not have any antibiotics prescribed in the previous 30 days to diagnosis date. Patient cannot have more than one diagnosis on encounter date or in the 3 days following diagnosis date. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients from denominator with a streptococcus test 3 days prior to through 3 days after date of diagnosis. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria)<br><br>Remove patients from the denominator and numerator if they meet the *denominator exclusion* criteria. |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 AND D4 AND D5 AND D6 |
| |  | D1 | Patient had one or more medical visits in the three years prior to the MP end date as indicated by CPT codes in HEDIS (Outpatient CPT Value Set) |
| | AND | D2 | Patient is at least 2 years of age at the MP start date through 18 years of age as of the MP end date |
| | AND | D3 | Patients had an active diagnosis of Pharyngitis at any point during the MP as defined by HEDIS (Pharyngitis Value Set) |
| | AND | D4 | Diagnosis was made during an encounter, as indicated by the CPT codes in HEDIS (Outpatient Value Set, Observation Value Set or ED Value Set) |
| | AND | D5 | Patient was prescribed an antibiotic for the diagnosis of Pharyngitis on or within 3 days of diagnosis date as indicated by the NDC codes in the Arcadia Custom Pharyngitis/URI Drug Code Value Set |
| | AND | D6 | Encounter is the earliest encounter with diagnosis that meets the above criteria. (i.e. Only the first qualifying diagnosis counts for measure calculation.) |
| | Value Sets | | D1: HEDIS Outpatient CPT<br>D3: HEDIS Pharyngitis<br>D4: HEDIS Outpatient, HEDIS Observation, HEDIS ED<br>D5: Arcadia Custom Pharyngitis/URI Drug Code |
| **Denominator Exclusions** | | | EX1 OR EX2 |
| |  | EX1 | Patient was diagnosed with any other problem in addition to Pharyngitis on diagnosis date or in the 3 days following diagnosis date |
| | OR | EX2 | Patient had an active prescription for an antibiotic, or an order for an antibiotic, or filled a prescription for an antibiotic as defined by the NDC codes in Arcadia Custom Pharyngitis/URI Drug Code Value Set during the 30 days prior to the diagnosis date of pharyngitis |
| | Value Sets | | EX2: Arcadia Custom Pharyngitis/URI Drug Code |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | Patient had an order and result for a streptococcus test for the diagnosis, as indicated by CPT codes in HEDIS (Group A Strep Tests Value Set) in the seven day period from 3 days prior to diagnosis date through 3 days after diagnosis date |
| | Value Sets | | N1: HEDIS Group A Strep Tests |
| **Numerator Exclusions** | | | None |
