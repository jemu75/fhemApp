<template>
  <v-col
    v-if="item.Options.show"
    :class="item.Options.setup.size || size"
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
          <div
            v-for="el in panelItems"
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
        default: () => { return { name: 'panel' } }
      }
    },

    data: () => ({
      name: 'panel',
      size: 'col-12 col-sm-6 col-md-6 col-lg-6',
      status: {
        color: 'success',
        level: 0
      },
      app: {
        options: {
          debugMode: false
        }
      },
      panelItems: []
    }),

    watch: {
      item: {
        immediate: true,
        deep: true,
        handler() {
          this.doList();
        }
      },
    },

    created() {
      this.app.options = this.$fhem.app.options;
    },

    methods: {
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
          this.status.color = 'success';

          for(var item in this.item.Options.connected) {
            let idx = this.panelItems.map((e) => e.name).indexOf(item);

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

            if(data.color != 'success') {
              this.status.color = data.color;
              this.status.level = 100;
            }


            if(idx != -1) {
              this.panelItems.splice(idx, 1, listItem);
            } else {
              this.panelItems.push(listItem);
            }
          }
        }
      }
    }
  }
</script>
