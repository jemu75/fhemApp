# FHEMApp
**FHEMApp** ist eine Web-Application zur Steuerung deiner Smarthome Umgebung. Sie wurde als Frontend für den Einsatz unter FHEM(tm) entwickelt. **FHEMApp** ist für den Betrieb auf unterschiedlichen Betriebssystemen und Geräten optimiert. **FHEMApp** kann sehr einfach konfiguriert werden, ohne das dafür Programmierkenntnisse erforderlich sind.

![](./docs/media/example_desktop_1.png)*Beispiel für eine Startseite in der Desktopansicht*

![](./docs/media/example_desktop_2.png)*Beispiel für Geräte in der Desktopansicht*

![](./docs/media/example_desktop_3.png)*Beispiel für Grafiken in der Desktopansicht*

![](./docs/media/example_mobile_1.png)*Beispiele für mobile Ansicht*

![](./docs/media/example_mobile_2.png)*Beispiele für mobile Ansicht*

![](./docs/media/example_settings_1.png)*Beispiel für Einstellungen*

![](./docs/media/example_settings_2.png)*Beispiel für Konfiguration von Templates*

![](./docs/media/example_settings_3.png)*Beispiel für Konfiguration von Sprachvariablen*


# Systemanforderungen
Für den Einsatz von **FHEMApp** wird FHEM(tm) benötigt. Weitere Informationen zu FHEM findest du unter https://fhem.de/
# Installation und Updates
Die Installation von **FHEMApp** erfolgt in FHEM. Hierfür erstellst du in FHEM über den folgenden Befehl ein *fhemapp*-Device. 

```
define myapp fhemapp ./www/fhemapp4
```
Das *fhemapp*-Device ist für das Laden und Speichern der Konfigurationsdaten von **FHEMApp** zuständig und dient zudem für die Installation und Updates von **FHEMApp**. 

