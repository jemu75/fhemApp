<script setup>
  import { useFhemStore } from '@/stores/fhem'
  import router from '@/router'
  import AppNavigationChild from './AppNavigation.vue'
  
  const props = defineProps({
    items: Array,
    path: String,
    isChip: Boolean
  })

  const fhem = useFhemStore()

  const getPath = (item) => {
    return props.path ? (props.path + '->' + item) : item
  }

  const loadView = (idx) => {
    fhem.app.header.title = fhem.replacer(props.items[idx].title, '')

    router.push({ name: 'devices', params: { view: getPath(props.items[idx].name) }, query: router.currentRoute.value.query })
  }
</script>

<template>
  <span v-for="(item, idx) of items" :key="item.name">
    <v-list-item
      v-if="(!item.group || item.group.length < 1) && !isChip" 
      :key="idx"
      :title="fhem.replacer(item.title, '') || item.name"
      :prepend-icon="item.icon"
      rounded="pill"
      @click="loadView(idx)"
    />

    <v-chip
      v-if="(!item.group || item.group.length < 1) && isChip"
      class="my-1 ml-2"
      :prepend-icon="item.icon"
      :key="idx"
      @click="loadView(idx)"
    >
      {{ fhem.replacer(item.title, '') || item.name }}
    </v-chip>

    <v-list-group 
      v-if="item.group && item.group.length > 0"
      :value="item.name"
    >
      <template v-slot:activator="{ props }">
        <v-list-item
          v-bind="props"
          :title="fhem.replacer(item.title, '') || item.name"
          :prepend-icon="item.icon"
          rounded="pill"
        ></v-list-item>
      </template>

      <AppNavigationChild :items="item.group" :isChip="item.groupAsChips" :path="getPath(item.name)"/>
    </v-list-group>

    <v-divider v-if="item.divider"/>
  </span>
</template>