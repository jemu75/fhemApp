<template>
  <div>
    <v-row>
      <component
        :is="item.Options.component"
        v-for="item in app.data.deviceList"
        :key="item.Internals.FUUID"
        :item="item"
      />
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'DevicesView',
  components: {
    templ_default: () => import('@/components/TemplDefault.vue'),
    templ_panel: () => import('@/components/TemplPanel.vue'),
    templ_chart: () => import('@/components/TemplChart.vue'),
    templ_weather: () => import('@/components/TemplWeather.vue'),
    templ_list: () => import('@/components/TemplList.vue'),
    templ_scenes: () => import('@/components/TemplScenes.vue'),
    templ_sonos: () => import('@/components/TemplSonos.vue'),
    templ_sysmon: () => import('@/components/TemplSysmon.vue'),
    templ_hmlan: () => import('@/components/TemplHmLan.vue'),
    templ_cam: () => import('@/components/TemplCam.vue'),
    templ_iframe: () => import('@/components/TemplIFrame.vue')
  },
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

  watch: {
    $route() {
      this.subscribe();
    },

    'app.session.ready'(val) {
      if(val) this.subscribe();
    }
  },

  mounted() {
    this.app.session = this.$fhem.app.session;
    this.app.options = this.$fhem.app.options;
    this.app.data = this.$fhem.app.data;
  },

  methods: {
    setHeader() {
      // this.app.options.mobileHeader can be deprecated because of new param mobileHeaderContent
      if(this.app.options.mobileHeader || this.app.options.mobileHeaderContent === 'page') {
        if(this.$route.name === 'Devices') {
          if(this.$route.params.filter.match('device=')) {
            this.$fhem.app.appBar.mobileHeader = '';
          } else {
            this.$fhem.app.appBar.mobileHeader = this.$route.params.filter.split('=')[1];
          }
        } else {
          this.$fhem.app.appBar.mobileHeader = this.$route.name;
        }
      }
    },

    subscribe() {
      let fltr = this.$route.params.filter || this.$route.path;

      this.setHeader();
      this.$fhem.getDevices(fltr);
    },
  }
}
</script>
