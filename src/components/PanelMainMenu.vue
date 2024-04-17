<script setup>
    import { computed } from 'vue'
    import { useFhemStore } from '@/stores/fhem'

    const props = defineProps({
        el: Object,
        iconmap: Array,
        devices: Array,
        height: String
    })

    const fhem = useFhemStore()

    const btn = computed(() => {
        let res = fhem.handleDefs(props.el.btn, ['icon', 'disabled', 'color', 'variant'], ['mdi-dots-vertical', false, '', 'text'])

        if(res.icon) res.icon = fhem.getIcon(res.icon, props.iconmap)

        return res
    })

    const menu = computed(() => {
        let res = [],            
            defs = fhem.handleDefs(props.el.menu, ['name', 'cmd'], ['',''], true, ','),
            item = {}

        for(const def of defs) {
            item = {
                name: /:/.test(def.name) ? def.name.split(':')[0] : def.name,
                cmd: /:/.test(def.cmd) ? def.cmd.split(':')[1] : def.cmd
            }

            res.push(item)
        }

        return res
    })

    function doCmd(cmd) {
        let defParts = []

        for(const device of props.devices) {
            defParts = device.split(':')
            if(RegExp(defParts[0]).test(cmd)) cmd = cmd.replace(defParts[0], defParts[1])
        }

        return fhem.request('text', cmd)
    }
</script>

<template>
    <v-menu>
        <template v-slot:activator="{ props }">
            <v-btn
                v-bind="props"
                icon 
                :variant="btn.variant"
                :disabled="btn.disabled || menu.length < 1" 
                :color="btn.color" 
                class="my-2">
                <v-icon size="large">
                    {{ btn.icon }}
                </v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-list-item v-for="(item, idx) of menu" :key="idx" :value="idx" @click="doCmd(item.cmd)">
                <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>