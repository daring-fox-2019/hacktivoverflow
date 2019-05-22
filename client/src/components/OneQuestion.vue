<template>
  <div>
    <v-layout row wrap align-start justify-start class="mb-4 px-5">
      <!-- LEFT-->
      <v-flex xs2 class="pt-4">
        <div class="body-2" @click="getUpvote('questions', questions._id)">
          <v-btn fab dark small grey darken-1>
            <i class="material-icons">arrow_drop_up</i>
          </v-btn>
        </div>
        {{questionVote}}
        <div class="body-2">
          <v-btn fab dark small grey darken-1 @click="getDownvote('questions', questions._id)">
            <i class="material-icons">arrow_drop_down</i>
          </v-btn>
        </div>
      </v-flex>
      <v-flex xs8 class="title pl-4">
        {{questions.title}}
        <div class="caption mt-4 pl-4 pt-2 text-sm-left" v-html="questions.description"></div>
        <div
          v-if="questions.user"
          class="body-2 pl-4 pt-2 text-xs-right"
        >author : {{questions.user.name}}</div>
      </v-flex>
    </v-layout>

    <!-- Answers -->
    <v-layout row wrap align-start justify-start>
      <div class="display-1 font-weight-light">Answers</div>
      <v-spacer></v-spacer>
      <div>
        <v-btn color="info" @click="Answer">Create Answer</v-btn>
      </div>
    </v-layout>
    <br>
    <hr>
    <br>
    <div v-if="answers.length > 0">
      <v-layout
        row
        wrap
        align-start
        justify-start
        class="mb-4 hoverable px-4 py-4"
        v-for="(answer, index) in answers"
        :key="index"
      >
      <AnswerCard :answer="answer" v-on:get-update-answer="getUpdateAnswer"></AnswerCard>
      </v-layout>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
import AnswerCard from '@/components/AnswerCard.vue'
const baseURL = "http://localhost:3000";

export default {
  components : {
    AnswerCard
  },
  data() {
    return {
      userId: localStorage.getItem("id"),
      totalVoteQuestion: null,
      totalVoteAnswer: null,
      ready: false,
      questions: "",
      answers : "",
      questionVote: [],
      totalAnswerVote : 0,
      answerVote: []
    };
  },
  created() {
    this.$store.state.questions = [];
    this.getQuestionDetails(this.$route.params.questionId);
    this.getAnswer(this.$route.params.questionId);
    this.answerVote = this.countAnswer;
    this.questionVote = this.countQuestion;
  },
  computed: {
    ...mapState(["countQuestion", "countAnswer"])
  },
  watch: {
    countAnswer() {
      this.$store.state.questions = [];
      this.getQuestionDetails(this.$route.params.questionId);
      this.getAnswer(this.$route.params.questionId);
      this.questionVote = this.countQuestion;
      this.answerVote = this.countAnswer;
    }
  },
  methods: {
    ...mapActions([
      "getQuestionDetails",
      "getAnswer",
      "upvote",
      "downvote",
      "updateAnswer"
    ]),
    Answer() {
      if (!localStorage.getItem("token")) {
        this.$swal("Sorry", "please login to continue", "warning");
      } else {
        this.$router.push({
          name: "answers",
          params: { questionId: this.$route.params.questionId }
        });
      }
    },
    getAnswer(option) {
      axios
        .get(`${baseURL}/answers/${option}`)
        .then(({ data }) => {
          this.answers = data
          let temp = []
          data.forEach(el => {
             temp.push((el.upvotes.length - el.downvotes.length))
          });
          this.answerVote = temp
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    getUpvote(value, id) {
      if (value == "questions") {
        this.upvote({ questionId: this.$route.params, value: "questions" });
      } else {
        this.upvote({ answerId: id, value: "answers" });
      }
    },
    getDownvote(value, id) {
      if (value == "questions") {
        this.downvote({ questionId: this.$route.params, value: "questions" });
      } else {
        this.downvote({ answerId: id, value: "answers" });
      }
    },
    getQuestionDetails(option) {
      axios
        .get(`${baseURL}/questions/${option}`, {})
        .then(({ data }) => {
          console.log(data);

          let compute = data.upvotes.length - data.downvotes.length;
          this.questionVote = data.upvotes.length - data.downvotes.length;
          this.answerVote = data.answers;
          this.questions = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getUpdateAnswer(answerId) {
      this.$router.push({
        name: "updateAnswer",
        params: { answerId }
      });
    },
    upvote(option) {
      if (option.answerId) {
        axios
          .put(
            `${baseURL}/${option.value}/${option.answerId}/upvote`,
            {},
            {
              headers: { token: localStorage.getItem("token") }
            }
          )
          .then(({ data }) => {
            console.log(data);
            this.totalAnswerVote = data.countVote;
          })
          .catch(err => {
            console.log(err.message);
            this.$swal("Oops", err.response.data.message, "warning");
          });
      } else {
        axios
          .put(
            `${baseURL}/${option.value}/${option.questionId.questionId}/upvote`,
            {},
            {
              headers: {
                token: localStorage.getItem("token")
              }
            }
          )
          .then(({ data }) => {
            console.log(data, " apa upvote?");
            this.questionVote = data.countVotes;
          })
          .catch(err => {
            console.log(err.response);
            this.$swal("Oops", err.response.data.message, "warning");
          });
      }
    },
    downvote(option) {
      if (option.answerId) {
        axios
          .put(
            `${baseURL}/${option.value}/${option.answerId}/downvote`,
            {},
            {
              headers: {
                token: localStorage.getItem("token")
              }
            }
          )
          .then(({ data }) => {
            this.totalAnswerVote = data.countVote;
          })
          .catch(err => {
            console.log(err.response);
            // swal("Oops", err.response.data.message, "warning");
          });
      } else {
        axios
          .put(
            `${baseURL}/${option.value}/${
              option.questionId.questionId
            }/downvote`,
            {},
            {
              headers: {
                token: localStorage.getItem("token")
              }
            }
          )
          .then(({ data }) => {
            console.log(data, " apa downvote?");
            this.questionVote = data.countVotes;
            // commit("setCountQuestion", data);
          })
          .catch(err => {
            console.log(err.message);
            // swal("Oops", err.response.data.message, "warning");
          });
      }
    }
  }
};
</script>

<style scoped>
.hoverable {
  transition: 0.5s;
}

.hoverable:hover {
  background-color: #eeeeee;
  transition: 0.5s;
}
</style>
