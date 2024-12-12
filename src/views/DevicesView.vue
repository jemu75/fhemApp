<script setup>
  import { computed } from 'vue'
  import { useFhemStore } from '@/stores/fhem'
  import PanelCard from '../components/PanelCard.vue'

  
  const fhem = useFhemStore()

  const view = computed(() => {
    let items = [],
        res = {},        
        colIdx = 1

    if(fhem.app.panelMaximized) {      
      items.push(fhem.app.panelMaximized)
    } else {
      for(const idx of fhem.app.panelView) {
        if(fhem.handleDefs(fhem.app.panelList[idx].panel.show, ['show'], [true]).show) items.push(fhem.app.panelList[idx])
      }

      items.sort((a,b) => (s(a) > s(b)) ? 1 : ((s(b) > s(a)) ? -1 : 0)) 
    }

    for(const item of items) {
      if(!res[colIdx]) res[colIdx] = []
      res[colIdx].push(item)
      colIdx = colIdx === showCols.value ? 1 : colIdx + 1
    }

    return res
  })

  const showCols = computed(() => {
    return getCols(fhem.app.currentView, fhem.app.navigation) || fhem.app.viewCols[fhem.app.display]
  })

  function getCols(route, navObj) {
    if(/=maximized$/.test(route)) return 1
    
    let path = route.split('->'),
        item = { name: path[0] },
        idx = navObj.map((e) => e.name).indexOf(item.name),
        res

    if(idx !== -1) Object.assign(item, navObj[idx])
    if(path.length > 1) res = getCols(path.slice(1).join('->'), item.group || [])
    
    if(idx !== -1 && !res) res = item[fhem.app.display]

    return parseInt(res)
  }

  function s(obj) {
    return fhem.handleDefs(obj.panel.sortby, ['sortby'], [null]).sortby || '999'
  }
</script>

<template>
  <v-row no-gutters>
    <v-col :cols="12 / showCols" v-for="col of showCols" :key="col">
      <v-row no-gutters>
        <v-col cols="12" v-for="(panel) of view[col]" :key="panel.name" class="pa-1">
          <PanelCard :panel="panel"/>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>