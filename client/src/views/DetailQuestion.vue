<template>
  <div>
    <v-container>
      <v-layout align-center justify-space-between fluid mb-2>
        <h1>{{this.question.title}}</h1>
        <v-btn color="blue" to="/addQuestion">Ask Question</v-btn>
      </v-layout>
      <v-divider/>

      <v-layout fluid>
        <v-flex>
          <v-layout align-center justify-space-between fluid py-3>
            <v-flex md1>
              <img
                src="../assets/up-orange.png"
                alt="upvote"
                style="height: 20px;"
                @click="upvote"
                v-if="statusUp"
              >
              <img
                src="../assets/up-grey.png"
                alt="upvote"
                style="height: 20px;"
                @click="upvote"
                v-else
              >
              <v-flex mb-2>
                <h2>{{totalVote}}</h2>
              </v-flex>
              <img
                src="../assets/down-orange.png"
                alt="upvote"
                style="height: 20px;"
                @click="downvote"
                v-if="statusDown"
              >
              <img
                src="../assets/down-grey.png"
                alt="upvote"
                style="height: 20px;"
                @click="downvote"
                v-else
              >
            </v-flex>
            <v-flex>
              <v-layout column pl-4>
                <v-flex align-self-start>{{question.description}}</v-flex>
                <v-flex align-self-start>
                  <Tags :tags="question.tags"/>
                </v-flex>
                <v-flex align-self-end>
                  <span>Asked by : {{user}}</span>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

          <!-- LIST ANSWER -->
          <v-flex align-self-start xs2>
            <h3>{{answerLength}} Answers</h3>
          </v-flex>
          <v-divider/>
          <div v-for="answer in question.answers" :key="answer._id">
            <Answer
              :answer="answer"
              @upvote-answer="upvoteAnswer"
              @downvote-answer="downvoteAnswer"
            />
          </div>

          <!-- ADD ANSWER -->
          <v-layout justify-center mt-5 pt-3>
            <v-flex>
              <v-flex align-self-start xs2>
                <h3>Your Answers</h3>
              </v-flex>
              <v-form>
                <v-text-field name="title" v-model="answer.title" label="Title" type="text"></v-text-field>
                <v-textarea
                  name="description"
                  label="Description"
                  hint="Description answer"
                  v-model="answer.description"
                ></v-textarea>
                <v-btn
                  align-self-start
                  color="blue"
                  @click="addAnswer"
                  style="color: white"
                >Post Your Answer</v-btn>
              </v-form>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs3>
          <v-layout fluid justify-center mt-3>
            <v-card id="watch-tag">
              <v-toolbar color="dark" style="justify-content:center;">
                <v-toolbar-title>Watch tag</v-toolbar-title>
              </v-toolbar>
              <v-card-text>tes</v-card-text>
            </v-card>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import Tags from "@/components/Tags.vue";
import Answer from "@/components/Answer.vue";

export default {
  name: "home",
  components: {
    Tags,
    Answer
  },
  data() {
    return {
      question: {},
      answer: {
        title: "",
        description: "",
        questionId: this.$route.params.id
      },
      statusUp: false,
      statusDown: false,
      totalVote: 0,
      user: "",
      answerLength: ""
    };
  },
  created() {
    this.loadQuestion();
  },
  methods: {
    loadQuestion() {
      axios
        .get(`http://localhost:3000/questions/${this.$route.params.id}`)
        .then(({ data }) => {
          this.question = data;
          this.setVote();
          this.totalVote = data.upvotes.length - data.downvotes.length;
          this.user = data.userId.name;
          this.answerLength = data.answers.length;
        })
        .catch(({ err }) => {
          console.log(err);
        });
    },
    addAnswer() {
      axios
        .post(`http://localhost:3000/answers`, this.answer, {
          headers: { token: localStorage.token }
        })
        .then(({ data }) => {
          this.question.answers.push(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    upvote() {
      axios
        .patch(
          `http://localhost:3000/questions/${this.question._id}/upvote`,
          {},
          {
            headers: { token: localStorage.token }
          }
        )
        .then(({ data }) => {
          this.question.upvotes = data.upvotes;
          this.question.downvotes = data.downvotes;
          this.totalVote = data.upvotes.length - data.downvotes.length;
          this.setVote(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    downvote() {
      axios
        .patch(
          `http://localhost:3000/questions/${this.question._id}/downvote`,
          {},
          {
            headers: { token: localStorage.token }
          }
        )
        .then(({ data }) => {
          this.question.upvotes = data.upvotes;
          this.question.downvotes = data.downvotes;
          this.totalVote = data.upvotes.length - data.downvotes.length;
          this.setVote(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    setVote() {
      let upvote = this.question.upvotes.find(element => {
        return element === localStorage.userId;
      });
      let downvote = this.question.downvotes.find(element => {
        return element === localStorage.userId;
      });
      this.statusDown = downvote ? true : false;
      this.statusUp = upvote ? true : false;
    },
    upvoteAnswer(id) {
      axios
        .patch(
          `http://localhost:3000/answers/${id}/upvote`,
          {},
          {
            headers: { token: localStorage.token }
          }
        )
        .then(() => {
          this.loadQuestion();
        })
        .catch(err => {
          console.log(err);
        });
    },
    downvoteAnswer(id) {
      axios
        .patch(
          `http://localhost:3000/answers/${id}/downvote`,
          {},
          {
            headers: { token: localStorage.token }
          }
        )
        .then(() => {
          this.loadQuestion();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
#watch-tag {
  width: 90%;
  border-radius: 5px;
}

.container {
  margin: 0;
}

.fas {
  width: 30px;
}
img {
  cursor: pointer;
}
</style>
