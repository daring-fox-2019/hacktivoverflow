<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">Hacktiv-Overflow</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/login">
       <v-btn
      color="success">
      Login
    </v-btn>
      </router-link>
    </v-toolbar>
    <v-content>
     <router-view />
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: "App",
  components: {
    
  },
  data() {
    return {
      //
    };
  }
};
</script>
