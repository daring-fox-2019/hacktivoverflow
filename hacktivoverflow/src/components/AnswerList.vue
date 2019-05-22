<template>
  <div class="container">
    <div v-for="answer in answers" :key="answer._id">
      <div class="answer-body" v-html="answer.body">{{answer.body}}</div>
      <v-layout align-center class="container">
        <v-flex xs4>
          <div class="caption grey--text">
            answered {{formatTime(answer.createdAt)}} by
            <router-link
              to="/user/"
              class="accent--text"
              v-if="!answer.isOwner"
            >{{answer.author.name}}</router-link>
            <router-link to="/user/" class="accent--text" v-if="answer.isOwner">you</router-link>
          </div>
        </v-flex>
        <v-flex xs2>
          <div v-if="answer.isOwner">
            <div class="caption">
              <span class="accent--text">
                <router-link
                  :to="'/questions/' + $route.params.questionId + '/answers/' + answer._id + '/edit'"
                  class="accent--text"
                >edit</router-link>
                <span class="grey--text">
                  or
                  <a @click="deleteAnswer(answer._id)" class="accent--text">delete</a>
                </span>
              </span>
            </div>
          </div>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs2>
          <div :class="answer.contribution">
            <v-btn
              @click="$store.dispatch('upvoteAnswer', {questionId: $route.params.questionId, answerId: answer._id})"
              small
              icon
              class="upv grey--text"
            >
              <v-icon>arrow_upward</v-icon>
            </v-btn>
            <v-btn
              @click="$store.dispatch('downvoteAnswer', {questionId: $route.params.questionId, answerId: answer._id})"
              small
              icon
              class="dwv grey--text"
            >
              <v-icon>arrow_downward</v-icon>
            </v-btn>
          </div>
        </v-flex>
        <v-flex xs2>
          <div class="right">
            <div class="caption">
              <div>{{answer.upvotes.length}} upvotes</div>
              <div>{{answer.downvotes.length}} downvotes</div>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-divider class="grey lighten-1 mb-5"></v-divider>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  computed: {
    answers() {
      return this.$store.state.answers;
    }
  },
  methods: {
    formatTime(time) {
      let formatted = moment(time).format();
      return moment(formatted)
        .startOf("day")
        .fromNow();
    },
    deleteAnswer(answerId) {
      console.log("delete");
      this.$store.dispatch("deleteAnswer", {
        questionId: this.$route.params.questionId,
        answerId
      });
      this.$router.push("/" + this.$route.params.questionId);
    },
    editAnswer(answerId) {
      this.$store.dispatch("getOneAnswer", {
        questionId: this.$route.params.questionId,
        answerId
      });
    }
  }
};
</script>

<style scoped>
.answer-body >>> img {
  max-width: 500px;
}
.upvoteanswer .upv {
  color: #ff9100 !important;
}
.upvoteanswer .dwv {
  color: #9e9e9e !important;
}

.downvoteanswer .upv {
  color: #9e9e9e !important;
}
.downvoteanswer .dwv {
  color: #ff9100 !important;
}

.v-icon {
  color: grey;
}
</style>
