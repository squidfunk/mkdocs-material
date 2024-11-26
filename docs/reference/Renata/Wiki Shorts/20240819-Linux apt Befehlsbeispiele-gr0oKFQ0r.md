# Linux apt Befehlsbeispiele


## Paketinstallation und -entfernung
- `apt install <pkg-name> oder <deb-file>`  
  Installiert ein Paket und seine Abhängigkeiten.

- `apt reinstall <pkg-name>`  
  Installiert ein bereits installiertes Paket neu.

- `apt remove <pkg-name>`  
  Entfernt ein Paket, behält aber seine Konfigurationsdateien.

- `apt purge <pkg-name>`  
  Entfernt ein Paket und seine Konfigurationsdateien.

- `apt autoremove`  
  Entfernt verwaiste Pakete, die nicht mehr benötigt werden.

- `apt autoclean`  
  Entfernt veraltete und obsolete Pakete aus dem Paket-Cache.

- `apt clean`  
  Entfernt alle heruntergeladenen `.deb`-Paketdateien aus dem Paket-Cache.

## Paket-Upgrade
- `apt update`  
  Aktualisiert die Paketindexdateien.

- `apt upgrade`  
  Aktualisiert alle aktualisierbaren Pakete.

- `apt full-upgrade`  
  Führt ein Upgrade durch, aber mit intelligenter Konfliktlösung.

- `apt dist-upgrade`  
  Gleich wie `apt full-upgrade`.

- `apt-mark hold/unhold <package>`  
  Hält ein Paket zurück oder gibt es frei, um ein Upgrade zu blockieren oder zu erlauben.

## Paketinformationsabfrage
- `apt show <pkg-name>`  
  Zeigt detaillierte Informationen über ein Paket an.

- `apt depends <pkg-name>`  
  Listet alle Pakete auf, von denen ein Paket abhängt.

- `apt rdepends <pkg-name>`  
  Listet alle Pakete auf, die von einem Paket abhängen.

- `apt list [--installed|--upgradable]`  
  Listet Pakete mit optionalen Filtern auf.

- `apt list <pkg-name>`  
  Listet Pakete auf, deren Namen mit einem regulären Ausdruck übereinstimmen.

- `apt search <search-keyword>`  
  Sucht nach Paketen mit einem Schlüsselwort.

## Befehlszeilenoptionen
- `--download-only`  
  Lädt ein Paket herunter, setzt aber die Installation nicht fort.

- `--no-download`  
  Lädt nicht herunter und verwendet bereits heruntergeladene Pakete.

- `--fix-broken`  
  Versucht, beschädigte Abhängigkeiten zu reparieren.

- `--simulate`  
  Ändert das System nicht, zeigt aber an, was das Ergebnis sein wird.

- `--assume-no`  
  Antwortet auf alle Aufforderungen mit Nein.

- `-y`  
  Antwortet auf alle Aufforderungen mit Ja.
