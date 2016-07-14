Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-04-13
ModifyDate: 2016-02-13
AAVersion: 4.9

#Osteoporosis Management in Women Who Had a Fracture - Dispensing

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Osteoporosis Management in Women Who Had a Fracture - Dispensing |
| **Long Display Name** | Osteoporosis Management in Women Who Had a Fracture |
| **Short Display Name** | Osteoporosis Management |
| **Description** | The percentage of women 67-85 years of age who suffered a fracture and who had either a bone mineral density (BMD) test or a prescription for a drug to treat or prevent osteoporosis in the six months after the date of fracture. |
| **Purpose** | Osteoporosis is a serious disease in the elderly that can impact their quality of life. With appropriate screening and treatment, the risk of osteoporosis-related fractures can be reduced. |
| **Denominator** | Women 67-85 years of age with an outpatient visit, observation visit, ED visit, or inpatient stay for a fracture (if there are multiple qualifying fractures, the first is used). |
| **Denominator Exclusions** | Patients with a fracture during the 60 days prior to the denominator fracture, a bone mineral density test during the 2 years prior to the denominator fracture, or osteoporosis therapy during the 1 year prior to the denominator fracture, or who received a dispensed prescription or had an active prescription to treat osteoporosis during the year prior to the denominator fracture. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients with one of the following treatments: (1) a bone mineral density test during the inpatient admission, on the visit or discharge date or during the 180 days after the fracture, (2) osteoporosis therapy on the visit or discharge date, osteoporosis therapy during the inpatient stay, or during the 180 days after the fracture (3) a dispensed prescription to treat osteoporosis on the visit or discharge date or during the 180 days after the fracture. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria)<br><br>Remove patients from the denominator and numerator if they meet the *denominator exclusion* criteria. |
| **Notes** | For inpatient stays, this measure allows any medications from Osteoporosis Medications Value Set (instead of medications from the smaller Long-Acting Osteoporosis Medications Value Set) during the stay or after the stay. This is an intended deviation from HEDIS guidelines, since identifying date of discharge might be difficult for some inpatient stays. The product does not currently support UBREV, so this measure uses Acute Inpatient and Nonacute Inpatient Value Sets instead of the Inpatient Stay Value Set. |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 AND D4 AND D5 |
| |  | D1 | Patient is 67-85 years of age at period end |
| | AND | D2 | Patient is female |
| | AND | D3 | Patient had an outpatient visit, observation visit, ED visit, or inpatient stay for a fracture 6 to 18 months before period end (if there are multiple events that qualify, the first will be identified as event D3) |
| | AND | D4 | Patient had BCBS pharmacy benefit coverage from 18 months before period end through 6 months after event D3 |
| | AND | D5 | Patient had 1 or more medical visits in the 3 years prior to the MP end date as indicated by HEDIS Outpatient CPT Value Set |
| | Value Sets | | D3: HEDIS Outpatient, HEDIS Observation, HEDIS ED, HEDIS Acute Inpatient, HEDIS Nonacute Inpatient, HEDIS Fractures<br>D5: HEDIS Outpatient CPT |
| **Denominator Exclusions** | | | EX1 OR EX2 OR EX3 OR EX4 |
| |  | EX1 | Patient had an outpatient visit, observation visit, ED visit, or inpatient stay for a fracture during 60 days before event D3 |
| | OR | EX2 | Patient had a bone mineral density test during the 2 years before event D3 |
| | OR | EX3 | Patient had osteoporosis therapy during the 1 year before event D3 |
| | OR | EX4 | Patient received a dispensed prescription or had an active prescription to treat osteoporosis during the 1 year before event D3 |
| | Value Sets | | EX1: HEDIS Outpatient, HEDIS Observation, HEDIS ED, HEDIS Acute Inpatient, HEDIS Nonacute Inpatient, HEDIS Fractures<br>EX2: HEDIS Bone Mineral Density Tests<br>EX3: HEDIS Osteoporosis Medications FDA-Approved Osteoporosis Therapies Table OMW-C<br>EX4: HEDIS Osteoporosis Medications FDA-Approved Osteoporosis Therapies Table OMW-C |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 OR N2 OR N3 OR N4 OR N5 |
| |  | N1 | Patient had a bone mineral density test on or within 6 months after event D3 |
| | OR | N2 | D3 was an inpatient stay and patient had a bone mineral density test during that stay |
| | OR | N3 | Patient had osteoporosis therapy on or within 6 months of event D3 |
| | OR | N4 | D3 was an inpatient stay and patient had osteoporosis therapy during that stay |
| | OR | N5 | Patient had a dispensed prescription to treat osteoporosis on or within 6 months of D3 |
| | Value Sets | | N1: HEDIS Bone Mineral Density Tests<br>N2: HEDIS Bone Mineral Density Tests<br>N3: HEDIS Osteoporosis Medications, FDA-Approved Osteoporosis Therapies Table OMW-C<br>N4: HEDIS Osteoporosis Medications, FDA-Approved Osteoporosis Therapies Table OMW-C<br>N5: HEDIS Osteoporosis Medications, FDA-Approved Osteoporosis Therapies Table OMW-C |
| **Numerator Exclusions** | | | None |
