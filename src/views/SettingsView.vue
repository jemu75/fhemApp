<script setup>
  import { ref, watch } from 'vue'
  import { useFhemStore } from '@/stores/fhem'
  import router from '@/router'

  import SettingsHeader from '../components/SettingsHeader.vue'
  import SettingsNavigation from '../components/SettingsNavigation.vue'
  import SettingsProps from '../components/SettingsProps.vue'
  import SettingsColors from '../components/SettingsColors.vue'
  import SettingsContent from '../components/SettingsContent.vue'

  const tabs = ['general', 'panels', 'templates', 'navigation', 'colors', 'content']

  const fhem = useFhemStore()  

  const configIsChanged = ref(false)

  watch(fhem.app.config, (newVal) => {
    if(newVal && fhem.app.isReady) configIsChanged.value = true
  })

  async function saveSettings(save) {
    let config = null,
        newTemplates = []
    
    if(save) {
      for(const template of fhem.app.config.templates) if(!template.dist) newTemplates.push(template)
      fhem.app.config.templates = newTemplates
      
      const utfStr = new TextEncoder().encode(JSON.stringify(fhem.app.config))
      config = encodeURIComponent(btoa(String.fromCodePoint(...utfStr)))

      await fhem.request('text', 'set ' + fhem.app.fhemDevice + ' config ' + config)
    }
    
    await fhem.createSession()
    configIsChanged.value = false
  }

  function changeTab() {
    router.replace({ name: 'settings', params: { tab: fhem.app.settingsTab }, query: router.currentRoute.value.query })
  }

  if(fhem.app.noConfig) fhem.log(3, 'Settings View - No Config handling', null, 'noConfig')
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

    <v-tabs v-model="fhem.app.settingsTab" @update:model-value="changeTab()">
      <v-tab v-for="tab of tabs" :value="tab" :key="tab">{{ $t('_app.settings.' + tab + '.title', 2) }}</v-tab>
    </v-tabs>

    <SettingsHeader v-if="fhem.app.settingsTab === 'general'"></SettingsHeader>
    <SettingsNavigation v-if="fhem.app.settingsTab === 'navigation'"></SettingsNavigation>
    <SettingsProps v-if="fhem.app.settingsTab === 'panels'" type="panels"></SettingsProps>
    <SettingsProps v-if="fhem.app.settingsTab === 'templates'" type="templates"></SettingsProps>
    <SettingsColors v-if="fhem.app.settingsTab === 'colors'"></SettingsColors>
    <SettingsContent v-if="fhem.app.settingsTab === 'content'"></SettingsContent>
  </v-card>
</template>