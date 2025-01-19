import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/main.css'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { de, en, fr, es } from 'vuetify/locale'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import theme from './assets/theme'


import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'

import "echarts"

const vuetify = createVuetify({
    locale: {
        locale: 'de',
        fallback: 'en',
        messages: { de, en, fr, es },
    },
    components,
    directives,
    theme,
})

const i18n = createI18n({
    legacy: false,
    globalInjection: true, 
    locale: navigator.language.split('-')[0] || 'de',
    fallbackLocale: 'en',
    messages
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18n)

app.mount('#app')