

#Adult BMI Assessment




|Attribute| Description
|---------|------------|
|**Name** | Pay for Performance – Adult BMI Assessment (ABA)
|**Display Name**  |BMI Assessment - Adult
|**Display Short Name** | BMI Assessment - Adult
|**Description** |Percentage of patients ages 18 to 74 with an outpatient encounter in the 24 months prior to the last day of the measurement period, who had a BMI value documented within the 24 months prior to the last day of the measurement period. 
|**Source**|  HEDIS® 2015 Technical Specification for Physician Measurement HEDIS® 2015 Technical Specification for Health Plans CHNW P4P for Quality 2015 (Excel provided by CHPW last updated 1/6/15)
|**Purpose** |This measure is part of the CHNW P4P Program
|**Target** | Above 90% (Target set by CHPW) 
|**Denominator**|Patients aged 18-74 at the last day of the measurement period, who also had an outpatient encounter in the 24 months prior to the last day of the measurement period
|**Denominator Exclusions**|  Patients who were diagnosed with pregnancy within the 24 months prior to the last day of the measurement period
|**Numerator** |Patients in denominator who in the last 24 months had a BMI value documented, or a BMI percentile documented (as value or plotted on growth chart) if under 19 years of age. If value taken from medical records, patient weight from same date must also be recorded.
|**Grain**| Person
|**Unit** | Percent**



**Criteria**










|Component |Ref #|  Logic|  Criteria|
|----------|-----|-------|----------|
|**Denominator**||| D1 AND D2
| | D1|AND | Patient is >=18 years of age at 12 months before period start  
|  |D2| AND| Patient is <=74 years of age at end of measurement period
| | D3|  |Patient had an outpatient encounter within 24 months prior to the end of the measurement period   
||  Value Sets||  *HEDIS 2015 Outpatient Value Set
|**Denominator Exclusions**|||  EX1 
||EX1|| Patient diagnosed with pregnancy within the 24 months prior to the last day of the measurement period
||Value Sets||*HEDIS 2015 Pregnancy Value Set
|**Numerator**||| Meets the denominator and   N1 OR (N2 AND N3) OR (((N4 AND N5) OR N6) AND N7)
||N1|OR| Patient has evidence of a BMI value documented in the 24 months prior to the last day of the measurement period based on use of code from HEDIS 2015 BMI value set.
||N2|AND|Patient has a BMI value documented within the 24 months prior to the last day of the measurement period.
||N3|OR|Patient has a weight documented within the 24 months prior to the last day of the measurement period.
||N4|AND|Patient has BMI percentile documented within the 24 months prior to the last day of the measurement period. 
||N5|OR| Patient has a weight documented within the 24 months prior to the last day of the measurement period. 
||N6|AND|Patient has evidence of BMI percentile documented in the 24 months prior to the last day of the measurement period based on use of code fr0m HEDIS 2015 BMI Percentile value set
||N7||Patient is <19 years of age at N4 OR N6 
||Value Sets||*HEDIS 2015  BMI value set *HEDIS 2015  BMI Percentile value set Custom BMI value or percentile from vitals table




