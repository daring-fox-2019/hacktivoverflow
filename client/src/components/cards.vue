<template>
  <v-card>
    <v-container class="pa-3">
      <v-layout row>
        <v-flex xs2 style="display: flex;" justify-space-around>
          <v-layout align-center column>
            <p>{{ item.totalVote }}</p>
            <p>votes</p>
          </v-layout>
          <v-layout align-center column>
            <p>{{ answerLength }}</p>
            <p>answer</p>
          </v-layout>
        </v-flex>
        <v-flex>
          <router-link :to="'/question/' + item._id" class="plain">
            <h3>{{ item.title }}</h3>
          </router-link>
          <v-layout justify-space-between>
            <div>
              <router-link :to="'/tagged/' + tag" v-for="(tag, index2) in item.tags" :key="index2">
                <v-chip
                  @click="test(tag)"
                  color="grey darken-4"
                  label
                  small
                  class="font-weight-bold ma-1"
                >{{ tag }}</v-chip>
              </router-link>
            </div>
            <v-layout justify-end>
              <div class="mr-3">{{ item.user.name }}</div>
              <div>{{ item.createdAt }}</div>
            </v-layout>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import swal from 'sweetalert'

export default {
  name: "card",
  props: ["item"],
  data() {
    return {
      upvote: false,
      downvote: true,
      answerLength: 0
    };
  },
  methods: {
    test(tag) {
      // swal(tag);
      
    },
    voteCheck() {}
  },
  created() {
    this.item.createdAt = new Date(this.item.createdAt).toDateString();
    this.item.upvotes.forEach(item => {
      // console.log(item._id, localStorage.id, "upvote");
      if (item._id === localStorage.id) {
        this.upvote = true;
      }
    });
    this.item.downvotes.forEach(item => {
      // console.log(item._id, localStorage.id, "downvote");
      if (item._id === localStorage.id) {
        this.downvote = true;
      }
    });
    axios({
      method: "get",
      url: `http://34.87.71.136/answers/question?questionId=${this.item._id}`
    })
      .then(({ data }) => {
        // console.log({ data })
        this.answerLength = data.length;
      })
      .catch(err => {
        console.log({ err });
        err.origin = "question.vue - watch";
        this.$emit("error", err);
      });
  },
  watch: {
    item() {}
  }
};
</script>

<style>
</style>
