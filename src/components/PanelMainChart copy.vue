<script setup>
    import { ref, reactive, computed, onMounted } from 'vue'
    import { useFhemStore } from '@/stores/fhem'
        
    const props = defineProps({
        el: Object,
        iconmap: Array,
        devices: Array
    })

    const fhem = useFhemStore()

    const from = ref()

    const to = ref()

    const timeSteps = ref()

    const chart = reactive({
        series: [],
        options: {
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
                format: 'ddd dd.MM.yy HH:mm:ss'
                }
            },
            xaxis: {
                type: 'datetime',
                labels: {
                    datetimeUTC: false
                }
            }
        }
    })

    const series = computed(() => {
        let res = fhem.handleDefs(
            props.el.serie, 
            ['log', 'from', 'to', 'column', 'filter', 'format', 'name', 'type', 'calc'], 
            [null, -6, 0, 4, null, null, '', 'line', 'raw'], true),
            defPart = null
        
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

    function x_getTimeSteps() {
        let dayStart = new Date(from.value)
        let dayEnd = new Date(to.value + ' 23:59:59')
        let dateDiff = Math.abs(dayEnd-dayStart)

        return dateDiff / 300
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
        let series = [],
            serie,
            parts

        //timeSteps.value = getTimeSteps()

        readLogData()
            .then((res) => {
                if(res.length > 0) {
                    for(const data of res) {
                        serie = { data: handleLogData(data.data, data.calc), name: data.name };
                        if (data.type) serie.type = data.type;

                        //das muss noch umgebaut werden da %n()
                        if (data.format) {
                            parts = data.format.split(' ');

                            let formatDef = {
                                labels: {
                                    formatter: (val) => {
                                        let result = ''
                                        let digits = /%n./.test(parts[0]) ? data.format.substring(parts[0].match(/%n./).index + 3 , parts[0].match(/%n./).index + 4) : 1
                                        let suffix = parts[1] ? parts[1] : ''
                                        if(val) result = val.toLocaleString(this.app.options.lang, { minimumFractionDigits: digits, maximumFractionDigits: digits }) + suffix
                                        return result
                                    }
                                }
                            }

                            if(chart.options.yaxis && chart.options.yaxis[data.id]) {
                                chart.options.yaxis[data.id].labels = formatDef.labels
                            } else {                    
                                if(typeof chart.options.yaxis === 'undefined') chart.options.yaxis = [];
                                chart.options.yaxis.push(formatDef);
                            }
                        }

                        series.push(serie);
                    }
                }
            })
            .finally(() => {
                //chart.options = Object.assign({}, chart.options)
                chart.series = series
            })
    }

    function x_setTimeStep(time, ts, timeSpan) {
        if(!ts) time.setTime(time.getTime() - 1000);

        switch(timeSpan) {
          case 'hour':
            time.setTime(time.getTime() + (1 * 60 * 60 * 1000))
            break
          case 'day':
            time.setDate(time.getDate() + 1)
            break
          case 'week':
            time.setDate(time.getDate() + 7)
            break
          case 'month':
            time.setMonth(time.getMonth() + 1)
            break
          default:
            while (time < ts) time.setMilliseconds(time.getMilliseconds() + this.timeSteps)
        }

        return time
    }

    function x_handleLogData(data, calcMode) {
        let result = [],
            valCalc,
            valLast,
            valDelta,
            itemPart,
            ts,
            val,
            cnt = 1,
            calc = calcMode ? calcMode.split('-')[0] : null,
            timeSpan = calcMode ? calcMode.split('-')[1] : null,
            time = setTimeStep(new Date(from.value + 'T00:00:00'), null, timeSpan),
            items = data.split('\n')

        if(items.length > 3) items.splice(-3, 3)
        if(calc == 'raw' && items.length > window.innerWidth) calc = null

        for(const [idx, item] of items.entries()) {
            itemPart = item.split(' ')
            ts = new Date(itemPart[0].replace('_','T'))
            val = parseFloat(itemPart[1])

            if(calc == 'raw') {
                if(val != valLast || items.length == idx + 1) result.push([Date.parse(ts), val])
                valLast = val
            } else {
                if(ts < time && idx + 1 < items.length ) {
                switch(calc) {
                    case 'min':
                    if(val < valCalc || !valCalc) valCalc = val
                    break
                    case 'max':
                    if(val > valCalc || !valCalc) valCalc = val
                    break
                    case 'delta': 
                    if(!valDelta) valDelta = val                             
                    break
                    default:
                    if(valCalc) cnt ++
                    valCalc += val
                }
                } else {
                    if(calc == 'delta' && valDelta) valCalc = val - valDelta
                    if(!valCalc && calc != 'delta') valCalc = val
                    if(!calc || calc == 'avg') valCalc = valCalc / cnt
                    if(valCalc) result.push([Date.parse(time), valCalc])
                    time = setTimeStep(time, ts, timeSpan)
                    valLast = valCalc
                    valCalc = null
                    valDelta = null
                    cnt = 1
                }
            }
        }

        return result
    }

    async function readLogData() {
        let res = [],
            cmd,            
            logData

        for(const [idx, serie] of Object.entries(series.value)) {
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
    <apexchart type="line" :series="chart.series" :options="chart.options"></apexchart>