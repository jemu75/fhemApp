<template>
  <v-col
    v-if="item.Options.show"
    :class="item.Options.setup.size"
  >
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
        {{ item.Options.name }}

        <v-spacer />
        <v-btn
          v-if="lvlIcon && item.Options.status.isActive"
          small
          icon
          @click="lvlBtn()"
        >
          <v-icon small>
            {{ lvlIcon }}
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
        <div
          v-for="level in main"
          :key="level.idx"
        >
          <v-card-text>
            <div v-if="!level.slider">
              <v-row align="center">
                <v-col
                  v-if="level.leftMenu.length == 0 && level.leftBtn"
                  class="col-3"
                  align="center"
                >
                  <v-btn
                    small
                    icon
                    :disabled="level.leftBtnDisabled"
                    @touchstart="clickStart(level.idx, 'left','touch')"
                    @touchend="clickEnd(level.idx, 'left','touch')"
                    @mousedown="clickStart(level.idx, 'left','mouse')"
                    @mouseup="clickEnd(level.idx, 'left','mouse')"
                  >
                    <v-icon large>
                      {{ level.leftBtn }}
                    </v-icon>
                  </v-btn>
                </v-col>
                <v-col
                  v-if="level.leftMenu.length > 0 && level.leftBtn"
                  class="col-3"
                  align="center"
                >
                  <v-menu
                    bottom
                    right
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
                          {{ level.leftBtn }}
                        </v-icon>
                      </v-btn>
                    </template>

                    <v-list
                      dense
                      color="secondary lighten-2"
                    >
                      <v-list-item-group
                        v-model="level.leftMenuIdx"
                        active-class="success--text"
                      >
                        <v-list-item
                          v-for="(menu, i) in level.leftMenu"
                          :key="i"
                          @click="sendCmd(menu.cmd)"
                        >
                          <v-list-item-content>
                            <v-list-item-title class="text-subtitle-1">
                              {{ menu.name }}
                            </v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-icon v-if="menu.active">
                            <v-icon>mdi-check</v-icon>
                          </v-list-item-icon>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-menu>
                </v-col>
                <v-divider
                  v-if="level.leftBtn"
                  vertical
                />

                <v-col
                  v-if="!level.midBtn"
                  align="center"
                >
                  <div class="headline font-weight-bold">
                    {{ level.text }}
                  </div>
                </v-col>
                <v-col
                  v-if="level.text2 && !level.midBtn"
                  align="center"
                >
                  <div class="headline font-weight-bold">
                    {{ level.text2 }}
                  </div>
                </v-col>

                <v-col
                  v-if="level.midMenu.length === 0 && level.midBtn"
                  align="center"
                  class="headline"
                >
                  <v-btn
                    small
                    icon
                    :disabled="level.midBtnDisabled"
                    @touchstart="clickStart(level.idx, 'mid','touch')"
                    @touchend="clickEnd(level.idx, 'mid','touch')"
                    @mousedown="clickStart(level.idx, 'mid','mouse')"
                    @mouseup="clickEnd(level.idx, 'mid','mouse')"
                  >
                    <v-icon large>
                      {{ level.midBtn }}
                    </v-icon>
                  </v-btn>
                </v-col>

                <v-col
                  v-if="level.midMenu.length > 0 && level.midBtn"
                  class="headline"
                  align="center"
                >
                  <v-menu
                    bottom
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
                          {{ level.midBtn }}
                        </v-icon>
                      </v-btn>
                    </template>

                    <v-list
                      dense
                      color="secondary lighten-2"
                    >
                      <v-list-item-group
                        v-model="level.midMenuIdx"
                        active-class="success--text"
                      >
                        <v-list-item
                          v-for="(menu, i) in level.midMenu"
                          :key="i"
                          @click="sendCmd(menu.cmd)"
                        >
                          <v-list-item-content>
                            <v-list-item-title class="text-subtitle-1">
                              {{ menu.name }}
                            </v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-icon v-if="menu.active">
                            <v-icon>mdi-check</v-icon>
                          </v-list-item-icon>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-menu>
                </v-col>

                <v-divider
                  v-if="level.rightBtn"
                  vertical
                />
                <v-col
                  v-if="level.rightMenu.length === 0 && level.rightBtn"
                  class="col-3"
                  align="center"
                >
                  <v-btn
                    small
                    icon
                    :disabled="level.rightBtnDisabled"
                    @touchstart="clickStart(level.idx, 'right','touch')"
                    @touchend="clickEnd(level.idx, 'right','touch')"
                    @mousedown="clickStart(level.idx, 'right','mouse')"
                    @mouseup="clickEnd(level.idx, 'right','mouse')"
                  >
                    <v-icon large>
                      {{ level.rightBtn }}
                    </v-icon>
                  </v-btn>
                </v-col>
                <v-col
                  v-if="level.rightMenu.length > 0 && level.rightBtn"
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
                          {{ level.rightBtn }}
                        </v-icon>
                      </v-btn>
                    </template>

                    <v-list
                      dense
                      color="secondary lighten-2"
                    >
                      <v-list-item-group
                        v-model="level.rightMenuIdx"
                        active-class="success--text"
                      >
                        <v-list-item
                          v-for="(menu, i) in level.rightMenu"
                          :key="i"
                          @click="sendCmd(menu.cmd)"
                        >
                          <v-list-item-content>
                            <v-list-item-title class="text-subtitle-1">
                              {{ menu.name }}
                            </v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-icon v-if="menu.active">
                            <v-icon>mdi-check</v-icon>
                          </v-list-item-icon>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-menu>
                </v-col>
              </v-row>
            </div>
            <div v-if="level.slider">
              <v-row align="center">
                <v-col align="center">
                  <v-slider
                    class="ml-5 mr-5"
                    v-model="level.sliderCurrent"
                    :min="level.sliderMin"
                    :max="level.sliderMax"
                    hide-details
                    thumb-label
                    thumb-size="48"
                    color="success"
                    :step="level.sliderStep"
                    @change="setSlider(level.idx, level.sliderCurrent)"
                  >
                    <template v-slot:thumb-label="{ value }">
                      <div class="text-h6">
                        {{ sliderVal(level.idx, value) }}
                      </div>
                    </template>

                    <template
                      v-if="level.leftBtn"
                      v-slot:prepend
                    >
                      <v-icon @click="clickEnd(level.idx, 'left')">
                        {{ level.leftBtn }}
                      </v-icon>
                    </template>
                    <template
                      v-if="level.rightBtn"
                      v-slot:append
                    >
                      <v-icon @click="clickEnd(level.idx, 'right')">
                        {{ level.rightBtn }}
                      </v-icon>
                    </template>
                  </v-slider>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
          <v-divider />
        </div>
      </div>

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
      main: [],
      lvlMax: 1,
      lvlIcon: null,
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
          this.setVals();
        }
      },
    },

    created() {
      this.app.options = this.$fhem.app.options;

      this.lvlMax = this.item.Options.setup.main.length;
      this.lvlIcon = this.lvlMax > 1 ? (this.item.Options.setup.expand ? 'mdi-arrow-expand' : 'mdi-swap-vertical') : null;

      this.setLvl(0);
      this.setVals();
    },

    methods: {
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
          let parts = param.trim().split(' ');
          if(parts[1] && parts[1].match('Connected')) {
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

      clickStart(idx, val, evt) {
        this.long = false;
        this.$fhem.log({ lvl: 5, msg: 'ClickStart: type ' + val + ':' + evt })

        if(this.touchFirst && evt === 'mouse') return;
        if(evt === 'touch') this.touchFirst = true;

        this.timer = setInterval(() => {
          this.long = true;

          let action = this.item.Options.setup.main[idx].[val + 'Long'];

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

      clickEnd(idx, val, evt) {
        this.$fhem.log({ lvl: 5, msg: 'ClickEnd: type ' + val + ':' + evt });

        if(this.touchFirst && evt === 'mouse') return;
        if(evt === 'touch') this.touchFirst = true;

        this.timer = clearInterval(this.timer);

        let action = this.item.Options.setup.main[idx].[val + (this.long ? 'LongRelease' : 'Click')];

        this.$fhem.log({ lvl: 5, msg: 'ClickEvent: ' + (this.long ? 'LongRelease' : 'Click') + ' [' + action + ']' });

        if(action) {
          let param = this.$fhem.handleVals(this.item, action);
          if(param[0]) {
            let lvl = this.item.Options.setup.expand ? idx : 0;

            this.main[lvl].sliderPrevent = false;
            let cmd = this.createCmd(param[0]);
            let isIncrement = action.findIndex((e) => e.match('%i')) != -1 ? true : false;
            if(!this.long && isIncrement) this.updateReading(cmd);

            this.sendCmd(cmd, isIncrement);
          }
        }
      },

      sliderVal(idx, val) {
        let action = this.item.Options.setup.main[idx].slider;
        let result = val;

        if(action) {
          let param = this.$fhem.handleVals(this.item, action);
          let decimal = (param[4] && param[4].match('.')) ? 1 : 0;

          result = val.toFixed(decimal)
        }

        return result;
      },

      setSlider(idx, val) {
        let action = this.item.Options.setup.main[idx].slider;

        if(action) {
          let param = this.$fhem.handleVals(this.item, action);

          if(param[0]) {
            let lvl = this.item.Options.setup.expand ? idx : 0;

            this.main[lvl].sliderPrevent = true;
            let cmd = this.createCmd(param[0]);
            let decimal = (param[4] && param[4].match('.')) ? 1 : 0;

            cmd = cmd.replace('%v', val.toFixed(decimal));
            this.sendCmd(cmd);
          }
        }
      },

      checkMenu(cmd) {
        let result = false;

        if(cmd) {
          let parts = cmd.split(' ');

          if(parts[0].match('set')) parts.splice(0, 2);
          if(parts.length === 1) parts.splice(0, 0, 'state');

          let value = /\./.test(parts[0]) ? parts[0].split('.') : [ 'Readings', parts[0], 'Value' ];
          let state = this.$fhem.getEl(this.item, ...value);
          if(state && state.match(parts[1])) result = true;
        }

        return result;
      },

      createMenu(arr) {
        let result = [];

        if(arr && arr.length > 0) {
          for(let item of arr) {
            let vals = item.split(':');

            if(vals.length > 1) {
              let cmd = this.createCmd(vals[1]);
              let active = this.checkMenu(cmd);
              result.push({ name: vals[0], cmd, active });
            }
          }
        }

        return result;
      },

      lvlBtn() {
        let idx = 0;

        if(this.item.Options.setup.expand) {
          idx = this.main.length > 1 ? 0 : -1;
          this.lvlIcon = idx === -1 ?  'mdi-arrow-collapse' : 'mdi-arrow-expand';
        } else {
          idx = this.main[0].idx + 1;
          if(idx > this.lvlMax - 1) idx = 0;
        }
        this.setLvl(idx);
        this.setVals();
      },

      setLvl(lvl) {
        let from = lvl != -1 ? lvl : 0;
        let to = lvl != -1 ? lvl : this.lvlMax - 1;

        this.main.splice(0);

        for(let i = from; i <= to; i++) {
          let lvlSet = {
            idx: i,
            leftBtn: '',
            leftBtnDisabled: false,
            leftMenu: [],
            leftMenuIdx: -1,
            text: '',
            text2: '',
            midBtn: '',
            midBtnDisabled: false,
            midMenu: [],
            midMenuIdx: -1,
            slider: false,
            sliderCurrent: 0,
            sliderPrevent: false,
            sliderMin: 0,
            sliderMax: 100,
            sliderStep: 1,
            rightBtn: '',
            rightBtnDisabled: false,
            rightMenu: [],
            rightMenuIdx: -1
          }

          this.main.push(lvlSet);
        }
      },

      setVals() {
        for(const lvl in this.main) {
          let idx = this.main[lvl].idx;

          let mainText = this.$fhem.handleVals(this.item, this.item.Options.setup.main[idx].text);
          let mainText2 = this.$fhem.handleVals(this.item, this.item.Options.setup.main[idx].text2);
          let mainSlider = this.$fhem.handleVals(this.item, this.item.Options.setup.main[idx].slider);
          let mainLeftBtn = this.$fhem.handleVals(this.item, this.item.Options.setup.main[idx].leftBtn);
          let mainMidBtn = this.$fhem.handleVals(this.item, this.item.Options.setup.main[idx].midBtn);
          let mainRightBtn = this.$fhem.handleVals(this.item, this.item.Options.setup.main[idx].rightBtn);
          let mainLeftMenu = this.createMenu(this.item.Options.setup.main[idx].leftMenu);
          let mainMidMenu = this.createMenu(this.item.Options.setup.main[idx].midMenu);
          let mainRightMenu = this.createMenu(this.item.Options.setup.main[idx].rightMenu);

          this.main[lvl].text = mainText[0] || '';
          this.main[lvl].text2 = mainText2[0] || '';

          this.main[lvl].leftBtn = mainLeftBtn[0] || '';
          this.main[lvl].midBtn = mainMidBtn[0] || '';
          this.main[lvl].rightBtn = mainRightBtn[0] || '';
          this.main[lvl].leftBtnDisabled = mainLeftBtn[1] ? true : false;
          this.main[lvl].midBtnDisabled = mainMidBtn[1] ? true : false;
          this.main[lvl].rightBtnDisabled = mainRightBtn[1] ? true : false;
          this.main[lvl].leftMenu = mainLeftMenu;
          this.main[lvl].leftMenuIdx = mainLeftMenu.map((e) => e.active).indexOf(true);
          this.main[lvl].midMenu = mainMidMenu;
          this.main[lvl].midMenuIdx = mainMidMenu.map((e) => e.active).indexOf(true);
          this.main[lvl].rightMenu = mainRightMenu;
          this.main[lvl].rightMenuIdx = mainRightMenu.map((e) => e.active).indexOf(true);

          this.main[lvl].slider = mainSlider[0] ? true : false;
          this.main[lvl].sliderMin = mainSlider[2] || 0;
          this.main[lvl].sliderMax = mainSlider[3] || 100;
          this.main[lvl].sliderStep = mainSlider[4] || 1;

          if(!this.main[lvl].sliderPrevent) {
            this.main[lvl].sliderCurrent = mainSlider[1] || 0;
          } else {
            if(this.main[lvl].sliderCurrent === mainSlider[1]) {
              this.main[lvl].sliderPrevent = false;
              this.main[lvl].sliderCurrent = mainSlider[1] || 0;
            }
          }

        }
      },
    }
  }
</script>
