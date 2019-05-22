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
          <div>
            <v-chip
              close
              small
              v-for="(tag,i) in watchedTags"
              :key="i"
              color="blue lighten-4"
              @input="removeWatchTag(tag)"
            >
              <router-link class="tag" :to="'questions/tagged/' + tag.name">{{tag.name}}</router-link>
            </v-chip>
          </div>
        </v-layout>
        <v-layout v-if="editMode" column>
          <v-autocomplete
            small-chips
            v-model="selection"
            :items="availableTags"
            box
            color="blue-grey lighten-4"
            item-text="name"
            dense
            class="autocomplete"
          >
            <template v-slot:selection="data">
              <v-chip
                :selected="data.selected"
                close
                class="chip--select-multi"
                color="blue lighten-4"
                @input="remove(data.item)"
              >{{ data.item.name }}</v-chip>
            </template>
            <template v-slot:item="data">
              <template>
                <v-list-tile-content>
                  <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
          <v-btn type="button" color="orange darken-4" dark @click="addWatchTag">Add Watch Tag</v-btn>
        </v-layout>
      </v-layout>
    </v-layout>
  </v-card>
</template>
<script>
import http from "@/api/http";

export default {
  data() {
    return {
      selection: "",
      watchedTags: [],
      editMode: false,
      newTag: "",
      availableTags: []
    };
  },
  watch: {
    '$store.state.user'(old, newval) {
      console.log('watch user tags..', newval);
      this.watchedTags = [...newval.tags]
    }
  },
  methods: {
    remove(item) {
      this.selection = "";
    },
    removeWatchTag(tag) {
      http
        .delete("/auth/user/removetag/" + tag.name, {
          headers: {
            Authorization: localStorage.getItem("hackflow_token")
          }
        })
        .then(({ data }) => {
          swal.fire("Success", "Tag has been removed", "success");
          this.watchedTags = this.watchedTags.filter(x => x.name !== data.name);
        })
        .catch(err => {
          console.log(err);
          if (err.response) {
            err = err.response.data;
          }
          swal.fire("Error", err.toString(), "error");
        });
    },
    addWatchTag(tag) {
      http
        .patch("/auth/user/addtag/" + this.selection, {}, {
          headers: {
            Authorization: localStorage.getItem("hackflow_token")
          }
        })
        .then(({ data }) => {
          swal.fire("Success", "Tag has been added", "success");
          this.selection = "";
          this.watchedTags.push(data)
        })
        .catch(err => {
          console.log(err);
          if (err.response) {
            err = err.response.data;
          }
          swal.fire("Error", err.toString(), "error");
        });
    }
  },
  mounted() {
    http
      .get("tags")
      .then(({ data }) => {
        this.$store.commit("setTags", data);
        this.availableTags = data;
      })
      .catch(err => {
        console.log(err);
        if (err.response) {
          err = err.response.data;
        }
        swal.fire("Error", err.toString(), "error");
      });
  }
};
</script>
<style scoped>
.watchedPanel {
  min-width: 300px;
  height: auto;
  overflow-y: scroll;
  margin-bottom: auto;
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
  font-size: 1em;
}

.tagBtn {
  font-size: 10px;
}
.tag {
  text-decoration: none;
}
</style>

