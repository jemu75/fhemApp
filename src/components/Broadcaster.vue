<template>
  <v-alert
    :value="alert"
    :type="type"
    dense
    text
    outlined
  >
    <v-row align="center">
      <v-col>
        <div>
          {{ message }}
        </div>
        <div>
          {{ meta }}
        </div>
      </v-col>
      <v-col class="shrink">
        <v-btn
          icon
          small
          @click="clearMessage()"
        >
          <v-icon :color="type">
            mdi-close-circle
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
export default {
  name: 'BroadCaster',
  data: () => ({
    alert: false,
    type: 'info',
    types: ['','error','info','info','success','warning'],
    message: '',
    meta: '',
    msgList: []
  }),

  watch: {
    msgList() {
      if(this.msgList && this.msgList.length > 0) {
        this.type = this.types[this.msgList[0].lvl];
        this.message = this.msgList[0].msg;
        this.meta = this.msgList[0].meta;
        this.alert = true;
      } else {
        this.alert = false;
        this.type = 'info';
        this.message = '';
        this.meta = '';
      }
    }
  },

  mounted() {
    this.$fhem.on('message', (msg) => {
      let target = {
        lvl: 5,
        msg: 'no valid message received',
        meta: ''
      }

      Object.assign(target, msg);

      this.msgList.unshift(target);
    })
  },

  methods: {
    clearMessage() {
      if(this.msgList.length > 0) {
        this.msgList.splice(0, 1)
      }
    }
  }
}
</script>
