<script setup>
  import { ref, watch } from 'vue'
  import { useFhemStore } from '@/stores/fhem'

  import SettingsHeader from '../components/SettingsHeader.vue'
  import SettingsNavigation from '../components/SettingsNavigation.vue'
  import SettingsProps from '../components/SettingsProps.vue'
  import SettingsColors from '../components/SettingsColors.vue'
  import SettingsContent from '../components/SettingsContent.vue'

  const tabs = ['header', 'panels', 'templates', 'navigation', 'colors', 'content']

  const settingsTab = ref(tabs[0])
  const configIsChanged = ref(false)

  const fhem = useFhemStore()  

  watch(fhem.app.config, (newVal) => {
    if(newVal && fhem.app.isReady) configIsChanged.value = true
    
  })

  async function saveSettings(save) {
    let config = null
    
    if(save) {
      for(const [idx, template] of Object.entries(fhem.app.config.templates)) {
        if(template.dist) fhem.app.config.templates.splice(idx, 1)
      }

      config = encodeURIComponent(btoa(JSON.stringify(fhem.app.config)))
      await fhem.request('text', 'set ' + fhem.app.fhemDevice + ' config ' + config)
    }
    
    await fhem.createSession()
    configIsChanged.value = false
  }

</script>

<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>
        {{ $t('_app.settings.title') }}
      </v-toolbar-title>

      <template v-slot:append>
        <v-btn 
          v-if="configIsChanged" 
          icon="mdi-cancel" 
          @click="saveSettings(false)">
        </v-btn>
        <v-btn 
          :disabled="!configIsChanged" 
          icon="mdi-content-save-outline" 
          @click="saveSettings(true)">
        </v-btn>
      </template>
    </v-toolbar>

    <v-tabs v-model="settingsTab">
      <v-tab v-for="tab of tabs" :value="tab" :key="tab">{{ $t('_app.settings.' + tab + '.title', 2) }}</v-tab>
    </v-tabs>

    <SettingsHeader v-if="settingsTab === 'header'"></SettingsHeader>
    <SettingsNavigation v-if="settingsTab === 'navigation'"></SettingsNavigation>
    <SettingsProps v-if="settingsTab === 'panels'" :type="settingsTab"></SettingsProps>
    <SettingsProps v-if="settingsTab === 'templates'" :type="settingsTab"></SettingsProps>
    <SettingsColors v-if="settingsTab === 'colors'"></SettingsColors>
    <SettingsContent v-if="settingsTab === 'content'"></SettingsContent>
  </v-card>
</template>