Bei der Installation wird automatisch ein neuer Ordner in deiner FHEM Installation unter */opt/fhem/www/* erstellt. In diesem wird **FHEMApp** installiert. Weiterhin wird in deiner FHEM Installation unter */opt/fhem/conf/* eine Konfigurationsdatei abgelegt, die alle Einstellungen enthält. Für jedes *fhemapp*-Device wird dabei eine separate Konfigurationsdatei erstellt. Diese erthält den Name des *fhemapp*-Devices (z.B. *myapp*_config.fhemapp)

# Instanzen
In FHEM können mehrere *fhemapp*-Devices definiert werden. Hinter jedem Device wird eine separate Konfiguration gespeichert. Dies ermöglicht die Betrieb von beliebig vielen **FHEMApp**-Instanzen. Beim Aufruf von **FHEMApp** kann dann auf die jeweilige Instanz verwiesen. 
![](./docs/media/example_fhem_fhemapp_devices.png)
<br>*Beispiel für zwei unterschiedliche FHEMApp-Instanzen in FHEM*

# Aufruf von FHEMApp
Der Aufruf von **FHEMApp** erfolgt grundsätzlich über die gleiche URL, über die auch FHEM erreichbar ist. Die URL muss wie folgt aufgebaut sein, damit die richtige Installation und Instanz von **FHEMApp** aufgerufen wird.
```
http(s)://<fhem_ip>:<fhem_port>/fhem/<fhemapp_verzeichnis>/index.html#/<fhemapp_instanz>
```
Beispiel zum Aufruf von FHEMapp
```
http://fhem:8083/fhem/fhemapp4/index.html#/myapp
```
Wenn **FHEMApp** auf einem separaten Web-Server betrieben wird, dann muss die URL mit `#/<fhem_instanz>` enden.
## zusätzliche URL-Parameter
Es können zusätzliche Parameter als Querystring in der URL angegeben werden.
Diese sind u.a. beim Betrieb von **FHEMApp** auf einem separaten Web-Server nötig. 

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
|loglevel|Detailgrad der Protokollierung für Fehleranalyse über die Browserkonsole. Ab dem loglevel 7 wird die Kopfzeile von **FHEMApp** umgeschaltet und ein Infosymbol angzeigt. Bei Klick auf das Infosymbol werden weitere Systeminformationen von **FHEMApp** angezeigt. (*1=status, 2=error, 3=warnings, 4=infos, 5=all request to fhem, 6=received events from fhem, 7=details, 8=all received events from FHEM*)|1...8|

Beispiel zum Aufruf von FHEMapp mit zusätzlichen Parametern
```
http://fhem:8083/fhem/fhemapp4/index.html#/myapp/?dark=1&lang=en
```
# Einstellungen
Für die Konfiguration deiner **FHEMApp**-Instanz(en) bietet die App einen separaten Bereich, in dem alle Einstellungen vorgenommen werden können. Nach dem Erstellen einer neuen Instanz gelangt man beim ersten Aufruf von **FHEMApp** direkt zu den Einstellungen.

Für den späteren Zugriff auf die Einstellungen kann man den Menüpunkt im [Optionsmenü](#optionsmenü) aktivieren. Alternativ kann man auch direkt über den entsprechenden URL-Pfad `...<fhemapp_instanz>/settings/` auf die Einstellungen zugreifen.

Nachdem Einstellungen in **FHEMApp** angepasst wurden, müssen diese gespeichert werden. Dies erfolgt über den Button zum Speichern oben rechts im Einstellungsfenster. Hier können Einstellungen, die seit dem letzten Speichern vorgenommen wurden, auch wieder rückgängig gemacht werden.

![](./docs/media/example_settings_4.png)*Beispiel für Konfiguration von Sprachvariablen*

# Kopfzeile
In den Einstellungen für die Kopfzeile kann die Anzeige für das aktuelle Datum und Uhrzeit aktiviert werden. Die Anzeige für Datum und Uhrzeit erfolgt nur in der Desktopansicht. In der mobilen Ansicht werden Datum und Uhrzeit ausgeblendet.

Weiterhin kann ein Hintergrundbild für die Kopfzeile festgelegt werden. Die Verwendung des Farbfilters mit einer [CSS Linear Gradient Definition](https://www.w3schools.com/css/css3_gradients.asp) ermöglicht ein Anpassung des Hintergrundbildes an das festgelegte Farbschema. 
## Optionsmenü
Durch Aktivierung der folgenden Optionen wird das Optionsmenü oben rechts in der Kopfleiste eingeblendet.
![](./docs/media/example_option_menu.png)
*Beispiel für Optionsmenü*

|Option|Beschreibung|
|---|---|
|Tag/Nacht-Modus|Umschaltung zwischen hellem und dunklem Farbschema|
|Seite aktualisieren|Neuladen von **FHEMApp** auslösen. Diese Option ist im Normalfall nicht nötig. Sie kann jedoch im Einzelfall helfen, wenn Panels bei Longpoll-verbindungen nicht aktualisiert werden|
|Einstellungen|Aktiviert direkten Zugriff auf die Einstellungen von **FHEMApp** über das Optionsmenü|
|Sprachen|ermöglicht die Umstellung der Sprache. Siehe hierzu auch den Abschnitt [Sprachen](#sprachen)|

## Optionsmenü FHEM Befehle
Neben den festen Optionen können im Optionsmenü auch FHEM Befehle hinterlegt werden. Es können beliebig viele FHEM Befehle im Optionsmenü hinterlegt werden. Jeder Befehl kann mit einer individuellen Beschriftung und optional mehrsprachig (siehe auch [Sprachen](#sprachen)) sowie mit einem Icon versehen werden. Zudem muss das vollständige FHEM-Kommando angegeben werden.  

# Panels
Alle Geräte die du in FHEM eingebunden hast, können innerhalb von **FHEMApp** in Panels angezeigt und gesteuert werden. Jedes Panel enthält drei **Bereiche**. Jeder Bereich enthält verschiedene **Elemente**. Jedes Element kann mit *Readings*, *Attributes* oder *Internals* von FHEM Devices verknüpft und abhängig von deren Wert gesteuert werden. Damit die Konfiguration nicht für jedes Panel erfolgen muss, können [Vorlagen](#vorlagen) erstellt werden. Panels können in beliebigen Gruppen (z.B. nach Räumen oder Geräteart) zusammengefasst und dann über die Navigationsleiste zur Anzeige gebracht werden.

* Bereich [status](#bereich-status) im oberen Teil des Panels
* Bereich [main](#bereich-main) im mittleren Teil des Panels
* Bereich [info](#bereich-info) im unteren Teil des Panels

![](./docs/media/example_panel.png)
<br>*Beispiel für ein Panel*

## Konfiguration der Elemente
Die Konfiguration der Elemente in den verschiedenen Bereichen des Panels erfolgt nach einem einheitlichen Definitions-Schema. 
`reading:value:prop1:prop2:...`

Jede Definition beginnt mit den beiden Parametern `reading` und `value`. Diese dienen dazu, das Element mit einem FHEM-Device zu verbinden und optional auf einen bestimmten Wert zu prüfen. Folgende Beispiele zeigen, wie der Parameter `reading` verwendet werden kann. 

|Beispiel|Beschreibung|
|---|---|
|`state`|liefert das FHEM **Reading** `state`|
|`state-ts`|liefert den **Zeitstempel** des FHEM Readings `state`|
|`a-alias`|liefert das FHEM **Attribut** `alias`|
|`i-NAME`|liefert das FHEM **Internal** `NAME`|

Wenn ein Panel mit mehreren FHEM-Devices verbunden wird, dann muss das Device vorangestellt werden.

|Beispiel|Beschreibung|
|---|---|
|`sw1-state`|liefert das FHEM **Reading** `state` vom Device das mit dem Key `sw1` im Panel definiert ist|
|`thermo-measured-temp-ts`|liefert das FHEM **Reading** `measured-temp` vom Device das mit dem Key `thermo` im Panel definiert ist.|

Eine Definition wird verwendet, wenn der Wert im Parameter `value` zutrifft. Bei der Prüfung wird grundsätzlich zwischen Zahlen und Text unterschieden. Bei Zahlen gilt immer `reading>=value`. Bei Text wird geprüft, ob dieser im *Reading* enthalten ist. Weiterhin können Definitionen mit Hilfe von Regular-Expressions geprüft werden.

|Beispiel|Beschreibung|
|---|---|
|`temperature:12:...`|Zahlenwert -> trifft zu wenn das *Reading* **größer oder gleich** *12* ist|
|`state:on:...`|Text -> trifft zu wenn das *Reading* den Text `on` **enthält**|
|`state:^on:...`|RegExp -> triff zu wenn das *Reading* mit dem Text `on` **beginnt**|
|`state:^(?!on):..-`|RegExp -> trifft zu wenn das *Reading* **nicht** den Wert `on` hat|
|`state::...`|Es erfolgt **keine weitere Prüfung**. die Definition wird verwendet.|

Es wird immer die erste zutreffende Definition verwendet.  Der Parameter `value` wird wie folgt geprüft.


![](./docs/media/example_element_definition.png)
<br>*Beispiel für eine Element Definition*

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
|%t(on)|gibt die Übersetzung für die Variable `on` an. (siehe auch [Sprachen](#sprachen))|
|%v|liefert den aktuellen Wert von Slidern
|\\:|wird zur Ausgabe von `:` innerhalb von Element-Definitionen verwendet|

|Beispiel|Reading|Ausgabe|Hinweis|
|---|---|---|---|
|`state::%s`|on|on|
|`temperature::%n(0)`|12.5|13|
|`desired-temp::%n(1,2)`|22.5|24,5|Komma und tausender Trennzeichen abhängig vom Sprachschema|
|`state-ts::%d()`|2023-12-17 17:53:32|17.12.2023 17:53:32|abhängig vom Sprachschema|
|`state-ts::%d(time)`|2023-12-17 17:53:32|17:53:32|abhängig vom Sprachschema|
|`state-ts::%d(date)`|2023-12-17 17:53:32|17.12.2023|abhängig vom Sprachschema|
|`state-ts::%d({ "weekday"\: "long" })`|2023-12-17 17:53:32|Sonntag|abhängig vom Sprachschema|
|`state::%t(on)`|on|an|wenn unter [Sprachen](#sprachen) für die Variable `on` im deutschen Sprachschema `an` hinterlegt wurde|
|`temp::Temperatur\: %n(1)°C`|18.7|Temperatur: 18,7°C|
## Panel allgemein
In den allgemeinen Einstellungen für Panels wird festgelegt, mit welchen FHEM **Devices** das Panel verknüpft ist und ob eine **Vorlage** zur Darstellung des Panels verwendet werden soll. Weiterhin wird festgelegt, unter welchen Navigationspunkten das Panel zur Anzeige gebracht werden soll. Zusätzlich können verschiedene Einstellung zur Darstellung des Panels erfolgen.

Die Aktivierung der **erweitere Konfiguration** ermöglicht die Anpassung aller Bereiche und Elemente des Panels, wenn keine [Vorlage](#vorlagen) verwendet werden soll, oder bestimmte Einstellung einer verwendeten Vorlage überschrieben werden sollen.
### Element devices
Liste der FHEM-Devices, die mit dem Panel verknüpft sind. Es muss mindestens ein FHEM-Device mit einem Panel verknüpft werden.

|Parameter|Beschreibung|
|---|---|
|key|eindeutiger Schlüssel, der für Element-Definitionen benötigt wird. Es wird empfohlen, die Art des FHEM-Device (z.B. switch, contact, thermo,...) als Schlüssel zu verwenden.|
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
Panels können ausgeklappt werden sobald mehr als eine aktive Ebene im Bereich [main](#bereich-main) enthalten. Weiterhin kann festgelegt werden, ob das Panel beim Laden bereits ausgeklappt sein soll und ob das Panel auf die voll Bildschirmgröße maximiert werden kann.

|Parameter|Default|Beschreibung|
|---|---|---|
|reading||siehe Parameter [reading](#konfiguration-der-elemente)|
|value||siehe Parameter [value](#konfiguration-der-elemente)|
|expandable|false|soll ausklappbar sein [boolean]|
|expanded|false|ist beim Laden ausgeklappt [boolean]|
|maximizable|false|kann auf volle Bildschirmgröße maximiert werden [boolean]|
### Element sortby
Panels können in einer bestimmten Reihenfolge angezeigt werden. Hierfür kann ein beliebiger Sortierschlüssel festgelegt werden. Panels mit Sortierschlüssel werden immer zuerst angezeigt. Danach folgen alle Panels ohne Sortierschlüssel.

|Parameter|Default|Beschreibung|
|---|---|---|
|reading||siehe Parameter [reading](#konfiguration-der-elemente)|
|value||siehe Parameter [value](#konfiguration-der-elemente)|
|sortkey||Sortierschlüssel [string \| number]|
### Element show
Panels können ausgeblendet werden.

|Parameter|Default|Beschreibung|
|---|---|---|
|reading||siehe Parameter [reading](#konfiguration-der-elemente)|
|value||siehe Parameter [value](#konfiguration-der-elemente)|
|show|true|blendet Panel ein oder aus [string \| number]|
### Element iconmap
Wenn innerhalb eines Panels viele unterschiedliche Icons mehrfach zum Einsatz kommen und diese zudem abhängig von *readings* sind, können Elementdefinitionen sehr groß werden. Hierfür kann das Mapping für Icons verwendet werden. Dazu kann eine Liste von Variablen erstellt und jeder Variable ein Icon zugewiesen werden. 

Bei Verwendung des Mapping kann in allen Elementen, in denen Icons definiert werden können, die Variable statt dem Icon-Name verwendet werden. 

Die Variable ist auch als Suchtext zu verstehen. Wenn beispielsweise in einem Wetter-Template ein *reading* verwendet werden soll, um verschiedene Wetterlagen als Icon darzustellen, kann der Wert des *readings* entsprechend geprüft werden. 

**Beispiel:** reading = `morgens stark bewölkt` - Definition = `stark bewölkt:mdi-weather-partly-cloudy`. Es wird nach *stark bewölkt* im Wert des *readings* gesucht und wenn dieser Text enthalten ist, dann liefert das Mapping den Wert `mdi-weather-partly-cloudy` zurück.

|Parameter|Default|Beschreibung|
|---|---|---|
|reading||siehe Parameter [reading](#konfiguration-der-elemente)|
|value||siehe Parameter [value](#konfiguration-der-elemente)|
|search||Variable bzw. Suchtext nach dem in einem Reading gesucht werden soll und das. [string]|
|icon||Name des Icons [string]|
## Bereich Status
Der Statusbereich befndet sich im oberen Teil. Er dient dazu, den Status und den Name des Panels (z.B. *Licht Bad*) anzuzeigen. Um den Zustand von Aktoren oder Senoren optisch einfach darzustellen können bis zu 2 Statusbars definiert werden. Weiterhin kann für den Statusbereich ein Hintergrundbild festgelegt werden. 

### Element bar
Es wird ein farblich abgesetzter Streifen am oberen Ende des Panel angezeigt. Bei Definition von **bar** und **bar2** befinden sich zwei farbliche Streifen nebeneinander am oberen Ende des Panels.

|Parameter|Default|Beschreibung|
|---|---|---|
|reading||siehe Parameter [reading](#konfiguration-der-elemente)|
|value||siehe Parameter [value](#konfiguration-der-elemente)|
|level|0|Wert definiert, welcher Anteil der Bar farblich hervorgehoben wird [number]|
|color|success|Farbe in der die Bar hervorgehoben wird (siehe auch [Farben](#farben)) [string]|
|min|0|Wenn der Bereich des Wertes nicht zwischen 0 und 100 liegt, kann kann der kleinste Wert festgelegt werden. Diese entspricht dann im Wertebereich 0 Prozent [number]|
|max|100|Wenn der Bereich des Wertes nicht zwischen 0 und 100 liegt, kann kann der größte Wert festgelegt werden. Diese entspricht dann im Wertebereich 100 Prozent [number]|
|reverse|false|Die Startrichtung in der die Bar farblich hervorgehoben wird, wird umgekehrt [boolean]|
### Element imageurl
Es wird ein Hintergrundbild im Statusbereich angezeigt. Das Bild wird unabhängig von seiner Größe in den Statusbereich eingepasst und skaliert, jedoch nicht verzerrt. Die Hintergrundbilder sollten jedoch keine zu hohen Auflösungen haben, um die Ladezeit des Panels nicht negativ zu beeinflussen.

|Parameter|Default|Beschreibung|
|---|---|---|
|reading||siehe Parameter [reading](#konfiguration-der-elemente)|
|value||siehe Parameter [value](#konfiguration-der-elemente)|
|url||URL die auf ein Bild verweist [string]|
### Element title
Es wird ein Text auf der linken Seite im Statusbereich angezeigt.

|Parameter|Default|Beschreibung|
|---|---|---|
|reading||siehe Parameter [reading](#konfiguration-der-elemente)|
|value||siehe Parameter [value](#konfiguration-der-elemente)|
|title||Titel bzw. Name des Panels [string]|
## Bereich Main
Der Bereich Main befindet sich im mittleren Teil. Er enthält mindestens eine Ebene mit bis zu 5 Spalten. Jede Spalte kann zur Anzeige von Werten oder zur Steuerung von Aktoren verwendet werden.

Der Bereich Main erlaubt zudem die Definition mehrerer Ebenen. Diese können entweder umgeschaltet oder alle eingeblendet werden. (siehe auch [Element expandable](#element-expandable)) Der Einsatz mehrerer Ebenen ist sinnvoll für komplexe Devices, in denen viele Werte angezeigt oder gesteuert werden soll.

Jede Ebene erfordert Grundeinstellungen. Über diese kann festgelegt werden, welche Spalten angezeigt werden sollen. Zudem können weitere Anzeigeeinstellungen für die jeweilige Ebene definiert werden.
### Main Element show
Ebenen können ausgeblendet werden.

|Parameter|Default|Beschreibung|
|---|---|---|
|reading||siehe Parameter [reading](#konfiguration-der-elemente)|
|value||siehe Parameter [value](#konfiguration-der-elemente)|
|show|true|blendet Ebenen ein oder aus [string \| number]|
### Main Element divider
Zeigt eine horizontale Trennlinie am unteren Ende der Ebene.

|Parameter|Default|Beschreibung|
|---|---|---|
|reading||siehe Parameter [reading](#konfiguration-der-elemente)|
|value||siehe Parameter [value](#konfiguration-der-elemente)|
|show|true|blendet Ebenen ein oder aus [string \| number]|
### Main Element height
Passt die Höhe der Ebene an.

|Parameter|Default|Beschreibung|
|---|---|---|
|reading||siehe Parameter [reading](#konfiguration-der-elemente)|
|value||siehe Parameter [value](#konfiguration-der-elemente)|
|height|64px|gibt die Höhe der Ebene in Pixeln an [string]|
### Main Element typ
Legt fest, welche der 5 möglichen Spalten (left1, left2, mid, right1, right2) für die Ebene verwendet werden und was innerhalb der Spalte angezeigt werden soll. 

Es stehen folgende Typen zur Verfügung
|Typ|Beschreibung|
|---|---|
|none|Spalte wird nicht angezeigt|
|button|Es kann ein Button zur Steuerung von Aktoren konfiguriert werden|
|info|Es können bis zu 3 Textelemente und ein Icon zur Anzeige von Statuswerten konfiguriert werden|
|status|Es kann eine runde Statusbar zur Anzeige von Statuswerten konfiguriert werden|
|slider|Es kann ein Slider zu Steuerung von Aktoren konfiguriert werden|
|image|Es kann ein Bild über eine URL angezeigt werden|
|menu|Es kann ein DropDown-Menü zur Steuerung verschiedener Aktoren bzw. Aktorwerte konfiguriert werden|
|chart|Es kann ein Chart angezeigt werden|
|colorpicker|Es kann ein Slider zur Steuerung von RGB Lights konfiguriert werden|
### Level Element divider
Zeigt eine vertikale Linie auf der rechten Seite der Spalte an.

|Parameter|Default|Beschreibung|
|---|---|---|
|reading||siehe Parameter [reading](#konfiguration-der-elemente)|
|value||siehe Parameter [value](#konfiguration-der-elemente)|
|divider|false|blendet die Trennlinie ein oder aus [boolean]|
### Level Element size
Legt die Breite der Spalte fest. 

|Parameter|Default|Beschreibung|
|---|---|---|
|reading||siehe Parameter [reading](#konfiguration-der-elemente)|
|value||siehe Parameter [value](#konfiguration-der-elemente)|
|size||Werte zwischen 1 und 12. Der Wert 12 entspricht der vollen Breite der Ebene. Die Summe aller size-Werte innerhalb einer Ebene sollte den Wert 12 nicht überschreiten. [number]|
### Level Element Button btn
Zeigt einen Button an, der folgendes ermöglicht. Das Auslösen der Befehle wird in [click](#level-element-button-click), [longClick](#level-element-button-longclick) und [longRelease](#level-element-button-longrelease) konfiguriert.
- das Senden von FHEM Kommandos
- das Aufrufen von Navigationspunkten in **FHEMApp**
- das Aufrufen von beliebigen URLs

|Parameter|Default|Beschreibung|
|---|---|---|
|reading||siehe Parameter [reading](#konfiguration-der-elemente)|
|value||siehe Parameter [value](#konfiguration-der-elemente)|
|icon||Icon das agezeigt wird (siehe auch [mdi Icons](https://pictogrammers.com/library/mdi/) und [Icon Mapping](#element-iconmap)) [string]|
|disabled|false|legt fest ob der Button aktiv oder inaktiv ist [boolean]|
|color||legt die Farbe für den Button fest (siehe auch [Farben](#farben)) [string]|
|variant||passt die Darstellung des Button an (outlined, tonal, plain) [string]|
### Level Element Button status
Zeigt eine Statusbar über dem Button an.

|Parameter|Default|Beschreibung|
|---|---|---|
|reading||siehe Parameter [reading](#konfiguration-der-elemente)|
|value||siehe Parameter [value](#konfiguration-der-elemente)|
|level|0|Wert definiert, welcher Anteil der Bar farblich hervorgehoben wird [number]|
|color|success|Farbe in der die Bar hervorgehoben wird (siehe auch [Farben](#farben)) [string]|
|min|0|Wenn der Bereich des Wertes nicht zwischen 0 und 100 liegt, kann kann der kleinste Wert festgelegt werden. Diese entspricht dann im Wertebereich 0 Prozent [number]|
|max|100|Wenn der Bereich des Wertes nicht zwischen 0 und 100 liegt, kann kann der größte Wert festgelegt werden. Diese entspricht dann im Wertebereich 100 Prozent [number]|
|reverse|false|Die Startrichtung in der die Bar farblich hervorgehoben wird, wird umgekehrt [boolean]|
### Level Element Button click
Legt den Befehl fest, der bei kurzem Drücken des Button ausgeführt wird.

|Parameter|Default|Beschreibung|
|---|---|---|
|reading||siehe Parameter [reading](#konfiguration-der-elemente)|
|value||siehe Parameter [value](#konfiguration-der-elemente)|
|cmd|| FHEM Kommando, Route oder Link [string]|
|type|cmd| cmd, route, url [string]|

|Beispiele|Erklärung|
|---|---|
|::set switch on|sendet den Befehl `set switch on` an FHEM. Dabei wird im Panel unter dem [Element devices](#element-devices) nach dem Schlüssel `switch` gesucht und falls vorhanden, durch den Name des FHEM Devices ersetzt. Kann kein entsprechender Schlüssel gefunden werden, so wird der Befehl unverändert an FHEM gesendet.|
|::home:route|wechselt zum Navigationspunkt `home` in **FHEMApp**. Die angegebene Route muss existieren und der Route in der URL (.../devices/{route}/?...)|
|::https\\://fhem.de:url|wechsel direkt zu der URL `https://fhem.de`. Bei direkter Eingabe von URLs müssen Doppelpunkte entsprechend ersetzt werden. (siehe auch [Ersetzungen](#ersetzungen))|
|cam-link::%s:url|wechsel direkt zu der URL, die im Device `cam` im Reading `link` hinterlegt ist|
### Level Element Button longClick
Legt den Befehl fest, der bei langem Drücken des Button ausgeführt wird. Der Button muss dabei mindestens 1 Sekunde gedrückt werden.

Parameter siehe [Button click](#level-element-button-click)
### Level Element Button longRelease
Legt den Befehl fest, der nach dem Loslassen des Button ausgeführt wird, wenn der Button mindestens 1 Sekunde gedrückt wurde.

Parameter siehe [Button click](#level-element-button-click)
### Level Element Slider slider
Zeigt einen horizontalen Schieberegler an und sendet einen entsprechenden Befehl an FHEM.

|Parameter|Default|Beschreibung|
|---|---|---|
|reading||siehe Parameter [reading](#konfiguration-der-elemente)|
|value||siehe Parameter [value](#konfiguration-der-elemente)|
|cmd||FHEM Kommando. Die Ersetzung **%v** repräsentiert den aktuellen Wert des Sliders. (siehe auch [Ersetzungen](#ersetzungen)) [string]|
|current||aktueller Wert des Sliders [number]|
|color|success|Farbe in der die Bar hervorgehoben wird (siehe auch [Farben](#farben)) [string]|
|min|0|Wert des Sliders, wenn dieser ganz links steht [number]|
|max|100|Wert des Sliders, wenn dieser ganz rechts steht [number]|
|steps|10|Schritte in denen der Wert des Sliders verändert wird[number]|
|reverse|false|kehrt die Richtung des Sliders um [boolean]|
|size|4|legt die Breite des Sliders fest [number]|
|vertical|false|zeigt den Slider in vertikaler Richtung an [boolean]|

|Beispiel|Erklärung|
|---|---|
|dimmer-pct::set dimmer pct %v:%n()|setzt den Slider auf den aktuellen Wert des readings `pct` aus dem Device `dimmer` und sendet nach dem Verschieben den Befehl `set dimmer %v` an FHEM. Dabei wird im Panel unter dem [Element devices](#element-devices) nach dem Schlüssel `dimmer` gesucht und falls vorhanden, durch den Name des FHEM Devices ersetzt. Kann kein entsprechender Schlüssel gefunden werden, so wird der Befehl unverändert an FHEM gesendet. Weiterhin wird `%v` durch den aktuellen Wert des Sliders ersetzt.|
### Level Element Image image
Zeigt ein Bild an.

|Parameter|Default|Beschreibung|
|---|---|---|
|reading||siehe Parameter [reading](#konfiguration-der-elemente)|
|value||siehe Parameter [value](#konfiguration-der-elemente)|
|source||URL die auf ein Bild verweist. Bei direkter Eingabe von URLs müssen Doppelpunkte entsprechend ersetzt werden. (siehe auch [Ersetzungen](#ersetzungen)) [string]|
|height||legt die absolute Höhe des Bildes in Pixeln fest [string]|
### Level Element Menu menu
Zeigt einen Button an, der beim Klicken ein DropDown-Menü öffnet. Bei Klick auf einen Menüpunkt wird der hinterlegte Befehl an FHEM gesendet. Im Gegensatz zu normalen Definitionen, werden zur Anzeige der Menüpunkte **alle** Definitionen verwendet, deren Bedingungen zutreffen.

Menüeinträge können auch von FHEM übergeben werden. Dafür muss der Inhalt des FHEM *readings* oder *attributes* folgender Form entsprechen: `Name1:cmd1,Name2:cmd2,...`

|Parameter|Default|Beschreibung|
|---|---|---|
|reading||siehe Parameter [reading](#konfiguration-der-elemente)|
|value||siehe Parameter [value](#konfiguration-der-elemente)|
|name||Name der im DropDown-Menü angezeiugt wird [string]|
|cmd||FHEM Befehl, der beim Klick auf den Menüpunkt an FHEM gesendet wird. [string]|

|Beispiel|Erklärung|
|---|---|
|::30 Minuten:set switch on-for-timer 1800|sendet den Befehl `set switch on-for-timer 1800` an FHEM. Dabei wird im Panel unter dem [Element devices](#element-devices) nach dem Schlüssel `switch` gesucht und falls vorhanden, durch den Name des FHEM Devices ersetzt.|
|switch-a-dropdown::%s:%s|übernimmt die Definition der Menüeinträge aus dem *Attribute* `dropdown` vom Device `switch`. Dabei wird im Panel unter dem [Element devices](#element-devices) nach dem Schlüssel `switch` gesucht und falls vorhanden, durch den Name des FHEM Devices ersetzt.|
### Level Element Info text
Zeigt bis zu 3 Texte (text, text2, text3) an. Dabei wird `text` immer über `text2` und `text3` angezeigt. Weiterhin wird `text2` immer links neben `text3` angezeigt.

Parameter|Default|Beschreibung|
|---|---|---|
|reading||siehe Parameter [reading](#konfiguration-der-elemente)|
|value||siehe Parameter [value](#konfiguration-der-elemente)|
|text||Text der ausgegeben wird [string]|
|format||Angaben zur Größe, Ausrichtung und Farbe des Textes. Es können mehrere Formatangaben kombiniert werden. Diese müssen durch Leernzeichen voneinander getrennt werden. [string]|

|Beispiel|Erklärung|
|---|---|
|text-success|zeigt den Text in der Farbe grün an (siehe auch [Farben](#farben))|
|text-left|richtet den Text linksbündig aus|
|text-right|richtet den Text linksbündig aus|
|text-h4|Text in großer Schrift (weitere Möglichkeiten siehe auch [Text und Typografie](https://vuetifyjs.com/en/styles/text-and-typography/))
### Level Element Info icon
Zeigt ein Icon zwischen `text` und `text2/text3` an.

Parameter|Default|Beschreibung|
|---|---|---|
|reading||siehe Parameter [reading](#konfiguration-der-elemente)|
|value||siehe Parameter [value](#konfiguration-der-elemente)|
|icon|| Icon das agezeigt wird. (siehe auch [mdi Icons](https://pictogrammers.com/library/mdi/) und [Icon Mapping](#element-iconmap)) [string]|
|color||legt die Farbe für das Icon fest. (siehe auch [Farben](#farben)) [string]|
|size|x-large| Größe des Icons (x-small, small, medium, large, x-large) [string]|
### Level Element Info status
Zeigt eine runde Statusbar oder eine horizontale Statusbar zwischen `text` und `text2/text3` an.

Parameter|Default|Beschreibung|
|---|---|---|
|reading||siehe Parameter [reading](#konfiguration-der-elemente)|
|value||siehe Parameter [value](#konfiguration-der-elemente)|
|level||Wert definiert, welcher Anteil der Bar farblich hervorgehoben wird [number]|
|color|success|Farbe in der die Bar hervorgehoben wird (siehe auch [Farben](#farben)) [string]|
|min|0|Wenn der Bereich des Wertes nicht zwischen 0 und 100 liegt, kann kann der kleinste Wert festgelegt werden. Diese entspricht dann im Wertebereich 0 Prozent [number]|
|max|100|Wenn der Bereich des Wertes nicht zwischen 0 und 100 liegt, kann kann der größte Wert festgelegt werden. Diese entspricht dann im Wertebereich 100 Prozent [number]|
|reverse|false|Die Startrichtung in der die Bar farblich hervorgehoben wird, wird umgekehrt [boolean]|
|linear|false|zeigt eine horizontale oder runde Statusbar an [boolean]|
### Level Element Chart serie
Zeigt ein Chart. Im Gegensatz zu normalen Definitionen, werden zur Anzeige der Datenreihen **alle** Definitionen verwendet, deren Bedingungen zutreffen. Für die Darstellung von Charts kommt [Apache ECharts](https://echarts.apache.org) zum Einsatz. Diese bietet eine sehr große Vielfalt an Charts und Anpassungsmöglichkeiten.

Parameter|Default|Beschreibung|
|---|---|---|
|reading||siehe Parameter [reading](#konfiguration-der-elemente)|
|value||siehe Parameter [value](#konfiguration-der-elemente)|
|data||kann sowohl eine FHEM-Anweisung `get` für FileLog-Devices bzw. DBLog-Devices enthalten oder eine Reihe von Werten, welche durch ein Leerzeichen oder Komma voneinander getrennt sind.|
|name||Name der Datenreihe|
|digits|0|Anzahl der Nachkommastellen, die im Diagramm angezeigt werden.|
|suffix||Einheit für die Zahlenwerte (z.B. % oder °C)|
|type|line|Charttyp der Datenreihe (z.B. line, bar, scatter, gauge und weitere siehe auch [ECharts Beispiele](https://echarts.apache.org/examples/en/index.html))|

Bei Verwendung der FHEM-Anweisung `get` können statt fester Datumsangaben im ISO-Format auch Offsetwerte verwendet werden. z.B. `get log1 - - -14 0 4\:level` Dabei entspricht `-14` dem aktuellen Datum - 14 Tage und `0` dem aktuellen Datum. Da in der FHEM-Anweisung `get` auch Doppelpunkte zum Einsatz kommen ist die Schreibweise `\:` innerhalb der Anweisung zu beachten. (siehe auch [Ersetzungen](#ersetzungen)) Das Ergebnis der `get` Anweisung muss immer zwei Spalten zurückgeben. Die linke Spalte muss der Zeitstempel und die rechte Spalte den zugehörigen Zahlenwert enthalten. 

Die zurückgegebenen Daten werden an das EChart Object-Modell an folgende Stellen übergeben:
``` 
{ 
    series: [{ data: <data>, name: <name>, type: <type> },...],
    yAxis: [{ axisLabel: fn(<digits>, <suffix>) },...],    
    legend: { data: [<name>,...] }
}
```
### Level Element Chart options
Hier kann das Chart individuell über eine entsprechende JSON-Definition angepasst werden. (siehe auch [ECharts Konfiguration](https://echarts.apache.org/en/option.html#title))
### Level Element Chart options2
Diese Definition kann bei Verwendung von [maximizable](#element-expandable) verwendet werden, um das Chart anders darzustellen, wenn das Panel maximiert ist. Die Definition erfolgt wie unter [Chart options](#level-element-chart-options) beschrieben.
### Level Element Colorpicker picker
Zeigt einen Colorpicker zum Steuern von RGB Lights.

Parameter|Default|Beschreibung|
|---|---|---|
|reading||siehe Parameter [reading](#konfiguration-der-elemente)|
|value||siehe Parameter [value](#konfiguration-der-elemente)|
|cmd||FHEM Kommando. Die Ersetzung **%v** repräsentiert den aktuellen Wert des Colorpickers. (siehe auch [Ersetzungen](#ersetzungen)) [string]|
|current||aktueller Wert des Colorpickers [string]|
## Bereich Info
Der Infobereich befindet sich im unteren Teil. Er dient dazu, weitere Werte des Sonsors oder Aktors in Form von Icons oder Text darzustellen. Es können bis zu 6 Spalten für die Anzeige von Icons bzw. Texten verwendet werden.
### Element info
Es wird ein Text und/oder ein Icon in einem der 6 Spalten (left1, left2, mid1, mid2, right1, right2) angezeigt. Es sollten keine zu langen Texte ausgegeben werden, da der Platz auf die Gesamtbreite des Panels begrenzt ist. Wenn Texte zu lang für die jeweilige Spalte sind, so werden diese abgeschnitten.

|Parameter|Default|Beschreibung|
|---|---|---|
|reading||siehe Parameter [reading](#konfiguration-der-elemente)|
|value||siehe Parameter [value](#konfiguration-der-elemente)|
|text||Text der angezeigt wird [string]|
|icon||Icon das agezeigt wird. (siehe auch [mdi Icons](https://pictogrammers.com/library/mdi/) und [Icon Mapping](#element-iconmap)) [string]|
|color||legt die Farbe für das Icon fest. (siehe auch [Farben](#farben)) [string]|
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
