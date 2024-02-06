# Hinweise für Beta-Tester

Betrieb von FHEMapp Version 3.x ist parallel möglich. Version 3.x und Version 4 müssen in unterschieldichen Verzeichnissen installiert werden!
* Installation in separatem Verzeichnis (/opt/fhem/www/fhemapp4)
* FHEM-Modul `02_FHEMAPP.pm` in eure FHEM Installation kopieren (unter `/opt/fhem/FHEM/...`) kopieren
* FHEM neu starten
* Device in FHEM definieren `defmod myapp fhemapp ./www/fhemapp4`