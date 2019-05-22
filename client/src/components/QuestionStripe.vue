<template>
  <v-list-tile avatar ripple>
    <v-list class="ml-2 mr-5">
      <v-layout row wrap>
        <section xs4>
          <v-layout row wrap justify-center>
            <span class="ml-2 p-2 caption">{{countvote}}</span>
          </v-layout>
          <v-layout row wrap justify-center>
            <span class="ml-2 p-2 caption">Votes</span>
          </v-layout>
        </section>
        <section xs4>
          <v-layout row wrap justify-center>
            <span class="ml-2 p-2 caption">{{q.answers.length}}</span>
          </v-layout>
          <v-layout row wrap justify-center>
            <span class="ml-2 p-2 caption">Ans</span>
          </v-layout>
        </section>
        <section xs4>
          <v-layout row wrap justify-center>
            <span class="ml-2 p-2 caption">{{rand}}</span>
          </v-layout>
          <v-layout row wrap justify-center>
            <span class="ml-2 p-2 caption">Views</span>
          </v-layout>
        </section>
      </v-layout>
      <!-- {{answersOnThisQuestion}} -->
      <!-- <span>heheh</span> -->
    </v-list>
    <v-list-tile-content>
      <v-list-tile-title @click="seePageDetail(q._id)" >{{q.title}}</v-list-tile-title>
      <v-layout row wrap>
        <div v-if="q.tags.length == 0">
         <v-chip small label color="orange" text-color="white">
            <v-icon left>label</v-icon>Tags
          </v-chip>
          <v-chip
            small
            class="caption font-italic"
          >None</v-chip>
        </div>
        <div v-else>
          <v-chip small label color="orange" text-color="white">
            <v-icon left>label</v-icon>Tags
          </v-chip>
          <v-chip
            small
            class="caption font-italic"
            v-for="(tag, index) in q.tags.slice(0,2)"
            :key="index"
          >{{tag.name}}</v-chip>
        </div>
      </v-layout>
      <v-layout row wrap>
        <h4
            class="caption font-italic"
          >Asked by : {{q.userId.email.split('@')[0]}} on {{new Date(q.createdAt).toUTCString()}}</h4>
      </v-layout>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";
export default {
  name: "QuestionStripe",
  props: ["q"],
  data() {
    return {
      totalvote: null,
      rand : 1,
      countvote : 0,
    };
  },
  created() {
    this.calculate();
    this.getRandomInteger()
  },
  methods: {
    calculate() {
      this.totalvote = +this.q.upVotes.length - +this.q.downVotes.length;
    },
    totalVotes() {
      this.countvote = q.upVotes.length + q.downVotes.length
    },
    deleteTag(id) {
      console.log(id, "hello?");
    },
    seePageDetail(id) {
      this.$router.push( {name: 'question-detail', params: { id}})
    },
    getRandomInteger() {
      this.rand = Math.floor(Math.random() * (625 - 1) + 1);
    },
    deleteQuestion(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })
        .then(result => {
          if (result.value) {
            this.axios
              .delete(`/questions/delete/${id}`, {
                headers: {
                  token: localStorage.getItem("token")
                }
              })
              .then(deleted => {
                Swal.fire(
                  "Deleted!",
                  "Your question has been deleted.",
                  "success"
                );

                this.$store.dispatch("getMyQuestions");
              });
          }
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Something went wrong!"
          });
        });
      this.$store.dispatch("getQuestions");
    },
    upVote(userId) {
      this.axios
        .patch(
          `questions/upvote/${this.q._id}/`,
          { userId },
          { headers: { token: localStorage.getItem("token") } }
        )
        .then(({ data }) => {
          this.totalvote = data.upVotes.length - data.downVotes.length;
        })
        .catch(err => {
          // console.log(err.response);

          Swal.fire({
            type: "error",
            title: "Oops...",
            text: err.response.data.message
          });
        });
    },
    downVote(userId) {
      this.axios
        .patch(
          `questions/downvote/${this.q._id}/`,
          { userId },
          { headers: { token: localStorage.getItem("token") } }
        )
        .then(({ data }) => {
          this.totalvote = data.upVotes.length - data.downVotes.length;
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: err.response.data.message
          });
        });
    },
  },
  computed: {
    ...mapState(["oneQuestionDetails", "answersOnThisQuestion"]),
      calcAnsLength() {
      return this.answersOnThisQuestion.length
    }
  }
};
</script>

<style scoped>
</style>
