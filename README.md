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

Beispiel zum Aufruf von FHEMapp mit zusätzlichen Parametern
```
http://fhem:8083/fhem/fhemapp4/index.html#/myapp/?dark=1&lang=en
```
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
Unter den [Einstellungen](#einstellungen) im Bereich Kopfzeile kann die Anzeige für das aktuelle Datum und Uhrzeit aktiviert werden. Die Anzeige für Datum und Uhrzeit erfolgt nur bei großen Bildschirmauflösungen. In der mobilen Ansicht werden Datum und Uhrzeit nicht angezeigt.

Weiterhin kann ein Hintergrundbild für die Kopfzeile festgelegt werden. Die Verwendung des Farbfilters mit einer [CSS Linear Gradient Definition](https://www.w3schools.com/css/css3_gradients.asp) ermöglicht ein Anpassung des Hintergrundbildes an das festgelegte Farbschema. 
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
Panels bilden den Kernbaustein von **FHEMApp**. Alle Geräte die du in FHEM eingebunden hast, können in **FHEMApp** über Panels visualisiert und gesteuert werden. Jedes Panel besteht aus drei **Bereichen**. Jeder **Bereich** enthält verschiedene **Elemente**. Jedes **Element** kann mit *Readings*, *Attributes* oder *Internals* von FHEM Devices verknüpft werden. Damit die Konfiguration nicht für jedes Panel erfolgen muss, können [Vorlagen](#vorlagen) erstellt werden. Panels können in beliebigen Gruppen (z.B. nach Räumen oder Geräteart) zusammengefasst und dann über die Navigationsleiste zur Anzeige gebracht werden.

Panels enthalten drei konfigurierbare Bereiche
* den Bereich [status](#bereich-status) im oberen Teil des Panels
* den Bereich [main](#bereich-main) im mittleren Teil des Panels
* den Bereich [info](#bereich-info) im unteren Teil des Panels

Der Bereich [main](#bereich-main) kann zudem mit mehreren Ebenen versehen werden, um komplexe Panels zu erstellen.

## Konfiguration der Elemente
Die Konfiguration der Elemente in den verschiedenen Bereichen des Panels erfolgt nach einem einheitlichen Definitions-Schema. 
```
reading:value:property_1:property_2:...
```
Für jedes Element können mehrere Definitionen hinterlegt werden. So können beispielsweise Buttons ihr Aussehen abhängig vom Wert eines *Readings* verändern oder unterschiedliche Icons abhängig vom Wert eines *Readings* angezeigt werden. Neben *Readings* können auch *Attributes* und *Internals* für Definitionen verwendet werden. 

Jede Definition beginnt mit den beiden Parametern `reading` und `value`. Diese dienen dazu, das Element mit einem FHEM-Device zu verbinden und optional auf einen bestimmten Wert zu prüfen. Folgende Beispiele zeigen, wie der Parameter `reading` verwendet werden kann. 

|Beispiel|Beschreibung|
|---|---|
|`state`|liefert das FHEM **Reading** `state` vom Device das als erstes im Panel definiert ist|
|`state-ts`|liefert den **Zeitstempel** des FHEM Readings `state` vom Device das als erstes im Panel definiert ist|
|`a-alias`|liefert das FHEM **Attribut** `alias` vom Device das als erstes im Panel definiert ist|
|`i-NAME`|liefert das FHEM **Internal** `NAME` vom Device das als erstes im Panel definiert ist|
|`switch-state`|liefert das FHEM **Reading** `state` vom Device das mit dem Key `switch` im Panel definiert ist|
|`switch-state-ts`|liefert den **Zeitstempel** des FHEM Readings `state` vom Device das mit dem Key `switch` im Panel definiert ist|
|`switch-a-alias`|liefert das FHEM **Attribut** `alias` vom Device das mit dem Key `switch` im Panel definiert ist|
|`switch-i-NAME`|liefert das FHEM **Internal** `NAME` vom Device das mit dem Key `switch` im Panel definiert ist|

Eine Definition wird verwendet, wenn der Wert im Parameter `value` zutrifft. Es wird immer die erste zutreffende Definition verwendet.  Der Parameter `value` wird wie folgt geprüft.

|Beispiel|Beschreibung|
|---|---|
|`temperature:12:...`|Zahlenwert -> trifft zu wenn das *Reading* **größer oder gleich** *12* ist|
|`state:on:...`|Text -> trifft zu wenn das *Reading* den Text *on* **enthält**|
|`state:^on:...`|RegExp -> triff zu wenn das *Reading* mit dem Text *on* **beginnt**|
|`state::...`|Es erfolgt **keine weitere Prüfung**. die Definition wird verwendet.
## Ersetzungen
Ersetzungen bieten die Möglichkeit, Werte innerhalb von Element-Definitionen zurückzugeben und zu formatieren. Folgende Möglichkeiten für Ersetzungen gibt es.
|Ersetzung|gibt den Wert vom Parameter `reading`|
|---|---|
|%s|als Text zurück|
|%n()|als Ganzzahl zurück|
|%n(2)|als Zahl mit 2 Nachkommastellen zurück|
|%n(0,1)|als Ganzzahl mit einem **Offset** von +1 zurück|
|%n(1,-1.5)|als Zahl mit einer Nachkommastelle und einem **Offset** von -1,5 zurück|
|%d()|als Zeitstempel im gewählten Sprachschema zurück|
|%d(time)|als Zeitwert im gewählten Sprachschema zurück|
|%d(date)|als Datum im gewählten Sprachschema zurück|
|%d({ "weekday"\\: "long" })|als Wochentag im gewählten Sprachschema zurück (siehe auch [Datumsformatierung](https://www.w3schools.com/jsref/jsref_tolocalestring.asp))|

|Ersetzung|Beschreibung|
|---|---|
|%t(on)|gibt die Übersetzung für den Schlüssel `on` an. (siehe auch [Sprachen](#sprachen))|
|%v|liefert den aktuellen Wert von Slidern
|\\: oder \&#058;|kann zur Ausgabe von `:` innerhalb von Element-Definitionen verwendet werden|

|Beispiel|Reading|Ausgabe|Hinweis|
|---|---|---|---|
|`state::%s`|on|on|
|`temperature::%n(0)`|12.5|13|
|`desired-temp::%n(1,2)`|22.5|24,5|Komma und tausender Trennzeichen abhängig vom Sprachschema|
|`state-ts::%d()`|2023-12-17 17:53:32|17.12.2023 17:53:32|abhängig vom Sprachschema|
|`state-ts::%d(time)`|2023-12-17 17:53:32|17:53:32|abhängig vom Sprachschema|
|`state-ts::%d(date)`|2023-12-17 17:53:32|17.12.2023|abhängig vom Sprachschema|
|`state-ts::%d({ "weekday"\: "long" })`|2023-12-17 17:53:32|Sonntag|abhängig vom Sprachschema|
|`state::%t(on)`|on|an|wenn unter [Sprachen](#sprachen) für den Schlüssel *on* im Sprachschema *an* hinterlegt wurde|
|`temp::Temperatur\: %n(1)°C`|18.7|Temperatur: 18,7°C|
## Panel allgemein
In den allgemeinen Einstellungen für Panels wird festgelegt, mit welchen FHEM **Devices** das Panel verknüpft ist und ob eine **Vorlage** zur Darstellung des Panels verwendet werden soll. Weiterhin wird festgelegt, unter welchen Navigationspunkten das Panel zur Anzeige gebracht werden soll. Zusätzlich können verschiedene Einstellung zur Darstellung des Panels erfolgen.

Die Aktivierung der **erweitere Konfiguration** ermöglicht die Anpassung aller Bereiche und Elemente des Panels, wenn keine [Vorlage](#vorlagen) verwendet werden soll, oder bestimmte Einstellung einer verwendeten Vorlage überschrieben werden sollen.
### Element devices
Liste der FHEM-Devices, die mit dem Panel verknüpft sind. Es muss mindestens ein FHEM-Device mit einem Panel verknüpft werden.

|Parameter|Beschreibung|
|---|---|
|key|eindeutiger Bezeichner, der für den Parameter `reading` in Definitionen oder für FHEM Befehle in Definitionen benötigt wird|
|device|Name des FHEM Device, mit dem das Panel verknüpft ist|
### Element template
Optional kann eine [Vorlage](#vorlagen) ausgewählt werden, die für die Darstellung des Panels verwendet werden soll. Elemente die im Panel (unter **erweiterte Konfiguration**) definiert wurden, behalten ihre Gültigkeit wenn eine Vorlage verwendet wird. In diesem Fall werden die betreffenden Definitionen aus der Vorlage ignoriert. 
### Element navigation
Liste der Navigationspunkte, unter denen das Panel angezeigt wird. Im Gegensatz zu normalen Definitionen, werden hier **alle** Definitionen verwendet, deren Bedingungen zutreffen.  

|Parameter|Beschreibung|
|---|---|
|reading|siehe Parameter [reading](#konfiguration-der-elemente)|
|value|siehe Parameter [value](#konfiguration-der-elemente)|
|route|Navigationspunkt unter dem das Panel angezeigt werden soll. Die Angabe kann auf gleiche Weise wie im FHEM-Attribut [room](https://wiki.fhem.de/wiki/Room) erfolgen.  
### Element expandable
Dieses Element legt fest, ob ein Panel ausklappbar ist, sobald es mehr als eine aktive Ebene im Bereich [main](#bereich-main) enthält. Weiterhin kann festgelegt werden, ob das Panel beim Laden bereits ausgeklappt sein soll. 

|Parameter|Beschreibung|
|---|---|
|reading|siehe Parameter [reading](#konfiguration-der-elemente)|
|value|siehe Parameter [value](#konfiguration-der-elemente)|
|expandable| true \| **false**|
|expanded| true \| **false**|
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
# Vorlagen
Damit Konfigurationen nicht für jedes Panel erstellt werden müssen, können diese auch als Vorlage (template) erstellt und abgespeichert werden. Somit kann man Vorlagen für alle FHEM-Devices eines Typs (z.B. Schalter, Rolladenaktoren, Fensterkontakte, Thermostate...) erstellen. 

Nachdem eine Vorlage erstellt wurde, kann diese den gewünschten Panels in der [Panelkonfiguration](#panelkonfiguration) unter den [allgemeinen Einstellungen](#panel-allgemein) im Element [template](#element-template) zugewiesen werden.

Grundsätzlich können alle Elemente, die in einem Panel konfigurierbar sind auch in Vorlagen konfiguriert werden. 

> [!IMPORTANT] 
> Paneleinstellungen behalten ihre Gültigkeit auch dann, wenn dem Panel eine Vorlage zugewiesen wurde.
# Navigation
...
# Farben
...
# Sprachen
https://de.wikipedia.org/wiki/Liste_der_ISO-639-1-Codes
...
