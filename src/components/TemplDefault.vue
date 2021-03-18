<template>
  <v-col class="col-12 col-sm-6 col-md-4 col-lg-4" :order="vals.order">
    <v-card :dark="this.$vuetify.theme.dark" color="secondary">
      <v-progress-linear height="7" :value="getLevel" :color="vals.status.color" background-color="secondary darken-1"></v-progress-linear>

      <v-card-title class="text-truncate">
        {{ vals.title }}
        <v-spacer></v-spacer>
        <v-btn v-if="multiLevel && isActive" small icon @click="setLevel()">
          <v-icon small>{{ multiLevelIcon }}</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-row align="center">
          <v-col v-if="vals.main.leftIcon && isActive" class="col-3" align="center">
            <v-btn icon @mousedown="clickStart('left')" @mouseup="clickEnd('left')" @touchstart="clickStart('left')" @touchend="clickEnd('left')">
              <v-icon large>{{ vals.main.leftIcon }}</v-icon>
            </v-btn>
          </v-col>
          <v-divider v-if="vals.main.leftIcon && isActive" vertical></v-divider>
          <v-col align="center">
            <div class="headline font-weight-bold">{{ vals.main.text }}</div>
          </v-col>
          <v-col v-if="vals.main.text2" align="center">
            <div class="headline font-weight-bold">{{ vals.main.text2 }}</div>
          </v-col>
          <v-divider v-if="vals.main.rightIcon && isActive" vertical></v-divider>
          <v-col v-if="vals.main.rightIcon && isActive" class="col-3" align="center">
            <v-btn icon @mousedown="clickStart('right')" @mouseup="clickEnd('right')" @touchstart="clickStart('right')" @touchend="clickEnd('right')">
              <v-icon large>{{ vals.main.rightIcon }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-system-bar color="secondary darken-1">
        <v-icon class="mr-0">{{ vals.info.left1Icon }}</v-icon>{{ vals.info.left1Text }}
        <v-icon class="mr-0">{{ vals.info.left2Icon }}</v-icon>{{ vals.info.left2Text }}
        <v-spacer></v-spacer>
        <v-icon class="mr-0">{{ vals.info.mid1Icon }}</v-icon>{{ vals.info.mid1Text }}
        <v-icon class="mr-0">{{ vals.info.mid2Icon }}</v-icon>{{ vals.info.mid2Text }}
        <v-spacer></v-spacer>
        <v-icon class="mr-0">{{ vals.info.right1Icon }}</v-icon>{{ vals.info.right1Text }}
        <v-icon class="mr-0">{{ vals.info.right2Icon }}</v-icon>{{ vals.info.right2Text }}
      </v-system-bar>
    </v-card>
  </v-col>
</template>

<script>
  export default {
    data: () => ({
      name: 'default',
      setup: {
        status: {
          bar: [],
          error: []
        },
        main: [],
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
        order: '',
        title: '',
        status: {
          level: 0,
          color: '',
          invert: false,
        },
        main: {
          leftIcon: '',
          text: '',
          text2: '',
          rightIcon: ''
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
        }
      },
      multiLevel: false,
      multiLevelIcon: 'mdi-swap-vertical',
      mainLevel: 0,
      isActive: true,
      timer: false,
      long: false
    }),

    watch: {
      item: {
        immediate: true,
        deep: true,
        handler(val) {
          let alias = this.$fhem.getEl(val, 'Attributes', 'alias') || val.Name;

          this.vals.title = this.$fhem.getEl(val, 'Options', 'name') || alias;
          this.vals.order = this.$fhem.getEl(val, 'Attributes', 'sortby') || 'last';
          this.setValues();
        }
      },

      setup: {
        deep: true,
        handler() {
          this.setValues();
        }
      }
    },

    computed: {
      getLevel() {
        return this.vals.status.invert ? 100 - this.vals.status.level : this.vals.status.level;
      }
    },

    methods: {
      clickStart(val) {
        this.long = false;

        this.timer = setInterval(() => {
          this.long = true;

          let action = this.setup.main[this.mainLevel].[val + 'Long'];

          if(action) {
            let param = this.$fhem.handleVals(this.item, action);
            if(param[0]) {
              let cmd = param[0].match('set') ? param[0] : 'set ' + this.item.Name + ' ' + param[0];
              this.$fhem.request(cmd);
              this.timer = clearInterval(this.timer);
            }
          }
        }, 1000)
      },

      clickEnd(val) {
        this.timer = clearInterval(this.timer);

        let action = this.setup.main[this.mainLevel].[val + (this.long ? 'LongRelease' : 'Click')];

        if(action) {
          let param = this.$fhem.handleVals(this.item, action);
          if(param[0]) {
            let cmd = param[0].match('set') ? param[0] : 'set ' + this.item.Name + ' ' + param[0];
            this.$fhem.request(cmd);
          }
        }
      },

      setLevel(lvl) {
        if(!isNaN(lvl)) {
          this.multiLevel = this.setup.main.length > 1 ? true : false;
          this.mainLevel = lvl;
        } else {
          this.mainLevel ++;
          if(this.mainLevel > this.setup.main.length - 1) this.mainLevel = 0;
        }

        this.vals.main.leftIcon = this.setup.main[this.mainLevel].leftIcon;
        this.vals.main.rightIcon = this.setup.main[this.mainLevel].rightIcon;

        let mainText = this.$fhem.handleVals(this.item, this.setup.main[this.mainLevel].text);
        let mainText2 = this.$fhem.handleVals(this.item, this.setup.main[this.mainLevel].text2);

        this.vals.main.text = mainText[0] || '';
        this.vals.main.text2 = mainText2[0] || '';
      },

      setValues() {
        if(this.setup.main.length > 0) {
          let statusVals = this.$fhem.handleVals(this.item, this.setup.status.bar);
          let errorVals = this.$fhem.handleVals(this.item, this.setup.status.error);
          let mainText = this.$fhem.handleVals(this.item, this.setup.main[this.mainLevel].text);
          let mainText2 = this.$fhem.handleVals(this.item, this.setup.main[this.mainLevel].text2);
          let infoLeft1Vals = this.$fhem.handleVals(this.item, this.setup.info.left1);
          let infoLeft2Vals = this.$fhem.handleVals(this.item, this.setup.info.left2);
          let infoMid1Vals = this.$fhem.handleVals(this.item, this.setup.info.mid1);
          let infoMid2Vals = this.$fhem.handleVals(this.item, this.setup.info.mid2);
          let infoRight1Vals = this.$fhem.handleVals(this.item, this.setup.info.right1);
          let infoRight2Vals = this.$fhem.handleVals(this.item, this.setup.info.right2);

          this.vals.status.level = statusVals[0] || '0';
          this.vals.status.color = statusVals[1] || 'success';
          this.vals.status.invert = statusVals[2] ? true : false;

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

          this.vals.main.text = mainText[0] || '';
          this.vals.main.text2 = mainText2[0] || '';

          if(errorVals.length > 0) {
            this.vals.status.level = errorVals[0] || '100';
            this.vals.status.color = errorVals[1] || 'error';
            this.vals.main.text = errorVals[2] || 'Fehler';
            this.isActive = false;
          } else {
            this.isActive = true;
          }
        }
      }
    },

    props: {
      item: {}, // jsonObject from FHEM Device
    },

    created() {
      let name = this.$fhem.getEl(this.item, 'Options', 'template');
      let idx = this.$fhem.app.templates.map((e) => e.name).indexOf(name);
      let cfg = idx != -1 ? this.$fhem.app.templates[idx] : {};

      let status = this.$fhem.getEl(this.item, 'Options', 'setup', 'status') || cfg.status;
      let main = this.$fhem.getEl(this.item, 'Options', 'setup', 'main') || cfg.main;
      let info = this.$fhem.getEl(this.item, 'Options', 'setup', 'info') || cfg.info;

      if(status) Object.assign(this.setup.status, status);
      if(main) Object.assign(this.setup.main, main);
      if(info) Object.assign(this.setup.info, info);

      this.setLevel(0);
    }
  }
</script>
