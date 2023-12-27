<script setup>  
  import { ref } from 'vue'
  import { useFhemStore } from '@/stores/fhem'  
  import { useDisplay } from 'vuetify'
  import AppNavigation from './components/AppNavigation.vue'
  import OptionsMenu from './components/OptionsMenu.vue'
  import logo from '@/assets/logo_v4.png'

  const fhem = useFhemStore()
  const { mobile } = useDisplay()
  const drawer = ref(true)
</script>

<template>
  <v-app class="noselect">
    <v-layout>
      <v-overlay
        :model-value="!fhem.app.isReady && !fhem.app.message"
        class="align-center justify-center">
        <v-progress-circular
          indeterminate          
          size="64">
        </v-progress-circular>
      </v-overlay>

      <v-navigation-drawer v-model="drawer" color="secondary">
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
          <v-spacer/>
          <v-col class="text-right">
            <v-icon :icon="fhem.app.isReady ? 'mdi-sync' : 'mdi-sync-alert'" size="small"></v-icon>
          </v-col>
        </v-row>

        <v-divider/>

      </v-navigation-drawer>

      <v-app-bar :order="mobile ? 0 : -1" color="primary">
        <template v-if="fhem.app.header.imageUrl" v-slot:image>
          <v-img :src="fhem.app.header.imageUrl" cover :gradient="fhem.app.header.imageGradient"></v-img>        
        </template>

        <template v-slot:prepend>
          <v-app-bar-nav-icon class="d-lg-none" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <div v-if="!mobile && fhem.app.header.showTime" class="text-h5">{{ $d(fhem.app.header.time, fhem.app.header.timeFormat) }}</div>
        </template>

        <div v-if="!mobile && fhem.app.header.showDate" class="text-h5">{{ $d(fhem.app.header.time, fhem.app.header.dateFormat) }}</div>

        <template v-slot:append>
          <OptionsMenu/>
        </template>
      </v-app-bar>

      <v-main>
        <v-container fluid class="pa-2">
          <v-alert v-if="fhem.app.message"
            closable            
            :type="fhem.app.message.type"
            :title="$t(fhem.app.message.title)"
            :text="$t(fhem.app.message.text)"
            class="mb-2 mx-1"
            @click:close="fhem.app.message = false"
            >
          </v-alert>
          <RouterView />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>