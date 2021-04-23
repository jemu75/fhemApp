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
              :value="vals.systemIconValue"
              :color="workLoadColor"
            >
              {{ vals.systemIconValue }}
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
            {{ vals.mainState }}
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
        default: () => { return { name: 'hmlan' } }
      }
    },

    data: () => ({
      name: 'hmlan',
      defaultSet: [
        "cond:^(?!ok):offline:100:error:mdi-access-point-network-off",
        "loadLvl:low:normal:100:success:mdi-access-point-network",
        "loadLvl:batchLevel:hoch:50:success:mdi-access-point-network",
        "loadLvl:high:sehr hoch:10:success:mdi-access-point-network",
        "loadLvl:suspended:überlastet:100:error:mdi-access-point-network"
      ],
      vals: {
        title: '',
        mainState: '',
        mainLevel: 0,
        mainColor: '',
        devCount: 0,
        devOffline: [],
        systemIcon: '',
        systemIconValue: '',
        systemLastEvent: ''
      },
      active: true
    }),

    computed: {
      workLoadColor() {
        return parseInt(this.vals.systemIconValue) > 80 ? 'error' : 'success';
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
          let opend = this.$fhem.getEl(val, 'Readings', 'cond', 'Time');
          let loadCurrent = this.$fhem.getEl(val, 'Internals', 'msgLoadCurrent');
          let alias = this.$fhem.getEl(val, 'Attributes', 'alias') || val.Name;

          this.vals.title = this.$fhem.getEl(val, 'Options', 'name') || alias;
          this.vals.systemLastEvent = this.$fhem.getDateTime(opend);
          this.vals.systemIconValue = loadCurrent + '%';
          this.vals = this.$fhem.handleStates(val, this.vals, this.defaultSet);

          this.vals.devCount = alive.split(' ')[0].split(':')[1];
          this.checkDevices(watcher);
        }
      }
    },

    methods: {
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
