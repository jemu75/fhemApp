<template>
  <v-col class="col-12 col-sm-6 col-md-6 col-lg-6" :order="vals.order">
    <v-card :dark="this.$vuetify.theme.dark" color="secondary">
      <v-progress-linear height="7" :value="vals.mainLevel" :color="vals.mainColor" background-color="secondary darken-1"></v-progress-linear>

      <v-card-title class="text-truncate">{{ vals.title }}</v-card-title>
      <v-divider></v-divider>

      <v-card-text class="pa-0">
        <div v-for="el in list" :key="el.Name" align="center">
          <v-row dense class="ma-1" align="center">
            <v-col class="col-2">
              <v-progress-circular :value="el.mainLevel" :color="el.mainColor">
              </v-progress-circular>
            </v-col>
            <v-col class="text-truncate" align="left">
              <div class="text-truncate headline">{{ el.title }}</div>
              <div class="text-truncate">{{ el.mainState }}</div>
            </v-col>
            <v-divider v-if="el.toggleCmd" vertical></v-divider>
            <v-col class="col-2" align="center">
              <v-btn v-if="el.route" icon link :to="el.route">
                <v-icon large>{{ rightIcon }}</v-icon>
              </v-btn>
              <div v-if="el.toggleCmd">
                <v-btn icon @click="set(el.toggleCmd)">
                  <v-icon large>{{ el.toggleIcon }}</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </div>
      </v-card-text>
      <v-system-bar color="secondary darken-1">
        <v-icon>{{ vals.systemIcon }}</v-icon>{{ vals.systemIconValue }}
        <v-spacer></v-spacer>
        {{ vals.systemLastEvent }}
        <v-spacer></v-spacer>
      </v-system-bar>
    </v-card>
  </v-col>
</template>

<script>
  export default {
    data: () => ({
      name: 'linkPanel',
      defaultSet: [],
      vals: {
        order: '',
        title: '',
        mainLevel: 100,
        mainColor: 'success',
        systemIcon: '',
        systemIconValue: '',
        systemLastEvent: ''
      },
      rightIcon: 'mdi-chevron-right',
      list: []
    }),

    watch: {
      item: {
        immediate: true,
        deep: true,
        handler(val) {
          let alias = this.$fhem.getEl(val, 'Attributes', 'alias') || val.Name;

          this.vals.title = this.$fhem.getEl(val, 'Options', 'name') || alias;
          this.vals.order = this.$fhem.getEl(val, 'Attributes', 'sortby') || 'last';
          this.vals = this.$fhem.handleStates(val, this.vals);
          this.doList(val);
        }
      }
    },

    methods: {
      checkToggle(item) {
        let toggleDefs = this.$fhem.getEl(item, 'Options', 'toggle');
        let result = null;

        if(toggleDefs && toggleDefs.length > 0) {
          for(var def of toggleDefs) {
            let vals = def.split(':');
            let value = this.$fhem.getEl(item, 'Readings', vals[0] || 'state', 'Value')

            if(!result || value === vals[1]) {
              result = {
                cmd: vals[2] ? ('set ' + item.Name + ' ' + vals[2]) : null,
                icon: vals[3] || ''
              }
            }
          }
        } else {
          result = { cmd: null, icon: '' }
        }
        return result;
      },

      set(cmd) {
        this.$fhem.request(cmd)
      },

      doList(val) {
        if(val.Connected) {
          for(var item in val.Options.connected) {
            let idx = this.list.map((e) => e.name).indexOf(item);
            let states = this.$fhem.handleStates(val.Connected[item], {});
            let toggle = this.checkToggle(val.Connected[item]);

            let listItem = {
              name: item,
              title: this.$fhem.getEl(val.Connected[item], 'Attributes', 'alias') || val.Connected[item].Name,
              mainState: states.mainState,
              mainColor: states.mainColor,
              mainLevel: states.mainLevel,
              route: this.$fhem.getEl(val.Connected[item], 'Options', 'link'),
              toggleIcon: toggle.icon,
              toggleCmd: toggle.cmd
            }

            if(listItem.mainColor != 'success') {
              this.vals.mainColor = listItem.mainColor;
              this.vals.mainLevel = 100;
            }

            if(idx != -1) {
              this.list.splice(idx, 1, listItem);
            } else {
              this.list.push(listItem);
            }

          }
        }
      }
    },

    props: {
      item: {}, // jsonObject from FHEM Device
    }
  }
</script>
