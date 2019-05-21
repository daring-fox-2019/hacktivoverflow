<template>
  <div id="app">
    <div style="font-family: 'Dosis', sans-serif;">
      <b-navbar toggleable="lg" type="light" variant="light">
        <b-navbar-brand href="#">
          <router-link to="/" style="text-decoration:none; color: black">
            <img
              src="https://storage.cloud.google.com/jualeun-qfs/so-logo-s.v01.jpg?_ga=2.117439299.-415458887.1554453586"
              style="height:35px; width:35px;border-radius:17.5px; margin-bottom:10px"> <span
              style="font-size:25px; margin-left:10px">Snap
              Overflow</span>
          </router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item>
              <router-link v-if="!$store.state.isLoggedIn" to="/login">Log In</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link v-if="!$store.state.isLoggedIn" to="/register">
                Register</router-link>
            </b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="">
            <b-nav-form v-if="this.$store.state.isLoggedIn">
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item>
              <router-link v-if="$store.state.isLoggedIn" to="/question">Questions</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link style="cursor:pointer" v-if="$store.state.isLoggedIn" to="/addquestion">Add Question
              </router-link>
            </b-nav-item>
            <b-nav-item>
              <a style="cursor:pointer" @click="Logout" v-if="$store.state.isLoggedIn">Log Out</a>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <router-view />
  </div>
</template>

<style>
  @import url('https://fonts.googleapis.com/css?family=Dosis&display=swap');

  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }


  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>

<script>
  import {
    mapState,
    mapActions
  } from "vuex";

  export default {
    name: "App",
    computed: {
      ...mapState(["isLoggedIn", "indivQuestionData", "indivAnswerData"])
    },
    methods: {
      Logout() {
        this.$store.commit("logout");
        localStorage.clear();
        this.$router.push({
          path: "/login",
          name: "login"
        });
      },
      ...mapActions(["login", "logout", "simpenGlobalQuest", "simpenGlobalAns"]),
      getLogin() {
        console.log(this.$store.state.isLoggedIn);
      }
    },
    created() {
      this.getLogin();
      if (localStorage.jwtoken) {
        this.$store.commit("login");
      }
    }
  };
</script>