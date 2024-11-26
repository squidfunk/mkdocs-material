# Sicherheitsstandards für Internet-of-Things-Geräte (IoT)

Inhaltsverzeichnis

1 Einleitung ......................................................................................................3

1.1 Ausgangslage .........................................................................................................................3

1.2 Auftrag .....................................................................................................................................3

2 Herausforderungen für die IoT-Sicherheit..................................................5

2.1 Generelle Herausforderungen: Fehlende Anreize für Sicherheit bei IoT..........................5

2.2 Spezielle Herausforderungen und Gefahren im industriellen IoT .....................................5

3 Cyberangriffe mit Bezug zu IoT-Geräten ....................................................6

3.1 IoT und die verschiedenen Ziele von Cyberangriffen .........................................................6

3.2 Bekannte Cyberangriffe mit Bezug zu IoT............................................................................7

3.3 Fazit aus den Cyberattacken .................................................................................................7

4 Stand internationale Richtlinien für IoT-Geräte .........................................8

4.1 Internationale Standards und Richtlinien für IoT ................................................................8

4.1.1 Richtlinien für Hersteller............................................................................................................8

4.1.2 Richtlinien für den Betrieb.........................................................................................................9

4.2 Leitfäden zur Informationssicherheit für IoT-Geräte.........................................................10

4.3 Allgemeine Richtlinien zur Informationssicherheit...........................................................10

4.4 Fazit zu den Richtlinien für IoT-Geräte ...............................................................................10

5 Umsetzung von Standards bei Bund und kritischen Infrastrukturen ....11

6 Rechtliche Aspekte im IoT .........................................................................11

6.1 Datenschutz...........................................................................................................................11

6.2 Gewährleistung, Garantie und Produktesicherheit...........................................................13

6.3 Meldepflicht ...........................................................................................................................14

6.4 Ausblick: Entwicklung des Rechtsrahmens in der EU .....................................................14

7 Fazit .............................................................................................................15

## Page 3 of 16

Sicherheitsstandards für Internet-of-Things-Geräte (IoT)

3/16

1 Einleitung

Das Internet der Dinge (engl.: Internet of Things, IoT) ist omnipräsent und betrifft alle Bereiche der

Gesellschaft. Über IoT werden industrielle Prozesse über Firmengrenzen hinweg vernetzt. Genauso

gehört es heute zum Standard, dass die verschiedensten Arten von Konsumgütern über Sensoren

vernetzt und gesteuert sind: von der Einparkhilfe bei den Autos über die Drucksensoren in

Zahnbürsten bis hin zum Mikrofon/Kamera bei Spielzeug für Kinder.

Das IoT birgt ein riesiges Potential, da es viele Prozesse vereinfachen und effizienter machen kann,

es bringt aber auch Risiken mit sich. Wie bei vielen neuen Anwendungen stehen für die Hersteller bei

der Entwicklung der Geräte nicht die Sicherheitsaspekte, sondern der Nutzen und die Kosten im

Vordergrund. So erstaunt es nicht, dass sich Medienberichte zu Sicherheitsproblemen bei IoT- Anwendungen häufen und zunehmend Angriffe beobachtet werden können, bei welchen

Schwachstellen bei IoT gezielt ausnutzen.

Der vorliegende Bericht beleuchtet die Sicherheit von IoT-Geräten und soll aufzeigen, wie diese

besser gegen Cyberangriffe geschützt werden können. Er erklärt deshalb die besonderen

Herausforderungen und Risiken von Systemen mit IoT-Komponenten, betrachtet die bekanntesten

Cyberattacken im Zusammenhang mit IoT, zeigt den Stand der bereits existierenden Richtlinien zu IoT

auf und beleuchtet die rechtlichen Grundlagen für den Umgang mit IoT.

1.1 Ausgangslage

Das IoT hat in den letzten Jahren stark an Bedeutung gewonnen und das Thema wird medial wie

auch politisch immer mehr aufgegriffen. Es erweitert die bekannten Konzepte der digitalen

Technologien von „jederzeit“ (anytime) und „an jedem Ort“ (anyplace) mit der Konnektivität von „allem“

(anything). Die IoT-Technologie verändert und verbreitet sich rasend schnell. Prognosen sagen für

2020 50 Milliarden mit dem Internet verbundene Dinge voraus. Weitere Vorhersagen gehen davon

