# Versionsinformationen
## v.3.36.2 (21.01.2023)
**Bugfix**
- Standard-Template: bei Verwendung von Menu wird jetzt auch die Iconfarbe und Disabled berücksichtigt

## v.3.36.1 (21.01.2023)
**Bugfix**
- Standard-Template: Icongröße für Menü korrigiert, wenn ein Slider verwendet wird

**sonstiges**
- sicherheitsrelevante Updates

## v.3.36.0 (27.11.2022)
**Features**
- Template Chart2: alternatives Template zu Chart mit verbesserten Konfigurarionsmöglichkeiten 
- Template Standard: Menü kann jetzt auch über ein Reading befüllt werden. Reading musst dabei folgendes beinhalten ["name1:cmd1","name2:cmd2","name3:cmd3",...]

## v.3.35.0 (10.07.2022)
**Features**
- Template Chart: über den Parameter ``calc`` sind jetzt Berechnungen von Werten möglich

## v.3.34.3 (09.07.2022)
**Bugfix**
- Standard-Template: Fehler in der Konfiguration des Slider behoben
- Cam-Template: verarbeitet Readings und statische URLs

**sonstiges**
- Update der materialIcon-Bibliothek
- sicherheitsrelevante Updates
## v3.34.1 (05.04.2022)

**Bugfix**
- Template Standard: Parameter ``menu`` reagiert auf die Ersetzung %d

**Features**
- Template Standard: Es können auch get-Befehle an FHEM übergeben werden
## v3.34.0 (04.04.2022)

**Features**
- Template Standard: neue Ersetzung %d liefert den NAME des FHEM-Devices
- Template Standard: neuer Parameter ``show`` innerhalb von main ermöglicht das Ein- bzw. Ausblenden von Ebenen
- Template List: neues Template zur Darstellung von Listen (siehe Doku)
- Template Standard: Zahlenwerte die mit der Ersetzung %n.x ausgegeben werden, werden nach der ausgewählten Ländereinstellung formatiert

**Bugfix**
- kurzzeitiges Anzeigen der Uhrzeit beim Ausklappen des Menüs in der mobilen Ansicht unterbunden

**sonstiges**
- Standardschriftart des Browser wird verwendet, damit sich FHEMApp noch besser in das jeweilige Gerät integriert.
## v3.33.0 (25.03.2022)

**Features**
- Template Standard: die beiden Texte text und text2 können jetzt über den optionalen Parameter ``align`` linksbündig bzw. rechtsbündig ausgerichtet werden
- Template Sysmon: der name kann jetzt auch mit einem reading befüllt werden
## v3.32.0 (23.03.2022)

**Features**
- Template Slider: die Tasten (links/rechts) sind jetzt uneingeschränkt nutzbar. Reagieren auf auf longClick bzw. longRelease
- Template Slider: kann unter Verwendung des Parameter ``text`` zusätzlich mit einem Label versehen werden

**Bugfix**
- in der mobilen Ansatz wird das kurzzeitige Anzeigen der Uhrzeit beim Aufklappen der Navigationsleiste unterbunden

**Dokumentation**
- das Template kodicontrol von draddy wurde in die Templatebibliothek übernommen und dokumentiert
## v3.31.0 (20.03.2022)

**Features**
- Wenn ihr FHEMApp in der mobilen Ansicht (1-spaltiges Layout) verwendet, könnt ihr optional im Header unterschiedliche Informationen über den Parameter ``mobileHeaderContent`` anzeigen. Hierfür stehen die Werte page oder clock oder date zur Verfügung. Siehe dazu auch die Dokumentation unter https://github.com/jemu75/fhemApp#anzeigeeinstellungen-f%C3%BCr-fhemapp-optional
Wichtig: der Parameter ``mobileHeader`` wird durch den o.g. Parameter abgelöst und steht künftig nicht mehr zur Verfügung.
## v3.30.3 (18.03.2022)

**Bugfix**
- Template sysmon: korrekte Darstellung bei Definition des Parameter ``error``
## v3.30.2 (15.03.2022)

**Bugfix**
- Template Chart: Zahlenwert werden unter Berücksichtigung der "locale" Einstellung formatiert.
## v3.30.1 (13.03.2022)

**Bugfix**
- Template Chart: Parameter ``daysAgo`` wird wieder korrekt verarbeitet
- Template Standard: FHEM Kommandos in Menüs mit ":" werden richtig verarbeitet wenn die HTML Entity &#058; verwendet wird.
## v3.30.0 (06.03.2022)

