Status: Client-Ready
Author: Bill Baranowski
CreateDate: 2016-04-08
ModifyDate: 2016-04-08
AAVersion: 4.10

#Childhood Immunization Status (CMS117v4)

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Childhood Immunization Status (CMS117v4) |
| **Long Display Name** | Childhood Immunization Status (CMS117v4) |
| **Short Display Name** | Childhood Immunization |
| **Source** | CMS (https://www.cms.gov/Regulations-and-Guidance/Legislation/EHRIncentivePrograms/Downloads/eCQM_2014_EP_June2015.zip) |
| **Description** | Percentage of children 2 years of age who had four diphtheria, tetanus and acellular pertussis (DTaP); three polio (IPV), one measles, mumps and rubella (MMR); three H influenza type B (HiB); three hepatitis B (Hep B); one chicken pox (VZV); four pneumococcal conjugate (PCV); one hepatitis A (Hep A); two or three rotavirus (RV); and two influenza (flu) vaccines by their second birthday. |
| **Purpose** | Infants and toddlers are particularly vulnerable to infectious diseases because their immune systems have not built up the necessary defenses to fight infection (Centers for Disease Control and Prevention 2011). Most childhood vaccines are between 90 and 99 percent effective in preventing diseases (HealthyChildren 2011). Immunization is a critical aspect of preventive care for children. Lack of proper immunization leads to an increase in illness, doctor visits and hospitalizations, all of which translate into higher costs. (Tatzlandrew, Brown, and Halpern). Vaccination of each U.S. birth cohort with the current childhood immunization schedule prevents approximately 42,000 deaths and 20 million cases of disease, and saves nearly $14 billion in direct costs and $69 billion in societal costs each year (Zhou 2011; Centers for Disease Control and Prevention 2011b). |
| **Target** | 50% (configurable by client)% (configurable by client) |
| **Target Source** | Arcadia Default |
| **Denominator** | Children who turn 2 years of age during the measurement period and who have a visit during the measurement period. |
| **Denominator Exclusions** | N/A |
| **Denominator Exceptions** | N/A |
| **Numerator** | Children who have evidence showing they received recommended vaccines, had documented history of the illness, had a seropositive test result, or had an allergic reaction to the vaccine by their second birthday. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria) |
| **Notes** | This measure does not use VSAC Face-to-Face Interaction for D2 because the product does not currently support SNOMEDCT.<br><br>This measure does not use the following VSAC anaphylactic reaction value sets because the product does not currently support SNOMEDCT: Anaphylactic Reaction to DTaP Vaccine, Anaphylactic Reaction to Inactivated Polio Vaccine (IPV), Anaphylactic Reaction to Streptomycin, Anaphylactic Reaction to Polymyxin, Anaphylactic Reaction to Neomycin, Anaphylactic Reaction to Hemophilus Influenza B (HiB) Vaccine, Anaphylactic Reaction to Hepatitis B Vaccine, Anaphylactic Reaction to Common Baker's Yeast, Anaphylactic Reaction to Pneumococcal Conjugate Vaccine, Anaphylactic Reaction to Hepatitis A Vaccine, Anaphylactic Reaction to Rotavirus Vaccine, Anaphylactic Reaction to Influenza Vaccine.<br><br>This measure does not use the following VSAC antibody and antigen test value sets because the product does not currently support LOINC: Measles Antibody Test (IgG Antibody Titer), Measles Antibody Test (IgG Antibody presence), Mumps Antibody Test (IgG Antibody Titer), Mumps Antibody Test (IgG Antibody presence), Rubella Antibody Test (IgG Antibody Titer), Rubella Antibody Test (IgG Antibody presence), Hepatitis B Antigen Test, Varicella Zoster Antibody Test (IgG Antibody Titer), Varicella Zoster Antibody Test (IgG Antibody Presence), Hepatitis A Antigen Test.<br><br>The product does not currently support alternative counts for vaccines, so the rotavirus vaccine criteria is simplified to look for 2 of any RV vaccines instead of looking for 2 or 3 depending on the types. |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 |
| |  | D1 | Patient turned 2 during the period. |
| | AND | D2 | Patient had an eligible encounter during the period. |
| | Value Sets | | D2: VSAC Office Visit; VSAC Home Healthcare Services; VSAC Preventive Care - Established Office Visit, 0 to 17; VSAC Preventive Care- Initial Office Visit, 0 to 17 |
| **Denominator Exclusions** | | | None |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | (N1 OR N2) AND N3 AND (N4 OR N5 OR (N6 AND N7 AND N8)) AND N9 AND (N10 OR N11) AND (N12 OR N13) AND N14 AND (N15 OR N16) AND N17 AND (N18 OR N19) |
| |  | N1 | Patient had 4 DTaP vaccinations on or before their 2nd birthday. Vaccinations must be on different days to be counted as different vaccinations, and ones given earlier than 42 days after the patient's birth do not count. |
| | OR | N2 | Patient had a diagnosis of encephalopathy on or before their 2nd birthday. |
| | AND | N3 | Patient had 3 IPV vaccinations on or before their 2nd birthday. Vaccinations must be on different days to be counted as different vaccinations, and ones given earlier than 42 days after the patient's birth do not count. |
| | AND | N4 | Patient had 1 MMR vaccination on or before their 2nd birthday. |
| | OR | N5 | Patient had a disorder of the immune system, a diagnosis of HIV, or a malignant neoplasm of lymphatic and hematopietic tissue on or before their 2nd birthday. |
| | OR | N6 | Patient had a diagnosis of measles on or before their 2nd birthday. |
| | AND | N7 | Patient had a diagnosis of mumps on or before their 2nd birthday. |
| | AND | N8 | Patient had a diagnosis of rubella on or before their 2nd birthday. |
| | AND | N9 | Patient had 3 HiB vaccinations on or before their 2nd birthday. Vaccinations must be on different days to be counted as different vaccinations, and ones given earlier than 42 days after the patient's birth do not count. |
| | AND | N10 | Patient had 3 Hep B vaccinations on or before their 2nd birthday. Vaccinations must be on different days to be counted as different vaccinations. |
| | OR | N11 | Patient had a hepatitis B diagnosis on or before their 2nd birthday. |
| | AND | N12 | Patient had a VZV vaccination on or before their 2nd birthday. |
| | OR | N13 | Patient had a diagnosis of varicella zoster, a disorder of the immune system, a diagnosis of HIV, or a malignant neoplasm of lymphatic and hematopietic tissue on or before their 2nd birthday. |
| | AND | N14 | Patient had 4 PCV vaccinations on or before their 2nd birthday. Vaccinations must be on different days to be counted as different vaccinations, and ones given earlier than 42 days after the patient's birth do not count. |
| | AND | N15 | Patient had a Hep A vaccination on or before their 2nd birthday. |
| | OR | N16 | Patient had a diagnosis of hepatitis A on or before their 2nd birthday. |
| | AND | N17 | Patient had 2 RV vaccinations on or before their second birthday. Vaccinations must be on different days to be counted as different vaccinations, and ones given earlier than 42 days after the patient's birth do not count. |
| | AND | N18 | Patient had 2 flu vaccinations on or before their 2nd birthday. Vaccinations must be on different days to be counted as different vaccinations, and ones given earlier than 180 days after the patient's birth do not count. |
| | OR | N19 | Patient had a malignant neoplasm of lymphatic and hematopietic tissue on or before their 2nd birthday. |
| | Value Sets | | N1: VSAC DTaP Vaccine Administered, Arcadia Custom DTaP Vaccine<br>N2: VSAC Encephalopathy<br>N3: VSAC Inactivated Polio Vaccine (IPV) Administered, Arcadia Custom IPV<br>N4: VSAC Measles, Mumps, and Rubella (MMR) Vaccine Administered, Arcadia Custom MMR Vaccine<br>N5: VSAC Disorders of the Immune System, VSAC HIV, VSAC Malignant Neoplasm of Lymphatic and Hematopietic Tissue<br>N6: VSAC Measles<br>N7: VSAC Mumps<br>N8: VSAC Rubella<br>N10: VSAC Hepatitis B Vaccine Administered, Arcadia Custom HepB Vaccine<br>N11: VSAC Hepatitis B<br>N12: VSAC Varicella Zoster Vaccine (VZV) Administered, Arcadia Custom VZV<br>N13: VSAC Varicella Zoster, VSAC Disorders of the Immune System, VSAC HIV, VSAC Malignant Neoplasm of Lymphatic and Hematopietic Tissue<br>N14: VSAC Pneumococcal Conjugate Vaccine Administered, Arcadia Custom PCV<br>N15: VSAC Hepatitis A Vaccine Administered, Arcadia Custom HepA Vaccine<br>N16: VSAC Hepatitis A<br>N17: VSAC Rotavirus Vaccine (2 dose schedule) Administered, VSAC Rotavirus Vaccine (3 dose schedule) Administered, Arcadia Custom RV Vaccine<br>N18: VSAC Influenza Vaccine Administered, Arcadia Custom Flu Vaccine<br>N19: VSAC Malignant Neoplasm of Lymphatic and Hematopietic Tissue |
| **Numerator Exclusions** | | | None |
