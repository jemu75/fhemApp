<script setup>
    import { computed, onMounted, ref } from 'vue'
    import { useFhemStore } from '@/stores/fhem'
    import PanelMain from './PanelMain.vue'

    const item = defineProps({
        panel: Object
    })

    const fhem = useFhemStore()

    let threadId = fhem.thread()

    onMounted(() => fhem.thread(threadId))

    function getBar(pos) {
        let res = fhem.handleDefs(item.panel.status[pos], ['level','color','min','max','reverse'],[0, 'success', 0, 100, false])
        res.level = Math.round((res.level - res.min) / (res.max - res.min) * 100)

        return res
    }

    const bar = computed(() => getBar('bar'))
    const bar2 = computed(() => getBar('bar2'))

    const img = computed(() => {
        return fhem.handleDefs(item.panel.status.imageUrl, ['url'],[''])
    })

    const sortby = computed(() => {
        return fhem.handleDefs(item.panel.panel.sortby, ['sortby'], [null])
    })

    const title = computed(() => {
        return fhem.handleDefs(item.panel.status.title, ['title'],[''])        
    })

    const expand = computed(() => {
        return fhem.handleDefs(item.panel.panel.expandable, ['expandable','expanded','maximizable'],[false, false, false])        
    })

    const expanded = ref(expand.value.expanded)

    const expandIcon = computed(() => {
        let res = null

        if(expand.value.expandable) res = expanded.value ? 'mdi-arrow-collapse' : 'mdi-arrow-expand'
        if(!expand.value.expandable && !expand.value.expanded && item.panel.main.length > 1) res = 'mdi-swap-vertical'
       
        return res
    })

    const levelsActive = computed(() => {
        let res = []

        for(const [idx, lvl] of Object.entries(item.panel.main)) {
            if(fhem.handleDefs(lvl.level.show, ['show'], [true]).show) res.push(Number(idx))
        }

        return res
    })

    function levelSwitch(init) {
        let idx = -1

        if(expand.value.expandable || (!expand.value.expandable && expand.value.expanded)) {
            if(!init) {
                if(expand.value.maximizable) fhem.app.panelMaximized = expanded.value ? false : item.panel
                expanded.value = !expanded.value
            }

            levels.value = expanded.value ? levelsActive.value : [levelsActive.value[0]] 
        } else {
            idx = levelsActive.value.indexOf(levels.value ? levels.value[0] : null)
            levels.value = (idx === -1 || idx === levelsActive.value.length - 1) ? [levelsActive.value[0]] : [levelsActive.value[idx + 1]]
        }
    }

    const levels = ref([])

    function getInfo(pos) {
        let res = fhem.handleDefs(item.panel.info[pos], ['text', 'icon', 'color'],['', '', ''])

        if(res.icon) res.icon = fhem.getIcon(res.icon, item.panel.panel.iconmap)

        return res
    }

    function getInfoClass(pos) {
        let sections = ['left1', 'left2', 'mid1', 'mid2', 'right1', 'right2'],
            posEl = getInfo(pos),
            leftEl = getInfo(sections[sections.indexOf(pos) - 1])

            if(leftEl.text && posEl.text && !posEl.icon) return 'ml-1 text-truncate'
        if(posEl.text) return 'text-truncate'
        return ''
    }

    const infoLeft1 = computed(() => getInfo('left1'))
    const infoLeft2 = computed(() => getInfo('left2'))
    const infoMid1 = computed(() => getInfo('mid1'))
    const infoMid2 = computed(() => getInfo('mid2'))
    const infoRight1 = computed(() => getInfo('right1'))
    const infoRight2 = computed(() => getInfo('right2'))

    levelSwitch(true)
</script>

<template>
    <v-card variant="tonal">
        <v-row no-gutters>
            <v-col v-if="panel.status.bar">
                <v-progress-linear
                    height="7"
                    v-model="bar.level"
                    :color="bar.color"
                    :reverse="bar.reverse"
                />
            </v-col>
            <v-col v-if="panel.status.bar2">
                <v-progress-linear
                    height="7"    
                    v-model="bar2.level"
                    :color="bar2.color"
                    :reverse="bar2.reverse"
                />
            </v-col>
        </v-row>
    
        <v-sheet color="secondary">
            <v-img :src="img.url" :gradient="img.url ? fhem.app.header.imageGradient : ''" height="48" cover>
                <v-card-title v-if="panel.status.title">
                    <v-row no-gutters>
                        <v-col>
                            {{  title.title }}
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col v-if="fhem.app.settings.loglevel > 6" class="text-right">
                            {{ sortby.sortby }}
                        </v-col>
                        <v-col v-if="expandIcon" cols="1" class="text-right">
                            <v-btn :icon="expandIcon" size="small" variant="plain" density="compact" @click="levelSwitch(false)"></v-btn>
                        </v-col>
                    </v-row>
                </v-card-title>
            </v-img>
        </v-sheet>

        <PanelMain :main="panel.main" :levels="levels" :iconmap="panel.panel.iconmap" :devices="panel.panel.devices"></PanelMain>
        
        <v-layout style="height:24px">
            <v-system-bar color="secondary">
                <v-icon v-if="infoLeft1.icon" :icon="infoLeft1.icon" :color="infoLeft1.color"></v-icon>
                <span v-if="infoLeft1.text" :class="getInfoClass('left1')">{{ infoLeft1.text }}</span>
                <v-icon v-if="infoLeft2.icon" :icon="infoLeft2.icon" :color="infoLeft2.color"></v-icon>
                <span v-if="infoLeft2.text" :class="getInfoClass('left2')">{{ infoLeft2.text }}</span>
                <v-spacer></v-spacer>
                <v-icon v-if="infoMid1.icon" :icon="infoMid1.icon" :color="infoMid1.color"></v-icon>
                <span v-if="infoMid1.text" :class="getInfoClass('mid1')">{{ infoMid1.text }}</span>
                <v-icon v-if="infoMid2.icon" :icon="infoMid2.icon" :color="infoMid2.color"></v-icon>
                <span v-if="infoMid2.text" :class="getInfoClass('mid2')">{{ infoMid2.text }}</span>
                <v-spacer></v-spacer>
                <v-icon v-if="infoRight1.icon" :icon="infoRight1.icon" :color="infoRight1.color"></v-icon>
                <span v-if="infoRight1.text" :class="getInfoClass('right1')">{{ infoRight1.text }}</span>
                <v-icon v-if="infoRight2.icon" :icon="infoRight2.icon" :color="infoRight2.color"></v-icon>
                <span v-if="infoRight2.text" :class="getInfoClass('right2')">{{ infoRight2.text }}</span>
            </v-system-bar>
        </v-layout>
    </v-card>
</template>