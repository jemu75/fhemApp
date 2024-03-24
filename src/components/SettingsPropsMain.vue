<script setup>
    import { ref, computed } from 'vue'
    import { useFhemStore } from '@/stores/fhem'

    import SettingsPropsMainItem from './SettingsPropsMainItem.vue'
    import SettingsPropsMainJson from './SettingsPropsMainJson.vue'
    
    const props = defineProps({
        type: String,
        typeIdx: Number,
        section: String,
        devices: Object
    })

    const subSections = [
        { name: 'level', cols: 12, color: 'orange' },    
        { name: 'left1', color: 'orange' },
        { name: 'left2', color: 'orange' },
        { name: 'mid', color: 'orange' },
        { name: 'right1', color: 'orange' },
        { name: 'right2', color: 'orange' },
    ]

    const subSectionTypes = [
        { title: 'none', value: null },
        { title: 'button', value: 'btn' },
        { title: 'info', value: 'info' },
        { title: 'slider', value: 'slider' },
        { title: 'image', value: 'image' },
        { title: 'menu', value: 'menu' },
        { title: 'chart', value: 'chart' },
        { title: 'colorpicker', value: 'colorpicker' }
    ]

    const listItemDefs = {
        level: [
            { type: 'defs', required: false, prop: 'show', def: 'reading:value:show', help: 'main-element-show', assist: 'props' },
            { type: 'defs', required: false, prop: 'divider', def: 'reading:value:divider', help: 'main-element-divider', assist: 'props' },
            { type: 'defs', required: false, prop: 'height', def: 'reading:value:height', help: 'main-element-height', assist: 'props' },
            { type: 'types', required: false, prop: 'left1', help: 'main-element-typ' },
            { type: 'types', required: false, prop: 'left2', help: 'main-element-typ' },
            { type: 'types', required: false, prop: 'mid', help: 'main-element-typ' },
            { type: 'types', required: false, prop: 'right1', help: 'main-element-typ' },
            { type: 'types', required: false, prop: 'right2', help: 'main-element-typ' }
        ],
        btn: [
            { type: 'defs', required: false, prop: 'btn', def: 'reading:value:icon:disabled:color:variant', help: 'level-element-button-btn', assist: 'props' },
            { type: 'defs', required: false, prop: 'status', def: 'reading:value:level:color:min:max:reverse', help: 'level-element-button-status', assist: 'props' },
            { type: 'defs', required: false, prop: 'click', def: 'reading:value:cmd:type', help: 'level-element-button-click', assist: 'props' },
            { type: 'defs', required: false, prop: 'longClick', def: 'reading:value:cmd:type', help: 'level-element-button-longClick', assist: 'props' },
            { type: 'defs', required: false, prop: 'longRelease', def: 'reading:value:cmd:type', help: 'level-element-button-longRelease', assist: 'props' },
            { type: 'defs', required: false, prop: 'divider', def: 'reading:value:divider', help: 'level-element-divider', assist: 'props' },
            { type: 'defs', required: false, prop: 'size', def: 'reading:value:size', help: 'level-element-size', assist: 'props' }
        ],
        slider: [
            { type: 'defs', required: false, prop: 'slider', def: 'reading:value:cmd:current:color:min:max:steps:reverse:size:vertical', help: 'level-element-slider-slider', assist: 'props' },
            { type: 'defs', required: false, prop: 'divider', def: 'reading:value:divider', help: 'level-element-divider', assist: 'props' },
            { type: 'defs', required: false, prop: 'size', def: 'reading:value:size', help: 'level-element-size', assist: 'props' }
        ],
        image: [
            { type: 'defs', required: false, prop: 'image', def: 'reading:value:source:height', help: 'level-element-image-image', assist: 'props' },
            { type: 'defs', required: false, prop: 'divider', def: 'reading:value:divider', help: 'level-element-divider', assist: 'props' },
            { type: 'defs', required: false, prop: 'size', def: 'reading:value:size', help: 'level-element-size', assist: 'props' }
        ],
        menu: [
            { type: 'defs', required: false, prop: 'btn', def: 'reading:value:icon:disabled:color:variant', help: 'level-element-menu-btn', assist: 'props' },    
            { type: 'defs', required: false, prop: 'menu', def: 'reading:value:name:cmd', help: 'level-element-menu-menu', assist: 'props' },
            { type: 'defs', required: false, prop: 'divider', def: 'reading:value:divider', help: 'level-element-divider', assist: 'props' },
            { type: 'defs', required: false, prop: 'size', def: 'reading:value:size', help: 'level-element-size', assist: 'props' }
        ],
        info: [
            { type: 'defs', required: false, prop: 'text', def: 'reading:value:text:format', help: 'level-element-info-text', assist: 'props' },
            { type: 'defs', required: false, prop: 'icon', def: 'reading:value:icon:color:size', help: 'level-element-info-icon', assist: 'props' },
            { type: 'defs', required: false, prop: 'status', def: 'reading:value:level:color:min:max:reverse:linear', help: 'level-element-info-status', assist: 'props' },
            { type: 'defs', required: false, prop: 'text2', def: 'reading:value:text:format', help: 'level-element-info-text', assist: 'props' },
            { type: 'defs', required: false, prop: 'text3', def: 'reading:value:text:format', help: 'level-element-info-text', assist: 'props' },
            { type: 'defs', required: false, prop: 'divider', def: 'reading:value:divider', help: 'level-element-divider', assist: 'props' },
            { type: 'defs', required: false, prop: 'size', def: 'reading:value:size', help: 'level-element-size', assist: 'props' }
        ],
        chart: [
            { type: 'defs', required: false, prop: 'serie', def: 'reading:value:data:name:digits:suffix:type', help: 'level-element-chart-serie', assist: 'props' },
            { type: 'json', required: false, prop: 'options', def: '', help: 'level-element-chart-options' },
            { type: 'json', required: false, prop: 'options2', def: '', help: 'level-element-chart-options' },
            { type: 'defs', required: false, prop: 'divider', def: 'reading:value:divider', help: 'level-element-divider', assist: 'props' },
            { type: 'defs', required: false, prop: 'size', def: 'reading:value:size', help: 'level-element-size', assist: 'props' }
        ],
        colorpicker: [
            { type: 'defs', required: false, prop: 'picker', def: 'reading:value:cmd:current', help: 'level-element-colorpicker-picker', assist: 'props' },
            { type: 'defs', required: false, prop: 'divider', def: 'reading:value:divider', help: 'level-element-divider', assist: 'props' },
            { type: 'defs', required: false, prop: 'size', def: 'reading:value:size', help: 'level-element-size', assist: 'props' }
        ]
    }

    const fhem = useFhemStore()

    const subSectionIdx = ref(0)

    function subSectionDisabled(segment) {
        return !fhem.getEl(fhem.app.config[props.type][props.typeIdx][props.section][lvl.value - 1], ['level', segment]) && segment !== 'level' ? true : false
    }

    const listType = computed(() => {
        let res = fhem.getEl(fhem.app.config[props.type][props.typeIdx][props.section][lvl.value - 1], ['level', subSections[subSectionIdx.value]['name']])

        return res
    })

    const listItems = computed(() => {
        if(subSectionIdx.value !== 0) {
            let type = listType.value
            if(type) return listItemDefs[type]
        }
        return listItemDefs[subSections[subSectionIdx.value].name]
    })

    const lvl = ref(1)

    const lvlCount = computed(() => {
        if(fhem.app.config[props.type][props.typeIdx][props.section]) {
            return fhem.app.config[props.type][props.typeIdx][props.section].length
        } else {
            return 1
        }
    })

    function typeChanged(newVal, subSection) {
        if(newVal) {
            fhem.app.config[props.type][props.typeIdx][props.section][lvl.value - 1][subSection] = {}
            if(newVal === 'chart') {
                fhem.app.config[props.type][props.typeIdx][props.section][lvl.value - 1][subSection].options = {}
            }
        } else {
            delete fhem.app.config[props.type][props.typeIdx][props.section][lvl.value - 1][subSection]
        }
    }

    function addLevel() {
        fhem.app.config[props.type][props.typeIdx][props.section].push({ level: {}})
        lvl.value = lvlCount.value
    }

    function deleteLevel() {
        fhem.app.config[props.type][props.typeIdx][props.section].splice(lvl.value - 1, 1)
        lvl.value = lvlCount.value
    }

    function subSectionIcon(subSection) {
        let res = {
                icon: 'mdi-alert-circle',
                color: 'error'
            }

        if(subSectionDisabled(subSection)) return { icon: '', color: '' }
        
        if(fhem.getEl(fhem.app.config[props.type][props.typeIdx][props.section][lvl.value - 1], [subSection])) {
            for(const subSectionKey of Object.keys(fhem.app.config[props.type][props.typeIdx][props.section][lvl.value - 1][subSection])) {
                if(fhem.app.config[props.type][props.typeIdx][props.section][lvl.value - 1][subSection][subSectionKey]) {
                    res.icon = 'mdi-check'
                    res.color = 'green-darken-1'
                }
            }
        }

        return res
    }

    function defIcon(def) {
        let res = {
                icon: def.required ? 'mdi-alert-circle' : 'mdi-chevron-down',
                color: def.required ? 'error' : null
            },
            path = [props.type, props.typeIdx, props.section, lvl.value - 1, subSections[subSectionIdx.value].name, def.prop],            
            el = []

            el = fhem.getEl(fhem.app.config, path)

            if(el && Object.keys(el).length > 0) res = { icon: 'mdi-check', color: 'success' }

        return res
    }
