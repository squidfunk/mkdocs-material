# Technische Übersicht über Microsoft Copilot DE

## 1. Microsoft Copilot für den persönlichen Gebrauch

### - Microsoft 365 Copilot (Privat/Familie)
  - **Funktionen**:
    - Unterstützung bei **Word**: Entwirft Dokumente, schlägt Inhalte vor und überarbeitet Absätze.
    - **Excel**: Automatisiert die Formelerstellung, Datenanalyse und das Erstellen von Diagrammen.
    - **Outlook**: Fasst lange E-Mail-Konversationen zusammen, schlägt Antworten vor und hilft beim Verfassen von E-Mails.
    - **PowerPoint**: Generiert Präsentationen basierend auf Eingaben, organisiert Folien und schlägt Designelemente vor.
  - **Datenquellen**: Hauptsächlich Nutzereingaben und öffentliche Inhalte aus dem Web.
  - **Versionen**:
    - **Kostenlos**: Grundlegende generative KI-Funktionalität.
    - **Pro**: Erweiterte Funktionen mit Zugriff auf **Plugins**, **priorisierten Zugriff** und **höhere Nutzungslimits**.

### - GitHub Copilot (Einzelnutzer)
  - **Funktionen**:
    - KI-gesteuerte Echtzeit-Codevorschläge.
    - **Codevervollständigung** für mehrere Programmiersprachen (Python, JavaScript, C++, etc.).
    - Unterstützung bei **Refactoring**: Schlägt Code-Verbesserungen vor und hilft, die Logik zu optimieren.
    - Integration in **VS Code**, **JetBrains IDEs** und **Neovim**.
  - **Datenquellen**: Verwendet öffentliche GitHub-Repositories und entwicklerspezifische Eingaben, um Vorschläge zu generieren.
  - **Einschränkungen**: Kann Code aus bestehenden Open-Source-Projekten generieren (Lizenzierung sollte überprüft werden).

### - Power Platform Copilot (Einzelpersonen/Kleinunternehmen)
  - **Funktionen**:
    - **Power Automate**: Automatisiert einfache Workflows wie Benachrichtigungen, Genehmigungsprozesse und Datenübertragungen.
    - **Power BI**: Bietet automatisch generierte Datenanalysen und erstellt Dashboards mit minimaler Benutzereingabe.
    - **Power Apps**: Low-Code-Entwicklung von Business-Anwendungen basierend auf natürlicher Spracheingabe.
  - **Datenquellen**: Verbindet sich mit Datenquellen wie **Microsoft Dataverse**, **Excel**, **SQL** etc.
  - **Sicherheit**: Standardmäßige Datenverschlüsselung, begrenzte Unternehmenssicherheit.

### - Edge Copilot (Persönlicher Gebrauch)
  - **Funktionen**:
    - Unterstützt bei **Web-Suchen**, **Seitenzusammenfassungen** und **Produktvergleichen**.
    - Kontextbezogene Unterstützung basierend auf der aktuellen Webseite.
    - Fasst auf Anfrage textlastige Dokumente oder Webinhalte zusammen.
  - **Datenquellen**: Öffentliche Webinhalte.
  - **Versionen**:
    - **Kostenlos**: Grundlegende Unterstützung im Browser.
    - **Pro**: Unterstützt **Plugins** (z. B. Shopping, Eventbuchungen) und höhere tägliche Abfragelimits.
  - **Datenschutz**: Interagiert mit öffentlichen Daten und Benutzereingaben. Begrenzung auf nicht sensible persönliche Daten.

### - Azure Copilot (Vorschau für den persönlichen Gebrauch)
  - **Funktionen**:
    - Automatisiert Cloud-Operationen für Einzelpersonen oder kleine Unternehmen.
    - Generiert **Azure Resource Manager (ARM)**-Skripte und **Terraform**-Konfigurationen.
    - Unterstützt bei der Bereitstellung von **virtuellen Maschinen**, **Speicherkonten** und **Container-Instanzen**.
    - Optimiert Abfragen und **Kostenanalysen** für Cloud-Ressourcen.
  - **Datenquellen**: Azure-Umgebung des Nutzers, öffentliche Dokumentation und Konfigurationen von Cloud-Diensten.
  - **Sicherheit**: Standardmäßige Verschlüsselungs- und Datenschutzmaßnahmen von Azure.

---

## 2. Microsoft Copilot für Unternehmen

