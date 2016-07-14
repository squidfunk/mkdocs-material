

#Weight Assessment for Children/Adolescents: BMI Percentile



|Attribute| Description
|---------|------------|
|**Name** | Pay for Performance – Weight Assessment for Children/Adolescents (WCC): BMI Percentile
|**Display Name**  | Child/Adolescent BMI Percentile
|**Display Short Name** |  Child/Adol BMI Percentile
|**Description** |Percentage of children and adolescents aged 3-17 years who had outpatient encounter with a PCP or Ob/GYN within the 12 months prior to the last day of the measurement period, and who within the 12 months prior to the last day of the measurement period had evidence of BMI percentile documented, or a BMI value if 16-17 years old on the date the BMI was measured. .
|**Source**|  HEDIS® 2015 Technical Specification for Physician Measurement HEDIS® 2015 Technical Specification for Health Plans CHNW P4P for Quality 2015 (excel provided by CHPW last updated 1/6/15)
|**Purpose** |This measure is part of the CHNW P4P Program 
|**Target** | Above 63% (Target set by CHPW)
|**Measurement Period (MP)**| The measure is calculated for a selected period of time defined by: •   Selected MP End Date: The last day of the selected measurement period •   Selected MP Start Date: The first day of the selected measurement period
|**Denominator**|Patients aged >=3 and <=17 at the end of the measurement period, who had an outpatient encounter with PCP or OB/GYN during the 12 months prior to the last day of the measurement period.
|**Denominator Exclusions**|  Patients who were diagnosed with pregnancy in the 12 months prior to the last day of the measurement period
|**Numerator** |Patients who had a BMI percentile documented, or a BMI value taken if 16-17 years of age at time of visit, in the 12 months prior to the last day of the measurement period. 
|**Numerator** |Exclusion None
|**Grain**| Person
|**Unit** | Percent**
|**Notes**| HEDIS 2015 Variation •	HEDIS Measure includes nutritional and physical activity counseling 





**Criteria**










|Component |Ref #|  Logic|  Criteria|
|----------|-----|-------|----------|
|**Denominator**|| |D1 AND D2
|  | D1| AND| Patient is aged >=3 through <=17 as of the last day of the measurement period
|  |D2|  | Patient had an outpatient encounter with a PCP or Ob/Gyn provider within 12 months prior to the last day of the measurement period.
||  Value Sets||  HEDIS 2015 Outpatient Visit Value Set PCP and Ob/Gyn Provider Specialties
|**Denominator Exclusions**|||  EX1 
||EX1|| Patient diagnosed with pregnancy in the 12 months prior to the last day of the measurement period
||Value Sets||*HEDIS 2015  Pregnancy Exclusion Value Set
|**Numerator**|||  Patients meet the denominator criteria and N1 OR (N2 AND N3) OR (((N4 AND N5) OR N6) AND N7)
||N1| OR|Patient has evidence of a BMI percentile documented within the 12 months prior to the last day of the measurement period based on use of code from HEDIS 2015 BMI Percentile value set.
||N2|AND|Patient has a BMI percentile documented within the 12 months prior to the last day of the measurement period
||N3|OR|Patient has a height and weight documented within the 12 months prior to the last day of the measurement period.
||N4|AND|Patient has BMI value documented within the 12 months prior to the last day of the measurement period.
||N5|OR|Patient has a height and weight documented within the 12 months prior to the last day of the measurement period.
||N6|AND|Patient has evidence of BMI value documented within the 12 months prior to the last day of the measurement period based on use of code from HEDIS 2015 BMI value set.
||N7||Patient is aged 16 0r 17 at N4 or N6 
||Value Sets||*HEDIS 2015 BMI Percentile value set *HEDIS 2015 BMI value set Custom BMI value/percentile from vitals table





