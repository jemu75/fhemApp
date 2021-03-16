# Customizing
Das Template **custom** kann komplett frei konfiguriert werden.

## Customizing über appOptions
Über das FHEM-Attribut `appOptions` kann das Template `custom` mit den Parametern `status`, `main` und `info` angepasst werden. Die genaue Definition der Parameter wird [hier](#customizing-definition) beschrieben.   
```
{ "template": "custom", "status": {...}, "main": [...], "info": {...} }
```

## Customizing über config.json
Damit individuelle erstellte Template-Definitionen nicht in jedem FHEM-Device abgelegt werden müssen, können *Vorlagen* in der Datei `config.json` unter dem Parameter `custom` gespeichert und damit einfach wiederverwendet werden.
```
{
  "connection": {...},
  "options": {...},
  "theme": {...},

  "custom": [
    {
      "name": "myDef",
      "status": {...},
      "main": [...],
      "info": {...}
    }
  ]
}
```

Über das FHEM-Attribut `appOptions` können die erstellten *Vorlagen* über den Parameter `customdef` eingebunden werden.
```
{ "template": "custom", "customdef": "myDef" }
```



## Customizing Definition


#### Beispiel für shelly PM1
```
{
  "name": "shellySwitchPower",
  "status": {
    "line": ["state:on:100:success","state:off:0:success"],
    "error": ["network:^(?!<html>connected):100:error:keine Verbindung"]
  },
  "main": [
    {
      "leftIcon": "mdi-minus",
      "leftClick": ["state::off"],
      "text": ["state:on:an","state:off:aus"],
      "rightIcon": "mdi-plus",
      "rightClick": ["state::on"]
    }
  ],
  "info": {
    "left1": ["state:on::mdi-power-plug","state:::mdi-power-plug-off"],
    "left2": ["power:0.1:%n.2w"],
    "mid1": [],
    "mid2": [],
    "right1": [],
    "right2": ["network:connected::mdi-wifi","network:::mdi-wifi-off"]
  }
}
```
#### Beispiel für Dimmer
```
{
  "name": "dimmer",
  "status": {
    "line": ["pct::%s:success"]
  },
  "main": [
    {
      "leftIcon": "mdi-minus",
      "leftClick": ["pct:100:pct 75","pct:75:pct 50","pct:50:pct 25","pct:25:off"],
      "leftLong": ["state::off"],
      "text": ["pct:1:an:","pct::aus"],
      "rightIcon": "mdi-plus",
      "rightClick": ["pct:75:on","pct:50:pct 75","pct:25:pct 50","pct:0:pct 25"],
      "rightLong": ["state::on"]
    }
  ],
  "info": {
    "left1": ["pct:1::mdi-lightbulb","pct:::mdi-lightbulb-off"],
    "left2": ["pct::%s%"]
  }
}
```