aus, dass zukünftig 200 Dinge pro Person verbunden sein werden.

Aufgrund der stetigen Verbindung zum Internet, steigt auch das Risiko für Cyberkriminalität. Die

Szenarien reichen dabei von Datenmissbrauch oder Spionage über Sabotage bis hin zur illegitimen

Nutzung der Rechenkapazitäten der Dinge. Der breiten Öffentlichkeit sind über die Medien inzwischen

viele Cyberattacken bekannt. Die Sensibilität der Bevölkerung ist vor allem durch Vorfälle gestiegen,

bei denen persönliche Daten zugänglich gemacht oder missbraucht worden sind. Besondere

Beachtung verdient das Thema IoT im industriellen Umfeld. Während in einem Produktionsbetrieb bei

einem Angriff beispielsweise die Produktion gestört oder unterbrochen werden kann, sind die

Auswirkungen eines Angriffs bei Betreibern kritischer Infrastrukturen potentiell viel drastischer.

1.2 Auftrag

Angesichts dieser Entwicklungen muss auch für die Schweiz untersucht werden, welche

Konsequenzen die Verbreitung von IoT für die Cybersicherheit hat und wie die Sicherheit von IoT- Geräten bestmöglich gewährleistet werden kann. Bundesrat und Parlament haben die Bedeutung von

IoT für die Cybersicherheit erkannt und entsprechende Prüfaufträge formuliert:

## Page 4 of 16

Sicherheitsstandards für Internet-of-Things-Geräte (IoT)

4/16

 17.4295 Po. Glättli «Sicherheitsstandards für Internet-of-Things-Geräte prüfen, weil

diese eine der grössten Bedrohungen der Cybersicherheit sind»: Der Bundesrat wird

ersucht, in einem Kurzbericht aufzuzeigen, wie im rasant wachsenden Bereich der ans

Internet angebundenen Geräte (Internet of Things, IoT) die Sicherheit dieser Geräte erhöht

und ihr Missbrauch für Cyberkriminalität erschwert werden kann. Abzuklären und aufzuführen

ist unter anderem:

1\. ein kurzer Überblick über grössere Internet-Attacken unter Verwendung von IoT-Geräten;

2\. der Stand internationaler Sicherheitsrichtlinien für IoT-Geräte (ähnlich den

Zulassungsbestimmungen für elektrische Geräte) und deren Umsetzung in der Schweiz;

3\. die Einführung interner Richtlinien für den Bund und bundesnahe Betriebe mit

Sicherheitsbedingungen zum Kauf und Einsatz von IoT-Geräten;

4\. die Einführung von Sicherheitsrichtlinien bei Betreibern kritischer Infrastruktur: zu

erfüllende Sicherheitsbedingungen zum Kauf und Einsatz von IoT-Geräten;

5\. die Möglichkeit, durch Meldepflichten oder Anreize die Chance zu erhöhen, dass bekannte

Sicherheitslücken von Geräten einer zentralen Stelle (z. B. Melani) gemeldet werden;

6\. die Möglichkeit, von den Herstellern zumindest während der Gewährleistungszeit

(Garantiefrist) Sicherheitsupdates für bekanntgewordene Sicherheitslücken einzufordern.

Der Bericht soll knapp und eingängig sein und ggf. sinnvolle Umsetzungen auf Verordnungs- oder Gesetzesstufe konkret ausführen. Dabei ist wo möglich die Unterstützung zur Schaffung

internationaler Standards oder zu deren Übernahme einer schweizerischen Insellösung

vorzuziehen.

 19.3199 Po. Reynard «Verbesserung der Sicherheit von mit dem Internet verbundenen

Produkten»: Der Bundesrat wird beauftragt, einen Bericht darüber vorzulegen, wie die

Sicherheit von auf dem Markt erhältlichen Produkten, die mit dem Internet verbunden sind, im

Hinblick auf den Datenschutz verbessert werden kann.

 Nationale Strategie zum Schutz der Schweiz vor Cyberrisiken (NCS), Handlungsfeld

«Standardisierung und Regulierung»: Informations-und Kommunikationstechnologie (IKT)-

Standardisierungen und -Regulierungen sind wichtige Instrumente zum Schutz vor Cyber- Risiken. Minimalanforderungen zu Schutzvorkehrungen stärken die Prävention und Vorgaben

