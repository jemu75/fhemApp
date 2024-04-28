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
                settings: { name:'settings', title: "%t(_app.options.settings)", icon: 'mdi-cogs' },
                update: { name: 'update', title: "%t(_app.options.update)", icon: 'mdi-cloud-download-outline' }
            }

        if(opts.showDarkMode) res.push(presets.darkMode)
        if(opts.showReloadPage) res.push(presets.reloadPage)
        if(opts.showSettings) res.push(presets.settings)
        if(opts.showUpdate && fhem.app.updateAvailable) res.push(presets.update)

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

        if(option.name === 'update') fhem.appUpdate()
        
        if(option.cmd) fhem.request('text', option.cmd)
    }
</script>

<template>
    <v-menu v-if="options.length > 0">
        <template v-slot:activator="{ props }">
            <v-badge :model-value="fhem.app.updateAvailable && fhem.app.header.showUpdate" color="error" dot class="mr-2">
                <v-btn icon="mdi-dots-vertical" density="compact" v-bind="props"></v-btn>
            </v-badge>
        </template>

        <v-list>
            <v-list-item v-for="(option, idx) in options"
                rounded="pill"
                :key="idx"
                :title="fhem.replacer(option.title, '')"
                @click="setOption(idx)">
                <template v-slot:prepend>
                    <v-badge :model-value="fhem.app.updateAvailable && option.name === 'update'" color="error" dot>
                        <v-icon :icon="option.icon" density="compact"></v-icon>
                    </v-badge>
                </template>
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