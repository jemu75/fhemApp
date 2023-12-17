<script setup>
    import { useFhemStore } from '@/stores/fhem'
    import { useDisplay } from 'vuetify'
    import { computed, ref } from 'vue'

    const preLang = '_app.settings.content.'

    const { mobile } = useDisplay()

    const fhem = useFhemStore()

    const newKey = ref()

    const language = ref()

    const showNew = ref(false)

    const isFormValid = ref(false)

    const languages = computed(() => {
        return Object.keys(fhem.app.config.content)
    })

    const contentKeys = computed(() => {
        let res = []

        for(const lang of languages.value) {
            for(const contentKey of Object.keys(fhem.app.config.content[lang])) if(res.indexOf(contentKey) === -1) res.push(contentKey)
        }

        return res
    })

    const rules = {
        iso639code: value => /^[a-z]{2}$/.test(value) || fhem.replacer('%t(_app.settings.rules.iso639code)')
    }

    function addKey() {
        fhem.app.config.content[languages.value[0]][newKey.value] = ''
        newKey.value = null
    }

    function addLang() {
        fhem.app.config.content[language.value] = {}
        language.value = null
        showNew.value = false
    }

    function deleteLang() {
        delete fhem.app.config.content[language.value]
        language.value = null
    }

    function deleteKey(contentKey) {
        for(const lang of languages.value) {
            delete fhem.app.config.content[lang][contentKey]
        }
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
                @click="fhem.help('sprachen')">
                </v-btn>
            </template>
        </v-list-item>
        <v-list-item>
            <v-row no-gutters class="text-right">
                <v-col>
                    <v-row v-for="contentKey of contentKeys" :key="contentKey" no-gutters class="pt-3">
                        <v-col v-for="lang of languages" :key="lang" cols="12" lg="" class="pa-2">
                            <v-text-field 
                                density="compact" 
                                variant="outlined" 
                                hide-details
                                clearable
                                :label="contentKey + ' [' + lang + ']'"
                                v-model="fhem.app.config.content[lang][contentKey]"/>
                        </v-col>
                        <v-col cols="12" lg="1" class="pt-1">
                            <v-btn variant="text" icon="mdi-delete" @click="deleteKey(contentKey)"></v-btn>
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
                                :disabled="languages.length < 1"
                                :label="$t(preLang + 'newKey')" 
                                v-model="newKey"/>
                        </v-col>
                        <v-col cols="4" class="pt-1">
                            <v-btn 
                                variant="text" 
                                icon="mdi-plus" 
                                :disabled="languages.length < 1"
                                @click="addKey()"/>
                        </v-col>
                    </v-row>

                    <v-form v-model="isFormValid">
                        <v-row no-gutters>
                            <v-col v-if="showNew">
                                <v-text-field 
                                    density="compact" 
                                    variant="outlined"
                                    clearable                        
                                    :label="$t(preLang + 'newLang')"
                                    :rules="[rules.iso639code]"
                                    append-inner-icon="mdi-help-circle" 
                                    @click:append-inner="openHelp('Sprachcodes')"
                                    v-model="language"/>
                            </v-col>
                            <v-col v-if="showNew" cols="4">
                                <v-btn
                                    variant="text" 
                                    icon="mdi-check"
                                    :disabled="!isFormValid" 
                                    @click="addLang()"/>
                                <v-btn
                                    variant="text" 
                                    icon="mdi-cancel"
                                    @click="showNew = !showNew; language = null"/>
                            </v-col>

                            <v-col v-if="!showNew">
                                <v-autocomplete
                                    v-model="language"                                
                                    :items="languages"
                                    :label="$t(preLang + 'title')"
                                    :disabled="languages.length === 0"
                                    density="compact"
                                    variant="outlined">
                                </v-autocomplete>
                            </v-col>
                            <v-col v-if="!showNew" cols="4">
                                <v-btn
                                    variant="text" 
                                    icon="mdi-plus"                            
                                    @click="showNew = !showNew; language = null"/>
                                <v-btn
                                    variant="text" 
                                    icon="mdi-delete"
                                    :disabled="languages.length === 0 || languages.indexOf(language) === -1" 
                                    @click="deleteLang()"/>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-col>
            </v-row>
        </v-list-item>
    </v-list>
</template>