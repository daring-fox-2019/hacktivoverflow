<template>
  <div class>
    <div class="container text-center">
      <div class="row">
        <div class="col-sm-2">
          <Sidebar/>
        </div>
        <div class="col-sm-7">
          <button
          class="btn btn-primary"
          @click.prevent="toQuestionForm">Ask Question</button>
          <br>
          <br>
          <Question
          @deleteQuestion="deleteQuestion"
          v-for="(question, index) in questions"
          :key="index"
          :question="question" />
        </div>
        <div class="col-sm-3">
          <Quote :jokes="jokes"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import Sidebar from '@/components/Sidebar.vue';
import Question from '@/components/Question.vue';
import Quote from '@/components/Quote.vue';
import ServerApi from '@/api/serverApi';
import JokeApi from '@/api/jokeApi';

export default {
  data() {
    return {
      questions: [],
      jokes: '',
    };
  },
  components: {
    Sidebar,
    Question,
    Quote,
  },
  methods: {
    toQuestionForm() {
      this.$router.push('/question/ask');
    },
    fetchQuestion() {
    ServerApi
      .get('/questions')
      .then((questionsData) => {
        questionsData.data.forEach(element => {
          this.questions.push(element)
        });
      })
      .catch((err) => {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: `${err.response.data}`,
        });
      })
    },
    deleteQuestion(id) {
      ServerApi
        .delete(`/questions/${id}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then((deleted) => {
          this.questions = this.questions.filter(el => {
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
    getJoke() {

    },
    loadCronJob() {
      const CronJob = require('cron').CronJob;
      new CronJob('*/5 * * * * *', () => {
        // console.log('TES')
      JokeApi
        .get('/slack')
        .then((joke) => {
          this.jokes = joke
          // console.log(`${joke.attachments[0]}`)
        })
        .catch((err) => {
          // console.log(err)
        })
      }, null, true, 'America/Los_Angeles');
    },
  },
  created() {
    this.fetchQuestion();
    this.loadCronJob();
  },
};
</script>
