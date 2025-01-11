<script setup>
    import { computed } from 'vue'
    import { useFhemStore } from '@/stores/fhem'
    import router from '@/router'

    const props = defineProps({
        el: Object,
        iconmap: Array,
        devices: Array,
        height: String
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
        let cmdList = []

        if(obj.cmd) {
            if(obj.type === 'cmd') {
                cmdList = obj.cmd.split(';')
                for(const [idx] of Object.entries(cmdList)) {
                    for(const device of props.devices) cmdList[idx] = cmdList[idx].replace(' ' + device.split(':')[0] + ' ', ' ' + device.split(':')[1] + ' ')
                } 

                fhem.request('text', cmdList.join(';'))
            }
            
            if(obj.type === 'route') router.push({ name: 'devices', params: { view: obj.cmd }, query: router.currentRoute.value.query })
            if(obj.type === 'url') window.open(obj.cmd, '_self')
            if(obj.type === 'popout') {
                let name = /panel=/.test(obj.cmd) ? obj.cmd.split('panel=')[1].split(' ')[0] : -1,
                    width = /width=/.test(obj.cmd) ? obj.cmd.split('width=')[1].split(' ')[0] : '400px',
                    panel = fhem.app.panelList.map((e) => e.name).indexOf(name)
                
                if(panel !== -1) fhem.app.popOutList.push({ show: true, width, panel })
            }
        }
    }

    function btnClick(evt) {
        let click = fhem.handleDefs(props.el.click, ['cmd', 'type'], ['', 'cmd'], false, null, true),
            longClick = fhem.handleDefs(props.el.longClick, ['cmd', 'type'], ['', 'cmd'], false, null, true),
            longRelease = fhem.handleDefs(props.el.longRelease, ['cmd', 'type'], ['', 'cmd'], false, null, true),
            isTouch = 'ontouchstart' in document

        if((!isTouch && evt === 'mouseStart') || evt === 'touchStart') {
            btnState.timer = setTimeout(() => {
                btnState.long = true
                if(longClick.cmd) doCmd(longClick)
            }, 1000)
        }

        if((!isTouch && evt === 'mouseEnd') || evt === 'touchEnd') {
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
        @mousedown="btnClick('mouseStart')"
        @touchstart="btnClick('touchStart')"
        @mouseup="btnClick('mouseEnd')"
        @touchend="btnClick('touchEnd')"
        class="my-2">
        <v-icon size="large">
            {{ btn.icon }}
        </v-icon>
    </v-btn>
</template>