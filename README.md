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
|dark|legt fest in welchem Farbmodus **FHEMApp** gestartet wird.|0 oder 1
|lang|Sprache in der FHEMapp angezeigt wird|de, en, ...|
|xhr|Umschaltung auf Longpoll wenn Browser kein websocket unterstützt|1|
|loglevel|Detailgrad der Protokollierung für Fehleranalyse über die Browserkonsole (*1=status, 2=error, 3=warnings, 4=infos, 5=all request to fhem, 6=received events from fhem, 7=details, 8=all received events from FHEM*)|1...8|
# Einstellungen
**FHEMApp** ist in drei wesentliche Bereiche untergliedert, welche individuell konfiguriert werden können. 
* die **Kopfzeile** im oberen Bereich
* die **Navigationsleiste** auf der linken Seite
* den Anzeigebereich für die **Panels**

Der Zugriff auf die Einstellungen von **FHEMApp** ist im standardmäßig ausgeblendet, damit die Konfiguration nicht von jedem Benutzer verändert werden kann. Zu den Einstellungen gelangt man durch Angabe der Route `settings` in der URL
```
http://fhem:8083/fhem/fhemapp4/index.html#/myapp/settings
```
# Kopfzeile
...
## Optionsmenü
...
## Optionsmenü FHEM Befehle
...
# Panels
...
## Verbinden mit FHEM Devices
...
## Verwendung von Templates
...
## Zuweisung von Parametern
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
