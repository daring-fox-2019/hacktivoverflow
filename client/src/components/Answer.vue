<template>
  <div>
    <v-layout align-center justify-space-between fluid py-3 v-if="!isEdit">
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
          <v-flex align-self-start>
            <span class="grey--text" v-html="answer.description"></span>
          </v-flex>
          <v-flex align-self-end>
            <span>Answered by : {{answer.userId.name}}</span>
          </v-flex>
          <v-flex align-self-start>
            <span class="ml-1" @click.prevent="edit">edit</span>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout align-center justify-space-between fluid py-3 v-else>
      <v-flex>
        <v-textarea
          name="description"
          label="Description"
          hint="Description answer"
          v-model="answer.description"
        ></v-textarea>
        <v-flex align-self-start md3 my-3>
          <v-btn color="primary" @click.prevent="actionEdit">Edit</v-btn>
          <span class="ml-1" @click.prevent>cancel</span>
        </v-flex>
        <v-divider my-3/>

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
import axios from "axios";

export default {
  props: ["answer"],
  data() {
    return {
      statusUp: false,
      statusDown: false,
      isEdit: false
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
    },
    edit() {
      this.isEdit = true;
    },
    actionEdit() {
      axios
        .put(
          `http://localhost:3000/answers/${this.answer._id}`,
          { description: this.answer.description },
          {
            headers: { token: localStorage.token }
          }
        )
        .then(() => {
          this.isEdit = false;
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
img {
  cursor: pointer;
}
span {
  cursor: pointer;
  color: rgb(141, 135, 135);
}

span:hover {
  color: rgb(73, 70, 70);
}
</style>
