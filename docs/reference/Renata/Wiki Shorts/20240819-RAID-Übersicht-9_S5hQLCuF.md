# RAID-Übersicht


## RAID-Level 0: Striping
- Daten werden auf zwei oder mehr Festplatten aufgeteilt, was die Leistung verbessert, aber keine Redundanz bietet.

## RAID-Level 1: Spiegelung
- Daten werden identisch auf zwei oder mehr Festplatten kopiert, was Redundanz bietet.

## RAID-Level 5: Striping mit Parität
- Daten und Parität (Fehlerprüfung) werden über drei oder mehr Festplatten verteilt, was ein Gleichgewicht zwischen Leistung und Redundanz bietet.

## RAID-Level 6: Striping mit doppelter Parität
- Ähnlich wie RAID 5, aber mit einem zusätzlichen Paritätsblock, was den Ausfall von zwei Festplatten erlaubt.

## RAID-Level 10: Gespiegeltes Striping (RAID 1+0)
- Kombiniert RAID 1 und RAID 0, indem Daten über gespiegelte Paare gestriped werden, was sowohl Redundanz als auch Leistung bietet.
