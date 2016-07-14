Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-02-04
ModifyDate: 2016-02-04
AAVersion: 4.9

#Childhood Immunizations 1 (Combo 3)

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Childhood Immunizations 1 (Combo 3) |
| **Long Display Name** | Childhood Immunization Status |
| **Short Display Name** | Childhood Imm |
| **Description** | Children who turned two years old during the measurement year who have had 4 DTaP, 3 IPV, 1 MMR, 3 HiB, 3 Hep B, 1 VZV, and 4 pneumococcal conjugate vaccines on or before their second birthday. |
| **Purpose** | Infants and toddlers are particularly vulnerable to infectious diseases because their immune systems have not built up the necessary defenses to fight infection (Centers for Disease Control and Prevention 2011). Most childhood vaccines are between 90 and 99 percent effective in preventing diseases (HealthyChildren 2011). Immunization is a critical aspect of preventive care for children. Lack of proper immunization leads to an increase in illness, doctor visits and hospitalizations, all of which translate into higher costs. (Tatzlandrew, Brown, and Halpern). Vaccination of each U.S. birth cohort with the current childhood immunization schedule prevents approximately 42,000 deaths and 20 million cases of disease, and saves nearly $14 billion in direct costs and $69 billion in societal costs each year (Zhou 2011; Centers for Disease Control and Prevention 2011b). |
| **Denominator** | Patient turned two years of age during the MP. |
| **Denominator Exclusions** | Patient has a contraindication to a vaccine. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients from denominator with 4 DTaP, 3 IPV, 1 MMR, 3 HiB, 3 Hep B, 1 VZV, and 4 pneumococcal conjugate vaccines on or before their second birthday. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria)<br><br>Remove patients from the denominator and numerator if they meet the *denominator exclusion* criteria. |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 |
| |  | D1 | Patient had one or more medical visits in the three years prior to the MP end date as indicated by CPT codes in HEDIS (Outpatient CPT Value Set) |
| | AND | D2 | Patient turned two years of age during the MP |
| | Value Sets | | D1: HEDIS Outpatient CPT |
| **Denominator Exclusions** | | | EX1 OR EX2 OR EX3 OR EX4 OR EX5 OR EX6 |
| |  | EX1 | Patient has a contraindication to a vaccine, as indicated by the codes in HEDIS (Anaphylactic Reaction Due to Vaccination Value Set) |
| | OR | EX2 | Patient has a contraindication to a vaccine, as indicated by the codes in HEDIS (Encephalopathy Due to Vaccination Value Set) with a vaccine adverse-effect code (Vaccine Causing Adverse Effect Value Set) |
| | OR | EX3 | Patient has a contraindication to a vaccine, as indicated by the codes in HEDIS (Disorders of the Immune System Value Set) |
| | OR | EX4 | Patient has a contraindication to a vaccine, as indicated by the codes in HEDIS (HIV Value Set) |
| | OR | EX5 | Patient has a contraindication to a vaccine, as indicated by the codes in HEDIS (Malignant Neoplasm of Lymphatic Tissue Value Set) |
| | OR | EX6 | Anaphylactic reaction to neomycin, Anaphylactic reaction to streptomycin, polymyxin B or neomycin, or Anaphylactic reaction to common bakers yeast |
| | Value Sets | | EX1: HEDIS Anaphylactic Reaction Due to Vaccination<br>EX2: HEDIS Encephalopathy Due to Vaccination, HEDIS Vaccine Causing Adverse Effect<br>EX3: HEDIS Disorders of the Immune System<br>EX4: HEDIS HIV<br>EX5: HEDIS Malignant Neoplasm of Lymphatic Tissue |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 AND N2 AND (N3 OR N4 OR N5 OR N6) AND N7 AND (N8 OR N9) AND (N10 OR N11) AND N12 |
| |  | N1 | Patient has had 4 DTaP vaccines administered 42 days after birth and on or before their second birthday, as indicated by the codes in HEDIS (DTAP Vaccine Administered Value Set) |
| | AND | N2 | Patient has had 3 IPV vaccines administered 42 days after birth and on or before their second birthday, as indicated by the codes in HEDIS (Inactivated Polio Vaccine (IPV) Administered Value Set) |
| | AND | N3 | Patient has had 1 MMR vaccine administered on or before their second birthday, as indicated by the codes in HEDIS (Measles, Mumps, Rubella (MMR) Vaccine Administered Value Set) |
| | OR | N4 | Patient has at least one measles & Rubella Vaccine HEDIS (Measles/Rubella Vaccine Administered Value Set) AND at least on Mumps Vaccination HEDIS (Mumps Vaccine Administered Value Set) |
| | OR | N5 | Patient has at least one measles vaccination HEDIS (Measles Vaccine Administered Value Set) AND at least one mumps vaccination HEDIS(Mumps Vaccine Administered Value Set) AND at least one rubella vaccination HEDIS(Rubella Vaccine Administered Value Set) |
| | OR | N6 | History of Measles (Measles Value Set), Mumps (Mumps Value Set) or Rubella (Rubella Value Set) |
| | AND | N7 | Patient has had 3 HiB vaccines administered 42 days after birth and on or before their second birthday, as indicated by the codes in HEDIS (Haemophilus Influenzae Type B (HiB) Vaccine Administered Value Set) on different dates of service |
| | AND | N8 | Patient has had 3 Hep B vaccines administered on or before their second birthday, as indicated by the codes in HEDIS (Hepatitis B Vaccine Administered Value Set) |
| | OR | N9 | Patient has history of hepatitis illness as indicated by HEDIS (Hepatitis B Value Set) |
| | AND | N10 | Patient has had 1 VZV vaccine administered on or before their second birthday, as indicated by the codes in HEDIS (Varicella Zoster (VZV) Vaccine Administered Value Set) |
| | OR | N11 | Patient has a history of varicella zoster (e.g. chicken pox) illness as indicated by HEDIS (Varicella Zoster Value Set) |
| | AND | N12 | Patient has had 4 Pneumococcal Conjugate vaccines administered 42 days after birth and on or before their second birthday, as indicated by the codes in HEDIS (Pneumococcal Conjugate Vaccine Administered Value Set) |
| | Value Sets | | N1: HEDIS DTAP Vaccine Administered<br>N2: HEDIS Inactivated Polio Vaccine (IPV) Administered<br>N3: HEDIS Measles, Mumps, Rubella (MMR) Vaccine Administered<br>N4: HEDIS Measles/ Rubella Vaccine Administered, HEDIS Mumps Vaccine Administered<br>N5: HEDIS Measles Vaccine Administered, HEDIS Mumps Vaccine Administered, HEDIS Rubella Vaccine Administered<br>N6: HEDIS Measles, HEDIS Mumps, HEDIS Rubella<br>N7: HEDIS Haemophilus Influenzae Type B (HiB) Vaccine Administered<br>N8: HEDIS Hepatitis B Vaccine Administered<br>N9: HEDIS Hepatitis B<br>N10: HEDIS Varicella Zoster (VZV) Vaccine Administered<br>N11: HEDIS Varicella Zoster<br>N12: HEDIS Pneumococcal Conjugate Vaccine Administered |
| **Numerator Exclusions** | | | None |
