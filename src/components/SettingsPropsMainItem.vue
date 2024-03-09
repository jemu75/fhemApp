<script setup>
    import { ref, computed } from 'vue'
    import { useFhemStore } from '@/stores/fhem'
    import draggable from 'vuedraggable'
   
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

    const form = ref()

    const newDef = ref()

    const disable = computed(() => {
        let res = fhem.app.config[props.type][props.typeIdx][props.section][props.mainIdx][props.mainSection][props.prop]
        return res && res.length > 1 ? false : true
    })

    const checkDefs = computed(() => {
        let res = false,
            defs = fhem.app.config[props.type][props.typeIdx][props.section][props.mainIdx][props.mainSection][props.prop]

        if(['menu', 'serie'].indexOf(props.prop) !== -1) return res

        if(defs && defs.length > 1) {
            for(const [idx, def] of Object.entries(defs)) if(!def.split(':')[1] && Number(idx) + 1 < defs.length) return res = true
        }

        return res
    })

    function addDef() { 
        if(!fhem.app.config[props.type][props.typeIdx][props.section][props.mainIdx][props.mainSection][props.prop]) {
            fhem.app.config[props.type][props.typeIdx][props.section][props.mainIdx][props.mainSection][props.prop] = [newDef.value]
        } else {
            fhem.app.config[props.type][props.typeIdx][props.section][props.mainIdx][props.mainSection][props.prop].push(newDef.value)
        }
        
        form.value.reset()
    }

    function deleteDef(idx) {
        fhem.app.config[props.type][props.typeIdx][props.section][props.mainIdx][props.mainSection][props.prop].splice(idx, 1)

        if(fhem.app.config[props.type][props.typeIdx][props.section][props.mainIdx][props.mainSection][props.prop].length === 0) {
            delete fhem.app.config[props.type][props.typeIdx][props.section][props.mainIdx][props.mainSection][props.prop]
        }
    }
</script>

<template>
    <v-alert v-if="checkDefs" type="warning" density="compact" class="my-3">{{ $t('_app.messages.checkDefs.text') }}</v-alert>

    <draggable 
        v-model="fhem.app.config[props.type][props.typeIdx][props.section][props.mainIdx][props.mainSection][props.prop]"            
        animation="300"
        :disabled="disable"
        handle=".dd_zone"
        item-key="id">
        <template #item={index}>
            <v-row no-gutters class="py-3 align-center">
                <v-icon icon="mdi-drag-vertical" class="dd_zone pr-5"></v-icon>
                <v-col>
                    <v-text-field 
                        density="compact" 
                        variant="outlined" 
                        persistent-placeholder
                        hide-details
                        :placeholder="props.propDef"
                        :label="'Definition ' + (index + 1)"
                        v-model="fhem.app.config[props.type][props.typeIdx][props.section][props.mainIdx][props.mainSection][props.prop][index]">
                    </v-text-field>
                </v-col>
                <v-btn variant="plain" density="compact" icon="mdi-delete" @click="deleteDef(index)" class="pl-5"></v-btn>
            </v-row>
        </template>
    </draggable>

    <v-form ref="form">
        <v-row no-gutters class="pt-3 ml-6 align-center">
            <v-col>
                <v-text-field
                    v-model="newDef"    
                    density="compact" 
                    variant="outlined" 
                    persistent-placeholder
                    hide-details
                    :placeholder="props.propDef"
                    label="new Definition"
                    :append-inner-icon="props.propHelp ? 'mdi-help-circle' : ''"
                    clearable
                    @click:append-inner="fhem.help(propHelp)">
                </v-text-field>                        
            </v-col>
            <v-btn variant="plain" icon="mdi-plus" :disabled="!newDef" @click="addDef()" class="mr-5"></v-btn>
        </v-row>
    </v-form>
</template>