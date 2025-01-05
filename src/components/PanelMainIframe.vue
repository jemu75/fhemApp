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

    const content = computed(() => {
        let src = fhem.handleDefs(props.el.iframe, ['source', 'lazyload'],['', true]),
            res = {
            source: src.source,
            lazy: src.lazyload ? 'lazy' :'eager',
            width: extContent.value && extContent.value.scrollWidth ? extContent.value.scrollWidth : 0,
            height: /=maximized$/.test(fhem.app.currentView) ? (window.innerHeight - 170) : props.height
        }

        return res
    })
</script>

<template>
    <div ref="extContent">
        <iframe 
            :src="content.source"
            :width="content.width"
            :height="content.height"
            :loading="content.lazy"
            style="border:none;">
        </iframe>
    </div>
</template>