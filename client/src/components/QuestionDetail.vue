<template>
  <div class="col-sm-12">
    <div class="row">
      <div class="col-sm-12">
        <div class="smallanel-body col-sm-12">
        <router-link to="/">
            <h2>
            {{ question.title }}
            </h2>
            <h2 v-html="question.description" />
        </router-link>
        <button type="button" class="btn btn-default btn-sm">
            <span class="glyphicon glyphicon-thumbs-down"></span> Dislike
        </button>
        <button type="button" class="btn btn-default btn-sm">
            <span class="glyphicon glyphicon-thumbs-up"></span> Like
        </button>
        </div>
      </div>
    </div>
    <div class="">
        <small>Asked: {{ question.createdAt }}</small><br>
    </div>

    <div class="row">
      <h3>Answer: </h3>
        <Answer
        @deleteAnswer="deleteAnswer"
        v-for="(answer, index) in answers"
        :key="index"
        :answer="answer" />
    </div>
    <div class="">
        <form @submit.prevent="createAnswer">
            <h3>Your Answer</h3>
            <wysiwyg v-model="myHTML" />
            <div class="row">
            <div class="d-flex justify-content-end">
                <button
                class="btn btn-primary">
                    Post Your Answer
                </button>
            </div>
            </div>
        </form>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import ServerApi from '@/api/serverApi';
import Answer from '@/components/Answer';

export default {
  data() {
    return {
      question: '',
      myHTML: '',
      answers: [],
    };
  },
  components: {
    Answer,
  },
  methods: {
    deleteAnswer(id) {
      ServerApi
        .delete(`/answers/${id}`,{
          headers: {
            token: localStorage.getItem('token')
          },
        })
        .then((deleted) => {
          this.answers = this.answers.filter(el => {
            if (el._id !== deleted.data._id) {
              return el;
            }
          });
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'content deleted',
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${err.response.data.msg}`,
          });
        });
    },
    createAnswer() {
      ServerApi
        .post('/answers', {
          content: this.myHTML,
          questionId: this.$route.params.id,
          author: localStorage.getItem('id')
        },{
          headers: {
            token: localStorage.getItem('token')
          },
        })
        .then((answer) => {
          this.answers.push(answer)
        //   this.fetchAnswers()
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${err.response}`,
          });
        })
    },
    fetchAnswers() {
      ServerApi
        .get('/answers')
        .then((answer) => {
          answer.data.forEach(element => {
            this.answers.push(element)
          });
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${err.response}`,
          });
        })
    },
    findQuestion() {
      ServerApi
        .get(`/questions/${this.$route.params.id}`)
        .then((questionFound) => {
          this.question = questionFound.data;
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${err.response}`,
          });
        });
    },
  },
//   watch: {
//     answers() {
//       this.fetchAnswers()
//       console.log('answer update')
//     }
//   },
  created() {
    this.findQuestion();
    this.fetchAnswers();
  },
};
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

</style>
