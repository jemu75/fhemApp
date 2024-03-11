<script setup>
    import { useFhemStore } from '@/stores/fhem'
    import { useI18n } from 'vue-i18n'
    import { computed, ref } from 'vue'

    const preLang = '_app.settings.content.'

    const fhem = useFhemStore()

    const i18n = useI18n()

    const settings = ref({
        search: '',
        pageSize: 10,
        newKey: null,
        editKey: false,
        lang: null,
        newLang: null,
        isLangValid: false,
        isKeyValid: false
    })

    const headers = computed(() => {
        let res = [
            { key: 'key', title: i18n.t(preLang + 'key'), sortable: true, align: 'start' }            
        ]

        for(const lang of languages.value) res.push({ key: lang, title: lang, sortable: true, align: 'start' })

        res.push({ key: 'actions', title: '', sortable: false, align: 'end' })

        return res
    })

    const items = computed(() => {
        let res = [],
            idx

        for(const lang of Object.keys(fhem.app.config.content)) {
            for(const contentKey of Object.keys(fhem.app.config.content[lang])) {
                if(res.map((e) => e.key).indexOf(contentKey) === -1) res.push({ key: contentKey, title: contentKey })
            }
        }

        for(const lang of Object.keys(fhem.app.config.content)) {
            for(const contentKey of Object.keys(fhem.app.config.content[lang])) {
                idx = res.map((e) => e.key).indexOf(contentKey)
                res[idx][lang] = fhem.app.config.content[lang][contentKey]
            }
        }

        return res
    })

    const languages = computed(() => {
        return Object.keys(fhem.app.config.content)
    })

    const rules = {
        iso639code: value => /^(?:[a-z]{2}|)$/.test(value) || fhem.replacer('%t(_app.settings.rules.iso639code)'),
        uniqueLang: value => languages.value.indexOf(value) === -1 || fhem.replacer('%t(_app.settings.rules.langUnique)'),
        uniqueKey: value => items.value.map((e) => e.key).indexOf(value) === -1 || fhem.replacer('%t(_app.settings.rules.keyUnique)')
    }

    function editKey(key) {
        settings.value.editKey = key ? true : false
        settings.value.newKey = key
    }

    function addKey() {
        fhem.app.config.content[languages.value[0]][settings.value.newKey] = ''
        editKey(settings.value.newKey)
    }

    function addLang() {
        fhem.app.config.content[settings.value.newLang] = {}
        settings.value.newLang = null
    }

    function deleteKey(contentKey) {
        for(const lang of languages.value) {
            delete fhem.app.config.content[lang][contentKey]
        }
    }

    function deleteLang() {
        delete fhem.app.config.content[settings.value.lang]
        settings.value.lang = null
    }
</script>

<template>
    <v-list>
        <v-list-item v-if="!settings.editKey" :title="$t(preLang + 'title', 2)">
            <template v-slot:append>
                <v-btn
                color="info"
                icon="mdi-help-circle"
                variant="text"
                @click="fhem.help('sprachen')">
                </v-btn>
            </template>
        </v-list-item>

        <v-list-item v-if="!settings.editKey">
            <v-row no-gutters>
                <v-col cols="12" md="6">
                    <v-form v-model="settings.isLangValid">
                        <v-text-field 
                            v-model="settings.newlang"    
                            :label="$t(preLang + 'newLang')"
                            :rules="[rules.iso639code, rules.uniqueLang]"
                            single-line
                            clearable
                            density="compact" 
                            variant="outlined"
                            class="pr-4">
                            <template v-slot:append>
                                <v-btn
                                    variant="text" 
                                    icon="mdi-plus"
                                    :disabled="!settings.isLangValid || !settings.newLang"
                                    density="compact" 
                                    @click="addLang()">
                                </v-btn>
                            </template>
                        </v-text-field>
                    </v-form>
                </v-col>

                <v-col cols="12" md="6">
                    <v-select
                        v-model="settings.lang"
                        single-line                                
                        :items="languages"
                        :label="$t(preLang + 'title')"                                                
                        density="compact"
                        variant="outlined"
                        class="pr-4">
                        <template v-slot:append>
                            <v-btn
                                variant="text" 
                                icon="mdi-delete"
                                :disabled="languages.length === 0 || languages.indexOf(settings.lang) === -1" 
                                density="compact"
                                @click="deleteLang()">
                            </v-btn>
                        </template>
                    </v-select>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="settings.search"
                        :label="$t(preLang + 'search')"
                        prepend-inner-icon="mdi-magnify"
                        single-line
                        clearable
                        density="compact"
                        variant="outlined"
                        class="pr-4">
                    </v-text-field>
                </v-col>                
                <v-col cols="12" md="6">
                    <v-form v-model="settings.isKeyValid">
                        <v-text-field 
                            v-model="settings.newKey"    
                            :label="$t(preLang + 'newKey')" 
                            :rules="[rules.uniqueKey]"
                            single-line
                            clearable
                            :disabled="languages.length < 1"                        
                            density="compact" 
                            variant="outlined"
                            class="pr-4">
                            <template v-slot:append>
                                <v-btn 
                                    variant="text" 
                                    icon="mdi-plus" 
                                    :disabled="languages.length < 1 || !settings.isKeyValid || !settings.newKey"
                                    density="compact"
                                    @click="addKey()">
                                </v-btn>
                            </template>
                        </v-text-field>
                    </v-form>
                </v-col>
            </v-row>
        </v-list-item>

        <v-list-item v-if="!settings.editKey">
            <v-data-table
                :headers="headers"
                :items="items"
                :items-per-page="settings.pageSize"                
                :search="settings.search"                                              
                density="compact"
                @update:itemsPerPage = "settings.pageSize = $event">
                <template v-slot:item.actions="{ item }">
                    <v-btn 
                        icon="mdi-pencil"
                        variant="plain"
                        density="compact"
                        class="mr-3"
                        @click="editKey(item.key)">
                    </v-btn>
                    <v-btn 
                        icon="mdi-delete"
                        variant="plain"
                        density="compact"
                        @click="deleteKey(item.key)">
                    </v-btn>
                </template>
            </v-data-table>
        </v-list-item>

        <v-list-item v-if="settings.editKey" :title="$t(preLang + 'key', 2) + ' (' + settings.newKey + ')'">
            <v-btn variant="plain" icon="mdi-arrow-up-left" @click="editKey()"></v-btn>
        </v-list-item>

        <v-list-item v-if="settings.editKey">
            <div v-for="lang of languages" :key="lang" class="mt-2">
                <v-text-field 
                    v-model="fhem.app.config.content[lang][settings.newKey]"    
                    :label="lang"
                    clearable
                    density="compact" 
                    variant="outlined">
                </v-text-field>            
            </div>
        </v-list-item>
    </v-list>
</template>