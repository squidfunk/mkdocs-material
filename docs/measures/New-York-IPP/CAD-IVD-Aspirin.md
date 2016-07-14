Status: Client-Ready
Author: Kelly O'Brien
CreateDate: 2016-02-04
ModifyDate: 2016-02-04
AAVersion: 4.9

#CAD/IVD Patients with Aspirin Use

| Attribute | Description |
| --------- | ----------- |
| **Official Name** | CAD/IVD Patients with Aspirin Use |
| **Long Display Name** | Coronary Artery Disease/Ischemic Vascular Disease: Aspirin Use |
| **Short Display Name** | CAD/IVD Aspirin |
| **Description** | The percentage of patients 18-75 years of age who had a diagnosis of obstructive or non-obstructive CAD or ischemic vascular disease and who are on aspirin or other antithrombolytic therapy. |
| **Purpose** | Treatment of coronary artery disease is aimed at controlling symptoms and slowing or stopping the progression of disease. |
| **Denominator** | Patient had one or more medical visits in the three years prior to the MP end date.<br>AND<br>Patient had an active diagnosis of obstructive or non-obstructive CAD or ischemic vascular disease at any point during the MP. |
| **Denominator Exclusions** | Patients with a history of bleeding disorder, allergy to aspirin or antithrombotic medication. |
| **Denominator Exceptions** | N/A |
| **Numerator** | Patients from denominator with documentation of an active order for aspirin or other antithrombolytic therapy. |
| **Numerator Exclusions** | N/A |
| **Grain** | Person |
| **Unit** | Percent |
| **Calculation** | (count of patients from the denominator who meet the numerator criteria) / (count of patients who meet the denominator criteria)<br><br>Remove patients from the denominator and numerator if they meet the *denominator exclusion* criteria. |
| **Notes** | N/A |


##Technical Criteria

| Component | Logic | Ref # | Criteria |
| --------- | ----- | ----- | -------- |
| **Denominator** | | | D1 AND D2 AND D3 |
| |  | D1 | Patient had one or more medical visits in the three years prior to the MP end date as indicated by CPT codes in Arcadia Custom CAD/IVD Denominator |
| | AND | D2 | Patient is 18-75 years of age |
| | AND | D3 | Patient had an active diagnosis of obstructive or non-obstructive CAD or IVD at any point during the MP as indicated by the Arcadia Custom CAD/IVD Denominator Value Set |
| | Value Sets | | D1: Arcadia Custom CAD/IVD Denominator<br>D2: Arcadia Custom CAD/IVD Denominator |
| **Denominator Exclusions** | | | EX1 |
| |  | EX1 | Patients with a history of bleeding disorder, allergy to aspirin or antithrombotic medication as indicated by the codes in the Arcadia Custom CAD/IVD Denominator Exclusions Value Set |
| | Value Sets | | EX1: Arcadia Custom CAD/IVD Denominator Exclusions |
| **Denominator Exceptions** | | | None |
| **Numerator** | | | N1 |
| |  | N1 | Patient has documentation of a new or existing ACTIVE order for aspirin or other antithrombolytic therapy, as indicated by the Arcadia Custom CAD/IVD Aspirin Value Set |
| | Value Sets | | N1: Arcadia Custom CAD/IVD Aspirin |
| **Numerator Exclusions** | | | None |
