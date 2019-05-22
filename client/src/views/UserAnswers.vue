<template>
  <v-container id="userAnswersContainer">
    <v-layout justify-center align-center>
      <v-flex>
        <UserAnswerCard v-if="myAnswers.length"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import UserAnswerCard from "../components/UserAnswerCard";
export default {
  computed: mapState(["myAnswers"]),
  components: {
    UserAnswerCard
  }
};
</script>

<style scoped>
#userAnswersContainer {
  width: 60% !important;
}
</style>
