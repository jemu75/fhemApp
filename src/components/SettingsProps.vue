<script setup>
    import { ref, computed } from 'vue'
    import { useFhemStore } from '@/stores/fhem'
    import { useDisplay } from 'vuetify'

    import VueJsonPretty from 'vue-json-pretty'
    import 'vue-json-pretty/lib/styles.css'

    import SettingsPropsList from './SettingsPropsList.vue'
    import SettingsPropsMain from './SettingsPropsMain.vue'
    import PanelCard from '../components/PanelCard.vue'

    const props = defineProps({
        type: String
    })

    const fhem = useFhemStore()

    const { mobile } = useDisplay()

    const preLang = '_app.settings.' + props.type + '.'

    const selector = [
        { section: 'panel', color: 'grey' },
        { section: 'status', color: 'green' },
        { section: 'main', height: 80, color: 'orange' },
        { section: 'info', color: 'blue' },
    ]

    const selectorPart = ref(0)

    const items = computed(() => {
        let res = []

        for(const e of fhem.app.config[props.type]) if(!e.dist) res.push(e.name)

        res.sort((a,b) => (a > b) ? 1 : (b > a) ? -1 : 0)

        return res
    })
        
    const item = ref(items.value[0])

    const itemIdx = computed(() => {
        return fhem.app.config[props.type].map((e) => e.name).indexOf(item.value)
    })

    const lastItem = ref(null)

    const panel = ref(null)

    function updatePanel(item) {
        panel.value = item
    }

    const panels = computed(() => {
        let res = []

        for(const panel of fhem.app.config.panels) if(panel.template === item.value) res.push(panel.name)

        res.sort((a,b) => (a > b) ? 1 : (b > a) ? -1 : 0)

        updatePanel(res[0])

        return res
    })

    const showNew = ref(true)

    const preview = ref('panel')

    const extendedSettings = ref(props.type === 'panels' ? false : true )

    const isFormValid = ref(false)

    const rules = {
        required: value => !!value || fhem.replacer('%t(_app.settings.rules.required)'),
        uniqe: value => items.value.indexOf(value) === -1 || fhem.replacer('%t(_app.settings.rules.panelUniqe)')
    }

    function getPreviewPanel() {
        let idx = fhem.app.panelList.map((e) => e.name).indexOf(props.type === 'templates' ? panel.value : item.value)

        return idx !== -1 ? fhem.app.panelList[idx] : null
    }

    function deleteItem() {
        fhem.app.config[props.type].splice(itemIdx.value, 1)

        item.value = fhem.app.config[props.type].length > 0 ? fhem.app.config[props.type][0].name : ''
        extendedSettings.value = props.type === 'panels' ? false : true
        selectorPart.value = 0
    }

    function addItem() {
        let newPanel = {
                name: item.value,                
                template: null,
                panel: {},
                status: {},
                main: [{ level: {} }],
                info: {}
            },
            newTemplate = {
                name: item.value,
                author: null,
                date: null,
                panel: {},
                status: {},
                main: [{ level: {} }],
                info: {}
            }

        fhem.app.config[props.type].push(props.type === 'panels' ? newPanel : newTemplate)
    }
</script>

