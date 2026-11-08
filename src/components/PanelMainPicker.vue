<script setup>
    import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
    import { useFhemStore } from '@/stores/fhem'
    import { useI18n } from 'vue-i18n'
    import { VTimePicker } from 'vuetify/labs/VTimePicker'
    const props = defineProps({
        el: Object,
        iconmap: Array,
        devices: Array,
        height: String
    })
    const fhem = useFhemStore()
    const i18n = useI18n()
    const defaultFormats = { date: 'YYYY-MM-DD', time: 'HH:mm', datetime: 'YYYY-MM-DD HH:mm' }
    const wrapper = ref(null)
    const width = ref(0)
    const state = ref({
        menu: false,
        tab: 'date',
        date: null,
        time: null,
        parts: [0, 0, 0],
        period: 'am'
    })
    let observer = null
    let canvas = null
    const picker = computed(() => {
        let res = fhem.handleDefs(props.el.picker, ['cmd', 'current', 'type', 'format', 'step', 'icon', 'color', 'variant'], ['', '', 'date', '', 1, '', '', 'outlined'])
        if(!defaultFormats[res.type]) res.type = 'date'
        if(!res.format) res.format = defaultFormats[res.type]
        res.step = Math.max(1, parseInt(res.step) || 1)
        if(!res.icon) res.icon = res.type === 'time' ? 'mdi-clock-outline' : res.type === 'datetime' ? 'mdi-calendar-clock' : 'mdi-calendar'
        res.icon = fhem.getIcon(res.icon, props.iconmap)
        res.hasDate = res.type !== 'time'
        res.hasTime = res.type !== 'date'
        res.useSeconds = res.hasTime && /s/.test(res.format)
        return res
    })
    const current = computed(() => parseValue(picker.value.current))
    const hourFormat = computed(() => {
        let cycle = new Intl.DateTimeFormat(i18n.locale.value, { hour: 'numeric' }).resolvedOptions().hourCycle
        return cycle === 'h11' || cycle === 'h12' ? 'ampm' : '24hr'
    })
    const allowedMinutes = computed(() => picker.value.step > 1 ? (m) => m % picker.value.step === 0 : null)
    const labels = computed(() => {
        let val = current.value,
            res = [],
            time
        if(!val) return ['--']
        time = picker.value.hasTime ? i18n.d(val, picker.value.useSeconds ? { hour: '2-digit', minute: '2-digit', second: '2-digit' } : { hour: '2-digit', minute: '2-digit' }) : ''
        if(picker.value.hasDate) {
            for(const style of ['long', 'medium', 'short']) res.push([i18n.d(val, { dateStyle: style }), time].join(' ').trim())
        } else {
            res.push(time)
        }
        return res.filter((label, idx) => res.indexOf(label) === idx)
    })
    const display = computed(() => {
        let el = width.value && wrapper.value ? wrapper.value.querySelector('.v-btn') : null,
            avail = width.value,
            style,
            pad = 38,
            iconSpace = 30
        if(!el || !avail) return { text: labels.value[labels.value.length - 1], icon: true }
        style = getComputedStyle(el)
        for(const label of labels.value) if(measure(label, style) + pad + iconSpace <= avail) return { text: label, icon: true }
        for(const label of labels.value.slice(-1)) if(measure(label, style) + pad <= avail) return { text: label, icon: false }
        return { text: '', icon: true }
    })
    function measure(text, style) {
        let ctx,
            spacing = parseFloat(style.letterSpacing) || 0
        if(!canvas) canvas = document.createElement('canvas')
        ctx = canvas.getContext('2d')
        ctx.font = [style.fontStyle, style.fontWeight, style.fontSize, style.fontFamily].join(' ')
        if(style.textTransform === 'uppercase') text = text.toUpperCase()
        return ctx.measureText(text).width + spacing * text.length
    }
    function parseValue(val) {
        let date = null,
            dateMatch,
            timeMatch,
            str
        if(val === null || val === undefined || val === '') return null
        str = String(val).replace(/&#058;/g, ':')
        if(/^\d{10}$/.test(str.trim())) return new Date(Number(str.trim()) * 1000)
        dateMatch = /(\d{4})-(\d{1,2})-(\d{1,2})/.exec(str)
        if(dateMatch) {
            date = new Date(Number(dateMatch[1]), Number(dateMatch[2]) - 1, Number(dateMatch[3]))
        } else {
            dateMatch = /(\d{1,2})\.(\d{1,2})\.(\d{4}|\d{2})(?!\d)/.exec(str)
            if(dateMatch) date = new Date(Number(dateMatch[3].length === 2 ? '20' + dateMatch[3] : dateMatch[3]), Number(dateMatch[2]) - 1, Number(dateMatch[1]))
        }
        timeMatch = /(?:^|[^\d])(\d{1,2}):(\d{2})(?::(\d{2}))?/.exec(dateMatch ? str.slice(dateMatch.index + dateMatch[0].length) : str)
        if(!date && !timeMatch) return null
        if(!date) date = new Date(new Date().setHours(0, 0, 0, 0))
        if(timeMatch) date.setHours(Number(timeMatch[1]), Number(timeMatch[2]), Number(timeMatch[3] || 0), 0)
        return isNaN(date.getTime()) ? null : date
    }
    function formatValue(date, format) {
        const pad = (n) => String(n).padStart(2, '0')
        const tokens = {
            YYYY: date.getFullYear(),
            YY: pad(date.getFullYear() % 100),
            MM: pad(date.getMonth() + 1),
            M: date.getMonth() + 1,
            DD: pad(date.getDate()),
            D: date.getDate(),
            HH: pad(date.getHours()),
            H: date.getHours(),
            mm: pad(date.getMinutes()),
            ss: pad(date.getSeconds()),
            X: Math.floor(date.getTime() / 1000)
        }
        return format.replace(/YYYY|YY|MM|M|DD|D|HH|H|mm|ss|X/g, (token) => tokens[token])
    }
    function toTimeString(date) {
        const pad = (n) => String(n).padStart(2, '0')
        return pad(date.getHours()) + ':' + pad(date.getMinutes()) + (picker.value.useSeconds ? ':' + pad(date.getSeconds()) : '')
    }
    function openMenu() {
        let val = new Date(current.value || new Date()),
            step = picker.value.step
        if(step > 1) val.setMinutes(Math.round(val.getMinutes() / step) * step, 0, 0)
        state.value.date = new Date(val.getFullYear(), val.getMonth(), val.getDate())
        state.value.time = toTimeString(val)
        state.value.parts = [val.getHours(), val.getMinutes(), picker.value.useSeconds ? val.getSeconds() : 0]
        state.value.period = val.getHours() < 12 ? 'am' : 'pm'
        state.value.tab = picker.value.hasDate ? 'date' : 'time'
    }
    function to24(hour, period) {
        if(hourFormat.value !== 'ampm') return hour
        return period === 'pm' ? hour % 12 + 12 : hour % 12
    }
    function timeChanged(idx, val) {
        if(val === null || val === undefined) return
        state.value.parts[idx] = idx === 0 ? to24(val, state.value.period) : val
    }
    function periodChanged(val) {
        state.value.period = val
        state.value.parts[0] = to24(state.value.parts[0] % 12, val)
    }
    function dateSelected() {
        if(picker.value.type === 'datetime') state.value.tab = 'time'
    }
    function getResult() {
        let res = new Date(state.value.date || new Date()),
            time = state.value.parts
        if(!picker.value.hasDate) res = new Date()
        res.setHours(picker.value.hasTime ? time[0] : 0, picker.value.hasTime ? time[1] : 0, picker.value.useSeconds ? time[2] || 0 : 0, 0)
        return res
    }
    function doCmd() {
        let cmd = picker.value.cmd.replace(/%v/g, formatValue(getResult(), picker.value.format))
        for(const device of props.devices) cmd = cmd.replace(' ' + device.split(':')[0] + ' ', ' ' + device.split(':')[1] + ' ')
        fhem.request('text', cmd)
        state.value.menu = false
    }
    watch(() => state.value.menu, (open) => { if(open) openMenu() })
    onMounted(async () => {
        await nextTick()
        if(!wrapper.value) return
        width.value = wrapper.value.clientWidth
        observer = new ResizeObserver((entries) => { for(const entry of entries) width.value = entry.contentRect.width })
        observer.observe(wrapper.value)
    })
    onBeforeUnmount(() => { if(observer) observer.disconnect() })
</script>

<template>
    <div ref="wrapper" class="mx-3 d-flex justify-center" style="flex: 1 1 auto; min-width: 0;">
        <v-menu
            v-model="state.menu"
            :close-on-content-click="false"
            :disabled="!picker.cmd">
            <template v-slot:activator="{ props }">
                <v-btn
                    v-bind="props"
                    :variant="picker.variant"
                    :color="picker.color"
                    :disabled="!picker.cmd"
                    :append-icon="display.text && display.icon ? picker.icon : undefined"
                    :class="display.text ? 'text-truncate' : 'px-2'"
                    style="max-width: 100%; min-width: 0;">
                    <template v-if="display.text">{{ display.text }}</template>
                    <v-icon v-else>{{ picker.icon }}</v-icon>
                </v-btn>
            </template>
            <v-locale-provider :locale="i18n.locale.value">
                <v-card>
                    <v-tabs v-if="picker.type === 'datetime'" v-model="state.tab" grow density="compact">
                        <v-tab value="date" prepend-icon="mdi-calendar"></v-tab>
                        <v-tab value="time" prepend-icon="mdi-clock-outline"></v-tab>
                    </v-tabs>
                    <v-date-picker
                        v-if="state.tab === 'date'"
                        v-model="state.date"
                        color="secondary"
                        @update:model-value="dateSelected()">
                    </v-date-picker>
                    <v-time-picker
                        v-if="state.tab === 'time'"
                        v-model="state.time"
                        color="secondary"
                        :format="hourFormat"
                        :ampm-in-title="hourFormat === 'ampm'"
                        :use-seconds="picker.useSeconds"
                        :allowed-minutes="allowedMinutes"
                        @update:hour="timeChanged(0, $event)"
                        @update:minute="timeChanged(1, $event)"
                        @update:second="timeChanged(2, $event)"
                        @update:period="periodChanged($event)">
                    </v-time-picker>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn variant="text" @click="state.menu = false">{{ $t('_app.picker.cancel') }}</v-btn>
                        <v-btn variant="text" :disabled="picker.hasDate && !state.date" @click="doCmd()">{{ $t('_app.picker.ok') }}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-locale-provider>
        </v-menu>
    </div>
</template>
