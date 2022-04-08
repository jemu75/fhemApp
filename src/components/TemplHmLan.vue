<template>
  <v-col :class="setup.size">
    <v-card
      :dark="this.$vuetify.theme.dark"
      color="secondary"
    >
      <v-progress-linear
        height="7"
        :value="vals.status.level"
        :color="vals.status.color"
        background-color="secondary darken-1"
      />

      <v-card-title class="text-truncate">
        {{ vals.title }}
      </v-card-title>
      <v-divider />

      <v-card-text>
        <v-row align="center">
          <v-col
            class="col-4"
            align="center"
          >
            Auslastung
          </v-col>
          <v-col
            class="col-8"
            align="center"
          >
            Geräte
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col
            class="col-4"
            align="center"
          >
            <v-progress-circular
              rotate="90"
              size="70"
              width="7"
              :value="vals.main.loadLvl"
              :color="workLoadColor"
            >
              {{ vals.main.loadLvl }}
            </v-progress-circular>
          </v-col>

          <v-col
            class="col-4"
            align="center"
          >
            <v-progress-circular
              rotate="90"
              size="70"
              width="7"
              :value="devOnlinePercent"
              color="success"
            >
              {{ vals.devCount }}
            </v-progress-circular>
          </v-col>

          <v-col
            class="col-4"
            align="center"
          >
            <v-progress-circular
              rotate="90"
              size="70"
              width="7"
              :value="devOfflinePercent"
              color="error"
            >
              <v-btn
                :disabled="vals.devOffline.length < 1"
                plain
                @click="goTo()"
              >
                {{ vals.devOffline.length }}
              </v-btn>
            </v-progress-circular>
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col
            class="col-4"
            align="center"
          >
            {{ vals.main.loadLvlText }}
          </v-col>
          <v-col
            class="col-4"
            align="center"
          >
            aktiv
          </v-col>
          <v-col
            class="col-4"
            align="center"
          >
            inaktiv
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-system-bar color="secondary darken-1">
        <v-icon class="ml-0">
          {{ vals.info.left1Icon }}
        </v-icon>
        <div class="text-truncate">
          {{ vals.info.left1Text }}
        </div>
        <v-icon class="ml-2">
          {{ vals.info.left2Icon }}
        </v-icon>
        <div class="text-truncate">
          {{ vals.info.left2Text }}
        </div>
        <v-spacer />
        <v-icon>
          {{ vals.info.mid1Icon }}
        </v-icon>
        <div class="text-truncate">
          {{ vals.info.mid1Text }}
        </div>
        <v-icon class="ml-2">
          {{ vals.info.mid2Icon }}
        </v-icon>
        <div class="text-truncate">
          {{ vals.info.mid2Text }}
        </div>
        <v-spacer />
        <v-icon>
          {{ vals.info.right1Icon }}
        </v-icon>
        <div class="text-truncate">
          {{ vals.info.right1Text }}
        </div>
        <v-icon class="ml-2 mr-0">
          {{ vals.info.right2Icon }}
        </v-icon>
        <div class="text-truncate">
          {{ vals.info.right2Text }}
        </div>
      </v-system-bar>
    </v-card>
  </v-col>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        default: () => { return { name: 'hmlan' } }
      }
    },

    data: () => ({
      name: 'hmlan',
      setup: {
        size: 'col-12 col-sm-12 col-md-6 col-lg-6',
        status: {
          bar: [
            "cond:^(?!ok):100:error",
            "loadLvl:low:100:success",
            "loadLvl:batchLevel:50:success",
            "loadLvl:high:10:success",
            "loadLvl:suspended:100:error"
          ],
          error: []
        },
        main: {
          loadLvl: [
            "cond:^(?!ok):--:offline",
            "Internals.msgLoadCurrent:99:%n%:überlastet",
            "Internals.msgLoadCurrent:90:%n%:sehr hoch",
            "Internals.msgLoadCurrent:40:%n%:hoch",
            "Internals.msgLoadCurrent:0:%n%:normal"
          ]
        },
        info: {
          left1: [
            "cond:^(?!ok)::mdi-access-point-network-off",
            "loadLvl:low::mdi-access-point-network",
            "loadLvl:batchLevel::mdi-access-point-network",
            "loadLvl:high::mdi-access-point-network",
            "loadLvl:suspended::mdi-access-point-network"
          ],
          left2: [],
          mid1: [
            "Readings.cond.Time::%t"
          ],
          mid2: [],
          right1: [],
          right2: []
        }
      },

      vals: {
        title: '',
        status: {
          color: '',
          level: 0
        },
        main: {
          loadLvl: 0,
          loadLvlText: ''
        },
        info: {
          left1Icon: '',
          left1Text: '',
          left2Icon: '',
          left2Text: '',
          mid1Icon: '',
          mid1Text: '',
          mid2Icon: '',
          mid2Text: '',
          right1Icon: '',
          right1Text: '',
          right2Icon: '',
          right2Text: ''
        },
        devCount: 0,
        devOffline: [],
      },
      active: true
    }),

    computed: {
      workLoadColor() {
        return parseInt(this.vals.main.loadLvl) > 80 ? 'error' : 'success';
      },

      devOnlinePercent() {
        let count = parseInt(this.vals.devCount) + this.vals.devOffline.length;
        return count > 0 ? (parseInt(this.vals.devCount) / count * 100).toFixed(1) : 0;
      },

      devOfflinePercent() {
        let count = parseInt(this.vals.devCount) + this.vals.devOffline.length;
        return count > 0 ? ((1 - (parseInt(this.vals.devCount) / count)) * 100).toFixed(1) : 0;
      }
    },

    watch: {
      item: {
        immediate: true,
        deep: true,
        handler(val) {
          let alive = this.$fhem.getEl(val, 'Connected', 'watcher', 'Readings', 'state', 'Value');
          let watcher = this.$fhem.getEl(val, 'Connected', 'watcher', 'Readings');
          let loadCurrent = this.$fhem.getEl(val, 'Internals', 'msgLoadCurrent');
          let alias = this.$fhem.getEl(val, 'Attributes', 'alias') || val.Name;

          this.vals.title = this.$fhem.getEl(val, 'Options', 'name') || alias;
          this.vals.main.loadLvl = loadCurrent + '%';

          this.vals.devCount = alive.split(' ')[0].split(':')[1];
          this.checkDevices(watcher);
          this.setValues();
        }
      }
    },

    methods: {
      setValues() {
        let statusVals = this.$fhem.handleVals(this.item, this.setup.status.bar);
        let errorVals = this.$fhem.handleVals(this.item, this.setup.status.error);
        let mainLoadLvl = this.$fhem.handleVals(this.item, this.setup.main.loadLvl);
        let infoLeft1Vals = this.$fhem.handleVals(this.item, this.setup.info.left1);
        let infoLeft2Vals = this.$fhem.handleVals(this.item, this.setup.info.left2);
        let infoMid1Vals = this.$fhem.handleVals(this.item, this.setup.info.mid1);
        let infoMid2Vals = this.$fhem.handleVals(this.item, this.setup.info.mid2);
        let infoRight1Vals = this.$fhem.handleVals(this.item, this.setup.info.right1);
        let infoRight2Vals = this.$fhem.handleVals(this.item, this.setup.info.right2);

        this.vals.status.level = statusVals[0] || '100';
        this.vals.status.color = statusVals[1] || 'success';
        this.vals.status.invert = statusVals[2] ? true : false;

        this.vals.main.loadLvl = mainLoadLvl[0] || '';
        this.vals.main.loadLvlText = mainLoadLvl[1] || '';

        this.vals.info.left1Icon = infoLeft1Vals[1] || '';
        this.vals.info.left1Text = infoLeft1Vals[0] || '';

        this.vals.info.left2Icon = infoLeft2Vals[1] || '';
        this.vals.info.left2Text = infoLeft2Vals[0] || '';

        this.vals.info.mid1Icon = infoMid1Vals[1] || '';
        this.vals.info.mid1Text = infoMid1Vals[0] || '';

        this.vals.info.mid2Icon = infoMid2Vals[1] || '';
        this.vals.info.mid2Text = infoMid2Vals[0] || '';

        this.vals.info.right1Icon = infoRight1Vals[1] || '';
        this.vals.info.right1Text = infoRight1Vals[0] || '';

        this.vals.info.right2Icon = infoRight2Vals[1] || '';
        this.vals.info.right2Text = infoRight2Vals[0] || '';

        if(errorVals.length > 0) {
          this.vals.status.level = errorVals[0] || '100';
          this.vals.status.color = errorVals[1] || 'error';
          this.vals.main.text = errorVals[2] || 'Fehler';
          this.isActive = false;
        } else {
          this.isActive = true;
        }
      },

      checkDevices(items) {
        let offlineList = [];

        for(let el in items) {
          if(el.match('status_') && items[el].Value != 'alive') {
            let device = el.replace('status_', '');
            if(offlineList.indexOf(device) === -1) offlineList.push(device);
          }
        }

        if(offlineList.length > 0) {
          this.$fhem.request('jsonlist2 appOptions!=', 'json')
            .then((res) => {
              if(res.Results.length > 0) {
                for(const device of res.Results) {
                  let idx = offlineList.indexOf(device.Name);
                  let attrConn = device.Attributes.appOptions.match('connected');
                  let connDev = null;

                  for(const val of offlineList) {
                    if(!connDev && device.Attributes.appOptions.match(val)) connDev = true;
                  }

                  if(idx != -1 || (attrConn && connDev)) {
                    if(this.vals.devOffline.indexOf(device.Name) == -1) this.vals.devOffline.push(device.Name);
                  }
                }
              }
            })
        }
      },

      goTo() {
        this.$router.push('/devices/device=' + this.vals.devOffline);
      }
    }
  }
</script>
