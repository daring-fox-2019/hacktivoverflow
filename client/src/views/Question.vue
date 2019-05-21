<template>
  <div class="container" style="background-color: white; min-height: 100vh; padding-top: 40px;">
    <div class="container">
      <div class="row">
        <div class="col-1" style="text-align:center">
          <br>
          <i style="font-size: 30px;" class="fas fa-sort-up"></i>
          <h4>{{ currentQuestion.upvotes.length - currentQuestion.downvotes.length }}</h4>
          <i style="font-size: 30px;" class="fas fa-sort-down"></i>
        </div>
        <div class="col-11">
          <h1>{{ currentQuestion.title }}</h1>
          <br>
          <p v-html="currentQuestion.description"></p>
          <br>
          <h5>Asked by: {{ currentQuestion.user.username}}</h5>
          <br>
          <div v-if="currentQuestion.user._id === user._id" class="row">
            <div
              style="background-color: #97DCDF;
                    width: -moz-max-content;
                    border-radius: 100%; padding: 10px;"
            >
              <a @click="toEditPage" href="#">
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
              <a @click="deleteQuestion" href="#">
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
    <hr>
    <h2>Answer question</h2>
    <form @submit.prevent="createAnswer">
      <wysiwyg v-model="answer"/>
      <br>
      <button type="submit" class="btn btn-warning">Submit answer</button>
    </form>
    <br>
    <br>
    <h1>Answers</h1>
    <div v-for="(answer, index) in answers" :key="index">
      <br>
      <br>
      <p v-html="answer.description"></p>
      <h5>By: {{ answer.user.username}}</h5>
      <button
        class="btn btn-warning"
        type="button"
        data-toggle="modal"
        data-target="#exampleModal"
        v-if="answer.user._id === user._id"
        @click="getText(answer.description)"
      >Edit</button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Answer</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <wysiwyg v-model="editedAnswer"/>
              </form>
            </div>
            <div class="modal-footer">
              <button
                @click="editAnswer(answer._id)"
                type="button"
                class="btn btn-primary"
              >Confirm Edit</button>
            </div>
          </div>
        </div>
      </div>
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
    // this.getAnswers();
  },
  methods: {
    getQuestion() {
      this.$store.dispatch('getQuestion', this.$route.params.id);
    },
    getAnswers() {
      // this.$store.dispatch('getAnswers', this.$route.params.id);
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
    getText(text) {
      this.editedAnswer = text;
    },
  },
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
