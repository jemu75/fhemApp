<script setup>
  import { computed } from 'vue'
  import { useFhemStore } from '@/stores/fhem'
  import PanelCard from '../components/PanelCard.vue'

  
  const fhem = useFhemStore()

  const view = computed(() => {
    let res = []

    for(const idx of fhem.app.panelView) {
      if(fhem.handleDefs(fhem.app.panelList[idx].panel.show, ['show'], [true]).show) res.push(fhem.app.panelList[idx])
    }

    res.sort((a,b) => (s(a) > s(b)) ? 1 : ((s(b) > s(a)) ? -1 : 0)) 

    return res
  })

  function s(obj) {
    return fhem.handleDefs(obj.panel.sortby, ['sortby'], ['999']).sortby
  }
</script>


<template>
  <v-row no-gutters>
    <v-col cols="12" sm="6" lg="4" v-for="panel of view" :key="panel.name" class="pa-1">
      <PanelCard :panel="panel"/>    
    </v-col>
  </v-row>
</template>