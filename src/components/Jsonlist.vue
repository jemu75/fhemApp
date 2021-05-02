<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      max-width="90%"
      scrollable
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon
            small
          >
            mdi-code-json
          </v-icon>
        </v-btn>
      </template>

      <v-card class="secondary lighten-1">
        <v-card-title class="secondary">
          <v-btn
            icon
            @click="deep = deep > 1 ? 1 : 5"
          >
            <v-icon>mdi-file-tree-outline</v-icon>
          </v-btn>

          <v-btn
            icon
            @click="copyToClipboard()"
          >
            <v-icon>mdi-content-copy</v-icon>
          </v-btn>


          <v-spacer />
          {{ item.Name }}
          <v-spacer />
          <v-btn
            icon
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <vue-json-pretty
            :show-line="false"
            :deep="deep"
            :data="item"
            ref="jsonContent"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  import VueJsonPretty from 'vue-json-pretty'
  import 'vue-json-pretty/lib/styles.css'

  export default {
    props: {
      item: {
        type: Object,
        default: () => { return { name: 'json' } }
      }
    },

    data () {
      return {
        dialog: false,
        deep: 1
      }
    },

    components: {
      VueJsonPretty
    },

    methods: {
      copyToClipboard() {
        var copyText = JSON.stringify(this.$refs.jsonContent.data, null, 2);
        navigator.clipboard.writeText(copyText);
      }
    }
  }
</script>
