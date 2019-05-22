<template>
  <v-flex>
    {{q}}
    <v-card
      color="transparent"
      style=" outline:dashed 0.2px grey; outline-offset:-6px;"
      class="my-0 py-4 px-3"
    >
      <v-layout v-if="q" row>
        <v-flex xs1>
          <v-btn @click.prevent="upVote(q.userId)" flat icon color="grey">
            <v-icon>expand_less</v-icon>
          </v-btn>
          <h4 class="margin-left:10vh; !important" v-if="q">{{calculate()}}</h4>
          <v-btn @click.prevent="downVote(q.userId)" flat icon color="grey">
            <v-icon>expand_more</v-icon>
          </v-btn>
        </v-flex>

        <v-flex xs12>
          <v-layout row>
            <h3 class="mt-4 body-2 text-align-left">{{q.title}}</h3>
          </v-layout>
          <v-layout row>
            <span class="mt-2 body-1 text-align-left" v-html="q.description"></span>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>

      <v-container v-if="q.userId">
        <v-layout row wrap  align-end justify-space-around>
          <v-flex xs6 >
            <h4
              class="text-xs-left caption font-italic"
            >Asked by : {{q.userId.email.split('@')[0]}} on {{new Date(q.createdAt).toUTCString()}}</h4>
          </v-flex>
          <v-flex xs6 style="padding-bottom:0.2rem;">
            <v-btn
            v-if="!$route.params.id"
              :to="{ name: 'question-detail', params: { id: q._id}}"
              outline
              small
              depressed
              color="orange"
            >View Thread</v-btn>
            <v-btn
              :to="{ name: 'edit-question', params: { id: q._id}}"
              outline
              small
              color="orange"
              v-if="this.$store.state.userId ==  q.userId._id "
            >Edit</v-btn>
            <v-btn
              outline
              small
              color="orange"
              @click.prevent="deleteQuestion(q._id)"
              v-if="this.$store.state.userId ==  q.userId._id"
            >Delete</v-btn>
          </v-flex>
        </v-layout>

        <v-layout row wrap></v-layout>
        <v-layout row wrap>
          <div v-if="q.tags.length == 0">
            <h4 class="body-1 font-italic ml-4">Tags : None</h4>
          </div>
          <div v-else>
            <v-chip small label color="orange" text-color="white">
              <v-icon left>label</v-icon>Tags
            </v-chip>
            <v-chip
              small
              class="caption font-italic"
              v-for="(tag, index) in q.tags"
              :key="index"
            >{{tag.name}}</v-chip>
          </div>
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";
export default {
  props: ["q"],
  data() {
    return {
      totalvote: 0
    };
  },
  created() {
    this.calculate()
  },
  methods: {
    calculate() {
      return +this.q.upVotes.length - +this.q.downVotes.length
    },
    deleteTag(id) {
      console.log(id, "hello?");
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
          `/questions/upvote/${this.q._id}/`,
          { userId },
          { headers: { token: localStorage.getItem("token") } }
        )
        .then(({ data }) => {
          this.$store.dispatch("getDetailsOnThisQuestion", this.q._id)
          // this.$store.commit("setOneQuestionDetailsUp", data)
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
          `/questions/downvote/${this.q._id}/`,
          { userId },
          { headers: { token: localStorage.getItem("token") } }
        )
        .then(({ data }) => {
            this.$store.dispatch("getDetailsOnThisQuestion", this.q._id)

          // this.$store.commit("setOneQuestionDetailsDown", data)

          // this.$store.commit("setOneQuestionDetails", data)

          this.totalvote = data.upVotes.length - data.downVotes.length;
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: err.response.data.message
          });
        });
    }
  },
  computed: {
    ...mapState(["oneQuestionDetails", "answersOnThisQuestion"])
  },
  watch: {
    oneQuestionDetails() {
      console.log('q changed!')
    }
  },
};
</script>

<style scoped>
</style>
