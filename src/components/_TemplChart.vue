<template>
  <v-col :class="setup.size">
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
          @click="goTo"
        >
          <v-icon small>
            {{ vals.linkIcon }}
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />

      <v-card-text class="pa-0">
        <v-row
          v-if="vals.maxSize"
          class="ma-3"
          align="center"
        >
          <v-col>
            <v-menu
              v-model="vals.fromPicker"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="vals.fromLocale"
                  readonly
                  :label="$t('app.dates.from')"
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="vals.from"
                :locale="setup.lang"
                no-title
                @input="loadChartData"
              />
            </v-menu>
          </v-col>
          <v-col>
            <v-menu
              v-model="vals.toPicker"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              left
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="vals.toLocale"
                  readonly
                  :label="$t('app.dates.to')"
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="vals.to"
                :locale="setup.lang"
                no-title
                @input="loadChartData"
              />
            </v-menu>
          </v-col>
        </v-row>
        <apexchart
          :options="chart.options"
          :series="chart.series"
          @zoomed="afterZoom"
        />
      </v-card-text>
      <v-divider />

      <v-system-bar color="secondary darken-1">
        <v-icon>{{ vals.systemIcon }}</v-icon>
        <v-spacer />
      </v-system-bar>
    </v-card>
  </v-col>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        default: () => { return { name: 'chart' } }
      }
    },

    data: () => ({
      name: 'chart',
      setup: {
        size: 'col-12 col-sm-12 col-md-6 col-lg-4',
        daysAgo: 6,
        daysTo: 0,
        lang: 'de'
      },
      vals: {
        title: '',
        mainLevel: 0,
        mainColor: 'success',
        maxSize: false,
        linkIcon: 'mdi-arrow-expand',
        fromPicker: false,
        from: '',
        fromLocale: '',
        toPicker: false,
        to: '',
        systemIcon: 'mdi-chart-bar'
      },
      chart: {
        options: {
          theme: {
            mode: 'dark'
          },
          chart: {
            type: 'line',
            height: 'auto',
            toolbar: {
              show: false
            }
          },
          stroke: {
            curve: 'smooth'
          },
          tooltip: {
            x: {
              format: 'ddd dd.MM.yy HH:mm:ss'
            }
          },
          xaxis: {
            type: 'datetime',
            labels: {
              datetimeUTC: false
            }
          },
          yaxis: []
        },
        series: []
      }
    }),

    watch: {
      item: {
        immediate: true,
        deep: true,
        handler(val) {
          let alias = this.$fhem.getEl(val, 'Attributes', 'alias') || val.Name;

          this.vals.title = this.$fhem.getEl(val, 'Options', 'name') || alias;
        }
      },

      'vals.from'(val) {
        this.vals.fromLocale = new Date(val).toLocaleString(this.setup.lang, { dateStyle: 'medium' });
      },

      'vals.to'(val) {
        this.vals.toLocale = new Date(val).toLocaleString(this.setup.lang, { dateStyle: 'medium' });
      }
    },

    created() {
      this.init();
    },

    methods: {
      init() {
        this.setup.lang = this.$fhem.app.options.lang;

        let setup = this.$fhem.getEl(this.item, 'Options', 'setup');
        if(setup) Object.assign(this.setup, setup);
        if (this.setup.lineWidth) this.chart.options.stroke.width = this.setup.lineWidth;

        if(this.$route.params.filter && this.$route.params.filter.match('&size=max')) {
          this.vals.maxSize = true;
          this.setup.size = 'col-12';
          this.vals.linkIcon = 'mdi-arrow-collapse';
        }

        this.vals.from = this.$fhem.getDate(this.setup.daysAgo);
        this.vals.to = this.$fhem.getDate(this.setup.daysTo);

        this.chart.options.chart.height = window.innerHeight > 600 && this.vals.maxSize ? parseInt((window.innerHeight - 320)) : 'auto';
        this.chart.options.theme.mode = this.$vuetify.theme.dark ? 'dark' : 'light';

        this.loadChartData();
      },

      goTo() {
        if(this.vals.maxSize) {
          this.$router.go(-1);
        } else {
          this.$router.push('/devices/device=' + this.item.Name + '&size=max');
        }
      },

      afterZoom(chartContext, { xaxis }) {
        this.vals.from = new Date(xaxis.min).toISOString().split('T')[0];
        this.vals.to = new Date(xaxis.max).toISOString().split('T')[0];

        this.loadChartData();
      },

      loadChartData() {
        this.vals.fromPicker = false;
        this.vals.toPicker = false;

        if(this.item) {
          this.$fhem.loading = true;

          let toDate = new Date(this.vals.to);
          toDate.setDate(toDate.getDate() + 1);
          toDate = toDate.toISOString().split('T')[0];

          let def = { deviceName: this.item.Name, from: this.vals.from, to: toDate, defs: this.item.Options.chartDef };

          this.$fhem.readLogData(def)
            .then((res) => {
              if(res.defs.length > 0) {
                let idx = 0;
                let priSeriesName = '';
                let secSeriesName = '';

                this.chart.options.yaxis.splice(0);
                this.chart.series.splice(0);

                for(const item of res.defs) {
                  let select = /\(.*\)/.exec(item);
                  let parts = select ? item.replace(select[0], '_').split(':') : item.split(':');

                  let values = [];
                  let logData = res.data[res.data.map((e) => e.id).indexOf(idx)].data;

                  for(const vals of logData) values.push([vals.timestamp, vals.value]);
                  this.chart.series.push({ name: parts[2], data: values });

                  let secAxis = parts[4] === 'secondary' ? true : false;
                  let show = false;

                  if(!priSeriesName && !secAxis) { priSeriesName = parts[2]; show = true; }
                  if(!secSeriesName && secAxis) { secSeriesName = parts[2]; show = true; }

                  let yOptions = {
                    seriesName: secAxis ? secSeriesName : priSeriesName,
                    show: show,
                    opposite: secAxis,
                    labels: {
                      formatter: (val) => {
                        let result = ''
                        if(val) result = val.toFixed(1) + parts[3]
                        return result
                      }
                    }
                  }

                  this.chart.options.yaxis.push(yOptions);

                  idx ++;
                }
              }

              this.chart.options = Object.assign({}, this.chart.options);

              this.$fhem.loading = false;
            });
        } else {
          this.$fhem.emit('message', { lvl: 1, msg: 'No valid device for Chart Data defined at ' + this.item.Name } );
        }
      }
    }
  }
</script>
