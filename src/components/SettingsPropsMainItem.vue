<script setup>
    import { ref, computed } from 'vue'
    import { useFhemStore } from '@/stores/fhem'
    import draggable from 'vuedraggable'
   
    const props = defineProps({
        type: String,
        typeIdx: Number,
        section: String,
        mainIdx: Number,
        mainSection: String,
        prop: String,
        propDef: String,
        propHelp: String,
        propAssist: String,
        propAssistDevices: Object
    })

    //type = panels|templates
    //typeIdx = element im panels bzw. templates array
    //section = main
    //mainIdx = level in main
    //mainSection = panel|left1|left2|mid|right1|right2
    //prop = element welches Array mit Definitionen enthält
    //propDef = Struktur der Definition (reading:filter:...)
    //propHelp = Anker in Helpfile (README.md)

    const fhem = useFhemStore()

    const form = ref()

    const newDef = ref()

    const assist = ref({
        props: {
            devices: [],
            device: null,
            reading: null,
            timestamp: false,
            val: null,
            props: [],
            defs: [],
            show: false,
            idx: -1
        }
    })


    const disable = computed(() => {
        let res = fhem.app.config[props.type][props.typeIdx][props.section][props.mainIdx][props.mainSection][props.prop]
        return res && res.length > 1 ? false : true
    })

    const checkDefs = computed(() => {
        let res = false,
            defs = fhem.getEl(fhem.app.config[props.type][props.typeIdx][props.section], [props.mainIdx, props.mainSection, props.prop])

        if(['menu', 'serie'].indexOf(props.prop) !== -1) return res

        if(defs && defs.length > 1) {
            for(const [idx, def] of Object.entries(defs)) if(!def.split(':')[1] && Number(idx) + 1 < defs.length) return res = true
        }

        return res
    })

    const readings = computed(() => {
        let res = []

        if(assist.value.props.device) res.push(...props.propAssistDevices[assist.value.props.device])

        return res
    })

    function addDef() { 
        if(!fhem.app.config[props.type][props.typeIdx][props.section][props.mainIdx][props.mainSection][props.prop]) {
            fhem.app.config[props.type][props.typeIdx][props.section][props.mainIdx][props.mainSection][props.prop] = [newDef.value]
        } else {
            fhem.app.config[props.type][props.typeIdx][props.section][props.mainIdx][props.mainSection][props.prop].push(newDef.value)
        }
        
        newDef.value = null
        form.value.reset()
    }

    function deleteDef(idx) {
        fhem.app.config[props.type][props.typeIdx][props.section][props.mainIdx][props.mainSection][props.prop].splice(idx, 1)

        if(fhem.app.config[props.type][props.typeIdx][props.section][props.mainIdx][props.mainSection][props.prop].length === 0) {
            delete fhem.app.config[props.type][props.typeIdx][props.section][props.mainIdx][props.mainSection][props.prop]
        }
    }

    async function openAssist(idx) {
        let def,
            defParts,
            deviceIdx

        if(props.propAssist === 'props') {
            assist.value.props.devices = Object.keys(props.propAssistDevices)
            assist.value.props.device = null
            assist.value.props.reading = null
            assist.value.props.timestamp = false
            assist.value.props.val = null
            assist.value.props.defs = props.propDef.split(':').slice(2)
            assist.value.props.props = []

            if(idx !== -1) {
                def = fhem.app.config[props.type][props.typeIdx][props.section][props.mainIdx][props.mainSection][props.prop][idx]
                defParts = def.split(/(?<!\\):/)

                if(defParts.length > 2) {
                    if(defParts[0]) {
                        deviceIdx = assist.value.props.devices.indexOf(defParts[0].split('-')[0])
                        assist.value.props.device = deviceIdx !== -1 ? defParts[0].split('-')[0] : assist.value.props.devices[0]
                        if(assist.value.props.device) defParts[0] = defParts[0].replace(assist.value.props.device + '-', '')
                        if(/-ts$/.test(defParts[0])) assist.value.props.timestamp = true
                        if(assist.value.props.timestamp) defParts[0] = defParts[0].replace(/-ts$/, '')
                        assist.value.props.reading = /(^i-)|(^a-)/.test(defParts[0]) ? defParts[0] : 'r-' + defParts[0]
                    }
                    assist.value.props.val = defParts[1]
                    defParts.splice(0, 2)
                    assist.value.props.props.push(...defParts)
                }
            }

            assist.value.props.idx = idx
            assist.value.props.show = true
        }
    }

    function confirmAssist() {
        if(props.propAssist === 'props') {
            if(assist.value.props.props.length === 0) assist.value.props.props.push('') 
            assist.value.props.props.unshift(assist.value.props.val)
            if(/^r-/.test(assist.value.props.reading) && assist.value.props.timestamp) assist.value.props.reading += '-ts'

            assist.value.props.props.unshift(
                (assist.value.props.device ? assist.value.props.device + '-' : '') + 
                (assist.value.props.reading ? assist.value.props.reading.replace(/^r-/, '')  : '')
            )

            if(assist.value.props.idx !== -1) {
                fhem.app.config[props.type][props.typeIdx][props.section][props.mainIdx][props.mainSection][props.prop][assist.value.props.idx] = assist.value.props.props.join(':')
            } else {
                newDef.value = assist.value.props.props.join(':')
                addDef()
            }

            assist.value.props.show = false
        }
    }
