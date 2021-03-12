# FHEM App
**FHEMApp** ist eine Web-Application zur Steuerung deiner Smarthome Umgebung. Sie wurde als Frontend für den Einsatz mit FHEM(tm) entwickelt. **FHEMApp** ist für den Betrieb auf unterschiedlichen Geräten optimiert. Die Elemente zur Steuerung der verschiedenen SmartHome-Geräte sind sehr einfach zu bedienen. Für die Einrichtung von **FHEMApp** sind keine Programmierkenntnisse erforderlich. **FHEMApp** wird komplett über FHEM konfiguriert.

![](./docs/media/fhemapp_desk_main.png)*Beispiel für eine Startseite in der Desktopansicht*

![](./docs/media/fhemapp_desk_group2.png)*Beispiel für Geräte in der Desktopansicht*

![](./docs/media/fhemapp_desk_charts.png)*Beispiel für Grafiken in der Desktopansicht*

![](./docs/media/fhemapp_desk_system.png)*Beispiel für Systemzustand in der Desktopansicht*

![](./docs/media/fhemApp_mobile_example.png)
*Beispiele für die App in der Smartphoneansicht*

# Systemanforderungen
Für den Betrieb der **FHEMApp** wird FHEM(tm) und ein Web-Server benötigt.
* Backendsystem - FHEM https://fhem.de/
* Webserver - z.B. Apache https://httpd.apache.org/

# Installation
Kopiert einfach alle Dateien und Unterverzeichnisse aus dem Ordner [www/fhemapp](./www/fhemapp) auf das Arbeitsverzeichnis eures Webservers. Danach sollte folgende Verzeichnisstruktur auf eurem Webserver vorhanden sein.
```bash
.
└─ fhemapp
    ├── favicon.png
    ├── index.html
    ├── cfg
    ├── css
    ├── img
    └── js
```

# Konfiguration der Web-Application
Die initiale Konfiguration von **FHEMApp** erfolgt über die Datei `config.json` welche sich im Verzeichnis `../fhemapp/cfg/` auf eurem Webserver befindet. Die Konfigurationsdatei könnt ihr über einen normalen Texteditor bearbeiten, um die folgenden Einstellungen vorzunehmen.

### Verbindungseinstellung für FHEM
Hier wird festgelegt, wo sich die FHEM Installation befindet. Der Parameter `location` gibt die IP-Adresse bzw. URL von FHEM an. Die Parameter `port` und `path` entsprechen dem Standard eurer FHEM Installation und können bei Bedarf angepasst werden.
```
"connection": {
  "location": "http://fhem",
  "port": "8083",
  "path": "fhem"
},
```

### Performanceeinstellungen für FHEMApp (optional)
Wenn ihr in **FHEMApp** Daten aus FHEM-Logs in Charts darstellt, ist es ggf. sinnvoll die Anzahl der `maxChartPoints` zu reduzieren um die Ladezeit zu verkürzen. Über den Parameter `logBuffer` könnt ihr die Anzahl der Logeinträge verändern, die **FHEMApp** zwischenspeichert. Dies ist nur für die Fehleranalyse notwendig.
```
"options": {
  "maxChartPoints": 100,
  "logBuffer": 500
},
```

