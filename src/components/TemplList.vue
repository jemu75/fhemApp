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
          <div v-for="(el, idx) in listItems" :key="idx">
            <div v-if="(!expanded && idx == 0) || expanded">
              <v-row align="center">
                <v-col v-if="el.text1 || el.text11 || el.text12 || el.icon1" :class="el.class1">
                  <div v-if="el.text1" :class="el.text1Class">
                    {{ el.text1 }}
                  </div>
                  <v-icon v-if="el.icon1" large>
                    {{ iconMap(el.icon1) }}
                  </v-icon>
                  <div>
                    <span v-if="el.text11" :class="el.text11Class">
                      {{ el.text11 }}
                    </span>
                    <span v-if="el.text12" :class="el.text12Class">
                      {{ el.text12 }}
                    </span>
                  </div>
                </v-col>

                <v-col v-if="el.text2 || el.text21 || el.text22 || el.icon2" :class="el.class2">
                  <div v-if="el.text2" :class="el.text2Class">
                    {{ el.text2 }}
                  </div>
                  <v-icon v-if="el.icon2" large>
                    {{ iconMap(el.icon2) }}
                  </v-icon>
                  <div>
                    <span v-if="el.text21" :class="el.text21Class">
                      {{ el.text21 }}
                    </span>
                    <span v-if="el.text22" :class="el.text22Class">
                      {{ el.text22 }}
                    </span>
                  </div>
                </v-col>

                <v-col v-if="el.text3 || el.text31 || el.text32 || el.icon3" :class="el.class3">
                  <div v-if="el.text3" :class="el.text3Class">
                    {{ el.text3 }}
                  </div>
                  <v-icon v-if="el.icon3" large>
                    {{ iconMap(el.icon3) }}
                  </v-icon>
                  <div>
                    <span v-if="el.text31" :class="el.text31Class">
                      {{ el.text31 }}
                    </span>
                    <span v-if="el.text32" :class="el.text32Class">
                      {{ el.text32 }}
                    </span>
                  </div>
                </v-col>

                <v-col v-if="el.text4 || el.text41 || el.text42 || el.icon4" :class="el.class4">
                  <div v-if="el.text4" :class="el.text4Class">
                    {{ el.text4 }}
                  </div>
                  <v-icon v-if="el.icon4" large>
                    {{ iconMap(el.icon4) }}
                  </v-icon>
                  <div>
                    <span v-if="el.text41" :class="el.text41Class">
                      {{ el.text41 }}
                    </span>
                    <span v-if="el.text42" :class="el.text42Class">
                      {{ el.text42 }}
                    </span>
                  </div>
                </v-col>

                <v-col v-if="el.text5 || el.text51 || el.text52 || el.icon5" :class="el.class5">
                  <div v-if="el.text5" :class="el.text5Class">
                    {{ el.text5 }}
                  </div>
                  <v-icon v-if="el.icon5" large>
                    {{ iconMap(el.icon5) }}
                  </v-icon>
                  <div>
                    <span v-if="el.text51" :class="el.text51Class">
                      {{ el.text51 }}
                    </span>
                    <span v-if="el.text52" :class="el.text52Class">
                      {{ el.text52 }}
                    </span>
                  </div>
                </v-col>
              </v-row>

              <v-row v-if="el.divider && expanded" class="pb-3">
                <v-divider  />
              </v-row>
            </div>
          </div>
        </v-card-text>
      </div>

      <v-divider/>
      <v-system-bar color="secondary darken-1">
        <v-icon
          class="ml-0"
          :color="item.Options.info.left1IconColor"
        >
          {{ iconMap(item.Options.info.left1Icon) }}
        </v-icon><div class="text-truncate">
          {{ item.Options.info.left1Text }}
        </div>
        <v-icon
          class="ml-2"
          :color="item.Options.info.left2IconColor"
        >
          {{ iconMap(item.Options.info.left2Icon) }}
        </v-icon><div class="text-truncate">
          {{ item.Options.info.left2Text }}
        </div>
        <v-spacer />
        <v-icon :color="item.Options.info.mid1IconColor">
          {{ iconMap(item.Options.info.mid1Icon) }}
        </v-icon><div class="text-truncate">
          {{ item.Options.info.mid1Text }}
        </div>
        <v-icon
          class="ml-2"
          :color="item.Options.info.mid2IconColor"
        >
          {{ iconMap(item.Options.info.mid2Icon) }}
        </v-icon><div class="text-truncate">
          {{ item.Options.info.mid2Text }}
        </div>
        <v-spacer />
        <v-icon :color="item.Options.info.right1IconColor">
          {{ iconMap(item.Options.info.right1Icon) }}
        </v-icon><div class="text-truncate">
          {{ item.Options.info.right1Text }}
        </div>
        <v-icon
          class="ml-2 mr-0"
          :color="item.Options.info.right2IconColor"
        >
          {{ iconMap(item.Options.info.right2Icon) }}
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
        default: () => { return { name: 'list' } }
      }
    },

    data: () => ({
      name: 'list',
      maxIcon: 'mdi-arrow-expand',
      expanded: false,
      size: 'col-12 col-sm-6 col-md-4 col-lg-4',
      status: {
        color: 'success',
        level: 0
      },      
      app: {
        options: {
          debugMode: false
        }
      },
      listItems: [],
      iconSet: []
    }),

    watch: {
      item: {
        immediate: true,
        deep: true,
        handler() {
          this.doList();
        }
      }
    },

    created() {
      this.app.options = this.$fhem.app.options;
      this.iconSet = this.$fhem.getEl(this.item, 'Options','setup', 'iconSet') || [];
      if(this.$fhem.getEl(this.item, 'Options', 'setup', 'expanded')) this.expand();
    },

    methods: {
      expand() {
        if(this.expanded) {
          this.expanded = false;
          this.maxIcon = 'mdi-arrow-expand';
        } else {
          this.expanded = true;
          this.maxIcon = 'mdi-arrow-collapse';
          this.doList();
        }
      },

      iconMap(icon) {
        let result = icon || '';

        if(icon && this.iconSet.length > 0) {
          for(const iconDef of this.iconSet) {
            if(RegExp(iconDef.val, 'gm').test(icon)) {
              result = iconDef.icon;
              break;
            }
          }
        }
        return result;
      },

      loadItem(obj) {
        let class1 = this.$fhem.handleVals(this.item, this.$fhem.getEl(obj, 'class1'));
        let icon1 = this.$fhem.handleVals(this.item, this.$fhem.getEl(obj, 'icon1'));
        let text1 = this.$fhem.handleVals(this.item, this.$fhem.getEl(obj, 'text1'));
        let text11 = this.$fhem.handleVals(this.item, this.$fhem.getEl(obj, 'text11'));
        let text12 = this.$fhem.handleVals(this.item, this.$fhem.getEl(obj, 'text12'));

        let class2 = this.$fhem.handleVals(this.item, this.$fhem.getEl(obj, 'class2'));
        let icon2 = this.$fhem.handleVals(this.item, this.$fhem.getEl(obj, 'icon2'));
        let text2 = this.$fhem.handleVals(this.item, this.$fhem.getEl(obj, 'text2'));
        let text21 = this.$fhem.handleVals(this.item, this.$fhem.getEl(obj, 'text21'));
        let text22 = this.$fhem.handleVals(this.item, this.$fhem.getEl(obj, 'text22'));

        let class3 = this.$fhem.handleVals(this.item, this.$fhem.getEl(obj, 'class3'));
        let icon3 = this.$fhem.handleVals(this.item, this.$fhem.getEl(obj, 'icon3'));
        let text3 = this.$fhem.handleVals(this.item, this.$fhem.getEl(obj, 'text3'));
        let text31 = this.$fhem.handleVals(this.item, this.$fhem.getEl(obj, 'text31'));
        let text32 = this.$fhem.handleVals(this.item, this.$fhem.getEl(obj, 'text32'));

        let class4 = this.$fhem.handleVals(this.item, this.$fhem.getEl(obj, 'class4'));
        let icon4 = this.$fhem.handleVals(this.item, this.$fhem.getEl(obj, 'icon4'));
        let text4 = this.$fhem.handleVals(this.item, this.$fhem.getEl(obj, 'text4'));
        let text41 = this.$fhem.handleVals(this.item, this.$fhem.getEl(obj, 'text41'));
        let text42 = this.$fhem.handleVals(this.item, this.$fhem.getEl(obj, 'text42'));

        let class5 = this.$fhem.handleVals(this.item, this.$fhem.getEl(obj, 'class5'));
        let icon5 = this.$fhem.handleVals(this.item, this.$fhem.getEl(obj, 'icon5'));
        let text5 = this.$fhem.handleVals(this.item, this.$fhem.getEl(obj, 'text5'));
        let text51 = this.$fhem.handleVals(this.item, this.$fhem.getEl(obj, 'text51'));
        let text52 = this.$fhem.handleVals(this.item, this.$fhem.getEl(obj, 'text52'));

        let divider = this.$fhem.getEl(obj, 'divider');

        let result = {
          class1: class1[0] || 'text-center',
          icon1: icon1[0] || '',
          text1: text1[0] || '',
          text11: text11[0] || '',
          text12: text12[0] || '',
          text1Class: text1[1] || 'headline font-weight-bold',
          text11Class: text11[1] || 'headline font-weight-bold',
          text12Class: text12[1] || 'headline font-weight-bold',

          class2: class2[0] || 'text-center',
          icon2: icon2[0] || '',
          text2: text2[0] || '',
          text21: text21[0] || '',
          text22: text22[0] || '',
          text2Class: text2[1] || 'headline font-weight-bold',
          text21Class: text21[1] || 'headline font-weight-bold',
          text22Class: text22[1] || 'headline font-weight-bold',

          class3: class3[0] || 'text-center',
          icon3: icon3[0] || '',
          text3: text3[0] || '',
          text31: text31[0] || '',
          text32: text32[0] || '',
          text3Class: text3[1] || 'headline font-weight-bold',
          text31Class: text31[1] || 'headline font-weight-bold',
          text32Class: text32[1] || 'headline font-weight-bold',

          class4: class4[0] || 'text-center',
          icon4: icon4[0] || '',
          text4: text4[0] || '',
          text41: text41[0] || '',
          text42: text42[0] || '',
          text4Class: text4[1] || 'headline font-weight-bold',
          text41Class: text41[1] || 'headline font-weight-bold',
          text42Class: text42[1] || 'headline font-weight-bold',

          class5: class5[0] || 'text-center',
          icon5: icon5[0] || '',
          text5: text5[0] || '',
          text51: text51[0] || '',
          text52: text52[0] || '',
          text5Class: text5[1] || 'headline font-weight-bold',
          text51Class: text51[1] || 'headline font-weight-bold',
          text52Class: text52[1] || 'headline font-weight-bold',

          divider: divider || false
        };

        console.log(result);

        return result;
      },

      doList() {
        for(var [idx, itemDef] of this.$fhem.getEl(this.item, 'Options','setup','listItems').entries()) {
          let listItem = this.loadItem(itemDef);

          if(this.listItems[idx]) {
            this.listItems.splice(idx, 1, listItem);
          } else {
            this.listItems.push(listItem);
          }
        }
      }     
    }
  }
</script>