<template>
    <v-list>
        <v-row no-gutters>
            <v-col v-if="itemIdx === -1">
                <v-list-item :title="$t(preLang + 'title')"> 
                    <template v-slot:append>
                        <v-btn
                            color="info"
                            icon="mdi-help-circle"
                            variant="text"
                            @click="fhem.help(props.type === 'panels' ? 'panels' : 'vorlagen')">
                        </v-btn>
                    </template>
                </v-list-item>
            </v-col>
            <v-col v-if="itemIdx !== -1">                
                <SettingsPropsList 
                    v-if="selector[selectorPart].section !== 'main'" 
                    :type="type" 
                    :typeIdx="itemIdx" 
                    :section="selector[selectorPart].section" 
                    :extended="extendedSettings">
                </SettingsPropsList>
                <SettingsPropsMain
                    v-if="selector[selectorPart].section === 'main'"
                    :type="type" 
                    :typeIdx="itemIdx"
                    :section="selector[selectorPart].section" >
                </SettingsPropsMain>
            </v-col>
            <v-divider :vertical="!mobile"></v-divider>
            <v-col cols="12" lg="4">
                <v-list-item v-if="props.type === 'panels'" class="pa-0">
                    <v-switch 
                        v-model="extendedSettings"
                        :label="$t('_app.settings.panels.extendedSettings')" 
                        color="blue" 
                        hide-details
                        @update:modelValue="!$event ? selectorPart = 0 : null"
                        class="ml-4">
                    </v-switch>
                </v-list-item>
                <v-list-item>
                    <v-row v-if="showNew" no-gutters class="pt-1">
                        <v-col cols="8" class="pt-1">
                            <v-autocomplete
                                v-model="item"                                
                                :items="items"
                                :label="$t(preLang + 'title')"
                                :disabled="items.length === 0"
                                density="compact"
                                variant="outlined">
                            </v-autocomplete>
                        </v-col>
                        <v-col class="text-right">
                            <v-btn 
                                variant="text" 
                                icon="mdi-plus" 
                                @click="showNew = !showNew; lastItem = item; item = null">
                            </v-btn>
                            <v-btn 
                                variant="text" 
                                icon="mdi-delete" 
                                :disabled="itemIdx === -1" 
                                @click="deleteItem()">
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-form v-model="isFormValid">
                        <v-row v-if="!showNew" no-gutters class="pt-1">
                            <v-col cols="8" class="pt-1">
                                <v-text-field
                                    v-model="item"
                                    :label="$t(preLang + 'title')"
                                    :rules="[rules.required, rules.uniqe]"
                                    density="compact"
                                    variant="outlined">
                                </v-text-field>
                            </v-col>
                            <v-col class="text-right">
                                <v-btn 
                                    variant="text" 
                                    icon="mdi-check"
                                    :disabled="!isFormValid" 
                                    @click="addItem(); showNew = !showNew">
                                </v-btn>
                                <v-btn 
                                    variant="text" 
                                    icon="mdi-cancel" 
                                    @click="showNew = !showNew; item = lastItem">
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                    <v-item-group v-if="extendedSettings" v-model="selectorPart" mandatory>
                        <v-row class="text-center pb-3" no-gutters>
                            <v-col v-for="part of selector" :key="part.section" cols="12">
                                <v-item v-slot="{ isSelected, toggle }">
                                    <v-card
                                        :subtitle="$t('_app.settings.props.' + part.section)"                                                                                   
                                        :color="isSelected ? part.color : part.color + '-lighten-5'"
                                        variant="flat"                                                
                                        class="ma-1 pa-0"
                                        :height="part.height"                                                
                                        @click="toggle">                                                
                                    </v-card>
                                </v-item>
                            </v-col>
                        </v-row>
                    </v-item-group>
                    <v-divider class="pb-3"></v-divider>
                    <v-row v-if="props.type === 'templates'" no-gutters>
                        <v-col cols="8" class="pt-1">
                            <v-autocomplete
                                v-model="panel"                                
                                :items="panels"
                                :label="$t('_app.settings.panels.preview')"
                                :disabled="items.length === 0"
                                density="compact"
                                variant="outlined">
                            </v-autocomplete>
                        </v-col>
                        <v-col class="text-right">
                            <v-btn
                                variant="text"
                                :icon="preview === 'panel' ? 'mdi-code-json' : 'mdi-view-day'"
                                @click="preview = preview === 'panel' ? 'json' : 'panel'">
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row v-if="fhem.app.isReady && getPreviewPanel()" no-gutters>
                        <v-col v-if="preview === 'panel'">
                            <PanelCard :panel="getPreviewPanel()"></PanelCard>
                        </v-col>
                        <v-col v-if="preview === 'json'">                            
                            <vue-json-pretty :data="getPreviewPanel()" :deep="1" :showLine="false"/>
                        </v-col>
                    </v-row>
                </v-list-item>
            </v-col>
        </v-row>
    </v-list>
</template>