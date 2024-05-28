<script setup>
    import { computed, watch, ref } from 'vue'
    import { useFhemStore } from '@/stores/fhem'

    const props = defineProps({
        el: Object,
        iconmap: Array,
        devices: Array,
        height: String
    })

    const fhem = useFhemStore()

    const menuItems = ref([])

    watch(props.el, (newVal) => {
        loadMenu(newVal)
    })

    const btn = computed(() => {
        let res = fhem.handleDefs(props.el.btn, ['icon', 'disabled', 'color', 'variant'], ['mdi-dots-vertical', false, '', 'text'])

        if(res.icon) res.icon = fhem.getIcon(res.icon, props.iconmap)

        return res
    })

    async function loadMenu() {
        let defs = fhem.handleDefs(props.el.menu, ['name', 'cmd', 'convert'], ['','', null], true, ','),
            vals,
            divider,
            re

        menuItems.value = []

        for(const def of defs) {
            vals = /^get/.test(def.name) ? await doCmd(def.name) : def.name
            
            for(const el of [',','|','\n']) if(RegExp(el).test(vals)) divider = el

            for(const val of vals.split(divider)) {
                if(val) {
                    re = val

                    if(/%v/.test(def.cmd) && def.convert === 'regExp') re = RegExp(val.replace(/[^a-z,^A-Z]/g, '.'))

                    menuItems.value.push({ name: val, cmd: def.cmd.replace(/%v/g, re) }) 
                }
            }
        }
    }

    async function doCmd(cmd) {
        let cmdList = []

        cmdList = cmd.split(';')

        for(const [idx] of Object.entries(cmdList)) {
            for(const device of props.devices) cmdList[idx] = cmdList[idx].replace(' ' + device.split(':')[0] + ' ', ' ' + device.split(':')[1] + ' ')
        } 

        return fhem.request('text', cmdList.join(';'))
    }

    loadMenu()
</script>

<template>
    <v-menu>
        <template v-slot:activator="{ props }">
            <v-btn
                v-bind="props"
                icon 
                :variant="btn.variant"
                :disabled="btn.disabled || menuItems.length < 1" 
                :color="btn.color" 
                class="my-2">
                <v-icon size="large">
                    {{ btn.icon }}
                </v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-list-item v-for="(item, idx) of menuItems" :key="idx" :value="idx" @click="doCmd(item.cmd)">
                <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>