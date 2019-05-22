<template>
  <b-container>
    <h3 style="margin-top:10px; text-align:left">Question List</h3>
    <br>
    <b-container v-if="questionList">
      <div v-for="(question, index) in questionList.data" :key="index"
        style="margin-bottom:30px; padding:20px; border-radius:5px; border: 1px solid rgb(200,200,200)">
        <div>
          <h2 style="margin-bottom:30px">
            <strong>{{ question.question }}</strong>
          </h2>
        </div>
        <div>
          <div v-html="question.description"></div>
          <br />
          <div style="float:right;text-align:right">
            <h6>{{ question.owner.name }}</h6>
            <h6>
              <span v-for="(tag, idtag) in question.watchTags" :key="idtag">
                <tag :tag="tag[0]"></tag>
              </span>
            </h6>
            <h6><small>Last Updated: {{ question.updatedAt }}</small> </h6>
          </div>
          <div style="margin-left: 15px">
            <b-row cols=12 class="mb-2">
              <b-button v-if="question.owner._id != user" variant="outline-success" @click="upvote(question._id)"><i
                  class="fas fa-angle-up"></i> {{ question.upvotes.length }}</b-button>
            </b-row>
            <b-row>
              <b-button v-if="question.owner._id != user" variant="outline-danger" @click="downvote(question._id)"><i
                  class="fas fa-angle-down"></i> {{ question.downvotes.length }}</b-button>
            </b-row>
          </div>
          <div>
            <router-link v-if="question.owner._id == user"
              :to="{ name: 'updatequestion', params: { id: question._id } }">
              <b-button variant="outli=e-success" @click="saveDataGlobal(question)">Update</b-button>
            </router-link>
            <b-button v-if="question.owner._id == user" variant="outline-danger" @click="deleteQuestion(question._id)">
              Delete</b-button>
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
  import tag from "@/components/tag.vue"

  export default {
    name: "tagged",
    components: {
      Answer,
      tag
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
          .get("/questions/list?tag=" + this.$route.query.tag, {
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
      findByTag(filteredQuestion) {
        this.questionList = filteredQuestion
      },
      upvote(questionId) {
        axios
          .patch(
            "/questions/upvote/" + questionId, {}, {
              headers: {
                jwtoken: localStorage.jwtoken
              }
            }
          )
          .then(report => {
            this.onStart();

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
            "/questions/downvote/" + questionId, {}, {
              headers: {
                jwtoken: localStorage.jwtoken
              }
            }
          )
          .then(report => {
            this.onStart();

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