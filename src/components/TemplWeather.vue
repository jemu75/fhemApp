<template>
  <v-col class="col-12 col-sm-6 col-md-4 col-lg-4">
    <v-card
      :dark="this.$vuetify.theme.dark"
      color="secondary"
    >
      <v-progress-linear
        height="7"
        :value="vals.mainLevel"
        :color="vals.mainColor"
        background-color="secondary darken-1"
      />

      <v-card-title class="text-truncate">
        {{ vals.title }}
        <v-spacer />
        <v-btn
          small
          icon
          @click="expand"
        >
          <v-icon small>
            {{ maxIcon }}
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />

      <v-card-text>
        <v-row align="center">
          <v-col align="center">
            <div class="headline font-weight-bold">
              {{ vals.mainState }}
            </div>
          </v-col>
        </v-row>

        <v-row
          v-if="expanded"
          align="center"
        >
          <v-col align="center">
            <div>Luftdruck</div>
            <div class="headline font-weight-bold">
              {{ vals.pressure }}
            </div>
          </v-col>
          <v-col align="center">
            <div>Wind</div>
            <div class="headline font-weight-bold">
              {{ vals.wind }}
            </div>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider v-if="expanded" />

      <v-card-text v-if="expanded">
        <v-row
          v-for="day in vals.forecast"
          :key="day.weekday"
          align="center"
        >
          <v-col
            class="col-2"
            align="center"
          >
            <v-icon large>
              {{ day.icon }}
            </v-icon>
          </v-col>
          <v-col class="text-truncate">
            <h3>{{ day.weekday }}</h3>
            <span>{{ day.condition }}</span>
          </v-col>
          <v-col
            class="col-2 pl-0"
            align="center"
          >
            <div>{{ day.temp_max }}</div>
            <div>{{ day.temp_min }}</div>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />
      <v-system-bar color="secondary darken-1">
        <v-icon>{{ vals.systemIcon }}</v-icon>{{ vals.systemIconValue }}
        <v-spacer />
        {{ vals.systemLastEvent }}
        <v-spacer />
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
            >
              {{ vals.systemActivityIcon }}
            </v-icon>
          </template>
          {{ vals.systemActivityState }}
        </v-tooltip>
      </v-system-bar>
    </v-card>
  </v-col>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        default: () => { return { name: 'weather' } }
      }
    },

    data: () => ({
      name: 'weather',
      app: {
        options: {
          lang: ''
        }
      },
      apiSet: {
        Weather: {
          lastUpdate: 'validity',
          condition: 'condition',
          pressure: 'pressure',
          wind: 'wind_condition',
          icon: 'icon',
          fcCondition: '_condition',
          fcIcon: '_icon',
          fcMin: '_low_c',
          fcMax: '_high_c'
        },
        PROPLANTA: {
          lastUpdate: 'lastConnection',
          condition: 'weather',
          pressure: 'pressure',
          wind: 'wind',
          icon: 'weatherIcon',
          fcCondition: '_weatherDay',
          fcIcon: '_weatherDayIcon',
          fcMin: '_tempMin',
          fcMax: '_tempMax',
          icons: {
            t1: 'sunny', //'sunny'
            t2: 'partly_cloudy', //'mostly sunny'
            t3: 'partly_cloudy', //'partly cloudy'
            t4: 'partly_cloudy', //'mostly cloudy'
            t5: 'cloudy', //'cloudy'
            t6: 'chance_of_rain', //'chance of rain'
            t7: 'rain', //'rain'
            t8: 'windy', //'chance of storm'
            t9: 'sleet', //'light snow showers'
            t10: 'snow', //'snow'
            t11: 'sleet', //'mixed rain and snow'
            t12: 'fog', //'haze'
            t13: 'fog', //'fog'
            t14: 'rain', //'drizzle'
            n1: 'sunny night',
            n2: 'mostly sunny night',
            n3: 'partly cloudy night',
            n4: 'mostly cloudy night',
            n5: 'cloudy night',
            n6: 'chance of rain night',
            n7: 'rain night',
            n8: 'chance of storm night',
            n9: 'sleet night',
            n10: 'snow night',
            n11: 'mixed rain and snow night',
            n12: 'haze night',
            n13: 'fog night',
            n14: 'drizzle night'
          }
        }
      },
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
      type: 'Weather'
    }),

    watch: {
      item: {
        immediate: true,
        deep: true,
        handler(val) {
          this.type = this.$fhem.getEl(val, 'Internals', 'TYPE');

          let lastevent = this.$fhem.getEl(val, 'Readings', this.apiSet[this.type].lastUpdate, 'Time');
          let activity = this.$fhem.getEl(val, 'Readings', this.apiSet[this.type].lastUpdate, 'Value') || 'up-to-date';
          let icon = this.$fhem.getEl(val, 'Readings', this.apiSet[this.type].icon, 'Value');
          let press = this.$fhem.getEl(val, 'Readings', this.apiSet[this.type].pressure, 'Value');
          let wind = this.$fhem.getEl(val, 'Readings', this.apiSet[this.type].wind, 'Value');
          let alias = this.$fhem.getEl(val, 'Attributes', 'alias') || val.Name;

          if(this.type === 'PROPLANTA') {
            activity = 'up-to-date';
            wind = 'Wind: ' + wind + ' km/h';
          }

          this.vals.title = this.$fhem.getEl(val, 'Options', 'name') || alias;
          this.vals.mainState = this.$fhem.getEl(val, 'Readings', this.apiSet[this.type].condition, 'Value') || '';

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
        if(this.type === 'PROPLANTA') {
          let symbol = /\/.{1,3}\.gif/.exec(icon);
          let val = symbol[0].replace('/','').replace('.gif','');
          icon = this.apiSet.PROPLANTA.icons[val] || val;
        }

        if(icon && this.iconSet[icon]) {
          return this.iconSet[icon];
        } else {
          this.vals.systemIconValue = icon;
        }
      },

      loadForecast() {
        this.vals.forecast.splice(0);

        for(let i = 1; i < 7; i++) {
          let api = this.type || 'Weather';
          let weekd = this.$fhem.getDate(-i + 1)
          let weekday = new Date(weekd).toLocaleString(this.app.options.lang, { weekday: 'long' });
          let condition = this.$fhem.getEl(this.item, 'Readings', 'fc' + i + this.apiSet[api].fcCondition, 'Value');
          let icon = this.$fhem.getEl(this.item, 'Readings', 'fc' + i + this.apiSet[api].fcIcon, 'Value');
          let max = this.$fhem.getEl(this.item, 'Readings', 'fc' + i + this.apiSet[api].fcMin, 'Value') || '--';
          let min = this.$fhem.getEl(this.item, 'Readings', 'fc' + i + this.apiSet[api].fcMax, 'Value') || '--';

          let day = {
            weekday: weekday,
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

    mounted() {
      this.app.options = this.$fhem.app.options;
    }
  }
</script>
