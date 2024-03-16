<script setup>
    import { computed } from 'vue'    
    import { useFhemStore } from '@/stores/fhem'
    import router from '@/router'
    import { useI18n } from 'vue-i18n'

    const fhem = useFhemStore()

    const i18n = useI18n()

    const options = computed(() => {
        let res = [],
            opts = fhem.app.header,
            presets = {
                darkMode: { name: 'darkMode', title: "%t(_app.options.darkMode)" ,icon: 'mdi-theme-light-dark' },
                reloadPage: { name: 'reloadPage', title: "%t(_app.options.reload)", icon: 'mdi-reload' },
                settings: { name:'settings', title: "%t(_app.options.settings)", icon: 'mdi-cogs' }
            }

        if(opts.showDarkMode) res.push(presets.darkMode)
        if(opts.showReloadPage) res.push(presets.reloadPage)
        if(opts.showSettings) res.push(presets.settings)

        res.push(...opts.commands)

        return res
    })

    const langs = computed(() => {
        return Object.keys(i18n.messages.value)
    })

    function setOption(idx) {
        let option = options.value[idx]

        if(option.name === 'reloadPage') location.reload()

        if(option.name === 'settings') router.push({ name: 'settings', query: router.currentRoute.value.query })

        if(option.name === 'darkMode') fhem.changeDarkMode()
        
        if(option.cmd) fhem.request('text', option.cmd)
    }
</script>

<template>
    <v-menu v-if="options.length > 0">
        <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
        </template>

        <v-list>
            <v-list-item v-for="(option, idx) in options"
                rounded="pill"
                :key="idx"
                :prepend-icon="option.icon"
                :title="fhem.replacer(option.title, '')"
                @click="setOption(idx)"
            >
            </v-list-item>
            <v-divider v-if="options.length > 0 && fhem.app.header.showLanguages" class="pb-2"/>
            <v-list-item v-if="fhem.app.header.showLanguages" class="text-center">
                <v-btn-toggle v-model="i18n.locale.value" divided density="compact">
                    <v-btn v-for="lang of langs" :value="lang" size="small" :key="lang">{{ lang }}</v-btn>
                </v-btn-toggle>
            </v-list-item>
        </v-list>
    </v-menu>
</template>