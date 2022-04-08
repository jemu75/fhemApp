<template>
  <v-col :class="setup.size">
    <v-card
      :dark="this.$vuetify.theme.dark"
      color="secondary"
    >
      <v-progress-linear
        height="7"
        :value="vals.status.level"
        :color="vals.status.color"
        background-color="secondary darken-1"
      />

      <v-card-title class="text-truncate">
        {{ vals.title }}
        <v-spacer />
        <jsonList
          v-if="app.options.debugMode"
          :item="item"
        />
        <v-btn
          small
          icon
          @click="expand"
        >
          <v-icon small>
            {{ maxIcon }}
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />

      <v-card-text>
        <v-row align="center">
          <v-col
            class="col-3"
            align="center"
          >
            <v-btn
              v-if="!expanded"
              icon
              @click="setVolume('D')"
            >
              <v-icon large>
                {{ leftIcon }}
              </v-icon>
            </v-btn>
            <v-btn
              v-if="expanded"
              icon
              :disabled="prevDisabled"
              @click="setPlayer('Previous')"
            >
              <v-icon large>
                {{ prevIcon }}
              </v-icon>
            </v-btn>
          </v-col>
          <v-divider vertical />
          <v-col align="center">
            <v-btn
              icon
              @click="setPlay()"
            >
              <v-icon large>
                {{ playIcon }}
              </v-icon>
            </v-btn>
          </v-col>
          <v-divider vertical />
          <v-col
            class="col-3"
            align="center"
          >
            <v-btn
              v-if="!expanded"
              icon
              @click="setVolume('U')"
            >
              <v-icon large>
                {{ rightIcon }}
              </v-icon>
            </v-btn>
            <v-btn
              v-if="expanded"
              icon
              :disabled="nextDisabled"
              @click="setPlayer('Next')"
            >
              <v-icon large>
                {{ nextIcon }}
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider v-if="expanded" />

      <v-card-text v-if="expanded">
        <v-row align="center">
          <v-col>
            <v-slider
              v-model="vals.volume"
              hide-details
              thumb-label
              thumb-size="48"
              color="success"
              @change="setVolume"
            >
              <template v-slot:thumb-label="{ value }">
                <div class="text-h6">
                  {{ value }}
                </div>
              </template>

              <template v-slot:prepend>
                <v-icon
                  @click="setMute()"
                >
                  {{ volumeIcon }}
                </v-icon>
              </template>
            </v-slider>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col class="col-4" />
          <v-col
            class="col-4 text-h6"
            align="center"
          >
            {{ vals.trackPosition }}
          </v-col>
          <v-col
            class="col-4"
            align="center"
          >
            {{ vals.tracks }}
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider v-if="expanded && vals.zones.length > 0" />
      <v-card-text v-if="expanded && vals.zones.length > 0">
        <v-row>
          <v-col>
            <span
              v-for="zone in vals.zones"
              :key="zone"
            >
              <v-chip
                small
                class="mr-2"
              >{{ zone }}</v-chip>
            </span>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />
      <v-system-bar color="secondary darken-1">
        <v-icon class="ml-0">
          {{ vals.info.left1Icon }}
        </v-icon>
        <div class="text-truncate">
          {{ vals.info.left1Text }}
        </div>
        <v-icon class="ml-2">
          {{ vals.info.left2Icon }}
        </v-icon>
        <div class="text-truncate">
          {{ vals.info.left2Text }}
        </div>
        <v-spacer />
        <v-icon>
          {{ vals.info.mid1Icon }}
        </v-icon>
        <div class="text-truncate">
          {{ vals.info.mid1Text }}
        </div>
        <v-icon class="ml-2">
          {{ vals.info.mid2Icon }}
        </v-icon>
        <div class="text-truncate">
          {{ vals.info.mid2Text }}
        </div>
        <v-spacer />
        <v-icon>
          {{ vals.info.right1Icon }}
        </v-icon>
        <div class="text-truncate">
          {{ vals.info.right1Text }}
        </div>
        <v-icon class="ml-2 mr-0">
          {{ vals.info.right2Icon }}
        </v-icon>
        <div class="text-truncate">
          {{ vals.info.right2Text }}
        </div>
      </v-system-bar>
    </v-card>
  </v-col>
