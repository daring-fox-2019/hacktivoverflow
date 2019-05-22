<template>
  <v-app dark id="keep">
    <v-navigation-drawer v-model="drawer" fixed clipped class="grey lighten-4" app>
      <v-container fluid fill-height v-if="!isLogin">
        <v-layout justify-center align-center>
          <v-layout column align-center>
            <div>
              <span class="title accent--text">
                Hacktiv
                <span class="font-weight-light primary--text">Overflow</span>
              </span>
            </div>
            <Login/>
          </v-layout>
        </v-layout>
      </v-container>
      <v-list dense class="grey lighten-4" v-if="isLogin">
        <template v-for="(item, i) in items">
          <v-layout v-if="item.heading" :key="i" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading" class="accent--text">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-right">
              <v-btn small flat class="accent--text">edit</v-btn>
            </v-flex>
          </v-layout>
          <v-divider v-else-if="item.divider" :key="i" class="my-3"></v-divider>
          <v-list-tile v-else :key="i">
            <v-list-tile-action>
              <v-icon class="grey--text">{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                <router-link
                  :to="item.link"
                  class="grey--text"
                  style="text-decoration: none"
                >{{ item.text }}</router-link>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <template>
          <v-layout row align-center class="mt-5">
            <v-list-tile>
              <v-list-tile-action>
                <v-icon light>exit_to_app</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="grey--text">
                  <a @click="signout" style="text-decoration: none">Sign Out</a>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-layout>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="grey darken-3" app fixed clipped-left>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <router-link to="/" style="text-decoration: none">
        <span class="title ml-3 mr-5 white--text">
          Hacktiv
          <span class="font-weight-light accent--text">Overflow</span>
        </span>
      </router-link>
      <v-text-field solo-inverted flat hide-details label="Search" prepend-inner-icon="search"></v-text-field>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content class="grey lighten-4">
      <div fill-height class="grey lighten-4">
        <v-container fluid>
          <router-view/>
        </v-container>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import Login from "@/components/Login.vue";
export default {
  name: "app",
  data: () => ({
    drawer: true,
    items: [
      { divider: true },
      { heading: "Menus" },
      { icon: "add", text: "New question", link: "/questions/new" },
      { icon: "question_answer", text: "Your questions", link: "/" }
    ]
  }),
  props: {
    source: String
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    }
  },
  components: {
    Login
  },
  methods: {
    signout() {
      this.$store.dispatch("signout");
    }
  },
  mounted() {
    this.$store.dispatch("checkSignIn");
  },
  created() {
    this.$store.dispatch("getQuestions");
  }
};
</script>

<style lang="stylus">
#keep {
  .v-navigation-drawer__border {
    display: none;
  }
}
</style>