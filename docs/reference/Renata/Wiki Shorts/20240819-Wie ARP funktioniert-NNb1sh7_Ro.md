# Wie ARP funktioniert


## Address Resolution Protocol (ARP)
ARP ist ein Netzwerkprotokoll, das verwendet wird, um eine IPv4-Adresse einer physischen MAC-Adresse in einem LAN zuzuordnen.

### ARP-Prozess
1. **Broadcast ARP-Anfrage:**  
   Host1 (192.168.1.50) sendet eine Broadcast-ARP-Anfrage: "Wer hat 192.168.1.80?"

2. **Unicast ARP-Antwort:**  
   Host3 (192.168.1.80) antwortet: "Ich habe 192.168.1.80" und sendet seine MAC-Adresse an Host1.

### Komponenten in einer ARP-Nachricht
- **ETH-Header:** Enthält Quell- und Ziel-MAC-Adressen.
- **Nutzlast:** Enthält Quell-IP, Absender-MAC, Ziel-IP und Ziel-MAC (0.0.0.0 für Anfragen).
