<script setup>
    import { ref, computed } from 'vue'
    import { useFhemStore } from '@/stores/fhem'
    import draggable from 'vuedraggable'

    const props = defineProps({
        type: String,
        typeIdx: Number,
        section: String,
        prop: String,
        propDef: String,
        propHelp: String,
        propAssist: String
    })

    //type = panels|templates
    //typeIdx = element im panels bzw. templates array
    //section = null|status|info|main
    //prop = element welches Array mit Definitionen enthält
    //propDef = Struktur der Definition (reading:filter:...)
    //propHelp = Anker in Helpfile (README.md)

    const fhem = useFhemStore()

    const form = ref()

    const newDef = ref()

    const assist = ref({
        devices: {
            show: false,
            keys: [],
            fhemDevices: [],
            key: null,
            device: null,
            idx: -1
        }
    })

    const disable = computed(() => {
        let res = fhem.app.config[props.type][props.typeIdx][props.section][props.prop]
        return res && res.length > 1 ? false : true
    })

    const checkDefs = computed(() => {
        let res = false,
            defs = fhem.app.config[props.type][props.typeIdx][props.section][props.prop]

        if(['navigation'].indexOf(props.prop) !== -1) return res

        if(defs && defs.length > 1) {
            for(const [idx, def] of Object.entries(defs)) if(!def.split(':')[1] && Number(idx) + 1 < defs.length) return res = true
        }

        return res
    })

    function addDef() { 
        if(!fhem.app.config[props.type][props.typeIdx][props.section][props.prop]) {
            fhem.app.config[props.type][props.typeIdx][props.section][props.prop] = [newDef.value]
        } else {
            fhem.app.config[props.type][props.typeIdx][props.section][props.prop].push(newDef.value)
        }
        
        form.value.reset()
    }

    function deleteDef(idx) {
        fhem.app.config[props.type][props.typeIdx][props.section][props.prop].splice(idx, 1)

        if(fhem.app.config[props.type][props.typeIdx][props.section][props.prop].length === 0) {
            delete fhem.app.config[props.type][props.typeIdx][props.section][props.prop]
        }
    }

    function getDevicesKeys() {
        let template,
            templateIdx,
            res = []

        template = fhem.app.config[props.type][props.typeIdx].template

        if(template) {
            templateIdx = fhem.app.config.templates.map((e) => e.name).indexOf(template) 

            if(templateIdx !== -1) {
                res
                for(const key of fhem.app.config.templates[templateIdx].panel.devicekeys || []) {
                    res.push(key.split(':')[0])
                }
            }
        }

        return res
    }

    async function getFhemDevices() {
        let res = await fhem.request('json', 'jsonlist2 .* Name alias'),
            alias,
            list = []

        if(res && res.Results.length > 0) {
            for(const dev of res.Results) {
                alias = dev.Attributes.alias ? ' (' + dev.Attributes.alias + ')' : ''
                list.push({ title: dev.Name + alias, value: dev.Name})
            }
        }

        return list
    }

    async function openAssist(idx) {
        let def

        if(props.propAssist === 'devices') {
            assist.value.devices.keys = getDevicesKeys()
            assist.value.devices.fhemDevices = await getFhemDevices()

            if(idx !== -1) {
                def = fhem.app.config[props.type][props.typeIdx][props.section][props.prop][idx]
                assist.value.devices.key = def.split(':')[0],
                assist.value.devices.device = def.split(':')[1]
            } else {
                assist.value.devices.key = null,
                assist.value.devices.device = null
            }

            assist.value.devices.idx = idx
            assist.value.devices.show = true
        }
    }

    function confirmAssist() {
        if(assist.value.devices.idx !== -1) {
            fhem.app.config[props.type][props.typeIdx][props.section][props.prop][assist.value.devices.idx] = assist.value.devices.key + ':' + assist.value.devices.device
        } else {
            newDef.value = assist.value.devices.key + ':' + assist.value.devices.device
            addDef()
        }
        assist.value.devices.show = false
    }
</script>

<template>
    <v-alert v-if="checkDefs" type="warning" density="compact" class="my-3">{{ $t('_app.messages.checkDefs.text') }}</v-alert>

    <draggable 
        v-model="fhem.app.config[props.type][props.typeIdx][props.section][props.prop]"            
        animation="300"
        :disabled="disable"
        handle=".dd_zone"
        item-key="id">
        <template #item={index}>
            <v-row no-gutters class="py-3 align-center">
                <v-icon icon="mdi-drag-vertical" class="dd_zone pr-5" :disabled="disable"></v-icon>
                <v-col>
                    <v-text-field 
                        v-model="fhem.app.config[props.type][props.typeIdx][props.section][props.prop][index]"
                        density="compact" 
                        variant="outlined" 
                        persistent-placeholder
                        hide-details
                        :placeholder="props.propDef"
                        :label="'Definition ' + (index + 1)"
                        :prepend-inner-icon="props.propAssist ? 'mdi-auto-fix' : ''"
                        @click:prepend-inner="openAssist(index)">
                    </v-text-field>
                </v-col>
                <v-btn variant="plain" density="compact" icon="mdi-delete" @click="deleteDef(index)" class="pl-5"></v-btn>                
            </v-row>
        </template>
    </draggable>

    <v-form ref="form">
        <v-row no-gutters class="pt-3 ml-6 align-center">
            <v-col>
                <v-text-field
                    v-model="newDef"    
                    density="compact" 
                    variant="outlined" 
                    persistent-placeholder
                    hide-details
                    :placeholder="props.propDef"
                    label="new Definition"
                    :prepend-inner-icon="props.propAssist ? 'mdi-auto-fix' : ''"
                    :append-inner-icon="props.propHelp ? 'mdi-help-circle' : ''"
                    clearable
                    @click:prepend-inner="openAssist(-1)"
                    @click:append-inner="fhem.help(propHelp)">
                </v-text-field>                        
            </v-col>
            <v-btn variant="plain" icon="mdi-plus" :disabled="!newDef" @click="addDef()" class="mr-5"></v-btn>
        </v-row>
    </v-form>

    <v-dialog v-model="assist.devices.show" max-width="650px">
        <v-card>
            <v-sheet color="primary">
                <v-card-title>{{ $t('_app.settings.assist.title') }}</v-card-title>
            </v-sheet>

            <v-card-text>
                <v-row class="align-center">
                    <v-col cols="12" md="4">
                        <v-select
                            v-model="assist.devices.key"
                            :items="assist.devices.keys"
                            :label="props.propDef.split(':')[0]"
                            hide-details
                            density="compact"
                            variant="outlined">

                        </v-select>
                    </v-col>
                    <v-col cols="12" md="8">
                        <v-autocomplete
                            v-model="assist.devices.device"
                            :items="assist.devices.fhemDevices"
                            :label="props.propDef.split(':')[1]"
                            hide-details
                            clearable
                            density="compact"
                            variant="outlined">

                        </v-autocomplete>
                    </v-col>
                </v-row>
            </v-card-text>
                       
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="confirmAssist()" :disabled="!assist.devices.key || !assist.devices.device">{{ $t('_app.settings.assist.ok') }}</v-btn>
                <v-btn @click="assist.devices.show = false">{{ $t('_app.settings.assist.cancel') }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>