<template>
  <div>
    <Navbar/>
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Home from '@/views/Home.vue';
import Question from '@/views/Question.vue';

export default {
  components: {
    Navbar,
    Home,
    Question,
  },
};
</script>
