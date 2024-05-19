<script setup>
    import { ref} from 'vue'
    import { useFhemStore } from '@/stores/fhem'
import { VueElement } from 'vue';
    import { useDisplay } from 'vuetify'
    
    const fhem = useFhemStore()
    const { mobile } = useDisplay()
    const preLang = '_app.settings.general.'

    const form = ref()

    const newItem = ref({
        name: '',
        title: '',
        icon: '',
        cmd: ''
    })

    const rules = {
        required: value => !!value || fhem.replacer('%t(_app.settings.rules.required)')
    }

    function loadNavigationItems(items, route) {
        let result = []

        if(items && items.length > 0) {
            for(const item of items) {
                if(item.group && item.group.length > 0) {
                    result.push(...loadNavigationItems(item.group, (route ? (route + '->') : '') + item.name))
                } else {
                    result.push((route ? (route + '->') : '') + item.name)
                }
            }
        }

        return result
    }

    function addItem() {
        if(!fhem.app.config.header.commands) fhem.app.config.header.commands = []
        fhem.app.config.header.commands.push(JSON.parse(JSON.stringify((newItem.value))))
        form.value.reset()
    }

    function deleteItem(idx) {
        fhem.app.config.header.commands.splice(idx, 1)
    }
</script>

<template>
    <v-list>
        <v-list-item :title="$t(preLang + 'headLine')">
            <template v-slot:append>
                <v-icon color="info" @click="fhem.help('kopfzeile')">mdi-help-circle</v-icon>
            </template>
        </v-list-item>
        <v-row no-gutters class="mb-3">
            <v-col :cols="mobile ? '12' : '6'">
                <v-list-item :lines="mobile ? 'two' : 'one'" :title="$t(preLang + 'headLineImageTitle')" :subtitle="$t(preLang + 'headLineImageSubTitle')">
                    <v-text-field
                        v-model="fhem.app.config.header.imageUrl"
                        density="compact" 
                        variant="outlined"
                        label="Link"
                        placeholder="https://picsum.photos/1920/1080?random"
                        persistent-placeholder
                        hide-details
                        clearable
                        max-width="650px"
                        class="my-4">
                    </v-text-field>
                </v-list-item>
            </v-col>
            <v-col :cols="mobile ? '12' : '6'">
                <v-list-item :disabled="fhem.app.config.header.imageUrl ? false : true" :lines="mobile ? 'two' : 'one'" :title="$t(preLang + 'headLineImageGradientTitle')" :subtitle="$t(preLang + 'headLineImageGradientSubTitle')">
                    <v-text-field
                        v-model="fhem.app.config.header.imageGradient"
                        density="compact" 
                        variant="outlined"
                        label="Definition"                
                        placeholder="to top, rgba(33, 33, 33, 0.6), rgba(33, 33, 33, 0.6)"
                        persistent-placeholder
                        hide-details
                        clearable
                        max-width="650px"
                        class="my-4">
                    </v-text-field>
                </v-list-item>
            </v-col>
            <v-col :cols="mobile ? '12' : '6'">
                <v-list-item :lines="mobile ? 'two' : 'one'" :title="$t(preLang + 'headLineTimeTitle')" :subtitle="$t(preLang + 'headLineTimeSubTitle')">
                    <template v-slot:append>
                        <v-list-item-action start>
                            <v-switch v-model="fhem.app.config.header.showTime" color="primary" hide-details density="compact"></v-switch>
                        </v-list-item-action>
                    </template>
                </v-list-item>

                <v-list-item :lines="mobile ? 'two' : 'one'" :title="$t(preLang + 'headLineDateTitle')" :subtitle="$t(preLang + 'headLineDateSubTitle')">
                    <template v-slot:append>
                        <v-list-item-action start>
                            <v-switch v-model="fhem.app.config.header.showDate" color="primary" hide-details density="compact"></v-switch>
                        </v-list-item-action>
                    </template>
                </v-list-item>
            </v-col>
            <v-col :cols="mobile ? '12' : '6'">
                <v-list-item :lines="mobile ? 'two' : 'one'" :title="$t(preLang + 'headLineRouteTitle')" :subtitle="$t(preLang + 'headLineRouteSubTitle')">
                    <template v-slot:append>
                        <v-list-item-action start>
                            <v-switch v-model="fhem.app.config.header.showTitle" color="primary" hide-details density="compact"></v-switch>
                        </v-list-item-action>
                    </template>
                </v-list-item>

                <v-list-item :lines="mobile ? 'two' : 'one'" :title="$t(preLang + 'headLineNavigationTitle')" :subtitle="$t(preLang + 'headLineNavigationSubTitle')">
                    <template v-slot:append>
                        <v-list-item-action start>
                            <v-switch v-model="fhem.app.config.header.hideNavigation" color="primary" hide-details density="compact"></v-switch>
                        </v-list-item-action>
                    </template>
                </v-list-item>
            </v-col>
        </v-row>

        <v-divider></v-divider>

        <v-list-item :title="$t(preLang + 'darkMode')">
            <template v-slot:append>
                <v-icon color="info" @click="fhem.help('farbschema')">mdi-help-circle</v-icon>
            </template>
        </v-list-item>
        <v-list-item :lines="mobile ? 'two' : 'one'" :title="$t(preLang + 'darkModeTitle')" :subtitle="$t(preLang + 'darkModeSubTitle')">
            <v-text-field
                v-model="fhem.app.config.header.darkModeOverFhem"
                density="compact" 
                variant="outlined"
                label="Definition"
                placeholder="device-reading:value"
                persistent-placeholder
                hide-details
                clearable
                max-width="650px"
                class="my-4">
            </v-text-field>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item :title="$t(preLang + 'defaultRoute')">
            <template v-slot:append>
                <v-icon color="info" @click="fhem.help('startseite')">mdi-help-circle</v-icon>
            </template>
        </v-list-item>
        <v-list-item :lines="mobile ? 'two' : 'one'" :title="$t(preLang + 'defaultRouteTitle')" :subtitle="$t(preLang + 'defaultRouteSubTitle')">
            <v-select 
                v-model="fhem.app.config.header.defaultRoute"
                :items="loadNavigationItems(fhem.app.navigation)"
                density="compact" 
                variant="outlined"             
                label="Route"
                clearable
                max-width="650px"
                class="my-4">
            </v-select>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item :title="$t(preLang + 'optionsMenu')">
            <template v-slot:append>
                <v-icon color="info" @click="fhem.help('optionsmenü')">mdi-help-circle</v-icon>
            </template>
        </v-list-item>
        <v-row no-gutters class="mb-3">
            <v-col :cols="mobile ? '12' : '6'">
                <v-list-item :lines="mobile ? 'two' : 'one'" :title="$t(preLang + 'optionsMenuDarkModeTitle')" :subtitle="$t(preLang + 'optionsMenuDarkModeSubTitle')">
                    <template v-slot:append>
                        <v-list-item-action start>
                            <v-switch v-model="fhem.app.config.header.showDarkMode" color="primary" hide-details density="compact"></v-switch>
                        </v-list-item-action>
                    </template>
                </v-list-item>

                <v-list-item :lines="mobile ? 'two' : 'one'" :title="$t(preLang + 'optionsMenuReloadPageTitle')" :subtitle="$t(preLang + 'optionsMenuReloadPageSubTitle')">
                    <template v-slot:append>
                        <v-list-item-action start>
                            <v-switch v-model="fhem.app.config.header.showReloadPage" color="primary" hide-details density="compact"></v-switch>
                        </v-list-item-action>
                    </template>
                </v-list-item>

                <v-list-item :lines="mobile ? 'two' : 'one'" :title="$t(preLang + 'optionsMenuSettingsTitle')" :subtitle="$t(preLang + 'optionsMenuSettingsSubTitle')">
                    <template v-slot:append>
                        <v-list-item-action start>
                            <v-switch v-model="fhem.app.config.header.showSettings" color="primary" hide-details density="compact"></v-switch>
                        </v-list-item-action>
                    </template>
                </v-list-item>
            </v-col>
            <v-col :cols="mobile ? '12' : '6'">
                <v-list-item :lines="mobile ? 'two' : 'one'" :title="$t(preLang + 'optionsMenuUpdateTitle')" :subtitle="$t(preLang + 'optionsMenuUpdateSubTitle')">
                    <template v-slot:append>
                        <v-list-item-action start>
                            <v-switch v-model="fhem.app.config.header.showUpdate" color="primary" hide-details density="compact"></v-switch>
                        </v-list-item-action>
                    </template>
                </v-list-item>

                <v-list-item :lines="mobile ? 'two' : 'one'" :title="$t(preLang + 'optionsMenuLanguagesTitle')" :subtitle="$t(preLang + 'optionsMenuLanguagesSubTitle')">
                    <template v-slot:append>
                        <v-list-item-action start>
                            <v-switch v-model="fhem.app.config.header.showLanguages" color="primary" hide-details density="compact"></v-switch>
                        </v-list-item-action>
                    </template>
                </v-list-item>
            </v-col>
        </v-row>

        <v-divider></v-divider>

        <v-list-item :title="$t(preLang + 'fhemCommands')">
            <template v-slot:append>
                <v-icon color="info" @click="fhem.help('optionsmenü-fhem-befehle')">mdi-help-circle</v-icon>
            </template>
        </v-list-item>
        <v-list-item v-for="(item, idx) of fhem.app.config.header.commands" :key="idx">
            <v-row class="pt-2 align-center">
                <v-col :cols="mobile ? '12' : '2'">
                    <v-text-field 
                        v-model="item.name"
                        density="compact"
                        variant="outlined"
                        :rules="[rules.required]"
                        :label="$t(preLang + 'fhemCommandsName')"
                        hide-details
                        clearable>
                    </v-text-field>
                </v-col>
                <v-col :cols="mobile ? '12' : '3'">
                    <v-text-field 
                        v-model="item.title"
                        density="compact"
                        variant="outlined"
                        :rules="[rules.required]"
                        :label="$t(preLang + 'fhemCommandsTitle')"
                        hide-details
                        clearable>
                    </v-text-field>
                </v-col>
                <v-col :cols="mobile ? '12' : '3'">
                    <v-text-field 
                        v-model="item.icon"
                        density="compact"
                        variant="outlined"
                        :label="$t(preLang + 'fhemCommandsIcon')"
                        :append-inner-icon="item.icon"
                        hide-details
                        clearable>
                    </v-text-field>
                </v-col>
                <v-col :cols="mobile ? '9' : '3'">
                    <v-text-field 
                        v-model="item.icon"
                        density="compact"
                        variant="outlined"
                        :rules="[rules.required]"
                        :label="$t(preLang + 'fhemCommandsCmd')"
                        hide-details
                        clearable>
                    </v-text-field>
                </v-col>
                <v-btn variant="text" icon="mdi-delete" @click="deleteItem(idx)"></v-btn>
            </v-row>
            <v-divider class="mt-3"></v-divider>
        </v-list-item>        
        <v-list-item>
            <v-form ref="form">
                <v-row class="pt-3 align-center">
                    <v-col :cols="mobile ? '12' : '2'">
                        <v-text-field 
                            v-model="newItem.name"
                            density="compact"
                            variant="outlined"
                            :rules="[rules.required]"
                            :label="$t(preLang + 'fhemCommandsName')"
                            placeholder="restart"
                            persistent-placeholder
                            hide-details
                            clearable>
                        </v-text-field>
                    </v-col>
                    <v-col :cols="mobile ? '12' : '3'">
                        <v-text-field 
                            v-model="newItem.title"
                            density="compact"
                            variant="outlined"
                            :rules="[rules.required]"
                            :label="$t(preLang + 'fhemCommandsTitle')"
                            placeholder="FHEM Restart | %t(optionsRestart)"
                            persistent-placeholder
                            hide-details
                            clearable>
                        </v-text-field>
                    </v-col>
                    <v-col :cols="mobile ? '12' : '3'">
                        <v-text-field 
                            v-model="newItem.icon"
                            density="compact"
                            variant="outlined"                            
                            :label="$t(preLang + 'fhemCommandsIcon')"
                            :append-inner-icon="newItem.icon"
                            placeholder="mdi-rocket"
                            persistent-placeholder
                            hide-details
                            clearable>
                        </v-text-field>
                    </v-col>
                    <v-col :cols="mobile ? '9' : '3'">
                        <v-text-field 
                            v-model="newItem.cmd"
                            density="compact"
                            variant="outlined"
                            :rules="[rules.required]"
                            :label="$t(preLang + 'fhemCommandsCmd')"
                            placeholder="shutdown restart"
                            persistent-placeholder
                            hide-details
                            clearable>
                        </v-text-field>
                    </v-col>
                    <v-btn variant="text" icon="mdi-cancel" @click="form.reset()"></v-btn>
                    <v-btn variant="text" icon="mdi-plus" :disabled="!newItem.name || !newItem.title || !newItem.cmd" @click="addItem()"></v-btn>
                </v-row>
            </v-form>
        </v-list-item>
</v-list>
</template>