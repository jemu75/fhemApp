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
      name: 'custom',
      setup: {
        status: {
          line: [],
          error: []
        },
        main: [],
        info: {
          left1: [],
          left2: [],
          mid1: [],
          mid2: [],
          right1: [],
          right2: []
        }
      },
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

          this.$fhem.checkVal(val, this.setup.status.line);
        }
      },

      setup: {
        deep: true,
        handler() {
          this.$fhem.checkVal(this.item, this.setup.status.line);
        }
      }
    },

    props: {
      item: {}, // jsonObject from FHEM Device
    },

    created() {
      let file = this.$fhem.getEl(this.item, 'Options', 'customDef');

      if(file) {
        fetch('./cfg/' + file + '.json')
          .then(res => res.json())
          .catch((err) => {
            this.$fhem.log = { type: 'error', message: 'wrong definition in ./cfg/' + file + '.json', meta: err };
          })
          .then(cfg => {
            if(cfg.status) Object.assign(this.setup.status, cfg.status);
            if(cfg.main) Object.assign(this.setup.main, cfg.main);
            if(cfg.info) Object.assign(this.setup.info, cfg.info);
          })
      }
    }
  }
</script>
