<script setup>
    import { ref, computed } from 'vue'
    import { useFhemStore } from '@/stores/fhem'
    import SettingsPropsMainItem from './SettingsPropsMainItem.vue'
    
    const props = defineProps({
        type: String,
        typeIdx: Number,
        section: String
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
        { title: 'status', value: 'status' },
        { title: 'slider', value: 'slider' },
        { title: 'image', value: 'image' },
        { title: 'menu', value: 'menu' }
    ]

    const listItemDefs = {
        level: [
            { type: 'defs', required: false, prop: 'show', def: 'reading:filter:boolean' },
            { type: 'defs', required: false, prop: 'divider', def: 'reading:filter:boolean' },
            { type: 'types', required: false, prop: 'left1' },
            { type: 'types', required: false, prop: 'left2' },
            { type: 'types', required: false, prop: 'mid' },
            { type: 'types', required: false, prop: 'right1' },
            { type: 'types', required: false, prop: 'right2' }
        ],
        btn: [
            { type: 'defs', required: false, prop: 'btn', def: 'reading:filter:icon:disabled:color:variant' },
            { type: 'defs', required: false, prop: 'status', def: 'reading:filter:level:color:reverse:min:max' },
            { type: 'defs', required: false, prop: 'click', def: 'reading:filter:cmd:type' },
            { type: 'defs', required: false, prop: 'longClick', def: 'reading:filter:cmd:type' },
            { type: 'defs', required: false, prop: 'longRelease', def: 'reading:filter:cmd:type' },
            { type: 'defs', required: false, prop: 'divider', def: 'reading:filter:boolean' },
            { type: 'defs', required: false, prop: 'size', def: 'reading:filter:size' }
        ],
        status: [
            { type: 'defs', required: false, prop: 'status', def: 'reading:filter:level:color:reverse:min:max' },
            { type: 'defs', required: false, prop: 'divider', def: 'reading:filter:boolean' },
            { type: 'defs', required: false, prop: 'size', def: 'reading:filter:size' }
        ],
        slider: [
            { type: 'defs', required: false, prop: 'slider', def: 'reading:filter:cmd:current:color:min:max:steps' },
            { type: 'defs', required: false, prop: 'divider', def: 'reading:filter:boolean' },
            { type: 'defs', required: false, prop: 'size', def: 'reading:filter:size' }
        ],
        image: [
            { type: 'defs', required: false, prop: 'image', def: 'reading:filter:source' },
            { type: 'defs', required: false, prop: 'divider', def: 'reading:filter:boolean' },
            { type: 'defs', required: false, prop: 'size', def: 'reading:filter:size' }
        ],
        menu: [
            { type: 'defs', required: false, prop: 'menu', def: 'reading:filter:name:cmd' },
            { type: 'defs', required: false, prop: 'divider', def: 'reading:filter:boolean' },
            { type: 'defs', required: false, prop: 'size', def: 'reading:filter:size' }
        ],
        info: [
            { type: 'defs', required: false, prop: 'text', def: 'reading:filter:text:format' },
            { type: 'defs', required: false, prop: 'text2', def: 'reading:filter:text:format' },
            { type: 'defs', required: false, prop: 'text3', def: 'reading:filter:text:format' },
            { type: 'defs', required: false, prop: 'icon', def: 'reading:filter:icon:color:size' },
            { type: 'defs', required: false, prop: 'divider', def: 'reading:filter:boolean' },
            { type: 'defs', required: false, prop: 'size', def: 'reading:filter:size' }
        ]
    }

    const fhem = useFhemStore()

    const subSectionIdx = ref(0)

    function subSectionDisabled(segment) {
        return !fhem.app.config[props.type][props.typeIdx][props.section][lvl.value - 1]['level'][segment] && segment !== 'level' ? true : false
    }

    const listItems = computed(() => {
        if(subSectionIdx.value !== 0) {
            let type = fhem.app.config[props.type][props.typeIdx][props.section][lvl.value - 1]['level'][subSections[subSectionIdx.value]['name']]
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
        
        if(fhem.app.config[props.type][props.typeIdx][props.section][lvl.value - 1][subSection]) {
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

            if(el && el.length > 0) res = { icon: 'mdi-check', color: 'success' }

        return res
    }

    function openHelp(anchor) {
        window.open(fhem.app.repository + '#' + anchor, '_blank')
    }
</script>

<template>
    <v-list-item :title="$t('_app.settings.title') + ' ' + $t('_app.settings.props.main') + ' (' + $t('_app.settings.' + props.type + '.' + 'title') + ': ' + fhem.app.config[props.type][props.typeIdx].name + ')'">
        <template v-slot:append>
            <v-btn
                color="info"
                icon="mdi-help-circle"
                variant="text"
                @click="openHelp('props_list')">
            </v-btn>
        </template>
    </v-list-item>
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
                    {{ def.prop }}
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
 
                    <SettingsPropsMainItem v-if="def.type === 'defs'"
                        :type="props.type" 
                        :typeIdx="props.typeIdx"
                        :section="props.section"
                        :mainIdx="lvl - 1"
                        :mainSection="subSections[subSectionIdx].name"
                        :prop="def.prop" 
                        :propDef="def.def"
                        :propHelp="def.help">
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