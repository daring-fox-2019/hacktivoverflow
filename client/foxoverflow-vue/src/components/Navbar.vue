<template>
  <v-toolbar app color="#BF360C">
    <v-toolbar-title class="headline">
      <router-link to="/" style="display: flex; align-items: center;">
        <img
          src="@/assets/website-logo.jpg"
          alt="Website Logo"
          style="height: 2.5rem; width: 2.5rem; border-radius: 50%;"
          class="mr-2"
        >
        <span class="font-weight-light" style="color: white;">fox</span>
        <span style="color: white;">overflow</span>
      </router-link>
    </v-toolbar-title>
    <div style="width: 50%;">
      <v-text-field solo label="Search..." append-icon="search" v-model="inputSearch"></v-text-field>
    </div>

    <div>
      <router-link to="/login" v-if="!isLoggedIn">
        <v-btn color="warning">
          <span>
            <i class="fas fa-sign-in-alt"></i> Log In
          </span>
        </v-btn>
      </router-link>

      <router-link to="/register" v-if="!isLoggedIn">
        <v-btn style="background-color: white; color: #BF360C;">
          <span>
            <i class="fas fa-user-plus"></i> Register
          </span>
        </v-btn>
      </router-link>

      <v-menu offset-y open-on-hover v-if="isLoggedIn">
        <template v-slot:activator="{ on }">
          <v-btn style="background-color: white; color: #BF360C;" v-on="on">
            <i class="fas fa-user mr-2"></i>
            {{ fullName }}
            <i
              class="material-icons"
              style="margin-right: -0.7rem;"
            >arrow_drop_down</i>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile @click>
            <v-list-tile-title @click.prevent="logout" style="font-size: 85%;">
              <i class="fas fa-sign-out-alt mr-2"></i> Log Out
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </div>
  </v-toolbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      inputSearch: ""
    };
  },
  created() {
    if (localStorage.token) {
      this.$store.commit("login");
      this.$store.commit("setFullName");
    } else {
      this.$store.commit("logout");
    }
  },
  computed: {
    ...mapState(["isLoggedIn", "fullName", "keyword"])
  },
  methods: {
    logout() {
      localStorage.clear();
      sessionStorage.clear();
      this.$store.commit("logout");
      this.$router.push("/");
    }
  },
  watch: {
    inputSearch(value) {
      this.$store.commit("updateKeyword", value);
    },
    keyword(value) {
      this.inputSearch = value;
    }
  }
};
</script>

<style>
* {
  text-transform: none !important;
}

.v-toolbar__content {
  display: flex;
  justify-content: space-between;
}
.v-input__slot {
  margin: 0;
}
.v-text-field.v-text-field--solo .v-input__control {
  min-height: 40px;
}
a,
.router-link-exact-active,
.router-link-active {
  text-decoration: none;
  color: black;
}
</style>
