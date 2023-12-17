<script setup>
    import { computed, ref } from 'vue'
    import { useFhemStore } from '@/stores/fhem'

    const props = defineProps({
        el: Object,
        iconmap: Array,
        devices: Array
    })

    const fhem = useFhemStore()

    const loaded = ref(false)

    const image = computed(() => {
        return fhem.handleDefs(props.el.image, ['source'],[''])
    })
</script>

<template>
    <v-skeleton-loader v-if="!loaded" type="image">
    </v-skeleton-loader>
    <v-img
        :src="image.source"
        width="100hv"
        @load="loaded = true"
        >
    </v-img>
</template>