<script setup>
    import { computed, ref, onMounted } from 'vue'
    import { useFhemStore } from '@/stores/fhem'

    const props = defineProps({
        el: Object,
        iconmap: Array,
        devices: Array,
        height: String
    })

    const fhem = useFhemStore()

    const extContent = ref()
    const width = ref()
    const height = ref(/=maximized$/.test(fhem.app.currentView) ? (window.innerHeight - 170) : props.height)

    const content = computed(() => {
        let src = fhem.handleDefs(props.el.iframe, ['source', 'lazyload'],['', true]),
            res = {
                source: src.source,
                lazy: src.lazyload ? 'lazy' :'eager'
            }

        return res
    })

    function refreshIframe() {
        if(extContent.value) width.value = extContent.value.scrollWidth
    }

    onMounted(() => {
        window.addEventListener('resize', refreshIframe)
        refreshIframe()
    })
        
</script>

<template>
    <div>
        <div ref="extContent"></div>
        <iframe 
            :src="content.source"
            :width="width"
            :height="height"
            :loading="content.lazy"
            style="border:none;">
        </iframe>
    </div>
</template>