</template>

<script>
  import jsonList from '@/components/Jsonlist.vue'

  export default {
    components: {
      jsonList
    },

    props: {
      item: {
        type: Object,
        default: () => { return { name: 'sonos' } }
      }
    },

    data: () => ({
      name: 'sonos',
      app: {
        options: {
          debugMode: false
        }
      },
      setup: {
        size: 'col-12 col-sm-6 col-md-4 col-lg-4',
        status: {
          bar: [
          "transportState:PLAYING:100:success",
          "transportState::0:success"],
          error: []
        },
        info: {
          left1: [
            "Mute:1::mdi-volume-off",
            "transportState:PLAYING::mdi-play",
            "transportState:::mdi-pause"
          ],
          left2: [
            "currentArtist:$:%s",
            "currentSource::%s"
          ],
          mid1: [],
          mid2: [],
          right1: [],
          right2: [
            "currentTitle::%s"
          ]
        }
      },
      vals: {
        status: {
          color: '',
          level: 0
        },
        info: {
          left1Icon: '',
          left1Text: '',
          left2Icon: '',
          left2Text: '',
          mid1Icon: '',
          mid1Text: '',
          mid2Icon: '',
          mid2Text: '',
          right1Icon: '',
          right1Text: '',
          right2Icon: '',
          right2Text: ''
        },
        title: '',
        mainState: '',
        play: false,
        volume: 0,
        volumeChanged: false,
        mute: false,
        trackPosition: '',
        zones: [],
        tracks: '',
        playInfo1: '',
        playInfo2: '',
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
      volumeIcon: 'mdi-volume-high',
      pendingClick: 0
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
          //let currentSender = this.$fhem.getEl(val, 'Readings', 'currentSender', 'Value');
          //let currentSenderInfo = this.$fhem.getEl(val, 'Readings', 'currentSenderInfo', 'Value');
          //let currentAlbum = this.$fhem.getEl(val, 'Readings', 'currentAlbum', 'Value');
          //let currentArtist = this.$fhem.getEl(val, 'Readings', 'currentArtist', 'Value');
          //let currentTitle = this.$fhem.getEl(val, 'Readings', 'currentTitle', 'Value');
          let currentTrack = this.$fhem.getEl(val, 'Readings', 'currentTrack', 'Value');
          let numOfTracks = this.$fhem.getEl(val, 'Readings', 'numberOfTracks', 'Value');
          let zone = this.$fhem.getEl(val, 'Readings', 'ZoneGroupNameDetails', 'Value');
          let alias = this.$fhem.getEl(val, 'Attributes', 'alias') || val.Name;

          this.vals.title = this.$fhem.getEl(val, 'Options', 'name') || alias;

          if(zone) this.vals.title += ' (gruppiert)';
          this.vals.zones = zone.split(' + ').filter(Boolean);

          this.prevDisabled = trackHandle.split('|')[0].length > 0 ? false : true;
          this.nextDisabled = trackHandle.split('|')[1].length > 0 ? false : true;

          this.vals.trackPosition = this.$fhem.getEl(val, 'Readings', 'currentTrackPositionSimulated', 'Value');

          if(this.vals.volumeChanged && this.vals.volume === parseInt(volume)) this.vals.volumeChanged = false;
          if(!this.vals.volumeChanged) this.vals.volume = parseInt(volume);

          this.vals.mute = mute === '1' ? true : false;
          this.volumeIcon = this.vals.mute ? 'mdi-volume-mute' : 'mdi-volume-high';

          //currentAlbum += currentArtist ? ' (' + currentArtist + ')' : '';
          //this.vals.playInfo1 = stream === '1' ? currentSender : currentAlbum;
          //this.vals.playInfo2 = stream === '1' ? currentSenderInfo : currentTitle;
          //if(!this.vals.systemIconValue) this.vals.systemIconValue = this.vals.playInfo1;

          this.vals.tracks = stream === '0' ? (currentTrack + ' von ' + numOfTracks) : '';

          this.vals.play = state === 'PLAYING' ? true : false;
          this.playIcon = this.vals.play ? 'mdi-pause' : 'mdi-play';

          this.setValues();
        }
      }
    },

    mounted() {
      this.app.options = this.$fhem.app.options;

      /*
      setInterval(() => {
        this.vals.systemIconValue = this.vals.systemIconValue === this.vals.playInfo1 ? this.vals.playInfo2 : this.vals.playInfo1;
      }, 3000)
      */
    },

    methods: {
      setValues() {
        let statusVals = this.$fhem.handleVals(this.item, this.setup.status.bar);
        let errorVals = this.$fhem.handleVals(this.item, this.setup.status.error);
        let infoLeft1Vals = this.$fhem.handleVals(this.item, this.setup.info.left1);
        let infoLeft2Vals = this.$fhem.handleVals(this.item, this.setup.info.left2);
        let infoMid1Vals = this.$fhem.handleVals(this.item, this.setup.info.mid1);
        let infoMid2Vals = this.$fhem.handleVals(this.item, this.setup.info.mid2);
        let infoRight1Vals = this.$fhem.handleVals(this.item, this.setup.info.right1);
        let infoRight2Vals = this.$fhem.handleVals(this.item, this.setup.info.right2);

        this.vals.status.level = statusVals[0] || '100';
        this.vals.status.color = statusVals[1] || 'success';
        this.vals.status.invert = statusVals[2] ? true : false;

        this.vals.info.left1Icon = infoLeft1Vals[1] || '';
        this.vals.info.left1Text = infoLeft1Vals[0] || '';

        this.vals.info.left2Icon = infoLeft2Vals[1] || '';
        this.vals.info.left2Text = infoLeft2Vals[0] || '';

        this.vals.info.mid1Icon = infoMid1Vals[1] || '';
        this.vals.info.mid1Text = infoMid1Vals[0] || '';

        this.vals.info.mid2Icon = infoMid2Vals[1] || '';
        this.vals.info.mid2Text = infoMid2Vals[0] || '';

        this.vals.info.right1Icon = infoRight1Vals[1] || '';
        this.vals.info.right1Text = infoRight1Vals[0] || '';

        this.vals.info.right2Icon = infoRight2Vals[1] || '';
        this.vals.info.right2Text = infoRight2Vals[0] || '';

        if(errorVals.length > 0) {
          this.vals.status.level = errorVals[0] || '100';
          this.vals.status.color = errorVals[1] || 'error';
          this.vals.main.text = errorVals[2] || 'Fehler';
          this.isActive = false;
        } else {
          this.isActive = true;
        }
      },

      sendCmd(cmd, delay) {
        if(!delay) {
          this.$fhem.request(cmd);
        } else {
          if (this.pendingClick) {
            clearTimeout(this.pendingClick);
            this.pendingClick = 0;
          }

          this.pendingClick = setTimeout(() => {
            this.$fhem.request(cmd);
          }, 1000);
        }
      },

      setVolume(val) {
        this.vals.volumeChanged = true;
        let volume = this.vals.zones.length > 0 ? ' GroupVolume' : ' Volume';
        if(val != 'D' && val != 'U') val = ' ' + val;
        let cmd = 'set ' + this.item.Name + volume + val;
        this.sendCmd(cmd);
      },

      setPlayer(val) {
        let cmd = 'set ' + this.item.Name + ' ' + val;
        this.sendCmd(cmd)
      },

      setPlay() {
        let cmd = 'set ' + this.item.Name + (this.vals.play ? ' Pause' : ' Play');
        this.sendCmd(cmd)
      },

      setMute() {
        let cmd = 'set ' + this.item.Name + (this.vals.mute ? ' Mute 0' : ' Mute 1');
        this.sendCmd(cmd)
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
    }
  }
</script>
