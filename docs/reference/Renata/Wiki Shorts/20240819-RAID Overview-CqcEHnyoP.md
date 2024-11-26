# RAID Overview

## RAID Level 0: Striping
- Data is split across two or more disks, improving performance but offering no redundancy.

## RAID Level 1: Mirroring
- Data is copied identically to two or more disks, providing redundancy.

## RAID Level 5: Striping with Parity
- Data and parity (error checking) are striped across three or more disks, offering a balance between performance and redundancy.

## RAID Level 6: Striping with Double Parity
- Similar to RAID 5 but with an additional parity block, allowing for two disk failures.

## RAID Level 10: Striped Mirroring (RAID 1+0)
- Combines RAID 1 and RAID 0 by striping data across mirrored pairs, offering both redundancy and performance.
