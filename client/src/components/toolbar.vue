<template>
  <v-toolbar app>
    <router-link to="/" style="text-decoration: none; color: white;">
      <v-toolbar-title class="headline text-uppercase">
        <span>Hacktiv</span>
        <span class="font-weight-light">Overflow</span>
      </v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>
    <div>
      Search
    </div>
    <v-spacer></v-spacer>
    <div>{{ name }}</div>
    <div v-show="!isLoggedIn">
      <popover @error="error" @fetch-profile="fetchProfile"></popover>
    </div>
    <v-btn color="error" flat v-show="isLoggedIn" @click.prevent="logout">Logout</v-btn>
  </v-toolbar>
</template>

<script>
import popover from "./popover.vue";
import { mapState } from "vuex";
import swal from 'sweetalert'

export default {
  name: "toolbar",
  data() {
    return {
      name: ""
    };
  },
  components: {
    popover
  },
  computed: {
    ...mapState(["isLoggedIn"])
  },
  methods: {
    error(err) {
      this.$emit("error", err);
    },
    logout() {
      this.name = ''
      swal("Logged Out!", `Goodbye, ${localStorage.name}!`, "success");
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      this.$store.commit("logout");
      this.$router.push("/");
    },
    fetchProfile() {
      this.name = localStorage.name;
    },
    checkLog() {
      if (localStorage.name) {
        this.name = localStorage.name;
      } else {
        this.name = "";
      }
    }
  },
  created() {
    this.checkLog();
    console.log(this.isLoggedIn);
  }
};
</script>

<style>
</style>
