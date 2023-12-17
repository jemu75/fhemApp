<script setup>
    import { ref } from 'vue'
    import { useFhemStore } from '@/stores/fhem'
   
    const props = defineProps({
        type: String,
        typeIdx: Number,
        section: String,
        prop: String,
        propDef: String,
        propHelp: String
    })

    //type = panels|templates
    //typeIdx = element im panels bzw. templates array
    //section = null|status|info|main
    //prop = element welches Array mit Definitionen enthält
    //propDef = Struktur der Definition (reading:filter:...)
    //propHelp = Anker in Helpfile (README.md)

    const fhem = useFhemStore()

    const form = ref()

    const newDef = ref()

    function addDef() { 
        if(!fhem.app.config[props.type][props.typeIdx][props.section][props.prop]) {
            fhem.app.config[props.type][props.typeIdx][props.section][props.prop] = [newDef.value]
        } else {
            fhem.app.config[props.type][props.typeIdx][props.section][props.prop].push(newDef.value)
        }
        
        form.value.reset()
    }

    function deleteDef(idx) {
        fhem.app.config[props.type][props.typeIdx][props.section][props.prop].splice(idx, 1)

        if(fhem.app.config[props.type][props.typeIdx][props.section][props.prop].length === 0) {
            delete fhem.app.config[props.type][props.typeIdx][props.section][props.prop]
        }
    }
</script>

<template>
    <v-list>
        <v-list-item v-if="fhem.app.config[props.type][props.typeIdx][props.section][props.prop]" class="pa-0">
            <v-row v-for="(def, idx) of fhem.app.config[props.type][props.typeIdx][props.section][props.prop]" :key="idx" no-gutters class="pt-3">
                <v-col>
                    <v-text-field
                        density="compact" 
                        variant="outlined" 
                        persistent-placeholder
                        :placeholder="props.propDef"
                        :label="'Definition ' + (idx + 1)"
                        v-model="fhem.app.config[props.type][props.typeIdx][props.section][props.prop][idx]">
                    </v-text-field>
                </v-col>
                <v-col cols="1" class="text-right">
                    <v-btn variant="text" icon="mdi-delete" @click="deleteDef(idx)"></v-btn>
                </v-col>
            </v-row>
        </v-list-item>
        <v-list-item class="pa-0">
            <v-form ref="form">
                <v-row no-gutters class="pt-3">
                    <v-col>
                        <v-text-field
                            v-model="newDef"    
                            density="compact" 
                            variant="outlined" 
                            persistent-placeholder
                            :placeholder="props.propDef"
                            label="new Definition"
                            :append-inner-icon="props.propHelp ? 'mdi-help-circle' : ''"
                            clearable
                            @click:append-inner="fhem.help(propHelp)">
                        </v-text-field>                        
                    </v-col>
                    <v-col cols="1" class="text-right">                                                
                        <v-btn variant="text" icon="mdi-plus" :disabled="!newDef" @click="addDef()"></v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-list-item>
    </v-list>
</template>