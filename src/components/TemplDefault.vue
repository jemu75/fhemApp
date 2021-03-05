<template>
  <v-col class="col-12 col-sm-6 col-md-4 col-lg-4">
    <v-card dark color="secondary">
      <v-progress-linear height="7" :value="mainLevel" :color="mainColor" background-color="secondary lighten-1"></v-progress-linear>

      <v-card-title class="text-truncate">{{ title }}</v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-row align="center">
          <v-col align="center">
            <div class="headline font-weight-bold">{{ state }}</div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-system-bar color="secondary">
        <v-icon>{{ systemIcon }}</v-icon>{{ systemIconValue }}
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on">{{ systemActivityIcon }}</v-icon>
          </template>
          {{ systemActivityState }}
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on">{{ systemBatteryIcon }}</v-icon>
          </template>
          {{ systemBatteryState }}
        </v-tooltip>
      </v-system-bar>
    </v-card>
  </v-col>
</template>

<script>
  export default {
    data: () => ({
      name: 'default',
      mainLevel: 100,
      mainColor: 'accent',
      title: '',
      state: '',
      systemIcon: '',
      systemIconValue: '',
      systemActivityIcon: '',
      systemActivityState: '',
      systemBatteryIcon: '',
      systemBatteryState: ''
    }),

    watch: {
      item: {
        immediate: true,
        deep: true,
        handler(newValue) {
          let alias = newValue.Attributes.alias || '';
          let state = newValue.Readings.state ? newValue.Readings.state.Value : '';
          let battery = newValue.Readings.battery ? newValue.Readings.battery.Value : '';
          let activity = newValue.Readings.Activity ? newValue.Readings.Activity.Value : '';
          let timestamp = newValue.Readings.state ? newValue.Readings.state.Time : '';
          let rssi = newValue.Internals.myHMLAN_RSSI || '';

          this.title = alias;
          this.state = state;
          this.systemBatteryIcon = battery == 'ok' ? 'mdi-battery' : 'mdi-battery-10';
          this.systemIcon = 'mdi-tools';
          this.systemIconValue = newValue.Name;
          this.systemBatteryState = battery;
          this.systemActivityIcon = activity ? activity == 'alive' ? 'mdi-wifi' : 'mdi-wifi-off' : '';
          this.systemActivityState = this.$fhem.getTimestamp(timestamp);
          this.systemActivityState += rssi ? ' ' + rssi +'dB' : '';

          if(activity != 'alive') {
            this.mainLevel = 100;
            this.mainColor = 'error';
            this.state = 'keine Verbindung';
          }

        }
      }
    },

    props: {
      item: {}, // jsonObject from FHEM Device
    }
  }
</script>
