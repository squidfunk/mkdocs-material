# TimePlus application fix Local User EN

### Schritt-für-Schritt-Anleitung (Durchzuführen vom Belenos IT-Team)

1. **Als betroffener Benutzer anmelden**:
   - Melden Sie sich mit dem Benutzerkonto an, das erhöht werden muss.

2. **Computerverwaltung als Administrator starten**:
   - Drücken Sie `Win + X` und wählen Sie `Computerverwaltung`.
   - Wenn Sie nach administrativen Anmeldeinformationen gefragt werden, geben Sie die Anmeldeinformationen eines Kontos mit Administratorrechten ein.

3. **Benutzer zum lokalen Administrator erhöhen**:
   - Navigieren Sie im Fenster "Computerverwaltung" zu `System` -> `Lokale Benutzer und Gruppen` -> `Benutzer`.
   - Finden Sie das Benutzerkonto, das erhöht werden muss.
   - Klicken Sie mit der rechten Maustaste auf das Benutzerkonto und wählen Sie `Eigenschaften`.
   - Gehen Sie zur Registerkarte `Mitglied von`.
   - Klicken Sie auf `Hinzufügen`, geben Sie `Administratoren` im Feld für den Objektnamen ein und klicken Sie auf `Namen überprüfen`.
   - Klicken Sie auf `OK`, um den Benutzer zur Gruppe der lokalen Administratoren hinzuzufügen.
   - Klicken Sie auf `Übernehmen` und `OK`.

4. **PC neu starten**:
   - Starten Sie den PC neu, um die Änderungen anzuwenden.

5. **Externes Support-Team für TimePlus kontaktieren**:
   - Nach dem Neustart sollte der Benutzer das externe Support-Team für TimePlus kontaktieren, um die erforderlichen Aktionen durchzuführen.

6. **Benutzer aus der Gruppe der lokalen Administratoren entfernen**:
   - Nachdem das externe Support-Team seine Arbeit abgeschlossen hat, melden Sie sich erneut mit dem Benutzerkonto am PC an.
   - Starten Sie `Computerverwaltung` erneut als Administrator.
   - Navigieren Sie zu `System` -> `Lokale Benutzer und Gruppen` -> `Benutzer`.
   - Finden Sie das Benutzerkonto, klicken Sie mit der rechten Maustaste darauf und wählen Sie `Eigenschaften`.
   - Gehen Sie zur Registerkarte `Mitglied von`, wählen Sie `Administratoren` und klicken Sie auf `Entfernen`.
   - Klicken Sie auf `Übernehmen` und `OK`.

7. **PC erneut neu starten**:
   - Starten Sie den PC neu, um die Änderungen anzuwenden.

8. **Sicherheitsgruppe im Active Directory aktualisieren**:
   - Melden Sie sich an einem Domänencontroller oder einem Computer mit Active Directory-Benutzer und -Computer (ADUC) an.
   - Öffnen Sie `Active Directory-Benutzer und -Computer`.
   - Navigieren Sie zu der Organisationseinheit (OU), in der sich die Sicherheitsgruppe befindet (in diesem Fall Belenos).
   - Finden Sie die Sicherheitsgruppe, die es Benutzern ermöglicht, die gemappten Anwendungen sicher auszuführen (z.B. `DriveMappedAppUsers`).
   - Klicken Sie mit der rechten Maustaste auf die Gruppe und wählen Sie `Eigenschaften`.
   - Gehen Sie zur Registerkarte `Mitglieder` und klicken Sie auf `Hinzufügen`.
   - Geben Sie den Namen des Benutzers ein, der hinzugefügt werden muss, klicken Sie auf `Namen überprüfen` und dann auf `OK`.

   **Erklärung**: 
   - Dieser Schritt ist entscheidend, da er sicherstellt, dass der Benutzer die notwendigen Berechtigungen hat, um die gemappten Anwendungen ohne lokale Administratorrechte auszuführen. Dies ist kein TimePlus-Problem, sondern eine Sicherheitsfunktion der Swatch Group, um die sichere Ausführung von Anwendungen auf einem gemappten Laufwerk zu ermöglichen. Es wird von Ihrem lokalen IT-Team verwaltet und ist eine lokale PC-Richtlinie, keine TimePlus-Richtlinienbeschränkung. Durch das Hinzufügen des Benutzers zu dieser Sicherheitsgruppe im Active Directory werden die Berechtigungen zentral verwaltet, und der Benutzer kann die Anwendungen sicher ausführen.

