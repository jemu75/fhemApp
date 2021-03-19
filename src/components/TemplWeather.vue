<template>
  <v-col class="col-12 col-sm-6 col-md-4 col-lg-4">
    <v-card :dark="this.$vuetify.theme.dark" color="secondary">
      <v-progress-linear height="7" :value="vals.mainLevel" :color="vals.mainColor" background-color="secondary darken-1"></v-progress-linear>

      <v-card-title class="text-truncate">
        {{ vals.title }}
        <v-spacer></v-spacer>
        <v-btn small icon @click="expand">
          <v-icon small>{{ maxIcon }}</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-row align="center">
          <v-col align="center">
            <div class="headline font-weight-bold">{{ vals.mainState }}</div>
          </v-col>
        </v-row>

        <v-row v-if="expanded" align="center">
          <v-col align="center">
            <div>Luftdruck</div>
            <div class="headline font-weight-bold">{{ vals.pressure }}</div>
          </v-col>
          <v-col align="center">
            <div>Wind</div>
            <div class="headline font-weight-bold">{{ vals.wind }}</div>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider v-if="expanded"></v-divider>

      <v-card-text v-if="expanded">
        <v-row v-for="day in vals.forecast" :key="day.weekday" align="center">
          <v-col class="col-2" align="center">
            <v-icon large>{{ day.icon }}</v-icon>
          </v-col>
          <v-col class="text-truncate">
            <h3>{{ day.weekday }}</h3>
            <span>{{ day.condition }}</span>
          </v-col>
          <v-col class="col-2 pl-0" align="center">
            <div>{{ day.temp_max }}</div>
            <div>{{ day.temp_min }}</div>
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
      </v-system-bar>
    </v-card>
  </v-col>
</template>

<script>
  export default {
    data: () => ({
      name: 'weather',
      iconSet: {
        // Weather Darksky - Icons
        sunny: 'mdi-weather-sunny',
        fog: 'mdi-weather-fog',
        cloudy: 'mdi-weather-cloudy',
        partly_cloudy: 'mdi-weather-partly-cloudy',
        partly_cloudy_night: 'mdi-weather-night-partly-cloudy',
        chance_of_rain: 'mdi-weather-partly-rainy',

        clear_day: 'mdi-weather-sunny',
        hail: 'mdi-weather-hail',
        rain: 'mdi-weather-rainy',
        sleet: 'mdi-weather-snowy-rainy',
        snow: 'mdi-weather-snowy',
        thunderstorm: 'mdi-weather-lightning',
        windy: 'mdi-weather-windy',
        clear_night: 'mdi-weather-night'
      },
      weekdays: {
        Mo: 'Montag',
        Di: 'Dienstag',
        Mi: 'Mittwoch',
        Do: 'Donnerstag',
        Fr: 'Freitag',
        Sa: 'Samstag',
        So: 'Sonntag'
      },
      vals: {
        title: '',
        mainLevel: 0,
        mainColor: 'success',
        mainState: '',
        pressure: '',
        wind: '',
        forecast: [],
        systemIcon: '',
        systemIconValue: '',
        systemLastEvent: '',
      },
      maxIcon: 'mdi-arrow-expand',
      expanded: false,
      active: true,
    }),

    watch: {
      item: {
        immediate: true,
        deep: true,
        handler(val) {
          let lastevent = this.$fhem.getEl(val, 'Readings', 'validity', 'Time');
          let activity = this.$fhem.getEl(val, 'Readings', 'validity', 'Value');
          let icon = this.$fhem.getEl(val, 'Readings', 'icon', 'Value');
          let press = this.$fhem.getEl(val, 'Readings', 'pressure', 'Value');
          let wind = this.$fhem.getEl(val, 'Readings', 'wind_condition', 'Value');
          let alias = this.$fhem.getEl(val, 'Attributes', 'alias') || val.Name;

          this.vals.title = this.$fhem.getEl(val, 'Options', 'name') || alias;
          this.vals.mainState = this.$fhem.getEl(val, 'Readings', 'condition', 'Value') || '';

          this.vals.systemIcon = this.getIcon(icon);
          this.vals.pressure = press ? parseInt(press).toLocaleString('de-DE') + 'hPa' : '';
          this.vals.wind = wind ? wind.split(':')[1] : '';

          this.vals.systemLastEvent = lastevent ? this.$fhem.getDateTime(lastevent) : '';
          this.vals.systemActivityIcon = activity === 'up-to-date' ? 'mdi-sync' : 'mdi-sync-off';
          this.vals.systemActivityState = activity;

          if(activity != 'up-to-date') {
            this.active = false;
            this.vals.mainLevel = 100;
            this.vals.mainColor = 'error';
            this.vals.mainState = 'nicht aktuell';
          }
        }
      }
    },

    methods: {
      getIcon(icon) {
        if(icon && this.iconSet[icon]) {
          return this.iconSet[icon];
        } else {
          this.vals.systemIconValue = icon;
        }
      },

      loadForecast() {
        this.vals.forecast.splice(0);

        for(let i = 1; i < 7; i++) {
          let weekday = this.$fhem.getEl(this.item, 'Readings', 'fc' + i + '_day_of_week', 'Value');
          let condition = this.$fhem.getEl(this.item, 'Readings', 'fc' + i + '_condition', 'Value');
          let icon = this.$fhem.getEl(this.item, 'Readings', 'fc' + i + '_icon', 'Value');
          let max = this.$fhem.getEl(this.item, 'Readings', 'fc' + i + '_high_c', 'Value') || '--';
          let min = this.$fhem.getEl(this.item, 'Readings', 'fc' + i + '_low_c', 'Value') || '--';

          let day = {
            weekday: i === 1 ? 'heute' : this.weekdays[weekday],
            condition,
            icon: this.getIcon(icon),
            temp: max +'°C max. ' + min +'°C min.',
            temp_max: max + '°C',
            temp_min: min + '°C'
          };

          this.vals.forecast.push(day);
        }
      },

      expand() {
        if(this.expanded) {
          this.expanded = false;
          this.maxIcon = 'mdi-arrow-expand';
        } else {
          this.expanded = true;
          this.maxIcon = 'mdi-arrow-collapse';
          this.loadForecast();
        }
      }
    },

    props: {
      item: {}, // jsonObject from FHEM Device
    }
  }
</script>
