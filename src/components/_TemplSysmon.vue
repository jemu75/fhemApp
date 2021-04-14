<template>
  <v-col class="col-12 col-sm-12 col-md-6 col-lg-6">
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
      </v-card-title>
      <v-divider />
      <v-card-subtitle>
        {{ vals.subTitle }}
      </v-card-subtitle>

      <v-card-text>
        <v-row>
          <v-col>
            <div class="text-truncate">
              CPU Auslastung:
            </div>
            <v-progress-linear
              height="7"
              :value="vals.cpuVal"
              :color="vals.cpuColor"
              background-color="secondary lighten-4"
            />
            <div>{{ vals.cpuVal + " %" }}</div>
          </v-col>
          <v-col>
            <div class="text-truncate">
              RAM Auslastung:
            </div>
            <v-progress-linear
              height="7"
              :value="vals.ramVal"
              :color="vals.ramColor"
              background-color="secondary lighten-4"
            />
            <div>{{ vals.ramVal + " %" }}</div>
          </v-col>
          <v-col>
            <div class="text-truncate">
              CPU Temperatur:
            </div>
            <v-progress-linear
              height="7"
              :value="vals.tempVal"
              :color="vals.tempColor"
              background-color="secondary lighten-4"
            />
            <div>{{ vals.tempVal + " C&deg;" }}</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div>Server läuft seit:</div>
            <div class="text-truncate">
              {{ vals.startServer }}
            </div>
          </v-col>
          <v-col>
            <div>FHEM läuft seit:</div>
            <div class="text-truncate">
              {{ vals.startFhem }}
            </div>
          </v-col>
          <v-col align="right" />
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="mr-2"
          @click="goTo()"
        >
          <v-icon>mdi-format-list-bulleted</v-icon>
        </v-btn>
        <v-spacer />
        <v-btn
          :disabled="!update"
          @click="fhemUpdate"
        >
          {{ updateText }}
        </v-btn>
        <v-btn
          :disabled="!restart"
          @click="fhemRestart"
        >
          Restart
        </v-btn>
      </v-card-actions>
      <v-divider />
      <v-system-bar color="secondary darken-1">
        <v-icon>{{ vals.systemIcon }}</v-icon>
        <v-spacer />
        {{ vals.systemLastEvent }}
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
        default: () => { return { name: 'sysmon' } }
      }
    },

    data: () => ({
      name: 'sysmon',
      vals: {
        title: '',
        mainLevel: 100,
        mainColor: 'success',
        cpuVal: 0,
        cpuColor: '',
        ramVal: 0,
        ramColor: 'success',
        tempVal: 0,
        tempColor: 'success',
        startServer: '',
        startFhem: '',
        systemIcon: 'mdi-server',
        systemLastEvent: ''
      },
      restart: true,
      update: true,
      updateText: 'prüfe updates...',

      app: {
        options: {
          updateProcess: false,
        }
      }
    }),

    watch: {
      item: {
        immediate: true,
        deep: true,
        handler(val) {
          let cpu = parseFloat(100 - this.$fhem.getEl(val, 'Readings','cpu_idle_stat','Value').split(' ')[2]);
          let ram = parseFloat(this.$fhem.getEl(val, 'Readings','ram','Value').split(' ')[6]);
          let temp = parseFloat(this.$fhem.getEl(val, 'Readings','cpu_temp','Value'));
          let lastEvent = this.$fhem.getEl(val, 'Readings','ram','Time');
          let serverStartTime = this.$fhem.getEl(val, 'Readings','starttime_text','Value');
          let fhemStartTime = this.$fhem.getEl(val, 'Readings','fhemstarttime_text','Value');
          let alias = this.$fhem.getEl(val, 'Attributes', 'alias') || val.Name;

          this.vals.title = this.$fhem.getEl(val, 'Options', 'name') || alias;
          this.vals.subTitle = this.$fhem.getEl(val, 'Readings','cpu_model_name','Value') || '';
          this.vals.cpuVal = cpu ? cpu.toFixed(1) : '';
          this.vals.cpuColor = cpu > 70 ? 'error' : 'success';
          this.vals.ramVal = ram ? ram.toFixed(1) : '';
          this.vals.ramColor = ram > 70 ? 'error' : 'success';
          this.vals.tempVal = temp ? temp.toFixed(1) : '';
          this.vals.tempColor = temp > 60 ? 'error' : 'success';
          this.vals.mainColor = cpu > 70 || ram > 70 || temp > 60 ? 'error' : 'success';
          this.vals.startServer = serverStartTime;
          this.vals.startFhem = fhemStartTime;
          this.vals.systemLastEvent =  this.$fhem.getDateTime(lastEvent);
        }
      },

      'app.options.updateProcess'(val) {
        if(!val) {
          this.$fhem.emit('message', { type: 'success', message: 'Update war erfolgreich. Das System sollte neu gestartet werden.' })
          this.updateText = 'system aktuell';
          this.restart = true;
        }
      }
    },

    mounted() {
      this.app.options = this.$fhem.app.options;
      this.fhemUpdateCheck();
    },

    methods: {
      fhemRestart() {
        this.restart = false;
        this.$fhem.request({ param: 'cmd', value: 'shutdown restart' });
      },

      async fhemUpdateCheck() {
        let promise = new Promise((resolve, reject) => {
          this.restart = false;
          this.update = false;
          this.$fhem.checkUpdate()
            .then((res) => {
              if(res) {
                this.updateText = 'update';
                this.update = true;
              } else {
                this.updateText = 'system aktuell';
              }
              resolve(res);
            })
            .catch((err) => {
              this.$fhem.emit('message', { type: 'error', message: 'Updateprüfung fehlgeschlagen.', meta: err });
              reject();
            })
            .finally(() => {
              this.restart = true;
            })
        })
        return promise;
      },

      fhemUpdate() {
        this.restart = false;
        this.update = false;
        this.updateText ='update läuft...';
        this.app.options.updateProcess = true;
        this.$fhem.request({ param: 'cmd', value: 'update' })
      },

      goTo() {
        this.$router.push('syslog');
      }
    }
  }
</script>
