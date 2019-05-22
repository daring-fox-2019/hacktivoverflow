<template>
  <v-container id="userDashboardContainer">
    <v-layout justify-center align-center>
      <v-flex>
        <UserQuestionCard v-if="myQuestions.length"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UserQuestionCard from "../components/UserQuestionCard";
import { mapState } from "vuex";
export default {
  components: {
    UserQuestionCard
  },
  computed: mapState(["myQuestions"]),
  created() {}
};
</script>

<style scoped>
#userDashboardContainer {
  width: 60% !important;
}
</style>
