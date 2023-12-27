<script setup>
  import JsonViewer from 'vue-json-viewer'
  import 'vue-json-viewer/style.css'
  import { useFhemStore } from '@/stores/fhem' 
  
  const fhem = useFhemStore()
</script>

<template>  
  <v-card>
      <json-viewer
        :value="fhem.app"        
        :show-array-index=false
        copyable
        boxed>
      </json-viewer>
  </v-card>
</template>