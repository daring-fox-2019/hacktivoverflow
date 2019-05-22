<template>
    <div>
      <button type="button" class="btn btn-secondary btn-sm" @click="exit">Return</button><br>
      <div style="text-align: center;">
        Question<br>
      </div>
      <div id="question">
        <div id="votearea">
          <span class="upvotebutton">🡅</span><br>
          <span style="font-size: 0.9rem;">{{question.votecount}}</span><br>
          <span class="downvotebutton">🡇</span>
        </div>
        <div style="cursor: pointer">
          <span style="font-size: 1.5rem;">{{question.title}}</span>
          <br>
          {{question.content}}<br>
          <span style="font-size: 0.8rem;">
            Answered on: {{question.created_at}} by: {{question.author.email}}<br>
          </span>
        </div>
      </div>
      <hr style="border: 1px solid #ccc"/>
      <!-- Answer section -->
      <div style="text-align: center;">
        Answers<br>
      </div>
      <button type="button" class="btn btn-primary btn-sm" @click="showForm">New answer</button><br>
      <!-- Answers -->
      <div id="answer" v-for="answer in answers" v-bind:key="answer._id">
        <div id="votearea">
          <span class="upvotebutton">🡅</span><br>
          <span style="font-size: 0.9rem;">{{answer.votecount}}</span><br>
          <span class="downvotebutton">🡇</span>
        </div>
        <div>
          {{answer.content}}<br>
          <span style="font-size: 0.8rem;">
            asked on: {{answer.created_at}} by: {{answer.author.email}}<br>
          </span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
    }
  },
  created() {
    axios({
      method: 'get',
      url: this.$store.state.serverAddress + "qa/answers/" + this.question._id,
    })
    .then(({ data }) => {
      this.$store.state.answers = data.map(answer => {
        answer.votecount = answer.upvotes.length - answer.downvotes.length; // Calculate votecount from upvotes minus downvotes
        return answer;
      })
      console.log(this.$store.state.answers)
    })
    .catch((err) => {
      console.log(err)
    })
  },
  methods: {
    exit() {
      this.$store.state.zone = 0;
      this.$store.state.selectedQuestion = null;
    },
    showForm() {
      console.log("show form")
    }
  },
  computed: {
    question() {
      return this.$store.state.selectedQuestion;
    },
    answers: {
      get() {
        return this.$store.state.answers;
      }
    }
  }
}
</script>

<style scoped>
#question {
  display: flex;
  line-height: 180%;
  margin: 0;
  margin-top: 0.5rem;
  padding: 0;
  background: none;
  align-items: center;
}

#votearea {
  text-align: center;
  width: 2.5rem;
  margin-right: 1rem;
  line-height: 140%;
}

#answer {
  display: flex;
  line-height: 150%;
  margin: 1rem 0;
  padding: 0.3rem;
  background-color: #464646;
  align-items: center;
}
</style>