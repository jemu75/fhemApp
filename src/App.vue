<template>
  <v-app class="noselect">
    <v-overlay :value="app.options.loading">
      <v-progress-circular
        indeterminate
        size="64"
      />
    </v-overlay>

    <v-app-bar
      app
      :color="appBar.color"
      dark
      clipped-left
    >
      <div v-if="!appBar.drawer">
        <v-app-bar-nav-icon
          @click.stop="appBar.drawer = !appBar.drawer"
        />
      </div>
      <div
        v-if="appBar.drawer"
        class="text-h5"
      >
        {{ appBar.clock }}
      </div>
      <v-spacer />
      <div
        v-if="app.options.mobileHeader"
        class="text-h5"
      >
        {{ appBar.header }}
      </div>

      <div
        v-if="!app.options.mobileHeader"
        class="hidden-md-and-down text-h5"
      >
        {{ appBar.header }}
      </div>
      <v-spacer />
      <v-btn
        v-if="app.options.debugMode"
        icon
        @click="goTo('/syslog')"
      >
        <v-icon>mdi-format-list-bulleted</v-icon>
      </v-btn>

      <v-btn
        v-if="app.options.reloadBtn"
        icon
        @click="reload()"
      >
        <v-icon>mdi-reload</v-icon>
      </v-btn>

      <v-btn
        class="text-h5"
        v-if="app.options.homeBtn && !appBar.drawer"
        icon
        @click="goTo()"
      >
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            class="ml-3"
            small
            :color="status.color"
            v-bind="attrs"
            v-on="on"
            v-text="status.icon"
          />
        </template>
        <div v-text="status.text" />
        <div v-text="status.time" />
      </v-tooltip>
    </v-app-bar>

    <v-navigation-drawer
      v-model="appBar.drawer"
      app
      color="secondary"
      :dark="this.$vuetify.theme.dark"
      clipped
    >
      <v-img src="./assets/FHEM_Logo.png" />
      <v-divider />

      <v-list nav>
        <v-list-item
          key="home"
          link
          to="/"
        >
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-left">
              {{ $t('app.navigation.home') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />

        <v-list-group
          v-if="showGroups"
          color="secondary lighten-4"
          prepend-icon="mdi-lightbulb-group"
        >
          <template v-slot:activator>
            <v-list-item-title>{{ $t('app.navigation.group') }}</v-list-item-title>
          </template>
          <v-chip
            v-for="group in app.data.groupList"
            :key="group.title"
            class="ma-2"
            link
            :to="'/devices/' + group.route"
          >
            {{ group.title }}
          </v-chip>
        </v-list-group>

        <v-list-group
          v-if="showRooms"
          color="secondary lighten-4"
          prepend-icon="mdi-floor-plan"
        >
          <template v-slot:activator>
            <v-list-item-title>{{ $t('app.navigation.room') }}</v-list-item-title>
          </template>
          <v-chip
            v-for="room in app.data.roomList"
            :key="room.title"
            class="ma-2"
            link
            :to="'/devices/' + room.route"
          >
            {{ room.title }}
          </v-chip>
        </v-list-group>
        <v-divider />

        <v-list-item
          key="dashboard"
          link
          to="/dashboard"
        >
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-left">
              {{ $t('app.navigation.dashboard') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />

        <v-list-item
          key="system"
          link
          to="/system"
        >
          <v-list-item-icon>
            <v-icon>mdi-tools</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-left">
              {{ $t('app.navigation.system') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>
              {{ version }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <Broadcaster />
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import Broadcaster from '@/components/Broadcaster.vue'

  export default {

    components: {
      Broadcaster
    },
    data: () => ({
      appBar: {
        color: '',
        drawer: null,
        clock: null,
        header: null
      },
      app: {
        options: {
          loading: false,
          reloadBtn: false,
        },
        session: {
          connect: false,
        },
        data: {
          roomList: [],
          groupList: [],
        }
      },
      version: 'v' + require('../package.json').version,
      status: {
        color: 'secondary',
        icon: 'mdi-circle',
        text: 'unbekannt',
        time: '',
      }
    }),

    computed: {
      showRooms() {
        return this.app.data.roomList.length > 0 ? true : false;
      },
      showGroups() {
        return this.app.data.groupList.length > 0 ? true : false;
      }
    },

    watch: {
      'app.session.connect'(val) {
        this.status.color = val ? 'success' : 'error';
        this.status.text = val ? 'online' : 'offline';
        this.status.time = this.$fhem.getDateTime();
      }
    },

    mounted() {
      this.app.session = this.$fhem.app.session;
      this.app.options = this.$fhem.app.options;
      this.app.data = this.$fhem.app.data;
      this.appBar = this.$fhem.app.appBar;
    },

    methods: {
      reload() {
        location.reload(true);
      },

      goTo(val) {
        let route = val || '/';

        if(this.$router.currentRoute.path != route) this.$router.push(route);
      }
    }
  }
</script>

<style scoped>
  .noselect {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
