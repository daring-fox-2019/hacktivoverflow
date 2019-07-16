<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col col-md-9">
        <h2>{{ question.title }}</h2>
        <hr>
        <DetailCard :content="question"/>
        <hr>
        <div>
          <p class="text-muted mb-0">Asked By:</p>
          <h5>{{ userOwned.name }}</h5>
          <p class="text-muted mb-0" style="font-size:13px">Posted: {{ question.created }}</p>
        </div>
        <hr>
        <div v-if="answers.length > 0">
          <h1>Answers</h1>
          <hr>
        </div>
        <div v-for="answer in answers" :key="answer._id">
          <DetailCard :content="answer">
            <b-button v-if='answer.userId._id === $store.state.user._id' variant='outline-primary' @click.prevent='openAnswer(answer)'>Edit</b-button>
          </DetailCard>
          <div>
            <p class="text-muted mb-0">Answer By:</p>
            <h5>{{ answer.userId.name }}</h5>
            <p class="text-muted mb-0" style="font-size:13px">Posted: {{ answer.created }}</p>
            <hr>
          </div>
        </div>
        <div class="pt-5">
          <h2 class="text-left">Your Answer</h2>
          <wysiwyg v-model="answerForm"/>
          <b-button class="my-4" variant="primary" @click.prevent="postAnswer" v-if='this.$store.state.isLogin'>Submit your answer</b-button>
          <router-link to='/login'>
            <b-button class="my-4" size='sm' variant='outline-primary' v-if='!this.$store.state.isLogin'>Login to submit answer!</b-button>
          </router-link>
        </div>
      </div>
      <div class="col col-md-3">
        <div class="d-flex justify-content-around">
          <p class="text-muted">Asked</p>
          <p>{{ question.time }}</p>
        </div>
        <hr>
        <b-button variant="primary" @click.prevent='goToQuestion'>Ask a question</b-button>
        <router-link to="/">
          <b-button variant="outline-info" class="my-4">Back To Home</b-button>
        </router-link>
        <div v-if="this.$store.state.user._id === this.userOwned._id">
          <b-button
            variant="outline-primary"
            class="mb-4"
            @click.prevent='openModal("edit-question")'
          >Edit Question</b-button>
          <b-button variant='danger' @click.prevent='deleteQuestion'>Delete Question</b-button>
        </div>
      </div>
    </div>

    <!-- modal edit question -->
    <b-modal id="edit-question" title="Edit Form" hide-footer size='xl'>
      <div class="container">
        <div class="row d-flex justify-content-center">
          <b-form-group label="Title" label-for="question">
            <b-form-input
              id="question"
              placeholder="Enter title"
              v-model="editQuestionForm.title"
              style="width: 500px"
            ></b-form-input>
          </b-form-group>
        </div>
        <h5 class="pt-3">Content</h5>
        <div class="row d-flex justify-content-center">
          <wysiwyg v-model="editQuestionForm.content"/>
        </div>
        <div class="row d-flex justify-content-center pt-3">
          <b-button variant="primary" style="width: 150px" size="lg" @click.prevent="updateQuestion" v-if='!isLoading'>Save!</b-button>
          <swapping-squares-spinner :animation-duration="1000" :size="65" color="#428bca" v-if='isLoading'/>
        </div>
        <div class="mt-3"></div>
      </div>
    </b-modal>

    <!-- modal edit answer -->
    <b-modal id="edit-answer" title="Edit Form" hide-footer size='xl'>
      <div class="container">
        <h5 class="pt-3">Content</h5>
        <div class="row d-flex justify-content-center">
          <wysiwyg v-model="editAnswer.content"/>
        </div>
        <div class="row d-flex justify-content-center pt-3">
          <b-button variant="primary" style="width: 150px" size="lg" @click.prevent="updateAnswer" v-if='!isLoading'>Save!</b-button>
          <swapping-squares-spinner :animation-duration="1000" :size="65" color="#428bca" v-if='isLoading'/>
        </div>
        <div class="mt-3"></div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "@/api/server/axios.js";
