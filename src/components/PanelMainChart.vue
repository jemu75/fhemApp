<script setup>
    import { ref, computed } from 'vue'
    import { useFhemStore } from '@/stores/fhem'    
    import { useTheme, useDisplay } from 'vuetify'
    import { useI18n } from 'vue-i18n'
    import VChart from 'vue-echarts'

    const props = defineProps({
        el: Object,
        iconmap: Array,
        devices: Array,
        height: String
    })

    const fhem = useFhemStore()
    const theme = useTheme()
    const { mobile } = useDisplay()
    const i18n = useI18n()

    const option = ref({})

    const chart = ref({
        from: null,
        to: null,
        fromMenu: false,
        toMenu: false,
        loaded: false
    })

    let data = []

    const chartStyle = computed(() => {
        loadSeries()

        return 'height: ' + (/=maximized$/.test(fhem.app.currentView) ? (window.innerHeight - 250) + 'px' : props.height)
    })

    function toLocaleDate(val) {
        return i18n.d(val, { dateStyle: mobile.value ? 'short' : 'long' })
    }

    function getDate(val, from) {
        let res

        if(chart.value.from && from) res = chart.value.from
        if(chart.value.to && !from) res = chart.value.to

        if(!res && !isNaN(val)) res = (d => new Date(d.setDate(d.getDate() + (Number(val) || 0))))(new Date) 
        if(!res) res = new Date(/.*T.*/.test(val) ? val : val + 'T00:00:00')

        if(!chart.value.from && from) chart.value.from = res
        if(!chart.value.to && !from) chart.value.to = res

        res = new Date(res.getTime() - (res.getTimezoneOffset() * 60 * 1000))

        return res.toISOString().split('T')[0]        
    }

    async function loadData() {
        let defs = fhem.handleDefs(props.el.serie, ['data', 'name', 'digits', 'suffix', 'type'], [null, '', 0, '', 'line'], true),
            cmd,
            logData,
            rows = [],
            cols,
            ts,
            val,
            data,
            xAxisType,
            res = []

        if(defs.length > 0) {
            for(const def of defs) {
                if(/^get.*/.test(def.data)) {
                    xAxisType = 'time'
                    cmd = def.data.split(' ')

                    for(const device of props.devices) if(device.split(':')[0] === cmd[1]) cmd[1] = device.split(':')[1]
                    cmd[4] = getDate(cmd[4], true)
                    cmd[5] = getDate(cmd[5], false)

                    logData = await fhem.request('text', cmd.join(' '))
                    
                    data = []
                    rows = logData.split('\n')

                    if(rows.length > 0) {
                        for(const row of rows) {
                            cols = row.split(' ')
                            
                            if(cols.length > 1) {
                                ts = new Date(cols[0].replace('_','T'))
                                val = parseFloat(cols[1]).toFixed(def.digits)

                                data.push([ts, val])
                            }
                        }
                    }
                } else if(/^\[.*\]/.test(def.data)) {
                    data = fhem.stringToJson(def.data)
                } else {
                    data = [fhem.replacer('%n(' + def.digits + ')', def.data, true)]
                }

                res.push({ xAxisType: xAxisType, type: def.type, name: def.name, digits: def.digits, suffix: def.suffix, data })
            }
        }

        return res
    }

    async function loadSeries() {
        let preset = {
            tooltip: { trigger: 'axis' },
            legend: { data: [], bottom: 10 },
            backgroundColor: 'rgba(255, 255, 255, 0)',
            grid: { top: 30, bottom: 60, left: 60, right: 60 },
            animationDuration: 300,
            series: [],
            yAxis: [],
            xAxis: {}
        },        
        options = JSON.parse(JSON.stringify(fhem.getEl(props.el, ['options']) || {})),
        options2 = JSON.parse(JSON.stringify(fhem.getEl(props.el, ['options2']) || {})),
        opts = Object.assign(preset, /=maximized$/.test(fhem.app.currentView) && Object.keys(options2).length > 0 ? options2 : options ),
        label

        chart.value.fromMenu = false
        chart.value.toMenu = false
        chart.value.loaded = false

        data = await loadData()

        for(const [ idx, serie ] of Object.entries(data)) {
            label = { 
                formatter: (val) => { 
                    return val.toLocaleString(i18n.locale.value, { minimumFractionDigits: serie.digits, maximumFractionDigits: serie.digits }) + serie.suffix
                } 
            }

            if(!opts.series[idx]) opts.series[idx] = {}
            if(!opts.yAxis[idx]) opts.yAxis[idx] = {}
            if(!opts.legend.data) opts.legend.data = []

            if(!opts.xAxis.type) opts.xAxis.type = serie.xAxisType
            if(!opts.yAxis[idx].type) opts.yAxis[idx].type = 'value'
            if(!opts.yAxis[idx].axisLabel) opts.yAxis[idx].axisLabel = {}
            if(!opts.yAxis[idx].axisLabel.formatter) opts.yAxis[idx].axisLabel.formatter = label.formatter
            if(!opts.legend.data[idx]) opts.legend.data[idx] = serie.name
            if(!opts.series[idx].name) opts.series[idx].name = serie.name
            if(!opts.series[idx].type) opts.series[idx].type = serie.type
            if(!opts.series[idx].data) opts.series[idx].data = serie.data
            if(!opts.series[idx].detail) opts.series[idx].detail = {}
            if(!opts.series[idx].detail.formatter) opts.series[idx].detail.formatter = label.formatter
            if(!opts.series[idx].tooltip) opts.series[idx].tooltip = {}
            if(!opts.series[idx].tooltip.valueFormatter) opts.series[idx].tooltip.valueFormatter = label.formatter
        }

        fhem.log(7, 'Chartdata chart.loaded.', opts)

        option.value = Object.assign({}, opts)
        chart.value.loaded = true
    }
</script>

<template>
    <div v-if="/=maximized$/.test(fhem.app.currentView)" class="mx-4 my-4 text-right">
        <v-menu
            v-model="chart.fromMenu"
            :close-on-content-click="false">
            
            <template v-slot:activator="{ props }">
                <v-btn 
                    v-bind="props" 
                    variant="outlined" 
                    append-icon="mdi-calendar"
                    class="mr-2">
                    {{ toLocaleDate(chart.from) }}
                </v-btn>
            </template>
            
            <v-locale-provider :locale="i18n.locale.value">
                <v-date-picker 
                    v-model="chart.from" 
                    color="secondary" 
                    @update:model-value="loadSeries()">
                </v-date-picker>
            </v-locale-provider>
        </v-menu>
        -
        <v-menu
            v-model="chart.toMenu"
            :close-on-content-click="false">
            
            <template v-slot:activator="{ props }">
                <v-btn 
                    v-bind="props" 
                    variant="outlined" 
                    append-icon="mdi-calendar"
                    class="ml-2">
                    {{ toLocaleDate(chart.to) }}
                </v-btn>
            </template>
            
            <v-locale-provider :locale="i18n.locale.value">
                <v-date-picker 
                    v-model="chart.to" 
                    color="secondary" 
                    @update:model-value="loadSeries()">
                </v-date-picker>
            </v-locale-provider>
        </v-menu>
    </div>

    <div :style="chartStyle">
        <v-skeleton-loader v-if="!chart.loaded" type="text, image, text" />
        <v-chart v-if="chart.loaded" :option="option" :theme="theme.global.name.value === 'dark' ? 'dark' : 'light'" autoresize />
    </div>
</template>
