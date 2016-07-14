

#Pay for Performance – Cervical Cancer Screening (CCS).

adapted from [https://arcadia.box.com/s/3t6s8qm877lhfuh8yd4aj5i9dj8a6gle](https://arcadia.box.com/s/3t6s8qm877lhfuh8yd4aj5i9dj8a6gle)




|Attribute| Description
|---------|------------|
|**Name** | Pay for Performance – Cervical Cancer Screening (CCS)
|**Display Name**  |Cervical Cancer Screening
|**Display Short Name** | Cervical Cancer Screening
|**Description** |TPercentage of women age 21 – 64 who were screened for cervical cancer using either of the following criteria: •	Women age 24-64 who had cervical cytology performed within the three years prior to the last day of the measurement period  •Women age 30 – 64 as of the last day of the measurement period, who had cervical cytology/human papilloma virus co-testing performed when they were 30-64 years of age and within 5 years prior to the last day of the measurement period.
|**Source**|  HEDIS® 2015 Technical Specification for Physician Measurement HEDIS® 2015 Technical Specification for Health Plans CHNW P4P for Quality 2015 (Excel provided by CHPW last updated 1/6/15)
|**Purpose** |This measure is part of the CHNW P4P Program 
|**Target** |Above 63% (Target set by CHPW)
|**Measurement Period (MP)**| The measure is calculated for a selected period of time defined by: •   Selected MP End Date: The last day of the selected measurement period •   Selected MP Start Date: The first day of the selected measurement period
|**Denominator**|Women aged 24 – 64 as of the last day of the measurement period
|**Denominator Exclusions**|  Diagnosis of hysterectomy with no residual cervix (‘complete’, ‘total’, or ‘radical’ abdominal or vaginal hysterectomy meets the criteria), or acquired absence of cervix any time in the patient history through the end of the measurement year.  Diagnosis of cervical agenesis anytime in patient history
|**Denominator Exceptions**|  None
|**Numerator** |Patients in denominator who had cervical cytology performed during the last 3 years OR patients in denominator 30 – 64 years of age as of the last day of the measurement period, and who were aged 30-64 as of the date of service(s) for cervical cytology and human papilloma virus (HPV) testing performed 4 or less days apart, and this testing occurred within 5 years of the end of the measurement period.
|**Numerator** |Exclusion None
|**Grain**| Person
|**Unit** | Percent**
|**Notes**| HEDIS 2015 Variation.
For any portion of the numerator criteria except for age, and exclusion criteria, structured data from EHR may be used.







**Criteria**










|Component |Ref #|  Logic|  Criteria|
|----------|-----|-------|----------|
|**Denominator**|| |D1 AND D2 |
|  | D1|AND | Age 24 through 64 as of the last day of the measurement period
|  |D2| AND | Gender is female
||Value Sets||n/a
|**Denominator Exclusions**||| EX1 OR EX2 OR EX3 
||EX1|| Patient had a hysterectomy with no residual cervix before the last day of the measurement period 
||EX2| OR| Patient has a history of cervical agenesis  
||EX3| OR| Patient has acquired an absence of a cervix before the last day of the measurement period
||Value Sets||  *HEDIS 2015: Hysterectomy (Absence of Cervix Exclusion code) 
|**Numerator**|||Patients meet the denominator criteria and  (N1 AND N2) OR (N3 AND N4 AND N5 AND N6 AND N7 AND N8)
||N1|AND| Patients age >=24 to <=64 as of the last day of measurement period
||N2|OR|Patient had cervical cytology performed within the 3 years prior to the last day of the measurement period
||N3|AND|Patients aged >=30 to <=64 years of age as of the last day of the measurement period
||N4|AND|Patient had a cervical cytology test  within the 5 years prior to the last day of measurement period
||N5|AND|Age >=30 at cervical cytology date (N4)
||N6|AND|Patient had a human papilloma virus (HPV) test within the 5 years prior to the last day of measurement period `[hpv]`
||N7|AND|Age >=30 at HPV test date (N6)
||N8|AND|HPV test (N7) performed within +/- 4 days of cervical cytology (N4)
||Value Sets||*HEDIS 2015:  Cervical Cytology Value Set  HPV Test Value Set




