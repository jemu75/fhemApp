<template>
  <v-alert :value="alert" :type="type" dense text outlined>
    <v-row align="center">
      <v-col>
        {{ message }}
      </v-col>
      <v-col class="shrink">
        <v-btn icon small @click="clearMessage()">
          <v-icon :color="type">mdi-close-circle</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
export default {
  data: () => ({
    alert: false,
    type: 'info',
    message: '',
    msgList: []
  }),

  watch: {
    msgList() {
      if(this.msgList && this.msgList.length > 0) {
        this.type = this.msgList[0].type;
        this.message = this.msgList[0].message;
        this.alert = true;
      } else {
        this.alert = false;
        this.type = 'info';
        this.message = '';
      }
    }
  },

  methods: {
    clearMessage() {
      if(this.msgList.length > 0) {
        this.msgList.splice(0, 1)
      }
    }
  },

  mounted() {
    this.$fhem.on('message', (msg) => {
      let target = {
        type: 'warning',
        message: 'no valid message received'
      }

      Object.assign(target, msg);

      this.msgList.unshift(target);
    })
  }
}
</script>
