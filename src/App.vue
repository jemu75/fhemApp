<template>
  <v-app>
    <v-overlay :value="app.options.loading">
      <v-progress-circular indeterminate size="64">
      </v-progress-circular>
    </v-overlay>

    <v-app-bar app color="primary" dark clipped-left>
      <div class="hidden-lg-and-up">
        <v-app-bar-nav-icon v-if="!back" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-btn v-if="back" icon @click.stop="goTo">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </div>
      <h2 class="hidden-md-and-down">{{ app.options.clock }}</h2>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon small :color="status.color" v-text="status.icon" v-bind="attrs" v-on="on"></v-icon>
        </template>
        <div v-text="status.text"></div>
        <div v-text="status.time"></div>
      </v-tooltip>
    </v-app-bar>

    <v-navigation-drawer app color="secondary" :dark="this.$vuetify.theme.dark" clipped v-model="drawer">
      <v-img src="./assets/FHEM_Logo.png"></v-img>
      <v-divider></v-divider>

      <v-list nav>
        <v-list-item key="home" link to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-left">Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-group color="secondary lighten-4" prepend-icon="mdi-lightbulb-group" v-if="showGroups">
          <template v-slot:activator>
            <v-list-item-title>Gruppen</v-list-item-title>
          </template>
          <v-chip class="ma-2" v-for="group in app.data.groupList" :key="group.title" link :to="group.route">{{ group.title }}</v-chip>
        </v-list-group>

        <v-list-group color="secondary lighten-4" prepend-icon="mdi-floor-plan" v-if="showRooms">
          <template v-slot:activator>
            <v-list-item-title>Bereiche</v-list-item-title>
          </template>
          <v-chip class="ma-2" v-for="room in app.data.roomList" :key="room.title" link :to="room.route">{{ room.title }}</v-chip>
        </v-list-group>
        <v-divider></v-divider>

        <v-list-item key="dashboard" link to="/dashboard">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-left">Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item key="system" link to="/system">
          <v-list-item-icon>
            <v-icon>mdi-tools</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-left">System</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
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
        <Broadcaster></Broadcaster>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import Broadcaster from '@/components/Broadcaster.vue'

  export default {
    data: () => ({
      drawer: null,
      back: false,
      app: {
        options: {
          loading: false,
          clock: null
        },
        session: {
          connect: false,
        },
        data: {
          roomList: [],
          groupList: []
        }
      },
      version: 'v3.2.0',
      status: {
        color: 'secondary',
        icon: 'mdi-circle',
        text: 'unbekannt',
        time: '',
      }
    }),

    components: {
      Broadcaster
    },

    watch: {
      'app.session.connect'(val) {
        this.status.color = val ? 'success' : 'error';
        this.status.text = val ? 'online' : 'offline';
        this.status.time = this.$fhem.getDateTime();
      },

      $route(val) {
        this.back = val.path === '/' ? false : true;
      }
    },

    computed: {
      showRooms() {
        return this.app.data.roomList.length > 0 ? true : false;
      },
      showGroups() {
        return this.app.data.groupList.length > 0 ? true : false;
      }
    },

    methods: {
      loadRoutes() {
        if(!this.app.session.connect) return;

        this.$fhem.getRoutes('room');
        this.$fhem.getRoutes('group');
      },

      goTo() {
        this.$router.go(-1);
      },
    },

    mounted() {
      this.app.session = this.$fhem.app.session;
      this.app.options = this.$fhem.app.options;
      this.app.data = this.$fhem.app.data;
      this.$fhem.on('connect', () => this.loadRoutes())
      this.$fhem.init();
      this.loadRoutes();
    }
  };
</script>
