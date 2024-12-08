import { reactive } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import router from '@/router'
import { useI18n } from 'vue-i18n'
import { useTheme, useDisplay } from 'vuetify'

export const useFhemStore = defineStore('fhem', () => {
    const i18n = useI18n()
    const theme = useTheme()
    const display = useDisplay()

    const app = reactive({
        settings: {
            protocol: window.location.protocol.replace(':',''), 
            server: window.location.hostname, 
            port: window.location.port, 
            path: window.location.pathname.replace('/','').split('/')[0], 
            xhr: false,
            lang: i18n.locale.value,
            dark: false,
            loglevel: 1
        },
        config: {
            header: {},
            navigation: [],
            panels: [],
            templates: [],
            content: {},
            colors: {}
        },
        header: {            
            time: new Date(),
            timeFormat: { hour: '2-digit', minute: '2-digit' },
            dateFormat: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
            showTime: false,
            showDate: false,
            showTitle: true,
            hideNavigation: false,
            imageUrl: null,
            imageGradient: null,
            showDarkMode: false,
            showReloadPage: false,
            showUpdate: false,
            showSettings: false,
            commands: [],
            darkModeOverFhem: null,
            defaultRoute: null            
        },
        fhemDevice: null,
        panelView: [],
        panelList: [],
        navigation: [],
        threads: [],
        distTemplates: [
            'blind', 
            'chart',
            'contact', 
            'dimmer', 
            'light', 
            'lightscene',
            'motiondetector', 
            'proplanta', 
            'smokedetector', 
            'sonosplayer', 
            'switch', 
            'temperatur', 
            'thermostat'
        ],
        noConfig: false,
        isLoaded: false,
        isReady: false,
        display: display.name,
        viewCols: { xxl: 4, xl: 3, lg: 3, md: 2, sm: 2, xs: 1 },
        message: false,
        currentView: null,
        settingsTab: null,
        settingsItem: null,
        version: null,
        updateAvailable: false,
        updateProgress: false,
        helpURL: 'https://github.com/jemu75/fhemApp/tree/master?tab=readme-ov-file#'        
    })

    const stat = {
        csrf: null,
        conn: null,
        xhrOffset: 0,
        xhrBuffer: '',
        evtBuffer: [],
        panelMap: [],
        timeOffset: 0
    }

    //coreFunction emit messages 1=status, 2=error, 3=warning, 4=info, 5=send, 6=receive, 7=details
    function log(lvl, text, details, msg) {
        let fmt = {
            lang: window.navigator.language || 'en-EN',
            format: { hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits: 3 }
        }
        
        let res = {
            ts: new Date().toLocaleString(fmt.lang, fmt.format),
            text: text,
            details: app.settings.loglevel < 7 ? '' : (details || '')
        }

        if(msg && !app.message) {
            app.message = {
                type: lvl === 2 ? 'error' : lvl === 3 ? 'warning' : 'info',
                title: '_app.messages.' + msg + '.title',
                text: '_app.messages.' + msg + '.text'
            }
        }

        if(lvl <= app.settings.loglevel) {
            if(lvl === 2) {
                console.error(res.ts, res.text, res.details)
            } else if(lvl === 3){
                console.warn(res.ts, res.text, res.details)
            } else {
                console.info(res.ts, res.text, res.details)
            }
        }
    }

    //coreFunction for Clock
    function initClock() {
        setInterval(() => {
            app.header.time = new Date(new Date().getTime() + stat.timeOffset)
        }, 1000)
    }

     //coreFunction to read Version
     async function getVersion() {
        let  header = new Headers()

        header.append('pragma', 'no-cache')
        header.append('cache-control', 'no-cache')

        let init = {
            method: 'GET',
            headers: header
        }
        
        let log = await fetch('CHANGELOG.md', init)
            .then((res) => {
                return res.text()
            })

        app.version = log.split('\n')[0].split(' ')[1].trim()
    }

    //coreFunction to handle internal Threads
    function thread(id) {
        if(id) { 
            app.threads.splice(app.threads.indexOf(id), 1)
        } else {
            app.threads.push((app.threads.slice(-1)[0] || 0) + 1)
        }

        return app.threads.slice(-1)[0]
    }

    //coreFunction to open online HelpPage (README.md)
    function help(anchor) {
        window.open(app.helpURL + anchor, '_blank')
    }

    //coreFunction to switch darkMode
    function changeDarkMode(mode) {
        let primaryColor

        if(mode !== theme.global.name.value) theme.global.name.value = theme.global.name.value === 'dark'? 'light' : 'dark'

        if(!app.config.header.imageGradient) {
            primaryColor = theme.global.current.value.colors.primary        
            app.header.imageGradient = "to top ," + hexToRgbA(primaryColor, 0.6) + ", " + hexToRgbA(primaryColor, 0.6)
        }
    }

    //coreFunction to change darkMode
    function initDarkMode() {
        let darkMode = window.matchMedia('(prefers-color-scheme: dark')

        changeDarkMode(darkMode.matches ? 'dark' : 'light')

        darkMode.addEventListener('change', (obj) => {
            if(!app.settings.dark) changeDarkMode(obj.matches ? 'dark' : 'light')
        })
    } 

    //coreFunction to handle url params and query-string
    function handleURL(route) {
        let res = {
            connChanged: false,
            routeChanged: false,
            configChanged: false,
            langChanged: false,
            darkChanged: false
        }

        if(route.query) {            
            for(const param of Object.keys(app.settings)) {
                if(route.query[param] && route.query[param] !== app.settings[param]) {
                    app.settings[param] = route.query[param]
                    if(['protocol','server','port','path'].indexOf(param) !== -1) res.connChanged = true
                    if(param === 'lang') res.langChanged = true
                    if(param === 'dark') res.darkChanged = true
                }
            }
        }

        if(route.params) {            
            if(route.params.config && route.params.config !== app.fhemDevice) {
                app.fhemDevice = route.params.config
                res.configChanged = true
            }

            if(route.params.view && route.params.view !== app.currentView) {
                app.currentView = route.params.view
                res.routeChanged = true
            }

            if(route.name === 'settings') {
                app.settingsTab = route.params.tab || 'general'
                app.settingsItem = route.params.item
            }
        }

        log(4, 'URL processed.', route)

        return res
    }
    
    //coreFunction generate URL for FHEM requests
    function createURL(params) {
        let conn = app.settings,
            result = conn.protocol + '://' + conn.server + ':' + conn.port + (conn.path ? '/' + conn.path : '')        
        
            result += (params ? params : '') 

        return result
    }

    //coreFunction for requests to fhem
    async function request(type, cmd) {
        let params = '?XHR=1',
            options = { method: 'POST' },
            cmdParts = [],
            result
        
        if(type !== 'token' && stat.csrf) params += '&fwcsrf=' + stat.csrf
        if(cmd) options.body = 'cmd=' + cmd

        //local Loop to update reading directly without response from FHEM
        if(/^set.*/.test(cmd)) {
            cmdParts = cmd.split(' ')

            if(cmdParts.length > 2) {
                stat.evtBuffer.push({ reading: cmdParts.slice(1, 3).join('-'), value: cmdParts.slice(-1) })
                handleEventBuffer(true)
            }
        }

        log(4, 'Request send to FHEM.', { url: createURL(params), options })

        return await fetch(createURL(params), options)
            .then((res) => {
                if(type === 'token') result = { token: res.headers.get('x-fhem-csrftoken') }
                if(type === 'json') result = res.json()
                if(type === 'text') result = res.text()

                return result
            })
            .catch((err) => {
                log(2, 'Connection to FHEM failed.', err, 'request')
                return false
            })
    }

    //coreFunction fill settings (session)
    async function getToken() {
        let res = await request('token', null)

        if(!res) return false
        stat.csrf = res.token

        return true
    }

    //coreFunction get Timestamp from FHEM  Server
    async function timeSync() {
        let res = await request('text', '{ localtime() }')

        if(!res) return false
        stat.timeOffset = new Date(res) - new Date()

        return true
    }

    //coreFunction convert String to JSON
    function stringToJson(val, noLogging) {
        try {
            const parsed = JSON.parse(val)
            if (parsed && typeof parsed === "object") {
              return noLogging ? { result: parsed, error: false } : parsed
            }
        } catch(err) {
            if(!noLogging) log(2, 'JSON parsing failed.', { input: val, error: err.message }, 'jsonParse') 
            return noLogging ? { result: null, error: err.message } : false 
        }

        log(3, 'Unhandled state during JSON parsing.', null, 'jsonParse')
        return false
    }

    //coreFunction convert base64 to String
    function base64ToString(val) {
        try {
            const decoded = atob(val)
            if(decoded && typeof decoded === 'string') {
                return new TextDecoder().decode(Uint8Array.from(decoded, (m) => m.codePointAt(0)))
            }
        } catch { 
            log(2, 'Base64 decode failed.', val, 'base64')
            return false 
        }

        log(3, 'Unhandled state during Base64 Decoding.', null, 'base64')
        return false
    }

    //coreFunction convert hex to RGBA
    function hexToRgbA(hex, a) {
        let c
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c = hex.substring(1).split('')
            if(c.length === 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]]
            }
            c = '0x' + c.join('')
            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',' + a + ')'
        }
    }

    //coreFunction for read json Files
    async function getJsonFile(file) {
        let header = new Headers()
        header.append('pragma', 'no-cache')
        header.append('cache-control', 'no-cache')
    
        let options = { method: 'GET', headers: header }
    
        let result = await fetch(file, options)
          .then((res) => res.json())
          .catch((err) => log(2, 'Loading JSON-File ' + file + ' failed.', { file, err }))
    
        if(result) log(4, 'JSON-File ' + file + ' was successful loaded.', { file, result })
    
        return await result
    }

    //coreFunction load Configuration from FHEM Device
    async function loadConfig() {
        let res = await request('text', 'get ' + app.fhemDevice + ' config'),            
            resText,
            cfg

        if(RegExp('Please define '+ app.fhemDevice +' first').test(res)) {
            log(2, 'Wrong FHEM Config-Device in URL.', { fhemResult: res }, 'wrongDevice')
            return false
        }

        resText = base64ToString(res)
        cfg = typeof resText === 'string' ? stringToJson(resText) : false
        app.noConfig = false

        if(!cfg) {
            log(2, 'Loading the Configuration of FHEM failed.', res, 'config')
            return false
        }

        if(cfg.error) {
            if(cfg.error === 'No config found!') app.noConfig = true
            log(3, cfg.error)
        }

        //write config into app
        for(const cfgPart of Object.keys(app.config)) {
            if(cfg[cfgPart] && cfg[cfgPart] !== app.config[cfgPart]) {
                if(app.config[cfgPart].length > 0) app.config[cfgPart].splice(0)
                Object.assign(app.config[cfgPart], cfg[cfgPart])
            }
        }

        //merge translations
        for(const [lang, defs] of Object.entries(app.config.content)) {
            if(!i18n.messages.value[lang]) i18n.messages.value[lang] = {}
            Object.assign(i18n.messages.value[lang], defs)
        }

        //merge themes
        if(app.config.colors.light) Object.assign(theme.themes.value.light.colors, app.config.colors.light)
        if(app.config.colors.dark) Object.assign(theme.themes.value.dark.colors, app.config.colors.dark)
        
        //merge header
        Object.assign(app.header, JSON.parse(JSON.stringify(app.config.header)))
        if(app.config.header.defaultRoute && !app.currentView) app.currentView = app.config.header.defaultRoute
        changeDarkMode(theme.global.name.value)

        if(!app.noConfig) {
            log(4, 'Config loaded.', cfg)
            app.isLoaded = true
        }
        
        return true
    }

    //coreFunction load default Templates if needed
    async function loadTemplates() {
        let templateList = [],
            distTemplate,
            threadId = thread()

        for(const panel of app.config.panels) {
            if(panel.template && app.config.templates.map((e) => e.name).indexOf(panel.template) === -1) {
                if(app.distTemplates.indexOf(panel.template) !== -1 && templateList.indexOf(panel.template) === -1) templateList.push(panel.template)
            }
        }

        for(const template of templateList) {
            distTemplate = await getJsonFile('./templates/' + template + '.json')
            if(distTemplate) {
                distTemplate.dist = true
                app.config.templates.push(distTemplate)
            }
        }

        thread(threadId)

        return true
    }

    //coreFunction start App-Update
    function appUpdate() {
        thread()
        app.updateProgress = true
        request('text', 'set ' + app.fhemDevice + ' update')
    }

    //subFunction for handle internal tasks triggered from FHEM (update, darkMode) called from handleEventBuffer and initialLoad
    function handleInternalTask(task, val) {
        if(task === 'update' && val === '1') app.updateAvailable = true
        if(task === 'update' && val === '0' && app.updateProgress) location.reload()

        if(task === 'darkMode') changeDarkMode(handleDefs([[app.header.darkModeOverFhem.split(':')[1], val, 'true'].join(':')], ['dark'], [false]).dark ? 'dark' : 'light')
    }

    //subFunction for update values in panelList
    function doUpdate(obj, path, value) {
        let parts

        if(path.length > 1) {
            doUpdate(obj[path[0]], path.slice(1), value)
        } else {
            parts = obj[path].split(':')
            parts[0] = /:/.test(value) ? value.replace(/:/g,'&#058;') : value
            obj[path] = parts.join(':')
        }
    }

    //coreFunction to handle all Events in Buffer
    function handleEventBuffer(localLoop) {
        let idx,
            evts = stat.evtBuffer.length
        
        if(!app.isReady || evts === 0) return

        for(const evt of stat.evtBuffer) {
            idx = stat.panelMap.map((e) => e.reading).indexOf(evt.reading)

            if(idx !== -1) {
                if(stat.panelMap[idx].items) {
                    for(const path of stat.panelMap[idx].items) {
                        doUpdate(app.panelList, path, evt.value)
                    }
                } else {
                    handleInternalTask(stat.panelMap[idx].task, evt.value)
                }

                if(!localLoop) log(6, 'Data from FHEM handled.', evt)
            } else {
                if(!localLoop)  log(8, 'Data from FHEM received.', evt)
            }
        }

        stat.evtBuffer.splice(0, evts)
    }

    //subFunction to handle messages from FHEM called from openEventWatcher() 
    function handleEvent(buffer) {
        let lines = [],
            event

        if(!app.settings.xhr) {
            lines = buffer.data.split('\n')
        } else {
            stat.xhrBuffer += buffer.substr(stat.xhrOffset, buffer.length - stat.xhrOffset)

            if(stat.xhrBuffer.slice(-2).match(']')) {
                lines = stat.xhrBuffer.split('\n')
                stat.xhrBuffer = ''   
            } 

            stat.xhrOffset = buffer.length
        }

        for(const line of lines) {
            if(line.length > 0) {
                event = stringToJson(line)
                if(/-/.test(event[0])) stat.evtBuffer.push({ reading: event[0], value: event[1] })
            }
        }

        handleEventBuffer()
    }

    //coreFunction open websocket or longpoll session to FHEM
    function openEventWatcher() {
        let url = createURL('?inform=type=status;filter=.*;fmt=JSON&XHR=1')

        stat.evtBuffer = []

        if(!app.settings.xhr && typeof WebSocket === 'function') {
            stat.conn = new WebSocket(url.replace(/^http/i,'ws'))

            stat.conn.onopen = () => {
                log(4, 'Websocket Connection opened.')
            }
            stat.conn.onmessage = (msg) => handleEvent(msg)
            stat.conn.onerror = () => refreshEventWatcher(0)
            stat.conn.onclose = () => refreshEventWatcher(0)
        } else {
            stat.conn = new XMLHttpRequest()
            stat.conn.open("GET", url, true)

            stat.conn.onloadstart = () => {
                if(!app.settings.xhr) {
                    app.settings.xhr = true
                    log(3, 'Websocket is not supported by the browser. Fallback to longpoll connection.', null, 'websocket')
                }
                
                log(4, 'Longpoll Connection opened.')
            }

            stat.conn.onerror = () => refreshEventWatcher(0)
            stat.conn.onloadend = () => refreshEventWatcher(0)

            stat.conn.onreadystatechange = () => {
                if(stat.conn.status === 200 && stat.conn.readyState === 3) handleEvent(stat.conn.responseText)
            }

            stat.conn.send()
        }

        return true
    }

    //subFunction called from openEventWatcher to reconnect FHEM
    function refreshEventWatcher(delay) {
        let res

        if(delay < 3000) app.message = {}

        setTimeout(async () => {
            res = await createSession(true)

            if(!res) {                
                if(delay < 3000) {
                    delay += 500                    
                } else {
                    app.message = false
                    log(3, 'Connection to FHEM was interrupted. Try to reconnect in 3 seconds.', null, 'reconnect')
                }
                refreshEventWatcher(delay)
            }
        }, delay)
    }

    //helperFunction called from createPanelMap for handle reading-definitions in Panels
    function getReading(devices, reading) {
        let parts = reading.trim().split('-'),
            idx = devices.map((e) => e.key).indexOf(parts[0])

        if(idx !== -1) {
            parts[0] = devices[idx].name
        } else {
            parts.unshift(devices[0].name)
        }

        return parts.join('-')
    }

    //helperFunction for create PanelList  
    function createPanelMap(devices, obj, path) {
        let val,
            reading,
            idx

        if(obj) {
            for (const [key, value] of Object.entries(obj)) {
                if(typeof obj[key] === 'object') {
                    createPanelMap(devices, obj[key], [...path, key])
                } else {
                    if(typeof value === 'string') {
                        val = value.replace(/\\:/g,'&#058;')
                        if(!/^::/.test(val) && /.*:.*:.*/.test(val)) {
                            reading = getReading(devices, val.split(':')[0])

                            idx = stat.panelMap.map((e) => e.reading).indexOf(reading)
    
                            if(idx === -1) {
                                stat.panelMap.push({ reading: reading, items: [[...path, key]] })
                            } else {
                                stat.panelMap[idx].items.push([...path, key])
                            }

                            if(/%d\(.*{.*"diff".*/.test(val)) {
                                setInterval(() => {
                                    let val = getEl(app.panelList, path)
                                    val[0] = val[0] + ' '
                                    val[0] = val[0].substr(0, val[0].length - 1)
                                }, 1000)
                            }
                            
                        }
                    }
                }
            }
        }        
    }

    //helperFunction called from createPanelList
    function getDeviceList(devices) {
        let res = [],
            part

        if(!Array.isArray(devices) || (Array.isArray(devices) && devices.length === 0)) return false

        for(const device of devices) {
            part = device.split(':')
            res.push({ key: part[0], name: part[1] || part[0] })
        }

        return res
    } 

    //coreFunction create PanelList
    function createPanelList() {
        let panel,
            devices,
            panels = JSON.parse(JSON.stringify(app.config.panels)),
            templates = JSON.parse(JSON.stringify(app.config.templates)),
            templateIdx,
            darkModeDef
        
        if(app.config.panels.length === 0) log(3, 'No Panels defined.', null, 'noPanels')

        stat.panelMap = []
        app.panelList = []
        
        for(const [idx, panelDef] of Object.entries(panels)) {
            panel = {}

            templateIdx = panelDef.template ? templates.map((e) => e.name).indexOf(panelDef.template) : -1

            if(templateIdx !== -1) {
                panel = JSON.parse(JSON.stringify(templates[templateIdx]))
                for(const section of Object.keys(panelDef)) {
                    if(section === 'main') {
                        for(const [lvlIdx, mainLevel] of Object.entries(panelDef.main)) {
                            if(mainLevel.level) {
                                for(const key of Object.keys(mainLevel.level)) {
                                    if(mainLevel.level[key]) {
                                        panel.main[lvlIdx] = mainLevel
                                        break
                                    }
                                }
                            }
                        }
                    } else {
                        if(typeof panelDef[section] === 'object' && panel[section]) Object.assign(panel[section], panelDef[section])
                    }
                }
                panel.name = panelDef.name
            } else {
                panel = panelDef
            }

            devices = getDeviceList(panel.panel ? panel.panel.devices: [])

            if(!devices) {
                log(3, 'No Devices defined in Panel ' + panel.name)
            } else {
                createPanelMap(devices, panel, [idx])
                app.panelList.push(panel)
            }
        }

        //add watching for updates
        stat.panelMap.push({ reading: app.fhemDevice + '-update_available', task: 'update' })
        if(app.header.darkModeOverFhem) {
            darkModeDef = app.header.darkModeOverFhem.split(':')
            if(darkModeDef.length === 2) stat.panelMap.push({ reading: darkModeDef[0], task: 'darkMode'})
        }

        log(4, 'PanelList and PanelMapping created.', { panelList: app.panelList, panelMap: stat.panelMap })
        return true
    }

    //helperFunction
    function getEl(obj, arr) {
        return arr.reduce((obj, level) => obj && obj[level], obj);
    }

    //coreFunction inital Loading from FHEM
    async function initialLoad() {
        let deviceList = [],
            panelList = JSON.parse(JSON.stringify(app.panelList)),
            device,
            res,
            parts,
            idx,
            jsonList2Item,
            val

        for(const item of stat.panelMap) {
            device = item.reading.split('-')[0]

            if(deviceList.indexOf(device) === -1) deviceList.push(device)
        }

        if(deviceList.length === 0) {
            log(3, 'No Devices in Panels defined.', null, 'noPanels')
            return true
        } 
        
        res = await request('json', 'jsonlist2 ' + deviceList.join(','))
        if(!res) return

        for(const item of stat.panelMap) {
            parts = item.reading.split('-')
            idx = res.Results.map((e) => e.Name).indexOf(parts[0])

            jsonList2Item = []
            val = null
            
            if(parts[1] === 'i') {
                jsonList2Item = ['Internals', parts[2]]
            } else if (parts[1] === 'a') {
                jsonList2Item = ['Attributes', parts[2]]
            } else if (parts[parts.length -1] === 'ts') {
                parts.pop()
                parts.shift()
                jsonList2Item = ['Readings', parts.join('-'), 'Time']
            } else {
                parts.shift()
                jsonList2Item = ['Readings', parts.join('-'), 'Value']
            }

            val = getEl(res.Results[idx], jsonList2Item)

            if(item.items) {
                for(const path of item.items) doUpdate(panelList, path, val)
            } else {
                handleInternalTask(item.task, val)
            }
        }

        app.panelList = panelList
        log(4, 'Devices from FHEM loaded.', res)
        return true
    }

    //coreFunction get Icon from iconMapping
    function getIcon(icon, iconDefs) {
        let defParts = null

        if(!iconDefs || !Array.isArray(iconDefs)) return icon
        if(iconDefs.length < 1) return icon

        for(const def of iconDefs) {
            if(/.*:.*/.test(def)) {
                defParts = def.split(':')
                if(RegExp(defParts[0]).test(icon)) return defParts[1]
            }
        }

        return icon
    }

    //coreFunction get Date/Time Diff from ISO-Date
    function getTimeDiff(timestamp, options) {
        let parts
        let res = []
        let diffMs = new Date(new Date().getTime() + stat.timeOffset) - new Date(timestamp)
        let diffDays = options.days ? Math.floor(diffMs / (1000 * 60 * 60 * 24)) : 0
        let diffHours = options.hours ? Math.floor(diffMs / (1000 * 60 * 60)) - (diffDays * 24) : 0
        let diffMinutes = options.minutes ? Math.floor(diffMs / (1000 * 60)) - (diffDays * 24 * 60) - (diffHours * 60) : 0
        let diffSeconds = options.seconds ? Math.floor(diffMs / 1000) - (diffDays * 24 * 60 * 60) - (diffHours * 60 * 60) - (diffMinutes * 60): 0 

        let showDay = /nozero/.test(options.days) ? false : true
        let showHour = /nozero/.test(options.hours) ? false : true
        let showMinute = /nozero/.test(options.minutes) ? false : true
        let showSecond = /nozero/.test(options.seconds) ? false : true

        if(/%t\(.*\)/.test(options.daysSuffix)) {
            parts = /%t\(.*\)/.exec(options.daysSuffix)
            options.daysSuffix.replace(parts[0], i18n.t(parts[0].slice(3, -1)))
        }

        if(/%t\(.*\)/.test(options.hoursSuffix)) {
            parts = /%t\(.*\)/.exec(options.hoursSuffix)
            options.hoursSuffix.replace(parts[0], i18n.t(parts[0].slice(3, -1)))
        }

        if(/%t\(.*\)/.test(options.minutesSuffix)) {
            parts = /%t\(.*\)/.exec(options.minutesSuffix)
            options.minutesSuffix.replace(parts[0], i18n.t(parts[0].slice(3, -1)))
        }

        if(/%t\(.*\)/.test(options.secondsSuffix)) {
            parts = /%t\(.*\)/.exec(options.secondsSuffix)
            options.secondsSuffix.replace(parts[0], i18n.t(parts[0].slice(3, -1)))
        }

        if(!/numeric/.test(options.hours)) diffHours = (diffHours < 10 ? '0' : '') + diffHours
        if(!/numeric/.test(options.minutes)) diffMinutes = (options.hoursSuffix === ':' && diffMinutes < 10 ? '0' : '') + diffMinutes
        if(!/numeric/.test(options.seconds)) diffSeconds = (options.minutesSuffix === ':' && diffSeconds < 10 ? '0' : '') + diffSeconds

        if(options.days && showDay) res.push(diffDays, options.daysSuffix || ' Tag(e) ')
        if(options.hours && showHour) res.push(diffHours, options.hoursSuffix || ' Stunde(n) ')
        if(options.minutes && showMinute) res.push(diffMinutes, options.minutesSuffix || ' Minute(n) ')
        if(options.seconds && showSecond) res.push(diffSeconds, options.secondsSuffix || ' Sekunde(n) ')

        return res.join('').trim()
    }

    //coreFunction Replace Values %s %n() %d() %t() %r() &#058;
    function replacer(prop, val, noLocalConv) {
        let res = prop

        if(typeof prop !== 'string') return prop

        if(/&#058;/.test(val)) val = val.replace(/&#058;/g,':')
        if(/&#058;/.test(res)) res = res.replace(/&#058;/g,':')

        if(/%s/.test(res)) res = res.replace(/%s/g, val)

        if(/%n\(.*\)/.test(res)) {
            res = res.replace('%n()','%n(0)')
            let def = /%n\(.*\)/.exec(res)
            let chkNum = /-?[0-9]/.exec(val)

            if(!chkNum) return null

            let opts = def[0].slice(3,-1).split(',')
            let ofs = parseFloat(opts[1] || 0)
            let digits = parseFloat(opts[0] || 0)
            let num = parseFloat(val.slice(chkNum.index)) + ofs

            res = def.input.replace(def[0], noLocalConv ? num.toFixed(digits) : i18n.n(num, { minimumFractionDigits: digits, maximumFractionDigits: digits }))
        }

        if(/%d\(.*\)/.test(res) && val) {
            let def = /%d\(.*\)/.exec(res)
            let opts = def[0].slice(3, -1)
            let options = { dateStyle: 'short', timeStyle: 'medium' }
            let date = val.replace(' ','T')
            let localeDate = /^(\d{1,2})\.(\d{1,2})\.(\d{2,4})/.exec(date)

            if(opts === 'time') options = { hour: 'numeric', minute: 'numeric', second: 'numeric' }
            if(opts === 'date') options = { dateStyle: 'short' }
            if(/{.*}/.test(opts)) options = stringToJson(opts)

            if(localeDate) date = date.replace(localeDate[0], [localeDate[3], localeDate[2], localeDate[1]].join('-'))
            if(!/(T|Z)/.test(date)) date += 'T00:00:00'

            if(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/.test(date)) {
                res = def.input.replace(def[0], options.diff ? getTimeDiff(date, options.diff) : i18n.d(date, options).replace(', ',' '))
            } else {
                res = def.input.replace(def[0], date + ' -> no ISO-Date')
            }
        }

        if(/%t\(.*\)/.test(res)) {
            let def = /%t\(.*\)/.exec(res)
            res = def.input.replace(def[0], i18n.t(def[0].slice(3, -1)))
        }

        if(/%r\(.*\,.*\,.*\)/.test(res)) {
            let def = /%r\(.*\)/.exec(res)
            let defParts = def[0].slice(3, -1).split(',')
            let r = defParts[defParts.length - 1]
            let s = defParts[defParts.length - 2]
            defParts.splice(-2, 2)

            res = defParts.join(',').replace(new RegExp(s, 'g'), r)
        }
        
        return res
    }

    //coreFunction to handle Definitions
    function handleDefs(defs, props, defaults, isList, splitter, noLocalConv) {
        let res = isList ? [] : {},
            defList,
            defParts,
            isTrue,
            filter,
            numPart,
            prototyp = {},
            hasProps = props && Array.isArray(props),
            hasDefaults = defaults && Array.isArray(defaults),
            obj

        if(hasProps) {
            for(const [idx, prop] of Object.entries(props)) {
                prototyp[prop] = hasDefaults ? defaults[idx] : null
            }
        }

        if(!isList) res = Object.assign({}, prototyp)

        if(!defs) return res

        defList = JSON.parse(JSON.stringify(defs))

        for(let def of defList) {
            def = def.replace(/\\:/g,'&#058;')
            if(!/.*:.*:.*/.test(def)) def = '::' + def
            defParts = def.split(':')
            isTrue = true

            if(splitter && defParts[0].split(splitter).length > 1) {
                for(const splitPart of defParts[0].split(splitter)) defList.push([splitPart, ...defParts.slice(1)].join(':'))
                continue
            }

            if(defParts[1]) {
                isTrue = false
                filter = parseFloat(defParts[1])

                if(isNaN(filter)) {
                    if(RegExp(!defParts[1] ? '.' : defParts[1]).test(defParts[0])) isTrue = true
                } else {
                    numPart = /-?[0-9]/.exec(defParts[0])
                    if(numPart && numPart.index !== -1) {
                        if(parseFloat(defParts[0].slice(numPart.index)) >= filter) isTrue = true
                    }
                }
            }

            if(isTrue) {
                obj = Object.assign({}, prototyp)

                for(let [idx, prop] of Object.entries(defParts.slice(2))) {
                    if(prop === 'true') prop = true
                    if(prop === 'false') prop = false

                    if(prop !== '') obj[hasProps && props[idx] ? props[idx] : [idx]] = replacer(prop, defParts[0], noLocalConv)
                }

                if(isList) { 
                    res.push(obj)
                } else {
                    res = obj
                    break
                }
            }
        }

        return res
    }

    //subFunction to create NavigatonItems from route called from createNavigation
    function createNavItems(route, navObj) {
        let path = route.split('->'),
            item = { name: path[0], title: path[0] },
            idx = navObj.map((e) => e.name).indexOf(item.name)

        if(idx !== -1) Object.assign(item, navObj[idx])
        if(path.length > 1) item.group = createNavItems(path.slice(1).join('->'), item.group || [])
        
        if(idx !== -1) {
            navObj[idx] = item
        } else {
            if(item.name) navObj.push(item)
        }

        return navObj
    }

    //subFunction for createNavigation()
    function sortNavItems(group) {
        for(const item of group) {
            if(item.sort && item.group && item.group.length > 1) {
                item.group.sort((a, b) => (a.title.toUpperCase() > b.title.toUpperCase()) ? 1 : (b.title.toUpperCase() > a.title.toUpperCase()) ? -1 : 0)
            }

            if(item.group) sortNavItems(item.group)
        }
    }

    //coreFunction to create Navigation
    function createNavigation() {
        let routes = []
        app.navigation = JSON.parse(JSON.stringify(app.config.navigation))
        
        for(const panel of app.panelList) {
            if(panel.panel.navigation) {
                routes = handleDefs(panel.panel.navigation, ['route'], [''], true, ',')

                if(handleDefs(panel.panel.show, ['show'], [true]).show) {
                    for(const item of routes) createNavItems(item.route, app.navigation)
                } 
            }
        }

        sortNavItems(app.navigation)
        
        log(4, 'Navigation loaded.', app.navigation)
        return true
    }

    //coreFunction load Panels in View
    function loadPanelView() {
        let routes,
            panelIdx,
            tid = thread()

        app.panelView = []

        if(/^panel=.*/.test(app.currentView)) {
            panelIdx = app.panelList.map((e) => e.name).indexOf(app.currentView.split('=')[1])
            if(panelIdx !== -1) app.panelView.push(panelIdx)
        } else {
            for(const [idx, panel] of Object.entries(app.panelList)) {
                if(panel.panel.navigation) {
                    routes = handleDefs(panel.panel.navigation, ['route'], [''], true, ',')
    
                    if(routes.map((e) => e.route).indexOf(app.currentView) !== -1) app.panelView.push(idx)
                }
            }
        }
        
        handleEventBuffer()
        log('4', 'PanelView loaded.', { view: app.currentView })
        thread(tid)

        return true
    }

    //coreFunction create a new Session
    async function createSession(connect) {
        let res = true
        let tid = thread()

        log(4, connect ? 'Create Session...' : 'Refresh Session...')

        app.isReady = false

        if(connect) stat.conn = null
        if(res && connect) res = await getToken()
        if(res && connect) res = openEventWatcher()
        if(res) res = await timeSync()
        if(res) res = await loadConfig()
        if(res) res = await loadTemplates()
        if(res) res = createPanelList()
        if(res) res = await initialLoad()
        if(res) res = createNavigation()
        if(res) res = loadPanelView()

        if(!res) {
            log(3, 'FHEMApp launching failed.')
        } else {            
            app.message = false
            app.isReady = true
            log(1, connect ? 'FHEMApp launched.' : 'Session refreshed.')

            if(connect && app.noConfig) {
                await router.push({ name: 'settings', query: router.currentRoute.value.query })
                log(3, 'No Config handling', null, 'noConfig')
            }
        }        

        thread(tid)
        return res
    }
      
    //Initialize FHEMApp
    function init() {
        log(1, 'FHEMApp launching...')

        initDarkMode()
        getVersion()
        initClock()

        //register eventHandler
        router.afterEach((to) => {
            let res = handleURL(to)

            if(res.langChanged) i18n.locale.value = app.settings.lang
            if(res.darkChanged) changeDarkMode(app.settings.dark === '0' ? 'light' : 'dark')
            if(res.connChanged || !app.isReady) return createSession(true)
            if(res.configChanged) return location.reload()
            if(res.routeChanged) loadPanelView()
        })
    }

    //FHEMApp entryPoint
    router.isReady().then(init())

    return { app, getEl, handleDefs, getIcon, replacer, createSession, request, thread, stringToJson, log, help, changeDarkMode, appUpdate, loadTemplates, createURL }
})