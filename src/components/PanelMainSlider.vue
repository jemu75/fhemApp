<script setup>
    import { computed, ref } from 'vue'
    import { useFhemStore } from '@/stores/fhem'
import { number } from 'echarts'

    const props = defineProps({
        el: Object,
        iconmap: Array,
        devices: Array,
        height: String
    })

    const fhem = useFhemStore()

    const sliderHeight = ref(getSliderHeight(props.height))

    const sliderVal = ref()

    function getSliderHeight(val) {
        let res = val

        res = (parseInt(val) - 40) + 'px'

        return res
    }

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
            decimals = 0

        if(hasDecimalSteps) decimals = slider.value.steps.slice(hasDecimalSteps.index).length - 1

        cmd = cmd.replace('%v', newVal.toFixed(decimals))

        for(const device of props.devices) cmd = cmd.replace(' ' + device.split(':')[0] + ' ', ' ' + device.split(':')[1] + ' ')

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
        class="py-2">
        <template v-slot:thumb-label="{ modelValue }">
            <div class="text-white">
                {{ modelValue }}
            </div>
        </template>
    </v-slider>
</template>

<style>
    .v-slider.v-input--vertical > .v-input__control {
        min-height: v-bind(sliderHeight) !important;
    }
</style>
