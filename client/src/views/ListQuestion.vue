<template>
  <div class="home">
    <v-layout fluid>
      <v-flex>
        <v-layout align-center justify-space-between fluid px-5 py-3>
          <h2>All Questions</h2> 
          <v-btn color="blue" to="/addQuestion">Ask Question</v-btn>
        </v-layout>
        <v-divider/>
        <!-- LISTQUESTION -->
        <Question :list-question="displayQuestion"/>
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
import {state, mapState} from 'vuex';

export default {
  name: "home",
  components: {
    WatchTag,
    Question
  },
  created() {
    this.$store.dispatch("loadQuestion");
  },
  computed: {
      ...mapState(['displayQuestion'])
  },
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
