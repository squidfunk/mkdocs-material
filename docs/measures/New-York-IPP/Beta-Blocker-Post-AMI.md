Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-04-13
ModifyDate: 2016-02-13
AAVersion: 4.9

#Persistence of Beta-Blocker Treatment After a Heart Attack - Dispensing

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Persistence of Beta-Blocker Treatment After a Heart Attack - Dispensing |
| **Long Display Name** | Persistence of Beta-Blocker Treatment After a Heart Attack - Dispensing  |
| **Short Display Name** | Beta-Blocker Post AMI |
| **Description** | The percentage of patients 18 years of age and older during the measurement year who were hospitalized and discharged alive from 6 months prior to the measurement period start date to 6 months after the MP start date with a diagnosis of AMI and who received persistent beta-blocker treatment for six months after discharge. |
| **Purpose** | Clinical guidelines recommend taking a beta-blocker after a heart attack to prevent another heart attack from occurring.4 Beta-blockers work by lowering the heart rate, which reduces the amount of force on the heart and blood vessels.5 Persistent use of a beta-blocker after a heart attack can improve survival and heart disease outcomes. |
| **Denominator** | Patients 18 years and older with an acute inpatient discharge following a heart attack. |
| **Denominator Exclusions** | Patients identified as having any of the following at any point in their history: Asthma, COPD, Obstructive Chronic Bronchitis, Chronic respiratory conditions due to fumes and vapors, Hypotension, Sinus Bradycardia, Intolerance or allergy to beta-blocker therapy. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients from denominator who received a prescription for Beta-blockers covering at least 135 days out of the 180 days following the discharge. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria)<br><br>Remove patients from the denominator and numerator if they meet the *denominator exclusion* criteria. |
| **Notes** | Inpatient discharges are calculated using the HEDIS 2016 Acute inpatient value set rather the HEDIS 2016 Inpatient Stay value set. This deviation is due to not supporting UBREV codes. |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 AND D4 AND D5 |
| |  | D1 | 18 years or older at measurement period end |
| | AND | D2 | An acute inpatient discharge following a heart attack occurring between 18 months before measurement period end and 6 months before measurement period end (in case of multiple events that qualify, the first qualifying event is identified as D2) |
| | AND | D3 | Patient was NOT transferred directly to a nonacute inpatient care setting after D2 |
| | AND | D4 | Any BCBS pharmacy benefit coverage occurring from 3 months before the acute inpatient discharge in D2 and 6 months following the acute inpatient discharge in D2 |
| | AND | D5 | Patient had 1 or more medical visits in the 3 years prior to the MP end date as indicated by HEDIS Outpatient CPT Value Set |
| | Value Sets | | D2: HEDIS Acute Inpatient, HEDIS AMI, Custom Arcadia Inpatient Discharge <br>D3: HEDIS Nonacute Inpatient<br>D5: HEDIS Outpatient CPT |
| **Denominator Exclusions** | | | EX1 OR EX2 OR EX3 OR EX4 OR EX5 OR EX6 OR EX7 |
| |  | EX1 | Asthma before the measurement period end |
| | OR | EX2 | COPD before the measurement period end |
| | OR | EX3 | Obstructive chronic bronchitis before the measurement period end |
| | OR | EX4 | Chronic respiratory condition before the measurement period end |
| | OR | EX5 | Hypotension before the measurement period end |
| | OR | EX6 | Sinus bradycardia before the measurement period end |
| | OR | EX7 | Intolerance/allergy to beta-blockers before the measurement period end |
| | Value Sets | | EX1: HEDIS Asthma<br>EX2: HEDIS COPD<br>EX3: HEDIS Obstructive Chronic Bronchitis<br>EX4: HEDIS Chronic Respiratory Conditions Due to Fumes/Vapors<br>EX5: HEDIS Beta-Blocker Contraindications<br>EX6: HEDIS Beta-Blocker Contraindications<br>EX7: Custom Arcadia Beta Blocker Allergy |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | A dispensed prescription for Beta-blockers covering at least 135 of the 180 days following event D3. (Prescriptions dispensed prior to the event in D3 and covering the 180 days following D3 will be counted.) |
| | Value Sets | | N1: HEDIS drug table PBH-B |
| **Numerator Exclusions** | | | None |
