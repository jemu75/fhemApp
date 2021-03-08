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

fetch('/config.json')
  .then(res => res.json())
  .catch(() => {
    return {
      connection: {},
      options: {},
      theme: {}
    }
  })
  .then(cfg => {
    if(cfg.connection) Object.assign(Vue.prototype.$fhem.app.connection, cfg.connection)
    if(cfg.options) Object.assign(Vue.prototype.$fhem.app.options, cfg.options)
    if(cfg.theme) Object.assign(vuetify.framework.theme, cfg.theme)

    new Vue({
      vuetify,
      router,
      render: h => h(App)
    }).$mount('#app')
  })