### - Microsoft 365 Copilot (Business/Enterprise)
  - **Funktionen**:
    - Integriert in **Microsoft 365 Enterprise**-Apps: Word, Excel, PowerPoint, Outlook, Teams, SharePoint.
    - Bietet unternehmensspezifische Dokumentenerstellung und Zusammenfassungen basierend auf geschäftlichem Kontext.
    - **Excel**: Unterstützt fortschrittliche Datenanalyse, das Handling großer Datensätze und die Integration mit **Power BI** für Live-Berichte.
    - **Teams**: Generiert Besprechungszusammenfassungen, Aufgaben und integriert sich mit dem Unternehmenskalender zur Automatisierung von Aufgaben.
  - **Datenquellen**:
    - **Microsoft Graph API**, um auf Unternehmensdokumente, Kalender und Kommunikation in einer kontrollierten Unternehmensumgebung zuzugreifen.
    - Keine Datenfreigabe für öffentliche Modelle.
  - **Sicherheit**:
    - Vollständige Integration mit **Microsoft Entra ID** (ehemals Azure AD) für die Benutzer-Authentifizierung und Zugriffskontrolle.
    - Unternehmensverschlüsselung und Compliance (GDPR, HIPAA).
    - **Rollenbasierte Zugriffskontrolle (RBAC)** und **Azure Policy**, um die Datenexposition zu minimieren und Sicherheitsrichtlinien durchzusetzen.

### - GitHub Copilot (Business/Enterprise)
  - **Funktionen**:
    - Unterstützt die Zusammenarbeit von mehreren Entwicklern mit konsistenten Code-Mustern.
    - **Code-Reviews** durch KI-gestützte Vorschläge zur Einhaltung der Unternehmensstandards.
    - Funktioniert in mehreren IDEs mit unternehmensspezifischen GitHub-Repositories.
  - **Datenquellen**:
    - Private Repositories des Unternehmens, Zugriff auf **GitHub Enterprise**-Serverdaten.
  - **Sicherheit**:
    - Private Codebases sind isoliert; keine öffentlichen Daten werden zur Modellschulung verwendet.
    - GitHub-Compliance-Maßnahmen auf **Unternehmensniveau** (SOC 2, ISO 27001 usw.).

### - Power Platform Copilot (Enterprise)
  - **Funktionen**:
    - Automatisiert Unternehmensworkflows wie mehrstufige Genehmigungsprozesse, HR-Onboarding und Finanzberichte.
    - **Power BI**: Generiert Einblicke und prädiktive Analysen aus großen Datensätzen.
    - **Power Apps**: Low-Code-Entwicklung komplexer interner Apps mit Integration in Unternehmensdatenquellen wie **Dynamics 365**, **Azure SQL** usw.
  - **Datenquellen**:
    - Verbindung zu **Microsoft Dataverse**, **SQL-Datenbanken** und Unternehmensdatenquellen.
  - **Sicherheit**:
    - Daten werden unter den Datenschutzregeln des Unternehmens geschützt und verschlüsselt übertragen sowie im Ruhezustand gesichert.

### - Dynamics 365 Copilot (Enterprise)
  - **Funktionen**:
    - Automatisiert Aufgaben in **CRM**- und **ERP**-Modulen.
    - Bietet Einblicke in den Kundenservice, Verkaufsprognosen und Finanzprognosen.
    - Natürliche Sprachinteraktion für Aufgaben wie **Rechnungserstellung**, **Verkaufsberichtserstellung** und **Bestandsverwaltung**.
  - **Datenquellen**: CRM-, ERP- und Verkaufsdaten der Organisation in **Dynamics 365**.
  - **Sicherheit**:
    - Strikte rollenbasierte Zugriffskontrollen stellen sicher, dass nur autorisierte Mitarbeiter auf spezifische Module oder Berichte zugreifen können.
    - Erfüllt finanzielle und branchenspezifische regulatorische Standards (SOX, GDPR).

### - Microsoft Security Copilot (Enterprise)
  - **Funktionen**:
    - KI-gesteuerte **Bedrohungsintelligenz** zur Echtzeit-Erkennung und Reaktion.
    - Korrelation von Daten aus **Microsoft Sentinel**, **Defender** und anderen Sicherheitstools zur Automatisierung der Bedrohungsreaktion.
    - Generiert Sicherheitsvorfälle und Compliance-Audits automatisch.
  - **Datenquellen**: Verwendet Daten von **Microsoft Sentinel**, **Defender for Endpoint** und anderen Sicherheitsdiensten.
  - **Sicherheit**: Basierend auf **Zero-Trust-Architektur**, gewährleistet Datenisolierung und detaillierte Protokollierung.

