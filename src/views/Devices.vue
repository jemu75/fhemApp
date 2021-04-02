<template>
  <div>
    <v-row>
      <component v-for='item in app.data.deviceList' v-bind:is='item.Options.component' :item='item' :key='item.Internals.FUUID'></component>
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
      options: {
        mobileHeader: false
      },
      data: {
        deviceList: [],
        header: ''
      }
    }
  }),

  components: {
    templ_default: () => import('@/components/TemplDefault.vue'),
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
    setHeader() {
      if(this.app.options.mobileHeader) {
        if(this.$route.name === 'Devices') {
          let part = this.$route.params.filter.split('&')[0].split('=')[1];
          this.app.data.header = part.replace(/\\s.\\s/g,' & ');
        } else {
          this.app.data.header = this.$route.name;
        }
      }
    },

    subscribe() {
      if(!this.app.session.connect) return;
      let fltr = 'appOptions!=:FILTER=';

      if(this.$route.params.filter) {
        let parts = this.$route.params.filter.split('&');

        if(parts.indexOf('appOptions=room') != -1 || parts.indexOf('appOptions=group') != -1) {
          fltr = 'appOptions=.*' + parts[0].replace('=', '.*') + '.*';
        } else {
          fltr += parts[0];
        }
      }

      if(this.$route.name == 'Dashboard') fltr = 'appOptions=.*dashboard.:..true.*';
      if(this.$route.name == 'System') fltr = 'appOptions=.*system.:..true.*';
      if(this.$route.name == 'Home') fltr = 'appOptions=.*home.:..true.*';

      this.setHeader();
      this.$fhem.getDevices(fltr);
    }
  },

  mounted() {
    this.app.session = this.$fhem.app.session;
    this.app.options = this.$fhem.app.options;
    this.app.data = this.$fhem.app.data;

    this.$fhem.app.componentMap = [
      { name: 'panel', component: 'templ_panel' },
      { name: 'chart', component: 'templ_chart' },
      { name: 'weather', component: 'templ_weather' },
      { name: 'sysmon', component: 'templ_sysmon' },
      { name: 'hmlan', component: 'templ_hmlan' },
      { name: 'sonos', component: 'templ_sonos' },
      { name: 'scenes', component: 'templ_scenes' }
    ];

    this.$fhem.on('connect', () => this.subscribe());
    this.subscribe();
  }
}
</script>
