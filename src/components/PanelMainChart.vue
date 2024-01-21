<script setup>
    import { ref, computed, onMounted } from 'vue'
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

    const dateSelector = ref({
        from: new Date(),
        to: new Date(),
        fromMenu: false,
        toMenu: false
    })

    const chartStyle = computed(() => {
        return 'height: ' + (fhem.app.panelMaximized ? (window.innerHeight - 250) + 'px' : props.height)
    })

    const option = ref({})

    const loaded = ref(false)

    function toLocaleDate(val) {
        return i18n.d(val, { dateStyle: mobile.value ? 'short' : 'long' })
    }

    function getDate(val) {

        if(typeof val === 'object') {
            const offset = val.getTimezoneOffset()
            const newDate = new Date(val.getTime() - (offset * 60 * 1000))
            val = newDate.toISOString().split('T')[0]
        }

        if(isNaN(val)) {
            return val
        } else {
            return ( d => new Date(d.setDate(d.getDate() + (Number(val) || 0))).toISOString() )(new Date).split('T')[0]
        }
    }

    async function readLogData(cmd, digits, update) {
        let cmdParts = cmd.split(' '),
            logData,
            rows = [],
            ts,
            val,
            res = []

        for(const device of props.devices) if(device.split(':')[0] === cmdParts[1]) cmdParts[1] = device.split(':')[1]
        cmdParts[4] = getDate(update === 'from' ? getDate(dateSelector.value.from) : cmdParts[4])
        cmdParts[5] = getDate(update === 'to' ? getDate(dateSelector.value.to) : cmdParts[5])

        if(!update) {
            dateSelector.value.from = new Date(cmdParts[4])
            dateSelector.value.to = new Date(cmdParts[5])
        }

        logData = await fhem.request('text', cmdParts.join(' '))

        rows = logData.split('\n')

        if(rows.length > 0) {
            for(const row of rows) {
                ts = new Date(row.split(' ')[0].replace('_','T'))
                val = parseFloat(row.split(' ')[1]).toFixed(digits)

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

    async function loadSeries(update) {
        let data,
            defs = fhem.handleDefs(props.el.serie, ['data', 'name', 'digits', 'suffix', 'type'], [null, '', 0, '', 'line'], true),
            opts = {
                tooltip: { trigger: 'axis' },
                legend: { data: [], bottom: 10 },
                backgroundColor: 'rgba(255, 255, 255, 0)',
                grid: { top: 30, bottom: 60, left: 60, right: 60 },
                animationDuration: 300,
                series: [],
                yAxis: [],
                xAxis: {}
            },
            presets = JSON.parse(JSON.stringify(fhem.getEl(props.el, ['options']) || {})),
            presetSeries = [],
            axisLabel

        if(update) dateSelector.value[update + 'Menu'] = false

        loaded.value = false

        if(defs.length > 0) {
            if(presets.series && presets.series.length > 0) {
                presetSeries = presets.series
                delete presets.series
            }

            for(const [ idx, def ] of Object.entries(defs)) {
                data = /^get.*/.test(def.data) ? await readLogData(def.data, def.digits, update) : readValues(def.data)
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

            fhem.log(7, 'Chartdata loaded.', opts)

            option.value = Object.assign({}, opts)
            loaded.value = true
        }        
    }

    onMounted(() => {
        loadSeries()               
    })
</script>

<template>
    <div v-if="fhem.app.panelMaximized" class="mx-4 my-4 text-right">
        <v-menu
            v-model="dateSelector.fromMenu"
            :close-on-content-click="false">
            
            <template v-slot:activator="{ props }">
                <v-btn 
                    v-bind="props" 
                    variant="outlined" 
                    append-icon="mdi-calendar"
                    class="mr-2">
                    {{ toLocaleDate(dateSelector.from) }}
                </v-btn>
            </template>
            
            <v-locale-provider :locale="i18n.locale.value">
                <v-date-picker 
                    v-model="dateSelector.from" 
                    color="secondary" 
                    @update:model-value="loadSeries('from')">
                </v-date-picker>
            </v-locale-provider>
        </v-menu>
        -
        <v-menu
            v-model="dateSelector.toMenu"
            :close-on-content-click="false">
            
            <template v-slot:activator="{ props }">
                <v-btn 
                    v-bind="props" 
                    variant="outlined" 
                    append-icon="mdi-calendar"
                    class="ml-2">
                    {{ toLocaleDate(dateSelector.to) }}
                </v-btn>
            </template>
            
            <v-locale-provider :locale="i18n.locale.value">
                <v-date-picker 
                    v-model="dateSelector.to" 
                    color="secondary" 
                    @update:model-value="loadSeries('to')">
                </v-date-picker>
            </v-locale-provider>
        </v-menu>
    </div>

    <div :style="chartStyle">
        <v-skeleton-loader v-if="!loaded" type="text, image, text" />
        <v-chart v-if="loaded" :option="option" :theme="theme.global.name.value === 'dark' ? 'dark' : 'light'" autoresize />
    </div>
</template>
