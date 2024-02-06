# Neuigkeiten in FHEMapp v4
FHEMapp Version 4 ist die Weiterentwicklung von FHEMApp v3 und liefert folgende Neuigkeiten.

* Installation und Updates direkt über FHEM möglich
* Betrieb von beliebig vielen Instanzen
* Unterstützung unterschiedlicher Sprachen
* frei konfigurierbares Navigationsmenü
* zusätzliches Optionsmenü
* Tag/Nacht Modus
* Konfiguration direkt in FHEMapp (auch ohne JSON) möglich
* neues Konzept für Panels
* erweitere Statusanzeige in Panels
* Hintergrundbilder für Panels und App-Header
* bessere Unterstützung von Slidern
* Unterstützung von Colorpicker für RGB-Geräte
* Unterstützung von eCharts

## Speicherort für FHEMapp
Die Einstellungen werden nicht mehr im FHEM-Attribute `appOptions` abgelegt. Somit wird die FHEM-Konfiguration (fhem.cfg bzw. config-db) nicht mehr unnötig aufgebläht. Ein neues FHEM-Modul (02_FHEMAPP.pm) übernimmt das Laden und Speichern der gesamten Einstellungen. Die Einstellungen werden in FHEM unter `/opt/fhem/conf/...` abgelegt. Weiterhin übernimmt das FHEM-Modul die Installation sowie Updates von **FHEMapp**. In FHEM können beliebig viele Devices vom Typ FHEMAPP definiert werden. Jedes in FHEM definierte FHEMAPP-Device repräsentiert dabei eine separate Instanz von **FHEMapp**

## Konfiguration
Für die Konfiguration von **FHEMapp** steht innerhalb der App ein eigener Bereich bereit. In diesem können alle Einstellungen  vorgenommen werden. Einstellungen können über Dialoge bearbeitet werden, ohne dass JSON-Kenntnisse erforderlich sind. Bei Bedarf können Panels und Templates aber auch direkt über einen integrierten JSON-Editor bearbeitet werden.

## Migration von Version 3
Definitionen, die innerhalb der Templates bzw. in `appOptions` -> `setup` unter Version 3.x hinterlegt wurden, können weitgehend in Version 4 übernohmmen werden. Durch das neue Konzept für Panels ist Version 4 jedoch nicht uneingeschränkt abwärts kompatibel. Da der Betrieb von **FHEMapp** Version 3.x und Version 4 uneingeschränkt parallel möglich ist, kann die bestehende Konfiguration von Version 3.x jedoch schrittweise nach Version 4 übernommen werden.
