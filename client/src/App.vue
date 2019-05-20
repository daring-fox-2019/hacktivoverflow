<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="!$store.state.isLoggedIn" to="/login"
        >| Log In |</router-link
      >
      <router-link v-if="!$store.state.isLoggedIn" to="/register">
        | Register |</router-link
      >
      <router-link v-if="$store.state.isLoggedIn" to="/question"
        >| Question |</router-link
      >
      <a style="cursor:pointer" @click="Logout" v-if="$store.state.isLoggedIn"
        >| Log Out |</a
      >
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
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
import { mapState, mapActions } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState(["isLoggedIn", "indivQuestionData", "indivAnswerData"])
  },
  methods: {
    Logout() {
      this.$store.commit("logout");
      localStorage.clear();
      this.$router.push({ path: "/login", name: "login" });
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
