<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">Hacktiv-Overflow</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/">
       <v-btn
      color="success">
      Home
    </v-btn>
      </router-link>
      <router-link to="/login">
       <v-btn
        v-if="!this.$store.state.isLogin"
      color="success">
      Login
    </v-btn>
      </router-link>
      <router-link to="/">
       <v-btn
       @click.prevent="logout"
       v-if="this.$store.state.isLogin"
      color="success">
      Logout
    </v-btn>
      </router-link>
    </v-toolbar>
    <v-content>
     <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  components: {

  },
  data () {
    return {
      //
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('isLogout')
    },
    ...mapActions(['isLogout'])

  }

}
</script>
