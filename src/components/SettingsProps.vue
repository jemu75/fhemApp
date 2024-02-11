<script setup>
    import { computed, ref } from 'vue'
    import { useFhemStore } from '@/stores/fhem'
    import { useI18n } from 'vue-i18n'
    import { useDisplay } from 'vuetify'

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
            { key: 'actions', title: '', sortable: false, align: 'end' }
        ]

        if(!mobile.value) {
            if(props.type === 'panels') {
                res = [
                    { key: 'name', title: i18n.t(preLang + 'title'), sortable: true, align: 'start' },
                    { key: 'devices', title: 'Devices', sortable: true, align: 'start' },
                    { key: 'advanced', title: i18n.t(preLang + 'extended'), sortable: true },
                    { key: 'actions', title: '', sortable: false, align: 'end' }
                ]
            } else {
                res = [
                    { key: 'name', title: i18n.t(preLang + 'title'), sortable: true, align: 'start' },
                    { key: 'panels', title: i18n.t('_app.settings.panels.title', 2), sortable: true, align: 'end' },
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
                    if(Object.keys(el.status).length > 0) advanced.push('status')
                    if(el.main.length > 1 || Object.keys(el.main[0].level).length > 0) advanced.push('main')
                    if(Object.keys(el.info).length > 0) advanced.push('info')

                    if(el.panel.devices) devices = el.panel.devices.join(', ')
                } else {
                    panelCount = fhem.app.config.panels.map((e) => e.template).filter(e => e === el.name).length
                }

                res.push({ 
                    idx: parseFloat(idx), 
                    name: el.name, 
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
        extended: props.type === 'panels' ? false : true,
        rawMode: false,
        section: 'panel',
        panel: null,
        preview: 'panel',
        jsonDef: null,
        jsonError: null
    })

    function updatePanel(panel) {
        settings.value.panel = panel
    }

    function getPreviewPanel() {
        let idx = fhem.app.panelList.map((e) => e.name).indexOf(props.type === 'templates' ? settings.value.panel : item.value.name)

        return idx !== -1 ? fhem.app.panelList[idx] : null
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
        settings.value.newItem = ''
        
        editItem(fhem.app.config[props.type].length - 1)
    }

    function editItem(idx) {
        item.value = fhem.app.config[props.type][idx]
        settings.value.itemIdx = idx

        settings.value.extended = items.value[items.value.map((e) => e.idx).indexOf(idx)].advanced !== '-' ? true : false

        if(typeof item.value === 'object') {
            settings.value.jsonDef = JSON.stringify(item.value, null, '\t')
            settings.value.jsonError = null
        }
    }

    function deleteItem(idx) {
        fhem.app.config[props.type].splice(idx, 1)
    }

    function highlighter(code) {
        return highlight(code, languages.js)
    }

    function changed() {
        let res = fhem.stringToJson(settings.value.jsonDef, true)

        settings.value.jsonError = res.error

        if(!settings.value.jsonError) fhem.app.config[props.type][settings.value.itemIdx] = res.result
    }

    function copyBtn() {
        toClipboard(settings.value.jsonDef)
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
                :search="settings.search"                                              
                density="compact">
                <template v-slot:item.actions="{ item }">
                    <v-btn 
                        icon="mdi-pencil"
                        variant="plain"
                        density="compact"
                        class="mr-3"
                        @click="editItem(item.idx)">
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
                        <v-btn variant="plain" icon="mdi-arrow-up-left" @click="item = null"></v-btn>

                        <v-col cols="10" md="">
                            <v-autocomplete v-if="!settings.rawMode"
                                v-model="settings.section"                                
                                :items="sections"
                                :disabled="settings.extended || props.type === 'templates' ? false : true"
                                density="compact"
                                hide-details
                                variant="outlined">
                            </v-autocomplete>
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
                                :extended="settings.extended">
                            </SettingsPropsList>
                            <SettingsPropsMain
                                v-if="settings.section === 'main'"
                                :type="type" 
                                :typeIdx="settings.itemIdx"
                                :section="settings.section" >
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