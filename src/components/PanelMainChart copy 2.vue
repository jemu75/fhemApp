<script setup>
    import { ref, computed, onMounted } from 'vue'
    import { useFhemStore } from '@/stores/fhem'
        
    const props = defineProps({
        el: Object,
        iconmap: Array,
        devices: Array
    })

    const fhem = useFhemStore()

    const series = ref()

    const options = ref({
        theme: {
            mode: 'dark'
        },
        chart: {
            height: 'auto',
            type: 'line',
            toolbar: {
            show: false
            }
        },
        tooltip: {
            x: {
            format: 'dd.MM.yy HH:mm:ss'
            }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                datetimeUTC: false
            }
        }  
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
                ts = Date.parse(new Date(row.split(' ')[0].replace('_','T')))
                value = parseFloat(row.split(' ')[1])

                res.push([ts, value])
            }
        }

        return res
    }

    function loadChartData() {
        let chartSeries = [],
            chartSerie,
            yaxis = [],
            formatDef

        readLogData(seriesDefs.value)
            .then((res) => {
                if(res.length > 0) {
                    for(const data of res) {
                        chartSerie = { data: handleLogData(data.data, data.calc), name: data.name };
                        if (data.type) chartSerie.type = data.type;

                        if(data.format) {
                            formatDef = {
                                labels: {
                                    formatter: (val) => {
                                        let res = ''
                                        let fmt = data.format.match(/%n\(.*\)/)
                                        let digits = fmt ? (Number(fmt[0].split(',')[0].replace('%n(','').replace(')','')) || 0) : 0

                                        if(val) res = data.format.replace(/%n\(.*\)/, val.toLocaleString(fhem.app.settings.lang, { minimumFractionDigits: digits, maximumFractionDigits: digits }))
                                        return res
                                    }
                                }
                            }

                            if(yaxis[data.id]) {
                                yaxis[data.id].labels = formatDef.labels
                            } else {                                                    
                                yaxis.push(formatDef)
                            }
                        }

                        chartSeries.push(chartSerie);
                    }
                }
            })
            .finally(() => {
                options.value = {
                    ...options.value,
                    yaxis
                } 

                series.value = chartSeries

                console.log(series.value)
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
    <apexchart v-if="series" :series="series" :options="options"></apexchart>
</template>