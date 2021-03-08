<template>
  <v-col class="col-12 col-sm-6 col-md-4 col-lg-4" :order="vals.order">
    <v-card :dark="this.$vuetify.theme.dark" color="secondary">
      <v-progress-linear height="7" :value="vals.mainLevel" :color="vals.mainColor" background-color="secondary darken-1"></v-progress-linear>

      <v-card-title class="text-truncate">
        {{ vals.title }}
        <v-spacer></v-spacer>
        <v-btn small icon @click="expand">
          <v-icon small>{{ maxIcon }}</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-row align="center">
          <v-col class="col-3" align="center">
            <v-btn v-if="!expanded" icon v-on:click="setPlayer('VolumeD')">
              <v-icon large>{{ leftIcon }}</v-icon>
            </v-btn>
            <v-btn v-if="expanded" icon :disabled="prevDisabled" v-on:click="setPlayer('Previous')">
              <v-icon large>{{ prevIcon }}</v-icon>
            </v-btn>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col align="center">
            <v-btn icon v-on:click="setPlay()">
              <v-icon large>{{ playIcon }}</v-icon>
            </v-btn>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col class="col-3" align="center">
            <v-btn v-if="!expanded" icon v-on:click="setPlayer('VolumeU')">
              <v-icon large>{{ rightIcon }}</v-icon>
            </v-btn>
            <v-btn v-if="expanded" icon :disabled="nextDisabled" v-on:click="setPlayer('Next')">
              <v-icon large>{{ nextIcon }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider v-if="expanded"></v-divider>

      <v-card-text v-if="expanded">
        <v-row align="center">
          <v-col>
            <v-slider v-model="vals.newVolume" hide-details color="accent">
              <template v-slot:prepend>
                <v-icon
                  @click="setMute()">{{ volumeIcon }}
                </v-icon>
              </template>

            </v-slider>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col class="col-4">
          </v-col>
          <v-col class="col-4 text-h6" align="center">
            {{ vals.trackPosition }}
          </v-col>
          <v-col class="col-4" align="center">
            {{ vals.tracks }}
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider v-if="expanded && vals.zones.length > 0"></v-divider>
      <v-card-text v-if="expanded && vals.zones.length > 0">
        <v-row>
          <v-col>
            <span v-for="zone in vals.zones" :key="zone">
              <v-chip small class="mr-2">{{ zone }}</v-chip>
            </span>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>
      <v-system-bar color="secondary darken-1">
        <v-icon>{{ vals.systemIcon }}</v-icon>
        <span class="text-truncate">{{ vals.systemIconValue }}</span>
      </v-system-bar>
    </v-card>
  </v-col>
</template>

<script>
  export default {
    data: () => ({
      name: 'sonos',
      defaultSet: [
        "Volume:^[0]$:stumm::success:mdi-volume-off",
        "transportState:PLAYING:an:100:success:mdi-play",
        "transportState::aus:0:success:mdi-pause"
      ],
      vals: {
        order: '',
        title: '',
        mainState: '',
        mainLevel: 0,
        mainColor: '',
        play: false,
        volume: 0,
        mute: false,
        volumeChanged: false,
        trackPosition: '',
        zones: [],
        tracks: '',
        newVolume: 0,
        playInfo1: '',
        playInfo2: '',
        systemIcon: '',
        systemIconValue: ''
      },
      leftIcon: 'mdi-minus',
      playIcon: 'mdi-play',
      rightIcon: 'mdi-plus',
      maxIcon: 'mdi-arrow-expand',
      expanded: false,
      prevIcon: 'mdi-skip-previous',
      prevDisabled: true,
      nextIcon: 'mdi-skip-next',
      nextDisabled: true,
      volumeIcon: 'mdi-volume-high'
    }),

    watch: {
      item: {
        immediate: true,
        deep: true,
        handler(val) {
          let state = this.$fhem.getEl(val, 'Readings', 'transportState', 'Value');
          let trackHandle = this.$fhem.getEl(val, 'Readings', 'nextTrackHandle', 'Value') || '|';
          let volume = this.$fhem.getEl(val, 'Readings', 'Volume', 'Value');
          let mute = this.$fhem.getEl(val, 'Readings', 'Mute', 'Value');
          let stream = this.$fhem.getEl(val, 'Readings', 'currentStreamAudio', 'Value');
          let currentSender = this.$fhem.getEl(val, 'Readings', 'currentSender', 'Value');
          let currentSenderInfo = this.$fhem.getEl(val, 'Readings', 'currentSenderInfo', 'Value');
          let currentAlbum = this.$fhem.getEl(val, 'Readings', 'currentAlbum', 'Value');
          let currentArtist = this.$fhem.getEl(val, 'Readings', 'currentArtist', 'Value');
          let currentTitle = this.$fhem.getEl(val, 'Readings', 'currentTitle', 'Value');
          let currentTrack = this.$fhem.getEl(val, 'Readings', 'currentTrack', 'Value');
          let numOfTracks = this.$fhem.getEl(val, 'Readings', 'numberOfTracks', 'Value');
          let zone = this.$fhem.getEl(val, 'Readings', 'ZoneGroupNameDetails', 'Value');

          this.vals.order = this.$fhem.getEl(val, 'Attributes', 'sortby') || 'last';
          this.vals.title = this.$fhem.getEl(val, 'Attributes', 'alias') || val.Name;
          this.vals = this.$fhem.handleStates(val, this.vals, this.defaultSet);

          if(zone) this.vals.title += ' (gruppiert)';
          this.vals.zones = zone.split(' + ').filter(Boolean);

          this.prevDisabled = trackHandle.split('|')[0].length > 0 ? false : true;
          this.nextDisabled = trackHandle.split('|')[1].length > 0 ? false : true;

          this.vals.trackPosition = this.$fhem.getEl(val, 'Readings', 'currentTrackPositionSimulated', 'Value');

          this.vals.volume = parseInt(volume);
          if(!this.vals.volumeChanged) this.vals.newVolume = this.vals.volume;
          if(this.vals.volumeChanged && this.vals.volume === this.vals.newVolume) this.vals.volumeChanged = false;

          this.vals.mute = mute === '1' ? true : false;
          this.volumeIcon = this.vals.mute ? 'mdi-volume-mute' : 'mdi-volume-high';

          currentAlbum += currentArtist ? ' (' + currentArtist + ')' : '';
          this.vals.playInfo1 = stream === '1' ? currentSender : currentAlbum;
          this.vals.playInfo2 = stream === '1' ? currentSenderInfo : currentTitle;
          if(!this.vals.systemIconValue) this.vals.systemIconValue = this.vals.playInfo1;

          this.vals.tracks = stream === '0' ? (currentTrack + ' von ' + numOfTracks) : '';

          this.vals.play = state === 'PLAYING' ? true : false;
          this.playIcon = this.vals.play ? 'mdi-pause' : 'mdi-play';
        }
      },

      'vals.newVolume'(val) {
        this.vals.volumeChanged = true;
        let cmd = 'set ' + this.item.Name + ' Volume ' + val;
        this.$fhem.request(cmd);
      },
    },

    methods: {
      setPlayer(val) {
        let cmd = 'set ' + this.item.Name + ' ' + val;
        this.$fhem.request(cmd)
      },

      setPlay() {
        let cmd = 'set ' + this.item.Name + (this.vals.play ? ' Pause' : ' Play');
        this.$fhem.request(cmd);
      },

      setMute() {
        let cmd = 'set ' + this.item.Name + (this.vals.mute ? ' Mute 0' : ' Mute 1');
        this.$fhem.request(cmd);
      },

      expand() {
        if(this.expanded) {
          this.expanded = false;
          this.maxIcon = 'mdi-arrow-expand';
        } else {
          this.expanded = true;
          this.maxIcon = 'mdi-arrow-collapse';
        }
      }
    },

    mounted() {
      setInterval(() => {
        this.vals.systemIconValue = this.vals.systemIconValue === this.vals.playInfo1 ? this.vals.playInfo2 : this.vals.playInfo1;
      }, 3000)
    },

    props: {
      item: {}, // jsonObject from FHEM Device
    }
  }
</script>
