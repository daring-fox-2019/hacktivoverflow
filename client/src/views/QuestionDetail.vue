<template>
  <div>
    <h1>{{ currentQuestion.title }}</h1>
    <v-divider class="mb-2"></v-divider>
    <question
      :currentQuestion="currentQuestion"
      @error="error"
      @upvote-parent="upvoteQuestion"
      @downvote-parent="downvoteQuestion"
      :upvote="upvote" :downvote="downvote"
    ></question>
    <h2>Answers</h2>
    <v-divider class="mb-2"></v-divider>
    <answer-card class="mx-4 my-2" v-for="(item, index) in answers" :key="index" :item="item" @update-answer="updateAnswer" @update-answer-hard="updateHard"></answer-card>
    <v-card>
      <v-card-text>
          <h2>Answer this question</h2>
        <v-form>
          <v-flex xs12>
            <v-text-field autofocus label="Title" v-model="reply.title" required></v-text-field>
          </v-flex>
          <v-card light>
            <wysiwyg v-model="reply.description"></wysiwyg>
          </v-card>
          <v-btn @click.prevent="createReply" class="mt-3" :loading="isLoading">Submit</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import question from "../components/question.vue";
import cards from "../components/cards.vue";
import answerCard from "../components/answerCard.vue";
import swal from 'sweetalert'

export default {
  name: "detail",
  components: {
    question,
    cards,
    answerCard
  },
  data() {
    return {
      isLoading: false,
      currentQuestion: {},
      upvote: false,
      downvote: false,
      answers: [],
      reply: {
        title: "",
        description: ""
      }
    };
  },
  methods: {
    voteCheck(data) {
      data.createdAt = new Date(data.createdAt).toDateString();
      this.upvote = false
      this.downvote = false
      data.upvotes.forEach(item => {
        if (item._id === localStorage.id) {
          this.upvote = true;
        }
      });
      data.downvotes.forEach(item => {
        if (item._id === localStorage.id) {
          this.downvote = true;
        }
      });
      this.currentQuestion = data;
    },
    upvoteQuestion(id) {
      axios({
        method: "put",
        url: `http://34.87.71.136/questions/${id}/upvote`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.fetchQuestion();
          this.voteCheck(data)
        })
        .catch(err => {
          console.log({ err });
          err.origin = "question.vue - upvote";
          this.$emit("error", err);
        });
    },
    downvoteQuestion(id) {
      axios({
        method: "put",
        url: `http://34.87.71.136/questions/${id}/downvote`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.fetchQuestion();
          this.voteCheck(data)
        })
        .catch(err => {
          console.log({ err });
          err.origin = "question.vue - downvote";
          this.$emit("error", err);
        });
    },
    fetchQuestion() {
      axios({
        method: "get",
        url: `http://34.87.71.136/questions/${this.$route.params.id}`
      })
        .then(({ data }) => {
          this.currentQuestion = {};
          this.voteCheck(data);
          this.currentQuestion = data;
          // console.log({ data });
        })
        .catch(err => {
          console.log({ err });
          err.origin = "questiondetail.vue - fetchquestion";
          this.$emit("error", err);
        });
    },
    fetchAnswers() {
      axios({
        method: "get",
        url: `http://34.87.71.136/answers/question?questionId=${
          this.$route.params.id
        }`
      })
        .then(({ data }) => {
          // console.log({ data })
          this.answers = [];
          this.answers = data;
        })
        .catch(err => {
          err.origin = "questiondetail.vue - fetchanswers";
          this.$emit("error", err);
        });
    },
    createReply() {
      swal(this.currentQuestion._id);
      this.isLoading = true;
      let { title, description } = this.reply;
      axios({
        method: "post",
        url: "http://34.87.71.136/answers",
        headers: {
          token: localStorage.token
        },
        data: {
          title,
          description,
          question: this.currentQuestion._id
        }
      })
        .then(({ data }) => {
          this.isLoading = false;
          swal("Success!", "Reply posted", "success");
          this.fetchQuestion();
          this.fetchAnswers();
          this.reply = {
            title: "",
            description: ""
          };
        })
        .catch(err => {
          console.log({ err });
          err.origin = "questiondetail.vue - createreply";
          this.$emit("error", err);
        });
    },
    updateAnswer(answer) {
      for(let i = 0; i < this.answers.length; i++) {
        if(this.answers[i]._id == answer._id) {
          this.answers[i] = answer
        }
      }
      // this.answers.push(answer)
      // this.answers.pop()
      this.fetchAnswers()
    },
    updateHard() {
      this.fetchQuestion();
      this.fetchAnswers();
    },
    error(err) {
      this.$emit("error", error);
    }
  },
  created() {
    this.fetchQuestion();
    this.fetchAnswers();
  }
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.linker {
  cursor: pointer;
}
</style>
