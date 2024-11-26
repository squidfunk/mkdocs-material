# Telefonanlage

  

Die Telefonliste liegt unter diesem Link. Dort sind alle nötigen Informationen gespeichert, welche eingetragen oder aktualisiert werden müssen. 

Diese Dokumentation ist modular aufgebaut. In manchen Kapiteln wird auf Vorgehensweisen anderer Kapitel referenziert. 

Parallelbetrieb Telefonstation und Funkgerät  

Beim Parallelbetrieb ist zu beachten, dass sobald die Telefonstation nicht funktioniert auch das Funkgerät nicht funktioniert. Die Telefonnummer des Funkgeräts lautet dann 061 10 75 7xxx. 

  

Anmeldung an der Telefonanlage  

Die Telefonanlage ist auf dem Server RENCHIT091 zu administrieren. 


 

Das Programm heisst «OmniVista» und kann über die Suche gefunden werden. 


  

Anmeldefenster 


Das Kennwort ist im KeePass gespeichert, sollte nach der ersten Anmeldung automatisch erscheinen. 


Fehlermeldung bei Anmeldung an der Telefonanlage  

Es bestehen nur wenige Lizenzen zur Verfügung, drum kann sein, dass alle verbraucht sind.  

  

  

  

Konfiguration 

Zum Öffnen der Konfiguration der Telefonanlage wählen Sie Konfiguration … 

… und navigieren im Menübaum nach unten . 

  

Per Rechtsklick kann die Konfiguration geöffnet werden. 

Systemüberblick 

Menübaum 

Der Menübaum steuert die jeweiligen Inhalte der anderen Fenster.  

Systemsuche 

Über die Systemsuche können zB Teilnehmer oder Rufnummern gesucht werden.  

Konfigurationsfeld 

Je nachdem ob im Menübaum oder in der Suche etwas eingegeben wurde, zeigt sich der Inhalt im Konfigurationsfenster. 

Systemlog 

Das Systemlog zeigt Details zu den aufgerufenen Befehlen. 

  

Telefon anlegen 

Ein Telefon kann einfach im Menübaum erstellt werden. 

Die hierfür nötigen Informationen müssen im Konfigurationsfenster eingetragen werden (siehe Screenshot – Anlage eines Funktelefons). 

DECT Telefon anlegen 

Achtung: Bei Parallelbetrieb die entsprechende Nummer 10 75 7xxx beachten. 

Es müssen nun viele weitere Detailinformationen eingegeben werden.  

Achtung: Eintrag in Telefonliste beachten 

  

  

Festtelefon anlegen 

Eintragung der entsprechenden Adresse (zwingend eine freie Adresse wählen) 

Übersetzungstabelle unter N:\Daten\82 IT\50 - Infrastruktur\20 – Telefon\ Alcatel OXE Digital.pdf 

Achtung 0 wurde durch 2 ersetzt. Dann im Serverraum Kabel verwenden und die HV-Klemme mit der Inst-Klemme verbinden. Zack funktioniert. 

  

Spalte N Berechtigungen 

13: Kann extern weiterleiten 

14: Kann nicht extern weiterleiten 

 

Ab hier empfiehlt es sich, ein anderes, zweites Telefon in die Suche mit einzubinden, und die jeweiligen Informationen zu vergleichen und zu übernehmen (Achtung Festnetz-Telefon und Funktelefon unterscheiden sich in den Angaben). Bestätigen mit dem grünen Haken. Nun die Suche anwenden und auf Reiter «Alle» klicken. 

 

Achtung: Erst mit der folgenden Pflege der Multiline Tasten (Programmierbare Tasten) stellt sich das Teilnehmergerät in den Standardeinstellungen von Multiline = Nein auf Ja um.  

Programmierbare Tasten anlegen 

Dazu den neu angelegten Teilnehmer im Baum zuweisen. 

Die Tasten 1 und 2 werden vorprogrammiert. 

Auch hier bietet es sich an, beim ersten Mal einen Vergleich zu ziehen, aber die nötigen Informationen sind hier abgebildet. 

Programmierbare Tasten konfigurieren 

In den unteren beiden Feldern ist der Anzeigename der programmierten Taste festgelegt. Bei Weiterleitungen (zB Order Services) wird dieses so dann angezeigt. 

Anrufüberwachung 

Die Anrufüberwachung bedeutet, dass von einem anderen Anschluss her, ein Anruf übernommen werden kann. Gleichzeitig zeigt das Telefon an, wenn der Anschluss angerufen wird (per Wellen am entsprechenden Nameneintrag). Programmiert werden muss die Apparateüberwachung s.u. 

  

DECT Telefon konfigurieren 

Auto install starten (kommt automatisch) 

Ansonsten: Anmelden/Register; PIN 4x0; Durchklicken, Anmelden (siehe unten) 

Über ASG Remote Desktop unter Diverses – ASG Vista doppelt klicken 

Es kommt sowas wie eine DOS-Oberfläche / Console  

Login-Credentials siehe Screenshot 

  

Timout 0 setzt das Timeout aus. 

Das Telefon sucht noch nicht nach der Installation … «dectinston 757390» stösst den Befehl von Seiten der Console aus zum neuen Telefon an, dann auf dem Telefon «Auto install» YES. Auf dem Telefon dann die nächsten Fragen einfach durchklicken. 

Install this set? YES 

  

  

Am Telefon 

