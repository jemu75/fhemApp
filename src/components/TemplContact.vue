<template>
  <v-col class="col-12 col-sm-6 col-md-4 col-lg-4" :order="vals.order">
    <v-card :dark="this.$vuetify.theme.dark" color="secondary">
      <v-progress-linear height="7" :value="vals.mainLevel" :color="vals.mainColor" background-color="secondary darken-1"></v-progress-linear>

      <v-card-title class="text-truncate">{{ vals.title }}</v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-row align="center">
          <v-col align="center">
            <div class="headline font-weight-bold">{{ vals.mainState }}</div>
          </v-col>
          <v-divider v-if="button" vertical></v-divider>
          <v-col v-if="button" class="col-3" align="center">
            <v-btn icon v-on:click="impuls()">
              <v-icon large>{{ rightIcon }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-system-bar color="secondary darken-1">
        <v-icon>{{ vals.systemIcon }}</v-icon>{{ vals.systemIconValue }}
        <v-spacer></v-spacer>
        {{ vals.systemLastEvent }}
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on">{{ vals.systemActivityIcon }}</v-icon>
          </template>
          {{ vals.systemActivityState }}
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on">{{ vals.systemBatteryIcon }}</v-icon>
          </template>
          {{ vals.systemBatteryState }}
        </v-tooltip>
      </v-system-bar>
    </v-card>
  </v-col>
</template>

<script>
  export default {
    data: () => ({
      name: 'contact',
      defaultSet: [
        "Activity:^(?!alive):keine Verbindung:100:error:mdi-door",
        "sabotageError:on:Fremdeingriff:100:error:mdi-security",
        "cover:open:Fremdeingriff:100:error:mdi-security",
        "state:open:offen:0:success:mdi-door-open",
        "state:closed:geschlossen:100:success:mdi-door"
      ],
      vals: {
        order: '',
        title: '',
        mainState: '',
        mainLevel: 0,
        mainColor: '',
        systemIcon: '',
        systemIconValue: '',
        systemLastEvent: '',
        systemActivityIcon: '',
        systemActivityState: '',
        systemBatteryIcon: '',
        systemBatteryState: ''
      },
      rightIcon: 'mdi-unfold-more-horizontal',
      device: '',
      button: false,
    }),

    watch: {
      item: {
        immediate: true,
        deep: true,
        handler(val) {
          let lastevent = this.$fhem.getEl(val, 'Readings', 'trigger_cnt', 'Time');
          let battery = this.$fhem.getEl(val, 'Readings', 'battery', 'Value');
          let activity = this.$fhem.getEl(val, 'Readings', 'Activity', 'Value');
          let timestamp = this.$fhem.getEl(val, 'Readings', 'state', 'Time');
          let rssi = this.$fhem.getEl(val, 'Internals', 'myHMLAN_RSSI');
          let button = this.$fhem.getEl(val, 'Connected', 'button', 'Name');

          this.vals.order = this.$fhem.getEl(val, 'Attributes', 'sortby') || 'last';
          this.vals.title = this.$fhem.getEl(val, 'Attributes', 'alias') || val.Name;
          this.vals.systemLastEvent = lastevent ? this.$fhem.getDateTime(lastevent) : '';
          this.vals.systemBatteryIcon = battery === 'ok' ? 'mdi-battery' : 'mdi-battery-10';
          this.vals.systemBatteryState = battery;
          this.vals.systemActivityIcon = activity ? activity === 'alive' ? 'mdi-wifi' : 'mdi-wifi-off' : '';
          this.vals.systemActivityState = this.$fhem.getDateTime(timestamp);
          this.vals.systemActivityState += rssi ? ' ' + rssi +'dB' : '';
          this.vals = this.$fhem.handleStates(val, this.vals, this.defaultSet);

          this.device = button;
          this.button = button ? true : false;
        }
      }
    },

    methods: {
      impuls() {
        let cmd = 'set ' + this.device + ' on-for-timer 0.4';
        this.$fhem.request(cmd)
      }
    },

    props: {
      item: {}, // jsonObject from FHEM Device
    }
  }
</script>