import moment from "moment";
import DetailCard from "@/components/DetailCard.vue";
import { SwappingSquaresSpinner } from "epic-spinners";
export default {
  name: "QuestionPage",
  data() {
    return {
      question: {},
      userOwned: {},
      answerForm: "",
      answers: [],
      editQuestionForm: {
        title: "",
        content: ""
      },
      editAnswer: {
        content: '',
        id: ''
      },
      isLoading: false
    };
  },
  components: {
    DetailCard,
    SwappingSquaresSpinner
  },
  methods: {
    goToQuestion(){
      if(this.$store.state.isLogin){
        this.$router.push('/question')
      }else{
        this.$router.push('/login')
      }
    },
    deleteQuestion(){
      this.$swal({
        dangerMode: true,
        title: `Are you sure to delete this question?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        buttons: ["Cancel", "Yes!"]
      })
      .then(result=>{
        if (result){
          axios
            .delete(`/questions/${this.question._id}`)
            .then(({ data })=>{
              this.$swal("Success", "Your question has been deleted", "success")
              this.$router.push('/')
            })
        }else{
        }
      })
    },
    updateAnswer(){
      this.isLoading = true
      axios
        .patch('/answers', {
          id: this.editAnswer.id,
          content: this.editAnswer.content
        },{
          headers:{
            token: localStorage.token
          }
        })
        .then(({ data })=>{
          this.isLoading = false
          this.$bvModal.hide('edit-answer')
          this.$swal('Success!', 'Your answer has been updated!', 'success')
          this.getAnswers()
        })
        .catch(err=>{
          this.isLoading = false
          console.log(err)
        })
    },
    openAnswer(answer){
      this.editAnswer.content = answer.content
      this.editAnswer.id = answer._id
      this.$bvModal.show('edit-answer')
    },
    updateQuestion(){
      this.isLoading = true
      axios
        .patch('/questions', {
          title: this.editQuestionForm.title,
          content: this.editQuestionForm.content,
          id: this.question._id
        },{
          headers: {
            token: localStorage.token
          }
        })
        .then(({ data })=>{
          this.$swal('Success!', 'Your question has been updated!', 'success')
          this.getQuestion()
          this.isLoading = false
          this.$bvModal.hide('edit-question')
        })
        .catch(err=>{
          console.log(err)
          this.isLoading = false
        })
    },
    openModal() {
      this.editQuestionForm.title = this.question.title;
      this.editQuestionForm.content = this.question.content;
      this.$bvModal.show("edit-question");
    },
    getQuestion() {
      axios.get(`/questions?_id=${this.$route.params.id}`).then(({ data }) => {
        this.question = data.map(el => {
          el.time = moment(el.createdAt).fromNow();
          el.created = moment(el.createdAt).format("LLL");
          return el;
        });
        this.question = this.question[0];
        this.userOwned = this.question.userId;
        this.getAnswers()
      });
    },
    getAnswers() {
      axios.get(`/answers?questionId=${this.question._id}`).then(({ data }) => {
        if (data.length > 0) {
          this.answers = data.map(el => {
            el.time = moment(el.cratedAt).fromNow();
            el.created = moment(el.createdAt).format("LLL");
            return el;
          });
        }
      });
    },
    postAnswer() {
      if (this.answerForm.length > 0) {
        axios
          .post(
            "/answers",
            {
              content: this.answerForm,
              questionId: this.question._id
            },
            {
              headers: {
                token: localStorage.token
              }
            }
          )
          .then(({ data }) => {
            this.getAnswers();
            this.$swal("Success!", "Your answer has been posted", "success");
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$swal("Invalid input", "You have not written any answer!", "info");
      }
    }
  },
  created() {
    this.getQuestion();
    // this.$store.dispatch('loggedIn')
  }
};
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
