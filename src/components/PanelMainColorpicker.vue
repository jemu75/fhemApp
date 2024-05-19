<script setup>
    import { computed } from 'vue'
    import { useFhemStore } from '@/stores/fhem'
    import ColorPicker from '@radial-color-picker/vue-color-picker'
    import '@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css'

    const props = defineProps({
        el: Object,
        iconmap: Array,
        devices: Array,
        height: String
    })

    const fhem = useFhemStore()

    const color = computed(() => {
        return fhem.handleDefs(props.el.picker, ['cmd', 'current'],['', false])
    })

    function doCmd(val) {
        let hex = hslToHex(val, 50, 100),
            cmd = color.value.cmd,
            defParts = []

        cmd = cmd.replace('%v', hex)

        for(const device of props.devices) {
            defParts = device.split(':')
            if(RegExp(defParts[0]).test(cmd)) cmd = cmd.replace(defParts[0], defParts[1])
        }

        fhem.request('text', cmd)
    }

    function hslToHex(h, l, s) {
        l /= 100
        const a = s * Math.min(l, 1 - l) / 100
        const f = n => {
            const k = (n + h / 30) % 12
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
            return Math.round(255 * color).toString(16).padStart(2, '0')   // convert to Hex and prefix "0" if needed
        }

        return `${f(0)}${f(8)}${f(4)}`
    }

    function hexToHSL(hex) {
        if(hex.split(' ').length > 1) hex = hex.split(' ').slice(-1)[0]        

        hex = hex.replace(/^#/, '')

        let bigint = parseInt(hex, 16),
            r = (bigint >> 16) & 255,
            g = (bigint >> 8) & 255,
            b = bigint & 255

        r /= 255
        g /= 255
        b /= 255

        let max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            delta = max - min

        let l = (max + min) / 2,
            h = 0,
            s = 0

        if (delta !== 0) {
            if (max === r) {
                h = ((g - b) / delta + (g < b ? 6 : 0)) % 6
            } else if (max === g) {
                h = ((b - r) / delta + 2) % 6
            } else {
                h = ((r - g) / delta + 4) % 6
            }

            h = h * 60

            s = delta / (1 - Math.abs(2 * l - 1))
        }

        s = Math.round(s * 100)
        l = Math.round(l * 100)

        return { hue: h, saturation: s, luminosity: l }
    }

    function getSize() {
        let size = props.height

        return 'height: ' + size + '; width: ' + size +';'
    }
</script>

<template>
    <v-row>
        <v-spacer></v-spacer>
        <v-col class="ma-4">
            <ColorPicker v-bind="hexToHSL(color.current)" variant="persistent" @change="doCmd($event)" :style="getSize()"></ColorPicker>
        </v-col>
        <v-spacer></v-spacer>
    </v-row>
</template>