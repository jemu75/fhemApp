<script setup>
    import { computed, ref, watch } from 'vue'
    import { useFhemStore } from '@/stores/fhem'
    import { useI18n } from 'vue-i18n'
    import { useDisplay } from 'vuetify'
    import router from '@/router'

    import VueJsonPretty from 'vue-json-pretty'
    import 'vue-json-pretty/lib/styles.css'

    import { PrismEditor } from 'vue-prism-editor'
    import 'vue-prism-editor/dist/prismeditor.min.css' // import the styles somewhere

    // import highlighting library (you can use any library you want just return html string)
    import { highlight, languages } from 'prismjs/components/prism-core'
    import 'prismjs/components/prism-clike'
    import 'prismjs/components/prism-javascript'
    import 'prismjs/themes/prism-tomorrow.css' // import syntax highlighting styles

    import useClipboard from 'vue-clipboard3'

    import PanelCard from '../components/PanelCard.vue'
    import SettingsPropsList from './SettingsPropsList.vue'
    import SettingsPropsMain from './SettingsPropsMain.vue'

    const props = defineProps({
        type: String
    })

    const fhem = useFhemStore()

    const i18n = useI18n()

    const { mobile } = useDisplay()

    const { toClipboard } = useClipboard()

    const preLang = '_app.settings.' + props.type + '.'

    const headers = computed(() => {
        let res = [
            { key: 'name', title: i18n.t(preLang + 'title'), sortable: true, align: 'start' },
            { key: 'actions', title: '', sortable: false, align: 'end', width: '50%' }
        ]

        if(!mobile.value) {
            if(props.type === 'panels') {
                res = [
                    { key: 'name', title: i18n.t(preLang + 'title'), sortable: true, align: 'start' },
                    { key: 'devices', title: 'Devices', sortable: true, align: 'start', filterable: false },
                    { key: 'template', title: i18n.t('_app.settings.templates.title'), sortable: true, filterable: true },
                    { key: 'advanced', title: i18n.t(preLang + 'extended'), sortable: true, filterable: false },
                    { key: 'actions', title: '', sortable: false, align: 'end', width: '15%' }
                ]
            } else {
                res = [
                    { key: 'name', title: i18n.t(preLang + 'title'), sortable: true, align: 'start' },
                    { key: 'panels', title: i18n.t('_app.settings.panels.title', 2), sortable: true, align: 'end', filterable: false },
                    { key: 'actions', title: '', sortable: false, align: 'end' }
                ]
            }
        }

        return res
    })

    const item = ref()

    const items = computed(() => {
        let res = [],
            advanced = [],
            devices = '',
            panelCount = null

        for(const [ idx, el ] of Object.entries(fhem.app.config[props.type])) {
            if(!el.dist) {
                advanced = []
                if(props.type === 'panels') {
                    for(const e of Object.keys(el.panel)) {
                        if(['devices', 'template'].indexOf(e) === -1) {
                            advanced.push('panel')
                            break
                        }
                    }
                    if(Object.keys(el.status).length > 0) advanced.push('status')
                    if(el.main && JSON.stringify(el.main) !== '[{"level":{}}]') advanced.push('main')                    
                    if(Object.keys(el.info).length > 0) advanced.push('info')

                    if(el.panel.devices) devices = el.panel.devices.join(', ')
                } else {
                    panelCount = fhem.app.config.panels.map((e) => e.template).filter(e => e === el.name).length
                }

                res.push({ 
                    idx: parseFloat(idx), 
                    name: el.name, 
                    template: el.template,
                    advanced: advanced.length > 0 ? advanced.join(', ') : '-', 
                    panels: !panelCount ? '-' : panelCount,
                    devices: devices
                })
            }
        }

        res.sort((a,b) => (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : (b.name.toUpperCase() > a.name.toUpperCase()) ? -1 : 0)

        return res
    })

    const newCheck = computed(() => {
        return settings.value.newItem && items.value.map((e) => e.name).indexOf(settings.value.newItem) === -1 ? false : true
    })

    const panels = computed(() => {
        let res = []

        for(const panel of fhem.app.config.panels) {
            if(panel.template === item.value.name) {
                res.push(panel.name)
            }
        }

        res.sort((a, b) => (a.toUpperCase() > b.toUpperCase()) ? 1 : (b.toUpperCase() > a.toUpperCase()) ? -1 : 0)

        updatePanel(res[0])

        return res
    })

    const sections = computed(() => {
        let res = [
            { value: 'panel' },
            { value: 'status' },
            { value: 'main' },
            { value: 'info' },
        ]

        for(const el of res) el.title = i18n.t('_app.settings.props.' + el.value)

        return res
    })

    const jsonHeight = computed(() => {
        return (window.innerHeight - (settings.value.jsonError ? 380 : 340)) + 'px'
    })

    const settings = ref({
        search: '',
        newItem: '',
        itemIdx: null,
        pageSize: 10,
        extended: props.type === 'panels' ? false : true,
        rawMode: false,
        section: 'panel',
        panel: null,
        devices: {},
        fhemDevices: [], 
        preview: 'panel',
        jsonDef: null,
        jsonError: null
    })

    function editItem(val) {
        let idx 

        idx = fhem.app.config[props.type].map((e) => e.name).indexOf(val) 
        
        if(idx !== -1) {
            item.value = fhem.app.config[props.type][idx]
            settings.value.itemIdx = idx

            getReadings()

            settings.value.extended = items.value[items.value.map((e) => e.idx).indexOf(idx)].advanced !== '-' ? true : false

            if(typeof item.value === 'object') {
                settings.value.jsonDef = JSON.stringify(item.value, null, '\t')
                settings.value.jsonError = null
            }

            return
        }

        item.value = null
        settings.value.panel = null
    }

    watch(router.currentRoute, (val) => {
        editItem(val.params.item)
    })

    watch(() => fhem.app.isReady, (val) => {
        if(val) {
            if(router.currentRoute.value.params.item) editItem(router.currentRoute.value.params.item)
            getFhemDevices()
        }
        
    }, { immediate: true })

    function updatePanel(panel) {
        settings.value.panel = panel
    }

    function getPreviewPanel() {
        let idx = fhem.app.panelList.map((e) => e.name).indexOf(props.type === 'templates' ? settings.value.panel : item.value.name)

        return idx !== -1 ? fhem.app.panelList[idx] : null
    }

    async function getFhemDevices() {
        let threadId = fhem.thread(),
            res = await fhem.request('json', 'jsonlist2 .* Name alias'),
            alias

        settings.value.fhemDevices = []

        if(res && res.Results.length > 0) {
            for(const dev of res.Results) {
                alias = dev.Attributes.alias ? ' (' + dev.Attributes.alias + ')' : ''
                settings.value.fhemDevices.push({ value: dev.Name, title: dev.Name + alias })
            }
        }

        fhem.thread(threadId)
    }

    async function getReadings() {
        let devParts,
            res,
            panelIdx,
            devices = [],
            readings = [],
            result = {}

        if(props.type === 'panels') {
            if(item.value.panel.devices && item.value.panel.devices.length > 0) devices.push(...item.value.panel.devices)
        } else {            
            panelIdx = fhem.app.config.panels.map((e) => e.template).indexOf(item.value.name)

            if(panelIdx !== -1 && fhem.app.config.panels[panelIdx].panel.devices) devices.push(...fhem.app.config.panels[panelIdx].panel.devices)
        }

        if(devices.length > 0) {
            for(const device of devices) {
                devParts = device.split(':')
                if(devParts[1]) {
                    res = await fhem.request('json', 'jsonList2 ' + devParts[1])

                    if(res && res.Results.length > 0) {
                        readings = []

                        for(const parts of ['Internals', 'Readings', 'Attributes']) {
                            for(const el of Object.keys(res.Results[0][parts])) readings.push(parts[0].toLowerCase() + '-' + el)
                        }
                    }

                    result[devParts[0]] = readings
                }
            }
        }

        settings.value.devices = result
    }

    function addItem() {
        let newPanel = {
                name: settings.value.newItem,                
                template: null,
                panel: {},
                status: {},
                main: [{ level: {} }],
                info: {}
            },
            newTemplate = {
                name: settings.value.newItem,
                author: null,
                date: null,
                panel: {},
                status: {},
                main: [{ level: {} }],
                info: {}
            }

        fhem.app.config[props.type].push(props.type === 'panels' ? newPanel : newTemplate)
        
        gotoItem(settings.value.newItem)
        settings.value.newItem = ''
    }

    function gotoItem(val, tab) {
        router.push({ name: 'settings', params: { tab: tab || props.type, item: val }, query: router.currentRoute.value.query })
    }

    function deleteItem(idx) {
        fhem.app.config[props.type].splice(idx, 1)
    }

    function highlighter(code) {
        return highlight(code, languages.js)
    }

    function loadJsonDef(evt) {
        if(evt) {
            settings.value.jsonDef = JSON.stringify(fhem.app.config[props.type][settings.value.itemIdx], null, '\t')
        }
    }

    function changed() {
        let res = fhem.stringToJson(settings.value.jsonDef, true)

        settings.value.jsonError = res.error

        if(!settings.value.jsonError) fhem.app.config[props.type][settings.value.itemIdx] = res.result
    }

    function copyBtn() {
        toClipboard(settings.value.jsonDef)
    }

    function isDefaultTemplate(val) {
        let idx = fhem.app.config.templates.map((e) => e.name).indexOf(val)

        return idx !== -1 && fhem.app.config.templates[idx].dist ? true : false 
    }
 </script> 

<template>
    <v-list>
        <v-list-item :title="$t(preLang + 'title', item ? 1 : 2) + (item ? ' (' + item.name + ')' : '')"> 
            <template v-slot:append>
                <v-btn
                    color="info"
                    icon="mdi-help-circle"
                    variant="text"
                    @click="fhem.help(props.type === 'panels' ? 'panels' : 'vorlagen')">
                </v-btn>
            </template>
        </v-list-item>
        <v-list-item v-if="!item">
            <v-row no-gutters>
                <v-col>
                    <v-text-field
                        v-model="settings.search"
                        :label="$t(preLang + 'search')"
                        prepend-inner-icon="mdi-magnify"
                        single-line
                        clearable
                        density="compact"
                        variant="outlined">
                    </v-text-field>
                </v-col>                
                <v-col class="mx-2">
                    <v-text-field
                        v-model="settings.newItem"
                        :label="$t(preLang + 'new')"
                        single-line
                        clearable
                        density="compact"
                        variant="outlined">
                        <template v-slot:append>
                            <v-btn 
                                variant="text" 
                                icon="mdi-plus"
                                :disabled="newCheck"
                                density="compact"
                                @click="addItem()">
                            </v-btn>
                        </template>
                    </v-text-field>
                </v-col>
            </v-row>
        </v-list-item>
        <v-list-item v-if="!item">
            <v-data-table
                :headers="headers"
                :items="items"
                :items-per-page="settings.pageSize"                
                :search="settings.search"                                              
                density="compact"
                @update:itemsPerPage = "settings.pageSize = $event">
                <template v-slot:item.template="{ value }">
                    <v-chip v-if="value" @click="gotoItem(value, 'templates')" :disabled="isDefaultTemplate(value)"  variant="text">{{ value }}</v-chip>
                </template>
                
                <template v-slot:item.actions="{ item }">
                    <v-btn 
                        icon="mdi-pencil"
                        variant="plain"
                        density="compact"
                        class="mr-3"
                        @click="gotoItem(item.name)">
                    </v-btn>
                    <v-btn 
                        icon="mdi-delete"
                        variant="plain"
                        density="compact"
                        @click="deleteItem(item.idx)">
                    </v-btn>
                </template>
            </v-data-table>
        </v-list-item>
        
        <v-list-item v-if="item">
            <v-row>
                <v-col>
                    <v-row class="align-center">
                        <v-btn variant="plain" icon="mdi-arrow-up-left" @click="gotoItem()"></v-btn>

                        <v-col cols="10" md="">
                            <v-select v-if="!settings.rawMode"
                                v-model="settings.section"                                
                                :items="sections"
                                :disabled="settings.extended || props.type === 'templates' ? false : true"
                                density="compact"
                                hide-details
                                variant="outlined">
                            </v-select>
                        </v-col>

                        <v-col v-if="props.type === 'panels'" cols="6" md="auto" class="pl-5">
                            <v-switch  
                                v-model="settings.extended"
                                :label="$t('_app.settings.panels.extended')" 
                                color="blue" 
                                hide-details
                                @update:modelValue="!$event ? settings.section = 'panel' : null">
                            </v-switch>
                        </v-col>
                        <v-snackbar 
                            v-if="settings.rawMode"
                            :timeout="2000"              
                            rounded="pill">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" variant="text" icon="mdi-clipboard-multiple-outline" size="small" @click="copyBtn"></v-btn>
                            </template>
                            {{ $t('_app.messages.clipboard.text') }}
                        </v-snackbar>
                        <v-col cols="6" md="auto" class="pl-5">
                            <v-switch
                                v-model="settings.rawMode"
                                :label="$t('_app.settings.panels.rawMode')"
                                color="blue"
                                hide-details
                                @update:model-value="loadJsonDef($event)"
                                >
                            </v-switch>
                        </v-col>
                    </v-row>
                    <v-row v-if="!settings.rawMode" no-gutters>
                        <v-col>
                            <SettingsPropsList 
                                v-if="settings.section !== 'main'" 
                                :type="type" 
                                :typeIdx="settings.itemIdx" 
                                :section="settings.section"
                                :devices="settings.devices"
                                :fhemDevices = "settings.fhemDevices" 
                                :extended="settings.extended">
                            </SettingsPropsList>
                            <SettingsPropsMain
                                v-if="settings.section === 'main'"
                                :type="type" 
                                :typeIdx="settings.itemIdx"
                                :section="settings.section"
                                :devices="settings.devices">
                            </SettingsPropsMain>
                        </v-col>
                    </v-row>
                    <v-row v-if="settings.rawMode" no-gutters>
                        <v-col>
                            <v-card :variant="settings.jsonError ? 'tonal' : 'outlined'" :color="settings.jsonError ? 'error' : ''"  class="pa-1 mt-2" :height="jsonHeight">
                                <prism-editor
                                    v-model="settings.jsonDef"
                                    :highlight="highlighter"            
                                    line-numbers
                                    @input="changed">
                                </prism-editor>
                            </v-card>
                            <v-alert v-if="settings.jsonError" color="error" density="compact">{{ settings.jsonError }}</v-alert>
                        </v-col>
                    </v-row>
                </v-col>
                <v-divider :vertical="!mobile"></v-divider>
                <v-col cols="12" lg="4">
                    <v-row class="align-center pt-2">
                        <v-col>
                            <v-autocomplete 
                                v-model="settings.panel"                                
                                :items="panels"
                                :label="$t('_app.settings.panels.preview')"
                                :disabled="props.type === 'templates' ? false : true"                        
                                density="compact"
                                hide-details
                                variant="outlined">
                            </v-autocomplete>
                        </v-col>
                        <v-btn
                            class="mr-3"
                            variant="plain"                            
                            :icon="settings.preview === 'panel' ? 'mdi-code-json' : 'mdi-view-day'"
                            @click="settings.preview = settings.preview === 'panel' ? 'json' : 'panel'">
                        </v-btn>

                        <v-col v-if="settings.preview === 'panel' && fhem.app.isReady && getPreviewPanel()" cols="12" class="pt-0">
                            <PanelCard :panel="getPreviewPanel()"></PanelCard>
                        </v-col>
                        <v-col v-if="settings.preview === 'json'" cols="12">                            
                            <vue-json-pretty :data="getPreviewPanel()" :deep="1" :showLine="false"/>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-list-item>
    </v-list>    
</template>