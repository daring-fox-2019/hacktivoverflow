<template>
  <v-container grid-list-md text-xs-center fluid>
    <!-- Questions -->

    <v-layout row wrap align-start justify-start>
      <div class="display-1 font-weight-light">Question</div>
      <v-spacer></v-spacer>
      <div>
        <v-btn color="info">Ask Question</v-btn>
      </div>
    </v-layout>
    <OneQuestion/>
  </v-container>
</template>

<script>
import OneQuestion from "@/components/OneQuestion.vue";

export default {
  name: "QuestionDetails",
  components: { OneQuestion }
};
</script>

<style>
</style>