9. **Anwendung testen**:
   - Melden Sie sich erneut als Benutzer an und testen Sie die Anwendung, um sicherzustellen, dass sie ohne erhöhte Berechtigungen korrekt funktioniert.

10. **HR kontaktieren, falls es Probleme gibt**:
    - Wenn der Benutzer auf Anmeldeprobleme oder Fehler stößt, sollte er das HR-Team kontaktieren, da dieses explizit die TimePlus-Konten verwaltet, nicht das IT-Team bei Renata.

### Hinweise:
- Stellen Sie sicher, dass diese Schritte von Personal mit den entsprechenden Berechtigungen ausgeführt werden.
- Dokumentieren Sie jeden durchgeführten Schritt und alle vorgenommenen Änderungen zur Prüfung und zukünftigen Referenz.


# step-by-step instructions in English

### Step-by-Step Instructions (To Be Done by the Belenos IT Team)

1. **Log in as the Affected User**:
   - Log into the PC with the user account that needs to be elevated.

2. **Start Computer Management as an Administrator**:
   - Press `Win + X` and select `Computer Management`.
   - If prompted for administrative credentials, enter the credentials for an account with administrative privileges.

3. **Elevate User to Local Administrator**:
   - In the "Computer Management" window, navigate to `System Tools` -> `Local Users and Groups` -> `Users`.
   - Find the user account that needs to be elevated.
   - Right-click on the user account and select `Properties`.
   - Go to the `Member Of` tab.
   - Click `Add`, type `Administrators` in the object name field, and click `Check Names`.
   - Click `OK` to add the user to the local administrators group.
   - Click `Apply` and `OK`.

4. **Reboot the PC**:
   - Restart the PC to apply the changes.

5. **Contact the External Support Team for TimePlus**:
   - After rebooting, have the user contact the external support team for TimePlus to perform the necessary actions.

6. **Remove User from Local Administrators Group**:
   - Once the external support team has completed their work, log back into the PC with the user account.
   - Start `Computer Management` as an administrator again.
   - Navigate to `System Tools` -> `Local Users and Groups` -> `Users`.
   - Find the user account, right-click on it, and select `Properties`.
   - Go to the `Member Of` tab, select `Administrators`, and click `Remove`.
   - Click `Apply` and `OK`.

7. **Reboot the PC Again**:
   - Restart the PC to apply the changes.

8. **Update Active Directory Security Group**:
   - Log in to a Domain Controller or a machine with Active Directory Users and Computers (ADUC) installed.
   - Open `Active Directory Users and Computers`.
   - Navigate to the Organizational Unit (OU) where the security group is located (in this case, Belenos).
   - Find the security group that allows users to run the mapped applications safely (e.g., `DriveMappedAppUsers`).
   - Right-click on the group and select `Properties`.
   - Go to the `Members` tab and click `Add`.
   - Type the name of the user who needs to be added, click `Check Names`, and then `OK`.

   **Explanation**: 
   - This step is crucial as it ensures that the user has the necessary permissions to run the mapped applications without requiring local administrative privileges. This is not a TimePlus issue but a security feature implemented by the Swatch Group to allow the safe execution of applications on a mapped drive. It is managed by your local IT team and is a local PC policy, not a TimePlus policy restriction. By adding the user to this security group in Active Directory, the permissions are managed centrally, and the user can execute the applications securely.

9. **Test the Application**:
   - Log back in as the user and test the application to ensure it works correctly without the elevated privileges.

10. **Contact HR if There Are Issues**:
    - If the user encounters any login issues or errors, they should contact the HR team, as they explicitly manage the TimePlus accounts, not the IT department at Renata.

### Notes:
- Ensure that these steps are executed by personnel with the appropriate permissions.
- Document each step performed and any changes made for auditing and future reference.