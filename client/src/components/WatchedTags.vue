<template>
  <v-card class="watchedPanel">
    <v-layout column>
      <v-layout height="42px" id="tagToolbar" justify-between align-center>
        <v-icon class="mr-2">remove_red_eye</v-icon>
        <div class="titleTag">Watched Tags</div>
        <v-spacer></v-spacer>
        <v-btn
          color="orange darken-4"
          class="tagEditBtn"
          outline
          height="36px"
          dark
          @click="editMode = !editMode"
        >Edit</v-btn>
      </v-layout>
      <v-layout column pa-2>
        <v-layout wrap pa-2>
          <div v-if="!editMode">
            <v-chip small v-for="(tag,i) in watched" :key="i" color="blue lighten-4">
              <a class="tag" v-bind:href="'questions/tagged/' + tag.name">{{tag.name}}</a>
            </v-chip>
          </div>
          <div v-if="editMode"></div>
        </v-layout>
        <v-form pa-2>
          <v-autocomplete
            v-model="watchedTags"
            :items="availableTags"
            box
            chips
            color="blue-grey lighten-4"
            item-text="name"
            item-value="name"
            multiple
            class="autocomplete"
          >
            <template v-slot:selection="data">
              <v-chip
                :selected="data.selected"
                close
                color="blue lighten-4"
                class="chip--select-multi tagBtn"
                @input="remove(data.item)"
              >{{ data.name }}</v-chip>
            </template>
            <template v-slot:item="data">
              <template>
                <v-list-tile-content>
                  <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
        </v-form>
      </v-layout>
    </v-layout>
  </v-card>
</template>
<script>
import http from "@/api/http";

export default {
  data() {
    return {
      watched: [],
      editMode: false,
      watchedTags: [],
      availableTags: []
    };
  },
  methods: {
    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    }
  },
  mounted() {
    this.watchedTags = { ...this.$store.state.user.tags };
    this.$store
      .dispatch("getTags")
      .then(({ data }) => {
        console.log(`tags arrived..`, data);
        this.$store.commit('setTags', data);
        this.availableTags = data;
      })
      .catch(err => {
        if(err.response) {
          err = err.response.data;
        }
        swal.fire('Error', err, 'error')
      });
  }
};
</script>
<style scoped>
.watchedPanel {
  min-width: 300px;
  max-height: 300px;
  overflow-y: scroll;
}
.titleTag {
  color: rgb(114, 111, 111);
  font-size: 14px;
}
.tagEditBtn {
  max-height: 28px;
}

#tagToolbar {
  padding: 3px 10px;
  border-bottom: 1px solid rgb(207, 205, 205);
  background-color: rgb(230, 230, 230);
}

.autocomplete {
  font-size: 0.6em;
}

.tagBtn {
  font-size: 10px;
}
</style>

