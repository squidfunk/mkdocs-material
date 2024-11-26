# Drei Hauptbereiche für NAT/Locale IP-Adressen

In lokalen Netzwerken gibt es drei Hauptbereiche für private IP-Adressen, die jeweils eine bestimmte Anzahl von Adressen bereitstellen. Hier ist eine detaillierte Erklärung, wie viele Adressen in jedem Bereich verfügbar sind und wie sie genutzt werden können:

### 1. 10.0.0.0/8

- **IP-Bereich**: 10.0.0.0 bis 10.255.255.255
- **Anzahl der Adressen**: 16.777.216 Adressen
- **Verwendung**: Dieser große Adressbereich wird oft in großen Unternehmensnetzwerken verwendet. Er ermöglicht die Erstellung vieler Subnetze und die Verwaltung einer großen Anzahl von Geräten.

### 2. 172.16.0.0/12

- **IP-Bereich**: 172.16.0.0 bis 172.31.255.255
- **Anzahl der Adressen**: 1.048.576 Adressen
- **Verwendung**: Dieser Bereich ist ideal für mittlere bis große Netzwerke. Er bietet ausreichend Adressen für mehrere mittlere bis große Subnetze und wird häufig in Campus-Netzwerken oder größeren Büroumgebungen eingesetzt.

### 3. 192.168.0.0/16

- **IP-Bereich**: 192.168.0.0 bis 192.168.255.255
- **Anzahl der Adressen**: 65.536 Adressen
- **Verwendung**: Dieser Adressbereich wird häufig in Heimnetzwerken und kleinen Unternehmensnetzwerken verwendet. Router für Heimnetzwerke sind oft vorkonfiguriert, Adressen aus diesem Bereich zu verwenden.

### Details zur Nutzung pro Bereich

#### 10.0.0.0/8
- **Netzwerkgröße**: Sehr groß, geeignet für große Organisationen mit vielen Abteilungen und Geräten.
- **Typische Subnetzmasken**: 
  - /8 (255.0.0.0): Ein riesiges Netz mit 16.777.214 nutzbaren IP-Adressen.
  - /16 (255.255.0.0): 256 Subnetze mit jeweils 65.534 nutzbaren Adressen.
  - /24 (255.255.255.0): 65.536 Subnetze mit jeweils 254 nutzbaren Adressen.

#### 172.16.0.0/12
- **Netzwerkgröße**: Groß, geeignet für mittlere bis große Netzwerke.
- **Typische Subnetzmasken**: 
  - /12 (255.240.0.0): Ein großes Netz mit 1.048.574 nutzbaren IP-Adressen.
  - /16 (255.255.0.0): 16 Subnetze mit jeweils 65.534 nutzbaren Adressen.
  - /24 (255.255.255.0): 4.096 Subnetze mit jeweils 254 nutzbaren Adressen.

#### 192.168.0.0/16
- **Netzwerkgröße**: Klein bis mittel, ideal für Heimnetzwerke und kleine Unternehmen.
- **Typische Subnetzmasken**: 
  - /16 (255.255.0.0): Ein Netz mit 65.534 nutzbaren IP-Adressen.
  - /24 (255.255.255.0): 256 Subnetze mit jeweils 254 nutzbaren Adressen.
  - /28 (255.255.255.240): 4.096 Subnetze mit jeweils 14 nutzbaren Adressen (für sehr kleine Netzwerke oder spezielle Zwecke).

### Beispiel für die Verwendung des Bereichs 10.0.0.0/24

Wenn ihr ausschließlich den Bereich 10.0.0.0/24 verwendet, stehen euch folgende Details zur Verfügung:
- **IP-Bereich**: 10.0.0.0 bis 10.0.0.255
- **Anzahl der nutzbaren Adressen**: 254 Adressen (10.0.0.1 bis 10.0.0.254)
- **Subnetzmaske**: 255.255.255.0
- **Verwendung**: Dies ist ein typischer Subnetzbereich für kleine bis mittlere Netzwerke, geeignet für bis zu 254 Geräte.

### Manuelle Konfiguration in einem Netzwerk ohne Router

Wenn ihr die IP-Adressen manuell zuweist, kannst du den Bereich 10.0.0.0/24 folgendermaßen nutzen:

1. **Netzwerk konfigurieren**:
   - Stelle sicher, dass alle Geräte eine eindeutige IP-Adresse im Bereich 10.0.0.1 bis 10.0.0.254 haben.
   - Verwende die Subnetzmaske 255.255.255.0 für alle Geräte.

2. **IP-Adressen manuell zuweisen**:
   - Beispiel:
     - Gerät 1: IP-Adresse 10.0.0.1, Subnetzmaske 255.255.255.0
     - Gerät 2: IP-Adresse 10.0.0.2, Subnetzmaske 255.255.255.0
     - Und so weiter bis Gerät 254: IP-Adresse 10.0.0.254, Subnetzmaske 255.255.255.0

3. **Standard-Gateway und DNS-Server**:
   - Falls benötigt, richte den Layer-3-Switch oder einen anderen Server als Standard-Gateway ein (z.B. 10.0.0.1).
   - Gib die DNS-Server-Adressen an (z.B. 8.8.8.8 für Google DNS).

### Fazit

Durch die manuelle Zuweisung von IP-Adressen in einem Netzwerk mit einem Layer-3-Switch kannst du sicherstellen, dass alle Geräte korrekt kommunizieren und die Netzwerkressourcen effizient genutzt werden. Der Bereich 10.0.0.0/24 bietet genügend Adressen für kleine bis mittlere Netzwerke und ermöglicht eine einfache Verwaltung der IP-Adressen.