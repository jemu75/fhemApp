# FHEM App
**FHEMApp** ist eine Web-Application zur Steuerung deiner Smarthome Umgebung. Sie wurde als Frontend für den gemeinsamen Einsatz von FHEM(tm) entwickelt. **FHEMApp** ist für den Betrieb auf unterschiedlichen Geräten (responsives design) ausgerichtet. Die Elemente zur Steuerung der verschiedenen SmartHome-Geräte (Aktoren/Sensoren) sind auf eine sehr einfache und intuitive Bedienung ausgelegt. Für die Einrichtung von **FHEMApp** sind keine Programmierkenntnisse erfordlerlich. **FHEMApp** wird komplett über FHEM konfiguriert.  

![](./docs/media/fhemapp_desk_main.png)*Beispiel für eine Startseite in der Desktopansicht*

![](./docs/media/fhemapp_desk_group2.png)*Beispiel für Geräte in der Desktopansicht*

![](./docs/media/fhemapp_desk_charts.png)*Beispiel für Grafiken in der Desktopansicht*

![](./docs/media/fhemapp_desk_system.png)*Beispiel für Systemzustand in der Desktopansicht*

![](./docs/media/fhemApp_mobile_example.png)
*Beispiele für die App in der Smartphoneansicht*

# Systemanforderungen
Für den Betrieb wird FHEM (als Backend) und ein Web-Server für **FHEMApp** (Frontend) benötigt.
* Backendsystem - FHEM https://fhem.de/
* Webserver - z.B. Apache https://httpd.apache.org/

# Installation
Für den Betrieb der **FHEMApp** müssen alle Dateien und Unterverzeichnisse aus dem Ordner [www/fhemapp](./www/fhemapp) auf das Arbeitsverzeichnis des Webservers kopiert werden. Andere Verzeichnisse und Dateien sind nicht für den Betrieb der App notwendig.

# Konfiguration der Web-Application
Die initiale Konfiguration von **FHEMApp** erfolgt über die Datei `config.json` welche sich im Verzeichnis [www/fhemapp/cfg](./www/fhemapp/cfg) befindet. Die Konfigurationsdatei könnt ihr über einen normalen Texteditor bearbeiten. Beachtet bei der Veränderung der Konfiguration auf die richtige Schreibweise im *JSON-Format*.

### Verbindungseinstellung für FHEM
Unter *connection* könnt ihr den `Serverort`, den `Port` sowie den `Pfad` eurer FHEM Installation angeben. Standardmäßig ist **FHEMApp** auf die folgenden Verbindungseinstellungen konfiguriert.
```
"connection": {
  "location": "http://fhem",
  "port": "8083",
  "path": "fhem"
},
```

### Performanceeinstellungen für FHEMApp (optional)
Unter *options* könnt ihr die maximale Anzahl der `Chartpunkte` reduzieren, falls die Darstellung von Grafiken zu lange dauert. Das kann bei Betrieb von FHEM auf kleineren Systemen sinnvoll sein. Über den `Log-Puffer` könnt ihr die Anzahl der Logeinträge reduzieren, die **FHEMApp** zwischenspeichert. Dies ist nur für die Fehleranalyse notwendig.
```
"options": {
  "maxChartPoints": 100,
  "logBuffer": 500
},
```

### Themeneinstellungen für FHEMApp (optional)
Unter *theme* könnt ihr das farbliche Layout von **FHEMApp** individuell anpassen. Grundsätzlich könnt ihr zwischen einem *dunklen* und einem *hellen* Layout über den Parameter `dark` wechseln. Weiterhin könnt ihr das *dunkle* bzw. das *helle* Layout über die Definitionen unter den Parametern `light` bzw. `dark` individuell verändern. Welche Parameter ihr hier verwenden könnt, ist hier [Vuetify Customizing](https://vuetifyjs.com/en/features/theme/#customizing) beschrieben.    
```
"theme": {
  "dark": true,
  "light": {
    "primary": "#F48FB1"
  }
}
```

# Grundeinstellung in FHEM
Bevor ihr in FHEM die gewünschten Geräte für die **FHEMApp** konfiguriert sind zwei Grundeinstellungen notwendig. Die folgenden Schritte setzen voraus, dass ihr mit FHEM vertraut seid.
1. Müsst ihr in eurem *FHEM-Device* `FHEMWEB` die beiden Attribute `CORS` auf `1` und `longpoll` auf `websocket` setzen. [(siehe auch)](https://fhem.de/commandref_DE.html#FHEMWEB) Das folgende Beispiel zeigt einen Auszug aus der Datei *fhem.cfg* nachdem die Grundeinstellung vorgenommen wurde.
```
define WEB FHEMWEB 8083 global
attr WEB CORS 1
attr WEB longpoll websocket
attr WEB stylesheetPrefix default
```
2. Müsst ihr unter `Global` ein neues User-Attribut `appOptions` definieren. [(siehe auch)](https://fhem.de/commandref_DE.html#global) Das folgende Beispiel zeigt einen Auszug aus der Datei *fhem.cfg* nachdem das User-Attribut hinzugefügt wurde.
```
attr global userattr appOptions:textField-long
```

> Fertig! - Jetzt ist eure FHEMApp einsatzbereit :-)

# Konfiguration der Aktoren / Sensoren in FHEMApp
Jedes SmartHome-Gerät (Aktor/Sensor) welches in **FHEMApp** angezeigt werden soll konfiguriert ihr nun direkt in FHEM (*fhem.cfg*). Dazu verwendet ihr das neu angelegte FHEM-Attribut `appOptions` sowie weitere FHEM-Attribute wie z.B. `alias`,`group`,`room`,`sortby` die euch standardmäßig in FHEM zur Verfügung stehen. 
