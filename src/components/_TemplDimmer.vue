<template>
  <v-col class="col-12 col-sm-6 col-md-4 col-lg-4" :order="vals.order">
    <v-card :dark="this.$vuetify.theme.dark" color="secondary">
      <v-progress-linear height="7" :value="vals.mainLevel" :color="vals.mainColor" background-color="secondary darken-1"></v-progress-linear>

      <v-card-title class="text-truncate">{{ vals.title }}</v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-row align="center">
          <v-col class="col-3" align="center">
            <v-btn icon @click="set(-10)" @mousedown="start(-100)" @mouseup="stop()" @touchstart="start(-100)" @touchend="stop()">
              <v-icon large>{{ leftIcon }}</v-icon>
            </v-btn>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col align="center">
            <div class="headline font-weight-bold">{{ vals.mainState }}</div>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col class="col-3" align="center">
            <v-btn icon @click="set(10)" @mousedown="start(100)" @mouseup="stop()" @touchstart="start(100)" @touchend="stop()">
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
      name: 'dimmer',
      timer: false,
      defaultSet: [
        "pct:1:an:pct:success:mdi-lightbulb",
        "pct::aus:pct:success:mdi-lightbulb-off"
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
      leftIcon: 'mdi-minus',
      rightIcon: 'mdi-plus',
    }),

    watch: {
      item: {
        immediate: true,
        deep: true,
        handler(val) {
          let alias = this.$fhem.getEl(val, 'Attributes', 'alias') || val.Name;

          this.vals.title = this.$fhem.getEl(val, 'Options', 'name') || alias;
          this.vals.order = this.$fhem.getEl(val, 'Attributes', 'sortby') || 'last';
          this.vals = this.$fhem.handleStates(val, this.vals, this.defaultSet)
          this.vals.systemIconValue = this.vals.mainLevel + '%';
        }
      }
    },

    methods: {
      set(val) {
        let oldVal = parseFloat(this.item.Readings.pct.Value);
        let newVal = oldVal + val;

        if(newVal > 100) newVal = 100;
        if(newVal < 0) newVal = 0;

        if(newVal == oldVal) {
          return;
        }

        this.item.Readings.pct.Value = newVal.toString();

        let cmd = 'set ' + this.item.Name + ' pct ' + this.item.Readings.pct.Value;
        this.$fhem.request(cmd)
      },

      stop() {
        this.timer = clearInterval(this.timer)
      },

      start(val) {
        this.timer = setInterval(() => {
          this.set(val);
        }, 1000)
      }
    },

    props: {
      item: {}, // jsonObject from FHEM Device
    }
  }
</script>
