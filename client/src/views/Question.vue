<template>
  <div class="container" style="background-color: white; min-height: 100vh; padding-top: 40px;">
    <div class="container">
      <h1>{{ currentQuestion.title }}</h1>
      <br>
      <p>{{ currentQuestion.description}}</p>
      <br>
      <h5>Asked by: {{ currentQuestion.user.username}}</h5>
    </div>
    <hr>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['isLogin', 'currentQuestion']),
  },
  created() {
    this.getQuestion();
  },
  methods: {
    getQuestion() {
      this.$store.dispatch('getQuestion', this.$route.params.id);
    },
  },
};
</script>
