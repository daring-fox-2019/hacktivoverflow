<template>
  <div id="app">
    <v-app>
      <Header/>
      <Navbar/>
      <v-content id="main-contain">
        <v-container fluid fill-height id="container">
          <v-layout justify-center fluid>
            <v-flex>
              <router-view/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <Footer/>
    </v-app>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Navbar from '@/components/Navbar.vue';

export default {
  data() {
    return {};
  },
  components: {
    Header,
    Navbar,
  },
  created() {
    // if (localStorage.token) {
    //   this.$store.commit("setLogin", true);
    // }
    this.$store.dispatch('loadQuestion');
  },
};
</script>

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

#main-contain{
  padding-left: 200px !important;
  margin: 0 !important;
}
</style>
