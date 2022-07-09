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
        <v-btn
          v-if="item.Options.status.isActive"
          small
          icon
          @click="expand"
        >
          <v-icon small>
            {{ maxIcon }}
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
        <v-card-text>
          <v-row align="center">
            <v-col align="center">
              <div class="headline font-weight-bold">
                {{ text }}
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text class="pa-0">
          <v-row v-if="expanded" align="center">
            <v-col>
              <v-expansion-panels accordion focusable flat>
                <v-expansion-panel
                  v-for="(profile,i) in defs.profiles"
                  :key="i"
                >
                  <v-expansion-panel-header color="secondary">
                    {{ profile.time }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    {{ profile.weekdays }}
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-card-text>
      </div>

      <v-divider/>
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
        default: () => { return { name: 'wdtimer' } }
      }
    },

    data: () => ({
      name: 'wdtimer',
      maxIcon: 'mdi-arrow-expand',
      expanded: false,
      size: 'col-12 col-sm-6 col-md-4 col-lg-4',
      status: {
        color: 'success',
        level: 0
      },
      text: '',      
      app: {
        options: {
          debugMode: false
        }
      },
      defs: {
        device: null,
        globalWeekdays: null,
        lang: null,
        profiles: []
      }
    }),

    watch: {
      item: {
        immediate: true,
        deep: true,
        handler() {
        }
      }
    },

    created() {
      this.app.options = this.$fhem.app.options;
      if(this.$fhem.getEl(this.item, 'Options', 'setup', 'expanded')) this.expand();
      this.loadDefs();
    },

    methods: {
      expand() {
        if(this.expanded) {
          this.expanded = false;
          this.maxIcon = 'mdi-arrow-expand';
        } else {
          this.expanded = true;
          this.maxIcon = 'mdi-arrow-collapse';
        }
      },

      loadDefs() {
        this.defs = {
          device: null,
          globalWeekdays: null,
          lang: null,
          profiles: []
        };

        if(this.$fhem.getEl(this.item, 'Internals', 'TYPE') === 'WeekdayTimer') {
          let defs = this.$fhem.getEl(this.item, 'Internals', 'DEF').split(' ');
          if(defs.length > 1) {
            for(var [idx, def] of defs.entries()) {
              if(idx === 0) this.defs.device = def;
              if(idx > 0 && /^[0-8]*$/.test(def)) this.defs.globalWeekdays = def;
              if(idx > 0 && /^de|en|fr|nl$/.test(def)) this.defs.lang = def;
              if(idx > 0 && /\|/.test(def)) {
                let defParts = def.split('|');
                let defPart = {};
                if(/:|^{*}$/.test(defParts[0])) defParts.unshift(this.defs.globalWeekdays || '0123456');
                if(defParts.length > 2) defPart = { weekdays: defParts[0].split(''), time: new Date('1900-01-01T' + defParts[1]), cmd: defParts[2] };
                this.defs.profiles.push(defPart);
              }
            }
          }
        } else {
          this.$fhem.log({ lvl: 1, msg: 'Template is not a FHEM-WeekdayTimer.', meta: this.item });
        }
      }
    }
  }
</script>
