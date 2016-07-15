# Measure Documentation #
This is a sample page to describe how measure documentation is created.

If working to create a measure create a measure, it is best to work from a national standard (CQM, HEDIS, NQF etc) and ask why each change needs to be made.  

If you are documenting a national measure, look for the HQMF eMeasure format and paste the information into the Arcadia template. 

#Part 1 Specification Description#
The following table is used to describe the measure components and is adapted from the specification. Care should be taken to highlight any differences between the cited specification and the measure as adapted for Arcadia Analytics. 

The text in each box describes the needed entry: 

|Attribute|Description|
|---------|-----------|
|**Name**|	Full name of the measure
|**Display Name**|	Should be shorter than full name and will be used on front end in a hover over
|**Display Short Name**|	Used on scorecards
|**Description**|	Description of the measure
|**Source**| Cite the source of the measure and include link to documentation
|**Purpose**| List the measure reasoning for context. 
|**Target**| Used on the measure scorecards by default
|**Measurement Period (MP)**| Does the measurement period need special handling or does the Arcadia standard work? (The Arcadia standard measurement period is the one year prior to the start date selected by the user)  
|**Denominator**|Description of measure denominator criteria be sure to also list Initial Patient Population rules.  
|**Denominator Exclusions**|Under what circumstances should patients be excluded from denominator
|**Denominator Exceptions**| Are there exceptions where providers or groups would not have to report this measure?
|**Numerator**|	Numerator description
|**Numerator Exclusion**| Reasons for excluding events excluded from the numerator. 
|**Grain**|	*Person* grain where data will be calculated across all Arcadia analytic sources. *Patient* grain where data will only be calculated per patient record using data in the same EHR instance. *Member* grain where only membership and claims data will be used from a single claims source. 
|**Unit**|	Percent for percentage measures or specify alternative
|**Notes**|	This is a good place to detail modifications from the standard or where an interpretation was made for a specific reason. 

#Part 2 Criteria Detail#
This table is used to define specific calculation criteria for each measure. Usage of codes or value_sets should formatted using 'this style' so that they can be clearly identified. When other DB columns need to be referenced use the full 'table_name.column_name' in order to clearly identify the necessary behavior. 

When referring to an Arcadia term such as *Medical Encounter* or *Interaction* use *italics* to denote a reference to our definition. 

The following is an example of criteria table for HEDIS 2014 LDL-Control Measure: 

|Component |Ref #|  Logic|  Criteria|
|----------|-----|-------|----------|
|**Denominator**|| |D1 AND D2 AND (D3 OR D4 OR D5)|
|  | D1| | 18-75 years old at measurement period end
|  |AND| D2 | *Interaction* during measurement period
| | AND| D3 |  2 (`HEDIS Outpatient or HEDIS Observation or HEDIS ED  or HEDIS Non-Acute Inpatient`) encounters with a diagnosis of `HEIDS Diabetes`during the 2 years before period end
||  OR|  D4|  1 `HEDIS Acute Inpatient` encounter with a diagnosis of  `HEDIS Diabetes`  during the 2 years before period end. 
||  OR|  D5|  Diabetes qualifying medication active during 2 years before period end. `Value Set TBA`
|**Denominator Exclusions**|||  EX1 AND (EX2 OR EX3 OR EX4)
||EX1|| No diagnosis of diabetes in any setting during 2 years before end of the measurement period
||AND| EX2| Diagnosis of `HEDIS Polycystic Ovaries` before end of the measurement period
||OR|  EX3| Diagnosis of Gestational Diabetes `HEDIS Diabetes Exclusions` during 24 months before end of measurement period
||OR|  EX4|   Diagnosis of steroid induced diabetes `HEDIS Diabetes Exclusions` during 24 months before end of measurement period
|**Denominator Exceptions**|||  None
|**Numerator**|||   N1 
||N1|| An LDL *result*  or `HEDIS LDL-C` of <1oo mg/dl during one year before period end
|**Numerator Exclusions**|||None|




