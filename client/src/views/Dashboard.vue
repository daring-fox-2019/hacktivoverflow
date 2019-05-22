<template>
  <v-container id="dashboardContainer">
    <v-layout justify-center align-center>
      <v-flex>
        <div v-if="this.$route.path == '/dashboard' && allQuestions.length">
          <QuestionCard
          v-bind:search="search"
          ></QuestionCard>
        </div>
        <router-view/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import QuestionCard from "../components/QuestionCard";
import { mapState } from "vuex";
export default {
  props: ['search'],
  data() {
    return {};
  },
  components: {
    QuestionCard
  },
  computed: mapState(["allQuestions"])
};
</script>

<style scoped>
#dashboardContainer {
  width: 60% !important;
}
</style>
