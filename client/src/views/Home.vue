<template>
  <div class="home">
    <div id="navbar">
      <div id="toplogo" @click="goHome()">Hacktiv<span style="font-weight: bold">Overflow</span></div>
      <div style="display: flex; align-items: center;">
        <div class="navitem" @click="toggleRegister" v-if="!loggedIn">Register</div>
        <div style="color: black; background-color: #ccc; padding: 0.2rem 0.5rem; border-radius: 0.2rem;" class="navitem" v-else>{{userEmail}}</div>
        <div class="navitem" @click="toggleLogin" v-if="!loggedIn">Login</div>
        <div class="navitem" @click="logout" v-else>Logout</div>
      </div>
    </div>
    <div style="padding-top: 3.2rem;">
      <Register style="position:fixed; right: 0; z-index: 3" v-on:close-register="showForm = 0" v-if="showForm === 1"/>
      <Login style="position:fixed; right: 0; z-index: 3" v-on:fetch="fetch()" v-on:close-login="showForm = 0" v-if="showForm === 2"/>
    </div>
    <div id="page" style="padding-top: 0.8rem;" class="container-fluid">
      <div class="row justify-content-center">
        <div id="homepage" class="col-md-10" v-if="zone === 0">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 1.2rem">All questions<br></span>
            <!-- New question button -->
            <button type="button" class="btn btn-primary btn-sm" @click="questionForm = !questionForm">New Question</button>
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
          <!-- Search bar -->
          <div style="margin-top: 0.8rem;">
            <input style="width: 100%; padding: 0.4rem; border: 1px solid #3d73d8; border-radius: 0.2rem;"
              v-model="searchBox" placeholder="Search questions">
          </div>
          <!-- Question List -->
          <div id="question" v-for="question in filteredQuestions" v-bind:key="question._id">
            <div id="votearea">
              <span class="upvotebutton" v-bind:class="{upvoted: question.isUpvoted}" @click="vote(question, 1)">🡅</span><br>
              <span style="font-size: 0.9rem;">{{question.votecount}}</span><br>
              <span class="downvotebutton" v-bind:class="{downvoted: question.isDownvoted}" @click="vote(question, -1)">🡇</span>
            </div>
            <div style="cursor: pointer" @click="goToQuestion(question)">
              {{question.title}}<br>
              <div style="font-size: 0.8rem; margin-top: 0.6rem; line-height: 1.2rem;">
                Asked on: {{shorten(question.created_at)}}&nbsp;&nbsp;&nbsp;
                By: {{question.author.email}}<br>
              </div>
            </div>
            <div style="margin-right: 1rem; margin-left: auto; font-size: 0.9rem; cursor: pointer;"
              v-show="showDelete(question.author._id)" @click="sendDelete(question._id)">
              Delete
            </div>
          </div>
        </div>
        <div id="questionpage" class="col-md-10" v-if="zone === 1">
          <question-page v-on:returnButton="moveBack()"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      searchBox: "",
      questionForm: false,
      questionTitle: "",
      questionContent: "",
      alert: "", // for creating question
    }
  },
  created() {
    // Stay signed after refresh if user did not click logout
    if(localStorage.getItem("token")) {
      axios({
          method: 'post',
          url: this.$store.state.serverAddress + "users/check",
          headers: {"Authorization": localStorage.getItem("token")},
      })
      .then(({data}) => {
        this.$store.state.userEmail = data.email;
        this.$store.state.userId = data.id;
        this.$store.state.loggedIn = true;
        this.fetch();
      })
      .catch(err => {
        console.log(err)
      })
    }
    else {
      this.$store.state.loggedIn = false;
      localStorage.clear();
      this.fetch();
    }
  },
  methods: {
    fetch() {
      axios({
        method: 'get',
        url: this.$store.state.serverAddress + "qa/questions",
        // headers: {"Authorization": localStorage.getItem("token")},
      })
      .then(({ data }) => {
        if(data.length > 0) {
          this.questions = data.map(question => {
            // Calculate votecount from upvotes minus downvotes
            question.votecount = question.upvotes.length - question.downvotes.length
            if(this.loggedIn) {
              // Check if logged in user has upvoted or downvoted the question
              question.isUpvoted = false;
              question.isDownvoted = false;

              question.upvotes.forEach(id => {
                if(id === this.$store.state.userId) {
                  question.isUpvoted = true;
                }
              })
              if(!question.isUpvoted) {
                question.downvotes.forEach(id => {
                  if(id === this.$store.state.userId) {
                    question.isDownvoted = true;
                  }
                })
              }
            }
            return question;
          })
          console.log("Fetched questions")
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    goHome() {
      this.fetch()
      this.zone = 0;
      this.showForm = 0;
    },
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
      this.fetch();
      localStorage.removeItem("token");
      this.searchBox = "";
    },
    sendQuestion() {
      if(!this.loggedIn) {
        this.alert = "Must login to ask a question"
        setTimeout(() => {
            this.alert = "";
        }, 2200);
      } else {
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
        .then(() => {
          this.alert = "Success";
          setTimeout(() => {
            this.alert = "";
            this.questionTitle = "";   // resets question inputs
            this.questionContent = ""; // ^
            this.questionForm = false; //closes form
          }, 1000);
          this.fetch();
        })
        .catch(err => {
          console.log(err)
          this.alert = "Failed"
          setTimeout(() => {
              this.alert = "";
          }, 2000);
        })
      }
    },
    sendDelete(id) {
      if(this.loggedIn) {
        axios({
          method: 'delete',
          url: this.$store.state.serverAddress + `qa/${id}`,
          headers: {"Authorization": localStorage.getItem("token")},
        })
        .then(() => {
          setTimeout(() => {
            this.fetch();
          }, 200);
        })
        .catch(err => {
          console.log(err)
        })
      }
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
    showDelete(id) {
      return (id === this.$store.state.userId)
    },
    goToQuestion(obj) {
      this.zone = 1;
      this.searchBox = "";
      this.selectedQuestion = obj;
    },
    vote(obj, val) {
      if(obj.isUpvoted || obj.isDownvoted) {
        val = 0;
      }
      if(this.loggedIn) {
        axios({
          method: 'put',
          url: this.$store.state.serverAddress + `qa/vote/${obj._id}`,
          data: {
            type: "question",
            vote: val,
          },
          headers: {"Authorization": localStorage.getItem("token")},
        })
        .then(() => {
          this.fetch();
          console.log("vote changed")
        })
        .catch(err => {
          console.log(err)
        })
      } 
    },
    moveBack() {
      this.questionForm = false;
      this.fetch();
    }
  },
  computed: {
    questions: {
      get() {
        return this.$store.state.questions;
      },
      set(arr) {
        this.$store.state.questions = arr;
      }
    },
    loggedIn() {
      return this.$store.state.loggedIn;
    },
    userEmail() {
      return this.$store.state.userEmail;
    },
    filteredQuestions() {
      return this.questions.filter((question) => {
        return question.title.match(new RegExp(this.searchBox, "i"))
      })
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
  },
}
</script>

<style>
#navbar {
  position: fixed;
  background-color: #09705a;
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
  cursor: pointer;
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

.upvoted {
  color: #ec6733;
}

.downvoted {
  color: #8e63df;
}
</style>
