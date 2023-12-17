<script setup>
    import { useFhemStore } from '@/stores/fhem'
    import { useDisplay } from 'vuetify'
    import { computed, ref } from 'vue'

    const preLang = '_app.settings.colors.'

    const { mobile } = useDisplay()

    const fhem = useFhemStore()

    const newKey = ref()

    const themes = computed(() => {
        return Object.keys(fhem.app.config.colors)
    })

    const colorKeys = computed(() => {
        let res = []

        for(const theme of themes.value) {
            for(const colorKey of Object.keys(fhem.app.config.colors[theme])) if(res.indexOf(colorKey) === -1) res.push(colorKey)
        }

        return res
    })

    function addKey() {
        if(!fhem.app.config.colors.dark) fhem.app.config.colors.dark = {}
        if(!fhem.app.config.colors.light) fhem.app.config.colors.light = {}

        fhem.app.config.colors.dark[newKey.value] = '#E0E0E0'
        fhem.app.config.colors.light[newKey.value] = '#E0E0E0'
        newKey.value = null
    }

    function deleteKey(colorKey) {
        for(const theme of themes.value) {
            delete fhem.app.config.colors[theme][colorKey]
        }
    }

    function openHelp(anchor) {
        window.open(fhem.app.repository + '#' + anchor, '_blank')
    }
</script>

<template>
    <v-list>
        <v-list-item :title="$t(preLang + 'title', 2)">
            <template v-slot:append>
                <v-btn
                color="info"
                icon="mdi-help-circle"
                variant="text"
                @click="openHelp('kopfzeile')">
                </v-btn>
            </template>
        </v-list-item>
        <v-list-item>
            <v-row no-gutters class="text-right">
                <v-col>
                    <v-row v-for="colorKey of colorKeys" :key="colorKey" no-gutters class="pt-3">
                        <v-col v-for="theme of themes" :key="theme" cols="12" lg="" class="pa-2">
                            <v-dialog width="350">
                                <template v-slot:activator="{ props }">
                                    <v-btn 
                                        :text="colorKey + ' [' + theme + '] ' + (fhem.app.config.colors[theme][colorKey] || '')"
                                        :color="fhem.app.config.colors[theme][colorKey]"
                                        v-model="fhem.app.config.colors[theme][colorKey]"                                        
                                        size="large"
                                        width="350"
                                        v-bind="props"
                                        >
                                    </v-btn>
                                </template>

                                <template v-slot:default="{ isActive }">
                                    <v-card>
                                            <v-color-picker 
                                                v-model="fhem.app.config.colors[theme][colorKey]"                                    
                                                show-swatches
                                                mode="hexa"
                                                width="350"
                                                elevation="0"
                                                swatches-max-height="400px">
                                            </v-color-picker>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn @click="isActive.value = false">ok</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-dialog>
                        </v-col>
                        <v-col cols="12" lg="1" class="pt-1">
                            <v-btn variant="text" icon="mdi-delete" @click="deleteKey(colorKey)"></v-btn>
                        </v-col>
                        <v-divider v-if="mobile"></v-divider>
                    </v-row>
                </v-col>
                <v-divider v-if="!mobile" vertical class="mx-5"></v-divider>
                <v-col cols="12" lg="3">
                    <v-row no-gutters class="pt-3">
                        <v-col class="pt-2">
                            <v-text-field 
                                density="compact" 
                                variant="outlined"
                                clearable
                                :label="$t(preLang + 'newKey')"                                
                                v-model="newKey"/>
                        </v-col>
                        <v-col cols="3" class="pt-1">
                            <v-btn 
                                variant="text" 
                                icon="mdi-plus" 
                                @click="addKey()"/>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-list-item>
    </v-list>
</template>