**Features**
- Template Chart: es können jetzt die Dezimalstellen im Parameter ``axis`` konfiguriert werden
- Standard Template: es kann jetzt die Farbe der Buttons (links, mittel, rechts) konfiguriert werden
- Template Panel: die Statusbar ist jetzt im Standard auf die Farbe "success" und Level "100%" gesetzt
## v3.29.0 (13.02.2022)

**Features**
- In der config.json steht ein neuer Parameter zur Verfügung. Über die Parameter ``clockFormat`` könnt ihr festlegen, wie die Uhr im Header angezeigt werden soll. Die möglichen Formatoptionen könnt ihr aus der JavaScript-Funktion toLocaleString() und hier konkret dem Parameter ``options`` entnehmen.
## v3.28.0 (16.11.2021)

**Features**
- In der config.json stehen zwei neue Parameter zur Verfügung. Über die Parameter ``expandGroups`` bzw. ``expandRooms`` könnt ihr festlegen, ob die Gruppen bzw. Räume in der Navigationsleiste beim Starten von FHEMApp geöffnet oder geschlossen sein sollen.
## v3.27.0 (07.11.2021)

**Features**
- Template Chart:
der Parameter lineWidth wurde aus setup nach chartDef verschoben !
- Template Chart: im Parameter ``axis`` in chartDef kann die Achsenbeschriftung über ``no-label`` optional ausgeblendet werden
- Template Chart: neue Parameter in chartDef verfügbar
Parameter ``lineWidth`` in chartDef definiert Linienbreite (Standardwert 4)
Parameter ``markers`` in chartDef definiert Größe der Datenpunkte in Linien (Standardwert 0 = keine Datenpunkte)
## v3.26.1 (17.10.2021)

**Bugfix**
- die "Ersetzung" %a (für ago) sollte jetzt auch unter Safari korrekt angezeigt werden.
## v3.26.0 (14.10.2021)

**Features**
- es steht eine neue "Ersetzung" (%a für ago) zur Verfügung, welche die verstrichene Zeit zwischen Zeitstempel des Readings und jetzt zurück liefert. siehe Dokumentation
## v3.25.0 (13.10.2021)

**Features**
- Template Chart: wurde um den Parameter Diagrammart erweitert. siehe Dokumentation https://github.com/jemu75/fhemApp#template-chart
## v3.24.0 (12.09.2021)

**Features**
- Template Standard und Template weather: über den Parameter ``expanded`` in setup kann definiert werden, ob das Template beim Laden ausgeklappt wird. Dies setzt voraus, dass im jeweiligen Template mehrere Ebenen zur Verfügung stehen.
## v3.23.0 (24.06.2021)

**Features**
- Template Chart: für die Y-Achsen kann jetzt optional min und max definiert werden

**Bugfix**
- Template Scenes: korrekte Darstellung der Texte im Dropdown-Menü
## v3.22.2 (01.06.2021)

**Bugfix**
- Template Thermostat: desired-temp off wird korrekt dargestellt.
## v3.22.1 (25.05.2021)

**Bugfix**
- Template weather: korrekte Zuordnung der Tage bei Verwendung von Proplanta
## v3.22.0 (23.05.2021)

**Features**
- Template weather: kann jetzt auch für Proplanta verwendet werden
## v3.21.2 (23.05.2021)

