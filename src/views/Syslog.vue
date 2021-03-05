<template>
  <v-card :dark="this.$vuetify.theme.dark" color="secondary" v-resize="onResize">
    <v-progress-linear height="7" :value="vals.mainLevel" :color="vals.mainColor" background-color="secondary darken-1"></v-progress-linear>

    <v-card-title class="text-truncate">{{ vals.title }}{{ log.recordStatus }}</v-card-title>
    <v-divider></v-divider>

    <v-card-text>
      <v-row align="center">
        <v-col>
          <v-text-field v-model="log.search" append-icon="mdi-magnify" clearable clear-icon="mdi-close" @click:clear="clearFilter" label="Filter" single-line></v-text-field>
        </v-col>
        <v-col class="shrink" align="center">
          <v-btn icon small @click="options.logRecord = !options.logRecord">
            <v-icon>{{ log.recordIcon }}</v-icon>
          </v-btn>
        </v-col>
        <v-col class="shrink" align="center">
          <v-btn icon small @click="setPage(-1)" :disabled="log.lastPage">
            <v-icon>{{ log.lastPageIcon }}</v-icon>
          </v-btn>
        </v-col>
        <v-col class="shrink" align="center">
          <v-btn icon small @click="setPage(1)" :disabled="log.nextPage">
            <v-icon>{{ log.nextPageIcon }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-data-table dense :headers="log.headers" :items="session.logList" :search="log.search" :items-per-page="log.itemsPerPage" :page.sync="log.page" @page-count="log.pageCount = $event" hide-default-header hide-default-footer>
        <template v-slot:item.icon="{ item }">
          <v-icon :color="item.color">{{ item.icon }}</v-icon>
        </template>
      </v-data-table>
    </v-card-text>

    <v-divider></v-divider>
    <v-system-bar color="secondary darken-1">
      <v-icon>{{ vals.systemIcon }}</v-icon>
      {{ vals.systemIconValue }}
    </v-system-bar>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      name: 'syslog',
      vals: {
        title: 'Systemprotokoll',
        mainLevel: 0,
        mainColor: '',
        systemIcon: 'mdi-clipboard-text',
        systemIconValue: ''
      },
      options: {
        logRecord: true
      },
      session: {
        logList: [],
        logLast: {}
      },
      log: {
        headers: [
          { text: 'Art', value: 'icon', class: 'secondary' },
          { text: 'Zeit', value: 'timeFlag', class: 'secondary' },
          { text: 'Nachricht', value: 'message', class: 'secondary' }
        ],
        search: '',
        lastPageIcon: 'mdi-chevron-left',
        nextPageIcon: 'mdi-chevron-right',
        recordIcon: '',
        recordStatus: '',
        itemsPerPage: 10,
        page: 1,
        pageCount: 1,
        lastPage: true,
        nextPage: false
      }
    }),

    watch: {
      session: {
        immediate: true,
        deep: true,
        handler(val) {
          this.vals.systemIconValue = val.logList.length;
        }
      },

      'log.pageCount'() {
        this.log.lastPage = this.log.page === 1 ? true : false;
        this.log.nextPage = this.log.page === this.log.pageCount ? true : false;
      },

      options: {
        immediate: true,
        deep: true,
        handler(val) {
          this.log.recordIcon = val.logRecord ? 'mdi-pause' : 'mdi-play';
          this.log.recordStatus = val.logRecord ? '' : ' - angehalten'
        }
      }
    },

    methods: {
      onResize () {
        this.log.itemsPerPage = parseInt((window.innerHeight - 300) / 32);
      },

      clearFilter() {
        this.log.search = '';
      },

      setPage(val) {
        let newVal = this.log.page + val;
        this.log.page = newVal > this.log.pageCount ? this.log.pageCount : newVal < 1 ? 1 : newVal;
        this.log.lastPage = this.log.page === 1 ? true : false;
        this.log.nextPage = this.log.page === this.log.pageCount ? true : false;
      }
    },

    mounted() {
      this.session = this.$fhem.app.session;
      this.options = this.$fhem.app.options;
    }
  }
</script>