zum Umgang mit Vorfällen (z. B. Meldepflichten) tragen zu einer verbesserten Reaktion bei.

Standardisierung und Regulierung sind auch im internationalen Umfeld wichtig, da sie mehr

Transparenz und Vertrauen in der globalisierten digitalen Gesellschaft schaffen. Bei der

Einführung von Standardisierungen und Regulierungen gilt es aber, die grossen Unterschiede

zwischen den Wirtschaftssektoren und den Unternehmen verschiedener Grösse zu beachten.

Zudem ist in jedem Fall das internationale Umfeld zu beachten. Standards und Regulierungen

müssen im grenzüberschreitenden Cyber-Raum international möglichst kompatibel sein.

Ebenfalls zu prüfen ist, ob und wie eine Meldepflicht für Cyber-Vorfälle eingeführt werden soll.

Der vorliegende Bericht fasst die bisherigen Arbeiten, welche im Rahmen dieser Aufträge

unternommen worden sind, zusammen. Im Wesentlichen basiert er auf den Resultaten einer

Auftragsstudie «Sicherheitsstandards im IoT»

1

, in welcher die Bedeutung von IoT in der

Cybersicherheit analysiert und damit Grundlagen zur Beantwortung der vielschichtigen Fragen liefert.

Er verwendet auch die Trendanalyse des Center for Security Studies (CSS) der ETH Zürich zum

Thema «The Challenges of Scaling the Internet of Things»

2

, in welcher ebenfalls der aktuelle

internationale Forschungsstand zum Thema reflektiert wird.

1 Hochschule Luzern (HSLU), Sicherheitsstandards im IoT - Herausforderungen des IoT und Übersicht IT- und IoT-Richtlinien, Oktober 2019

2 Center for Security Studies (CSS) der ETH Zürich, CYBER DEFENSE PROJECT, Trend Analysis: The Challenges of Scaling the Internet of

Things, August 2019

## Page 5 of 16

Sicherheitsstandards für Internet-of-Things-Geräte (IoT)

5/16

2 Herausforderungen für die IoT-Sicherheit

Bei der Betrachtung der Sicherheit im IoT ist es sinnvoll zwischen Anwendungen des IoT für

Endkunden und für die Industrie zu unterscheiden. Der Grund liegt vor allem darin, dass in den beiden

Segmenten verschiedene Methoden angewendet werden, um die Sicherheit zu gewährleisten. Sind es

bei Endkunden die Geräte selbst, welche eine bestimmte Sicherheit gewährleisten sollen, gilt es bei

industriellen Anwendungen zusätzlich die Netzwerke entsprechend den Sicherheitsanforderungen zu

segmentieren und sichern. In diesem Zusammenhang wird auch vom Industrial Internet of Things

(IIoT) gesprochen.

Verglichen mit IT-Systemen (z. B. für administrative Aufgaben) gibt es für Systeme mit IoT- Komponenten besondere Herausforderungen für die Cybersicherheit. In diesem Kapitel wird zuerst

verdeutlicht, welche Gefahren bei IoT-Geräten hinsichtlich der Informationssicherheit generell zu

beachten sind. Im zweiten Abschnitt wird auf die spezifischen Herausforderungen und Gefahren bei

industriellen IoT-Geräten eingegangen, da diese durch ihre Verbreitung bei kritischen Infrastrukturen

von besonderer Bedeutung sind.

2.1 Generelle Herausforderungen: Fehlende Anreize für

Sicherheit bei IoT

Kostendruck, Zeitdruck, mangelndes Bewusstsein und Verständnis darüber, wie Angreifer die

Sicherheitslücken von IoT-Geräten nutzen, führen zu unterschiedlichen Schwachstellen sowie deren

Ausnutzung. Nutzer von IoT-Geräten sind sich oft nicht bewusst, dass solche Geräte eine grosse

Angriffsfläche bieten können. Auf der Seite der Hersteller haben viele Anbieter kein Interesse daran,

Geräte mit Softwareupdates zu warten oder diese mit spezifischen Sicherheitsfunktionen

auszustatten. Sie denken eher kurzfristig und wollen einfach eine möglichst grosse Anzahl an neuen

