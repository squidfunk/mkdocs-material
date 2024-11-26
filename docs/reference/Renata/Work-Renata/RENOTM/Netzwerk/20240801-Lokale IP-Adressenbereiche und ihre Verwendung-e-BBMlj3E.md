# Lokale IP-Adressenbereiche und ihre Verwendung



Lokale IP-Adressenbereiche sind für private Netzwerke reserviert und werden in internen Netzwerken verwendet. Diese Adressen werden nicht über das Internet geroutet und dienen dazu, Geräte innerhalb eines lokalen Netzwerks eindeutig zu identifizieren. Es gibt drei Hauptbereiche für private IP-Adressen, die von der Internet Assigned Numbers Authority (IANA) definiert wurden:

1. **10.0.0.0/8**
2. **172.16.0.0/12**
3. **192.168.0.0/16**

#### 1. 10.0.0.0/8

- **IP-Bereich**: 10.0.0.0 bis 10.255.255.255
- **Anzahl der Adressen**: 16.777.216
- **Beschreibung**: Dieser Bereich wird häufig in großen Unternehmensnetzwerken verwendet. Durch den großen Adressbereich können viele Subnetze innerhalb eines Unternehmens erstellt werden.

#### 2. 172.16.0.0/12

- **IP-Bereich**: 172.16.0.0 bis 172.31.255.255
- **Anzahl der Adressen**: 1.048.576
- **Beschreibung**: Dieser Bereich wird oft in mittleren bis großen Netzwerken verwendet. Der Adressbereich ermöglicht die Erstellung von vielen mittleren bis großen Subnetzen.

#### 3. 192.168.0.0/16

- **IP-Bereich**: 192.168.0.0 bis 192.168.255.255
- **Anzahl der Adressen**: 65.536
- **Beschreibung**: Dieser Bereich ist der am häufigsten verwendete Adressbereich für Heimnetzwerke und kleine Unternehmensnetzwerke. Router in Heimnetzwerken verwenden oft Adressen aus diesem Bereich, um Geräte wie Computer, Smartphones und Drucker zu adressieren.

### Erklärung der Adressbereiche

- **10.0.0.0/8**: Dies ist der größte private Adressbereich, der 16.777.216 IP-Adressen umfasst. Er wird oft in sehr großen Netzwerken verwendet, wie z.B. in großen Unternehmen oder Universitäten, die viele Subnetze und Geräte haben.

- **172.16.0.0/12**: Dieser Adressbereich umfasst 1.048.576 IP-Adressen und bietet eine gute Balance zwischen der Anzahl der verfügbaren Adressen und der Subnetzverwaltung. Er wird häufig in mittleren bis großen Unternehmensnetzwerken verwendet.

- **192.168.0.0/16**: Mit 65.536 IP-Adressen ist dies der kleinste private Adressbereich, der jedoch immer noch groß genug für die meisten Heimnetzwerke und kleine Unternehmen ist. Router in diesen Netzwerken sind oft vorkonfiguriert, um Adressen in diesem Bereich zu verwenden, was die Einrichtung und Verwaltung vereinfacht.

### Verwendung von privaten IP-Adressen

Private IP-Adressen ermöglichen es Netzwerken, eine große Anzahl von Geräten zu verbinden, ohne dass jedem Gerät eine öffentliche IP-Adresse zugewiesen werden muss. Das spart IP-Adressraum und bietet zusätzlich Sicherheitsvorteile, da Geräte mit privaten IP-Adressen nicht direkt aus dem Internet erreichbar sind.

#### Beispiele für die Verwendung:

- **Heimnetzwerke**: Router in Heimnetzwerken verwenden häufig den Bereich 192.168.0.0/16, um Geräten wie Computern, Smartphones und Druckern IP-Adressen zuzuweisen.
- **Büroumgebungen**: Mittlere und große Unternehmen verwenden oft den Bereich 172.16.0.0/12, um verschiedene Abteilungen oder Gebäude zu subnetzieren und die Netzwerkverwaltung zu erleichtern.
- **Große Organisationen**: Universitäten und sehr große Unternehmen nutzen oft den Bereich 10.0.0.0/8, um eine große Anzahl von Subnetzen und Geräten zu verwalten.

Diese privaten Adressbereiche sind für den internen Gebrauch in Netzwerken reserviert und können wiederverwendet werden, da sie nicht im öffentlichen Internet geroutet werden.