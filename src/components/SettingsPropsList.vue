<script setup>
    import { computed } from 'vue'
    import { useFhemStore } from '@/stores/fhem'
    import SettingsPropsItem from './SettingsPropsItem.vue'
   
    const props = defineProps({
        type: String,
        typeIdx: Number,
        section: String,
        extended: Boolean
    })

    const fhem = useFhemStore()

    const listItemDefs = {
        panel: [
            { type: 'defs', show: ['panels', 'extended.panels'], required: true, prop: 'devices', def: 'key:fhem_device', help: 'element-devices' },
            { type: 'template', show: ['panels', 'extended.panels'], required: false, prop: 'template', help: 'element-template' },
            { type: 'text', show: ['templates'], required: false, prop: 'author', def: 'text' },
            { type: 'text', show: ['templates'], required: false, prop: 'date', def: 'text' },
            { type: 'defs', show: ['extended.panels', 'templates'], required: false, prop: 'navigation', def: 'reading:filter:route', help: 'element-navigation' },
            { type: 'defs', show: ['extended.panels', 'templates'], required: false, prop: 'expandable', def: 'reading:filter:boolean:boolean', help: 'element-expandable' },
            { type: 'defs', show: ['extended.panels', 'templates'], required: false, prop: 'size', def: 'reading:filter:size', help: 'element-size' },
            { type: 'defs', show: ['extended.panels', 'templates'], required: false, prop: 'sortby', def: 'reading:filter:sortkey', help: 'element-sortkey' },
            { type: 'defs', show: ['extended.panels', 'templates'], required: false, prop: 'show', def: 'reading:filter:boolean', help: 'element-show' },
            { type: 'defs', show: ['extended.panels', 'templates'], required: false, prop: 'iconmap', def: 'search:icon', help: 'element-iconmap' }
        ],
        status: [
            { type: 'defs', show: ['panels', 'extended.panels', 'templates'], required: false, prop: 'bar', def: 'reading:filter:level:color:min:max:reverse', help: 'element-bar' },
            { type: 'defs', show: ['panels', 'extended.panels', 'templates'], required: false, prop: 'bar2', def: 'reading:filter:level:color:min:max:reverse', help: 'element-bar' },
            { type: 'defs', show: ['panels', 'extended.panels', 'templates'], required: false, prop: 'imageUrl', def: 'reading:filter:url', help: 'element-imageurl' },
            { type: 'defs', show: ['panels', 'extended.panels', 'templates'], required: true, prop: 'title', def: 'reading:filter:title', help: 'element-title' }
        ],
        info: [
            { type: 'defs', show: ['panels', 'extended.panels', 'templates'], required: false, prop: 'left1', def: 'reading:filter:text:icon:color', help: 'element-info' },
            { type: 'defs', show: ['panels', 'extended.panels', 'templates'], required: false, prop: 'left2', def: 'reading:filter:text:icon:color', help: 'element-info' },
            { type: 'defs', show: ['panels', 'extended.panels', 'templates'], required: false, prop: 'mid1', def: 'reading:filter:text:icon:color', help: 'element-info' },
            { type: 'defs', show: ['panels', 'extended.panels', 'templates'], required: false, prop: 'mid2', def: 'reading:filter:text:icon:color', help: 'element-info' },
            { type: 'defs', show: ['panels', 'extended.panels', 'templates'], required: false, prop: 'right1', def: 'reading:filter:text:icon:color', help: 'element-info' },
            { type: 'defs', show: ['panels', 'extended.panels', 'templates'], required: false, prop: 'right2', def: 'reading:filter:text:icon:color', help: 'element-info' },
        ]
    }

    const listItems = computed(() => {
        let res = [],
            page = props.type === 'panels' ? props.extended ? 'extended.panels' : 'panels' : 'templates'        

        for(const itm of listItemDefs[props.section]) if(itm.show.indexOf(page) !== -1) res.push(itm)

        return res
    })

    function panelIcon(def) {
        let res = {
                icon: def.required ? 'mdi-alert-circle' : 'mdi-chevron-down',
                color: def.required ? 'error' : null
            },
            path = [props.type, props.typeIdx],            
            el = []

            if(props.section === 'panel' && ['template','date','author'].indexOf(def.prop) !== -1) {
                path.push(def.prop)
            } else {
                path.push(...[props.section, def.prop])
            }

            el = fhem.getEl(fhem.app.config, path)

            if(el && el.length > 0) res = { icon: 'mdi-check', color: 'success' }

        return res
    }
</script>

<template>
    <v-list-item :title="$t('_app.settings.title') + ' ' + $t('_app.settings.props.' + section) + ' (' + $t('_app.settings.' + type + '.' + 'title') + ': ' + fhem.app.config[type][typeIdx].name + ')'">
        <template v-slot:append>
            <v-btn
                color="info"
                icon="mdi-help-circle"
                variant="text"
                @click="fhem.help(section === 'panel' ? 'panel-allgemein' : section === 'status' ? 'bereich-status' : 'bereich-info')">
            </v-btn>
        </template>
    </v-list-item>
    <v-list-item>
        <v-expansion-panels>
            <v-expansion-panel v-for="def of listItems" :key="def.prop">
                <v-expansion-panel-title>
                    {{ def.prop }}
                    <template v-slot:actions="{ expanded }">
                        <v-icon :color="expanded ? '' : panelIcon(def).color" :icon="expanded ? 'mdi-chevron-up' : panelIcon(def).icon">
                        </v-icon>
                    </template>
                </v-expansion-panel-title>

                <v-expansion-panel-text>
                    <SettingsPropsItem v-if="def.type === 'defs'"
                        :type="props.type" 
                        :typeIdx="props.typeIdx"
                        :section="props.section"
                        :prop="def.prop" 
                        :propDef="def.def"
                        :propHelp="def.help">
                    </SettingsPropsItem>

                    <v-autocomplete v-if="def.type === 'template'"
                        v-model="fhem.app.config.panels[props.typeIdx]['template']"                                
                        :items="fhem.app.config.templates.map((e) => e.name)"
                        :label="$t('_app.settings.templates.title')"
                        :disabled="fhem.app.config.templates.length === 0"
                        density="compact"
                        variant="outlined"
                        class="pt-3">
                    </v-autocomplete>
                    
                    <v-text-field v-if="def.type === 'text'"
                        v-model="fhem.app.config[props.type][props.typeIdx][def.prop]"
                        density="compact" 
                        variant="outlined" 
                        persistent-placeholder
                        :placeholder="def.def"
                        :label="def.prop"
                        class="pt-3">
                    </v-text-field>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-list-item>
</template>