Console: 

  

  

  

Am Telefon: 

PIN: 0000 

Power mode è Enhanced security: No 

  

  

 

Console: 

  

  

Festnetztelefon konfigurieren 

Fehlt noch 

  

  

Telefon löschen 

Um ein Telefon zu löschen, muss es vorhanden sein. Über die Suche kann es gefunden werden. 

Nun muss das Telefon über «Zuweisen im Baum» in dem Menübaum überführt werden, ansonsten würden im Menübaum alle Telefonapparate angezeigt werden. 

Unter Teilnehmerapparate kann das gewählte Telefon nun ausgewählt und gelöscht werden. 

  

Telefonkabel Serverraum 

Bei Festnetz Telefonen gibt es noch eine Verkabelung im Serverraum, die dann entfernt werden kann. Dies gilt für die Use Cases Kapitel 10.1: Tischapparat gegen Funktelefon austauschen und 12.1 Festnetztelefon entfernen. 

Gemäss der Informationen aus der Telefonliste Spalte K «HV-Klemme» und Spalte L «Inst-Klemme» mit in den Serverraum nehmen. Die Haupt Verteilung-Klemme ist dann mit der Inst.Klemme per Kabel verbunden (weisses und schwarzes Kabel). 

 

Ganz links hängt die Kabelzange. Die Kabel werden entfernt und entsorgt. 

  

  

  

Telefon austauschen 

Tischapparat gegen Funktelefon ersetzen 

Tischapparat löschen 

Siehe Kapitel 8 (Dieser Schritt muss durchgeführt werden, damit die gleiche Nummer beim Einrichten des mobilen Funktelefons wieder verwendet werden kann) 

Funktelefon präparieren 

Das Tischtelefon kann nun bereits präpariert werden. Die beiden hier abgebildeten Aufkleber müssen aufs Telefon drauf.  

Telefonnummer 

Notfallnummern 

DECT Telefon konfigurieren 

Siehe Kapitel 6 

Telefon austauschen 

Vor Ort das Festnetz Telefon gegen das Funk Telefon incl Ladestation austauschen. 

Leitung im Serverraum entfernen 

Siehe Kapitel 9 

  

Funktelefon gegen Tischapparat 

  

Tischapparat ersetzen 

Text 

Funktelefon ersetzen 

Das Funktelefon muss erst über die Console mit dem Befehl «DECTRM «Nummer»» deaktiviert werden, bevor es in der Java-Version von OmniVista gelöscht werden kann. Achtung Parallelbetrieb: Bei Funktelefonen muss hier die Nummer 10 75 7xxx eingegeben werden. 

Weiter mit Kapitel 8 Telefon löschen und Kapitel 6 DECT Telefon konfigurieren. 

  

Telefon entfernen 

Festnetztelefon 

Das Festnetz muss nicht über die Console deaktiviert werden, es kann in der Java-Version von OmniVista einfach gelöscht werden. 

Funk Telefon 

Das Funktelefon muss erst über die Console mit dem Befehl «dectrm «Nummer»» deaktiviert werden, bevor es in der Java-Version von OmniVista gelöscht werden kann. Geschieht dies nicht, siehe Kapitel 13.2. decter 

  

Parallelbetrieb Telefone einrichten 

Unter «Partnertelefone» muss zusätzlich das Partnertelefon eingerichtet werden. Achtung das Funktelefon hat die Nummer 10 75 7xxx. 

  

Potentielle Fehlermeldungen 

Deregistriertes Festnetztelefon 

Ist diese Fehlermeldung auf dem Festnetz Telefon ersichtlich, wurde die Registrierung (siehe Kapitel 10.1.) des Festnetz Telefons gelöscht. 

  

«Apparat noch vorhanden» 

Diese Fehlermeldung erscheint in der Java-Version von OmniVista, wenn das DECT Funktelefon nicht zuerst über die Console mit dem Befehl «DECTRM «Nummer»» deregistriert wurde. 

  

  

  

  

  

  

Einrichtungen 

Ringschaltung konfigurieren 

Dies wird auf den programmierbaren Tasten mittels «Apparateüberwachung» konfiguriert und muss auf dem Gegenapparat ebenfalls über die programmierbaren Tasten mittels «Apparateüberwachung» konfiguriert werden. 

 

  

  

Private Rufnummer / Rufnummern 

Hier wird dann die eingerichtete Rufnummer angezeigt werden. 

Anonym nach extern einschalten 

Haken ID-Anpassung 

Ja: Rufnummer wird bei anrufen extern angezeigt 

Nein: Rufnummer "Anonym" wird angezeigt 

Use Cases 

  

RENCHIT091 – Programm OmniVista 

Telefon anlegen 

Funktelefon 

Tischapparat 

Telefon editieren 

Neuer Benutzer 

Defektes Telefon 

Telefon löschen 

Funktelefon 

Tischapparat 

Telefon austauschen 

Tischapparat gegen Funktelefon 

Funktelefon gegen Tischapparat 

Tischapparate 

Muss nur ausgetauscht werden, Administration auf Server 

  

  

DECT-Standard bei Renata 

Geräte (Funk) können nur 7 Gespräche parallel, beim 8.Anruf wird anderes Gerät gesucht, oder man ist schlicht nicht erreichbar. 

  

  

Langfristplan Swatchgroup: Umstellung auf VoIP 

Horizont: 2019 - 2020 