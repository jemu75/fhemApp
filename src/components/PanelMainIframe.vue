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

    const extContent = ref()

    const iframe = computed(() => {
        return fhem.handleDefs(props.el.iframe, ['source'],[''])
    })

    const contentSize = computed(() => {
        return {
            width: extContent.value && extContent.value.scrollWidth ? extContent.value.scrollWidth : 0,
            height: /=maximized$/.test(fhem.app.currentView) ? (window.innerHeight - 170) : props.height
        }
    })
</script>

<template>
    <div ref="extContent">
        <iframe 
            :src="iframe.source"
            :width="contentSize.width"
            :height="contentSize.height"
            loading="lazy"
            style="border:none;">
        </iframe>
    </div>
</template>