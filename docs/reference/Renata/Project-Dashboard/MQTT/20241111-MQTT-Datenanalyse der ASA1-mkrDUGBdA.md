# MQTT-Datenanalyse der ASA1

Hey Erich,

ich sende dir hiermit ein Video, das die Live-MQTT-Daten von ASA1 darstellt. Diese Daten stammen direkt aus der Kommunikationsschnittstelle des Brokers und nicht aus dem MES oder einer anderen Datenbank, was bedeutet, dass sie nicht importiert wurden. Das bedeutet, dass du hier authentische Echtzeitdaten siehst, die die aktuelle Situation exakt abbilden – sogar Testvorgänge können in Echtzeit verfolgt werden. Dies geschieht vor jeglicher Übertragung der Daten an AWS oder andere externe Systeme wie Autexis.

## Datenabonnierung und Sicherheit

Wir abonnieren den lokalen Produktionsbroker im ausschließlichen Lesemodus, was sicherstellt, dass weder Veränderungen noch Löschungen an den Daten erfolgen können. Dieser Ansatz gewährleistet, dass der MQTT-Prozess in keiner Weise beeinträchtigt wird. Zudem bleibt das System dadurch immun gegen potenzielle Infektionen, was eine Quarantäne der Daten unnötig macht. Somit kannst du bequem von deinem PC im Büro aus auf die Daten zugreifen. Diese MQTT-Nachrichten liegen im Originalzustand vor und sind in drei Gruppen gegliedert, was dir eine gezielte Analyse der relevanten Daten ermöglicht.

### Topics der Live-Daten

- **RenataBatteriesSA/Itingen/ASA/status-updates**

- **RenataBatteriesSA/Itingen/ASA/quantities**

- **RenataBatteriesSA/Itingen/ASA/inspection-results**

## Herausforderung der Datenmenge

Mir ist derzeit nicht bekannt, dass eine andere Einheit ähnliche Fähigkeiten besitzt oder entsprechende Analysen durchführt. Eine der großen Herausforderungen bei diesem Vorhaben ist die schiere Datenmenge. Ich habe beispielsweise einen 22-minütigen Test durchgeführt, und obwohl das Datenvolumen in Megabytes nicht signifikant erscheint, können aufgrund der spezifischen Natur von MQTT als leichtgewichtigem Protokoll sehr viele kleine Pakete erzeugt werden. Die resultierende Datenmenge ist innerhalb dieser kurzen Zeitspanne enorm. Aus diesem Grund gibt es spezialisierte Unternehmen, deren Expertise darin liegt, derartige Daten so zu verarbeiten, dass sie zugänglich und nützlich werden.

Die aufgezeichneten Daten der 22 Minuten habe ich in unterschiedlichen Formaten in meinem OneDrive gespeichert, darunter auch im Originalformat, in dem wir oder Autexis die Daten empfangen. Das gängige Format für die MQTT-Kommunikation ist JSON. Um die Daten weiterzuverarbeiten, ist häufig eine Normalisierung erforderlich, wobei sie in andere Formate wie CSV, XML, YAML oder wieder JSON konvertiert und anschließend in Datenbanken oder Speichersysteme wie das MES importiert werden. Sollte man versuchen, die CSV-Datei direkt zu öffnen, könnte dies selbst auf einem System mit über 100 GB RAM und einer leistungsstarken Grafikkarte mehr als fünf Minuten in Anspruch nehmen, und auch dann wäre eine gezielte Suche nach bestimmten Datensätzen äußerst ineffizient. Die 22-minütigen MQTT-Nachrichten umfassen 939.601 Zeilen, was die Handhabung komplex macht.

## Verarbeitungsmöglichkeiten und Lösungsansatz

Ich arbeite allerdings an einer Methode, die auf einem regulären PC lauffähig ist. Ein Laptop mit etwas mehr Arbeitsspeicher könnte erforderlich sein, doch die Verarbeitung der 22 Minuten ist auf einem modernen Laptop definitiv machbar und kann lokal erfolgen. In meinem Dokument "Falcon1" habe ich diese Ansätze detaillierter erklärt, und ich werde dir Zugang zu allen relevanten Dateien in den verschiedenen Formaten sowie zu dem Markdown-Dokument "Falcon1" geben. Derzeit schreibe ich noch den zugehörigen Code, aber Beat hat bereits Teile davon einsehen können. Am Ende wirst du in der Lage sein, die Daten zu abonnieren, sie lokal in meiner Anwendung zu laden und dann über einen lokal laufenden Webserver zu analysieren oder gezielt zu durchsuchen. Dieser Webserver wird die Daten so aufbereiten, dass sie für uns von besonderem Nutzen sind.

## Demonstration und Remote-Zugriff

Das erstellte Video ist drei Minuten lang. Dank Tailscale haben wir die Möglichkeit, diese Lösung sogar aus der Ferne zu nutzen, was dir einen umfassenderen Überblick gibt. Diese Lösung könnte ebenfalls in einer Präsentation bei Abbott Verwendung finden. Zusätzlich werde ich einige Bilder hinzufügen, die dir helfen sollen, die dargestellten Konzepte besser zu verstehen. Diese Bilder, das Video und alle weiteren relevanten Dateien werde ich in einem zentralen OneDrive-Ordner ablegen, damit du alles an einem Ort vorfindest.

## Mögliche Anwendungsszenarien

Dieses Vorhaben dient als Ergänzung zur Datenspeicherung und bietet mehr als nur eine Möglichkeit für das Team, Produktionsdaten live zu analysieren. Es gibt mit Sicherheit weitere Anwendungsszenarien, die wir realisieren können, wie beispielsweise die Darstellung von Live-Daten auf großformatigen Monitoren oder das Hervorheben bestimmter Informationen in einem benutzerdefinierten Format – der Kreativität sind hier keine Grenzen gesetzt. Aufgrund fehlender Beispiele im Internet musste ich alles selbst entwickeln. Die gleichzeitige Arbeit in drei Funktionen – als IT-Manager, IS-Manager und OTM – begrenzt meine verfügbare Zeit, aber ich werde mein Bestes tun, um alles zur Verfügung zu stellen, was für den Erfolg unserer Teams bei Renata notwendig ist.

## Nächste Schritte

Ich arbeite derzeit noch an dem Code und seiner Ausführung. Sobald dies abgeschlossen ist, können wir gemeinsam besprechen, welche Daten für euch besonders wichtig sind, um eine optimale Visualisierung zu ermöglichen. Der nächste Schritt wäre dann der Aufbau eines lokalen Webservers, der in einem sogenannten Docker-Container läuft, wodurch er isoliert und sicher betrieben werden kann. Das Einzige, was der Endnutzer auf seinem Rechner installieren muss, ist die Docker Desktop App. Es wird somit keine separate Installation oder Konfiguration notwendig sein. Dieser Ansatz gewährleistet eine sichere und isolierte Ausführung, sodass der Webserver problemlos auf einer Firmen-Workstation oder einem Laptop betrieben werden kann. Bei der Webserver-Implementierung werden wir Aspekte wie Zeitdaten, spezifische Batteriedaten und andere Feinheiten berücksichtigen. Über Dropdown-Funktionen und Mehrfachfilter wird es möglich sein, gezielt nach bestimmten Daten zu suchen und diese für weitere Zwecke, wie CSV-Exporte oder visuelle Berichte, bereitzustellen.

Beste Grüße,  
Marc
