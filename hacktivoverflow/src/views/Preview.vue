<template>
  <div class="container grey--text text--darken-3">
    <div class="mb-5">
      <h1 class="mb-3">{{question.title}}</h1>
      <div v-html="question.body" class="subheading"></div>
      <v-divider class="grey lighten-2 my-3"></v-divider>
      <v-layout align-center>
        <v-flex xs2>
          <div class="caption grey--text">
            {{formatTime(question.createdAt)}} by
            <router-link
              to="/user/"
              class="accent--text"
              v-if="!question.isOwner"
            >{{question.author.name}}</router-link>
            <router-link to="/user/" class="accent--text" v-if="question.isOwner">you</router-link>
          </div>
        </v-flex>
        <v-flex xs1>
          <div v-if="question.isOwner">
            <div class="caption">
              <span class="accent--text">
                <router-link :to="'/questions/' + question._id + '/edit'" class="accent--text">edit</router-link>
                <span class="grey--text">
                  or
                  <a @click="deleteQuestion" class="accent--text">delete</a>
                </span>
              </span>
            </div>
          </div>
        </v-flex>
        <v-spacer></v-spacer>
        <v-chip v-if="question.solved" small class="accent caption">solved</v-chip>
        <v-chip v-if="!question.solved" small class="grey caption">unsolved</v-chip>
        <div v-if="question.isOwner">
          <a
            v-if="question.solved"
            class="caption grey--text ml-2"
            @click="markUnsolved"
          >mark as unsolved</a>
          <a
            v-if="!question.solved"
            class="caption accent--text ml-2"
            @click="markSolved"
          >mark as solved</a>
        </div>
        <v-spacer></v-spacer>
        <v-flex xs2>
          <div :class="question.contribution">
            <v-btn
              @click="$store.dispatch('upvoteQuestion', question._id)"
              small
              icon
              class="upv grey--text"
            >
              <v-icon>arrow_upward</v-icon>
            </v-btn>
            <v-btn
              @click="$store.dispatch('downvoteQuestion', question._id)"
              small
              icon
              class="dwv grey--text"
            >
              <v-icon>arrow_downward</v-icon>
            </v-btn>
          </div>
        </v-flex>
        <v-flex xs1>
          <div class="right">
            <div class="caption">
              <div>{{question.upvotes.length}} upvotes</div>
              <div>{{question.downvotes.length}} downvotes</div>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </div>
    <div class="container">
      <div class="mb-5">
        <div class="title mb-2">Answers</div>
        <div class="subheading grey--text" v-if="question.answers.length === 0">No answers yet...</div>
        <div>
          <AnswerList/>
        </div>
      </div>
      <div>
        <div class="title mb-2">Your Answer</div>
        <v-form v-if="this.$store.state.isLogin" @submit.prevent="submitAnswer">
          <VueEditor
            id="editor"
            useCustomImageHandler
            @imageAdded="handleImageAdded"
            v-model="editorData"
          />
          <div class="right mt-3">
            <v-btn type="submit" flat class="grey--text text--darken-3">
              <v-icon class="mr-2">send</v-icon>
              <span>
                submit your
                <span class="accent--text">answer</span>
              </span>
            </v-btn>
          </div>
        </v-form>
        <div v-if="!this.$store.state.isLogin">
          <span class="accent--text">Sign In</span>
          to anwer this question
          <Login/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "@/components/Login";
import { VueEditor } from "vue2-editor";
import moment from "moment";
import AnswerList from "@/components/AnswerList";

export default {
  data() {
    return {
      editorData: ""
    };
  },
  created() {
    this.$store.dispatch("getOneQuestion", this.$route.params.questionId);
    this.$store.dispatch("getAnswers", this.$route.params.questionId);
  },
  computed: {
    question() {
      return this.$store.state.question;
    }
  },
  components: {
    VueEditor,
    Login,
    AnswerList
  },
  methods: {
    markSolved() {
      console.log("solved");
      this.$store.dispatch("markSolved", this.$route.params.questionId);
    },
    markUnsolved() {
      console.log("unsolved");
      this.$store.dispatch("markUnsolved", this.$route.params.questionId);
    },
    formatTime(time) {
      let formatted = moment(time).format();
      return moment(formatted)
        .startOf("day")
        .fromNow();
    },
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      let formData = new FormData();
      formData.append("image", file);
      this.$store.dispatch("uploadImage", formData).then(url => {
        Editor.insertEmbed(cursorLocation, "image", url);
        resetUploader();
      });
    },
    submitAnswer() {
      console.log("answer submitted");
      let newAnswer = {
        body: this.editorData,
        questionId: this.$route.params.questionId
      };
      this.$store.dispatch("submitAnswer", newAnswer);
      this.editorData = "";
      this.$router.push("/questions/" + this.$route.params.questionId);
    },
    deleteQuestion() {
      this.$store.dispatch("deleteQuestion", this.$route.params.questionId);
      this.$router.push("/");
    }
  }
};
</script>

<style>
.upvote .upv {
  color: #ff9100 !important;
}
.upvote .dwv {
  color: #9e9e9e !important;
}
.downvote .upv {
  color: #9e9e9e !important;
}
.downvote .dwv {
  color: #ff9100 !important;
}
.v-icon {
  color: grey;
}
</style>

