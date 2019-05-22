<template>
  <v-app>
    <v-toolbar fixed color="grey lighten-4" flat>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <ModalLogin v-if="!this.$store.state.isLogin"></ModalLogin>
        <ModalRegister v-if="!this.$store.state.isLogin"></ModalRegister>

        <v-btn @click="signOut" v-if="this.$store.state.isLogin" flat>Sign Out</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container text-xs-left fluid class="mt-4">
      <v-layout class="mt-5" row wrap>
        <v-flex xs2>
          <section>
            <img style="height:14vh;" src="https://i.ibb.co/qYQ9WTv/ginger.png"><br>
            <span class="ml-3">Welcome {{name}}! </span>
          </section>
          <v-btn
            class
            style=" background-color:white;width: 112px;"
            @click="browse"
            flat
          >Browse THREAD</v-btn>
          <v-btn
            style="background-color:white; width: 112px;"
            @click="askQuestion"
            v-if="isLogin"
            flat
          >POST QUESTION</v-btn>
          <v-btn
            style="background-color:white; width : 112px;"
            @click="backToDashboard"
            v-if="isLogin"
            flat
          >MY Dashboard</v-btn>
          <v-btn
            style="background-color:white; width : 112px;"
            @click="addTagPage"
            v-if="isLogin"
            flat
          >TAGS LIST</v-btn>
          <v-btn
            style="background-color:white; width : 112px;"
            @click="getTechBuzzPage"
            flat
          >Tech Buzz</v-btn>
          <v-spacer></v-spacer>
          <br>
          <br>
          <v-layout v-if="isLogin" row wrap>
            <v-chip small 
            @input.="deleteTag(tag._id)"
            :to="{ name: 'question-tag', params: { tag: tag }}"
            close color="orange" 
            class="caption" text-color="white"
            v-for="(tag, index) in watchedTag"
             :key="index"
            >
              {{tag.name}}
              <v-icon right>star</v-icon>
            </v-chip>

          </v-layout>
        </v-flex>

        <v-flex style="margin-top:-3vh;" xs9>
          <router-view></router-view>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import ModalLogin from "./components/ModalLogin.vue";
import ModalRegister from "./components/ModalRegister.vue";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    ModalLogin,
    ModalRegister
    // OpeningJumbotron
  },
  data() {
    return {
      name : ""
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$store.commit("persistLoginStatus");
      this.$store.dispatch("getUser");
      this.name = localStorage.getItem('email').split('@')[0]
      // this.getUser();
    }
  },
  computed: {
    ...mapState(["watchedTag", "isLogin"])
  },
  data() {
    return {
      gradient: "to top, #7B1FA2, #E1BEE7",
      drawer: true,
      mini: true,
      right: null,
      tags: []
    };
  },
  methods: {
    signOut() {
      this.$store.commit("changeSignOutStatus");
    },
    askQuestion() {
      this.$router.push("/ask");
    },
    backToDashboard() {
      this.$router.push("/dashboard");
    },
    browse() {
      this.$router.push("/questions");
    },
    redirect() {
      this.$router.push("/");
    },
    addTagPage() {
      this.$router.push("/tags");
    },
    getTechBuzzPage() {
      this.$router.push("/buzz");
    },
    deleteTag(id) {
      this.axios
        .delete(`/users/tags/${id}`, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({data}) => {
          this.getUser()
        })
        .catch(err => {

        })      
    }
  }
  // ,
  // watch: {
  //   tags() {
  //     this.getUser()
  //   }
  // },
};
</script>

<style scoped>

#app {
  background-color: white;
  /* font-family: 'IBM Plex Sans', sans-serif; */
  font-family: 'Pontano Sans', sans-serif;
  /* font-family: 'Rubik', sans-serif; */
/* font-family: 'Stardos Stencil', cursive; */
}
</style>