</script>

<template>
    <v-list-item>
        <v-item-group v-model="subSectionIdx" mandatory>
            <v-row class="text-center" no-gutters>
                <v-col v-for="segment of subSections" :key="segment.name" :cols="segment.cols" v-show="!subSectionDisabled(segment.name)">
                    <v-item v-slot="{ isSelected, toggle }">
                        <v-card                                                        
                            :color="isSelected ? segment.color : segment.color + '-lighten-5'"                                                                            
                            :subtitle="$t('_app.settings.props.' + segment.name)"
                            class="ma-1 pa-0"
                            variant="flat"                            
                            @click="toggle">
                            <template v-slot:prepend>
                                <v-icon></v-icon>
                            </template>
                            <template v-slot:append>
                                <v-icon :icon="subSectionIcon(segment.name).icon" :color="subSectionIcon(segment.name).color"></v-icon>
                            </template>
                        </v-card>
                    </v-item>
                </v-col>
            </v-row>
        </v-item-group>
    </v-list-item>
    <v-list-item>
        <v-expansion-panels>
            <v-expansion-panel v-for="def of listItems" :key="def.prop">
                <v-expansion-panel-title>
                    {{ listType ? listType + '-' : '' }}{{ def.prop }} 
                    <template v-slot:actions="{ expanded }">
                        <v-icon :color="expanded ? '' : defIcon(def).color" :icon="expanded ? 'mdi-chevron-up' : defIcon(def).icon">
                        </v-icon>
                    </template>
                </v-expansion-panel-title>

                <v-expansion-panel-text>
                    <v-autocomplete v-if="def.type === 'types'"
                        v-model="fhem.app.config[props.type][props.typeIdx][props.section][lvl - 1]['level'][def.prop]"                                
                        :items="subSectionTypes"
                        :label="$t('_app.settings.props.type')"
                        @update:modelValue="typeChanged($event, def.prop)"
                        density="compact"
                        variant="outlined"
                        class="pt-3">
                    </v-autocomplete>

                    <SettingsPropsMainJson v-if="def.type === 'json'"
                        :type="props.type"  
                        :typeIdx="props.typeIdx"
                        :section="props.section"
                        :mainIdx="lvl - 1"
                        :mainSection="subSections[subSectionIdx].name"
                        :prop="def.prop" 
                        :propDef="def.def"
                        :propHelp="def.help">
                    </SettingsPropsMainJson>

                    <SettingsPropsMainItem v-if="def.type === 'defs'"
                        :type="props.type" 
                        :typeIdx="props.typeIdx"
                        :section="props.section"
                        :mainIdx="lvl - 1"
                        :mainSection="subSections[subSectionIdx].name"
                        :prop="def.prop" 
                        :propDef="def.def"
                        :propHelp="def.help"
                        :propAssist="def.assist"
                        :propAssistDevices="props.devices">
                    </SettingsPropsMainItem>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-list-item>
    <v-list-item>
        <v-row no-gutters>
            <v-col>
                <v-pagination v-model="lvl" :length="lvlCount" total-visible="5" rounded="circle"></v-pagination>
            </v-col>
            <v-col cols="2" class="text-right">
                <v-btn 
                    variant="text" 
                    icon="mdi-plus" 
                    @click="addLevel()">
                </v-btn>
                <v-btn 
                    variant="text" 
                    icon="mdi-delete" 
                    :disabled="lvlCount < 2" 
                    @click="deleteLevel()">
                </v-btn>
            </v-col>
        </v-row>
    </v-list-item>
</template>