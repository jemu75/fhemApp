<script setup>
  import { ref, computed } from 'vue'
  import VueJsonPretty from 'vue-json-pretty'
  import 'vue-json-pretty/lib/styles.css'
  import { useFhemStore } from '@/stores/fhem' 
  import useClipboard from 'vue-clipboard3'

  const cfgOnly = ref(false)
  
  const fhem = useFhemStore()

  const { toClipboard } = useClipboard()

  const jsonData = computed(() => {
    return cfgOnly.value ? fhem.app.config : fhem.app
  })

  function copyBtn() {
    toClipboard(JSON.stringify(jsonData.value, null, '  '))
  }
</script>

<template>  
  <v-card>
      <v-toolbar>
        <v-toolbar-title>{{ $t('_app.internals.title') }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-row no-gutters class="align-center pb-2">
          <v-col>
            <v-switch :label="$t('_app.internals.onlyConfig')" v-model="cfgOnly" color="blue" density="comfortable" hide-details></v-switch>
          </v-col>
          <v-col cols="1" class="text-right">
            <v-snackbar 
              :timeout="2000"              
              rounded="pill">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" variant="text" icon="mdi-clipboard-multiple-outline" size="small" @click="copyBtn"></v-btn>
              </template>
              {{ $t('_app.messages.clipboard.text') }}
            </v-snackbar>
          </v-col>
        </v-row>
        <v-divider class="pb-3"></v-divider>
        <vue-json-pretty :data="jsonData" :deep="cfgOnly ? 2 : 1" :showLine="false" :showIcon="true" :showLength="true"/>
      </v-card-text>
  </v-card>
</template>