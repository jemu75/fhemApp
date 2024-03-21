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
            { type: 'defs', show: ['panels', 'extended.panels'], required: true, prop: 'devices', def: 'key:fhem_device', help: 'element-devices', assist: 'devices' },
            { type: 'template', show: ['panels', 'extended.panels'], required: false, prop: 'template', help: 'element-template' },
            { type: 'text', show: ['templates'], required: false, prop: 'author', def: 'text' },
            { type: 'text', show: ['templates'], required: false, prop: 'date', def: 'text' },
            { type: 'defs', show: ['templates'], required: true, prop: 'devicekeys', def: 'key:description', help: 'element-devicekeys' },
            { type: 'defs', show: ['extended.panels', 'templates'], required: false, prop: 'navigation', def: 'reading:value:route', help: 'element-navigation' },
            { type: 'defs', show: ['extended.panels', 'templates'], required: false, prop: 'expandable', def: 'reading:value:expandable:expanded:maximizable', help: 'element-expandable' },
            { type: 'defs', show: ['extended.panels', 'templates'], required: false, prop: 'sortby', def: 'reading:value:sortkey', help: 'element-sortkey' },
            { type: 'defs', show: ['extended.panels', 'templates'], required: false, prop: 'show', def: 'reading:value:show', help: 'element-show' },
            { type: 'defs', show: ['extended.panels', 'templates'], required: false, prop: 'iconmap', def: 'search:icon', help: 'element-iconmap' }
        ],
        status: [
            { type: 'defs', show: ['panels', 'extended.panels', 'templates'], required: false, prop: 'bar', def: 'reading:value:level:color:min:max:reverse', help: 'element-bar' },
            { type: 'defs', show: ['panels', 'extended.panels', 'templates'], required: false, prop: 'bar2', def: 'reading:value:level:color:min:max:reverse', help: 'element-bar' },
            { type: 'defs', show: ['panels', 'extended.panels', 'templates'], required: false, prop: 'imageUrl', def: 'reading:value:url', help: 'element-imageurl' },
            { type: 'defs', show: ['panels', 'extended.panels', 'templates'], required: true, prop: 'title', def: 'reading:value:title', help: 'element-title' }
        ],
        info: [
            { type: 'defs', show: ['panels', 'extended.panels', 'templates'], required: false, prop: 'left1', def: 'reading:value:text:icon:color', help: 'element-info' },
            { type: 'defs', show: ['panels', 'extended.panels', 'templates'], required: false, prop: 'left2', def: 'reading:value:text:icon:color', help: 'element-info' },
            { type: 'defs', show: ['panels', 'extended.panels', 'templates'], required: false, prop: 'mid1', def: 'reading:value:text:icon:color', help: 'element-info' },
            { type: 'defs', show: ['panels', 'extended.panels', 'templates'], required: false, prop: 'mid2', def: 'reading:value:text:icon:color', help: 'element-info' },
            { type: 'defs', show: ['panels', 'extended.panels', 'templates'], required: false, prop: 'right1', def: 'reading:value:text:icon:color', help: 'element-info' },
            { type: 'defs', show: ['panels', 'extended.panels', 'templates'], required: false, prop: 'right2', def: 'reading:value:text:icon:color', help: 'element-info' },
        ]
    }

    const listItems = computed(() => {
        let res = [],
            page = props.type === 'panels' ? props.extended ? 'extended.panels' : 'panels' : 'templates'        

        for(const itm of listItemDefs[props.section]) if(itm.show.indexOf(page) !== -1) res.push(itm)

        return res
    })

    const templates = computed(() => {
        let res = []

        for(const template of fhem.app.config.templates) if(!template.dist) res.push({ title: template.name, value: template.name })

        res.sort((a, b) => (a.title > b.title) ? 1 : (b.title > a.title) ? -1 : 0)

        for(const dist of fhem.app.distTemplates) res.push({ title: dist + ' (' + fhem.replacer('%t(_app.default)', '') + ')', value: dist })

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
                        :propHelp="def.help"
                        :propAssist="def.assist">
                    </SettingsPropsItem>

                    <v-autocomplete v-if="def.type === 'template'"
                        v-model="fhem.app.config.panels[props.typeIdx]['template']"                                
                        :items="templates"
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