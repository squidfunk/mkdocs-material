


# Effective Contraceptive Use



| Attribute | Description |
|----------------------------------------|---------------------------------------------------------------------------------------------------------------|
| **Name** | Effective Contraceptive Use |
| **Display Name** | Effective Contraceptive Use |
| **Display Short Name** | Effective Contraceptive Use |
| **Description** | Females aged 15 to 50 who used one of the following forms of contraception during the measurement period: sterilization, IUD, implant, contraception injection, contraceptive pills, patch, ring, or diaphragm  |
| **Source/Code** | http://www.oregon.gov/oha/analytics/CCOData/Effective%20Contraceptive%20Use%20-%202016%20(revised%20Nov%202015).pdf   |
| **Target** | 50% |
| **Purpose** | The contraceptive prevalence rate, which serves as a proxy measure of access to reproductive health services, can be used for tracking progress towards the target of achieving universal access to reproductive health, especially when the indicator is considered in conjunction with information about women’s knowledge of family planning or accessibility, and the quality of family planning services. Contraceptive prevalence rate is an indicator of health, population, development and women's empowerment. It also serves as a proxy measure of access to reproductive health services that are essential for meeting many of the Millennium Development Goals (MDG)s, especially the child mortality, maternal health HIV/AIDS, and gender related goals. |
| **Measurement Period (MP)** | The measure is calculated for a selected period of time, defined by:<ul><li>Selected MP End Date: The last day of the selected measurement period</li><li> Selected MP Start Date: One year prior to the MP end date </li></ul>|
| **Denominator** | Females aged 15 to 50   
|**Denominator Exclusions**|Individuals with evidence of any of the following: Hysterectomy, Bilateral Oophorectomy and Menopause|
|**Denominator Exceptions**|Women who were pregnant during the measurement period|
|**Numerator**|Individuals with evidence of using one of the following forms of contraception during the measurement period: sterilization, IUD, implant, contraception injection, contraceptive pills, patch, ring, or diaphragm |
|**Numerator Exclusion**|None|
|**Grain**|Patient|
|**Unit**|Percent|
|**Notes**|2 age stratification's will be reported. Ages 15 to 17 and ages 18 to 50. The following are considered effective contraception: sterilization, IUD, implant, contraception injection, contraceptive pills, patch, ring, or diaphragm.|


# Criteria for ages 15 to 17


|Component|Logic|Ref #|Criteria|
|---------|-----|-------|--------|
|**Denominator**| | | D1 AND D2 |
| | | D1 | Age between 15 and 17 at measurement period end |
| | AND | D2 | Gender is female |
| |  Value Sets | |None  |
|**Denominator Exclusions**| | | Ex1 OR Ex2 OR Ex3 |
| | | Ex1 | Evidence of Hysterectomy before measurement period end |
| |OR | Ex2 | Evidence of Oophorectomy before measurement period end |
| |OR | Ex3 | Evidence of Menopause before measurement period end |
| |  Value Sets | |Ex1, 2 and 3: CCO Contraceptive Exclusions Value Set  |
|**Denominator Exceptions**| | |Ec1 |
| | | Ec1 | Evidence of pregnancy during the measurement period|
| |  Value Sets | |Ec1: CCO Pregnancy Diagnosis Value Set  |
|**Numerator**| | | N1 |
| | | N1 | Received a contraceptive during the measurement period |
| | Value Sets | |N1: CCO Contraceptive Value Set, Custom Arcadia Effective Contraceptive |
|**Numerator Exclusions**| | | None |

# Criteria for ages 18 to 50


|Component|Logic|Ref #|Criteria|
|---------|-----|-------|--------|
|**Denominator**| | | D1 AND D2 |
| | | D1 | Age between 18 and 50 at measurement period end |
| | AND | D2 | Gender is female |
| |  Value Sets | |None  |
|**Denominator Exclusions**| | | Ex1 OR Ex2 OR Ex3 |
| | | Ex1 | Evidence of Hysterectomy before measurement period end |
| |OR | Ex2 | Evidence of Oophorectomy before measurement period end |
| |OR | Ex3 | Evidence of Menopause before measurement period end |
| |  Value Sets | |Ex1, 2 and 3: CCO Contraceptive Exclusions Value Set  |
|**Denominator Exceptions**| | |Ec1 |
| | | Ec1 | Evidence of pregnancy during the measurement period|
| |  Value Sets | |Ec1: CCO Pregnancy Diagnosis Value Set  |
|**Numerator**| | | N1 |
| | | N1 | Received a contraceptive during the measurement period |
| | Value Sets | |N1: CCO Contraceptive Value Set, Custom Arcadia Effective Contraceptive |
|**Numerator Exclusions**| | | None |