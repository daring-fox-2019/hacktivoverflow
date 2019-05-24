<template>
    <div>
      <button type="button" class="btn btn-secondary btn-sm" @click="exit">Return</button><br>
      <div style="text-align: center;">
        Question<br>
      </div>
      <div id="question">
          <div style="cursor: pointer">
          <span style="font-size: 1.5rem;">{{question.title}}</span>
          <br>
          {{question.content}}<br>
          <span style="font-size: 0.8rem;">
            Asked on: {{shorten(question.created_at)}}&nbsp;&nbsp;&nbsp;
            by: {{question.author.email}}<br>
          </span>
        </div>
      </div>
      <hr style="border: 1px solid #ccc"/>
      <!-- Answer section -->
      <div style="text-align: center;">
        Answers<br>
      </div>
      <div style="display: flex; flex-direction: row-reverse;">
        <button type="button" class="btn btn-primary btn-sm" @click="showForm = !showForm">New Answer</button><br>
      </div>
      <!-- New answer form -->
      <div style="max-width: 60rem; margin: 0 auto; margin-top: 1rem; padding: 0.8rem 1.2rem; box-shadow: 0 0.2rem 1.4rem black;"
        v-if="showForm">
        <form style="font-size: 0.8rem;" v-on:submit.prevent="sendAnswer">
          <div class="form-group">
              <label>Write your answer:</label>
              <textarea style="font-size: 0.9rem;" rows="3" class="form-control" placeholder="Description" v-model="answerContent"></textarea>
          </div>
          <button type="submit" class="btn btn-secondary btn-sm">Submit</button><br>
          <div style="margin-top: 1rem;" class="alert alert-primary" role="alert" v-show="alert">
              {{alert}}
          </div>
        </form>
      </div>
      <!-- Answers -->
      <div id="answer" v-for="answer in answers" v-bind:key="answer._id">
        <div id="votearea">
          <span class="upvotebutton">🡅</span><br>
          <span style="font-size: 0.9rem;">{{answer.votecount}}</span><br>
          <span class="downvotebutton">🡇</span>
        </div>
        <div>
          {{answer.content}}<br>
          <div style="font-size: 0.8rem; margin-top: 0.6rem; line-height: 1.2rem;">
            asked on: {{shorten(answer.created_at)}}&nbsp;&nbsp;&nbsp;
            by: {{answer.author.email}}<br>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      showForm: false,
      answerContent: "",
      alert: "",
    }
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      axios({
        method: 'get',
        url: this.$store.state.serverAddress + "qa/answers/" + this.question._id,
      })
      .then(({ data }) => {
        this.$store.state.answers = data.map(answer => {
          answer.votecount = answer.upvotes.length - answer.downvotes.length; // Calculate votecount from upvotes minus downvotes
          return answer;
        })
      })
      .catch((err) => {
        console.log(err)
      })
    },
    exit() {
      this.$emit("returnButton")
      this.$store.state.zone = 0;
      this.$store.state.selectedQuestion = null;
    },
    shorten(rawdate) {
      let out = ""
      for(let i = 0; i < rawdate.length-5; i ++) {
        if(rawdate[i] === "T") {
          out += ", "
        } else {
          out += rawdate[i]
        }
      }
      return out;
    },
    sendAnswer() {
      axios({
        method: 'post',
        url: this.$store.state.serverAddress + "qa/",
        data: {
          type: "answer",
          content: this.answerContent,
          question_id: this.question._id,
        },
        headers: {"Authorization": localStorage.getItem("token")},
      })
      .then(() => {
        this.alert = "Success";
        this.fetch();
        setTimeout(() => {
          this.alert = "";
          this.showForm = 0;
        }, 1000);
      })
      .catch(err => {
        console.log(err)
        this.alert = "Failed"
        setTimeout(() => {
        {}    this.alert = "";
        }, 2000);
      })
    },
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