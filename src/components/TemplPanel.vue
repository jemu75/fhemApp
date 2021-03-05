<template>
  <v-col class="col-12 col-sm-6 col-md-6 col-lg-6" :order="vals.order">
    <v-card :dark="this.$vuetify.theme.dark" color="secondary">
      <v-progress-linear height="7" :value="vals.mainLevel" :color="vals.mainColor" background-color="secondary lighten-1"></v-progress-linear>

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
              <div class="headline">{{ el.title }}</div>
              <div>{{ el.mainState }}</div>
            </v-col>
            <v-col class="col-2" align="center">
              <v-btn v-if="el.route" icon link :to="el.route">
                <v-icon large>{{ rightIcon }}</v-icon>
              </v-btn>
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
          this.vals.order = this.$fhem.getEl(val, 'Attributes', 'sortby') || 'last';
          this.vals.title = this.$fhem.getEl(val, 'Attributes', 'alias') || val.Name;
          this.vals = this.$fhem.handleStates(val, this.vals);
          this.doList(val);
        }
      }
    },

    methods: {
      doList(val) {
        if(val.Connected) {
          for(const item in val.Options.connected) {
            let idx = this.list.map((e) => e.name).indexOf(item);
            let states = this.$fhem.handleStates(val.Connected[item], {});

            let listItem = {
              name: item,
              title: this.$fhem.getEl(val.Connected[item], 'Attributes', 'alias') || val.Connected[item].Name,
              mainState: states.mainState,
              mainColor: states.mainColor,
              mainLevel: states.mainLevel,
              route: this.$fhem.getEl(val.Connected[item], 'Options', 'link')
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
