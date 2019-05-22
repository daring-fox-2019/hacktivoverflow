<template>
  <v-layout row wrap>
    <v-flex xs2 class="pt-4">
      <div class="body-2">
        <v-btn fab dark small grey darken-1 @click.prevent="upvote(answer._id)">
          <i class="material-icons">arrow_drop_up</i>
        </v-btn>
      </div>
      {{answerVote}}
      <div class="body-2">
        <v-btn fab dark small grey darken-1 @click.prevent="downvote(answer._id)">
          <i class="material-icons">arrow_drop_down</i>
        </v-btn>
      </div>
    </v-flex>
    <v-flex xs8 class="title pl-4" v-if="answer.user">
      {{answer.title}}
      <div class="caption pl-4 pt-2 text-sm-left" v-html="answer.description"></div>
      <div class="body-2 pl-4 pt-2 text-sm-left">answer by : {{answer.user.name}}</div>
      <v-btn
        color="warning"
        v-if="answer.user._id == userId"
        @click.prevent="getUpdateAnswer(answer._id)"
      >Update</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
const baseURL = "http://localhost:3000";
export default {
  props: ["answer"],
  data() {
    return {
      userId: "",
      answerVote: 0
    };
  },
  methods: {
    getUpdateAnswer(id) {
      this.$emit("get-update-answer", id);
    },
    upvote(id) { 
      axios
        .put(
          `${baseURL}/answers/${id}/upvote`,
          {},
          {
            headers: { token: localStorage.getItem("token") }
          }
        )
        .then(({ data }) => {
         
          this.answerVote = data.countVote;
        })
        .catch(err => {
          console.log(err.message);
          this.$swal("Oops", err.response.data.message, "warning");
        });
    },
    downvote(id) {
    
      axios
        .put(
          `${baseURL}/answers/${id}/downvote`,
          {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
    
          this.answerVote = data.countVote;
        })
        .catch(err => {
          console.log(err.response);
          this.$swal("Oops", err.response.data.message, "warning");
        });
    }
  },
  created() {
    this.userId = localStorage.getItem("id");
    this.answerVote = this.answer.upvotes.length - this.answer.downvotes.length;
  }
};
</script>

<style>
</style>
