import 'typeface-roboto'
import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import fhem from './plugins/fhem'
import VueApexCharts from 'vue-apexcharts'
import i18n from './plugins/i18n'
import fhem2 from './plugins/fhem2'

Vue.use(fhem2, vuetify, i18n)

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

Vue.prototype.$fhem = new fhem()

new Vue({
  vuetify,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
