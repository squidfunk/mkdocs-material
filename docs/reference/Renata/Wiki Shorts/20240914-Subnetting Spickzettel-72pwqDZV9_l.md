# Subnetting Spickzettel



## 1. Grundlegende Konzepte des Subnettings

- **Subnetting:**
  Der Prozess der Aufteilung eines großen Netzwerks in kleinere, effizientere Subnetze. Subnetting hilft, die Netzwerkleistung zu verbessern und die Sicherheit zu erhöhen.

- **Subnetzmaske:**
  Eine 32-Bit-Nummer, die verwendet wird, um den Netzwerk- und Hostanteil einer IP-Adresse zu identifizieren (z.B. `255.255.255.0`).

- **CIDR (Classless Inter-Domain Routing) Notation:**
  Eine Methode zur Darstellung von IP-Adressen und Subnetzmasken, die flexibler ist als die alte Klasseneinteilung (z.B. `192.168.1.0/24`).

## 2. Häufig verwendete Subnetzmasken und CIDR

| CIDR       | Subnetzmaske        | Anzahl der Hosts | Beschreibung                          |
|------------|---------------------|------------------|---------------------------------------|
| /8         | 255.0.0.0           | 16.777.214       | Sehr großes Netzwerk (z.B. Klasse A)  |
| /16        | 255.255.0.0         | 65.534           | Mittelgroßes Netzwerk (z.B. Klasse B) |
| /24        | 255.255.255.0       | 254              | Kleines Netzwerk (z.B. Klasse C)      |
| /30        | 255.255.255.252     | 2                | Punkt-zu-Punkt-Verbindung             |

## 3. Subnetzberechnung

- **Netzwerkadresse:**
  Die erste IP-Adresse eines Subnetzes, die das Netzwerk repräsentiert (z.B. `192.168.1.0` bei einem `/24`-Subnetz).

- **Broadcast-Adresse:**
  Die letzte IP-Adresse eines Subnetzes, die verwendet wird, um alle Geräte in diesem Subnetz zu erreichen (z.B. `192.168.1.255` bei einem `/24`-Subnetz).

- **Anzahl der Hosts:**
  Berechnet durch die Formel `2^(32 - Subnetzbits) - 2`. Beispiel: Für ein `/24`-Subnetz sind `2^(32 - 24) - 2 = 254` Hosts möglich.

## 4. Subnetzwerk-Tools und Befehle

- **IP-Adresse und Subnetzmaske anzeigen:**
  ```bash
  ip a
  ```

- **Subnetzberechnungen durchführen (Linux):**
  Verwenden Sie `ipcalc`, ein Tool, das IP-Adressinformationen und Subnetzdetails bereitstellt.
  ```bash
  ipcalc 192.168.1.0/24
  ```

- **Subnetzmaske umwandeln:**
  Subnetzmasken von CIDR-Notation zu Dezimal umrechnen und umgekehrt:
  - /24 zu `255.255.255.0`
  - /16 zu `255.255.0.0`

## 5. Nützliche Tipps für das Subnetting

- **Planen Sie Subnetze basierend auf Netzwerkgröße und Sicherheitsanforderungen.**
- **Verwenden Sie Subnetzmasken, die Ihre Netzwerkanforderungen optimal erfüllen.**
- **Berücksichtigen Sie zukünftiges Wachstum bei der Erstellung von Subnetzplänen.**
