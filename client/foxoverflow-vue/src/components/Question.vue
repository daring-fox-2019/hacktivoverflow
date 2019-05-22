<template>
  <div class="container" style="background-color: white; color: rgb(139, 24, 8);">
    <v-layout row wrap id="top-row">
      <div>
        <h1>{{ currentQuestion.title }}</h1>
      </div>
      <div>
        <v-btn color="info" large to="./add" style="margin-right: 0;">
          <i class="fas fa-plus mr-2"></i> Ask Question
        </v-btn>
      </div>
    </v-layout>
    <v-layout row>
      <v-flex
        xs1
        style="display: flex; align-items: center; flex-direction: column; margin-top: 1rem;"
      >
        <i class="material-icons" style="cursor: pointer;">arrow_drop_up</i>
        <div>{{ currentQuestion.upvotes.length - currentQuestion.downvotes.length }}</div>
        <i class="material-icons" style="cursor: pointer;">arrow_drop_down</i>
      </v-flex>
      <v-flex xs11>
        <v-layout row wrap class="question-row" style="border-bottom: 0;">
          <v-flex>
            <div v-html="currentQuestion.description"></div>
            <div>
              <v-layout row wrap>
                <v-flex shrink v-for="(tag, index) in currentQuestion.tags" :key="index">
                  <v-btn color="info" small round flat outline style="margin-left: 0;">#{{ tag }}</v-btn>
                </v-flex>
              </v-layout>
            </div>
            <div class="py-3" style="display: flex; justify-content: space-between;">
              <div v-if="currentQuestion.userId._id === userId ">
                <v-btn
                  color="warning"
                  style="margin-left: 0;"
                  outline
                  small
                  @click="updateForm(currentQuestion._id)"
                >
                  <i class="fas fa-edit mr-1"></i>Edit
                </v-btn>
                <v-btn
                  color="error"
                  style="margin-left: 0;"
                  outline
                  small
                  @click="deleteQuestion(currentQuestion._id)"
                >
                  <i class="fas fa-trash-alt mr-1"></i>Delete
                </v-btn>
              </div>

              <div v-else></div>

              <div style="display: flex; flex-direction: column; align-items: flex-end;">
                <div>{{ currentQuestion.userId.fullName }}</div>
                <div>{{ (new Date(currentQuestion.createdAt)).toLocaleDateString() }}</div>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <hr>
    <div>{{ currentQuestion.answers.length }} answers</div>

    <v-form @submit.prevent="submitNewAnswer" class="mt-2">
      <v-layout row wrap>
        <v-flex xs12>
          <wysiwyg style="color: black;" v-model="answer"/>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 class="my-2">
          <v-btn color="info" type="submit" style="margin-left: 0;">Submit Answer</v-btn>
          <v-btn color="error" style="margin-left: 0;" flat to="/">Cancel</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "@/api/axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      answer: "",
      userId: ""
    };
  },
  created() {
    this.userId = localStorage.userId;
    this.getCurrentQuestion(this.$route.params.id);
  },
  methods: {
    ...mapActions(["getCurrentQuestion"]),
    updateForm(id) {
      console.log(id);
      this.$router.push(`/questions/${id}/edit`);
    },
    deleteQuestion(id) {
      axios({
        method: "DELETE",
        url: `/questions/${id}`,
        headers: { token: localStorage.token }
      })
        .then(({ data }) => {
          console.log(data);

          this.$router.push("/");

          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: "success",
            title: "Question deleted"
          });
        })
        .catch(err => {
          console.log(err);
          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
        });
    }
  },
  computed: {
    ...mapState(["currentQuestion"])
  }
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>