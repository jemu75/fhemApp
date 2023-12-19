<script setup>
    import { computed } from 'vue'
    import { useFhemStore } from '@/stores/fhem'

    const props = defineProps({
        el: Object,
        iconmap: Array,
        devices: Object
    })

    const fhem = useFhemStore()

    const text = computed(() => {
        return fhem.handleDefs(props.el.text, ['text', 'format'], ['', (!props.el.text2 && !props.el.text3 && !props.el.icon) ? 'text-h6' : 'text-caption'])
    })

    const text2 = computed(() => {
        return fhem.handleDefs(props.el.text2, ['text', 'format'], ['', (props.el.text && !props.el.text3 && !props.el.icon) ? 'text-h6' : 'text-caption'])
    })

    const text3 = computed(() => {
        return fhem.handleDefs(props.el.text3, ['text', 'format'], ['', 'text-caption'])
    })

    const icon = computed(() => {
        let res = fhem.handleDefs(props.el.icon, ['icon', 'color', 'size'], ['','', 'x-large'])

        if(res.icon) res.icon = fhem.getIcon(res.icon, props.iconmap)

        return res
    })

    const status = computed(() => {
        let res = fhem.handleDefs(props.el.status, ['level','color','min','max','reverse','linear'],[0, 'success', 0, 100, false, false])
        res.level = Math.round((res.level - res.min) / (res.max - res.min) * 100)
        res.reverse = res.reverse ? true : false

        return res
    })
</script>

<template>
    <div v-if="el.text" :class="text.format">
        {{ text.text }}
    </div>

    <v-icon v-if="el.icon" :color="icon.color" :size="icon.size">
        {{ icon.icon }}
    </v-icon>

    <v-progress-circular v-if="el.status && !status.linear" 
        width="4"
        v-model="status.level"
        :color="status.color"
        :reverse="status.reverse">
    </v-progress-circular>

    <v-progress-linear v-if="el.status && status.linear" 
        height="7"
        rounded
        v-model="status.level"
        :color="status.color"
        :reverse="status.reverse">
    </v-progress-linear>

    <div :class="el.text2 ? text2.format : text3.format">
        <span v-if="el.text2" :class="text2.format">
            {{ text2.text }}
        </span>
        <span v-if="el.text3" :class="text3.format">
            {{ text3.text }}
        </span>
    </div>
</template>