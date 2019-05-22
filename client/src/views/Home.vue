<template>
  <div class="home">
    <div id="navbar">
      <div id="toplogo">Hacktiv<span style="font-weight: bold">Overflow</span></div>
      <div style="display: flex;">
        <div class="navitem" @click="toggleRegister">Register</div>
        <div class="navitem" @click="toggleLogin" v-if="!loggedIn">Login</div>
        <div class="navitem" @click="logout" v-else>Logout</div>
      </div>
    </div>
    <div style="padding-top: 3.2rem;">
      <Register style="position:fixed; right: 0; z-index: 3" v-on:close-register="showForm = 0" v-if="showForm === 1"/>
      <Login style="position:fixed; right: 0; z-index: 3" v-on:close-login="showForm = 0" v-if="showForm === 2"/>
    </div>
    <div id="page" style="padding-top: 0.8rem;" class="container-fluid">
      <div class="row justify-content-center">
        <div id="homepage" class="col-md-10" v-if="zone === 0">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>All questions<br></span>
            <!-- New question button -->
            <button type="button" class="btn btn-primary btn-sm" @click="questionForm = !questionForm">Ask a question</button>
          </div>
          <!-- New question form -->
          <div style="max-width: 60rem; margin: 0 auto; margin-top: 1rem; padding: 0.8rem 1.2rem; box-shadow: 0 0.2rem 1.4rem black;"
            v-if="questionForm">
            <form style="font-size: 0.8rem;" v-on:submit.prevent="sendQuestion">
              <div class="form-group">
                  <label>Question Title:</label>
                  <input style="font-size: 0.9rem;" type="text" class="form-control" placeholder="Title" v-model="questionTitle">
              </div>
              <div class="form-group">
                  <label>Describe your quetion in detail:</label>
                  <textarea style="font-size: 0.9rem;" rows="3" class="form-control" placeholder="Description" v-model="questionContent"></textarea>
              </div>
              <button type="submit" class="btn btn-secondary btn-sm">Submit</button><br>
              <div style="margin-top: 1rem;" class="alert alert-primary" role="alert" v-show="alert">
                  {{alert}}
              </div>
            </form>
          </div>
          <div id="question" v-for="question in questions" v-bind:key="question._id">
            <div id="votearea">
              <span class="upvotebutton">🡅</span><br>
              <span style="font-size: 0.9rem;">{{question.votecount}}</span><br>
              <span class="downvotebutton">🡇</span>
            </div>
            <div style="cursor: pointer" @click="goToQuestion(question)">
              {{question.title}}<br>
              <span style="font-size: 0.8rem;">
                asked on: {{question.created_at}} by: {{question.author.email}}<br>
              </span>
            </div>
          </div>
        </div>
        <div id="questionpage" class="col-md-10" v-if="zone === 1">
          <question-page/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Register from "../components/RegisterForm.vue";
import Login from "../components/LoginForm.vue";
import QuestionPage from "../components/QuestionPage.vue";

export default {
  name: 'home',
  components: {
    Register, Login, QuestionPage,
  },
  data: function() {
    return {
      questionForm: false,
      questionTitle: "",
      questionContent: "",
      alert: "", // new question alert
    }
  },
  created() {
    axios({
      method: 'get',
      url: this.$store.state.serverAddress + "qa/questions",
      // headers: {"Authorization": localStorage.getItem("token")},
    })
    .then(({ data }) => {
      this.$store.state.questions = data.map(question => {
        question.votecount = question.upvotes.length - question.downvotes.length; // Calculate votecount from upvotes minus downvotes
        return question;
      })
      console.log(this.$store.state.questions)
    })
    .catch((err) => {
      console.log(err)
    })
  },
  methods: {
    toggleRegister() {
      if(this.showForm === 1) {
        this.showForm = 0;
      } else {
        this.showForm = 1;
      }
    },
    toggleLogin() {
      if(this.showForm === 2) {
        this.showForm = 0;
      } else {
        this.showForm = 2;
      }
    },
    logout() {
      this.$store.state.loggedIn = false;
      localStorage.removeItem("token");
    },
    sendQuestion() {
      axios({
          method: 'post',
          url: this.$store.state.serverAddress + "qa/",
          data: {
            type: "question",
            title: this.questionTitle,
            content: this.questionContent,
          },
          headers: {"Authorization": localStorage.getItem("token")},
      })
      .then(({ data }) => {
        this.alert = "Success"
        setTimeout(() => {
            this.alert = "";
            this.questionForm = false;
        }, 1200);
      })
      .catch(err => {
        console.log(err)
        this.alert = "Failed"
        setTimeout(() => {
            this.alert = "";
        }, 2000);
      })
    },
    goToQuestion(obj) {
      this.zone = 1
      console.log(obj)
      this.selectedQuestion = obj
    },
  },
  computed: {
    questions() {
      return this.$store.state.questions;
    },
    loggedIn() {
      return this.$store.state.loggedIn;
    },
    showForm: {
      get() {
        return this.$store.state.showForm;
      },
      set(num) {
        this.$store.state.showForm = num;
      },
    },
    zone: {
      get() {
        return this.$store.state.zone;
      },
      set(num) {
        this.$store.state.zone = num;
      },
    },
    selectedQuestion: {
      get() {
        return this.$store.state.selectedQuestion;
      },
      set(obj) {
        this.$store.state.selectedQuestion = obj;
      },
    },
  }
}
</script>

<style>
#navbar {
  position: fixed;
  background-color: darkslategray;
  width: 100%;
  height: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9rem;
  z-index: 4;
}

input {
  color: #dddddd;
  background-color: #464646;
  border: none;
}

#toplogo {
  font-size: 1.4rem;
  margin: 0 1.5rem;
}

.navitem {
  margin: 0 1.5rem 0 0.5rem;
  justify-items: end;
  cursor: pointer;
}

#question {
  display: flex;
  line-height: 150%;
  margin: 1rem 0;
  padding: 0.3rem;
  background-color: #464646;
  align-items: center;
}

#votearea {
  text-align: center;
  width: 2.5rem;
  margin-right: 1rem;
  line-height: 140%;
}

.upvotebutton, .downvotebutton {
  cursor: pointer;
  /* color: orange; */
}
</style>
