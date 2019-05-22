<template>
  <div>
    <div class="container" style="width: 70%;">
      <v-layout row wrap>
        <v-flex xs3>
          <Sidebar/>
        </v-flex>
        <v-flex xs9 style="border-left: 1px solid rgba(191, 54, 12, 0.4); padding-left: 1rem;">
          <Questions :title="'Your Questions'" :questions="allUserQuestions" v-if="currentPage === 'Home'"/>
          <Questions :title="'All Questions'" :questions="allQuestions" v-if="currentPage === 'Browse'"/>
          <Questions :title="currentPage" v-if="currentPage === 'Tags'"/>
          <Questions :title="currentPage" v-if="currentPage === 'Users'"/>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import Sidebar from "../components/Sidebar";
import Questions from "../components/Questions";

export default {
  components: {
    Sidebar,
    Questions
  },
  created() {
    this.getAllQuestions();
    this.getUserQuestions();
  },
  methods: {
    ...mapActions(["getAllQuestions", "getUserQuestions"])
  },
  computed: {
    ...mapState(["currentPage", "allQuestions", "allUserQuestions"])
  }
};
</script>

<style>
</style>
