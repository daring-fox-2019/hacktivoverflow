<template>
  <div class="container" style="background-color: white; min-height: 100vh; padding-top: 40px;">
    <div class="container">
      <div class="row">
        <div class="col-1" style="text-align:center">
          <br>
          <a href="#" @click="upvoteQuestion">
            <i style="font-size: 30px;" class="fas fa-sort-up"></i>
          </a>
          <h4>{{ currentQuestion.upvotes.length - currentQuestion.downvotes.length }}</h4>
          <a href="#" @click="downvoteQuestion">
            <i style="font-size: 30px;" class="fas fa-sort-down"></i>
          </a>
        </div>
        <div class="col-11">
          <h1>{{ currentQuestion.title }}</h1>
          <br>
          <p v-html="currentQuestion.description"></p>
          <br>
          <h5>Asked by: {{ currentQuestion.user.username }}</h5>
          <p>{{new Date(currentQuestion.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}</p>
          <div
            v-if="currentQuestion.user._id === user._id || currentQuestion.user === user._id"
            class="row"
          >
            <div
              style="background-color: #97DCDF;
                    width: -moz-max-content;
                    border-radius: 100%; padding: 10px;"
            >
              <a @click.prevent="toEditPage" href="#">
                <i
                  style="text-align: center; width: 25px; font-size: 25px; color: #DF9A97"
                  class="fas fa-edit"
                ></i>
              </a>
            </div>&nbsp;&nbsp;&nbsp;&nbsp;
            <div
              style="background-color: #97DCDF;width: -moz-max-content;
              border-radius: 100%; padding: 10px;"
            >
              <a @click.prevent="deleteQuestion" href="#">
                <i
                  style="text-align: center; width: 25px; font-size: 25px; color: #DF9A97"
                  class="far fa-trash-alt"
                ></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br>
    <hr>
    <br>
    <h2>Answer question</h2>
    <form @submit.prevent="createAnswer">
      <wysiwyg v-model="answer"/>
      <br>
      <button type="submit" class="btn btn-warning">Submit answer</button>
    </form>
    <br>
    <hr>
    <br>
    <h1>Answers</h1>
    <div v-for="(answer, index) in answers" :key="index">
      <br>
      <br>
      <p v-html="answer.description"></p>
      <h5>By: {{ answer.user.username}}</h5>

      <a href="#" @click.prevent="upvoteAnswer(answer._id)">
        <i style="font-size: 30px;" class="fas fa-sort-up"></i>
      </a>
      <h4>{{ answer.upvotes.length - answer.downvotes.length }}</h4>
      <a href="#" @click.prevent="downvoteAnswer(answer._id)">
        <i style="font-size: 30px;" class="fas fa-sort-down"></i>
      </a>

      <button
        class="btn btn-warning"
        v-if="answer.user._id === user._id"
        @click.prevent="toEditAnswer(answer._id)"
      >Edit</button>

      <button
        @click.prevent="deleteAnswer(answer._id)"
        class="btn btn-danger"
        v-if="answer.user._id === user._id"
      >Delete</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      answer: '',
      editedAnswer: '',
    };
  },

  computed: {
    ...mapState(['isLogin', 'currentQuestion', 'user', 'answers']),
  },
  created() {
    this.getQuestion();
    this.getAnswers();
  },
  methods: {
    getQuestion() {
      this.$store.dispatch('getQuestion', this.$route.params.id);
    },
    getAnswers() {
      this.$store.dispatch('getAnswers', this.$route.params.id);
    },
    toEditPage() {
      this.$router.push(`/askQuestion/${this.currentQuestion._id}`);
    },
    deleteQuestion() {
      this.$store.dispatch('deleteQuestion', this.$route.params.id);
    },
    createAnswer() {
      this.$store.dispatch('createAnswer', [
        this.currentQuestion._id,
        this.answer,
      ]);
    },
    editAnswer(answerId) {
      this.$store.dispatch('editAnswer', [answerId, this.editedAnswer]);
    },
    deleteAnswer(answerId) {
      this.$store.dispatch('deleteAnswer', answerId);
    },
    getText(text) {
      this.editedAnswer = text;
    },
    toEditAnswer(answerId) {
      this.$router.push(`/editAnswer/${answerId}`);
    },
    upvoteQuestion() {
      if (!localStorage.token) {
        console.log('lala');
      } else {
        this.$store.dispatch('upvoteQuestion');
      }
    },
    downvoteQuestion() {
      this.$store.dispatch('downvoteQuestion');
    },
    upvoteAnswer(id) {
      this.getAnswers();
      this.$store.dispatch('upvoteAnswer', id);
    },
    downvoteAnswer(id) {
      this.getAnswers();
      this.$store.dispatch('downvoteAnswer', id);
    },
  },
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
