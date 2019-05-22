<template>
  <div id="app">
      <Navbar />
    <!-- <div id="nav" hidden>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
    <div>
      <div class="fluid-container footer">
        <p class="text-center">Copyright &copy 2018, ABC Marketing. All Rights Reserved.</p>
      </div>
    </div>
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
.fluid-container.footer{
  background: #17a2b8;
}
.fluid-container.footer > *:last-child {
    margin-bottom: 0px;
    color: #fff;
}
</style>
