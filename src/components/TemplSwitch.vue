<template>
  <v-col class="col-12 col-sm-6 col-md-4 col-lg-4" :order="vals.order">
    <v-card :dark="this.$vuetify.theme.dark" color="secondary">
      <v-progress-linear height="7" :value="vals.mainLevel" :color="vals.mainColor" background-color="secondary darken-1"></v-progress-linear>

      <v-card-title class="text-truncate">{{ vals.title }}</v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-row align="center">
          <v-col class="col-3" align="center" v-if="active">
            <v-btn icon v-on:click="set('off')">
              <v-icon large>{{ leftIcon }}</v-icon>
            </v-btn>
          </v-col>
          <v-divider vertical v-if="active"></v-divider>
          <v-col align="center">
            <div class="headline font-weight-bold">{{ vals.mainState }}</div>
          </v-col>
          <v-divider vertical v-if="active"></v-divider>
          <v-col class="col-3" align="center" v-if="active">
            <v-btn icon v-on:click="set('on')">
              <v-icon large>{{ rightIcon }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-system-bar color="secondary darken-1">
        <v-icon>{{ vals.systemIcon }}</v-icon>{{ vals.systemIconValue }}
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on">{{ vals.systemActivityIcon }}</v-icon>
          </template>
          {{ vals.systemActivityState }}
        </v-tooltip>
      </v-system-bar>
    </v-card>
  </v-col>
</template>

<script>
  export default {
    data: () => ({
      name: 'switch',
      defaultSet: [
        "Activity:^(?!alive):keine Verbindung:100:error:mdi-power-plug",
        "Connected.receiver.Readings.Activity:^(?!alive):keine Verbindung:100:error:mdi-power-plug",
        "state:on:an:100:success:mdi-power-plug",
        "state:off:aus:0:success:mdi-power-plug-off"
      ],
      vals: {
        order: '',
        title: '',
        mainState: '',
        mainLevel: 0,
        mainColor: '',
        systemIcon: '',
        systemIconValue: '',
        systemActivityIcon: '',
        systemActivityState: ''
      },
      leftIcon: 'mdi-power-off',
      rightIcon: 'mdi-power-on',
      active: true
    }),

    watch: {
      item: {
        immediate: true,
        deep: true,
        handler(val) {
          let power = this.$fhem.getEl(val, 'Connected', 'power', 'Readings', 'power', 'Value') || this.$fhem.getEl(val, 'Readings', 'power', 'Value');
          let activity = this.$fhem.getEl(val, 'Connected', 'receiver', 'Readings', 'Activity', 'Value') || this.$fhem.getEl(val, 'Readings', 'Activity', 'Value');
          let timestamp = this.$fhem.getEl(val, 'Readings', 'state', 'Time');
          let rssi = this.$fhem.getEl(val, 'Connected', 'receiver', 'Internals', 'myHMLAN_RSSI') || this.$fhem.getEl(val, 'Internals', 'myHMLAN_RSSI');
          if(!activity && rssi) activity = 'alive';
          let alias = this.$fhem.getEl(val, 'Attributes', 'alias') || val.Name;

          this.vals.title = this.$fhem.getEl(val, 'Options', 'name') || alias;
          this.vals.order = this.$fhem.getEl(val, 'Attributes', 'sortby') || 'last';
          this.vals = this.$fhem.handleStates(val, this.vals, this.defaultSet);

          this.vals.systemIconValue = power ? power + 'w' : '';
          this.vals.systemActivityIcon = activity ? activity === 'alive' ? 'mdi-wifi' : 'mdi-wifi-off' : '';
          this.vals.systemActivityState = this.$fhem.getDateTime(timestamp);
          this.vals.systemActivityState += rssi ? ' ' + rssi +'dB' : '';

          this.active = activity && activity != 'alive' ? false : true;
        }
      }
    },

    methods: {
      set(val) {
        let cmd = 'set ' + this.item.Name + ' ' + val;
        this.$fhem.request(cmd)
      }
    },

    props: {
      item: {}, // jsonObject from FHEM Device
    }
  }
</script>
