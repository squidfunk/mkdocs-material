


# Timeliness of Postpartum Care



| Attribute | Description |
|----------------------------------------|---------------------------------------------------------------------------------------------------------------|
| **Name** | Timeliness of Postpartum Care |
| **Display Name** | Timeliness of Postpartum Care |
| **Display Short Name** | Postpartum Care |
| **Description** | The percentage of deliveries of live births between November 6 of the year prior to the measurement year and November 5 of the measurement year. For these women, the measure assesses The percentage of deliveries that had a postpartum visit on or between 21 and 56 days after delivery. |
| **Source/Code** | Hedis 2016 Physician Measurement |
| **Target** | 71% |
| **Purpose** | The postpartum care (PPC) visit is an important opportunity to assess the physical and psychosocial health of the mother [1]. The American Academy of Pediatrics (AAP) and the American College of Obstetricians and Gynecologists (ACOG) recommend that women, regardless of age, seek postpartum care between 4 and 6 weeks after childbirth [2]. The postpartum care visit may be utilized to counsel mothers on infant care and family planning, encourage breastfeeding, identify and treat medical conditions common to the postpartum period, and manage preexisting or emerging chronic conditions [2]. Despite the known benefits of the PPC visit, there are many access and utilization barriers to care [3]. As a result, Healthy People 2020 aims to increase the proportion of women, across demographic and socioeconomic boundaries, who attend a PPC visit after giving birth, thereby highlighting postpartum care as a national priority to promote the health of women and children [4]. Jessica N. DiBari, Stella M. Yu, Shin M. Chao, and Michael C. Lu, “Use of Postpartum Care: Predictors and Barriers,” Journal of Pregnancy, vol. 2014, Article ID 530769, 8 pages, 2014. doi:10.1155/2014/530769 http://www.hindawi.com/journals/jp/2014/530769/ |
| **Measurement Period (MP)** | The measure is calculated for a selected period of time, defined by:<ul><li>Selected MP End Date: The last day of the selected measurement period</li><li> Selected MP Start Date: One year prior to the MP end date </li></ul>|
| **Denominator** | All deliveries between November 6th of the year prior the measurement period to November 5th of the year of the measurement period  
|**Denominator Exclusions**|None|
|**Denominator Exceptions**|None|
|**Numerator**|A postpartum visit for a pelvic exam or postpartum care on or between 21 and 56 days after delivery |
|**Numerator Exclusion**|None|
|**Grain**|Delivery|
|**Unit**|Percent**|
|**Notes**|Based on HEDIS 2016 Physician Measurement measure. However, measure does not use the "Prenatal Bundled Services" Value Set, as the pregnancy onset date cannot be determined.|


**Criteria**


|Component|Logic|Ref #|Criteria|
|---------|-----|-------|--------|
|**Denominator**| | | D1 AND D2 AND D3 |
| | | D1 | A claim or encounter occurring between 56 days before period start and 309 days after period start |
| | AND | D2 | Gender is female |
| | AND | D3 | A live birth occurring between 56 days before period start and 309 days after period start |
| | AND | D4 | Baby is alive at time of delivery |
| |  Value Sets | | D3: Hedis 2016 Deliveries <br> D4: Hedis 2016 Non-live births|
|**Denominator Exclusions**| | | None |
|**Denominator Exceptions**| | | None |
|**Numerator**| | | N1 |
| | | N1 | A postpartum visit for a pelvic exam or postpartum care on or between 21 and 56 days after delivery. |
| | Value Sets | | N1: Hedis 2016 Postpartum Visits, Hedis 2016 Cervical Cytology  |
|**Numerator Exclusions**| | | None |