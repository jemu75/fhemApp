<script setup>
    import { ref } from 'vue'
    import { useFhemStore } from '@/stores/fhem'
   
    import { PrismEditor } from 'vue-prism-editor'
    import 'vue-prism-editor/dist/prismeditor.min.css' // import the styles somewhere

    // import highlighting library (you can use any library you want just return html string)
    import { highlight, languages } from 'prismjs/components/prism-core'
    import 'prismjs/components/prism-clike'
    import 'prismjs/components/prism-javascript'
    import 'prismjs/themes/prism-tomorrow.css' // import syntax highlighting styles

    const props = defineProps({
        type: String,
        typeIdx: Number,
        section: String,
        mainIdx: Number,
        mainSection: String,
        prop: String,
        propDef: String,
        propHelp: String
    })
    //type = panels|templates
    //typeIdx = element im panels bzw. templates array
    //section = main
    //mainIdx = level in main
    //mainSection = panel|left1|left2|mid|right1|right2
    //prop = element welches Array mit Definitionen enthält
    //propDef = Struktur der Definition (reading:filter:...)
    //propHelp = Anker in Helpfile (README.md)

    const fhem = useFhemStore()

    const jsonDef = ref(null)

    const jsonError = ref(null)

    function highlighter(code) {
        return highlight(code, languages.js)
    }

    function changed() {
        let res = fhem.stringToJson(jsonDef.value, true)

        jsonError.value = res.error

        if(!jsonError.value) fhem.app.config[props.type][props.typeIdx][props.section][props.mainIdx][props.mainSection][props.prop] = res.result
    }

    jsonDef.value = JSON.stringify(fhem.app.config[props.type][props.typeIdx][props.section][props.mainIdx][props.mainSection][props.prop], null, '\t')
</script>

<template>
    <v-card :variant="jsonError ? 'tonal' : 'outlined'" :color="jsonError ? 'error' : ''"  class="pa-1 mt-2">
        <prism-editor
            v-model="jsonDef"
            :highlight="highlighter"            
            line-numbers
            @input="changed">
        </prism-editor>
        <v-alert v-if="jsonError" color="error" density="compact">{{ jsonError }}</v-alert>
    </v-card>
</template>

<style>
  .prism-editor__textarea:focus {
    outline: none;
  }
</style>