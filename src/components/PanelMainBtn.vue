<script setup>
    import { computed } from 'vue'
    import { useFhemStore } from '@/stores/fhem'
    import router from '@/router'

    const props = defineProps({
        el: Object,
        iconmap: Array,
        devices: Array
    })

    const fhem = useFhemStore()

    const btn = computed(() => {
        let res = fhem.handleDefs(props.el.btn, ['icon', 'disabled', 'color', 'variant'], ['', false, '', 'text'])

        if(res.icon) res.icon = fhem.getIcon(res.icon, props.iconmap)

        return res
    })

    const status = computed(() => {
        let res = fhem.handleDefs(props.el.status, ['level','color','min','max','reverse'],[0, 'success', 0, 100, false])
        res.level = Math.round((res.level - res.min) / (res.max - res.min) * 100)
        res.reverse = res.reverse ? true : false

        return res
    })

    const btnState = {
        timer: false,
        long: false
    }

    function doCmd(obj) {
        let defParts = [],
            cmd = obj.cmd

        if(obj.type === 'cmd') {
            for(const device of props.devices) {
                defParts = device.split(':')
                if(RegExp(defParts[0]).test(cmd)) cmd = cmd.replace(defParts[0], defParts[1])
            }

            fhem.request('text', cmd)
        }
        
        if(obj.type === 'route') router.push({ name: 'devices', params: { view: obj.cmd }, query: router.currentRoute.value.query })
        if(obj.type === 'url') window.open(obj.cmd, '_self')
    }

    function btnClick(evt) {
        let click = fhem.handleDefs(props.el.click, ['cmd', 'type'], ['', 'cmd']),
            longClick = fhem.handleDefs(props.el.longClick, ['cmd', 'type'], ['', 'cmd']),
            longRelease = fhem.handleDefs(props.el.longRelease, ['cmd', 'type'], ['', 'cmd'])

        if(evt === 'touchStart' || evt === 'mouseStart') {
            btnState.timer = setTimeout(() => {
                btnState.long = true
                if(longClick.cmd) doCmd(longClick)
            }, 1000)
        }

        if(evt === 'touchEnd' || evt === 'mouseEnd') {
            if(btnState.long) {
                if(longRelease.cmd) doCmd(longRelease)
            } else {
                if(click.cmd) doCmd(click)
            }

            clearTimeout(btnState.timer)
            btnState.long = false
        }
    }
</script>

<template>
    <v-progress-linear v-if="el.status"
        height="4"
        v-model="status.level"
        :color="status.color"
        :reverse="status.reverse">
    </v-progress-linear>

    <v-btn
        icon 
        :variant="btn.variant"
        :disabled="btn.disabled" 
        :color="btn.color" 
        @touchstart="btnClick('touchStart')"
        @touchend="btnClick('touchEnd')"
        @mousedown="btnClick('mouseStart')"
        @mouseup="btnClick('mouseEnd')"
        class="my-2">
        <v-icon size="large">
            {{ btn.icon }}
        </v-icon>
    </v-btn>
</template>