**Bugfix**
- Template Standard: Doppelpunkt (&#058;) wird bei readingunabhängigen Definitionen richtig konvertiert.

**Features**
- Template Standard: bei Verwendung von midMenu wird Parameter ``text`` berücksichtigt sofern dieser definiert ist.
## v3.21.1 (18.05.2021)

**Bugfix**
- Template Infoleiste: Farben von Icons werden korrekt dargestellt
## v3.21.0 (16.05.2021)

**Features**
- neues Template cam steht jetzt zur Verfügung siehe

**Bugfix**
- aktive Menüeinträge werden genau geprüft und Häkchen damit nur einmal gesetzt

**sonstiges**
- Dokumentation für switch angepasst (leftIcon -> leftBtn, rightIcon -> rightBtn)
## v3.20.2 (13.05.2021)

**Bugfix**
- Template Panel: In PanelItems mit menu wird das aktive Menüelement gekennzeichnet
- Standard Template: Fehler bei Verwendung des Parameters ``expand`` wurde behoben
## v3.20.1 (12.05.2021)

**Bugfix**
Fehler bei Aktualisierung der Statusbar in Verbindung mit connected-Devices behoben
## v3.20.0 (12.05.2021)

**Features**
- Standard-Template: es steht jetzt auch für die mittlere Taste ein Menü zur Verfügung (midMenu)
- Standard-Template: in Menüs wird der aktuelle Wert gekennzeichnet (Prüfung erfolgt auf Basis von cmd)
- Templates: Farbe der Icons in der Infoleiste kann optional angepasst werden
## v3.19.0 (10.05.2021)

**Features**
- neuer Parameter ``show`` in setup verfügbar. siehe

**Bugfix**
- Template Panel: bei Farbeänderung in PanelItems wird diese korrekt im Panel dargestell
## v3.18.2 (08.05.2021)

**Bugfix**
- Template Panel: wird auch angezeigt wenn kein Parameter ``setup`` in appOptions definiert wurde.
- Template Panel: Statusbar wird bei Wert 0 korrekt angezeigt.
## v3.18.1 (07.05.2021)

**Bugfix**
- Template Chart: chartDef reagiert jetzt auf Angabe der Farbe
## v3.18.0 (06.05.2021)

**Features**
- longpoll als Fallback für websocket Verbindung möglich. (löst Verbindungsprobleme bei iOS Geräten) Dokumentation siehe
## v3.17.1 (06.05.2021)

**Bugfix**
- Template Panel: rechte Taste sendet wieder Kommando an FHEM
## v3.17.0 (06.05.2021)

**Features**
- Template Chart: Status und Info können jetzt in appOptions über den Parameter ``setup`` konfiguriert werden

**Optimierungen**
- alle Templates: Texte in Infoleiste werden mit "..." reduziert, wenn Ausgaben zu lang sind
- debugMode: Sortierung und Link zum FHEM-Device werden jetzt rechts neben dem Titel angezeigt
## v3.16.0 (05.05.2021)

**Features**
- Template Standard: Alternativ zu text und text2 kann eine weitere Taste in der Mitte des "main-Bereiches" definiert werden.
- die Template-Vorlage sonosplay wurde integriert und dokumentiert. Diese kann alternativ zu dem statischen Template sonos eingesetzt und frei angepasst werden.

**Optimierungen**
- Anzeige der json-Daten im Debugmodus kann jetzt manuell selektiert und kopiert werden, da das Kopieren in die Zwischenablage mittels Button nicht zuverlässig funktioniert.
## v3.15.2 (03.05.2021)

**Bugfix**
- Template Standard: "Expand-Button" bzw. "Level-Button" wird wieder angezeigt
## v3.15.0 (02.05.2021)

**Bugfix**
- allgemein: "Longpress" markiert keine Elemente mehr
- Template Sonos: Slider mit Farbvariable "success" verknüpft

**Features**
- neuer Parameter ``expand`` in Standard Template verfügbar. Dokumentation siehe
- Debugmodus: Json-Daten können via Button in Zwischenablage kopiert werden
## v3.14.1 (27.04.2021)

**Bugfix**
- Standard-Template: Slider verarbeitet Werte mit Nachkommastellen richtig
## v3.14.0 (26.04.2021)

**Features**
- Templatedefinitionen: unter status können jetzt die beiden Parameter ``min`` und ``max`` definiert werden. Dies ist wichtig, wenn an die Statusbar bzw. an die Statuscircle Werte übergeben werden, die nicht im Bereich zwischen 0 und 100 liegen.
## v3.13.5 (25.04.2021)

**Bugfix**
- keine Fehlermeldung, wenn csrf-Token in FHEM auf "none" gesetzt ist

**Optimierung**
- Parameter ``connected`` wird in PanelItems verarbeitet
## v3.13.4 (25.04.2021)

**Bugfix**
- Template Wetter: Wochentage werden in korrekter Reihenfolge dargerstellt

**Optimierung**
- Template Sysmon: wurde auf Mehrsprachigkeit umgestellt
## v3.13.3 (24.04.2021)

**Bugfix**
- Template Chart: der Parameter ``daysAgo`` in chartDef wird jetzt ohne Angabe des Minus als Vorzeichen erkannt. Doku wurde entsprechend angepasst.

**Optimierung**
- Systemprotokoll: es werden jetzt bei bestimmten Logdaten zusätzliche Informationen zur Verfügung gestellt. Diese können über die "Büroklammer" rechts im Log aufgerufen werden.
## v3.13.2 (23.04.2021)

**Bugfix**
- Template Chart: Zeit auf X-Achse mit Datenpunkten syncronisiert
- Template Chart: Datum "bis" berücksichtigt den kompletten Tag (also bis 23:59:59 Uhr)
- Datum im Header wird bei mobiler Ansicht ausgeblendet
## v3.13.1 (23.04.2021)

**Bugfix**
- Standard-Template: Fehler beim Senden von Kommando's an FHEM behoben.
## v3.12.3 (19.04.2021)

**Bugfix**
- Ersetzung von Doppelpunkten in Wertzuweisungen korrigiert
- Template Panel: Änderung der Panelfarbe optimiert