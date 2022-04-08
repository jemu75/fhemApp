<template>
  <v-col :class="size">
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
          small
          icon
          @click="expandBtn()"
        >
          <v-icon small>
            {{ expandIcon }}
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
        <v-card-text class="pa-0">
          <iframe class="embed-responsive-item" 
            :src="source"
            width="100%"
            height="100%"
            transform="scale(0.5,0.5)"
            allowfullscreen
            seamless="seamless"
            overflow="hidden"
            frameborder="0"
          />
        </v-card-text>
      </div>

      <v-system-bar color="secondary darken-1">
        <v-icon
          class="ml-0"
          :color="item.Options.info.left1IconColor"
        >
          {{ item.Options.info.left1Icon || camIcon }}
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
        default: () => { return { name: 'iframe' } }
      }
    },

    data: () => ({
      name: 'iframe',
      size: '',
      source: '',
      camIcon: 'mdi-cctv',
      expandIcon: 'mdi-arrow-expand',
      maxSize: false,
      status: {
        color: 'success',
        level: 0
      },
      app: {
        options: {
          debugMode: false
        }
      },
    }),

    created() {
      this.app.options = this.$fhem.app.options;
      this.size = this.$fhem.getEl(this.item, 'Options', 'setup', 'size') || 'col-12 col-sm-12 col-md-6 col-lg-4';
      this.source = this.$fhem.getEl(this.item, 'Options', 'setup', 'source') || '';

      if(this.$route.params.filter && this.$route.params.filter.match('&size=max')) {
        this.maxSize = true;
        this.size = 'col-12';
        this.expandIcon = 'mdi-arrow-collapse';
      }
    },

    methods: {
      expandBtn() {
        if(this.maxSize) {
          this.maxSize = false;
          this.size = this.$fhem.getEl(this.item, 'Options', 'setup', 'size') || 'col-12 col-sm-12 col-md-6 col-lg-4';
          this.expandIcon = 'mdi-arrow-expand';
        } else {
          this.maxSize = true;
          this.size = 'col-12';
          this.expandIcon = 'mdi-arrow-collapse';
        }
      }
    }
  }
</script>
