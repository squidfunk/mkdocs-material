#Developmental Screening in the First Three Years of Life

|Attribute|Description|
|---------|-----------|
|**Display Name**|Developmental Screening for One-Year-Olds, Developmental Screening for Two-Year-Olds, Developmental Screening for Three-Year-Olds, Developmental Screening in the First Three Years of Life*|
|**Display Short Name**|Development Screen - 1yo, Development Screen - 2yo, Development Screen - 3yo, Development Screen - Combined*|
|**Description**|Percentage of children screened for risk of developmental, behavioral, and social delays using a standardized screening tool in the 12 months preceding their first, second, or third birthday.|
|**Source**|2016 Reporting Year http://www.oregon.gov/oha/analytics/Pages/CCO-Baseline-Data.aspx : Developmental Screening - 2016.pdf; based on NCQA/CAHMI measure http://www.medicaid.gov/Medicaid-CHIP-Program-Information/By-Topics/Quality-of-Care/Downloads/Medicaid-and-CHIP-Child-Core-Set-Manual.pdf pg. 72|
|**Purpose**| Research shows that the most reliable and valid approach to identify children at risk for delays is to implement a standardized developmental screening tool. Early identification of developmental disorders is critical to the well-being of children and their families. Early identification should lead to further evaluation, diagnosis, and treatment. |
|**Target**|50%|
|**Measurement Period (MP)**| The measure is calculated for a selected period of time, defined by:<ul><li>Selected MP End Date: The last day of the selected measurement period</li><li> Selected MP Start Date: One year prior to the MP end date </li></ul>
|**Denominator**|Children who turned 1, 2, or 3 years of age during the measurement period.*|
|**Denominator Exclusions**|None|
|**Denominator Exceptions**|None|
|**Numerator**|Children who were screened for risk of developmental, behavioral, and social delays using a standardized screening tool during the 12 months before their birthday in the measurement year.|
|**Numerator Exclusion**|None|
|**Grain**|Person|
|**Unit**|Percent|
|**Notes**|*Four different rates are reported:<br>1) One for children who turned 1<br>2) One for children who turned 2<br>3) One for children who turned 3<br>4) And one for children who turned 1, 2, or 3.<br><br>Known issue: this measure looks for the screening AFTER OR ON the previous birthday and BEFORE the birthday that occurred during the measurement year. The source document says the developmental screening must happen AFTER the previous birthday and BEFORE OR ON the birthday that occurred during the measurement year.<br><br>The following tools are cited by Bright Futures (and the American Academy of Pediatrics statement on developmental screening) and meet the criteria:<br>• Ages and Stages Questionnaire (ASQ) - 2 months to 5 years<br>• Ages and Stages Questionnaire - 3rd Edition (ASQ-3)<br>Battelle Developmental Inventory Screening Tool (BDI-ST) – Birth to 95 months<br>• Bayley Infant Neuro-developmental Screen (BINS) - 3 months to 2 years<br>• Brigance Screens-II – Birth to 90 months<br>• Child Development Inventory (CDI) - 18 months to 6 years<br>• Infant Development Inventory – Birth to 18 months<br>• Parents’ Evaluation of Developmental Status (PEDS) – Birth to 8 years<br>• Parent’s Evaluation of Developmental Status - Developmental Milestones (PEDS-DM)<br><br>Note that standardized tools specifically focused on one domain of development, e.g. child’s socio-emotional development (ASQ-SE) or autism (M-CHAT), are NOT included. |


##Criteria

|Component|Logic|Ref #|Criteria|
|---------|-----|-------|--------|
|**Denominator**| | | D1 |
| | | D1 | Patient turned 1, 2, or 3 during the measurement period* |
| | Value Sets | | None |
|**Denominator Exclusions**| | | None |
|**Denominator Exceptions**| | | None |
|**Numerator**| | | N1 |
| | | N1 | Patient was screened for risk of developmental, behavioral, and social delays using a standardized screening tool during the 12 months before their birthday in the measurement year |
| | Value Sets | | N1: CPT 96110 (developmental screening with scoring and documentation, per standardized instrument); Arcadia Custom Developmental Screening Value Set |
|**Numerator Exclusions**| | | None |
