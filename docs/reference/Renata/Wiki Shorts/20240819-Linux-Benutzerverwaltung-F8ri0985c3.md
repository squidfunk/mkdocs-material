# Linux-Benutzerverwaltung


## Benutzer hinzufügen, entfernen oder ändern
- `useradd <benutzername>`  
  Einen neuen Benutzer hinzufügen.

- `useradd -m <benutzername>`  
  Einen neuen Benutzer mit Heimatverzeichnis hinzufügen.

- `useradd -a <gruppenname> <benutzername>`  
  Einen neuen Benutzer mit der primären Gruppe hinzufügen.

- `userdel <benutzername>`  
  Den genannten Benutzer entfernen, ohne das Heimatverzeichnis zu löschen.

- `userdel -r <benutzername>`  
  Den genannten Benutzer und sein Heimatverzeichnis entfernen.

- `usermod -m -d /pfad/zum/neuen/home <benutzername>`  
  Das Heimatverzeichnis des Benutzers verschieben.

- `passwd -l <benutzername>`  
  Den genannten Benutzer sperren, um die Anmeldung zu deaktivieren.

- `passwd -u <benutzername>`  
  Den genannten Benutzer entsperren, um die Anmeldung wieder zu aktivieren.

## Gruppe hinzufügen, entfernen oder ändern
- `groupadd <gruppenname>`  
  Eine neue Gruppe hinzufügen.

- `groupdel <gruppenname>`  
  Die Gruppe entfernen.

- `usermod -aG <gruppenname> <benutzername>`  
  Benutzer zur genannten Gruppe hinzufügen.

- `gpasswd -d <benutzername> <gruppenname>`  
  Benutzer aus der genannten Gruppe entfernen.

- `groupmod -n <neuer-gruppenname> <alter-gruppenname>`  
  Gruppennamen ändern.

## Benutzer- und Gruppeninformationen anzeigen
- `whoami`  
  Benutzernamen des aktuell angemeldeten Benutzers anzeigen (gleich wie `echo $USER`).

- `id <benutzername>`  
  UID, GID und Gruppen anzeigen, zu denen der Benutzer gehört.

- `id -gn <benutzername>`  
  Die primäre Gruppe eines Benutzers anzeigen.

- `groups <benutzername>`  
  Alle (primäre und sekundäre) Gruppen auflisten, zu denen der Benutzer gehört.

- `getent group <gruppenname>`  
  Alle Benutzer anzeigen, die zu einer bestimmten Gruppe gehören.

- `getent passwd`  
  Alle Einträge in der Passwortdatenbank anzeigen.

- `getent group`  
  Alle Einträge in der Gruppendatenbank anzeigen.
