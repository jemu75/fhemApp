<template>
  <v-col
    v-if="item.Options.show"
    :class="item.Options.setup.size || setup.size"
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
          v-if="item.Options.status.isActive"
          small
          icon
          @click="expand"
        >
          <v-icon small>
            {{ maxIcon }}
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
            v-if="setup.expanded"
            class="ma-3"
            align="center"
          >
            <v-col cols="5">
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
                  :locale="app.options.lang"
                  no-title
                  @input="loadChartData"
                />
              </v-menu>
            </v-col>
            <v-col cols="5">
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
                  :locale="app.options.lang"
                  no-title
                  @input="loadChartData"
                />
              </v-menu>
            </v-col>
            <v-col align="right">
              <v-btn-toggle rounded>
                <v-btn 
                  icon
                  @click="changeDate('prev')"
                >
                  <v-icon>mdi-skip-backward</v-icon>
                </v-btn>
                <v-btn 
                  icon
                  @click="changeDate('rest')"
                  >
                  <v-icon>mdi-restore</v-icon>
                </v-btn>
                <v-btn 
                  icon
                  @click="changeDate('next')"
                  >
                  <v-icon>mdi-skip-forward</v-icon>
                </v-btn>
              </v-btn-toggle>

            </v-col>
          </v-row>

          <apex-chart
            :options="chart.options"
            :series="chart.series"
            @zoomed="afterZoom"
          />
        </v-card-text>
      </div>

      <v-divider/>
      <v-system-bar color="secondary darken-1">
        <v-icon
          class="ml-0"
          :color="item.Options.info.left1IconColor"
        >
          {{ item.Options.info.left1Icon }}
        </v-icon><div class="text-truncate">
          {{ item.Options.info.left1Text }}
        </div>
        <v-icon
          class="ml-2"
          :color="item.Options.info.left2IconColor"
        >
          {{ item.Options.info.left2Icon }}
        </v-icon><div class="text-truncate">
          {{ item.Options.info.left2Text }}
        </div>
        <v-spacer />
        <v-icon :color="item.Options.info.mid1IconColor">
          {{ item.Options.info.mid1Icon }}
        </v-icon><div class="text-truncate">
          {{ item.Options.info.mid1Text }}
        </div>
        <v-icon
          class="ml-2"
          :color="item.Options.info.mid2IconColor"
        >
          {{ item.Options.info.mid2Icon }}
        </v-icon><div class="text-truncate">
          {{ item.Options.info.mid2Text }}
        </div>
        <v-spacer />
        <v-icon :color="item.Options.info.right1IconColor">
          {{ item.Options.info.right1Icon }}
        </v-icon><div class="text-truncate">
          {{ item.Options.info.right1Text }}
        </div>
        <v-icon
          class="ml-2 mr-0"
          :color="item.Options.info.right2IconColor"
        >
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
        default: () => { return { name: 'chart2' } }
      }
    },

    data: () => ({
      name: 'chart2',
      maxIcon: 'mdi-arrow-expand',
      app: {
        options: {
          debugMode: false,
          lang: 'de'
        }
      },
      status: {
        color: 'success',
        level: 0
      },      
      setup: {
        expanded: false,
        size: 'col-12 col-sm-12 col-md-6 col-lg-4'
      },
      from: '',
      to: '',
      fromLocale: '',
      toLocale: '',
      fromPicker: false,
      toPicker: false,
      timeSteps: null,
      chart: {
        series: [],
        options: {
          theme: {
            mode: 'dark'
          },
          chart: {
            height: 'auto',
            type: 'line',
            toolbar: {
              show: false
            }
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
          }
        }
      }
    }),

    watch: {
      item: {
        immediate: true,
        deep: true,
        handler() {
        }
      },

      from(val) {
        this.fromLocale = new Date(val).toLocaleString(this.app.options.lang, { dateStyle: 'short' });
      },

      to(val) {
        this.toLocale = new Date(val).toLocaleString(this.app.options.lang, { dateStyle: 'short' });
      }
    },

    created() {
      this.app.options = this.$fhem.app.options;
      Object.assign(this.setup, this.item.Options.setup);

      this.chart.options.theme.mode = this.$vuetify.theme.dark ? 'dark' : 'light';
      if(this.item.Options.chartOptions) Object.assign(this.chart.options, this.item.Options.chartOptions);

      if(this.setup.expanded) 
      {
        this.setup.expanded = false;
        this.expand();
      }

      this.daysAgo = this.$fhem.getEl(this.item, 'Options', 'setup', 'daysAgo');
      this.daysTo = this.$fhem.getEl(this.item, 'Options', 'setup', 'daysTo');
      if(typeof(this.daysAgo) != 'number') this.daysAgo = 6;
      if(typeof(this.daysTo) != 'number') this.daysTo = 0;
      this.from = this.$fhem.getDate(this.daysAgo);
      this.to = this.$fhem.getDate(this.daysTo);

      this.loadChartData();
    },

    methods: {
      expand() {
        if(this.setup.expanded) {
          this.setup.size = 'col-12 col-sm-12 col-md-6 col-lg-4';
          this.setup.expanded = false;
          this.maxIcon = 'mdi-arrow-expand';
          this.chart.options.chart.height = 'auto';
        } else {
          this.setup.size = 'col-12';
          this.setup.expanded = true;
          this.maxIcon = 'mdi-arrow-collapse';
          this.chart.options.chart.height = window.innerHeight > 600 ? parseInt((window.innerHeight - 320)) : 'auto';          
        }
        this.chart.options = Object.assign({}, this.chart.options);
      },

      changeDate(action) {
        if(action == 'rest') {
          this.from = this.$fhem.getDate(this.daysAgo);
          this.to = this.$fhem.getDate(this.daysTo);
        } else {
          let dayStart = new Date(this.from);
          let dayEnd = new Date(this.to);
          let dateDiff = Math.abs(dayEnd-dayStart);
          let from = new Date(this.from);
          let to = new Date(this.to);

          if(action == 'prev') dateDiff = -dateDiff;

          this.from = new Date(from.setMilliseconds(from.getMilliseconds() + dateDiff)).toISOString().split("T")[0];
          this.to = new Date(to.setMilliseconds(to.getMilliseconds() + dateDiff)).toISOString().split("T")[0];
        }

        this.loadChartData();
      },

      afterZoom(chartContext, { xaxis }) {
        this.from = new Date(xaxis.min).toISOString().split('T')[0];
        this.to = new Date(xaxis.max).toISOString().split('T')[0];

        this.loadChartData();
      },

      // subFunction for loadChartData
      getTimeSteps() {
        let dayStart = new Date(this.from);
        let dayEnd = new Date(this.to + ' 23:59:59');
        let dateDiff = Math.abs(dayEnd-dayStart);

        return dateDiff / this.app.options.maxChartPoints;
      },

      loadChartData() {
        this.fromPicker = false;
        this.toPicker = false;
        this.timeSteps = this.getTimeSteps();
        this.$fhem.loading = true;

        let def = { deviceName: this.item.Name, from: this.from, to: this.to, defs: this.item.Options.chartDef };
        let series = [];

        this.readLogData(def)
          .then((res) => {
            if(res.length > 0) {
              for(const data of res) {
                let serie = { data: this.handleLogData(data.data, data.calcMode), name: data.name };
                if (data.type) serie.type = data.type;

                if (data.format) {
                  let parts = data.format.split(' ');

                  let formatDef = {
                    labels: {
                      formatter: (val) => {
                        let result = '';
                        let digits = /%n./.test(parts[0]) ? data.format.substring(parts[0].match(/%n./).index + 3 , parts[0].match(/%n./).index + 4) : 1;
                        let suffix = parts[1] ? parts[1] : '';
                        if(val) result = val.toLocaleString(this.app.options.lang, { minimumFractionDigits: digits, maximumFractionDigits: digits }) + suffix;
                        return result;
                      }
                    }
                  }

                  if(this.chart.options.yaxis && this.chart.options.yaxis[data.id]) {
                    this.chart.options.yaxis[data.id].labels = formatDef.labels;
                  } else {                    
                    if(typeof this.chart.options.yaxis === 'undefined') this.chart.options.yaxis = [];
                    this.chart.options.yaxis.push(formatDef);
                  }
                }

                series.push(serie);
              }
            }
          })
          .finally(() => {
            this.chart.options = Object.assign({}, this.chart.options);
            this.chart.series = series;
            this.$fhem.loading = false;            
          });
      },

      // subFunction for handleLogData
      setTimeStep(time, ts, timeSpan) {
        if(!ts) time.setTime(time.getTime() - 1000);

        switch(timeSpan) {
          case 'hour':
            time.setTime(time.getTime() + (1 * 60 * 60 * 1000));
            break;
          case 'day':
            time.setDate(time.getDate() + 1);            
            break;
          case 'week':
            time.setDate(time.getDate() + 7);
            break;
          case 'month':
            time.setMonth(time.getMonth() + 1);
            break;
          default:
            while (time < ts) time.setMilliseconds(time.getMilliseconds() + this.timeSteps);
        }

        return time;
      },

      // subFunction for loadChartData
      handleLogData(data, calcMode) {
        let result = [];
        let valCalc = null;
        let valLast = null;
        let valDelta = null;
        let cnt = 1;
        let calc = calcMode ? calcMode.split('-')[0] : null;
        let timeSpan = calcMode ? calcMode.split('-')[1] : null;
        let time = this.setTimeStep(new Date(this.from + 'T00:00:00'), null, timeSpan);

        let items = data.split('\n');
        if(items.length > 3) items.splice(-3, 3);
        if(calc == 'raw' && items.length > window.innerWidth) calc = null;

        for(const [idx, item] of items.entries()) {
          let itemPart = item.split(' ');
          let ts = new Date(itemPart[0].replace('_','T'));
          let val = parseFloat(itemPart[1]);

          if(calc == 'raw') {
            if(val != valLast || items.length == idx + 1) result.push([Date.parse(ts), val]);
            valLast = val;
          } else {
            if(ts < time && idx + 1 < items.length ) {
              switch(calc) {
                case 'min':
                  if(val < valCalc || !valCalc) valCalc = val;
                  break;
                case 'max':
                  if(val > valCalc || !valCalc) valCalc = val;
                  break;
                case 'delta': 
                  if(!valDelta) valDelta = val;                                   
                  break;
                default:
                  if(valCalc) cnt ++;  
                  valCalc += val;
              }
            } else {
              if(calc == 'delta' && valDelta) valCalc = val - valDelta;
              if(!valCalc && calc != 'delta') valCalc = val;
              if(!calc) valCalc = valCalc / cnt;
              if(valCalc) result.push([Date.parse(time), valCalc]);
              time = this.setTimeStep(time, ts, timeSpan);
              valLast = valCalc;
              valCalc = null;
              valDelta = null;
              cnt = 1;
            }
          }

        }
        return result;
      },

      // mainFunction { deviceName: '', from: timestamp, to: timestamp, defs: [def1, def2] }
      async readLogData(obj) {
        let data = [];

        if(obj.defs && obj.defs.length > 0) {
          for(const [idx, def] of obj.defs.entries()) {
            let select = /\(.*\)/.exec(def);

            let defPart = select ? def.replace(select[0], '_').split(':') : def.split(':'); // definiton  [ source : (regex) : name : format : type ]
            let cmd = 'get ';
            cmd += defPart[0] ? defPart[0] : obj.deviceName;
            cmd += obj.from ? ' - - ' + obj.from : '';
            cmd += obj.to ? ' ' + obj.to : '';
            cmd += select ? ' ' + select[0].replace(/\(|\)/g,'') : ' 4:' + defPart[1];
          
            let logData = await this.$fhem.request([{ param: 'cmd', value: cmd }, { param: 'XHR', value: '1' }],'text', { id: idx });

            if(logData) {              
              data.push({ id: logData.id, data: await logData.data, name: defPart[2] || defPart[1], format: defPart[3], type: defPart[4], calcMode: defPart[5] });
            }
          }
        }

        return data;
      }
    }
  }
</script>