### Themeneinstellungen für FHEMApp (optional)
Zusätzlich könnt ihr das Farbschema von **FHEMApp** individuell anpassen. Grundsätzlich könnt ihr zwischen einem *dunklen* und einem *hellen* Layout über den Parameter `dark` (`true` bzw. `false`) wechseln. Weiterhin könnt ihr die einzelnen Farben für die beiden Farbschemen unter dem Parameter `themes` individuell anpassen. Siehe dazu auch [(Vuetify Customizing)](https://vuetifyjs.com/en/features/theme/#customizing)    
```
"theme": {
  "dark": true,
  "themes": {
    "light": {
      "primary": "#78909C",
      "secondary": "#CFD8DC",
      "accent": "#8bc34a",
      "error": "#e91e63",
      "warning": "#ffc107",
      "info": "#03a9f4",
      "success": "#4caf50"
    },
    "dark": {
    }
  }
}
```

# Grundeinstellung in FHEM
Bevor ihr die gewünschten Geräte für die Anzeige in der **FHEMApp** konfiguriert sind zwei Grundeinstellungen in FHEM notwendig.
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

# Konfiguration der Geräte in FHEM
Jedes SmartHome-Gerät (Device) welches in **FHEMApp** angezeigt werden soll, konfiguriert ihr nun direkt in FHEM. Dazu verwendet ihr das neu angelegte FHEM-Attribut `appOptions` sowie weitere FHEM-Attribute wie `alias`,`group`,`room` oder `sortby`.

### Attribut `appOptions` allgemein
Das Attribut `appOptions` kann mit unterschiedlichen Parametern befüllt werden, um die Darstellung des jeweiligen Devices in **FHEMApp** zu steuern. Es wird als Object im `JSON-Format` von **FHEMApp** verarbeitet und kann folgende Parameter beinhalten:

```
{
  "template": "string",             - steuert über welches Template das Device dargestellt wird
  "states": ["def1", "def2", ...],  - ermögliche zustandsabhängige Anpassungen des Templates
  "connected": { object },          - bindet zusätzliche Devices in das Template ein
  "home": "true",                   - zeigt ein Device auf der Startseite an
  "dashboard": "true",              - zeigt ein Device im Dashboard an
  "system":"true",                  - zeigt ein Device in den Systemeinstellungen an
  "chartDef": ["def1", "def2", ...],- legt die Datenquellen für Grafiken fest
  "link": "string",                 - gibt den URL-Pfad für Panels an  
  "toggle": ["def1", "def2", ...],  - ermöglicht die Definition von "Schaltern"für Panels     
}
```

### Template zuweisen
Damit ein Gerät in der **FHEMApp** zur Verfügung steht, müsst ihr dem jeweiligen Device in FHEM einem *Template* zuordnen. In der **FHEMApp** stehen verschiedene [Templates](#übersicht-der-verfügbaren-templates) zur Verfügung. Dazu nutzt ihr das FHEM-Attribut `appOptions`  und definiert ein *Template* über folgenden Parameter  `{ "template": "switch" }` (Beispiel für einen Schalter)

### weitere FHEM Attribute verwenden
Nachdem ihr dem Device ein *Template* zugeordnet habt, könnt ihr defnieren unter welchem *Name* und in welchen *Menüpunkten* euer Device in **FHEMApp** angezeigt wird. Dazu nutzt ihr das FHEM-Attribut `alias` für den Name des Gerätes, das FHEM-Attribut `group` für die Anzeige im Menüpunkt *Gruppen* und das FHEM-Attribut `room` für die Anzeige im Menüpunkt *Bereiche*.

*Definition in FHEM*<br>
![Definition in FHEM](./docs/media/template_switch_fhem.png)

*Anzeige in FHEMApp*<br>
![Anzeige in FHEMApp](./docs/media/template_switch_example.png)

# Aufbau und Funktion von Templates
In **FHEMApp** werden *Templates* für viele Aktoren und Sensoren zur Verfügung gestellt. Jedes *Template* besteht aus einer Grundstruktur mit einheitlichen Elementen.

- **die Statusbar** - diese zeigt den aktuellen Status über einen farbigen Streifen am oberen Rand des *Templates* dar. Das Verhalten der *Statusbar* ist für jedes *Template* vordefiniert und kann abhängig von den unterschiedlichen Zuständen eines FHEM Devices individuell angepasst werden.
- **die Gerätebezeichnung** - befindet sich direkt unter der *Statusbar* und zeigt entweder den Wert aus dem FHEM-Attribut `alias` oder den internen `NAME` des Devices an.
- **die Schaltelemente** - befinden sich unter dem Gerätename und schalten den jeweiligen Aktor. Das Verhalten der *Schaltelemente* ist in jedem *Template* fest definiert.
- **der aktuelle Status** - wird in der Mitte dargestellt und kann abhängig von den unterschiedlichen Zuständen eines FHEM Devices individuell angepasst werden.
- **die Systembar** - befindet sich am unteren Rand und liefert weitere Informationen zum jeweiligen *Device*. Das *StatusIcon* auf der linken Seite der *Systembar* kann ebenfalls individuell und abhängig vom Zustand des Devices angepasst werden. Die *Icons* auf der rechten Seite der *Systembar* zeigen bei Funk-Aktoren/Sensoren den Batteriezustand und den Verbindungsstatus an.

Grundsätzlich ist es möglich weitere Templates auf Basis des Vue/Vuetify-Frameworks [siehe](https://vuetifyjs.com/en/) zu entwickeln und in **FHEMApp** zu integrieren.   


### Templates individuell anpassen
Die individuellen Anpassungsmöglichenkeiten können über das FHEM-Attribut `appOptions` im Parameter `states` vorgenommen werden. Der Parameter `states` beinhaltet dabei eine oder mehrere Definitionen, die das Standardverhalten des jeweiligen Templates überschreiben. Die Definitionen werden der Reihenfolge nach geprüft ["def1", "def2", "def3", ...] Jede Definition muss im folgenden Schema angegeben werden `Reading:Wert:Statustext:Statuslevel:Statusfarbe:StatusIcon`
- **Reading** - beinhaltet das Reading welches den Status des Templates verändern soll.
- **Wert** (optional)- ist der Wert auf den das Reading geprüft werden soll. Hier können *Zeichenketten*, *RegExp* oder *numerische Werte* angegeben werden. Bei numerischen Werten greift die Definition immer ab dem Wert! Wird der Wert nicht angegeben, so greift die Definition fürr alle restlichen (nicht definierten) Fälle
- **Statustext** (optional) - ist der Text der ausgegeben werden soll. Wird der Statustext nicht angegeben, so wird der Wert des *Readings* zurückgegeben.
- **Statuslevel** (optional) - gibt an, wie breit der farbige Streifen im oberen Teil des Templates angezeigt wird. Hier können feste Werte zwischen 0 und 100 eingetragen werden. Trägt man alternativ den Name des *Reading* ein, so wird dieser Wert verwendet. Dies eignet sich beispielsweise für *Readings* wie `pct` oder `level`
- **Statusfarbe** (optional) - legt fest welche Farbe der farbige Streifen im oberen Teil des Templates im jeweiligen Status hat. Hier können Farbcodes (z.B. #26A69A) oder Farbvorgaben aus den Themeneinstellungen (z.B. success, error, info) eingetragen werden.
- **StatusIcon** (optional) - legt fest welches Icon unten links in der Systembar angezeigt wird. Hier kann auf alle Material Design Icons [siehe](https://materialdesignicons.com/) zugegriffen werden.      

Beispiel:
```
[
  "Activity:^(?!alive):keine Verbindung:100:error:mdi-power-plug",
  "state:on:an:100:success:mdi-power-plug",
  "state:off:aus:0:success:mdi-power-plug-off"
]
```

# Übersicht der verfügbaren Templates
| Template | Beschreibung | Beispiel |
|----------|--------------|----------|
| [switch](#template-switch) | Schalteraktoren (optional mit Leistungsmessung) | ![](./docs/media/template_switch_example.png) |
| dimmer | Dimmer | ![](./docs/media/template_dimmer_example.png) |
| light | Lichtschalter | ![](./docs/media/template_light_example.png) |
| thermostat | Raumthermostat | ![](./docs/media/template_thermostat_example.png) |
| shutter | Jalousieschalter | ![](./docs/media/template_shutter_example.png) |
| thermometer | Temperatursensor  | ![](./docs/media/template_thermometer_example.png) |
| smokedetect | Rauchmelder | ![](./docs/media/template_smokedetect_example.png) |
| contact    | Tür/Fensterkontakt | ![](./docs/media/template_contact_example.png) |
| motiondetect | Bewegungsmelder | ![](./docs/media/template_motiondetect_example.png) |
| watersensor | Zisternensensor | ![](./docs/media/template_watersensor_example.png) |
| sonos | Sonosplayer | ![](./docs/media/template_sonos_example.png) |
| scenes | LightScenes | ![](./docs/media/template_scenes_example.png) |
| panel | Panel zur Gruppierung mehrerer Devices | ![](./docs/media/template_panel_example.png) |
| chart | Diagramm zur Visualisierung von Log-Daten | ![](./docs/media/template_chart_example.png) |
| weather | Wettervorhersage (darksky-API) | ![](./docs/media/template_weather_example.png) |
| sysmon | Systemmonitor | ![](./docs/media/template_sysmon_example.png) |
| hmlan | HMLAN-Adapter | ![](./docs/media/template_hmlan_example.png) |

## Template Switch
Dieses Template kann für unterschiedliche Schaltaktoren verwendet werden. Dabei werden verschiedene Varianten unterstützt - Schaltaktoren mit und ohne Leistungsmessung sowie funkbasierende und fest installierte Schaltaktoren.

#### Beispielkonfiguration für Schaltaktor
Das FHEM-Attribut `appOptions` sollte wie folgt aussehen.
```
{ "template": "switch" }
```

#### Beispielkonfiguration für einen funkbasier Schaltaktor
Wenn die Informationen zur Funkverbindung über einem separaten Kanal geliefert werden, behandelt FHEM diesen als eigenständiges Device. In diesem Fall muss das Device in `appOptions` über den Parameter `connected.receiver` definiert werden.
> Hinweis: Informationen zur Funkverbindung liefern die FHEM-Parameter `Internals: xxx_RSSI` und `Readings: Activity`

```
{ "template": "switch", "connected": { "receiver": "chn_akt.hm.dyn.sw2" } }
```

#### Beispielkonfiguration für einen funkbasier Schaltaktor mit separater Leistungsmessung
Wenn die Informationen zur Leisutngsmessung über einem separaten Kanal geliefert werden, behandelt FHEM diesen als eigenständiges Device. In diesem Fall muss das Device in `appOptions` über den Parameter `connected.power` definiert werden.
>Hinweis: Informationen zur Leistungsmessung liefert der FHEM-Parameter `Readings: power`

```
{ "template": "switch", "connected": { "receiver": "chn_akt.hm.dyn.sw2", "power": "chn_sen.hm.dyn.sw2_Pwr" } }
```

#### Beispielkonfiguration für einen Schaltaktor mit individuellem Statusverhalten
Die statusabhängige Anpassung von Templates erfolgt in `appOptions` über den Parameter `states`. [siehe auch](#templates-individuell-anpassen)
```
{ "template": "switch", "states": ["state:off:aus:0:success:mdi-water-off","state:on:ein:100:success:mdi-water"] }
```

### Standardverhalten
| Reading | Wert | Statustext | Statuslevel | Statusfarbe | Statusicon |
|----------------|------|------------|-------------|-------------|------------|
| Activity | ^(?!alive) | keine Verbindung | 100 | error | mdi-power-plug |
| state | on | an | 100 | success | mdi-power-plug |
| state | off | aus | 0 | success | mdi-power-plug-off |

### Aktionen
| Button | Aktion | FHEM Kommando |
|--------|--------|---------------|
| links | ausschalten | set *Devicename* off |
| rechts | einschalten | set *Devicename* on |

## Template Dimmer
...
