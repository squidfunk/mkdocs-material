

# Timeliness of Prenatal Care



| Attribute | Description |
|----------------------------------------|---------------------------------------------------------------------------------------------------------------|
| **Name** | Timeliness of Prenatal Care |
| **Display Name** | Timeliness of Prenatal Care |
| **Display Short Name** | Prenatal Care |
| **Description** | The percentage of deliveries of live births between November 6 of the year prior to the measurement year and November 5 of the measurement year. For these women, the measure assesses the percentage of deliveries that received a prenatal care visit in the first trimester |
| **Source/Code** | Hedis 2016 Physician Measurement |
| **Target** | 93% |
| **Purpose** | Prenatal care is important for the health of both the mother and the baby. Mothers who do not receive any prenatal care are three times more likely to deliver a low birth weight baby than mothers who received prenatal care, and infant mortality is five times higher.<br> <br>During prenatal care, health care providers monitor the health of the mother and baby and identify and treat health conditions and issues that could impact the pregnancy. It is also an important time for providers to educate mothers on a variety of health issues related to pregnancy, such as smoking, alcohol use, exercise, nutrition, preparing for childbirth, and infant care and feeding.|
| **Measurement Period (MP)** | The measure is calculated for a selected period of time, defined by:<ul><li>Selected MP End Date: The last day of the selected measurement period</li><li> Selected MP Start Date: One year prior to the MP end date </li></ul>|
| **Denominator** | All deliveries between November 6th of the year prior the measurement period to November 5th of the year of the measurement period 
|**Denominator Exclusions**|None|
|**Denominator Exceptions**|None|
|**Numerator**|A prenatal visit in the first trimester. |
|**Numerator Exclusion**|None|
|**Grain**|Delivery|
|**Unit**|Percent**|
|**Notes**|Based on HEDIS 2016 Physician Measurement measure. However, measure does not use the "Prenatal Bundled Services" Value Set, as the pregnancy onset date cannot be determined. |


###**Criteria**


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
| | | N1 | A stand alone prenatal visit in the first trimester of pregnancy (176–280 days prior to delivery) |
| |OR| N2 | A prenatal visit with a fetal ultrasound in the first trimester of pregnancy (176–280 days prior to delivery) |
| |OR| N3 | A prenatal visit with a diagnosis of pregnancy in the first trimester of pregnancy (176–280 days prior to delivery) |
| | Value Sets | | N1: Hedis 2016 Stand Alone Prenatal Visits, <br> N2: Hedis 2016 Prenatal Visits **WITH**  Hedis 2016 Prenatal Ultrasound <br> N3: Hedis 2016 Prenatal Visits **WITH** Hedis 2016 Pregnancy Diagnosis |
|**Numerator Exclusions**| | | None |