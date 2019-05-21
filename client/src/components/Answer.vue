<template>
  <div>
    <v-layout align-center justify-space-between fluid py-3>
      <v-flex md1>
        <img
          src="../assets/up-orange.png"
          alt="upvote"
          style="height: 20px;"
          @click="upvote(answer._id)"
          v-if="statusUp"
        >
        <img
          src="../assets/up-grey.png"
          alt="upvote"
          style="height: 20px;"
          @click="upvote(answer._id)"
          v-else
        >
        <v-flex mb-2>
          <h2>{{answer.upvotes.length-answer.downvotes.length}}</h2>
        </v-flex>
        <img
          src="../assets/down-orange.png"
          alt="upvote"
          style="height: 20px;"
          @click="downvote(answer._id)"
          v-if="statusDown"
        >
        <img
          src="../assets/down-grey.png"
          alt="upvote"
          style="height: 20px;"
          @click="downvote(answer._id)"
          v-else
        >
      </v-flex>
      <v-flex>
        <v-layout column pl-4>
          <v-flex align-self-start>{{answer.description}}</v-flex>
          <v-flex align-self-end>
            <span>Answered by : {{answer.userId.name}}</span>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-divider/>
  </div>
</template>

<script>
export default {
  props: ["answer"],
  data() {
    return {
      statusUp: false,
      statusDown: false
    };
  },
  created() {
    let upvote = this.answer.upvotes.find(element => {
      return element === localStorage.userId;
    });

    let downvote = this.answer.downvotes.find(element => {
      return element === localStorage.userId;
    });

    this.statusDown = downvote ? true : false;
    this.statusUp = upvote ? true : false;
  },
  watch: {
    answer(val) {
      let upvote = this.answer.upvotes.find(element => {
        return element === localStorage.userId;
      });

      let downvote = this.answer.downvotes.find(element => {
        return element === localStorage.userId;
      });

      this.statusDown = downvote ? true : false;
      this.statusUp = upvote ? true : false;
    }
  },
  methods: {
    upvote(id) {
      this.$emit("upvote-answer", id);
    },
    downvote(id) {
      this.$emit("downvote-answer", id);
    }
  }
};
</script>
