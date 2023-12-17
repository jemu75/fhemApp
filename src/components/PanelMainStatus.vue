<script setup>
    import { computed } from 'vue'
    import { useFhemStore } from '@/stores/fhem'

    const props = defineProps({
        el: Object,
        iconmap: Array,
        devices: Array
    })

    const fhem = useFhemStore()

    const status = computed(() => {
        let res = fhem.handleDefs(props.el.status, ['level','color','reverse','min','max'],[0, 'success', false, 0, 100])
        res.level = Math.round((res.level - res.min) / (res.max - res.min) * 100)
        res.reverse = res.reverse ? true : false

        return res
    })
</script>

<template>
    <v-progress-circular 
        width="4"
        v-model="status.level"
        :color="status.color"
        :reverse="status.reverse">
    </v-progress-circular>
</template>