<template>
  <v-app>
    <nav class="navbar navbar-dark bg-dark">
      <button
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
        class="navbar-toggler collapsed"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <form class="form-inline my-2 my-lg-0" v-if="isLoggedIn && this.$route.path == '/dashboard'">
        <input type="search" placeholder="Search" aria-label="Search" class="form-control mr-sm-2" v-model="search">
        <button type="submit" class="btn btn-outline-success my-2 my-sm-0">Search</button>
      </form>
      <div id="navbarTogglerDemo01" class="navbar-collapse collapse">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <router-link to="/" v-if="!isLoggedIn" style="textDecoration: none;color:white;">
          Home
          </router-link>
          <router-link to="/dashboard" v-if="isLoggedIn" style="textDecoration: none;color:white;">
          Home
          </router-link>
          <router-link to="/createQuestion" v-if="isLoggedIn" style="textDecoration: none;color:white;">
          Add Question
          </router-link>
          <router-link to="/myDashboard" v-if="isLoggedIn" style="textDecoration: none;color:white;">
          My question
          </router-link>
          <router-link to="/myAnswers" v-if="isLoggedIn" style="textDecoration: none;color:white;">
          My answer
          </router-link>
          <router-link to="/register" v-if="!isLoggedIn" style="textDecoration: none;color:white;">
          Register
          </router-link>
          <router-link to="/login" v-if="!isLoggedIn" style="textDecoration: none;color:white;">
          Login
          </router-link>
          <li v-if="isLoggedIn">
            <a href="#" @click="logout" style="textDecoration: none;color:white;">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view v-bind:search="search"></router-view>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import Dropdown from "./components/Dropdown";
export default {
  name: "App",
  data() {
    return {
      search: "",
      socket: io("http://localhost:3000")
    };
  },
  computed: mapState(["isLoggedIn"]),
  components: {
    Dropdown
  },
  created() {
    // Verify user token
    if (localStorage.getItem("token")) this.verify();
  },
  methods: {
    verify() {
      let token = localStorage.getItem("token");
      this.$axios
        .post("/users/verify", { token }, { headers: { token } })
        .then(({ data }) => {
          this.$store.dispatch("verify");
          this.$store.dispatch("getQuestions");
          this.$store.dispatch("getUserQuestions");
          this.$store.dispatch("getUserAnswers");
          this.$router.push("/dashboard");
          console.log(data.message);
        })
        .catch(err => {
          const { message } = err.response.data;
          this.$swal("Error!", message, "error");
          this.$router.push("/");
          localStorage.clear();
        });
    },
    logout() {
      this.$store.commit("logout");
      this.$swal("Bye bye!");
      localStorage.clear();
      this.$router.push("/");
    }
  }
};
</script>

<style>
.ck-editor__editable_inline {
  min-height: 200px !important;
}
</style>