### - Edge Copilot (Unternehmensgebrauch)
  - **Funktionen**:
    - Bietet kontextbezogene Unterstützung in **Microsoft 365**-basierten Workflows wie der Zusammenfassung von Dokumenten, der Erstellung von Berichten und dem Umgang mit Unternehmenskommunikation.
    - Zugriff auf Unternehmensressourcen wie **SharePoint**, **Teams** und **OneDrive** in sicherer Weise.
  - **Datenquellen**:
    - Beschränkt auf genehmigte Unternehmensressourcen innerhalb von **Microsoft 365** (E-Mails, Dokumente usw.).
  - **Sicherheit**:
    - Erzwingt **Unternehmensrichtlinien zum Datenschutz**, um sicherzustellen, dass keine öffentlichen Daten mit Unternehmensinformationen vermischt werden.
    - Integriert mit **Microsoft Entra ID** für sichere Authentifizierung und rollenbasierte Zugriffskontrolle.

### - Azure Copilot (Vorschau für Unternehmen)
  - **Funktionen**:
    - Automatisiert Ressourcenbereitstellung, Kostenoptimierung und Cloud-Operationen in **Azure**.
    - Unterstützt **Kubernetes** und **Container-Orchestrierung** mit KI-optimierten Bereitstellungen.
    - Hilft bei erweiterten Sicherheitsmaßnahmen wie **Angriffsflächenmanagement** und **Kostenabschätzungen** für Cloud-Infrastrukturen.
  - **Datenquellen**:
    - Zugriff auf Unternehmens-**Azure-Abonnements**, **Azure Arc** und **Azure Resource Graph** zur Abfrage von Ressourcen und Kosten.
  - **Sicherheit**:
    - Unternehmensverschlüsselung, rollenbasierte Zugriffskontrollen und vollständige Einhaltung der Cloud-Sicherheitsrichtlinien des Unternehmens.

---

## 3. Wichtige Unterschiede: Persönlicher vs. geschäftlicher Gebrauch

| Feature                        | Persönlicher Gebrauch                                                           | Geschäftlicher Gebrauch                                                           |
|---------------------------------|---------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Datenzugriff**                | Öffentliche Webdaten, persönliche Dokumente                                      | Private Unternehmensdaten (Microsoft 365, Dynamics 365, Azure)                    |
| **Sicherheit**                  | Grundlegende Verschlüsselung, Umgang mit öffentlichen Daten                      | Unternehmensverschlüsselung, Compliance und Datenisolierung                       |
| **Authentifizierung**           | Optionale Anmeldung mit Microsoft-Konto                                          | Erzwingt Anmeldung über **Microsoft Entra ID**                                    |
| **Nutzung**                     | Einzelaufgaben (Recherche, persönliche Projekte, Web-Browsing)                   | Professionelle Aufgaben (Dokumentenerstellung, Besprechungszusammenfassungen, Cloud-Management) |
| **Funktionen**                  | Grundfunktionen oder Pro-Version (z. B. Plugins, höhere Nutzungslimits)          | Integration in **Geschäftstools** (Microsoft 365, Power BI, Azure-Dienste)         |
| **Datenschutz**                 | Eingeschränkt; Datenschutz basiert auf öffentlichen Daten und verschlüsselten Sitzungen | Vollständiger Datenschutz gemäß **Unternehmensrichtlinien** und **RBAC**           |

---

## 4. Vergleich: Edge Copilot für persönlichen vs. geschäftlichen Gebrauch

### - **Edge Copilot für den persönlichen Gebrauch**
  - **Aufgaben**: Websuchen, Seitenzusammenfassungen, Produktvergleiche, allgemeine Recherche.
  - **Datenquellen**: Öffentliche Webinhalte.
  - **Sicherheit**: Grundlegende Verschlüsselung, nicht mit Unternehmensressourcen verknüpft.

### - **Edge Copilot für den geschäftlichen Gebrauch**
  - **Aufgaben**: Zusammenfassungen von Unternehmensdokumenten, Unterstützung bei der professionellen Kommunikation und Generierung von Einblicken basierend auf Unternehmensdaten.
  - **Datenquellen**: Unternehmensdaten aus **Microsoft 365** (SharePoint, OneDrive usw.).
  - **Sicherheit**: Vollständige Unternehmenskonformität, mit **rollenbasierter Zugriffskontrolle (RBAC)** und Integration in **Azure Active Directory**.


