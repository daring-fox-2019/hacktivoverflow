<template>
  <v-flex>
    <div class="m-0" style="border:1px dashed black; padding-top:-100px; padding-bottom:-10px">
      <v-card
        color="transparent"
        style=" outline:dashed 0.2px grey; outline-offset:-6px;"
        class="my-0 py-4 px-3"
        flat
      >
        <v-layout row>
          <v-flex xs1>
            <v-btn @click.prevent="upVote(ans.userId._id)" flat icon color="grey">
              <v-icon>expand_less</v-icon>
            </v-btn>
            <span>{{calculate()}}</span>
            <v-btn @click.prevent="downVote(ans.userId._id)" flat icon color="grey">
              <v-icon>expand_more</v-icon>
            </v-btn>
          </v-flex>

          <v-flex xs12>
            <!-- <v-layout row> -->
            <!-- <h3 class="mt-4 text-align-left">hehehe</h3> -->
            <!-- </v-layout> -->
            <v-layout row>
              <span class="mt-2 text-align-left" v-html="ans.description"></span>
            </v-layout>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>
          <v-layout row >
        <v-card-actions>
            <h4
              class="mx-2 caption font-italic"
            >Answered by : {{ans.userId.email.split('@')[0]}} on {{new Date(ans.createdAt).toUTCString()}}</h4>
            <v-spacer></v-spacer>
            <v-btn
              @click.prevent="editAnswer(ans._id)"
              v-if="this.$store.state.userId ==  ans.userId._id"
              flat
              class="mx-3"
              style="height:23px"
              color="orange"
            >Edit</v-btn>
        </v-card-actions>
          </v-layout>
      </v-card>
    </div>
  </v-flex>
</template>

<script>
import Swal from "sweetalert2";

export default {
  props: ["ans"],
  data() {
    return {
      vote: 0
    };
  },
  created() {
    this.calculate()
    console.log(this.calculate, "bingung yg mana dah");
  },
  methods: {
    editAnswer() {
      this.$router.push({ name: "edit-answer", params: { id: this.ans._id } });
    },
    upVote(userId) {
      // console.log(this.ans._id, '/xxxxxx');
      // console.log('apakah ke klik?');
      this.axios
        .patch(
          `answers/upvote/${this.ans._id}/`,
          { userId },
          { headers: { token: localStorage.getItem("token") } }
        )
        .then(({ data }) => {
          this.$store.dispatch(
            "getListAnswersOnThisQuestion",
            this.$route.params.id
          );
          console.log("berhasil upvote");
        })
        .catch(err => {
          console.log(err.response);
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: err.response.data.message
          });
        });
      // router.post('/upvote/:questionId', authentication, QuestionController.upVote)
    },
    downVote(userId) {
      this.axios
        .patch(
          `answers/downvote/${this.ans._id}/`,
          { userId },
          { headers: { token: localStorage.getItem("token") } }
        )
        .then(({ data }) => {
          this.$store.dispatch(
            "getListAnswersOnThisQuestion",
            this.$route.params.id
          );

          console.log("berhasil downpove");
        })
        .catch(err => {
          console.log(err.response);

          Swal.fire({
            type: "error",
            title: "Oops...",
            text: err.response.data.message
          });
          console.log(err.response, "error");
        });
    },
    calculate() {
      return +this.ans.upVotes.length - +this.ans.downVotes.length;
    }
  },
  computed: {
    
  },
  watch: {}
};
</script>

<style>
</style>
