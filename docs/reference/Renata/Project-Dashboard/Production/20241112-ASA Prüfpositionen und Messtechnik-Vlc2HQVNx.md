# ASA Prüfpositionen und Messtechnik


## 1. Batterieprüfprozess MQTT

Die Ableiter-Schweiss-Anlage (ASA) führt 20 automatisierte Prüfungen an jeder Batterie durch. Jede Prüfung hat spezifische Zwecke, Grenzwerte und Qualitätsauswirkungen. Dieses Dokument erläutert jede Position im Detail.

## 2. Übersicht der Prüfsequenz

### 2.1 Ablaufsequenz
```plaintext
┌─────────────────┐
│ Station 2       │
├─────────────────┤         ┌─────────────────┐         ┌─────────────────┐
│ - DMC Lesung    │    →    │ Station 8       │    →    │ Station 10      │
│ - Initialkontrolle│       │ - Dicke         │         │ - Schweißung    │
│ - Elektrisch    │         │ - Höhe          │         │ - Positionierung │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

### 2.2 Zeitsequenz (aus realer Nachricht)
```plaintext
Start: DMC Prüfung   (0ms)      → inspection1
↓
Mechanische Prüfungen (+4.075ms) → inspection2-14
↓
Schweißprüfung      (+5.792ms)   → spezifische Prüfungen
↓
Elektrische Tests   (+22.417ms)  → inspection15-18
```

## 3. Detaillierte Positionsanalyse

### 3.1 Position 1: Datamatrix Code (DMC) Qualität
```json
"inspection1": {
    "limitMax": 0,
    "limitMin": 0,
    "value": 0,
    "uom": "%",
    "result": true,
    "timestamp": 1730999366405
}
```
**Zweck**: Validiert die Lesbarkeitsqualität der DMC-Markierung.
- **Standort**: Station 2 (KSR St.2)
- **Bedeutung**: Kritisch für die Rückverfolgbarkeit
- **Typische Werte**: Nur Bestanden/Nicht bestanden (dargestellt als 0/100%)
- **Häufige Probleme**: Schlechter Kontrast, beschädigte Codes

### 3.2 Position 2: Batteriedicke
```json
"inspection2": {
    "limitMax": 1,87,
    "limitMin": 1,67,
    "value": 1,846,
    "uom": "mm",
    "result": true,
    "timestamp": 1730999370480
}
```
**Zweck**: Sichert korrekte Batteriemontagedicke.
- **Standort**: Station 8 (KSR St.8)
- **Messpunkt**: Batteriemitte
- **Kritische Dimensionen**: 
  - Zielwert: 1,77mm ±0,10mm
  - Beispielwert: 1,846mm (innerhalb Spezifikation)
- **Qualitätsauswirkungen**: 
  - Zu dick: Montageproblem
  - Zu dünn: Möglicherweise fehlendes Bauteil

### 3.3-3.8 Schweißpunkt-Qualitätsprüfungen
```json
"inspection3": {
    "limitMax": 80,
    "limitMin": 5,
    "value": 11,
    "uom": "%px",
    "result": true,
    "timestamp": 1730999372197
},
// ... (Prüfungen 4-8 folgen ähnlichem Muster)
```
**Zweck**: Optische Prüfung der Schweißpunkte
- **Standort**: Station 10 (KSR St.10)
- **Messdetails**:
  * Positionen 3-5: Plusableiter (3 Punkte)
  * Positionen 6-8: Minusableiter (3 Punkte)
- **Messart**: Optische Pixelanalyse
- **Qualitätskriterien**:
  * Plusableiter: 5-80px akzeptabler Bereich
  * Minusableiter: 5-50px akzeptabler Bereich
- **Häufige Probleme**:
  * Unterverschweißung: < 5px
  * Überverschweißung: > Grenzwert px
  * Asymmetrische Schweißungen

### 3.9-3.11 Ableiter-Höhenmessungen
```json
"inspection9": {
    "limitMax": 0,
    "limitMin": 0,
    "value": -0,141,
    "uom": "mm",
    "result": true,
    "timestamp": 1730999371930
},
"inspection10": {
    "limitMax": 0,
    "limitMin": 0,
    "value": -0,128,
    "uom": "mm",
    "result": true,
    "timestamp": 1730999371930
},
"inspection11": {
    "limitMax": 0,2,
    "limitMin": -0,2,
    "value": -0,013,
    "uom": "mm",
    "result": true,
    "timestamp": 1730999371930
}
```
**Zweck**: Validiert Ableiterpositionierung
- **Standort**: Station 8/10 (KSR St.8/10)
- **Messungen**:
  * Position 9: Minusableiter-Höhe
  * Position 10: Plusableiter-Höhe
  * Position 11: Höhendifferenz
- **Kritische Spezifikationen**:
  * Einzelhöhen: 0mm Referenz
  * Maximale Differenz: ±0,2mm
- **Qualitätsauswirkungen**:
  * Höhendifferenz beeinflusst Montage
  * Kritisch für automatisierte Handhabung

### 3.12-3.14 Ableiter-Positionsmessungen
```json
"inspection12": {
    "limitMax": 2,3,
    "limitMin": 1,7,
    "value": 2,0,
    "uom": "mm",
    "result": true,
    "timestamp": 1730999372197
},
// ... (Prüfungen 13-14 ähnlich)
```
**Zweck**: Sichert korrekte Ableiterpositionierung
- **Standort**: Station 10 (KSR St.10)
- **Messungen**:
  * Position 12: Ableiterabstand
  * Position 13: Minusableiter-Position
  * Position 14: Plusableiter-Position
- **Kritische Dimensionen**:
  * Abstand: 2,0mm ±0,3mm
  * Position: 10,4mm ±0,4mm

### 3.15-3.18 Elektrische Messungen
```json
"inspection15": {
    "limitMax": 1,7,
    "limitMin": 1,57,
    "value": 1,588,
    "uom": "V",
    "result": true,
    "timestamp": 1730999388822
},
// ... (Prüfungen 16-18 folgen)
```
**Zweck**: Validiert elektrische Eigenschaften
- **Standort**: Verpacker Station 2
- **Prüfsequenz**:
  1. Leerlaufspannung (U0)
  2. Lastspannung (U2)
  3. Innenwiderstand (Ri)
  4. Temperaturüberwachung
- **Spezifikationen**:
  * U0: 1,57V - 1,70V
  * U2: 1,36V - 1,52V
  * Ri: 0Ω - 30Ω
  * Temp: 0°C - 100°C (nur Überwachung)

### 3.19-3.20 Spezielle Statusflags
```json
"inspection19": {
    "limitMax": 0,
    "limitMin": 0,
    "value": 0,
    "uom": "true/false",
    "result": false,
    "timestamp": 1730999388822
},
"inspection20": {
    "limitMax": 0,
    "limitMin": 0,
    "value": 0,
    "uom": "true/false",
    "result": false,
    "timestamp": 1730999388822
}
```
**Zweck**: Systemstatusindikatoren
- Position 19: NIO/Bedienereingriff
- Position 20: Musterteilindikator
- **Verwendung**:
  * Qualitätsverfolgung
  * Prozessvalidierung
  * MSA-Verfahren

## 4. Materialverbrauchsmeldungen

### 4.1 Materialtypen
```json
{
    "orderId": 10041663,
    "type": 1,
    "materialId": 2002468,
    "quantity": 0,12,
    "uom": "m",
    "timestamp": 1730999464987
}
```
**Materialverfolgung**:
- Typ 1: Rohmaterialverbrauch
- Typ 2: Produzierte Gutteile
- Typ 3: Ausschussteile

### 4.2 Materialpaarung
Beispiel aus realen Nachrichten:
```plaintext
Material 2002468: 0,12m @ 1730999464987
Material 2002420: 0,12m @ 1730999464991
Zeitdifferenz: 4ms
```
- Immer gepaarte Materialien
- Synchronisierter Verbrauch
- Übereinstimmende Mengen
- Nahezu gleichzeitige Zeitstempel

## 5. Häufige Fehlerbehebungsszenarien

### 5.1 Prüfungsfehler
1. **DMC-Probleme**
   - Leserposition prüfen
   - Markierungsqualität verifizieren
   - Beleuchtungsbedingungen prüfen

2. **Mechanische Messungen**
   - Kalibrierung überprüfen
   - Auf Verschmutzungen prüfen
   - Referenzpunkte überprüfen

3. **Elektrische Tests**
   - Kontaktsauberkeit prüfen
   - Temperaturbedingungen verifizieren
   - Messpitzenzustand überprüfen

### 5.2 Nachrichtenfluss-Probleme
1. **Fehlende Nachrichten**
   - Netzwerkverbindung prüfen
   - MQTT-Broker-Status verifizieren
   - QoS-Einstellungen überprüfen

2. **Zeitverzögerungen**
   - Zykluszeit überwachen
   - Systemauslastung prüfen
   - Stationssynchronisation verifizieren

3. **Datenvalidierung**
   - Grenzwerte überprüfen
   - Kalibrierdaten kontrollieren
   - Messeinheiten verifizieren

## 6. Originalnachrichten

Die folgenden Nachrichten wurden für die Erstellung dieser Dokumentation verwendet:

### 6.1 Prüfergebnis-Nachricht
```json
{
  "id": "message_d957e737-e766-42df-a10e-880d0938bda8",
  "createAt": "2024-11-07 18:11:09:631",
  "payload": {
    // Vollständige Nachricht hier...
  }
}
```

### 6.2 Materialverbrauchsnachrichten
```json
{
  "id": "message_6de47909-8b3f-4ec1-9fa9-764a9ea068be",
  "payload": {
    // Vollständige Nachricht hier...
  }
}
```
# NOT FINISHED
