<template>
  <div>
    <div id="box">
      <h3>Bored?</h3>
      <h3>Click to ask this random question!</h3>
      <hr>
      <br>
      <a @click="askQuestion" href="#" style="text-decoration: none;">
        <h4 id="question" v-html="randomQuestion"></h4>
      </a>
    </div>
  </div>
</template>


<script>
import myServer from '@/api/myServer';

export default {
  data() {
    return {
      randomQuestion: '',
    };
  },
  created() {
    this.getRandomQuestion();
  },
  methods: {
    askQuestion() {
      const form = {};
      form.title = this.randomQuestion;
      form.description = '';
      this.$store.dispatch('createQuestion', form);
    },

    getRandomQuestion() {
      const { CronJob } = require('cron');
      new CronJob(
        '*/15 * * * * *',
        () => {
          myServer
            .get('/question/random')
            .then(({ data }) => {
              this.randomQuestion = data.results[0].question;
            })
            .catch((err) => {
              console.log(err);
            });
        },
        null,
        true,
        'America/Los_Angeles',
      );
    },
  },
};
</script>

<style>
#box {
  height: 250px;
  width: 500px;
  border: solid 1px;
  margin-top: 50px;
  margin-right: 50px;
  background-color: white;
  border-color: #97dcdf;
  text-align: center;
  padding: 10px;
}

#question {
  margin: 0;
  padding: 0;
  background-color: #97dcdf;
  border-radius: 15px;
  width: -moz-available;
  color: black;
}
</style>
