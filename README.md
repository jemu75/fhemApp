> [!WARNING]
> Achtung: Diese Version von **FHEMApp** ist noch nicht für den produktiven Einsatz geeignet. Aktuell steht diese Version nur zum Testen zur Verfügung!

# FHEMApp 4
**FHEMApp** ist eine webbasierende, grafische Benutzeroberfläche für FHEM. Sie unterstützt die optimale Darstellung auf verschiedenen Geräten wie Desktop-PCs, Tablets oder Smartphones. **FHEMApp** bietet eine Vielzahl von Einstellungen ermöglicht die einfache Erstellung von Benutzeroberflächen. Programmierkenntnisse sind dabei nicht notwendig.
# Systemanforderungen
Für den Einsatz von **FHEMApp** wird FHEM(tm) benötigt. Weitere Informationen zu FHEM findest du unter https://fhem.de/
# Installation und Updates
Die Installation von **FHEMApp** kann direkt in FHEM erfolgen. Hierfür erstellt du in FHEM ein *fhemapp*-Device. 

```
define myapp fhemapp fhemapp4
```
Das *fhemapp*-Device ist für das Laden und Speichern der Konfigurationsdaten von **FHEMApp** zuständig und dient zudem für die Installation und Updates von **FHEMApp**. 

Bei der Installation wird automatisch ein neuer Ordner in deiner FHEM Installation unter *./opt/fhem/www/* erstellt. In diesem wird **FHEMApp** installiert. Weiterhin wird in deiner FHEM Installation unter *./opt/fhem/conf/* die Konfiguation abgelegt, die alle Einstellungen enthält. Für jedes *fhemapp*-Device wird dabei eine separate Konfigurationsdatei erstellt. Diese erthält den Name des *fhemapp*-Devices (z.B. *myapp*_config.fhemapp)

Updates von **FHEMApp** können ebenfalls direkt in FHEM ausgeführt werden.
```
set myapp update
```
> [!CAUTION]
> Beschreibung mit Benni abstimmen!
# Instanzen
In FHEM können mehrere *fhemapp*-Devices definiert werden. Hinter jedem Device wird eine separate Konfiguration gespeichert. Dies ermöglicht die Betrieb von beliebig vielen **FHEMApp**-Instanzen. Beim Aufruf von **FHEMApp** kann dann auf die jeweilige Instanz verwiesen. 
# Aufruf der App
Der Aufruf von **FHEMApp** erfolgt über einen Web-Browser. Am Ende der URL wird jeweils der Name des *fhemapp*-Device aus FHEM angegeben. Dessen Konfiguration wird beim Aufruf von **FHEMApp** verwendet. Bei der Installation in FHEM erfolgt der Aufruf nach folgendem Schema:
```
http(s)://<fhem_ip>:<fhem_port>/<fhem_pfad>/<fhemapp_verzeichnis>/index.html#/<fhemapp_config>
```
Beispiel zum Aufruf von FHEMapp
```
http://fhem:8083/fhem/fhemapp4/index.html#/myapp
```
## zusätzliche URL-Parameter
Zum Aufruf von **FHEMApp** können optionale URL-Parameter verwendet werden. Diese sind u.a. beim Betrieb von **FHEMApp** auf einem separaten Web-Server nötig. Die Angabe der URL-Parameter erfolgt in Form eines URL-Querystring (z.B. .../?dark=1&lang=en&loglevel=7)

> [!IMPORTANT]
> Beim Betrieb von **FHEMApp** auf einem separaten Web-Server müssen die Verbidungsparameter `protocol`, `server`, `port` und `path` angegeben werden!

|Parameter|Beschreibung|Beispiel|
|---|---|---|
|protocol|WEB Protokoll über das FHEM erreichbar ist|http oder https|
|server|url bzw. IP-Adresse unter der FHEM erreichbar ist|fhem|
|port|Port über den FHEM erreichbar ist|8083|
|path|Pfad der FHEM Installation|fhem|
|dark|Festlegen ob **FHEMApp** im dunklen Farbschema geöffnet wird|1
|lang|Sprache in der **FHEMApp** geöffnet wird|de, en, ...|
|xhr|Umschaltung auf Longpoll wenn Browser kein websocket unterstützt|1|
|loglevel|Detailgrad der Protokollierung für Fehleranalyse über die Browserkonsole (*1=status, 2=error, 3=warnings, 4=infos, 5=all request to fhem, 6=received events from fhem, 7=details, 8=all received events from FHEM*)|1...8|
# Einstellungen
**FHEMApp** ist in drei wesentliche Bereiche untergliedert, welche individuell konfiguriert werden können. 
* die **Kopfzeile** im oberen Bereich
* die **Navigationsleiste** auf der linken Seite
* den Anzeigebereich für die **Panels**

Nachdem Einstellungen in **FHEMApp** angepasst wurden, müssen diese gespeichert werden. Dies erfolgt über den Button zum Speichern oben rechts im Einstellungsfenster. Hier können Einstellungen, die seit dem letzten Speichern vorgenommen wurden, auch wieder rückgängig gemacht werden.

Der Zugriff auf die Einstellungen über **FHEMApp** ist im standardmäßig ausgeblendet, damit die Konfiguration nicht von jedem Benutzer verändert werden kann. Wenn der Menüpunkt *Einstellungen* im [Optionsmenü](#optionsmenü) ausgeblendet ist, gelangt man durch Angabe des Parameters `/settings` in der URL zu den Einstellungen.
```
http://fhem:8083/fhem/fhemapp4/index.html#/myapp/settings
```

# Kopfzeile
Unter den Einstellungen im Bereich Kopfzeile kann die Anzeige für das aktuelle Datum und Uhrzeit aktiviert werden. Die Anzeige für Datum und Uhrzeit erfolgt nur bei großen Bildschirmauflösungen. In der mobilen Ansicht werden Datum und Uhrzeit nicht angezeigt.

Weiterhin kann ein Hintergrundbild für die Kopfzeile festgelegt werden. Die Verwendung des Farbfilters (CSS Linear Gradient Definition) für das Hintergrundbild ermöglicht ein Anpassung des Hintergrundbildes an das festgelegte Farbschema. 
## Optionsmenü
Durch Aktivierung dieser Optionen wird das Optionsmenü oben rechts in der Kopfleiste eingeblendet. Folgende Optionen können aktiviert werden
|Option|Beschreibung|
|---|---|
|Tag/Nacht-Modus|Umschaltung zwischen hellem und dunklem Farbschema|
|Seite aktualisieren|Neuladen von **FHEMApp** auslösen. Diese Option ist im Normalfall nicht nötig. Sie kann jedoch im Einzelfall helfen, wenn Panels bei Longpoll-verbindungen nicht aktualisiert werden|
|Einstellungen|Aktiviert direkten Zugriff auf die Einstellungen von **FHEMApp** über das Optionsmenü|
|Sprachen|ermöglicht die Umstellung der Sprache. Siehe hierzu auch den Abschnitt [Sprachen](#sprachen)|

## Optionsmenü FHEM Befehle
Neben den festen Optionen können im Optionsmenü auch FHEM Befehle hinterlegt werden. Es können beliebig viele FHEM Befehle im Optionsmenü hinterlegt werden. Jeder Befehl kann mit einer individuellen Beschriftung und optional mehrsprachig (siehe auch [Sprachen](#sprachen)) sowie mit einem Icon versehen werden. Zudem muss das vollständige FHEM-Kommando angegeben werden.  
# Panels
Panels sind der Kernbaustein von **FHEMApp**. Sie dienen zur Anzeige bzw. zur Steuerung deiner FHEM Devices in **FHEMApp**. Ein Panel kann dabei auch Informationen aus mehreren FHEM [Devices](#element-devices) anzeigen bzw. steuern. Unter den Einstellungen im Bereich Panels können Panels erstellt und konfiguriert werden. 

Jedes Panel enthält 3 konfigurierbare Bereiche.
* den Bereich [status](#bereich-status) im oberen Teil des Panels
* den Bereich [main](#bereich-main) im mittleren Teil des Panels
* den Bereich [info](#bereich-info) im unteren Teil des Panels

Für jeden Bereich können vielfältige Eigenschaften konfiguriert und mit den *Internals*, *Readings* oder *Attributen* deiner FHEM-Devices verknüpft werden. Der Bereich [main](#bereich-main) kann zudem mit mehreren Ebenen versehen werden, um komplexe Panels zu erstellen.

Damit die Konfiguration nicht für jedes Panel erfolgen muss, können die Einstellungen auch in Vorlagen abgelegt und wiederverwendet werden. (siehe auch [Verwendung von Templates](#verwendung-von-templates))

Panels können in beliebigen Gruppen (z.B. nach Räumen oder Geräteart) zusammengefasst und dann über die Navigationsleiste ausgewählt und angezeigt werden. 
## Verbinden mit FHEM Devices
Jedes Panel kann mit einem oder mehreren FHEM-Devices verknüpft werden. Die Verknüpfung erfolgt in der [Panelkonfiguration](#panelkonfiguration) unter der [allgemeinen Einstallungen](#panel-allgemein) im Element [devices](#element-devices)
## Verwendung von Templates
Damit Konfigurationen nicht für jedes Panel erstellt werden müssen, können diese auch als Vorlage (template) erstellt und abgespeichert werden. Somit kann man Vorlagen für alle FHEM-Devices eines Typs (z.B. Schalter, Rolladenaktoren, Fensterkontakte, Thermostate...) erstellen. 

Nachdem eine Vorlage (template) erstellt wurde, kann diese den  gewünschten Panels zugewiesen werden. (siehe auch [Element template](#element-template))

Grundsätzlich können alle Elemente, die in einem Panel einstellbar sind auch in Vorlagen konfiguriert werden. In den nächsten Abschnitten wird die Panelkonfiguration beschrieben. Die Beschreibung trifft in gleicher Weise auch für Vorlagen zu.

> [!IMPORTANT] Paneleinstellungen behalten ihre Gültigkeit auch dann, wenn dem Panel eine Vorlage zugewiesen wurde.
## Zuweisung von Parametern

> vielleicht auch alles unter Panelkonfiguration beschreiben?

Alle konfigurierbaren Elemente in Panels folgen einem einheitlichen Definitions-Schema. Jedes Element kann mit *Internals*, *Readings* oder *Attributen* deiner FHEM-Devices verknüpft werden und auf deren Werte reagieren. Zudem können jedem Element unterschiedliche Eigenschaften zugewiesen werden. Welche Eigenschaften die einzelnen Elemente haben, wird in den folgenden Abschnitten beschrieben.

Definitions-Schema (allgemein). Alle erforderlichen Angaben werden durch einen `:` voneinander getrennt.
```
<reading>:<filter>:<eigenschaft_1>:<eigenschaft_2>:<eigenschaft_n>
```
### Zuweisung von Readings
...
### Verwendung von Filtern
...
## Ersetzungen
...
# Panelkonfiguration
...
## Panel allgemein
...
### Element devices
...
### Element template
...
### Element navigation
...
### Element expandable
...
### Element size
...
### Element sortby
...
### Element show
...
### Element iconmap
...
## Bereich Status
...
### Element bar
...
### Element imageurl
...
### Element title
...
## Bereich Main
...
### Main Element show
...
### Main Element divider
...
### Main Element typ
...
### Level Element divider
...
### Level Element size
...
### Level Element Button btn
...
### Level Element Button status
...
### Level Element Button click
...
### Level Element Button longClick
...
### Level Element Button longRelease
...
### Level Element Slider slider
...
### Level Element Image image
...
### Level Element Menu menu
...
### Level Element Info text
...
### Level Element Info icon
...
### Level Element Info status
...
## Bereich Info
...
### Element info
...
# Templates
...
# Navigation
...
# Farben
...
# Sprachen
https://de.wikipedia.org/wiki/Liste_der_ISO-639-1-Codes
...
