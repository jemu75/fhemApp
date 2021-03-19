<template>
  <v-col class="col-12 col-sm-6 col-md-4 col-lg-4">
    <v-card :dark="this.$vuetify.theme.dark" color="secondary">
      <v-progress-linear height="7" :value="vals.mainLevel" :color="vals.mainColor" background-color="secondary darken-1"></v-progress-linear>

      <v-card-title class="text-truncate">
        {{ vals.title }}
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-row align="center">
          <v-col align="center">
            <div class="headline font-weight-bold text-truncate">{{ vals.mainState | scene_text }}</div>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col class="col-3" align="center">
            <v-menu bottom left transition="slide-y-transition">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon large>{{ rightIcon }}</v-icon>
                </v-btn>
              </template>

              <v-list dense color="secondary lighten-2">
                <v-list-item-group v-model="vals.sceneSelected" active-class="accent--text">
                  <v-list-item v-for="(scene, i) in vals.scenes" :key="i" @click="setScene(scene)">
                    <v-list-item-content>
                      <v-list-item-title class="text-subtitle-1">{{ scene | scene_text }}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon v-if="scene === vals.mainState">
                      <v-icon>mdi-check</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>
      <v-system-bar color="secondary darken-1">
        <v-icon>{{ vals.systemIcon }}</v-icon>{{ vals.systemIconValue }}
      </v-system-bar>
    </v-card>
  </v-col>
</template>

<script>
  export default {
    data: () => ({
      name: 'scene',
      defaultSet: [
        "state:unknown:...:0:success:mdi-movie-open",
        "state::state:100:success:mdi-movie-open-check"
      ],
      vals: {
        title: '',
        mainState: '',
        mainLevel: 0,
        mainColor: '',
        scenes: [],
        sceneSelected: -1,
        systemIcon: 'mdi-movie-open-check',
        systemIconValue: ''
      },
      rightIcon: 'mdi-dots-vertical',
    }),

    watch: {
      item: {
        immediate: true,
        deep: true,
        handler(val) {
          let alias = this.$fhem.getEl(val, 'Attributes', 'alias') || val.Name;

          this.vals.title = this.$fhem.getEl(val, 'Options', 'name') || alias;
          this.vals.mainState = this.$fhem.getEl(val, 'Readings', 'state', 'Value');

          this.vals = this.$fhem.handleStates(val, this.vals, this.defaultSet);

          this.vals.sceneSelected = this.vals.scenes.indexOf(this.vals.mainState);
        }
      },
    },

    filters: {
      scene_text(val) {
        return val.replace('_', ' ');
      }
    },

    methods: {
      loadScenes() {
        let params = [
          { param: 'cmd', value: 'get ' + this.item.Name + ' scenes' },
          { param: 'XHR', value: '1' }
        ];

        this.vals.scenes.splice(0);

        this.$fhem.request(params)
          .then((res) => {
            if(res) {
              let scenes = res.replace('\n\n','').split('\n');
              this.vals.scenes.push(...scenes);
            }
            this.vals.sceneSelected = this.vals.scenes.indexOf(this.vals.mainState);
          })
      },

      setScene(val) {
        this.vals.mainState = val;

        if(this.vals.mainState != this.item.Readings.state.Value) {
          let cmd = 'set ' + this.item.Name + ' scene ' + this.vals.mainState;
          this.$fhem.request(cmd);
        }
      },
    },

    created() {
      this.loadScenes();
    },

    props: {
      item: {}, // jsonObject from FHEM Device
    }
  }
</script>
