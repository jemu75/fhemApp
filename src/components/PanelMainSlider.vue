<script setup>
    import { computed, ref } from 'vue'
    import { useFhemStore } from '@/stores/fhem'

    const props = defineProps({
        el: Object,
        iconmap: Array,
        devices: Array,
        height: String
    })

    const fhem = useFhemStore()

    const sliderVal = ref()

    function setSliderVal(val) {
        sliderVal.value = val
    }

    const slider = computed(() => {
        let res = fhem.handleDefs(props.el.slider, ['cmd', 'current', 'color', 'min', 'max', 'steps', 'reverse', 'size', 'vertical'],['', 0, '', 0, 100, 10, false, 4, false], false, null, true)

        if(/%v/.test(res.current)) res.current = res.current.replace('%v', sliderVal.value)
        setSliderVal(res.current)

        return res
    })

    let timer = null

    function doCmd(newVal) {
        let cmd = slider.value.cmd,
            hasDecimalSteps = /\./.exec(slider.value.steps),
            decimals = 0,
            defParts = []

        if(hasDecimalSteps) decimals = slider.value.steps.slice(hasDecimalSteps.index).length - 1

        cmd = cmd.replace('%v', newVal.toFixed(decimals))

        for(const device of props.devices) {
            defParts = device.split(':')
            if(RegExp(defParts[0]).test(cmd)) cmd = cmd.replace(defParts[0], defParts[1])
        }

        clearTimeout(timer)

        timer = setTimeout(() => {
            fhem.request('text', cmd)
        }, 500)
    }
</script>

<template>
    <v-slider
        v-model="sliderVal"
        :min="slider.min"
        :max="slider.max"
        :step="slider.steps"
        :reverse="slider.reverse"        
        :direction="slider.vertical ? 'vertical' : 'horizontal'"
        :track-size="slider.size"
        :color="slider.color"
        hide-details
        thumb-label
        @update:modelValue="doCmd($event)"
        >
    </v-slider>
</template>