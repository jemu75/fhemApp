# v.4.6.0 (21.12.2024)
## Panel
- new panel element popout
- bugfix position of vertical divider
# v4.5.3 (12.12.2024)
## App
- bugfix for panel width on large screens
- update core modules and dependencies
# v4.5.2 (10.12.2024)
## Core
- bugfix for loading FHEMApp if darkmode over FHEM is not used
# v4.5.1 (09.12.2024)
## Core
- bugfix for changing darkmode
# v4.5.0 (08.12.2024)
## Core
- new settings for parameter diff into replacer %d (nozero and numeric)
## Panels
- Panels are displayed without gaps if they are of different heights
## Slider
- Bugfix for setting Height of vertical slider
# v4.4.1 (17.11.2024)
## Core
- bugfix for replacer %d
# v4.4.0 (16.11.2024)
## Core
- add replacer %r for replacing values
- new parameter diff for replacer %d to show timedifferences
## Panel
- add options `expanded` and `collapsed` for parameter `show` in mainlevels 
## Panel Menu
- replace underlines with spaces in case of getting values from lightscene
## Panel Textfield
- new main Element for input values and send to FHEM
# v4.3.0 (09.06.2024)
## Panel
- optimization of show/hide mainlevels
## Settings
- optimization of navigation settings
- bugfix for iframes
# v4.2.0 (28.05.2024)
## Panel Colorpicker
- handling for hue values implemented
## Default Templates
- add menu for favourites at sonosplayer
## Core
- Optimization reconnect to FHEM Server
## Panel
- bugfix for vertical dividers in mainlevels
- bugfix for replacing devicekeys in FHEM set commands
## Settings
- bugfix for saving large configurations
# v4.1.4 (20.05.2024)
## App
- correct translations for settings
- Time from FHEM Server will be used
## Settings
- optimization for general settings tab
- option for hide Navigation for large screens
## Panel Colorpicker
- bugfix Element Style; level height is now recommended for 140px
## Panel Image
- no scroller if panel is maximized
## Panel IFrame
- new main Element for embedding iframes
# v4.1.3 (04.05.2024)
## App
- update core modules and dependencies
- bugfix with of Optionmenu in case of changing screensize
- bugfix Navigation menu opens several subgroups
## Settings
- bugfix Filtering the lists for panels and templates
- bugfix Cursor keys work correctly for panels and templates in raw mode
- defaultRoute can be defined
# v4.1.2 (02.05.2024)
## Settings
- bugfix back button at panel and template settings
## Panel Button
- bugfix for touchdevices
# v4.1.1 (29.04.2024)
## Panel Button
- bugfix if fhem command will be send
## Panel Menu
- bugfix double load menu items
## Panel
- add options menu for loglevel 7
# v4.1.0 (28.04.2024)
## App
- merge Beta Version to Stable Version
# v4.0.41-beta (27.04.2024)
## Panel Status
- bug fix level switch on right side
- add button for template editor on loglevel 7
# v4.0.40-beta (25.04.2024)
## Core
- loading of standard templates optimised
## Panel
- bug fix in case of maximize panels
# v4.0.39-beta (24.04.2024)
## Panel Status
- truncate long titles
- show button to edit panel settings from loglevel 7
## Settings Panel
- bug fix in case of new panel without a template and adding new devicekeys
## Settings
- Control via URL routes possible
## App
- adding default template chart
# v4.0.38-beta (21.04.2024)
## Panel 
- status now uses the colour variable *primary* analogous to the header of **FHEMApp**
## Panel menu
- add new function for handling FHEM get command
## Settings
- bugfix for adding new languages
## App
- adding default template lightscene
# v4.0.37-beta (20.04.2024)
## Settings
- Selection of FHEM devices optimised
## App
- adding default templates
## Core
- load all default templates on inizialising FHEMApp
- show header after config is loaded
# v4.0.36-beta (17.04.2024)
## App
- providing default templates
## Core
- bugfix don't show navigation items without name
# v4.0.35-beta (10.04.2024)
## OptionsMenu
- App Update Function
## Core
- Changing DarkMode over FHEM reading
- Solving unicode problem https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem 
# v4.0.34-beta (29.03.2024)
## Panel Button
- When selecting the type "route" on click/longClick/longRelease, individual panels can now also be addressed
# v4.0.33-beta (27.03.2024)
## Settings
- bugfix for panel / template settings
## Panel
- bugfix show expand icon if no title is defined
# v4.0.32-beta (26.03.2024)
## Panel Button
- bugfix if more than one FHEM Command will be sended 
## Panel Slider
- optimization Labelcolor in case of dark mode
# v4.0.31-beta (24.03.2024)
## App
- bugfix for mobile Header
## Settings
- bugfix panel/template edit level items
- Wizard for element definitions
# v4.0.30-beta (20.03.2024)
## Core
- bugfix for euro-sign inside from definitions
## Component Chart## Core
- replacer %n option noLocaleNumber deprecated -> removed!
- Optimization for displaying formatted values
## Settings
- Wizard for devices definitions in panels 
- new element devicekeys in templates
# v4.0.29-beta (17.03.2024)
## Core
- bugfix for change imageGradient in case of changing theme
# v4.0.28-beta (17.03.2024)
## Panel
- bugfix for hide/show Levels
- bugfix for maximizable button
## Documentation
- Better explanation of the syntax for definitions
# v4.0.27-beta (16.03.2024)
## Core
- replacer %n option noLocaleNumber deprecated -> removed!
- bugfix for update readings directly
- bugfix for change imageGradient in case of changing theme
## Panel
- bugfix for hide/show Levels
# v4.0.26-beta (13.03.2024)
## Core
- bugfix for spaces at readings 
- local Loop to update reading directly without response from FHEM
## Panel
- optimization for section info
# v4.0.25-beta (11.03.2024)
## Settings
- add option for header in mobile view
- optimization language settings
## Panels
- optimization for section info
# v4.0.24-beta (10.03.2024)
## Core
- detect darkMode from OS
## Settings
- bugfix for panels with extended settings
- pageSize on List of Templates and Panels will be saved in the current session
- optimization language settings
# v4.0.23-beta (09.03.2024)
## Core
- replacer %n new option noLocaleNumber
## Settings
- make Definitions sortable via drag and drop
## Panel
- Element Menu Button is configurable
# v4.0.22-beta (01.03.2024)
## Framework
- Bugfix for vuetify3 extention panel -> version rollback
## Settings
- Bugfix for synchronisation between raw-mode and ui-mode
## Core
- Bugfix for reconnect
# v4.0.21-beta (26.02.2024)
## Settings
- Bugfix for fhem commands in Header Settings
# v4.0.20-beta (26.02.2024)
## Core
- csrf handling changed
# v4.0.19-beta (25.02.2024)
## Core
- Bugfix for Navigation if panel is not showed
- Bugfix Sorting Panelview
# v4.0.18-beta (11.02.2024)
## Settings
- Optimization Panel and Template Settings
# v4.0.17-beta (04.02.2024)
## Core
- Optimization in case of new Instance
# v4.0.16-beta (03.02.2024)
## Settings
- Optimization Panel and Template Settings
- Add rawMode
# v4.0.15-beta (31.01.2024)
## Component Colorpicker
- Develpoment
# v4.0.14-beta (26.01.2024)
## Component Colorpicker
- Develpoment
# v4.0.13-beta (24.01.2024)
## Component Chart
- Preview
- Documentation
# v4.0.12-beta (18.01.2024)
## Component Chart
- Sizing and Preview
# v4.0.11-beta (13.01.2024)
## Panel
- Bugfix switching Levels
# v4.0.10-beta (06.01.2024)
## Component Chart
- Initial Development
# v4.0.9-beta (02.01.2024)
## Component Slider
- option Vertical
# v4.0.8-beta (01.01.2024)
## coreFunction
- distributed Templates
# v4.0.7-beta (31.12.2023)
## Panel 
- bugfixing
# v4.0.6-beta (29.12.2023)
## Panel
- adding Property maximizable
# v4.0.5-beta (29.12.2023)
## Component Slider
- bugfixing
## Component Image
- adding Property height
# v4.0.4-beta (28.12.2023)
## coreFunction
- bugfixing
# v4.0.3-beta (27.12.2023)
## coreFunction
- bugfixing
# v4.0.2-beta (26.12.2023)
## Navigation Setting 
- sort Option
## core
-1st reconnect without warning
## Template Setting
- show JSON-Data
# v4.0.1-beta (18.12.2023)
## initial development
- fhem Core
- UI
# v4.0.0-beta (17.12.2023)
## initial development
- fhem Core