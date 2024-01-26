<script setup>
    import { useFhemStore } from '@/stores/fhem'
    import ColorPicker from '@radial-color-picker/vue-color-picker'

    const props = defineProps({
        el: Object,
        iconmap: Array,
        devices: Array,
        height: String
    })

    const fhem = useFhemStore()
</script>

<template>
    <div class="ma-2">
        <ColorPicker :initially-collapsed="true"></ColorPicker>
    </div>
</template>

<style>
    @import '@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';

    .rcp {
        display: inline-block;
        height: 140px;
        width: 140px;
    }

    .rcp__well {
        border: 2px solid #fff;
    }
</style>