<template>
  <div>
    <div v-for="(question, index) in filterQuestions" :key="index" style="padding: 15px">
      <div class="card w-75" style="margin-left:12%;">
        <div class="card-body">
        <h5 class="card-title">{{new Date(question.createdAt).toDateString()}} | <em>{{question.UserId.first_name + ' ' + question.UserId.last_name}}</em></h5>
        <p class="card-text">Topic : {{question.title}}</p>
        <p class="card-text" v-html="question.description"></p>
        <h5>Total Vote : {{question.upvotes.length - question.downvotes.length}} </h5>
        <router-link :to="`/dashboard/view/${question._id}`" style="textDecoration: none;">
        <a href="#" class="btn btn-primary">View</a>
        </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ['search'],
  created() {
    this.questions = this.allQuestions
  },
  data() {
    return {
      questions: []
    };
  },
  computed: {
    filterQuestions() {
      return this.questions.filter(question => {
        return question.title.toLowerCase().match(this.search);
      });
    },
    ...mapState(["allQuestions"])
  }
};
</script>

<style>
</style>
