<template>
  <v-flex xs3>
    <div>
      <v-container>
        <v-card class="ma-1" v-for="(menu, index) in menuList" :key="index">
          <router-link :to="menu.route" v-if="menu.auth">
            <v-card-title style="display: flex; justify-content: space-between;">
              <div style="color: white;">{{ menu.name }}</div>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-card-title>
          </router-link>
        </v-card>
        <v-card class="ma-1" v-if="auth">
          <v-card-title style="display: flex; justify-content: space-between;">
            <div style="color: white;">Saved Tags</div>
            <a @click.prevent="editMode = true" v-if="!editMode">Edit</a>
            <a @click.prevent="editMode = false" v-if="editMode">Done</a>
            <v-icon>label</v-icon>
          </v-card-title>
          <div class="pa-2">
            <div v-if="!editMode">
              <v-btn
                small
                v-for="(tag, index) in watchedTags"
                :key="index"
                :to="'/tagged/' + tag"
              >{{ tag }}</v-btn>
            </div>
            <div v-if="editMode">
              <v-chip
                v-for="(tag, index) in watchedTags"
                :key="index"
                @click="deleteTag(tag)"
                color="grey darken-4"
                label
                small
                class="font-weight-bold ma-1"
              >
                {{ tag }}
                <a>&times;</a>
              </v-chip>
            </div>
          </div>
          <div v-if="editMode" class="pa-2">
            <v-form @submit.prevent="addTag">
              <v-card light>
                <input type="text" name="tags" width="100%" v-model="newTag">
              </v-card>
            </v-form>
          </div>
        </v-card>
      </v-container>
    </div>
  </v-flex>
</template>

<script>
import { mapState } from "vuex";
import swal from 'sweetalert'

export default {
  name: "sidebar",
  data() {
    return {
      menuList: [
        {
          id: 1,
          name: "Home",
          icon: "home",
          route: "/",
          auth: true
        },
        {
          id: 2,
          name: "My Questions",
          icon: "live_help",
          route: "/myQuestions",
          auth: false
        },
        {
          id: 3,
          name: "My Answers",
          icon: "error",
          route: "/myAnswers",
          auth: false
        }
        // {
        //   id: 4,
        //   name: "Tags",
        //   icon: "list",
        //   route: "/tags",
        //   auth: true,
        // },
      ],
      auth: false,
      watchedTags: [],
      editMode: false,
      newTag: ""
    };
  },
  methods: {
    fetchMyTag() {
      axios({
        method: "get",
        url: `http://34.87.71.136/users/${localStorage.id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log({ data });
          this.watchedTags = [];
          this.watchedTags = data.tags;
        })
        .catch(err => {
          err.origin = "sidebar.vue - fetchmytag";
          this.$emit("error", err);
        });
    },
    deleteTag(tag) {
      // swal(tag);
      this.watchedTags = this.watchedTags.filter(item => item != tag);
    },
    addTag() {
      let unik = true;
      this.watchedTags.forEach(item => {
        if (this.newTag == item) {
          unik = false;
        }
      });
      if (unik) {
        this.watchedTags.push(this.newTag);
      }
      this.newTag = "";
    }
  },
  created() {
    if (localStorage.token) {
      this.fetchMyTag();
      this.menuList.forEach(item => {
        item.auth = true;
      });
      this.auth = true
    } else {
      this.watchedTags = [];
      this.menuList.forEach(item => {
        item.auth = false;
      });
      this.menuList[0].auth = true;
      this.auth = false
    }
  },
  computed: {
    ...mapState(["isLoggedIn"])
  },
  watch: {
    editMode() {
      if (this.editMode) {
        axios({
          method: "put",
          url: `http://34.87.71.136/users/${localStorage.id}`,
          headers: {
            token: localStorage.token
          },
          data: {
            tags: this.watchedTags
          }
        })
          .then(({ data }) => {
            // console.log({ data });
            this.watchedTags = [];
            this.watchedTags = data.tags;
          })
          .catch(err => {
            err.origin = "sidebar.vue - fetchmytag";
            this.$emit("error", err);
          });
      }
    },
    isLoggedIn() {
      if (this.isLoggedIn) {
        this.fetchMyTag();
        this.menuList.forEach(item => {
          item.auth = true;
        });
        this.auth = true
      } else {
        this.watchedTags = [];
        this.menuList.forEach(item => {
          item.auth = false;
        });
        this.menuList[0].auth = true;
        this.auth = false
      }
    }
  }
};
</script>

<style>
a {
  text-decoration: none;
  color: white;
}
</style>
