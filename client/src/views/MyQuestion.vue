<template>
  <div class="home">
    <v-layout align-center justify-space-between fluid px-5 py-3>
      <h2>My Questions</h2>
      <v-btn color="blue" to="/addQuestion">Ask Question</v-btn>
    </v-layout>
    <v-divider class="mb-3"/>

    <v-layout fluid mt-3>
      <v-flex>
        <!-- LIST QUESTION -->
        <Question :list-question="this.$store.state.myQuestion"/>
      </v-flex>

      <v-flex xs3>
        <v-layout fluid justify-center>
          <WatchTag/>
        </v-layout>
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
    Question,
    WatchTag
  },
  created() {
    this.$store.dispatch("loadMyQuestion");
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
