<template>
  <v-col class="col-12 col-sm-6 col-md-4 col-lg-4" :order="vals.order">
    <v-card :dark="this.$vuetify.theme.dark" color="secondary">
      <v-progress-linear height="7" :value="vals.mainLevel" :color="vals.mainColor" background-color="secondary lighten-1"></v-progress-linear>

      <v-card-title class="text-truncate">{{ vals.title }}</v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-row align="center">
          <v-col class="col-3" align="center">
            <v-btn icon v-on:click="set('off')">
              <v-icon large>{{ leftIcon }}</v-icon>
            </v-btn>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col align="center">
            <div class="headline font-weight-bold">{{ vals.mainState }}</div>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col class="col-3" align="center">
            <v-btn icon v-on:click="set('on')">
              <v-icon large>{{ rightIcon }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-system-bar color="secondary darken-1">
        <v-icon>{{ vals.systemIcon }}</v-icon>
      </v-system-bar>
    </v-card>
  </v-col>
</template>

<script>
  export default {
    data: () => ({
      name: 'light',
      defaultSet: [
        "state:on:an:100:success:mdi-lightbulb",
        "state:off:aus:0:success:mdi-lightbulb-off"
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
      leftIcon: 'mdi-power-off',
      rightIcon: 'mdi-power-on'
    }),

    watch: {
      item: {
        immediate: true,
        deep: true,
        handler(val) {
          this.vals.order = this.$fhem.getEl(val, 'Attributes', 'sortby') || 'last';
          this.vals.title = this.$fhem.getEl(val, 'Attributes', 'alias') || val.Name;
          this.vals = this.$fhem.handleStates(val, this.vals, this.defaultSet);
        }
      }
    },

    methods: {
      set(val) {
        this.item.Readings.state.Value = val;

        let cmd = 'set ' + this.item.Name + ' ' + this.item.Readings.state.Value;
        this.$fhem.request(cmd)
      }
    },

    props: {
      item: {}, // jsonObject from FHEM Device
    }
  }
</script>
