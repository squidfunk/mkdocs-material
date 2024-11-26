# User erstellen für Q-Systeme (POMS / CAQ / iManSys) 

CASQit: 

    Auf GDC02819 verbinden 

    CASQ-it Q-Studio starten 

    Server: gdc02819, Aktuelle Anmeldedatenverwenden und dann auf Anmelden klicken 

    Service > Systemeinrichtung (Mandanten, 10) 

    Personal-Nummer verwenden 

    Kurzbezeichnung -> ohne REN (Bsp. SchRob) 

    Domäne: SWATCHGROUPNET (immer gross schreiben) 

    Domäne-Benutzer -> mit REN (Bsp. REN-SchRob) 

 

POMS: 

    Auf SYCAT_RENATA verbinden 

    Sycat IMS Administration öffnen 

    Stammdaten > Organisationseinheiten > Mitarbeiter 

    Einlesen > Import aus… > LDAP und Eintrag ersetzen durch OU=REN,OU=Companies,DC=swatchgroup,DC=net 

    Alle Haken müssen gesetzt sein. 

    "Alle auswählen" auswählen und auf "Importieren" klicken 

    Schliessen 

    IMS Portal > Benutzerverwaltung 

    Hinzufügen 

    Alles was links steht == kein Leserechte aufs POMS, alles was rechts steht == Leserechte auf POMS 

    "Den neuen Nutzern Zugriff auf vorhandene Dokumente erteilen" --> Ja 

    Schliessen 

 

iManSys: 

    Auf Server verbinden 

    C:\iManSysADImporter\ActiveDirectoryUsers.exe 

    CMD starten und C:\iManSysADImporter\ActiveDirectoryUsers.exe starten 