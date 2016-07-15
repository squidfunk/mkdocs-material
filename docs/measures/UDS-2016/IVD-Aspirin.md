Status: Client-Ready
Author: Bill Baranowski
CreateDate: 2016-04-13
ModifyDate: 2016-04-13
AAVersion: 4.10

#Ischemic Vascular Disease (IVD): Use of Aspirin or Another Antithrombotic (CMS164v4)

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | Ischemic Vascular Disease (IVD): Use of Aspirin or Another Antithrombotic (CMS164v4) |
| **Long Display Name** | Ischemic Vascular Disease (IVD): Use of Aspirin or Another Antithrombotic (CMS164v4) |
| **Short Display Name** | IVD Aspirin |
| **Source** | CMS (https://www.cms.gov/Regulations-and-Guidance/Legislation/EHRIncentivePrograms/Downloads/eCQM_2014_EP_June2015.zip) |
| **Description** | Percentage of patients 18 years of age and older who were discharged alive for acute myocardial infarction (AMI), coronary artery bypass graft (CABG) or percutaneous coronary interventions (PCI) in the 12 months prior to the measurement period, or who had an active diagnosis of ischemic vascular disease (IVD) during the measurement period, and who had documentation of use of aspirin or another antithrombotic during the measurement period. |
| **Purpose** | Coronary heart disease (CHD) is a major cause of death in the United States - in 2004, it was an underlying or contributing cause of death for 451,300 people (1 of every 5 deaths). Acute myocardial infarction (AMI) was an underlying or contributing cause of death for 156,000 people (American Heart Association 2008). In addition, nearly 16 million people (or 7.3 percent of the American population) had CHD in 2005 (American Heart Association 2008). The cost of cardiovascular diseases and stroke in the United States for 2008 was estimated at $448.5 billion (American Heart Association 2008). This figure includes health expenditures (direct costs such as the cost of physicians and healthcare practitioners, hospital and nursing home services, medications, home health care and other medical durables) and lost productivity resulting from morbidity and mortality (indirect costs). AMI accounts for 18 percent of hospital discharges and 28 percent of deaths due to heart disease (National Heart, Lung, and Blood Institute 2000). Research has shown that costs associated with cardiovascular disease for hospitals are easily $156 billion (American Heart Association 2008).<br><br>Aspirin treatments reduce MI in men (127 events per 100,000 person-years) and women (17 events per 100,000 person-years) (Grieving et al. 2008). While studies have shown warfarin to be more effective, aspirin is a safer, more convenient, and less expensive form of therapy (Patrono et al. 2004). Aspirin therapy has been shown to directly reduce the odds of cardiovascular events among men by 14 percent and among women by 12 percent (Berger et al. 2006). Aspirin use has been shown to reduce the number of strokes by 20 percent, MI by 30 percent, and other vascular events by 30 percent (Weisman and Graham 2002). |
| **Target** | 50% (configurable by client)% (configurable by client) |
| **Target Source** | Arcadia Default |
| **Denominator** | Patients 18 years of age and older with a visit during the measurement period, and an active diagnosis of ischemic vascular disease (IVD) or who were discharged alive for acute myocardial infarction (AMI), coronary artery bypass graft (CABG), or percutaneous coronary interventions (PCI) in the 12 months prior to the measurement period. |
| **Denominator Exclusions** | N/A |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients who have documentation of use of aspirin or another antithrombotic during the measurement period. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria) |
| **Notes** | This measure does not use the VSAC Face-to-Face Interaction or Annual Wellness Visit value sets for criteria D2 because the product does not currently support SNOMEDCT or HCPCS. |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND (D3 OR D4 OR D5 OR D6) |
| |  | D1 | Patient is at least 18 years of age as of the period start date. |
| | AND | D2 | Patient had an eligible encounter during the period. |
| | AND | D3 | Patient had a diagnosis of ischemic vascular disease active during the period. |
| | OR | D4 | Patient had a diagnosis of acute myocardial infarction during the year prior to the period. |
| | OR | D5 | Patient had a percutaneous coronary intervention during the year prior to the period. |
| | OR | D6 | Patient had a coronary artery bypass graft during the year prior to the period. |
| | Value Sets | | D2: VSAC Office Visit; VSAC Preventive Care Services - Established Office Visit, 18 and Up; VSAC Preventive Care Services-Initial Office Visit, 18 and Up; VSAC Home Healthcare Services<br>D3: VSAC Ischemic Vascular Disease<br>D4: VSAC Acute Myocardial Infarction<br>D5: VSAC Percutaneous Coronary Interventions<br>D6: VSAC Coronary Artery Bypass Graft |
| **Denominator Exclusions** | | | None |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | Patient had a prescription of aspirin or another antithrombotic active during the period. |
| | Value Sets | | N1: VSAC Aspirin and Other Anti-thrombotics |
| **Numerator Exclusions** | | | None |
