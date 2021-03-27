<template>
  <div>
    <v-card light>
      <v-card-title>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
      </v-card-title>

      <v-data-table :headers="headers" :items="app.deviceList" :items-per-page="10" :search="search">
        <template v-slot:item.actions="{ item }">
          <v-icon class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" light max-width="50%">
      <v-card>
        <v-card-title class="headline" primary-title>
          {{ editedItem.Name }}
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-row>
              <v-col>
                <v-text-field v-model="editedItem.Attributes.group" label="Gruppe" @change="update('group')"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field v-model="editedItem.Attributes.room" label="Raum" @change="update('room')"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field v-model="editedItem.Attributes.alias" label="Alias" @change="update('alias')"></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">SCHLIESSEN</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
export default {
  name: 'EditDevices',
  data: () => ({
    mytest: 20,
    search: '',
    headers: [
      { text: 'Name', value: 'Name' },
      { text: 'Gruppe', value: 'Attributes.group' },
      { text: 'Raum', value: 'Attributes.room' },
      { text: 'Alias', value: 'Attributes.alias' },
      { text: '', value: 'actions', sortable: false }
    ],
    app: {
      deviceList: []
    },
    editedItem: { Attributes: { group: '', room: '', alias: '' } },
    dialog: false,
  }),

  methods: {
    getData(restart) {
      if(restart) {
        if(!this.restart) {
          this.restart = true;
          setTimeout(() => {
            this.restart = false;
            this.getData();
          }, 1000);
        }
        return;
      }

      let fltr = 'appOptions!=';

      this.$fhem.getDevices(fltr)
    },

    editItem(item) {
      this.editedItem = Object.assign({}, item)
      this.dialog = true;
    },

    update(attr) {
      let cmd = 'attr ' + this.editedItem.Name + ' ' + attr + ' ' + this.editedItem.Attributes[attr];

      this.$fhem.request(cmd)
        .then(() => this.$fhem.request('save'));
    }
  },

  mounted() {
    this.app = this.$fhem.app.data;
    this.getData();
  }
}
</script>
