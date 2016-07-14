Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-02-04
ModifyDate: 2016-02-04
AAVersion: 4.9

#Adolescent Preventive Care

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Adolescent Preventive Care |
| **Long Display Name** | Adolescent Preventive Care |
| **Short Display Name** | Adolescent Prev Care |
| **Description** | Percentage of adolescents ages 12 to 17 who received assessment or counseling or education on risk behaviors and preventive actions associated with sexual activity, tobacco use, substance use, and assessment or counseling or education for depression. |
| **Purpose** | Health behaviors, such as alcohol use and drunk driving, sexual activity, depression, suicide, smoking, violence, and guns are the primary causes of morbidity and mortality among adolescents. Preventive counseling and screening on these and other health risk topics are the centerpiece of adolescent preventive services guidelines. |
| **Denominator** | Patient is 12 - 17 years of age and had one or more medical visits in the three years prior to the MP end date.<br>AND<br>Patients had an encounter with a PCP or OB/Gyn within the MP. |
| **Denominator Exclusions** | N/A |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients from denominator with documented assessment or counseling of ALL of the following:<br>-Sexual Activity<br>-Depression<br>-Tobacco<br>-Substance abuse<br>Counseling does not all have to be from the same visit - as long as all 4 are completed with the MP the patient can be included in the numerator. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria) |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 |
| |  | D1 | Patient had one or more medical visits in the three years prior to the MP end date |
| | AND | D2 | Patient is 12-17 years of age as of the last day of the measurement period |
| | AND | D3 | Patient had an encounter within the MP with either a PCP or an OB/Gyn |
| **Denominator Exclusions** | | | None |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 AND N2 AND N3 AND N4 |
| |  | N1 | Patient received counseling related to sexual activity during the MP, as indicated by the codes in Arcadia Custom Sexual Counseling Numerator Value Set |
| | AND | N2 | Patient received counseling related Depression during the MP, as indicated by the codes in Arcadia Custom Depression Counseling Numerator Value Set |
| | AND | N3 | Patient received counseling related to Tobacco during the MP, as indicated by the codes in Arcadia Custom Tobacco Counseling Numerator Value Set |
| | AND | N4 | Patient received counseling related to Substance Abuse during the MP, as indicated by the codes in Arcadia Custom Substance Abuse Counseling Numerator Value Set |
| | Value Sets | | N1: Arcadia Custom Sexual Counseling Numerator<br>N2: Arcadia Custom Depression Counseling Numerator<br>N3: Arcadia Custom Tobacco Counseling Numerator<br>N4: Arcadia Custom Substance Abuse Counseling Numerator |
| **Numerator Exclusions** | | | None |
