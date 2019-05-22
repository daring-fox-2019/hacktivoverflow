<template>
<div>
  <Navbar />
  <router-view />

</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  components : {
    Navbar
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('login')
    }
  }
}
</script>

<style>
body {
		font-family: "helvetica neue", helvetica, arial, sans-serif;
		background: #333 url('http://subtlepatterns.subtlepatterns.netdna-cdn.com/patterns/low_contrast_linen.png');
}
</style>
