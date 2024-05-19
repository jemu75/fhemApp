<script setup>
    import { useFhemStore } from '@/stores/fhem'
    import PanelMainInfo from './PanelMainInfo.vue'
    import PanelMainBtn from './PanelMainBtn.vue'
    import PanelMainSlider from './PanelMainSlider.vue'
    import PanelMainImage from './PanelMainImage.vue'
    import PanelMainIframe from './PanelMainIframe.vue'
    import PanelMainMenu from './PanelMainMenu.vue'
    import PanelMainChart from './PanelMainChart.vue'
    import PanelMainColorpicker from './PanelMainColorpicker.vue'

    defineProps({
        main: Object,
        levels: Array,
        iconmap: Object,
        devices: Object
    })

    const fhem = useFhemStore()

    function getCols(lvl, position) {
        return fhem.handleDefs(lvl[position].size, ['size'],[false]).size
    }

    function getClass(position) {
        let res = ''

        if(['info'].indexOf(position) !== -1) res = "mx-2"

        return res
    }

    function showDivider(lvl, position) {
        return lvl[position] ? fhem.handleDefs(lvl[position].divider, ['show'],[false]).show : false
    }

    function getHeight(lvl) {
        return lvl.level ? fhem.handleDefs(lvl.level.height, ['height'],['64px']).height : '64px'
    }

    function getComponent(type) {
        if(type === 'info') return PanelMainInfo
        if(type === 'btn') return PanelMainBtn
        if(type === 'slider') return PanelMainSlider
        if(type === 'image') return PanelMainImage
        if(type === 'iframe') return PanelMainIframe
        if(type === 'menu') return PanelMainMenu
        if(type === 'chart') return PanelMainChart
        if(type === 'colorpicker') return PanelMainColorpicker
    }
</script>

<template>
    <template v-for="(lvl, idx) of main" :key="idx">
        <v-expand-transition>
            <v-row v-if="levels.indexOf(idx) !== -1 ? true : false" no-gutters class="text-center align-center">
                <v-sheet :height="getHeight(lvl, 'level')"></v-sheet>
                <template v-for="position of ['left1', 'left2', 'mid', 'right1', 'right2']" :key="position">
                    <v-col v-if="lvl.level[position]" :cols="getCols(lvl, position)" :class="getClass(lvl.level[position])">
                        <component :is="getComponent(lvl.level[position])" :el="lvl[position]" :iconmap="iconmap" :devices="devices" :height="getHeight(lvl, 'level')"></component>
                    </v-col>
                    <v-divider v-if="showDivider(lvl, position)" vertical></v-divider>
                </template>
                <v-divider v-if="showDivider(lvl, 'level')"></v-divider>
            </v-row>
        </v-expand-transition>
    </template>    
</template>