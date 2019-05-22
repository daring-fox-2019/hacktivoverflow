<template>
  <div id="app">
      <Navbar />
    <!-- <div id="nav" hidden>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar,
  },

};
</script>

<style>
  @import "~vue-wysiwyg/dist/vueWysiwyg.css";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 15px;
}

</style>
