<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
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

      <v-card>
        <v-card-title class="headline secondary">
          <v-btn
            icon
            @click="deep = deep > 1 ? 1 : 5"
          >
            <v-icon>mdi-file-tree-outline</v-icon>
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
        <v-divider />
        <v-card-text class="secondary lighten-2">
          <vue-json-pretty
            :show-line="false"
            :deep="deep"
            :data="item"
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
    }
  }
</script>
