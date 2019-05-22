<template>
  <div>
    <Navbar/>
    <div class="d-flex">
      <router-view/>
      <Quote/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Quote from '@/components/Quote.vue';

export default {
  created() {
    if (localStorage.token) {
      this.$store.dispatch('stayLogin');
    }
  },
  components: {
    Navbar,
    Quote,
  },
};
</script>
