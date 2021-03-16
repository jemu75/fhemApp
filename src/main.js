import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import fhem from './plugins/fhem'
import VueApexCharts from 'vue-apexcharts'

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

Vue.prototype.$fhem = new fhem()

fetch('./cfg/config.json')
  .then(res => res.json())
  .catch(() => null)
  .then(cfg => {
    if(cfg) {
      if(cfg.connection) Object.assign(Vue.prototype.$fhem.app.connection, cfg.connection)
      if(cfg.options) Object.assign(Vue.prototype.$fhem.app.options, cfg.options)
      if(cfg.custom) Object.assign(Vue.prototype.$fhem.app.custom, cfg.custom)
      if(cfg.theme) {
        if(cfg.theme.dark != -1) Object.assign(vuetify.framework.theme, { dark: cfg.theme.dark })
        if(cfg.theme.themes) {
          if(cfg.theme.themes.light) Object.assign(vuetify.framework.theme.themes.light, cfg.theme.themes.light)
          if(cfg.theme.themes.dark) Object.assign(vuetify.framework.theme.themes.dark, cfg.theme.themes.dark)
        }
      }
    }

    new Vue({
      vuetify,
      router,
      render: h => h(App)
    }).$mount('#app')
  })
