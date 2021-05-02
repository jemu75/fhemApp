<template>
  <v-col :class="item.Options.size">
    <v-card
      :dark="this.$vuetify.theme.dark"
      color="secondary"
    >
      <v-progress-linear
        height="7"
        :value="item.Options.status.level"
        :color="item.Options.status.color"
        background-color="secondary darken-1"
      />

      <v-card-title class="text-truncate">
        <div v-if="!app.options.debugMode">
          {{ item.Options.name }}
        </div>

        <v-btn
          v-if="app.options.debugMode"
          :href="toFhem()"
          target="_blank"
          text
        >
          {{ item.Options.name }}
          {{ item.Options.sortby }}
        </v-btn>

        <v-spacer />
        <v-btn
          v-if="multiLevel && item.Options.isActive"
          small
          icon
          @click="setLevel()"
        >
          <v-icon small>
            {{ multiLevelIcon }}
          </v-icon>
        </v-btn>
        <jsonList
          v-if="app.options.debugMode"
          :item="item"
        />
      </v-card-title>
      <v-divider />

      <v-card-text v-if="!item.Options.isActive">
        <v-row align="center">
          <v-col align="center">
            <div class="headline font-weight-bold">
              {{ item.Options.status.error }}
            </div>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text v-if="!vals.main.slider && item.Options.isActive">
        <v-row align="center">
          <v-col
            v-if="vals.main.leftMenu.length == 0 && vals.main.leftBtn"
            class="col-3"
            align="center"
          >
            <v-btn
              small
              icon
              :disabled="vals.main.leftBtnDisabled"
              @touchstart="clickStart('left','touch')"
              @touchend="clickEnd('left','touch')"
              @mousedown="clickStart('left','mouse')"
              @mouseup="clickEnd('left','mouse')"
            >
              <v-icon large>
                {{ vals.main.leftBtn }}
              </v-icon>
            </v-btn>
          </v-col>
          <v-col
            v-if="vals.main.leftMenu.length > 0 && vals.main.leftBtn"
            class="col-3"
            align="center"
          >
            <v-menu
              bottom
              left
              transition="slide-y-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  small
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon large>
                    {{ vals.main.leftBtn }}
                  </v-icon>
                </v-btn>
              </template>

              <v-list
                dense
                color="secondary lighten-2"
              >
                <v-list-item-group active-class="success--text">
                  <v-list-item
                    v-for="(menu, i) in vals.main.leftMenu"
                    :key="i"
                    @click="sendCmd(menu.cmd)"
                  >
                    <v-list-item-content>
                      <v-list-item-title class="text-subtitle-1">
                        {{ menu.name }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
          </v-col>
          <v-divider
            v-if="vals.main.leftBtn"
            vertical
          />
          <v-col align="center">
            <div class="headline font-weight-bold">
              {{ vals.main.text }}
            </div>
          </v-col>
          <v-col
            v-if="vals.main.text2"
            align="center"
          >
            <div class="headline font-weight-bold">
              {{ vals.main.text2 }}
            </div>
          </v-col>
          <v-divider
            v-if="vals.main.rightBtn"
            vertical
          />
          <v-col
            v-if="vals.main.rightMenu.length == 0 && vals.main.rightBtn"
            class="col-3"
            align="center"
          >
            <v-btn
              small
              icon
              :disabled="vals.main.rightBtnDisabled"
              @touchstart="clickStart('right','touch')"
              @touchend="clickEnd('right','touch')"
              @mousedown="clickStart('right','mouse')"
              @mouseup="clickEnd('right','mouse')"
            >
              <v-icon large>
                {{ vals.main.rightBtn }}
              </v-icon>
            </v-btn>
          </v-col>
          <v-col
            v-if="vals.main.rightMenu.length > 0 && vals.main.rightBtn"
            class="col-3"
            align="center"
          >
            <v-menu
              bottom
              left
              transition="slide-y-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  small
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon large>
                    {{ vals.main.rightBtn }}
                  </v-icon>
                </v-btn>
              </template>

              <v-list
                dense
                color="secondary lighten-2"
              >
                <v-list-item-group active-class="success--text">
                  <v-list-item
                    v-for="(menu, i) in vals.main.rightMenu"
                    :key="i"
                    @click="sendCmd(menu.cmd)"
                  >
                    <v-list-item-content>
                      <v-list-item-title class="text-subtitle-1">
                        {{ menu.name }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text v-if="vals.main.slider && item.Options.isActive">
        <v-slider
          class="ml-5 mr-5"
          v-model="vals.main.sliderCurrent"
          :min="vals.main.sliderMin"
          :max="vals.main.sliderMax"
          hide-details
          thumb-label
          thumb-size="48"
          color="success"
          :step="vals.main.sliderStep"
          @change="setSlider"
        >
          <template v-slot:thumb-label="{ value }">
            <div class="text-h6">
              {{ sliderVal(value) }}
            </div>
          </template>

          <template
            v-if="vals.main.leftBtn"
            v-slot:prepend
          >
            <v-icon @click="clickEnd('left')">
              {{ vals.main.leftBtn }}
            </v-icon>
          </template>
          <template
            v-if="vals.main.rightBtn"
            v-slot:append
          >
            <v-icon @click="clickEnd('right')">
              {{ vals.main.rightBtn }}
            </v-icon>
          </template>
        </v-slider>
      </v-card-text>

      <v-divider />
      <v-system-bar color="secondary darken-1">
        <v-icon class="ml-0">
          {{ item.Options.info.left1Icon }}
        </v-icon>{{ item.Options.info.left1Text }}
        <v-icon class="ml-2">
          {{ item.Options.info.left2Icon }}
        </v-icon>{{ item.Options.info.left2Text }}
        <v-spacer />
        <v-icon>
          {{ item.Options.info.mid1Icon }}
        </v-icon>{{ item.Options.info.mid1Text }}
        <v-icon class="ml-2">
          {{ item.Options.info.mid2Icon }}
        </v-icon>{{ item.Options.info.mid2Text }}
        <v-spacer />
        <v-icon>
          {{ item.Options.info.right1Icon }}
        </v-icon>{{ item.Options.info.right1Text }}
        <v-icon class="ml-2 mr-0">
          {{ item.Options.info.right2Icon }}
        </v-icon>{{ item.Options.info.right2Text }}
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
        default: () => { return { name: 'default' } }
      }
    },

    data: () => ({
      name: 'default',
      app: {
        options: {
          debugMode: false
        }
      },
      setup: {
        main: [
          {
            leftBtn: '',
            text: '',
            rightBtn: '',
          }
        ],
      },
      vals: {
        main: {
          leftBtn: '',
          leftBtnDisabled: false,
          leftMenu: [],
          text: '',
          text2: '',
          slider: false,
          sliderCurrent: 0,
          sliderPrevent: false,
          sliderMin: 0,
          sliderMax: 100,
          sliderStep: 1,
          rightBtn: '',
          rightBtnDisabled: false,
          rightMenu: []
        },
      },
      multiLevel: false,
      multiLevelIcon: 'mdi-swap-vertical',
      mainLevel: 0,
      timer: false,
      long: false,
      pendingClick: 0,
      touchFirst: false
    }),

    watch: {
      item: {
        immediate: false,
        deep: true,
        handler() {
          this.setValues();
        }
      },
    },

    created() {
      this.app.options = this.$fhem.app.options;
      let main = this.$fhem.getEl(this.item, 'Options', 'setup', 'main');
      if(main) Object.assign(this.setup.main, main);
      this.setLevel(0);
    },

    methods: {
      toFhem() {
        let fhemLink = this.$fhem.createURL([{ param: 'detail', value: this.item.Name }]);

        return fhemLink;
      },

      sendCmd(cmd, delay) {
        if(!delay) {
          this.$fhem.request(cmd);
        } else {
          if (this.pendingClick) {
            clearTimeout(this.pendingClick);
            this.pendingClick = 0;
          }

          this.pendingClick = setTimeout(() => {
            this.$fhem.request(cmd);
          }, 1000);
        }
      },

      updateReading(cmd) {
        let cmdParts = cmd.split(' ');

        if(cmdParts.length === 4) {
          if(this.$fhem.getEl(this.item, 'Readings', cmdParts[2], 'Value')) {
            this.item.Readings[cmdParts[2]].Value = cmdParts[3];
          }
        }
      },

      createCmd(param) {
        let result = '';

        if(param.match('set')) {
          let parts = param.split(' ');
          if(parts[1].match('Connected')) {
            let device = parts[1].replace('Connected.','');
            parts[1] = this.$fhem.getEl(this.item, 'Connected', device, 'Internals', 'NAME');

            if(parts[1]) {
              result = parts.join(' ');
            } else {
              this.$fhem.log({ lvl: 1, msg: 'Connected Device not found. ' + this.item.Options });
            }
          } else {
            result = param;
          }
        } else {
          result = 'set ' + this.item.Name + ' ' + param;
        }

        return result;
      },

      clickStart(val, evt) {
        this.long = false;
        this.$fhem.log({ lvl: 5, msg: 'ClickStart: type ' + val + ':' + evt })

        if(this.touchFirst && evt === 'mouse') return;
        if(evt === 'touch') this.touchFirst = true;

        this.timer = setInterval(() => {
          this.long = true;

          let action = this.setup.main[this.mainLevel].[val + 'Long'];

          this.$fhem.log({ lvl: 5, msg: 'ClickEvent: Long ' + ' [' + action + ']' });

          if(action) {
            let param = this.$fhem.handleVals(this.item, action);
            if(param[0]) {
              let cmd = this.createCmd(param[0]);
              this.sendCmd(cmd);
              this.timer = clearInterval(this.timer);
            }
          }
        }, 1000)
      },

      clickEnd(val, evt) {
        this.$fhem.log({ lvl: 5, msg: 'ClickEnd: type ' + val + ':' + evt });

        if(this.touchFirst && evt === 'mouse') return;
        if(evt === 'touch') this.touchFirst = true;

        this.timer = clearInterval(this.timer);

        let action = this.setup.main[this.mainLevel].[val + (this.long ? 'LongRelease' : 'Click')];

        this.$fhem.log({ lvl: 5, msg: 'ClickEvent: ' + (this.long ? 'LongRelease' : 'Click') + ' [' + action + ']' });

        if(action) {
          let param = this.$fhem.handleVals(this.item, action);
          if(param[0]) {
            this.vals.main.sliderPrevent = false;
            let cmd = this.createCmd(param[0]);
            let isIncrement = action.findIndex((e) => e.match('%i')) != -1 ? true : false;
            if(!this.long && isIncrement) this.updateReading(cmd);

            this.sendCmd(cmd, isIncrement);
          }
        }
      },

      sliderVal(val) {
        let action = this.setup.main[this.mainLevel].slider;
        let result = val;

        if(action) {
          let param = this.$fhem.handleVals(this.item, action);
          let decimal = param[4].match('.') ? 1 : 0;

          result = val.toFixed(decimal)
        }

        return result;
      },

      setSlider(val) {
        let action = this.setup.main[this.mainLevel].slider;

        if(action) {
          let param = this.$fhem.handleVals(this.item, action);

          if(param[0]) {
            this.vals.main.sliderPrevent = true;
            let cmd = this.createCmd(param[0]);
            let decimal = param[4].match('.') ? 1 : 0;

            cmd = cmd.replace('%v', val.toFixed(decimal));
            this.sendCmd(cmd);
          }
        }
      },

      createMenu(arr) {
        let result = [];

        if(arr && arr.length > 0) {
          for(let item of arr) {
            let vals = item.split(':');

            if(vals.length > 1) {
              let cmd = this.createCmd(vals[1]);
              result.push({ name: vals[0], cmd });
            }
          }
        }

        return result;
      },

      setLevel(lvl) {
        if(!isNaN(lvl)) {
          this.multiLevel = this.setup.main.length > 1 ? true : false;
          this.mainLevel = lvl;
        } else {
          this.mainLevel ++;
          if(this.mainLevel > this.setup.main.length - 1) this.mainLevel = 0;
        }

        this.vals.main.leftBtn = this.setup.main[this.mainLevel].leftBtn;
        this.vals.main.rightBtn = this.setup.main[this.mainLevel].rightBtn;

        this.setValues();
      },

      setValues() {
        if(this.setup.main.length > 0) {
          let mainText = this.$fhem.handleVals(this.item, this.setup.main[this.mainLevel].text);
          let mainText2 = this.$fhem.handleVals(this.item, this.setup.main[this.mainLevel].text2);
          let mainSlider = this.$fhem.handleVals(this.item, this.setup.main[this.mainLevel].slider);
          let mainLeftBtn = this.$fhem.handleVals(this.item, this.setup.main[this.mainLevel].leftBtn);
          let mainRightBtn = this.$fhem.handleVals(this.item, this.setup.main[this.mainLevel].rightBtn);
          let mainLeftMenu = this.createMenu(this.setup.main[this.mainLevel].leftMenu);
          let mainRightMenu = this.createMenu(this.setup.main[this.mainLevel].rightMenu);

          this.vals.main.text = mainText[0] || '';
          this.vals.main.text2 = mainText2[0] || '';

          this.vals.main.leftBtn = mainLeftBtn[0] || '';
          this.vals.main.rightBtn = mainRightBtn[0] || '';
          this.vals.main.leftBtnDisabled = mainLeftBtn[1] ? true : false;
          this.vals.main.rightBtnDisabled = mainRightBtn[1] ? true : false;
          this.vals.main.leftMenu = mainLeftMenu;
          this.vals.main.rightMenu = mainRightMenu;

          this.vals.main.slider = mainSlider[0] ? true : false;
          this.vals.main.sliderMin = mainSlider[2] || 0;
          this.vals.main.sliderMax = mainSlider[3] || 100;
          this.vals.main.sliderStep = mainSlider[4] || 1;

          if(!this.vals.main.sliderPrevent) {
            this.vals.main.sliderCurrent = mainSlider[1] || 0;
          } else {
            if(this.vals.main.sliderCurrent === mainSlider[1]) {
              this.vals.main.sliderPrevent = false;
              this.vals.main.sliderCurrent = mainSlider[1] || 0;
            }
          }

        }
      }
    }
  }
</script>