IoT-Geräten verkaufen. Kommt hinzu, dass im Vergleich zur traditionellen IT in herkömmlich

eingebetteten Systemen die Sicherheit keine grosse Rolle spielte. Die Geräte sind in Sachen

Prozessor- und Storage-Kapazität vielfach limitiert, so dass gewisse Sicherheitsmerkmale schwierig

anwendbar sind (z. B. fehlende starke Verschlüsselung wegen mangelnder Prozessorstärke).

Dies führt dazu, dass weder eine kommerziell interessante Nachfrage noch ein ausreichendes

Angebot an sicheren IoT-Geräten besteht. Insbesondere bei Konsumgütern ist der Preisdruck sehr

gross und das Sicherheitsbewusstsein beim Endkunden sehr klein. Generell ist nicht zu erwarten,

dass ein ausreichend starker Marktdruck für die Verbesserung der Sicherheit bei IoT-Geräten

entstehen wird.

2.2 Spezielle Herausforderungen und Gefahren im

industriellen IoT

Industrielle Kontrollsysteme (engl. Industrial Control Systems, ICS), welche auch als IIoT bezeichnet

werden, sind hoch integrierte Computersysteme, die auch in kritischen Infrastrukturen wie der

Energieversorgung, dem Transportwesen oder bei der Wasseraufbereitung zur Prozesssteuerung

eingesetzt werden. Seit Jahren steigt die Zahl von Cyberattacken auf diese Kontrollsysteme.

Die damit verbundenen zusätzlichen Herausforderungen und Gefahren sind:

1\. Sensoren und Aktoren3

in Industrieanlagen waren früher Teil eines separaten, eigenständigen

sogenannten Sensor-Aktor-Netzwerks und nicht mit dem Internet verbunden. Das

Hauptaugenmerk beim Design solcher Systeme war bis anhin eine hohe Zuverlässigkeit und

Sicherheit im Sinne des Prozessablaufs. Da sie nicht mit dem Internet verbunden waren, wurden

sie nicht speziell gegen Cyberangriffe gesichert. Heute sind solche IIoT-Komponenten jedoch

3 Aktor: Elemente, die elektrische Signale und Strom in elektrische, thermische, chemische oder Strömungs-Energie transformieren

## Page 6 of 16

Sicherheitsstandards für Internet-of-Things-Geräte (IoT)

6/16

entweder direkt einem Datennetzwerk angeschlossen oder das alte Sensor-Aktor-Netzwerk wird

mittels Gateways4 mit dem Firmennetzwerk oder mit dem Internet sowie virtuellen Umgebungen

(Clouds) verbunden. Sind die Netzwerkverbindungen oder Cloudspeicher schlecht gesichert,

können bei einem Cyberangriff gefährliche Zustände in Industrieanlagen auftreten, welche

Auswirkungen auf Leib und Leben oder Gesundheit von Personen haben können.

2\. Hersteller von ICS und „Supervisory Control and Data Acquisition“-Anlagen (kurz SCADA- Systeme) implementieren immer häufiger Services, welche auf ein offenes Netzwerk sowie

drahtlose Verbindungen angewiesen sind. Auch werden zunehmend Sensoren, Aktoren und

Gateways direkt mit dem Internet verbunden, um so schnell und bequem auf Fehler im System

reagieren zu können. Bis 2001 wurden die meisten Angriffe auf ICS von intern, vom internen

Netzwerk ausgeübt. Erst mit der Vernetzung, wurden Angriffe aus dem Internet möglich.

3\. Industrieanlagen haben heute dutzende Microcontroller und Prozessoren mit Millionen von Zeilen

Programmcode eingebaut – auch für die Datenkommunikation ins Internet. Mit der steigenden

Komplexität der Anwendungen und deren hohen Anteil an Software werden die Anlagen immer

anfälliger für Fehler und Sicherheitslücken.

3 Cyberangriffe mit Bezug zu IoT-Geräten

IoT-Geräte können erstens selbst das Ziel von Cyberangriffen sein. Dies ist der Fall, wenn Angreifer

versuchen direkt auf die IoT-Geräte zuzugreifen, um diese zu manipulieren, zu steuern oder zu

missbrauchen. Die Beispiele reichen von Zugriffen auf Smart-Speakers oder Babyphones (um

Gespräche abzuhören), bis zu Manipulationen von Drehzahlen bei Motoren in Produktionsanlagen.

