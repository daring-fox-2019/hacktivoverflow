<template>
  <div class="container d-flex justify-content-center" style="margin-top:140px">
    <div style="width:75%">
      <div>
        <h5>
          <span style="color:grey">
            <b>question /</b>
          </span>
          {{question.title}}
        </h5>
        <hr>
        <div class="row">
          <div class="col-1 d-flex flex-column justify-content-center align-items-center">
            <div>
              <b-button variant="outline-secondary" @click="upvoteQuestion">
                <i class="fas fa-chevron-up"></i>
              </b-button>
            </div>
            <div class="d-flex justify-content-center pt-2" v-if="question.upvotes">
              <h4
                class="align-self-center"
              >{{ question.upvotes.length - question.downvotes.length }}</h4>
            </div>
            <div>
              <b-button variant="outline-secondary" @click="downvoteQuestion">
                <i class="fas fa-chevron-down"></i>
              </b-button>
            </div>
          </div>
          <div class="col-11">
            <p v-html="question.description"></p>
            <p style="font-size:12px;color:grey" v-if="question.user_id">
              by:
              <b>{{ question.user_id.name }}</b>
              <br>
              {{ question.updatedAt | moment("from", "now") }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-5" v-if="question.answers">
        <h5 class="m-1" style="color:grey">
          <b>{{ question.answers.length }} answers/</b>
        </h5>
        <hr>
        <div>
          <div class="row mt-3 border p-4" v-for="(answer,i) in question.answers" :key="i">
            <div class="col-1 d-flex flex-column justify-content-center align-items-center">
              <div>
                <b-button variant="outline-secondary" @click="upvoteAnswer(answer._id)">
                  <i class="fas fa-chevron-up"></i>
                </b-button>
              </div>
              <div class="d-flex justify-content-center pt-2">
                <h4 class="align-self-center">{{ answer.upvotes.length - answer.downvotes.length }}</h4>
              </div>
              <div>
                <b-button variant="outline-secondary" @click="downvoteAnswer(answer._id)">
                  <i class="fas fa-chevron-down"></i>
                </b-button>
              </div>
            </div>

            <!-- answers column -->
            <div class="col-11">
          
              <router-view v-if="answer._id == answer_id"/>

              <p v-html="answer.description" v-if="!editMode"></p>
              <p style="font-size:12px;color:grey;">
                by:
                <b>{{ answer.user_id.name }}</b>
                <br>
                <i>{{ answer.updatedAt | moment("from", "now") }}</i>
              </p>

              <div class="d-flex justify-content-end" v-if="!editMode && owner == answer.user_id._id" >
                <router-link :to="`/question/${answer.question_id}/${answer._id}`" 
                  ><b-button
                    size="sm"
                    variant="secondary"
                    class="mr-2"
                  >edit</b-button> 
                </router-link>
                <b-button
                  size="sm"
                  variant="outline-secondary"
                  @click="deleteAnswer(answer._id)"
                >delete</b-button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="mt-5" v-if="isLogin">
        <h5 class="m-1">Add Your Answer</h5>
        <hr>
        <Editor @getdata="getData" ref="editor" :init-value="initValue"/>
        <div class="d-flex justify-content-end mt-3">
          <b-button variant="outline-primary" @click="submitAnswer">Submit Answer</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from "@/components/Editor.vue";
import axios from "@/database/axios";
import EditAnswer from '@/components/EditAnswer.vue';
import { mapState } from 'vuex';

export default {
  components: {
    Editor
  },
  computed: {
    ...mapState(['isLogin'])
  },
  data() {
    return {
      trigger: false,
      answer: {
        question_id: this.$route.params.id,
        description: null
      },
      question: {},
      answer_id: null,
      editMode: false,
      initValue: '',
      owner: localStorage.getItem('id')
    };
  },
  watch:{
    $route(){
      this.answer_id = this.$route.params.answer_id
      this.editMode = true

      if(!this.answer_id){
        this.getQuestion()
        this.editMode = false
      }
    }
  },
  beforeMount() {
    this.getQuestion();
  },
  methods: {
    deleteAnswer(id){
      axios.delete(`/answers/${id}`, {headers: {token: localStorage.getItem('token')}})
      .then(({data}) => {
        let index = this.question.answers.indexOf(id)
        this.question.answers.splice(index, 1)
        this.$swal(':D', 'success delete answer', 'success')
      })
      .catch( err => {
        this.$swal(':(', `${err.response.data.message}`, 'error')
      })
    },
    upvoteAnswer(id) {
      axios
        .patch(
          `/answers/upvote/${id}`,
          {},
          { headers: { token: localStorage.getItem("token") } }
        )
        .then(({ data }) => {
          this.getQuestion();
        })
        .catch(err => {
          this.$swal(":(", `${err.response.data.message}`, "error");
        });
    },
    downvoteAnswer(id) {
      axios
        .patch(
          `/answers/downvote/${id}`,
          {},
          { headers: { token: localStorage.getItem("token") } }
        )
        .then(({ data }) => {
          this.getQuestion();
        })
        .catch(err => {
          console.log(err);
        });
    },
    upvoteQuestion() {
      axios
        .patch(
          `/questions/upvote/${this.$route.params.id}`,
          {},
          { headers: { token: localStorage.getItem("token") } }
        )
        .then(({ data }) => {
          this.getQuestion();
        })
        .catch(err => {
          console.log(err);
        });
    },
    downvoteQuestion() {
      axios
        .patch(
          `/questions/downvote/${this.$route.params.id}`,
          {},
          { headers: { token: localStorage.getItem("token") } }
        )
        .then(({ data }) => {
          this.getQuestion();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getData(data) {
      this.answer.description = data;
    },
    submitAnswer() {
      this.$refs.editor.emitData()
      axios
        .post(`/answers`, this.answer, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
          this.initValue = ''
          this.getQuestion()
        })
        .catch(err => {
          console.log(err);
        });
    },
    getQuestion() {
      axios
        .get(`/questions/${this.answer.question_id}`, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
          console.log(data);
          this.question = data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
   .btn-sm,
  .btn-group-sm > .btn {
    padding: 0.3rem 0.4rem;
    font-size: 0.7rem;
    line-height: 1.5;
  }
</style>


