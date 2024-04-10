<script setup>
  import { useFhemStore } from '@/stores/fhem'
  import { reactive, ref } from 'vue'

  const fhem = useFhemStore()

  const rules = {
    required: value => !!value || fhem.replacer('%t(_app.settings.rules.required)')
  }

  const form = ref()

  const newItem = reactive({
    name: '',
    title: '',
    icon: '',
    cmd: ''
  })

  const preLang = '_app.settings.header.'

  function addItem() {
    if(!fhem.app.config.header.commands) fhem.app.config.header.commands = []
    fhem.app.config.header.commands.push(JSON.parse(JSON.stringify((newItem))))
    form.value.reset()
  }

  function deleteItem(idx) {
    fhem.app.config.header.commands.splice(idx, 1)
  }
</script>

<template>  
  <v-list>
    <v-list-item :title="$t(preLang + 'barTitle')">
      <template v-slot:append>
        <v-btn
          color="info"
          icon="mdi-help-circle"
          variant="text"
          @click="fhem.help('kopfzeile')">
        </v-btn>
      </template>
    </v-list-item>
    <v-list-item>
      <v-row no-gutters>
        <v-col cols="12" lg="4" class="pt-3 pr-3">
          <v-text-field 
            density="compact" 
            variant="outlined" 
            clearable
            persistent-placeholder
            :placeholder="$t(preLang + 'imageUrlPlaceholder')"
            :label="$t(preLang + 'imageUrl')"
            v-model="fhem.app.config.header.imageUrl"/>
        </v-col>
        <v-col cols="12" lg="4" class="pt-3 pr-3">
          <v-text-field 
            density="compact" 
            variant="outlined" 
            clearable
            persistent-placeholder
            :placeholder="$t(preLang + 'imageGradientPlaceholder')"
            :label="$t(preLang + 'imageGradient')"
            v-model="fhem.app.config.header.imageGradient"/>
        </v-col>
        <v-col cols="6" lg="" class="pt-1">
          <v-checkbox
            :hint="$t(preLang + 'showTimeHint')"              
            :label="$t(preLang + 'showTime')"
            v-model="fhem.app.config.header.showTime"/>
        </v-col>
        <v-col cols="6" lg="" class="pt-1">
          <v-checkbox
            :hint="$t(preLang + 'showDateHint')"              
            :label="$t(preLang + 'showDate')"
            v-model="fhem.app.config.header.showDate"/>
        </v-col>
        <v-col cols="6" lg="" class="pt-1">
          <v-checkbox
            :hint="$t(preLang + 'showTitleHint')"              
            :label="$t(preLang + 'showTitle')"
            v-model="fhem.app.config.header.showTitle"/>
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider></v-divider>
    <v-list-item :title="$t(preLang + 'darkModeOverFhem')">
      <template v-slot:append>
        <v-btn
          color="info"
          icon="mdi-help-circle"
          variant="text"
          @click="fhem.help('farbschema')"
        ></v-btn>
      </template>
    </v-list-item>
    <v-list-item>
      <v-row no-gutters>
        <v-col cols="12" md="4" class="pt-3">
          <v-text-field 
            density="compact" 
            variant="outlined" 
            clearable
            persistent-placeholder
            placeholder="device-reading:value"
            label="Definition"
            v-model="fhem.app.config.header.darkModeOverFhem"        
            >
          </v-text-field>
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider></v-divider>
    <v-list-item :title="$t(preLang + 'optionsTitle')">
      <template v-slot:append>
        <v-btn
          color="info"
          icon="mdi-help-circle"
          variant="text"
          @click="fhem.help('optionsmenü')"
        ></v-btn>
      </template>
    </v-list-item>
    <v-list-item>
      <v-row no-gutters>
        <v-col cols="6" lg="">
          <v-checkbox 
            :label="$t(preLang + 'showDarkMode')"
            v-model="fhem.app.config.header.showDarkMode"/>
        </v-col>
        <v-col cols="6" lg="">
          <v-checkbox 
            :label="$t(preLang + 'showReloadPage')"
            v-model="fhem.app.config.header.showReloadPage"/>
        </v-col>
        <v-col cols="6" lg="">
          <v-checkbox
            :label="$t(preLang + 'showSettings')"
            v-model="fhem.app.config.header.showSettings"/>
        </v-col>
        <v-col cols="6" lg="">
          <v-checkbox
            :label="$t(preLang + 'showUpdate')"
            v-model="fhem.app.config.header.showUpdate"/>
        </v-col>
        <v-col cols="6" lg="">
          <v-checkbox
            :label="$t(preLang + 'showLanguages')"
            v-model="fhem.app.config.header.showLanguages"/>
        </v-col>
      </v-row>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item 
      :title="$t(preLang + 'optionsCommandTitle')">
      <template v-slot:append>
        <v-btn
          color="info"
          icon="mdi-help-circle"
          variant="text"
          @click="fhem.help('optionsmenü-fhem-befehle')"
        ></v-btn>
      </template>
    </v-list-item>
    <v-list-item v-for="(item, idx) of fhem.app.config.header.commands" :key="idx">
      <v-row no-gutters>
        <v-col cols="12" lg="2" class="pt-3 pr-3">
          <v-text-field 
            density="compact" 
            variant="outlined" 
            clearable
            persistent-placeholder
            :placeholder="$t(preLang + 'commandNamePlaceholder')"
            :label="$t(preLang + 'commandName')"
            :rules="[rules.required]"
            v-model="item.name"/>
        </v-col>
        <v-col cols="12" lg="3" class="pt-3 pr-3">
          <v-text-field 
            density="compact" 
            variant="outlined" 
            clearable
            persistent-placeholder
            :placeholder="$t(preLang + 'commandTitlePlaceholder')"
            :label="$t(preLang + 'commandTitle')"
            :rules="[rules.required]"
            v-model="item.title"/>
        </v-col>
        <v-col cols="12" lg="3" class="pt-3 pr-3">
          <v-text-field 
            density="compact" 
            variant="outlined" 
            clearable
            persistent-placeholder
            :placeholder="$t(preLang + 'commandIconPlaceholder')"
            :label="$t(preLang + 'commandIcon')"
            :append-inner-icon="item.icon"
            v-model="item.icon"/>
        </v-col>
        <v-col cols="10" lg="3" class="pt-3 pr-3">
          <v-text-field 
            density="compact" 
            variant="outlined" 
            clearable
            persistent-placeholder
            :placeholder="$t(preLang + 'commandCmdPlaceholder')"
            :label="$t(preLang + 'commandCmd')"
            :rules="[rules.required]"
            v-model="item.cmd"/>
        </v-col>
        <v-col class="pt-3 text-right">
          <v-btn variant="text" icon="mdi-delete" @click="deleteItem(idx)"></v-btn>
        </v-col>

      </v-row>
    </v-list-item>
    <v-list-item>
      <v-form ref="form">
        <v-row no-gutters>
          <v-col cols="12" lg="2" class="pt-3 pr-3">
            <v-text-field 
              density="compact" 
              variant="outlined" 
              clearable
              persistent-placeholder
              :placeholder="$t(preLang + 'commandNamePlaceholder')"
              :label="$t(preLang + 'commandName')"
              :rules="[rules.required]"
              v-model="newItem.name"/>
          </v-col>
          <v-col cols="12" lg="3" class="pt-3 pr-3">
            <v-text-field 
              density="compact" 
              variant="outlined" 
              clearable
              persistent-placeholder
              :placeholder="$t(preLang + 'commandTitlePlaceholder')"
              :label="$t(preLang + 'commandTitle')"
              :rules="[rules.required]"
              v-model="newItem.title"/>
          </v-col>
          <v-col cols="12" lg="3" class="pt-3 pr-3">
            <v-text-field 
              density="compact" 
              variant="outlined" 
              clearable
              persistent-placeholder
              :placeholder="$t(preLang + 'commandIconPlaceholder')"
              :label="$t(preLang + 'commandIcon')"
              :append-inner-icon="newItem.icon"
              v-model="newItem.icon"/>
          </v-col>
          <v-col cols="9" lg="3" class="pt-3 pr-3">
            <v-text-field 
              density="compact" 
              variant="outlined" 
              clearable
              persistent-placeholder
              :placeholder="$t(preLang + 'commandCmdPlaceholder')"
              :label="$t(preLang + 'commandCmd')"
              :rules="[rules.required]"
              v-model="newItem.cmd"/>
          </v-col>
          <v-col class="pt-3 text-right">
            <v-btn variant="text" icon="mdi-cancel" @click="form.reset()"></v-btn>
            <v-btn variant="text" icon="mdi-plus" :disabled="!newItem.name || !newItem.title || !newItem.cmd" @click="addItem()"></v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-list-item>
  </v-list>
</template>