Zweitens können Angriffe auf IoT-Geräte dazu dienen, über diese Geräte in das lokale Netzwerk

einzudringen. Es erfolgt dabei keine Manipulation an der Steuerung der Geräte selber. Drittens

können Angriffe auf IoT-Geräte dazu dienen, Botnetze aufzubauen, um andere Computer oder Server

anzugreifen (z. B. mittels DDoS5 Attacke). Und viertens werden statt Daten, die Rechenkapazität der

Opfersysteme zweckentfremdet, um durch Berechnungen Kryptowährungen zu erzeugen (Crypto- oder Coin-Mining).

Diese grundlegenden Möglichkeiten machen IoT-Geräte als Ziel von Cyberangriffen attraktiv. Bevor

auf die wichtigsten Fälle eingegangen wird, werden einleitend die eigentlichen Ziele von

Cyberattacken aufgezeigt.

3.1 IoT und die verschiedenen Ziele von Cyberangriffen

Geld verdienen

Einer der Hauptgründe für Cyberattacken ist die Möglichkeit illegal Geld zu verdienen. Wem es

gelingt, ein Botnetz mit fernsteuerbaren Rechnern aufzubauen, kann dieses vermieten oder

verkaufen. Die schlecht geschützten IoT-Geräte werden von Cyberkriminellen für den Aufbau solcher

Botnetze6 genutzt. Sie führen mit der Rechenleistung dieser Geräte DDoS-Attacken aus, z. B. auf

Webshops, Websites oder andere online-Dienstleistungen. Auch die gezielte Verschlüsselung von

IoT-Geräten durch Ransomware (auch Verschlüsselungs- oder Erpressungstrojaner genannt) wird für

Angreifer zunehmend attraktiver. Da ein Ausfall von IoT-Geräte oft physische Funktionen

beeinträchtigen kann, eignen sie sich aus Sicht der Angreifer für Erpressungen der Eigentümer.

4 Gateway: Komponente (Hard- und/oder Software), welche zwischen zwei Systemen eine Verbindung herstellt.

5 Unter DoS (Denial of Service = Verweigerung des Dienstes) versteht man einen Angriff auf Computer-Systeme mit dem erklärten Ziel, deren

Verfügbarkeit zu stören. Im Fall einer durch eine Vielzahl von gezielten Anfragen verursachten, mutwilligen Dienstblockade spricht man von einer

Denial-of-Service-Attacke und wenn die Anfragen von einer grossen Zahl an Rechnern aus durchgeführt werden, von einer Distributed-Denial-of- Service (DDoS) Attacke.

6 Botnetz: Eine riesige Anzahl «gekaperter» Systeme, die vom Angreifer ferngesteuert werden können.

## Page 7 of 16

Sicherheitsstandards für Internet-of-Things-Geräte (IoT)

7/16

Sabotage

Als Sabotage wird die absichtliche Störung eines Prozessablaufs bezeichnet. Die Gefahr von

Sabotage ist insbesondere bei kritischen Infrastrukturen zu beachten. Bei Sabotageakten werden die

IoT-Geräte solcher Infrastrukturen gezielt angegriffen, mit der Absicht, die Versorgung mit

unverzichtbaren Gütern und Dienstleistungen, wie Energie, Verkehr oder Kommunikation zu stören

oder zu unterbinden und damit einen schwerwiegenden Schaden anzurichten. Aber auch das

Schadenspotential bei nicht kritischen Infrastrukturen und deren Nebeneffekte sind nicht unwesentlich.

So kann eine Störung in einem vermeintlich unkritischen System schlimmstenfalls ganze

Produktionsanlagen von wichtigen Industriegütern zum Stillstand bringen. Oder falls es das Geschäft

einer kritischen Masse an Firmen gleichzeitig betrifft, kann dies volkswirtschaftlich schwere

Auswirkungen haben.

Spionage

Als Spionage wird das unbemerkte Beschaffen, das Ausspähen von Informationen für politische,

wirtschaftliche oder militärische Ziele bezeichnet. Mit der zunehmenden Digitalisierung werden zur

Informationsbeschaffung vermehrt intelligente Computerprogramme (Malware, Trojaner) eingesetzt,

welche sich autonom in einem System einnisten und sensitive Daten abfangen und weiterleiten. Diese

