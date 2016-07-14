Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-02-04
ModifyDate: 2016-02-04
AAVersion: 4.9

#Adolescent Immunizations

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Adolescent Immunizations |
| **Long Display Name** | Adolescent Immunization Status |
| **Short Display Name** | Adolescent Imm |
| **Description** | Children who turned thirteen years of age during the measurement year who have had 1 meningococcal vaccine, and 1 Tdap or 1 Td on or before their thirteenth birthday. |
| **Purpose** | Adolescent immunization rates have historically lagged behind early childhood immunization rates in the United States (U.S.). In 2000, the American Academy of Pediatrics (AAP) reported that 3 million adolescents failed to receive at least one recommended vaccination (Kroger et al., 2006). Low immunization rates among adolescents have the potential to cause outbreaks of preventable diseases and to establish reservoirs of disease in adolescents that can affect other populations including infants, the elderly, and individuals with chronic conditions. |
| **Denominator** | Patient turned thirteen years of age during the MP. |
| **Denominator Exclusions** | Patient has a contraindication to a vaccine. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients from denominator who have had 1 meningococcal vaccine on or between their eleventh and thirteenth birthdays, and 1 Tdap or 1 Td on or between their tenth and thirteenth birthdays. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria)<br><br>Remove patients from the denominator and numerator if they meet the *denominator exclusion* criteria. |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 |
| |  | D1 | Patients had one or more medical visits in the three years prior to the MP end date as indicated by CPT codes in HEDIS (Outpatient CPT Value Set) |
| | AND | D2 | Patient turned thirteen years of age during the MP |
| | Value Sets | | D1: HEDIS Outpatient CPT |
| **Denominator Exclusions** | | | EX1 |
| |  | EX1 | Patient has a contraindication to a vaccine, as indicated by the codes in HEDIS (Anaphylactic Reaction Due to Vaccination Value Set, Anaphylactic Reaction Due to Serum Value Set) |
| | Value Sets | | EX1: HEDIS Anaphylactic Reaction Due to Vaccination, HEDIS Anaphylactic Reaction Due to Serum |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 AND (N2 OR N3 OR N4) |
| |  | N1 | Patient has had 1 Meningococcal vaccine administered on or between their eleventh and thirteenth birthdays, as indicated by the codes in HEDIS (Meningococcal Vaccine Administered Value Set) |
| | AND | N2 | Patient has had 1 TDaP vaccine administered on or between their tenth and thirteenth birthdays, as indicated by the codes in HEDIS (Tdap Vaccine Administered Value Set) |
| | OR | N3 | Patient has had 1 Td vaccine administered on or between their tenth and thirteenth birthdays, as indicated by the codes in HEDIS (Td Vaccine Administered Value Set) |
| | OR | N4 | Patient has had at least one tetanus vaccine as indicated by HEDIS (Tetanus Vaccine Administered Value Set) AND at least one diphtheria vaccine (Diphtheria Vaccine Administered Value Set) |
| | Value Sets | | N1: HEDIS Meningococcal Vaccine Administered<br>N2: HEDIS Tdap Vaccine Administered<br>N3: HEDIS Td Vaccine Administered<br>N4: HEDIS Tetanus Vaccine Administered, HEDIS Diphtheria Vaccine Administered |
| **Numerator Exclusions** | | | None |
