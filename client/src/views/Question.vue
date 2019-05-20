<template>
  <b-container>
    <router-link to="/addquestion">Add Question</router-link>
    <h1 style="margin-top:40px">Question List</h1>
    <br /><br />
    <b-container v-if="questionList">
      <div
        v-for="(question, index) in questionList.data"
        :key="index"
        style="margin-bottom:30px;background-color:rgba(0,0,0,0.2); padding:50px; border-radius:40px;"
      >
        <div>
          <h2 style="margin-bottom:30px">
            <strong>{{ question.question }}</strong>
          </h2>
          <strong></strong>
        </div>
        <div>
          <div v-html="question.description"></div>
          <br /><br />
          <h6>Asked by: {{ question.owner.name }}</h6>
          <h6>
            Watch Tags:
            <span v-for="(tag, idtag) in question.watchTags" :key="idtag"
              ><span v-if="idtag < 3">{{ tag[0] }}, </span></span
            >
          </h6>
          <b-button
            v-if="question.owner._id != user"
            variant="outline-success"
            @click="upvote(question._id)"
            ><i class="fas fa-thumbs-up"></i>uv:
            {{ question.upvotes.length }}</b-button
          >
          <b-button
            v-if="question.owner._id != user"
            variant="outline-danger"
            @click="downvote(question._id)"
            ><i class="fas fa-thumbs-down"></i>dv:
            {{ question.downvotes.length }}</b-button
          >
          <div>
            <router-link
              v-if="question.owner._id == user"
              :to="{ name: 'updatequestion', params: { id: question._id } }"
              ><b-button
                variant="outli=e-success"
                @click="saveDataGlobal(question)"
                >Update</b-button
              ></router-link
            >
            <b-button
              v-if="question.owner._id == user"
              variant="outline-danger"
              @click="deleteQuestion(question._id)"
              >Delete</b-button
            >
          </div>
          <br />
          <hr />
          <hr />
          <br />
          <answer :answers="question" @terjadiPerubahan="onStart"></answer>
        </div>
      </div>
    </b-container>
  </b-container>
</template>

<script>
import Swal from "sweetalert2";
import axios from "@/api/axios";
import Answer from "@/components/Answer.vue";

// let baseUrl = 'http://localhost:3500'
export default {
  name: "question",
  components: {
    Answer
  },
  data() {
    return {
      questionList: null,
      user: localStorage.id
    };
  },
  methods: {
    saveDataGlobal(question) {
      this.$store.commit("simpenGlobalQuest", question);
    },

    onStart() {
      axios
        .get("/questions/list", {
          headers: {
            jwtoken: localStorage.jwtoken
          }
        })
        .then(questionList => {
          this.questionList = questionList;
        })
        .catch(err => {
          console.log(err);
        });
    },
    upvote(questionId) {
      axios
        .patch(
          "/questions/upvote/" + questionId,
          {},
          {
            headers: {
              jwtoken: localStorage.jwtoken
            }
          }
        )
        .then(report => {
          this.onStart();
          Swal.fire({
            text: "upvote success!",
            type: "success"
          });
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            text: err.message,
            type: "error"
          });
        });
    },
    downvote(questionId) {
      axios
        .patch(
          "/questions/downvote/" + questionId,
          {},
          {
            headers: {
              jwtoken: localStorage.jwtoken
            }
          }
        )
        .then(report => {
          this.onStart();
          Swal.fire({
            text: "downvote success!",
            type: "success"
          });
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            text: err.message,
            type: "error"
          });
        });
    },

    deleteQuestion(questionId) {
      axios
        .delete("/questions/delete/" + questionId, {
          headers: {
            jwtoken: localStorage.jwtoken
          }
        })
        .then(report => {
          this.onStart();
          Swal.fire({
            text: "delete success!",
            type: "success"
          });
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            text: "delete error !-!",
            type: "error"
          });
        });
    }
  },
  created() {
    this.onStart();
  }
};
</script>

<style></style>
