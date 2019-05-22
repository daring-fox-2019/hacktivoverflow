<template>
  <div class="home">
    <v-layout fluid>
      <v-flex>
        <v-layout align-center justify-space-between fluid px-5 py-3>
          <h2 v-if="!this.$store.state.isSearch">Top Questions</h2>
          <h2 v-else>Questions tagged [ {{this.$store.state.searchTag}} ]</h2>
          <v-btn color="blue" @click="askQuestion">Ask Question</v-btn>
        </v-layout>
        <v-divider/>
        <!-- LISTQUESTION -->
        <Question :list-question="this.$store.state.displayQuestion"/>
      </v-flex>

      <v-flex xs3>
        <WatchTag/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
// @ is an alias to /src
import Question from "@/components/Question.vue";
import WatchTag from "@/components/WatchTag.vue";

export default {
  name: "home",
  components: {
    WatchTag,
    Question
  },
  created() {
    this.$store.dispatch("loadQuestion");
    this.$store.commit("setSearchTag", "");
    this.$store.commit("setIsSearch", false);
  },
  methods: {
    askQuestion() {
      if (localStorage.token) {
        this.$router.push("/addQuestion");
      } else {
        swal("You must signin!", "warning");
      }
    }
  }
};
</script>

<style scoped>
#watch-tag {
  width: 90%;
  border-radius: 5px;
}

.container {
  margin: 0;
}
</style>