Schadensprogramme können entweder über die Vernetzung verteilt oder über Sicherheitslücken in

ein System eingeschleust werden. Auch IoT-Geräte können zu Spionagezwecken ausgenutzt werden.

3.2 Bekannte Cyberangriffe mit Bezug zu IoT

In den vergangenen Jahren zeigte es sich, dass es für Hacker ein Leichtes ist Tausende oder gar

Millionen von IoT-Geräten zu übernehmen. Die wichtigsten bekannten Vorfälle von Cyberattacken in

Zusammenhang mit IoT-Komponenten sind gut dokumentiert und öffentlich zugänglich. In der

Auftragsstudie der HSLU «Sicherheitsstandards im IoT» findet sich ein Überblick über die

bekanntesten Cyberangriffe, an welchen das IoT wesentlich beteiligt war und sowie eine kurze

Erläuterung zu den Angriffen.

Als prominente Beispiele sind, «BASHLITE», «Mirai» sowie «BrickerBot» zu nennen. Die initiale

Version der Schadsoftware «BASHLITE» nutzte Schwachstellen in Geräten, vorzugsweise Routern,

aus und schloss die kompromittierten Komponenten zu einem Botnetz zusammen. Mittels

«BASHLITE» bzw. dessen Variationen haben Botnetz-Betreiber im 2016 über eine Million Geräte

kompromittiert und für die Durchführung von DDoS-Attacken ausgenutzt. Der Botnetz-Virus «Mirai»

dient zum Aufbau von Botnetzen, welches gezielte Angriffe auf IoT-Geräte wie Webcams, Router oder

Digitale Video-Recorder (DVR) ausführt. «Mirai» konnte innert wenigen Wochen Millionen von

Geräten infizieren. Die Auswirkungen eines Angriffs mit einer neuen Variante des «Mirai-Botnetz»

hatten 2016 einen grossen Teil der Internetverfügbarkeit beeinträchtigt. «BrickerBot» ist eine IoT- Malware, welche sich in verschiedenen IoT-Geräten einnistet und diese durch überschreiben des

Betriebssystems und der Systempartition zerstört. Als weiteres Beispiel ist ein Angriff aus dem Jahre

2015 zu erwähnen. Dieser wurde von Hackern angekündigt und demonstriert. Dabei konnten sie die

digitalen Systeme eines Fahrzeuges übernehmen und dieses aus der Ferne übers Internet steuern.

Dieser Angriff veranlasste einen der grössten Automobilhersteller der Welt zum Rückruf von 1,4

Millionen seiner Fahrzeuge. Und als wirkungsvoll ist ebenfalls der Schadcode «Triton» zu nennen, mit

welchem unbekannte Angreifer im Sommer 2017 die Sicherheitssysteme der Produktionsanlagen

einer petrochemischen Fabrik übernehmen konnten. Damit hätten sie lebensgefährliche Unfälle

verursachen können.

3.3 Fazit aus den Cyberattacken

Diese realen Angriffe verdeutlichen das massive Potenzial, mittels oder über IoT-Geräte Störungen

und sogar Zerstörungen in relativ kurzer Zeit zu verursachen. Darüber hinaus zeigen sie klar auf, dass

Angreifer erfolgreich die Kontrolle über IoT-Geräte übernommen oder diese als Mittel benutzt haben,

um ihre Ziele zu erreichen. Die Angriffe sind komplex und sehr vielschichtig, von gestreuten bis hin zu

## Page 8 of 16

Sicherheitsstandards für Internet-of-Things-Geräte (IoT)

8/16

gezielten und spezialisierten Angriffen. Um sich gegen diese Cyberangriffe grundsätzlich zu schützen,

sollten Unternehmen bewährte Sicherheitsverfahren anwenden, einschliesslich der Kenntnis der in

ihrem Netzwerk laufenden IoT-Geräte, der Änderung ihrer Standardpasswörter sowie der

Sicherstellung, dass die IoT-Geräte vollständig gepatcht sind.

Was aus den verfügbaren Daten zu Cyberattacken aber kaum hervorgeht, ist der finanzielle Schaden,

welchen die erfolgten Angriffe anrichten. Das liegt u. a. daran, dass die angegriffenen Firmen, aus

