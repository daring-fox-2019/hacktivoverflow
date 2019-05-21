<template>
  <div>
    <Navbar/>
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  created() {
    if (localStorage.token) {
      this.$store.dispatch('stayLogin');
    }
  },
  components: {
    Navbar,
  },
};
</script>