</script>

<template>
    <v-alert v-if="checkDefs" type="warning" density="compact" class="my-3">{{ $t('_app.messages.checkDefs.text') }}</v-alert>

    <draggable 
        v-model="fhem.app.config[props.type][props.typeIdx][props.section][props.mainIdx][props.mainSection][props.prop]"            
        animation="300"
        :disabled="disable"
        handle=".dd_zone"
        item-key="id">
        <template #item={index}>
            <v-row no-gutters class="pt-3 align-center">
                <v-icon icon="mdi-drag-vertical" class="dd_zone pr-5"></v-icon>
                <v-col>
                    <v-text-field 
                        v-model="fhem.app.config[props.type][props.typeIdx][props.section][props.mainIdx][props.mainSection][props.prop][index]"
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
                <v-btn variant="plain" icon="mdi-delete" @click="deleteDef(index)"></v-btn>
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
            <v-btn variant="plain" icon="mdi-plus" :disabled="!newDef" @click="addDef()" class="mr-8"></v-btn>
        </v-row>
    </v-form>

    <v-dialog v-model="assist.props.show" max-width="850px">
        <v-card>
            <v-sheet color="primary">
                <v-card-title>{{ $t('_app.settings.assist.title') }}</v-card-title>
            </v-sheet>
            <v-card-text>
                <v-row class="align-center">
                    <v-col class="text-h6">
                        {{ prop }}
                    </v-col>
                    <v-btn 
                        :icon="propHelp ? 'mdi-help-circle' : ''"
                        variant="plain"
                        density="compact"
                        @click="fhem.help(propHelp)">
                    </v-btn>
                </v-row>
                <v-row class="align-center">
                    <v-col cols="12" md="3">
                        <v-select
                            v-model="assist.props.device"
                            :items="assist.props.devices"
                            label="device"
                            hide-details
                            density="compact"
                            variant="outlined">
                        </v-select>
                    </v-col>

                    <v-col cols="8" md="4">
                        <v-autocomplete
                            v-model="assist.props.reading"
                            :items="readings"
                            :disabled="assist.props.device ? false : true"
                            label="reading"
                            hide-details
                            density="compact"
                            variant="outlined">
                        </v-autocomplete>
                    </v-col>
                    <v-col v-if="/^r-/.test(assist.props.reading)" cols="4" md="1">
                        <v-checkbox
                            v-model="assist.props.timestamp"
                            label="ts"
                            hide-details
                            density="compact">

                        </v-checkbox>
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="assist.props.val"
                            :disabled="assist.props.device ? false : true"
                            label="value"
                            clearable
                            hide-details
                            density="compact"
                            variant="outlined">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-divider class="my-4"></v-divider>
                <v-row class="align-center">
                    <v-col cols="12" :md="['url', 'cmd', 'data', 'text'].indexOf(prop) !== -1 ? 12 : 4" v-for="(prop, idx) of assist.props.defs" :key="prop">
                        <v-text-field
                            v-model="assist.props.props[idx]"
                            :label="prop"
                            clearable
                            hide-details
                            density="compact"
                            variant="outlined">
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="confirmAssist()" :disabled="assist.props.reading || assist.props.props.join('') ? false : true">{{ $t('_app.settings.assist.ok') }}</v-btn>
                <v-btn @click="assist.props.show = false">{{ $t('_app.settings.assist.cancel') }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>