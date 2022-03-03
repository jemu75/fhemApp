<template>
  <v-card
    v-resize="onResize"
    :dark="this.$vuetify.theme.dark"
    color="secondary"
  >
    <v-progress-linear
      height="7"
      :value="vals.mainLevel"
      :color="vals.mainColor"
      background-color="secondary darken-1"
    />

    <v-card-title class="text-truncate">
      {{ vals.title }}{{ log.recordStatus }}
    </v-card-title>
    <v-divider />

    <v-card-text>
      <v-row align="center">
        <v-col>
          <v-text-field
            v-model="log.search"
            append-icon="mdi-magnify"
            clearable
            clear-icon="mdi-close"
            label="Filter"
            single-line
            @click:clear="clearFilter"
          />
        </v-col>
        <v-col
          class="shrink"
          align="center"
        >
          <v-btn
            icon
            small
            @click="options.logRecord = !options.logRecord"
          >
            <v-icon>{{ log.recordIcon }}</v-icon>
          </v-btn>
        </v-col>
        <v-col
          class="shrink"
          align="center"
        >
          <v-btn
            icon
            small
            :disabled="log.lastPage"
            @click="setPage(-1)"
          >
            <v-icon>{{ log.lastPageIcon }}</v-icon>
          </v-btn>
        </v-col>
        <v-col
          class="shrink"
          align="center"
        >
          <v-btn
            icon
            small
            :disabled="log.nextPage"
            @click="setPage(1)"
          >
            <v-icon>{{ log.nextPageIcon }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-data-table
        dense
        :headers="log.headers"
        :items="session.logList"
        :search="log.search"
        :items-per-page="log.itemsPerPage"
        :page.sync="log.page"
        hide-default-header
        hide-default-footer
        @page-count="log.pageCount = $event"
      >
        <!-- eslint-disable-next-line -->
        <template v-slot:item.icon="{ item }">
          <v-icon :color="item.color">
            {{ item.icon }}
          </v-icon>
        </template>

        <!-- eslint-disable-next-line -->
        <template v-slot:item.actions="{ item }">
          <v-icon
            v-if="item.meta"
            small
            @click="showMeta(item)"
          >
            mdi-paperclip
          </v-icon>
        </template>
      </v-data-table>

      <v-dialog
        v-model="log.metaDialog"
        max-width="90%"
        scrollable
      >
        <v-card color="secondary lighten-1">
          <v-card-title class="secondary">
            Systemprotokoll - Details
            <v-btn
              icon
              @click="copyToClipboard()"
            >
              <v-icon>mdi-content-copy</v-icon>
            </v-btn>

            <v-spacer />
            <v-btn
              icon
              @click="log.metaDialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <vue-json-pretty
              :show-line="false"
              :data="log.metaData"
              ref="jsonContent"
            />
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card-text>

    <v-divider />
    <v-system-bar color="secondary darken-1">
      <v-icon>{{ vals.systemIcon }}</v-icon>
      {{ vals.systemIconValue }}
    </v-system-bar>
  </v-card>
</template>

<script>
  import VueJsonPretty from 'vue-json-pretty'
  import 'vue-json-pretty/lib/styles.css'

  export default {
    name: 'SyslogView',
    data: () => ({
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
          { text: 'Zeit', value: 'time', class: 'secondary' },
          { text: 'Nachricht', value: 'msg', class: 'secondary' },
          { text: 'Details', value: 'actions', sortable: false }
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
        nextPage: false,
        metaDialog: false,
        metaData: null
      }
    }),

    components: {
      VueJsonPretty
    },

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

    mounted() {
      this.session = this.$fhem.app.session;
      this.options = this.$fhem.app.options;
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
      },

      showMeta(val) {
        this.log.metaDialog = true;
        this.log.metaData = val.meta;
      },

      copyToClipboard() {
        var copyText = JSON.stringify(this.$refs.jsonContent.data, null, 2);
        navigator.clipboard.writeText(copyText);
      }
    }
  }
</script>
