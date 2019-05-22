<template>
  <div>
    <v-container>
      <v-layout align-center justify-space-between fluid mb-2>
        <h1>{{this.question.title}}</h1>
        <v-spacer/>
        <div v-if="isOwner">
          <v-btn color="red" style="color:white;" @click="remove">Delete Question</v-btn>
          <v-btn
            color="green"
            :to="'/editQuestion/'+question._id"
            style="color:white;"
          >Edit Question</v-btn>
        </div>
        <v-btn color="blue" to="/addQuestion" style="color:white;">Ask New Question</v-btn>
      </v-layout>
      <v-divider class="mb-3"/>

      <v-layout fluid >
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
          <v-flex align-self-start xs2 mt-5>
            <h2>{{answerLength}} {{info}}</h2>
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
                <v-textarea
                  name="description"
                  label="Description"
                  hint="Description answer"
                  v-model="answer.description"
                ></v-textarea>
              </v-form>
              <v-flex align-self-end xs3>
                <v-btn color="blue" @click="addAnswer" style="color: white">Post Your Answer</v-btn>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs3>
           <WatchTag />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import Tags from "@/components/Tags.vue";
import Answer from "@/components/Answer.vue";
import WatchTag from '@/components/WatchTag.vue';

export default {
  name: "home",
  components: {
    Tags,
    Answer,
    WatchTag,
  },
  data() {
    return {
      question: {},
      answer: {
        description: "",
        questionId: this.$route.params.id
      },
      statusUp: false,
      statusDown: false,
      totalVote: 0,
      user: "",
      answerLength: "",
      info: "",
      isOwner: false,
    };
  },
  created() {
    this.loadQuestion();
  },
  watch: {
    answerLength(val) {
      if (val) {
        if (val === 1) this.info = "Answer";
        else this.info = "Answers";
      }
    }
  },
  methods: {
    loadQuestion() {
      axios
        .get(`http://localhost:3000/questions/${this.$route.params.id}`)
        .then(({ data }) => {
          this.question = data;
          this.totalVote = data.upvotes.length - data.downvotes.length;
          this.user = data.userId.name;
          this.answerLength = data.answers.length;
          this.setVote(data);
  
          if (localStorage.userId === data.userId._id) this.isOwner = true

          if (this.answerLength === 1) this.info = "Answer";
          else this.info = "Answers";
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
        .then(() => {
          this.answer.description = ''
          this.loadQuestion()
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
          console.log(data);

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
    setVote(data) {
      let upvote = data.upvotes.find(element => {
        return element === localStorage.userId;
      });
      let downvote = data.downvotes.find(element => {
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
    },
    remove() {
      axios
        .delete(`http://localhost:3000/questions/${this.$route.params.id}`, {
          headers: { token: localStorage.token }
        })
        .then(() => {
          this.$router.push(`/myQuestion`);
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

.vue-tags-input {
  max-width: none;
  width: 100%;
}
</style>