Wahrung von Geschäftsgeheimnisses oder aus der Furcht vor Reputationsschäden, sehr

zurückhaltend mit Meldungen oder Informationen darüber sind. DDoS Angriffe z. B. haben oft zeitlich

begrenzte Ausfälle der IT-Infrastruktur zur Folge. Hingegen können Sabotage-Angriffe, welche

kritische Infrastruktur ausser Betrieb setzen oder sogar beschädigen, zu sehr hohen finanziellen

Folgekosten führen.7 Somit muss die korrekte Abwehrstrategie gegen Cyberattacken nicht nur auf die

Häufigkeit oder Reichweite der Angriffe ausgerichtet sein, sondern muss auch den potentiellen

Schaden berücksichtigen, welcher aus Attacken resultieren kann. Ein entsprechendes

Risikomanagement hilft Betreibern von IoT-Systemen dabei, hierzu sinnvolle Massnahmen zu

definieren.

4 Stand internationale Richtlinien für IoT-Geräte

4.1 Internationale Standards und Richtlinien für IoT

Die Anzahl offizieller internationaler Standards und Richtlinien zur Informationssicherheit spezifisch für

IoT-Geräte sind überschaubar. Es ist jedoch zu erwarten, dass sich diese relativ neuen Standards

rasch weiterentwickeln werden und weitere Standards hinzukommen. Die Richtlinien können unterteilt

werden in solche, die für Hersteller von Bedeutung sind und von diesen beachtet werden sollten,

sowie Richtlinien, die den Lebenszyklus von IoT-Geräten in einer Organisation definieren und einen

sicheren Betrieb gewährleisten sollen. Die letzteren beschreiben, was in den unterschiedlichen

Phasen von Geräteauswahl bis Ausserbetriebnahme wichtig ist. Natürlich gibt es auch Standards oder

Richtlinien welche beide Aspekte betrachten.

4.1.1 Richtlinien für Hersteller

DIN SPEC 27072: IoT-fähige Geräte – Mindestanforderungen zur Informationssicherheit

Die DIN SPEC 27072 wurde unter Beteiligung von Herstellern, dem deutschen Bundesamt für

Sicherheit in der Informationstechnik (BSI) sowie weiteren Prüfstellen durch den deutschen

Normenverband entwickelt und im Mai 2019 veröffentlicht. Sie legt Mindestanforderungen an IoT- Geräte aus dem Small Business oder Home Umfeld fest, welche gegen elementare Angriffe aufgrund

von Designschwächen (z. B. verwenden von Standardpasswörtern) schützen sollen. Fokus der

Spezifikation ist die Basisabsicherung der IP-basierten Kommunikation für IoT-Geräte. Es werden IT- Sicherheitseigenschaften festgelegt, welche bei der Entwicklung von Geräten berücksichtigt werden

sollen (Security-By-Design). Die Geräte sollen dadurch gegen skalierbare Cyberangriffe aus dem

Internet (wie z. B. Mirai) geschützt werden.

Die Grenzen der neuen Spezifikation liegen darin, dass sie sich auf Vorgaben zu einzelnen Geräten

beschränken. IoT-Geräte sind aber in der Regel keine Stand-Alone Lösung, sondern in ein IT-System

eingebunden. Weitere Komponenten eines solchen Systems (zugehörige Services, Apps, Desktop- Software usw.) werden nicht betrachtet.

ETSI TS 103 645: Cyber Security for Consumer Internet of Things

7 Für die Schweiz bieten die Resultate der Innovationserhebung der Konjunkturforschungsstelle der ETH (KOF) aus dem Jahr 2016 Anhaltspunkte

für die Einschätzung der finanziellen Schäden. Die Studie hat ergeben, dass kleinere Unternehmen häufiger einen Erwerbsausfall durch

Cyberangriffe als mittlere und grosse Unternehmen meldeten, aber grosse Unternehmen jedoch öfters grösseren Aufwand betreiben mussten, um

Schadensfälle zu beheben. Vgl. Innovation in der Schweizer Privatwirtschaft, Ergebnisse der innovationserhebung 2016 der

Konjunkturforschungsstelle der ETH (KOF) im Auftrag des Staatssekretariats für Bildung, Forschung und Innovation (SBFI).

## Page 9 of 16

Sicherheitsstandards für Internet-of-Things-Geräte (IoT)

