<script setup>
    import { ref, computed, onMounted } from 'vue'
    import { useFhemStore } from '@/stores/fhem'
    import VChart from 'vue-echarts'
        
    const props = defineProps({
        el: Object,
        iconmap: Array,
        devices: Array,
        height: String
    })

    const fhem = useFhemStore()

    const option = ref({
        tooltip: {
            trigger: 'axis'
        },
        xAxis: { type: 'time' },
        yAxis: [
            { type: 'value', axisLabel: { formatter: '{value} Liter'} },
            { type: 'value', axisLabel: { formatter: '{value} irgendwas'} }
        ],
        legend: {
            data: ['Liter', 'irgendwas']
        },
        series: [
            {
                name: 'Liter',
                data: [],
                type: 'line',
                smooth: true,                
                yAxisIndex: 0,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' Liter'
                    }
                }
            },
            {
                name: 'irgendwas',
                data: [['2023-12-27T17:22:34', 12]],
                type: 'line',
                yAxisIndex: 1,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' ml'
                    }
                }
            }
        ]
    })

    const seriesDefs = computed(() => {
        let res = fhem.handleDefs(
            props.el.serie, 
            ['log', 'from', 'to', 'column', 'filter', 'format', 'name', 'type', 'calc'], 
            [null, -6, 0, 4, null, null, '', 'line', 'raw'], true),
            defPart
            
        for(const [ idx, def ] of Object.entries(props.el.serie)) {
            defPart = def.split(':')[7]
            if(defPart) res[idx].format = defPart
            if(!res[idx].format) res[idx].format = '%n()'
        }

        return res
    })

    const chartStyle = computed(() => {
        let res = 'height: ' + props.height

        if(fhem.app.panelMaximized) res = 'height: 80vh'

        return res
    })

    function getDate(diff) {
        return ( d => new Date(d.setDate(d.getDate() + (Number(diff) || 0))).toISOString() )(new Date).split('T')[0]
    }

    function getDevice(device) {
        let defParts = []

        for(const device of props.devices) {
            defParts = device.split(':')
            if(RegExp(defParts[0]).test(device)) return defParts[1]
        }

        return device
    }

    function handleLogData(data) {
        let rows = data.split('\n'),
            ts,
            value,
            res = []
        
        if(rows.length > 0) {
            for(const row of rows) {
                ts = new Date(row.split(' ')[0].replace('_','T'))
                value = parseFloat(row.split(' ')[1])

                res.push([ts, value])
            }
        }

        return res
    }

    function loadChartData() {
        readLogData(seriesDefs.value)
            .then((res) => {
                if(res.length > 0) {
                    for(const data of res) {
                        option.value.series[0].data = handleLogData(data.data, data.calc)
                    }
                }
            })
    }

    async function readLogData(series) {
        let res = [],
            cmd,            
            logData

        for(const [idx, serie] of Object.entries(series)) {
            if(serie.log) {
                cmd = 'get ' + getDevice(serie.log) + ' - - ' 
                cmd += getDate(serie.from) + ' ' 
                cmd += getDate(serie.to) + ' ' 
                cmd += serie.column + ':' + serie.filter + ':0:int'

                logData = fhem.request('text', cmd)

                if(logData) {              
                    res.push({ id: idx, data: await logData, name: serie.name, format: serie.format, type: serie.type, calc: serie.calc })
                }
            }
        }

        return res
    }
    
    onMounted(() => {
        loadChartData()
    })
</script>

<template>
    <v-chart :style="chartStyle" :option="option" :init-options="{ locale: 'DE' }" autoresize />
</template>
