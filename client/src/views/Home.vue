<template>
  <div class="container">
    <div
      v-for="(question, index) in allQuestions"
      :key="index"
      style="background-color: #F8F2CB;
      margin-top: 20px;
      margin-bottom:20px;
      border: solid 0.1px;
      border-color: #97DCDF;
      border-radius: 10px;"
    >
      <a href="#" @click="toQuestion(question._id)" style="text-decoration: none;">
        <div class="row" style="padding: 20px; color: black;">
          <div class="col-2" style="text-align: center;">
            <h4>Votes</h4>
            <h3>{{ question.upvotes.length - question.downvotes.length }}</h3>
          </div>
          <div class="col-10">
            <h3>{{ question.title}}</h3>
          </div>
          <h4>Asked by: {{ question.user.username}}</h4>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['allQuestions']),
  },
  created() {
    this.$store.dispatch('getAllQuestions');
  },
  methods: {
    toQuestion(id) {
      console.log('masuk question');
      this.$router.push(`/question/${id}`);
    },
  },
};
</script>

<style>
</style>
