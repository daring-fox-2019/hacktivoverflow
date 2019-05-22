<template>
  <div class="container">
    <div
      v-for="(question, index) in allQuestions"
      :key="index"
      style="background-color: white;
      margin-top: 20px;
      margin-bottom:20px;
      border: solid 0.1px;
      border-color: #97DCDF;
      border-radius: 10px;"
    >
      <!-- #F8F2CB -->
      <a href="#" @click="toQuestion(question._id)" style="text-decoration: none;">
        <div class="row" style="padding: 20px; color: black;">
          <div class="col-2" style="text-align: center;">
            <h4>Votes</h4>
            <h3>{{ question.upvotes.length - question.downvotes.length }}</h3>
          </div>
          <div class="col-10">
            <h3>{{ question.title}}</h3>
          </div>
          <div class="">
            <p>By: {{ question.user.username }}</p>
            <p>{{new Date(question.createdAt).toLocaleDateString('en-US',
              { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}</p>
          </div>
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
      this.$router.push(`/question/${id}`);
    },
  },
};
</script>

<style>
</style>
