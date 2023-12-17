<script setup>
  import { reactive, ref } from 'vue'
  import { useDisplay } from 'vuetify'
  import { useFhemStore } from '@/stores/fhem'

  const { mobile } = useDisplay()

  const fhem = useFhemStore()  

  const preLang = '_app.settings.navigation.'

  const navSettings = reactive({
    path: [],
    route: ['navigation'],
    items: [],
    newItem: {
      name: null,
      title: null,
      icon: null,
      divider: false,
      groupAsChips: false,
      group: []
    }
  })

  const form = ref()

  const rules = {
    required: value => !!value || fhem.replacer('%t(_app.settings.rules.required)')
  }

  function loadItems(idx) {
    if(typeof idx !== 'undefined') {
      navSettings.path.push(idx, 'group')
      navSettings.route.push(navSettings.items[idx].name)
    }

    navSettings.items = fhem.getEl(fhem.app.config.navigation, navSettings.path)
  }

  function addItem() {
    let n = JSON.parse(JSON.stringify(navSettings.newItem))
    fhem.getEl(fhem.app.config.navigation, navSettings.path).push(n)
    loadItems()
    form.value.reset()
  }

  function deleteItem(idx) {
    fhem.getEl(fhem.app.config.navigation, navSettings.path).splice(idx, 1)
  }

  function getGroupItems(idx) {
    let group = fhem.getEl(navSettings.items[idx], ['group']) || []

    return group.length
  }

  function goBack() {
    navSettings.route.pop()
    navSettings.path.splice(-2, 2)
    loadItems()
  }

  function openHelp(anchor) {
      window.open(fhem.app.repository + '#' + anchor, '_blank')
  }

  loadItems()
</script>

<template>  
  <v-list>
    <v-list-item :title="$t(preLang + 'title')">
      <template v-slot:append>
        <v-btn
          color="info"
          icon="mdi-help-circle"
          variant="text"
          @click="openHelp('navigation')"
        ></v-btn>
      </template>
    </v-list-item>

    <v-list-item v-if="navSettings.path.length > 0">
      <v-btn variant="text" icon="mdi-arrow-up-left" @click="goBack()"></v-btn>
      {{ navSettings.route.join(' > ') }}
    </v-list-item>

    <v-list-item v-for="(item, idx) of navSettings.items" :key="idx">
      <v-row no-gutters>
        <v-col cols="12" lg="2" class="pt-3 pr-3">
          <v-text-field 
            density="compact" 
            variant="outlined" 
            clearable
            persistent-placeholder
            :placeholder="$t(preLang + 'namePlaceholder')"
            :label="$t(preLang + 'name')"
            :rules="[rules.required]"
            v-model="item.name"/>
        </v-col>
        <v-col cols="12" lg="3" class="pt-3 pr-3">
          <v-text-field 
            density="compact" 
            variant="outlined" 
            clearable
            persistent-placeholder
            :placeholder="$t(preLang + 'title1Placeholder')"
            :label="$t(preLang + 'title1')"
            v-model="item.title"/>
        </v-col>
        <v-col cols="12" lg="3" class="pt-3 pr-3">
          <v-text-field 
            density="compact" 
            variant="outlined"
            clearable 
            persistent-placeholder
            :placeholder="$t(preLang + 'iconPlaceholder')"
            :label="$t(preLang + 'icon')" 
            :append-inner-icon="item.icon"
            v-model="item.icon"/>
        </v-col>
        <v-col :cols="4" lg="" class="pt-1">
          <v-checkbox               
          :hint="$t(preLang + 'groupAsChipsHint')"
            :label="$t(preLang + 'groupAsChips')"
            v-model="item.groupAsChips"/>
        </v-col>
        <v-col cols="4" lg="" class="pt-1">
          <v-checkbox
            :hint="$t(preLang + 'dividerHint')"              
            :label="$t(preLang + 'divider')"
            v-model="item.divider"/>
        </v-col>
        <v-col class="pt-3 text-right">
          <v-btn variant="text" icon @click="loadItems(idx)">
            <v-badge v-if="getGroupItems(idx) > 0" color="success" :content="getGroupItems(idx)">
              <v-icon icon="mdi-arrow-down-right"></v-icon>
            </v-badge>
            <v-icon v-if="getGroupItems(idx) === 0" icon="mdi-arrow-down-right"></v-icon>
          </v-btn>
          <v-btn variant="text" icon="mdi-delete" @click="deleteItem(idx)"></v-btn>
        </v-col>
      </v-row>
      <v-divider v-if="mobile"></v-divider>
    </v-list-item>
    <v-list-item>
      <v-form ref="form">
        <v-row no-gutters>
          <v-col cols="12" lg="2" class="pt-3 pr-3">
            <v-text-field 
              density="compact" 
              variant="outlined" 
              clearable
              persistent-placeholder
              :placeholder="$t(preLang + 'namePlaceholder')"
              :label="$t(preLang + 'name')"
              :rules="[rules.required]"
              v-model="navSettings.newItem.name"/>
          </v-col>
          <v-col cols="12" lg="3" class="pt-3 pr-3">
            <v-text-field 
              density="compact" 
              variant="outlined" 
              clearable
              persistent-placeholder
              :placeholder="$t(preLang + 'title1Placeholder')"
              :label="$t(preLang + 'title1')"
              v-model="navSettings.newItem.title"/>
          </v-col>
          <v-col cols="12" lg="3" class="pt-3 pr-3">
            <v-text-field 
              density="compact" 
              variant="outlined"
              clearable
              persistent-placeholder
              :placeholder="$t(preLang + 'iconPlaceholder')"
              :label="$t(preLang + 'icon')" 
              :append-inner-icon="navSettings.newItem.icon"
              v-model="navSettings.newItem.icon"/>
          </v-col>
          <v-col cols="4" lg="" class="pt-1">
            <v-checkbox
              :hint="$t(preLang + 'groupAsChipsHint')"               
              :label="$t(preLang + 'groupAsChips')"
              v-model="navSettings.newItem.groupAsChips"/>
          </v-col>
          <v-col cols="4" lg="" class="pt-1">
            <v-checkbox               
              :hint="$t(preLang + 'dividerHint')"  
              :label="$t(preLang + 'divider')"
              v-model="navSettings.newItem.divider"/>
          </v-col>
          <v-col class="pt-3 text-right">
            <v-btn variant="text" icon="mdi-cancel" @click="form.reset()"></v-btn>
            <v-btn variant="text" icon="mdi-plus" :disabled="!navSettings.newItem.name" @click="addItem()"></v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-list-item>    
</v-list>
</template>