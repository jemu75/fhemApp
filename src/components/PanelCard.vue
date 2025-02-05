<script setup>
    import { computed, ref } from 'vue'
    import router from '@/router'
    import { useFhemStore } from '@/stores/fhem'
    import PanelMain from './PanelMain.vue'

    const item = defineProps({
        panel: Object,
        popoutIdx: { type: Number, default: -1 }
    })

    const fhem = useFhemStore()

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

    const lvl = ref({
        panel: {
            expandable: false,
            expanded: false,
            maximizable: false
        },
        expandable: false,
        expanded: false,
        maximizable: false,
        activeLevels: [],
        icon: '',
        isClick: false
    })

    const activeLevels = computed(() => {
        let idx,
            show,
            opts = {},
            levels = [],
            expanded = [],
            collapsed = [],
            res = []

        opts = fhem.handleDefs(item.panel.panel.expandable, ['expandable','expanded','maximizable'],[false, false, false])

        for(const [idx, level] of Object.entries(item.panel.main)) {
            show = fhem.handleDefs(level.level.show, ['show','expanded','collapsed'], [true, true, idx === '0' ? true : false])

            if(show.show) {
                levels.push(Number(idx))
                if(show.expanded) expanded.push(Number(idx))
                if(show.collapsed) collapsed.push(Number(idx))
            }
        }

        if(opts.expandable !== lvl.value.panel.expandable) {
            lvl.value.panel.expandable = opts.expandable
            lvl.value.expandable = opts.expandable
        }

        if(opts.expanded !== lvl.value.panel.expanded) {
            lvl.value.panel.expanded = opts.expanded
            lvl.value.expanded = opts.expanded
        }

        if(opts.maximizable !== lvl.value.panel.maximizable) {
            lvl.value.panel.maximizable = opts.maximizable
            lvl.value.maximizable = opts.maximizable
        }

        if(/=maximized$/.test(fhem.app.currentView)) lvl.value.expanded = true

        if(!lvl.value.expanded && levels.indexOf(lvl.value.activeLevels[0]) == -1) lvl.value.activeLevels = [levels[0]]

        if(lvl.value.isClick) {
            if(lvl.value.expandable) {
                lvl.value.expanded = !lvl.value.expanded
            } else {
                idx = levels.indexOf(lvl.value.activeLevels[0])
                lvl.value.activeLevels = [levels[idx + 1] >= 0 ? levels[idx + 1] : levels[0]]
            }

            if(lvl.value.maximizable) {
                if(lvl.value.expanded) {
                    router.push({ name: 'devices', params: { view: 'panel=' + item.panel.name + '=maximized' }, query: router.currentRoute.value.query })
                } else {
                    fhem.app.currentView = fhem.app.currentView.replace(/=maximized$/, '')
                    router.back()
                }   
            }

            lvl.value.isClick = false    
        }

        if(lvl.value.expanded) {
            lvl.value.activeLevels = expanded
        } else {
            if(lvl.value.expandable || lvl.value.activeLevels.length === 0) lvl.value.activeLevels = collapsed
        }

        if(!lvl.value.expandable && !lvl.value.expanded) {
            lvl.value.icon = levels.length > 1 ? 'mdi-swap-vertical' : ''
        } else {
            if(!lvl.value.maximizable && levels.length < 2) {
                lvl.icon = ''
            } else {
                lvl.value.icon = lvl.value.expandable ? lvl.value.expanded ? 'mdi-arrow-collapse' : 'mdi-arrow-expand' : ''
            }
        }

        res = lvl.value.activeLevels

        return res
    })

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

    function closePopout() {
        let cmd = fhem.handleDefs(item.panel.panel.popout, ['show', 'width', 'cmd'], [true, null, null]).cmd
        let cmdList

        if(cmd) {
            cmdList = cmd.split(';')
            for(const [idx] of Object.entries(cmdList)) {
                for(const device of item.panel.panel.devices) cmdList[idx] = cmdList[idx].replace(' ' + device.split(':')[0] + ' ', ' ' + device.split(':')[1] + ' ')
            } 
            
            fhem.request('text', cmdList.join(';'))
        }
        
        fhem.app.popOutList.splice(item.popoutIdx, 1)
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
                        <v-btn v-if="lvl.icon" :icon="lvl.icon" size="small" variant="plain" density="compact" @click="lvl.isClick = true"></v-btn>
                        <v-btn v-if="popoutIdx !== -1" icon="mdi-close" size="small" variant="plain" @click="closePopout"></v-btn>
                    </template>
                </v-toolbar>        
            </v-img>
        </v-sheet>

        <PanelMain :main="panel.main" :levels="activeLevels" :iconmap="panel.panel.iconmap" :devices="panel.panel.devices"></PanelMain>

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