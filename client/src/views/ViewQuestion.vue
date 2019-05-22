<template>
  <div>
    <div class="card w-75" style="margin-left:12%;">
        <div class="card-body">
        <h5 class="card-title">{{new Date(question.createdAt).toDateString()}} | <em>{{question.UserId.first_name + ' ' + question.UserId.last_name}}</em></h5>
        <p class="card-text">Topic : {{question.title}}</p>
        <p class="card-text" v-html="question.description"></p>
        <h5>Total Vote : {{question.upvotes.length - question.downvotes.length}} </h5>
        <AnswerDialog
                v-bind:QuestionId="this.$route.params.QuestionId"
                v-on:createAnswer="createAnswer"
        ></AnswerDialog>
        <a href="#" class="btn btn-primary ml-3" v-on:click="upvote">upvote</a>
        <a href="#" class="btn btn-danger ml-3" v-on:click="downvote">downvote</a>
        </div>
      </div>
      <div class="container">
        <AnswersCard
                  v-bind:answers="answers"
                  v-if="answers.length"
                  v-on:getUpdatedAnswers="getAnswers(question._id)"
        ></AnswersCard>
      </div>             
  </div>
</template>

<script>
import AnswersCard from "../components/AnswersCard";
import AnswerDialog from "../components/AnswerDialog";
export default {
  data() {
    return {
      question: "",
      answers: []
    };
  },
  created() {
    const { QuestionId } = this.$route.params;
    this.getQuestionDetails(QuestionId);
    this.getAnswers(QuestionId);
  },
  components: {
    AnswersCard,
    AnswerDialog
  },
  methods: {
    getQuestionDetails(QuestionId) {
      let token = localStorage.getItem("token");
      this.$axios
        .get(`/questions/${QuestionId}`, { headers: { token } })
        .then(({ data }) => {
          this.question = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAnswers(QuestionId) {
      let token = localStorage.getItem("token");
      this.$axios
        .get(`/answers/${QuestionId}`, { headers: { token } })
        .then(({ data }) => {
          this.answers = data;
          this.$store.dispatch("getUserAnswers");
        })
        .catch(err => {
          console.log(err);
        });
    },
    createAnswer() {
      this.getAnswers(this.$route.params.QuestionId);
    },
    upvote() {
      let { QuestionId } = this.$route.params;
      let token = localStorage.getItem("token");
      this.$axios
        .patch(`/questions/upvote/${QuestionId}`, {}, { headers: { token } })
        .then(({ data }) => {
          const { message } = data;
          this.getQuestionDetails(QuestionId);
          this.$store.dispatch("getQuestions");
          this.$store.dispatch("getUserQuestions");
        })
        .catch(err => {
          const { message } = err.response.data;
          this.$swal("Error!", message, "error");
        });
    },
    downvote() {
      let { QuestionId } = this.$route.params;
      let token = localStorage.getItem("token");
      this.$axios
        .patch(`/questions/downvote/${QuestionId}`, {}, { headers: { token } })
        .then(({ data }) => {
          const { message } = data;
          this.getQuestionDetails(QuestionId);
          this.$store.dispatch("getQuestions");
          this.$store.dispatch("getUserQuestions");
        })
        .catch(err => {
          const { message } = err.response.data;
          this.$swal("Error!", message, "error");
        });
    }
  }
};
</script>

<style scoped>
#answerContainer {
  width: 90% !important;
}

#questionContainer {
  width: 90% !important;
}
</style>
