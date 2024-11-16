<script setup>
    import { computed, ref } from 'vue'
    import { useFhemStore } from '@/stores/fhem'

    const props = defineProps({
        el: Object,
        iconmap: Array,
        devices: Object,
        height: String
    })

    const fhem = useFhemStore()

    const item = ref({
        value: null,
        changed: false
    })

    const textfield = computed(() => {
        let res = fhem.handleDefs(props.el.textfield, ['cmd', 'current', 'label', 'placeholder', 'type', 'icon', 'color'], ['', '', '', '', 'text', 'mdi-send', 'success'])

        item.value.value = res.current

        return res
    })

    function doCmd() {
        let cmd = textfield.value.cmd

        cmd = fhem.replacer(cmd, item.value.value)
        cmd = cmd.replace('%v', item.value.value)
        for(const device of props.devices) cmd = cmd.replace(' ' + device.split(':')[0] + ' ', ' ' + device.split(':')[1] + ' ')

        fhem.request('text', cmd)

        item.value.changed = false
    }

    /*
    Eingabefeld
    soll einen Wert empfangen reading
    soll einen Wert senden -> set [device] %v
    soll ein Label bekommen
    soll ein Platzhalter bekommen
    soll Eingabeformat definieren (validierung)
    
    soll ein Icon bekommen (Senden)
    soll eine Iconfarbe bekommen (color)

        bei Datum/Uhrzeit -> current in ISO umwandeln -> Eingabe validieren -> Eingabe in Ausgabe umwandeln
        type = date, time, datetime, text, number
        bei date/time/datetime -> output as iso

    reading:value:cmd:current:label:placeholder:type:icon:color
    */
</script>

<template>
    <v-text-field
        v-model="item.value"
        :label="textfield.label"
        :placeholder="textfield.placeholder"
        variant="outlined"
        density="compact"
        :type="textfield.type"
        hide-details
        class="mx-3"
        @input="item.changed = true"
        >
        <template v-slot:append>
            <v-btn 
                :icon="textfield.icon"
                :color="item.changed ? textfield.color : ''"
                :disabled="!item.changed"
                density="compact"
                variant="plain"
                @click="doCmd()"
                >
            </v-btn>
        </template>
    </v-text-field>
</template>

<style>
    /* Hide the spin buttons in WebKit browsers */
    input::-webkit-inner-spin-button,
    input::-webkit-outer-spin-button,
    input::-webkit-calendar-picker-indicator {
        display: none;
        -webkit-appearance: none;
        margin: 0;
    }

    input {
        -moz-appearance:textfield;
    }
</style>