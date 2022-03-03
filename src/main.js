import 'typeface-roboto'
import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueApexCharts from 'vue-apexcharts'
import i18n from './plugins/i18n'
import fhem from './plugins/fhem'

Vue.use(fhem, vuetify, i18n)

Vue.use(VueApexCharts)
Vue.component('apex-chart', VueApexCharts)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
