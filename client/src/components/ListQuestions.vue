<template>
  <div>
    <h1>{{ title }}</h1>
    <v-layout row wrap>
      <v-list three-line>
        <Question/>
        <v-divider inset></v-divider>
        <Question/>
        <v-divider inset></v-divider>
        <Question/>
        <v-divider inset></v-divider>
        <Question/>
      </v-list>
    </v-layout>
  </div>
</template>
<script>
import Question from "@/components/Question.vue";
export default {
  name: 'listquestions',
  components: {
    Question
  },
  props: ["title"]
};
</script>
