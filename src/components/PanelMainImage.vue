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

    const loaded = ref(false)

    const image = computed(() => {
        return fhem.handleDefs(props.el.image, ['source','height'],['', null])
    })
</script>

<template>
    <v-skeleton-loader v-if="!loaded" type="image">
    </v-skeleton-loader>
    <v-img
        :src="image.source"
        :height="image.height"
        @load="loaded = true"
        >
    </v-img>
</template>