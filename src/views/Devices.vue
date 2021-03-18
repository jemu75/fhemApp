<template>
  <div>
    <v-row>
      <component v-for="item in app.data.deviceList" v-bind:is="item.Options.component" :item="item" :key="item.Internals.FUUID"></component>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Devices',
  data: () => ({
    app: {
      session: {
        connect: false
      },
      data: {
        deviceList: []
      }
    }
  }),

  components: {
    templ_default: () => import('@/components/TemplDefault.vue'),

    //templ_switch: () => import('@/components/TemplSwitch.vue'),
    //templ_dimmer: () => import('@/components/TemplDimmer.vue'),
    //templ_light: () => import('@/components/TemplLight.vue'),
    //templ_thermostat: () => import('@/components/TemplThermostat.vue'),
    //templ_shutter: () => import('@/components/TemplShutter.vue'),
    //templ_thermometer: () => import('@/components/TemplThermometer.vue'),
    //templ_smokedetect: () => import('@/components/TemplSmokedetect.vue'),
    //templ_contact: () => import('@/components/TemplContact.vue'),
    //templ_motiondetect: () => import('@/components/TemplMotiondetect.vue'),
    //templ_watersensor: () => import('@/components/TemplWatersensor.vue'),

    templ_panel: () => import('@/components/TemplPanel.vue'),
    templ_chart: () => import('@/components/TemplChart.vue'),
    templ_weather: () => import('@/components/TemplWeather.vue'),
    templ_scenes: () => import('@/components/TemplScenes.vue'),
    templ_sonos: () => import('@/components/TemplSonos.vue'),
    templ_sysmon: () => import('@/components/TemplSysmon.vue'),
    templ_hmlan: () => import('@/components/TemplHmLan.vue')
  },

  watch: {
    $route() {
      this.subscribe();
    }
  },

  methods: {
    subscribe() {
      if(!this.app.session.connect) return;
      let fltr = 'appOptions!=:FILTER=';

      if(this.$route.params.filter) {
        let parts = this.$route.params.filter.split('&');

        if(parts.indexOf('options=true') != -1) {
          fltr = 'appOptions=.*' + parts[0].replace('=', '.:..') + '.*';
        } else {
          fltr += parts[0];
        }
      }

      if(this.$route.name == 'Dashboard') fltr = 'appOptions=.*dashboard.:..true.*';
      if(this.$route.name == 'System') fltr = 'appOptions=.*system.:..true.*';
      if(this.$route.name == 'Home') fltr = 'appOptions=.*home.:..true.*';

      this.$fhem.getDevices(fltr);
    }
  },

  mounted() {
    this.app.session = this.$fhem.app.session;
    this.app.options = this.$fhem.app.options;
    this.app.data = this.$fhem.app.data;

    this.$fhem.on('connect', () => this.subscribe());
    this.subscribe();
  }
}
</script>
