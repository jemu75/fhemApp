<script setup>
    import { computed, watch, onMounted, ref } from 'vue'
    import router from '@/router'
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

    const levelOpts = ref(fhem.handleDefs(item.panel.panel.expandable, ['expandable','expanded','maximizable'],[false, false, false]))

    watch(item.panel.main, (newVal) => {
        let activeLevels = levelsActive(newVal)

        if(levelOpts.value.activeLevels.join('-') !== activeLevels.join('-')) {
            levelOpts.value.activeLevels = activeLevels
            levelClick(true)
        }
    })

    function levelsActive(obj) {
        let res = []

        for(const [idx, lvl] of Object.entries(obj)) {
            if(fhem.handleDefs(lvl.level.show, ['show'], [true]).show) res.push(Number(idx))
        }

        return res
    }

    function levelClick(init) {
        let opts = levelOpts.value,
            idx

        if(init) {
            opts.activeLevels = levelsActive(item.panel.main)
            if(/=maximized$/.test(fhem.app.currentView)) opts.expanded = true
        } else {
            if(opts.expandable) opts.expanded = !opts.expanded
            if(opts.maximizable) {
                if(opts.expanded) {
                    router.push({ name: 'devices', params: { view: 'panel=' + item.panel.name + '=maximized' }, query: router.currentRoute.value.query })
                } else {
                    fhem.app.currentView = fhem.app.currentView.replace(/=maximized$/, '')
                    router.back()
                }   
            }
        }

        if(opts.expanded) {
            opts.levels = opts.activeLevels
        } else {
            if(opts.expandable || init) {
                opts.levels = [opts.activeLevels[0]]
            } else {
                idx = opts.activeLevels.indexOf(opts.levels[0])
                opts.levels = [opts.activeLevels[idx + 1] >= 0 ? opts.activeLevels[idx + 1] : opts.activeLevels[0]]
            }
        }

        if(opts.activeLevels.length > 1 || opts.maximizable) {
            opts.icon = !opts.expandable ? !opts.expanded ? 'mdi-swap-vertical' : '' : opts.expanded ? 'mdi-arrow-collapse' : 'mdi-arrow-expand'
        } else {
            opts.icon = ''
        }
    }

    function getTemplate(val) {
        let idx = fhem.app.config.panels.map((e) => e.name).indexOf(val),
            templateIdx,
            res

        if(idx !== -1) {
            res = fhem.app.config.panels[idx].template
            templateIdx = fhem.app.config.templates.map((e) => e.name).indexOf(res)

            if(templateIdx !== -1 && !fhem.app.config.templates[templateIdx].dist) {
                return res
            }
        }
    }

    function editItem(val, tab) {
        router.push({ name: 'settings', params: { tab: tab, item: val }, query: router.currentRoute.value.query })
    }

    function  openFhemDevice(device) {
        window.open(fhem.createURL('?detail=' + device), '_self')
    }

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

    levelClick(true)
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

        <v-sheet color="primary">
            <v-img :src="img.url" :gradient="img.url ? fhem.app.header.imageGradient : ''" height="48" cover>
                <v-toolbar color="transparent" density="compact" class="pr-1">
                    <v-toolbar-title class="text-truncate">{{  title.title  }}</v-toolbar-title>

                    <template v-slot:append>
                        <div v-if="fhem.app.settings.loglevel > 6">
                            {{  sortby.sortby }}
                            <v-menu>
                                <template v-slot:activator="{ props }">
                                    <v-btn icon="mdi-dots-vertical" density="compact" v-bind="props"></v-btn>
                                </template>

                                <v-list density="compact">
                                    <v-list-item v-if="getTemplate(panel.name)"
                                        key="template"
                                        title="Template"
                                        prepend-icon="mdi-application-edit-outline"
                                        @click="editItem(getTemplate(panel.name), 'templates')">
                                    </v-list-item>
                                    <v-list-item
                                        key="panel"
                                        title="Panel"
                                        prepend-icon="mdi-pencil"
                                        @click="editItem(panel.name, 'panels')">
                                    </v-list-item>
                                    <v-divider></v-divider>
                                    <v-list-item v-for="device of panel.panel.devices"
                                        :key="device.split(':')[0]"
                                        :title="device.split(':')[1]"
                                        prepend-icon="mdi-link"
                                        @click="openFhemDevice(device.split(':')[1])">
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </div>
                        <v-btn v-if="levelOpts.icon" :icon="levelOpts.icon" size="small" variant="plain" density="compact" @click="levelClick()"></v-btn>
                    </template>
                </v-toolbar>        
            </v-img>
        </v-sheet>

        <PanelMain :main="panel.main" :levels="levelOpts.levels" :iconmap="panel.panel.iconmap" :devices="panel.panel.devices"></PanelMain>

        <v-card-text v-if="item.panel.internals">
            {{ item.panel.internals }}
        </v-card-text>

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