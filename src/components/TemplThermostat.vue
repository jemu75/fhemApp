<template>
  <v-col class="col-12 col-sm-6 col-md-4 col-lg-4" :order="vals.order">
    <v-card :dark="this.$vuetify.theme.dark" color="secondary">
      <v-progress-linear height="7" :value="vals.mainLevel" :color="vals.mainColor" background-color="secondary darken-1"></v-progress-linear>
      <v-card-title class="text-truncate">{{ vals.title }}</v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-row align="center">
          <v-col class="col-3" align="center" v-if="active">
            <v-btn icon @click="set(-0.5)" @mousedown="long(nightTemp)" @mouseup="send()" @touchstart="long(nightTemp)" @touchend="send()">
              <v-icon large>{{ leftIcon }}</v-icon>
            </v-btn>
          </v-col>
          <v-divider vertical v-if="active"></v-divider>
          <v-col align="center">
            <div class="headline font-weight-bold">{{ vals.mainState }}</div>
          </v-col>
          <v-divider vertical v-if="active"></v-divider>
          <v-col class="col-3" align="center" v-if="active">
            <v-btn icon @click="set(0.5)" @mousedown="long(dayTemp)" @mouseup="send()" @touchstart="long(dayTemp)" @touchend="send()">
              <v-icon large>{{ rightIcon }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>

      <v-system-bar color="secondary darken-1">
        <v-icon>{{ vals.systemDayNightIcon }}</v-icon>
        <v-icon>{{ vals.systemIcon }}</v-icon>
        <v-spacer></v-spacer>
        <v-icon>{{ vals.systemTempIcon }}</v-icon>{{ vals.systemTempValue }}
        <v-icon class="ml-1">{{ vals.systemHumIcon }}</v-icon>{{ vals.systemHumValue }}
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
      name: 'thermostat',
      pendingClick: 0,
      timer: false,
      defaultSet: [
        "Connected.receiver.Readings.Activity.Value:^(?!alive):keine Verbindung:100:error"
      ],
      vals: {
        order: '',
        title: '',
        mainState: '',
        mainLevel: 0,
        mainColor: 'success',
        nightTemp: '',
        dayTemp: '',
        systemIcon: '',
        systemDayNightIcon: '',
        systemTempIcon: 'mdi-thermometer',
        systemTempValue: '',
        systemHumIcon: 'mdi-water',
        systemHumValue: '',
        systemActivityIcon: '',
        systemActivityState: '',
        systemBatteryIcon: '',
        systemBatteryState: ''
      },
      leftIcon: 'mdi-minus',
      rightIcon: 'mdi-plus',
      active: true
    }),

    watch: {
      item: {
        immediate: true,
        deep: true,
        handler(val) {
          let measured = this.$fhem.getEl(val, 'Readings', 'measured-temp', 'Value');
          let humidity = this.$fhem.getEl(val, 'Readings', 'humidity', 'Value');
          let mode = this.$fhem.getEl(val, 'Readings', 'controlMode', 'Value');
          let timestamp = this.$fhem.getEl(val, 'Readings', 'state', 'Time');
          let day = this.$fhem.getEl(val, 'Readings', 'R-dayTemp', 'Value');
          let night = this.$fhem.getEl(val, 'Readings', 'R-nightTemp', 'Value');
          let desired = this.$fhem.getEl(val, 'Readings', 'desired-temp', 'Value');
          let activity = this.$fhem.getEl(val, 'Connected', 'receiver', 'Readings', 'Activity', 'Value');
          let battery = this.$fhem.getEl(val, 'Connected', 'receiver', 'Readings', 'batteryLevel', 'Value');
          let rssi = this.$fhem.getEl(val, 'Connected', 'receiver', 'Internals', 'myHMLAN_RSSI');
          let alias = this.$fhem.getEl(val, 'Attributes', 'alias') || val.Name;

          this.nightTemp = parseFloat(night);
          this.dayTemp = parseFloat(day);

          this.vals.title = this.$fhem.getEl(val, 'Options', 'name') || alias;
          this.vals.order = this.$fhem.getEl(val, 'Attributes', 'sortby') || 'last';
          this.vals.mainState = desired + '°C'
          this.vals.mainLevel = parseFloat(measured) < parseFloat(desired) ? 100 : 0;
          this.vals.systemIcon = mode == 'auto' ? 'mdi-clock-time-four-outline' : '';
          this.vals.systemDayNightIcon = parseFloat(desired) === parseFloat(day) ? 'mdi-weather-sunny' : parseFloat(desired) === parseFloat(night) ? 'mdi-weather-night' : '';
          this.vals.systemTempValue = measured + '°C';
          this.vals.systemHumValue = humidity +'%';
          this.vals.systemBatteryIcon = parseFloat(battery) < 2.5 ? 'mdi-battery-10' : 'mdi-battery'
          this.vals.systemBatteryState = battery + 'v';
          this.vals.systemActivityIcon = activity ? activity === 'alive' ? 'mdi-wifi' : 'mdi-wifi-off' : '';
          this.vals.systemActivityState = this.$fhem.getDateTime(timestamp);
          this.vals.systemActivityState += rssi ? ' ' + rssi +'dB' : '';
          this.vals = this.$fhem.handleStates(val, this.vals, this.defaultSet);

          this.active = activity != 'alive' ? false : true;
        }
      }
    },

    methods: {
      set(val) {
        let oldVal = parseFloat(this.item.Readings['desired-temp'].Value);
        let newVal = oldVal + val;

        if(newVal > this.dayTemp) newVal = this.dayTemp;
        if(newVal < this.nightTemp) newVal = this.nightTemp;
        if(newVal == oldVal) return;

        this.item.Readings['desired-temp'].Value = newVal.toFixed(1);
      },
      long(val) {
        this.timer = setInterval(() => {
          this.item.Readings['desired-temp'].Value = val.toFixed(1);
        }, 1000)
      },
      send() {
        this.timer = clearInterval(this.timer);

        if (this.pendingClick) {
          clearTimeout(this.pendingClick);
          this.pendingClick = 0;
        }

        this.pendingClick = setTimeout(() => {
          let cmd = 'set ' + this.item.Name + ' desired-temp ' + this.item.Readings['desired-temp'].Value;
          this.$fhem.request(cmd);
        }, 1000);
      }
    },

    props: {
      item: {}, // jsonObject from FHEM Device
    }
  }
</script>
