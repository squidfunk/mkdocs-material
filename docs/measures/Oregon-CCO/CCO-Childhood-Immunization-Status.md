Status: Client-Ready
Author: Bill Baranowski
CreateDate: 2016-01-13
ModifyDate: 2016-01-13
AAVersion: 4.9

#Childhood Immunization Status

|Attribute|Description|
|---------|-----------|
|**Display Name**|Childhood Immunization Status|
|**Display Short Name**|Childhood Immunization|
|**Description**|Children who turned two years of age during the measurement period who had four diphtheria, tetanus and acellular pertussis (DTaP); three polio (IPV); one measles, mumps and rubella (MMR); three H influenza type B (HiB); three hepatitis B (Hep B); and one chicken pox (VZV) on or before their second birthday.|
|**Source**|http://www.oregon.gov/oha/analytics/Pages/CCO-Baseline-Data.aspx : Childhood Immunization Status - 2016.pdf|
|**Purpose**| Infants and toddlers are particularly vulnerable to infectious diseases because their immune systems have not built up the necessary defenses to fight infection (Centers for Disease Control and Prevention 2011). Most childhood vaccines are between 90 and 99 percent effective in preventing diseases (HealthyChildren 2011). Immunization is a critical aspect of preventive care for children. Lack of proper immunization leads to an increase in illness, doctor visits and hospitalizations, all of which translate into higher costs. (Tatzlandrew, Brown, and Halpern). Vaccination of each U.S. birth cohort with the current childhood immunization schedule prevents approximately 42,000 deaths and 20 million cases of disease, and saves nearly $14 billion in direct costs and $69 billion in societal costs each year (Zhou 2011; Centers for Disease Control and Prevention 2011b). | 
|**Target**|82%|
|**Measurement Period (MP)**| The measure is calculated for a selected period of time, defined by:<ul><li>Selected MP End Date: The last day of the selected measurement period</li><li> Selected MP Start Date: One year prior to the MP end date </li></ul>
|**Denominator**|Patients who turned two years of age during the MP and who had any interaction during the 12 months before their 2nd birthday|
|**Denominator Exclusions**|None|
|**Denominator Exceptions**|Patients with a contraindication to a vaccine, an immunodeficiency, or a malignant neoplasm of lympatic tissue.|
|**Numerator**|Patients with 4 DTaP, 3 IPV, 1 MMR, 3 HiB, 3 Hep B, and 1 VZV on or before their second birthday.|
|**Numerator Exclusion**|None|
|**Grain**|Person|
|**Unit**|Percent**|
|**Notes**|Based on HEDIS 2016 Physician Measurement measure, using Combo #2. Note that two vaccines of the same type must be 2 or more days apart to be counted separately to prevent duplicate data from counting the same vaccination multiple times. The exception logic for this measure is a slight simplification over the HEDIS specification, which states an exception should only be counted if the patient did not receive the full sequence for the vaccine related to that exception. Instead this measure counts the exception as long as the patient did not make it into the numerator. |


##Criteria

|Component|Logic|Ref #|Criteria|
|---------|-----|-------|--------|
|**Denominator**| | | D1 AND D2 |
| | | D1 | Patient turned 2 during the measurement period |
| | AND | D2 | Patient had any interaction during the 12 months before their 2nd birthday |
| | | Value Sets | None |
|**Denominator Exclusions**| | | None |
|**Denominator Exceptions**| | | EX1 OR EX2 OR EX3 OR EX4 |
| | | EX1 | Patient had evidence of contraindication to a vaccine before their second birthday |
| | OR | EX2 | Patient had encephalopathy due to vaccination and a vaccine causing an adverse effect recorded on the same date before their second birthday |
| | OR | EX3 | Patient had a disorder of the immune system before their second birthday |
| | OR | EX4 | Patient had a diagnosis of lymphoreticular cancer, multiple myeloma, or leukemia before their second birthday |
| | | Value Sets | EX1: Anaphylactic Reaction Due to Vaccination Value Set<br>EX2: Encephalopathy Due to Vaccination Value Set, Vaccine Causing Adverse Effect Value Set<br>EX3: Disorders of the Immune System Value Set, HIV Value Set<br>EX4: Malignant Neoplasm of Lymphatic Tissue Value Set|
|**Numerator**| | | N1 AND N2 AND (N3 OR N4 OR N5) AND N6 AND (N7 OR N8) AND (N9 OR N10) |
| | | N1 | Patient has had 4 DTaP vaccines administered on or before their 2nd birthday, and at least 42 days after their date of birth |
| | AND | N2 | Patient has had 3 IPV vaccines administered on or before their 2nd birthday, and at least 42 days after their date of birth |
| | AND | N3 | Patient has had 1 MMR vaccine administered on or before their 2nd birthday |
| | OR | N4 | Patient has at least one measles + rubella vaccination and either a mumps vaccination or history of mumps before their second birthday |
| | OR | N5 | Patient has a measles vaccination or history of measles AND patient has a mumps vaccination or history of mumps AND patient has a rubella vaccination or history of rubella before their second birthday |
| | AND | N6 | Patient has had 3 HiB vaccines administered on or before their 2nd birthday, and at least 42 days after their date of birth |
| | AND | N7 | Patient has had 3 Hepatitis B vaccines administered on or before their 2nd birthday |
| | OR | N8 | Patient has a history of Hepatitis B before their second birthday |
| | AND | N9 | Patient has had 1 VZV vaccine administered on or before their 2nd birthday |
| | OR | N10 | Patient has history of varicella zoster before their 2nd birthday |
| | | Value Sets | N1: DTaP Vaccine Administered Value Set, Arcadia Custom DTaP Immunization Value Set<br>N2: Inactivated Polio Vaccine (IPV) Administered Value Set, Arcadia Custom IPV Immunization Value Set<br>N3: Measles, Mumps, and Rubella (MMR) Vaccine Administered Value Set, Arcadia Custom MMR Immunization Value Set<br>N4: Measles/Rubella Vaccine Administered Value Set, Mumps Vaccine Administered Value Set, Mumps Value Set<br>N5: Measles Vaccine Administered Value Set, Measles Value Set, Mumps Vaccine Administered Value Set, Mumps Value Set, Rubella Vaccine Administered Value Set, Rubella Value Set<br>N6: Haemophilus Influenzae Type B (HiB) Vaccine Administered Value Set, Arcadia Custom HiB Immunization Value Set<br>N7: Hepatitis B Vaccine Administered Value Set, Arcadia Custom HepB Immunization Value Set<br>N8: Hepatitis B Value Set<br>N9: Varicella Zoster (VZV) Vaccine Administered Value Set, Arcadia Custom VZV Immunization Value Set<br>N10: Varicella Zoster Value Set |
|**Numerator Exclusions**| | | None |
