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
      </v-card-title>
      <v-divider />

      <v-card-text>
        <v-row align="center">
          <v-col align="center">
            <div class="headline font-weight-bold text-truncate">
              {{ vals.main.text | scene_text }}
            </div>
          </v-col>
          <v-divider vertical />
          <v-col
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
                    {{ vals.main.rightIcon }}
                  </v-icon>
                </v-btn>
              </template>

              <v-list
                dense
                color="secondary lighten-2"
              >
                <v-list-item-group
                  v-model="vals.sceneSelected"
                  active-class="accent--text"
                >
                  <v-list-item
                    v-for="(scene, i) in vals.scenes"
                    :key="i"
                    @click="setScene(scene)"
                  >
                    <v-list-item-content>
                      <v-list-item-title class="text-subtitle-1">
                        {{ scene | scene_text }}
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon v-if="scene === vals.main.text">
                      <v-icon>mdi-check</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />
      <v-system-bar color="secondary darken-1">
        <v-icon>{{ vals.info.left1Icon }}</v-icon>{{ vals.info.left1Text }}
      </v-system-bar>
    </v-card>
  </v-col>
</template>

<script>
  export default {

    filters: {
      scene_text(val) {
        return val.replace('_', ' ');
      }
    },

    props: {
      item: {
        type: Object,
        default: () => { return { name: 'scene' } }
      }
    },

    data: () => ({
      name: 'scene',

      setup: {
        size: 'col-12 col-sm-6 col-md-4 col-lg-4',
        status: {
          bar: ["state:unknown:0:success","state::100:success"]
        },
        main: [
          {
            text: ["state:unknown:...","state::%s"]
          }
        ],
        info: {
          left1: ["state:unknown::mdi-movie-open","state:::mdi-movie-open-check"]
        }
      },

      vals: {
        title: '',
        status: {
          level: 0,
          color: ''
        },
        main: {
          text: '',
          rightIcon: 'mdi-dots-vertical'
        },
        info: {
          left1Icon: '',
          left1Text: ''
        },
        scenes: [],
        sceneSelected: -1
      },
    }),

    watch: {
      item: {
        immediate: true,
        deep: true,
        handler(val) {
          let alias = this.$fhem.getEl(val, 'Attributes', 'alias') || val.Name;

          this.vals.title = this.$fhem.getEl(val, 'Options', 'name') || alias;
          this.setValues();

          this.vals.sceneSelected = this.vals.scenes.indexOf(this.vals.main.text);
        }
      },
    },

    created() {
      let size = this.$fhem.getEl(this.item, 'Options', 'setup', 'size');
      let status = this.$fhem.getEl(this.item, 'Options', 'setup', 'status');
      let main = this.$fhem.getEl(this.item, 'Options', 'setup', 'main');
      let info = this.$fhem.getEl(this.item, 'Options', 'setup', 'info');

      if(size) this.setup.size = size;
      if(status) Object.assign(this.setup.status, status);
      if(main) Object.assign(this.setup.main, main);
      if(info) Object.assign(this.setup.info, info);

      this.setValues();
      this.loadScenes();
    },

    methods: {
      setValues() {
        let statusVals = this.$fhem.handleVals(this.item, this.setup.status.bar);
        let mainText = this.$fhem.handleVals(this.item, this.setup.main[0].text);
        let infoLeft1Vals = this.$fhem.handleVals(this.item, this.setup.info.left1);

        this.vals.status.level = statusVals[0] || '100';
        this.vals.status.color = statusVals[1] || 'success';

        this.vals.main.text = mainText[0] || '';

        this.vals.info.left1Icon = infoLeft1Vals[1] || '';
        this.vals.info.left1Text = infoLeft1Vals[0] || '';
      },

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
            this.vals.sceneSelected = this.vals.scenes.indexOf(this.vals.main.text);
          })
      },

      setScene(val) {
        this.vals.mainState = val;

        if(this.vals.mainState != this.item.Readings.state.Value) {
          let cmd = 'set ' + this.item.Name + ' scene ' + this.vals.mainState;
          this.$fhem.request(cmd);
        }
      },
    }
  }
</script>
