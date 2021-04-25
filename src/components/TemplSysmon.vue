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
        <v-spacer />
        <jsonList
          v-if="app.options.debugMode"
          :item="item"
        />
      </v-card-title>
      <v-divider />
      <v-card-subtitle>
        {{ vals.subTitle }}
      </v-card-subtitle>

      <v-card-text>
        <v-row>
          <v-col
            v-for="itm of vals.list"
            :key="itm.name"
            class="col-12 col-md-4 col-lg-4"
          >
            <div class="text-truncate">
              {{ itm.name }}
            </div>
            <v-progress-linear
              v-if="itm.isBar"
              height="7"
              :value="itm.value"
              :color="itm.color"
              :min="itm.min"
              :max="itm.max"
              background-color="secondary lighten-4"
            />
            <div>{{ itm.subText }}</div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions v-if="setup.fhemBtns">
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
          {{ $t('templates.sysmon.restartBtn') }}
        </v-btn>
      </v-card-actions>
      <v-divider />
      <v-system-bar color="secondary darken-1">
        <v-icon class="ml-0">
          {{ vals.info.left1Icon }}
        </v-icon>{{ vals.info.left1Text }}
        <v-icon class="ml-2">
          {{ vals.info.left2Icon }}
        </v-icon>{{ vals.info.left2Text }}
        <v-spacer />
        <v-icon>{{ vals.info.mid1Icon }}</v-icon>{{ vals.info.mid1Text }}
        <v-icon class="ml-2">
          {{ vals.info.mid2Icon }}
        </v-icon>{{ vals.info.mid2Text }}
        <v-spacer />
        <v-icon>{{ vals.info.right1Icon }}</v-icon>{{ vals.info.right1Text }}
        <v-icon class="ml-2 mr-0">
          {{ vals.info.right2Icon }}
        </v-icon>{{ vals.info.right2Text }}
      </v-system-bar>

      <v-dialog
        v-model="updateDialog"
        max-width="420px"
      >
        <v-card color="secondary lighten-2">
          <v-card-title>
            {{ $t('templates.sysmon.updateDialog.header') }}
            <v-spacer />
            <v-btn
              icon
              small
              @click="updateDialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            {{ $t('templates.sysmon.updateDialog.text') }}
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              @click="fhemRestart()"
            >
              {{ $t('templates.sysmon.updateDialog.restartBtn') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
        default: () => { return { name: 'sysmon' } }
      }
    },

    data: () => ({
      name: 'sysmon',
      app: {
        options: {
          updateProcess: false,
          debugMode: false
        }
      },
      setup: {
        size: 'col-12 col-sm-12 col-md-6 col-lg-6',
        status: {
          bar: [],
          error: [],
        },
        subTitle: [],
        main: [],
        fhemBtns: true,
        info: {
          left1: [],
          left2: [],
          mid1: [],
          mid2: [],
          right1: [],
          right2: []
        }
      },
      vals: {
        title: '',
        subTitle: '',
        status: {
          level: 0,
          color: 'success'
        },
        list: [],
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
      },
      restart: true,
      update: true,
      updateText: '',
      updateDialog: false
    }),

    watch: {
      item: {
        immediate: true,
        deep: true,
        handler(val) {
          let alias = this.$fhem.getEl(val, 'Attributes', 'alias') || val.Name;

          this.vals.title = this.$fhem.getEl(val, 'Options', 'name') || alias;
          this.setValues();
          this.doList();
        }
      },

      setup: {
        deep: true,
        handler() {
          this.setValues();
          this.doList();
        }
      },

      'app.options.updateProcess'(val) {
        if(!val) {
          this.updateDialog = true;
          this.updateText = this.$t('templates.sysmon.updateBtn[1]');
          this.restart = true;
        }
      }
    },

    mounted() {
      this.app.options = this.$fhem.app.options;
      this.fhemUpdateCheck();

      let size = this.$fhem.getEl(this.item, 'Options', 'setup', 'size');
      let subTitle = this.$fhem.getEl(this.item, 'Options', 'setup', 'subTitle');
      let fhemBtns = this.$fhem.getEl(this.item, 'Options', 'setup', 'fhemBtns');
      let status = this.$fhem.getEl(this.item, 'Options', 'setup', 'status');
      let main = this.$fhem.getEl(this.item, 'Options', 'setup', 'main');
      let info = this.$fhem.getEl(this.item, 'Options', 'setup', 'info');

      if(size) this.setup.size = size;
      if(subTitle) this.setup.subTitle = subTitle;
      if(status) Object.assign(this.setup.status, status);
      if(main) Object.assign(this.setup.main, main);
      if(info) Object.assign(this.setup.info, info);
      this.setup.fhemBtns = fhemBtns;

    },

    methods: {
      setValues() {
        let statusVals = this.$fhem.handleVals(this.item, this.setup.status.bar);
        let errorVals = this.$fhem.handleVals(this.item, this.setup.status.error);
        let subTitle = this.$fhem.handleVals(this.item, this.setup.subTitle);

        let infoLeft1Vals = this.$fhem.handleVals(this.item, this.setup.info.left1);
        let infoLeft2Vals = this.$fhem.handleVals(this.item, this.setup.info.left2);
        let infoMid1Vals = this.$fhem.handleVals(this.item, this.setup.info.mid1);
        let infoMid2Vals = this.$fhem.handleVals(this.item, this.setup.info.mid2);
        let infoRight1Vals = this.$fhem.handleVals(this.item, this.setup.info.right1);
        let infoRight2Vals = this.$fhem.handleVals(this.item, this.setup.info.right2);

        this.vals.status.level = statusVals[0] || '100';
        this.vals.status.color = statusVals[1] || 'success';
        this.vals.subTitle = subTitle[0] || '';

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
        }
      },

      doList() {
        for(var el of this.setup.main) {
          let idx = this.vals.list.map((e) => e.name).indexOf(el.name);

          let bar = this.$fhem.handleVals(this.item, el.bar);
          let subText = this.$fhem.handleVals(this.item, el.subText);

          let listItem = {
            name: el.name,
            isBar: bar.length > 0 ? true : false,
            value: bar[0] || 0,
            color: bar[1] || 'success',
            min: bar[2] || 0,
            max: bar[3] || 100,
            subText: subText[0] || '',
          }

          if(listItem.isBar && listItem.color != 'success') this.vals.status.color = listItem.color;

          if(idx != -1) {
            this.vals.list.splice(idx, 1, listItem);
          } else {
            this.vals.list.push(listItem);
          }
        }
      },

      fhemRestart() {
        this.restart = false;
        this.updateDialog = false;
        this.$fhem.request({ param: 'cmd', value: 'shutdown restart' });
      },

      async fhemUpdateCheck() {
        let promise = new Promise((resolve, reject) => {
          this.restart = false;
          this.update = false;
          this.updateText = this.$t('templates.sysmon.updateBtn[0]')
          this.$fhem.checkUpdate()
            .then((res) => {
              if(res) {
                this.updateText = this.$t('templates.sysmon.updateBtn[2]');
                this.update = true;
              } else {
                this.updateText = this.$t('templates.sysmon.updateBtn[1]');
              }
              resolve(res);
            })
            .catch((err) => {
              this.$fhem.log({ lvl: 1, msg: 'Update check failed.', meta: err });
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
        this.updateText = this.$t('templates.sysmon.updateBtn[3]');
        this.app.options.updateProcess = true;
        this.$fhem.request({ param: 'cmd', value: 'update' })
      },

      goTo() {
        this.$router.push('syslog');
      }
    }
  }
</script>