9/16

Das Europäische Institut für Telekommunikationsnormen (ETSI) hat im Februar 2019 einen Standard

zur Cybersicherheit von IoT bei Konsumgütern herausgegeben. Das Dokument beschreibt allgemein

anerkannte und bewährte Verfahren zur Sicherung von IoT-Geräten mit ergebnisorientierten

Bestimmungen, ohne allzu stark in technische Details zu gehen. Ziel der Spezifikation ist es, alle an

der Entwicklung und Herstellung von IoT-Geräten beteiligten Parteien bei der Sicherung ihrer

Produkte zu unterstützen. Der Fokus liegt auf technischen Kontrollen und organisatorischen

Richtlinien, die bei der Vermeidung der wichtigsten und weit verbreiteten Sicherheitslücken

berücksichtigt werden sollen.

Das Dokument enthält Bestimmungen für die Sicherheit von IoT-Geräten im Consumer Umfeld die mit

dem Internet verbunden sind. Dazu gehören Geräte wie:

 Kinderspielzeug und Babyphone;

 sicherheitsrelevante Produkte wie Rauchmelder und Türschlösser;

 intelligente Kameras, Fernseher und Lautsprecher;

 tragbare Gesundheitstracker;

 Hausautomations- und Alarmsysteme;

 Haushaltgeräte (z. B. Waschmaschinen, Kühlschränke);

 Smart Home Assistenten.

Diese technische Spezifikation bietet Unternehmen, die an der Entwicklung und Herstellung von

solchen Geräten beteiligt sind, grundlegende Hinweise zur Umsetzung der Bestimmungen.

IEC 62443-3-3: Security for industrial process measurement and control – Network and system

security

Die International Electrotechnical Commmission (IEC) ist eine internationale Normungsorganisation im

Bereich der Elektrotechnik. 2013 hat die IEC den Standard IEC 62443-3-3 veröffentlicht. Dieser

beschreibt das Umfeld zur Sicherung der informations- und kommunikationstechnischen Aspekte

industrieller Mess- und Regelsysteme einschliesslich ihrer Netzwerke und Geräte in diesen

Netzwerken während dem gesamten Lebenszyklus der Anlage. Sie gibt Hinweise zu den

Anforderungen an die Betriebssicherheit einer Anlage und richtet sich in erster Linie an die

Eigentümer/Betreiber von Automatisierungssystemen, die für den Betrieb des Industrial Control

System (ICS) verantwortlich sind. Die betrieblichen Anforderungen dieser Spezifikation können auch

für weitere Gruppen im Umfeld des ICS von Interesse sein:

 Automatisierungssystem-Designer;

 Hersteller von Geräten, Subsystemen und Systemen;

 Integratoren von Subsystemen und Systemen.

Das Dokument berücksichtigt folgende Punkte:

 Migration/Evolution bestehender Systeme;

 Erfüllung von Sicherheitszielen mit bestehenden COTS8

\-Technologien und -Produkten;

 Gewährleistung der Zuverlässigkeit/Verfügbarkeit der gesicherten Kommunikationsdienste;

 Anwendbarkeit auf Systeme jeder Grösse und jedes Risikos (Skalierbarkeit);

 Koexistenz von Sicherheits-, Rechts- und Regulierungs- und Automatisierungsfunktionalitäten

mit Sicherheitsanforderungen.

4.1.2 Richtlinien für den Betrieb

BSI IT-Grundschutzkompendium: Umsetzungshinweise zum Baustein SYS.4.4 Allgemeines IoT- Gerät

Das Bundesamt für Sicherheit in der Informationstechnologie (BSI) hat Umsetzungshinweise für den

Einsatz von IoT-Geräten veröffentlicht. Die Umsetzungshinweise beschreiben die Vorgehensweise

und Massnahmen, wie IoT-Geräte während ihrem gesamten Lebenszyklus – von Planung- und

Konzeptionsphase bis Ausserbetriebnahme – in einer Organisation betrieben werden sollen und was

8 COTS steht für „commercial off-the-shelf“ bzw. „components-off-the-shelf“. seriengefertigte Produkte aus dem Elektronik- oder Softwaresektor

(vgl. Standardsoftware), die in grosser Stückzahl völlig gleichartig (ugs. „von der Stange“) aufgebaut und verkauft werden
