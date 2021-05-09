<template>
  <v-col
    v-if="item.Options.show"
    :class="size"
  >
    <v-card
      :dark="this.$vuetify.theme.dark"
      color="secondary"
    >
      <v-progress-linear
        height="7"
        :value="item.Options.status.level || status.level"
        :color="item.Options.status.color || status.color"
        background-color="secondary darken-1"
      />

      <v-card-title class="text-truncate">
        {{ item.Options.name }}

        <v-spacer />
        <v-btn
          small
          icon
          @click="goTo"
        >
          <v-icon small>
            {{ expandIcon }}
          </v-icon>
        </v-btn>

        <jsonList
          v-if="app.options.debugMode"
          :item="item"
        />
      </v-card-title>
      <v-divider />

      <div v-if="!item.Options.status.isActive">
        <v-card-text>
          <v-row align="center">
            <v-col align="center">
              <div class="headline font-weight-bold">
                {{ item.Options.status.error }}
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
      </div>

      <div v-if="item.Options.status.isActive">
        <v-card-text class="pa-0">
          <v-row
            v-if="maxSize"
            class="ma-3"
            align="center"
          >
            <v-col>
              <v-menu
                v-model="fromPicker"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="fromLocale"
                    readonly
                    :label="$t('app.dates.from')"
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="from"
                  :locale="lang"
                  no-title
                  @input="loadChartData"
                />
              </v-menu>
            </v-col>
            <v-col>
              <v-menu
                v-model="toPicker"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                left
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="toLocale"
                    readonly
                    :label="$t('app.dates.to')"
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="to"
                  :locale="lang"
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
      </div>

      <v-system-bar color="secondary darken-1">
        <v-icon class="ml-0">
          {{ item.Options.info.left1Icon || chartIcon }}
        </v-icon><div class="text-truncate">
          {{ item.Options.info.left1Text }}
        </div>
        <v-icon class="ml-2">
          {{ item.Options.info.left2Icon }}
        </v-icon><div class="text-truncate">
          {{ item.Options.info.left2Text }}
        </div>
        <v-spacer />
        <v-icon>
          {{ item.Options.info.mid1Icon }}
        </v-icon><div class="text-truncate">
          {{ item.Options.info.mid1Text }}
        </div>
        <v-icon class="ml-2">
          {{ item.Options.info.mid2Icon }}
        </v-icon><div class="text-truncate">
          {{ item.Options.info.mid2Text }}
        </div>
        <v-spacer />
        <v-icon>
          {{ item.Options.info.right1Icon }}
        </v-icon><div class="text-truncate">
          {{ item.Options.info.right1Text }}
        </div>
        <v-icon class="ml-2 mr-0">
          {{ item.Options.info.right2Icon }}
        </v-icon><div class="text-truncate">
          {{ item.Options.info.right2Text }}
        </div>
      </v-system-bar>
    </v-card>
  </v-col>
</template>

<script>
  import jsonList from '@/components/Jsonlist.vue'

  export default {
    components: {
      jsonList
    },

    props: {
      item: {
        type: Object,
        default: () => { return { name: 'chart' } }
      }
    },

    data: () => ({
      name: 'chart',
      size: '',
      chartIcon: 'mdi-chart-bar',
      expandIcon: 'mdi-arrow-expand',
      maxSize: false,
      fromPicker: false,
      from: '',
      fromLocale: '',
      toPicker: false,
      to: '',
      toLocale: '',
      daysAgo: null,
      daysTo: null,
      lang: 'de',
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
      },
      status: {
        color: 'success',
        level: 0
      },
      app: {
        options: {
          debugMode: false
        }
      },
    }),

    watch: {
      from(val) {
        this.fromLocale = new Date(val).toLocaleString(this.lang, { dateStyle: 'medium' });
      },

      to(val) {
        this.toLocale = new Date(val).toLocaleString(this.lang, { dateStyle: 'medium' });
      }
    },


    created() {
      this.app.options = this.$fhem.app.options;
      this.size = this.$fhem.getEl(this.item, 'Options', 'setup', 'size') || 'col-12 col-sm-12 col-md-6 col-lg-4';

      if(this.$route.params.filter && this.$route.params.filter.match('&size=max')) {
        this.maxSize = true;
        this.size = 'col-12';
        this.expandIcon = 'mdi-arrow-collapse';
      }

      this.daysAgo = this.$fhem.getEl(this.item, 'Options', 'setup', 'daysAgo') || 6;
      this.daysTo = this.$fhem.getEl(this.item, 'Options', 'setup', 'daysTo') || 0;
      this.from = this.$fhem.getDate(this.daysAgo);
      this.to = this.$fhem.getDate(this.daysTo);

      this.lang = this.$fhem.app.options.lang;

      this.chart.options.chart.height = window.innerHeight > 600 && this.maxSize ? parseInt((window.innerHeight - 320)) : 'auto';
      this.chart.options.theme.mode = this.$vuetify.theme.dark ? 'dark' : 'light';
      this.chart.options.stroke.width = this.$fhem.getEl(this.item, 'Options', 'setup', 'lineWidth') || 4;

      this.loadChartData();
    },

    methods: {
      goTo() {
        if(this.maxSize) {
          this.$router.go(-1);
        } else {
          this.$router.push('/devices/device=' + this.item.Name + '&size=max');
        }
      },

      afterZoom(chartContext, { xaxis }) {
        this.from = new Date(xaxis.min).toISOString().split('T')[0];
        this.to = new Date(xaxis.max).toISOString().split('T')[0];

        this.loadChartData();
      },

      loadChartData() {
        this.fromPicker = false;
        this.toPicker = false;

        if(this.item) {
          this.$fhem.loading = true;

          let toDate = new Date(this.to);
          toDate.setDate(toDate.getDate() + 1);
          toDate = toDate.toISOString().split('T')[0];

          let def = { deviceName: this.item.Name, from: this.from, to: toDate, defs: this.item.Options.chartDef };

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

                  if(parts[5]) {
                    if(!('colors' in this.chart.options)) Object.assign(this.chart.options, { colors: []});
                    this.chart.options.colors.splice([idx], 0, parts[5]);
                  }

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
