<script setup>  
  import { ref, computed } from 'vue'
  import { useFhemStore } from '@/stores/fhem'  
  import { useDisplay } from 'vuetify'
  import router from '@/router'
  import AppNavigation from './components/AppNavigation.vue'
  import OptionsMenu from './components/OptionsMenu.vue'
  import PanelCard from './components/PanelCard.vue'
  import logo from '@/assets/logo_v4.png'

  const fhem = useFhemStore()
  const { mobile } = useDisplay()
  
  const drawer = ref(fhem.app.header.hideNavigation.value ? false : true)

  const mobileTitle = computed(() => {
    let navPath = [],
        navIdx,
        res

    if(fhem.app.currentView && !/^panel=/.test(fhem.app.currentView)) {
      navPath.push(...fhem.app.navigation)

      for(const navNode of fhem.app.currentView.split('->')) {
        navIdx = navPath.map((e) => e.name).indexOf(navNode)
        if(navIdx !== -1) {
          res = fhem.replacer(navPath[navIdx].title, '')
          if(navPath[navIdx].group && navPath[navIdx].group.length > 0) {
            navPath = navPath[navIdx].group
          }
        } else {
          res = navNode
        }
      }
    }
    
    return res
  })

  function showInternals() {
    router.push({ name: 'internals', query: router.currentRoute.value.query })
  }
</script>

<template>
  <v-app class="noselect">
    <v-layout>
      <v-overlay
        :model-value="fhem.app.threads.length > 0"
        class="align-center justify-center">
        <v-progress-circular
          indeterminate          
          size="64">          
        </v-progress-circular>
      </v-overlay>

      <v-navigation-drawer v-model="drawer" color="secondary" :temporary="fhem.app.header.hideNavigation">
        <template v-slot:prepend>
          <v-img :src="logo"></v-img>
          <v-divider/>
        </template>

        <v-list>
          <AppNavigation :items="fhem.app.navigation"/>
        </v-list>
    
        <v-divider/>

        <v-row no-gutters class="mx-2 my-1">
          <v-col>
            {{ fhem.app.version }}
          </v-col>
          <v-col cols="2" class="text-right">
            <v-icon :icon="fhem.app.isReady ? 'mdi-sync' : 'mdi-alert'" size="small"></v-icon>
          </v-col>
        </v-row>

        <v-divider/>
      </v-navigation-drawer>

      <v-app-bar v-if="fhem.app.isLoaded" :order="mobile ? 0 : -1" :color="fhem.app.settings.loglevel > 6 ? 'error' : 'primary'">
        <template v-if="fhem.app.header.imageUrl && fhem.app.settings.loglevel < 7" v-slot:image>
          <v-img :src="fhem.app.header.imageUrl" cover :gradient="fhem.app.header.imageGradient"></v-img>        
        </template>

        <template v-slot:prepend>
          <v-app-bar-nav-icon :class="fhem.app.header.hideNavigation ? '' : 'd-lg-none'" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <div v-if="!mobile && fhem.app.header.showTime" class="text-h5">{{ $d(fhem.app.header.time, fhem.app.header.timeFormat) }}</div>
        </template>

        <div v-if="!mobile && fhem.app.header.showDate" class="text-h5">{{ $d(fhem.app.header.time, fhem.app.header.dateFormat) }}</div>
        <div v-if="mobile && fhem.app.header.showTitle" class="text-h5">{{ mobileTitle }}</div>

        <template v-slot:append>
          <v-btn v-if="fhem.app.settings.loglevel > 6" icon="mdi-information" @click="showInternals()"></v-btn>
          <OptionsMenu/>
        </template>
      </v-app-bar>

      <v-main>
        <v-container fluid class="pa-2">
          <v-alert v-if="fhem.app.message && fhem.app.message.type"
            closable            
            :type="fhem.app.message.type"
            :title="$t(fhem.app.message.title)"
            :text="$t(fhem.app.message.text)"
            class="mb-2 mx-1"
            @click:close="fhem.app.message = false"
            >
          </v-alert>

          <template v-if="fhem.app.popOutList.length > 0 && !/=maximized$/.test(fhem.app.currentView)">
            <v-dialog 
              v-model="fhem.app.popOutList[0].show" 
              :width="fhem.app.popOutList[0].width" 
              opacity="60%"
              persistent           
              class="noselect"
              >
              <v-sheet>
                <PanelCard :panel="fhem.app.panelList[fhem.app.popOutList[0].panel]" :popoutIdx="0"/>
              </v-sheet>
            </v-dialog>
          </template>

          <RouterView />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>