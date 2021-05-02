<template>
  <v-col :class="setup.size">
    <v-card
      :dark="this.$vuetify.theme.dark"
      color="secondary"
    >
      <v-progress-linear
        height="7"
        :value="getLevel"
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

      <v-card-text class="pa-0">
        <div
          v-for="el in list"
          :key="el.Name"
          align="center"
        >
          <v-row
            dense
            class="ma-1"
            align="center"
          >
            <v-col class="col-2">
              <v-progress-circular
                :value="el.level"
                :color="el.color"
              />
            </v-col>
            <v-col
              class="text-truncate"
              align="left"
            >
              <div class="text-truncate headline">
                {{ el.title }}
              </div>
              <div class="text-truncate">
                {{ el.text }}
              </div>
            </v-col>
            <v-col
              class="col-2"
              align="center"
            >
              <v-btn
                v-if="el.route && !el.click && el.icon"
                icon
                link
                :to="el.route"
              >
                <v-icon large>
                  {{ el.icon }}
                </v-icon>
              </v-btn>
              <div v-if="el.click && !el.route && el.icon">
                <v-btn
                  icon
                  @click="set(el.device, el.click)"
                >
                  <v-icon large>
                    {{ el.icon }}
                  </v-icon>
                </v-btn>
              </div>

              <div
                v-if="el.menu && !el.route && !el.click && el.icon"
              >
                <v-menu
                  bottom
                  left
                  transition="slide-y-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon large>
                        {{ el.icon }}
                      </v-icon>
                    </v-btn>
                  </template>

                  <v-list
                    dense
                    color="secondary lighten-2"
                  >
                    <v-list-item-group>
                      <v-list-item
                        v-for="(menu, i) in el.menu"
                        :key="i"
                        @click="set(el.device, menu.cmd)"
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
              </div>
            </v-col>
          </v-row>
          <v-divider />
        </div>
      </v-card-text>

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
        default: () => { return { name: 'panel' } }
      }
    },

    data: () => ({
      name: 'panel',
      app: {
        options: {
          debugMode: false
        }
      },
      setup: {
        size: 'col-12 col-sm-6 col-md-6 col-lg-6',
        status: {
          bar: [],
          error: [],
          min: 0,
          max: 100
        },
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
        status: {
          level: 0,
          color: '',
          invert: false,
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
      list: [],
      statusAlert: false
    }),

    computed: {
      getLevel() {
        let steps = 100 / (this.setup.status.max - this.setup.status.min);
        let level = (this.vals.status.level - this.setup.status.min) * steps;

        return this.vals.status.invert ? 100 - level : level;
      }
    },

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
        }
      }
    },

    created() {
      this.app.options = this.$fhem.app.options;

      let size = this.$fhem.getEl(this.item, 'Options', 'setup', 'size');
      let status = this.$fhem.getEl(this.item, 'Options', 'setup', 'status');
      let info = this.$fhem.getEl(this.item, 'Options', 'setup', 'info');

      if(size) this.setup.size = size;
      if(status) Object.assign(this.setup.status, status);
      if(info) Object.assign(this.setup.info, info);
    },

    methods: {
      setValues() {
        let statusVals = this.$fhem.handleVals(this.item, this.setup.status.bar);
        let errorVals = this.$fhem.handleVals(this.item, this.setup.status.error);
        let infoLeft1Vals = this.$fhem.handleVals(this.item, this.setup.info.left1);
        let infoLeft2Vals = this.$fhem.handleVals(this.item, this.setup.info.left2);
        let infoMid1Vals = this.$fhem.handleVals(this.item, this.setup.info.mid1);
        let infoMid2Vals = this.$fhem.handleVals(this.item, this.setup.info.mid2);
        let infoRight1Vals = this.$fhem.handleVals(this.item, this.setup.info.right1);
        let infoRight2Vals = this.$fhem.handleVals(this.item, this.setup.info.right2);


        if(!this.statusAlert) {
          this.vals.status.level = statusVals[0] || '100';
          this.vals.status.color = statusVals[1] || 'success';
          this.vals.status.invert = statusVals[2] ? true : false;
        }

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

      set(device, param) {
        let cmd = param.match('set') ? param : 'set ' + device + ' ' + param;
        this.$fhem.request(cmd);
      },

      loadItem(obj) {
        let device = this.$fhem.getEl(obj, 'Name') || '';
        let alias = this.$fhem.getEl(obj, 'Attributes', 'alias') || obj.Name;
        let title = this.$fhem.getEl(obj, 'Options', 'name') || alias;
        let route = this.$fhem.getEl(obj, 'Options', 'panel', 'link') || '';
        let state = this.$fhem.handleVals(obj, this.$fhem.getEl(obj, 'Options', 'panel', 'status')) || [];
        let btn = this.$fhem.handleVals(obj, this.$fhem.getEl(obj, 'Options', 'panel', 'btn')) || [];
        let cmd = this.$fhem.handleVals(obj, this.$fhem.getEl(obj, 'Options', 'panel', 'click')) || [];
        let menu = this.$fhem.getEl(obj, 'Options', 'panel', 'menu') || [];
        let min = this.$fhem.getEl(obj, 'Options', 'panel', 'min') || 0;
        let max = this.$fhem.getEl(obj, 'Options', 'panel', 'max') || 100;
        let steps = 100 / (max - min);
        let level = ((state[1] || 0) - min) * steps;

        let menuItems = [];
        if(menu.length > 0) {
          for(const el of menu) {
            let parts = el.split(':');
            if(parts.length == 2) menuItems.push({ name: parts[0], cmd: parts[1] })
          }
        }

        let result = {
          device: device,
          title: title,
          text: state[0] || '',
          level: state[3] ? 100 - level : level,
          color: state[2] || 'success',
          icon: btn[0] || '',
          route: route,
          click: cmd[0] || '',
          menu: menuItems
        }

        return result;
      },

      doList() {
        if(this.item.Connected) {
          for(var item in this.item.Options.connected) {
            let idx = this.list.map((e) => e.name).indexOf(item);

            let data = this.loadItem(this.item.Connected[item]);

            let listItem = {
              name: item,
              device: data.device,
              level: data.level,
              color: data.color,
              title: data.title,
              text: data.text,
              icon: data.icon,
              route: data.route,
              click: data.click,
              menu: data.menu
            };

            if(this.setup.status.bar.length == 0 && listItem.color != 'success' && this.vals.status.color === 'success') {
              this.statusAlert = true;
              this.vals.status.color = listItem.color;
            }

            if(idx != -1) {
              this.list.splice(idx, 1, listItem);
            } else {
              this.list.push(listItem);
            }
          }
        }
      }
    }
  }
</script>
