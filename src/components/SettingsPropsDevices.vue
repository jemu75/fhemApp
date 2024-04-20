<script setup>
    import { ref} from 'vue'
    import { useFhemStore } from '@/stores/fhem'

    const props = defineProps({
        type: String,
        typeIdx: Number,
        fhemDevices: Array,
        extended: Boolean
    })

    //type = panels|templates
    //typeIdx = element im panels bzw. templates array

    const fhem = useFhemStore()

    const devices = ref([])

    const newKey = ref(null)
 
    function getDevices() {
        let templateIdx = fhem.app.config.templates.map((e) => e.name).indexOf(fhem.app.config[props.type][props.typeIdx]['template']),
            deviceKeys = fhem.getEl(fhem.app.config.templates, [templateIdx, 'panel', 'devicekeys']) || [],
            panelDevices = fhem.app.config[props.type][props.typeIdx]['panel']['devices'] || [],
            keyParts,
            devParts,
            deviceIdx

        devices.value = []

        if(deviceKeys.length > 0) {
            for(const deviceKey of deviceKeys) {
                keyParts = deviceKey.split(':')
                devices.value.push({ key: keyParts[0], title: keyParts[1] ? keyParts[1] + ' (' + keyParts[0] + ')' : keyParts[0], device: null })
            }
        }

        if(panelDevices.length > 0) {
            for(const device of panelDevices) {
                devParts = device.split(':')
                deviceIdx = devices.value.map((e) => e.key).indexOf(devParts[0])

                if(deviceIdx !== -1) {
                    devices.value[deviceIdx]['device'] = devParts[1]
                } else {
                    devices.value.push({ key: devParts[0], title: devParts[0], device: devParts[1] })
                }
            }
        }
    }

    function updateDeviceKeys() {
        let result = []

        for(const def of devices.value) if(def.device) result.push(def.key + ':' + def.device)

        fhem.app.config[props.type][props.typeIdx]['panel']['devices'] = result
    }

    function addKey() {
        fhem.app.config[props.type][props.typeIdx]['panel']['devices'].push(newKey.value + ':')
        newKey.value = null
        getDevices()
    }

    function deleteKey(idx) {
        fhem.app.config[props.type][props.typeIdx]['panel']['devices'].splice(idx, 1)
        getDevices()
    }

    getDevices()
</script>

<template>
    <v-row v-for="(device, idx) of devices" :key="device.key" no-gutters class="pt-3 align-center">
        <v-col class="pt-3">
            <v-autocomplete
                v-model="devices[idx]['device']"                                
                :items="fhemDevices"
                :label="device.title"                
                density="compact"
                variant="outlined"                
                hide-details
                @update:modelValue="updateDeviceKeys()">
            </v-autocomplete>
        </v-col>
        <v-btn v-if="extended" variant="plain" icon="mdi-delete" @click="deleteKey(idx)" class="pt-3 pl-5"></v-btn>
    </v-row>
    <v-row v-if="extended" no-gutters class="pt-3 align-center">
        <v-col class="pt-3">
            <v-text-field
                v-model="newKey"
                density="compact" 
                variant="outlined" 
                hide-details
                clearable
                label="new deviceKey">
            </v-text-field>            
        </v-col>
        <v-btn variant="plain" icon="mdi-plus" :disabled="!newKey" @click="addKey()" class="pt-3 mr-5"></v-btn>
    </v-row>
</template>