Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-02-04
ModifyDate: 2016-02-04
AAVersion: 4.9

#Antidepressant Medication Measure (AMM) Continuation Treatment Phase Dispensing Event Based)

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Antidepressant Medication Measure (AMM) Continuation Treatment Phase Dispensing Event Based) |
| **Long Display Name** | Antidepressant Medication Measure (AMM) Continuation Treatment Phase - Dispensing Event |
| **Short Display Name** | AMM Continuation Dispensing |
| **Description** | The percentage of patients 18 years and older with a diagnosis of major depression that were treated with an antidepressant medication and were covered by the medication for at least 180 of the 231 days following the prescription start date. |
| **Purpose** | According to the American Psychiatric Association (APA) (2000), successful treatment of patients with major depressive disorder is promoted by a thorough assessment of the patient and close adherence to treatment plans. Treatment consists of an acute phase, during which remission is induced; a continuation phase, during which remission is preserved; and a maintenance phase, during which the susceptible patient is protected against the recurrence of a subsequent major depressive episode. |
| **Denominator** | Patients diagnosed with depression who were prescribed an antidepressant within 60 days of their diagnosis<br>AND<br>Patient had a continous Pharmacy benefit at Excellus for two years from the Measurement Period end date. |
| **Denominator Exclusions** | N/A |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients who were dispensed an antidepressant medication to cover at least 180 of the 231 days after prescription start date. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria) |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 AND D4 AND D5 |
| |  | D1 | Patient is 18 years and 8 months or older as of the last day of the measurement period |
| | AND | D2 | Patient had a diagnosis of Major Depression within +/- 60 days of the earliest prescription in D3, as indicated by the codes in HEDIS (Major Depression Value Set), during one of the following types of visit: <br>- HEDIS AMM Stand Alone Visits<br>- HEDIS AMM Visits + HEDIS AMM POS<br>- HEDIS ED<br>- HEDIS Non Acute Inpatient<br>- HEDIS Acute Inpatient |
| | AND | D3 | Patient was prescribed an antidepressant between 20 months before period end and 8 months before period end |
| | AND | D4 | Patient did NOT have a prescription (new or refill) for an antidepressant during the 105 days prior to earliest prescription in D3 |
| | AND | D5 | Patient had continuous Excellus Pharmacy Benefit coverage between two years prior to MP end date and MP end date |
| | Value Sets | | D2: HEDIS 2015 Major Depression, HEDIS AMM Stand Alone Visits, HEDIS AMM Visits, HEDIS AMM POS, HEDIS ED, HEDIS Non-acue Inpatient, HEDIS Acute Inpatient |
| **Denominator Exclusions** | | | None |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | Patient is covered by an antidepressant dispensing event(s) for at least 180 of the 231 days after start date of medication (in the case of multiple events, use the earliest event) |
| **Numerator Exclusions** | | | None |
