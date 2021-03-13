<template>
  <v-col class="col-12 col-sm-6 col-md-4 col-lg-4" :order="vals.order">
    <v-card :dark="this.$vuetify.theme.dark" color="secondary">
      <v-progress-linear height="7" :value="mainLevelNeg" :color="vals.mainColor" background-color="secondary darken-1"></v-progress-linear>

      <v-card-title class="text-truncate">{{ vals.title }}</v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-row align="center">
          <v-col class="col-3" align="center">
            <v-btn icon @mousedown="start('0')" @mouseup="stop()" @touchstart="start('0')" @touchend="stop()">
              <v-icon large>{{ leftIcon }}</v-icon>
            </v-btn>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col align="center">
            <div class="headline font-weight-bold">{{ vals.mainState }}</div>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col class="col-3" align="center">
            <v-btn icon @mousedown="start('100')" @mouseup="stop()" @touchstart="start('100')" @touchend="stop()">
              <v-icon large>{{ rightIcon }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-system-bar color="secondary darken-1">
        <v-icon>{{ vals.systemIcon }}</v-icon>{{ vals.systemIconValue }}
      </v-system-bar>
    </v-card>
  </v-col>
</template>

<script>
  export default {
    data: () => ({
      name: 'shutter',
      timer: false,
      long: false,
      defaultSet: [
        "motor:up:öffnet...::success:mdi-window-shutter-alert",
        "motor:down:schließt...::success:mdi-window-shutter-alert",
        "pct:100:offen:pct:success:mdi-window-shutter-open",
        "pct:1:offen:pct:success:mdi-window-shutter-open",
        "pct::geschlossen:pct:success:mdi-window-shutter"
      ],
      vals: {
        order: '',
        title: '',
        mainState: '',
        mainLevel: 0,
        mainColor: '',
        systemIcon: '',
        systemIconValue: ''
      },
      leftIcon: 'mdi-chevron-down',
      rightIcon: 'mdi-chevron-up',
    }),

    watch: {
      item: {
        immediate: true,
        deep: true,
        handler(val) {
          let alias = this.$fhem.getEl(val, 'Attributes', 'alias') || val.Name;

          this.vals.title = this.$fhem.getEl(val, 'Options', 'name') || alias;
          this.vals.order = this.$fhem.getEl(val, 'Attributes', 'sortby') || 'last';
          this.vals = this.$fhem.handleStates(val, this.vals, this.defaultSet);
          this.vals.systemIconValue = this.vals.mainLevel + '%';
        }
      }
    },

    computed: {
      mainLevelNeg() {
        return 100 - this.vals.mainLevel;
      }
    },

    methods: {
      set(val) {
        this.item.Readings.pct.Value = val;

        let cmd = 'set ' + this.item.Name + ' ' + this.item.Readings.pct.Value;
        this.$fhem.request(cmd)
      },

      start(val) {
        this.item.Readings.motor.Value.match('stop') ? this.set(val) : this.set('stop');

        this.timer = setInterval(() => {
          this.long = true;
        }, 1000)
      },

      stop() {
        this.timer = clearInterval(this.timer);
        if(this.long) this.set('stop');
        this.long = false;
      }
    },

    props: {
      item: {}, // jsonObject from FHEM Device
    }
  }
</script>
