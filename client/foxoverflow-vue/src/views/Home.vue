<template>
  <div>
    <div class="container" style="width: 70%;">
      <v-layout row wrap>
        <v-flex xs3>
          <Sidebar/>
        </v-flex>
        <v-flex xs9 style="border-left: 1px solid rgba(191, 54, 12, 0.4); padding-left: 1rem;">
          <UserQuestions
            :title="'Your Questions'"
            :keyword="keyword"
            v-if="currentPage === 'Home' && isLoggedIn"
          />
          <div v-else-if="currentPage === 'Home' && !isLoggedIn">
            <h2><a @click="changeForm(true)">Sign Up</a> or <a @click="changeForm(false)">Log In</a></h2> 
            <v-container v-if="isRegister"
              style="width: 90%; background-color: white; border-radius: 5px; padding-left: 3rem; padding-right: 3rem; padding-bottom: 0.5rem;"
            >
              <Register/>
            </v-container>
            <v-container v-else
              style="width: 90%; background-color: white; border-radius: 5px; padding-left: 3rem; padding-right: 3rem; padding-bottom: 0.5rem;"
            >
              <Login/>
            </v-container>
          </div>
          <Questions
            :title="'All Questions'"
            :keyword="keyword"
            v-else-if="currentPage === 'FoxOverflow'"
          />
          <Tags :title="'Saved Tags'" v-if="currentPage === 'Tags'"/>
          <!-- <Questions :title="currentPage" v-if="currentPage === 'Users'"/> -->
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import Login from "../components/Login";
import Register from "../components/Register";
import Sidebar from "../components/Sidebar";
import Questions from "../components/Questions";
import UserQuestions from "../components/UserQuestions";
import Tags from "../components/Tags";

export default {
  data() {
    return {
      isRegister: true,
    }
  },
  components: {
    Sidebar,
    Questions,
    UserQuestions,
    Tags,
    Login,
    Register
  },
  created() {
    this.getAllQuestions();
    if (localStorage.token) {
      this.getUserQuestions();
    }
  },
  methods: {
    ...mapActions(["getAllQuestions", "getUserQuestions"]),
    changeForm(value) {
      this.isRegister = value
    }
  },
  computed: {
    ...mapState([
      "currentPage",
      "allQuestions",
      "allUserQuestions",
      "keyword",
      "isLoggedIn"
    ])
  }
};
</script>

<style>
</style>
