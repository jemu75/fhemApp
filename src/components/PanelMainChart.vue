<script setup>
    import { ref, computed, onMounted } from 'vue'
    import { useFhemStore } from '@/stores/fhem'
    import VChart from 'vue-echarts'
    import { useTheme } from 'vuetify'
    import { useI18n } from 'vue-i18n'
 
    const props = defineProps({
        el: Object,
        iconmap: Array,
        devices: Array,
        height: String
    })

    const fhem = useFhemStore()

    const theme = useTheme()

    const i18n = useI18n()

    const defs = computed(() => {
        return fhem.handleDefs(props.el.serie, ['data', 'name', 'digits', 'suffix', 'type', 'yAxisIndex'], [null, '', 0, '', 'line', 0], true)
    })

    const chartStyle = computed(() => {
        let res = 'height: ' + props.height

        if(fhem.app.panelMaximized) res = 'height: 80dvh'

        return res
    })

    const option = ref({})

    const loading = ref(true)

    function getDate(val) {
        if(isNaN(val)) {
            return val
        } else {
            return ( d => new Date(d.setDate(d.getDate() + (Number(val) || 0))).toISOString() )(new Date).split('T')[0]
        }
    }

    async function readLogData(cmd) {
        let cmdParts = cmd.split(' '),
            logData,
            rows = [],
            ts,
            val,
            res = []

        for(const device of props.devices) if(device.split(':')[0] === cmdParts[1]) cmdParts[1] = device.split(':')[1]
        cmdParts[4] = getDate(cmdParts[4])
        cmdParts[5] = getDate(cmdParts[5])

        logData = await fhem.request('text', cmdParts.join(' '))

        rows = logData.split('\n')

        if(rows.length > 0) {
            for(const row of rows) {
                ts = new Date(row.split(' ')[0].replace('_','T'))
                val = parseFloat(row.split(' ')[1])

                res.push([ts, val])
            }
        }
  
        return res
    }

    function readValues(data) {
        let vals = /,/.test(data) ? data : data.replace(/ /g,',')

        if(!/^\[.*\]$/.test(vals)) vals = '[' + vals + ']'

        return fhem.stringToJson(vals)
    }

    async function handleSeries() {
        let data,
            opts = {
                tooltip: {
                    trigger: 'axis'
                },
                series: [],
                yAxis: [],
                xAxis: {},
                legend: { data: [], bottom: 10 }
            },
            presets = JSON.parse(JSON.stringify(fhem.getEl(props.el, ['options']) || {})),
            presetSeries = JSON.parse(JSON.stringify(fhem.getEl(props.el, ['options', 'series']) || [])),
            axisLabel

        loading.value = true

        if(defs.value.length > 0) {
            if(presetSeries.length > 0) delete presets.series

            for(const [ idx, def ] of Object.entries(defs.value)) {
                data = /^get.*/.test(def.data) ? await readLogData(def.data) : readValues(def.data)
                axisLabel = { 
                    formatter: (val) => { 
                        return val.toLocaleString(i18n.locale.value, { minimumFractionDigits: def.digits, maximumFractionDigits: def.digits }) + def.suffix 
                    } 
                }

                opts.xAxis.type = /^get.*/.test(def.data) ? 'time' : 'category' //woher kommen die Kategorienamen?
                opts.series.push(Object.assign({ name: def.name, type: def.type, data }, (presetSeries[idx] || {})))
                opts.yAxis.push({ type: 'value', axisLabel })
                opts.legend.data.push(def.name)
            }

            if(Object.keys(presets).length > 0) Object.assign(opts, presets)

            option.value = Object.assign({}, opts)
            loading.value = false
        }        
    }

    onMounted(() => {
        handleSeries()               
    })
</script>

<template>
    <v-chart :style="chartStyle" :option="option" :loading="loading" :theme="theme.global.name.value === 'dark' ? 'dark' : 'light'" autoresize />
</template>
