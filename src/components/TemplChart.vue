<template>
  <v-col :class="vals.gridSize" :order="vals.order">
    <v-card :dark="this.$vuetify.theme.dark" color="secondary">
      <v-progress-linear height="7" :value="vals.mainLevel" :color="vals.mainColor" background-color="secondary darken-1"></v-progress-linear>

      <v-card-title class="text-truncate">
        {{ vals.title }}
        <v-spacer></v-spacer>
        <v-btn small icon @click="goTo">
          <v-icon small>{{ vals.linkIcon }}</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text class="pa-0">
        <v-row class="ma-3" align="center" v-if="vals.maxSize">
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
                  label="von"
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="vals.from"
                no-title
                @input="loadChartData"
              ></v-date-picker>
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
                  label="bis"
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="vals.to"
                no-title
                @input="loadChartData"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <apexchart :options="chart.options" :series="chart.series" @zoomed="afterZoom"></apexchart>
      </v-card-text>
      <v-divider></v-divider>

      <v-system-bar color="secondary darken-1">
        <v-icon>{{ vals.systemIcon }}</v-icon>
        <v-spacer></v-spacer>
      </v-system-bar>
    </v-card>
  </v-col>
</template>

<script>
  export default {
    props: ['item'],

    data: () => ({
      name: 'chart',
      vals: {
        order: '',
        title: '',
        mainLevel: 0,
        mainColor: 'success',
        maxSize: false,
        gridSize: 'col-12 col-sm-12 col-md-6 col-lg-4',
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
              format: 'dd.MM.yy',
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
          this.vals.order = this.$fhem.getEl(val, 'Attributes', 'sortby') || 'last';
        }
      },

      'vals.from'(val) {
        this.vals.fromLocale = new Date(val).toLocaleString('de-DE', { dateStyle: 'medium' });
      },

      'vals.to'(val) {
        this.vals.toLocale = new Date(val).toLocaleString('de-DE', { dateStyle: 'medium' });
      }
    },

    methods: {
      init() {
        if(this.$route.params.filter && this.$route.params.filter.match('&size=max')) {
          this.vals.maxSize = true;
          this.vals.gridSize = 'col-12';
          this.vals.linkIcon = 'mdi-arrow-collapse';
        }

        this.vals.from = this.$fhem.getDate(-7);
        this.vals.to = this.$fhem.getDate(1);

        this.chart.options.chart.height = window.innerHeight > 600 && this.vals.maxSize ? parseInt((window.innerHeight - 320)) : 'auto';
        this.chart.options.theme.mode = this.$vuetify.theme.dark ? 'dark' : 'light';

        this.loadChartData();
      },

      goTo() {
        if(this.vals.maxSize) {
          this.$router.go(-1);
        } else {
          this.$router.push('/devices/' + this.item.Name + '&size=max');
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
        let priAxisDef = false;
        let secAxisDef = false;

        if(this.item) {
          this.$fhem.loading = true;

          let def = { deviceName: this.item.Name, from: this.vals.from, to: this.vals.to, defs: this.item.Options.chartDef };

          this.$fhem.readLogFile(def)
            .then((res) => {
              if(res.defs.length > 0) {
                let idx = 0;

                this.chart.options.yaxis.splice(0);
                this.chart.series.splice(0);

                for(const item of res.defs) {
                  let values = []
                  let logData = res.data[res.data.map((e) => e.id).indexOf(idx)].data;
                  let secAxis = item.split(':')[4] === 'secondary' ? true : false;

                  if((!priAxisDef && !secAxis) || (!secAxisDef && secAxis)) {
                    if(!secAxis) priAxisDef = true;
                    if(secAxis) secAxisDef = true;
                    let yOptions = {
                      seriesName: item.split(':')[2] || '',
                      opposite: secAxis,
                      labels: {
                        formatter: (val) => {
                          let result = ''
                          if(val) result = val.toFixed(1) + item.split(':')[3]
                          return result
                        }
                      }
                    }
                    this.chart.options.yaxis.push(yOptions);
                  }

                  for(const vals of logData) values.push([vals.timestamp, vals.value]);
                  this.chart.series.push({ name: item.split(':')[2], data: values });

                  idx ++;
                }
              }

              this.chart.options = Object.assign({}, this.chart.options);

              this.$fhem.loading = false;
            });
        } else {
          this.$fhem.emit('message', { type: 'error', message: 'no valid device defined' } );
        }
      }
    },

    created() {
      this.init();
    }
  }
</script>
